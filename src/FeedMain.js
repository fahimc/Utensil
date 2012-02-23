( function(window) {
	var urlLoader;
	var xml;
	var items;
	function Main() {
		if(window.addEventListener) {
			window.addEventListener("load", loadComplete);

		} else {
			window.attachEvent("onload", loadComplete);
		}
	}

	function loadComplete() {
		
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

	function onFeedComplete(t, x) {
		localStorage.clear();
		var oParser = new DOMParser();
		xml = oParser.parseFromString(decodeURIComponent(t), "text/xml");
		oParser = null;
		document.getElementById('content').innerHtml="";
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

	Main();
}(window));
