var BaseView = require('./base');
var dom = require('../../api/dom');

class SongDetailsView extends BaseView {

	constructor(options) {
		super(options);
		this.elems = {
			cover: dom.qs('.js-cover', this.el),
			title: dom.qs('.js-title', this.el),
			artist: dom.qs('.js-artist', this.el)
		};
		this.bindListeners();
	}

	bindListeners() {
		this.model.on('selectedSong:changed', this.onSongChanged, this);
	}

	onSongChanged(song) {
		if(song.picture) {
			this.elems.cover.src = song.picture;
			this.elems.title.textContent = song.title;
			this.elems.artist.textContent = song.artist;
		}
		if(!this.songSelected) {
			this.songSelected = true;
			dom.addClass(this.el, 'player__song-description_showed');
		}
	}
}

module.exports = SongDetailsView;