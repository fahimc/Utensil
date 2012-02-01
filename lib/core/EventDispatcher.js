// create new events.
window.newEvent = function(eventName,trigger,targ)
{

	if(!targ)targ = document.body;
	if(!trigger)trigger=eventName;

	window[eventName] = eventName;
}
window.dispatchEvent=function(eventName,target)
{

	var fireOnThis =document.body;
	if(target)fireOnThis=target;
	
	 if ( document.createEvent) {     // all browsers except IE before version 9
		
		var evObj = document.createEvent ("Events");
		evObj.initEvent (eventName, true, true);
		fireOnThis.dispatchEvent (evObj);
		
	} else if (document.createEventObject)
	 {   // IE before version 9
			
			var evObj = document.createEventObject ();
			fireOnThis.fireEvent (eventName, evObj);
	}

}
window.MouseEvent ={ 

	CLICK : Browser.isIE?"onclick":"click",
	MOUSE_DOWN : Browser.isIE?"onmousedown":"mousedown",
	MOUSE_UP : Browser.isIE?"onmouseup":"mouseup",
	MOUSE_MOVE : Browser.isIE?"onmousemove":"mousemove",
}

