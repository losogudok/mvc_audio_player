"use strict";

var BaseController = require('./base');
var SLIDER_HIGHEST = 200;
var EQUALIZER_RANGE = 12;

class EqualizeController extends BaseController {
	bindListeners() {
		this.view.on('slider:changed', this.sliderChanged, this);
	}

	sliderChanged(e) {
		this.model.equalizer[e.type] = e.value * EQUALIZER_RANGE * 2 / SLIDER_HIGHEST - EQUALIZER_RANGE;
	}
}

module.exports = EqualizeController;