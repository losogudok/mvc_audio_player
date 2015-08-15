"use strict";

var dom = require('../../api/dom');
var $$ = require('../../utils');
var BaseView = require('./base');

class DropAreaView extends BaseView {

	constructor(options) {
		super(options);
		this.fileEntered = false;

		this.elems = {
			songsList: dom.qs('.js-songs-list', this.el),
			songDetails: dom.qs('.js-song-details', this.el),
			visualizer: dom.qs('.js-visualizer', this.el),
			dropHint: dom.qs('.js-drop-hint', this.el),
			equalizer: dom.qs('.js-equalizer', this.el)
		};
		this.bindListeners();
	}

	bindListeners() {
		this.el.ondrop = this.onFileDrop.bind(this);
		this.el.ondragenter = this.onFileEnter.bind(this);
		this.el.ondragover = this.onFileDrag.bind(this);
	}

	onFileDrag(e) {
		e.preventDefault();
	}

	onFileDrop(e) {
		var files = [].slice.call(e.dataTransfer.files);
		e.preventDefault();
		this.trigger('files:add', files);
		this.fileEntered = false;
		this.elems.dropHint.ondragleave = null;
		dom.hide(this.elems.dropHint);
		dom.show(this.elems.songDetails);
		dom.show(this.elems.songsList);
		dom.show(this.elems.visualizer);
	}

	onFileLeave(e) {
		if(this.elems.dropHint.contains(e.target) && e.target !== this.elems.dropHint) return;
		this.fileEntered = false;
		this.elems.dropHint.ondragleave = null;
		dom.hide(this.elems.dropHint);


		dom.show(this.elems.visualizer);
		dom.show(this.elems.songDetails);
		dom.show(this.elems.songsList);
	}

	onFileEnter(e) {
		e.preventDefault();
		if(this.fileEntered) return;

		dom.hide(this.elems.songsList);
		dom.hide(this.elems.songDetails);
		dom.hide(this.elems.visualizer);
		dom.hide(this.elems.equalizer);
		dom.show(this.elems.dropHint);

		this.fileEntered = true;
		this.elems.dropHint.ondragleave = this.onFileLeave.bind(this);
	}
}

module.exports = DropAreaView;




