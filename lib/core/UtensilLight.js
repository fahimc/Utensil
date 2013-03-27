// JavaScript Document
( function(window) {
	/* @class Utensil
	 * @desc JavaScript Toolkit
	 */
	window.Utensil = {
		/* @method
		 * @desc get/set the stage Element
		 * @return Null
		 */
		_stage:window,
		stage:function(value)
		{
			if(value!=undefined)
			this._stage = value;
			return this._stage;
		},
		/* @method
		 * @desc Add an element to the body.
		 * @return Null
		 */
		addChild : function(value) {
			document.body.appendChild(value);
		},
		/* @method
		 * @desc will return the width of the window.
		 * @return Number
		*/
		stageWidth : function() {

			return this.stage()==window?(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth):this.stage().clientWidth;
		},
		/* @method
		 * @desc will return the height of the window.
		 * @return Number
		*/
		stageHeight : function() {
			return this.stage()==window?(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight):this.stage().clientHeight;
		},
		/* @method
		 * @desc Provide it with an element and it will return the X position.
		 * @return Number
		*/
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
		/* @method
		 * @desc Provide it with an element and it will return the Y position.
		 * @return Number
		*/
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
		/* @method
		 * @desc Provide it with an element and it will return the width.
		 * @return Number
		*/
		getWidth : function(obj) {
			return isNaN(parseInt(obj.style.width.replace("px", ""))) ? 0 : parseInt(obj.style.width.replace("px", ""));
		},
		/* @method
		 * @desc Provide it with an element and it will return the height.
		 * @return Number
		*/
		getHeight : function(obj) {
			return isNaN(parseInt(obj.style.height.replace("px", ""))) ? 0 : parseInt(obj.style.height.replace("px", ""));
		},
		/* @method
		 * @desc Sends out comma delimited alerts.
		 * @return Null
		*/
		trace : function() {
			var toSend = "";
			for(var i in arguments) {
				toSend += arguments[i] + ",";
			}
			alert(toSend);

		},
		/* @method
		 * @desc Resets the element provided.
		 * @return Null
		*/
		resetStyle : function(obj) {
			obj.style.position = "absolute";
			obj.style.margin = "0";
			obj.style.padding = "0";

		},
		/* @method
		 * @desc Provide it with an element and an event to return the mouse X position.
		 * @return Number
		*/
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
		/* @method
		 * @desc Provide it with an element and an event to return the mouse Y position.
		 * @return Number
		*/
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
		/* @method
		 * @desc loads an Image and calls a callback function.
		 * @return Null
		*/
		ImageLoader : function(src, callback) {
			var image = new Image();
			image.onload = function() { callback(image);
			};
			image.src = src;
		},
		/* @method
		 * @desc Send data via POST or GET methods
		 * @return Null
		*/
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
		/* @method
		 * @desc Load a URL/File
		 * @return Null
		*/
		URLLoader : {
			xhttp : "",
			cb : "",
			load : function(url, callback, method, params) {
				this.cb = callback;
				if(window.XMLHttpRequest) {
					this.xhttp = new XMLHttpRequest();
				} else// IE 5/6
				{
					this.xhttp = new ActiveXObject("Microsoft.XMLHTTP");
				}

				if(!method)
					method = "GET";
				if(method == "GET" && params) {
					url += "?" + params;

				}
				var par = this;
				this.xhttp.onreadystatechange = function() {
					par.onStatus()
				};
				this.xhttp.open(method, url, true);
				if(method == "POST") {
					this.xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					this.xhttp.setRequestHeader("Content-length", params.length);
					this.xhttp.setRequestHeader("Connection", "close");
				}
				try {
					this.xhttp.send(params);
				} catch(e) {

				}
			},
			onStatus : function(e) {
				if(this.xhttp.readyState == 4) {
					if(this.xhttp.status == 200 || window.location.href.indexOf("http") == -1) {
						this.cb(this.xhttp.responseText, this.xhttp.responseXML);

					} else {
						//trace("error 1")
					}
				} else {
					//trace("error 2")
				}
			}
		},
		
		/* @
		 * @desc Provides detail of the browser.
		 * @return Null
		*/
		Browser : {
			/* 
			 * @desc Browser.getInternetExplorerVersion() Gets the IE Version.
			 * @return String
			*/
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
			/* 
			 * @desc Browser.isIE returns true if broswer is IE.
			 * @return Boolean
			*/
			isIE : (navigator.appVersion.indexOf("MSIE") != -1),
			/* 
			 * @desc Browser.isIE9() returns true if broswer is IE9.
			 * @return Boolean
			*/
			isIE9 : function() {
				return Utensil.Browser.getInternetExplorerVersion() > 8
			},
			/* 
			 * @desc Browser.isMobile returns true if broswer is mobile.
			 * @return Boolean
			*/
			isMobile : (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()))

		},
		/* @method
		 * @desc Provide it an event and it will get the target (cross-broswer).
		 * @return String
		*/
		getTarget : function(event) {
			return (event.currentTarget) ? event.currentTarget : event.srcElement;
		},
		events : {

		},
		/* @method
		 * @desc A Cross Browser event listener.
		 * @return Null
		*/
		addListener : function(obj, event, callback) {
			if(obj.attachEvent) {
				obj.attachEvent("on" + event, callback);
			} else {
				obj.addEventListener(event, callback);
			}
		},
		/* @method
		 * @desc A Cross Browser remove event listener.
		 * @return Null
		*/
		removeListener : function(obj, event, callback) {
			if(obj.detachEvent) {
				obj.detachEvent("on" + event, callback);
			} else {
				obj.removeEventListener(event, callback);
			}
		},
		/* @method
		 * @desc get url parameters
		 * @return a value
		*/
		loadParams : {
				getValue : function(name) {
					name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
					var regexS = "[\\?&]" + name + "=([^&#]*)";
					var regex = new RegExp(regexS);
					var results = regex.exec(window.location.href);
					if (results == null)
						return "";
					else
						return results[1];
				},
				getHostURL : function() {
					var url = new String(document.URL.replace(/\/[^\/]+$/, ''));
					if (url.charAt(url.length - 1) != "/")
						url = url + "/";
					return url;
				}
			},
		/* @method
		 * @desc Add packages to the Utensil framework.
		 * @return Null
		*/
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
