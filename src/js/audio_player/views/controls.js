"use strict";

var BaseView = require('./base');
var dom = require('../../dom');

class ControlsView extends BaseView {
	constructor(options) {
		super(options);
		this.elems = {
			play: dom.qs('.js-play'),
			stop: dom.qs('.js-stop'),
			eq: dom.qs('.js-eq')
		};
		this.isPlaying = false;
		this.bindListeners();
	}

	bindListeners() {
		this.el.onclick = this.onControlClick.bind(this);
		this.model.on('selectedSong:changed', this.onSelectedSongChanged, this);
		this.model.on('playingSong:changed', this.onPlayingSongChanged, this);
	}

	onPlayingSongChanged(song) {
		if(!song) {
			this.isPlaying = false;
			dom.hide(this.elems.stop);
			dom.show(this.elems.play);
		}
		else {
			this.isPlaying = true;
			dom.show(this.elems.stop);
			dom.hide(this.elems.play);
		}
	}

	onSelectedSongChanged() {
		if(!this.isPlaying) {
			dom.removeClass(this.elems.play, 'icon_disabled');
		}
	}

	onControlClick(e) {
		var control = dom.closest(e.target, '.js-control');
		if(!control || dom.hasClass(control, 'icon_disabled')) return;
		var controlType = control.dataset.type;
		this.trigger('control:pressed', controlType);
	}
}

module.exports = ControlsView;
