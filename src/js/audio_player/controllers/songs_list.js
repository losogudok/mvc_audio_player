"use strict";

var $$ = require('../../utils');
var Events = require('../../events');
var dom = require('../../api/dom');
var BaseController = require('./base');

class SongsListController extends BaseController {
	bindListeners() {
		this.view.on('song:selected', this.onSongSelected, this);
	}

	onSongSelected(songId) {
		this.model.selectedSong = this.model.getSong(Number(songId));
	}
}

module.exports = SongsListController;