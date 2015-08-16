var Events = require('../../events');
var $$ = require('../../utils');
var Song = require('./song');

class Songs {
	constructor() {
		this.songs = [];
		this.length = 0;
	}

	getSong(id) {
		for(var i = 0; i < this.songs.length; i++) {
			if(id === this.songs[i].id) {
				return this.songs[i];
			}
		}
	}

	addSong(data) {
		var song = new Song(data);
		this.songs.push(song);
		this.length++;
		this.trigger('song:add', song);
	}

	removeSong(id) {
		var song = this.getSong(id);
		if(song !== undefined) {
			this.songs.splice(song, 1);
			this.length--;
			this.trigger('song:removed', song);
		}
	}
}

$$.assign(Songs.prototype, Events);

module.exports = Songs;