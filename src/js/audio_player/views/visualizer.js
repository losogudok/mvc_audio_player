"use strict";

var BaseView = require('./base');
var dom = require('../../dom');
var audio = require('../../audio');
var analyser = require('../../audio_analyser');

class VisualizerView extends BaseView {
	constructor(options) {
		super(options);

		this.elems = {
			canvas: dom.qs('.js-canvas', this.el)
		};
		this.frameId = null;
		this.canvasW = this.elems.canvas.offsetWidth;
		this.canvasH = this.elems.canvas.offsetHeight;
		this.canvasCtx = this.elems.canvas.getContext('2d');
		this.bindListeners();
	}

	bindListeners() {
		this.model.on('playingSong:changed', this.onPlayingSongChanged, this);
	}

	onPlayingSongChanged(song) {
		if(song) {
			this.startVisualization();
		}
		else {
			this.stopVisualization();
		}
	}

	clearCanvas() {
		this.canvasCtx.clearRect(0, 0, this.canvasW, this.canvasH);
	}

	stopVisualization() {
		cancelAnimationFrame(this.frameId);
		this.clearCanvas();
	}

	startVisualization() {
		var i;
		var x = 0;
		var v;
		var y;
		var sliceWidth;
		var bufferLength = analyser.frequencyBinCount;
		var dataArray = new Uint8Array(bufferLength);

		this.clearCanvas();
		this.frameId = requestAnimationFrame(this.startVisualization.bind(this));
		analyser.getByteTimeDomainData(dataArray);
		this.canvasCtx.lineWidth = 1;
		this.canvasCtx.strokeStyle = 'red';
		this.canvasCtx.beginPath();

		sliceWidth = this.canvasW * 1.0 / bufferLength;

		for(i = 0; i < bufferLength; i++) {
			v = dataArray[i] / 128.0;
			y = v * this.canvasH / 2;

			if(i === 0) {
				this.canvasCtx.moveTo(x, y);
			}
			else {
				this.canvasCtx.lineTo(x, y);
			}

			x += sliceWidth;
		}
		this.canvasCtx.lineTo(this.canvasW, this.canvasH / 2);
		this.canvasCtx.closePath();
		this.canvasCtx.stroke();
	}
}

module.exports = VisualizerView;