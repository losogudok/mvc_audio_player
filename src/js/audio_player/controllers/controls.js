"use strict";

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
			case 'eq':
				this.model.isVisualizing = !this.model.isVisualizing;
		}
	}
}

module.exports = ControlsController;