"use strict";

var BaseView = require('./base');
var dom = require('../../dom');

class ControlsView extends BaseView {
	constructor(options) {
		super(options);
		this.elems = {
			prev: dom.qs('.js-prev'),
			next: dom.qs('.js-next'),
			play: dom.qs('.js-play'),
			pause: dom.qs('.js-pause'),
			stop: dom.qs('.js-stop'),
			eq: dom.qs('.js-eq')
		};
		this.isPlaying = false;
		this.songs = [];
		this.bindListeners();
	}

	bindListeners() {
		this.el.onclick = this.onControlClick.bind(this);
		this.model.on('selectedSong:changed', this.onSelectedSongChanged, this);
		this.model.on('playingSong:changed', this.onPlayingSongChanged, this);
		this.model.on('song:add', this.onSongAdd, this);
	}

	onSongAdd(song) {
		this.songs.push(song.id);
	}

	onPlayingSongChanged(song) {
		if(!song) {
			this.isPlaying = false;
			dom.addClass(this.elems.stop, 'icon_disabled');
			dom.removeClass(this.elems.play, 'icon_disabled');
		}
		else {
			this.isPlaying = true;
			dom.removeClass(this.elems.stop, 'icon_disabled');
			dom.addClass(this.elems.play, 'icon_disabled');
		}
	}

	onSelectedSongChanged(song) {
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
