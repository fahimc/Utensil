( function(window) {
	
	var selectionId = "dropdown-selection";
	var optionPrefix = "dropdown-options-index-";
	var dropdownTextId = "dropdownText";
	var selection;
	var dropdown;
	var optionTitleTag = "title";
	var optionValueTag = "value";
	var Dropdown = 
	{
		currentValue:"",
		currentText:"",
		hide:hideSelection,
		show:showSelection
	};
	function DropdownMain()
	{
		window.Dropdown = new Array();
		addUIEventListener(window, 'load', initDropdown);
	}
	function initDropdown(event) {
		dropdown = document.getElementById("dropdown");
		window.Dropdown.push(Dropdown);
		addUIEventListener(dropdown, 'click', showOptions);
		
		buildSelection();
	}

	function showOptions(event) {
		
		if(selection.style.visibility == "hidden") {

			selection.style.left = findX(dropdown) + "px";
			selection.style.top = parseInt(findY(dropdown)) + parseInt(dropdown.offsetHeight) + "px";
			showSelection();
		} else {
			hideSelection();
		}
		
	}

	function buildSelection() {

		var options = dropdown.getElementsByTagName('input');
		selection = document.createElement('div');
		selection.id = selectionId;
		selection.style.position = "absolute";
		selection.style.width = parseInt(dropdown.offsetWidth) + "px";
		createOptions(options);
		hideSelection();
		document.getElementsByTagName('body')[0].appendChild(selection);
	}

	function createOptions(options) {
		var i = 0;
		var non = 0;
		for( i = 0; i < options.length; i++) {
			if(options[i].type.toLowerCase() == "hidden") {
				var opt = document.createElement('div');
				opt.innerHTML = options[i][optionTitleTag];
				opt.id = optionPrefix + i;
				opt.className = "dropdown-options";
				opt.setAttribute("value", options[i][optionValueTag]);
				addUIEventListener(opt, 'click', selectedOption);
				selection.appendChild(opt);
			} else {
				non++;
			}
		}
		while(options.length > non) {
			if(options[options.length - 1].type.toLowerCase() == "hidden")
				dropdown.removeChild(options[options.length - 1]);
		}
	}

	function selectedOption(event) {
		var target = (event.currentTarget) ? event.currentTarget : event.srcElement;
		Dropdown.currentValue = target.getAttribute("value");
		Dropdown.currentText = target.innerHTML;
		document.getElementById(dropdownTextId).innerHTML = target.innerHTML;
		dropdown.setAttribute("value", Dropdown.currentValue);
		hideSelection();
	}

	function hideSelection() {
		selection.style.visibility = "hidden";
	
	}

	function hideSelectionOutside(event) {
		hideSelection();
	}

	function showSelection() {
		selection.style.visibility = "visible";
	}
	
	function addUIEventListener(obj, evt, func) {
		if(obj.addEventListener)// W3C standard
		{
			obj.addEventListener(evt, func, false);
			// NB **not** 'onload'
		} else if(obj.attachEvent)// Microsoft
		{

			obj.attachEvent('on' + evt, func);
		}

	}
	function removeUIEventListener(obj, evt, func) {
		if(obj.removeEventListener)// W3C standard
		{
			obj.removeEventListener(evt, func, false);
			// NB **not** 'onload'
		} else if(obj.dettachEvent)// Microsoft
		{

			obj.dettachEvent('on' + evt, func);
		}

	}
	function findX(obj) {
		var curleft = 0;
		if(obj.offsetParent) {
			do {
				curleft += obj.offsetLeft;
			} while (obj = obj.offsetParent);
			return curleft;
		}
	}

	function findY(obj) {
		var curtop = 0;
		if(obj.offsetParent) {
			do {
				curtop += obj.offsetTop;
			} while (obj = obj.offsetParent);
			return curtop;
		}
		

	}
	
	DropdownMain();
}(window));
