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

},{"./audio_player/controllers/controls":5,"./audio_player/controllers/drop_area":6,"./audio_player/controllers/equalizer":7,"./audio_player/controllers/songs_list":8,"./audio_player/states/player":11,"./audio_player/views/controls":13,"./audio_player/views/drop_area":14,"./audio_player/views/equalizer":15,"./audio_player/views/player":16,"./audio_player/views/song_details":17,"./audio_player/views/songs_list":18,"./audio_player/views/visualizer":19,"./dom":20}],2:[function(require,module,exports){
"use strict";

var audioEl = document.createElement('audio');
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = null;
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

var SUPPORTED_FORMATS = AUDIO_FORMATS.filter(function (format) {
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

},{}],3:[function(require,module,exports){
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

},{"../../audio":2,"../../utils":22,"./base":4}],7:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseController = require('./base');
var SLIDER_HIGHEST = 200;
var EQUALIZER_RANGE = 12;

var EqualizeController = (function (_BaseController) {
	_inherits(EqualizeController, _BaseController);

	function EqualizeController() {
		_classCallCheck(this, EqualizeController);

		_get(Object.getPrototypeOf(EqualizeController.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(EqualizeController, [{
		key: 'bindListeners',
		value: function bindListeners() {
			this.view.on('slider:changed', this.sliderChanged, this);
		}
	}, {
		key: 'sliderChanged',
		value: function sliderChanged(e) {
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

},{"./base":4}],8:[function(require,module,exports){
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

},{"../../events":21,"../../utils":22,"./song":9}],11:[function(require,module,exports){
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
		this.isVisualizing = false;
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

},{"../../events":21,"../../utils":22,"../models/songs":10}],12:[function(require,module,exports){
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

},{"../../dom":20,"../../events":21,"../../utils":22}],13:[function(require,module,exports){
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
			prev: dom.qs('.js-prev'),
			next: dom.qs('.js-next'),
			play: dom.qs('.js-play'),
			pause: dom.qs('.js-pause'),
			stop: dom.qs('.js-stop'),
			eq: dom.qs('.js-eq')
		};
		this.isPlaying = false;
		this.songs = [];
		this.bindListeners();
	}

	_createClass(ControlsView, [{
		key: 'bindListeners',
		value: function bindListeners() {
			this.el.onclick = this.onControlClick.bind(this);
			this.model.on('selectedSong:changed', this.onSelectedSongChanged, this);
			this.model.on('playingSong:changed', this.onPlayingSongChanged, this);
			this.model.on('song:add', this.onSongAdd, this);
		}
	}, {
		key: 'onSongAdd',
		value: function onSongAdd(song) {
			this.songs.push(song.id);
		}
	}, {
		key: 'onPlayingSongChanged',
		value: function onPlayingSongChanged(song) {
			if (!song) {
				this.isPlaying = false;
				dom.addClass(this.elems.stop, 'icon_disabled');
				dom.removeClass(this.elems.play, 'icon_disabled');
			} else {
				this.isPlaying = true;
				dom.removeClass(this.elems.stop, 'icon_disabled');
				dom.addClass(this.elems.play, 'icon_disabled');
			}
		}
	}, {
		key: 'onSelectedSongChanged',
		value: function onSelectedSongChanged(song) {
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

},{"../../dom":20,"./base":12}],14:[function(require,module,exports){
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
		this.haveSongs = false;

		this.elems = {
			dropHint: dom.qs('.js-drop-hint', this.el)
		};
		this.bindListeners();
	}

	_createClass(DropAreaView, [{
		key: 'bindListeners',
		value: function bindListeners() {
			this.model.on('haveSongs:changed', function (value) {
				this.haveSongs = value;
			}, this);
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
			if (this.haveSongs) {
				dom.hide(this.elems.dropHint);
			}
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

},{"../../dom":20,"../../utils":22,"./base":12}],15:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dom = require('../../dom');
var $$ = require('../../utils');
var BaseView = require('./base');

var EqualizerView = (function (_BaseView) {
	_inherits(EqualizerView, _BaseView);

	function EqualizerView(options) {
		_classCallCheck(this, EqualizerView);

		_get(Object.getPrototypeOf(EqualizerView.prototype), 'constructor', this).call(this, options);

		this.sliders = {
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
		};

		this.slidersCoords = {
			'gain': this.sliders['gain'].getBoundingClientRect(),
			'60': this.sliders['60'].getBoundingClientRect(),
			'170': this.sliders['170'].getBoundingClientRect(),
			'310': this.sliders['310'].getBoundingClientRect(),
			'600': this.sliders['600'].getBoundingClientRect(),
			'1000': this.sliders['1000'].getBoundingClientRect(),
			'3000': this.sliders['3000'].getBoundingClientRect(),
			'6000': this.sliders['6000'].getBoundingClientRect(),
			'12000': this.sliders['12000'].getBoundingClientRect(),
			'14000': this.sliders['14000'].getBoundingClientRect(),
			'16000': this.sliders['16000'].getBoundingClientRect()
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
			this.model.on('isVisualizing:changed', this.onVisualizingChanged, this);
			window.onresize = this.recalcSlidersCoords.bind(this);
			this.el.onmousedown = this.onThumbMouseDown.bind(this);
			this.el.ondragstart = this.onDragStart.bind(this);
		}
	}, {
		key: 'onVisualizingChanged',
		value: function onVisualizingChanged() {
			setTimeout(this.recalcSlidersCoords.bind(this), 0);
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
			var y = e.clientY - this.sliderShift.shiftY - this.slidersCoords[type].top;
			this.moveThumb(y);
		}
	}, {
		key: 'onDocumentMouseUp',
		value: function onDocumentMouseUp(e) {
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
		value: function moveThumb(y) {
			var type = this.activeSlider.dataset.type;
			y = this.checkCoords(y);
			this.activeThumb.style.top = y + 'px';
			this.trigger('slider:changed', { type: type, value: Math.abs(y - 200) });
		}
	}, {
		key: 'onDragStart',
		value: function onDragStart() {
			return false;
		}
	}, {
		key: 'recalcSlidersCoords',
		value: function recalcSlidersCoords() {
			Object.keys(this.sliders).forEach(function (key) {
				this.slidersCoords[key] = this.sliders[key].getBoundingClientRect();
			}, this);
		}
	}]);

	return EqualizerView;
})(BaseView);

module.exports = EqualizerView;

},{"../../dom":20,"../../utils":22,"./base":12}],16:[function(require,module,exports){
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

},{"../../audio":2,"../../audio_analyser":3,"../../dom":20,"./base":12}],17:[function(require,module,exports){
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

},{"../../dom":20,"./base":12}],18:[function(require,module,exports){
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

},{"../../dom":20,"../../events":21,"../../utils":22,"./base":12}],19:[function(require,module,exports){
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

},{"../../audio":2,"../../audio_analyser":3,"../../dom":20,"./base":12}],20:[function(require,module,exports){
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

},{"./utils":22}],21:[function(require,module,exports){
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

},{}],22:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL0phdmFzY3JpcHQvdGFza18zL3NyYy9qcy9hcHAuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL0phdmFzY3JpcHQvdGFza18zL3NyYy9qcy9hdWRpby5qcyIsIi9ob21lL2FuZHJleS9Eb2N1bWVudHMvUHJvamVjdHMvSmF2YXNjcmlwdC90YXNrXzMvc3JjL2pzL2F1ZGlvX2FuYWx5c2VyLmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy9KYXZhc2NyaXB0L3Rhc2tfMy9zcmMvanMvYXVkaW9fcGxheWVyL2NvbnRyb2xsZXJzL2Jhc2UuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL0phdmFzY3JpcHQvdGFza18zL3NyYy9qcy9hdWRpb19wbGF5ZXIvY29udHJvbGxlcnMvY29udHJvbHMuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL0phdmFzY3JpcHQvdGFza18zL3NyYy9qcy9hdWRpb19wbGF5ZXIvY29udHJvbGxlcnMvZHJvcF9hcmVhLmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy9KYXZhc2NyaXB0L3Rhc2tfMy9zcmMvanMvYXVkaW9fcGxheWVyL2NvbnRyb2xsZXJzL2VxdWFsaXplci5qcyIsIi9ob21lL2FuZHJleS9Eb2N1bWVudHMvUHJvamVjdHMvSmF2YXNjcmlwdC90YXNrXzMvc3JjL2pzL2F1ZGlvX3BsYXllci9jb250cm9sbGVycy9zb25nc19saXN0LmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy9KYXZhc2NyaXB0L3Rhc2tfMy9zcmMvanMvYXVkaW9fcGxheWVyL21vZGVscy9zb25nLmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy9KYXZhc2NyaXB0L3Rhc2tfMy9zcmMvanMvYXVkaW9fcGxheWVyL21vZGVscy9zb25ncy5qcyIsIi9ob21lL2FuZHJleS9Eb2N1bWVudHMvUHJvamVjdHMvSmF2YXNjcmlwdC90YXNrXzMvc3JjL2pzL2F1ZGlvX3BsYXllci9zdGF0ZXMvcGxheWVyLmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy9KYXZhc2NyaXB0L3Rhc2tfMy9zcmMvanMvYXVkaW9fcGxheWVyL3ZpZXdzL2Jhc2UuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL0phdmFzY3JpcHQvdGFza18zL3NyYy9qcy9hdWRpb19wbGF5ZXIvdmlld3MvY29udHJvbHMuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL0phdmFzY3JpcHQvdGFza18zL3NyYy9qcy9hdWRpb19wbGF5ZXIvdmlld3MvZHJvcF9hcmVhLmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy9KYXZhc2NyaXB0L3Rhc2tfMy9zcmMvanMvYXVkaW9fcGxheWVyL3ZpZXdzL2VxdWFsaXplci5qcyIsIi9ob21lL2FuZHJleS9Eb2N1bWVudHMvUHJvamVjdHMvSmF2YXNjcmlwdC90YXNrXzMvc3JjL2pzL2F1ZGlvX3BsYXllci92aWV3cy9wbGF5ZXIuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL0phdmFzY3JpcHQvdGFza18zL3NyYy9qcy9hdWRpb19wbGF5ZXIvdmlld3Mvc29uZ19kZXRhaWxzLmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy9KYXZhc2NyaXB0L3Rhc2tfMy9zcmMvanMvYXVkaW9fcGxheWVyL3ZpZXdzL3NvbmdzX2xpc3QuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL0phdmFzY3JpcHQvdGFza18zL3NyYy9qcy9hdWRpb19wbGF5ZXIvdmlld3MvdmlzdWFsaXplci5qcyIsIi9ob21lL2FuZHJleS9Eb2N1bWVudHMvUHJvamVjdHMvSmF2YXNjcmlwdC90YXNrXzMvc3JjL2pzL2RvbS5qcyIsIi9ob21lL2FuZHJleS9Eb2N1bWVudHMvUHJvamVjdHMvSmF2YXNjcmlwdC90YXNrXzMvc3JjL2pzL2V2ZW50cy5qcyIsIi9ob21lL2FuZHJleS9Eb2N1bWVudHMvUHJvamVjdHMvSmF2YXNjcmlwdC90YXNrXzMvc3JjL2pzL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsWUFBWSxDQUFDOztBQUViLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0FBQ3hELElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDOztBQUUxRCxJQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztBQUM3RCxJQUFJLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDOztBQUV6RSxJQUFJLGFBQWEsR0FBRyxPQUFPLENBQUMsaUNBQWlDLENBQUMsQ0FBQztBQUMvRCxJQUFJLG1CQUFtQixHQUFHLE9BQU8sQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDOztBQUUzRSxJQUFJLGVBQWUsR0FBRyxPQUFPLENBQUMsbUNBQW1DLENBQUMsQ0FBQzs7QUFFbkUsSUFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLCtCQUErQixDQUFDLENBQUM7QUFDNUQsSUFBSSxrQkFBa0IsR0FBRyxPQUFPLENBQUMscUNBQXFDLENBQUMsQ0FBQzs7QUFFeEUsSUFBSSxjQUFjLEdBQUcsT0FBTyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7O0FBRWhFLElBQUksYUFBYSxHQUFHLE9BQU8sQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO0FBQzlELElBQUksbUJBQW1CLEdBQUcsT0FBTyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7O0FBRTFFLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQzs7O0FBSTNCLElBQUksV0FBVyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7OztBQUdw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LENBQUM7R0FDSCxDQUFDLENBQUM7RUFDSDtBQUNELGtCQUFpQixFQUFFLDJCQUFTLEdBQUcsRUFBRTtBQUNoQyxNQUFJLE9BQU8sR0FBRyxDQUFDLE9BQU8sS0FBSyxVQUFVLEVBQUU7QUFDdEMsU0FBTSwwQ0FBMEMsQ0FBQztHQUNqRDtBQUNELFFBQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVMsR0FBRyxFQUFFO0FBQ3RDLE1BQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUUxQixTQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUU7QUFDL0IsT0FBRyxFQUFFLGVBQVc7QUFDZixZQUFPLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7S0FDdEI7QUFDRCxPQUFHLEVBQUUsYUFBUyxLQUFLLEVBQUU7QUFDcEIsU0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxLQUFLLEtBQUssRUFBRSxPQUFPOztBQUVwQyxRQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztBQUN2QixRQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDckM7SUFDRCxDQUFDLENBQUM7R0FDSCxFQUFFLEdBQUcsQ0FBQyxDQUFDO0VBQ1I7Q0FDRCxDQUFDOztBQUVGLE1BQU0sQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyIFBsYXllclZpZXcgPSByZXF1aXJlKCcuL2F1ZGlvX3BsYXllci92aWV3cy9wbGF5ZXInKTtcclxudmFyIFBsYXllclN0YXRlID0gcmVxdWlyZSgnLi9hdWRpb19wbGF5ZXIvc3RhdGVzL3BsYXllcicpO1xyXG5cclxudmFyIERyb3BBcmVhVmlldyA9IHJlcXVpcmUoJy4vYXVkaW9fcGxheWVyL3ZpZXdzL2Ryb3BfYXJlYScpO1xyXG52YXIgRHJvcEFyZWFDb250cm9sbGVyID0gcmVxdWlyZSgnLi9hdWRpb19wbGF5ZXIvY29udHJvbGxlcnMvZHJvcF9hcmVhJyk7XHJcblxyXG52YXIgU29uZ3NMaXN0VmlldyA9IHJlcXVpcmUoJy4vYXVkaW9fcGxheWVyL3ZpZXdzL3NvbmdzX2xpc3QnKTtcclxudmFyIFNvbmdzTGlzdENvbnRyb2xsZXIgPSByZXF1aXJlKCcuL2F1ZGlvX3BsYXllci9jb250cm9sbGVycy9zb25nc19saXN0Jyk7XHJcblxyXG52YXIgU29uZ0RldGFpbHNWaWV3ID0gcmVxdWlyZSgnLi9hdWRpb19wbGF5ZXIvdmlld3Mvc29uZ19kZXRhaWxzJyk7XHJcblxyXG52YXIgQ29udHJvbHNWaWV3ID0gcmVxdWlyZSgnLi9hdWRpb19wbGF5ZXIvdmlld3MvY29udHJvbHMnKTtcclxudmFyIENvbnRyb2xzQ29udHJvbGxlciA9IHJlcXVpcmUoJy4vYXVkaW9fcGxheWVyL2NvbnRyb2xsZXJzL2NvbnRyb2xzJyk7XHJcblxyXG52YXIgVmlzdWFsaXplclZpZXcgPSByZXF1aXJlKCcuL2F1ZGlvX3BsYXllci92aWV3cy92aXN1YWxpemVyJyk7XHJcblxyXG52YXIgRXF1YWxpemVyVmlldyA9IHJlcXVpcmUoJy4vYXVkaW9fcGxheWVyL3ZpZXdzL2VxdWFsaXplcicpO1xyXG52YXIgRXF1YWxpemVyQ29udHJvbGxlciA9IHJlcXVpcmUoJy4vYXVkaW9fcGxheWVyL2NvbnRyb2xsZXJzL2VxdWFsaXplcicpO1xyXG5cclxudmFyIGRvbSA9IHJlcXVpcmUoJy4vZG9tJyk7XHJcblxyXG5cclxuLy8gUGxheWVyIFN0YXRlXHJcbnZhciBwbGF5ZXJTdGF0ZSA9IG5ldyBQbGF5ZXJTdGF0ZSgpO1xyXG5cclxuLy8gTWFpblxyXG52YXIgcGxheWVyVmlldyA9IG5ldyBQbGF5ZXJWaWV3KHtcclxuXHRlbDogZG9tLmJ5SWQoJ2F1ZGlvUGxheWVyJyksXHJcblx0bW9kZWw6IHBsYXllclN0YXRlXHJcbn0pO1xyXG5cclxuLy8gRHJvcCBhcmVhXHJcbnZhciBkcm9wQXJlYVZpZXcgPSBuZXcgRHJvcEFyZWFWaWV3KHtcclxuXHRlbDogZG9tLnFzKCcuanMtZHJvcC1hcmVhJywgcGxheWVyVmlldy5lbCksXHJcblx0bW9kZWw6IHBsYXllclN0YXRlXHJcbn0pO1xyXG5cclxudmFyIGRyb3BBcmVhQ29udHJvbGxlciA9IG5ldyBEcm9wQXJlYUNvbnRyb2xsZXIoe1xyXG5cdHZpZXc6IGRyb3BBcmVhVmlldyxcclxuXHRtb2RlbDogcGxheWVyU3RhdGVcclxufSk7XHJcblxyXG4vLyBTb25ncyBMaXN0XHJcbnZhciBzb25nc0xpc3RWaWV3ID0gbmV3IFNvbmdzTGlzdFZpZXcoe1xyXG5cdGVsOiBkb20ucXMoJy5qcy1zb25ncy1saXN0JywgcGxheWVyVmlldy5lbCksXHJcblx0dGVtcGxhdGU6IGRvbS5ieUlkKCdzb25nTGlzdEl0ZW0nKSxcclxuXHRtb2RlbDogcGxheWVyU3RhdGVcclxufSk7XHJcblxyXG52YXIgc29uZ3NMaXN0Q29udHJvbGxlciA9IG5ldyBTb25nc0xpc3RDb250cm9sbGVyKHtcclxuXHRtb2RlbDogcGxheWVyU3RhdGUsXHJcblx0dmlldzogc29uZ3NMaXN0Vmlld1xyXG59KTtcclxuXHJcbi8vIERldGFpbHNcclxudmFyIHNvbmdEZXRhaWxzVmlldyA9IG5ldyBTb25nRGV0YWlsc1ZpZXcoe1xyXG5cdGVsOiBkb20ucXMoJy5qcy1zb25nLWRldGFpbHMnLCBwbGF5ZXJWaWV3LmVsKSxcclxuXHRtb2RlbDogcGxheWVyU3RhdGVcclxufSk7XHJcblxyXG5cclxuLy8gQ29udHJvbHNcclxudmFyIGNvbnRyb2xzVmlldyA9IG5ldyBDb250cm9sc1ZpZXcoe1xyXG5cdGVsOiBkb20ucXMoJy5qcy1jb250cm9scycsIHBsYXllclZpZXcuZWwpLFxyXG5cdG1vZGVsOiBwbGF5ZXJTdGF0ZVxyXG59KTtcclxuXHJcbnZhciBjb250cm9sc0NvbnRyb2xsZXIgPSBuZXcgQ29udHJvbHNDb250cm9sbGVyKHtcclxuXHRtb2RlbDogcGxheWVyU3RhdGUsXHJcblx0dmlldzogY29udHJvbHNWaWV3XHJcbn0pO1xyXG5cclxuLy8gRXF1YWxpemVyXHJcblxyXG52YXIgZXF1YWxpemVyVmlldyA9IG5ldyBFcXVhbGl6ZXJWaWV3KHtcclxuXHRlbDogZG9tLnFzKCcuanMtZXF1YWxpemVyJywgcGxheWVyVmlldy5lbCksXHJcblx0bW9kZWw6IHBsYXllclN0YXRlXHJcbn0pO1xyXG5cclxudmFyIGVxdWFsaXplckNvbnRyb2xsZXIgPSBuZXcgRXF1YWxpemVyQ29udHJvbGxlcih7XHJcblx0dmlldzogZXF1YWxpemVyVmlldyxcclxuXHRtb2RlbDogcGxheWVyU3RhdGVcclxufSk7XHJcblxyXG4vLyBWaXN1YWxpemVyXHJcblxyXG52YXIgdmlzdWFsaXplclZpZXcgPSBuZXcgVmlzdWFsaXplclZpZXcoe1xyXG5cdGVsOiBkb20ucXMoJy5qcy12aXN1YWxpemVyJywgcGxheWVyVmlldy5lbCksXHJcblx0bW9kZWw6IHBsYXllclN0YXRlXHJcbn0pO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciBhdWRpb0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYXVkaW8nKTtcclxudmFyIEF1ZGlvQ29udGV4dCA9IHdpbmRvdy5BdWRpb0NvbnRleHQgfHwgd2luZG93LndlYmtpdEF1ZGlvQ29udGV4dDtcclxudmFyIGF1ZGlvQ29udGV4dCA9IG51bGw7XHJcbnZhciBBVURJT19GT1JNQVRTID0gW1xyXG5cdHtcclxuXHRcdHR5cGU6ICdhdWRpby9tcGVnJyxcclxuXHRcdGV4dDogJ21wMydcclxuXHR9LFxyXG5cdHtcclxuXHRcdHR5cGU6ICdhdWRpby9vZ2c7IGNvZGVjcz1cInZvcmJpc1wiJyxcclxuXHRcdGV4dDogJ29nZydcclxuXHR9LFxyXG5cdHtcclxuXHRcdHR5cGU6ICdhdWRpby93YXY7IGNvZGVjcz1cIjFcIicsXHJcblx0XHRleHQ6ICd3YXYnXHJcblx0fSxcclxuXHR7XHJcblx0XHR0eXBlOiAnYXVkaW8vbXA0OyBjb2RlY3M9XCJtcDRhLjQwLjJcIicsXHJcblx0XHRleHQ6ICdhYWMnXHJcblx0fSxcclxuXHR7XHJcblx0XHR0eXBlOiAnYXVkaW8vd2VibScsXHJcblx0XHRleHQ6ICd3ZWJhJ1xyXG5cdH0sXHJcblx0e1xyXG5cdFx0dHlwZTogJ2F1ZGlvL2ZsYWMnLFxyXG5cdFx0ZXh0OiAnZmxhYydcclxuXHR9XHJcbl07XHJcblxyXG52YXIgU1VQUE9SVEVEX0ZPUk1BVFMgPSBBVURJT19GT1JNQVRTLmZpbHRlcihmb3JtYXQgPT4ge1xyXG5cdHJldHVybiBhdWRpb0VsLmNhblBsYXlUeXBlKGZvcm1hdC50eXBlKSAhPT0gJyc7XHJcbn0pO1xyXG5cclxuaWYgKEF1ZGlvQ29udGV4dCkge1xyXG5cdGF1ZGlvQ29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQ7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdFNVUFBPUlRFRF9GT1JNQVRTOiBTVVBQT1JURURfRk9STUFUUyxcclxuXHRnZXRBdWRpb0NvbnRleHQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIGF1ZGlvQ29udGV4dDtcclxuXHR9XHJcbn07XHJcbiIsInZhciBhdWRpb0NvbnRleHQgPSByZXF1aXJlKCcuL2F1ZGlvJykuZ2V0QXVkaW9Db250ZXh0KCk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGF1ZGlvQ29udGV4dC5jcmVhdGVBbmFseXNlcigpOyIsIlwidXNlIHN0cmljdFwiO1xuXG5jbGFzcyBCYXNlQ29udHJvbGxlciB7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHR0aGlzLm1vZGVsID0gb3B0aW9ucy5tb2RlbDtcblx0XHR0aGlzLnZpZXcgPSBvcHRpb25zLnZpZXc7XG5cdFx0dGhpcy5iaW5kTGlzdGVuZXJzKCk7XG5cdH1cblxuXHRiaW5kTGlzdGVuZXJzKCkge31cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBCYXNlQ29udHJvbGxlcjsiLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciBCYXNlQ29udHJvbGxlciA9IHJlcXVpcmUoJy4vYmFzZScpO1xyXG5cclxuY2xhc3MgQ29udHJvbHNDb250cm9sbGVyIGV4dGVuZHMgQmFzZUNvbnRyb2xsZXIge1xyXG5cdGJpbmRMaXN0ZW5lcnMoKSB7XHJcblx0XHR0aGlzLnZpZXcub24oJ2NvbnRyb2w6cHJlc3NlZCcsIHRoaXMub25Db250cm9sUHJlc3NlZCwgdGhpcyk7XHJcblx0fVxyXG5cclxuXHRvbkNvbnRyb2xQcmVzc2VkKGNvbnRyb2xUeXBlKSB7XHJcblx0XHRzd2l0Y2goY29udHJvbFR5cGUpIHtcclxuXHRcdFx0Y2FzZSAncGxheSc6XHJcblx0XHRcdFx0dGhpcy5tb2RlbC5wbGF5aW5nU29uZyA9IHRoaXMubW9kZWwuc2VsZWN0ZWRTb25nO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdzdG9wJzpcclxuXHRcdFx0XHR0aGlzLm1vZGVsLnBsYXlpbmdTb25nID0gbnVsbDtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnZXEnOlxyXG5cdFx0XHRcdHRoaXMubW9kZWwuaXNWaXN1YWxpemluZyA9ICF0aGlzLm1vZGVsLmlzVmlzdWFsaXppbmc7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IENvbnRyb2xzQ29udHJvbGxlcjsiLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciAkJCA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzJyk7XHJcbnZhciBhdWRpbyA9IHJlcXVpcmUoJy4uLy4uL2F1ZGlvJyk7XHJcbnZhciBhdWRpb0NvbnRleHQgPSBhdWRpby5nZXRBdWRpb0NvbnRleHQoKTtcclxudmFyIEJhc2VDb250cm9sbGVyID0gcmVxdWlyZSgnLi9iYXNlJyk7XHJcblxyXG5jbGFzcyBQbGF5ZXJDb250cm9sbGVyIGV4dGVuZHMgQmFzZUNvbnRyb2xsZXIge1xyXG5cclxuXHRiaW5kTGlzdGVuZXJzKCkge1xyXG5cdFx0dGhpcy52aWV3Lm9uKCdmaWxlczphZGQnLCB0aGlzLm9uRmlsZXNBZGQsIHRoaXMpO1xyXG5cdH1cclxuXHJcblx0b25GaWxlc0FkZChmaWxlcykge1xyXG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuXHRcdHRoaXMuZmlsdGVyQXVkaW9GaWxlcyhmaWxlcykuZm9yRWFjaChmdW5jdGlvbihmaWxlKSB7XHJcblx0XHRcdFByb21pc2UuYWxsKFt0aGlzLmdldFNvbmdJbmZvKGZpbGUsIFtcInRpdGxlXCIsIFwiYXJ0aXN0XCIsIFwicGljdHVyZVwiXSksIHRoaXMuZGVjb2RlU29uZyhmaWxlKV0pXHJcblx0XHRcdFx0LnRoZW4oZnVuY3Rpb24odmFsdWVzKSB7XHJcblx0XHRcdFx0XHQkJC5hc3NpZ24odmFsdWVzWzBdLCB2YWx1ZXNbMV0sIHtmaWxlTmFtZTogZmlsZS5uYW1lfSk7XHJcblx0XHRcdFx0XHRzZWxmLm1vZGVsLmFkZFNvbmcodmFsdWVzWzBdKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdH0sIHRoaXMpO1xyXG5cdH1cclxuXHJcblx0ZmlsdGVyQXVkaW9GaWxlcyhmaWxlcykge1xyXG5cdFx0cmV0dXJuIGZpbGVzLmZpbHRlcih0aGlzLmlzQXVkaW9GaWxlLCB0aGlzKTtcclxuXHR9XHJcblxyXG5cdGlzQXVkaW9GaWxlKGZpbGUpIHtcclxuXHRcdHZhciBzdXBwb3J0ID0gZmFsc2U7XHJcblxyXG5cdFx0YXVkaW8uU1VQUE9SVEVEX0ZPUk1BVFMuZm9yRWFjaChmb3JtYXQgPT4ge1xyXG5cdFx0XHRpZihmaWxlLm5hbWUuc2VhcmNoKGZvcm1hdC5leHQpICE9PSAtMSkge1xyXG5cdFx0XHRcdHN1cHBvcnQgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gc3VwcG9ydDtcclxuXHR9XHJcblxyXG5cdGdldFNvbmdJbmZvKGZpbGUsIHRhZ3MpIHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHRcdFx0dmFyIHVybCA9IGZpbGUudXJuIHx8IGZpbGUubmFtZTtcclxuXHJcblx0XHRcdElEMy5sb2FkVGFncyh1cmwsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0dmFyIGFsbFRhZ3MgPSBJRDMuZ2V0QWxsVGFncyh1cmwpO1xyXG5cdFx0XHRcdFx0dmFyIHBpY3R1cmU7XHJcblx0XHRcdFx0XHR2YXIgcmVzdWx0ID0ge307XHJcblx0XHRcdFx0XHR2YXIgZGF0YVVybDtcclxuXHRcdFx0XHRcdHZhciBiYXNlNjRTdHJpbmc7XHJcblxyXG5cdFx0XHRcdFx0dGFncy5mb3JFYWNoKGZ1bmN0aW9uKHRhZykge1xyXG5cdFx0XHRcdFx0XHRpZiAodGFnID09PSAncGljdHVyZScgJiYgYWxsVGFncy5waWN0dXJlKSB7XHJcblx0XHRcdFx0XHRcdFx0cGljdHVyZSA9IGFsbFRhZ3MucGljdHVyZTtcclxuXHRcdFx0XHRcdFx0XHRiYXNlNjRTdHJpbmcgPSBcIlwiO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgcGljdHVyZS5kYXRhLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRiYXNlNjRTdHJpbmcgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShwaWN0dXJlLmRhdGFbaV0pO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRkYXRhVXJsID0gXCJkYXRhOlwiICsgcGljdHVyZS5mb3JtYXQgKyBcIjtiYXNlNjQsXCIgKyB3aW5kb3cuYnRvYShiYXNlNjRTdHJpbmcpO1xyXG5cdFx0XHRcdFx0XHRcdHJlc3VsdC5waWN0dXJlID0gZGF0YVVybDtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRyZXN1bHRbdGFnXSA9IGFsbFRhZ3NbdGFnXTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0cmVzb2x2ZShyZXN1bHQpO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0dGFnczogdGFncyxcclxuXHRcdFx0XHRcdGRhdGFSZWFkZXI6IEZpbGVBUElSZWFkZXIoZmlsZSksXHJcblx0XHRcdFx0XHRvbkVycm9yOiBmdW5jdGlvbihyZWFzb24pIHtcclxuXHRcdFx0XHRcdFx0cmVqZWN0KHJlYXNvbik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGRlY29kZVNvbmcoZmlsZSkge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cdFx0XHR2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuXHJcblx0XHRcdHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihmaWxlKTtcclxuXHRcdFx0cmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHZhciBidWZmZXIgPSB0aGlzLnJlc3VsdDtcclxuXHJcblx0XHRcdFx0YXVkaW9Db250ZXh0LmRlY29kZUF1ZGlvRGF0YShidWZmZXIsIGF1ZGlvQnVmZmVyID0+IHtcclxuXHRcdFx0XHRcdHJlc29sdmUoe1xyXG5cdFx0XHRcdFx0XHRhdWRpb0J1ZmZlcjogYXVkaW9CdWZmZXIsXHJcblx0XHRcdFx0XHRcdHNhbXBsZVJhdGU6IGF1ZGlvQnVmZmVyLnNhbXBsZVJhdGUsXHJcblx0XHRcdFx0XHRcdGR1cmF0aW9uOiBhdWRpb0J1ZmZlci5kdXJhdGlvblxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRyZWFkZXIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJlamVjdChyZWFkZXIuZXJyb3IpO1xyXG5cdFx0XHR9O1xyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXllckNvbnRyb2xsZXI7XHJcblxyXG5cclxuXHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyIEJhc2VDb250cm9sbGVyID0gcmVxdWlyZSgnLi9iYXNlJyk7XHJcbnZhciBTTElERVJfSElHSEVTVCA9IDIwMDtcclxudmFyIEVRVUFMSVpFUl9SQU5HRSA9IDEyO1xyXG5cclxuXHJcbmNsYXNzIEVxdWFsaXplQ29udHJvbGxlciBleHRlbmRzIEJhc2VDb250cm9sbGVyIHtcclxuXHRiaW5kTGlzdGVuZXJzKCkge1xyXG5cdFx0dGhpcy52aWV3Lm9uKCdzbGlkZXI6Y2hhbmdlZCcsIHRoaXMuc2xpZGVyQ2hhbmdlZCwgdGhpcyk7XHJcblx0fVxyXG5cclxuXHRzbGlkZXJDaGFuZ2VkKGUpIHtcclxuXHRcdHZhciByZXN1bHQ7XHJcblxyXG5cdFx0aWYgKGUudHlwZSA9PT0gJ2dhaW4nKSB7XHJcblx0XHRcdHJlc3VsdCA9IGUudmFsdWUgLyBTTElERVJfSElHSEVTVDtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRyZXN1bHQgPSBlLnZhbHVlICogRVFVQUxJWkVSX1JBTkdFICogMiAvIFNMSURFUl9ISUdIRVNUIC0gRVFVQUxJWkVSX1JBTkdFO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5tb2RlbC5lcXVhbGl6ZXJbZS50eXBlXSA9IHJlc3VsdDtcclxuXHR9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRXF1YWxpemVDb250cm9sbGVyOyIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyIEJhc2VDb250cm9sbGVyID0gcmVxdWlyZSgnLi9iYXNlJyk7XHJcblxyXG5jbGFzcyBTb25nc0xpc3RDb250cm9sbGVyIGV4dGVuZHMgQmFzZUNvbnRyb2xsZXIge1xyXG5cdGJpbmRMaXN0ZW5lcnMoKSB7XHJcblx0XHR0aGlzLnZpZXcub24oJ3Nvbmc6c2VsZWN0ZWQnLCB0aGlzLm9uU29uZ1NlbGVjdGVkLCB0aGlzKTtcclxuXHR9XHJcblxyXG5cdG9uU29uZ1NlbGVjdGVkKHNvbmdJZCkge1xyXG5cdFx0dGhpcy5tb2RlbC5zZWxlY3RlZFNvbmcgPSB0aGlzLm1vZGVsLmdldFNvbmcoTnVtYmVyKHNvbmdJZCkpO1xyXG5cdH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTb25nc0xpc3RDb250cm9sbGVyOyIsInZhciBpZCA9IDE7XHJcblxyXG5jbGFzcyBTb25nIHtcclxuXHRjb25zdHJ1Y3RvcihkYXRhKSB7XHJcblx0XHR0aGlzLmlkID0gaWQ7XHJcblx0XHR0aGlzLmF1ZGlvQnVmZmVyID0gZGF0YS5hdWRpb0J1ZmZlcjtcclxuXHRcdHRoaXMuZmlsZU5hbWUgPSBkYXRhLmZpbGVOYW1lO1xyXG5cdFx0dGhpcy50aXRsZSA9IGRhdGEudGl0bGUgfHwgJyc7XHJcblx0XHR0aGlzLmFydGlzdCA9IGRhdGEuYXJ0aXN0IHx8ICcnO1xyXG5cdFx0dGhpcy5kdXJhdGlvbiA9IE1hdGgucm91bmQoZGF0YS5kdXJhdGlvbik7XHJcblx0XHR0aGlzLnBpY3R1cmUgPSBkYXRhLnBpY3R1cmUgfHwgbnVsbDtcclxuXHRcdGlkKys7XHJcblx0fVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNvbmc7IiwidmFyIEV2ZW50cyA9IHJlcXVpcmUoJy4uLy4uL2V2ZW50cycpO1xyXG52YXIgJCQgPSByZXF1aXJlKCcuLi8uLi91dGlscycpO1xyXG52YXIgU29uZyA9IHJlcXVpcmUoJy4vc29uZycpO1xyXG5cclxuY2xhc3MgU29uZ3Mge1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0dGhpcy5zb25ncyA9IFtdO1xyXG5cdFx0dGhpcy5sZW5ndGggPSAwO1xyXG5cdH1cclxuXHJcblx0Z2V0U29uZyhpZCkge1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMuc29uZ3MubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYoaWQgPT09IHRoaXMuc29uZ3NbaV0uaWQpIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5zb25nc1tpXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YWRkU29uZyhkYXRhKSB7XHJcblx0XHR2YXIgc29uZyA9IG5ldyBTb25nKGRhdGEpO1xyXG5cdFx0dGhpcy5zb25ncy5wdXNoKHNvbmcpO1xyXG5cdFx0dGhpcy5sZW5ndGgrKztcclxuXHRcdHRoaXMudHJpZ2dlcignc29uZzphZGQnLCBzb25nKTtcclxuXHR9XHJcblxyXG5cdHJlbW92ZVNvbmcoaWQpIHtcclxuXHRcdHZhciBzb25nID0gdGhpcy5nZXRTb25nKGlkKTtcclxuXHRcdGlmKHNvbmcgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHR0aGlzLnNvbmdzLnNwbGljZShzb25nLCAxKTtcclxuXHRcdFx0dGhpcy5sZW5ndGgtLTtcclxuXHRcdFx0dGhpcy50cmlnZ2VyKCdzb25nOnJlbW92ZWQnLCBzb25nKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbiQkLmFzc2lnbihTb25ncy5wcm90b3R5cGUsIEV2ZW50cyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNvbmdzOyIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyIEV2ZW50cyA9IHJlcXVpcmUoJy4uLy4uL2V2ZW50cycpO1xyXG52YXIgJCQgPSByZXF1aXJlKCcuLi8uLi91dGlscycpO1xyXG52YXIgU29uZ3MgPSByZXF1aXJlKCcuLi9tb2RlbHMvc29uZ3MnKTtcclxuXHJcbmNsYXNzIFBsYXllclN0YXRlIHtcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHRoaXMuc29uZ3MgPSBuZXcgU29uZ3MoKTtcclxuXHRcdHRoaXMuc2VsZWN0ZWRTb25nID0gbnVsbDtcclxuXHRcdHRoaXMucGxheWluZ1NvbmcgPSBudWxsO1xyXG5cdFx0dGhpcy5pc1Zpc3VhbGl6aW5nID0gZmFsc2U7XHJcblx0XHR0aGlzLmhhdmVTb25ncyA9IGZhbHNlO1xyXG5cdFx0dGhpcy5lcXVhbGl6ZXIgPSB7XHJcblx0XHRcdCdnYWluJzogIDAsXHJcblx0XHRcdCc2MCc6ICAwLFxyXG5cdFx0XHQnMTcwJzogIDAsXHJcblx0XHRcdCczMTAnOiAgMCxcclxuXHRcdFx0JzYwMCc6ICAwLFxyXG5cdFx0XHQnMTAwMCc6ICAwLFxyXG5cdFx0XHQnMzAwMCc6ICAwLFxyXG5cdFx0XHQnNjAwMCc6ICAwLFxyXG5cdFx0XHQnMTIwMDAnOiAgMCxcclxuXHRcdFx0JzE0MDAwJzogIDAsXHJcblx0XHRcdCcxNjAwMCc6ICAwXHJcblx0XHR9O1xyXG5cdFx0JCQub2JzZXJ2ZVByb3BlcnRpZXModGhpcyk7XHJcblx0XHQkJC5hc3NpZ24odGhpcy5lcXVhbGl6ZXIsIEV2ZW50cyk7XHJcblx0XHQkJC5vYnNlcnZlUHJvcGVydGllcyh0aGlzLmVxdWFsaXplcik7XHJcblx0XHR0aGlzLmJpbmRMaXN0ZW5lcnMoKTtcclxuXHR9XHJcblxyXG5cdGJpbmRMaXN0ZW5lcnMoKSB7XHJcblx0XHR0aGlzLmVxdWFsaXplci5vbignYWxsJywgZnVuY3Rpb24oZXZlbnRUeXBlLCB2YWx1ZSl7XHJcblx0XHRcdHZhciB0eXBlID0gZXZlbnRUeXBlLnNwbGl0KFwiOlwiKVswXTtcclxuXHJcblx0XHRcdHRoaXMudHJpZ2dlcignZXF1YWxpemVyOmNoYW5nZWQnLCB7XHJcblx0XHRcdFx0dHlwZTogdHlwZSxcclxuXHRcdFx0XHR2YWx1ZTogdmFsdWVcclxuXHRcdFx0fSk7XHJcblx0XHR9LCB0aGlzKTtcclxuXHJcblx0XHR0aGlzLnNvbmdzLm9uKCdzb25nOmFkZCcsIGZ1bmN0aW9uKHNvbmcpIHtcclxuXHRcdFx0dGhpcy50cmlnZ2VyKCdzb25nOmFkZCcsIHNvbmcpO1xyXG5cdFx0XHRpZiAodGhpcy5zb25ncy5sZW5ndGggPT09IDEpIHtcclxuXHRcdFx0XHR0aGlzLmhhdmVTb25ncyA9IHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH0sIHRoaXMpO1xyXG5cclxuXHRcdHRoaXMuc29uZ3Mub24oJ3Nvbmc6cmVtb3ZlZCcsIGZ1bmN0aW9uKHNvbmcpIHtcclxuXHRcdFx0dGhpcy50cmlnZ2VyKCdzb25nOnJlbW92ZWQnLCBzb25nKTtcclxuXHRcdFx0aWYgKHRoaXMuc29uZ3MubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdFx0dGhpcy5oYXZlU29uZ3MgPSBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fSwgdGhpcyk7XHJcblx0fVxyXG5cclxuXHRnZXRTb25nKGlkKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5zb25ncy5nZXRTb25nKGlkKTtcclxuXHR9XHJcblxyXG5cdGFkZFNvbmcoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMuc29uZ3MuYWRkU29uZyhkYXRhKTtcclxuXHR9XHJcblxyXG5cdHJlbW92ZVNvbmcoaWQpIHtcclxuXHRcdHJldHVybiB0aGlzLnNvbmdzLnJlbW92ZVNvbmcoaWQpO1xyXG5cdH1cclxufVxyXG5cclxuJCQuYXNzaWduKFBsYXllclN0YXRlLnByb3RvdHlwZSwgRXZlbnRzKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUGxheWVyU3RhdGU7XHJcblxyXG5cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIgJCQgPSByZXF1aXJlKCcuLi8uLi91dGlscycpO1xyXG52YXIgRXZlbnRzID0gcmVxdWlyZSgnLi4vLi4vZXZlbnRzJyk7XHJcbnZhciBkb20gPSByZXF1aXJlKCcuLi8uLi9kb20nKTtcclxuXHJcbmNsYXNzIEJhc2VWaWV3IHtcclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcblx0XHR0aGlzLmVsID0gb3B0aW9ucy5lbDtcclxuXHRcdHRoaXMubW9kZWwgPSBvcHRpb25zLm1vZGVsO1xyXG5cdFx0dGhpcy5zdWJ2aWV3cyA9IG9wdGlvbnMuc3Vidmlld3M7XHJcblx0XHRpZihvcHRpb25zLnRlbXBsYXRlKSB7XHJcblx0XHRcdHRoaXMudGVtcGxhdGUgPSBvcHRpb25zLnRlbXBsYXRlLmNvbnRlbnQuZmlyc3RFbGVtZW50Q2hpbGQuY2xvbmVOb2RlKHRydWUpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c2hvdygpIHtcclxuXHRcdGRvbS5zaG93KHRoaXMuZWwpO1xyXG5cdH1cclxuXHJcblx0aGlkZSgpIHtcclxuXHRcdGRvbS5oaWRlKHRoaXMuZWwpO1xyXG5cdH1cclxuXHJcblx0cmVuZGVyKCkge1xyXG5cdFx0dGhpcy5lbC5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnQpO1xyXG5cdH1cclxuXHJcblx0cmVtb3ZlKCkge1xyXG5cdFx0dGhpcy5lbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZWwpO1xyXG5cdH1cclxufVxyXG5cclxuJCQuYXNzaWduKEJhc2VWaWV3LnByb3RvdHlwZSwgRXZlbnRzKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQmFzZVZpZXc7IiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIgQmFzZVZpZXcgPSByZXF1aXJlKCcuL2Jhc2UnKTtcclxudmFyIGRvbSA9IHJlcXVpcmUoJy4uLy4uL2RvbScpO1xyXG5cclxuY2xhc3MgQ29udHJvbHNWaWV3IGV4dGVuZHMgQmFzZVZpZXcge1xyXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuXHRcdHN1cGVyKG9wdGlvbnMpO1xyXG5cdFx0dGhpcy5lbGVtcyA9IHtcclxuXHRcdFx0cHJldjogZG9tLnFzKCcuanMtcHJldicpLFxyXG5cdFx0XHRuZXh0OiBkb20ucXMoJy5qcy1uZXh0JyksXHJcblx0XHRcdHBsYXk6IGRvbS5xcygnLmpzLXBsYXknKSxcclxuXHRcdFx0cGF1c2U6IGRvbS5xcygnLmpzLXBhdXNlJyksXHJcblx0XHRcdHN0b3A6IGRvbS5xcygnLmpzLXN0b3AnKSxcclxuXHRcdFx0ZXE6IGRvbS5xcygnLmpzLWVxJylcclxuXHRcdH07XHJcblx0XHR0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xyXG5cdFx0dGhpcy5zb25ncyA9IFtdO1xyXG5cdFx0dGhpcy5iaW5kTGlzdGVuZXJzKCk7XHJcblx0fVxyXG5cclxuXHRiaW5kTGlzdGVuZXJzKCkge1xyXG5cdFx0dGhpcy5lbC5vbmNsaWNrID0gdGhpcy5vbkNvbnRyb2xDbGljay5iaW5kKHRoaXMpO1xyXG5cdFx0dGhpcy5tb2RlbC5vbignc2VsZWN0ZWRTb25nOmNoYW5nZWQnLCB0aGlzLm9uU2VsZWN0ZWRTb25nQ2hhbmdlZCwgdGhpcyk7XHJcblx0XHR0aGlzLm1vZGVsLm9uKCdwbGF5aW5nU29uZzpjaGFuZ2VkJywgdGhpcy5vblBsYXlpbmdTb25nQ2hhbmdlZCwgdGhpcyk7XHJcblx0XHR0aGlzLm1vZGVsLm9uKCdzb25nOmFkZCcsIHRoaXMub25Tb25nQWRkLCB0aGlzKTtcclxuXHR9XHJcblxyXG5cdG9uU29uZ0FkZChzb25nKSB7XHJcblx0XHR0aGlzLnNvbmdzLnB1c2goc29uZy5pZCk7XHJcblx0fVxyXG5cclxuXHRvblBsYXlpbmdTb25nQ2hhbmdlZChzb25nKSB7XHJcblx0XHRpZighc29uZykge1xyXG5cdFx0XHR0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xyXG5cdFx0XHRkb20uYWRkQ2xhc3ModGhpcy5lbGVtcy5zdG9wLCAnaWNvbl9kaXNhYmxlZCcpO1xyXG5cdFx0XHRkb20ucmVtb3ZlQ2xhc3ModGhpcy5lbGVtcy5wbGF5LCAnaWNvbl9kaXNhYmxlZCcpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHRoaXMuaXNQbGF5aW5nID0gdHJ1ZTtcclxuXHRcdFx0ZG9tLnJlbW92ZUNsYXNzKHRoaXMuZWxlbXMuc3RvcCwgJ2ljb25fZGlzYWJsZWQnKTtcclxuXHRcdFx0ZG9tLmFkZENsYXNzKHRoaXMuZWxlbXMucGxheSwgJ2ljb25fZGlzYWJsZWQnKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG9uU2VsZWN0ZWRTb25nQ2hhbmdlZChzb25nKSB7XHJcblx0XHRpZighdGhpcy5pc1BsYXlpbmcpIHtcclxuXHRcdFx0ZG9tLnJlbW92ZUNsYXNzKHRoaXMuZWxlbXMucGxheSwgJ2ljb25fZGlzYWJsZWQnKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG9uQ29udHJvbENsaWNrKGUpIHtcclxuXHRcdHZhciBjb250cm9sID0gZG9tLmNsb3Nlc3QoZS50YXJnZXQsICcuanMtY29udHJvbCcpO1xyXG5cdFx0aWYoIWNvbnRyb2wgfHwgZG9tLmhhc0NsYXNzKGNvbnRyb2wsICdpY29uX2Rpc2FibGVkJykpIHJldHVybjtcclxuXHRcdHZhciBjb250cm9sVHlwZSA9IGNvbnRyb2wuZGF0YXNldC50eXBlO1xyXG5cdFx0dGhpcy50cmlnZ2VyKCdjb250cm9sOnByZXNzZWQnLCBjb250cm9sVHlwZSk7XHJcblx0fVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IENvbnRyb2xzVmlldztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIgZG9tID0gcmVxdWlyZSgnLi4vLi4vZG9tJyk7XHJcbnZhciAkJCA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzJyk7XHJcbnZhciBCYXNlVmlldyA9IHJlcXVpcmUoJy4vYmFzZScpO1xyXG5cclxuY2xhc3MgRHJvcEFyZWFWaWV3IGV4dGVuZHMgQmFzZVZpZXcge1xyXG5cclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcblx0XHRzdXBlcihvcHRpb25zKTtcclxuXHRcdHRoaXMuaGF2ZVNvbmdzID0gZmFsc2U7XHJcblxyXG5cdFx0dGhpcy5lbGVtcyA9IHtcclxuXHRcdFx0ZHJvcEhpbnQ6IGRvbS5xcygnLmpzLWRyb3AtaGludCcsIHRoaXMuZWwpXHJcblx0XHR9O1xyXG5cdFx0dGhpcy5iaW5kTGlzdGVuZXJzKCk7XHJcblx0fVxyXG5cclxuXHRiaW5kTGlzdGVuZXJzKCkge1xyXG5cdFx0dGhpcy5tb2RlbC5vbignaGF2ZVNvbmdzOmNoYW5nZWQnLCBmdW5jdGlvbih2YWx1ZSl7XHJcblx0XHRcdHRoaXMuaGF2ZVNvbmdzID0gdmFsdWU7XHJcblx0XHR9LCB0aGlzKTtcclxuXHRcdHRoaXMuZWwub25kcm9wID0gdGhpcy5vbkZpbGVEcm9wLmJpbmQodGhpcyk7XHJcblx0XHR0aGlzLmVsLm9uZHJhZ2VudGVyID0gdGhpcy5vbkZpbGVFbnRlci5iaW5kKHRoaXMpO1xyXG5cdFx0dGhpcy5lbC5vbmRyYWdvdmVyID0gdGhpcy5vbkZpbGVEcmFnLmJpbmQodGhpcyk7XHJcblx0XHR0aGlzLmVsZW1zLmRyb3BIaW50Lm9uZHJhZ2xlYXZlID0gdGhpcy5vbkZpbGVMZWF2ZS5iaW5kKHRoaXMpO1xyXG5cdH1cclxuXHJcblx0b25GaWxlRHJhZyhlKSB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0fVxyXG5cclxuXHRvbkZpbGVEcm9wKGUpIHtcclxuXHRcdHZhciBmaWxlcyA9IFtdLnNsaWNlLmNhbGwoZS5kYXRhVHJhbnNmZXIuZmlsZXMpO1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0dGhpcy50cmlnZ2VyKCdmaWxlczphZGQnLCBmaWxlcyk7XHJcblx0XHRkb20uaGlkZSh0aGlzLmVsZW1zLmRyb3BIaW50KTtcclxuXHR9XHJcblxyXG5cdG9uRmlsZUxlYXZlKCkge1xyXG5cdFx0aWYgKHRoaXMuaGF2ZVNvbmdzKSB7XHJcblx0XHRcdGRvbS5oaWRlKHRoaXMuZWxlbXMuZHJvcEhpbnQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0b25GaWxlRW50ZXIoZSkge1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdGRvbS5zaG93KHRoaXMuZWxlbXMuZHJvcEhpbnQpO1xyXG5cdH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBEcm9wQXJlYVZpZXc7XHJcblxyXG5cclxuXHJcblxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciBkb20gPSByZXF1aXJlKCcuLi8uLi9kb20nKTtcclxudmFyICQkID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMnKTtcclxudmFyIEJhc2VWaWV3ID0gcmVxdWlyZSgnLi9iYXNlJyk7XHJcblxyXG5jbGFzcyBFcXVhbGl6ZXJWaWV3IGV4dGVuZHMgQmFzZVZpZXcge1xyXG5cclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcblx0XHRzdXBlcihvcHRpb25zKTtcclxuXHRcdFxyXG5cdFx0dGhpcy5zbGlkZXJzID0ge1xyXG5cdFx0XHQnZ2Fpbic6ICBkb20ucXMoJ1tkYXRhLXR5cGU9XCJnYWluXCJdJywgdGhpcy5lbCksXHJcblx0XHRcdCc2MCc6ICBkb20ucXMoJ1tkYXRhLXR5cGU9XCI2MFwiXScsIHRoaXMuZWwpLFxyXG5cdFx0XHQnMTcwJzogIGRvbS5xcygnW2RhdGEtdHlwZT1cIjE3MFwiXScsIHRoaXMuZWwpLFxyXG5cdFx0XHQnMzEwJzogIGRvbS5xcygnW2RhdGEtdHlwZT1cIjMxMFwiXScsIHRoaXMuZWwpLFxyXG5cdFx0XHQnNjAwJzogIGRvbS5xcygnW2RhdGEtdHlwZT1cIjYwMFwiXScsIHRoaXMuZWwpLFxyXG5cdFx0XHQnMTAwMCc6ICBkb20ucXMoJ1tkYXRhLXR5cGU9XCIxMDAwXCJdJywgdGhpcy5lbCksXHJcblx0XHRcdCczMDAwJzogIGRvbS5xcygnW2RhdGEtdHlwZT1cIjMwMDBcIl0nLCB0aGlzLmVsKSxcclxuXHRcdFx0JzYwMDAnOiAgZG9tLnFzKCdbZGF0YS10eXBlPVwiNjAwMFwiXScsIHRoaXMuZWwpLFxyXG5cdFx0XHQnMTIwMDAnOiAgZG9tLnFzKCdbZGF0YS10eXBlPVwiMTIwMDBcIl0nLCB0aGlzLmVsKSxcclxuXHRcdFx0JzE0MDAwJzogIGRvbS5xcygnW2RhdGEtdHlwZT1cIjE0MDAwXCJdJywgdGhpcy5lbCksXHJcblx0XHRcdCcxNjAwMCc6ICBkb20ucXMoJ1tkYXRhLXR5cGU9XCIxNjAwMFwiXScsIHRoaXMuZWwpXHJcblx0XHR9O1xyXG5cclxuXHRcdHRoaXMuc2xpZGVyc0Nvb3JkcyA9IHtcclxuXHRcdFx0J2dhaW4nOiAgdGhpcy5zbGlkZXJzWydnYWluJ10uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcblx0XHRcdCc2MCc6ICB0aGlzLnNsaWRlcnNbJzYwJ10uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcblx0XHRcdCcxNzAnOiAgdGhpcy5zbGlkZXJzWycxNzAnXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuXHRcdFx0JzMxMCc6ICB0aGlzLnNsaWRlcnNbJzMxMCddLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxyXG5cdFx0XHQnNjAwJzogIHRoaXMuc2xpZGVyc1snNjAwJ10uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcblx0XHRcdCcxMDAwJzogIHRoaXMuc2xpZGVyc1snMTAwMCddLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxyXG5cdFx0XHQnMzAwMCc6ICB0aGlzLnNsaWRlcnNbJzMwMDAnXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuXHRcdFx0JzYwMDAnOiAgdGhpcy5zbGlkZXJzWyc2MDAwJ10uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcblx0XHRcdCcxMjAwMCc6ICB0aGlzLnNsaWRlcnNbJzEyMDAwJ10uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcblx0XHRcdCcxNDAwMCc6ICB0aGlzLnNsaWRlcnNbJzE0MDAwJ10uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcblx0XHRcdCcxNjAwMCc6ICB0aGlzLnNsaWRlcnNbJzE2MDAwJ10uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcclxuXHRcdH07XHJcblxyXG5cdFx0dGhpcy5hY3RpdmVTbGlkZXIgPSBudWxsO1xyXG5cclxuXHRcdHRoaXMuc2xpZGVyU2hpZnQgPSB7XHJcblx0XHRcdHNoaWZ0WDogbnVsbCxcclxuXHRcdFx0c2hpZnRZOiBudWxsXHJcblx0XHR9O1xyXG5cdFx0dGhpcy5iaW5kTGlzdGVuZXJzKCk7XHJcblx0fVxyXG5cclxuXHRiaW5kTGlzdGVuZXJzKCkge1xyXG5cdFx0dGhpcy5tb2RlbC5vbignaXNWaXN1YWxpemluZzpjaGFuZ2VkJywgdGhpcy5vblZpc3VhbGl6aW5nQ2hhbmdlZCwgdGhpcyk7XHJcblx0XHR3aW5kb3cub25yZXNpemUgPSB0aGlzLnJlY2FsY1NsaWRlcnNDb29yZHMuYmluZCh0aGlzKTtcclxuXHRcdHRoaXMuZWwub25tb3VzZWRvd24gPSB0aGlzLm9uVGh1bWJNb3VzZURvd24uYmluZCh0aGlzKTtcclxuXHRcdHRoaXMuZWwub25kcmFnc3RhcnQgPSB0aGlzLm9uRHJhZ1N0YXJ0LmJpbmQodGhpcyk7XHJcblx0fVxyXG5cclxuXHRvblZpc3VhbGl6aW5nQ2hhbmdlZCgpIHtcclxuXHRcdCBzZXRUaW1lb3V0KHRoaXMucmVjYWxjU2xpZGVyc0Nvb3Jkcy5iaW5kKHRoaXMpLCAwKTtcclxuXHR9XHJcblxyXG5cdG9uVGh1bWJNb3VzZURvd24oZSkge1xyXG5cdFx0dmFyIHRhcmdldCA9IGUudGFyZ2V0O1xyXG5cdFx0dmFyXHR0aHVtYkNvb3JkcztcclxuXHJcblx0XHRpZiAoIWRvbS5oYXNDbGFzcyhlLnRhcmdldCwgJ2pzLXRodW1iJykpIHJldHVybjtcclxuXHJcblx0XHR0aHVtYkNvb3JkcyA9IHRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHRcdHRoaXMuYWN0aXZlVGh1bWIgPSB0YXJnZXQ7XHJcblx0XHR0aGlzLmFjdGl2ZVNsaWRlciA9IGRvbS5jbG9zZXN0KHRhcmdldCwgJy5qcy1zbGlkZXInKTtcclxuXHRcdHRoaXMuc2xpZGVyU2hpZnQuc2hpZnRYID0gZS5wYWdlWCAtIHRodW1iQ29vcmRzLmxlZnQ7XHJcblx0XHR0aGlzLnNsaWRlclNoaWZ0LnNoaWZ0WSA9IGUucGFnZVkgLSB0aHVtYkNvb3Jkcy50b3A7XHJcblx0XHRkb2N1bWVudC5vbm1vdXNlbW92ZSA9IHRoaXMub25Eb2N1bWVudE1vdXNlTW92ZS5iaW5kKHRoaXMpO1xyXG5cdFx0ZG9jdW1lbnQub25tb3VzZXVwID0gdGhpcy5vbkRvY3VtZW50TW91c2VVcC5iaW5kKHRoaXMpO1xyXG5cdH1cclxuXHJcblx0b25Eb2N1bWVudE1vdXNlTW92ZShlKSB7XHJcblx0XHR2YXIgdHlwZSA9IHRoaXMuYWN0aXZlU2xpZGVyLmRhdGFzZXQudHlwZTtcclxuXHRcdHZhciB5ID0gZS5jbGllbnRZIC0gdGhpcy5zbGlkZXJTaGlmdC5zaGlmdFkgLSB0aGlzLnNsaWRlcnNDb29yZHNbdHlwZV0udG9wO1xyXG5cdFx0dGhpcy5tb3ZlVGh1bWIoeSk7XHJcblx0fVxyXG5cclxuXHRvbkRvY3VtZW50TW91c2VVcChlKSB7XHJcblx0XHRkb2N1bWVudC5vbm1vdXNlbW92ZSA9IG51bGw7XHJcblx0XHRkb2N1bWVudC5vbm1vdXNldXAgPSBudWxsO1xyXG5cdFx0dGhpcy5hY3RpdmVTbGlkZXIgPSBudWxsO1xyXG5cdFx0dGhpcy5hY3RpdmVUaHVtYiA9IG51bGw7XHJcblx0XHR0aGlzLnNsaWRlclNoaWZ0LnNoaWZ0WCA9IG51bGw7XHJcblx0XHR0aGlzLnNsaWRlclNoaWZ0LnNoaWZ0WSA9IG51bGw7XHJcblx0fVxyXG5cclxuXHRjaGVja0Nvb3Jkcyh5KSB7XHJcblx0XHR2YXIgdG9wRWRnZTtcclxuXHJcblx0XHRpZih5IDwgMCkge1xyXG5cdFx0XHR5ID0gMDtcclxuXHRcdH1cclxuXHRcdHRvcEVkZ2UgPSB0aGlzLmFjdGl2ZVNsaWRlci5vZmZzZXRIZWlnaHQgLSB0aGlzLmFjdGl2ZVRodW1iLm9mZnNldEhlaWdodDtcclxuXHRcdGlmKHkgPiB0b3BFZGdlKSB7XHJcblx0XHRcdHkgPSB0b3BFZGdlO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHk7XHJcblx0fVxyXG5cclxuXHRtb3ZlVGh1bWIoeSkge1xyXG5cdFx0dmFyIHR5cGUgPSB0aGlzLmFjdGl2ZVNsaWRlci5kYXRhc2V0LnR5cGU7XHJcblx0XHR5ID0gdGhpcy5jaGVja0Nvb3Jkcyh5KTtcclxuXHRcdHRoaXMuYWN0aXZlVGh1bWIuc3R5bGUudG9wID0geSArICdweCc7XHJcblx0XHR0aGlzLnRyaWdnZXIoJ3NsaWRlcjpjaGFuZ2VkJywge3R5cGU6IHR5cGUsIHZhbHVlOiBNYXRoLmFicyh5IC0gMjAwKX0pO1xyXG5cdH1cclxuXHJcblx0b25EcmFnU3RhcnQoKSB7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cdFxyXG5cdHJlY2FsY1NsaWRlcnNDb29yZHMoKSB7XHJcblx0XHRPYmplY3Qua2V5cyh0aGlzLnNsaWRlcnMpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XHJcblx0XHRcdHRoaXMuc2xpZGVyc0Nvb3Jkc1trZXldID0gdGhpcy5zbGlkZXJzW2tleV0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblx0XHR9LCB0aGlzKTtcclxuXHR9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRXF1YWxpemVyVmlldzsiLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciBCYXNlVmlldyA9IHJlcXVpcmUoJy4vYmFzZScpO1xyXG52YXIgYXVkaW9Db250ZXh0ID0gcmVxdWlyZSgnLi4vLi4vYXVkaW8nKS5nZXRBdWRpb0NvbnRleHQoKTtcclxudmFyIEZSRVFVRU5DSUVTID0gWzYwLCAxNzAsIDMxMCwgNjAwLCAxMDAwLCAzMDAwLCA2MDAwLCAxMjAwMCwgMTQwMDAsIDE2MDAwXTtcclxudmFyIGFuYWx5c2VyID0gcmVxdWlyZSgnLi4vLi4vYXVkaW9fYW5hbHlzZXInKTtcclxudmFyIGRvbSA9IHJlcXVpcmUoJy4uLy4uL2RvbScpO1xyXG5cclxuY2xhc3MgUGxheWVyVmlldyBleHRlbmRzIEJhc2VWaWV3IHtcclxuXHJcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xyXG5cdFx0c3VwZXIob3B0aW9ucyk7XHJcblx0XHR0aGlzLmdhaW4gPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpO1xyXG5cdFx0dGhpcy5maWx0ZXJzID0gdGhpcy5jcmVhdGVGaWx0ZXJzKEZSRVFVRU5DSUVTKTtcclxuXHRcdHRoaXMuYW5hbHlzZXIgPSBhbmFseXNlcjtcclxuXHRcdHRoaXMuZWxlbXMgPSB7XHJcblx0XHRcdHZpc3VhbGl6ZXI6IGRvbS5xcygnLmpzLXZpc3VhbGl6ZXInLCB0aGlzLmVsKSxcclxuXHRcdFx0ZXF1YWxpemVyOiBkb20ucXMoJy5qcy1lcXVhbGl6ZXInLCB0aGlzLmVsKVxyXG5cdFx0fTtcclxuXHRcdHRoaXMuYmluZExpc3RlbmVycygpO1xyXG5cdH1cclxuXHJcblx0YmluZExpc3RlbmVycygpIHtcclxuXHRcdHRoaXMubW9kZWwub24oJ2lzVmlzdWFsaXppbmc6Y2hhbmdlZCcsIHRoaXMub25WaXN1YWxpemluZ0NoYW5nZWQsIHRoaXMpO1xyXG5cdFx0dGhpcy5tb2RlbC5vbigncGxheWluZ1Nvbmc6Y2hhbmdlZCcsIHRoaXMub25QbGF5aW5nU29uZ0NoYW5nZWQsIHRoaXMpO1xyXG5cdFx0dGhpcy5tb2RlbC5vbignZXF1YWxpemVyOmNoYW5nZWQnLCB0aGlzLm9uRXF1YWxpemVyQ2hhbmdlZCwgdGhpcyk7XHJcblx0fVxyXG5cclxuXHRvbkVxdWFsaXplckNoYW5nZWQoZSkge1xyXG5cdFx0dmFyIGZpbHRlckluZGV4O1xyXG5cclxuXHRcdGlmIChlLnR5cGUgPT09ICdnYWluJykge1xyXG5cdFx0XHR0aGlzLmdhaW4uZ2Fpbi52YWx1ZSA9IGUudmFsdWU7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0ZmlsdGVySW5kZXggPSBGUkVRVUVOQ0lFUy5pbmRleE9mKE51bWJlcihlLnR5cGUpKTtcclxuXHRcdFx0dGhpcy5maWx0ZXJzW2ZpbHRlckluZGV4XS5nYWluLnZhbHVlID0gZS52YWx1ZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG9uVmlzdWFsaXppbmdDaGFuZ2VkKGlzVmlzdWFsaXppbmcpIHtcclxuXHRcdGlmIChpc1Zpc3VhbGl6aW5nKSB7XHJcblx0XHRcdGRvbS5oaWRlKHRoaXMuZWxlbXMuZXF1YWxpemVyKTtcclxuXHRcdFx0ZG9tLnNob3codGhpcy5lbGVtcy52aXN1YWxpemVyKTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRkb20uaGlkZSh0aGlzLmVsZW1zLnZpc3VhbGl6ZXIpO1xyXG5cdFx0XHRkb20uc2hvdyh0aGlzLmVsZW1zLmVxdWFsaXplcik7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRvblBsYXlpbmdTb25nQ2hhbmdlZChzb25nKSB7XHJcblx0XHRpZighc29uZykge1xyXG5cdFx0XHR0aGlzLnN0b3BTb25nKCk7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhpcy5wbGF5U29uZyhzb25nKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHBsYXlTb25nKHNvbmcpIHtcclxuXHRcdHRoaXMucGxheShzb25nLmF1ZGlvQnVmZmVyKTtcclxuXHR9XHJcblxyXG5cdHN0b3BTb25nKCkge1xyXG5cdFx0dGhpcy5zdG9wKCk7XHJcblx0fVxyXG5cclxuXHRjcmVhdGVGaWx0ZXJzKGZyZXF1ZW5jaWVzKSB7XHJcblx0XHR2YXIgZmlsdGVycyA9IGZyZXF1ZW5jaWVzLm1hcCh0aGlzLmNyZWF0ZUZpbHRlcik7XHJcblxyXG5cdFx0ZmlsdGVycy5yZWR1Y2UoZnVuY3Rpb24ocHJldiwgY3Vycikge1xyXG5cdFx0XHRwcmV2LmNvbm5lY3QoY3Vycik7XHJcblx0XHRcdHJldHVybiBjdXJyO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIGZpbHRlcnM7XHJcblx0fVxyXG5cclxuXHRjcmVhdGVGaWx0ZXIoZnJlcXVlbmN5KSB7XHJcblx0XHR2YXIgZmlsdGVyID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJpcXVhZEZpbHRlcigpO1xyXG5cclxuXHRcdGZpbHRlci50eXBlID0gJ3BlYWtpbmcnO1xyXG5cdFx0ZmlsdGVyLmZyZXF1ZW5jeS52YWx1ZSA9IGZyZXF1ZW5jeTtcclxuXHRcdGZpbHRlci5RLnZhbHVlID0gMTtcclxuXHRcdGZpbHRlci5nYWluLnZhbHVlID0gMDtcclxuXHJcblx0XHRyZXR1cm4gZmlsdGVyO1xyXG5cdH1cclxuXHJcblx0cGxheShhdWRpb0J1ZmZlcikge1xyXG5cdFx0dGhpcy5hdWRpb1NvdXJjZSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcclxuXHRcdHRoaXMuYXVkaW9Tb3VyY2UuYnVmZmVyID0gYXVkaW9CdWZmZXI7XHJcblx0XHR0aGlzLmF1ZGlvU291cmNlLmNvbm5lY3QodGhpcy5nYWluKTtcclxuXHJcblx0XHR0aGlzLmdhaW4uY29ubmVjdCh0aGlzLmZpbHRlcnNbMF0pO1xyXG5cdFx0dGhpcy5maWx0ZXJzW3RoaXMuZmlsdGVycy5sZW5ndGggLSAxXS5jb25uZWN0KHRoaXMuYW5hbHlzZXIpO1xyXG5cdFx0dGhpcy5hbmFseXNlci5jb25uZWN0KGF1ZGlvQ29udGV4dC5kZXN0aW5hdGlvbik7XHJcblx0XHR0aGlzLmF1ZGlvU291cmNlLnN0YXJ0KDApO1xyXG5cdH1cclxuXHJcblx0c3RvcCgpIHtcclxuXHRcdHRoaXMuYXVkaW9Tb3VyY2Uuc3RvcCgwKTtcclxuXHR9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUGxheWVyVmlldztcclxuXHJcblxyXG5cclxuXHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyIEJhc2VWaWV3ID0gcmVxdWlyZSgnLi9iYXNlJyk7XHJcbnZhciBkb20gPSByZXF1aXJlKCcuLi8uLi9kb20nKTtcclxuXHJcbmNsYXNzIFNvbmdEZXRhaWxzVmlldyBleHRlbmRzIEJhc2VWaWV3IHtcclxuXHJcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xyXG5cdFx0c3VwZXIob3B0aW9ucyk7XHJcblx0XHR0aGlzLmVsZW1zID0ge1xyXG5cdFx0XHRjb3ZlcjogZG9tLnFzKCcuanMtY292ZXInLCB0aGlzLmVsKSxcclxuXHRcdFx0dGl0bGU6IGRvbS5xcygnLmpzLXRpdGxlJywgdGhpcy5lbCksXHJcblx0XHRcdGFydGlzdDogZG9tLnFzKCcuanMtYXJ0aXN0JywgdGhpcy5lbCksXHJcblx0XHRcdGZpbGVOYW1lOiBkb20ucXMoJy5qcy1maWxlbmFtZScsIHRoaXMuZWwpXHJcblx0XHR9O1xyXG5cdFx0dGhpcy5kZWZhdWx0UGljdHVyZSA9IHRoaXMuZWxlbXMuY292ZXIuc3JjO1xyXG5cdFx0dGhpcy5wbGF5aW5nU29uZyA9IG51bGw7XHJcblxyXG5cdFx0dGhpcy5iaW5kTGlzdGVuZXJzKCk7XHJcblx0fVxyXG5cclxuXHRiaW5kTGlzdGVuZXJzKCkge1xyXG5cdFx0dGhpcy5tb2RlbC5vbignc2VsZWN0ZWRTb25nOmNoYW5nZWQnLCB0aGlzLm9uU2VsZWN0ZWRTb25nQ2hhbmdlZCwgdGhpcyk7XHJcblx0XHR0aGlzLm1vZGVsLm9uKCdwbGF5aW5nU29uZzpjaGFuZ2VkJywgZnVuY3Rpb24oc29uZyl7XHJcblx0XHRcdHRoaXMucGxheWluZ1NvbmcgPSBzb25nO1xyXG5cdFx0fSwgdGhpcyk7XHJcblx0fVxyXG5cclxuXHRvblNlbGVjdGVkU29uZ0NoYW5nZWQoc29uZykge1xyXG5cdFx0aWYgKHRoaXMucGxheWluZ1NvbmcpIHJldHVybjtcclxuXHJcblx0XHRpZihzb25nLnBpY3R1cmUpIHtcclxuXHRcdFx0dGhpcy5lbGVtcy5jb3Zlci5zcmMgPSBzb25nLnBpY3R1cmU7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhpcy5lbGVtcy5jb3Zlci5zcmMgPSB0aGlzLmRlZmF1bHRQaWN0dXJlO1xyXG5cdFx0fVxyXG5cdFx0aWYgKCFzb25nLnRpdGxlKSB7XHJcblx0XHRcdHRoaXMuZWxlbXMuZmlsZU5hbWUudGV4dENvbnRlbnQgPSAnJztcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aGlzLmVsZW1zLmZpbGVOYW1lLnRleHRDb250ZW50ID0gc29uZy5maWxlTmFtZTtcclxuXHRcdH1cclxuXHRcdHRoaXMuZWxlbXMudGl0bGUudGV4dENvbnRlbnQgPSBzb25nLnRpdGxlIHx8IHNvbmcuZmlsZU5hbWU7XHJcblx0XHR0aGlzLmVsZW1zLmFydGlzdC50ZXh0Q29udGVudCA9IHNvbmcuYXJ0aXN0IHx8ICcnO1xyXG5cdH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTb25nRGV0YWlsc1ZpZXc7IiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIgJCQgPSByZXF1aXJlKCcuLi8uLi91dGlscycpO1xyXG52YXIgRXZlbnRzID0gcmVxdWlyZSgnLi4vLi4vZXZlbnRzJyk7XHJcbnZhciBkb20gPSByZXF1aXJlKCcuLi8uLi9kb20nKTtcclxudmFyIEJhc2VWaWV3ID0gcmVxdWlyZSgnLi9iYXNlJyk7XHJcblxyXG5jbGFzcyBTb25nc0xpc3RWaWV3IGV4dGVuZHMgQmFzZVZpZXcge1xyXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuXHRcdHN1cGVyKG9wdGlvbnMpO1xyXG5cdFx0dGhpcy5lbGVtcyA9IHtcclxuXHRcdFx0cGxhY2Vob2xkZXI6IGRvbS5xcygnLmpzLXBsYWNlaG9sZGVyJywgdGhpcy5lbClcclxuXHRcdH07XHJcblx0XHR0aGlzLmJpbmRMaXN0ZW5lcnMoKTtcclxuXHR9XHJcblxyXG5cdGJpbmRMaXN0ZW5lcnMoKSB7XHJcblx0XHR0aGlzLm1vZGVsLm9uKCdzb25nOmFkZCcsIHRoaXMub25Tb25nQWRkLCB0aGlzKTtcclxuXHRcdHRoaXMuZWwub25jbGljayA9IHRoaXMub25Tb25nQ2xpY2suYmluZCh0aGlzKTtcclxuXHR9XHJcblxyXG5cdG9uU29uZ0NsaWNrKGUpIHtcclxuXHRcdHZhciB0YXJnZXQgPSBlLnRhcmdldDtcclxuXHRcdHZhciBzb25nRWwgPSBkb20uY2xvc2VzdCh0YXJnZXQsICcuanMtc29uZycpO1xyXG5cclxuXHRcdHRoaXMuc2VsZWN0U29uZyhzb25nRWwpO1xyXG5cdFx0dGhpcy50cmlnZ2VyKCdzb25nOnNlbGVjdGVkJywgc29uZ0VsLmRhdGFzZXQuaWQpO1xyXG5cdH1cclxuXHJcblx0b25Tb25nQWRkKHNvbmcpIHtcclxuXHRcdHZhciBzb25nRWwgPSB0aGlzLmNyZWF0ZVNvbmdFbChzb25nKTtcclxuXHJcblx0XHRpZighdGhpcy5oYXZlU29uZ3MpIHtcclxuXHRcdFx0dGhpcy5lbGVtcy5wbGFjZWhvbGRlci5yZW1vdmUoKTtcclxuXHRcdH1cclxuXHRcdHRoaXMuaGF2ZVNvbmdzID0gdHJ1ZTtcclxuXHRcdHRoaXMuZWwuYXBwZW5kQ2hpbGQoc29uZ0VsKTtcclxuXHR9XHJcblxyXG5cdHNlbGVjdFNvbmcoc29uZ0VsKSB7XHJcblx0XHQkJC50b0FycmF5KHNvbmdFbC5wYXJlbnROb2RlLmNoaWxkcmVuKVxyXG5cdFx0XHQuZmlsdGVyKGVsID0+IGVsICE9PSBzb25nRWwpXHJcblx0XHRcdC5mb3JFYWNoKGVsID0+IGRvbS5yZW1vdmVDbGFzcyhlbCwgJ3NvbmctaXRlbV9zZWxlY3RlZCcpKTtcclxuXHJcblx0XHRkb20uYWRkQ2xhc3Moc29uZ0VsLCAnc29uZy1pdGVtX3NlbGVjdGVkJyk7XHJcblx0fVxyXG5cclxuXHRjcmVhdGVTb25nRWwoc29uZykge1xyXG5cdFx0dmFyIHNvbmdFbCA9IHRoaXMudGVtcGxhdGUuY2xvbmVOb2RlKHRydWUpO1xyXG5cdFx0dmFyIHRpdGxlID0gZG9tLnFzKCcuanMtc29uZy10aXRsZScsIHNvbmdFbCk7XHJcblx0XHR2YXIgYXJ0aXN0ID0gZG9tLnFzKCcuanMtc29uZy1hcnRpc3QnLCBzb25nRWwpO1xyXG5cdFx0dmFyIGNvdmVyID0gZG9tLnFzKCcuanMtc29uZy1jb3ZlcicsIHNvbmdFbCk7XHJcblx0XHR2YXIgZHVyYXRpb24gPSBkb20ucXMoJy5qcy1zb25nLWR1cmF0aW9uJywgc29uZ0VsKTtcclxuXHJcblx0XHR0aXRsZS50ZXh0Q29udGVudCA9IHNvbmcudGl0bGUgfHwgc29uZy5maWxlTmFtZTtcclxuXHRcdGFydGlzdC50ZXh0Q29udGVudCA9IHNvbmcuYXJ0aXN0O1xyXG5cclxuXHRcdGR1cmF0aW9uLnRleHRDb250ZW50ID0gdGhpcy5mb3JtYXREdXJhdGlvbihzb25nLmR1cmF0aW9uKTtcclxuXHRcdHNvbmdFbC5kYXRhc2V0LmlkID0gc29uZy5pZDtcclxuXHRcdGlmKHNvbmcucGljdHVyZSkge1xyXG5cdFx0XHRjb3Zlci5zcmMgPSBzb25nLnBpY3R1cmU7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHNvbmdFbDtcclxuXHR9XHJcblxyXG5cdGZvcm1hdER1cmF0aW9uKHNlY3MpIHtcclxuXHRcdHZhciBtaW51dGVzID0gTWF0aC5mbG9vcihzZWNzIC8gNjApO1xyXG5cdFx0dmFyIHNlY29uZHMgPSBzZWNzICUgNjA7XHJcblxyXG5cdFx0aWYoc2Vjb25kcy50b1N0cmluZygpLmxlbmd0aCA9PT0gMSkge1xyXG5cdFx0XHRzZWNvbmRzID0gJzAnICsgc2Vjb25kcztcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gYCR7bWludXRlc306JHtzZWNvbmRzfWA7XHJcblx0fVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNvbmdzTGlzdFZpZXc7ICIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyIEJhc2VWaWV3ID0gcmVxdWlyZSgnLi9iYXNlJyk7XHJcbnZhciBkb20gPSByZXF1aXJlKCcuLi8uLi9kb20nKTtcclxudmFyIGF1ZGlvID0gcmVxdWlyZSgnLi4vLi4vYXVkaW8nKTtcclxudmFyIGFuYWx5c2VyID0gcmVxdWlyZSgnLi4vLi4vYXVkaW9fYW5hbHlzZXInKTtcclxuXHJcbmNsYXNzIFZpc3VhbGl6ZXJWaWV3IGV4dGVuZHMgQmFzZVZpZXcge1xyXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuXHRcdHN1cGVyKG9wdGlvbnMpO1xyXG5cclxuXHRcdHRoaXMuZWxlbXMgPSB7XHJcblx0XHRcdGNhbnZhczogZG9tLnFzKCcuanMtY2FudmFzJywgdGhpcy5lbClcclxuXHRcdH07XHJcblx0XHR0aGlzLmZyYW1lSWQgPSBudWxsO1xyXG5cdFx0dGhpcy5jYW52YXNXID0gdGhpcy5lbGVtcy5jYW52YXMub2Zmc2V0V2lkdGg7XHJcblx0XHR0aGlzLmNhbnZhc0ggPSB0aGlzLmVsZW1zLmNhbnZhcy5vZmZzZXRIZWlnaHQ7XHJcblx0XHR0aGlzLmNhbnZhc0N0eCA9IHRoaXMuZWxlbXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcblx0XHR0aGlzLmJpbmRMaXN0ZW5lcnMoKTtcclxuXHR9XHJcblxyXG5cdGJpbmRMaXN0ZW5lcnMoKSB7XHJcblx0XHR0aGlzLm1vZGVsLm9uKCdwbGF5aW5nU29uZzpjaGFuZ2VkJywgdGhpcy5vblBsYXlpbmdTb25nQ2hhbmdlZCwgdGhpcyk7XHJcblx0fVxyXG5cclxuXHRvblBsYXlpbmdTb25nQ2hhbmdlZChzb25nKSB7XHJcblx0XHRpZihzb25nKSB7XHJcblx0XHRcdHRoaXMuc3RhcnRWaXN1YWxpemF0aW9uKCk7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhpcy5zdG9wVmlzdWFsaXphdGlvbigpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Y2xlYXJDYW52YXMoKSB7XHJcblx0XHR0aGlzLmNhbnZhc0N0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXNXLCB0aGlzLmNhbnZhc0gpO1xyXG5cdH1cclxuXHJcblx0c3RvcFZpc3VhbGl6YXRpb24oKSB7XHJcblx0XHRjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmZyYW1lSWQpO1xyXG5cdFx0dGhpcy5jbGVhckNhbnZhcygpO1xyXG5cdH1cclxuXHJcblx0c3RhcnRWaXN1YWxpemF0aW9uKCkge1xyXG5cdFx0dmFyIGk7XHJcblx0XHR2YXIgeCA9IDA7XHJcblx0XHR2YXIgdjtcclxuXHRcdHZhciB5O1xyXG5cdFx0dmFyIHNsaWNlV2lkdGg7XHJcblx0XHR2YXIgYnVmZmVyTGVuZ3RoID0gYW5hbHlzZXIuZnJlcXVlbmN5QmluQ291bnQ7XHJcblx0XHR2YXIgZGF0YUFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyTGVuZ3RoKTtcclxuXHJcblx0XHR0aGlzLmNsZWFyQ2FudmFzKCk7XHJcblx0XHR0aGlzLmZyYW1lSWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5zdGFydFZpc3VhbGl6YXRpb24uYmluZCh0aGlzKSk7XHJcblx0XHRhbmFseXNlci5nZXRCeXRlVGltZURvbWFpbkRhdGEoZGF0YUFycmF5KTtcclxuXHRcdHRoaXMuY2FudmFzQ3R4LmxpbmVXaWR0aCA9IDE7XHJcblx0XHR0aGlzLmNhbnZhc0N0eC5zdHJva2VTdHlsZSA9ICdyZWQnO1xyXG5cdFx0dGhpcy5jYW52YXNDdHguYmVnaW5QYXRoKCk7XHJcblxyXG5cdFx0c2xpY2VXaWR0aCA9IHRoaXMuY2FudmFzVyAqIDEuMCAvIGJ1ZmZlckxlbmd0aDtcclxuXHJcblx0XHRmb3IoaSA9IDA7IGkgPCBidWZmZXJMZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2ID0gZGF0YUFycmF5W2ldIC8gMTI4LjA7XHJcblx0XHRcdHkgPSB2ICogdGhpcy5jYW52YXNIIC8gMjtcclxuXHJcblx0XHRcdGlmKGkgPT09IDApIHtcclxuXHRcdFx0XHR0aGlzLmNhbnZhc0N0eC5tb3ZlVG8oeCwgeSk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5jYW52YXNDdHgubGluZVRvKHgsIHkpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR4ICs9IHNsaWNlV2lkdGg7XHJcblx0XHR9XHJcblx0XHR0aGlzLmNhbnZhc0N0eC5saW5lVG8odGhpcy5jYW52YXNXLCB0aGlzLmNhbnZhc0ggLyAyKTtcclxuXHRcdHRoaXMuY2FudmFzQ3R4LmNsb3NlUGF0aCgpO1xyXG5cdFx0dGhpcy5jYW52YXNDdHguc3Ryb2tlKCk7XHJcblx0fVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFZpc3VhbGl6ZXJWaWV3OyIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyICQkID0gcmVxdWlyZSgnLi91dGlscycpO1xyXG5cclxudmFyIGRvbSA9IHtcclxuXHRieUlkOiBmdW5jdGlvbihpZCkge1xyXG5cdFx0cmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxuXHR9LFxyXG5cdHFzOiBmdW5jdGlvbihzZWxlY3RvciwgY29udGV4dCkge1xyXG5cdFx0Y29udGV4dCA9IGNvbnRleHQgfHwgZG9jdW1lbnQ7XHJcblx0XHRyZXR1cm4gY29udGV4dC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcclxuXHR9LFxyXG5cdHFzYTogZnVuY3Rpb24oc2VsZWN0b3IsIGNvbnRleHQpIHtcclxuXHRcdGNvbnRleHQgPSBjb250ZXh0IHx8IGRvY3VtZW50O1xyXG5cdFx0cmV0dXJuICQkLnRvQXJyYXkoY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XHJcblx0fSxcclxuXHRhZGRDbGFzczogZnVuY3Rpb24oZWwsIGNsYXNzTmFtZSkge1xyXG5cdFx0ZWwuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xyXG5cdH0sXHJcblx0cmVtb3ZlQ2xhc3M6IGZ1bmN0aW9uKGVsLCBjbGFzc05hbWUpIHtcclxuXHRcdGVsLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcclxuXHR9LFxyXG5cdGhhc0NsYXNzOiBmdW5jdGlvbihlbCwgY2xhc3NOYW1lKSB7XHJcblx0XHRyZXR1cm4gZWwuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7XHJcblx0fSxcclxuXHRoaWRlOiBmdW5jdGlvbiguLi5lbGVtcykge1xyXG5cdFx0ZWxlbXMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XHJcblx0XHRcdGl0ZW0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHRcdH0pO1xyXG5cdH0sXHJcblx0c2hvdzogZnVuY3Rpb24oLi4uZWxlbXMpIHtcclxuXHRcdGVsZW1zLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xyXG5cdFx0XHRpdGVtLnN0eWxlLmRpc3BsYXkgPSAnJztcclxuXHRcdH0pO1xyXG5cdH0sXHJcblx0Y2xvc2VzdDogZnVuY3Rpb24oZWwsIHNlbGVjdG9yKSB7XHJcblx0XHRpZihlbC5jbG9zZXN0KSByZXR1cm4gZWwuY2xvc2VzdChzZWxlY3Rvcik7XHJcblxyXG5cdFx0dmFyIHBhcmVudE5vZGUgPSBlbDtcclxuXHRcdHZhciBtYXRjaGVzO1xyXG5cclxuXHRcdHdoaWxlKChtYXRjaGVzID0gcGFyZW50Tm9kZSAmJiBwYXJlbnROb2RlLm1hdGNoZXMpICYmICFwYXJlbnROb2RlLm1hdGNoZXMoc2VsZWN0b3IpKSB7XHJcblx0XHRcdHBhcmVudE5vZGUgPSBwYXJlbnROb2RlLnBhcmVudE5vZGU7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gbWF0Y2hlcyA/IHBhcmVudE5vZGUgOiBudWxsO1xyXG5cdH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZG9tOyIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyIHN1YnNjcmliZXJzID0gbmV3IE1hcCgpO1xyXG5cclxudmFyIEV2ZW50cyA9IHtcclxuXHRvbjogZnVuY3Rpb24odHlwZSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcclxuXHRcdHZhciBpdGVtO1xyXG5cclxuXHRcdGlmKHN1YnNjcmliZXJzLmhhcyh0aGlzKSkge1xyXG5cdFx0XHRpdGVtID0gc3Vic2NyaWJlcnMuZ2V0KHRoaXMpO1xyXG5cdFx0XHRpZihpdGVtW3R5cGVdKSB7XHJcblx0XHRcdFx0aXRlbVt0eXBlXS5wdXNoKHtcclxuXHRcdFx0XHRcdGNhbGxiYWNrOiBjYWxsYmFjayxcclxuXHRcdFx0XHRcdGNvbnRleHQ6IGNvbnRleHRcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRpdGVtW3R5cGVdID0gW3tcclxuXHRcdFx0XHRcdGNhbGxiYWNrOiBjYWxsYmFjayxcclxuXHRcdFx0XHRcdGNvbnRleHQ6IGNvbnRleHRcclxuXHRcdFx0XHR9XTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdGl0ZW0gPSB7XHJcblx0XHRcdFx0W3R5cGVdOiBbe1xyXG5cdFx0XHRcdFx0Y2FsbGJhY2s6IGNhbGxiYWNrLFxyXG5cdFx0XHRcdFx0Y29udGV4dDogY29udGV4dFxyXG5cdFx0XHRcdH1dXHJcblx0XHRcdH07XHJcblx0XHRcdHN1YnNjcmliZXJzLnNldCh0aGlzLCBpdGVtKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdG9mZjogZnVuY3Rpb24odHlwZSwgY2FsbGJhY2spIHtcclxuXHRcdHZhciBpdGVtLCBpO1xyXG5cdFx0aWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xyXG5cdFx0XHRzdWJzY3JpYmVycy5kZWxldGUodGhpcyk7XHJcblx0XHR9XHJcblx0XHRpZihhcmd1bWVudHMubGVuZ3RoID09PSAxICYmIHN1YnNjcmliZXJzLmhhcyh0aGlzKSkge1xyXG5cdFx0XHRpdGVtID0gc3Vic2NyaWJlcnMuZ2V0KHRoaXMpO1xyXG5cdFx0XHRpZihpdGVtW3R5cGVdKSB7XHJcblx0XHRcdFx0aWYoY2FsbGJhY2spIHtcclxuXHRcdFx0XHRcdGZvcihpID0gMDsgaSA8IGl0ZW1bdHlwZV0ubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdFx0aWYoaXRlbVt0eXBlXVtpXSA9PT0gY2FsbGJhY2spIHtcclxuXHRcdFx0XHRcdFx0XHRpdGVtW3R5cGVdLnNwbGljZShpLCAxKTtcclxuXHRcdFx0XHRcdFx0XHRpLS07XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRkZWxldGUgaXRlbVt0eXBlXTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG5cdHRyaWdnZXI6IGZ1bmN0aW9uKHR5cGUsIC4uLmFyZ3MpIHtcclxuXHRcdHZhciBpdGVtO1xyXG5cclxuXHRcdGlmKHN1YnNjcmliZXJzLmhhcyh0aGlzKSkge1xyXG5cdFx0XHRpdGVtID0gc3Vic2NyaWJlcnMuZ2V0KHRoaXMpO1xyXG5cclxuXHRcdFx0aWYoaXRlbVt0eXBlXSkge1xyXG5cdFx0XHRcdGl0ZW1bdHlwZV0uZm9yRWFjaChmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRcdFx0dmFyIGNvbnRleHQgPSBldmVudC5jb250ZXh0IHx8IHRoaXM7XHJcblx0XHRcdFx0XHRldmVudC5jYWxsYmFjay5hcHBseShjb250ZXh0LCBhcmdzKTtcclxuXHRcdFx0XHR9LCB0aGlzKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoaXRlbS5hbGwpIHtcclxuXHRcdFx0XHRpdGVtLmFsbC5mb3JFYWNoKGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdFx0XHR2YXIgY29udGV4dCA9IGV2ZW50LmNvbnRleHQgfHwgdGhpcztcclxuXHRcdFx0XHRcdGFyZ3MudW5zaGlmdCh0eXBlKTtcclxuXHRcdFx0XHRcdGV2ZW50LmNhbGxiYWNrLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xyXG5cdFx0XHRcdH0sIHRoaXMpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBFdmVudHM7IiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIgJCQgPSB7XHJcblx0dG9BcnJheTogZnVuY3Rpb24ob2JqZWN0KSB7XHJcblx0XHRyZXR1cm4gW10uc2xpY2UuY2FsbChvYmplY3QpO1xyXG5cdH0sXHJcblx0YXNzaWduOiBmdW5jdGlvbih0YXJnZXQsIC4uLnJlc3QpIHtcclxuXHRcdGlmKHRhcmdldCA9PT0gdW5kZWZpbmVkIHx8IHRhcmdldCA9PT0gbnVsbCkge1xyXG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY29udmVydCBmaXJzdCBhcmd1bWVudCB0byBvYmplY3QnKTtcclxuXHRcdH1cclxuXHRcdHJlc3QuZm9yRWFjaChvYmogPT4ge1xyXG5cdFx0XHRpZihvYmogPT09IHVuZGVmaW5lZCB8fCBvYmogPT09IG51bGwpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHRcdFx0T2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGtleSA9PiB7XHJcblx0XHRcdFx0dGFyZ2V0W2tleV0gPSBvYmpba2V5XTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cdG9ic2VydmVQcm9wZXJ0aWVzOiBmdW5jdGlvbihvYmopIHtcclxuXHRcdGlmICh0eXBlb2Ygb2JqLnRyaWdnZXIgIT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0dGhyb3cgJ09ic2VydmVkIG9iamVjdCBtdXN0IGhhdmUgdHJpZ2dlciBtZXRob2QnO1xyXG5cdFx0fVxyXG5cdFx0T2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xyXG5cdFx0XHRvYmpbJ18nICsga2V5XSA9IG9ialtrZXldO1xyXG5cclxuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XHJcblx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdHJldHVybiBvYmpbJ18nICsga2V5XTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuXHRcdFx0XHRcdGlmKG9ialsnXycgKyBrZXldID09PSB2YWx1ZSkgcmV0dXJuO1xyXG5cclxuXHRcdFx0XHRcdG9ialsnXycgKyBrZXldID0gdmFsdWU7XHJcblx0XHRcdFx0XHRvYmoudHJpZ2dlcihrZXkgKyAnOmNoYW5nZWQnLCB2YWx1ZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH0sIG9iaik7XHJcblx0fVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSAkJDsiXX0=
