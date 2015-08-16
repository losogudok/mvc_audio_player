var id = 1;

class Song {
	constructor(data) {
		this.id = id;
		this.audioBuffer = data.audioBuffer;
		this.fileName = data.fileName;
		this.title = data.title || '';
		this.artist = data.artist || '';
		this.duration = Math.round(data.duration);
		this.picture = data.picture || null;
		id++;
	}
}

module.exports = Song;