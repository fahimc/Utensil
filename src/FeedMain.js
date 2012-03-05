( function(window) {
	var urlLoader;
	var xml;
	var items;
	var touchStart = 0;
	function Main() {
		if(window.addEventListener) {
			window.addEventListener("load", loadComplete);

		} else {
			window.attachEvent("onload", loadComplete);
		}
	}

	function loadComplete() {
		window.addEventListener('resize', onResize);
		document.getElementById('content').addEventListener('touchstart', onTouchStart);
		document.getElementById('content').addEventListener('mousedown', onTouchStart);
		document.getElementById('content').addEventListener('touchmove', onTouchMove);
		document.addEventListener('mouseup', onTouchUp);
		onResize();
		
		if( typeof (Storage) !== "undefined") {
			if((localStorage[0])) {
				var item;
				var div;
				var hr;
				for( i = 0; i <= localStorage.length - 1; i++) {
					key = localStorage.key(i);
					val = localStorage.getItem(key);
					div = document.createElement('div');
					div.className = "row";
					div.innerHTML = val;
					document.getElementById('content').appendChild(div);
					hr = document.createElement('hr');
					hr.className = "sep";
					document.getElementById('content').appendChild(hr);
				}
			}
		} else {
			// Sorry! No web storage support..
		}
		urlLoader = new URLLoader();
		urlLoader.load("../lib/com/php/loader/getPageContent.php", onFeedComplete, "POST", "url=" + "http://rss.slashdot.org/Slashdot/slashdot");
	}

	function onTouchStart(event) {
		event.preventDefault();
		if(event.touches) {
			var touch = event.touches[0];
			touchStart = touch.pageY;
		} else {
			touchStart = mouseY(event.target, event);
			document.addEventListener('mousemove', onTouchMove);
		}
	}

	function onTouchMove(event) {
		event.preventDefault();
		//set up variables
		var parent = document.getElementById('content');
		var top=0;
		var y = 0;
		//check if mobile
		if(event.touches) {
			var touch = event.touches[0];
			y = touch.pageY;
		} else {
			y = mouseY(event.target, event);
		}
		var offset = touchStart - y;
		//get top margin
		if(parent.style.marginTop.replace("px",""))
		{
		
			top=parent.style.marginTop.replace("px","");
		}
		top =	Number(top) + Number(offset);
		//set top margin
		//console.log( "parent",document.getElementById('content').parentNode);
		var heightDiff = parent.parentNode.offsetHeight-parent.offsetHeight;
		if(top<0 && top > heightDiff)
		{
			tween(parent, 0.5, "marginTop", top+"px", "linear" );			
		}
		
		
		//scrollTo(x,);
	}
	function onTouchUp(event)
	{
		console.log('mouseup');
		document.removeEventListener('mousemove', onTouchMove);
	}
	function onFeedComplete(t, x) {
		localStorage.clear();
		var oParser = new DOMParser();
		xml = oParser.parseFromString(decodeURIComponent(t), "text/xml");
		oParser = null;
		document.getElementById('content').innerHtml = "";
		parseData();
	}

	function parseData() {
		var item;
		var div;
		var hr;
		items = xml.getElementsByTagName("item");

		for(var a = 0; a < items.length; a++) {
			item = items[a];
			title = item.getElementsByTagName("title")[0];
			div = document.createElement('div');
			div.className = "row";
			div.innerHTML = title.childNodes[0].nodeValue;
			localStorage.setItem(a, title.childNodes[0].nodeValue);
			document.getElementById('content').appendChild(div);
			hr = document.createElement('hr');
			hr.className = "sep";
			document.getElementById('content').appendChild(hr);
		}
	}
	function onResize()
	{
		document.getElementById('wrapper').style.height = (stageHeight()-20)+"px";
	}
	Main();
}(window));
