function onLoad(configPath) {
    var xhr = new XMLHttpRequest();
    xhr.open("get", configPath, true);
    xhr.onload = function() {
        var response = JSON.parse(xhr.response);
        document.getElementById("doc-app-name").innerText = response.name;
        document.title = response.name;
        fillSelect(response.langs, "doc-language");
        fillSelect(response.versions, "doc-version");
        fillMenu(response.doc);

        var params = new URLSearchParams(location.search);
        document.getElementById('doc-language').value = params.get("lang");
        document.getElementById('doc-version').value = params.get("version");
        document.querySelector("[doc-href='" + params.get("file") + "']").onclick();
    };
    xhr.send();
}

/********************************/

var loadPage = function() {
    var file = document.querySelector(".active");
    if (file === null) {
        console.warn("Missing active file");
        return;
    }
    file = file.getAttribute("doc-href");
    var langs = document.getElementById('doc-language').value;
    var version = document.getElementById('doc-version').value;


    document.getElementById('doc-content').innerHTML = "";
    document.getElementById('doc-sub-menu').innerHTML = "";
    loadData(file, langs, version);
};

function loadData(file, lang, version) {
    var xhr = new XMLHttpRequest();
    xhr.open("get", lang + "/" + version + "/" + file, true);
    xhr.onload = function() {
        document.getElementById('doc-content').innerHTML = xhr.response;
        window.history.pushState({"html":window.location.href},"", "?version=" + version + "&lang=" + lang + "&file=" + file + location.hash);
    };
    xhr.send();
}

/********************************/

function fillMenu(doc) {
    var menu = document.getElementById("doc-main-menu");
    var subMenuElement =  document.getElementById('doc-sub-menu');
    doc.forEach(function(item, index) {
        var li = document.getElementById("doc-template-menu-item").content.cloneNode(true).querySelector(":first-child");
        li.onclick = function() {
            document.querySelectorAll(".active").forEach(function(activeRemove) {
                activeRemove.classList.remove("active");
            });
            li.classList.add("active");

            loadPage();
            item.sub.forEach(function(subItem) {
                var subLi = document.getElementById("doc-template-sub-menu").content.cloneNode(true).querySelector(":first-child");
                subLi.querySelector(":last-child").innerText = subItem.title;
                subLi.onclick = function() {
                    location.hash = "#";
                    location.hash = "#" +  subItem.link;
                };
                subMenuElement.appendChild(subLi);
            });
        };
        li.querySelector(":last-child").innerText = item.title;
        li.setAttribute("doc-href", item.file);

        menu.appendChild(li);
     });
}

function fillSelect(options, selectId) {
    var select = document.getElementById(selectId);
    if (select === null) {
        console.error("Missing select #" + selectId);
        return;
    }
    select.onchange = loadPage;
    options.forEach(function(optionItem) {
       var option = document.createElement("option");
       option.value = optionItem;
       option.innerText = optionItem;
       select.appendChild(option);
    });
}
