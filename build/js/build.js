(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var PlayerView = require('./audio_player/views/player');
var PlayerState = require('./audio_player/states/player');

var DropAreaView = require('./audio_player/views/drop_area');
var DropAreaController = require('./audio_player/controllers/drop_area');

var SongsListView = require('./audio_player/views/songs_list');
var SongsListController = require('./audio_player/controllers/songs_list');

var SongDetailsView = require('./audio_player/views/song_details');

var ControlsView = require('./audio_player/views/controls');
var ControlsController = require('./audio_player/controllers/controls');

var VisualizerView = require('./audio_player/views/visualizer');

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

},{"./audio_player/controllers/controls":5,"./audio_player/controllers/drop_area":6,"./audio_player/controllers/equalizer":7,"./audio_player/controllers/songs_list":8,"./audio_player/states/player":11,"./audio_player/views/controls":13,"./audio_player/views/drop_area":14,"./audio_player/views/equalizer":15,"./audio_player/views/player":16,"./audio_player/views/song_details":17,"./audio_player/views/songs_list":18,"./audio_player/views/visualizer":19,"./dom":21}],2:[function(require,module,exports){
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

},{"./consts":20}],3:[function(require,module,exports){
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

			this.filterAudioFiles(files).forEach(function (file) {
				Promise.all([this.getSongInfo(file, ["title", "artist", "picture"]), this.decodeSong(file)]).then(function (values) {
					$$.assign(values[0], values[1], { fileName: file.name });
					self.model.addSong(values[0]);
				});
			}, this);
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

					audioContext.decodeAudioData(buffer, function (audioBuffer) {
						resolve({
							audioBuffer: audioBuffer,
							sampleRate: audioBuffer.sampleRate,
							duration: audioBuffer.duration
						});
					});
				};

				reader.onerror = function () {
					reject(reader.error);
				};
			});
		}
	}]);

	return PlayerController;
})(BaseController);

module.exports = PlayerController;

},{"../../audio":2,"../../utils":23,"./base":4}],7:[function(require,module,exports){
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

},{"../../consts":20,"./base":4}],8:[function(require,module,exports){
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

},{"./base":4}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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

},{"../../events":22,"../../utils":23,"./song":9}],11:[function(require,module,exports){
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

},{"../../events":22,"../../utils":23,"../models/songs":10}],12:[function(require,module,exports){
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

},{"../../dom":21,"../../events":22,"../../utils":23}],13:[function(require,module,exports){
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

},{"../../dom":21,"./base":12}],14:[function(require,module,exports){
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

},{"../../dom":21,"../../utils":23,"./base":12}],15:[function(require,module,exports){
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

},{"../../consts":20,"../../dom":21,"../../utils":23,"./base":12}],16:[function(require,module,exports){
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
			this.play(song.audioBuffer);
		}
	}, {
		key: 'stopSong',
		value: function stopSong() {
			this.stop();
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
	}, {
		key: 'play',
		value: function play(audioBuffer) {
			this.audioSource = audioContext.createBufferSource();
			this.audioSource.buffer = audioBuffer;
			this.audioSource.connect(this.gain);

			this.gain.connect(this.filters[0]);
			this.filters[this.filters.length - 1].connect(this.analyser);
			this.analyser.connect(audioContext.destination);
			this.audioSource.start(0);
		}
	}, {
		key: 'stop',
		value: function stop() {
			this.audioSource.stop(0);
		}
	}]);

	return PlayerView;
})(BaseView);

module.exports = PlayerView;

},{"../../audio":2,"../../audio_analyser":3,"../../dom":21,"./base":12}],17:[function(require,module,exports){
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

},{"../../dom":21,"./base":12}],18:[function(require,module,exports){
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

},{"../../dom":21,"../../events":22,"../../utils":23,"./base":12}],19:[function(require,module,exports){
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
			this.canvasCtx.closePath();
			this.canvasCtx.stroke();
		}
	}]);

	return VisualizerView;
})(BaseView);

module.exports = VisualizerView;

},{"../../audio":2,"../../audio_analyser":3,"../../dom":21,"./base":12}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
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

},{"./utils":23}],22:[function(require,module,exports){
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

},{}],23:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL0phdmFzY3JpcHQvdGFza18zL3NyYy9qcy9hcHAuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL0phdmFzY3JpcHQvdGFza18zL3NyYy9qcy9hdWRpby5qcyIsIi9ob21lL2FuZHJleS9Eb2N1bWVudHMvUHJvamVjdHMvSmF2YXNjcmlwdC90YXNrXzMvc3JjL2pzL2F1ZGlvX2FuYWx5c2VyLmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy9KYXZhc2NyaXB0L3Rhc2tfMy9zcmMvanMvYXVkaW9fcGxheWVyL2NvbnRyb2xsZXJzL2Jhc2UuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL0phdmFzY3JpcHQvdGFza18zL3NyYy9qcy9hdWRpb19wbGF5ZXIvY29udHJvbGxlcnMvY29udHJvbHMuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL0phdmFzY3JpcHQvdGFza18zL3NyYy9qcy9hdWRpb19wbGF5ZXIvY29udHJvbGxlcnMvZHJvcF9hcmVhLmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy9KYXZhc2NyaXB0L3Rhc2tfMy9zcmMvanMvYXVkaW9fcGxheWVyL2NvbnRyb2xsZXJzL2VxdWFsaXplci5qcyIsIi9ob21lL2FuZHJleS9Eb2N1bWVudHMvUHJvamVjdHMvSmF2YXNjcmlwdC90YXNrXzMvc3JjL2pzL2F1ZGlvX3BsYXllci9jb250cm9sbGVycy9zb25nc19saXN0LmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy9KYXZhc2NyaXB0L3Rhc2tfMy9zcmMvanMvYXVkaW9fcGxheWVyL21vZGVscy9zb25nLmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy9KYXZhc2NyaXB0L3Rhc2tfMy9zcmMvanMvYXVkaW9fcGxheWVyL21vZGVscy9zb25ncy5qcyIsIi9ob21lL2FuZHJleS9Eb2N1bWVudHMvUHJvamVjdHMvSmF2YXNjcmlwdC90YXNrXzMvc3JjL2pzL2F1ZGlvX3BsYXllci9zdGF0ZXMvcGxheWVyLmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy9KYXZhc2NyaXB0L3Rhc2tfMy9zcmMvanMvYXVkaW9fcGxheWVyL3ZpZXdzL2Jhc2UuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL0phdmFzY3JpcHQvdGFza18zL3NyYy9qcy9hdWRpb19wbGF5ZXIvdmlld3MvY29udHJvbHMuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL0phdmFzY3JpcHQvdGFza18zL3NyYy9qcy9hdWRpb19wbGF5ZXIvdmlld3MvZHJvcF9hcmVhLmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy9KYXZhc2NyaXB0L3Rhc2tfMy9zcmMvanMvYXVkaW9fcGxheWVyL3ZpZXdzL2VxdWFsaXplci5qcyIsIi9ob21lL2FuZHJleS9Eb2N1bWVudHMvUHJvamVjdHMvSmF2YXNjcmlwdC90YXNrXzMvc3JjL2pzL2F1ZGlvX3BsYXllci92aWV3cy9wbGF5ZXIuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL0phdmFzY3JpcHQvdGFza18zL3NyYy9qcy9hdWRpb19wbGF5ZXIvdmlld3Mvc29uZ19kZXRhaWxzLmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy9KYXZhc2NyaXB0L3Rhc2tfMy9zcmMvanMvYXVkaW9fcGxheWVyL3ZpZXdzL3NvbmdzX2xpc3QuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL0phdmFzY3JpcHQvdGFza18zL3NyYy9qcy9hdWRpb19wbGF5ZXIvdmlld3MvdmlzdWFsaXplci5qcyIsIi9ob21lL2FuZHJleS9Eb2N1bWVudHMvUHJvamVjdHMvSmF2YXNjcmlwdC90YXNrXzMvc3JjL2pzL2NvbnN0cy5qcyIsIi9ob21lL2FuZHJleS9Eb2N1bWVudHMvUHJvamVjdHMvSmF2YXNjcmlwdC90YXNrXzMvc3JjL2pzL2RvbS5qcyIsIi9ob21lL2FuZHJleS9Eb2N1bWVudHMvUHJvamVjdHMvSmF2YXNjcmlwdC90YXNrXzMvc3JjL2pzL2V2ZW50cy5qcyIsIi9ob21lL2FuZHJleS9Eb2N1bWVudHMvUHJvamVjdHMvSmF2YXNjcmlwdC90YXNrXzMvc3JjL2pzL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsWUFBWSxDQUFDOztBQUViLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0FBQ3hELElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDOztBQUUxRCxJQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztBQUM3RCxJQUFJLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDOztBQUV6RSxJQUFJLGFBQWEsR0FBRyxPQUFPLENBQUMsaUNBQWlDLENBQUMsQ0FBQztBQUMvRCxJQUFJLG1CQUFtQixHQUFHLE9BQU8sQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDOztBQUUzRSxJQUFJLGVBQWUsR0FBRyxPQUFPLENBQUMsbUNBQW1DLENBQUMsQ0FBQzs7QUFFbkUsSUFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLCtCQUErQixDQUFDLENBQUM7QUFDNUQsSUFBSSxrQkFBa0IsR0FBRyxPQUFPLENBQUMscUNBQXFDLENBQUMsQ0FBQzs7QUFFeEUsSUFBSSxjQUFjLEdBQUcsT0FBTyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7O0FBRWhFLElBQUksYUFBYSxHQUFHLE9BQU8sQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO0FBQzlELElBQUksbUJBQW1CLEdBQUcsT0FBTyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7O0FBRTFFLElBQUksR0FBRyxHQUFHLE9BQU8s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RUFBRSwyQkFBUyxHQUFHLEVBQUU7QUFDaEMsTUFBSSxPQUFPLEdBQUcsQ0FBQyxPQUFPLEtBQUssVUFBVSxFQUFFO0FBQ3RDLFNBQU0sMENBQTBDLENBQUM7R0FDakQ7QUFDRCxRQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFTLEdBQUcsRUFBRTtBQUN0QyxNQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFFMUIsU0FBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFO0FBQy9CLE9BQUcsRUFBRSxlQUFXO0FBQ2YsWUFBTyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0tBQ3RCO0FBQ0QsT0FBRyxFQUFFLGFBQVMsS0FBSyxFQUFFO0FBQ3BCLFNBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxLQUFLLEVBQUUsT0FBTzs7QUFFcEMsUUFBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7QUFDdkIsUUFBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQ3JDO0lBQ0QsQ0FBQyxDQUFDO0dBQ0gsRUFBRSxHQUFHLENBQUMsQ0FBQztFQUNSO0NBQ0QsQ0FBQzs7QUFFRixNQUFNLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciBQbGF5ZXJWaWV3ID0gcmVxdWlyZSgnLi9hdWRpb19wbGF5ZXIvdmlld3MvcGxheWVyJyk7XHJcbnZhciBQbGF5ZXJTdGF0ZSA9IHJlcXVpcmUoJy4vYXVkaW9fcGxheWVyL3N0YXRlcy9wbGF5ZXInKTtcclxuXHJcbnZhciBEcm9wQXJlYVZpZXcgPSByZXF1aXJlKCcuL2F1ZGlvX3BsYXllci92aWV3cy9kcm9wX2FyZWEnKTtcclxudmFyIERyb3BBcmVhQ29udHJvbGxlciA9IHJlcXVpcmUoJy4vYXVkaW9fcGxheWVyL2NvbnRyb2xsZXJzL2Ryb3BfYXJlYScpO1xyXG5cclxudmFyIFNvbmdzTGlzdFZpZXcgPSByZXF1aXJlKCcuL2F1ZGlvX3BsYXllci92aWV3cy9zb25nc19saXN0Jyk7XHJcbnZhciBTb25nc0xpc3RDb250cm9sbGVyID0gcmVxdWlyZSgnLi9hdWRpb19wbGF5ZXIvY29udHJvbGxlcnMvc29uZ3NfbGlzdCcpO1xyXG5cclxudmFyIFNvbmdEZXRhaWxzVmlldyA9IHJlcXVpcmUoJy4vYXVkaW9fcGxheWVyL3ZpZXdzL3NvbmdfZGV0YWlscycpO1xyXG5cclxudmFyIENvbnRyb2xzVmlldyA9IHJlcXVpcmUoJy4vYXVkaW9fcGxheWVyL3ZpZXdzL2NvbnRyb2xzJyk7XHJcbnZhciBDb250cm9sc0NvbnRyb2xsZXIgPSByZXF1aXJlKCcuL2F1ZGlvX3BsYXllci9jb250cm9sbGVycy9jb250cm9scycpO1xyXG5cclxudmFyIFZpc3VhbGl6ZXJWaWV3ID0gcmVxdWlyZSgnLi9hdWRpb19wbGF5ZXIvdmlld3MvdmlzdWFsaXplcicpO1xyXG5cclxudmFyIEVxdWFsaXplclZpZXcgPSByZXF1aXJlKCcuL2F1ZGlvX3BsYXllci92aWV3cy9lcXVhbGl6ZXInKTtcclxudmFyIEVxdWFsaXplckNvbnRyb2xsZXIgPSByZXF1aXJlKCcuL2F1ZGlvX3BsYXllci9jb250cm9sbGVycy9lcXVhbGl6ZXInKTtcclxuXHJcbnZhciBkb20gPSByZXF1aXJlKCcuL2RvbScpO1xyXG5cclxuXHJcbi8vIFBsYXllciBTdGF0ZVxyXG52YXIgcGxheWVyU3RhdGUgPSBuZXcgUGxheWVyU3RhdGUoKTtcclxuXHJcbi8vIE1haW5cclxudmFyIHBsYXllclZpZXcgPSBuZXcgUGxheWVyVmlldyh7XHJcblx0ZWw6IGRvbS5ieUlkKCdhdWRpb1BsYXllcicpLFxyXG5cdG1vZGVsOiBwbGF5ZXJTdGF0ZVxyXG59KTtcclxuXHJcbi8vIERyb3AgYXJlYVxyXG52YXIgZHJvcEFyZWFWaWV3ID0gbmV3IERyb3BBcmVhVmlldyh7XHJcblx0ZWw6IGRvbS5xcygnLmpzLWRyb3AtYXJlYScsIHBsYXllclZpZXcuZWwpLFxyXG5cdG1vZGVsOiBwbGF5ZXJTdGF0ZVxyXG59KTtcclxuXHJcbnZhciBkcm9wQXJlYUNvbnRyb2xsZXIgPSBuZXcgRHJvcEFyZWFDb250cm9sbGVyKHtcclxuXHR2aWV3OiBkcm9wQXJlYVZpZXcsXHJcblx0bW9kZWw6IHBsYXllclN0YXRlXHJcbn0pO1xyXG5cclxuLy8gU29uZ3MgTGlzdFxyXG52YXIgc29uZ3NMaXN0VmlldyA9IG5ldyBTb25nc0xpc3RWaWV3KHtcclxuXHRlbDogZG9tLnFzKCcuanMtc29uZ3MtbGlzdCcsIHBsYXllclZpZXcuZWwpLFxyXG5cdHRlbXBsYXRlOiBkb20uYnlJZCgnc29uZ0xpc3RJdGVtJyksXHJcblx0bW9kZWw6IHBsYXllclN0YXRlXHJcbn0pO1xyXG5cclxudmFyIHNvbmdzTGlzdENvbnRyb2xsZXIgPSBuZXcgU29uZ3NMaXN0Q29udHJvbGxlcih7XHJcblx0bW9kZWw6IHBsYXllclN0YXRlLFxyXG5cdHZpZXc6IHNvbmdzTGlzdFZpZXdcclxufSk7XHJcblxyXG4vLyBEZXRhaWxzXHJcbnZhciBzb25nRGV0YWlsc1ZpZXcgPSBuZXcgU29uZ0RldGFpbHNWaWV3KHtcclxuXHRlbDogZG9tLnFzKCcuanMtc29uZy1kZXRhaWxzJywgcGxheWVyVmlldy5lbCksXHJcblx0bW9kZWw6IHBsYXllclN0YXRlXHJcbn0pO1xyXG5cclxuXHJcbi8vIENvbnRyb2xzXHJcbnZhciBjb250cm9sc1ZpZXcgPSBuZXcgQ29udHJvbHNWaWV3KHtcclxuXHRlbDogZG9tLnFzKCcuanMtY29udHJvbHMnLCBwbGF5ZXJWaWV3LmVsKSxcclxuXHRtb2RlbDogcGxheWVyU3RhdGVcclxufSk7XHJcblxyXG52YXIgY29udHJvbHNDb250cm9sbGVyID0gbmV3IENvbnRyb2xzQ29udHJvbGxlcih7XHJcblx0bW9kZWw6IHBsYXllclN0YXRlLFxyXG5cdHZpZXc6IGNvbnRyb2xzVmlld1xyXG59KTtcclxuXHJcbi8vIEVxdWFsaXplclxyXG5cclxudmFyIGVxdWFsaXplclZpZXcgPSBuZXcgRXF1YWxpemVyVmlldyh7XHJcblx0ZWw6IGRvbS5xcygnLmpzLWVxdWFsaXplcicsIHBsYXllclZpZXcuZWwpLFxyXG5cdG1vZGVsOiBwbGF5ZXJTdGF0ZVxyXG59KTtcclxuXHJcbnZhciBlcXVhbGl6ZXJDb250cm9sbGVyID0gbmV3IEVxdWFsaXplckNvbnRyb2xsZXIoe1xyXG5cdHZpZXc6IGVxdWFsaXplclZpZXcsXHJcblx0bW9kZWw6IHBsYXllclN0YXRlXHJcbn0pO1xyXG5cclxuLy8gVmlzdWFsaXplclxyXG5cclxudmFyIHZpc3VhbGl6ZXJWaWV3ID0gbmV3IFZpc3VhbGl6ZXJWaWV3KHtcclxuXHRlbDogZG9tLnFzKCcuanMtdmlzdWFsaXplcicsIHBsYXllclZpZXcuZWwpLFxyXG5cdG1vZGVsOiBwbGF5ZXJTdGF0ZVxyXG59KTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIgYXVkaW9FbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2F1ZGlvJyk7XHJcbnZhciBjb25zdHMgPSByZXF1aXJlKCcuL2NvbnN0cycpO1xyXG52YXIgQXVkaW9Db250ZXh0ID0gd2luZG93LkF1ZGlvQ29udGV4dCB8fCB3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0O1xyXG52YXIgYXVkaW9Db250ZXh0ID0gbnVsbDtcclxudmFyIFNVUFBPUlRFRF9GT1JNQVRTID0gY29uc3RzLkFVRElPX0ZPUk1BVFMuZmlsdGVyKGZvcm1hdCA9PiB7XHJcblx0cmV0dXJuIGF1ZGlvRWwuY2FuUGxheVR5cGUoZm9ybWF0LnR5cGUpICE9PSAnJztcclxufSk7XHJcblxyXG5pZiAoQXVkaW9Db250ZXh0KSB7XHJcblx0YXVkaW9Db250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dDtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0U1VQUE9SVEVEX0ZPUk1BVFM6IFNVUFBPUlRFRF9GT1JNQVRTLFxyXG5cdGdldEF1ZGlvQ29udGV4dDogZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gYXVkaW9Db250ZXh0O1xyXG5cdH1cclxufTtcclxuIiwidmFyIGF1ZGlvQ29udGV4dCA9IHJlcXVpcmUoJy4vYXVkaW8nKS5nZXRBdWRpb0NvbnRleHQoKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYXVkaW9Db250ZXh0LmNyZWF0ZUFuYWx5c2VyKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNsYXNzIEJhc2VDb250cm9sbGVyIHtcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xuXHRcdHRoaXMubW9kZWwgPSBvcHRpb25zLm1vZGVsO1xuXHRcdHRoaXMudmlldyA9IG9wdGlvbnMudmlldztcblx0XHR0aGlzLmJpbmRMaXN0ZW5lcnMoKTtcblx0fVxuXG5cdGJpbmRMaXN0ZW5lcnMoKSB7fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJhc2VDb250cm9sbGVyOyIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyIEJhc2VDb250cm9sbGVyID0gcmVxdWlyZSgnLi9iYXNlJyk7XHJcblxyXG5jbGFzcyBDb250cm9sc0NvbnRyb2xsZXIgZXh0ZW5kcyBCYXNlQ29udHJvbGxlciB7XHJcblx0YmluZExpc3RlbmVycygpIHtcclxuXHRcdHRoaXMudmlldy5vbignY29udHJvbDpwcmVzc2VkJywgdGhpcy5vbkNvbnRyb2xQcmVzc2VkLCB0aGlzKTtcclxuXHR9XHJcblxyXG5cdG9uQ29udHJvbFByZXNzZWQoY29udHJvbFR5cGUpIHtcclxuXHRcdHN3aXRjaChjb250cm9sVHlwZSkge1xyXG5cdFx0XHRjYXNlICdwbGF5JzpcclxuXHRcdFx0XHR0aGlzLm1vZGVsLnBsYXlpbmdTb25nID0gdGhpcy5tb2RlbC5zZWxlY3RlZFNvbmc7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ3N0b3AnOlxyXG5cdFx0XHRcdHRoaXMubW9kZWwucGxheWluZ1NvbmcgPSBudWxsO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdlcSc6XHJcblx0XHRcdFx0dGhpcy5tb2RlbC5pc1Zpc3VhbGl6aW5nID0gIXRoaXMubW9kZWwuaXNWaXN1YWxpemluZztcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ29udHJvbHNDb250cm9sbGVyOyIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyICQkID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMnKTtcclxudmFyIGF1ZGlvID0gcmVxdWlyZSgnLi4vLi4vYXVkaW8nKTtcclxudmFyIGF1ZGlvQ29udGV4dCA9IGF1ZGlvLmdldEF1ZGlvQ29udGV4dCgpO1xyXG52YXIgQmFzZUNvbnRyb2xsZXIgPSByZXF1aXJlKCcuL2Jhc2UnKTtcclxuXHJcbmNsYXNzIFBsYXllckNvbnRyb2xsZXIgZXh0ZW5kcyBCYXNlQ29udHJvbGxlciB7XHJcblxyXG5cdGJpbmRMaXN0ZW5lcnMoKSB7XHJcblx0XHR0aGlzLnZpZXcub24oJ2ZpbGVzOmFkZCcsIHRoaXMub25GaWxlc0FkZCwgdGhpcyk7XHJcblx0fVxyXG5cclxuXHRvbkZpbGVzQWRkKGZpbGVzKSB7XHJcblx0XHR2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG5cdFx0dGhpcy5maWx0ZXJBdWRpb0ZpbGVzKGZpbGVzKS5mb3JFYWNoKGZ1bmN0aW9uKGZpbGUpIHtcclxuXHRcdFx0UHJvbWlzZS5hbGwoW3RoaXMuZ2V0U29uZ0luZm8oZmlsZSwgW1widGl0bGVcIiwgXCJhcnRpc3RcIiwgXCJwaWN0dXJlXCJdKSwgdGhpcy5kZWNvZGVTb25nKGZpbGUpXSlcclxuXHRcdFx0XHQudGhlbihmdW5jdGlvbih2YWx1ZXMpIHtcclxuXHRcdFx0XHRcdCQkLmFzc2lnbih2YWx1ZXNbMF0sIHZhbHVlc1sxXSwge2ZpbGVOYW1lOiBmaWxlLm5hbWV9KTtcclxuXHRcdFx0XHRcdHNlbGYubW9kZWwuYWRkU29uZyh2YWx1ZXNbMF0pO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0fSwgdGhpcyk7XHJcblx0fVxyXG5cclxuXHRmaWx0ZXJBdWRpb0ZpbGVzKGZpbGVzKSB7XHJcblx0XHRyZXR1cm4gZmlsZXMuZmlsdGVyKHRoaXMuaXNBdWRpb0ZpbGUsIHRoaXMpO1xyXG5cdH1cclxuXHJcblx0aXNBdWRpb0ZpbGUoZmlsZSkge1xyXG5cdFx0dmFyIHN1cHBvcnQgPSBmYWxzZTtcclxuXHJcblx0XHRhdWRpby5TVVBQT1JURURfRk9STUFUUy5mb3JFYWNoKGZvcm1hdCA9PiB7XHJcblx0XHRcdGlmKGZpbGUubmFtZS5zZWFyY2goZm9ybWF0LmV4dCkgIT09IC0xKSB7XHJcblx0XHRcdFx0c3VwcG9ydCA9IHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiBzdXBwb3J0O1xyXG5cdH1cclxuXHJcblx0Z2V0U29uZ0luZm8oZmlsZSwgdGFncykge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cdFx0XHR2YXIgdXJsID0gZmlsZS51cm4gfHwgZmlsZS5uYW1lO1xyXG5cclxuXHRcdFx0SUQzLmxvYWRUYWdzKHVybCwgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHR2YXIgYWxsVGFncyA9IElEMy5nZXRBbGxUYWdzKHVybCk7XHJcblx0XHRcdFx0XHR2YXIgcGljdHVyZTtcclxuXHRcdFx0XHRcdHZhciByZXN1bHQgPSB7fTtcclxuXHRcdFx0XHRcdHZhciBkYXRhVXJsO1xyXG5cdFx0XHRcdFx0dmFyIGJhc2U2NFN0cmluZztcclxuXHJcblx0XHRcdFx0XHR0YWdzLmZvckVhY2goZnVuY3Rpb24odGFnKSB7XHJcblx0XHRcdFx0XHRcdGlmICh0YWcgPT09ICdwaWN0dXJlJyAmJiBhbGxUYWdzLnBpY3R1cmUpIHtcclxuXHRcdFx0XHRcdFx0XHRwaWN0dXJlID0gYWxsVGFncy5waWN0dXJlO1xyXG5cdFx0XHRcdFx0XHRcdGJhc2U2NFN0cmluZyA9IFwiXCI7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBwaWN0dXJlLmRhdGEubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdFx0XHRcdGJhc2U2NFN0cmluZyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHBpY3R1cmUuZGF0YVtpXSk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdGRhdGFVcmwgPSBcImRhdGE6XCIgKyBwaWN0dXJlLmZvcm1hdCArIFwiO2Jhc2U2NCxcIiArIHdpbmRvdy5idG9hKGJhc2U2NFN0cmluZyk7XHJcblx0XHRcdFx0XHRcdFx0cmVzdWx0LnBpY3R1cmUgPSBkYXRhVXJsO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdHJlc3VsdFt0YWddID0gYWxsVGFnc1t0YWddO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3VsdCk7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHR0YWdzOiB0YWdzLFxyXG5cdFx0XHRcdFx0ZGF0YVJlYWRlcjogRmlsZUFQSVJlYWRlcihmaWxlKSxcclxuXHRcdFx0XHRcdG9uRXJyb3I6IGZ1bmN0aW9uKHJlYXNvbikge1xyXG5cdFx0XHRcdFx0XHRyZWplY3QocmVhc29uKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0ZGVjb2RlU29uZyhmaWxlKSB7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblx0XHRcdHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG5cclxuXHRcdFx0cmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGZpbGUpO1xyXG5cdFx0XHRyZWFkZXIub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0dmFyIGJ1ZmZlciA9IHRoaXMucmVzdWx0O1xyXG5cclxuXHRcdFx0XHRhdWRpb0NvbnRleHQuZGVjb2RlQXVkaW9EYXRhKGJ1ZmZlciwgYXVkaW9CdWZmZXIgPT4ge1xyXG5cdFx0XHRcdFx0cmVzb2x2ZSh7XHJcblx0XHRcdFx0XHRcdGF1ZGlvQnVmZmVyOiBhdWRpb0J1ZmZlcixcclxuXHRcdFx0XHRcdFx0c2FtcGxlUmF0ZTogYXVkaW9CdWZmZXIuc2FtcGxlUmF0ZSxcclxuXHRcdFx0XHRcdFx0ZHVyYXRpb246IGF1ZGlvQnVmZmVyLmR1cmF0aW9uXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHJlYWRlci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmVqZWN0KHJlYWRlci5lcnJvcik7XHJcblx0XHRcdH07XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUGxheWVyQ29udHJvbGxlcjtcclxuXHJcblxyXG5cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIgQmFzZUNvbnRyb2xsZXIgPSByZXF1aXJlKCcuL2Jhc2UnKTtcclxudmFyIGNvbnN0cyA9IHJlcXVpcmUoJy4uLy4uL2NvbnN0cycpO1xyXG52YXIgRVFVQUxJWkVSX1BSRVNFVFMgPSBjb25zdHMuRVFVQUxJWkVSX1BSRVNFVFM7XHJcbnZhciBFUVVBTElaRVJfUkFOR0UgPSBjb25zdHMuRVFVQUxJWkVSX1JBTkdFO1xyXG52YXIgU0xJREVSX0hJR0hFU1QgPSAgY29uc3RzLlNMSURFUl9ISUdIRVNUO1xyXG5cclxuY2xhc3MgRXF1YWxpemVDb250cm9sbGVyIGV4dGVuZHMgQmFzZUNvbnRyb2xsZXIge1xyXG5cdGJpbmRMaXN0ZW5lcnMoKSB7XHJcblx0XHR0aGlzLnZpZXcub24oJ3NsaWRlcjpjaGFuZ2VkJywgdGhpcy5vblNsaWRlckNoYW5nZWQsIHRoaXMpO1xyXG5cdFx0dGhpcy52aWV3Lm9uKCdwcmVzZXQ6c2VsZWN0ZWQnLCB0aGlzLm9uUHJlc2V0U2VsZWN0ZWQsIHRoaXMpO1xyXG5cdH1cclxuXHJcblx0b25QcmVzZXRTZWxlY3RlZChwcmVzZXRUeXBlKSB7XHJcblx0XHR2YXIgcHJlc2V0ID0gRVFVQUxJWkVSX1BSRVNFVFNbcHJlc2V0VHlwZV07XHJcblxyXG5cdFx0T2JqZWN0LmtleXMocHJlc2V0KS5mb3JFYWNoKGZ1bmN0aW9uKGZyZXEpe1xyXG5cdFx0XHR0aGlzLm1vZGVsLmVxdWFsaXplcltmcmVxXSA9IHByZXNldFtmcmVxXTtcclxuXHRcdH0sIHRoaXMpO1xyXG5cdH1cclxuXHJcblx0b25TbGlkZXJDaGFuZ2VkKGUpIHtcclxuXHRcdHZhciByZXN1bHQ7XHJcblxyXG5cdFx0aWYoZS50eXBlID09PSAnZ2FpbicpIHtcclxuXHRcdFx0cmVzdWx0ID0gZS52YWx1ZSAvIFNMSURFUl9ISUdIRVNUO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHJlc3VsdCA9IGUudmFsdWUgKiBFUVVBTElaRVJfUkFOR0UgKiAyIC8gU0xJREVSX0hJR0hFU1QgLSBFUVVBTElaRVJfUkFOR0U7XHJcblx0XHR9XHJcblx0XHR0aGlzLm1vZGVsLmVxdWFsaXplcltlLnR5cGVdID0gcmVzdWx0O1xyXG5cdH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBFcXVhbGl6ZUNvbnRyb2xsZXI7IiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIgQmFzZUNvbnRyb2xsZXIgPSByZXF1aXJlKCcuL2Jhc2UnKTtcclxuXHJcbmNsYXNzIFNvbmdzTGlzdENvbnRyb2xsZXIgZXh0ZW5kcyBCYXNlQ29udHJvbGxlciB7XHJcblx0YmluZExpc3RlbmVycygpIHtcclxuXHRcdHRoaXMudmlldy5vbignc29uZzpzZWxlY3RlZCcsIHRoaXMub25Tb25nU2VsZWN0ZWQsIHRoaXMpO1xyXG5cdH1cclxuXHJcblx0b25Tb25nU2VsZWN0ZWQoc29uZ0lkKSB7XHJcblx0XHR0aGlzLm1vZGVsLnNlbGVjdGVkU29uZyA9IHRoaXMubW9kZWwuZ2V0U29uZyhOdW1iZXIoc29uZ0lkKSk7XHJcblx0fVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNvbmdzTGlzdENvbnRyb2xsZXI7IiwidmFyIGlkID0gMTtcclxuXHJcbmNsYXNzIFNvbmcge1xyXG5cdGNvbnN0cnVjdG9yKGRhdGEpIHtcclxuXHRcdHRoaXMuaWQgPSBpZDtcclxuXHRcdHRoaXMuYXVkaW9CdWZmZXIgPSBkYXRhLmF1ZGlvQnVmZmVyO1xyXG5cdFx0dGhpcy5maWxlTmFtZSA9IGRhdGEuZmlsZU5hbWU7XHJcblx0XHR0aGlzLnRpdGxlID0gZGF0YS50aXRsZSB8fCAnJztcclxuXHRcdHRoaXMuYXJ0aXN0ID0gZGF0YS5hcnRpc3QgfHwgJyc7XHJcblx0XHR0aGlzLmR1cmF0aW9uID0gTWF0aC5yb3VuZChkYXRhLmR1cmF0aW9uKTtcclxuXHRcdHRoaXMucGljdHVyZSA9IGRhdGEucGljdHVyZSB8fCBudWxsO1xyXG5cdFx0aWQrKztcclxuXHR9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU29uZzsiLCJ2YXIgRXZlbnRzID0gcmVxdWlyZSgnLi4vLi4vZXZlbnRzJyk7XHJcbnZhciAkJCA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzJyk7XHJcbnZhciBTb25nID0gcmVxdWlyZSgnLi9zb25nJyk7XHJcblxyXG5jbGFzcyBTb25ncyB7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHR0aGlzLnNvbmdzID0gW107XHJcblx0XHR0aGlzLmxlbmd0aCA9IDA7XHJcblx0fVxyXG5cclxuXHRnZXRTb25nKGlkKSB7XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5zb25ncy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZihpZCA9PT0gdGhpcy5zb25nc1tpXS5pZCkge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLnNvbmdzW2ldO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhZGRTb25nKGRhdGEpIHtcclxuXHRcdHZhciBzb25nID0gbmV3IFNvbmcoZGF0YSk7XHJcblx0XHR0aGlzLnNvbmdzLnB1c2goc29uZyk7XHJcblx0XHR0aGlzLmxlbmd0aCsrO1xyXG5cdFx0dGhpcy50cmlnZ2VyKCdzb25nOmFkZCcsIHNvbmcpO1xyXG5cdH1cclxuXHJcblx0cmVtb3ZlU29uZyhpZCkge1xyXG5cdFx0dmFyIHNvbmcgPSB0aGlzLmdldFNvbmcoaWQpO1xyXG5cdFx0aWYoc29uZyAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHRoaXMuc29uZ3Muc3BsaWNlKHNvbmcsIDEpO1xyXG5cdFx0XHR0aGlzLmxlbmd0aC0tO1xyXG5cdFx0XHR0aGlzLnRyaWdnZXIoJ3Nvbmc6cmVtb3ZlZCcsIHNvbmcpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuJCQuYXNzaWduKFNvbmdzLnByb3RvdHlwZSwgRXZlbnRzKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU29uZ3M7IiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIgRXZlbnRzID0gcmVxdWlyZSgnLi4vLi4vZXZlbnRzJyk7XHJcbnZhciAkJCA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzJyk7XHJcbnZhciBTb25ncyA9IHJlcXVpcmUoJy4uL21vZGVscy9zb25ncycpO1xyXG5cclxuY2xhc3MgUGxheWVyU3RhdGUge1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0dGhpcy5zb25ncyA9IG5ldyBTb25ncygpO1xyXG5cdFx0dGhpcy5zZWxlY3RlZFNvbmcgPSBudWxsO1xyXG5cdFx0dGhpcy5wbGF5aW5nU29uZyA9IG51bGw7XHJcblx0XHR0aGlzLmlzVmlzdWFsaXppbmcgPSB0cnVlO1xyXG5cdFx0dGhpcy5oYXZlU29uZ3MgPSBmYWxzZTtcclxuXHRcdHRoaXMuZXF1YWxpemVyID0ge1xyXG5cdFx0XHQnZ2Fpbic6ICAwLFxyXG5cdFx0XHQnNjAnOiAgMCxcclxuXHRcdFx0JzE3MCc6ICAwLFxyXG5cdFx0XHQnMzEwJzogIDAsXHJcblx0XHRcdCc2MDAnOiAgMCxcclxuXHRcdFx0JzEwMDAnOiAgMCxcclxuXHRcdFx0JzMwMDAnOiAgMCxcclxuXHRcdFx0JzYwMDAnOiAgMCxcclxuXHRcdFx0JzEyMDAwJzogIDAsXHJcblx0XHRcdCcxNDAwMCc6ICAwLFxyXG5cdFx0XHQnMTYwMDAnOiAgMFxyXG5cdFx0fTtcclxuXHRcdCQkLm9ic2VydmVQcm9wZXJ0aWVzKHRoaXMpO1xyXG5cdFx0JCQuYXNzaWduKHRoaXMuZXF1YWxpemVyLCBFdmVudHMpO1xyXG5cdFx0JCQub2JzZXJ2ZVByb3BlcnRpZXModGhpcy5lcXVhbGl6ZXIpO1xyXG5cdFx0dGhpcy5iaW5kTGlzdGVuZXJzKCk7XHJcblx0fVxyXG5cclxuXHRiaW5kTGlzdGVuZXJzKCkge1xyXG5cdFx0dGhpcy5lcXVhbGl6ZXIub24oJ2FsbCcsIGZ1bmN0aW9uKGV2ZW50VHlwZSwgdmFsdWUpe1xyXG5cdFx0XHR2YXIgdHlwZSA9IGV2ZW50VHlwZS5zcGxpdChcIjpcIilbMF07XHJcblxyXG5cdFx0XHR0aGlzLnRyaWdnZXIoJ2VxdWFsaXplcjpjaGFuZ2VkJywge1xyXG5cdFx0XHRcdHR5cGU6IHR5cGUsXHJcblx0XHRcdFx0dmFsdWU6IHZhbHVlXHJcblx0XHRcdH0pO1xyXG5cdFx0fSwgdGhpcyk7XHJcblxyXG5cdFx0dGhpcy5zb25ncy5vbignc29uZzphZGQnLCBmdW5jdGlvbihzb25nKSB7XHJcblx0XHRcdHRoaXMudHJpZ2dlcignc29uZzphZGQnLCBzb25nKTtcclxuXHRcdFx0aWYgKHRoaXMuc29uZ3MubGVuZ3RoID09PSAxKSB7XHJcblx0XHRcdFx0dGhpcy5oYXZlU29uZ3MgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9LCB0aGlzKTtcclxuXHJcblx0XHR0aGlzLnNvbmdzLm9uKCdzb25nOnJlbW92ZWQnLCBmdW5jdGlvbihzb25nKSB7XHJcblx0XHRcdHRoaXMudHJpZ2dlcignc29uZzpyZW1vdmVkJywgc29uZyk7XHJcblx0XHRcdGlmICh0aGlzLnNvbmdzLmxlbmd0aCA9PT0gMCkge1xyXG5cdFx0XHRcdHRoaXMuaGF2ZVNvbmdzID0gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH0sIHRoaXMpO1xyXG5cdH1cclxuXHJcblx0Z2V0U29uZyhpZCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuc29uZ3MuZ2V0U29uZyhpZCk7XHJcblx0fVxyXG5cclxuXHRhZGRTb25nKGRhdGEpIHtcclxuXHRcdHJldHVybiB0aGlzLnNvbmdzLmFkZFNvbmcoZGF0YSk7XHJcblx0fVxyXG5cclxuXHRyZW1vdmVTb25nKGlkKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5zb25ncy5yZW1vdmVTb25nKGlkKTtcclxuXHR9XHJcbn1cclxuXHJcbiQkLmFzc2lnbihQbGF5ZXJTdGF0ZS5wcm90b3R5cGUsIEV2ZW50cyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXllclN0YXRlO1xyXG5cclxuXHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyICQkID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMnKTtcclxudmFyIEV2ZW50cyA9IHJlcXVpcmUoJy4uLy4uL2V2ZW50cycpO1xyXG52YXIgZG9tID0gcmVxdWlyZSgnLi4vLi4vZG9tJyk7XHJcblxyXG5jbGFzcyBCYXNlVmlldyB7XHJcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xyXG5cdFx0dGhpcy5lbCA9IG9wdGlvbnMuZWw7XHJcblx0XHR0aGlzLm1vZGVsID0gb3B0aW9ucy5tb2RlbDtcclxuXHRcdHRoaXMuc3Vidmlld3MgPSBvcHRpb25zLnN1YnZpZXdzO1xyXG5cdFx0aWYob3B0aW9ucy50ZW1wbGF0ZSkge1xyXG5cdFx0XHR0aGlzLnRlbXBsYXRlID0gb3B0aW9ucy50ZW1wbGF0ZS5jb250ZW50LmZpcnN0RWxlbWVudENoaWxkLmNsb25lTm9kZSh0cnVlKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHNob3coKSB7XHJcblx0XHRkb20uc2hvdyh0aGlzLmVsKTtcclxuXHR9XHJcblxyXG5cdGhpZGUoKSB7XHJcblx0XHRkb20uaGlkZSh0aGlzLmVsKTtcclxuXHR9XHJcblxyXG5cdHJlbmRlcigpIHtcclxuXHRcdHRoaXMuZWwuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50KTtcclxuXHR9XHJcblxyXG5cdHJlbW92ZSgpIHtcclxuXHRcdHRoaXMuZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmVsKTtcclxuXHR9XHJcbn1cclxuXHJcbiQkLmFzc2lnbihCYXNlVmlldy5wcm90b3R5cGUsIEV2ZW50cyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEJhc2VWaWV3OyIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyIEJhc2VWaWV3ID0gcmVxdWlyZSgnLi9iYXNlJyk7XHJcbnZhciBkb20gPSByZXF1aXJlKCcuLi8uLi9kb20nKTtcclxuXHJcbmNsYXNzIENvbnRyb2xzVmlldyBleHRlbmRzIEJhc2VWaWV3IHtcclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcblx0XHRzdXBlcihvcHRpb25zKTtcclxuXHRcdHRoaXMuZWxlbXMgPSB7XHJcblx0XHRcdHBsYXk6IGRvbS5xcygnLmpzLXBsYXknKSxcclxuXHRcdFx0c3RvcDogZG9tLnFzKCcuanMtc3RvcCcpLFxyXG5cdFx0XHRlcTogZG9tLnFzKCcuanMtZXEnKVxyXG5cdFx0fTtcclxuXHRcdHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XHJcblx0XHR0aGlzLmJpbmRMaXN0ZW5lcnMoKTtcclxuXHR9XHJcblxyXG5cdGJpbmRMaXN0ZW5lcnMoKSB7XHJcblx0XHR0aGlzLmVsLm9uY2xpY2sgPSB0aGlzLm9uQ29udHJvbENsaWNrLmJpbmQodGhpcyk7XHJcblx0XHR0aGlzLm1vZGVsLm9uKCdzZWxlY3RlZFNvbmc6Y2hhbmdlZCcsIHRoaXMub25TZWxlY3RlZFNvbmdDaGFuZ2VkLCB0aGlzKTtcclxuXHRcdHRoaXMubW9kZWwub24oJ3BsYXlpbmdTb25nOmNoYW5nZWQnLCB0aGlzLm9uUGxheWluZ1NvbmdDaGFuZ2VkLCB0aGlzKTtcclxuXHR9XHJcblxyXG5cdG9uUGxheWluZ1NvbmdDaGFuZ2VkKHNvbmcpIHtcclxuXHRcdGlmKCFzb25nKSB7XHJcblx0XHRcdHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XHJcblx0XHRcdGRvbS5oaWRlKHRoaXMuZWxlbXMuc3RvcCk7XHJcblx0XHRcdGRvbS5zaG93KHRoaXMuZWxlbXMucGxheSk7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhpcy5pc1BsYXlpbmcgPSB0cnVlO1xyXG5cdFx0XHRkb20uc2hvdyh0aGlzLmVsZW1zLnN0b3ApO1xyXG5cdFx0XHRkb20uaGlkZSh0aGlzLmVsZW1zLnBsYXkpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0b25TZWxlY3RlZFNvbmdDaGFuZ2VkKCkge1xyXG5cdFx0aWYoIXRoaXMuaXNQbGF5aW5nKSB7XHJcblx0XHRcdGRvbS5yZW1vdmVDbGFzcyh0aGlzLmVsZW1zLnBsYXksICdpY29uX2Rpc2FibGVkJyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRvbkNvbnRyb2xDbGljayhlKSB7XHJcblx0XHR2YXIgY29udHJvbCA9IGRvbS5jbG9zZXN0KGUudGFyZ2V0LCAnLmpzLWNvbnRyb2wnKTtcclxuXHRcdGlmKCFjb250cm9sIHx8IGRvbS5oYXNDbGFzcyhjb250cm9sLCAnaWNvbl9kaXNhYmxlZCcpKSByZXR1cm47XHJcblx0XHR2YXIgY29udHJvbFR5cGUgPSBjb250cm9sLmRhdGFzZXQudHlwZTtcclxuXHRcdHRoaXMudHJpZ2dlcignY29udHJvbDpwcmVzc2VkJywgY29udHJvbFR5cGUpO1xyXG5cdH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDb250cm9sc1ZpZXc7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyIGRvbSA9IHJlcXVpcmUoJy4uLy4uL2RvbScpO1xyXG52YXIgJCQgPSByZXF1aXJlKCcuLi8uLi91dGlscycpO1xyXG52YXIgQmFzZVZpZXcgPSByZXF1aXJlKCcuL2Jhc2UnKTtcclxuXHJcbmNsYXNzIERyb3BBcmVhVmlldyBleHRlbmRzIEJhc2VWaWV3IHtcclxuXHJcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xyXG5cdFx0c3VwZXIob3B0aW9ucyk7XHJcblxyXG5cdFx0dGhpcy5lbGVtcyA9IHtcclxuXHRcdFx0ZHJvcEhpbnQ6IGRvbS5xcygnLmpzLWRyb3AtaGludCcsIHRoaXMuZWwpXHJcblx0XHR9O1xyXG5cdFx0dGhpcy5iaW5kTGlzdGVuZXJzKCk7XHJcblx0fVxyXG5cclxuXHRiaW5kTGlzdGVuZXJzKCkge1xyXG5cdFx0dGhpcy5lbC5vbmRyb3AgPSB0aGlzLm9uRmlsZURyb3AuYmluZCh0aGlzKTtcclxuXHRcdHRoaXMuZWwub25kcmFnZW50ZXIgPSB0aGlzLm9uRmlsZUVudGVyLmJpbmQodGhpcyk7XHJcblx0XHR0aGlzLmVsLm9uZHJhZ292ZXIgPSB0aGlzLm9uRmlsZURyYWcuYmluZCh0aGlzKTtcclxuXHRcdHRoaXMuZWxlbXMuZHJvcEhpbnQub25kcmFnbGVhdmUgPSB0aGlzLm9uRmlsZUxlYXZlLmJpbmQodGhpcyk7XHJcblx0fVxyXG5cclxuXHRvbkZpbGVEcmFnKGUpIHtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHR9XHJcblxyXG5cdG9uRmlsZURyb3AoZSkge1xyXG5cdFx0dmFyIGZpbGVzID0gW10uc2xpY2UuY2FsbChlLmRhdGFUcmFuc2Zlci5maWxlcyk7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHR0aGlzLnRyaWdnZXIoJ2ZpbGVzOmFkZCcsIGZpbGVzKTtcclxuXHRcdGRvbS5oaWRlKHRoaXMuZWxlbXMuZHJvcEhpbnQpO1xyXG5cdH1cclxuXHJcblx0b25GaWxlTGVhdmUoKSB7XHJcblx0XHRkb20uaGlkZSh0aGlzLmVsZW1zLmRyb3BIaW50KTtcclxuXHR9XHJcblxyXG5cdG9uRmlsZUVudGVyKGUpIHtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRkb20uc2hvdyh0aGlzLmVsZW1zLmRyb3BIaW50KTtcclxuXHR9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRHJvcEFyZWFWaWV3O1xyXG5cclxuXHJcblxyXG5cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIgZG9tID0gcmVxdWlyZSgnLi4vLi4vZG9tJyk7XHJcbnZhciAkJCA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzJyk7XHJcbnZhciBCYXNlVmlldyA9IHJlcXVpcmUoJy4vYmFzZScpO1xyXG52YXIgY29uc3RzID0gcmVxdWlyZSgnLi4vLi4vY29uc3RzJyk7XHJcbnZhciBFUVVBTElaRVJfUkFOR0UgPSBjb25zdHMuRVFVQUxJWkVSX1JBTkdFO1xyXG52YXIgU0xJREVSX0hJR0hFU1QgPSBjb25zdHMuU0xJREVSX0hJR0hFU1Q7XHJcblxyXG5jbGFzcyBFcXVhbGl6ZXJWaWV3IGV4dGVuZHMgQmFzZVZpZXcge1xyXG5cclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcblx0XHRzdXBlcihvcHRpb25zKTtcclxuXHRcdHZhciBzbGlkZXJzO1xyXG5cdFx0XHJcblx0XHR0aGlzLmVsZW1zID0ge1xyXG5cdFx0XHRzbGlkZXJzOiB7XHJcblx0XHRcdFx0J2dhaW4nOiAgZG9tLnFzKCdbZGF0YS10eXBlPVwiZ2FpblwiXScsIHRoaXMuZWwpLFxyXG5cdFx0XHRcdCc2MCc6ICBkb20ucXMoJ1tkYXRhLXR5cGU9XCI2MFwiXScsIHRoaXMuZWwpLFxyXG5cdFx0XHRcdCcxNzAnOiAgZG9tLnFzKCdbZGF0YS10eXBlPVwiMTcwXCJdJywgdGhpcy5lbCksXHJcblx0XHRcdFx0JzMxMCc6ICBkb20ucXMoJ1tkYXRhLXR5cGU9XCIzMTBcIl0nLCB0aGlzLmVsKSxcclxuXHRcdFx0XHQnNjAwJzogIGRvbS5xcygnW2RhdGEtdHlwZT1cIjYwMFwiXScsIHRoaXMuZWwpLFxyXG5cdFx0XHRcdCcxMDAwJzogIGRvbS5xcygnW2RhdGEtdHlwZT1cIjEwMDBcIl0nLCB0aGlzLmVsKSxcclxuXHRcdFx0XHQnMzAwMCc6ICBkb20ucXMoJ1tkYXRhLXR5cGU9XCIzMDAwXCJdJywgdGhpcy5lbCksXHJcblx0XHRcdFx0JzYwMDAnOiAgZG9tLnFzKCdbZGF0YS10eXBlPVwiNjAwMFwiXScsIHRoaXMuZWwpLFxyXG5cdFx0XHRcdCcxMjAwMCc6ICBkb20ucXMoJ1tkYXRhLXR5cGU9XCIxMjAwMFwiXScsIHRoaXMuZWwpLFxyXG5cdFx0XHRcdCcxNDAwMCc6ICBkb20ucXMoJ1tkYXRhLXR5cGU9XCIxNDAwMFwiXScsIHRoaXMuZWwpLFxyXG5cdFx0XHRcdCcxNjAwMCc6ICBkb20ucXMoJ1tkYXRhLXR5cGU9XCIxNjAwMFwiXScsIHRoaXMuZWwpXHJcblx0XHRcdH0sXHJcblx0XHRcdHByZXNldHM6IHtcclxuXHRcdFx0XHRub3JtYWw6IGRvbS5xcygnW2RhdGEtdHlwZT1cIm5vcm1hbFwiXScsIHRoaXMuZWwpLCBcclxuXHRcdFx0XHRwb3A6IGRvbS5xcygnW2RhdGEtdHlwZT1cInBvcFwiXScsIHRoaXMuZWwpLCBcclxuXHRcdFx0XHRyb2NrOiBkb20ucXMoJ1tkYXRhLXR5cGU9XCJyb2NrXCJdJywgdGhpcy5lbCksIFxyXG5cdFx0XHRcdGpheno6IGRvbS5xcygnW2RhdGEtdHlwZT1cImphenpcIl0nLCB0aGlzLmVsKSwgXHJcblx0XHRcdFx0Y2xhc3NpYzogZG9tLnFzKCdbZGF0YS10eXBlPVwiY2xhc3NpY1wiXScsIHRoaXMuZWwpIFxyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdFx0XHJcblx0XHRzbGlkZXJzID0gdGhpcy5lbGVtcy5zbGlkZXJzO1xyXG5cclxuXHRcdHRoaXMuc2xpZGVyc0Nvb3JkcyA9IHtcclxuXHRcdFx0J2dhaW4nOiAgc2xpZGVyc1snZ2FpbiddLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxyXG5cdFx0XHQnNjAnOiAgc2xpZGVyc1snNjAnXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuXHRcdFx0JzE3MCc6ICBzbGlkZXJzWycxNzAnXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuXHRcdFx0JzMxMCc6ICBzbGlkZXJzWyczMTAnXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuXHRcdFx0JzYwMCc6ICBzbGlkZXJzWyc2MDAnXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuXHRcdFx0JzEwMDAnOiAgc2xpZGVyc1snMTAwMCddLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxyXG5cdFx0XHQnMzAwMCc6ICBzbGlkZXJzWyczMDAwJ10uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcblx0XHRcdCc2MDAwJzogIHNsaWRlcnNbJzYwMDAnXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuXHRcdFx0JzEyMDAwJzogIHNsaWRlcnNbJzEyMDAwJ10uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcblx0XHRcdCcxNDAwMCc6ICBzbGlkZXJzWycxNDAwMCddLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxyXG5cdFx0XHQnMTYwMDAnOiAgc2xpZGVyc1snMTYwMDAnXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLmFjdGl2ZVNsaWRlciA9IG51bGw7XHJcblxyXG5cdFx0dGhpcy5zbGlkZXJTaGlmdCA9IHtcclxuXHRcdFx0c2hpZnRYOiBudWxsLFxyXG5cdFx0XHRzaGlmdFk6IG51bGxcclxuXHRcdH07XHJcblx0XHR0aGlzLmJpbmRMaXN0ZW5lcnMoKTtcclxuXHR9XHJcblxyXG5cdGJpbmRMaXN0ZW5lcnMoKSB7XHJcblx0XHR0aGlzLm1vZGVsLm9uKCdlcXVhbGl6ZXI6Y2hhbmdlZCcsIHRoaXMub25FcXVhbGl6ZXJDaGFuZ2VkLCB0aGlzKTtcclxuXHRcdHRoaXMubW9kZWwub24oJ2lzVmlzdWFsaXppbmc6Y2hhbmdlZCcsIHRoaXMub25WaXN1YWxpemluZ0NoYW5nZWQsIHRoaXMpO1xyXG5cdFx0d2luZG93Lm9ucmVzaXplID0gdGhpcy5yZWNhbGNTbGlkZXJzQ29vcmRzLmJpbmQodGhpcyk7XHJcblx0XHR0aGlzLmVsLm9ubW91c2Vkb3duID0gdGhpcy5vblRodW1iTW91c2VEb3duLmJpbmQodGhpcyk7XHJcblx0XHR0aGlzLmVsLm9uZHJhZ3N0YXJ0ID0gdGhpcy5vbkRyYWdTdGFydC5iaW5kKHRoaXMpO1xyXG5cdFx0dGhpcy5lbC5vbmNsaWNrID0gdGhpcy5vblByZXNldENsaWNrLmJpbmQodGhpcyk7XHJcblx0fVxyXG5cclxuXHRvbkVxdWFsaXplckNoYW5nZWQoZSkge1xyXG5cdFx0dmFyIHNsaWRlciA9IHRoaXMuZWxlbXMuc2xpZGVyc1tlLnR5cGVdO1xyXG5cdFx0dmFyIHRodW1iID0gZG9tLnFzKCcuanMtdGh1bWInLCBzbGlkZXIpO1xyXG5cdFx0dmFyIHk7XHJcblxyXG5cdFx0aWYgKGUudHlwZSA9PT0gJ2dhaW4nKSB7XHJcblx0XHRcdHkgPSBlLnZhbHVlICogU0xJREVSX0hJR0hFU1Q7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0eSA9IChlLnZhbHVlICsgRVFVQUxJWkVSX1JBTkdFKSAvIChFUVVBTElaRVJfUkFOR0UgKiAyKSAqIFNMSURFUl9ISUdIRVNUO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5tb3ZlVGh1bWIodGh1bWIsIHkpO1xyXG5cdH1cclxuXHJcblx0b25WaXN1YWxpemluZ0NoYW5nZWQoKSB7XHJcblx0XHQgc2V0VGltZW91dCh0aGlzLnJlY2FsY1NsaWRlcnNDb29yZHMuYmluZCh0aGlzKSwgMCk7XHJcblx0fVxyXG5cclxuXHRvblByZXNldENsaWNrKGUpIHtcclxuXHRcdHZhciBwcmVzZXRFbCA9IGUudGFyZ2V0O1xyXG5cdFx0dmFyIHByZXNldFR5cGU7XHJcblxyXG5cdFx0aWYgKCFkb20uaGFzQ2xhc3MocHJlc2V0RWwsICdqcy1wcmVzZXQnKSkgcmV0dXJuO1xyXG5cdFx0cHJlc2V0VHlwZSA9IHByZXNldEVsLmRhdGFzZXQudHlwZTtcclxuXHRcdHRoaXMudHJpZ2dlcigncHJlc2V0OnNlbGVjdGVkJywgcHJlc2V0VHlwZSk7XHJcblx0fVxyXG5cclxuXHRvblRodW1iTW91c2VEb3duKGUpIHtcclxuXHRcdHZhciB0YXJnZXQgPSBlLnRhcmdldDtcclxuXHRcdHZhclx0dGh1bWJDb29yZHM7XHJcblxyXG5cdFx0aWYgKCFkb20uaGFzQ2xhc3MoZS50YXJnZXQsICdqcy10aHVtYicpKSByZXR1cm47XHJcblxyXG5cdFx0dGh1bWJDb29yZHMgPSB0YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblx0XHR0aGlzLmFjdGl2ZVRodW1iID0gdGFyZ2V0O1xyXG5cdFx0dGhpcy5hY3RpdmVTbGlkZXIgPSBkb20uY2xvc2VzdCh0YXJnZXQsICcuanMtc2xpZGVyJyk7XHJcblx0XHR0aGlzLnNsaWRlclNoaWZ0LnNoaWZ0WCA9IGUucGFnZVggLSB0aHVtYkNvb3Jkcy5sZWZ0O1xyXG5cdFx0dGhpcy5zbGlkZXJTaGlmdC5zaGlmdFkgPSBlLnBhZ2VZIC0gdGh1bWJDb29yZHMudG9wO1xyXG5cdFx0ZG9jdW1lbnQub25tb3VzZW1vdmUgPSB0aGlzLm9uRG9jdW1lbnRNb3VzZU1vdmUuYmluZCh0aGlzKTtcclxuXHRcdGRvY3VtZW50Lm9ubW91c2V1cCA9IHRoaXMub25Eb2N1bWVudE1vdXNlVXAuYmluZCh0aGlzKTtcclxuXHR9XHJcblxyXG5cdG9uRG9jdW1lbnRNb3VzZU1vdmUoZSkge1xyXG5cdFx0dmFyIHR5cGUgPSB0aGlzLmFjdGl2ZVNsaWRlci5kYXRhc2V0LnR5cGU7XHJcblx0XHR2YXIgeSA9IHRoaXMuc2xpZGVyc0Nvb3Jkc1t0eXBlXS5ib3R0b20gLSBlLmNsaWVudFkgLSB0aGlzLnNsaWRlclNoaWZ0LnNoaWZ0WTtcclxuXHRcdFx0eSA9IHRoaXMuY2hlY2tDb29yZHMoeSk7XHJcblx0XHR0aGlzLm1vdmVUaHVtYih0aGlzLmFjdGl2ZVRodW1iLCB5KTtcclxuXHRcdHRoaXMudHJpZ2dlcignc2xpZGVyOmNoYW5nZWQnLCB7dHlwZTogdHlwZSwgdmFsdWU6IHl9KTtcclxuXHR9XHJcblxyXG5cdG9uRG9jdW1lbnRNb3VzZVVwKCkge1xyXG5cdFx0ZG9jdW1lbnQub25tb3VzZW1vdmUgPSBudWxsO1xyXG5cdFx0ZG9jdW1lbnQub25tb3VzZXVwID0gbnVsbDtcclxuXHRcdHRoaXMuYWN0aXZlU2xpZGVyID0gbnVsbDtcclxuXHRcdHRoaXMuYWN0aXZlVGh1bWIgPSBudWxsO1xyXG5cdFx0dGhpcy5zbGlkZXJTaGlmdC5zaGlmdFggPSBudWxsO1xyXG5cdFx0dGhpcy5zbGlkZXJTaGlmdC5zaGlmdFkgPSBudWxsO1xyXG5cdH1cclxuXHJcblx0Y2hlY2tDb29yZHMoeSkge1xyXG5cdFx0dmFyIHRvcEVkZ2U7XHJcblxyXG5cdFx0aWYoeSA8IDApIHtcclxuXHRcdFx0eSA9IDA7XHJcblx0XHR9XHJcblx0XHR0b3BFZGdlID0gdGhpcy5hY3RpdmVTbGlkZXIub2Zmc2V0SGVpZ2h0IC0gdGhpcy5hY3RpdmVUaHVtYi5vZmZzZXRIZWlnaHQ7XHJcblx0XHRpZih5ID4gdG9wRWRnZSkge1xyXG5cdFx0XHR5ID0gdG9wRWRnZTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB5O1xyXG5cdH1cclxuXHJcblx0bW92ZVRodW1iKHRodW1iLCB5KSB7XHJcblx0XHR0aHVtYi5zdHlsZS5ib3R0b20gPSB5ICsgJ3B4JztcclxuXHR9XHJcblxyXG5cdG9uRHJhZ1N0YXJ0KCkge1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHRcclxuXHRyZWNhbGNTbGlkZXJzQ29vcmRzKCkge1xyXG5cdFx0dmFyIHNsaWRlcnMgPSB0aGlzLmVsZW1zLnNsaWRlcnM7XHJcblxyXG5cdFx0T2JqZWN0LmtleXMoc2xpZGVycykuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcclxuXHRcdFx0dGhpcy5zbGlkZXJzQ29vcmRzW2tleV0gPSBzbGlkZXJzW2tleV0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblx0XHR9LCB0aGlzKTtcclxuXHR9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRXF1YWxpemVyVmlldzsiLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciBCYXNlVmlldyA9IHJlcXVpcmUoJy4vYmFzZScpO1xyXG52YXIgYXVkaW9Db250ZXh0ID0gcmVxdWlyZSgnLi4vLi4vYXVkaW8nKS5nZXRBdWRpb0NvbnRleHQoKTtcclxudmFyIEZSRVFVRU5DSUVTID0gWzYwLCAxNzAsIDMxMCwgNjAwLCAxMDAwLCAzMDAwLCA2MDAwLCAxMjAwMCwgMTQwMDAsIDE2MDAwXTtcclxudmFyIGFuYWx5c2VyID0gcmVxdWlyZSgnLi4vLi4vYXVkaW9fYW5hbHlzZXInKTtcclxudmFyIGRvbSA9IHJlcXVpcmUoJy4uLy4uL2RvbScpO1xyXG5cclxuY2xhc3MgUGxheWVyVmlldyBleHRlbmRzIEJhc2VWaWV3IHtcclxuXHJcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xyXG5cdFx0c3VwZXIob3B0aW9ucyk7XHJcblx0XHR0aGlzLmdhaW4gPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpO1xyXG5cdFx0dGhpcy5maWx0ZXJzID0gdGhpcy5jcmVhdGVGaWx0ZXJzKEZSRVFVRU5DSUVTKTtcclxuXHRcdHRoaXMuYW5hbHlzZXIgPSBhbmFseXNlcjtcclxuXHRcdHRoaXMuZWxlbXMgPSB7XHJcblx0XHRcdHZpc3VhbGl6ZXI6IGRvbS5xcygnLmpzLXZpc3VhbGl6ZXInLCB0aGlzLmVsKSxcclxuXHRcdFx0ZXF1YWxpemVyOiBkb20ucXMoJy5qcy1lcXVhbGl6ZXInLCB0aGlzLmVsKVxyXG5cdFx0fTtcclxuXHRcdHRoaXMuYmluZExpc3RlbmVycygpO1xyXG5cdH1cclxuXHJcblx0YmluZExpc3RlbmVycygpIHtcclxuXHRcdHRoaXMubW9kZWwub24oJ2lzVmlzdWFsaXppbmc6Y2hhbmdlZCcsIHRoaXMub25WaXN1YWxpemluZ0NoYW5nZWQsIHRoaXMpO1xyXG5cdFx0dGhpcy5tb2RlbC5vbigncGxheWluZ1Nvbmc6Y2hhbmdlZCcsIHRoaXMub25QbGF5aW5nU29uZ0NoYW5nZWQsIHRoaXMpO1xyXG5cdFx0dGhpcy5tb2RlbC5vbignZXF1YWxpemVyOmNoYW5nZWQnLCB0aGlzLm9uRXF1YWxpemVyQ2hhbmdlZCwgdGhpcyk7XHJcblx0fVxyXG5cclxuXHRvbkVxdWFsaXplckNoYW5nZWQoZSkge1xyXG5cdFx0dmFyIGZpbHRlckluZGV4O1xyXG5cclxuXHRcdGlmIChlLnR5cGUgPT09ICdnYWluJykge1xyXG5cdFx0XHR0aGlzLmdhaW4uZ2Fpbi52YWx1ZSA9IGUudmFsdWU7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0ZmlsdGVySW5kZXggPSBGUkVRVUVOQ0lFUy5pbmRleE9mKE51bWJlcihlLnR5cGUpKTtcclxuXHRcdFx0dGhpcy5maWx0ZXJzW2ZpbHRlckluZGV4XS5nYWluLnZhbHVlID0gZS52YWx1ZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG9uVmlzdWFsaXppbmdDaGFuZ2VkKGlzVmlzdWFsaXppbmcpIHtcclxuXHRcdGlmIChpc1Zpc3VhbGl6aW5nKSB7XHJcblx0XHRcdGRvbS5oaWRlKHRoaXMuZWxlbXMuZXF1YWxpemVyKTtcclxuXHRcdFx0ZG9tLnNob3codGhpcy5lbGVtcy52aXN1YWxpemVyKTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRkb20uaGlkZSh0aGlzLmVsZW1zLnZpc3VhbGl6ZXIpO1xyXG5cdFx0XHRkb20uc2hvdyh0aGlzLmVsZW1zLmVxdWFsaXplcik7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRvblBsYXlpbmdTb25nQ2hhbmdlZChzb25nKSB7XHJcblx0XHRpZighc29uZykge1xyXG5cdFx0XHR0aGlzLnN0b3BTb25nKCk7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhpcy5wbGF5U29uZyhzb25nKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHBsYXlTb25nKHNvbmcpIHtcclxuXHRcdHRoaXMucGxheShzb25nLmF1ZGlvQnVmZmVyKTtcclxuXHR9XHJcblxyXG5cdHN0b3BTb25nKCkge1xyXG5cdFx0dGhpcy5zdG9wKCk7XHJcblx0fVxyXG5cclxuXHRjcmVhdGVGaWx0ZXJzKGZyZXF1ZW5jaWVzKSB7XHJcblx0XHR2YXIgZmlsdGVycyA9IGZyZXF1ZW5jaWVzLm1hcCh0aGlzLmNyZWF0ZUZpbHRlcik7XHJcblxyXG5cdFx0ZmlsdGVycy5yZWR1Y2UoZnVuY3Rpb24ocHJldiwgY3Vycikge1xyXG5cdFx0XHRwcmV2LmNvbm5lY3QoY3Vycik7XHJcblx0XHRcdHJldHVybiBjdXJyO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIGZpbHRlcnM7XHJcblx0fVxyXG5cclxuXHRjcmVhdGVGaWx0ZXIoZnJlcXVlbmN5KSB7XHJcblx0XHR2YXIgZmlsdGVyID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJpcXVhZEZpbHRlcigpO1xyXG5cclxuXHRcdGZpbHRlci50eXBlID0gJ3BlYWtpbmcnO1xyXG5cdFx0ZmlsdGVyLmZyZXF1ZW5jeS52YWx1ZSA9IGZyZXF1ZW5jeTtcclxuXHRcdGZpbHRlci5RLnZhbHVlID0gMTtcclxuXHRcdGZpbHRlci5nYWluLnZhbHVlID0gMDtcclxuXHJcblx0XHRyZXR1cm4gZmlsdGVyO1xyXG5cdH1cclxuXHJcblx0cGxheShhdWRpb0J1ZmZlcikge1xyXG5cdFx0dGhpcy5hdWRpb1NvdXJjZSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcclxuXHRcdHRoaXMuYXVkaW9Tb3VyY2UuYnVmZmVyID0gYXVkaW9CdWZmZXI7XHJcblx0XHR0aGlzLmF1ZGlvU291cmNlLmNvbm5lY3QodGhpcy5nYWluKTtcclxuXHJcblx0XHR0aGlzLmdhaW4uY29ubmVjdCh0aGlzLmZpbHRlcnNbMF0pO1xyXG5cdFx0dGhpcy5maWx0ZXJzW3RoaXMuZmlsdGVycy5sZW5ndGggLSAxXS5jb25uZWN0KHRoaXMuYW5hbHlzZXIpO1xyXG5cdFx0dGhpcy5hbmFseXNlci5jb25uZWN0KGF1ZGlvQ29udGV4dC5kZXN0aW5hdGlvbik7XHJcblx0XHR0aGlzLmF1ZGlvU291cmNlLnN0YXJ0KDApO1xyXG5cdH1cclxuXHJcblx0c3RvcCgpIHtcclxuXHRcdHRoaXMuYXVkaW9Tb3VyY2Uuc3RvcCgwKTtcclxuXHR9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUGxheWVyVmlldztcclxuXHJcblxyXG5cclxuXHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyIEJhc2VWaWV3ID0gcmVxdWlyZSgnLi9iYXNlJyk7XHJcbnZhciBkb20gPSByZXF1aXJlKCcuLi8uLi9kb20nKTtcclxuXHJcbmNsYXNzIFNvbmdEZXRhaWxzVmlldyBleHRlbmRzIEJhc2VWaWV3IHtcclxuXHJcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xyXG5cdFx0c3VwZXIob3B0aW9ucyk7XHJcblx0XHR0aGlzLmVsZW1zID0ge1xyXG5cdFx0XHRjb3ZlcjogZG9tLnFzKCcuanMtY292ZXInLCB0aGlzLmVsKSxcclxuXHRcdFx0dGl0bGU6IGRvbS5xcygnLmpzLXRpdGxlJywgdGhpcy5lbCksXHJcblx0XHRcdGFydGlzdDogZG9tLnFzKCcuanMtYXJ0aXN0JywgdGhpcy5lbCksXHJcblx0XHRcdGZpbGVOYW1lOiBkb20ucXMoJy5qcy1maWxlbmFtZScsIHRoaXMuZWwpXHJcblx0XHR9O1xyXG5cdFx0dGhpcy5kZWZhdWx0UGljdHVyZSA9IHRoaXMuZWxlbXMuY292ZXIuc3JjO1xyXG5cdFx0dGhpcy5wbGF5aW5nU29uZyA9IG51bGw7XHJcblxyXG5cdFx0dGhpcy5iaW5kTGlzdGVuZXJzKCk7XHJcblx0fVxyXG5cclxuXHRiaW5kTGlzdGVuZXJzKCkge1xyXG5cdFx0dGhpcy5tb2RlbC5vbignc2VsZWN0ZWRTb25nOmNoYW5nZWQnLCB0aGlzLm9uU2VsZWN0ZWRTb25nQ2hhbmdlZCwgdGhpcyk7XHJcblx0XHR0aGlzLm1vZGVsLm9uKCdwbGF5aW5nU29uZzpjaGFuZ2VkJywgZnVuY3Rpb24oc29uZyl7XHJcblx0XHRcdHRoaXMucGxheWluZ1NvbmcgPSBzb25nO1xyXG5cdFx0fSwgdGhpcyk7XHJcblx0fVxyXG5cclxuXHRvblNlbGVjdGVkU29uZ0NoYW5nZWQoc29uZykge1xyXG5cdFx0aWYgKHRoaXMucGxheWluZ1NvbmcpIHJldHVybjtcclxuXHJcblx0XHRpZihzb25nLnBpY3R1cmUpIHtcclxuXHRcdFx0dGhpcy5lbGVtcy5jb3Zlci5zcmMgPSBzb25nLnBpY3R1cmU7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhpcy5lbGVtcy5jb3Zlci5zcmMgPSB0aGlzLmRlZmF1bHRQaWN0dXJlO1xyXG5cdFx0fVxyXG5cdFx0aWYgKCFzb25nLnRpdGxlKSB7XHJcblx0XHRcdHRoaXMuZWxlbXMuZmlsZU5hbWUudGV4dENvbnRlbnQgPSAnJztcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aGlzLmVsZW1zLmZpbGVOYW1lLnRleHRDb250ZW50ID0gc29uZy5maWxlTmFtZTtcclxuXHRcdH1cclxuXHRcdHRoaXMuZWxlbXMudGl0bGUudGV4dENvbnRlbnQgPSBzb25nLnRpdGxlIHx8IHNvbmcuZmlsZU5hbWU7XHJcblx0XHR0aGlzLmVsZW1zLmFydGlzdC50ZXh0Q29udGVudCA9IHNvbmcuYXJ0aXN0IHx8ICcnO1xyXG5cdH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTb25nRGV0YWlsc1ZpZXc7IiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIgJCQgPSByZXF1aXJlKCcuLi8uLi91dGlscycpO1xyXG52YXIgRXZlbnRzID0gcmVxdWlyZSgnLi4vLi4vZXZlbnRzJyk7XHJcbnZhciBkb20gPSByZXF1aXJlKCcuLi8uLi9kb20nKTtcclxudmFyIEJhc2VWaWV3ID0gcmVxdWlyZSgnLi9iYXNlJyk7XHJcblxyXG5jbGFzcyBTb25nc0xpc3RWaWV3IGV4dGVuZHMgQmFzZVZpZXcge1xyXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuXHRcdHN1cGVyKG9wdGlvbnMpO1xyXG5cdFx0dGhpcy5lbGVtcyA9IHtcclxuXHRcdFx0cGxhY2Vob2xkZXI6IGRvbS5xcygnLmpzLXBsYWNlaG9sZGVyJywgdGhpcy5lbClcclxuXHRcdH07XHJcblx0XHR0aGlzLmJpbmRMaXN0ZW5lcnMoKTtcclxuXHR9XHJcblxyXG5cdGJpbmRMaXN0ZW5lcnMoKSB7XHJcblx0XHR0aGlzLm1vZGVsLm9uKCdzb25nOmFkZCcsIHRoaXMub25Tb25nQWRkLCB0aGlzKTtcclxuXHRcdHRoaXMuZWwub25jbGljayA9IHRoaXMub25Tb25nQ2xpY2suYmluZCh0aGlzKTtcclxuXHR9XHJcblxyXG5cdG9uU29uZ0NsaWNrKGUpIHtcclxuXHRcdHZhciB0YXJnZXQgPSBlLnRhcmdldDtcclxuXHRcdHZhciBzb25nRWwgPSBkb20uY2xvc2VzdCh0YXJnZXQsICcuanMtc29uZycpO1xyXG5cclxuXHRcdGlmICghc29uZ0VsKSByZXR1cm47XHJcblx0XHR0aGlzLnNlbGVjdFNvbmcoc29uZ0VsKTtcclxuXHRcdHRoaXMudHJpZ2dlcignc29uZzpzZWxlY3RlZCcsIHNvbmdFbC5kYXRhc2V0LmlkKTtcclxuXHR9XHJcblxyXG5cdG9uU29uZ0FkZChzb25nKSB7XHJcblx0XHR2YXIgc29uZ0VsID0gdGhpcy5jcmVhdGVTb25nRWwoc29uZyk7XHJcblxyXG5cdFx0aWYoIXRoaXMuaGF2ZVNvbmdzKSB7XHJcblx0XHRcdHRoaXMuZWxlbXMucGxhY2Vob2xkZXIucmVtb3ZlKCk7XHJcblx0XHR9XHJcblx0XHR0aGlzLmhhdmVTb25ncyA9IHRydWU7XHJcblx0XHR0aGlzLmVsLmFwcGVuZENoaWxkKHNvbmdFbCk7XHJcblx0fVxyXG5cclxuXHRzZWxlY3RTb25nKHNvbmdFbCkge1xyXG5cdFx0JCQudG9BcnJheShzb25nRWwucGFyZW50Tm9kZS5jaGlsZHJlbilcclxuXHRcdFx0LmZpbHRlcihlbCA9PiBlbCAhPT0gc29uZ0VsKVxyXG5cdFx0XHQuZm9yRWFjaChlbCA9PiBkb20ucmVtb3ZlQ2xhc3MoZWwsICdzb25nLWl0ZW1fc2VsZWN0ZWQnKSk7XHJcblxyXG5cdFx0ZG9tLmFkZENsYXNzKHNvbmdFbCwgJ3NvbmctaXRlbV9zZWxlY3RlZCcpO1xyXG5cdH1cclxuXHJcblx0Y3JlYXRlU29uZ0VsKHNvbmcpIHtcclxuXHRcdHZhciBzb25nRWwgPSB0aGlzLnRlbXBsYXRlLmNsb25lTm9kZSh0cnVlKTtcclxuXHRcdHZhciB0aXRsZSA9IGRvbS5xcygnLmpzLXNvbmctdGl0bGUnLCBzb25nRWwpO1xyXG5cdFx0dmFyIGFydGlzdCA9IGRvbS5xcygnLmpzLXNvbmctYXJ0aXN0Jywgc29uZ0VsKTtcclxuXHRcdHZhciBjb3ZlciA9IGRvbS5xcygnLmpzLXNvbmctY292ZXInLCBzb25nRWwpO1xyXG5cdFx0dmFyIGR1cmF0aW9uID0gZG9tLnFzKCcuanMtc29uZy1kdXJhdGlvbicsIHNvbmdFbCk7XHJcblxyXG5cdFx0dGl0bGUudGV4dENvbnRlbnQgPSBzb25nLnRpdGxlIHx8IHNvbmcuZmlsZU5hbWU7XHJcblx0XHRhcnRpc3QudGV4dENvbnRlbnQgPSBzb25nLmFydGlzdDtcclxuXHJcblx0XHRkdXJhdGlvbi50ZXh0Q29udGVudCA9IHRoaXMuZm9ybWF0RHVyYXRpb24oc29uZy5kdXJhdGlvbik7XHJcblx0XHRzb25nRWwuZGF0YXNldC5pZCA9IHNvbmcuaWQ7XHJcblx0XHRpZihzb25nLnBpY3R1cmUpIHtcclxuXHRcdFx0Y292ZXIuc3JjID0gc29uZy5waWN0dXJlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBzb25nRWw7XHJcblx0fVxyXG5cclxuXHRmb3JtYXREdXJhdGlvbihzZWNzKSB7XHJcblx0XHR2YXIgbWludXRlcyA9IE1hdGguZmxvb3Ioc2VjcyAvIDYwKTtcclxuXHRcdHZhciBzZWNvbmRzID0gc2VjcyAlIDYwO1xyXG5cclxuXHRcdGlmKHNlY29uZHMudG9TdHJpbmcoKS5sZW5ndGggPT09IDEpIHtcclxuXHRcdFx0c2Vjb25kcyA9ICcwJyArIHNlY29uZHM7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGAke21pbnV0ZXN9OiR7c2Vjb25kc31gO1xyXG5cdH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTb25nc0xpc3RWaWV3OyAiLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciBCYXNlVmlldyA9IHJlcXVpcmUoJy4vYmFzZScpO1xyXG52YXIgZG9tID0gcmVxdWlyZSgnLi4vLi4vZG9tJyk7XHJcbnZhciBhdWRpbyA9IHJlcXVpcmUoJy4uLy4uL2F1ZGlvJyk7XHJcbnZhciBhbmFseXNlciA9IHJlcXVpcmUoJy4uLy4uL2F1ZGlvX2FuYWx5c2VyJyk7XHJcblxyXG5jbGFzcyBWaXN1YWxpemVyVmlldyBleHRlbmRzIEJhc2VWaWV3IHtcclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcblx0XHRzdXBlcihvcHRpb25zKTtcclxuXHJcblx0XHR0aGlzLmVsZW1zID0ge1xyXG5cdFx0XHRjYW52YXM6IGRvbS5xcygnLmpzLWNhbnZhcycsIHRoaXMuZWwpXHJcblx0XHR9O1xyXG5cdFx0dGhpcy5mcmFtZUlkID0gbnVsbDtcclxuXHRcdHRoaXMuY2FudmFzVyA9IHRoaXMuZWxlbXMuY2FudmFzLm9mZnNldFdpZHRoO1xyXG5cdFx0dGhpcy5jYW52YXNIID0gdGhpcy5lbGVtcy5jYW52YXMub2Zmc2V0SGVpZ2h0O1xyXG5cdFx0dGhpcy5jYW52YXNDdHggPSB0aGlzLmVsZW1zLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG5cdFx0dGhpcy5iaW5kTGlzdGVuZXJzKCk7XHJcblx0fVxyXG5cclxuXHRiaW5kTGlzdGVuZXJzKCkge1xyXG5cdFx0dGhpcy5tb2RlbC5vbigncGxheWluZ1Nvbmc6Y2hhbmdlZCcsIHRoaXMub25QbGF5aW5nU29uZ0NoYW5nZWQsIHRoaXMpO1xyXG5cdH1cclxuXHJcblx0b25QbGF5aW5nU29uZ0NoYW5nZWQoc29uZykge1xyXG5cdFx0aWYoc29uZykge1xyXG5cdFx0XHR0aGlzLnN0YXJ0VmlzdWFsaXphdGlvbigpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHRoaXMuc3RvcFZpc3VhbGl6YXRpb24oKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGNsZWFyQ2FudmFzKCkge1xyXG5cdFx0dGhpcy5jYW52YXNDdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuY2FudmFzVywgdGhpcy5jYW52YXNIKTtcclxuXHR9XHJcblxyXG5cdHN0b3BWaXN1YWxpemF0aW9uKCkge1xyXG5cdFx0Y2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5mcmFtZUlkKTtcclxuXHRcdHRoaXMuY2xlYXJDYW52YXMoKTtcclxuXHR9XHJcblxyXG5cdHN0YXJ0VmlzdWFsaXphdGlvbigpIHtcclxuXHRcdHZhciBpO1xyXG5cdFx0dmFyIHggPSAwO1xyXG5cdFx0dmFyIHY7XHJcblx0XHR2YXIgeTtcclxuXHRcdHZhciBzbGljZVdpZHRoO1xyXG5cdFx0dmFyIGJ1ZmZlckxlbmd0aCA9IGFuYWx5c2VyLmZyZXF1ZW5jeUJpbkNvdW50O1xyXG5cdFx0dmFyIGRhdGFBcnJheSA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlckxlbmd0aCk7XHJcblxyXG5cdFx0dGhpcy5jbGVhckNhbnZhcygpO1xyXG5cdFx0dGhpcy5mcmFtZUlkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuc3RhcnRWaXN1YWxpemF0aW9uLmJpbmQodGhpcykpO1xyXG5cdFx0YW5hbHlzZXIuZ2V0Qnl0ZVRpbWVEb21haW5EYXRhKGRhdGFBcnJheSk7XHJcblx0XHR0aGlzLmNhbnZhc0N0eC5saW5lV2lkdGggPSAxO1xyXG5cdFx0dGhpcy5jYW52YXNDdHguc3Ryb2tlU3R5bGUgPSAncmVkJztcclxuXHRcdHRoaXMuY2FudmFzQ3R4LmJlZ2luUGF0aCgpO1xyXG5cclxuXHRcdHNsaWNlV2lkdGggPSB0aGlzLmNhbnZhc1cgKiAxLjAgLyBidWZmZXJMZW5ndGg7XHJcblxyXG5cdFx0Zm9yKGkgPSAwOyBpIDwgYnVmZmVyTGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0diA9IGRhdGFBcnJheVtpXSAvIDEyOC4wO1xyXG5cdFx0XHR5ID0gdiAqIHRoaXMuY2FudmFzSCAvIDI7XHJcblxyXG5cdFx0XHRpZihpID09PSAwKSB7XHJcblx0XHRcdFx0dGhpcy5jYW52YXNDdHgubW92ZVRvKHgsIHkpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuY2FudmFzQ3R4LmxpbmVUbyh4LCB5KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0eCArPSBzbGljZVdpZHRoO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5jYW52YXNDdHgubGluZVRvKHRoaXMuY2FudmFzVywgdGhpcy5jYW52YXNIIC8gMik7XHJcblx0XHR0aGlzLmNhbnZhc0N0eC5jbG9zZVBhdGgoKTtcclxuXHRcdHRoaXMuY2FudmFzQ3R4LnN0cm9rZSgpO1xyXG5cdH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBWaXN1YWxpemVyVmlldzsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIFNMSURFUl9ISUdIRVNUID0gMjAwO1xudmFyIEVRVUFMSVpFUl9SQU5HRSA9IDEyO1xudmFyIEFVRElPX0ZPUk1BVFMgPSBbXG5cdHtcblx0XHR0eXBlOiAnYXVkaW8vbXBlZycsXG5cdFx0ZXh0OiAnbXAzJ1xuXHR9LFxuXHR7XG5cdFx0dHlwZTogJ2F1ZGlvL29nZzsgY29kZWNzPVwidm9yYmlzXCInLFxuXHRcdGV4dDogJ29nZydcblx0fSxcblx0e1xuXHRcdHR5cGU6ICdhdWRpby93YXY7IGNvZGVjcz1cIjFcIicsXG5cdFx0ZXh0OiAnd2F2J1xuXHR9LFxuXHR7XG5cdFx0dHlwZTogJ2F1ZGlvL21wNDsgY29kZWNzPVwibXA0YS40MC4yXCInLFxuXHRcdGV4dDogJ2FhYydcblx0fSxcblx0e1xuXHRcdHR5cGU6ICdhdWRpby93ZWJtJyxcblx0XHRleHQ6ICd3ZWJhJ1xuXHR9LFxuXHR7XG5cdFx0dHlwZTogJ2F1ZGlvL2ZsYWMnLFxuXHRcdGV4dDogJ2ZsYWMnXG5cdH1cbl07XG52YXIgRVFVQUxJWkVSX1BSRVNFVFMgPSB7XG5cdG5vcm1hbDoge1xuXHRcdCc2MCc6ICAwLFxuXHRcdCcxNzAnOiAgMCxcblx0XHQnMzEwJzogIDAsXG5cdFx0JzYwMCc6ICAwLFxuXHRcdCcxMDAwJzogIDAsXG5cdFx0JzMwMDAnOiAgMCxcblx0XHQnNjAwMCc6ICAwLFxuXHRcdCcxMjAwMCc6ICAwLFxuXHRcdCcxNDAwMCc6ICAwLFxuXHRcdCcxNjAwMCc6ICAwXG5cdH0sXG5cdHBvcDoge1xuXHRcdCc2MCc6ICAtMS42LFxuXHRcdCcxNzAnOiAgNC44LFxuXHRcdCczMTAnOiAgNy4yLFxuXHRcdCc2MDAnOiAgOCxcblx0XHQnMTAwMCc6ICA1LjYsXG5cdFx0JzMwMDAnOiAgMS4xLFxuXHRcdCc2MDAwJzogIDIuNCxcblx0XHQnMTIwMDAnOiAgMi40LFxuXHRcdCcxNDAwMCc6ICAxLjYsXG5cdFx0JzE2MDAwJzogIDEuNlxuXHR9LFxuXHRyb2NrOiB7XG5cdFx0JzYwJzogIDgsXG5cdFx0JzE3MCc6ICA0LjgsXG5cdFx0JzMxMCc6ICAtNS42LFxuXHRcdCc2MDAnOiAgLTgsXG5cdFx0JzEwMDAnOiAgMy4yLFxuXHRcdCczMDAwJzogIDQsXG5cdFx0JzYwMDAnOiAgOC44LFxuXHRcdCcxMjAwMCc6ICAxMS4yLFxuXHRcdCcxNDAwMCc6ICAxMS4yLFxuXHRcdCcxNjAwMCc6ICAxMS4yXG5cdH0sXG5cdGpheno6IHtcblx0XHQnNjAnOiAgMTAsXG5cdFx0JzE3MCc6ICA5LjIsXG5cdFx0JzMxMCc6ICA2LFxuXHRcdCc2MDAnOiAgNixcblx0XHQnMTAwMCc6ICA0LFxuXHRcdCczMDAwJzogIDIuMixcblx0XHQnNjAwMCc6ICAyLjIsXG5cdFx0JzEyMDAwJzogIC00LFxuXHRcdCcxNDAwMCc6ICAtOC4yLFxuXHRcdCcxNjAwMCc6ICAtOC4yXG5cdH0sXG5cdGNsYXNzaWM6IHtcblx0XHQnNjAnOiAgLTQuOCxcblx0XHQnMTcwJzogIC0xLjEsXG5cdFx0JzMxMCc6ICA0LFxuXHRcdCc2MDAnOiAgNS42LFxuXHRcdCcxMDAwJzogIDUuNixcblx0XHQnMzAwMCc6ICA1LjYsXG5cdFx0JzYwMDAnOiAgNCxcblx0XHQnMTIwMDAnOiAgMi40LFxuXHRcdCcxNDAwMCc6ICAyLjQsXG5cdFx0JzE2MDAwJzogIDIuNFxuXHR9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0U0xJREVSX0hJR0hFU1Q6IFNMSURFUl9ISUdIRVNULFxuXHRFUVVBTElaRVJfUkFOR0U6IEVRVUFMSVpFUl9SQU5HRSxcblx0QVVESU9fRk9STUFUUzogQVVESU9fRk9STUFUUyxcblx0RVFVQUxJWkVSX1BSRVNFVFM6IEVRVUFMSVpFUl9QUkVTRVRTXG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIgJCQgPSByZXF1aXJlKCcuL3V0aWxzJyk7XHJcblxyXG52YXIgZG9tID0ge1xyXG5cdGJ5SWQ6IGZ1bmN0aW9uKGlkKSB7XHJcblx0XHRyZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xyXG5cdH0sXHJcblx0cXM6IGZ1bmN0aW9uKHNlbGVjdG9yLCBjb250ZXh0KSB7XHJcblx0XHRjb250ZXh0ID0gY29udGV4dCB8fCBkb2N1bWVudDtcclxuXHRcdHJldHVybiBjb250ZXh0LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xyXG5cdH0sXHJcblx0cXNhOiBmdW5jdGlvbihzZWxlY3RvciwgY29udGV4dCkge1xyXG5cdFx0Y29udGV4dCA9IGNvbnRleHQgfHwgZG9jdW1lbnQ7XHJcblx0XHRyZXR1cm4gJCQudG9BcnJheShjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcclxuXHR9LFxyXG5cdGFkZENsYXNzOiBmdW5jdGlvbihlbCwgY2xhc3NOYW1lKSB7XHJcblx0XHRlbC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XHJcblx0fSxcclxuXHRyZW1vdmVDbGFzczogZnVuY3Rpb24oZWwsIGNsYXNzTmFtZSkge1xyXG5cdFx0ZWwuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xyXG5cdH0sXHJcblx0aGFzQ2xhc3M6IGZ1bmN0aW9uKGVsLCBjbGFzc05hbWUpIHtcclxuXHRcdHJldHVybiBlbC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKTtcclxuXHR9LFxyXG5cdGhpZGU6IGZ1bmN0aW9uKC4uLmVsZW1zKSB7XHJcblx0XHRlbGVtcy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcclxuXHRcdFx0aXRlbS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cdFx0fSk7XHJcblx0fSxcclxuXHRzaG93OiBmdW5jdGlvbiguLi5lbGVtcykge1xyXG5cdFx0ZWxlbXMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XHJcblx0XHRcdGl0ZW0uc3R5bGUuZGlzcGxheSA9ICcnO1xyXG5cdFx0fSk7XHJcblx0fSxcclxuXHRjbG9zZXN0OiBmdW5jdGlvbihlbCwgc2VsZWN0b3IpIHtcclxuXHRcdGlmKGVsLmNsb3Nlc3QpIHJldHVybiBlbC5jbG9zZXN0KHNlbGVjdG9yKTtcclxuXHJcblx0XHR2YXIgcGFyZW50Tm9kZSA9IGVsO1xyXG5cdFx0dmFyIG1hdGNoZXM7XHJcblxyXG5cdFx0d2hpbGUoKG1hdGNoZXMgPSBwYXJlbnROb2RlICYmIHBhcmVudE5vZGUubWF0Y2hlcykgJiYgIXBhcmVudE5vZGUubWF0Y2hlcyhzZWxlY3RvcikpIHtcclxuXHRcdFx0cGFyZW50Tm9kZSA9IHBhcmVudE5vZGUucGFyZW50Tm9kZTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBtYXRjaGVzID8gcGFyZW50Tm9kZSA6IG51bGw7XHJcblx0fVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBkb207IiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIgc3Vic2NyaWJlcnMgPSBuZXcgTWFwKCk7XHJcblxyXG52YXIgRXZlbnRzID0ge1xyXG5cdG9uOiBmdW5jdGlvbih0eXBlLCBjYWxsYmFjaywgY29udGV4dCkge1xyXG5cdFx0dmFyIGl0ZW07XHJcblxyXG5cdFx0aWYoc3Vic2NyaWJlcnMuaGFzKHRoaXMpKSB7XHJcblx0XHRcdGl0ZW0gPSBzdWJzY3JpYmVycy5nZXQodGhpcyk7XHJcblx0XHRcdGlmKGl0ZW1bdHlwZV0pIHtcclxuXHRcdFx0XHRpdGVtW3R5cGVdLnB1c2goe1xyXG5cdFx0XHRcdFx0Y2FsbGJhY2s6IGNhbGxiYWNrLFxyXG5cdFx0XHRcdFx0Y29udGV4dDogY29udGV4dFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdGl0ZW1bdHlwZV0gPSBbe1xyXG5cdFx0XHRcdFx0Y2FsbGJhY2s6IGNhbGxiYWNrLFxyXG5cdFx0XHRcdFx0Y29udGV4dDogY29udGV4dFxyXG5cdFx0XHRcdH1dO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0aXRlbSA9IHtcclxuXHRcdFx0XHRbdHlwZV06IFt7XHJcblx0XHRcdFx0XHRjYWxsYmFjazogY2FsbGJhY2ssXHJcblx0XHRcdFx0XHRjb250ZXh0OiBjb250ZXh0XHJcblx0XHRcdFx0fV1cclxuXHRcdFx0fTtcclxuXHRcdFx0c3Vic2NyaWJlcnMuc2V0KHRoaXMsIGl0ZW0pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0b2ZmOiBmdW5jdGlvbih0eXBlLCBjYWxsYmFjaykge1xyXG5cdFx0dmFyIGl0ZW0sIGk7XHJcblx0XHRpZihhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdHN1YnNjcmliZXJzLmRlbGV0ZSh0aGlzKTtcclxuXHRcdH1cclxuXHRcdGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDEgJiYgc3Vic2NyaWJlcnMuaGFzKHRoaXMpKSB7XHJcblx0XHRcdGl0ZW0gPSBzdWJzY3JpYmVycy5nZXQodGhpcyk7XHJcblx0XHRcdGlmKGl0ZW1bdHlwZV0pIHtcclxuXHRcdFx0XHRpZihjYWxsYmFjaykge1xyXG5cdFx0XHRcdFx0Zm9yKGkgPSAwOyBpIDwgaXRlbVt0eXBlXS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0XHRpZihpdGVtW3R5cGVdW2ldID09PSBjYWxsYmFjaykge1xyXG5cdFx0XHRcdFx0XHRcdGl0ZW1bdHlwZV0uc3BsaWNlKGksIDEpO1xyXG5cdFx0XHRcdFx0XHRcdGktLTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdGRlbGV0ZSBpdGVtW3R5cGVdO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblx0dHJpZ2dlcjogZnVuY3Rpb24odHlwZSwgLi4uYXJncykge1xyXG5cdFx0dmFyIGl0ZW07XHJcblxyXG5cdFx0aWYoc3Vic2NyaWJlcnMuaGFzKHRoaXMpKSB7XHJcblx0XHRcdGl0ZW0gPSBzdWJzY3JpYmVycy5nZXQodGhpcyk7XHJcblxyXG5cdFx0XHRpZihpdGVtW3R5cGVdKSB7XHJcblx0XHRcdFx0aXRlbVt0eXBlXS5mb3JFYWNoKGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdFx0XHR2YXIgY29udGV4dCA9IGV2ZW50LmNvbnRleHQgfHwgdGhpcztcclxuXHRcdFx0XHRcdGV2ZW50LmNhbGxiYWNrLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xyXG5cdFx0XHRcdH0sIHRoaXMpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChpdGVtLmFsbCkge1xyXG5cdFx0XHRcdGl0ZW0uYWxsLmZvckVhY2goZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0XHRcdHZhciBjb250ZXh0ID0gZXZlbnQuY29udGV4dCB8fCB0aGlzO1xyXG5cdFx0XHRcdFx0YXJncy51bnNoaWZ0KHR5cGUpO1xyXG5cdFx0XHRcdFx0ZXZlbnQuY2FsbGJhY2suYXBwbHkoY29udGV4dCwgYXJncyk7XHJcblx0XHRcdFx0fSwgdGhpcyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50czsiLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciAkJCA9IHtcclxuXHR0b0FycmF5OiBmdW5jdGlvbihvYmplY3QpIHtcclxuXHRcdHJldHVybiBbXS5zbGljZS5jYWxsKG9iamVjdCk7XHJcblx0fSxcclxuXHRhc3NpZ246IGZ1bmN0aW9uKHRhcmdldCwgLi4ucmVzdCkge1xyXG5cdFx0aWYodGFyZ2V0ID09PSB1bmRlZmluZWQgfHwgdGFyZ2V0ID09PSBudWxsKSB7XHJcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjb252ZXJ0IGZpcnN0IGFyZ3VtZW50IHRvIG9iamVjdCcpO1xyXG5cdFx0fVxyXG5cdFx0cmVzdC5mb3JFYWNoKG9iaiA9PiB7XHJcblx0XHRcdGlmKG9iaiA9PT0gdW5kZWZpbmVkIHx8IG9iaiA9PT0gbnVsbCkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHRPYmplY3Qua2V5cyhvYmopLmZvckVhY2goa2V5ID0+IHtcclxuXHRcdFx0XHR0YXJnZXRba2V5XSA9IG9ialtrZXldO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH0sXHJcblx0b2JzZXJ2ZVByb3BlcnRpZXM6IGZ1bmN0aW9uKG9iaikge1xyXG5cdFx0aWYgKHR5cGVvZiBvYmoudHJpZ2dlciAhPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHR0aHJvdyAnT2JzZXJ2ZWQgb2JqZWN0IG11c3QgaGF2ZSB0cmlnZ2VyIG1ldGhvZCc7XHJcblx0XHR9XHJcblx0XHRPYmplY3Qua2V5cyhvYmopLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XHJcblx0XHRcdG9ialsnXycgKyBrZXldID0gb2JqW2tleV07XHJcblxyXG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcclxuXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIG9ialsnXycgKyBrZXldO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG5cdFx0XHRcdFx0aWYob2JqWydfJyArIGtleV0gPT09IHZhbHVlKSByZXR1cm47XHJcblxyXG5cdFx0XHRcdFx0b2JqWydfJyArIGtleV0gPSB2YWx1ZTtcclxuXHRcdFx0XHRcdG9iai50cmlnZ2VyKGtleSArICc6Y2hhbmdlZCcsIHZhbHVlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSwgb2JqKTtcclxuXHR9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9ICQkOyJdfQ==
