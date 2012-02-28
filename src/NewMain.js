( function(window) {
	function Main()
	{
		window.addEventListener("load",onLoad);
	}
	function onLoad(event)
	{
		console.log("here",Utensil.stageWidth());
	}
Main();
}(window));