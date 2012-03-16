var Drag = {

	// private property.
	item : null,
	boundary : {
		x : null,
		y : null,
		width : null,
		height : null
	},
	// public method. startDrag drag handler to an element.
	startDrag : function(obj, boundary,callback) {
		obj.onmousedown = Drag.initDrag;
		Drag.item = obj;
		Drag.boundary = boundary;
		// callbacks
		if(callback)obj.callback =callback;
		obj.initDrag = new Function();
		obj.dragMove = new Function();
		obj.dragEnd = new Function();
		return obj;
	},
	// private method. Begin drag process.
	initDrag : function(e) {
		var obj = Drag.item = this;

		if(isNaN(parseInt(obj.style.left))) {
			obj.style.left = '0px';
		}
		if(isNaN(parseInt(obj.style.top))) {
			obj.style.top = '0px';
		}

		var x = parseInt(obj.style.left);
		var y = parseInt(obj.style.top);
		e = e ? e : window.event;
		obj.mouseX = e.clientX;
		obj.mouseY = e.clientY;

		obj.initDrag(obj, x, y);

		document.onmousemove = Drag.dragMove;
		document.onmouseup = Drag.dragMoveEnd;
		
		return false;
	},
	getXY:function(obj,e)
	{
		var x = parseInt(obj.style.left);
		var y = parseInt(obj.style.top);
		e = e ? e : window.event;
		return {x:e.clientX,y:e.clientY};
	},
	// private method. Drag (move) element.
	dragMove : function(e) {
		var obj = Drag.item;

		var x = parseInt(obj.style.left);
		var y = parseInt(obj.style.top);
		e = e ? e : window.event;
		var newX = x + (e.clientX - obj.mouseX);
		var newY = y + (e.clientY - obj.mouseY);
		if(Drag.boundary) {

			if(Drag.boundary.x != null && newX < Drag.boundary.x) {
				newX = parseInt(Drag.boundary.x);
			}
			if(Drag.boundary.y != null && newY < Drag.boundary.y) {
				newY = parseInt(Drag.boundary.y);
			}

			if(Drag.boundary.width != null && newX + parseInt(obj.clientWidth) > Drag.boundary.width) {
				newX = Drag.boundary.width - parseInt(obj.clientWidth);
			}
			if(Drag.boundary.height != null && newY + parseInt(obj.clientHeight) > Drag.boundary.height) {
				newY = Drag.boundary.height - parseInt(obj.clientHeight);
			}
		}
		obj.style.left = newX + 'px';
		obj.style.top = newY + 'px';

		obj.mouseX = e.clientX;
		obj.mouseY = e.clientY;

		obj.dragMove(obj, x, y);
		obj.callback(e,obj);
		return false;
	},
	// private method. Stop drag process.
	dragMoveEnd : function() {
		var obj = Drag.item;

		var x = parseInt(obj.style.left);
		var y = parseInt(obj.style.top);

		obj.dragEnd(obj, x, y);

		document.onmousemove = null;
		document.onmouseup = null;
		// Drag.item = null;
	},
	
	MouseWheel : function(e) {
		e = e ? e : window.event;
		var wheelData = e.detail ? e.detail * -1 : e.wheelDelta / 40;
		var obj = Drag.item ;
		//do something
		if(isNaN(parseInt(obj.style.left))) {
			obj.style.left = '0px';
		}
		if(isNaN(parseInt(obj.style.top))) {
			obj.style.top = '0px';
		}
		var x = parseInt(obj.style.left);
		var y = parseInt(obj.style.top);

		var newY = y - parseInt(wheelData);
		if(Drag.boundary) {

			if(Drag.boundary.y != null && newY < Drag.boundary.y) {
				newY = parseInt(Drag.boundary.y);
			}
			if(Drag.boundary.height != null && newY + parseInt(obj.clientHeight) > Drag.boundary.height) {
				newY = Drag.boundary.height - parseInt(obj.clientHeight);
			}
		}

		obj.style.top = newY + 'px';
		obj.mouseX = e.clientX;
		obj.mouseY = e.clientY;

		obj.dragMove(obj, x, y);
		obj.callback(e,obj);
		return Drag.cancelEvent(e);
	},
	cancelEvent : function(e) {
		e = e ? e : window.event;
		if(e.stopPropagation)
			e.stopPropagation();
		if(e.preventDefault)
			e.preventDefault();
		e.cancelBubble = true;
		e.cancel = true;
		e.returnValue = false;
		return false;
	}
}