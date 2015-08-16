"use strict";

var BaseView = require('./base');
var dom = require('../../dom');

class SongDetailsView extends BaseView {

	constructor(options) {
		super(options);
		this.elems = {
			cover: dom.qs('.js-cover', this.el),
			title: dom.qs('.js-title', this.el),
			artist: dom.qs('.js-artist', this.el),
			fileName: dom.qs('.js-filename', this.el)
		};
		this.defaultPicture = this.elems.cover.src;
		this.playingSong = null;

		this.bindListeners();
	}

	bindListeners() {
		this.model.on('selectedSong:changed', this.onSelectedSongChanged, this);
		this.model.on('playingSong:changed', function(song){
			this.playingSong = song;
		}, this);
	}

	onSelectedSongChanged(song) {
		if (this.playingSong) return;

		if(song.picture) {
			this.elems.cover.src = song.picture;
		}
		else {
			this.elems.cover.src = this.defaultPicture;
		}
		if (!song.title) {
			this.elems.fileName.textContent = '';
		}
		else {
			this.elems.fileName.textContent = song.fileName;
		}
		this.elems.title.textContent = song.title || song.fileName;
		this.elems.artist.textContent = song.artist || '';
	}
}

module.exports = SongDetailsView;