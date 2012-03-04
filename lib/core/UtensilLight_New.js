// JavaScript Document
( function(window) {
	window.Utensil = {
		createElement : function(value) {
			return document.createElement(value);
		},
		addChild : function(value) {
			document.body.appendChild(value);
		},
		stageWidth : function() {

			return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		},
		stageHeight : function() {
			return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		},
		getX : function(obj, raw) {
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
		},
		getY : function(obj, raw) {
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
		},
		getWidth : function(obj) {
			return isNaN(parseInt(obj.style.width.replace("px", ""))) ? 0 : parseInt(obj.style.width.replace("px", ""));
		},
		getHeight : function(obj) {
			return isNaN(parseInt(obj.style.height.replace("px", ""))) ? 0 : parseInt(obj.style.height.replace("px", ""));
		},
		trace : function() {
			var toSend = "";
			for(var i in arguments) {
				toSend += arguments[i] + ",";
			}
			alert(toSend);

		},
		resetStyle : function(obj) {
			obj.style.position = "absolute";
			obj.style.margin = "0";
			obj.style.padding = "0";

		},
		mouseX : function(elem, e) {
			var x;
			if(e.pageX) {
				x = e.pageX;
			} else {
				x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;

			}
			x -= elem.offsetLeft;
			return x;
		},
		mouseY : function(elem, e) {
			var y;
			if(e.pageY) {
				y = e.pageY;
			} else {
				y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;

			}
			y -= elem.offsetTop;
			return y;
		},
		mouseLeave : function(e) {

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
		},
		ImageLoader : function(src, callback) {
			var image = new Image();
			image.onload = function() { callback(image);
			};
			image.src = src;
		},
		postURL : function(path, params, method) {
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
		},
		URLLoader : function() {
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
		},
		tween : function(obj, duration, prop, value, type, delay, callback) {
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
			if(Utensil.getTransformProperty(obj)) {
				obj.style[Utensil.getTransformProperty(obj)] = prop + " " + duration + "s " + type + " " + delay;
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
					maxVal = null;
					currentVal = null;
					direction = null;
					substract = null;
				}
			}

			function setProp() {
				obj.style[prop] = value;
			}

			function innerCallback() {
				obj.removeEventListener('webkitTransitionEnd', innerCallback, false);
				callback();
			}

		},
		tweener : {
			index : 0,
			styleTags : new Array(),
			rotate : function(props, value) {
				if(Utensil.getTransformProperty() != "ie") {
					props.transform += " rotate(" + value + "deg)";
				} else {
					props.filter += "progid:DXImageTransform.Microsoft.Matrix(M11=0.9914448613738104, M12=-0.13052619222005157,M21=0.13052619222005157, M22=0.9914448613738104, sizingMethod='auto expand')";
				}
			},
			scale : function(props, value) {
				if(Utensil.getTransformProperty() != "ie") {
					props.transform += " scale(" + value + ")";
				} else {
					props.filter += "progid:DXImageTransform.Microsoft.Matrix(M11=0.9999025240093042, M12=-0.013962180339145272, M21=0.013962180339145272, M22=0.9999025240093042,SizingMethod='auto expand')";
				}
			},
			transition : function(props, prop, value) {
				if(Utensil.getTransformProperty() != "ie") {
					switch(prop) {
						case "left":
							props.transform += " translateX(" + value + ") ";
							break;
						case "top":
							props.transform += " translateY(" + value + ") ";
							break;
						case "rotateY":
							props.transform += " rotateY(" + value + "deg) ";
							props.transition += Utensil.getTransformProperty() + "transform-style: preserve-3d; ";
							break;
						default:
							props.transition += prop + ":" + value + ";";
					}

				}
			}
		},
		tweenLite : function(obj, duration, args, type, delay, callback) {
			/* Tween types
			 ease-out
			 ease-in
			 linear
			 */
			if(!duration)
				duration = 1;
			if(!type)
				type = "linear";
			if(!delay) {
				delay = "0s";

			} else {
				delay += "s";
			}
			var props = {
				transform : "",
				transition : "",
				filter : "",

			};
			for(var prop in args) {
				console.log(prop)
				if(this.tweener[prop]) {
					this.tweener[prop](props, args[prop]);
				} else {

					this.tweener.transition(props, prop, args[prop]);

				}
			}
			if(callback)
				obj.addEventListener('webkitTransitionEnd', innerCallback, false);

			var index = this.tweener.index++;
			var style = document.createElement('style');
			style.type = 'text/css';
			style.id = "utensil-animate-" + index;
			style.innerHTML = ".utensil-animate-" + index + "{";
			if(this.getTransformProperty() != "ie") {
				style.innerHTML += props.transition;
				style.innerHTML += this.getTransformProperty() + "transform: " + props.transform + "; ";
				style.innerHTML += this.getTransformProperty() + "transition: all" + " " + duration + "s " + type + " " + delay + "; ";
			} else {
				style.innerHTML += "filter: " + props.filter + "; ";
			}
			style.innerHTML += "}";
			this.tweener.styleTags.push("utensil-animate-" + index);
			document.getElementsByTagName('head')[0].appendChild(style);
			obj.className += "utensil-animate-" + index;
			console.log(style.innerHTML);

			function innerCallback() {
				obj.removeEventListener('webkitTransitionEnd', innerCallback, false);
				callback();
			}

		},
		getTransformProperty : function(element) {
			// Note that in some versions of IE9 it is critical that
			// msTransform appear in this list before MozTransform
			var properties = ['transition', 'WebkitTransition', 'msTransition', 'MozTransition', 'OTransition'];
			var p;
			while( p = properties.shift()) {

				if( typeof document.body.style[p] != 'undefined') {
					switch(p) {
						case 'transition':
							p = "";
							break;
						case 'WebkitTransition':
							p = "-webkit-";
							break;
						case 'MozTransition':
							p = "-moz-";
							break;
						case 'OTransition':
							p = "-o-";
							break;
						case 'msTransition':
							p = "-ms-";
							break;
						default:
							p = "ie";
					}
					return p;
				}
			}
			return "ie";
		},
		Browser : {
			getInternetExplorerVersion : function() {
				var rv = -1;
				// Return value assumes failure.
				if(navigator.appName == 'Microsoft Internet Explorer') {
					var ua = navigator.userAgent;
					var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
					if(re.exec(ua) != null)
						rv = parseFloat(RegExp.$1);
				}
				return rv;
			},
			isIE : (navigator.appVersion.indexOf("MSIE") != -1),
			isIE9 : (this.getInternetExplorerVersion > 8),
			isMobile : (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()))

		},
		events : {
		},
		addListener : function(obj, event, callback) {
			if(this.Browser.isIE) {
				obj.attachEvent("on" + event, callback);
			} else {
				obj.addEventListener(event, callback);
			}
		},
		removeListener : function(obj, event, callback) {
			if(this.Browser.isIE) {
				obj.detachEvent("on" + event, callback);
			} else {
				obj.removeEventListener(event, callback);
			}
		},
		addPackage : function(packages, packageName) {
			var parent = this;
			if(packageName && !this[packageName]) {
				this[packageName] = {};
				parent = this[packageName];
			}
			for(var keys in packages) {
				var obj = packages[keys];
				parent[keys] = obj;
			}
		}
	};
}(window));
