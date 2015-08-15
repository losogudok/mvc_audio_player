var subscribers = new Map();

var Events = {
		on: function(type, callback, context) {
			var item;

			if(subscribers.has(this)) {
				item = subscribers.get(this);
				if(item[type]) {
					item[type].push({
						callback: callback,
						context: context
					});
				}
				else {
					item[type] = [{
						callback: callback,
						context: context
					}];
				}
			}
			else {
				item = {
					[type]
			:
				[{
					callback: callback,
					context: context
				}]
			}
			;
			subscribers.set(this, item);
		}
	},
	off
:
function(type, callback) {
	var item, i;
	if(arguments.length === 0) {
		subscribers.delete(this);
	}
	if(arguments.length === 1 && subscribers.has(this)) {
		item = subscribers.get(this);
		if(item[type]) {
			if(callback) {
				for(i = 0; i < item[type].length; i++) {
					if(item[type][i] === callback) {
						item[type].splice(i, 1);
						i--;
					}
				}
			}
			else {
				delete item[type];
			}
		}
	}
}
,
trigger: function(type,
...
args
)
{
	var item;

	if(subscribers.has(this)) {
		item = subscribers.get(this);
		if(item[type]) {
			item[type].forEach(function(event) {
				var context = event.context || this;
				event.callback.apply(context, args);
			}, this);
		}
	}
}
}
;

module.exports = Events;