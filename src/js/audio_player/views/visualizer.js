var BaseView = require('./base');
var dom = require('../../api/dom');
var audio = require('../../api/audio');

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
			this.draw();
		}
		else {
			this.stopDraw();
		}
	}

	stopDraw() {
		cancelAnimationFrame(this.frameId);
		this.clearCanvas();
	}

	clearCanvas() {
		this.canvasCtx.fillStyle = 'white';
		this.canvasCtx.fillRect(0, 0, this.canvasW, this.canvasH);
	}

	draw() {
		var x = 0;
		var v;
		var y;
		var sliceWidth;
		//var dataArray = new Uint8Array(audio.analyser.frequencyBinCount);


		var bufferLength = audio.analyser.fftSize;
		var dataArray = new Uint8Array(bufferLength);

		this.frameId = requestAnimationFrame(this.draw.bind(this));
		audio.analyser.getByteTimeDomainData(dataArray);
		//audio.analyser.getByteFrequencyData(dataArray);
		this.clearCanvas();
		this.canvasCtx.lineWidth = 2;
		this.canvasCtx.strokeStyle = '#6161EF';
		this.canvasCtx.beginPath();
		sliceWidth = this.canvasW * 1.0 / bufferLength;

		for(var i = 0; i < bufferLength; i++) {
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
		this.canvasCtx.stroke();
	}
}

module.exports = VisualizerView;