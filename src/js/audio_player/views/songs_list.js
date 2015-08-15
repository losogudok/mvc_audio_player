"use strict";

var $$ = require('../../utils');
var Events = require('../../events');
var dom = require('../../api/dom');
var BaseView = require('./base');

class SongsListView extends BaseView {
	constructor(options) {
		super(options);
		this.elems = {
			placeholder: dom.qs('.js-placeholder', this.el)
		};
		this.bindListeners();
	}

	bindListeners() {
		this.model.on('song:add', this.onSongAdd, this);
		this.el.onclick = this.onSongClick.bind(this);
	}

	onSongClick(e) {
		var target = e.target;
		var songEl = dom.closest(target, '.js-song');

		this.selectSong(songEl);
		this.trigger('song:selected', songEl.dataset.id);
	}

	onSongAdd(song) {
		var songEl = this.createSongEl(song);

		if(!this.haveSongs) {
			this.elems.placeholder.remove();
		}
		this.haveSongs = true;
		this.el.appendChild(songEl);
	}

	selectSong(songEl) {
		$$.toArray(songEl.parentNode.children)
			.filter(el = > el !== songEl
	)
	.
		forEach(el = > dom.removeClass(el, 'song-item_selected')
	)
		;

		dom.addClass(songEl, 'song-item_selected');
	}

	createSongEl(song) {
		var songEl = this.template.cloneNode(true);
		var title = dom.qs('.js-song-title', songEl);
		var artist = dom.qs('.js-song-artist', songEl);
		var cover = dom.qs('.js-song-cover', songEl);
		var duration = dom.qs('.js-song-duration', songEl);

		title.textContent = song.title;
		artist.textContent = song.artist;

		duration.textContent = this.formatDuration(song.duration);
		songEl.dataset.id = song.id;
		if(song.picture) {
			cover.src = song.picture;
		}

		return songEl;
	}

	formatDuration(secs) {
		var minutes = Math.floor(secs / 60);
		var seconds = secs % 60;

		if(seconds.toString().length === 1) {
			seconds = '0' + seconds;
		}

		return `${minutes}
	:${seconds}
	`;
	}
}

module.exports = SongsListView; 