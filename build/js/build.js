(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var PlayerView = require('./audio_player/views/player');
var PlayerState = require('./audio_player/states/player');
var PlayerController = require('./audio_player/controllers/player');

var DropAreaView = require('./audio_player/views/drop_area');
var DropAreaController = require('./audio_player/controllers/drop_area');

var SongsListView = require('./audio_player/views/songs_list');
var SongsListController = require('./audio_player/controllers/songs_list');

var SongDetailsView = require('./audio_player/views/song_details');

var ControlsView = require('./audio_player/views/controls');
var ControlsController = require('./audio_player/controllers/controls');

var VisualizerView = require('./audio_player/views/visualizer');

var NotificationView = require('./audio_player/views/notification');

var EqualizerView = require('./audio_player/views/equalizer');
var EqualizerController = require('./audio_player/controllers/equalizer');

var dom = require('./dom');

// Player State
var playerState = new PlayerState();

// Main
var playerView = new PlayerView({
	el: dom.byId('audioPlayer'),
	model: playerState
});

var playerController = new PlayerController({
	view: playerView,
	model: playerState
});

// Drop area
var dropAreaView = new DropAreaView({
	el: dom.qs('.js-drop-area', playerView.el),
	model: playerState
});

var dropAreaController = new DropAreaController({
	view: dropAreaView,
	model: playerState
});

// Songs List
var songsListView = new SongsListView({
	el: dom.qs('.js-songs-list', playerView.el),
	template: dom.byId('songListItem'),
	model: playerState
});

var songsListController = new SongsListController({
	model: playerState,
	view: songsListView
});

// Details
var songDetailsView = new SongDetailsView({
	el: dom.qs('.js-song-details', playerView.el),
	model: playerState
});

// Controls
var controlsView = new ControlsView({
	el: dom.qs('.js-controls', playerView.el),
	model: playerState
});

var controlsController = new ControlsController({
	model: playerState,
	view: controlsView
});

// Equalizer
var equalizerView = new EqualizerView({
	el: dom.qs('.js-equalizer', playerView.el),
	model: playerState
});

var equalizerController = new EqualizerController({
	view: equalizerView,
	model: playerState
});

// Visualizer
var visualizerView = new VisualizerView({
	el: dom.qs('.js-visualizer', playerView.el),
	model: playerState
});

// Notification
var notificationView = new NotificationView({
	el: dom.qs('.js-notification', playerView.el),
	model: playerState
});

},{"./audio_player/controllers/controls":5,"./audio_player/controllers/drop_area":6,"./audio_player/controllers/equalizer":7,"./audio_player/controllers/player":8,"./audio_player/controllers/songs_list":9,"./audio_player/states/player":12,"./audio_player/views/controls":14,"./audio_player/views/drop_area":15,"./audio_player/views/equalizer":16,"./audio_player/views/notification":17,"./audio_player/views/player":18,"./audio_player/views/song_details":19,"./audio_player/views/songs_list":20,"./audio_player/views/visualizer":21,"./dom":23}],2:[function(require,module,exports){
"use strict";

var audioEl = document.createElement('audio');
var consts = require('./consts');
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = null;
var SUPPORTED_FORMATS = consts.AUDIO_FORMATS.filter(function (format) {
	return audioEl.canPlayType(format.type) !== '';
});

if (AudioContext) {
	audioContext = new AudioContext();
}

module.exports = {
	SUPPORTED_FORMATS: SUPPORTED_FORMATS,
	getAudioContext: function getAudioContext() {
		return audioContext;
	}
};

},{"./consts":22}],3:[function(require,module,exports){
var audioContext = require('./audio').getAudioContext();

module.exports = audioContext.createAnalyser();

},{"./audio":2}],4:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseController = (function () {
	function BaseController(options) {
		_classCallCheck(this, BaseController);

		this.model = options.model;
		this.view = options.view;
		this.bindListeners();
	}

	_createClass(BaseController, [{
		key: "bindListeners",
		value: function bindListeners() {}
	}]);

	return BaseController;
})();

module.exports = BaseController;

},{}],5:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseController = require('./base');

var ControlsController = (function (_BaseController) {
	_inherits(ControlsController, _BaseController);

	function ControlsController() {
		_classCallCheck(this, ControlsController);

		_get(Object.getPrototypeOf(ControlsController.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(ControlsController, [{
		key: 'bindListeners',
		value: function bindListeners() {
			this.view.on('control:pressed', this.onControlPressed, this);
		}
	}, {
		key: 'onControlPressed',
		value: function onControlPressed(controlType) {
			switch (controlType) {
				case 'play':
					this.model.playingSong = this.model.selectedSong;
					break;
				case 'stop':
					this.model.playingSong = null;
					break;
				case 'eq':
					this.model.isVisualizing = !this.model.isVisualizing;
					break;
			}
		}
	}]);

	return ControlsController;
})(BaseController);

module.exports = ControlsController;

},{"./base":4}],6:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var $$ = require('../../utils');
var audio = require('../../audio');
var audioContext = audio.getAudioContext();
var BaseController = require('./base');

var PlayerController = (function (_BaseController) {
	_inherits(PlayerController, _BaseController);

	function PlayerController() {
		_classCallCheck(this, PlayerController);

		_get(Object.getPrototypeOf(PlayerController.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(PlayerController, [{
		key: 'bindListeners',
		value: function bindListeners() {
			this.view.on('files:add', this.onFilesAdd, this);
		}
	}, {
		key: 'onFilesAdd',
		value: function onFilesAdd(files) {
			var self = this;

			self.filterAudioFiles(files).forEach(function (file) {
				Promise.all([self.getSongInfo(file, ["title", "artist", "picture"]), self.decodeSong(file)]).then(function (values) {
					$$.assign(values[0], values[1], { fileName: file.name });
					self.model.addSong(values[0]);
				})['catch'](function (err) {
					self.model.errorMessage = err + ' in file ' + file.name;
				});
			});
		}
	}, {
		key: 'filterAudioFiles',
		value: function filterAudioFiles(files) {
			return files.filter(this.isAudioFile, this);
		}
	}, {
		key: 'isAudioFile',
		value: function isAudioFile(file) {
			var support = false;

			audio.SUPPORTED_FORMATS.forEach(function (format) {
				if (file.name.search(format.ext) !== -1) {
					support = true;
				}
			});

			return support;
		}
	}, {
		key: 'getSongInfo',
		value: function getSongInfo(file, tags) {
			return new Promise(function (resolve, reject) {
				var url = file.urn || file.name;

				ID3.loadTags(url, function () {
					var allTags = ID3.getAllTags(url);
					var picture;
					var result = {};
					var dataUrl;
					var base64String;

					tags.forEach(function (tag) {
						if (tag === 'picture' && allTags.picture) {
							picture = allTags.picture;
							base64String = "";

							for (var i = 0; i < picture.data.length; i++) {
								base64String += String.fromCharCode(picture.data[i]);
							}
							dataUrl = "data:" + picture.format + ";base64," + window.btoa(base64String);
							result.picture = dataUrl;
						} else {
							result[tag] = allTags[tag];
						}
					});

					resolve(result);
				}, {
					tags: tags,
					dataReader: FileAPIReader(file),
					onError: function onError(reason) {
						reject(reason);
					}
				});
			});
		}
	}, {
		key: 'decodeSong',
		value: function decodeSong(file) {
			return new Promise(function (resolve, reject) {
				var reader = new FileReader();

				reader.readAsArrayBuffer(file);
				reader.onload = function () {
					var buffer = this.result;

					audioContext.decodeAudioData(buffer, function success(audioBuffer) {
						resolve({
							audioBuffer: audioBuffer,
							sampleRate: audioBuffer.sampleRate,
							duration: audioBuffer.duration
						});
					}, function error(err) {
						reject('Audio decode error');
					});
				};

				reader.onerror = function () {
					reject('Error while reading file');
				};
			});
		}
	}]);

	return PlayerController;
})(BaseController);

module.exports = PlayerController;

},{"../../audio":2,"../../utils":25,"./base":4}],7:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseController = require('./base');
var consts = require('../../consts');
var EQUALIZER_PRESETS = consts.EQUALIZER_PRESETS;
var EQUALIZER_RANGE = consts.EQUALIZER_RANGE;
var SLIDER_HIGHEST = consts.SLIDER_HIGHEST;

var EqualizeController = (function (_BaseController) {
	_inherits(EqualizeController, _BaseController);

	function EqualizeController() {
		_classCallCheck(this, EqualizeController);

		_get(Object.getPrototypeOf(EqualizeController.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(EqualizeController, [{
		key: 'bindListeners',
		value: function bindListeners() {
			this.view.on('slider:changed', this.onSliderChanged, this);
			this.view.on('preset:selected', this.onPresetSelected, this);
		}
	}, {
		key: 'onPresetSelected',
		value: function onPresetSelected(presetType) {
			var preset = EQUALIZER_PRESETS[presetType];

			Object.keys(preset).forEach(function (freq) {
				this.model.equalizer[freq] = preset[freq];
			}, this);
		}
	}, {
		key: 'onSliderChanged',
		value: function onSliderChanged(e) {
			var result;

			if (e.type === 'gain') {
				result = e.value / SLIDER_HIGHEST;
			} else {
				result = e.value * EQUALIZER_RANGE * 2 / SLIDER_HIGHEST - EQUALIZER_RANGE;
			}
			this.model.equalizer[e.type] = result;
		}
	}]);

	return EqualizeController;
})(BaseController);

module.exports = EqualizeController;

},{"../../consts":22,"./base":4}],8:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseController = require('./base');

var PlayerController = (function (_BaseController) {
	_inherits(PlayerController, _BaseController);

	function PlayerController() {
		_classCallCheck(this, PlayerController);

		_get(Object.getPrototypeOf(PlayerController.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(PlayerController, [{
		key: 'bindListeners',
		value: function bindListeners() {
			this.view.on('song:end', this.onSongEnd, this);
		}
	}, {
		key: 'onSongEnd',
		value: function onSongEnd() {
			this.model.playingSong = null;
		}
	}]);

	return PlayerController;
})(BaseController);

module.exports = PlayerController;

},{"./base":4}],9:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseController = require('./base');

var SongsListController = (function (_BaseController) {
	_inherits(SongsListController, _BaseController);

	function SongsListController() {
		_classCallCheck(this, SongsListController);

		_get(Object.getPrototypeOf(SongsListController.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(SongsListController, [{
		key: 'bindListeners',
		value: function bindListeners() {
			this.view.on('song:selected', this.onSongSelected, this);
		}
	}, {
		key: 'onSongSelected',
		value: function onSongSelected(songId) {
			this.model.selectedSong = this.model.getSong(Number(songId));
		}
	}]);

	return SongsListController;
})(BaseController);

module.exports = SongsListController;

},{"./base":4}],10:[function(require,module,exports){
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var id = 1;

var Song = function Song(data) {
	_classCallCheck(this, Song);

	this.id = id;
	this.audioBuffer = data.audioBuffer;
	this.fileName = data.fileName;
	this.title = data.title || '';
	this.artist = data.artist || '';
	this.duration = Math.round(data.duration);
	this.picture = data.picture || null;
	id++;
};

module.exports = Song;

},{}],11:[function(require,module,exports){
var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Events = require('../../events');
var $$ = require('../../utils');
var Song = require('./song');

var Songs = (function () {
	function Songs() {
		_classCallCheck(this, Songs);

		this.songs = [];
		this.length = 0;
	}

	_createClass(Songs, [{
		key: 'getSong',
		value: function getSong(id) {
			for (var i = 0; i < this.songs.length; i++) {
				if (id === this.songs[i].id) {
					return this.songs[i];
				}
			}
		}
	}, {
		key: 'addSong',
		value: function addSong(data) {
			var song = new Song(data);
			this.songs.push(song);
			this.length++;
			this.trigger('song:add', song);
		}
	}, {
		key: 'removeSong',
		value: function removeSong(id) {
			var song = this.getSong(id);
			if (song !== undefined) {
				this.songs.splice(song, 1);
				this.length--;
				this.trigger('song:removed', song);
			}
		}
	}]);

	return Songs;
})();

$$.assign(Songs.prototype, Events);

module.exports = Songs;

},{"../../events":24,"../../utils":25,"./song":10}],12:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Events = require('../../events');
var $$ = require('../../utils');
var Songs = require('../models/songs');

var PlayerState = (function () {
	function PlayerState() {
		_classCallCheck(this, PlayerState);

		this.songs = new Songs();
		this.selectedSong = null;
		this.playingSong = null;
		this.isVisualizing = true;
		this.haveSongs = false;
		this.errorMessage = '';
		this.equalizer = {
			'gain': 0,
			'60': 0,
			'170': 0,
			'310': 0,
			'600': 0,
			'1000': 0,
			'3000': 0,
			'6000': 0,
			'12000': 0,
			'14000': 0,
			'16000': 0
		};
		$$.observeProperties(this);
		$$.assign(this.equalizer, Events);
		$$.observeProperties(this.equalizer);
		this.bindListeners();
	}

	_createClass(PlayerState, [{
		key: 'bindListeners',
		value: function bindListeners() {
			this.equalizer.on('all', function (eventType, value) {
				var type = eventType.split(":")[0];

				this.trigger('equalizer:changed', {
					type: type,
					value: value
				});
			}, this);

			this.songs.on('song:add', function (song) {
				this.trigger('song:add', song);
				if (this.songs.length === 1) {
					this.haveSongs = true;
				}
			}, this);

			this.songs.on('song:removed', function (song) {
				this.trigger('song:removed', song);
				if (this.songs.length === 0) {
					this.haveSongs = false;
				}
			}, this);
		}
	}, {
		key: 'getSong',
		value: function getSong(id) {
			return this.songs.getSong(id);
		}
	}, {
		key: 'addSong',
		value: function addSong(data) {
			return this.songs.addSong(data);
		}
	}, {
		key: 'removeSong',
		value: function removeSong(id) {
			return this.songs.removeSong(id);
		}
	}]);

	return PlayerState;
})();

$$.assign(PlayerState.prototype, Events);

module.exports = PlayerState;

},{"../../events":24,"../../utils":25,"../models/songs":11}],13:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var $$ = require('../../utils');
var Events = require('../../events');
var dom = require('../../dom');

var BaseView = (function () {
	function BaseView(options) {
		_classCallCheck(this, BaseView);

		this.el = options.el;
		this.model = options.model;
		this.subviews = options.subviews;
		if (options.template) {
			this.template = options.template.content.firstElementChild.cloneNode(true);
		}
	}

	_createClass(BaseView, [{
		key: 'show',
		value: function show() {
			dom.show(this.el);
		}
	}, {
		key: 'hide',
		value: function hide() {
			dom.hide(this.el);
		}
	}, {
		key: 'render',
		value: function render() {
			this.el.appendChild(this.content);
		}
	}, {
		key: 'remove',
		value: function remove() {
			this.el.parentNode.removeChild(this.el);
		}
	}]);

	return BaseView;
})();

$$.assign(BaseView.prototype, Events);

module.exports = BaseView;

},{"../../dom":23,"../../events":24,"../../utils":25}],14:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseView = require('./base');
var dom = require('../../dom');

var ControlsView = (function (_BaseView) {
	_inherits(ControlsView, _BaseView);

	function ControlsView(options) {
		_classCallCheck(this, ControlsView);

		_get(Object.getPrototypeOf(ControlsView.prototype), 'constructor', this).call(this, options);
		this.elems = {
			play: dom.qs('.js-play'),
			stop: dom.qs('.js-stop'),
			eq: dom.qs('.js-eq')
		};
		this.isPlaying = false;
		this.bindListeners();
	}

	_createClass(ControlsView, [{
		key: 'bindListeners',
		value: function bindListeners() {
			this.el.onclick = this.onControlClick.bind(this);
			this.model.on('selectedSong:changed', this.onSelectedSongChanged, this);
			this.model.on('playingSong:changed', this.onPlayingSongChanged, this);
		}
	}, {
		key: 'onPlayingSongChanged',
		value: function onPlayingSongChanged(song) {
			if (!song) {
				this.isPlaying = false;
				dom.hide(this.elems.stop);
				dom.show(this.elems.play);
			} else {
				this.isPlaying = true;
				dom.show(this.elems.stop);
				dom.hide(this.elems.play);
			}
		}
	}, {
		key: 'onSelectedSongChanged',
		value: function onSelectedSongChanged() {
			if (!this.isPlaying) {
				dom.removeClass(this.elems.play, 'icon_disabled');
			}
		}
	}, {
		key: 'onControlClick',
		value: function onControlClick(e) {
			var control = dom.closest(e.target, '.js-control');
			if (!control || dom.hasClass(control, 'icon_disabled')) return;
			var controlType = control.dataset.type;
			this.trigger('control:pressed', controlType);
		}
	}]);

	return ControlsView;
})(BaseView);

module.exports = ControlsView;

},{"../../dom":23,"./base":13}],15:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dom = require('../../dom');
var $$ = require('../../utils');
var BaseView = require('./base');

var DropAreaView = (function (_BaseView) {
	_inherits(DropAreaView, _BaseView);

	function DropAreaView(options) {
		_classCallCheck(this, DropAreaView);

		_get(Object.getPrototypeOf(DropAreaView.prototype), 'constructor', this).call(this, options);

		this.elems = {
			dropHint: dom.qs('.js-drop-hint', this.el)
		};
		this.bindListeners();
	}

	_createClass(DropAreaView, [{
		key: 'bindListeners',
		value: function bindListeners() {
			this.el.ondrop = this.onFileDrop.bind(this);
			this.el.ondragenter = this.onFileEnter.bind(this);
			this.el.ondragover = this.onFileDrag.bind(this);
			this.elems.dropHint.ondragleave = this.onFileLeave.bind(this);
		}
	}, {
		key: 'onFileDrag',
		value: function onFileDrag(e) {
			e.preventDefault();
		}
	}, {
		key: 'onFileDrop',
		value: function onFileDrop(e) {
			var files = [].slice.call(e.dataTransfer.files);
			e.preventDefault();
			this.trigger('files:add', files);
			dom.hide(this.elems.dropHint);
		}
	}, {
		key: 'onFileLeave',
		value: function onFileLeave() {
			dom.hide(this.elems.dropHint);
		}
	}, {
		key: 'onFileEnter',
		value: function onFileEnter(e) {
			e.preventDefault();

			dom.show(this.elems.dropHint);
		}
	}]);

	return DropAreaView;
})(BaseView);

module.exports = DropAreaView;

},{"../../dom":23,"../../utils":25,"./base":13}],16:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dom = require('../../dom');
var $$ = require('../../utils');
var BaseView = require('./base');
var consts = require('../../consts');
var EQUALIZER_RANGE = consts.EQUALIZER_RANGE;
var SLIDER_HIGHEST = consts.SLIDER_HIGHEST;

var EqualizerView = (function (_BaseView) {
	_inherits(EqualizerView, _BaseView);

	function EqualizerView(options) {
		_classCallCheck(this, EqualizerView);

		_get(Object.getPrototypeOf(EqualizerView.prototype), 'constructor', this).call(this, options);
		var sliders;

		this.elems = {
			sliders: {
				'gain': dom.qs('[data-type="gain"]', this.el),
				'60': dom.qs('[data-type="60"]', this.el),
				'170': dom.qs('[data-type="170"]', this.el),
				'310': dom.qs('[data-type="310"]', this.el),
				'600': dom.qs('[data-type="600"]', this.el),
				'1000': dom.qs('[data-type="1000"]', this.el),
				'3000': dom.qs('[data-type="3000"]', this.el),
				'6000': dom.qs('[data-type="6000"]', this.el),
				'12000': dom.qs('[data-type="12000"]', this.el),
				'14000': dom.qs('[data-type="14000"]', this.el),
				'16000': dom.qs('[data-type="16000"]', this.el)
			},
			presets: {
				normal: dom.qs('[data-type="normal"]', this.el),
				pop: dom.qs('[data-type="pop"]', this.el),
				rock: dom.qs('[data-type="rock"]', this.el),
				jazz: dom.qs('[data-type="jazz"]', this.el),
				classic: dom.qs('[data-type="classic"]', this.el)
			}
		};

		sliders = this.elems.sliders;

		this.slidersCoords = {
			'gain': sliders['gain'].getBoundingClientRect(),
			'60': sliders['60'].getBoundingClientRect(),
			'170': sliders['170'].getBoundingClientRect(),
			'310': sliders['310'].getBoundingClientRect(),
			'600': sliders['600'].getBoundingClientRect(),
			'1000': sliders['1000'].getBoundingClientRect(),
			'3000': sliders['3000'].getBoundingClientRect(),
			'6000': sliders['6000'].getBoundingClientRect(),
			'12000': sliders['12000'].getBoundingClientRect(),
			'14000': sliders['14000'].getBoundingClientRect(),
			'16000': sliders['16000'].getBoundingClientRect()
		};

		this.activeSlider = null;

		this.sliderShift = {
			shiftX: null,
			shiftY: null
		};
		this.bindListeners();
	}

	_createClass(EqualizerView, [{
		key: 'bindListeners',
		value: function bindListeners() {
			this.model.on('equalizer:changed', this.onEqualizerChanged, this);
			this.model.on('isVisualizing:changed', this.onVisualizingChanged, this);
			window.onresize = this.recalcSlidersCoords.bind(this);
			this.el.onmousedown = this.onThumbMouseDown.bind(this);
			this.el.ondragstart = this.onDragStart.bind(this);
			this.el.onclick = this.onPresetClick.bind(this);
		}
	}, {
		key: 'onEqualizerChanged',
		value: function onEqualizerChanged(e) {
			var slider = this.elems.sliders[e.type];
			var thumb = dom.qs('.js-thumb', slider);
			var y;

			if (e.type === 'gain') {
				y = e.value * SLIDER_HIGHEST;
			} else {
				y = (e.value + EQUALIZER_RANGE) / (EQUALIZER_RANGE * 2) * SLIDER_HIGHEST;
			}
			this.moveThumb(thumb, y);
		}
	}, {
		key: 'onVisualizingChanged',
		value: function onVisualizingChanged() {
			setTimeout(this.recalcSlidersCoords.bind(this), 0);
		}
	}, {
		key: 'onPresetClick',
		value: function onPresetClick(e) {
			var presetEl = e.target;
			var presetType;

			if (!dom.hasClass(presetEl, 'js-preset')) return;
			presetType = presetEl.dataset.type;
			this.trigger('preset:selected', presetType);
		}
	}, {
		key: 'onThumbMouseDown',
		value: function onThumbMouseDown(e) {
			var target = e.target;
			var thumbCoords;

			if (!dom.hasClass(e.target, 'js-thumb')) return;

			thumbCoords = target.getBoundingClientRect();
			this.activeThumb = target;
			this.activeSlider = dom.closest(target, '.js-slider');
			this.sliderShift.shiftX = e.pageX - thumbCoords.left;
			this.sliderShift.shiftY = e.pageY - thumbCoords.top;
			document.onmousemove = this.onDocumentMouseMove.bind(this);
			document.onmouseup = this.onDocumentMouseUp.bind(this);
		}
	}, {
		key: 'onDocumentMouseMove',
		value: function onDocumentMouseMove(e) {
			var type = this.activeSlider.dataset.type;
			var y = this.slidersCoords[type].bottom - e.clientY - this.sliderShift.shiftY;
			y = this.checkCoords(y);
			this.moveThumb(this.activeThumb, y);
			this.trigger('slider:changed', { type: type, value: y });
		}
	}, {
		key: 'onDocumentMouseUp',
		value: function onDocumentMouseUp() {
			document.onmousemove = null;
			document.onmouseup = null;
			this.activeSlider = null;
			this.activeThumb = null;
			this.sliderShift.shiftX = null;
			this.sliderShift.shiftY = null;
		}
	}, {
		key: 'checkCoords',
		value: function checkCoords(y) {
			var topEdge;

			if (y < 0) {
				y = 0;
			}
			topEdge = this.activeSlider.offsetHeight - this.activeThumb.offsetHeight;
			if (y > topEdge) {
				y = topEdge;
			}
			return y;
		}
	}, {
		key: 'moveThumb',
		value: function moveThumb(thumb, y) {
			thumb.style.bottom = y + 'px';
		}
	}, {
		key: 'onDragStart',
		value: function onDragStart() {
			return false;
		}
	}, {
		key: 'recalcSlidersCoords',
		value: function recalcSlidersCoords() {
			var sliders = this.elems.sliders;

			Object.keys(sliders).forEach(function (key) {
				this.slidersCoords[key] = sliders[key].getBoundingClientRect();
			}, this);
		}
	}]);

	return EqualizerView;
})(BaseView);

module.exports = EqualizerView;

},{"../../consts":22,"../../dom":23,"../../utils":25,"./base":13}],17:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseView = require('./base');
var dom = require('../../dom');

var NotificationView = (function (_BaseView) {
	_inherits(NotificationView, _BaseView);

	function NotificationView(options) {
		_classCallCheck(this, NotificationView);

		_get(Object.getPrototypeOf(NotificationView.prototype), 'constructor', this).call(this, options);
		this.elems = {
			notification: dom.qs('.js-notification', this.el)
		};
		this.bindListeners();
	}

	_createClass(NotificationView, [{
		key: 'bindListeners',
		value: function bindListeners() {
			this.model.on('errorMessage:changed', this.onErrorMessageChanged, this);
		}
	}, {
		key: 'onErrorMessageChanged',
		value: function onErrorMessageChanged(message) {
			var notification = this.elems.notification;
			var self = this;

			notification.textContent = message;
			dom.addClass(notification, 'notification_showed');
			setTimeout(function () {
				dom.removeClass(notification, 'notification_showed');
			}, 3000);
		}
	}]);

	return NotificationView;
})(BaseView);

module.exports = NotificationView;

},{"../../dom":23,"./base":13}],18:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseView = require('./base');
var audioContext = require('../../audio').getAudioContext();
var FREQUENCIES = [60, 170, 310, 600, 1000, 3000, 6000, 12000, 14000, 16000];
var analyser = require('../../audio_analyser');
var dom = require('../../dom');

var PlayerView = (function (_BaseView) {
	_inherits(PlayerView, _BaseView);

	function PlayerView(options) {
		_classCallCheck(this, PlayerView);

		_get(Object.getPrototypeOf(PlayerView.prototype), 'constructor', this).call(this, options);
		this.gain = audioContext.createGain();
		this.filters = this.createFilters(FREQUENCIES);
		this.analyser = analyser;
		this.elems = {
			visualizer: dom.qs('.js-visualizer', this.el),
			equalizer: dom.qs('.js-equalizer', this.el)
		};
		this.bindListeners();
	}

	_createClass(PlayerView, [{
		key: 'bindListeners',
		value: function bindListeners() {
			this.model.on('isVisualizing:changed', this.onVisualizingChanged, this);
			this.model.on('playingSong:changed', this.onPlayingSongChanged, this);
			this.model.on('equalizer:changed', this.onEqualizerChanged, this);
		}
	}, {
		key: 'onEqualizerChanged',
		value: function onEqualizerChanged(e) {
			var filterIndex;

			if (e.type === 'gain') {
				this.gain.gain.value = e.value;
			} else {
				filterIndex = FREQUENCIES.indexOf(Number(e.type));
				this.filters[filterIndex].gain.value = e.value;
			}
		}
	}, {
		key: 'onVisualizingChanged',
		value: function onVisualizingChanged(isVisualizing) {
			if (isVisualizing) {
				dom.hide(this.elems.equalizer);
				dom.show(this.elems.visualizer);
			} else {
				dom.hide(this.elems.visualizer);
				dom.show(this.elems.equalizer);
			}
		}
	}, {
		key: 'onPlayingSongChanged',
		value: function onPlayingSongChanged(song) {
			if (!song) {
				this.stopSong();
			} else {
				this.playSong(song);
			}
		}
	}, {
		key: 'playSong',
		value: function playSong(song) {
			var audioBuffer = song.audioBuffer;
			var self = this;

			this.audioSource = audioContext.createBufferSource();
			this.audioSource.buffer = audioBuffer;
			this.audioSource.connect(this.gain);
			this.gain.connect(this.filters[0]);
			this.filters[this.filters.length - 1].connect(this.analyser);
			this.analyser.connect(audioContext.destination);
			this.audioSource.start(0);
			this.timerId = setTimeout(function () {
				self.trigger('song:end');
			}, song.duration * 1000);
		}
	}, {
		key: 'stopSong',
		value: function stopSong() {
			clearTimeout(this.timerId);
			this.audioSource.stop(0);
		}
	}, {
		key: 'createFilters',
		value: function createFilters(frequencies) {
			var filters = frequencies.map(this.createFilter);

			filters.reduce(function (prev, curr) {
				prev.connect(curr);
				return curr;
			});

			return filters;
		}
	}, {
		key: 'createFilter',
		value: function createFilter(frequency) {
			var filter = audioContext.createBiquadFilter();

			filter.type = 'peaking';
			filter.frequency.value = frequency;
			filter.Q.value = 1;
			filter.gain.value = 0;

			return filter;
		}
	}]);

	return PlayerView;
})(BaseView);

module.exports = PlayerView;

},{"../../audio":2,"../../audio_analyser":3,"../../dom":23,"./base":13}],19:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseView = require('./base');
var dom = require('../../dom');

var SongDetailsView = (function (_BaseView) {
	_inherits(SongDetailsView, _BaseView);

	function SongDetailsView(options) {
		_classCallCheck(this, SongDetailsView);

		_get(Object.getPrototypeOf(SongDetailsView.prototype), 'constructor', this).call(this, options);
		this.elems = {
			cover: dom.qs('.js-cover', this.el),
			title: dom.qs('.js-title', this.el),
			artist: dom.qs('.js-artist', this.el),
			fileName: dom.qs('.js-filename', this.el)
		};
		this.defaultPicture = this.elems.cover.src;
		this.playingSong = null;

		this.bindListeners();
	}

	_createClass(SongDetailsView, [{
		key: 'bindListeners',
		value: function bindListeners() {
			this.model.on('selectedSong:changed', this.onSelectedSongChanged, this);
			this.model.on('playingSong:changed', function (song) {
				this.playingSong = song;
			}, this);
		}
	}, {
		key: 'onSelectedSongChanged',
		value: function onSelectedSongChanged(song) {
			if (this.playingSong) return;

			if (song.picture) {
				this.elems.cover.src = song.picture;
			} else {
				this.elems.cover.src = this.defaultPicture;
			}
			if (!song.title) {
				this.elems.fileName.textContent = '';
			} else {
				this.elems.fileName.textContent = song.fileName;
			}
			this.elems.title.textContent = song.title || song.fileName;
			this.elems.artist.textContent = song.artist || '';
		}
	}]);

	return SongDetailsView;
})(BaseView);

module.exports = SongDetailsView;

},{"../../dom":23,"./base":13}],20:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var $$ = require('../../utils');
var Events = require('../../events');
var dom = require('../../dom');
var BaseView = require('./base');

var SongsListView = (function (_BaseView) {
	_inherits(SongsListView, _BaseView);

	function SongsListView(options) {
		_classCallCheck(this, SongsListView);

		_get(Object.getPrototypeOf(SongsListView.prototype), 'constructor', this).call(this, options);
		this.elems = {
			placeholder: dom.qs('.js-placeholder', this.el)
		};
		this.bindListeners();
	}

	_createClass(SongsListView, [{
		key: 'bindListeners',
		value: function bindListeners() {
			this.model.on('song:add', this.onSongAdd, this);
			this.el.onclick = this.onSongClick.bind(this);
		}
	}, {
		key: 'onSongClick',
		value: function onSongClick(e) {
			var target = e.target;
			var songEl = dom.closest(target, '.js-song');

			if (!songEl) return;
			this.selectSong(songEl);
			this.trigger('song:selected', songEl.dataset.id);
		}
	}, {
		key: 'onSongAdd',
		value: function onSongAdd(song) {
			var songEl = this.createSongEl(song);

			if (!this.haveSongs) {
				this.elems.placeholder.remove();
			}
			this.haveSongs = true;
			this.el.appendChild(songEl);
		}
	}, {
		key: 'selectSong',
		value: function selectSong(songEl) {
			$$.toArray(songEl.parentNode.children).filter(function (el) {
				return el !== songEl;
			}).forEach(function (el) {
				return dom.removeClass(el, 'song-item_selected');
			});

			dom.addClass(songEl, 'song-item_selected');
		}
	}, {
		key: 'createSongEl',
		value: function createSongEl(song) {
			var songEl = this.template.cloneNode(true);
			var title = dom.qs('.js-song-title', songEl);
			var artist = dom.qs('.js-song-artist', songEl);
			var cover = dom.qs('.js-song-cover', songEl);
			var duration = dom.qs('.js-song-duration', songEl);

			title.textContent = song.title || song.fileName;
			artist.textContent = song.artist;

			duration.textContent = this.formatDuration(song.duration);
			songEl.dataset.id = song.id;
			if (song.picture) {
				cover.src = song.picture;
			}

			return songEl;
		}
	}, {
		key: 'formatDuration',
		value: function formatDuration(secs) {
			var minutes = Math.floor(secs / 60);
			var seconds = secs % 60;

			if (seconds.toString().length === 1) {
				seconds = '0' + seconds;
			}

			return minutes + ':' + seconds;
		}
	}]);

	return SongsListView;
})(BaseView);

module.exports = SongsListView;

},{"../../dom":23,"../../events":24,"../../utils":25,"./base":13}],21:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseView = require('./base');
var dom = require('../../dom');
var audio = require('../../audio');
var analyser = require('../../audio_analyser');

var VisualizerView = (function (_BaseView) {
	_inherits(VisualizerView, _BaseView);

	function VisualizerView(options) {
		_classCallCheck(this, VisualizerView);

		_get(Object.getPrototypeOf(VisualizerView.prototype), 'constructor', this).call(this, options);

		this.elems = {
			canvas: dom.qs('.js-canvas', this.el)
		};
		this.frameId = null;
		this.canvasW = this.elems.canvas.offsetWidth;
		this.canvasH = this.elems.canvas.offsetHeight;
		this.canvasCtx = this.elems.canvas.getContext('2d');
		this.bindListeners();
	}

	_createClass(VisualizerView, [{
		key: 'bindListeners',
		value: function bindListeners() {
			this.model.on('playingSong:changed', this.onPlayingSongChanged, this);
		}
	}, {
		key: 'onPlayingSongChanged',
		value: function onPlayingSongChanged(song) {
			if (song) {
				this.startVisualization();
			} else {
				this.stopVisualization();
			}
		}
	}, {
		key: 'clearCanvas',
		value: function clearCanvas() {
			this.canvasCtx.clearRect(0, 0, this.canvasW, this.canvasH);
		}
	}, {
		key: 'stopVisualization',
		value: function stopVisualization() {
			cancelAnimationFrame(this.frameId);
			this.clearCanvas();
		}
	}, {
		key: 'startVisualization',
		value: function startVisualization() {
			var i;
			var x = 0;
			var v;
			var y;
			var sliceWidth;
			var bufferLength = analyser.frequencyBinCount;
			var dataArray = new Uint8Array(bufferLength);

			this.clearCanvas();
			this.frameId = requestAnimationFrame(this.startVisualization.bind(this));
			analyser.getByteTimeDomainData(dataArray);
			this.canvasCtx.lineWidth = 1;
			this.canvasCtx.strokeStyle = 'red';
			this.canvasCtx.beginPath();

			sliceWidth = this.canvasW * 1.0 / bufferLength;

			for (i = 0; i < bufferLength; i++) {
				v = dataArray[i] / 128.0;
				y = v * this.canvasH / 2;

				if (i === 0) {
					this.canvasCtx.moveTo(x, y);
				} else {
					this.canvasCtx.lineTo(x, y);
				}

				x += sliceWidth;
			}
			this.canvasCtx.lineTo(this.canvasW, this.canvasH / 2);
			this.canvasCtx.stroke();
		}
	}]);

	return VisualizerView;
})(BaseView);

module.exports = VisualizerView;

},{"../../audio":2,"../../audio_analyser":3,"../../dom":23,"./base":13}],22:[function(require,module,exports){
"use strict";

var SLIDER_HIGHEST = 200;
var EQUALIZER_RANGE = 12;
var AUDIO_FORMATS = [{
	type: 'audio/mpeg',
	ext: 'mp3'
}, {
	type: 'audio/ogg; codecs="vorbis"',
	ext: 'ogg'
}, {
	type: 'audio/wav; codecs="1"',
	ext: 'wav'
}, {
	type: 'audio/mp4; codecs="mp4a.40.2"',
	ext: 'aac'
}, {
	type: 'audio/webm',
	ext: 'weba'
}, {
	type: 'audio/flac',
	ext: 'flac'
}];
var EQUALIZER_PRESETS = {
	normal: {
		'60': 0,
		'170': 0,
		'310': 0,
		'600': 0,
		'1000': 0,
		'3000': 0,
		'6000': 0,
		'12000': 0,
		'14000': 0,
		'16000': 0
	},
	pop: {
		'60': -1.6,
		'170': 4.8,
		'310': 7.2,
		'600': 8,
		'1000': 5.6,
		'3000': 1.1,
		'6000': 2.4,
		'12000': 2.4,
		'14000': 1.6,
		'16000': 1.6
	},
	rock: {
		'60': 8,
		'170': 4.8,
		'310': -5.6,
		'600': -8,
		'1000': 3.2,
		'3000': 4,
		'6000': 8.8,
		'12000': 11.2,
		'14000': 11.2,
		'16000': 11.2
	},
	jazz: {
		'60': 10,
		'170': 9.2,
		'310': 6,
		'600': 6,
		'1000': 4,
		'3000': 2.2,
		'6000': 2.2,
		'12000': -4,
		'14000': -8.2,
		'16000': -8.2
	},
	classic: {
		'60': -4.8,
		'170': -1.1,
		'310': 4,
		'600': 5.6,
		'1000': 5.6,
		'3000': 5.6,
		'6000': 4,
		'12000': 2.4,
		'14000': 2.4,
		'16000': 2.4
	}
};

module.exports = {
	SLIDER_HIGHEST: SLIDER_HIGHEST,
	EQUALIZER_RANGE: EQUALIZER_RANGE,
	AUDIO_FORMATS: AUDIO_FORMATS,
	EQUALIZER_PRESETS: EQUALIZER_PRESETS
};

},{}],23:[function(require,module,exports){
"use strict";

var $$ = require('./utils');

var dom = {
	byId: function byId(id) {
		return document.getElementById(id);
	},
	qs: function qs(selector, context) {
		context = context || document;
		return context.querySelector(selector);
	},
	qsa: function qsa(selector, context) {
		context = context || document;
		return $$.toArray(context.querySelectorAll(selector));
	},
	addClass: function addClass(el, className) {
		el.classList.add(className);
	},
	removeClass: function removeClass(el, className) {
		el.classList.remove(className);
	},
	hasClass: function hasClass(el, className) {
		return el.classList.contains(className);
	},
	hide: function hide() {
		for (var _len = arguments.length, elems = Array(_len), _key = 0; _key < _len; _key++) {
			elems[_key] = arguments[_key];
		}

		elems.forEach(function (item) {
			item.style.display = 'none';
		});
	},
	show: function show() {
		for (var _len2 = arguments.length, elems = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			elems[_key2] = arguments[_key2];
		}

		elems.forEach(function (item) {
			item.style.display = '';
		});
	},
	closest: function closest(el, selector) {
		if (el.closest) return el.closest(selector);

		var parentNode = el;
		var matches;

		while ((matches = parentNode && parentNode.matches) && !parentNode.matches(selector)) {
			parentNode = parentNode.parentNode;
		}
		return matches ? parentNode : null;
	}
};

module.exports = dom;

},{"./utils":25}],24:[function(require,module,exports){
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var subscribers = new Map();

var Events = {
	on: function on(type, callback, context) {
		var item;

		if (subscribers.has(this)) {
			item = subscribers.get(this);
			if (item[type]) {
				item[type].push({
					callback: callback,
					context: context
				});
			} else {
				item[type] = [{
					callback: callback,
					context: context
				}];
			}
		} else {
			item = _defineProperty({}, type, [{
				callback: callback,
				context: context
			}]);
			subscribers.set(this, item);
		}
	},
	off: function off(type, callback) {
		var item, i;
		if (arguments.length === 0) {
			subscribers["delete"](this);
		}
		if (arguments.length === 1 && subscribers.has(this)) {
			item = subscribers.get(this);
			if (item[type]) {
				if (callback) {
					for (i = 0; i < item[type].length; i++) {
						if (item[type][i] === callback) {
							item[type].splice(i, 1);
							i--;
						}
					}
				} else {
					delete item[type];
				}
			}
		}
	},
	trigger: function trigger(type) {
		for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			args[_key - 1] = arguments[_key];
		}

		var item;

		if (subscribers.has(this)) {
			item = subscribers.get(this);

			if (item[type]) {
				item[type].forEach(function (event) {
					var context = event.context || this;
					event.callback.apply(context, args);
				}, this);
			}
			if (item.all) {
				item.all.forEach(function (event) {
					var context = event.context || this;
					args.unshift(type);
					event.callback.apply(context, args);
				}, this);
			}
		}
	}
};

module.exports = Events;

},{}],25:[function(require,module,exports){
"use strict";

var $$ = {
	toArray: function toArray(object) {
		return [].slice.call(object);
	},
	assign: function assign(target) {
		if (target === undefined || target === null) {
			throw new TypeError('Cannot convert first argument to object');
		}

		for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			rest[_key - 1] = arguments[_key];
		}

		rest.forEach(function (obj) {
			if (obj === undefined || obj === null) {
				return;
			}
			Object.keys(obj).forEach(function (key) {
				target[key] = obj[key];
			});
		});
	},
	observeProperties: function observeProperties(obj) {
		if (typeof obj.trigger !== 'function') {
			throw 'Observed object must have trigger method';
		}
		Object.keys(obj).forEach(function (key) {
			obj['_' + key] = obj[key];

			Object.defineProperty(obj, key, {
				get: function get() {
					return obj['_' + key];
				},
				set: function set(value) {
					if (obj['_' + key] === value) return;

					obj['_' + key] = value;
					obj.trigger(key + ':changed', value);
				}
			});
		}, obj);
	}
};

module.exports = $$;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL0phdmFzY3JpcHQvdGFza18zL3NyYy9qcy9hcHAuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL0phdmFzY3JpcHQvdGFza18zL3NyYy9qcy9hdWRpby5qcyIsIi9ob21lL2FuZHJleS9Eb2N1bWVudHMvUHJvamVjdHMvSmF2YXNjcmlwdC90YXNrXzMvc3JjL2pzL2F1ZGlvX2FuYWx5c2VyLmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy9KYXZhc2NyaXB0L3Rhc2tfMy9zcmMvanMvYXVkaW9fcGxheWVyL2NvbnRyb2xsZXJzL2Jhc2UuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL0phdmFzY3JpcHQvdGFza18zL3NyYy9qcy9hdWRpb19wbGF5ZXIvY29udHJvbGxlcnMvY29udHJvbHMuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL0phdmFzY3JpcHQvdGFza18zL3NyYy9qcy9hdWRpb19wbGF5ZXIvY29udHJvbGxlcnMvZHJvcF9hcmVhLmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy9KYXZhc2NyaXB0L3Rhc2tfMy9zcmMvanMvYXVkaW9fcGxheWVyL2NvbnRyb2xsZXJzL2VxdWFsaXplci5qcyIsIi9ob21lL2FuZHJleS9Eb2N1bWVudHMvUHJvamVjdHMvSmF2YXNjcmlwdC90YXNrXzMvc3JjL2pzL2F1ZGlvX3BsYXllci9jb250cm9sbGVycy9wbGF5ZXIuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL0phdmFzY3JpcHQvdGFza18zL3NyYy9qcy9hdWRpb19wbGF5ZXIvY29udHJvbGxlcnMvc29uZ3NfbGlzdC5qcyIsIi9ob21lL2FuZHJleS9Eb2N1bWVudHMvUHJvamVjdHMvSmF2YXNjcmlwdC90YXNrXzMvc3JjL2pzL2F1ZGlvX3BsYXllci9tb2RlbHMvc29uZy5qcyIsIi9ob21lL2FuZHJleS9Eb2N1bWVudHMvUHJvamVjdHMvSmF2YXNjcmlwdC90YXNrXzMvc3JjL2pzL2F1ZGlvX3BsYXllci9tb2RlbHMvc29uZ3MuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL0phdmFzY3JpcHQvdGFza18zL3NyYy9qcy9hdWRpb19wbGF5ZXIvc3RhdGVzL3BsYXllci5qcyIsIi9ob21lL2FuZHJleS9Eb2N1bWVudHMvUHJvamVjdHMvSmF2YXNjcmlwdC90YXNrXzMvc3JjL2pzL2F1ZGlvX3BsYXllci92aWV3cy9iYXNlLmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy9KYXZhc2NyaXB0L3Rhc2tfMy9zcmMvanMvYXVkaW9fcGxheWVyL3ZpZXdzL2NvbnRyb2xzLmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy9KYXZhc2NyaXB0L3Rhc2tfMy9zcmMvanMvYXVkaW9fcGxheWVyL3ZpZXdzL2Ryb3BfYXJlYS5qcyIsIi9ob21lL2FuZHJleS9Eb2N1bWVudHMvUHJvamVjdHMvSmF2YXNjcmlwdC90YXNrXzMvc3JjL2pzL2F1ZGlvX3BsYXllci92aWV3cy9lcXVhbGl6ZXIuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL0phdmFzY3JpcHQvdGFza18zL3NyYy9qcy9hdWRpb19wbGF5ZXIvdmlld3Mvbm90aWZpY2F0aW9uLmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy9KYXZhc2NyaXB0L3Rhc2tfMy9zcmMvanMvYXVkaW9fcGxheWVyL3ZpZXdzL3BsYXllci5qcyIsIi9ob21lL2FuZHJleS9Eb2N1bWVudHMvUHJvamVjdHMvSmF2YXNjcmlwdC90YXNrXzMvc3JjL2pzL2F1ZGlvX3BsYXllci92aWV3cy9zb25nX2RldGFpbHMuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL0phdmFzY3JpcHQvdGFza18zL3NyYy9qcy9hdWRpb19wbGF5ZXIvdmlld3Mvc29uZ3NfbGlzdC5qcyIsIi9ob21lL2FuZHJleS9Eb2N1bWVudHMvUHJvamVjdHMvSmF2YXNjcmlwdC90YXNrXzMvc3JjL2pzL2F1ZGlvX3BsYXllci92aWV3cy92aXN1YWxpemVyLmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy9KYXZhc2NyaXB0L3Rhc2tfMy9zcmMvanMvY29uc3RzLmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy9KYXZhc2NyaXB0L3Rhc2tfMy9zcmMvanMvZG9tLmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy9KYXZhc2NyaXB0L3Rhc2tfMy9zcmMvanMvZXZlbnRzLmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy9KYXZhc2NyaXB0L3Rhc2tfMy9zcmMvanMvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7O0FBRWIsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUM7QUFDeEQsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFDMUQsSUFBSSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsbUNBQW1DLENBQUMsQ0FBQzs7QUFFcEUsSUFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7QUFDN0QsSUFBSSxrQkFBa0IsR0FBRyxPQUFPLENBQUMsc0NBQXNDLENBQUMsQ0FBQzs7QUFFekUsSUFBSSxhQUFhLEdBQUcsT0FBTyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7QUFDL0QsSUFBSSxtQkFBbUIsR0FBRyxPQUFPLENBQUMsdUNBQXVDLENBQUMsQ0FBQzs7QUFFM0UsSUFBSSxlQUFlLEdBQUcsT0FBTyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7O0FBRW5FLElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQywrQkFB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IiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyIFBsYXllclZpZXcgPSByZXF1aXJlKCcuL2F1ZGlvX3BsYXllci92aWV3cy9wbGF5ZXInKTtcclxudmFyIFBsYXllclN0YXRlID0gcmVxdWlyZSgnLi9hdWRpb19wbGF5ZXIvc3RhdGVzL3BsYXllcicpO1xyXG52YXIgUGxheWVyQ29udHJvbGxlciA9IHJlcXVpcmUoJy4vYXVkaW9fcGxheWVyL2NvbnRyb2xsZXJzL3BsYXllcicpO1xyXG5cclxudmFyIERyb3BBcmVhVmlldyA9IHJlcXVpcmUoJy4vYXVkaW9fcGxheWVyL3ZpZXdzL2Ryb3BfYXJlYScpO1xyXG52YXIgRHJvcEFyZWFDb250cm9sbGVyID0gcmVxdWlyZSgnLi9hdWRpb19wbGF5ZXIvY29udHJvbGxlcnMvZHJvcF9hcmVhJyk7XHJcblxyXG52YXIgU29uZ3NMaXN0VmlldyA9IHJlcXVpcmUoJy4vYXVkaW9fcGxheWVyL3ZpZXdzL3NvbmdzX2xpc3QnKTtcclxudmFyIFNvbmdzTGlzdENvbnRyb2xsZXIgPSByZXF1aXJlKCcuL2F1ZGlvX3BsYXllci9jb250cm9sbGVycy9zb25nc19saXN0Jyk7XHJcblxyXG52YXIgU29uZ0RldGFpbHNWaWV3ID0gcmVxdWlyZSgnLi9hdWRpb19wbGF5ZXIvdmlld3Mvc29uZ19kZXRhaWxzJyk7XHJcblxyXG52YXIgQ29udHJvbHNWaWV3ID0gcmVxdWlyZSgnLi9hdWRpb19wbGF5ZXIvdmlld3MvY29udHJvbHMnKTtcclxudmFyIENvbnRyb2xzQ29udHJvbGxlciA9IHJlcXVpcmUoJy4vYXVkaW9fcGxheWVyL2NvbnRyb2xsZXJzL2NvbnRyb2xzJyk7XHJcblxyXG52YXIgVmlzdWFsaXplclZpZXcgPSByZXF1aXJlKCcuL2F1ZGlvX3BsYXllci92aWV3cy92aXN1YWxpemVyJyk7XHJcblxyXG52YXIgTm90aWZpY2F0aW9uVmlldyA9IHJlcXVpcmUoJy4vYXVkaW9fcGxheWVyL3ZpZXdzL25vdGlmaWNhdGlvbicpO1xyXG5cclxudmFyIEVxdWFsaXplclZpZXcgPSByZXF1aXJlKCcuL2F1ZGlvX3BsYXllci92aWV3cy9lcXVhbGl6ZXInKTtcclxudmFyIEVxdWFsaXplckNvbnRyb2xsZXIgPSByZXF1aXJlKCcuL2F1ZGlvX3BsYXllci9jb250cm9sbGVycy9lcXVhbGl6ZXInKTtcclxuXHJcbnZhciBkb20gPSByZXF1aXJlKCcuL2RvbScpO1xyXG5cclxuXHJcbi8vIFBsYXllciBTdGF0ZVxyXG52YXIgcGxheWVyU3RhdGUgPSBuZXcgUGxheWVyU3RhdGUoKTtcclxuXHJcbi8vIE1haW5cclxudmFyIHBsYXllclZpZXcgPSBuZXcgUGxheWVyVmlldyh7XHJcblx0ZWw6IGRvbS5ieUlkKCdhdWRpb1BsYXllcicpLFxyXG5cdG1vZGVsOiBwbGF5ZXJTdGF0ZVxyXG59KTtcclxuXHJcbnZhciBwbGF5ZXJDb250cm9sbGVyID0gbmV3IFBsYXllckNvbnRyb2xsZXIoe1xyXG5cdHZpZXc6IHBsYXllclZpZXcsXHJcblx0bW9kZWw6IHBsYXllclN0YXRlXHJcbn0pO1xyXG5cclxuLy8gRHJvcCBhcmVhXHJcbnZhciBkcm9wQXJlYVZpZXcgPSBuZXcgRHJvcEFyZWFWaWV3KHtcclxuXHRlbDogZG9tLnFzKCcuanMtZHJvcC1hcmVhJywgcGxheWVyVmlldy5lbCksXHJcblx0bW9kZWw6IHBsYXllclN0YXRlXHJcbn0pO1xyXG5cclxudmFyIGRyb3BBcmVhQ29udHJvbGxlciA9IG5ldyBEcm9wQXJlYUNvbnRyb2xsZXIoe1xyXG5cdHZpZXc6IGRyb3BBcmVhVmlldyxcclxuXHRtb2RlbDogcGxheWVyU3RhdGVcclxufSk7XHJcblxyXG4vLyBTb25ncyBMaXN0XHJcbnZhciBzb25nc0xpc3RWaWV3ID0gbmV3IFNvbmdzTGlzdFZpZXcoe1xyXG5cdGVsOiBkb20ucXMoJy5qcy1zb25ncy1saXN0JywgcGxheWVyVmlldy5lbCksXHJcblx0dGVtcGxhdGU6IGRvbS5ieUlkKCdzb25nTGlzdEl0ZW0nKSxcclxuXHRtb2RlbDogcGxheWVyU3RhdGVcclxufSk7XHJcblxyXG52YXIgc29uZ3NMaXN0Q29udHJvbGxlciA9IG5ldyBTb25nc0xpc3RDb250cm9sbGVyKHtcclxuXHRtb2RlbDogcGxheWVyU3RhdGUsXHJcblx0dmlldzogc29uZ3NMaXN0Vmlld1xyXG59KTtcclxuXHJcbi8vIERldGFpbHNcclxudmFyIHNvbmdEZXRhaWxzVmlldyA9IG5ldyBTb25nRGV0YWlsc1ZpZXcoe1xyXG5cdGVsOiBkb20ucXMoJy5qcy1zb25nLWRldGFpbHMnLCBwbGF5ZXJWaWV3LmVsKSxcclxuXHRtb2RlbDogcGxheWVyU3RhdGVcclxufSk7XHJcblxyXG4vLyBDb250cm9sc1xyXG52YXIgY29udHJvbHNWaWV3ID0gbmV3IENvbnRyb2xzVmlldyh7XHJcblx0ZWw6IGRvbS5xcygnLmpzLWNvbnRyb2xzJywgcGxheWVyVmlldy5lbCksXHJcblx0bW9kZWw6IHBsYXllclN0YXRlXHJcbn0pO1xyXG5cclxudmFyIGNvbnRyb2xzQ29udHJvbGxlciA9IG5ldyBDb250cm9sc0NvbnRyb2xsZXIoe1xyXG5cdG1vZGVsOiBwbGF5ZXJTdGF0ZSxcclxuXHR2aWV3OiBjb250cm9sc1ZpZXdcclxufSk7XHJcblxyXG4vLyBFcXVhbGl6ZXJcclxudmFyIGVxdWFsaXplclZpZXcgPSBuZXcgRXF1YWxpemVyVmlldyh7XHJcblx0ZWw6IGRvbS5xcygnLmpzLWVxdWFsaXplcicsIHBsYXllclZpZXcuZWwpLFxyXG5cdG1vZGVsOiBwbGF5ZXJTdGF0ZVxyXG59KTtcclxuXHJcbnZhciBlcXVhbGl6ZXJDb250cm9sbGVyID0gbmV3IEVxdWFsaXplckNvbnRyb2xsZXIoe1xyXG5cdHZpZXc6IGVxdWFsaXplclZpZXcsXHJcblx0bW9kZWw6IHBsYXllclN0YXRlXHJcbn0pO1xyXG5cclxuLy8gVmlzdWFsaXplclxyXG52YXIgdmlzdWFsaXplclZpZXcgPSBuZXcgVmlzdWFsaXplclZpZXcoe1xyXG5cdGVsOiBkb20ucXMoJy5qcy12aXN1YWxpemVyJywgcGxheWVyVmlldy5lbCksXHJcblx0bW9kZWw6IHBsYXllclN0YXRlXHJcbn0pO1xyXG5cclxuLy8gTm90aWZpY2F0aW9uXHJcbnZhciBub3RpZmljYXRpb25WaWV3ID0gbmV3IE5vdGlmaWNhdGlvblZpZXcoe1xyXG5cdGVsOiBkb20ucXMoJy5qcy1ub3RpZmljYXRpb24nLCBwbGF5ZXJWaWV3LmVsKSxcclxuXHRtb2RlbDogcGxheWVyU3RhdGVcclxufSk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyIGF1ZGlvRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhdWRpbycpO1xyXG52YXIgY29uc3RzID0gcmVxdWlyZSgnLi9jb25zdHMnKTtcclxudmFyIEF1ZGlvQ29udGV4dCA9IHdpbmRvdy5BdWRpb0NvbnRleHQgfHwgd2luZG93LndlYmtpdEF1ZGlvQ29udGV4dDtcclxudmFyIGF1ZGlvQ29udGV4dCA9IG51bGw7XHJcbnZhciBTVVBQT1JURURfRk9STUFUUyA9IGNvbnN0cy5BVURJT19GT1JNQVRTLmZpbHRlcihmb3JtYXQgPT4ge1xyXG5cdHJldHVybiBhdWRpb0VsLmNhblBsYXlUeXBlKGZvcm1hdC50eXBlKSAhPT0gJyc7XHJcbn0pO1xyXG5cclxuaWYgKEF1ZGlvQ29udGV4dCkge1xyXG5cdGF1ZGlvQ29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQ7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdFNVUFBPUlRFRF9GT1JNQVRTOiBTVVBQT1JURURfRk9STUFUUyxcclxuXHRnZXRBdWRpb0NvbnRleHQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIGF1ZGlvQ29udGV4dDtcclxuXHR9XHJcbn07XHJcbiIsInZhciBhdWRpb0NvbnRleHQgPSByZXF1aXJlKCcuL2F1ZGlvJykuZ2V0QXVkaW9Db250ZXh0KCk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGF1ZGlvQ29udGV4dC5jcmVhdGVBbmFseXNlcigpOyIsIlwidXNlIHN0cmljdFwiO1xuXG5jbGFzcyBCYXNlQ29udHJvbGxlciB7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHR0aGlzLm1vZGVsID0gb3B0aW9ucy5tb2RlbDtcblx0XHR0aGlzLnZpZXcgPSBvcHRpb25zLnZpZXc7XG5cdFx0dGhpcy5iaW5kTGlzdGVuZXJzKCk7XG5cdH1cblxuXHRiaW5kTGlzdGVuZXJzKCkge31cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBCYXNlQ29udHJvbGxlcjsiLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciBCYXNlQ29udHJvbGxlciA9IHJlcXVpcmUoJy4vYmFzZScpO1xyXG5cclxuY2xhc3MgQ29udHJvbHNDb250cm9sbGVyIGV4dGVuZHMgQmFzZUNvbnRyb2xsZXIge1xyXG5cdGJpbmRMaXN0ZW5lcnMoKSB7XHJcblx0XHR0aGlzLnZpZXcub24oJ2NvbnRyb2w6cHJlc3NlZCcsIHRoaXMub25Db250cm9sUHJlc3NlZCwgdGhpcyk7XHJcblx0fVxyXG5cclxuXHRvbkNvbnRyb2xQcmVzc2VkKGNvbnRyb2xUeXBlKSB7XHJcblx0XHRzd2l0Y2goY29udHJvbFR5cGUpIHtcclxuXHRcdFx0Y2FzZSAncGxheSc6XHJcblx0XHRcdFx0dGhpcy5tb2RlbC5wbGF5aW5nU29uZyA9IHRoaXMubW9kZWwuc2VsZWN0ZWRTb25nO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdzdG9wJzpcclxuXHRcdFx0XHR0aGlzLm1vZGVsLnBsYXlpbmdTb25nID0gbnVsbDtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnZXEnOlxyXG5cdFx0XHRcdHRoaXMubW9kZWwuaXNWaXN1YWxpemluZyA9ICF0aGlzLm1vZGVsLmlzVmlzdWFsaXppbmc7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IENvbnRyb2xzQ29udHJvbGxlcjsiLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciAkJCA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzJyk7XHJcbnZhciBhdWRpbyA9IHJlcXVpcmUoJy4uLy4uL2F1ZGlvJyk7XHJcbnZhciBhdWRpb0NvbnRleHQgPSBhdWRpby5nZXRBdWRpb0NvbnRleHQoKTtcclxudmFyIEJhc2VDb250cm9sbGVyID0gcmVxdWlyZSgnLi9iYXNlJyk7XHJcblxyXG5jbGFzcyBQbGF5ZXJDb250cm9sbGVyIGV4dGVuZHMgQmFzZUNvbnRyb2xsZXIge1xyXG5cclxuXHRiaW5kTGlzdGVuZXJzKCkge1xyXG5cdFx0dGhpcy52aWV3Lm9uKCdmaWxlczphZGQnLCB0aGlzLm9uRmlsZXNBZGQsIHRoaXMpO1xyXG5cdH1cclxuXHJcblx0b25GaWxlc0FkZChmaWxlcykge1xyXG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuXHRcdHNlbGYuZmlsdGVyQXVkaW9GaWxlcyhmaWxlcykuZm9yRWFjaChmdW5jdGlvbihmaWxlKSB7XHJcblx0XHRcdFByb21pc2UuYWxsKFtzZWxmLmdldFNvbmdJbmZvKGZpbGUsIFtcInRpdGxlXCIsIFwiYXJ0aXN0XCIsIFwicGljdHVyZVwiXSksIHNlbGYuZGVjb2RlU29uZyhmaWxlKV0pXHJcblx0XHRcdFx0LnRoZW4oZnVuY3Rpb24odmFsdWVzKSB7XHJcblx0XHRcdFx0XHQkJC5hc3NpZ24odmFsdWVzWzBdLCB2YWx1ZXNbMV0sIHtmaWxlTmFtZTogZmlsZS5uYW1lfSk7XHJcblx0XHRcdFx0XHRzZWxmLm1vZGVsLmFkZFNvbmcodmFsdWVzWzBdKTtcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC5jYXRjaChmdW5jdGlvbihlcnIpe1xyXG5cdFx0XHRcdFx0c2VsZi5tb2RlbC5lcnJvck1lc3NhZ2UgPSBlcnIgKycgaW4gZmlsZSAnICsgZmlsZS5uYW1lO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRmaWx0ZXJBdWRpb0ZpbGVzKGZpbGVzKSB7XHJcblx0XHRyZXR1cm4gZmlsZXMuZmlsdGVyKHRoaXMuaXNBdWRpb0ZpbGUsIHRoaXMpO1xyXG5cdH1cclxuXHJcblx0aXNBdWRpb0ZpbGUoZmlsZSkge1xyXG5cdFx0dmFyIHN1cHBvcnQgPSBmYWxzZTtcclxuXHJcblx0XHRhdWRpby5TVVBQT1JURURfRk9STUFUUy5mb3JFYWNoKGZvcm1hdCA9PiB7XHJcblx0XHRcdGlmKGZpbGUubmFtZS5zZWFyY2goZm9ybWF0LmV4dCkgIT09IC0xKSB7XHJcblx0XHRcdFx0c3VwcG9ydCA9IHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiBzdXBwb3J0O1xyXG5cdH1cclxuXHJcblx0Z2V0U29uZ0luZm8oZmlsZSwgdGFncykge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cdFx0XHR2YXIgdXJsID0gZmlsZS51cm4gfHwgZmlsZS5uYW1lO1xyXG5cclxuXHRcdFx0SUQzLmxvYWRUYWdzKHVybCwgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHR2YXIgYWxsVGFncyA9IElEMy5nZXRBbGxUYWdzKHVybCk7XHJcblx0XHRcdFx0XHR2YXIgcGljdHVyZTtcclxuXHRcdFx0XHRcdHZhciByZXN1bHQgPSB7fTtcclxuXHRcdFx0XHRcdHZhciBkYXRhVXJsO1xyXG5cdFx0XHRcdFx0dmFyIGJhc2U2NFN0cmluZztcclxuXHJcblx0XHRcdFx0XHR0YWdzLmZvckVhY2goZnVuY3Rpb24odGFnKSB7XHJcblx0XHRcdFx0XHRcdGlmICh0YWcgPT09ICdwaWN0dXJlJyAmJiBhbGxUYWdzLnBpY3R1cmUpIHtcclxuXHRcdFx0XHRcdFx0XHRwaWN0dXJlID0gYWxsVGFncy5waWN0dXJlO1xyXG5cdFx0XHRcdFx0XHRcdGJhc2U2NFN0cmluZyA9IFwiXCI7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBwaWN0dXJlLmRhdGEubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdFx0XHRcdGJhc2U2NFN0cmluZyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHBpY3R1cmUuZGF0YVtpXSk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdGRhdGFVcmwgPSBcImRhdGE6XCIgKyBwaWN0dXJlLmZvcm1hdCArIFwiO2Jhc2U2NCxcIiArIHdpbmRvdy5idG9hKGJhc2U2NFN0cmluZyk7XHJcblx0XHRcdFx0XHRcdFx0cmVzdWx0LnBpY3R1cmUgPSBkYXRhVXJsO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdHJlc3VsdFt0YWddID0gYWxsVGFnc1t0YWddO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3VsdCk7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHR0YWdzOiB0YWdzLFxyXG5cdFx0XHRcdFx0ZGF0YVJlYWRlcjogRmlsZUFQSVJlYWRlcihmaWxlKSxcclxuXHRcdFx0XHRcdG9uRXJyb3I6IGZ1bmN0aW9uKHJlYXNvbikge1xyXG5cdFx0XHRcdFx0XHRyZWplY3QocmVhc29uKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0ZGVjb2RlU29uZyhmaWxlKSB7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblx0XHRcdHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG5cclxuXHRcdFx0cmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGZpbGUpO1xyXG5cdFx0XHRyZWFkZXIub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0dmFyIGJ1ZmZlciA9IHRoaXMucmVzdWx0O1xyXG5cclxuXHRcdFx0XHRhdWRpb0NvbnRleHQuZGVjb2RlQXVkaW9EYXRhKGJ1ZmZlciwgZnVuY3Rpb24gc3VjY2VzcyhhdWRpb0J1ZmZlcikge1xyXG5cdFx0XHRcdFx0cmVzb2x2ZSh7XHJcblx0XHRcdFx0XHRcdGF1ZGlvQnVmZmVyOiBhdWRpb0J1ZmZlcixcclxuXHRcdFx0XHRcdFx0c2FtcGxlUmF0ZTogYXVkaW9CdWZmZXIuc2FtcGxlUmF0ZSxcclxuXHRcdFx0XHRcdFx0ZHVyYXRpb246IGF1ZGlvQnVmZmVyLmR1cmF0aW9uXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGZ1bmN0aW9uIGVycm9yKGVycikge1xyXG5cdFx0XHRcdFx0cmVqZWN0KCdBdWRpbyBkZWNvZGUgZXJyb3InKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHJlYWRlci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmVqZWN0KCdFcnJvciB3aGlsZSByZWFkaW5nIGZpbGUnKTtcclxuXHRcdFx0fTtcclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQbGF5ZXJDb250cm9sbGVyO1xyXG5cclxuXHJcblxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciBCYXNlQ29udHJvbGxlciA9IHJlcXVpcmUoJy4vYmFzZScpO1xyXG52YXIgY29uc3RzID0gcmVxdWlyZSgnLi4vLi4vY29uc3RzJyk7XHJcbnZhciBFUVVBTElaRVJfUFJFU0VUUyA9IGNvbnN0cy5FUVVBTElaRVJfUFJFU0VUUztcclxudmFyIEVRVUFMSVpFUl9SQU5HRSA9IGNvbnN0cy5FUVVBTElaRVJfUkFOR0U7XHJcbnZhciBTTElERVJfSElHSEVTVCA9ICBjb25zdHMuU0xJREVSX0hJR0hFU1Q7XHJcblxyXG5jbGFzcyBFcXVhbGl6ZUNvbnRyb2xsZXIgZXh0ZW5kcyBCYXNlQ29udHJvbGxlciB7XHJcblx0YmluZExpc3RlbmVycygpIHtcclxuXHRcdHRoaXMudmlldy5vbignc2xpZGVyOmNoYW5nZWQnLCB0aGlzLm9uU2xpZGVyQ2hhbmdlZCwgdGhpcyk7XHJcblx0XHR0aGlzLnZpZXcub24oJ3ByZXNldDpzZWxlY3RlZCcsIHRoaXMub25QcmVzZXRTZWxlY3RlZCwgdGhpcyk7XHJcblx0fVxyXG5cclxuXHRvblByZXNldFNlbGVjdGVkKHByZXNldFR5cGUpIHtcclxuXHRcdHZhciBwcmVzZXQgPSBFUVVBTElaRVJfUFJFU0VUU1twcmVzZXRUeXBlXTtcclxuXHJcblx0XHRPYmplY3Qua2V5cyhwcmVzZXQpLmZvckVhY2goZnVuY3Rpb24oZnJlcSl7XHJcblx0XHRcdHRoaXMubW9kZWwuZXF1YWxpemVyW2ZyZXFdID0gcHJlc2V0W2ZyZXFdO1xyXG5cdFx0fSwgdGhpcyk7XHJcblx0fVxyXG5cclxuXHRvblNsaWRlckNoYW5nZWQoZSkge1xyXG5cdFx0dmFyIHJlc3VsdDtcclxuXHJcblx0XHRpZihlLnR5cGUgPT09ICdnYWluJykge1xyXG5cdFx0XHRyZXN1bHQgPSBlLnZhbHVlIC8gU0xJREVSX0hJR0hFU1Q7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0cmVzdWx0ID0gZS52YWx1ZSAqIEVRVUFMSVpFUl9SQU5HRSAqIDIgLyBTTElERVJfSElHSEVTVCAtIEVRVUFMSVpFUl9SQU5HRTtcclxuXHRcdH1cclxuXHRcdHRoaXMubW9kZWwuZXF1YWxpemVyW2UudHlwZV0gPSByZXN1bHQ7XHJcblx0fVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEVxdWFsaXplQ29udHJvbGxlcjsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIEJhc2VDb250cm9sbGVyID0gcmVxdWlyZSgnLi9iYXNlJyk7XG5cbmNsYXNzIFBsYXllckNvbnRyb2xsZXIgZXh0ZW5kcyBCYXNlQ29udHJvbGxlciB7XG5cdGJpbmRMaXN0ZW5lcnMoKSB7XG5cdFx0dGhpcy52aWV3Lm9uKCdzb25nOmVuZCcsIHRoaXMub25Tb25nRW5kLCB0aGlzKTtcblx0fVxuXG5cdG9uU29uZ0VuZCgpIHtcblx0XHR0aGlzLm1vZGVsLnBsYXlpbmdTb25nID0gbnVsbDtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXllckNvbnRyb2xsZXI7IiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIgQmFzZUNvbnRyb2xsZXIgPSByZXF1aXJlKCcuL2Jhc2UnKTtcclxuXHJcbmNsYXNzIFNvbmdzTGlzdENvbnRyb2xsZXIgZXh0ZW5kcyBCYXNlQ29udHJvbGxlciB7XHJcblx0YmluZExpc3RlbmVycygpIHtcclxuXHRcdHRoaXMudmlldy5vbignc29uZzpzZWxlY3RlZCcsIHRoaXMub25Tb25nU2VsZWN0ZWQsIHRoaXMpO1xyXG5cdH1cclxuXHJcblx0b25Tb25nU2VsZWN0ZWQoc29uZ0lkKSB7XHJcblx0XHR0aGlzLm1vZGVsLnNlbGVjdGVkU29uZyA9IHRoaXMubW9kZWwuZ2V0U29uZyhOdW1iZXIoc29uZ0lkKSk7XHJcblx0fVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNvbmdzTGlzdENvbnRyb2xsZXI7IiwidmFyIGlkID0gMTtcclxuXHJcbmNsYXNzIFNvbmcge1xyXG5cdGNvbnN0cnVjdG9yKGRhdGEpIHtcclxuXHRcdHRoaXMuaWQgPSBpZDtcclxuXHRcdHRoaXMuYXVkaW9CdWZmZXIgPSBkYXRhLmF1ZGlvQnVmZmVyO1xyXG5cdFx0dGhpcy5maWxlTmFtZSA9IGRhdGEuZmlsZU5hbWU7XHJcblx0XHR0aGlzLnRpdGxlID0gZGF0YS50aXRsZSB8fCAnJztcclxuXHRcdHRoaXMuYXJ0aXN0ID0gZGF0YS5hcnRpc3QgfHwgJyc7XHJcblx0XHR0aGlzLmR1cmF0aW9uID0gTWF0aC5yb3VuZChkYXRhLmR1cmF0aW9uKTtcclxuXHRcdHRoaXMucGljdHVyZSA9IGRhdGEucGljdHVyZSB8fCBudWxsO1xyXG5cdFx0aWQrKztcclxuXHR9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU29uZzsiLCJ2YXIgRXZlbnRzID0gcmVxdWlyZSgnLi4vLi4vZXZlbnRzJyk7XHJcbnZhciAkJCA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzJyk7XHJcbnZhciBTb25nID0gcmVxdWlyZSgnLi9zb25nJyk7XHJcblxyXG5jbGFzcyBTb25ncyB7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHR0aGlzLnNvbmdzID0gW107XHJcblx0XHR0aGlzLmxlbmd0aCA9IDA7XHJcblx0fVxyXG5cclxuXHRnZXRTb25nKGlkKSB7XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5zb25ncy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZihpZCA9PT0gdGhpcy5zb25nc1tpXS5pZCkge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLnNvbmdzW2ldO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhZGRTb25nKGRhdGEpIHtcclxuXHRcdHZhciBzb25nID0gbmV3IFNvbmcoZGF0YSk7XHJcblx0XHR0aGlzLnNvbmdzLnB1c2goc29uZyk7XHJcblx0XHR0aGlzLmxlbmd0aCsrO1xyXG5cdFx0dGhpcy50cmlnZ2VyKCdzb25nOmFkZCcsIHNvbmcpO1xyXG5cdH1cclxuXHJcblx0cmVtb3ZlU29uZyhpZCkge1xyXG5cdFx0dmFyIHNvbmcgPSB0aGlzLmdldFNvbmcoaWQpO1xyXG5cdFx0aWYoc29uZyAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHRoaXMuc29uZ3Muc3BsaWNlKHNvbmcsIDEpO1xyXG5cdFx0XHR0aGlzLmxlbmd0aC0tO1xyXG5cdFx0XHR0aGlzLnRyaWdnZXIoJ3Nvbmc6cmVtb3ZlZCcsIHNvbmcpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuJCQuYXNzaWduKFNvbmdzLnByb3RvdHlwZSwgRXZlbnRzKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU29uZ3M7IiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIgRXZlbnRzID0gcmVxdWlyZSgnLi4vLi4vZXZlbnRzJyk7XHJcbnZhciAkJCA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzJyk7XHJcbnZhciBTb25ncyA9IHJlcXVpcmUoJy4uL21vZGVscy9zb25ncycpO1xyXG5cclxuY2xhc3MgUGxheWVyU3RhdGUge1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0dGhpcy5zb25ncyA9IG5ldyBTb25ncygpO1xyXG5cdFx0dGhpcy5zZWxlY3RlZFNvbmcgPSBudWxsO1xyXG5cdFx0dGhpcy5wbGF5aW5nU29uZyA9IG51bGw7XHJcblx0XHR0aGlzLmlzVmlzdWFsaXppbmcgPSB0cnVlO1xyXG5cdFx0dGhpcy5oYXZlU29uZ3MgPSBmYWxzZTtcclxuXHRcdHRoaXMuZXJyb3JNZXNzYWdlID0gJyc7XHJcblx0XHR0aGlzLmVxdWFsaXplciA9IHtcclxuXHRcdFx0J2dhaW4nOiAgMCxcclxuXHRcdFx0JzYwJzogIDAsXHJcblx0XHRcdCcxNzAnOiAgMCxcclxuXHRcdFx0JzMxMCc6ICAwLFxyXG5cdFx0XHQnNjAwJzogIDAsXHJcblx0XHRcdCcxMDAwJzogIDAsXHJcblx0XHRcdCczMDAwJzogIDAsXHJcblx0XHRcdCc2MDAwJzogIDAsXHJcblx0XHRcdCcxMjAwMCc6ICAwLFxyXG5cdFx0XHQnMTQwMDAnOiAgMCxcclxuXHRcdFx0JzE2MDAwJzogIDBcclxuXHRcdH07XHJcblx0XHQkJC5vYnNlcnZlUHJvcGVydGllcyh0aGlzKTtcclxuXHRcdCQkLmFzc2lnbih0aGlzLmVxdWFsaXplciwgRXZlbnRzKTtcclxuXHRcdCQkLm9ic2VydmVQcm9wZXJ0aWVzKHRoaXMuZXF1YWxpemVyKTtcclxuXHRcdHRoaXMuYmluZExpc3RlbmVycygpO1xyXG5cdH1cclxuXHJcblx0YmluZExpc3RlbmVycygpIHtcclxuXHRcdHRoaXMuZXF1YWxpemVyLm9uKCdhbGwnLCBmdW5jdGlvbihldmVudFR5cGUsIHZhbHVlKXtcclxuXHRcdFx0dmFyIHR5cGUgPSBldmVudFR5cGUuc3BsaXQoXCI6XCIpWzBdO1xyXG5cclxuXHRcdFx0dGhpcy50cmlnZ2VyKCdlcXVhbGl6ZXI6Y2hhbmdlZCcsIHtcclxuXHRcdFx0XHR0eXBlOiB0eXBlLFxyXG5cdFx0XHRcdHZhbHVlOiB2YWx1ZVxyXG5cdFx0XHR9KTtcclxuXHRcdH0sIHRoaXMpO1xyXG5cclxuXHRcdHRoaXMuc29uZ3Mub24oJ3Nvbmc6YWRkJywgZnVuY3Rpb24oc29uZykge1xyXG5cdFx0XHR0aGlzLnRyaWdnZXIoJ3Nvbmc6YWRkJywgc29uZyk7XHJcblx0XHRcdGlmICh0aGlzLnNvbmdzLmxlbmd0aCA9PT0gMSkge1xyXG5cdFx0XHRcdHRoaXMuaGF2ZVNvbmdzID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fSwgdGhpcyk7XHJcblxyXG5cdFx0dGhpcy5zb25ncy5vbignc29uZzpyZW1vdmVkJywgZnVuY3Rpb24oc29uZykge1xyXG5cdFx0XHR0aGlzLnRyaWdnZXIoJ3Nvbmc6cmVtb3ZlZCcsIHNvbmcpO1xyXG5cdFx0XHRpZiAodGhpcy5zb25ncy5sZW5ndGggPT09IDApIHtcclxuXHRcdFx0XHR0aGlzLmhhdmVTb25ncyA9IGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9LCB0aGlzKTtcclxuXHR9XHJcblxyXG5cdGdldFNvbmcoaWQpIHtcclxuXHRcdHJldHVybiB0aGlzLnNvbmdzLmdldFNvbmcoaWQpO1xyXG5cdH1cclxuXHJcblx0YWRkU29uZyhkYXRhKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5zb25ncy5hZGRTb25nKGRhdGEpO1xyXG5cdH1cclxuXHJcblx0cmVtb3ZlU29uZyhpZCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuc29uZ3MucmVtb3ZlU29uZyhpZCk7XHJcblx0fVxyXG59XHJcblxyXG4kJC5hc3NpZ24oUGxheWVyU3RhdGUucHJvdG90eXBlLCBFdmVudHMpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQbGF5ZXJTdGF0ZTtcclxuXHJcblxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciAkJCA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzJyk7XHJcbnZhciBFdmVudHMgPSByZXF1aXJlKCcuLi8uLi9ldmVudHMnKTtcclxudmFyIGRvbSA9IHJlcXVpcmUoJy4uLy4uL2RvbScpO1xyXG5cclxuY2xhc3MgQmFzZVZpZXcge1xyXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuXHRcdHRoaXMuZWwgPSBvcHRpb25zLmVsO1xyXG5cdFx0dGhpcy5tb2RlbCA9IG9wdGlvbnMubW9kZWw7XHJcblx0XHR0aGlzLnN1YnZpZXdzID0gb3B0aW9ucy5zdWJ2aWV3cztcclxuXHRcdGlmKG9wdGlvbnMudGVtcGxhdGUpIHtcclxuXHRcdFx0dGhpcy50ZW1wbGF0ZSA9IG9wdGlvbnMudGVtcGxhdGUuY29udGVudC5maXJzdEVsZW1lbnRDaGlsZC5jbG9uZU5vZGUodHJ1ZSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzaG93KCkge1xyXG5cdFx0ZG9tLnNob3codGhpcy5lbCk7XHJcblx0fVxyXG5cclxuXHRoaWRlKCkge1xyXG5cdFx0ZG9tLmhpZGUodGhpcy5lbCk7XHJcblx0fVxyXG5cclxuXHRyZW5kZXIoKSB7XHJcblx0XHR0aGlzLmVsLmFwcGVuZENoaWxkKHRoaXMuY29udGVudCk7XHJcblx0fVxyXG5cclxuXHRyZW1vdmUoKSB7XHJcblx0XHR0aGlzLmVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5lbCk7XHJcblx0fVxyXG59XHJcblxyXG4kJC5hc3NpZ24oQmFzZVZpZXcucHJvdG90eXBlLCBFdmVudHMpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBCYXNlVmlldzsiLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciBCYXNlVmlldyA9IHJlcXVpcmUoJy4vYmFzZScpO1xyXG52YXIgZG9tID0gcmVxdWlyZSgnLi4vLi4vZG9tJyk7XHJcblxyXG5jbGFzcyBDb250cm9sc1ZpZXcgZXh0ZW5kcyBCYXNlVmlldyB7XHJcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xyXG5cdFx0c3VwZXIob3B0aW9ucyk7XHJcblx0XHR0aGlzLmVsZW1zID0ge1xyXG5cdFx0XHRwbGF5OiBkb20ucXMoJy5qcy1wbGF5JyksXHJcblx0XHRcdHN0b3A6IGRvbS5xcygnLmpzLXN0b3AnKSxcclxuXHRcdFx0ZXE6IGRvbS5xcygnLmpzLWVxJylcclxuXHRcdH07XHJcblx0XHR0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xyXG5cdFx0dGhpcy5iaW5kTGlzdGVuZXJzKCk7XHJcblx0fVxyXG5cclxuXHRiaW5kTGlzdGVuZXJzKCkge1xyXG5cdFx0dGhpcy5lbC5vbmNsaWNrID0gdGhpcy5vbkNvbnRyb2xDbGljay5iaW5kKHRoaXMpO1xyXG5cdFx0dGhpcy5tb2RlbC5vbignc2VsZWN0ZWRTb25nOmNoYW5nZWQnLCB0aGlzLm9uU2VsZWN0ZWRTb25nQ2hhbmdlZCwgdGhpcyk7XHJcblx0XHR0aGlzLm1vZGVsLm9uKCdwbGF5aW5nU29uZzpjaGFuZ2VkJywgdGhpcy5vblBsYXlpbmdTb25nQ2hhbmdlZCwgdGhpcyk7XHJcblx0fVxyXG5cclxuXHRvblBsYXlpbmdTb25nQ2hhbmdlZChzb25nKSB7XHJcblx0XHRpZighc29uZykge1xyXG5cdFx0XHR0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xyXG5cdFx0XHRkb20uaGlkZSh0aGlzLmVsZW1zLnN0b3ApO1xyXG5cdFx0XHRkb20uc2hvdyh0aGlzLmVsZW1zLnBsYXkpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHRoaXMuaXNQbGF5aW5nID0gdHJ1ZTtcclxuXHRcdFx0ZG9tLnNob3codGhpcy5lbGVtcy5zdG9wKTtcclxuXHRcdFx0ZG9tLmhpZGUodGhpcy5lbGVtcy5wbGF5KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG9uU2VsZWN0ZWRTb25nQ2hhbmdlZCgpIHtcclxuXHRcdGlmKCF0aGlzLmlzUGxheWluZykge1xyXG5cdFx0XHRkb20ucmVtb3ZlQ2xhc3ModGhpcy5lbGVtcy5wbGF5LCAnaWNvbl9kaXNhYmxlZCcpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0b25Db250cm9sQ2xpY2soZSkge1xyXG5cdFx0dmFyIGNvbnRyb2wgPSBkb20uY2xvc2VzdChlLnRhcmdldCwgJy5qcy1jb250cm9sJyk7XHJcblx0XHRpZighY29udHJvbCB8fCBkb20uaGFzQ2xhc3MoY29udHJvbCwgJ2ljb25fZGlzYWJsZWQnKSkgcmV0dXJuO1xyXG5cdFx0dmFyIGNvbnRyb2xUeXBlID0gY29udHJvbC5kYXRhc2V0LnR5cGU7XHJcblx0XHR0aGlzLnRyaWdnZXIoJ2NvbnRyb2w6cHJlc3NlZCcsIGNvbnRyb2xUeXBlKTtcclxuXHR9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ29udHJvbHNWaWV3O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciBkb20gPSByZXF1aXJlKCcuLi8uLi9kb20nKTtcclxudmFyICQkID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMnKTtcclxudmFyIEJhc2VWaWV3ID0gcmVxdWlyZSgnLi9iYXNlJyk7XHJcblxyXG5jbGFzcyBEcm9wQXJlYVZpZXcgZXh0ZW5kcyBCYXNlVmlldyB7XHJcblxyXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuXHRcdHN1cGVyKG9wdGlvbnMpO1xyXG5cclxuXHRcdHRoaXMuZWxlbXMgPSB7XHJcblx0XHRcdGRyb3BIaW50OiBkb20ucXMoJy5qcy1kcm9wLWhpbnQnLCB0aGlzLmVsKVxyXG5cdFx0fTtcclxuXHRcdHRoaXMuYmluZExpc3RlbmVycygpO1xyXG5cdH1cclxuXHJcblx0YmluZExpc3RlbmVycygpIHtcclxuXHRcdHRoaXMuZWwub25kcm9wID0gdGhpcy5vbkZpbGVEcm9wLmJpbmQodGhpcyk7XHJcblx0XHR0aGlzLmVsLm9uZHJhZ2VudGVyID0gdGhpcy5vbkZpbGVFbnRlci5iaW5kKHRoaXMpO1xyXG5cdFx0dGhpcy5lbC5vbmRyYWdvdmVyID0gdGhpcy5vbkZpbGVEcmFnLmJpbmQodGhpcyk7XHJcblx0XHR0aGlzLmVsZW1zLmRyb3BIaW50Lm9uZHJhZ2xlYXZlID0gdGhpcy5vbkZpbGVMZWF2ZS5iaW5kKHRoaXMpO1xyXG5cdH1cclxuXHJcblx0b25GaWxlRHJhZyhlKSB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0fVxyXG5cclxuXHRvbkZpbGVEcm9wKGUpIHtcclxuXHRcdHZhciBmaWxlcyA9IFtdLnNsaWNlLmNhbGwoZS5kYXRhVHJhbnNmZXIuZmlsZXMpO1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0dGhpcy50cmlnZ2VyKCdmaWxlczphZGQnLCBmaWxlcyk7XHJcblx0XHRkb20uaGlkZSh0aGlzLmVsZW1zLmRyb3BIaW50KTtcclxuXHR9XHJcblxyXG5cdG9uRmlsZUxlYXZlKCkge1xyXG5cdFx0ZG9tLmhpZGUodGhpcy5lbGVtcy5kcm9wSGludCk7XHJcblx0fVxyXG5cclxuXHRvbkZpbGVFbnRlcihlKSB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0ZG9tLnNob3codGhpcy5lbGVtcy5kcm9wSGludCk7XHJcblx0fVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IERyb3BBcmVhVmlldztcclxuXHJcblxyXG5cclxuXHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyIGRvbSA9IHJlcXVpcmUoJy4uLy4uL2RvbScpO1xyXG52YXIgJCQgPSByZXF1aXJlKCcuLi8uLi91dGlscycpO1xyXG52YXIgQmFzZVZpZXcgPSByZXF1aXJlKCcuL2Jhc2UnKTtcclxudmFyIGNvbnN0cyA9IHJlcXVpcmUoJy4uLy4uL2NvbnN0cycpO1xyXG52YXIgRVFVQUxJWkVSX1JBTkdFID0gY29uc3RzLkVRVUFMSVpFUl9SQU5HRTtcclxudmFyIFNMSURFUl9ISUdIRVNUID0gY29uc3RzLlNMSURFUl9ISUdIRVNUO1xyXG5cclxuY2xhc3MgRXF1YWxpemVyVmlldyBleHRlbmRzIEJhc2VWaWV3IHtcclxuXHJcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xyXG5cdFx0c3VwZXIob3B0aW9ucyk7XHJcblx0XHR2YXIgc2xpZGVycztcclxuXHRcdFxyXG5cdFx0dGhpcy5lbGVtcyA9IHtcclxuXHRcdFx0c2xpZGVyczoge1xyXG5cdFx0XHRcdCdnYWluJzogIGRvbS5xcygnW2RhdGEtdHlwZT1cImdhaW5cIl0nLCB0aGlzLmVsKSxcclxuXHRcdFx0XHQnNjAnOiAgZG9tLnFzKCdbZGF0YS10eXBlPVwiNjBcIl0nLCB0aGlzLmVsKSxcclxuXHRcdFx0XHQnMTcwJzogIGRvbS5xcygnW2RhdGEtdHlwZT1cIjE3MFwiXScsIHRoaXMuZWwpLFxyXG5cdFx0XHRcdCczMTAnOiAgZG9tLnFzKCdbZGF0YS10eXBlPVwiMzEwXCJdJywgdGhpcy5lbCksXHJcblx0XHRcdFx0JzYwMCc6ICBkb20ucXMoJ1tkYXRhLXR5cGU9XCI2MDBcIl0nLCB0aGlzLmVsKSxcclxuXHRcdFx0XHQnMTAwMCc6ICBkb20ucXMoJ1tkYXRhLXR5cGU9XCIxMDAwXCJdJywgdGhpcy5lbCksXHJcblx0XHRcdFx0JzMwMDAnOiAgZG9tLnFzKCdbZGF0YS10eXBlPVwiMzAwMFwiXScsIHRoaXMuZWwpLFxyXG5cdFx0XHRcdCc2MDAwJzogIGRvbS5xcygnW2RhdGEtdHlwZT1cIjYwMDBcIl0nLCB0aGlzLmVsKSxcclxuXHRcdFx0XHQnMTIwMDAnOiAgZG9tLnFzKCdbZGF0YS10eXBlPVwiMTIwMDBcIl0nLCB0aGlzLmVsKSxcclxuXHRcdFx0XHQnMTQwMDAnOiAgZG9tLnFzKCdbZGF0YS10eXBlPVwiMTQwMDBcIl0nLCB0aGlzLmVsKSxcclxuXHRcdFx0XHQnMTYwMDAnOiAgZG9tLnFzKCdbZGF0YS10eXBlPVwiMTYwMDBcIl0nLCB0aGlzLmVsKVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRwcmVzZXRzOiB7XHJcblx0XHRcdFx0bm9ybWFsOiBkb20ucXMoJ1tkYXRhLXR5cGU9XCJub3JtYWxcIl0nLCB0aGlzLmVsKSwgXHJcblx0XHRcdFx0cG9wOiBkb20ucXMoJ1tkYXRhLXR5cGU9XCJwb3BcIl0nLCB0aGlzLmVsKSwgXHJcblx0XHRcdFx0cm9jazogZG9tLnFzKCdbZGF0YS10eXBlPVwicm9ja1wiXScsIHRoaXMuZWwpLCBcclxuXHRcdFx0XHRqYXp6OiBkb20ucXMoJ1tkYXRhLXR5cGU9XCJqYXp6XCJdJywgdGhpcy5lbCksIFxyXG5cdFx0XHRcdGNsYXNzaWM6IGRvbS5xcygnW2RhdGEtdHlwZT1cImNsYXNzaWNcIl0nLCB0aGlzLmVsKSBcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHRcdFxyXG5cdFx0c2xpZGVycyA9IHRoaXMuZWxlbXMuc2xpZGVycztcclxuXHJcblx0XHR0aGlzLnNsaWRlcnNDb29yZHMgPSB7XHJcblx0XHRcdCdnYWluJzogIHNsaWRlcnNbJ2dhaW4nXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuXHRcdFx0JzYwJzogIHNsaWRlcnNbJzYwJ10uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcblx0XHRcdCcxNzAnOiAgc2xpZGVyc1snMTcwJ10uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcblx0XHRcdCczMTAnOiAgc2xpZGVyc1snMzEwJ10uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcblx0XHRcdCc2MDAnOiAgc2xpZGVyc1snNjAwJ10uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcblx0XHRcdCcxMDAwJzogIHNsaWRlcnNbJzEwMDAnXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuXHRcdFx0JzMwMDAnOiAgc2xpZGVyc1snMzAwMCddLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxyXG5cdFx0XHQnNjAwMCc6ICBzbGlkZXJzWyc2MDAwJ10uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcblx0XHRcdCcxMjAwMCc6ICBzbGlkZXJzWycxMjAwMCddLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxyXG5cdFx0XHQnMTQwMDAnOiAgc2xpZGVyc1snMTQwMDAnXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuXHRcdFx0JzE2MDAwJzogIHNsaWRlcnNbJzE2MDAwJ10uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcclxuXHRcdH07XHJcblxyXG5cdFx0dGhpcy5hY3RpdmVTbGlkZXIgPSBudWxsO1xyXG5cclxuXHRcdHRoaXMuc2xpZGVyU2hpZnQgPSB7XHJcblx0XHRcdHNoaWZ0WDogbnVsbCxcclxuXHRcdFx0c2hpZnRZOiBudWxsXHJcblx0XHR9O1xyXG5cdFx0dGhpcy5iaW5kTGlzdGVuZXJzKCk7XHJcblx0fVxyXG5cclxuXHRiaW5kTGlzdGVuZXJzKCkge1xyXG5cdFx0dGhpcy5tb2RlbC5vbignZXF1YWxpemVyOmNoYW5nZWQnLCB0aGlzLm9uRXF1YWxpemVyQ2hhbmdlZCwgdGhpcyk7XHJcblx0XHR0aGlzLm1vZGVsLm9uKCdpc1Zpc3VhbGl6aW5nOmNoYW5nZWQnLCB0aGlzLm9uVmlzdWFsaXppbmdDaGFuZ2VkLCB0aGlzKTtcclxuXHRcdHdpbmRvdy5vbnJlc2l6ZSA9IHRoaXMucmVjYWxjU2xpZGVyc0Nvb3Jkcy5iaW5kKHRoaXMpO1xyXG5cdFx0dGhpcy5lbC5vbm1vdXNlZG93biA9IHRoaXMub25UaHVtYk1vdXNlRG93bi5iaW5kKHRoaXMpO1xyXG5cdFx0dGhpcy5lbC5vbmRyYWdzdGFydCA9IHRoaXMub25EcmFnU3RhcnQuYmluZCh0aGlzKTtcclxuXHRcdHRoaXMuZWwub25jbGljayA9IHRoaXMub25QcmVzZXRDbGljay5iaW5kKHRoaXMpO1xyXG5cdH1cclxuXHJcblx0b25FcXVhbGl6ZXJDaGFuZ2VkKGUpIHtcclxuXHRcdHZhciBzbGlkZXIgPSB0aGlzLmVsZW1zLnNsaWRlcnNbZS50eXBlXTtcclxuXHRcdHZhciB0aHVtYiA9IGRvbS5xcygnLmpzLXRodW1iJywgc2xpZGVyKTtcclxuXHRcdHZhciB5O1xyXG5cclxuXHRcdGlmIChlLnR5cGUgPT09ICdnYWluJykge1xyXG5cdFx0XHR5ID0gZS52YWx1ZSAqIFNMSURFUl9ISUdIRVNUO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHkgPSAoZS52YWx1ZSArIEVRVUFMSVpFUl9SQU5HRSkgLyAoRVFVQUxJWkVSX1JBTkdFICogMikgKiBTTElERVJfSElHSEVTVDtcclxuXHRcdH1cclxuXHRcdHRoaXMubW92ZVRodW1iKHRodW1iLCB5KTtcclxuXHR9XHJcblxyXG5cdG9uVmlzdWFsaXppbmdDaGFuZ2VkKCkge1xyXG5cdFx0IHNldFRpbWVvdXQodGhpcy5yZWNhbGNTbGlkZXJzQ29vcmRzLmJpbmQodGhpcyksIDApO1xyXG5cdH1cclxuXHJcblx0b25QcmVzZXRDbGljayhlKSB7XHJcblx0XHR2YXIgcHJlc2V0RWwgPSBlLnRhcmdldDtcclxuXHRcdHZhciBwcmVzZXRUeXBlO1xyXG5cclxuXHRcdGlmICghZG9tLmhhc0NsYXNzKHByZXNldEVsLCAnanMtcHJlc2V0JykpIHJldHVybjtcclxuXHRcdHByZXNldFR5cGUgPSBwcmVzZXRFbC5kYXRhc2V0LnR5cGU7XHJcblx0XHR0aGlzLnRyaWdnZXIoJ3ByZXNldDpzZWxlY3RlZCcsIHByZXNldFR5cGUpO1xyXG5cdH1cclxuXHJcblx0b25UaHVtYk1vdXNlRG93bihlKSB7XHJcblx0XHR2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XHJcblx0XHR2YXJcdHRodW1iQ29vcmRzO1xyXG5cclxuXHRcdGlmICghZG9tLmhhc0NsYXNzKGUudGFyZ2V0LCAnanMtdGh1bWInKSkgcmV0dXJuO1xyXG5cclxuXHRcdHRodW1iQ29vcmRzID0gdGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cdFx0dGhpcy5hY3RpdmVUaHVtYiA9IHRhcmdldDtcclxuXHRcdHRoaXMuYWN0aXZlU2xpZGVyID0gZG9tLmNsb3Nlc3QodGFyZ2V0LCAnLmpzLXNsaWRlcicpO1xyXG5cdFx0dGhpcy5zbGlkZXJTaGlmdC5zaGlmdFggPSBlLnBhZ2VYIC0gdGh1bWJDb29yZHMubGVmdDtcclxuXHRcdHRoaXMuc2xpZGVyU2hpZnQuc2hpZnRZID0gZS5wYWdlWSAtIHRodW1iQ29vcmRzLnRvcDtcclxuXHRcdGRvY3VtZW50Lm9ubW91c2Vtb3ZlID0gdGhpcy5vbkRvY3VtZW50TW91c2VNb3ZlLmJpbmQodGhpcyk7XHJcblx0XHRkb2N1bWVudC5vbm1vdXNldXAgPSB0aGlzLm9uRG9jdW1lbnRNb3VzZVVwLmJpbmQodGhpcyk7XHJcblx0fVxyXG5cclxuXHRvbkRvY3VtZW50TW91c2VNb3ZlKGUpIHtcclxuXHRcdHZhciB0eXBlID0gdGhpcy5hY3RpdmVTbGlkZXIuZGF0YXNldC50eXBlO1xyXG5cdFx0dmFyIHkgPSB0aGlzLnNsaWRlcnNDb29yZHNbdHlwZV0uYm90dG9tIC0gZS5jbGllbnRZIC0gdGhpcy5zbGlkZXJTaGlmdC5zaGlmdFk7XHJcblx0XHRcdHkgPSB0aGlzLmNoZWNrQ29vcmRzKHkpO1xyXG5cdFx0dGhpcy5tb3ZlVGh1bWIodGhpcy5hY3RpdmVUaHVtYiwgeSk7XHJcblx0XHR0aGlzLnRyaWdnZXIoJ3NsaWRlcjpjaGFuZ2VkJywge3R5cGU6IHR5cGUsIHZhbHVlOiB5fSk7XHJcblx0fVxyXG5cclxuXHRvbkRvY3VtZW50TW91c2VVcCgpIHtcclxuXHRcdGRvY3VtZW50Lm9ubW91c2Vtb3ZlID0gbnVsbDtcclxuXHRcdGRvY3VtZW50Lm9ubW91c2V1cCA9IG51bGw7XHJcblx0XHR0aGlzLmFjdGl2ZVNsaWRlciA9IG51bGw7XHJcblx0XHR0aGlzLmFjdGl2ZVRodW1iID0gbnVsbDtcclxuXHRcdHRoaXMuc2xpZGVyU2hpZnQuc2hpZnRYID0gbnVsbDtcclxuXHRcdHRoaXMuc2xpZGVyU2hpZnQuc2hpZnRZID0gbnVsbDtcclxuXHR9XHJcblxyXG5cdGNoZWNrQ29vcmRzKHkpIHtcclxuXHRcdHZhciB0b3BFZGdlO1xyXG5cclxuXHRcdGlmKHkgPCAwKSB7XHJcblx0XHRcdHkgPSAwO1xyXG5cdFx0fVxyXG5cdFx0dG9wRWRnZSA9IHRoaXMuYWN0aXZlU2xpZGVyLm9mZnNldEhlaWdodCAtIHRoaXMuYWN0aXZlVGh1bWIub2Zmc2V0SGVpZ2h0O1xyXG5cdFx0aWYoeSA+IHRvcEVkZ2UpIHtcclxuXHRcdFx0eSA9IHRvcEVkZ2U7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4geTtcclxuXHR9XHJcblxyXG5cdG1vdmVUaHVtYih0aHVtYiwgeSkge1xyXG5cdFx0dGh1bWIuc3R5bGUuYm90dG9tID0geSArICdweCc7XHJcblx0fVxyXG5cclxuXHRvbkRyYWdTdGFydCgpIHtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblx0XHJcblx0cmVjYWxjU2xpZGVyc0Nvb3JkcygpIHtcclxuXHRcdHZhciBzbGlkZXJzID0gdGhpcy5lbGVtcy5zbGlkZXJzO1xyXG5cclxuXHRcdE9iamVjdC5rZXlzKHNsaWRlcnMpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XHJcblx0XHRcdHRoaXMuc2xpZGVyc0Nvb3Jkc1trZXldID0gc2xpZGVyc1trZXldLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cdFx0fSwgdGhpcyk7XHJcblx0fVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEVxdWFsaXplclZpZXc7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBCYXNlVmlldyA9IHJlcXVpcmUoJy4vYmFzZScpO1xudmFyIGRvbSA9IHJlcXVpcmUoJy4uLy4uL2RvbScpO1xuXG5jbGFzcyBOb3RpZmljYXRpb25WaWV3IGV4dGVuZHMgQmFzZVZpZXcge1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0c3VwZXIob3B0aW9ucyk7XG5cdFx0dGhpcy5lbGVtcyA9IHtcblx0XHRcdG5vdGlmaWNhdGlvbjogZG9tLnFzKCcuanMtbm90aWZpY2F0aW9uJywgdGhpcy5lbClcblx0XHR9O1xuXHRcdHRoaXMuYmluZExpc3RlbmVycygpO1xuXHR9XG5cblx0YmluZExpc3RlbmVycygpIHtcblx0XHR0aGlzLm1vZGVsLm9uKCdlcnJvck1lc3NhZ2U6Y2hhbmdlZCcsIHRoaXMub25FcnJvck1lc3NhZ2VDaGFuZ2VkLCB0aGlzKTtcblx0fVxuXG5cdG9uRXJyb3JNZXNzYWdlQ2hhbmdlZChtZXNzYWdlKSB7XG5cdFx0dmFyIG5vdGlmaWNhdGlvbiA9IHRoaXMuZWxlbXMubm90aWZpY2F0aW9uO1xuXHRcdHZhciBzZWxmID0gdGhpcztcblxuXHRcdG5vdGlmaWNhdGlvbi50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XG5cdFx0ZG9tLmFkZENsYXNzKG5vdGlmaWNhdGlvbiwgJ25vdGlmaWNhdGlvbl9zaG93ZWQnKTtcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRkb20ucmVtb3ZlQ2xhc3Mobm90aWZpY2F0aW9uLCAnbm90aWZpY2F0aW9uX3Nob3dlZCcpO1xuXHRcdH0sIDMwMDApO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTm90aWZpY2F0aW9uVmlldztcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyIEJhc2VWaWV3ID0gcmVxdWlyZSgnLi9iYXNlJyk7XHJcbnZhciBhdWRpb0NvbnRleHQgPSByZXF1aXJlKCcuLi8uLi9hdWRpbycpLmdldEF1ZGlvQ29udGV4dCgpO1xyXG52YXIgRlJFUVVFTkNJRVMgPSBbNjAsIDE3MCwgMzEwLCA2MDAsIDEwMDAsIDMwMDAsIDYwMDAsIDEyMDAwLCAxNDAwMCwgMTYwMDBdO1xyXG52YXIgYW5hbHlzZXIgPSByZXF1aXJlKCcuLi8uLi9hdWRpb19hbmFseXNlcicpO1xyXG52YXIgZG9tID0gcmVxdWlyZSgnLi4vLi4vZG9tJyk7XHJcblxyXG5jbGFzcyBQbGF5ZXJWaWV3IGV4dGVuZHMgQmFzZVZpZXcge1xyXG5cclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcblx0XHRzdXBlcihvcHRpb25zKTtcclxuXHRcdHRoaXMuZ2FpbiA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKCk7XHJcblx0XHR0aGlzLmZpbHRlcnMgPSB0aGlzLmNyZWF0ZUZpbHRlcnMoRlJFUVVFTkNJRVMpO1xyXG5cdFx0dGhpcy5hbmFseXNlciA9IGFuYWx5c2VyO1xyXG5cdFx0dGhpcy5lbGVtcyA9IHtcclxuXHRcdFx0dmlzdWFsaXplcjogZG9tLnFzKCcuanMtdmlzdWFsaXplcicsIHRoaXMuZWwpLFxyXG5cdFx0XHRlcXVhbGl6ZXI6IGRvbS5xcygnLmpzLWVxdWFsaXplcicsIHRoaXMuZWwpXHJcblx0XHR9O1xyXG5cdFx0dGhpcy5iaW5kTGlzdGVuZXJzKCk7XHJcblx0fVxyXG5cclxuXHRiaW5kTGlzdGVuZXJzKCkge1xyXG5cdFx0dGhpcy5tb2RlbC5vbignaXNWaXN1YWxpemluZzpjaGFuZ2VkJywgdGhpcy5vblZpc3VhbGl6aW5nQ2hhbmdlZCwgdGhpcyk7XHJcblx0XHR0aGlzLm1vZGVsLm9uKCdwbGF5aW5nU29uZzpjaGFuZ2VkJywgdGhpcy5vblBsYXlpbmdTb25nQ2hhbmdlZCwgdGhpcyk7XHJcblx0XHR0aGlzLm1vZGVsLm9uKCdlcXVhbGl6ZXI6Y2hhbmdlZCcsIHRoaXMub25FcXVhbGl6ZXJDaGFuZ2VkLCB0aGlzKTtcclxuXHR9XHJcblxyXG5cdG9uRXF1YWxpemVyQ2hhbmdlZChlKSB7XHJcblx0XHR2YXIgZmlsdGVySW5kZXg7XHJcblxyXG5cdFx0aWYgKGUudHlwZSA9PT0gJ2dhaW4nKSB7XHJcblx0XHRcdHRoaXMuZ2Fpbi5nYWluLnZhbHVlID0gZS52YWx1ZTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRmaWx0ZXJJbmRleCA9IEZSRVFVRU5DSUVTLmluZGV4T2YoTnVtYmVyKGUudHlwZSkpO1xyXG5cdFx0XHR0aGlzLmZpbHRlcnNbZmlsdGVySW5kZXhdLmdhaW4udmFsdWUgPSBlLnZhbHVlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0b25WaXN1YWxpemluZ0NoYW5nZWQoaXNWaXN1YWxpemluZykge1xyXG5cdFx0aWYgKGlzVmlzdWFsaXppbmcpIHtcclxuXHRcdFx0ZG9tLmhpZGUodGhpcy5lbGVtcy5lcXVhbGl6ZXIpO1xyXG5cdFx0XHRkb20uc2hvdyh0aGlzLmVsZW1zLnZpc3VhbGl6ZXIpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdGRvbS5oaWRlKHRoaXMuZWxlbXMudmlzdWFsaXplcik7XHJcblx0XHRcdGRvbS5zaG93KHRoaXMuZWxlbXMuZXF1YWxpemVyKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG9uUGxheWluZ1NvbmdDaGFuZ2VkKHNvbmcpIHtcclxuXHRcdGlmKCFzb25nKSB7XHJcblx0XHRcdHRoaXMuc3RvcFNvbmcoKTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aGlzLnBsYXlTb25nKHNvbmcpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cGxheVNvbmcoc29uZykge1xyXG5cdFx0dmFyIGF1ZGlvQnVmZmVyID0gc29uZy5hdWRpb0J1ZmZlcjtcclxuXHRcdHZhciBzZWxmID0gdGhpcztcclxuXHJcblx0XHR0aGlzLmF1ZGlvU291cmNlID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xyXG5cdFx0dGhpcy5hdWRpb1NvdXJjZS5idWZmZXIgPSBhdWRpb0J1ZmZlcjtcclxuXHRcdHRoaXMuYXVkaW9Tb3VyY2UuY29ubmVjdCh0aGlzLmdhaW4pO1xyXG5cdFx0dGhpcy5nYWluLmNvbm5lY3QodGhpcy5maWx0ZXJzWzBdKTtcclxuXHRcdHRoaXMuZmlsdGVyc1t0aGlzLmZpbHRlcnMubGVuZ3RoIC0gMV0uY29ubmVjdCh0aGlzLmFuYWx5c2VyKTtcclxuXHRcdHRoaXMuYW5hbHlzZXIuY29ubmVjdChhdWRpb0NvbnRleHQuZGVzdGluYXRpb24pO1xyXG5cdFx0dGhpcy5hdWRpb1NvdXJjZS5zdGFydCgwKTtcclxuXHRcdHRoaXMudGltZXJJZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuXHRcdFx0c2VsZi50cmlnZ2VyKCdzb25nOmVuZCcpO1xyXG5cdFx0fSwgc29uZy5kdXJhdGlvbiAqIDEwMDApO1xyXG5cdH1cclxuXHJcblx0c3RvcFNvbmcoKSB7XHJcblx0XHRjbGVhclRpbWVvdXQodGhpcy50aW1lcklkKTtcclxuXHRcdHRoaXMuYXVkaW9Tb3VyY2Uuc3RvcCgwKTtcclxuXHR9XHJcblxyXG5cdGNyZWF0ZUZpbHRlcnMoZnJlcXVlbmNpZXMpIHtcclxuXHRcdHZhciBmaWx0ZXJzID0gZnJlcXVlbmNpZXMubWFwKHRoaXMuY3JlYXRlRmlsdGVyKTtcclxuXHJcblx0XHRmaWx0ZXJzLnJlZHVjZShmdW5jdGlvbihwcmV2LCBjdXJyKSB7XHJcblx0XHRcdHByZXYuY29ubmVjdChjdXJyKTtcclxuXHRcdFx0cmV0dXJuIGN1cnI7XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gZmlsdGVycztcclxuXHR9XHJcblxyXG5cdGNyZWF0ZUZpbHRlcihmcmVxdWVuY3kpIHtcclxuXHRcdHZhciBmaWx0ZXIgPSBhdWRpb0NvbnRleHQuY3JlYXRlQmlxdWFkRmlsdGVyKCk7XHJcblxyXG5cdFx0ZmlsdGVyLnR5cGUgPSAncGVha2luZyc7XHJcblx0XHRmaWx0ZXIuZnJlcXVlbmN5LnZhbHVlID0gZnJlcXVlbmN5O1xyXG5cdFx0ZmlsdGVyLlEudmFsdWUgPSAxO1xyXG5cdFx0ZmlsdGVyLmdhaW4udmFsdWUgPSAwO1xyXG5cclxuXHRcdHJldHVybiBmaWx0ZXI7XHJcblx0fVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXllclZpZXc7XHJcblxyXG5cclxuXHJcblxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciBCYXNlVmlldyA9IHJlcXVpcmUoJy4vYmFzZScpO1xyXG52YXIgZG9tID0gcmVxdWlyZSgnLi4vLi4vZG9tJyk7XHJcblxyXG5jbGFzcyBTb25nRGV0YWlsc1ZpZXcgZXh0ZW5kcyBCYXNlVmlldyB7XHJcblxyXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuXHRcdHN1cGVyKG9wdGlvbnMpO1xyXG5cdFx0dGhpcy5lbGVtcyA9IHtcclxuXHRcdFx0Y292ZXI6IGRvbS5xcygnLmpzLWNvdmVyJywgdGhpcy5lbCksXHJcblx0XHRcdHRpdGxlOiBkb20ucXMoJy5qcy10aXRsZScsIHRoaXMuZWwpLFxyXG5cdFx0XHRhcnRpc3Q6IGRvbS5xcygnLmpzLWFydGlzdCcsIHRoaXMuZWwpLFxyXG5cdFx0XHRmaWxlTmFtZTogZG9tLnFzKCcuanMtZmlsZW5hbWUnLCB0aGlzLmVsKVxyXG5cdFx0fTtcclxuXHRcdHRoaXMuZGVmYXVsdFBpY3R1cmUgPSB0aGlzLmVsZW1zLmNvdmVyLnNyYztcclxuXHRcdHRoaXMucGxheWluZ1NvbmcgPSBudWxsO1xyXG5cclxuXHRcdHRoaXMuYmluZExpc3RlbmVycygpO1xyXG5cdH1cclxuXHJcblx0YmluZExpc3RlbmVycygpIHtcclxuXHRcdHRoaXMubW9kZWwub24oJ3NlbGVjdGVkU29uZzpjaGFuZ2VkJywgdGhpcy5vblNlbGVjdGVkU29uZ0NoYW5nZWQsIHRoaXMpO1xyXG5cdFx0dGhpcy5tb2RlbC5vbigncGxheWluZ1Nvbmc6Y2hhbmdlZCcsIGZ1bmN0aW9uKHNvbmcpe1xyXG5cdFx0XHR0aGlzLnBsYXlpbmdTb25nID0gc29uZztcclxuXHRcdH0sIHRoaXMpO1xyXG5cdH1cclxuXHJcblx0b25TZWxlY3RlZFNvbmdDaGFuZ2VkKHNvbmcpIHtcclxuXHRcdGlmICh0aGlzLnBsYXlpbmdTb25nKSByZXR1cm47XHJcblxyXG5cdFx0aWYoc29uZy5waWN0dXJlKSB7XHJcblx0XHRcdHRoaXMuZWxlbXMuY292ZXIuc3JjID0gc29uZy5waWN0dXJlO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHRoaXMuZWxlbXMuY292ZXIuc3JjID0gdGhpcy5kZWZhdWx0UGljdHVyZTtcclxuXHRcdH1cclxuXHRcdGlmICghc29uZy50aXRsZSkge1xyXG5cdFx0XHR0aGlzLmVsZW1zLmZpbGVOYW1lLnRleHRDb250ZW50ID0gJyc7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhpcy5lbGVtcy5maWxlTmFtZS50ZXh0Q29udGVudCA9IHNvbmcuZmlsZU5hbWU7XHJcblx0XHR9XHJcblx0XHR0aGlzLmVsZW1zLnRpdGxlLnRleHRDb250ZW50ID0gc29uZy50aXRsZSB8fCBzb25nLmZpbGVOYW1lO1xyXG5cdFx0dGhpcy5lbGVtcy5hcnRpc3QudGV4dENvbnRlbnQgPSBzb25nLmFydGlzdCB8fCAnJztcclxuXHR9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU29uZ0RldGFpbHNWaWV3OyIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyICQkID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMnKTtcclxudmFyIEV2ZW50cyA9IHJlcXVpcmUoJy4uLy4uL2V2ZW50cycpO1xyXG52YXIgZG9tID0gcmVxdWlyZSgnLi4vLi4vZG9tJyk7XHJcbnZhciBCYXNlVmlldyA9IHJlcXVpcmUoJy4vYmFzZScpO1xyXG5cclxuY2xhc3MgU29uZ3NMaXN0VmlldyBleHRlbmRzIEJhc2VWaWV3IHtcclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcblx0XHRzdXBlcihvcHRpb25zKTtcclxuXHRcdHRoaXMuZWxlbXMgPSB7XHJcblx0XHRcdHBsYWNlaG9sZGVyOiBkb20ucXMoJy5qcy1wbGFjZWhvbGRlcicsIHRoaXMuZWwpXHJcblx0XHR9O1xyXG5cdFx0dGhpcy5iaW5kTGlzdGVuZXJzKCk7XHJcblx0fVxyXG5cclxuXHRiaW5kTGlzdGVuZXJzKCkge1xyXG5cdFx0dGhpcy5tb2RlbC5vbignc29uZzphZGQnLCB0aGlzLm9uU29uZ0FkZCwgdGhpcyk7XHJcblx0XHR0aGlzLmVsLm9uY2xpY2sgPSB0aGlzLm9uU29uZ0NsaWNrLmJpbmQodGhpcyk7XHJcblx0fVxyXG5cclxuXHRvblNvbmdDbGljayhlKSB7XHJcblx0XHR2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XHJcblx0XHR2YXIgc29uZ0VsID0gZG9tLmNsb3Nlc3QodGFyZ2V0LCAnLmpzLXNvbmcnKTtcclxuXHJcblx0XHRpZiAoIXNvbmdFbCkgcmV0dXJuO1xyXG5cdFx0dGhpcy5zZWxlY3RTb25nKHNvbmdFbCk7XHJcblx0XHR0aGlzLnRyaWdnZXIoJ3Nvbmc6c2VsZWN0ZWQnLCBzb25nRWwuZGF0YXNldC5pZCk7XHJcblx0fVxyXG5cclxuXHRvblNvbmdBZGQoc29uZykge1xyXG5cdFx0dmFyIHNvbmdFbCA9IHRoaXMuY3JlYXRlU29uZ0VsKHNvbmcpO1xyXG5cclxuXHRcdGlmKCF0aGlzLmhhdmVTb25ncykge1xyXG5cdFx0XHR0aGlzLmVsZW1zLnBsYWNlaG9sZGVyLnJlbW92ZSgpO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5oYXZlU29uZ3MgPSB0cnVlO1xyXG5cdFx0dGhpcy5lbC5hcHBlbmRDaGlsZChzb25nRWwpO1xyXG5cdH1cclxuXHJcblx0c2VsZWN0U29uZyhzb25nRWwpIHtcclxuXHRcdCQkLnRvQXJyYXkoc29uZ0VsLnBhcmVudE5vZGUuY2hpbGRyZW4pXHJcblx0XHRcdC5maWx0ZXIoZWwgPT4gZWwgIT09IHNvbmdFbClcclxuXHRcdFx0LmZvckVhY2goZWwgPT4gZG9tLnJlbW92ZUNsYXNzKGVsLCAnc29uZy1pdGVtX3NlbGVjdGVkJykpO1xyXG5cclxuXHRcdGRvbS5hZGRDbGFzcyhzb25nRWwsICdzb25nLWl0ZW1fc2VsZWN0ZWQnKTtcclxuXHR9XHJcblxyXG5cdGNyZWF0ZVNvbmdFbChzb25nKSB7XHJcblx0XHR2YXIgc29uZ0VsID0gdGhpcy50ZW1wbGF0ZS5jbG9uZU5vZGUodHJ1ZSk7XHJcblx0XHR2YXIgdGl0bGUgPSBkb20ucXMoJy5qcy1zb25nLXRpdGxlJywgc29uZ0VsKTtcclxuXHRcdHZhciBhcnRpc3QgPSBkb20ucXMoJy5qcy1zb25nLWFydGlzdCcsIHNvbmdFbCk7XHJcblx0XHR2YXIgY292ZXIgPSBkb20ucXMoJy5qcy1zb25nLWNvdmVyJywgc29uZ0VsKTtcclxuXHRcdHZhciBkdXJhdGlvbiA9IGRvbS5xcygnLmpzLXNvbmctZHVyYXRpb24nLCBzb25nRWwpO1xyXG5cclxuXHRcdHRpdGxlLnRleHRDb250ZW50ID0gc29uZy50aXRsZSB8fCBzb25nLmZpbGVOYW1lO1xyXG5cdFx0YXJ0aXN0LnRleHRDb250ZW50ID0gc29uZy5hcnRpc3Q7XHJcblxyXG5cdFx0ZHVyYXRpb24udGV4dENvbnRlbnQgPSB0aGlzLmZvcm1hdER1cmF0aW9uKHNvbmcuZHVyYXRpb24pO1xyXG5cdFx0c29uZ0VsLmRhdGFzZXQuaWQgPSBzb25nLmlkO1xyXG5cdFx0aWYoc29uZy5waWN0dXJlKSB7XHJcblx0XHRcdGNvdmVyLnNyYyA9IHNvbmcucGljdHVyZTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gc29uZ0VsO1xyXG5cdH1cclxuXHJcblx0Zm9ybWF0RHVyYXRpb24oc2Vjcykge1xyXG5cdFx0dmFyIG1pbnV0ZXMgPSBNYXRoLmZsb29yKHNlY3MgLyA2MCk7XHJcblx0XHR2YXIgc2Vjb25kcyA9IHNlY3MgJSA2MDtcclxuXHJcblx0XHRpZihzZWNvbmRzLnRvU3RyaW5nKCkubGVuZ3RoID09PSAxKSB7XHJcblx0XHRcdHNlY29uZHMgPSAnMCcgKyBzZWNvbmRzO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBgJHttaW51dGVzfToke3NlY29uZHN9YDtcclxuXHR9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU29uZ3NMaXN0VmlldzsgIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIgQmFzZVZpZXcgPSByZXF1aXJlKCcuL2Jhc2UnKTtcclxudmFyIGRvbSA9IHJlcXVpcmUoJy4uLy4uL2RvbScpO1xyXG52YXIgYXVkaW8gPSByZXF1aXJlKCcuLi8uLi9hdWRpbycpO1xyXG52YXIgYW5hbHlzZXIgPSByZXF1aXJlKCcuLi8uLi9hdWRpb19hbmFseXNlcicpO1xyXG5cclxuY2xhc3MgVmlzdWFsaXplclZpZXcgZXh0ZW5kcyBCYXNlVmlldyB7XHJcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xyXG5cdFx0c3VwZXIob3B0aW9ucyk7XHJcblxyXG5cdFx0dGhpcy5lbGVtcyA9IHtcclxuXHRcdFx0Y2FudmFzOiBkb20ucXMoJy5qcy1jYW52YXMnLCB0aGlzLmVsKVxyXG5cdFx0fTtcclxuXHRcdHRoaXMuZnJhbWVJZCA9IG51bGw7XHJcblx0XHR0aGlzLmNhbnZhc1cgPSB0aGlzLmVsZW1zLmNhbnZhcy5vZmZzZXRXaWR0aDtcclxuXHRcdHRoaXMuY2FudmFzSCA9IHRoaXMuZWxlbXMuY2FudmFzLm9mZnNldEhlaWdodDtcclxuXHRcdHRoaXMuY2FudmFzQ3R4ID0gdGhpcy5lbGVtcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuXHRcdHRoaXMuYmluZExpc3RlbmVycygpO1xyXG5cdH1cclxuXHJcblx0YmluZExpc3RlbmVycygpIHtcclxuXHRcdHRoaXMubW9kZWwub24oJ3BsYXlpbmdTb25nOmNoYW5nZWQnLCB0aGlzLm9uUGxheWluZ1NvbmdDaGFuZ2VkLCB0aGlzKTtcclxuXHR9XHJcblxyXG5cdG9uUGxheWluZ1NvbmdDaGFuZ2VkKHNvbmcpIHtcclxuXHRcdGlmKHNvbmcpIHtcclxuXHRcdFx0dGhpcy5zdGFydFZpc3VhbGl6YXRpb24oKTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aGlzLnN0b3BWaXN1YWxpemF0aW9uKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRjbGVhckNhbnZhcygpIHtcclxuXHRcdHRoaXMuY2FudmFzQ3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhc1csIHRoaXMuY2FudmFzSCk7XHJcblx0fVxyXG5cclxuXHRzdG9wVmlzdWFsaXphdGlvbigpIHtcclxuXHRcdGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuZnJhbWVJZCk7XHJcblx0XHR0aGlzLmNsZWFyQ2FudmFzKCk7XHJcblx0fVxyXG5cclxuXHRzdGFydFZpc3VhbGl6YXRpb24oKSB7XHJcblx0XHR2YXIgaTtcclxuXHRcdHZhciB4ID0gMDtcclxuXHRcdHZhciB2O1xyXG5cdFx0dmFyIHk7XHJcblx0XHR2YXIgc2xpY2VXaWR0aDtcclxuXHRcdHZhciBidWZmZXJMZW5ndGggPSBhbmFseXNlci5mcmVxdWVuY3lCaW5Db3VudDtcclxuXHRcdHZhciBkYXRhQXJyYXkgPSBuZXcgVWludDhBcnJheShidWZmZXJMZW5ndGgpO1xyXG5cclxuXHRcdHRoaXMuY2xlYXJDYW52YXMoKTtcclxuXHRcdHRoaXMuZnJhbWVJZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnN0YXJ0VmlzdWFsaXphdGlvbi5iaW5kKHRoaXMpKTtcclxuXHRcdGFuYWx5c2VyLmdldEJ5dGVUaW1lRG9tYWluRGF0YShkYXRhQXJyYXkpO1xyXG5cdFx0dGhpcy5jYW52YXNDdHgubGluZVdpZHRoID0gMTtcclxuXHRcdHRoaXMuY2FudmFzQ3R4LnN0cm9rZVN0eWxlID0gJ3JlZCc7XHJcblx0XHR0aGlzLmNhbnZhc0N0eC5iZWdpblBhdGgoKTtcclxuXHJcblx0XHRzbGljZVdpZHRoID0gdGhpcy5jYW52YXNXICogMS4wIC8gYnVmZmVyTGVuZ3RoO1xyXG5cclxuXHRcdGZvcihpID0gMDsgaSA8IGJ1ZmZlckxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHYgPSBkYXRhQXJyYXlbaV0gLyAxMjguMDtcclxuXHRcdFx0eSA9IHYgKiB0aGlzLmNhbnZhc0ggLyAyO1xyXG5cclxuXHRcdFx0aWYoaSA9PT0gMCkge1xyXG5cdFx0XHRcdHRoaXMuY2FudmFzQ3R4Lm1vdmVUbyh4LCB5KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHR0aGlzLmNhbnZhc0N0eC5saW5lVG8oeCwgeSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHggKz0gc2xpY2VXaWR0aDtcclxuXHRcdH1cclxuXHRcdHRoaXMuY2FudmFzQ3R4LmxpbmVUbyh0aGlzLmNhbnZhc1csIHRoaXMuY2FudmFzSCAvIDIpO1xyXG5cdFx0dGhpcy5jYW52YXNDdHguc3Ryb2tlKCk7XHJcblx0fVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFZpc3VhbGl6ZXJWaWV3OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgU0xJREVSX0hJR0hFU1QgPSAyMDA7XG52YXIgRVFVQUxJWkVSX1JBTkdFID0gMTI7XG52YXIgQVVESU9fRk9STUFUUyA9IFtcblx0e1xuXHRcdHR5cGU6ICdhdWRpby9tcGVnJyxcblx0XHRleHQ6ICdtcDMnXG5cdH0sXG5cdHtcblx0XHR0eXBlOiAnYXVkaW8vb2dnOyBjb2RlY3M9XCJ2b3JiaXNcIicsXG5cdFx0ZXh0OiAnb2dnJ1xuXHR9LFxuXHR7XG5cdFx0dHlwZTogJ2F1ZGlvL3dhdjsgY29kZWNzPVwiMVwiJyxcblx0XHRleHQ6ICd3YXYnXG5cdH0sXG5cdHtcblx0XHR0eXBlOiAnYXVkaW8vbXA0OyBjb2RlY3M9XCJtcDRhLjQwLjJcIicsXG5cdFx0ZXh0OiAnYWFjJ1xuXHR9LFxuXHR7XG5cdFx0dHlwZTogJ2F1ZGlvL3dlYm0nLFxuXHRcdGV4dDogJ3dlYmEnXG5cdH0sXG5cdHtcblx0XHR0eXBlOiAnYXVkaW8vZmxhYycsXG5cdFx0ZXh0OiAnZmxhYydcblx0fVxuXTtcbnZhciBFUVVBTElaRVJfUFJFU0VUUyA9IHtcblx0bm9ybWFsOiB7XG5cdFx0JzYwJzogIDAsXG5cdFx0JzE3MCc6ICAwLFxuXHRcdCczMTAnOiAgMCxcblx0XHQnNjAwJzogIDAsXG5cdFx0JzEwMDAnOiAgMCxcblx0XHQnMzAwMCc6ICAwLFxuXHRcdCc2MDAwJzogIDAsXG5cdFx0JzEyMDAwJzogIDAsXG5cdFx0JzE0MDAwJzogIDAsXG5cdFx0JzE2MDAwJzogIDBcblx0fSxcblx0cG9wOiB7XG5cdFx0JzYwJzogIC0xLjYsXG5cdFx0JzE3MCc6ICA0LjgsXG5cdFx0JzMxMCc6ICA3LjIsXG5cdFx0JzYwMCc6ICA4LFxuXHRcdCcxMDAwJzogIDUuNixcblx0XHQnMzAwMCc6ICAxLjEsXG5cdFx0JzYwMDAnOiAgMi40LFxuXHRcdCcxMjAwMCc6ICAyLjQsXG5cdFx0JzE0MDAwJzogIDEuNixcblx0XHQnMTYwMDAnOiAgMS42XG5cdH0sXG5cdHJvY2s6IHtcblx0XHQnNjAnOiAgOCxcblx0XHQnMTcwJzogIDQuOCxcblx0XHQnMzEwJzogIC01LjYsXG5cdFx0JzYwMCc6ICAtOCxcblx0XHQnMTAwMCc6ICAzLjIsXG5cdFx0JzMwMDAnOiAgNCxcblx0XHQnNjAwMCc6ICA4LjgsXG5cdFx0JzEyMDAwJzogIDExLjIsXG5cdFx0JzE0MDAwJzogIDExLjIsXG5cdFx0JzE2MDAwJzogIDExLjJcblx0fSxcblx0amF6ejoge1xuXHRcdCc2MCc6ICAxMCxcblx0XHQnMTcwJzogIDkuMixcblx0XHQnMzEwJzogIDYsXG5cdFx0JzYwMCc6ICA2LFxuXHRcdCcxMDAwJzogIDQsXG5cdFx0JzMwMDAnOiAgMi4yLFxuXHRcdCc2MDAwJzogIDIuMixcblx0XHQnMTIwMDAnOiAgLTQsXG5cdFx0JzE0MDAwJzogIC04LjIsXG5cdFx0JzE2MDAwJzogIC04LjJcblx0fSxcblx0Y2xhc3NpYzoge1xuXHRcdCc2MCc6ICAtNC44LFxuXHRcdCcxNzAnOiAgLTEuMSxcblx0XHQnMzEwJzogIDQsXG5cdFx0JzYwMCc6ICA1LjYsXG5cdFx0JzEwMDAnOiAgNS42LFxuXHRcdCczMDAwJzogIDUuNixcblx0XHQnNjAwMCc6ICA0LFxuXHRcdCcxMjAwMCc6ICAyLjQsXG5cdFx0JzE0MDAwJzogIDIuNCxcblx0XHQnMTYwMDAnOiAgMi40XG5cdH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRTTElERVJfSElHSEVTVDogU0xJREVSX0hJR0hFU1QsXG5cdEVRVUFMSVpFUl9SQU5HRTogRVFVQUxJWkVSX1JBTkdFLFxuXHRBVURJT19GT1JNQVRTOiBBVURJT19GT1JNQVRTLFxuXHRFUVVBTElaRVJfUFJFU0VUUzogRVFVQUxJWkVSX1BSRVNFVFNcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciAkJCA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcclxuXHJcbnZhciBkb20gPSB7XHJcblx0YnlJZDogZnVuY3Rpb24oaWQpIHtcclxuXHRcdHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XHJcblx0fSxcclxuXHRxczogZnVuY3Rpb24oc2VsZWN0b3IsIGNvbnRleHQpIHtcclxuXHRcdGNvbnRleHQgPSBjb250ZXh0IHx8IGRvY3VtZW50O1xyXG5cdFx0cmV0dXJuIGNvbnRleHQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XHJcblx0fSxcclxuXHRxc2E6IGZ1bmN0aW9uKHNlbGVjdG9yLCBjb250ZXh0KSB7XHJcblx0XHRjb250ZXh0ID0gY29udGV4dCB8fCBkb2N1bWVudDtcclxuXHRcdHJldHVybiAkJC50b0FycmF5KGNvbnRleHQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xyXG5cdH0sXHJcblx0YWRkQ2xhc3M6IGZ1bmN0aW9uKGVsLCBjbGFzc05hbWUpIHtcclxuXHRcdGVsLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcclxuXHR9LFxyXG5cdHJlbW92ZUNsYXNzOiBmdW5jdGlvbihlbCwgY2xhc3NOYW1lKSB7XHJcblx0XHRlbC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XHJcblx0fSxcclxuXHRoYXNDbGFzczogZnVuY3Rpb24oZWwsIGNsYXNzTmFtZSkge1xyXG5cdFx0cmV0dXJuIGVsLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpO1xyXG5cdH0sXHJcblx0aGlkZTogZnVuY3Rpb24oLi4uZWxlbXMpIHtcclxuXHRcdGVsZW1zLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xyXG5cdFx0XHRpdGVtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cdHNob3c6IGZ1bmN0aW9uKC4uLmVsZW1zKSB7XHJcblx0XHRlbGVtcy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcclxuXHRcdFx0aXRlbS5zdHlsZS5kaXNwbGF5ID0gJyc7XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cdGNsb3Nlc3Q6IGZ1bmN0aW9uKGVsLCBzZWxlY3Rvcikge1xyXG5cdFx0aWYoZWwuY2xvc2VzdCkgcmV0dXJuIGVsLmNsb3Nlc3Qoc2VsZWN0b3IpO1xyXG5cclxuXHRcdHZhciBwYXJlbnROb2RlID0gZWw7XHJcblx0XHR2YXIgbWF0Y2hlcztcclxuXHJcblx0XHR3aGlsZSgobWF0Y2hlcyA9IHBhcmVudE5vZGUgJiYgcGFyZW50Tm9kZS5tYXRjaGVzKSAmJiAhcGFyZW50Tm9kZS5tYXRjaGVzKHNlbGVjdG9yKSkge1xyXG5cdFx0XHRwYXJlbnROb2RlID0gcGFyZW50Tm9kZS5wYXJlbnROb2RlO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIG1hdGNoZXMgPyBwYXJlbnROb2RlIDogbnVsbDtcclxuXHR9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGRvbTsiLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciBzdWJzY3JpYmVycyA9IG5ldyBNYXAoKTtcclxuXHJcbnZhciBFdmVudHMgPSB7XHJcblx0b246IGZ1bmN0aW9uKHR5cGUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XHJcblx0XHR2YXIgaXRlbTtcclxuXHJcblx0XHRpZihzdWJzY3JpYmVycy5oYXModGhpcykpIHtcclxuXHRcdFx0aXRlbSA9IHN1YnNjcmliZXJzLmdldCh0aGlzKTtcclxuXHRcdFx0aWYoaXRlbVt0eXBlXSkge1xyXG5cdFx0XHRcdGl0ZW1bdHlwZV0ucHVzaCh7XHJcblx0XHRcdFx0XHRjYWxsYmFjazogY2FsbGJhY2ssXHJcblx0XHRcdFx0XHRjb250ZXh0OiBjb250ZXh0XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0aXRlbVt0eXBlXSA9IFt7XHJcblx0XHRcdFx0XHRjYWxsYmFjazogY2FsbGJhY2ssXHJcblx0XHRcdFx0XHRjb250ZXh0OiBjb250ZXh0XHJcblx0XHRcdFx0fV07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRpdGVtID0ge1xyXG5cdFx0XHRcdFt0eXBlXTogW3tcclxuXHRcdFx0XHRcdGNhbGxiYWNrOiBjYWxsYmFjayxcclxuXHRcdFx0XHRcdGNvbnRleHQ6IGNvbnRleHRcclxuXHRcdFx0XHR9XVxyXG5cdFx0XHR9O1xyXG5cdFx0XHRzdWJzY3JpYmVycy5zZXQodGhpcywgaXRlbSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHRvZmY6IGZ1bmN0aW9uKHR5cGUsIGNhbGxiYWNrKSB7XHJcblx0XHR2YXIgaXRlbSwgaTtcclxuXHRcdGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcclxuXHRcdFx0c3Vic2NyaWJlcnMuZGVsZXRlKHRoaXMpO1xyXG5cdFx0fVxyXG5cdFx0aWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSAmJiBzdWJzY3JpYmVycy5oYXModGhpcykpIHtcclxuXHRcdFx0aXRlbSA9IHN1YnNjcmliZXJzLmdldCh0aGlzKTtcclxuXHRcdFx0aWYoaXRlbVt0eXBlXSkge1xyXG5cdFx0XHRcdGlmKGNhbGxiYWNrKSB7XHJcblx0XHRcdFx0XHRmb3IoaSA9IDA7IGkgPCBpdGVtW3R5cGVdLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRcdGlmKGl0ZW1bdHlwZV1baV0gPT09IGNhbGxiYWNrKSB7XHJcblx0XHRcdFx0XHRcdFx0aXRlbVt0eXBlXS5zcGxpY2UoaSwgMSk7XHJcblx0XHRcdFx0XHRcdFx0aS0tO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0ZGVsZXRlIGl0ZW1bdHlwZV07XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSxcclxuXHR0cmlnZ2VyOiBmdW5jdGlvbih0eXBlLCAuLi5hcmdzKSB7XHJcblx0XHR2YXIgaXRlbTtcclxuXHJcblx0XHRpZihzdWJzY3JpYmVycy5oYXModGhpcykpIHtcclxuXHRcdFx0aXRlbSA9IHN1YnNjcmliZXJzLmdldCh0aGlzKTtcclxuXHJcblx0XHRcdGlmKGl0ZW1bdHlwZV0pIHtcclxuXHRcdFx0XHRpdGVtW3R5cGVdLmZvckVhY2goZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0XHRcdHZhciBjb250ZXh0ID0gZXZlbnQuY29udGV4dCB8fCB0aGlzO1xyXG5cdFx0XHRcdFx0ZXZlbnQuY2FsbGJhY2suYXBwbHkoY29udGV4dCwgYXJncyk7XHJcblx0XHRcdFx0fSwgdGhpcyk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKGl0ZW0uYWxsKSB7XHJcblx0XHRcdFx0aXRlbS5hbGwuZm9yRWFjaChmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRcdFx0dmFyIGNvbnRleHQgPSBldmVudC5jb250ZXh0IHx8IHRoaXM7XHJcblx0XHRcdFx0XHRhcmdzLnVuc2hpZnQodHlwZSk7XHJcblx0XHRcdFx0XHRldmVudC5jYWxsYmFjay5hcHBseShjb250ZXh0LCBhcmdzKTtcclxuXHRcdFx0XHR9LCB0aGlzKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRXZlbnRzOyIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyICQkID0ge1xyXG5cdHRvQXJyYXk6IGZ1bmN0aW9uKG9iamVjdCkge1xyXG5cdFx0cmV0dXJuIFtdLnNsaWNlLmNhbGwob2JqZWN0KTtcclxuXHR9LFxyXG5cdGFzc2lnbjogZnVuY3Rpb24odGFyZ2V0LCAuLi5yZXN0KSB7XHJcblx0XHRpZih0YXJnZXQgPT09IHVuZGVmaW5lZCB8fCB0YXJnZXQgPT09IG51bGwpIHtcclxuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgZmlyc3QgYXJndW1lbnQgdG8gb2JqZWN0Jyk7XHJcblx0XHR9XHJcblx0XHRyZXN0LmZvckVhY2gob2JqID0+IHtcclxuXHRcdFx0aWYob2JqID09PSB1bmRlZmluZWQgfHwgb2JqID09PSBudWxsKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHRcdE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChrZXkgPT4ge1xyXG5cdFx0XHRcdHRhcmdldFtrZXldID0gb2JqW2tleV07XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fSxcclxuXHRvYnNlcnZlUHJvcGVydGllczogZnVuY3Rpb24ob2JqKSB7XHJcblx0XHRpZiAodHlwZW9mIG9iai50cmlnZ2VyICE9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdHRocm93ICdPYnNlcnZlZCBvYmplY3QgbXVzdCBoYXZlIHRyaWdnZXIgbWV0aG9kJztcclxuXHRcdH1cclxuXHRcdE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcclxuXHRcdFx0b2JqWydfJyArIGtleV0gPSBvYmpba2V5XTtcclxuXHJcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xyXG5cdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gb2JqWydfJyArIGtleV07XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcblx0XHRcdFx0XHRpZihvYmpbJ18nICsga2V5XSA9PT0gdmFsdWUpIHJldHVybjtcclxuXHJcblx0XHRcdFx0XHRvYmpbJ18nICsga2V5XSA9IHZhbHVlO1xyXG5cdFx0XHRcdFx0b2JqLnRyaWdnZXIoa2V5ICsgJzpjaGFuZ2VkJywgdmFsdWUpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9LCBvYmopO1xyXG5cdH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gJCQ7Il19
