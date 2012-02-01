( function(window) {
	function CustomUI() {
		var slider;
		var handle;
		var customUI = this;
		this.sliderData = 0;
		this.createLabel = function(text, color) {
			var textField = createElement("p");
			resetStyle(textField);
			textField.style.color = color;
			textField.style.width = "auto";
			textField.style.height = "auto";
			textField.innerHTML = text;
			return textField;
		}
		this.createButton = function(text, style) {
			var button = createElement("div");
			resetStyle(button);
			button.className = style;
			var textField = this.createLabel(text, button.style.color);
			textField.style.visibilty = "hidden";
			button.style.visibilty = "hidden";
			addChild(textField);
			addChild(button);
			textField.style.left = ((button.offsetWidth - textField.offsetWidth) * 0.5) + "px";
			textField.style.top = ((button.offsetHeight - textField.offsetHeight) * 0.5) + "px";
			document.body.removeChild(button);
			document.body.removeChild(textField);
			textField.style.visibilty = "visible";
			button.style.visibilty = "visible";
			button.style.cursor = "pointer";
			button.appendChild(textField);
			return button;
		}
		this.createSlider = function(width, height) {

			newEvent("SLIDER_UPDATE");
			slider = createElement("div");
			resetStyle(slider);
			slider.style.width = width + "px";
			slider.style.height = height + "px";
			slider.style.backgroundColor = "#333333";
			handle = createElement("div");
			handle.name = "sliderHandle";
			resetStyle(handle);
			handle.style.width = height + "px";
			handle.style.height = height + "px";
			handle.style.backgroundColor = "#666666";
			handle.style.cursor = "pointer";
			addUIEventListener(handle, MouseEvent.MOUSE_DOWN, handleMouseDown);
			addUIEventListener(document, MouseEvent.MOUSE_UP, handleMouseUp);
			startDrag(handle, 0, 0, width - height, 0);
			slider.appendChild(handle);
			return slider;
		}
		this.updateSlider = function(obj, value) {
			obj.firstChild.style.left = (Number(value / 100) * (obj.offsetWidth - obj.firstChild.offsetWidth)) + "px";
			if(Number(value / 100) * (obj.offsetWidth - obj.firstChild.offsetWidth) > obj.offsetWidth - obj.firstChild.offsetWidth) {
				obj.firstChild.style.left = (obj.offsetWidth - obj.firstChild.offsetWidth) + "px";
			}
			if(Number(value / 100) * (obj.offsetWidth - obj.firstChild.offsetWidth) < 0) {
				obj.firstChild.style.left = "0px";
			}
			this.sliderData = Number(getX(obj.firstChild) / (obj.offsetWidth - obj.firstChild.offsetWidth) * 100).toFixed();
			dispatchEvent(SLIDER_UPDATE);
		}
		function handleMouseUp(event) {
			removeUIEventListener(document, MouseEvent.MOUSE_MOVE, handleMouseMove);
		}

		function handleMouseDown(event) {
			addUIEventListener(document, MouseEvent.MOUSE_MOVE, handleMouseMove);
		}

		function handleMouseMove(event) {

			customUI.sliderData = Number(getX(handle) / (slider.offsetWidth - handle.offsetWidth) * 100).toFixed();
			dispatchEvent(SLIDER_UPDATE);
		}

	}


	window.CustomUI = new CustomUI();
}(window));
