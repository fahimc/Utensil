( function(window) {
	var obj = {
		att : "hello",
		get : function() {
			return this.att;
		}
	}
	var new_obj={
	};
	function Main() {
		window.addEventListener("load", onLoad);
	}

	function onLoad(event) {
		Utensil.startDrag(document.getElementById('box'), 100, 20, 400, 400);
		Utensil.extend(new_obj,obj);
	}

	
	Main();
}(window));
