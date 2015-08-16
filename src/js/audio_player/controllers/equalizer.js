"use strict";

var BaseController = require('./base');
var SLIDER_HIGHEST = 200;


class EqualizeController extends BaseController {
	bindListeners() {
		this.view.on('slider:changed', this.sliderChanged, this);
	}

	sliderChanged(e) {
		this.model.equalizer[e.type] = e.value / SLIDER_HIGHEST;
	}
}

module.exports = EqualizeController;