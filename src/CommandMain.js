( function(window) {
	function Main() {
		if(window.addEventListener) {
			window.addEventListener("load", loadComplete);

		} else {
			window.attachEvent("onload", loadComplete);
		}
	}

	function loadComplete() {
		document.getElementById('boldButton').addEventListener("click", SetToBold);
		document.getElementById('imageButton').addEventListener("click", addImage);
	}

	function SetToBold() {
		execCommandOnElement(document.getElementById('copy'), "Bold");
	}
	function addImage()
	{
		execCommandOnElement(document.getElementById('copy'), "insertImage","http://levelselect.co.uk/wp-content/uploads/2008/03/nokonoko02.jpg");
		var imgs =document.getElementById('copy').getElementsByTagName("img");
		imgs[imgs.length-1].style.clear="both";
		imgs[imgs.length-1].addEventListener("click", imageClick);
		
	}
	function imageClick(event)
	{
		this.style.float="left";
	}
	function execCommandOnElement(el, commandName, value) {
		if( typeof value == "undefined") {
			value = null;
		}

		if( typeof window.getSelection != "undefined") {
			// Non-IE case
			var sel = window.getSelection();
			console.log("here",sel);

			// Save the current selection
			var savedRanges = [];
			for(var i = 0, len = sel.rangeCount; i < len; ++i) {
				savedRanges[i] = sel.getRangeAt(i).cloneRange();
			}

			// Temporarily enable designMode so that
			// document.execCommand() will work
			document.designMode = "on";

			// Select the element's content
			sel = window.getSelection();
			var range = document.createRange();
			range.selectNodeContents(el);
			//sel.removeAllRanges();
			//sel.addRange(range);

			// Execute the command
			document.execCommand(commandName, false, value);

			// Disable designMode
			document.designMode = "off";

			// Restore the previous selection
			sel = window.getSelection();
			sel.removeAllRanges();
			for(var i = 0, len = savedRanges.length; i < len; ++i) {
				sel.addRange(savedRanges[i]);
			}
		} else if( typeof document.body.createTextRange != "undefined") {
			// IE case
			var textRange = document.body.createTextRange();
			textRange.moveToElementText(el);
			textRange.execCommand(commandName, false, value);
		}

	}

	function getSelectedText() {
		var txt = '';
		if(window.getSelection) {
			txt = window.getSelection();
		} else if(document.getSelection) {
			txt = document.getSelection();
		} else if(document.selection) {
			txt = document.selection.createRange().text;
		} else
			return;
		return txt;
	}

	Main()
}(window));
