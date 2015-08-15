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
		}, this);

		this.songs.on('song:removed', function(song) {
			this.trigger('song:removed', song);
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


