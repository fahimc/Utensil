// JavaScript Document
( function(window) {
	window.createElement = function(value) {
		return document.createElement(value);
	}
	window.addChild = function(value) {
		document.body.appendChild(value);
	}
	window.stageWidth = function() {

		return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	}
	window.stageHeight = function() {
		return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	}
	window.getX = function(obj, raw) {
		if(raw) {
			var curleft = 0;
			var curtop = 0;
			if(obj.offsetParent) {
				do {
					curleft += obj.offsetLeft;
					curtop += obj.offsetTop;
				} while (obj = obj.offsetParent);
			}
			return curleft;
		}
		return isNaN(parseInt(obj.style.left.replace("px", ""))) ? 0 : parseInt(obj.style.left.replace("px", ""));
	}
	window.getY = function(obj, raw) {
		if(raw) {
			var curtop = 0;
			if(obj.offsetParent)
				while(1) {
					curtop += obj.style.top;
					if(!obj.offsetParent)
						break;
					obj = obj.offsetParent;
				}
			else if(obj.y)
				curtop += obj.y;
			return curtop;
		}
		return isNaN(parseInt(obj.style.top.replace("px", ""))) ? 0 : parseInt(obj.style.top.replace("px", ""));
	}
	window.getWidth = function(obj) {
		return isNaN(parseInt(obj.style.width.replace("px", ""))) ? 0 : parseInt(obj.style.width.replace("px", ""));
	}
	window.getHeight = function(obj) {
		return isNaN(parseInt(obj.style.height.replace("px", ""))) ? 0 : parseInt(obj.style.height.replace("px", ""));
	}
	window.trace = function() {
		var toSend = "";
		for(var i in arguments) {
			toSend += arguments[i] + ",";
		}
		alert(toSend);

	}
	window.resetStyle = function(obj) {
		obj.style.position = "absolute";
		obj.style.margin = "0";
		obj.style.padding = "0";

	}
	/*
	 mouse X Y function
	 */
	window.mouseX = function(elem, e) {
		var x;
		if(e.pageX) {
			x = e.pageX;
		} else {
			x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;

		}
		x -= elem.offsetLeft;
		return x;
	}
	window.mouseY = function(elem, e) {
		var y;
		if(e.pageY) {
			y = e.pageY;
		} else {
			y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;

		}
		y -= elem.offsetTop;
		return y;
	}
	/*
	 mouseleave function
	 */
	window.mouseLeave = function(e) {

		if(!e)
			var e = window.event;
		var tg = (window.event) ? e.srcElement : e.target;
		var reltg = (e.relatedTarget) ? e.relatedTarget : e.toElement;
		while(reltg != tg && reltg.nodeName != 'BODY')
		reltg = reltg.parentNode
		if(reltg == tg)
			return;
		// Mouseout took place when mouse actually left layer
		// Handle event
	}
	/*
	 ImageLoader function
	 */
	window.ImageLoader = function(src, callback) {
		var image = new Image();
		image.onload = function() { callback(image);
		};
		image.src = src;
	}
	/*
	 postURL function
	 */
	window.postURL = function(path, params, method) {
		method = method || "post";
		// Set method to post by default, if not specified.

		// The rest of this code assumes you are not using a library.
		// It can be made less wordy if you use one.
		var form = document.createElement("form");
		form.setAttribute("method", method);
		form.setAttribute("action", path);

		var hiddenField = document.createElement("input");
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("name", "data");
		hiddenField.setAttribute("value", params);

		form.appendChild(hiddenField);

		document.body.appendChild(form);
		form.submit();
	}
	/*
	 get url
	 */
	window.URLLoader = function() {
		var xhttp;
		var cb;
		this.load = function(url, callback, method, params) {
			cb = callback;
			if(window.XMLHttpRequest) {
				xhttp = new XMLHttpRequest();
			} else// IE 5/6
			{
				xhttp = new ActiveXObject("Microsoft.XMLHTTP");
			}

			if(!method)
				method = "GET";
			if(method == "GET" && params) {
				url += "?" + params;

			}
			xhttp.onreadystatechange = this.onStatus;
			xhttp.open(method, url, true);
			if(method == "POST") {
				xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xhttp.setRequestHeader("Content-length", params.length);
				xhttp.setRequestHeader("Connection", "close");
			}
			try {
				xhttp.send(params);
			} catch(e) {
				trace("here");
			}
		}

		this.onStatus = function(e) {
			if(xhttp.readyState == 4) {
				if(xhttp.status == 200 || window.location.href.indexOf("http") == -1) {

					//public.xml=xhttp.responseText;

					cb(xhttp.responseText, xhttp.responseXML);

				} else {
					//trace("error 1")
				}
			} else {
				//trace("error 2")
			}
		}
	}
	/*
	 Tween function
	 */
	window.tween = function(obj, duration, prop, value, type, delay, callback) {
		var maxVal;
		var currentVal;
		var direction;
		var substract;
		//add a callback
		if(callback)
			obj.addEventListener('webkitTransitionEnd', innerCallback, false);

		/* Tween types
		ease-out
		ease-in
		linear
		*/
		//set tween props
		if(!type)
			type = "linear";
		if(!delay) {
			delay = "0s";

		} else {
			delay += "s";
		}
		if(!obj.style[prop]) {
			obj.style[prop] = "0px";
		}
		if(getTransformProperty(obj)) {
			obj.style[getTransformProperty(obj)] = prop + " " + duration + "s " + type + " " + delay;
			setTimeout(setProp, 20);
		} else {
			maxVal = value.split("px")[0];
			currentVal = obj.style[prop].split("px")[0]
			direction = parseInt(maxVal) > parseInt(currentVal) ? 1 : 0;
			substract = Math.abs(currentVal - maxVal) / frameRate;
			var tweenTimer = setInterval(moveTween, duration * frameRate);

		}
		function moveTween() {

			if(direction == 1) {
				currentVal = parseInt(currentVal) + parseInt(substract);
				if(currentVal > maxVal)
					currentVal = maxVal;
			} else {
				currentVal -= substract;
				if(currentVal < maxVal)
					currentVal = maxVal;
			}
			obj.style[prop] = currentVal + "px";
			if(currentVal == maxVal) {
				clearInterval(tweenTimer);
				tweenTimer = null;
				maxVal=null;
				currentVal=null;
				direction=null;
				substract=null;
			}
		}

		function setProp() {
			obj.style[prop] = value;
		}

		function innerCallback() {
			obj.removeEventListener('webkitTransitionEnd', innerCallback, false);
			callback();
		}

	}
	function getTransformProperty(element) {
		// Note that in some versions of IE9 it is critical that
		// msTransform appear in this list before MozTransform
		var properties = ['transition', 'WebkitTransition', 'msTransition', 'MozTransition', 'OTransition'];
		var p;
		while( p = properties.shift()) {

			if( typeof element.style[p] != 'undefined') {
				// switch(p)
				// {
				// case 'transition':
				// p = "";
				// break;
				// case 'WebkitTransition':
				// p = "-webkit-";
				// break;
				// case 'MozTransition':
				// p = "-moz-";
				// break;
				// case 'OTransition':
				// p = "-o-";
				// break;
				// }
				return p;
			}
		}
		return false;
	}


	window.Browser = {

		isIE : (navigator.appVersion.indexOf("MSIE") != -1),
		isIE9 : (getInternetExplorerVersion() > 8),
		isMobile : (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()))
	};
	function getInternetExplorerVersion()
	// Returns the version of Internet Explorer or a -1
	// (indicating the use of another browser).
	{
		var rv = -1;
		// Return value assumes failure.
		if(navigator.appName == 'Microsoft Internet Explorer') {
			var ua = navigator.userAgent;
			var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
			if(re.exec(ua) != null)
				rv = parseFloat(RegExp.$1);
		}
		return rv;
	}

}(window));
