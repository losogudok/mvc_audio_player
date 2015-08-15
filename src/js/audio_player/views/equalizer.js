"use strict";

var dom = require('../../api/dom');
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
			'1K':  dom.qs('[data-type="1K"]', this.el),
			'3K':  dom.qs('[data-type="3K"]', this.el),
			'6K':  dom.qs('[data-type="6K"]', this.el),
			'12K':  dom.qs('[data-type="12K"]', this.el),
			'14K':  dom.qs('[data-type="14K"]', this.el),
			'16K':  dom.qs('[data-type="16K"]', this.el)	
		};

		this.slidersCoords = {
			'gain':  this.sliders['gain'].getBoundingClientRect(),
			'60':  this.sliders['60'].getBoundingClientRect(),
			'170':  this.sliders['170'].getBoundingClientRect(),
			'310':  this.sliders['310'].getBoundingClientRect(),
			'600':  this.sliders['600'].getBoundingClientRect(),
			'1K':  this.sliders['1K'].getBoundingClientRect(),
			'3K':  this.sliders['3K'].getBoundingClientRect(),
			'6K':  this.sliders['6K'].getBoundingClientRect(),
			'12K':  this.sliders['12K'].getBoundingClientRect(),
			'14K':  this.sliders['14K'].getBoundingClientRect(),
			'16K':  this.sliders['16K'].getBoundingClientRect()
		};

		this.activeSlider = null;

		this.sliderShift = {
			shiftX: null,
			shiftY: null
		};
		this.bindListeners();
	}

	bindListeners() {
		window.onresize = this.recalcSlidersCoords.bind(this);
		this.el.onmousedown = this.onThumbMouseDown.bind(this);
		this.el.ondragstart = this.onDragStart.bind(this);
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
		var y = e.clientY - this.sliderShift.shiftY - this.slidersCoords[this.activeSlider.dataset.type].top;
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
		if(y < 0) {
			y = 0;
		}
		var topEdge = this.activeSlider.offsetHeight - this.activeThumb.offsetHeight;
		if(y > topEdge) {
			y = topEdge;
		}
		return y;
	}

	moveThumb(y) {
		y = this.checkCoords(y);
		this.activeThumb.style.top = y + 'px';
		console.log(y);
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