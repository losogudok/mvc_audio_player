"use strict";

var BaseController = require('./base');

class PlayerController extends BaseController {
	bindListeners() {
		this.view.on('song:end', this.onSongEnd, this);
	}

	onSongEnd() {
		this.model.playingSong = null;
	}
}

module.exports = PlayerController;