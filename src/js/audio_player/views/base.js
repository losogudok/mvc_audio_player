"use strict";

var $$ = require('../../utils');
var Events = require('../../events');
var dom = require('../../dom');

class BaseView {
	constructor(options) {
		this.el = options.el;
		this.model = options.model;
		this.subviews = options.subviews;
		if(options.template) {
			this.template = options.template.content.firstElementChild.cloneNode(true);
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