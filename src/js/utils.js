"use strict";

var $$ = {
	toArray: function(object) {
		return [].slice.call(object);
	},
	assign: function(target, ...rest) {
		if(target === undefined || target === null) {
			throw new TypeError('Cannot convert first argument to object');
		}
		rest.forEach(obj => {
			if(obj === undefined || obj === null) {
				return;
			}
			Object.keys(obj).forEach(key => {
				target[key] = obj[key];
			});
		});
	},
	observeProperties: function(obj) {
		if (typeof obj.trigger !== 'function') {
			throw 'Observed object must have trigger method';
		}
		Object.keys(obj).forEach(function(key) {
			obj['_' + key] = obj[key];

			Object.defineProperty(obj, key, {
				get: function() {
					return obj['_' + key];
				},
				set: function(value) {
					if(obj['_' + key] === value) return;

					obj['_' + key] = value;
					obj.trigger(key + ':changed', value);
				}
			});
		}, obj);
	}
};

module.exports = $$;