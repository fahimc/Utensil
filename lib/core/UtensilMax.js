( function(window) {
		var UtensilMax = {
			/* @method
			 * @desc Mouse Event Consts
			 * @return String
			 */
			MouseEvent : {
				CLICK : "click",
				MOUSE_DOWN : "mousedown",
				MOUSE_UP : "mouseup",
				MOUSE_MOVE : "mousemove"
			},
			/* @method
			 * @desc Use an enter frame loop
			 * @return Null
			 */
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
					for (var a = 0; a < this.events.length; a++) {
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
					for (var a = 0; a < this.events.length; a++) {
						if (this.events[a] == callback) {
							index = a;
						}
					}
					if (index) {
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
			startDrag : function(obj, x, y, w, h) {
				if (x || w || h || y) {
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

				if (Utensil.draggableObject.style.position && Utensil.draggableObject.style.position == "absolute") {
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
				if (Utensil.Browser.isIE) {
					Utensil.scrollX = document.documentElement.scrollLeft;
					Utensil.scrollY = document.documentElement.scrollTop;
				} else {
					Utensil.scrollX = window.scrollX;
					Utensil.scrollY = window.scrollY;
				}

				var left = parseInt(Utensil.getX(Utensil.draggableObject) + Utensil.mouseX(Utensil.draggableObject, event) + Utensil.scrollX - Utensil.startX);
				var top = parseInt(Utensil.getY(Utensil.draggableObject) + Utensil.mouseY(Utensil.draggableObject, event) + Utensil.scrollY - Utensil.startY);
				if (Utensil.boundary) {

					if (left < Utensil.boundary["x"]) {
						left = Utensil.boundary["x"];
					}
					if (top < Utensil.boundary["y"]) {
						top = Utensil.boundary["y"];
					}
					if (top > Utensil.boundary["h"]) {
						top = Utensil.boundary["h"];
					}
					if (Utensil.boundary["w"] && left > parseInt(Utensil.boundary["x"]) + parseInt(Utensil.boundary["w"])) {
						left = parseInt(Utensil.boundary["x"]) + parseInt(Utensil.boundary["w"]);
					}
				}
				if (Utensil.draggableObject.style.position && Utensil.draggableObject.style.position == "absolute") {
					Utensil.draggableObject.style.left = left + "px";
					Utensil.draggableObject.style.top = top + "px";
				} else {
					Utensil.draggableObject.style.marginLeft = left + "px";
					Utensil.draggableObject.style.marginTop = top + "px";
				}

			},
			preventDefault : function(event) {
				if (this.Browser.isIE) {
					window.event.cancelBubble = true;
					window.event.returnValue = false;
				} else {
					event.preventDefault();
				}
			},
			newEvent : function(eventName, trigger, targ) {

				if (!targ)
					targ = document.body;
				if (!trigger)
					trigger = eventName;

				this.events[eventName] = eventName;
			},
			dispatchEvent : function(eventName, target) {

				var fireOnThis = document.body;
				if (target)
					fireOnThis = target;

				if (document.createEvent) {// all browsers except IE before version 9

					var evObj = document.createEvent("Events");
					evObj.initEvent(eventName, true, true);
					fireOnThis.dispatchEvent(evObj);

				} else if (document.createEventObject) {// IE before version 9

					var evObj = document.createEventObject();
					fireOnThis.fireEvent(eventName, evObj);
				}

			},
			hitTestObject : function(elem, elem2) {
				//var hitTest =false;
				if (parseInt(this.getX(elem)) > parseInt(this.getX(elem2)) && parseInt(this.getX(elem)) < parseInt(this.getX(elem2)) + parseInt(this.getWidth(elem2))) {
					//hitTest=true
				} else {
					//hitTest=false;
					return false;
				}
				if (parseInt(this.getY(elem)) > parseInt(this.getY(elem2)) && parseInt(this.getY(elem)) < parseInt(this.getY(elem2)) + parseInt(this.getHeight(elem2))) {
					//hitTest=true;
				} else {
					//hitTest=false;
					return false;
				}
				return true;

			},
			tweener : {
				index : 0,
				rotate : function(props, value) {
					if (Utensil.getTransformProperty() != "ie") {
						props.transform += " rotate(" + value + "deg)";
					}
				},
				scale : function(props, value) {
					if (Utensil.getTransformProperty() != "ie") {
						props.transform += " scale(" + value + ")";
					}
				},
				transition : function(props, prop, value) {
					if (Utensil.getTransformProperty() != "ie") {
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
				},
				tranisitionEndList : {
					'transition' : 'transitionEnd',
					'OTransition' : 'oTransitionEnd',
					'MSTransition' : 'msTransitionEnd',
					'MozTransition' : 'transitionend',
					'WebkitTransition' : 'webkitTransitionEnd'
				},
				TransitionEnd : function() {
					var t;
					var el = document.createElement('fakeelement');
					for (t in this.tranisitionEndList) {
						if (el.style[t] !== undefined) {
							return this.tranisitionEndList[t];
						}
					}
					el = null;
					t = null;
				}
			},
			/* @method
			 * @desc animates an elements property.
			 * @return Null
			 */
			tween : function(obj, duration, args, type, callback, delay) {

				if (this.getTransformProperty() != "ie") {
					if (!duration)
						duration = 1;
					if (!type)
						type = "linear";
					if (!delay) {
						delay = "0s";

					} else {
						delay += "s";
					}
					var props = {
						transform : "",
						transition : "",
						filter : ""

					};
					for (var prop in args) {
						if (this.tweener[prop]) {
							this.tweener[prop](props, args[prop]);
						} else {

							this.tweener.transition(props, prop, args[prop]);

						}
					}

					this.addListener(obj, this.tweener.TransitionEnd(), innerCallback, false);

					var index = this.tweener.index++;
					var style = document.createElement('style');
					style.type = 'text/css';
					style.id = "utensil-animate-" + index;
					style.innerHTML = ".utensil-animate-" + index + "{";

					style.innerHTML += props.transition;
					if (props.transform != "")
						style.innerHTML += this.getTransformProperty() + "transform: " + props.transform + "; ";
					style.innerHTML += this.getTransformProperty() + "transition: all" + " " + duration + "s " + type + " " + delay + "; ";
					style.innerHTML += "}";
					document.getElementsByTagName('head')[0].appendChild(style);
					obj.className += " utensil-animate-" + index;
				} else {
					this.tweenIE(obj, duration, args, type, callback, delay);
					//style.innerHTML += "filter: " + props.filter + "; ";
				}

				function innerCallback() {
					//document.getElementsByTagName('head')[0].removeChild(style);
					//obj.className=obj.className.replace("utensil-animate-" + index,"");
					style = null;
					index = null;
					props = null;
					Utensil.removeListener(obj, Utensil.tweener.TransitionEnd(), innerCallback, false);
					if (callback)
						callback();
				}

			},
			/* @method
			 * @desc Returns the CSS transform prefix
			 * @return String
			 */
			getTransformProperty : function(element) {
				// Note that in some versions of IE9 it is critical that
				// msTransform appear in this list before MozTransform
				var properties = ['transition', 'WebkitTransition', 'msTransition', 'MozTransition', 'OTransition'];
				var p;
				while ( p = properties.shift()) {

					if ( typeof document.body.style[p] != 'undefined') {
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
			tweenerIE : {
				opacity : {
					direction : function(obj, value) {
						var dir = 0;
						if (obj.filter && obj.filter.alpha) {
							if (obj.filter.alpha['opacity'] / 100 < value)
								dir = 1;
						}
						return dir;
					},
					set : function(obj, value) {
						value = value * 100;
						obj.style.filter += "progid:DXImageTransform.Microsoft.Alpha(opacity=" + value + ")";
					},
					getCurrentValue : function(obj) {
						if (obj.filter && obj.filter.alpha) {
							return obj.filter.alpha['opacity'] / 100;
						}
						return 1;
					}
				},
				rotate : {
					direction : function(obj, value) {
						return 1;
					},
					set : function(obj, angle) {
						var rotation = 0;
						if (angle >= 0) {
							rotation = Math.PI * angle / 180;
						} else {
							rotation = Math.PI * (360 + angle) / 180;
						}
						var c = Math.cos(rotation), s = Math.sin(rotation);
						obj.style.filter += "progid:DXImageTransform.Microsoft.Matrix(M11=" + c + ",M12=" + (-s) + ",M21=" + s + ",M22=" + c + ",SizingMethod='auto expand')";

					},
					getCurrentValue : function(obj) {
						return 0;
					}
				}

			},
			tweenIE : function(obj, duration, args, type, callback, delay) {
				if (!duration)
					duration = 1;
				if (!type)
					type = "linear";
				if (!delay) {
					delay = "0s";

				} else {
					delay += "s";
				}
				var props = {};
				for (var prop in args) {
					props[prop] = {
						value : "",
						currentValue : "",
						direction : "",
						substract : "",
						suffix : "",
						end : false
					};
					props[prop].value = Number(String(args[prop]).replace(/[^0-9]/g, ""));
					props[prop].suffix = String(args[prop]).split(props[prop].value)[1];
					if (this.tweenerIE[prop] && this.tweenerIE[prop].getCurrentValue) {
						props[prop].currentValue = this.tweenerIE[prop].getCurrentValue(obj);
					} else {
						props[prop].currentValue = Number(obj.style ? String(obj.style[prop]).replace(/[A-Za-z$-]/g, "") : 0);
					}
					if (isNaN(props[prop].currentValue))
						props[prop].currentValue = 0;
					if (this.tweenerIE[prop]) {
						props[prop].direction = this.tweenerIE[prop].direction(obj, Number(props[prop].value));
					} else {
						props[prop].direction = Number(props[prop].value) > Number(props[prop].currentValue) ? 1 : 0;
					}
					props[prop].substract = Math.abs(props[prop].currentValue - props[prop].value) / (duration * this.EnterFrame.frameRate);
				}
				var tweenTimer = setInterval(moveTween, (duration * 1000) / this.EnterFrame.frameRate);

				function moveTween() {
					var ended = 0;
					var numProps = 0;
					for (var prop in props) {
						numProps++;
						if (props[prop].direction == 1) {
							props[prop].currentValue = Number(props[prop].currentValue) + Number(props[prop].substract);
							if (props[prop].currentValue > props[prop].value)
								props[prop].currentValue = props[prop].value;
						} else {
							props[prop].currentValue -= props[prop].substract;
							if (props[prop].currentValue < props[prop].value)
								props[prop].currentValue = props[prop].value;

						}
						if ((props[prop].end == false)) {

							if (Utensil.tweenerIE[prop]) {
								if (prop == "rotate")
									console.log(props[prop].currentValue, ",", props[prop].value);
								Utensil.tweenerIE[prop].set(obj, props[prop].currentValue);
							} else {
								if (props[prop].suffix) {
									obj.style[prop] = Utensil.MathRound(props[prop].currentValue, 1) + String(props[prop].suffix);
								} else {
									obj.style[prop] = Utensil.MathRound(props[prop].currentValue, 1) + "px";
								}
							}
						}
						if (props[prop].currentValue == props[prop].value) {
							props[prop].end = true;
							ended++;
						}
					}
					if (ended == numProps) {
						clearInterval(tweenTimer);
						numProps = null;
						ended = null;
						tweenTimer = null;
						props = null;
						counter = null;
						if (callback)
							callback();
					}
				}

			},
			MathRound : function(num, dec) {
				return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
			},
			history : [],
			log : function() {
				Utensil.history = Utensil.history || [];
				// store logs to an array for reference
				Utensil.history.push(arguments);
				// Modern browsers
				if ( typeof console != 'undefined' && typeof console.log == 'function') {

					// Opera 11
					if (window.opera) {
						var i = 0;
						while (i < arguments.length) {
							console.log("Item " + (i + 1) + ": " + arguments[i]);
							i++;
						}
					}

					// All other modern browsers
					else if ((Array.prototype.slice.call(arguments)).length == 1 && typeof Array.prototype.slice.call(arguments)[0] == 'string') {
						console.log((Array.prototype.slice.call(arguments)).toString());
					} else {
						console.log(Array.prototype.slice.call(arguments));
					}

				}

				// IE8
				else if (!Function.prototype.bind && typeof console != 'undefined' && typeof console.log == 'object') {
					Function.prototype.call.call(console.log, console, Array.prototype.slice.call(arguments));
				}

				// IE7 and lower, and other old browsers
				else {
					// Inject Firebug lite
					if (!document.getElementById('firebug-lite')) {

						// Include the script
						var script = document.createElement('script');
						script.type = "text/javascript";
						script.id = 'firebug-lite';
						// If you run the script locally, point to /path/to/firebug-lite/build/firebug-lite.js
						script.src = 'https://getfirebug.com/firebug-lite.js';
						// If you want to expand the console window by default, uncomment this line
						//document.getElementsByTagName('HTML')[0].setAttribute('debug','true');
						document.getElementsByTagName('HEAD')[0].appendChild(script);
						setTimeout(function() {
							log(Array.prototype.slice.call(arguments));
						}, 2000);
					} else {
						// FBL was included but it hasn't finished loading yet, so try again momentarily
						setTimeout(function() {
							log(Array.prototype.slice.call(arguments));
						}, 500);
					}
				}
			},
			getBGSize : function(mc) {
				var imageSrc = this.getStyle(mc, "backgroundImage");
				imageSrc = imageSrc.replace("url(", "");
				imageSrc = imageSrc.replace(")", "");
				imageSrc = imageSrc.replace('"', "");
				imageSrc = imageSrc.replace('"', "");

				var image = new Image();
				image.src = imageSrc;
				document.body.appendChild(image);
				var width = image.width, height = image.height;

				return {
					width : width,
					height : height
				}
			},
			getStyle : function(el, cssprop) {
				if (el.currentStyle)//IE
					return el.currentStyle[cssprop]
				else if (document.defaultView && document.defaultView.getComputedStyle)//Firefox
					return document.defaultView.getComputedStyle(el, "")[cssprop]
				else//try and get inline style
					return el.style[cssprop]
			}
		};
		Utensil.addPackage(UtensilMax);
		UtensilMax = null;
	}(window));
