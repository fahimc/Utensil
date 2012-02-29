( function(window) {
	function Main()
	{
		window.addEventListener("load",onLoad);
	}
	function onLoad(event)
	{
		Utensil.startDrag(document.getElementById('box'));
		Utensil.newEvent("test");
		console.log(Utensil.Event.test);
	}
Main();
}(window));