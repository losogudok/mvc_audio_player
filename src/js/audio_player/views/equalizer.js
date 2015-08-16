"use strict";

var dom = require('../../dom');
var $$ = require('../../utils');
var BaseView = require('./base');
var consts = require('../../consts');
var EQUALIZER_RANGE = consts.EQUALIZER_RANGE;
var SLIDER_HIGHEST = consts.SLIDER_HIGHEST;

class EqualizerView extends BaseView {

	constructor(options) {
		super(options);
		var sliders;
		
		this.elems = {
			sliders: {
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
			},
			presets: {
				normal: dom.qs('[data-type="normal"]', this.el), 
				pop: dom.qs('[data-type="pop"]', this.el), 
				rock: dom.qs('[data-type="rock"]', this.el), 
				jazz: dom.qs('[data-type="jazz"]', this.el), 
				classic: dom.qs('[data-type="classic"]', this.el) 
			}
		};
		
		sliders = this.elems.sliders;

		this.slidersCoords = {
			'gain':  sliders['gain'].getBoundingClientRect(),
			'60':  sliders['60'].getBoundingClientRect(),
			'170':  sliders['170'].getBoundingClientRect(),
			'310':  sliders['310'].getBoundingClientRect(),
			'600':  sliders['600'].getBoundingClientRect(),
			'1000':  sliders['1000'].getBoundingClientRect(),
			'3000':  sliders['3000'].getBoundingClientRect(),
			'6000':  sliders['6000'].getBoundingClientRect(),
			'12000':  sliders['12000'].getBoundingClientRect(),
			'14000':  sliders['14000'].getBoundingClientRect(),
			'16000':  sliders['16000'].getBoundingClientRect()
		};

		this.activeSlider = null;

		this.sliderShift = {
			shiftX: null,
			shiftY: null
		};
		this.bindListeners();
	}

	bindListeners() {
		this.model.on('equalizer:changed', this.onEqualizerChanged, this);
		this.model.on('isVisualizing:changed', this.onVisualizingChanged, this);
		window.onresize = this.recalcSlidersCoords.bind(this);
		this.el.onmousedown = this.onThumbMouseDown.bind(this);
		this.el.ondragstart = this.onDragStart.bind(this);
		this.el.onclick = this.onPresetClick.bind(this);
	}

	onEqualizerChanged(e) {
		var slider = this.elems.sliders[e.type];
		var thumb = dom.qs('.js-thumb', slider);
		var y;

		if (e.type === 'gain') {
			y = e.value * SLIDER_HIGHEST;
		}
		else {
			y = (e.value + EQUALIZER_RANGE) / (EQUALIZER_RANGE * 2) * SLIDER_HIGHEST;
		}
		this.moveThumb(thumb, y);
	}

	onVisualizingChanged() {
		 setTimeout(this.recalcSlidersCoords.bind(this), 0);
	}

	onPresetClick(e) {
		var presetEl = e.target;
		var presetType;

		if (!dom.hasClass(presetEl, 'js-preset')) return;
		presetType = presetEl.dataset.type;
		this.trigger('preset:selected', presetType);
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
		var y = this.slidersCoords[type].bottom - e.clientY - this.sliderShift.shiftY;
			y = this.checkCoords(y);
		this.moveThumb(this.activeThumb, y);
		this.trigger('slider:changed', {type: type, value: y});
	}

	onDocumentMouseUp() {
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

	moveThumb(thumb, y) {
		thumb.style.bottom = y + 'px';
	}

	onDragStart() {
		return false;
	}
	
	recalcSlidersCoords() {
		var sliders = this.elems.sliders;

		Object.keys(sliders).forEach(function(key) {
			this.slidersCoords[key] = sliders[key].getBoundingClientRect();
		}, this);
	}
}

module.exports = EqualizerView;