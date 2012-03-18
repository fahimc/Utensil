var Sprite=
{
	drawRectangle:function(x,y,w,h,c,z)
	{
		var obj = document.createElement("div");
		this.setStyle(obj,z);
		//set x y
		obj.style.top = y+"px";
		obj.style.left = x+"px";
		this.setWidth(obj,w);
		this.setHeight(obj,h);
		this.setColor(obj,c);
		obj.style.backgroundColor = c;
		return obj;
	},
	drawCircle: function(x,y,ww,hh,rad,c,z)
	{
		var obj = document.createElement("div");
		this.setStyle(obj,z);
		//set x y
		obj.style.top = y+"px";
		obj.style.left = x+"px";
		this.setWidth(obj,ww);
		this.setHeight(obj,hh);
		this.setColor(obj,c);
		this.setCorners(obj,rad);
		return obj;
	},
	setColor:function(obj,c)
	{
		obj.style.backgroundColor = c;
	},
	setWidth:function(obj,w)
	{
		obj.style.width = w+"px";
	},
	setIndex:function(obj,z)
	{
		obj.style.zIndex = z?z:"0";
	},
	setHeight:function(obj,h)
	{
		obj.style.height = h+"px";
	},
	setStyle:function(obj,z)
	{
		obj.style.position = "absolute";
		obj.style.top = "0px";
		obj.style.margin = "0px";
		obj.style.padding = "0px";
		this.setIndex(obj,z);
	},
	setCorners:function(obj,rad)
	{


		obj.style.behavior= 'url(js/com/utils/border-radius.htc)';
		obj.style.webkitBorderRadius = rad+"px";
		obj.style.MozBorderRadius = rad+"px";
		obj.style['-moz-border-radius']=rad+"px";
		obj.style.borderRadius =rad+"px";
		obj.style['border-radius']=rad+'px '+rad+'px '+rad+'px '+rad+'px'; 
	}
}
window.Sprite = Sprite;
