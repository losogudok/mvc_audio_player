"use strict";

var audioEl = document.createElement('audio');
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext();
var FREQUENCIES = [60, 170, 310, 600, 1000, 3000, 6000, 12000, 14000, 16000];
var AUDIO_FORMATS = [
	{
		type: 'audio/mpeg',
		ext: 'mp3'
	},
	{
		type: 'audio/ogg; codecs="vorbis"',
		ext: 'ogg'
	},
	{
		type: 'audio/wav; codecs="1"',
		ext: 'wav'
	},
	{
		type: 'audio/mp4; codecs="mp4a.40.2"',
		ext: 'aac'
	},
	{
		type: 'audio/webm',
		ext: 'weba'
	},
	{
		type: 'audio/flac',
		ext: 'flac'
	}
];

var SUPPORTED_FORMATS = AUDIO_FORMATS.filter(format => {
	return audioEl.canPlayType(format.type) !== '';
});

module.exports = {

	getSongInfo(file, tags) {
		return new Promise(function(resolve, reject) {
			var url = file.urn || file.name;

			ID3.loadTags(url, function() {
					var allTags = ID3.getAllTags(url);
					var picture;
					var result = {};
					var dataUrl;
					var base64String;

					tags.forEach(function(tag) {
						if (tag === 'picture' && allTags.picture) {
							picture = allTags.picture;
							base64String = "";

							for(var i = 0; i < picture.data.length; i++) {
								base64String += String.fromCharCode(picture.data[i]);
							}
							dataUrl = "data:" + picture.format + ";base64," + window.btoa(base64String);
							result.picture = dataUrl;
						}
						else {
							result[tag] = allTags[tag];
						}
					});

					resolve(result);
				},
				{
					tags: tags,
					dataReader: FileAPIReader(file),
					onError: function(reason) {
						reject(reason);
					}
				});
		});
	},

	decodeSong(file) {
		return new Promise(function(resolve, reject) {
			var reader = new FileReader();

			reader.readAsArrayBuffer(file);
			reader.onload = function() {
				var buffer = this.result;

				audioContext.decodeAudioData(buffer, audioBuffer => {
					resolve({
						audioBuffer: audioBuffer,
						sampleRate: audioBuffer.sampleRate,
						duration: audioBuffer.duration
					});
				});
			};

			reader.onerror = function() {
				reject(reader.error);
			};
		});
	},

	createFilters(frequencies) {
		var filters = frequencies.map(this.createFilter);

		filters.reduce(function(prev, curr) {
			prev.connect(curr);
			return curr;
		});

		return filters;
	},

	createFilter(frequency) {
		var filter = audioContext.createBiquadFilter();

		filter.type = 'peaking';
		filter.frequency.value = frequency;
		filter.Q.value = 1;
		filter.gain.value = 0;

		return filter;
	},

	createAnalyser() {
		return audioContext.createAnalyser();
	},

	play(audioBuffer) {
		this.audioSource = audioContext.createBufferSource();
		this.audioSource.buffer = audioBuffer;
		this.audioSource.connect(this.gain);

		this.gain.connect(this.filters[0]);
		this.filters[this.filters.length - 1].connect(this.analyser);
		this.analyser.connect(audioContext.destination);
		this.audioSource.start(0);
	},

	stop() {
		this.audioSource.stop(0);
	},

	init() {
		if (this.initialized) return;
		this.filters = 	this.createFilters(FREQUENCIES);
		this.analyser = this.createAnalyser();
		this.gain = audioContext.createGain();
		this.SUPPORTED_FORMATS = SUPPORTED_FORMATS;
		this.initialized = true;
	}
};