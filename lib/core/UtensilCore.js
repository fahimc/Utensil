( function(window) {
	var UtensilCore = {
		extend : function(newObject, toClone) {
			if(!newObject)newObject = {};
			function inheritance() {}
			inheritance.prototype = toClone.prototype;
			newObject.prototype = new inheritance();
			newObject.prototype.constructor = newObject;
			newObject.baseConstructor = toClone;
			newObject.superClass = toClone.prototype;
			for(var key in toClone) {
				var obj = toClone[key];
				if(!newObject[key])newObject[key] = obj;
			}
		},
		model : {
			attributes : new Array(),
			set : function(key, value) {
				this.attributes[key] = value;
			},
			get : function(key) {
				return this.attributes[key];
			},
			clearAll:function()
			{
				attributes=null;
			}
		}
	};
	Utensil.addPackage(UtensilCore);
	UtensilCore = null;
}(window));
