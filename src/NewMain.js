( function(window) {
	var obj = {
		att : "hello",
		get : function() {
			return this.att;
		}
	}
	var new_obj = {
	};
	function Main() {
		if(window.addEventListener) {
			window.addEventListener("load", onLoad);
		} else {
			window.attachEvent("onload", onLoad);
		}
	}

	function onLoad(event) {
		Utensil.startDrag(document.getElementById('box'), 100, 20, 400, 400);
		Utensil.extend(new_obj, obj);
		Utensil.extend(new_obj, Element);
		Utensil.log(new_obj);
		Utensil.EnterFrame.frameRate=300;
		Utensil.EnterFrame.addEvent(onEnterFrame);
		setTimeout(onEnterFrame,1);
		// Utensil.EnterFrame.start();
	}
	function onEnterFrame()
	{

		Utensil.tweenLite(document.getElementById('box'),3,{rotate:10,left:"100px",top:"200px",opacity:0.5,scale:0.8},"ease-out");
	}
	Main();
}(window));
