( function(window) {

	var Database = {
		base : {},
		create : function() {
			this.base = {};
		},
		clearDatabase : function() {
			this.base = {};
		},
		addTable : function(name) {
			this.base[name] = {
				props : [],
				data : []
			};
		},
		deleteTable : function(name) {
			if(this.base[name]) {
				delete this.base[name];
			}
		},
		getTable : function(name) {
			return this.base[name];
		},
		addProperty : function(name, prop) {
			if(this.base[name]) {
				this.base[name].props.push(prop);
			}
		},
		addData : function(name, args) {
			var data = {};
			if(this.base[name]) {
				for(var a = 0; a < this.base[name].props.length; a++) {
					data[this.base[name].props[a]] = "";
					for(obj in args) {
						if(obj == this.base[name].props[a]) {
							data[this.base[name].props[a]] = args[obj];
						}
					}
				}
				this.base[name].data.push(data);
			}
		},
		updateDataByValue : function(name, prop, arg) {
			if(this.base[name]) {
				for(var a = 0; a < this.base[name].data.length; a++) {
					var table = this.base[name].data[a];
					for(data in table) {
						var update = false;
						for(p in arg) {
							if(data == p && table[data] == arg[p]) {
								update = true;
							}
						}
						if(update) {
							for(p in prop) {
								table[p] = prop[p];
							}
						}
					}
				}
			}
		},
		removeDataByValue : function(name, arg) {
			if(this.base[name]) {
				for(var a = 0; a < this.base[name].data.length; a++) {
					var table = this.base[name].data[a];
					for(data in table) {
						var update = true;
						for(p in arg) {
							if(data == p && table[data] != arg[p]) {
								update = false;
							}
						}
						if(update) {
							this.base[name].data.splice(a, 1);
							break;

						}
					}
				}
			}
		},
		getDataByValues : function(name, arg) {
			if(this.base[name]) {
				for(var a = 0; a < this.base[name].data.length; a++) {
					var content = this.base[name].data[a];
					for(data in content) {
						var found = true;
						for(p in arg) {
							console.log(p, content[data], arg[p], data);
							if(data == p && content[data] != arg[p]) {
								found = false;
								break;
							}
						}
						if(found) {
							return content;
						}
					}
				}
			}
			return null;
		},
		deleteData : function(name) {
			this.base[name].data = [];
		},
		removeDataByIndex : function(name, index) {
			if(this.base[name] && this.base[name].data[index]) {
				this.base[name].data.splice(index, 1);
			}
		},
		toString : function(name) {
			if(name)
			{
				return JSON.stringify(this.base[name]);
			}
			return JSON.stringify(this.base)
		}
	}

	window.Database = Database;
}(window));
