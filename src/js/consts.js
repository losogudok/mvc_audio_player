"use strict";

var SLIDER_HIGHEST = 200;
var EQUALIZER_RANGE = 12;
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
var EQUALIZER_PRESETS = {
	normal: {
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
	},
	pop: {
		'60':  -1.6,
		'170':  4.8,
		'310':  7.2,
		'600':  8,
		'1000':  5.6,
		'3000':  1.1,
		'6000':  2.4,
		'12000':  2.4,
		'14000':  1.6,
		'16000':  1.6
	},
	rock: {
		'60':  8,
		'170':  4.8,
		'310':  -5.6,
		'600':  -8,
		'1000':  3.2,
		'3000':  4,
		'6000':  8.8,
		'12000':  11.2,
		'14000':  11.2,
		'16000':  11.2
	},
	jazz: {
		'60':  10,
		'170':  9.2,
		'310':  6,
		'600':  6,
		'1000':  4,
		'3000':  2.2,
		'6000':  2.2,
		'12000':  -4,
		'14000':  -8.2,
		'16000':  -8.2
	},
	classic: {
		'60':  -4.8,
		'170':  -1.1,
		'310':  4,
		'600':  5.6,
		'1000':  5.6,
		'3000':  5.6,
		'6000':  4,
		'12000':  2.4,
		'14000':  2.4,
		'16000':  2.4
	}
};

module.exports = {
	SLIDER_HIGHEST: SLIDER_HIGHEST,
	EQUALIZER_RANGE: EQUALIZER_RANGE,
	AUDIO_FORMATS: AUDIO_FORMATS,
	EQUALIZER_PRESETS: EQUALIZER_PRESETS
};
