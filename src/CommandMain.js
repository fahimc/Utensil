( function(window) {
	function Main() {
		if(window.addEventListener) {
			window.addEventListener("load", loadComplete);

		} else {
			window.attachEvent("onload", loadComplete);
		}
	}

	function loadComplete() {
		document.getElementById('boldButton').addEventListener("click",SetToBold);
	}

	function SetToBold() {
		execCommandOnElement(document.getElementById('copy'),"Bold");
	}
	function execCommandOnElement(el, commandName, value) {
    if (typeof value == "undefined") {
        value = null;
    }

    if (typeof window.getSelection != "undefined") {
        // Non-IE case
        var sel = window.getSelection();

        // Save the current selection
        var savedRanges = [];
        for (var i = 0, len = sel.rangeCount; i < len; ++i) {
            savedRanges[i] = sel.getRangeAt(i).cloneRange();
        }

        // Temporarily enable designMode so that
        // document.execCommand() will work
        document.designMode = "on";

        // Select the element's content
        sel = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(el);
        sel.removeAllRanges();
        sel.addRange(range);

        // Execute the command
        document.execCommand(commandName, false, value);

        // Disable designMode
        document.designMode = "off";

        // Restore the previous selection
        sel = window.getSelection();
        sel.removeAllRanges();
        for (var i = 0, len = savedRanges.length; i < len; ++i) {
            sel.addRange(savedRanges[i]);
        }
    } else if (typeof document.body.createTextRange != "undefined") {
        // IE case
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.execCommand(commandName, false, value);
    }
}
	Main()
}(window));
