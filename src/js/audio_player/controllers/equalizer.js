"use strict";

var BaseController = require('./base');
var SLIDER_HIGHEST = 200;
var EQUALIZER_RANGE = 12;


class EqualizeController extends BaseController {
	bindListeners() {
		this.view.on('slider:changed', this.sliderChanged, this);
	}

	sliderChanged(e) {
		var result;

		if (e.type === 'gain') {
			result = e.value / SLIDER_HIGHEST;
		}
		else {
			result = e.value * EQUALIZER_RANGE * 2 / SLIDER_HIGHEST - EQUALIZER_RANGE;
		}
		this.model.equalizer[e.type] = result;
	}
}

module.exports = EqualizeController;