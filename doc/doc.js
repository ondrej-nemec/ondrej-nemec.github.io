/* VERSION 3.0.0 */
var Doc = {
	languages: {},
	versions: {},
	lang: null,
	version: null,
	file: null,
	setFile: function(file) {
		Doc.file = file;
		Doc.onPageChangeAsync();
	},
	setVersion: function(version) {
		Doc.version = version;
		Doc.onSettingsChangeAsync();
	},
	setLang: function(lang) {
		Doc.lang = lang;
		Doc.onSettingsChangeAsync();
	},
	location: "",
	path: "",
	document: window.parent.document,
	getPath: function() {
		return Doc.path + "/" + Doc.lang + "/" + Doc.version + "/";
	},
	init: function() {
		document.getElementById("date").innerText = new Date().getFullYear();
        Doc.fillMeta();

		Doc.location =  window.parent.location;
		Doc.path =  Doc.location.href.substring(0, Doc.location.href.lastIndexOf('/'));

		var configPath = Doc.path + "/config.json";

		Doc.load(configPath, function(response) {
			config = JSON.parse(response);
			Doc.fillSocial(config);
        	// set doc attributes
	        Doc.versions = config.versions;
	        Doc.languages = config.langs;
			var params = new URLSearchParams(Doc.location.search);
        	Doc.lang = params.get("lang") === null ? Object.keys(Doc.languages)[0] : params.get("lang"),
        	Doc.version = params.get("version") === null ? Object.keys(Doc.versions)[0] : params.get("version"),
        	Doc.file = params.get("file"); // === null ? null : params.get("file")
        	// fill static content
        	document.getElementById("doc-app-name").innerText = config.name;
	        Doc.fillList(config.langs, "doc-language", "lang", function(newLang) {
	        	Doc.setLang(newLang);
	        });
	        Doc.fillList(config.versions, "doc-version", "version", function(newVer){
	        	Doc.setVersion(newVer);
	        });
	        // load first page
	        Doc.onSettingsChange();
		}, Doc.onLoadFailure());
	},
	onSettingsChangeAsync: function() {
		setTimeout(Doc.onSettingsChange, 10);
	},
	onSettingsChange: function() {
		document.getElementById("doc-current-version").innerText = Doc.version;
		document.getElementById("doc-current-language").innerText = Doc.lang;
		Doc.setListItemActive("doc-version", Doc.version);
		Doc.setListItemActive("doc-language", Doc.lang);

		Doc.load(Doc.getPath() + "config.json", function(response) {
			config = JSON.parse(response);
			Doc.fillMainMenu(config);
			if (Doc.file === null) {
				Doc.file = config[0].link;
			}
			Doc.onPageChange();
		}, Doc.onLoadFailure());
	},
	onPageChangeAsync: function() {
		setTimeout(Doc.onPageChange, 10);
	},
	onPageChange: function() {
		Doc.load(Doc.getPath() + Doc.file, function(fileContent) {
			var content = document.getElementById('doc-content');
			content.innerHTML = fileContent
				.replace(":Tag'", ":" + Doc.version + "'")
				.replace("<h1>", '<h1 class="bd-title">')
				.replace('<p class="introduction">', '<p class="bd-lead">');

			window.parent.history.pushState(
				{"html":window.location.href},"", 
				"?version=" + Doc.version + "&lang=" + Doc.lang + "&file=" + Doc.file + location.hash);
	        Doc.fillMinorMenu(content);
	        hljs.highlightAll();
		}, Doc.onLoadFailure());
	},

	/* load something */
	load: function(url, onSuccess, onFailure = null) {
	    var xhr = new XMLHttpRequest();
	    xhr.open("get", url, true);
	    // xhr.setRequestHeader('Cache-Control', 'no-cache');
	    xhr.onload = function() {
	        onSuccess(xhr.response);
	    };
	    if (onFailure === null) {
	    	onFailure = function() {};
	    }
		xhr.onerror = function() {
			onFailure(xhr);
		};
		try {
			xhr.send();
		} catch (exception) {
			onFailure(exception);
		}
	},
	onLoadFailure: function() {
		return function(xhr) {
			console.log("error", xhr); // TODO display error
		};
	},
	/* fill dropdown list */
	fillList: function(options, listId, urlName, callback) {
	    var list = document.getElementById(listId);
	    if (list === null) {
	        console.error("Missing select #" + listId);
	        return;
	    }
	    for (const[key, name] of Object.entries(options)) {
			var link = document.createElement("a");
			link.setAttribute("id", Doc.normalizeId(key));
			link.setAttribute("class", "dropdown-item");
			link.setAttribute("href", "?" + urlName + "=" + key);
			link.innerText = name;
			link.onclick = function() {
				callback(key);
				return false;
			};
	        var li = document.createElement("li");
	        li.appendChild(link);
	        list.appendChild(li);
	    }
	},
	setListItemActive: function(listId, itemId) {
		var list = document.getElementById(listId);
		list.querySelectorAll('li').forEach(function(li) {
			var a = li.querySelector("a");
			a.classList.remove("current");
			a.removeAttribute("aria-current");
		});
		var item = list.querySelector("#" + Doc.normalizeId(itemId));
		item.classList.add("current");
		item.setAttribute("aria-current", "true");
	},
	normalizeId: function(id) {
		return id.replace(".", "_");
	},
	/* left menu */
	fillMainMenu: function(menuItems) {
		var menu = document.getElementById("doc-main-menu");
		menu.innerHTML = "";
		for (const[index, item] of Object.entries(menuItems)) {
			var li = document.createElement("li");
			li.classList.add("mb-1");
			menu.appendChild(li);

			if (item.hasOwnProperty("sub")) {
				var button = document.createElement("button");
				button.setAttribute("class", "btn d-inline-flex align-items-center rounded collapsed");
				button.innerText = item.title;
				li.appendChild(button);
				var collapseId = "collapse_" + index;
				button.setAttribute("data-bs-toggle", "collapse");
				button.setAttribute("data-bs-target", "#" + collapseId);

				var div = document.createElement("div");
				div.classList.add("class", "collapse");
				div.setAttribute("id", collapseId);
				li.appendChild(div);

				var ul = document.createElement("ul");
				ul.setAttribute("class", "list-unstyled fw-normal pb-1 small");
				div.appendChild(ul);
				Doc.fillMainSubMenu(ul, item.sub);

				var expanded = div.querySelector("li a.active") !== null;
				button.setAttribute("aria-expanded", expanded);
				if (expanded) {
					div.classList.add("show");
				}

			} else {
				var a = Doc.createMainMenuLink(item);
				a.classList.add("doc-menu-notCollapsed");
				li.appendChild(a);
			}
		}
	},
	fillMainSubMenu: function(submenu, items) {
		for (const[index, item] of Object.entries(items)) {
			var li = document.createElement("li");
			submenu.appendChild(li);
			li.appendChild(Doc.createMainMenuLink(item));
		}
	},
	createMainMenuLink: function(item) {
		var a = document.createElement("a");
		a.setAttribute("href", item.link);
		a.setAttribute("class", "d-inline-flex align-items-center rounded");
		if (Doc.file === item.link) {
			Doc.setFileLinkActive(a);
		}
		a.innerText = item.title;
		a.onclick = function() {
			Doc.setFileLinkActive(a);
			Doc.setFile(item.link);
			return false;
		};
		return a;
	},
	setFileLinkActive: function(a) {
		document.querySelectorAll("#doc-main-menu a.active, #doc-main-menu a[aria-current]").forEach(function(link) {
			link.classList.remove("active");
			link.removeAttribute("aria-current");
		});
		a.classList.add("active");
		a.setAttribute("aria-current", "page");
	},
	/* minor menu */
	fillMinorMenu: function(content) {
		document.getElementById("doc-minor-menu-headline").innerText = content.querySelector("h1").innerText + ":";

	    var containers = [];
	    var lastLevel = -1;
	    var getLastContainer = function() {
	    	return containers[containers.length-1];
	    };
	    var popContainer = function() {
	        var container = containers.pop();
	        var last = getLastContainer();
	        last.appendChild(container);
	        return last;
	    };
	    var pushContainer = function() {
	    	var container = document.createElement("ul");
			containers.push(container);
			return container;
	    };
	    var getContainer = function(level) {
	    	if (lastLevel < level) {
				return pushContainer();
			}
			if (lastLevel > level) {
	            return popContainer();
	        }
	        return getLastContainer();
	    };
		content.querySelectorAll("h2,h3,h4").forEach(function(headline, index) {
			var level = parseInt(headline.tagName.substring(1,2));
	        var id = headline.tagName + "-" + index;
	        headline.setAttribute("id", id);

			var container = getContainer(level);
        	lastLevel = level;
			var li = document.createElement("li");
			container.appendChild(li);

			var a = document.createElement("a");
			a.setAttribute("href", "#" + id);
			a.innerText = headline.innerText;
			li.appendChild(a);
		});

		document.getElementById("doc-minor-menu").innerHTML = "";
	    while(containers.length > 0) {
	        if (containers.length === 1) {
	            document.getElementById("doc-minor-menu").appendChild(containers.pop());
	        } else {
	            popContainer();
	        }
	    }
	},
	/* owner ship*/
	fillSocial: function(config) {
		Doc.addMeta("title", {}, config.name);
		if (!config.hasOwnProperty("social")) {
			return;
		}
		var setProperty = function(propertyName, elementId, change = null) {
			if (change === null) {
				change = function(a){return a;};
			}
			if (config.social.hasOwnProperty(propertyName)) {
				document.getElementById(elementId).innerText = change(config.social[propertyName]);
			}
		};
		var setLink = function(propertyName, elementId) {
			if (config.social.hasOwnProperty(propertyName)) {
				var image = document.getElementById(elementId);
				image.removeAttribute("style");
				image.querySelector("a").setAttribute("href", config.social[propertyName]);
			}
		};
		setProperty("author", "doc-owner");
		setProperty("from", "doc-from", function(a){ return a + " - ";});
		setLink("github", "doc-github"); //  https://github.com/...
		setLink("collective", "doc-collective"); // https://opencollective.com/...


		var setMeta = function(propertyName, meta, data, key) {
			if (config.social.hasOwnProperty(propertyName)) {
				data[key] = config.social[propertyName];
				Doc.addMeta(meta, data);
			}
		};
		setMeta("icon", "link", {
			"rel": "icon"
		}, "href");
		setMeta("description", "meta", {
			"name": "description"
		}, "content");
		setMeta("author", "meta", {
			"name": "author"
		}, "content");
		// TODO
		// <meta name="docsearch:language" content="en">
		// <meta name="docsearch:version" content="5.1">

	},
	fillMeta: function() {
		Doc.addMeta("meta", {"charset": "utf-8"});
		Doc.addMeta("meta", {
			"name": "viewport",
			"content": "width=device-width, initial-scale=1"
		});
	},
	addMeta: function(tag, data, inner = null) {
		var meta = document.createElement(tag);
		for (const[name, value] of Object.entries(data)) {
			meta.setAttribute(name, value);
		}
		if (inner !== null) {
			meta.innerText = inner;
		}
		Doc.document.head.appendChild(meta);
	}
};
Doc.init();