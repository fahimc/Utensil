Gallery = {
	setType : "SLIDE_HORIZONTAL",
	duration : 1,
	delay : 5,
	auto : false,
	idle : false,
	timerDirection : 1,
	mouseDirection : "",
	timer : null,
	startX : null,
	startY : null,
	onChange:null,
	type : {
		SLIDE_HORIZONTAL : "SLIDE_HORIZONTAL",
		SLIDE_VERTICAL : "SLIDE_VERTICAL",
		FADE_OUT : "FADE_OUT"
	},
	elem : {
		holder : null,
		style : null,
		leftButton : null,
		rightButton : null
	},
	id : {
		style : "galleryStyle",
		galleryWapper : "gallery-wrapper",
		galleryContainer : "gallery-container",
		galleryThumbsContainer : "gallery-thumbs-container",
		galleryThumbsWrapper : "gallery-thumbs-wrapper",
		leftButton : "leftButton",
		rightButton : "rightButton"
	},
	className : {
		galleryLeftButtonHover : "galleryLeftButtonHover",
		galleryRightButtonHover : "galleryRightButtonHover",
		galleryLeftButtonOut : "galleryLeftButtonOut",
		galleryRightButtonOut : "galleryRightButtonOut"
	},
	setting : {
		imageWidth : 500,
		imageHeight : 300,
		thumbWidth : 0,
		currentIndex : 0,
		currentThumbIndex : 0,
		thumbDif : null,
		totalImages : 0
	},
	init : function() {
		if(window.addEventListener) {
			window.addEventListener("load", function() {
				Gallery.onLoad()
			});
		} else {
			window.attachEvent("onload", function() {
				Gallery.onLoad()
			});
		}
		if( typeof document.getElementsByClassName != 'function') {
			document.getElementsByClassName = function() {
				var elms = document.getElementsByTagName('*');
				var ei = new Array();
				for( i = 0; i < elms.length; i++) {
					if(elms[i].getAttribute('class')) {
						ecl = elms[i].getAttribute('class').split(' ');
						for( j = 0; j < ecl.length; j++) {
							if(ecl[j].toLowerCase() == arguments[0].toLowerCase()) {
								ei.push(elms[i]);
							}
						}
					} else if(elms[i].className) {
						ecl = elms[i].className.split(' ');
						for( j = 0; j < ecl.length; j++) {
							if(ecl[j].toLowerCase() == arguments[0].toLowerCase()) {
								ei.push(elms[i]);
							}
						}
					}
				}
				return ei;
			}
		}
	},
	onLoad : function() {
		this.elem.style = document.createElement('style');
		this.elem.style.type = 'text/css';
		this.elem.style.id = this.id.style;
		document.getElementsByTagName('head')[0].appendChild(this.elem.style);

		this.elem.holder = document.getElementsByClassName(this.id.galleryWapper)[0];
		this.elem.leftButton = document.getElementById(this.id.leftButton);
		this.elem.rightButton = document.getElementById(this.id.rightButton);
		var container = document.getElementsByClassName(this.id.galleryContainer)[0];
		container.style.overflow = "hidden";
		container.style.position = "relative";
		this.elem.holder.style.position = "absolute";

		this.setting.imageWidth = container.clientWidth;
		this.setting.imageHeight = container.clientHeight;

		Gallery.addListener(this.elem.holder, "mouseover", this.holderMouseOver);
		Gallery.addListener(this.elem.holder, "mouseout", this.holderMouseOut);
		if('ontouchstart' in document.documentElement) {
			this.elem.holder.addEventListener('touchstart', this.holderMouseDown);
		} else {
			Gallery.addListener(this.elem.holder, "mousedown", this.holderMouseDown);
		}
		// Gallery.addListener(this.elem.holder, "mouseup", this.holderMouseUp);
		if(this.elem.leftButton)
			Gallery.addListener(this.elem.leftButton, "click", this.buttonClicked);
		if(this.elem.rightButton)
			Gallery.addListener(this.elem.rightButton, "click", this.buttonClicked);

		var children = this.elem.holder.children;
		this.setting.totalImages = children.length;

		// var nodelist = (this.elem.holder.getElementsByTagName("li");
		// for

		this.addStyle(".gallery-wrapper li{width:" + this.setting.imageWidth + "px;height: " + this.setting.imageHeight + "px;}");
		this.addStyle(".gallery-wrapper *{-moz-user-select: none;-khtml-user-select: none;-webkit-user-select: none;-o-user-select: none; }");

		switch(this.setType) {
			case this.type.SLIDE_HORIZONTAL:
				this.elem.holder.style.width = (children.length * this.setting.imageWidth) + "px";
				this.elem.holder.style.height = this.setting.imageHeight + "px";
				this.addStyle(".gallery-wrapper li{float: left;overflow:hidden;width:" + this.setting.imageWidth + "px;height: " + this.setting.imageHeight + "px;}");
				break;
			case this.type.SLIDE_VERTICAL:
				this.elem.holder.style.height = (children.length * this.setting.imageHeight) + "px";
				this.elem.holder.style.width = this.setting.imageWidth + "px";
				this.addStyle(".gallery-wrapper li{margin:0;padding:0;" + this.setting.imageWidth + "px;height:" + this.setting.imageHeight + "px}");
				break;
			case this.type.FADE_OUT:
				this.elem.holder.style.height = this.setting.imageHeight + "px";
				this.elem.holder.style.width = this.setting.imageWidth + "px";
				this.addStyle(".gallery-wrapper li{width:" + this.setting.imageWidth + "px;height:" + this.setting.imageHeight + "px;position:absolute;}");
				for(var a = 1; a < children.length; a++) {
					this.setOpacity(children[a], 0);
				}
				break;
		}
		if(this.auto) {
			this.timer = setInterval(this.onTimer, (this.delay + this.duration) * 1000);
		}

		if(document.getElementsByClassName(this.id.galleryThumbsWrapper)[0]) {
			var thumbsWrapper = document.getElementsByClassName(this.id.galleryThumbsWrapper)[0];
			var thumbsContainer = document.getElementsByClassName(this.id.galleryThumbsContainer)[0];
			thumbsContainer.style.overflow = "hidden";
			thumbsContainer.style.position = "relative";
			thumbsWrapper.style.position = "absolute";

			var nodeList = thumbsWrapper.getElementsByTagName("li");
			var width = 0;
			var padding = 0;
			var margin = 0;
			for(var a = 0; a < nodeList.length; a++) {
				if(a == 0) {
					width = nodeList[a].clientWidth;
					padding = Gallery.getStyle(nodeList[a], "padding-right").replace("px", "");
					margin = Gallery.getStyle(nodeList[a], "margin-right").replace("px", "");
				}
				nodeList[a].setAttribute("index", a);
				nodeList[a].style.width = width + "px";
				Gallery.addListener(nodeList[a], "click", Gallery.onThumbClicked);
			}

			this.setting.thumbWidth = (Number(width) + Number(padding) + Number(margin));
			thumbsWrapper.style.width = this.setting.thumbWidth * nodeList.length + "px";
			nodeList = null;
			thumbsWrapper = null;
			thumbsContainer = null;
			width = null;
			padding = null;
			margin = null;
		}
		if(document.getElementById("thumbButtonLeft") && document.getElementById("thumbButtonRight")) {
			Gallery.addListener(document.getElementById("thumbButtonLeft"), "click", Gallery.thumbLeftClick);
			Gallery.addListener(document.getElementById("thumbButtonRight"), "click", Gallery.thumbRightClick);
		}
		Gallery.elem.holder.ondragstart = function () { return false; };

	},
	holderMouseOver : function(event) {
		if(Gallery.elem.leftButton)
			Gallery.elem.leftButton.className = Gallery.className.galleryLeftButtonHover;
		if(Gallery.elem.rightButton)
			Gallery.elem.rightButton.className = Gallery.className.galleryRightButtonHover;
	},
	holderMouseOut : function(event) {
		if(Gallery.elem.leftButton)
			Gallery.elem.leftButton.className = Gallery.className.galleryLeftButtonOut;
		if(Gallery.elem.rightButton)
			Gallery.elem.rightButton.className = Gallery.className.galleryRightButtonOut;
	},
	holderMouseDown : function(event) {
		if(event.preventDefault)
			event.preventDefault();
		event.returnValue = false;
		if('ontouchstart' in document.documentElement) {
			document.addEventListener('touchmove', Gallery.holderMouseMove);
			document.addEventListener('touchend', Gallery.holderMouseUp);
		} else {
			Gallery.addListener(Gallery.elem.holder, "mousemove", Gallery.holderMouseMove);
			Gallery.addListener(document, "mouseup", Gallery.holderMouseUp);
		}
		Gallery.startX = Gallery.mouseX(event);
		Gallery.startY = Gallery.mouseY(event);
	},
	holderMouseUp : function(event) {
		if(event.preventDefault)
			event.preventDefault();
		if('ontouchstart' in document.documentElement) {
			document.removeEventListener('touchmove', Gallery.holderMouseMove);
			document.removeEventListener('touchend', Gallery.holderMouseUp);
		} else {
			Gallery.removeListener(Gallery.elem.holder, "mousemove", Gallery.holderMouseMove);
			Gallery.removeListener(document, "mouseup", Gallery.holderMouseUp);
		}
		var prev = Gallery.setting.currentIndex;
		switch(Gallery.mouseDirection) {
			case "right":
			case "bottom":
				if(Gallery.setting.currentIndex > 0)
					Gallery.setting.currentIndex--;
				break;
			case "left":
			case "top":
				if(Gallery.setting.currentIndex < Gallery.setting.totalImages - 1)
					Gallery.setting.currentIndex++;
				break;
		}
		Gallery.update(prev);
	},
	holderMouseMove : function(event) {

		var xDiff = Gallery.mouseX(event) - Gallery.startX;
		var yDiff = Gallery.mouseY(event) - Gallery.startY;

		if(Math.abs(xDiff) >= Math.abs(yDiff)) {
			Gallery.mouseDirection = xDiff < 1 ? "left" : "right";
		} else {
			Gallery.mouseDirection = yDiff < 1 ? "top" : "bottom";
		}

		switch(Gallery.setType) {
			case Gallery.type.SLIDE_HORIZONTAL:
				var left = Gallery.elem.holder.style.left.indexOf("px") < 0 ? 0 : Number(Gallery.elem.holder.style.left.replace("px", ""));
				left += xDiff;
				if(left > 0)
					left = 0;
				if(left < -(Gallery.elem.holder.style.width.replace("px", "") - Gallery.setting.imageWidth))
					left = -(Gallery.elem.holder.style.width.replace("px", "") - Gallery.setting.imageWidth);
				Gallery.elem.holder.style.left = left + "px";
				break;
			case Gallery.type.SLIDE_VERTICAL:
				var top = Gallery.elem.holder.style.top.indexOf("px") < 0 ? 0 : Number(Gallery.elem.holder.style.top.replace("px", ""));
				top += yDiff;
				if(top > 0)
					top = 0;
				if(top < -(Gallery.elem.holder.style.height.replace("px", "") - Gallery.setting.imageHeight))
					top = -(Gallery.elem.holder.style.height.replace("px", "") - Gallery.setting.imageHeight);
				Gallery.elem.holder.style.top = top + "px";
				break;
			case Gallery.type.FADE_OUT:
				break;
		}

		Gallery.startX = Gallery.mouseX(event);
		Gallery.startY = Gallery.mouseY(event);

	},
	thumbLeftClick : function(event) {

		Gallery.moveThumbHolder(1);

	},
	thumbRightClick : function(event) {
		Gallery.moveThumbHolder(0);

	},
	moveThumbHolder : function(dir) {
		var thumbsWrapper = document.getElementsByClassName(Gallery.id.galleryThumbsWrapper)[0];
		var thumbsContainer = document.getElementsByClassName(this.id.galleryThumbsContainer)[0];
		var thumbHolderWidth = thumbsWrapper.clientWidth;
		var thumbsContainerWidth = thumbsContainer.clientWidth;
		if(Gallery.setting.thumbDif == null)
			Gallery.setting.thumbDif = thumbsWrapper.getElementsByTagName("li").length - parseInt(thumbsContainerWidth / Gallery.setting.thumbWidth);

		var left = thumbsWrapper.style.left ? thumbsWrapper.style.left.replace("px", "") : 0;

		var css = {
			left : -(Math.abs(left) + Number(Gallery.setting.thumbWidth))
		};
		if(dir == 1) {
			css.left = -(Math.abs(left) - Number(Gallery.setting.thumbWidth));
			Gallery.setting.currentThumbIndex--;
		} else {
			Gallery.setting.currentThumbIndex++;
		}
		if(Gallery.setting.currentThumbIndex > Gallery.setting.thumbDif) {
			css.left = -(Gallery.setting.thumbDif * Gallery.setting.thumbWidth);
			Gallery.setting.currentThumbIndex = Gallery.setting.thumbDif;
		} else if(css.left > 0) {
			css.left = 0;
			Gallery.setting.currentThumbIndex = 0;
		}

		TweenLite.to(thumbsWrapper, Gallery.duration, {
			css : css,
			onComplete : null
		});
	},
	onThumbClicked : function(event) {
		var target = event.target || window.event.srcElement;
		if(target.nodeName.toLowerCase() == 'li') {
			
		} else if(target.parentNode.nodeName.toLowerCase() == 'li') {

			target= target.parentNode;
		} 
		Gallery.idle = true;
		var prev = Gallery.setting.currentIndex;
		Gallery.setting.currentIndex = target.getAttribute("index");
		
		Gallery.update(prev);
	},
	buttonClicked : function(event) {
		Gallery.idle = true;
		var target = (event.currentTarget) ? event.currentTarget : event.srcElement;
		var prev = Gallery.setting.currentIndex;
		switch(target) {
			case Gallery.elem.leftButton:

				if(Gallery.setting.currentIndex > 0)
					Gallery.setting.currentIndex--;

				break;
			case Gallery.elem.rightButton:

				if(Gallery.setting.currentIndex < Gallery.setting.totalImages - 1)
					Gallery.setting.currentIndex++;

				break;
		}
		Gallery.update(prev);
	},
	onTimer : function() {
		if(Gallery.idle)
			return;
		var prev = Gallery.setting.currentIndex;
		if(Gallery.timerDirection == 1) {
			if(Gallery.setting.currentIndex < Gallery.setting.totalImages - 1) {
				Gallery.setting.currentIndex++;
			} else {
				Gallery.timerDirection = 0;
				Gallery.setting.currentIndex--;
			}
		} else {
			if(Gallery.setting.currentIndex > 0) {
				Gallery.setting.currentIndex--;
			} else {
				Gallery.timerDirection = 1;
				Gallery.setting.currentIndex++;
			}
		}
		Gallery.update(prev);
	},
	update : function(prev) {
		var obj = Gallery.elem.holder;
		var css = {};
		var complete = Gallery.onComplete;
		switch(Gallery.setType) {
			case Gallery.type.SLIDE_HORIZONTAL:
				css = {
					left : -(Gallery.setting.currentIndex * Gallery.setting.imageWidth) + "px"
				};
				break;
			case Gallery.type.SLIDE_VERTICAL:
				css = {
					top : -(Gallery.setting.currentIndex * Gallery.setting.imageHeight) + "px"
				};
				break;
			case Gallery.type.FADE_OUT:
				var children = Gallery.elem.holder.children;

				TweenLite.to(children[prev], Gallery.duration, {
					css : {
						opacity : 0
					}
				});
				obj = children[Gallery.setting.currentIndex]
				css = {
					opacity : 1
				};
				break;
		}
		TweenLite.to(obj, Gallery.duration, {
			css : css,
			onComplete : complete
		});

	},
	onComplete : function() {
		Gallery.idle = false;
		if(Gallery.onChange)Gallery.onChange();
	},
	addListener : function(obj, event, callback) {

		if(obj.attachEvent) {
			obj.attachEvent("on" + event, callback);
		} else {
			obj.addEventListener(event, callback);
		}
	},
	removeListener : function(obj, event, callback) {
		if(obj.detachEvent) {
			obj.detachEvent("on" + event, callback);
		} else {
			obj.removeEventListener(event, callback);
		}
	},
	mouseX : function(event) {
		if(event.touches) {
			return event.touches[0].pageX;
		}
		return Gallery.pageXY(event).pageX;
	},
	mouseY : function(event) {
		if(event.touches) {
			return event.touches[0].pageY;
		}

		return Gallery.pageXY(event).pageY;
	},
	pageXY : function(event) {
		if(event.pageX == null && event.clientX != null) {
			var doc = document.documentElement, body = document.body;
			event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
			event.pageY = event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
		}
		return event;
	},
	setOpacity : function(obj, value) {
		obj.style["-ms-filter"] = "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + value * 100 + ")";

		/* IE 5-7 */
		obj.style["filter"] = "alpha(opacity=" + value * 100 + ")";

		/* Netscape */
		obj.style["-moz-opacity"] = value;

		/* Safari 1.x */
		obj.style["-khtml-opacity"] = value;

		/* Good browsers */
		obj.style["opacity"] = value;
	},
	addStyle : function(value) {
		var style = document.getElementById(this.id.style);
		var rules = document.createTextNode(value);
		if(style.styleSheet)
			style.styleSheet.cssText = rules.nodeValue;
		else
			style.appendChild(rules);

	},
	getStyle : function(x, styleProp) {
		if(x.currentStyle)
			var y = x.currentStyle[styleProp];
		else if(window.getComputedStyle)
			var y = document.defaultView.getComputedStyle(x, null).getPropertyValue(styleProp);
		return y;
	}
}