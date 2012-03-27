var IEMediaQuery = 
{
	classes:{},
	addClass:function(currentClass,newClass)
	{
		this.classes[currentClass]=newClass;
	},
	removeClass:function(currentClass)
	{
		if(this.classes[currentClass])this.classes[currentClass]="";
	},
	update:function()
	{
		for(var prop in this.classes)
		{
			this.addCSSClass(prop,this.classes[prop]);
		}
	},
	addCSSClass:function(className, classRule) {
		if(document.all) {
			document.styleSheets[0].addRule("." + className, classRule)
		} else if(document.getElementById) {
			document.styleSheets[0].insertRule("." + className + " { " + classRule + " }", 0);
		}
	}
}
