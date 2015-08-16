"use strict";

var $$ = require('../../utils');
var audio = require('../../audio');
var audioContext = audio.getAudioContext();
var BaseController = require('./base');

class PlayerController extends BaseController {

	bindListeners() {
		this.view.on('files:add', this.onFilesAdd, this);
	}

	onFilesAdd(files) {
		var self = this;

		self.filterAudioFiles(files).forEach(function(file) {
			Promise.all([self.getSongInfo(file, ["title", "artist", "picture"]), self.decodeSong(file)])
				.then(function(values) {
					$$.assign(values[0], values[1], {fileName: file.name});
					self.model.addSong(values[0]);
				})
				.catch(function(err){
					self.model.errorMessage = err +' in file ' + file.name;
				});
		});
	}

	filterAudioFiles(files) {
		return files.filter(this.isAudioFile, this);
	}

	isAudioFile(file) {
		var support = false;

		audio.SUPPORTED_FORMATS.forEach(format => {
			if(file.name.search(format.ext) !== -1) {
				support = true;
			}
		});

		return support;
	}

	getSongInfo(file, tags) {
		return new Promise(function(resolve, reject) {
			var url = file.urn || file.name;

			ID3.loadTags(url, function() {
					var allTags = ID3.getAllTags(url);
					var picture;
					var result = {};
					var dataUrl;
					var base64String;

					tags.forEach(function(tag) {
						if (tag === 'picture' && allTags.picture) {
							picture = allTags.picture;
							base64String = "";

							for(var i = 0; i < picture.data.length; i++) {
								base64String += String.fromCharCode(picture.data[i]);
							}
							dataUrl = "data:" + picture.format + ";base64," + window.btoa(base64String);
							result.picture = dataUrl;
						}
						else {
							result[tag] = allTags[tag];
						}
					});

					resolve(result);
				},
				{
					tags: tags,
					dataReader: FileAPIReader(file),
					onError: function(reason) {
						reject(reason);
					}
				});
		});
	}

	decodeSong(file) {
		return new Promise(function(resolve, reject) {
			var reader = new FileReader();

			reader.readAsArrayBuffer(file);
			reader.onload = function() {
				var buffer = this.result;

				audioContext.decodeAudioData(buffer, function success(audioBuffer) {
					resolve({
						audioBuffer: audioBuffer,
						sampleRate: audioBuffer.sampleRate,
						duration: audioBuffer.duration
					});
				},
				function error(err) {
					reject('Audio decode error');
				});
			};

			reader.onerror = function() {
				reject('Error while reading file');
			};
		});
	}
}

module.exports = PlayerController;



