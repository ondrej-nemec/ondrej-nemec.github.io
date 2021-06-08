async function init(configs, baseWidth, baseHeight) {
	var elements = [];
	var counter = 0;
	configs.forEach(function(config) {
		var object = {
			top: config.top,
			left: config.left,
			width: config.width,
			height: config.height
		};
		var element = null;
		if (config.hasOwnProperty("img")) {
			element = new Image();
			element.src = config.img.src;
			element.onload = function() { counter++; };
		}
		object.element = element;
		for (const[name, listener] of Object.entries(config.listeners)) {
			object[name] = listener;
		}
		elements.push(object);
	});
	
	var promise = new Promise((res, rej) => {
		var checkCounter = function() {
			if (counter === elements.length) {
				res("DONE");
			} else {
				setTimeout(checkCounter, 10);
			}
		};
        checkCounter();
    });
    var canvas = document.createElement("canvas");
    await promise.then(function() {
    	print(canvas, elements, baseWidth, baseHeight);
    });
    return canvas;
}

/***** DRAWING ******/

var currentWidth = 0;
var currentHeight = 0;
var minWidth = 0;
var minHeight = 0;

function print(canvas, elements, baseWidth, baseHeight) {
	window.addEventListener('resize', function(event) {
	    draw(canvas, elements, baseWidth, baseHeight);
	}, true);

	["click"].forEach(function(eventName) {
		canvas.addEventListener(eventName, function(event) {
			var width = toRelative(event.pageX, minWidth, currentWidth);
			var height = toRelative(event.pageY, minHeight, currentHeight);
			var action = false;
			for (const[key, element] of Object.entries(elements)) {
				if (element.hasOwnProperty(eventName)) {
					if (height > element.top && height < element.top + element.height 
			            && width > element.left && width < element.left + element.width) {
		            	element[eventName](element, elements);
		            	action = true;
		            }
		        }
			}
			if (action) {
				draw(canvas, elements, baseWidth, baseHeight);
			}
		}, false);
	});

	draw(canvas, elements, baseWidth, baseHeight);
}

function draw(canvas, elements, baseWidth, baseHeight) {
	// console.log("draw");
	var ctx = canvas.getContext("2d");

	var bodyW = document.body.offsetWidth;
	var bodyH = document.body.offsetHeight;

	canvas.setAttribute("width", bodyW);
	canvas.setAttribute("height", bodyH);
	var k = Math.min(bodyW / baseWidth, bodyH / baseHeight);

	currentWidth = k * baseWidth;
	currentHeight = k * baseHeight;
	minWidth = (bodyW - currentWidth) / 2;
	minHeight = (bodyH - currentHeight) / 2;

	for (const[index, object] of Object.entries(elements)) {
		ctx.drawImage(
			object.element,
			fromRelative(object.left, minWidth, currentWidth),
			fromRelative(object.top, minHeight, currentHeight),
			object.width * currentWidth, 
			object.height * currentHeight
		);
	}
}

function toRelative(value, min, le) {
	return (value - min) / le;
}

function fromRelative(value, min, le) {
	return value * le + min;
}