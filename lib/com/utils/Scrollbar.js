var Scrollbar = {
	maxHeight:0,
	contentHeight:0,
	attach:function(obj)
	{
		this.maxHeight=obj.clientHeight;
		this.contentHeight = obj.scrollHeight;
		var handleHeight = ((this.maxHeight/this.contentHeight)*100);
		var bar = document.createElement("div");
		var handle = document.createElement("div");
		obj.style.position ="relative";
		bar.style.width = 20+"px";
		bar.style.height = this.maxHeight+"px";
		bar.style.position="absolute";
		bar.style.backgroundColor="#000";
		bar.style.top="0px";
		bar.style.right="0px";
		obj.style.paddingRight="20px";

		handle.style.width = 20+"px";
		handle.style.height = handleHeight+"%";
		handle.style.position="absolute";
		handle.style.backgroundColor="#f00";
		
		bar.appendChild(handle);
		obj.appendChild(bar);
		
		Drag.startDrag(handle,{x:0,y:0,width:20,height:this.maxHeight},this.mouseMove);
		
	},
	mouseMove:function(event)
	{
		event.target.scrollTop--;
		console.log(event.target.mouseY);
	}
}