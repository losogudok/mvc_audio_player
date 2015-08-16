"use strict";

var BaseController = require('./base');
var consts = require('../../consts');
var EQUALIZER_PRESETS = consts.EQUALIZER_PRESETS;
var EQUALIZER_RANGE = consts.EQUALIZER_RANGE;
var SLIDER_HIGHEST =  consts.SLIDER_HIGHEST;

class EqualizeController extends BaseController {
	bindListeners() {
		this.view.on('slider:changed', this.onSliderChanged, this);
		this.view.on('preset:selected', this.onPresetSelected, this);
	}

	onPresetSelected(presetType) {
		var preset = EQUALIZER_PRESETS[presetType];

		Object.keys(preset).forEach(function(freq){
			this.model.equalizer[freq] = preset[freq];
		}, this);
	}

	onSliderChanged(e) {
		var result;

		if(e.type === 'gain') {
			result = e.value / SLIDER_HIGHEST;
		}
		else {
			result = e.value * EQUALIZER_RANGE * 2 / SLIDER_HIGHEST - EQUALIZER_RANGE;
		}
		this.model.equalizer[e.type] = result;
	}
}

module.exports = EqualizeController;