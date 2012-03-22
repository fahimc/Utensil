var Scrollbar = {
	maxHeight : 0,
	maxWidtht : 0,
	currentItem : null,
	contentHeight : 0,
	handleWidth : 8,
	barColor : "#ccc",
	handleColor : "#999",
	contentClass : "scroller-content",
	handleClass : "scroller-handle",
	attach : function(obj) {
		var html = obj.innerHTML;
		this.maxHeight = obj.clientHeight;
		this.maxWidtht = obj.clientWidth;
		this.contentHeight = obj.scrollHeight;

		obj.innerHTML = "";

		var handleHeight = ((this.maxHeight / this.contentHeight) * 100);
		var bar = document.createElement("div");
		var content = document.createElement("div");
		var handle = document.createElement("div");

		obj.style.position = "relative";
		bar.style.width = this.handleWidth + "px";
		bar.style.height = this.maxHeight + "px";
		bar.style.position = "absolute";
		bar.style.backgroundColor = this.barColor;
		bar.style.borderRadius  = "5px";
		bar.style.top = "0px";
		bar.style.right = "0px";
		obj.style.paddingRight = "20px";

		handle.style.width = this.handleWidth + "px";
		handle.style.height = handleHeight + "%";
		handle.style.position = "absolute";
		handle.style.backgroundColor = this.handleColor;
		handle.style.borderRadius  = "5px";
		handle.id = obj.id+"-"+this.handleClass;
		handle.className = this.handleClass;
		handle.holder = obj;
		handle.maxHeight = this.maxHeight;
		content.style.width = parseInt(this.maxWidtht - this.handleWidth) + "px";
		content.style.height = "auto";
		content.className = this.contentClass;
		content.style.position = "absolute";
		content.style.backgroundColor = "#fff";
		content.innerHTML = html;

		obj.appendChild(content);
		bar.appendChild(handle);
		obj.appendChild(bar);
		content.onmousewheel = Drag.MouseWheel;
		obj.onmouseover = Scrollbar.mouseOver;
		obj.touchStartX = 0;
		obj.touchStartY = 0;
		if(document.addEventListener) {
			obj.addEventListener('touchstart', Scrollbar.touchstart);
			obj.addEventListener('mousedown', Scrollbar.mousedown);
			obj.addEventListener('touchmove', Scrollbar.touchmove);
			obj.addEventListener('touchend', Scrollbar.touchend);
			
		}
		Drag.startDrag(handle, {
			x : 0,
			y : 0,
			width : this.handleWidth,
			height : this.maxHeight
		}, this.mouseMove);

	},
	mouseOver:function(event)
	{
		var obj =event.currentTarget;
		var handle=document.getElementById(obj.id+"-"+Scrollbar.handleClass);
		Drag.boundary.width=handle.clientWidth;
		Drag.boundary.height=handle.maxHeight;
		
		Drag.item = handle;
	},
	mouseMove : function(event, obj) {
		var content = obj.holder.getElementsByClassName(Scrollbar.contentClass)[0];
		var h = obj.holder.clientHeight - obj.clientHeight;
		var s = content.clientHeight;
		var mouseY = obj.style.top.replace("px", "");
		// content.style.top=-content.style.top?parseInt(content.style.top.replace("px","")):0 + event.target.mouseY + "px";
		var per = mouseY / h;
		var y = (per * s);
		if(-y >= (obj.holder.clientHeight - s)) {
			content.style.top = -y + "px";
		} else {
			content.style.top = (obj.holder.clientHeight - s) + "px";
		}
		// obj.touchStartX= pos.x;
		obj.touchStartY=obj.style.top.replace("px", "");
	},
	mousedown : function(event) {
		event.preventDefault();
		var obj = event.target;
		Drag.boundary.width=obj.clientWidth;
		Drag.boundary.height=obj.maxHeight;
		var pos = Drag.getXY(obj,event);
		obj.touchStartX= pos.x;
		obj.touchStartY=pos.y;
		Scrollbar.currentItem=this;
		document.addEventListener('mouseup', Scrollbar.mouseup);
	},
	touchstart : function(event) {
		//event.preventDefault();
		var obj = event.target;
		var touch = event.touches[0];
		obj.touchStartX= touch.pageX;
		obj.touchStartY=touch.pageY;
		Scrollbar.currentItem=this;
		
	},
	touchmove : function(event) {
		event.preventDefault();
		var obj = Scrollbar.currentItem;
		var content = obj.getElementsByClassName(Scrollbar.contentClass)[0];
		var handle = obj.getElementsByClassName(Scrollbar.handleClass)[0];
		var s = content.clientHeight;
		var h = obj.clientHeight;
		var touch = event.touches[0];
		var top = content.style.top.replace("px", "");
		if(top=="")top=0;
		document.getElementById("debugger").innerHTML=content.style.top;
		var dif = Math.abs(touch.pageY-content.touchStartY);
	
		if(content.touchStartY>touch.pageY )
		{
			if((top - dif) >= (obj.clientHeight - s))
			{
				content.style.top =(top - dif)+"px";				
			}else{
				content.style.top =(obj.clientHeight - s)+"px";	
			}
		}else if(Number(top)  + Number(dif)<=0){
			
			content.style.top =(Number(top)  + Number(dif))+"px";

		}else{
			content.style.top =(0)+"px";
		}
		var mouseY = Math.abs(content.style.top.replace("px", ""));
		// alert((mouseY/s) * h);
		handle.style.top = ((mouseY/s) * h )+"px";
		obj.touchStartX= touch.pageX;
		obj.touchStartY=touch.pageY;
		// console.log("top end:",top);
	},
	touchend : function(event) {
		event.preventDefault();
		Scrollbar.currentItem=null;
	},
	mouseup : function(event) {
		event.preventDefault();
		Scrollbar.currentItem=null;
		var obj = event.target;
		// obj.removeEventListener('mousemove', Scrollbar.mousemove);
		document.removeEventListener('mouseup', Scrollbar.mouseup);
	}
}