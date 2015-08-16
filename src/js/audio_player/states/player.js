"use strict";

var Events = require('../../events');
var $$ = require('../../utils');
var Songs = require('../models/songs');

class PlayerState {
	constructor() {
		this.songs = new Songs();
		this.selectedSong = null;
		this.playingSong = null;
		this.isVisualizing = false;
		this.haveSongs = false;
		this.equalizer = {
			'gain':  0,
			'60':  0,
			'170':  0,
			'310':  0,
			'600':  0,
			'1K':  0,
			'3K':  0,
			'6K':  0,
			'12K':  0,
			'14K':  0,
			'16K':  0
		};
		this.observeProperties();
		this.bindListeners();
	}

	observeProperties() {
		Object.keys(this).forEach(function(key) {
			this['_' + key] = this[key];

			Object.defineProperty(this, key, {
				get: function() {
					return this['_' + key];
				},
				set: function(value) {
					if(this['_' + key] === value) return;

					this['_' + key] = value;
					this.trigger(key + ':changed', value);
				}
			});
		}, this);
	}

	bindListeners() {
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


