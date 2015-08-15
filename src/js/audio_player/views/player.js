"use strict";

var BaseView = require('./base');
var Audio = require('../../api/audio');

class PlayerView extends BaseView {

	constructor(options) {
		super(options);
		this.bindListeners();
	}

	bindListeners() {
		this.model.on('playingSong:changed', this.onPlayingSongChanged, this);
	}

	onPlayingSongChanged(song) {
		if(!song) {
			this.stopSong();
		}
		else {
			this.playSong(song);
		}
	}

	playSong(song) {
		Audio.play(song.audioBuffer);
	}

	stopSong() {
		Audio.stop();
	}
}

module.exports = PlayerView;




