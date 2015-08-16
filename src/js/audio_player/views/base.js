"use strict";

var $$ = require('../../utils');
var Events = require('../../events');
var dom = require('../../dom');

class BaseView {
	constructor(options) {
		var childNodes;
		var i;

		this.el = options.el;
		this.model = options.model;
		this.subviews = options.subviews;
		if(options.template) {
			childNodes =  options.template.content.childNodes;
			for (i = 0; i < childNodes.length; i++) {
				if (childNodes[i].nodeType === 1) {
					this.template = childNodes[i].cloneNode(true);
					break;
				}
			}
		}
	}

	show() {
		dom.show(this.el);
	}

	hide() {
		dom.hide(this.el);
	}

	render() {
		this.el.appendChild(this.content);
	}

	remove() {
		this.el.parentNode.removeChild(this.el);
	}
}

$$.assign(BaseView.prototype, Events);

module.exports = BaseView;