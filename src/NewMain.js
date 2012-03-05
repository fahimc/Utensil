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
		Utensil.tween(document.getElementById('box'),1,{left:"200px",top:"200px",opacity:0.5,scale:0.5},"ease-out");
		Utensil.ImageLoader("http://2.bp.blogspot.com/-vkGvilF2Va4/ThIin4ayhSI/AAAAAAAAGjw/SrAAwq-LjnY/s1600/M11%2BOS%2BSct.jpg",onComplete);
	}
	
	function onComplete(t,x)
	{
		Utensil.log("done");
	}
	Main();
}(window));
