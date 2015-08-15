var id = 1;

class Song {
	constructor(data) {
		this.id = id;
		this.audioBuffer = data.audioBuffer;
		this.fileName = data.fileName;
		this.title = data.title || this.fileName;
		this.artist = data.artist || '';
		this.duration = Math.round(data.duration);
		this.picture = data.picture || '';
		id++;
	}
}

module.exports = Song;