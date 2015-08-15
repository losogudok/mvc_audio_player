"use strict";

var $$ = require('../../utils');
var Events = require('../../events');
var dom = require('../../api/dom');
var Audio = require('../../api/audio');
var BaseController = require('./base');

class PlayerController extends BaseController {

	bindListeners() {
		this.view.on('files:add', this.onFilesAdd, this);
	}

	onFilesAdd(files) {
		var self = this;

		this.filterAudioFiles(files).forEach(function(file) {
			Promise.all([Audio.getSongInfo(file, ["title", "artist", "picture"]), Audio.decodeSong(file)])
				.then(function(values) {
					$$.assign(values[0], values[1], {fileName: file.name});
					self.model.addSong(values[0]);
				});
		}, this);
	}

	filterAudioFiles(files) {
		return files.filter(this.isAudioFile, this);
	}

	isAudioFile(file) {
		var support = false;

		Audio.SUPPORTED_FORMATS.forEach(format => {
			if(file.name.search(format.ext) !== -1) {
				support = true;
			}
		});

		return support;
	}
}

module.exports = PlayerController;



