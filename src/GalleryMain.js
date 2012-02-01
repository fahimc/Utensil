( function(window) {
	var xmlLocation = "resource/xml/gallery.xml";
	var imageHolder;
	var thumbMask;
	var thumbHolder;
	var imgHeight = 200;
	var thumbGap;
	var thumbWidth;
	var MainGalleryImage = "MainGalleryImage";
	var currentIndex = 0;
	var totalItems = 0;
	function Main() {
		window.addEventListener("load", loadComplete);
	}

	function loadComplete() {
		imageHolder = document.getElementById("imageHolder");
		thumbMask = document.getElementById("thumbnails");
		thumbHolder = document.createElement("div");
		thumbHolder.style.position = "absolute";
		document.getElementById("leftButton").addEventListener(MouseEvent.CLICK, onLeftButtonDown);
		document.getElementById("rightButton").addEventListener(MouseEvent.CLICK, onRightButtonDown);
		if(document.attachEvent) {
			document.getElementById("leftButton").attachEvent(MouseEvent.CLICK, onLeftButtonDown);
			document.getElementById("rightButton").attachEvent(MouseEvent.CLICK, onRightButtonDown);
		}
		urlLoader = new URLLoader();
		urlLoader.load(xmlLocation, onXMLComplete);

	}

	function onXMLComplete(data, xm) {
		var xmlDoc;
		if(window.DOMParser) {
			parser = new DOMParser();
			xmlDoc = parser.parseFromString(data, "text/xml");
		} else// Internet Explorer
		{
			xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async = "false";
			xmlDoc.loadXML(data);
		}

		var items = xmlDoc.getElementsByTagName('image');
		thumbWidth = xmlDoc.getElementsByTagName('thumbWidth');
		var thumbHeight = xmlDoc.getElementsByTagName('thumbHeight');
		var mainHeight = xmlDoc.getElementsByTagName('mainHeight');
		var mainWidth = xmlDoc.getElementsByTagName('mainWidth');

		imageHolder.style.width = mainWidth[0] ? mainWidth[0].childNodes[0].nodeValue + "px" : "300px";
		imageHolder.style.height = mainHeight[0] ? mainHeight[0].childNodes[0].nodeValue + "px" : "300px";
		thumbGap = xmlDoc.getElementsByTagName('thumbGap');
		thumbWidth = thumbWidth[0] ? thumbWidth[0].childNodes[0].nodeValue : 100;
		thumbHeight = thumbHeight[0] ? thumbHeight[0].childNodes[0].nodeValue : 100;
		thumbGap = thumbGap[0] ? thumbGap[0].childNodes[0].nodeValue : 0;

		thumbMask.appendChild(thumbHolder);
		totalItems = items.length;
		for(var i = 0; i < items.length; i++) {
			var img = new Image();
			img.src = items[i].childNodes[0].nodeValue;
			if(i == 0) {
				var mimg = new Image();
				mimg.id = MainGalleryImage;
				mimg.src = items[i].childNodes[0].nodeValue;
				mimg.width = getWidth(imageHolder);
				mimg.height = getHeight(imageHolder);
				imageHolder.appendChild(mimg);
				mimg = null;
			}
			img.width = thumbWidth;
			img.height = thumbHeight;
			img.style.position = "absolute";
			img.style.left = (i * (parseInt(thumbWidth) + parseInt(thumbGap))) + "px";
			img.style.cursor = "pointer";
			img.addEventListener(MouseEvent.CLICK, onThumbClick);
			thumbHolder.appendChild(img);
			img = null;
		}
	}

	function onThumbClick(e) {
		document.getElementById("MainGalleryImage").src = e.target.src;
	}

	function onLeftButtonDown(e) {
		if(thumbMask.offsetWidth - ((parseInt(thumbWidth) + parseInt(thumbGap)) * totalItems) < (-((parseInt(thumbWidth) + parseInt(thumbGap)) * (parseInt(currentIndex) + 1)))) {
			currentIndex++;
			var xx = (-((parseInt(thumbWidth) + parseInt(thumbGap)) * currentIndex)) + "px";
			tween(thumbHolder, 0.5, "left", xx, "linear", 0);
		}
	}

	function onRightButtonDown(e) {
		if(getX(thumbHolder) < 0) {
			currentIndex--;
			var xx = (-((parseInt(thumbWidth) + parseInt(thumbGap)) * currentIndex)) + "px";
			tween(thumbHolder, 0.5, "left", xx, "ease-out", 0);
		}
	}

	Main()
}(window));
