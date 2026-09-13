/* VERSION 2.0.0 */
var versions = {};
function onLoad(configPath) {
    // set copy right
    document.getElementById("date").innerText = new Date().getFullYear();
    load(configPath, function(response) {
        document.getElementById("doc-app-name").innerText = response.name;
        document.title = response.name;
        fillSelect(response.langs, "doc-language");
        versions = response.versions;
        fillSelect(response.versions, "doc-version", true);

        var params = new URLSearchParams(location.search);
        var lang = params.get("lang") === null ? response.langs[0] : params.get("langs");
        if ( params.get("lang") === null) { // TODO fix
            lang = response.langs[0];
        } else {
            lang = params.get("lang");
        }

        var version = params.get("version") === null ? Object.keys(versions)[0] : params.get("version");
        document.getElementById('doc-language').value = lang;
        document.getElementById('doc-version').value = version;

        loadMenu(lang, version, function() {
            var firstElement = getFirstMenuItem();
            var file = params.get("file") === null ? firstElement.getAttribute("doc-href") : params.get("file");
            var menuItem = document.querySelector("[doc-href='" + file + "']");
            var menuItemParent = document.getElementById(menuItem.getAttribute("parent"));
            if (menuItemParent !== null) {
                menuItemParent.querySelector(".doc-menu-title").click();
            }
            menuItem.click();
            setTimeout(function() {
                if (location.hash.length > 1) {
                    var hash = location.hash;
                    location.hash = "#";
                    location.hash = hash;
                }
            }, 1000);
        });
    });
}

function getFirstMenuItem() {
    return document.querySelector("nav li[doc-href]:first-child");
}

function loadMenu(lang, version, after) {
    load(lang + "/" + version + "/config.json", function(items) {
        fillMenu(items);
        after();
    });
}

function load(url, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.open("get", url, true);
    xhr.setRequestHeader('Cache-Control', 'no-cache');
    xhr.onload = function() {
        onSuccess(JSON.parse(xhr.response));
    };
    xhr.send();
}

/********************************/

var loadPage = function(noMenu = false) {
    var langs = document.getElementById('doc-language').value;
    var version = document.getElementById('doc-version').value;
    var loading = function() {
        var file = document.querySelector(".active");
        if (file === null) {
            file = getFirstMenuItem();
        }
        file = file.getAttribute("doc-href");
        document.getElementById('doc-content').innerHTML = "";
        document.getElementById('doc-page-menu').innerHTML = "";
        loadData(file, langs, version);
    };
    if (noMenu) {
        loading();
    } else {
        loadMenu(langs, version, function() {
            loading();
        })
    };
};

function loadData(file, lang, version) {
    var xhr = new XMLHttpRequest();
    var url = "";
    if (file.startsWith('http')) {
        url = file;
    } else {
        url = lang + "/" + version + "/" + file;
    }
    xhr.open("get", url, true);
    xhr.setRequestHeader('Cache-Control', 'no-cache');
    xhr.onload = function() {
        document.getElementById('doc-content').innerHTML = xhr.response.replace(":Tag'", ":" + versions[version] + "'");
        window.history.pushState({"html":window.location.href},"", "?version=" + version + "&lang=" + lang + "&file=" + file + location.hash);
        fillPageMenu(document.getElementById('doc-content'));
        hljs.highlightAll();
    };
    xhr.send();
}

/********************************/

function cloneTemplate(template) {
    return template.content.cloneNode(true).querySelector(":first-child");
}

/********************************/

function getHeadlineLevel(headline) {
    return parseInt(headline.tagName.substring(1,2));
}

/********************************/

function clearActive() {
    document.querySelectorAll(".active").forEach(function(activeRemove) {
       activeRemove.classList.remove("active");
    });
}

function fillPageMenu(content) {
    var containers = [];
    var lastLevel = -1;
    var popContainer = function() {
        var container = containers.pop();
        containers[containers.length-1].appendChild(container);
    };
    content.querySelectorAll("h1,h2,h3,h4").forEach(function(headline, index) {
        var level = getHeadlineLevel(headline);
        if (lastLevel < level) {
            var nav = document.createElement("ul");
            nav.classList.add("nav");
            nav.classList.add("flex-column");
            if (containers.length === 0) {
                nav.classList.add("accordion-item");
            } else {
                nav.classList.add("ps-2");
            }
            containers.push(nav);
        } else if (lastLevel > level) {
            popContainer();
        }
        var container = containers[containers.length-1];

        var id = headline.tagName + "-" + index;
        headline.setAttribute("id", id);
        var a = document.createElement("a");
        a.innerText = headline.innerText;
        a.setAttribute("href", "#" + id);
        a.setAttribute("class", "nav-link");

        var li = document.createElement("li");
        li.appendChild(a);
        li.setAttribute("class", "nav-item");

        container.appendChild(li);
        lastLevel = level;
    });
    
    while(containers.length > 0) {
        if (containers.length === 1) {
            document.getElementById("doc-page-menu").appendChild(containers.pop());
        } else {
            popContainer();
        }
    }
}

function fillMenu(items) {
    var mainMenuItemTemplate1 = document.getElementById("doc-template-menu-item-1");
    var mainMenuItemTemplate2 = document.getElementById("doc-template-menu-item-2");
    var subMenuItemTemplate = document.getElementById("doc-template-sub-menu-item");
    var mainMenu = document.getElementById("doc-main-menu");
    mainMenu.innerHTML = "";
    items.forEach(function(item, index) {
        if (item.hasOwnProperty("sub")) {
            var itemContainer = cloneTemplate(mainMenuItemTemplate1);
            mainMenu.appendChild(itemContainer);

            var titleId = "doc-menu-title-" + index;
            var menuContentId = "doc-menu-content-" + index;

            var title =  itemContainer.querySelector(".doc-menu-title");
            title.innerText = item.title;
            title.setAttribute("data-bs-target", "#" + menuContentId);
            title.setAttribute("aria-controls", menuContentId);
            title.setAttribute("aria-expanded", false);

            var menuContent = itemContainer.querySelector(".doc-menu-content");
            menuContent.setAttribute("id", menuContentId);
            menuContent.setAttribute("aria-labelledby", titleId);

            itemContainer.querySelector(".accordion-header").setAttribute("id", titleId);

            item.sub.forEach(function(subItem, subIndex) {
                createSimpleMenuItem(subItem, subIndex, index, menuContent.querySelector("#doc-sub-menu"), subMenuItemTemplate);
            });
        } else {
            createSimpleMenuItem(item, index, -1, mainMenu, mainMenuItemTemplate2);
        }
    });
}

function createSimpleMenuItem(item, index, parentIndex, parent, template) {
    var container = cloneTemplate(template);
    parent.appendChild(container);
    container.querySelector(".doc-menu-title").innerText = item.title;
    container.style.cursor = 'pointer';
    container.setAttribute("doc-href", item.link);
    var id =  "doc-menu-item-" + parentIndex + "-" + index;
    container.setAttribute("id", id);
    container.setAttribute("parent", "doc-menu-title-" + parentIndex);
    container.onclick = function() {
        clearActive();
        document.getElementById(id).classList.add("active");
        loadPage(true);
    };
    
}

function fillSelect(options, selectId, object = false) {
    var select = document.getElementById(selectId);
    if (select === null) {
        console.error("Missing select #" + selectId);
        return;
    }
    select.onchange = loadPage;
    var forEach = function(optionItem) {
        var option = document.createElement("option");
        option.value = optionItem;
        option.innerText = optionItem;
        select.appendChild(option);
    };
    if (object) {
        for (const[optionItem, tag] of Object.entries(options)) {
           forEach(optionItem);
        }
    } else {
        options.forEach(forEach);
    }
    
}
