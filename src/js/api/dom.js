var $$ = require('../utils');

var dom = {
	byId: function(id) {
		return document.getElementById(id);
	},
	qs: function(selector, context) {
		context = context || document;
		return context.querySelector(selector);
	},
	qsa: function(selector, context) {
		context = context || document;
		return $$.toArray(context.querySelectorAll(selector));
	},
	addClass: function(el, className) {
		el.classList.add(className);
	},
	removeClass: function(el, className) {
		el.classList.remove(className);
	},
	hasClass: function(el, className) {
		return el.classList.contains(className);
	},
	hide: function(...elems) {
		elems.forEach(function(item) {
			item.style.display = 'none';
		});
	},
	show: function(...elems) {
		elems.forEach(function(item) {
			item.style.display = '';
		});
	},
	closest: function(el, selector) {
		if(el.closest) return el.closest(selector);

		var parentNode = el;
		var matches;

		while((matches = parentNode && parentNode.matches) && !parentNode.matches(selector)) {
			parentNode = parentNode.parentNode;
		}
		return matches ? parentNode : null;
	}
};

module.exports = dom;