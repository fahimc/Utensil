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
		Utensil.tweenLite(document.getElementById('box1'),3,{left:"400px",top:"800px"});
		// Utensil.EnterFrame.start();
	}
	function onEnterFrame()
	{

		console.log(Utensil.hitTestObject(document.getElementById('box'),document.getElementById('box1')));
	}
	Main();
}(window));
