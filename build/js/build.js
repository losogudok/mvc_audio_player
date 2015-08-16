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
			this.model.equalizer[e.type] = e.value / SLIDER_HIGHEST;
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
			'1K': 0,
			'3K': 0,
			'6K': 0,
			'12K': 0,
			'14K': 0,
			'16K': 0
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
			'1K': dom.qs('[data-type="1K"]', this.el),
			'3K': dom.qs('[data-type="3K"]', this.el),
			'6K': dom.qs('[data-type="6K"]', this.el),
			'12K': dom.qs('[data-type="12K"]', this.el),
			'14K': dom.qs('[data-type="14K"]', this.el),
			'16K': dom.qs('[data-type="16K"]', this.el)
		};

		this.slidersCoords = {
			'gain': this.sliders['gain'].getBoundingClientRect(),
			'60': this.sliders['60'].getBoundingClientRect(),
			'170': this.sliders['170'].getBoundingClientRect(),
			'310': this.sliders['310'].getBoundingClientRect(),
			'600': this.sliders['600'].getBoundingClientRect(),
			'1K': this.sliders['1K'].getBoundingClientRect(),
			'3K': this.sliders['3K'].getBoundingClientRect(),
			'6K': this.sliders['6K'].getBoundingClientRect(),
			'12K': this.sliders['12K'].getBoundingClientRect(),
			'14K': this.sliders['14K'].getBoundingClientRect(),
			'16K': this.sliders['16K'].getBoundingClientRect()
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
			if (e.type === 'gain') {
				this.gain.gain.value = e.value;
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL0phdmFzY3JpcHQvdGFza18zL3NyYy9qcy9hcHAuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL0phdmFzY3JpcHQvdGFza18zL3NyYy9qcy9hdWRpby5qcyIsIi9ob21lL2FuZHJleS9Eb2N1bWVudHMvUHJvamVjdHMvSmF2YXNjcmlwdC90YXNrXzMvc3JjL2pzL2F1ZGlvX2FuYWx5c2VyLmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy9KYXZhc2NyaXB0L3Rhc2tfMy9zcmMvanMvYXVkaW9fcGxheWVyL2NvbnRyb2xsZXJzL2Jhc2UuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL0phdmFzY3JpcHQvdGFza18zL3NyYy9qcy9hdWRpb19wbGF5ZXIvY29udHJvbGxlcnMvY29udHJvbHMuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL0phdmFzY3JpcHQvdGFza18zL3NyYy9qcy9hdWRpb19wbGF5ZXIvY29udHJvbGxlcnMvZHJvcF9hcmVhLmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy9KYXZhc2NyaXB0L3Rhc2tfMy9zcmMvanMvYXVkaW9fcGxheWVyL2NvbnRyb2xsZXJzL2VxdWFsaXplci5qcyIsIi9ob21lL2FuZHJleS9Eb2N1bWVudHMvUHJvamVjdHMvSmF2YXNjcmlwdC90YXNrXzMvc3JjL2pzL2F1ZGlvX3BsYXllci9jb250cm9sbGVycy9zb25nc19saXN0LmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy9KYXZhc2NyaXB0L3Rhc2tfMy9zcmMvanMvYXVkaW9fcGxheWVyL21vZGVscy9zb25nLmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy9KYXZhc2NyaXB0L3Rhc2tfMy9zcmMvanMvYXVkaW9fcGxheWVyL21vZGVscy9zb25ncy5qcyIsIi9ob21lL2FuZHJleS9Eb2N1bWVudHMvUHJvamVjdHMvSmF2YXNjcmlwdC90YXNrXzMvc3JjL2pzL2F1ZGlvX3BsYXllci9zdGF0ZXMvcGxheWVyLmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy9KYXZhc2NyaXB0L3Rhc2tfMy9zcmMvanMvYXVkaW9fcGxheWVyL3ZpZXdzL2Jhc2UuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL0phdmFzY3JpcHQvdGFza18zL3NyYy9qcy9hdWRpb19wbGF5ZXIvdmlld3MvY29udHJvbHMuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL0phdmFzY3JpcHQvdGFza18zL3NyYy9qcy9hdWRpb19wbGF5ZXIvdmlld3MvZHJvcF9hcmVhLmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy9KYXZhc2NyaXB0L3Rhc2tfMy9zcmMvanMvYXVkaW9fcGxheWVyL3ZpZXdzL2VxdWFsaXplci5qcyIsIi9ob21lL2FuZHJleS9Eb2N1bWVudHMvUHJvamVjdHMvSmF2YXNjcmlwdC90YXNrXzMvc3JjL2pzL2F1ZGlvX3BsYXllci92aWV3cy9wbGF5ZXIuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL0phdmFzY3JpcHQvdGFza18zL3NyYy9qcy9hdWRpb19wbGF5ZXIvdmlld3Mvc29uZ19kZXRhaWxzLmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy9KYXZhc2NyaXB0L3Rhc2tfMy9zcmMvanMvYXVkaW9fcGxheWVyL3ZpZXdzL3NvbmdzX2xpc3QuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL0phdmFzY3JpcHQvdGFza18zL3NyYy9qcy9hdWRpb19wbGF5ZXIvdmlld3MvdmlzdWFsaXplci5qcyIsIi9ob21lL2FuZHJleS9Eb2N1bWVudHMvUHJvamVjdHMvSmF2YXNjcmlwdC90YXNrXzMvc3JjL2pzL2RvbS5qcyIsIi9ob21lL2FuZHJleS9Eb2N1bWVudHMvUHJvamVjdHMvSmF2YXNjcmlwdC90YXNrXzMvc3JjL2pzL2V2ZW50cy5qcyIsIi9ob21lL2FuZHJleS9Eb2N1bWVudHMvUHJvamVjdHMvSmF2YXNjcmlwdC90YXNrXzMvc3JjL2pzL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsWUFBWSxDQUFDOztBQUViLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0FBQ3hELElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDOztBQUUxRCxJQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztBQUM3RCxJQUFJLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDOztBQUV6RSxJQUFJLGFBQWEsR0FBRyxPQUFPLENBQUMsaUNBQWlDLENBQUMsQ0FBQztBQUMvRCxJQUFJLG1CQUFtQixHQUFHLE9BQU8sQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDOztBQUUzRSxJQUFJLGVBQWUsR0FBRyxPQUFPLENBQUMsbUNBQW1DLENBQUMsQ0FBQzs7QUFFbkUsSUFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLCtCQUErQixDQUFDLENBQUM7QUFDNUQsSUFBSSxrQkFBa0IsR0FBRyxPQUFPLENBQUMscUNBQXFDLENBQUMsQ0FBQzs7QUFFeEUsSUFBSSxjQUFjLEdBQUcsT0FBTyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7O0FBRWhFLElBQUksYUFBYSxHQUFHLE9BQU8sQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO0FBQzlELElBQUksbUJBQW1CLEdBQUcsT0FBTyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7O0FBRTFFLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQzs7O0FBSTNCLElBQUksV0FBVyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7OztBQUdw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QUFTLEtBQUssRUFBRTtBQUNwQixTQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEtBQUssS0FBSyxFQUFFLE9BQU87O0FBRXBDLFFBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO0FBQ3ZCLFFBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUNyQztJQUNELENBQUMsQ0FBQztHQUNILEVBQUUsR0FBRyxDQUFDLENBQUM7RUFDUjtDQUNELENBQUM7O0FBRUYsTUFBTSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIgUGxheWVyVmlldyA9IHJlcXVpcmUoJy4vYXVkaW9fcGxheWVyL3ZpZXdzL3BsYXllcicpO1xyXG52YXIgUGxheWVyU3RhdGUgPSByZXF1aXJlKCcuL2F1ZGlvX3BsYXllci9zdGF0ZXMvcGxheWVyJyk7XHJcblxyXG52YXIgRHJvcEFyZWFWaWV3ID0gcmVxdWlyZSgnLi9hdWRpb19wbGF5ZXIvdmlld3MvZHJvcF9hcmVhJyk7XHJcbnZhciBEcm9wQXJlYUNvbnRyb2xsZXIgPSByZXF1aXJlKCcuL2F1ZGlvX3BsYXllci9jb250cm9sbGVycy9kcm9wX2FyZWEnKTtcclxuXHJcbnZhciBTb25nc0xpc3RWaWV3ID0gcmVxdWlyZSgnLi9hdWRpb19wbGF5ZXIvdmlld3Mvc29uZ3NfbGlzdCcpO1xyXG52YXIgU29uZ3NMaXN0Q29udHJvbGxlciA9IHJlcXVpcmUoJy4vYXVkaW9fcGxheWVyL2NvbnRyb2xsZXJzL3NvbmdzX2xpc3QnKTtcclxuXHJcbnZhciBTb25nRGV0YWlsc1ZpZXcgPSByZXF1aXJlKCcuL2F1ZGlvX3BsYXllci92aWV3cy9zb25nX2RldGFpbHMnKTtcclxuXHJcbnZhciBDb250cm9sc1ZpZXcgPSByZXF1aXJlKCcuL2F1ZGlvX3BsYXllci92aWV3cy9jb250cm9scycpO1xyXG52YXIgQ29udHJvbHNDb250cm9sbGVyID0gcmVxdWlyZSgnLi9hdWRpb19wbGF5ZXIvY29udHJvbGxlcnMvY29udHJvbHMnKTtcclxuXHJcbnZhciBWaXN1YWxpemVyVmlldyA9IHJlcXVpcmUoJy4vYXVkaW9fcGxheWVyL3ZpZXdzL3Zpc3VhbGl6ZXInKTtcclxuXHJcbnZhciBFcXVhbGl6ZXJWaWV3ID0gcmVxdWlyZSgnLi9hdWRpb19wbGF5ZXIvdmlld3MvZXF1YWxpemVyJyk7XHJcbnZhciBFcXVhbGl6ZXJDb250cm9sbGVyID0gcmVxdWlyZSgnLi9hdWRpb19wbGF5ZXIvY29udHJvbGxlcnMvZXF1YWxpemVyJyk7XHJcblxyXG52YXIgZG9tID0gcmVxdWlyZSgnLi9kb20nKTtcclxuXHJcblxyXG4vLyBQbGF5ZXIgU3RhdGVcclxudmFyIHBsYXllclN0YXRlID0gbmV3IFBsYXllclN0YXRlKCk7XHJcblxyXG4vLyBNYWluXHJcbnZhciBwbGF5ZXJWaWV3ID0gbmV3IFBsYXllclZpZXcoe1xyXG5cdGVsOiBkb20uYnlJZCgnYXVkaW9QbGF5ZXInKSxcclxuXHRtb2RlbDogcGxheWVyU3RhdGVcclxufSk7XHJcblxyXG4vLyBEcm9wIGFyZWFcclxudmFyIGRyb3BBcmVhVmlldyA9IG5ldyBEcm9wQXJlYVZpZXcoe1xyXG5cdGVsOiBkb20ucXMoJy5qcy1kcm9wLWFyZWEnLCBwbGF5ZXJWaWV3LmVsKSxcclxuXHRtb2RlbDogcGxheWVyU3RhdGVcclxufSk7XHJcblxyXG52YXIgZHJvcEFyZWFDb250cm9sbGVyID0gbmV3IERyb3BBcmVhQ29udHJvbGxlcih7XHJcblx0dmlldzogZHJvcEFyZWFWaWV3LFxyXG5cdG1vZGVsOiBwbGF5ZXJTdGF0ZVxyXG59KTtcclxuXHJcbi8vIFNvbmdzIExpc3RcclxudmFyIHNvbmdzTGlzdFZpZXcgPSBuZXcgU29uZ3NMaXN0Vmlldyh7XHJcblx0ZWw6IGRvbS5xcygnLmpzLXNvbmdzLWxpc3QnLCBwbGF5ZXJWaWV3LmVsKSxcclxuXHR0ZW1wbGF0ZTogZG9tLmJ5SWQoJ3NvbmdMaXN0SXRlbScpLFxyXG5cdG1vZGVsOiBwbGF5ZXJTdGF0ZVxyXG59KTtcclxuXHJcbnZhciBzb25nc0xpc3RDb250cm9sbGVyID0gbmV3IFNvbmdzTGlzdENvbnRyb2xsZXIoe1xyXG5cdG1vZGVsOiBwbGF5ZXJTdGF0ZSxcclxuXHR2aWV3OiBzb25nc0xpc3RWaWV3XHJcbn0pO1xyXG5cclxuLy8gRGV0YWlsc1xyXG52YXIgc29uZ0RldGFpbHNWaWV3ID0gbmV3IFNvbmdEZXRhaWxzVmlldyh7XHJcblx0ZWw6IGRvbS5xcygnLmpzLXNvbmctZGV0YWlscycsIHBsYXllclZpZXcuZWwpLFxyXG5cdG1vZGVsOiBwbGF5ZXJTdGF0ZVxyXG59KTtcclxuXHJcblxyXG4vLyBDb250cm9sc1xyXG52YXIgY29udHJvbHNWaWV3ID0gbmV3IENvbnRyb2xzVmlldyh7XHJcblx0ZWw6IGRvbS5xcygnLmpzLWNvbnRyb2xzJywgcGxheWVyVmlldy5lbCksXHJcblx0bW9kZWw6IHBsYXllclN0YXRlXHJcbn0pO1xyXG5cclxudmFyIGNvbnRyb2xzQ29udHJvbGxlciA9IG5ldyBDb250cm9sc0NvbnRyb2xsZXIoe1xyXG5cdG1vZGVsOiBwbGF5ZXJTdGF0ZSxcclxuXHR2aWV3OiBjb250cm9sc1ZpZXdcclxufSk7XHJcblxyXG4vLyBFcXVhbGl6ZXJcclxuXHJcbnZhciBlcXVhbGl6ZXJWaWV3ID0gbmV3IEVxdWFsaXplclZpZXcoe1xyXG5cdGVsOiBkb20ucXMoJy5qcy1lcXVhbGl6ZXInLCBwbGF5ZXJWaWV3LmVsKSxcclxuXHRtb2RlbDogcGxheWVyU3RhdGVcclxufSk7XHJcblxyXG52YXIgZXF1YWxpemVyQ29udHJvbGxlciA9IG5ldyBFcXVhbGl6ZXJDb250cm9sbGVyKHtcclxuXHR2aWV3OiBlcXVhbGl6ZXJWaWV3LFxyXG5cdG1vZGVsOiBwbGF5ZXJTdGF0ZVxyXG59KTtcclxuXHJcbi8vIFZpc3VhbGl6ZXJcclxuXHJcbnZhciB2aXN1YWxpemVyVmlldyA9IG5ldyBWaXN1YWxpemVyVmlldyh7XHJcblx0ZWw6IGRvbS5xcygnLmpzLXZpc3VhbGl6ZXInLCBwbGF5ZXJWaWV3LmVsKSxcclxuXHRtb2RlbDogcGxheWVyU3RhdGVcclxufSk7IiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIgYXVkaW9FbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2F1ZGlvJyk7XHJcbnZhciBBdWRpb0NvbnRleHQgPSB3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQ7XHJcbnZhciBhdWRpb0NvbnRleHQgPSBudWxsO1xyXG52YXIgQVVESU9fRk9STUFUUyA9IFtcclxuXHR7XHJcblx0XHR0eXBlOiAnYXVkaW8vbXBlZycsXHJcblx0XHRleHQ6ICdtcDMnXHJcblx0fSxcclxuXHR7XHJcblx0XHR0eXBlOiAnYXVkaW8vb2dnOyBjb2RlY3M9XCJ2b3JiaXNcIicsXHJcblx0XHRleHQ6ICdvZ2cnXHJcblx0fSxcclxuXHR7XHJcblx0XHR0eXBlOiAnYXVkaW8vd2F2OyBjb2RlY3M9XCIxXCInLFxyXG5cdFx0ZXh0OiAnd2F2J1xyXG5cdH0sXHJcblx0e1xyXG5cdFx0dHlwZTogJ2F1ZGlvL21wNDsgY29kZWNzPVwibXA0YS40MC4yXCInLFxyXG5cdFx0ZXh0OiAnYWFjJ1xyXG5cdH0sXHJcblx0e1xyXG5cdFx0dHlwZTogJ2F1ZGlvL3dlYm0nLFxyXG5cdFx0ZXh0OiAnd2ViYSdcclxuXHR9LFxyXG5cdHtcclxuXHRcdHR5cGU6ICdhdWRpby9mbGFjJyxcclxuXHRcdGV4dDogJ2ZsYWMnXHJcblx0fVxyXG5dO1xyXG5cclxudmFyIFNVUFBPUlRFRF9GT1JNQVRTID0gQVVESU9fRk9STUFUUy5maWx0ZXIoZm9ybWF0ID0+IHtcclxuXHRyZXR1cm4gYXVkaW9FbC5jYW5QbGF5VHlwZShmb3JtYXQudHlwZSkgIT09ICcnO1xyXG59KTtcclxuXHJcbmlmIChBdWRpb0NvbnRleHQpIHtcclxuXHRhdWRpb0NvbnRleHQgPSBuZXcgQXVkaW9Db250ZXh0O1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRTVVBQT1JURURfRk9STUFUUzogU1VQUE9SVEVEX0ZPUk1BVFMsXHJcblx0Z2V0QXVkaW9Db250ZXh0OiBmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiBhdWRpb0NvbnRleHQ7XHJcblx0fVxyXG59O1xyXG4iLCJ2YXIgYXVkaW9Db250ZXh0ID0gcmVxdWlyZSgnLi9hdWRpbycpLmdldEF1ZGlvQ29udGV4dCgpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBhdWRpb0NvbnRleHQuY3JlYXRlQW5hbHlzZXIoKTsiLCJcInVzZSBzdHJpY3RcIjtcblxuY2xhc3MgQmFzZUNvbnRyb2xsZXIge1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0dGhpcy5tb2RlbCA9IG9wdGlvbnMubW9kZWw7XG5cdFx0dGhpcy52aWV3ID0gb3B0aW9ucy52aWV3O1xuXHRcdHRoaXMuYmluZExpc3RlbmVycygpO1xuXHR9XG5cblx0YmluZExpc3RlbmVycygpIHt9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQmFzZUNvbnRyb2xsZXI7IiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIgQmFzZUNvbnRyb2xsZXIgPSByZXF1aXJlKCcuL2Jhc2UnKTtcclxuXHJcbmNsYXNzIENvbnRyb2xzQ29udHJvbGxlciBleHRlbmRzIEJhc2VDb250cm9sbGVyIHtcclxuXHRiaW5kTGlzdGVuZXJzKCkge1xyXG5cdFx0dGhpcy52aWV3Lm9uKCdjb250cm9sOnByZXNzZWQnLCB0aGlzLm9uQ29udHJvbFByZXNzZWQsIHRoaXMpO1xyXG5cdH1cclxuXHJcblx0b25Db250cm9sUHJlc3NlZChjb250cm9sVHlwZSkge1xyXG5cdFx0c3dpdGNoKGNvbnRyb2xUeXBlKSB7XHJcblx0XHRcdGNhc2UgJ3BsYXknOlxyXG5cdFx0XHRcdHRoaXMubW9kZWwucGxheWluZ1NvbmcgPSB0aGlzLm1vZGVsLnNlbGVjdGVkU29uZztcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnc3RvcCc6XHJcblx0XHRcdFx0dGhpcy5tb2RlbC5wbGF5aW5nU29uZyA9IG51bGw7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ2VxJzpcclxuXHRcdFx0XHR0aGlzLm1vZGVsLmlzVmlzdWFsaXppbmcgPSAhdGhpcy5tb2RlbC5pc1Zpc3VhbGl6aW5nO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDb250cm9sc0NvbnRyb2xsZXI7IiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIgJCQgPSByZXF1aXJlKCcuLi8uLi91dGlscycpO1xyXG52YXIgYXVkaW8gPSByZXF1aXJlKCcuLi8uLi9hdWRpbycpO1xyXG52YXIgYXVkaW9Db250ZXh0ID0gYXVkaW8uZ2V0QXVkaW9Db250ZXh0KCk7XHJcbnZhciBCYXNlQ29udHJvbGxlciA9IHJlcXVpcmUoJy4vYmFzZScpO1xyXG5cclxuY2xhc3MgUGxheWVyQ29udHJvbGxlciBleHRlbmRzIEJhc2VDb250cm9sbGVyIHtcclxuXHJcblx0YmluZExpc3RlbmVycygpIHtcclxuXHRcdHRoaXMudmlldy5vbignZmlsZXM6YWRkJywgdGhpcy5vbkZpbGVzQWRkLCB0aGlzKTtcclxuXHR9XHJcblxyXG5cdG9uRmlsZXNBZGQoZmlsZXMpIHtcclxuXHRcdHZhciBzZWxmID0gdGhpcztcclxuXHJcblx0XHR0aGlzLmZpbHRlckF1ZGlvRmlsZXMoZmlsZXMpLmZvckVhY2goZnVuY3Rpb24oZmlsZSkge1xyXG5cdFx0XHRQcm9taXNlLmFsbChbdGhpcy5nZXRTb25nSW5mbyhmaWxlLCBbXCJ0aXRsZVwiLCBcImFydGlzdFwiLCBcInBpY3R1cmVcIl0pLCB0aGlzLmRlY29kZVNvbmcoZmlsZSldKVxyXG5cdFx0XHRcdC50aGVuKGZ1bmN0aW9uKHZhbHVlcykge1xyXG5cdFx0XHRcdFx0JCQuYXNzaWduKHZhbHVlc1swXSwgdmFsdWVzWzFdLCB7ZmlsZU5hbWU6IGZpbGUubmFtZX0pO1xyXG5cdFx0XHRcdFx0c2VsZi5tb2RlbC5hZGRTb25nKHZhbHVlc1swXSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHR9LCB0aGlzKTtcclxuXHR9XHJcblxyXG5cdGZpbHRlckF1ZGlvRmlsZXMoZmlsZXMpIHtcclxuXHRcdHJldHVybiBmaWxlcy5maWx0ZXIodGhpcy5pc0F1ZGlvRmlsZSwgdGhpcyk7XHJcblx0fVxyXG5cclxuXHRpc0F1ZGlvRmlsZShmaWxlKSB7XHJcblx0XHR2YXIgc3VwcG9ydCA9IGZhbHNlO1xyXG5cclxuXHRcdGF1ZGlvLlNVUFBPUlRFRF9GT1JNQVRTLmZvckVhY2goZm9ybWF0ID0+IHtcclxuXHRcdFx0aWYoZmlsZS5uYW1lLnNlYXJjaChmb3JtYXQuZXh0KSAhPT0gLTEpIHtcclxuXHRcdFx0XHRzdXBwb3J0ID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIHN1cHBvcnQ7XHJcblx0fVxyXG5cclxuXHRnZXRTb25nSW5mbyhmaWxlLCB0YWdzKSB7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblx0XHRcdHZhciB1cmwgPSBmaWxlLnVybiB8fCBmaWxlLm5hbWU7XHJcblxyXG5cdFx0XHRJRDMubG9hZFRhZ3ModXJsLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdHZhciBhbGxUYWdzID0gSUQzLmdldEFsbFRhZ3ModXJsKTtcclxuXHRcdFx0XHRcdHZhciBwaWN0dXJlO1xyXG5cdFx0XHRcdFx0dmFyIHJlc3VsdCA9IHt9O1xyXG5cdFx0XHRcdFx0dmFyIGRhdGFVcmw7XHJcblx0XHRcdFx0XHR2YXIgYmFzZTY0U3RyaW5nO1xyXG5cclxuXHRcdFx0XHRcdHRhZ3MuZm9yRWFjaChmdW5jdGlvbih0YWcpIHtcclxuXHRcdFx0XHRcdFx0aWYgKHRhZyA9PT0gJ3BpY3R1cmUnICYmIGFsbFRhZ3MucGljdHVyZSkge1xyXG5cdFx0XHRcdFx0XHRcdHBpY3R1cmUgPSBhbGxUYWdzLnBpY3R1cmU7XHJcblx0XHRcdFx0XHRcdFx0YmFzZTY0U3RyaW5nID0gXCJcIjtcclxuXHJcblx0XHRcdFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IHBpY3R1cmUuZGF0YS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0XHRcdFx0YmFzZTY0U3RyaW5nICs9IFN0cmluZy5mcm9tQ2hhckNvZGUocGljdHVyZS5kYXRhW2ldKTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0ZGF0YVVybCA9IFwiZGF0YTpcIiArIHBpY3R1cmUuZm9ybWF0ICsgXCI7YmFzZTY0LFwiICsgd2luZG93LmJ0b2EoYmFzZTY0U3RyaW5nKTtcclxuXHRcdFx0XHRcdFx0XHRyZXN1bHQucGljdHVyZSA9IGRhdGFVcmw7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0cmVzdWx0W3RhZ10gPSBhbGxUYWdzW3RhZ107XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdHJlc29sdmUocmVzdWx0KTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHRhZ3M6IHRhZ3MsXHJcblx0XHRcdFx0XHRkYXRhUmVhZGVyOiBGaWxlQVBJUmVhZGVyKGZpbGUpLFxyXG5cdFx0XHRcdFx0b25FcnJvcjogZnVuY3Rpb24ocmVhc29uKSB7XHJcblx0XHRcdFx0XHRcdHJlamVjdChyZWFzb24pO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRkZWNvZGVTb25nKGZpbGUpIHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHRcdFx0dmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcblxyXG5cdFx0XHRyZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoZmlsZSk7XHJcblx0XHRcdHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHR2YXIgYnVmZmVyID0gdGhpcy5yZXN1bHQ7XHJcblxyXG5cdFx0XHRcdGF1ZGlvQ29udGV4dC5kZWNvZGVBdWRpb0RhdGEoYnVmZmVyLCBhdWRpb0J1ZmZlciA9PiB7XHJcblx0XHRcdFx0XHRyZXNvbHZlKHtcclxuXHRcdFx0XHRcdFx0YXVkaW9CdWZmZXI6IGF1ZGlvQnVmZmVyLFxyXG5cdFx0XHRcdFx0XHRzYW1wbGVSYXRlOiBhdWRpb0J1ZmZlci5zYW1wbGVSYXRlLFxyXG5cdFx0XHRcdFx0XHRkdXJhdGlvbjogYXVkaW9CdWZmZXIuZHVyYXRpb25cclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0cmVhZGVyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRyZWplY3QocmVhZGVyLmVycm9yKTtcclxuXHRcdFx0fTtcclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQbGF5ZXJDb250cm9sbGVyO1xyXG5cclxuXHJcblxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciBCYXNlQ29udHJvbGxlciA9IHJlcXVpcmUoJy4vYmFzZScpO1xyXG52YXIgU0xJREVSX0hJR0hFU1QgPSAyMDA7XHJcblxyXG5cclxuY2xhc3MgRXF1YWxpemVDb250cm9sbGVyIGV4dGVuZHMgQmFzZUNvbnRyb2xsZXIge1xyXG5cdGJpbmRMaXN0ZW5lcnMoKSB7XHJcblx0XHR0aGlzLnZpZXcub24oJ3NsaWRlcjpjaGFuZ2VkJywgdGhpcy5zbGlkZXJDaGFuZ2VkLCB0aGlzKTtcclxuXHR9XHJcblxyXG5cdHNsaWRlckNoYW5nZWQoZSkge1xyXG5cdFx0dGhpcy5tb2RlbC5lcXVhbGl6ZXJbZS50eXBlXSA9IGUudmFsdWUgLyBTTElERVJfSElHSEVTVDtcclxuXHR9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRXF1YWxpemVDb250cm9sbGVyOyIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyIEJhc2VDb250cm9sbGVyID0gcmVxdWlyZSgnLi9iYXNlJyk7XHJcblxyXG5jbGFzcyBTb25nc0xpc3RDb250cm9sbGVyIGV4dGVuZHMgQmFzZUNvbnRyb2xsZXIge1xyXG5cdGJpbmRMaXN0ZW5lcnMoKSB7XHJcblx0XHR0aGlzLnZpZXcub24oJ3Nvbmc6c2VsZWN0ZWQnLCB0aGlzLm9uU29uZ1NlbGVjdGVkLCB0aGlzKTtcclxuXHR9XHJcblxyXG5cdG9uU29uZ1NlbGVjdGVkKHNvbmdJZCkge1xyXG5cdFx0dGhpcy5tb2RlbC5zZWxlY3RlZFNvbmcgPSB0aGlzLm1vZGVsLmdldFNvbmcoTnVtYmVyKHNvbmdJZCkpO1xyXG5cdH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTb25nc0xpc3RDb250cm9sbGVyOyIsInZhciBpZCA9IDE7XHJcblxyXG5jbGFzcyBTb25nIHtcclxuXHRjb25zdHJ1Y3RvcihkYXRhKSB7XHJcblx0XHR0aGlzLmlkID0gaWQ7XHJcblx0XHR0aGlzLmF1ZGlvQnVmZmVyID0gZGF0YS5hdWRpb0J1ZmZlcjtcclxuXHRcdHRoaXMuZmlsZU5hbWUgPSBkYXRhLmZpbGVOYW1lO1xyXG5cdFx0dGhpcy50aXRsZSA9IGRhdGEudGl0bGUgfHwgJyc7XHJcblx0XHR0aGlzLmFydGlzdCA9IGRhdGEuYXJ0aXN0IHx8ICcnO1xyXG5cdFx0dGhpcy5kdXJhdGlvbiA9IE1hdGgucm91bmQoZGF0YS5kdXJhdGlvbik7XHJcblx0XHR0aGlzLnBpY3R1cmUgPSBkYXRhLnBpY3R1cmUgfHwgbnVsbDtcclxuXHRcdGlkKys7XHJcblx0fVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNvbmc7IiwidmFyIEV2ZW50cyA9IHJlcXVpcmUoJy4uLy4uL2V2ZW50cycpO1xyXG52YXIgJCQgPSByZXF1aXJlKCcuLi8uLi91dGlscycpO1xyXG52YXIgU29uZyA9IHJlcXVpcmUoJy4vc29uZycpO1xyXG5cclxuY2xhc3MgU29uZ3Mge1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0dGhpcy5zb25ncyA9IFtdO1xyXG5cdFx0dGhpcy5sZW5ndGggPSAwO1xyXG5cdH1cclxuXHJcblx0Z2V0U29uZyhpZCkge1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMuc29uZ3MubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYoaWQgPT09IHRoaXMuc29uZ3NbaV0uaWQpIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5zb25nc1tpXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YWRkU29uZyhkYXRhKSB7XHJcblx0XHR2YXIgc29uZyA9IG5ldyBTb25nKGRhdGEpO1xyXG5cdFx0dGhpcy5zb25ncy5wdXNoKHNvbmcpO1xyXG5cdFx0dGhpcy5sZW5ndGgrKztcclxuXHRcdHRoaXMudHJpZ2dlcignc29uZzphZGQnLCBzb25nKTtcclxuXHR9XHJcblxyXG5cdHJlbW92ZVNvbmcoaWQpIHtcclxuXHRcdHZhciBzb25nID0gdGhpcy5nZXRTb25nKGlkKTtcclxuXHRcdGlmKHNvbmcgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHR0aGlzLnNvbmdzLnNwbGljZShzb25nLCAxKTtcclxuXHRcdFx0dGhpcy5sZW5ndGgtLTtcclxuXHRcdFx0dGhpcy50cmlnZ2VyKCdzb25nOnJlbW92ZWQnLCBzb25nKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbiQkLmFzc2lnbihTb25ncy5wcm90b3R5cGUsIEV2ZW50cyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNvbmdzOyIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyIEV2ZW50cyA9IHJlcXVpcmUoJy4uLy4uL2V2ZW50cycpO1xyXG52YXIgJCQgPSByZXF1aXJlKCcuLi8uLi91dGlscycpO1xyXG52YXIgU29uZ3MgPSByZXF1aXJlKCcuLi9tb2RlbHMvc29uZ3MnKTtcclxuXHJcbmNsYXNzIFBsYXllclN0YXRlIHtcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHRoaXMuc29uZ3MgPSBuZXcgU29uZ3MoKTtcclxuXHRcdHRoaXMuc2VsZWN0ZWRTb25nID0gbnVsbDtcclxuXHRcdHRoaXMucGxheWluZ1NvbmcgPSBudWxsO1xyXG5cdFx0dGhpcy5pc1Zpc3VhbGl6aW5nID0gZmFsc2U7XHJcblx0XHR0aGlzLmhhdmVTb25ncyA9IGZhbHNlO1xyXG5cdFx0dGhpcy5lcXVhbGl6ZXIgPSB7XHJcblx0XHRcdCdnYWluJzogIDAsXHJcblx0XHRcdCc2MCc6ICAwLFxyXG5cdFx0XHQnMTcwJzogIDAsXHJcblx0XHRcdCczMTAnOiAgMCxcclxuXHRcdFx0JzYwMCc6ICAwLFxyXG5cdFx0XHQnMUsnOiAgMCxcclxuXHRcdFx0JzNLJzogIDAsXHJcblx0XHRcdCc2Syc6ICAwLFxyXG5cdFx0XHQnMTJLJzogIDAsXHJcblx0XHRcdCcxNEsnOiAgMCxcclxuXHRcdFx0JzE2Syc6ICAwXHJcblx0XHR9O1xyXG5cdFx0JCQub2JzZXJ2ZVByb3BlcnRpZXModGhpcyk7XHJcblx0XHQkJC5hc3NpZ24odGhpcy5lcXVhbGl6ZXIsIEV2ZW50cyk7XHJcblx0XHQkJC5vYnNlcnZlUHJvcGVydGllcyh0aGlzLmVxdWFsaXplcik7XHJcblx0XHR0aGlzLmJpbmRMaXN0ZW5lcnMoKTtcclxuXHR9XHJcblxyXG5cdGJpbmRMaXN0ZW5lcnMoKSB7XHJcblx0XHR0aGlzLmVxdWFsaXplci5vbignYWxsJywgZnVuY3Rpb24oZXZlbnRUeXBlLCB2YWx1ZSl7XHJcblx0XHRcdHZhciB0eXBlID0gZXZlbnRUeXBlLnNwbGl0KFwiOlwiKVswXTtcclxuXHJcblx0XHRcdHRoaXMudHJpZ2dlcignZXF1YWxpemVyOmNoYW5nZWQnLCB7XHJcblx0XHRcdFx0dHlwZTogdHlwZSxcclxuXHRcdFx0XHR2YWx1ZTogdmFsdWVcclxuXHRcdFx0fSk7XHJcblx0XHR9LCB0aGlzKTtcclxuXHJcblx0XHR0aGlzLnNvbmdzLm9uKCdzb25nOmFkZCcsIGZ1bmN0aW9uKHNvbmcpIHtcclxuXHRcdFx0dGhpcy50cmlnZ2VyKCdzb25nOmFkZCcsIHNvbmcpO1xyXG5cdFx0XHRpZiAodGhpcy5zb25ncy5sZW5ndGggPT09IDEpIHtcclxuXHRcdFx0XHR0aGlzLmhhdmVTb25ncyA9IHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH0sIHRoaXMpO1xyXG5cclxuXHRcdHRoaXMuc29uZ3Mub24oJ3Nvbmc6cmVtb3ZlZCcsIGZ1bmN0aW9uKHNvbmcpIHtcclxuXHRcdFx0dGhpcy50cmlnZ2VyKCdzb25nOnJlbW92ZWQnLCBzb25nKTtcclxuXHRcdFx0aWYgKHRoaXMuc29uZ3MubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdFx0dGhpcy5oYXZlU29uZ3MgPSBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fSwgdGhpcyk7XHJcblx0fVxyXG5cclxuXHRnZXRTb25nKGlkKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5zb25ncy5nZXRTb25nKGlkKTtcclxuXHR9XHJcblxyXG5cdGFkZFNvbmcoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMuc29uZ3MuYWRkU29uZyhkYXRhKTtcclxuXHR9XHJcblxyXG5cdHJlbW92ZVNvbmcoaWQpIHtcclxuXHRcdHJldHVybiB0aGlzLnNvbmdzLnJlbW92ZVNvbmcoaWQpO1xyXG5cdH1cclxufVxyXG5cclxuJCQuYXNzaWduKFBsYXllclN0YXRlLnByb3RvdHlwZSwgRXZlbnRzKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUGxheWVyU3RhdGU7XHJcblxyXG5cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIgJCQgPSByZXF1aXJlKCcuLi8uLi91dGlscycpO1xyXG52YXIgRXZlbnRzID0gcmVxdWlyZSgnLi4vLi4vZXZlbnRzJyk7XHJcbnZhciBkb20gPSByZXF1aXJlKCcuLi8uLi9kb20nKTtcclxuXHJcbmNsYXNzIEJhc2VWaWV3IHtcclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcblx0XHR0aGlzLmVsID0gb3B0aW9ucy5lbDtcclxuXHRcdHRoaXMubW9kZWwgPSBvcHRpb25zLm1vZGVsO1xyXG5cdFx0dGhpcy5zdWJ2aWV3cyA9IG9wdGlvbnMuc3Vidmlld3M7XHJcblx0XHRpZihvcHRpb25zLnRlbXBsYXRlKSB7XHJcblx0XHRcdHRoaXMudGVtcGxhdGUgPSBvcHRpb25zLnRlbXBsYXRlLmNvbnRlbnQuZmlyc3RFbGVtZW50Q2hpbGQuY2xvbmVOb2RlKHRydWUpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c2hvdygpIHtcclxuXHRcdGRvbS5zaG93KHRoaXMuZWwpO1xyXG5cdH1cclxuXHJcblx0aGlkZSgpIHtcclxuXHRcdGRvbS5oaWRlKHRoaXMuZWwpO1xyXG5cdH1cclxuXHJcblx0cmVuZGVyKCkge1xyXG5cdFx0dGhpcy5lbC5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnQpO1xyXG5cdH1cclxuXHJcblx0cmVtb3ZlKCkge1xyXG5cdFx0dGhpcy5lbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZWwpO1xyXG5cdH1cclxufVxyXG5cclxuJCQuYXNzaWduKEJhc2VWaWV3LnByb3RvdHlwZSwgRXZlbnRzKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQmFzZVZpZXc7IiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIgQmFzZVZpZXcgPSByZXF1aXJlKCcuL2Jhc2UnKTtcclxudmFyIGRvbSA9IHJlcXVpcmUoJy4uLy4uL2RvbScpO1xyXG5cclxuY2xhc3MgQ29udHJvbHNWaWV3IGV4dGVuZHMgQmFzZVZpZXcge1xyXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuXHRcdHN1cGVyKG9wdGlvbnMpO1xyXG5cdFx0dGhpcy5lbGVtcyA9IHtcclxuXHRcdFx0cHJldjogZG9tLnFzKCcuanMtcHJldicpLFxyXG5cdFx0XHRuZXh0OiBkb20ucXMoJy5qcy1uZXh0JyksXHJcblx0XHRcdHBsYXk6IGRvbS5xcygnLmpzLXBsYXknKSxcclxuXHRcdFx0cGF1c2U6IGRvbS5xcygnLmpzLXBhdXNlJyksXHJcblx0XHRcdHN0b3A6IGRvbS5xcygnLmpzLXN0b3AnKSxcclxuXHRcdFx0ZXE6IGRvbS5xcygnLmpzLWVxJylcclxuXHRcdH07XHJcblx0XHR0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xyXG5cdFx0dGhpcy5zb25ncyA9IFtdO1xyXG5cdFx0dGhpcy5iaW5kTGlzdGVuZXJzKCk7XHJcblx0fVxyXG5cclxuXHRiaW5kTGlzdGVuZXJzKCkge1xyXG5cdFx0dGhpcy5lbC5vbmNsaWNrID0gdGhpcy5vbkNvbnRyb2xDbGljay5iaW5kKHRoaXMpO1xyXG5cdFx0dGhpcy5tb2RlbC5vbignc2VsZWN0ZWRTb25nOmNoYW5nZWQnLCB0aGlzLm9uU2VsZWN0ZWRTb25nQ2hhbmdlZCwgdGhpcyk7XHJcblx0XHR0aGlzLm1vZGVsLm9uKCdwbGF5aW5nU29uZzpjaGFuZ2VkJywgdGhpcy5vblBsYXlpbmdTb25nQ2hhbmdlZCwgdGhpcyk7XHJcblx0XHR0aGlzLm1vZGVsLm9uKCdzb25nOmFkZCcsIHRoaXMub25Tb25nQWRkLCB0aGlzKTtcclxuXHR9XHJcblxyXG5cdG9uU29uZ0FkZChzb25nKSB7XHJcblx0XHR0aGlzLnNvbmdzLnB1c2goc29uZy5pZCk7XHJcblx0fVxyXG5cclxuXHRvblBsYXlpbmdTb25nQ2hhbmdlZChzb25nKSB7XHJcblx0XHRpZighc29uZykge1xyXG5cdFx0XHR0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xyXG5cdFx0XHRkb20uYWRkQ2xhc3ModGhpcy5lbGVtcy5zdG9wLCAnaWNvbl9kaXNhYmxlZCcpO1xyXG5cdFx0XHRkb20ucmVtb3ZlQ2xhc3ModGhpcy5lbGVtcy5wbGF5LCAnaWNvbl9kaXNhYmxlZCcpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHRoaXMuaXNQbGF5aW5nID0gdHJ1ZTtcclxuXHRcdFx0ZG9tLnJlbW92ZUNsYXNzKHRoaXMuZWxlbXMuc3RvcCwgJ2ljb25fZGlzYWJsZWQnKTtcclxuXHRcdFx0ZG9tLmFkZENsYXNzKHRoaXMuZWxlbXMucGxheSwgJ2ljb25fZGlzYWJsZWQnKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG9uU2VsZWN0ZWRTb25nQ2hhbmdlZChzb25nKSB7XHJcblx0XHRpZighdGhpcy5pc1BsYXlpbmcpIHtcclxuXHRcdFx0ZG9tLnJlbW92ZUNsYXNzKHRoaXMuZWxlbXMucGxheSwgJ2ljb25fZGlzYWJsZWQnKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG9uQ29udHJvbENsaWNrKGUpIHtcclxuXHRcdHZhciBjb250cm9sID0gZG9tLmNsb3Nlc3QoZS50YXJnZXQsICcuanMtY29udHJvbCcpO1xyXG5cdFx0aWYoIWNvbnRyb2wgfHwgZG9tLmhhc0NsYXNzKGNvbnRyb2wsICdpY29uX2Rpc2FibGVkJykpIHJldHVybjtcclxuXHRcdHZhciBjb250cm9sVHlwZSA9IGNvbnRyb2wuZGF0YXNldC50eXBlO1xyXG5cdFx0dGhpcy50cmlnZ2VyKCdjb250cm9sOnByZXNzZWQnLCBjb250cm9sVHlwZSk7XHJcblx0fVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IENvbnRyb2xzVmlldztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIgZG9tID0gcmVxdWlyZSgnLi4vLi4vZG9tJyk7XHJcbnZhciAkJCA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzJyk7XHJcbnZhciBCYXNlVmlldyA9IHJlcXVpcmUoJy4vYmFzZScpO1xyXG5cclxuY2xhc3MgRHJvcEFyZWFWaWV3IGV4dGVuZHMgQmFzZVZpZXcge1xyXG5cclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcblx0XHRzdXBlcihvcHRpb25zKTtcclxuXHRcdHRoaXMuaGF2ZVNvbmdzID0gZmFsc2U7XHJcblxyXG5cdFx0dGhpcy5lbGVtcyA9IHtcclxuXHRcdFx0ZHJvcEhpbnQ6IGRvbS5xcygnLmpzLWRyb3AtaGludCcsIHRoaXMuZWwpXHJcblx0XHR9O1xyXG5cdFx0dGhpcy5iaW5kTGlzdGVuZXJzKCk7XHJcblx0fVxyXG5cclxuXHRiaW5kTGlzdGVuZXJzKCkge1xyXG5cdFx0dGhpcy5tb2RlbC5vbignaGF2ZVNvbmdzOmNoYW5nZWQnLCBmdW5jdGlvbih2YWx1ZSl7XHJcblx0XHRcdHRoaXMuaGF2ZVNvbmdzID0gdmFsdWU7XHJcblx0XHR9LCB0aGlzKTtcclxuXHRcdHRoaXMuZWwub25kcm9wID0gdGhpcy5vbkZpbGVEcm9wLmJpbmQodGhpcyk7XHJcblx0XHR0aGlzLmVsLm9uZHJhZ2VudGVyID0gdGhpcy5vbkZpbGVFbnRlci5iaW5kKHRoaXMpO1xyXG5cdFx0dGhpcy5lbC5vbmRyYWdvdmVyID0gdGhpcy5vbkZpbGVEcmFnLmJpbmQodGhpcyk7XHJcblx0XHR0aGlzLmVsZW1zLmRyb3BIaW50Lm9uZHJhZ2xlYXZlID0gdGhpcy5vbkZpbGVMZWF2ZS5iaW5kKHRoaXMpO1xyXG5cdH1cclxuXHJcblx0b25GaWxlRHJhZyhlKSB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0fVxyXG5cclxuXHRvbkZpbGVEcm9wKGUpIHtcclxuXHRcdHZhciBmaWxlcyA9IFtdLnNsaWNlLmNhbGwoZS5kYXRhVHJhbnNmZXIuZmlsZXMpO1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0dGhpcy50cmlnZ2VyKCdmaWxlczphZGQnLCBmaWxlcyk7XHJcblx0XHRkb20uaGlkZSh0aGlzLmVsZW1zLmRyb3BIaW50KTtcclxuXHR9XHJcblxyXG5cdG9uRmlsZUxlYXZlKCkge1xyXG5cdFx0aWYgKHRoaXMuaGF2ZVNvbmdzKSB7XHJcblx0XHRcdGRvbS5oaWRlKHRoaXMuZWxlbXMuZHJvcEhpbnQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0b25GaWxlRW50ZXIoZSkge1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdGRvbS5zaG93KHRoaXMuZWxlbXMuZHJvcEhpbnQpO1xyXG5cdH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBEcm9wQXJlYVZpZXc7XHJcblxyXG5cclxuXHJcblxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciBkb20gPSByZXF1aXJlKCcuLi8uLi9kb20nKTtcclxudmFyICQkID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMnKTtcclxudmFyIEJhc2VWaWV3ID0gcmVxdWlyZSgnLi9iYXNlJyk7XHJcblxyXG5jbGFzcyBFcXVhbGl6ZXJWaWV3IGV4dGVuZHMgQmFzZVZpZXcge1xyXG5cclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcblx0XHRzdXBlcihvcHRpb25zKTtcclxuXHRcdFxyXG5cdFx0dGhpcy5zbGlkZXJzID0ge1xyXG5cdFx0XHQnZ2Fpbic6ICBkb20ucXMoJ1tkYXRhLXR5cGU9XCJnYWluXCJdJywgdGhpcy5lbCksXHJcblx0XHRcdCc2MCc6ICBkb20ucXMoJ1tkYXRhLXR5cGU9XCI2MFwiXScsIHRoaXMuZWwpLFxyXG5cdFx0XHQnMTcwJzogIGRvbS5xcygnW2RhdGEtdHlwZT1cIjE3MFwiXScsIHRoaXMuZWwpLFxyXG5cdFx0XHQnMzEwJzogIGRvbS5xcygnW2RhdGEtdHlwZT1cIjMxMFwiXScsIHRoaXMuZWwpLFxyXG5cdFx0XHQnNjAwJzogIGRvbS5xcygnW2RhdGEtdHlwZT1cIjYwMFwiXScsIHRoaXMuZWwpLFxyXG5cdFx0XHQnMUsnOiAgZG9tLnFzKCdbZGF0YS10eXBlPVwiMUtcIl0nLCB0aGlzLmVsKSxcclxuXHRcdFx0JzNLJzogIGRvbS5xcygnW2RhdGEtdHlwZT1cIjNLXCJdJywgdGhpcy5lbCksXHJcblx0XHRcdCc2Syc6ICBkb20ucXMoJ1tkYXRhLXR5cGU9XCI2S1wiXScsIHRoaXMuZWwpLFxyXG5cdFx0XHQnMTJLJzogIGRvbS5xcygnW2RhdGEtdHlwZT1cIjEyS1wiXScsIHRoaXMuZWwpLFxyXG5cdFx0XHQnMTRLJzogIGRvbS5xcygnW2RhdGEtdHlwZT1cIjE0S1wiXScsIHRoaXMuZWwpLFxyXG5cdFx0XHQnMTZLJzogIGRvbS5xcygnW2RhdGEtdHlwZT1cIjE2S1wiXScsIHRoaXMuZWwpXHRcclxuXHRcdH07XHJcblxyXG5cdFx0dGhpcy5zbGlkZXJzQ29vcmRzID0ge1xyXG5cdFx0XHQnZ2Fpbic6ICB0aGlzLnNsaWRlcnNbJ2dhaW4nXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuXHRcdFx0JzYwJzogIHRoaXMuc2xpZGVyc1snNjAnXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuXHRcdFx0JzE3MCc6ICB0aGlzLnNsaWRlcnNbJzE3MCddLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxyXG5cdFx0XHQnMzEwJzogIHRoaXMuc2xpZGVyc1snMzEwJ10uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcblx0XHRcdCc2MDAnOiAgdGhpcy5zbGlkZXJzWyc2MDAnXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuXHRcdFx0JzFLJzogIHRoaXMuc2xpZGVyc1snMUsnXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuXHRcdFx0JzNLJzogIHRoaXMuc2xpZGVyc1snM0snXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuXHRcdFx0JzZLJzogIHRoaXMuc2xpZGVyc1snNksnXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuXHRcdFx0JzEySyc6ICB0aGlzLnNsaWRlcnNbJzEySyddLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxyXG5cdFx0XHQnMTRLJzogIHRoaXMuc2xpZGVyc1snMTRLJ10uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcblx0XHRcdCcxNksnOiAgdGhpcy5zbGlkZXJzWycxNksnXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLmFjdGl2ZVNsaWRlciA9IG51bGw7XHJcblxyXG5cdFx0dGhpcy5zbGlkZXJTaGlmdCA9IHtcclxuXHRcdFx0c2hpZnRYOiBudWxsLFxyXG5cdFx0XHRzaGlmdFk6IG51bGxcclxuXHRcdH07XHJcblx0XHR0aGlzLmJpbmRMaXN0ZW5lcnMoKTtcclxuXHR9XHJcblxyXG5cdGJpbmRMaXN0ZW5lcnMoKSB7XHJcblx0XHR0aGlzLm1vZGVsLm9uKCdpc1Zpc3VhbGl6aW5nOmNoYW5nZWQnLCB0aGlzLm9uVmlzdWFsaXppbmdDaGFuZ2VkLCB0aGlzKTtcclxuXHRcdHdpbmRvdy5vbnJlc2l6ZSA9IHRoaXMucmVjYWxjU2xpZGVyc0Nvb3Jkcy5iaW5kKHRoaXMpO1xyXG5cdFx0dGhpcy5lbC5vbm1vdXNlZG93biA9IHRoaXMub25UaHVtYk1vdXNlRG93bi5iaW5kKHRoaXMpO1xyXG5cdFx0dGhpcy5lbC5vbmRyYWdzdGFydCA9IHRoaXMub25EcmFnU3RhcnQuYmluZCh0aGlzKTtcclxuXHR9XHJcblxyXG5cdG9uVmlzdWFsaXppbmdDaGFuZ2VkKCkge1xyXG5cdFx0IHNldFRpbWVvdXQodGhpcy5yZWNhbGNTbGlkZXJzQ29vcmRzLmJpbmQodGhpcyksIDApO1xyXG5cdH1cclxuXHJcblx0b25UaHVtYk1vdXNlRG93bihlKSB7XHJcblx0XHR2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XHJcblx0XHR2YXJcdHRodW1iQ29vcmRzO1xyXG5cclxuXHRcdGlmICghZG9tLmhhc0NsYXNzKGUudGFyZ2V0LCAnanMtdGh1bWInKSkgcmV0dXJuO1xyXG5cclxuXHRcdHRodW1iQ29vcmRzID0gdGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cdFx0dGhpcy5hY3RpdmVUaHVtYiA9IHRhcmdldDtcclxuXHRcdHRoaXMuYWN0aXZlU2xpZGVyID0gZG9tLmNsb3Nlc3QodGFyZ2V0LCAnLmpzLXNsaWRlcicpO1xyXG5cdFx0dGhpcy5zbGlkZXJTaGlmdC5zaGlmdFggPSBlLnBhZ2VYIC0gdGh1bWJDb29yZHMubGVmdDtcclxuXHRcdHRoaXMuc2xpZGVyU2hpZnQuc2hpZnRZID0gZS5wYWdlWSAtIHRodW1iQ29vcmRzLnRvcDtcclxuXHRcdGRvY3VtZW50Lm9ubW91c2Vtb3ZlID0gdGhpcy5vbkRvY3VtZW50TW91c2VNb3ZlLmJpbmQodGhpcyk7XHJcblx0XHRkb2N1bWVudC5vbm1vdXNldXAgPSB0aGlzLm9uRG9jdW1lbnRNb3VzZVVwLmJpbmQodGhpcyk7XHJcblx0fVxyXG5cclxuXHRvbkRvY3VtZW50TW91c2VNb3ZlKGUpIHtcclxuXHRcdHZhciB0eXBlID0gdGhpcy5hY3RpdmVTbGlkZXIuZGF0YXNldC50eXBlO1xyXG5cdFx0dmFyIHkgPSBlLmNsaWVudFkgLSB0aGlzLnNsaWRlclNoaWZ0LnNoaWZ0WSAtIHRoaXMuc2xpZGVyc0Nvb3Jkc1t0eXBlXS50b3A7XHJcblx0XHR0aGlzLm1vdmVUaHVtYih5KTtcclxuXHR9XHJcblxyXG5cdG9uRG9jdW1lbnRNb3VzZVVwKGUpIHtcclxuXHRcdGRvY3VtZW50Lm9ubW91c2Vtb3ZlID0gbnVsbDtcclxuXHRcdGRvY3VtZW50Lm9ubW91c2V1cCA9IG51bGw7XHJcblx0XHR0aGlzLmFjdGl2ZVNsaWRlciA9IG51bGw7XHJcblx0XHR0aGlzLmFjdGl2ZVRodW1iID0gbnVsbDtcclxuXHRcdHRoaXMuc2xpZGVyU2hpZnQuc2hpZnRYID0gbnVsbDtcclxuXHRcdHRoaXMuc2xpZGVyU2hpZnQuc2hpZnRZID0gbnVsbDtcclxuXHR9XHJcblxyXG5cdGNoZWNrQ29vcmRzKHkpIHtcclxuXHRcdHZhciB0b3BFZGdlO1xyXG5cclxuXHRcdGlmKHkgPCAwKSB7XHJcblx0XHRcdHkgPSAwO1xyXG5cdFx0fVxyXG5cdFx0dG9wRWRnZSA9IHRoaXMuYWN0aXZlU2xpZGVyLm9mZnNldEhlaWdodCAtIHRoaXMuYWN0aXZlVGh1bWIub2Zmc2V0SGVpZ2h0O1xyXG5cdFx0aWYoeSA+IHRvcEVkZ2UpIHtcclxuXHRcdFx0eSA9IHRvcEVkZ2U7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4geTtcclxuXHR9XHJcblxyXG5cdG1vdmVUaHVtYih5KSB7XHJcblx0XHR2YXIgdHlwZSA9IHRoaXMuYWN0aXZlU2xpZGVyLmRhdGFzZXQudHlwZTtcclxuXHRcdHkgPSB0aGlzLmNoZWNrQ29vcmRzKHkpO1xyXG5cdFx0dGhpcy5hY3RpdmVUaHVtYi5zdHlsZS50b3AgPSB5ICsgJ3B4JztcclxuXHRcdHRoaXMudHJpZ2dlcignc2xpZGVyOmNoYW5nZWQnLCB7dHlwZTogdHlwZSwgdmFsdWU6IE1hdGguYWJzKHkgLSAyMDApfSk7XHJcblx0fVxyXG5cclxuXHRvbkRyYWdTdGFydCgpIHtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblx0XHJcblx0cmVjYWxjU2xpZGVyc0Nvb3JkcygpIHtcclxuXHRcdE9iamVjdC5rZXlzKHRoaXMuc2xpZGVycykuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcclxuXHRcdFx0dGhpcy5zbGlkZXJzQ29vcmRzW2tleV0gPSB0aGlzLnNsaWRlcnNba2V5XS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHRcdH0sIHRoaXMpO1xyXG5cdH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBFcXVhbGl6ZXJWaWV3OyIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyIEJhc2VWaWV3ID0gcmVxdWlyZSgnLi9iYXNlJyk7XHJcbnZhciBhdWRpb0NvbnRleHQgPSByZXF1aXJlKCcuLi8uLi9hdWRpbycpLmdldEF1ZGlvQ29udGV4dCgpO1xyXG52YXIgRlJFUVVFTkNJRVMgPSBbNjAsIDE3MCwgMzEwLCA2MDAsIDEwMDAsIDMwMDAsIDYwMDAsIDEyMDAwLCAxNDAwMCwgMTYwMDBdO1xyXG52YXIgYW5hbHlzZXIgPSByZXF1aXJlKCcuLi8uLi9hdWRpb19hbmFseXNlcicpO1xyXG52YXIgZG9tID0gcmVxdWlyZSgnLi4vLi4vZG9tJyk7XHJcblxyXG5jbGFzcyBQbGF5ZXJWaWV3IGV4dGVuZHMgQmFzZVZpZXcge1xyXG5cclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcblx0XHRzdXBlcihvcHRpb25zKTtcclxuXHRcdHRoaXMuZ2FpbiA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKCk7XHJcblx0XHR0aGlzLmZpbHRlcnMgPSB0aGlzLmNyZWF0ZUZpbHRlcnMoRlJFUVVFTkNJRVMpO1xyXG5cdFx0dGhpcy5hbmFseXNlciA9IGFuYWx5c2VyO1xyXG5cdFx0dGhpcy5lbGVtcyA9IHtcclxuXHRcdFx0dmlzdWFsaXplcjogZG9tLnFzKCcuanMtdmlzdWFsaXplcicsIHRoaXMuZWwpLFxyXG5cdFx0XHRlcXVhbGl6ZXI6IGRvbS5xcygnLmpzLWVxdWFsaXplcicsIHRoaXMuZWwpXHJcblx0XHR9O1xyXG5cdFx0dGhpcy5iaW5kTGlzdGVuZXJzKCk7XHJcblx0fVxyXG5cclxuXHRiaW5kTGlzdGVuZXJzKCkge1xyXG5cdFx0dGhpcy5tb2RlbC5vbignaXNWaXN1YWxpemluZzpjaGFuZ2VkJywgdGhpcy5vblZpc3VhbGl6aW5nQ2hhbmdlZCwgdGhpcyk7XHJcblx0XHR0aGlzLm1vZGVsLm9uKCdwbGF5aW5nU29uZzpjaGFuZ2VkJywgdGhpcy5vblBsYXlpbmdTb25nQ2hhbmdlZCwgdGhpcyk7XHJcblx0XHR0aGlzLm1vZGVsLm9uKCdlcXVhbGl6ZXI6Y2hhbmdlZCcsIHRoaXMub25FcXVhbGl6ZXJDaGFuZ2VkLCB0aGlzKTtcclxuXHR9XHJcblxyXG5cdG9uRXF1YWxpemVyQ2hhbmdlZChlKSB7XHJcblx0XHRpZiAoZS50eXBlID09PSAnZ2FpbicpIHtcclxuXHRcdFx0dGhpcy5nYWluLmdhaW4udmFsdWUgPSBlLnZhbHVlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0b25WaXN1YWxpemluZ0NoYW5nZWQoaXNWaXN1YWxpemluZykge1xyXG5cdFx0aWYgKGlzVmlzdWFsaXppbmcpIHtcclxuXHRcdFx0ZG9tLmhpZGUodGhpcy5lbGVtcy5lcXVhbGl6ZXIpO1xyXG5cdFx0XHRkb20uc2hvdyh0aGlzLmVsZW1zLnZpc3VhbGl6ZXIpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdGRvbS5oaWRlKHRoaXMuZWxlbXMudmlzdWFsaXplcik7XHJcblx0XHRcdGRvbS5zaG93KHRoaXMuZWxlbXMuZXF1YWxpemVyKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG9uUGxheWluZ1NvbmdDaGFuZ2VkKHNvbmcpIHtcclxuXHRcdGlmKCFzb25nKSB7XHJcblx0XHRcdHRoaXMuc3RvcFNvbmcoKTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aGlzLnBsYXlTb25nKHNvbmcpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cGxheVNvbmcoc29uZykge1xyXG5cdFx0dGhpcy5wbGF5KHNvbmcuYXVkaW9CdWZmZXIpO1xyXG5cdH1cclxuXHJcblx0c3RvcFNvbmcoKSB7XHJcblx0XHR0aGlzLnN0b3AoKTtcclxuXHR9XHJcblxyXG5cdGNyZWF0ZUZpbHRlcnMoZnJlcXVlbmNpZXMpIHtcclxuXHRcdHZhciBmaWx0ZXJzID0gZnJlcXVlbmNpZXMubWFwKHRoaXMuY3JlYXRlRmlsdGVyKTtcclxuXHJcblx0XHRmaWx0ZXJzLnJlZHVjZShmdW5jdGlvbihwcmV2LCBjdXJyKSB7XHJcblx0XHRcdHByZXYuY29ubmVjdChjdXJyKTtcclxuXHRcdFx0cmV0dXJuIGN1cnI7XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gZmlsdGVycztcclxuXHR9XHJcblxyXG5cdGNyZWF0ZUZpbHRlcihmcmVxdWVuY3kpIHtcclxuXHRcdHZhciBmaWx0ZXIgPSBhdWRpb0NvbnRleHQuY3JlYXRlQmlxdWFkRmlsdGVyKCk7XHJcblxyXG5cdFx0ZmlsdGVyLnR5cGUgPSAncGVha2luZyc7XHJcblx0XHRmaWx0ZXIuZnJlcXVlbmN5LnZhbHVlID0gZnJlcXVlbmN5O1xyXG5cdFx0ZmlsdGVyLlEudmFsdWUgPSAxO1xyXG5cdFx0ZmlsdGVyLmdhaW4udmFsdWUgPSAwO1xyXG5cclxuXHRcdHJldHVybiBmaWx0ZXI7XHJcblx0fVxyXG5cclxuXHRwbGF5KGF1ZGlvQnVmZmVyKSB7XHJcblx0XHR0aGlzLmF1ZGlvU291cmNlID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xyXG5cdFx0dGhpcy5hdWRpb1NvdXJjZS5idWZmZXIgPSBhdWRpb0J1ZmZlcjtcclxuXHRcdHRoaXMuYXVkaW9Tb3VyY2UuY29ubmVjdCh0aGlzLmdhaW4pO1xyXG5cclxuXHRcdHRoaXMuZ2Fpbi5jb25uZWN0KHRoaXMuZmlsdGVyc1swXSk7XHJcblx0XHR0aGlzLmZpbHRlcnNbdGhpcy5maWx0ZXJzLmxlbmd0aCAtIDFdLmNvbm5lY3QodGhpcy5hbmFseXNlcik7XHJcblx0XHR0aGlzLmFuYWx5c2VyLmNvbm5lY3QoYXVkaW9Db250ZXh0LmRlc3RpbmF0aW9uKTtcclxuXHRcdHRoaXMuYXVkaW9Tb3VyY2Uuc3RhcnQoMCk7XHJcblx0fVxyXG5cclxuXHRzdG9wKCkge1xyXG5cdFx0dGhpcy5hdWRpb1NvdXJjZS5zdG9wKDApO1xyXG5cdH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQbGF5ZXJWaWV3O1xyXG5cclxuXHJcblxyXG5cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIgQmFzZVZpZXcgPSByZXF1aXJlKCcuL2Jhc2UnKTtcclxudmFyIGRvbSA9IHJlcXVpcmUoJy4uLy4uL2RvbScpO1xyXG5cclxuY2xhc3MgU29uZ0RldGFpbHNWaWV3IGV4dGVuZHMgQmFzZVZpZXcge1xyXG5cclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcblx0XHRzdXBlcihvcHRpb25zKTtcclxuXHRcdHRoaXMuZWxlbXMgPSB7XHJcblx0XHRcdGNvdmVyOiBkb20ucXMoJy5qcy1jb3ZlcicsIHRoaXMuZWwpLFxyXG5cdFx0XHR0aXRsZTogZG9tLnFzKCcuanMtdGl0bGUnLCB0aGlzLmVsKSxcclxuXHRcdFx0YXJ0aXN0OiBkb20ucXMoJy5qcy1hcnRpc3QnLCB0aGlzLmVsKSxcclxuXHRcdFx0ZmlsZU5hbWU6IGRvbS5xcygnLmpzLWZpbGVuYW1lJywgdGhpcy5lbClcclxuXHRcdH07XHJcblx0XHR0aGlzLmRlZmF1bHRQaWN0dXJlID0gdGhpcy5lbGVtcy5jb3Zlci5zcmM7XHJcblx0XHR0aGlzLnBsYXlpbmdTb25nID0gbnVsbDtcclxuXHJcblx0XHR0aGlzLmJpbmRMaXN0ZW5lcnMoKTtcclxuXHR9XHJcblxyXG5cdGJpbmRMaXN0ZW5lcnMoKSB7XHJcblx0XHR0aGlzLm1vZGVsLm9uKCdzZWxlY3RlZFNvbmc6Y2hhbmdlZCcsIHRoaXMub25TZWxlY3RlZFNvbmdDaGFuZ2VkLCB0aGlzKTtcclxuXHRcdHRoaXMubW9kZWwub24oJ3BsYXlpbmdTb25nOmNoYW5nZWQnLCBmdW5jdGlvbihzb25nKXtcclxuXHRcdFx0dGhpcy5wbGF5aW5nU29uZyA9IHNvbmc7XHJcblx0XHR9LCB0aGlzKTtcclxuXHR9XHJcblxyXG5cdG9uU2VsZWN0ZWRTb25nQ2hhbmdlZChzb25nKSB7XHJcblx0XHRpZiAodGhpcy5wbGF5aW5nU29uZykgcmV0dXJuO1xyXG5cclxuXHRcdGlmKHNvbmcucGljdHVyZSkge1xyXG5cdFx0XHR0aGlzLmVsZW1zLmNvdmVyLnNyYyA9IHNvbmcucGljdHVyZTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aGlzLmVsZW1zLmNvdmVyLnNyYyA9IHRoaXMuZGVmYXVsdFBpY3R1cmU7XHJcblx0XHR9XHJcblx0XHRpZiAoIXNvbmcudGl0bGUpIHtcclxuXHRcdFx0dGhpcy5lbGVtcy5maWxlTmFtZS50ZXh0Q29udGVudCA9ICcnO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHRoaXMuZWxlbXMuZmlsZU5hbWUudGV4dENvbnRlbnQgPSBzb25nLmZpbGVOYW1lO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5lbGVtcy50aXRsZS50ZXh0Q29udGVudCA9IHNvbmcudGl0bGUgfHwgc29uZy5maWxlTmFtZTtcclxuXHRcdHRoaXMuZWxlbXMuYXJ0aXN0LnRleHRDb250ZW50ID0gc29uZy5hcnRpc3QgfHwgJyc7XHJcblx0fVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNvbmdEZXRhaWxzVmlldzsiLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciAkJCA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzJyk7XHJcbnZhciBFdmVudHMgPSByZXF1aXJlKCcuLi8uLi9ldmVudHMnKTtcclxudmFyIGRvbSA9IHJlcXVpcmUoJy4uLy4uL2RvbScpO1xyXG52YXIgQmFzZVZpZXcgPSByZXF1aXJlKCcuL2Jhc2UnKTtcclxuXHJcbmNsYXNzIFNvbmdzTGlzdFZpZXcgZXh0ZW5kcyBCYXNlVmlldyB7XHJcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xyXG5cdFx0c3VwZXIob3B0aW9ucyk7XHJcblx0XHR0aGlzLmVsZW1zID0ge1xyXG5cdFx0XHRwbGFjZWhvbGRlcjogZG9tLnFzKCcuanMtcGxhY2Vob2xkZXInLCB0aGlzLmVsKVxyXG5cdFx0fTtcclxuXHRcdHRoaXMuYmluZExpc3RlbmVycygpO1xyXG5cdH1cclxuXHJcblx0YmluZExpc3RlbmVycygpIHtcclxuXHRcdHRoaXMubW9kZWwub24oJ3Nvbmc6YWRkJywgdGhpcy5vblNvbmdBZGQsIHRoaXMpO1xyXG5cdFx0dGhpcy5lbC5vbmNsaWNrID0gdGhpcy5vblNvbmdDbGljay5iaW5kKHRoaXMpO1xyXG5cdH1cclxuXHJcblx0b25Tb25nQ2xpY2soZSkge1xyXG5cdFx0dmFyIHRhcmdldCA9IGUudGFyZ2V0O1xyXG5cdFx0dmFyIHNvbmdFbCA9IGRvbS5jbG9zZXN0KHRhcmdldCwgJy5qcy1zb25nJyk7XHJcblxyXG5cdFx0dGhpcy5zZWxlY3RTb25nKHNvbmdFbCk7XHJcblx0XHR0aGlzLnRyaWdnZXIoJ3Nvbmc6c2VsZWN0ZWQnLCBzb25nRWwuZGF0YXNldC5pZCk7XHJcblx0fVxyXG5cclxuXHRvblNvbmdBZGQoc29uZykge1xyXG5cdFx0dmFyIHNvbmdFbCA9IHRoaXMuY3JlYXRlU29uZ0VsKHNvbmcpO1xyXG5cclxuXHRcdGlmKCF0aGlzLmhhdmVTb25ncykge1xyXG5cdFx0XHR0aGlzLmVsZW1zLnBsYWNlaG9sZGVyLnJlbW92ZSgpO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5oYXZlU29uZ3MgPSB0cnVlO1xyXG5cdFx0dGhpcy5lbC5hcHBlbmRDaGlsZChzb25nRWwpO1xyXG5cdH1cclxuXHJcblx0c2VsZWN0U29uZyhzb25nRWwpIHtcclxuXHRcdCQkLnRvQXJyYXkoc29uZ0VsLnBhcmVudE5vZGUuY2hpbGRyZW4pXHJcblx0XHRcdC5maWx0ZXIoZWwgPT4gZWwgIT09IHNvbmdFbClcclxuXHRcdFx0LmZvckVhY2goZWwgPT4gZG9tLnJlbW92ZUNsYXNzKGVsLCAnc29uZy1pdGVtX3NlbGVjdGVkJykpO1xyXG5cclxuXHRcdGRvbS5hZGRDbGFzcyhzb25nRWwsICdzb25nLWl0ZW1fc2VsZWN0ZWQnKTtcclxuXHR9XHJcblxyXG5cdGNyZWF0ZVNvbmdFbChzb25nKSB7XHJcblx0XHR2YXIgc29uZ0VsID0gdGhpcy50ZW1wbGF0ZS5jbG9uZU5vZGUodHJ1ZSk7XHJcblx0XHR2YXIgdGl0bGUgPSBkb20ucXMoJy5qcy1zb25nLXRpdGxlJywgc29uZ0VsKTtcclxuXHRcdHZhciBhcnRpc3QgPSBkb20ucXMoJy5qcy1zb25nLWFydGlzdCcsIHNvbmdFbCk7XHJcblx0XHR2YXIgY292ZXIgPSBkb20ucXMoJy5qcy1zb25nLWNvdmVyJywgc29uZ0VsKTtcclxuXHRcdHZhciBkdXJhdGlvbiA9IGRvbS5xcygnLmpzLXNvbmctZHVyYXRpb24nLCBzb25nRWwpO1xyXG5cclxuXHRcdHRpdGxlLnRleHRDb250ZW50ID0gc29uZy50aXRsZSB8fCBzb25nLmZpbGVOYW1lO1xyXG5cdFx0YXJ0aXN0LnRleHRDb250ZW50ID0gc29uZy5hcnRpc3Q7XHJcblxyXG5cdFx0ZHVyYXRpb24udGV4dENvbnRlbnQgPSB0aGlzLmZvcm1hdER1cmF0aW9uKHNvbmcuZHVyYXRpb24pO1xyXG5cdFx0c29uZ0VsLmRhdGFzZXQuaWQgPSBzb25nLmlkO1xyXG5cdFx0aWYoc29uZy5waWN0dXJlKSB7XHJcblx0XHRcdGNvdmVyLnNyYyA9IHNvbmcucGljdHVyZTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gc29uZ0VsO1xyXG5cdH1cclxuXHJcblx0Zm9ybWF0RHVyYXRpb24oc2Vjcykge1xyXG5cdFx0dmFyIG1pbnV0ZXMgPSBNYXRoLmZsb29yKHNlY3MgLyA2MCk7XHJcblx0XHR2YXIgc2Vjb25kcyA9IHNlY3MgJSA2MDtcclxuXHJcblx0XHRpZihzZWNvbmRzLnRvU3RyaW5nKCkubGVuZ3RoID09PSAxKSB7XHJcblx0XHRcdHNlY29uZHMgPSAnMCcgKyBzZWNvbmRzO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBgJHttaW51dGVzfToke3NlY29uZHN9YDtcclxuXHR9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU29uZ3NMaXN0VmlldzsgIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIgQmFzZVZpZXcgPSByZXF1aXJlKCcuL2Jhc2UnKTtcclxudmFyIGRvbSA9IHJlcXVpcmUoJy4uLy4uL2RvbScpO1xyXG52YXIgYXVkaW8gPSByZXF1aXJlKCcuLi8uLi9hdWRpbycpO1xyXG52YXIgYW5hbHlzZXIgPSByZXF1aXJlKCcuLi8uLi9hdWRpb19hbmFseXNlcicpO1xyXG5cclxuY2xhc3MgVmlzdWFsaXplclZpZXcgZXh0ZW5kcyBCYXNlVmlldyB7XHJcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xyXG5cdFx0c3VwZXIob3B0aW9ucyk7XHJcblxyXG5cdFx0dGhpcy5lbGVtcyA9IHtcclxuXHRcdFx0Y2FudmFzOiBkb20ucXMoJy5qcy1jYW52YXMnLCB0aGlzLmVsKVxyXG5cdFx0fTtcclxuXHRcdHRoaXMuZnJhbWVJZCA9IG51bGw7XHJcblx0XHR0aGlzLmNhbnZhc1cgPSB0aGlzLmVsZW1zLmNhbnZhcy5vZmZzZXRXaWR0aDtcclxuXHRcdHRoaXMuY2FudmFzSCA9IHRoaXMuZWxlbXMuY2FudmFzLm9mZnNldEhlaWdodDtcclxuXHRcdHRoaXMuY2FudmFzQ3R4ID0gdGhpcy5lbGVtcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuXHRcdHRoaXMuYmluZExpc3RlbmVycygpO1xyXG5cdH1cclxuXHJcblx0YmluZExpc3RlbmVycygpIHtcclxuXHRcdHRoaXMubW9kZWwub24oJ3BsYXlpbmdTb25nOmNoYW5nZWQnLCB0aGlzLm9uUGxheWluZ1NvbmdDaGFuZ2VkLCB0aGlzKTtcclxuXHR9XHJcblxyXG5cdG9uUGxheWluZ1NvbmdDaGFuZ2VkKHNvbmcpIHtcclxuXHRcdGlmKHNvbmcpIHtcclxuXHRcdFx0dGhpcy5zdGFydFZpc3VhbGl6YXRpb24oKTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aGlzLnN0b3BWaXN1YWxpemF0aW9uKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRjbGVhckNhbnZhcygpIHtcclxuXHRcdHRoaXMuY2FudmFzQ3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhc1csIHRoaXMuY2FudmFzSCk7XHJcblx0fVxyXG5cclxuXHRzdG9wVmlzdWFsaXphdGlvbigpIHtcclxuXHRcdGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuZnJhbWVJZCk7XHJcblx0XHR0aGlzLmNsZWFyQ2FudmFzKCk7XHJcblx0fVxyXG5cclxuXHRzdGFydFZpc3VhbGl6YXRpb24oKSB7XHJcblx0XHR2YXIgaTtcclxuXHRcdHZhciB4ID0gMDtcclxuXHRcdHZhciB2O1xyXG5cdFx0dmFyIHk7XHJcblx0XHR2YXIgc2xpY2VXaWR0aDtcclxuXHRcdHZhciBidWZmZXJMZW5ndGggPSBhbmFseXNlci5mcmVxdWVuY3lCaW5Db3VudDtcclxuXHRcdHZhciBkYXRhQXJyYXkgPSBuZXcgVWludDhBcnJheShidWZmZXJMZW5ndGgpO1xyXG5cclxuXHRcdHRoaXMuY2xlYXJDYW52YXMoKTtcclxuXHRcdHRoaXMuZnJhbWVJZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnN0YXJ0VmlzdWFsaXphdGlvbi5iaW5kKHRoaXMpKTtcclxuXHRcdGFuYWx5c2VyLmdldEJ5dGVUaW1lRG9tYWluRGF0YShkYXRhQXJyYXkpO1xyXG5cdFx0dGhpcy5jYW52YXNDdHgubGluZVdpZHRoID0gMTtcclxuXHRcdHRoaXMuY2FudmFzQ3R4LnN0cm9rZVN0eWxlID0gJ3JlZCc7XHJcblx0XHR0aGlzLmNhbnZhc0N0eC5iZWdpblBhdGgoKTtcclxuXHJcblx0XHRzbGljZVdpZHRoID0gdGhpcy5jYW52YXNXICogMS4wIC8gYnVmZmVyTGVuZ3RoO1xyXG5cclxuXHRcdGZvcihpID0gMDsgaSA8IGJ1ZmZlckxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHYgPSBkYXRhQXJyYXlbaV0gLyAxMjguMDtcclxuXHRcdFx0eSA9IHYgKiB0aGlzLmNhbnZhc0ggLyAyO1xyXG5cclxuXHRcdFx0aWYoaSA9PT0gMCkge1xyXG5cdFx0XHRcdHRoaXMuY2FudmFzQ3R4Lm1vdmVUbyh4LCB5KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHR0aGlzLmNhbnZhc0N0eC5saW5lVG8oeCwgeSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHggKz0gc2xpY2VXaWR0aDtcclxuXHRcdH1cclxuXHRcdHRoaXMuY2FudmFzQ3R4LmxpbmVUbyh0aGlzLmNhbnZhc1csIHRoaXMuY2FudmFzSCAvIDIpO1xyXG5cdFx0dGhpcy5jYW52YXNDdHguY2xvc2VQYXRoKCk7XHJcblx0XHR0aGlzLmNhbnZhc0N0eC5zdHJva2UoKTtcclxuXHR9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVmlzdWFsaXplclZpZXc7IiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIgJCQgPSByZXF1aXJlKCcuL3V0aWxzJyk7XHJcblxyXG52YXIgZG9tID0ge1xyXG5cdGJ5SWQ6IGZ1bmN0aW9uKGlkKSB7XHJcblx0XHRyZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xyXG5cdH0sXHJcblx0cXM6IGZ1bmN0aW9uKHNlbGVjdG9yLCBjb250ZXh0KSB7XHJcblx0XHRjb250ZXh0ID0gY29udGV4dCB8fCBkb2N1bWVudDtcclxuXHRcdHJldHVybiBjb250ZXh0LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xyXG5cdH0sXHJcblx0cXNhOiBmdW5jdGlvbihzZWxlY3RvciwgY29udGV4dCkge1xyXG5cdFx0Y29udGV4dCA9IGNvbnRleHQgfHwgZG9jdW1lbnQ7XHJcblx0XHRyZXR1cm4gJCQudG9BcnJheShjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcclxuXHR9LFxyXG5cdGFkZENsYXNzOiBmdW5jdGlvbihlbCwgY2xhc3NOYW1lKSB7XHJcblx0XHRlbC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XHJcblx0fSxcclxuXHRyZW1vdmVDbGFzczogZnVuY3Rpb24oZWwsIGNsYXNzTmFtZSkge1xyXG5cdFx0ZWwuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xyXG5cdH0sXHJcblx0aGFzQ2xhc3M6IGZ1bmN0aW9uKGVsLCBjbGFzc05hbWUpIHtcclxuXHRcdHJldHVybiBlbC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKTtcclxuXHR9LFxyXG5cdGhpZGU6IGZ1bmN0aW9uKC4uLmVsZW1zKSB7XHJcblx0XHRlbGVtcy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcclxuXHRcdFx0aXRlbS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cdFx0fSk7XHJcblx0fSxcclxuXHRzaG93OiBmdW5jdGlvbiguLi5lbGVtcykge1xyXG5cdFx0ZWxlbXMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XHJcblx0XHRcdGl0ZW0uc3R5bGUuZGlzcGxheSA9ICcnO1xyXG5cdFx0fSk7XHJcblx0fSxcclxuXHRjbG9zZXN0OiBmdW5jdGlvbihlbCwgc2VsZWN0b3IpIHtcclxuXHRcdGlmKGVsLmNsb3Nlc3QpIHJldHVybiBlbC5jbG9zZXN0KHNlbGVjdG9yKTtcclxuXHJcblx0XHR2YXIgcGFyZW50Tm9kZSA9IGVsO1xyXG5cdFx0dmFyIG1hdGNoZXM7XHJcblxyXG5cdFx0d2hpbGUoKG1hdGNoZXMgPSBwYXJlbnROb2RlICYmIHBhcmVudE5vZGUubWF0Y2hlcykgJiYgIXBhcmVudE5vZGUubWF0Y2hlcyhzZWxlY3RvcikpIHtcclxuXHRcdFx0cGFyZW50Tm9kZSA9IHBhcmVudE5vZGUucGFyZW50Tm9kZTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBtYXRjaGVzID8gcGFyZW50Tm9kZSA6IG51bGw7XHJcblx0fVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBkb207IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdWJzY3JpYmVycyA9IG5ldyBNYXAoKTtcblxudmFyIEV2ZW50cyA9IHtcblx0b246IGZ1bmN0aW9uKHR5cGUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG5cdFx0dmFyIGl0ZW07XG5cblx0XHRpZihzdWJzY3JpYmVycy5oYXModGhpcykpIHtcblx0XHRcdGl0ZW0gPSBzdWJzY3JpYmVycy5nZXQodGhpcyk7XG5cdFx0XHRpZihpdGVtW3R5cGVdKSB7XG5cdFx0XHRcdGl0ZW1bdHlwZV0ucHVzaCh7XG5cdFx0XHRcdFx0Y2FsbGJhY2s6IGNhbGxiYWNrLFxuXHRcdFx0XHRcdGNvbnRleHQ6IGNvbnRleHRcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0aXRlbVt0eXBlXSA9IFt7XG5cdFx0XHRcdFx0Y2FsbGJhY2s6IGNhbGxiYWNrLFxuXHRcdFx0XHRcdGNvbnRleHQ6IGNvbnRleHRcblx0XHRcdFx0fV07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0aXRlbSA9IHtcblx0XHRcdFx0W3R5cGVdOiBbe1xuXHRcdFx0XHRcdGNhbGxiYWNrOiBjYWxsYmFjayxcblx0XHRcdFx0XHRjb250ZXh0OiBjb250ZXh0XG5cdFx0XHRcdH1dXG5cdFx0XHR9O1xuXHRcdFx0c3Vic2NyaWJlcnMuc2V0KHRoaXMsIGl0ZW0pO1xuXHRcdH1cblx0fSxcblx0b2ZmOiBmdW5jdGlvbih0eXBlLCBjYWxsYmFjaykge1xuXHRcdHZhciBpdGVtLCBpO1xuXHRcdGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcblx0XHRcdHN1YnNjcmliZXJzLmRlbGV0ZSh0aGlzKTtcblx0XHR9XG5cdFx0aWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSAmJiBzdWJzY3JpYmVycy5oYXModGhpcykpIHtcblx0XHRcdGl0ZW0gPSBzdWJzY3JpYmVycy5nZXQodGhpcyk7XG5cdFx0XHRpZihpdGVtW3R5cGVdKSB7XG5cdFx0XHRcdGlmKGNhbGxiYWNrKSB7XG5cdFx0XHRcdFx0Zm9yKGkgPSAwOyBpIDwgaXRlbVt0eXBlXS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0aWYoaXRlbVt0eXBlXVtpXSA9PT0gY2FsbGJhY2spIHtcblx0XHRcdFx0XHRcdFx0aXRlbVt0eXBlXS5zcGxpY2UoaSwgMSk7XG5cdFx0XHRcdFx0XHRcdGktLTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0ZGVsZXRlIGl0ZW1bdHlwZV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cdHRyaWdnZXI6IGZ1bmN0aW9uKHR5cGUsIC4uLmFyZ3MpIHtcblx0XHR2YXIgaXRlbTtcblxuXHRcdGlmKHN1YnNjcmliZXJzLmhhcyh0aGlzKSkge1xuXHRcdFx0aXRlbSA9IHN1YnNjcmliZXJzLmdldCh0aGlzKTtcblxuXHRcdFx0aWYoaXRlbVt0eXBlXSkge1xuXHRcdFx0XHRpdGVtW3R5cGVdLmZvckVhY2goZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdFx0XHR2YXIgY29udGV4dCA9IGV2ZW50LmNvbnRleHQgfHwgdGhpcztcblx0XHRcdFx0XHRldmVudC5jYWxsYmFjay5hcHBseShjb250ZXh0LCBhcmdzKTtcblx0XHRcdFx0fSwgdGhpcyk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoaXRlbS5hbGwpIHtcblx0XHRcdFx0aXRlbS5hbGwuZm9yRWFjaChmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHRcdHZhciBjb250ZXh0ID0gZXZlbnQuY29udGV4dCB8fCB0aGlzO1xuXHRcdFx0XHRcdGFyZ3MudW5zaGlmdCh0eXBlKTtcblx0XHRcdFx0XHRldmVudC5jYWxsYmFjay5hcHBseShjb250ZXh0LCBhcmdzKTtcblx0XHRcdFx0fSwgdGhpcyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50czsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyICQkID0ge1xuXHR0b0FycmF5OiBmdW5jdGlvbihvYmplY3QpIHtcblx0XHRyZXR1cm4gW10uc2xpY2UuY2FsbChvYmplY3QpO1xuXHR9LFxuXHRhc3NpZ246IGZ1bmN0aW9uKHRhcmdldCwgLi4ucmVzdCkge1xuXHRcdGlmKHRhcmdldCA9PT0gdW5kZWZpbmVkIHx8IHRhcmdldCA9PT0gbnVsbCkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgZmlyc3QgYXJndW1lbnQgdG8gb2JqZWN0Jyk7XG5cdFx0fVxuXHRcdHJlc3QuZm9yRWFjaChvYmogPT4ge1xuXHRcdFx0aWYob2JqID09PSB1bmRlZmluZWQgfHwgb2JqID09PSBudWxsKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChrZXkgPT4ge1xuXHRcdFx0XHR0YXJnZXRba2V5XSA9IG9ialtrZXldO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH0sXG5cdG9ic2VydmVQcm9wZXJ0aWVzOiBmdW5jdGlvbihvYmopIHtcblx0XHRpZiAodHlwZW9mIG9iai50cmlnZ2VyICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHR0aHJvdyAnT2JzZXJ2ZWQgb2JqZWN0IG11c3QgaGF2ZSB0cmlnZ2VyIG1ldGhvZCc7XG5cdFx0fVxuXHRcdE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcblx0XHRcdG9ialsnXycgKyBrZXldID0gb2JqW2tleV07XG5cblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHJldHVybiBvYmpbJ18nICsga2V5XTtcblx0XHRcdFx0fSxcblx0XHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuXHRcdFx0XHRcdGlmKG9ialsnXycgKyBrZXldID09PSB2YWx1ZSkgcmV0dXJuO1xuXG5cdFx0XHRcdFx0b2JqWydfJyArIGtleV0gPSB2YWx1ZTtcblx0XHRcdFx0XHRvYmoudHJpZ2dlcihrZXkgKyAnOmNoYW5nZWQnLCB2YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sIG9iaik7XG5cdH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gJCQ7Il19
