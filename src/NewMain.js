( function(window) {
	function Main()
	{
		window.addEventListener("load",onLoad);
	}
	function onLoad(event)
	{
		Utensil.startDrag(document.getElementById('box'));
		Utensil.newEvent("test");
		console.log(Utensil.events.test);
		Utensil.addListener(document,Utensil.events.test,onEvent);
		Utensil.dispatchEvent(Utensil.events.test,document);
	}
	function onEvent(event)
	{
		console.log("dispatch recieved");
	}
Main();
}(window));