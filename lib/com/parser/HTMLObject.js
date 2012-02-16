function HTMLObject(copy, pageDiv) {
	var headers="";
	var bodyStartTag="";
	var bodyEndTag="";
	var content="";
	var copyEnd="";
	var holder;
	var divId="html-content-holder";
	this.init = function() {
		//get the body tags
		bodyStartTag = copy.match(/<body[^>]*>/gi)[0];
		bodyEndTag = copy.match(/<\/body[^>]*>/gi)[0];
		console.log("bodyStartTag", bodyStartTag);
		console.log("bodyEndTag", bodyEndTag);
		
		//get the html in parts
		var copyArray = copy.split(/<body[^>]*>/gi);
		copyEnd = copy.split(/<\/body[^>]*>/gi)[1];
		console.log("copyEnd", copyEnd);
		headers = copyArray[0];
		content = copyArray[1];
		
		//create a dom element do store the content
		holder = document.createElement("div");
		holder.id=divId;
		holder.innerHTML = content;
		document.body.appendChild(holder);
		console.log("content", holder.innerHTML);
		copyArray = null;

	}
	this.getContentAsString=function()
	{
		return headers+bodyStartTag+holder.innerHTML+bodyEndTag+copyEnd;
	}
	this.getElementById=function(id)
	{
		for(var a=0; a<holder.childNodes.length;a++)
		{
			if(holder.childNodes[a].id==id)
			{
				return holder.childNodes[a];
			}
		}
		return null;
	}
	this.init();
}