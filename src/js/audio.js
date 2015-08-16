"use strict";

var audioEl = document.createElement('audio');
var consts = require('./consts');
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = null;
var SUPPORTED_FORMATS = consts.AUDIO_FORMATS.filter(format => {
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
