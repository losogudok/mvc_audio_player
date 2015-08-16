"use strict";

var BaseView = require('./base');
var audioContext = require('../../audio').getAudioContext();
var FREQUENCIES = [60, 170, 310, 600, 1000, 3000, 6000, 12000, 14000, 16000];
var analyser = require('../../audio_analyser');
var dom = require('../../dom');

class PlayerView extends BaseView {

	constructor(options) {
		super(options);
		this.gain = audioContext.createGain();
		this.filters = this.createFilters(FREQUENCIES);
		this.analyser = analyser;
		this.elems = {
			visualizer: dom.qs('.js-visualizer', this.el),
			equalizer: dom.qs('.js-equalizer', this.el)
		};
		this.bindListeners();
	}

	bindListeners() {
		this.model.on('isVisualizing:changed', this.onVisualizingChanged, this);
		this.model.on('playingSong:changed', this.onPlayingSongChanged, this);
		this.model.on('equalizer:changed', this.onEqualizerChanged, this);
	}

	onEqualizerChanged(e) {
		var filterIndex;

		if (e.type === 'gain') {
			this.gain.gain.value = e.value;
		}
		else {
			filterIndex = FREQUENCIES.indexOf(Number(e.type));
			this.filters[filterIndex].gain.value = e.value;
		}
	}

	onVisualizingChanged(isVisualizing) {
		if (isVisualizing) {
			dom.hide(this.elems.equalizer);
			dom.show(this.elems.visualizer);
		}
		else {
			dom.hide(this.elems.visualizer);
			dom.show(this.elems.equalizer);
		}
	}

	onPlayingSongChanged(song) {
		if(!song) {
			this.stopSong();
		}
		else {
			this.playSong(song);
		}
	}

	playSong(song) {
		var audioBuffer = song.audioBuffer;
		var self = this;

		this.audioSource = audioContext.createBufferSource();
		this.audioSource.buffer = audioBuffer;
		this.audioSource.connect(this.gain);
		this.gain.connect(this.filters[0]);
		this.filters[this.filters.length - 1].connect(this.analyser);
		this.analyser.connect(audioContext.destination);
		this.audioSource.start(0);
		this.timerId = setTimeout(function(){
			self.trigger('song:end');
		}, song.duration * 1000);
	}

	stopSong() {
		clearTimeout(this.timerId);
		this.audioSource.stop(0);
	}

	createFilters(frequencies) {
		var filters = frequencies.map(this.createFilter);

		filters.reduce(function(prev, curr) {
			prev.connect(curr);
			return curr;
		});

		return filters;
	}

	createFilter(frequency) {
		var filter = audioContext.createBiquadFilter();

		filter.type = 'peaking';
		filter.frequency.value = frequency;
		filter.Q.value = 1;
		filter.gain.value = 0;

		return filter;
	}
}

module.exports = PlayerView;




