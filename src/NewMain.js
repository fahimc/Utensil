( function(window) {
	
	function Main() {
		if(window.addEventListener) {
			window.addEventListener("load", onLoad);
		} else {
			window.attachEvent("onload", onLoad);
		}
	}

	function onLoad(event) {
		var box = document.getElementById('box');
		var _ = Utensil;
		_.tween(box,1,{left:"200px",top:"200px",opacity:0.5,scale:0.5},"ease-out",onComplete);
		
	}
	
	function onComplete()
	{
		_.log("done");
	}
	Main();
}(window));
