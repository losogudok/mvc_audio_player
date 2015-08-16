"use strict";

var dom = require('../../dom');
var $$ = require('../../utils');
var BaseView = require('./base');

class DropAreaView extends BaseView {

	constructor(options) {
		super(options);

		this.elems = {
			dropHint: dom.qs('.js-drop-hint', this.el)
		};
		this.bindListeners();
	}

	bindListeners() {
		this.el.ondrop = this.onFileDrop.bind(this);
		this.el.ondragenter = this.onFileEnter.bind(this);
		this.el.ondragover = this.onFileDrag.bind(this);
		this.elems.dropHint.ondragleave = this.onFileLeave.bind(this);
	}

	onFileDrag(e) {
		e.preventDefault();
	}

	onFileDrop(e) {
		var files = [].slice.call(e.dataTransfer.files);
		e.preventDefault();
		this.trigger('files:add', files);
		dom.hide(this.elems.dropHint);
	}

	onFileLeave() {
		dom.hide(this.elems.dropHint);
	}

	onFileEnter(e) {
		e.preventDefault();

		dom.show(this.elems.dropHint);
	}
}

module.exports = DropAreaView;




