( function(window) {
	var div;
	var startX=0;
	var startY=0;
	function Main() {
		if(window.addEventListener) {
			window.addEventListener("load", loadComplete);

		} else {
			window.attachEvent("onload", loadComplete);
		}
	}

	function loadComplete() {
		document.body.addEventListener("mousedown", onDocDown);
		document.addEventListener("mouseup", mouseUp);
	}
	function onDocDown(event)
	{
		if(event.target==document.body)
		{
			createDiv(event);
		}else{
			onClick(event)
		}
	}
	function createDiv(event) {
		console.log()
		var scrollX = 0;
		var scrollY = 0;
		if(Browser.isIE) {
			scrollX = document.documentElement.scrollLeft;
			scrollY = document.documentElement.scrollTop;
		} else {
			scrollX = window.scrollX;
			scrollY = window.scrollY;
		}

		var left = parseInt(getX(event.target) + mouseX(event.target, event) + scrollX - startX);
		var top = parseInt(getY(event.target) + mouseY(event.target, event) + scrollY - startY);
		startX = left;
		//startX = mouseX(event.target, event);
		startY = top;
		//startY = mouseY(event.target, event);
		console.log(startX, startY);
		div = document.createElement("div");
		div.contentEditable = "true";
		div.style.position = "absolute";
		div.style.border = "1 px dotted";
		div.style.left = left + "px";
		div.style.top = top + "px";
		document.body.appendChild(div);
		document.addEventListener("mousemove", sizeDiv);
	}
	function onClick()
	{
		console.log("click");
	}
	function sizeDiv(event) {
		var scrollX = 0;
		var scrollY = 0;
		if(Browser.isIE) {
			scrollX = document.documentElement.scrollLeft;
			scrollY = document.documentElement.scrollTop;
		} else {
			scrollX = window.scrollX;
			scrollY = window.scrollY;
		}

		var left = parseInt(getX(event.target) + mouseX(event.target, event) + scrollX - startX);
		var top = parseInt(getY(event.target) + mouseY(event.target, event) + scrollY - startY);
		var width = left ;
		var height = top;
		div.style.width = width + "px";
		div.style.height = height + "px";
	}

	function mouseUp() {
		document.removeEventListener("mousemove", sizeDiv);
		startX=0;
		startY=0;
	}

	Main()
}(window));
