( function(window) {
	var UtensilMax = {
		MouseEvent : {
			CLICK : "click",
			MOUSE_DOWN : "mousedown",
			MOUSE_UP : "mouseup",
			MOUSE_MOVE : "mousemove",
		},
		EnterFrame : {
			frameRate : 35,
			timer : null,
			events : new Array(),
			start : function() {
				var t = this;
				this.timer = setInterval(function() {
					t.todo();
				}, this.frameRate);
			},
			todo : function() {
				for(var a = 0; a < this.events.length; a++) {
					this.events[a]();
				}
			},
			stop : function() {
				clearInterval(this.timer);
				this.timer = null;

			},
			addEvent : function(callback) {
				this.events.push(callback);
			},
			removeEvent : function(callback) {
				var index;
				for(var a = 0; a < this.events.length; a++) {
					if(this.events[a] == callback) {
						index = a;
					}
				}
				if(index) {
					this.events.splice(index, 1);
				}
			}
		},
		loadParams : {
			getValue : function(name) {
				name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
				var regexS = "[\\?&]" + name + "=([^&#]*)";
				var regex = new RegExp(regexS);
				var results = regex.exec(window.location.href);
				if(results == null)
					return "";
				else
					return results[1];
			},
			getHostURL : function() {
				var url = new String(document.URL.replace(/\/[^\/]+$/, ''));
				if(url.charAt(url.length - 1) != "/")
					url = url + "/";
				return url;
			}
		},
		startDrag : function(obj, x, y, w, h) {
			if(x || w || h || y) {
				Utensil.boundary = new Array();
				Utensil.boundary["x"] = x;
				Utensil.boundary["y"] = y ? y : 0;
				Utensil.boundary["w"] = w;
				Utensil.boundary["h"] = h;
			}
			Utensil.draggableObject = obj
			this.addListener(obj, this.MouseEvent.MOUSE_DOWN, this.toolkitDragMouseDown);
			this.addListener(document, this.MouseEvent.MOUSE_UP, this.toolkitDragMouseUp);

		},
		// --stopDrag
		stopDrag : function(obj) {
			this.removeListener(obj, this.MouseEvent.MOUSE_DOWN, this.toolkitDragMouseDown);
			this.removeListener(document, this.MouseEvent.MOUSE_UP, this.toolkitDragMouseUp);
		},
		toolkitDragMouseUp : function(event) {
			Utensil.preventDefault(event);
			Utensil.removeListener(document, Utensil.MouseEvent.MOUSE_MOVE, Utensil.toolkitDragMouseMove);
		},
		toolkitDragMouseDown : function(event) {

			if(Utensil.draggableObject.style.position && Utensil.draggableObject.style.position == "absolute") {
				Utensil.startX = Utensil.mouseX(Utensil.draggableObject, event);
				Utensil.startY = Utensil.mouseY(Utensil.draggableObject, event);
			} else {
				Utensil.startX = Utensil.draggableObject.style.marginLeft ? Utensil.draggableObject.style.marginLeft.replace("px", "") : 0;
				Utensil.startY = Utensil.draggableObject.style.marginTop ? Utensil.draggableObject.style.marginTop.replace("px", "") : 0;
			}
			Utensil.preventDefault(event);

			Utensil.addListener(document, Utensil.MouseEvent.MOUSE_MOVE, Utensil.toolkitDragMouseMove);
		},
		toolkitDragMouseMove : function(event) {
			Utensil.preventDefault(event);
			var scrollX = 0;
			var scrollY = 0;
			if(Utensil.Browser.isIE) {
				Utensil.scrollX = document.documentElement.scrollLeft;
				Utensil.scrollY = document.documentElement.scrollTop;
			} else {
				Utensil.scrollX = window.scrollX;
				Utensil.scrollY = window.scrollY;
			}

			var left = parseInt(Utensil.getX(Utensil.draggableObject) + Utensil.mouseX(Utensil.draggableObject, event) + Utensil.scrollX - Utensil.startX);
			var top = parseInt(Utensil.getY(Utensil.draggableObject) + Utensil.mouseY(Utensil.draggableObject, event) + Utensil.scrollY - Utensil.startY);
			if(Utensil.boundary) {

				if(left < Utensil.boundary["x"]) {
					left = Utensil.boundary["x"];
				}
				if(top < Utensil.boundary["y"]) {
					top = Utensil.boundary["y"];
				}
				if(top > Utensil.boundary["h"]) {
					top = Utensil.boundary["h"];
				}
				if(Utensil.boundary["w"] && left > parseInt(Utensil.boundary["x"]) + parseInt(Utensil.boundary["w"])) {
					left = parseInt(Utensil.boundary["x"]) + parseInt(Utensil.boundary["w"]);
				}
			}
			if(Utensil.draggableObject.style.position && Utensil.draggableObject.style.position == "absolute") {
				Utensil.draggableObject.style.left = left + "px";
				Utensil.draggableObject.style.top = top + "px";
			} else {
				Utensil.draggableObject.style.marginLeft = left + "px";
				Utensil.draggableObject.style.marginTop = top + "px";
			}

		},
		preventDefault : function(event) {
			if(this.Browser.isIE) {
				window.event.cancelBubble = true;
				window.event.returnValue = false;
			} else {
				event.preventDefault();
			}
		},
		events : {},
		newEvent : function(eventName, trigger, targ) {

			if(!targ)
				targ = document.body;
			if(!trigger)
				trigger = eventName;

			this.events[eventName] = eventName;
		},
		dispatchEvent : function(eventName, target) {

			var fireOnThis = document.body;
			if(target)
				fireOnThis = target;

			if(document.createEvent) {// all browsers except IE before version 9

				var evObj = document.createEvent("Events");
				evObj.initEvent(eventName, true, true);
				fireOnThis.dispatchEvent(evObj);

			} else if(document.createEventObject) {// IE before version 9

				var evObj = document.createEventObject();
				fireOnThis.fireEvent(eventName, evObj);
			}

		},
		hitTestObject : function(elem, elem2) {
			//var hitTest =false;
			if(parseInt(this.getX(elem)) > parseInt(this.getX(elem2)) && parseInt(this.getX(elem)) < parseInt(this.getX(elem2)) + parseInt(this.getWidth(elem2))) {
				//hitTest=true
			} else {
				//hitTest=false;
				return false;
			}
			if(parseInt(this.getY(elem)) > parseInt(this.getY(elem2)) && parseInt(this.getY(elem)) < parseInt(this.getY(elem2)) + parseInt(this.getHeight(elem2))) {
				//hitTest=true;
			} else {
				//hitTest=false;
				return false;
			}
			return true;

		},
		history:[],
		log : function() {
			this.history = this.history || [];
			// store logs to an array for reference
			this.history.push(arguments);
			// Modern browsers
			if( typeof console != 'undefined' && typeof console.log == 'function') {

				// Opera 11
				if(window.opera) {
					var i = 0;
					while(i < arguments.length) {
						console.log("Item " + (i + 1) + ": " + arguments[i]);
						i++;
					}
				}

				// All other modern browsers
				else if((Array.prototype.slice.call(arguments)).length == 1 && typeof Array.prototype.slice.call(arguments)[0] == 'string') {
					console.log((Array.prototype.slice.call(arguments)).toString());
				} else {
					console.log(Array.prototype.slice.call(arguments));
				}

			}

			// IE8
			else if(!Function.prototype.bind && typeof console != 'undefined' && typeof console.log == 'object') {
				Function.prototype.call.call(console.log, console, Array.prototype.slice.call(arguments));
			}

			// IE7 and lower, and other old browsers
			else {
				// Inject Firebug lite
				if(!document.getElementById('firebug-lite')) {

					// Include the script
					var script = document.createElement('script');
					script.type = "text/javascript";
					script.id = 'firebug-lite';
					// If you run the script locally, point to /path/to/firebug-lite/build/firebug-lite.js
					script.src = 'https://getfirebug.com/firebug-lite.js';
					// If you want to expand the console window by default, uncomment this line
					//document.getElementsByTagName('HTML')[0].setAttribute('debug','true');
					document.getElementsByTagName('HEAD')[0].appendChild(script);
					setTimeout(function() { log(Array.prototype.slice.call(arguments));
					}, 2000);
				} else {
					// FBL was included but it hasn't finished loading yet, so try again momentarily
					setTimeout(function() { log(Array.prototype.slice.call(arguments));
					}, 500);
				}
			}
		}
	};
	Utensil.addPackage(UtensilMax);
	UtensilMax = null;
}(window));
