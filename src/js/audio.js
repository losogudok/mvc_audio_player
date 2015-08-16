"use strict";

var audioEl = document.createElement('audio');
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = null;
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

if (AudioContext) {
	audioContext = new AudioContext;
}

module.exports = {
	SUPPORTED_FORMATS: SUPPORTED_FORMATS,
	getAudioContext: function() {
		return audioContext;
	}
};
