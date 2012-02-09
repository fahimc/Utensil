( function(window) {

	function Main() {
		if(window.addEventListener) {
			window.addEventListener("load", loadComplete);

		} else {
			window.attachEvent("onload", loadComplete);
		}
	}

	function loadComplete() {
		
		var sendButton = document.getElementById('sendButton');
		addUIEventListener(sendButton, MouseEvent.CLICK, onSend);
	}

	function onSend() {
		var message = document.getElementById('logMessage');

		log(message.value);
	}

	Main()
}(window));
