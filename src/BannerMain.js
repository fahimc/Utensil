( function(window) {
	var currentItem = null;
	var box = null;
	function Main() {
		if(window.addEventListener) {
			window.addEventListener("load", onLoad);
		} else {
			window.attachEvent("onload", onLoad);
		}
	}

	function onLoad(event) {
		//box = Sprite.drawRectangle(0, 0, 100, 100, "#f00", 0);
		// box.contentEditable = true;
		//box.id = settings.objectPrefix + frameSet.objects.length;
		createBox("#f00");
		createBox("#00f");

	}

	function onComplete() {

	}

	function createBox(c) {
		var b = Sprite.drawRectangle(0, 0, 100, 100,c , 0);
		b.addEventListener("click", onBoxClick);
		// box.contentEditable = true;
		b.id = settings.objectPrefix + frameSet.objects.length;
		addSelectors(b);
		document.body.appendChild(b);
		Drag.startDrag(b, {
			x : 0,
			y : 0
		});
		frameSet.objects.push(b);
	}
	
	function addSelectors(box) {
		var circle = Sprite.drawCircle(0, 0, 10, 10, 10, "#000", 1);
		circle.container = box;
		circle.addEventListener("mousedown", onRotate);
		circle.style.right = "-5px";
		circle.style.left = "";
		circle.style.zIndex = "2";
		box.appendChild(circle);
	}
	function onBoxClick(event)
	{
		box = event.currentTarget;
		console.log(box.id);
		
	}
	function onRotate(event) {
		if(Drag.item) {
			Drag.dragMoveEnd();
		}
		currentItem = event.target.container;
		addText(currentItem, "test");
		Drag.stopDrag(event.target.container);
		event.target.mouseY = Utensil.mouseY(document.body, event);
		document.addEventListener("mousemove", onRotating);
		document.addEventListener("mouseup", endRotating);
	}

	function onRotating(event) {
		var obj = currentItem;

		var currentRotation = 0;
		var sp = obj.style.webkitTransform.split("rotate(");
		if(sp[1])
			currentRotation = sp[1].split("deg)")[0];
		var dif = event.target.mouseY - Utensil.mouseY(document.body, event);
		currentRotation = parseInt(currentRotation) - parseInt(dif);
		event.target.mouseY = Utensil.mouseY(document.body, event);
		if(obj.style.webkitTransform.indexOf("rotate") > -1) {
			obj.style.webkitTransform = obj.style.webkitTransform.replace(/rotate(.*?)deg/, "rotate(" + currentRotation + "deg");
		} else {
			obj.style.webkitTransform += "rotate(" + currentRotation + "deg)";
		}
	}

	function endRotating() {
		console.log(box.getAttribute("style"))
		document.removeEventListener("mousemove", onRotating);
		document.removeEventListener("mouseup", endRotating);
		Drag.startDrag(box, {
			x : 0,
			y : 0
		});

		if(frameSet.currentFrameIndex == 0) {

			createStyle(box, box.style.cssText, 0);
			frameSet.currentFrameIndex++;
		} else {

			createStyle(box, box.style.cssText, 0.5);
			box.setAttribute("style", "");
			box.className = box.id + "-frame" + 0;
			setTimeout(animate, 100);

		}
	}

	function animate() {
		box.className += " " + box.id + "-frame" + 1;
	}

	function addText(obj, copy) {
		var p;
		if(document.getElementById(obj.id + "-text")) {
			p = document.getElementById(obj.id + "-text");
		} else {
			p = document.createElement("p");
			obj.appendChild(p);
			p.id = obj.id + "-text";
			p.style.margin = "0px";
			p.style.padding = "0px";
			p.style.position = "absolute";
			p.style.top = "0px";
			p.style.width = "100%";
			p.style.height = "100%";
			p.style.zIndex = "0";
			// p.contentEditable = true;
		}

		p.innerHTML = copy;

	}

	function createStyle(obj, style, duration) {
		var style;
		if(!document.getElementById("utensil-animate")) {
			style = document.createElement('style');
			style.type = 'text/css';
			style.id = "utensil-animate";
			document.getElementsByTagName('head')[0].appendChild(style);
		} else {
			style = document.getElementById("utensil-animate");
		}
		style.innerHTML += "." + obj.id + "-frame" + frameSet.currentFrameIndex + "{";
		style.innerHTML += "left:" + obj.style.left + ";";
		style.innerHTML += "top:" + obj.style.top + ";";
		style.innerHTML += "width:" + obj.style.width + ";";
		style.innerHTML += "height:" + obj.style.height + ";";
		style.innerHTML += "background-color:" + obj.style.backgroundColor + ";";
		style.innerHTML += "position:" + obj.style.position + ";";
		style.innerHTML += "margin:" + obj.style.margin + ";";
		style.innerHTML += "padding:" + obj.style.padding + ";";
		style.innerHTML += "-webkit-transform:" + obj.style.webkitTransform + ";";
		style.innerHTML += "-webkit-transition: all" + " " + duration + "s " + "linear" + " 0s" + "; ";
		// for(var prop in style)
		// {
		// style.innerHTML += prop+":" + style[prop] + ";";
		// }
		style.innerHTML += "}";

		// style.innerHTML += ".utensil-animate-" + obj.id + "-frame" + frameSet.currentFrameIndex + "{";
		// style.innerHTML += "left:" + obj.style.left + ";";
		// style.innerHTML += "top:" + obj.style.left + ";";
		// style.innerHTML += "-webkit-transform:" + obj.style.webkitTransform + ";";
		// style.innerHTML += "}";

	}

	var frame = {
		styles : []
	}
	var frameSet = {
		currentFrameIndex : 0,
		frameRate : 35,
		frames : [],
		objects : []
	};
	var settings = {
		objectPrefix : "obj-"
	};
	Main();
}(window));
