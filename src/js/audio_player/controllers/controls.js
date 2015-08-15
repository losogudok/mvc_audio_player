"use strict";

var $$ = require('../../utils');
var Events = require('../../events');
var dom = require('../../api/dom');
var BaseController = require('./base');

class ControlsController extends BaseController {
	bindListeners() {
		this.view.on('control:pressed', this.onControlPressed, this);
	}

	onControlPressed(controlType) {
		switch(controlType) {
			case 'play':
				this.model.playingSong = this.model.selectedSong;
				break;
			case 'stop':
				this.model.playingSong = null;
				break;
		}
	}
}

module.exports = ControlsController;