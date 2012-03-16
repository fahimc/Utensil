var Scrollbar = {
	maxHeight : 0,
	maxWidtht : 0,
	currentItem : null,
	contentHeight : 0,
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
		bar.style.width = 20 + "px";
		bar.style.height = this.maxHeight + "px";
		bar.style.position = "absolute";
		bar.style.backgroundColor = "#000";
		bar.style.top = "0px";
		bar.style.right = "0px";
		obj.style.paddingRight = "20px";

		handle.style.width = 20 + "px";
		handle.style.height = handleHeight + "%";
		handle.style.position = "absolute";
		handle.style.backgroundColor = "#f00";
		handle.className = this.handleClass;
		handle.holder = obj;
		content.style.width = parseInt(this.maxWidtht - 20) + "px";
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
			width : 20,
			height : this.maxHeight
		}, this.mouseMove);

	},
	mouseOver:function(event)
	{
		
		Drag.item = event.currentTarget.getElementsByClassName(Scrollbar.handleClass)[0];
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
	},
	mousedown : function(event) {
		event.preventDefault();
		var obj = event.target;
		var pos = Drag.getXY(obj,event);
		obj.touchStartX= pos.x;
		obj.touchStartY=pos.y;
		Scrollbar.currentItem=this;
		console.log("obj.touchStartY",obj.touchStartY);
		obj.addEventListener('mousemove', Scrollbar.mousemove);
		document.addEventListener('mouseup', Scrollbar.mouseup);
		console.log("--------------");
	},
	touchstart : function(event) {
		//event.preventDefault();
		var obj = event.target;
		var touch = event.touches[0];
		obj.touchStartX= touch.pageX;
		obj.touchStartY=touch.pageY;
		Scrollbar.currentItem=this;
		
	},
	mousemove : function(event) {
		event.preventDefault();
		var obj = Scrollbar.currentItem;
		var content = obj.getElementsByClassName(Scrollbar.contentClass)[0];
		var handle = obj.getElementsByClassName(Scrollbar.handleClass)[0];
		var s = content.clientHeight;
		var h = obj.clientHeight;
		var pos = Drag.getXY(obj,event);
		var top = content.style.top.replace("px", "");
		console.log("top",top);
		console.log("pos.y",pos.y);
		if(top=="")top=0;
		document.getElementById("debugger").innerHTML=content.style.top;
		var dif = Math.abs(pos.y-content.touchStartY);
		console.log("Number(top)  + Number(dif)",Number(top)  + Number(dif));
		if(content.touchStartY>pos.y )
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
		obj.touchStartX= pos.x;
		obj.touchStartY=pos.y;
		console.log("top end:",top);
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
		// console.log("top",top);
		// console.log("pos.y",touch.pageY);
		if(top=="")top=0;
		document.getElementById("debugger").innerHTML=content.style.top;
		var dif = Math.abs(touch.pageY-content.touchStartY);
		// console.log("Number(top)  + Number(dif)",Number(top)  + Number(dif));
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
		obj.removeEventListener('mousemove', Scrollbar.mousemove);
		document.removeEventListener('mouseup', Scrollbar.mouseup);
		console.log("--------------");
	}
}