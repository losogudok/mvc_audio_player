"use strict";

var dom = require('../../dom');
var $$ = require('../../utils');
var BaseView = require('./base');

class EqualizerView extends BaseView {

	constructor(options) {
		super(options);
		
		this.sliders = {
			'gain':  dom.qs('[data-type="gain"]', this.el),
			'60':  dom.qs('[data-type="60"]', this.el),
			'170':  dom.qs('[data-type="170"]', this.el),
			'310':  dom.qs('[data-type="310"]', this.el),
			'600':  dom.qs('[data-type="600"]', this.el),
			'1000':  dom.qs('[data-type="1000"]', this.el),
			'3000':  dom.qs('[data-type="3000"]', this.el),
			'6000':  dom.qs('[data-type="6000"]', this.el),
			'12000':  dom.qs('[data-type="12000"]', this.el),
			'14000':  dom.qs('[data-type="14000"]', this.el),
			'16000':  dom.qs('[data-type="16000"]', this.el)
		};

		this.slidersCoords = {
			'gain':  this.sliders['gain'].getBoundingClientRect(),
			'60':  this.sliders['60'].getBoundingClientRect(),
			'170':  this.sliders['170'].getBoundingClientRect(),
			'310':  this.sliders['310'].getBoundingClientRect(),
			'600':  this.sliders['600'].getBoundingClientRect(),
			'1000':  this.sliders['1000'].getBoundingClientRect(),
			'3000':  this.sliders['3000'].getBoundingClientRect(),
			'6000':  this.sliders['6000'].getBoundingClientRect(),
			'12000':  this.sliders['12000'].getBoundingClientRect(),
			'14000':  this.sliders['14000'].getBoundingClientRect(),
			'16000':  this.sliders['16000'].getBoundingClientRect()
		};

		this.activeSlider = null;

		this.sliderShift = {
			shiftX: null,
			shiftY: null
		};
		this.bindListeners();
	}

	bindListeners() {
		this.model.on('isVisualizing:changed', this.onVisualizingChanged, this);
		window.onresize = this.recalcSlidersCoords.bind(this);
		this.el.onmousedown = this.onThumbMouseDown.bind(this);
		this.el.ondragstart = this.onDragStart.bind(this);
	}

	onVisualizingChanged() {
		 setTimeout(this.recalcSlidersCoords.bind(this), 0);
	}

	onThumbMouseDown(e) {
		var target = e.target;
		var	thumbCoords;

		if (!dom.hasClass(e.target, 'js-thumb')) return;

		thumbCoords = target.getBoundingClientRect();
		this.activeThumb = target;
		this.activeSlider = dom.closest(target, '.js-slider');
		this.sliderShift.shiftX = e.pageX - thumbCoords.left;
		this.sliderShift.shiftY = e.pageY - thumbCoords.top;
		document.onmousemove = this.onDocumentMouseMove.bind(this);
		document.onmouseup = this.onDocumentMouseUp.bind(this);
	}

	onDocumentMouseMove(e) {
		var type = this.activeSlider.dataset.type;
		var y = e.clientY - this.sliderShift.shiftY - this.slidersCoords[type].top;
		this.moveThumb(y);
	}

	onDocumentMouseUp(e) {
		document.onmousemove = null;
		document.onmouseup = null;
		this.activeSlider = null;
		this.activeThumb = null;
		this.sliderShift.shiftX = null;
		this.sliderShift.shiftY = null;
	}

	checkCoords(y) {
		var topEdge;

		if(y < 0) {
			y = 0;
		}
		topEdge = this.activeSlider.offsetHeight - this.activeThumb.offsetHeight;
		if(y > topEdge) {
			y = topEdge;
		}
		return y;
	}

	moveThumb(y) {
		var type = this.activeSlider.dataset.type;
		y = this.checkCoords(y);
		this.activeThumb.style.top = y + 'px';
		this.trigger('slider:changed', {type: type, value: Math.abs(y - 200)});
	}

	onDragStart() {
		return false;
	}
	
	recalcSlidersCoords() {
		Object.keys(this.sliders).forEach(function(key) {
			this.slidersCoords[key] = this.sliders[key].getBoundingClientRect();
		}, this);
	}
}

module.exports = EqualizerView;