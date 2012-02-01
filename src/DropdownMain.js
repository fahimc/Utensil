( function(window) {
	var totalVideos = 10;
	var currentIndex = 0;
	var videoArray = new Array();
	function Main() {
		window.addEventListener('load', init);

	}

	function init() {

		var video;
		var i = 0;
		for( i = 0; i < totalVideos; i++) {
			video = document.createElement('video');
			video.type = "video/mp4";
			video.src = "resource/video/Start_x264.webm";
			video.width = "320";
			video.height = "240";
			document.body.appendChild(video);
			videoArray.push(video);

		}
		video = null;
		document.addEventListener('keypress', onkeydown);

	}

	function onkeydown(event) {
		var unicode = event.charCode ? event.charCode : event.keyCode;
		var actualkey = String.fromCharCode(unicode);
		switch(actualkey) {
			case "q":
				videoArray[0].play();
				break;
			case  "w":
				videoArray[1].play();
				break;
			case  "r":
				videoArray[2].play();
				break;
			case  "t":
				videoArray[3].play();
				break;
			case  "t":
				videoArray[4].play();
				break;
			case  "y":
				videoArray[5].play();
				break;
			case  "u":
				videoArray[6].play();
				break;
			case  "i":
				videoArray[7].play();
				break;
			case  "o":
				videoArray[8].play();
				break;
			case  "p":
				videoArray[9].play();
				break;
			case 65:
				videoArray[10].play();
				break;
		}
	}

	function playVideo() {
		videoArray[currentIndex].play();
		currentIndex++;
		if(currentIndex < videoArray.length)
			setTimeout(playVideo, 100);
	}

	Main();
}(window));
