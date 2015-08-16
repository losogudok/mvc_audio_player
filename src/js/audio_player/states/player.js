"use strict";

var Events = require('../../events');
var $$ = require('../../utils');
var Songs = require('../models/songs');

class PlayerState {
	constructor() {
		this.songs = new Songs();
		this.selectedSong = null;
		this.playingSong = null;
		this.isVisualizing = true;
		this.haveSongs = false;
		this.equalizer = {
			'gain':  0,
			'60':  0,
			'170':  0,
			'310':  0,
			'600':  0,
			'1000':  0,
			'3000':  0,
			'6000':  0,
			'12000':  0,
			'14000':  0,
			'16000':  0
		};
		$$.observeProperties(this);
		$$.assign(this.equalizer, Events);
		$$.observeProperties(this.equalizer);
		this.bindListeners();
	}

	bindListeners() {
		this.equalizer.on('all', function(eventType, value){
			var type = eventType.split(":")[0];

			this.trigger('equalizer:changed', {
				type: type,
				value: value
			});
		}, this);

		this.songs.on('song:add', function(song) {
			this.trigger('song:add', song);
			if (this.songs.length === 1) {
				this.haveSongs = true;
			}
		}, this);

		this.songs.on('song:removed', function(song) {
			this.trigger('song:removed', song);
			if (this.songs.length === 0) {
				this.haveSongs = false;
			}
		}, this);
	}

	getSong(id) {
		return this.songs.getSong(id);
	}

	addSong(data) {
		return this.songs.addSong(data);
	}

	removeSong(id) {
		return this.songs.removeSong(id);
	}
}

$$.assign(PlayerState.prototype, Events);

module.exports = PlayerState;


