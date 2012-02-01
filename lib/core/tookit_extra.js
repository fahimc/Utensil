var draggableObject;
var boundary;
window.frameRate = 35;
function onEnterFrame() {

	this.timer
	var events = new Array();
	this.start = function() {
		this.timer = setInterval(todo, window.frameRate);
	}
	function todo() {
		for(var a = 0; a < events.length; a++) {
			events[a]();
		}
	}


	this.stop = function() {
		clearInterval(this.timer);
		this.timer = null;

	}
	this.addEvent = function(callback) {
		events.push(callback);
	}
	this.removeEvent = function(callback) {
		var index;
		for(var a = 0; a < events.length; a++) {
			if(events[a] == callback) {
				index = a;
			}
		}
		if(index) {
			events.splice(index, 1);
		}
	}
}

window.EnterFrame = new onEnterFrame();
window.addUIEventListener = function(obj, event, callback) {
	if(Browser.isIE) {
		obj.attachEvent(event, callback);
	} else {
		obj.addEventListener(event, callback);
	}
}
window.removeUIEventListener = function(obj, event, callback) {
	if(Browser.isIE) {
		obj.detachEvent(event, callback);
	} else {
		obj.removeEventListener(event, callback);
	}
}
window.startDrag = function(obj, x, y, w, h) {
	if(x || w || h || y) {
		boundary = new Array();
		boundary["x"] = x;
		boundary["y"] = y ? y : 0;
		boundary["w"] = w;
		boundary["h"] = h;
	}
	draggableObject = obj
	if(Browser.isIE) {
		obj.attachEvent(MouseEvent.MOUSE_DOWN, toolkitDragMouseDown);
		document.attachEvent(MouseEvent.MOUSE_UP, toolkitDragMouseUp);
	} else {
		obj.addEventListener(MouseEvent.MOUSE_DOWN, toolkitDragMouseDown);
		document.addEventListener(MouseEvent.MOUSE_UP, toolkitDragMouseUp);
	}

}
window.stopDrag = function(obj) {
	if(Browser.isIE) {
		obj.detachEvent(MouseEvent.MOUSE_DOWN, toolkitDragMouseDown);
		document.detachEvent(MouseEvent.MOUSE_UP, toolkitDragMouseUp);
	} else {
		obj.removeEventListener(MouseEvent.MOUSE_DOWN, toolkitDragMouseDown);
		document.removeEventListener(MouseEvent.MOUSE_UP, toolkitDragMouseUp);
	}
}
function toolkitDragMouseUp(event) {
	preventDefault(event);
	if(Browser.isIE) {
		document.detachEvent(MouseEvent.MOUSE_MOVE, toolkitDragMouseMove);
	} else {
		document.removeEventListener(MouseEvent.MOUSE_MOVE, toolkitDragMouseMove);

	}
}

function toolkitDragMouseMove(event) {

	preventDefault(event);
	var scrollX = 0;
	var scrollY = 0;
	if(Browser.isIE) {
		scrollX = document.documentElement.scrollLeft;
		scrollY = document.documentElement.scrollTop;
	} else {
		scrollX = window.scrollX;
		scrollY = window.scrollY;
	}
	var left = parseInt(getX(draggableObject) + mouseX(draggableObject, event) + scrollX - startX);
	var top = parseInt(getY(draggableObject) + mouseY(draggableObject, event) + scrollY - startY);
	if(boundary) {

		if(left < boundary["x"]) {
			left = boundary["x"];
		}
		if(top < boundary["y"]) {
			top = boundary["y"];
		}
		if(top > boundary["h"]) {
			top = boundary["h"];
		}
		if(boundary["w"] && left > parseInt(boundary["x"]) + parseInt(boundary["w"])) {
			left = parseInt(boundary["x"]) + parseInt(boundary["w"]);
		}
	}
	draggableObject.style.left = left + "px";
	draggableObject.style.top = top + "px";
}

function toolkitDragMouseDown(event) {
	startX = mouseX(draggableObject, event);
	startY = mouseY(draggableObject, event);
	preventDefault(event);
	if(Browser.isIE) {

		document.attachEvent(MouseEvent.MOUSE_MOVE, toolkitDragMouseMove);

	} else {
		document.addEventListener(MouseEvent.MOUSE_MOVE, toolkitDragMouseMove);
	}
}

function preventDefault(event) {
	if(Browser.isIE) {
		window.event.cancelBubble = true;
		window.event.returnValue = false;
	} else {
		event.preventDefault();
	}
}
function loadParams(){

	this.getValue = function(name) 
	{

	   name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
 	   var regexS = "[\\?&]"+name+"=([^&#]*)";
       var regex = new RegExp( regexS );
       var results = regex.exec( window.location.href );
       if( results == null )
       return "";
       else
       return results[1];
	}
	this.getHostURL=function()
	{
		var url =new String(document.URL.replace(/\/[^\/]+$/, ''));
		if(url.charAt(url.length-1)!="/")url = url+"/";
		return url;
	}
}
window.loadParams = new loadParams();