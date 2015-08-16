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

// Visualizer

var visualizerView = new VisualizerView({
	el: dom.qs('.js-visualizer', playerView.el),
	model: playerState
});

},{"./audio_player/controllers/controls":5,"./audio_player/controllers/drop_area":6,"./audio_player/controllers/songs_list":7,"./audio_player/states/player":10,"./audio_player/views/controls":12,"./audio_player/views/drop_area":13,"./audio_player/views/equalizer":14,"./audio_player/views/player":15,"./audio_player/views/song_details":16,"./audio_player/views/songs_list":17,"./audio_player/views/visualizer":18,"./dom":19}],2:[function(require,module,exports){
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

},{"../../audio":2,"../../utils":21,"./base":4}],7:[function(require,module,exports){
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

},{"./base":4}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{"../../events":20,"../../utils":21,"./song":8}],10:[function(require,module,exports){
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
		this.observeProperties();
		this.bindListeners();
	}

	_createClass(PlayerState, [{
		key: 'observeProperties',
		value: function observeProperties() {
			Object.keys(this).forEach(function (key) {
				this['_' + key] = this[key];

				Object.defineProperty(this, key, {
					get: function get() {
						return this['_' + key];
					},
					set: function set(value) {
						if (this['_' + key] === value) return;

						this['_' + key] = value;
						this.trigger(key + ':changed', value);
					}
				});
			}, this);
		}
	}, {
		key: 'bindListeners',
		value: function bindListeners() {
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

},{"../../events":20,"../../utils":21,"../models/songs":9}],11:[function(require,module,exports){
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

},{"../../dom":19,"../../events":20,"../../utils":21}],12:[function(require,module,exports){
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

},{"../../dom":19,"./base":11}],13:[function(require,module,exports){
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

},{"../../dom":19,"../../utils":21,"./base":11}],14:[function(require,module,exports){
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
			window.onresize = this.recalcSlidersCoords.bind(this);
			this.el.onmousedown = this.onThumbMouseDown.bind(this);
			this.el.ondragstart = this.onDragStart.bind(this);
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
			this.trigger('slider:changed', { type: type, value: y });
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
			y = this.checkCoords(y);
			this.activeThumb.style.top = y + 'px';
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

},{"../../dom":19,"../../utils":21,"./base":11}],15:[function(require,module,exports){
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
		}
	}, {
		key: 'onVisualizingChanged',
		value: function onVisualizingChanged(isVisualizing) {
			if (isVisualizing) {
				dom.hide(this.elems.equalizer);
				dom.show(this.elems.visualizer);
			} else {
				dom.show(this.elems.equalizer);
				dom.hide(this.elems.visualizer);
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

},{"../../audio":2,"../../audio_analyser":3,"../../dom":19,"./base":11}],16:[function(require,module,exports){
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

},{"../../dom":19,"./base":11}],17:[function(require,module,exports){
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

},{"../../dom":19,"../../events":20,"../../utils":21,"./base":11}],18:[function(require,module,exports){
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

},{"../../audio":2,"../../audio_analyser":3,"../../dom":19,"./base":11}],19:[function(require,module,exports){
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

},{"./utils":21}],20:[function(require,module,exports){
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
		}
	}
};

module.exports = Events;

},{}],21:[function(require,module,exports){
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
	}
};

module.exports = $$;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL0phdmFzY3JpcHQvdGFza18zL3NyYy9qcy9hcHAuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL0phdmFzY3JpcHQvdGFza18zL3NyYy9qcy9hdWRpby5qcyIsIi9ob21lL2FuZHJleS9Eb2N1bWVudHMvUHJvamVjdHMvSmF2YXNjcmlwdC90YXNrXzMvc3JjL2pzL2F1ZGlvX2FuYWx5c2VyLmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy9KYXZhc2NyaXB0L3Rhc2tfMy9zcmMvanMvYXVkaW9fcGxheWVyL2NvbnRyb2xsZXJzL2Jhc2UuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL0phdmFzY3JpcHQvdGFza18zL3NyYy9qcy9hdWRpb19wbGF5ZXIvY29udHJvbGxlcnMvY29udHJvbHMuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL0phdmFzY3JpcHQvdGFza18zL3NyYy9qcy9hdWRpb19wbGF5ZXIvY29udHJvbGxlcnMvZHJvcF9hcmVhLmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy9KYXZhc2NyaXB0L3Rhc2tfMy9zcmMvanMvYXVkaW9fcGxheWVyL2NvbnRyb2xsZXJzL3NvbmdzX2xpc3QuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL0phdmFzY3JpcHQvdGFza18zL3NyYy9qcy9hdWRpb19wbGF5ZXIvbW9kZWxzL3NvbmcuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL0phdmFzY3JpcHQvdGFza18zL3NyYy9qcy9hdWRpb19wbGF5ZXIvbW9kZWxzL3NvbmdzLmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy9KYXZhc2NyaXB0L3Rhc2tfMy9zcmMvanMvYXVkaW9fcGxheWVyL3N0YXRlcy9wbGF5ZXIuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL0phdmFzY3JpcHQvdGFza18zL3NyYy9qcy9hdWRpb19wbGF5ZXIvdmlld3MvYmFzZS5qcyIsIi9ob21lL2FuZHJleS9Eb2N1bWVudHMvUHJvamVjdHMvSmF2YXNjcmlwdC90YXNrXzMvc3JjL2pzL2F1ZGlvX3BsYXllci92aWV3cy9jb250cm9scy5qcyIsIi9ob21lL2FuZHJleS9Eb2N1bWVudHMvUHJvamVjdHMvSmF2YXNjcmlwdC90YXNrXzMvc3JjL2pzL2F1ZGlvX3BsYXllci92aWV3cy9kcm9wX2FyZWEuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL0phdmFzY3JpcHQvdGFza18zL3NyYy9qcy9hdWRpb19wbGF5ZXIvdmlld3MvZXF1YWxpemVyLmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy9KYXZhc2NyaXB0L3Rhc2tfMy9zcmMvanMvYXVkaW9fcGxheWVyL3ZpZXdzL3BsYXllci5qcyIsIi9ob21lL2FuZHJleS9Eb2N1bWVudHMvUHJvamVjdHMvSmF2YXNjcmlwdC90YXNrXzMvc3JjL2pzL2F1ZGlvX3BsYXllci92aWV3cy9zb25nX2RldGFpbHMuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL0phdmFzY3JpcHQvdGFza18zL3NyYy9qcy9hdWRpb19wbGF5ZXIvdmlld3Mvc29uZ3NfbGlzdC5qcyIsIi9ob21lL2FuZHJleS9Eb2N1bWVudHMvUHJvamVjdHMvSmF2YXNjcmlwdC90YXNrXzMvc3JjL2pzL2F1ZGlvX3BsYXllci92aWV3cy92aXN1YWxpemVyLmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy9KYXZhc2NyaXB0L3Rhc2tfMy9zcmMvanMvZG9tLmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy9KYXZhc2NyaXB0L3Rhc2tfMy9zcmMvanMvZXZlbnRzLmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy9KYXZhc2NyaXB0L3Rhc2tfMy9zcmMvanMvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7O0FBRWIsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUM7QUFDeEQsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7O0FBRTFELElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO0FBQzdELElBQUksa0JBQWtCLEdBQUcsT0FBTyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7O0FBRXpFLElBQUksYUFBYSxHQUFHLE9BQU8sQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0FBQy9ELElBQUksbUJBQW1CLEdBQUcsT0FBTyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7O0FBRTNFLElBQUksZUFBZSxHQUFHLE9BQU8sQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDOztBQUVuRSxJQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsK0JBQStCLENBQUMsQ0FBQztBQUM1RCxJQUFJLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDOztBQUV4RSxJQUFJLGNBQWMsR0FBRyxPQUFPLENBQUMsaUNBQWlDLENBQUMsQ0FBQzs7QUFFaEUsSUFBSSxhQUFhLEdBQUcsT0FBTyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7O0FBRTlELElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQzs7O0FBSTNCLElBQUksV0FBVyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7OztBQUdwQyxJQUFJLFVBQVUsR0FBRyxJQUFJLFVBQVUsQ0FBQztBQUMvQixHQUFFLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7QUFDM0IsTUFBSyxFQUFFLFdBQVc7Q0FDbEIsQ0FBQyxDQUFDOzs7QUFHSCxJQUFJLFlBQVksR0FBRyxJQUFJLFlBQVks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QUM7SUFDdkIsQ0FBQyxDQUFDO0dBQ0gsQ0FBQyxDQUFDO0VBQ0g7Q0FDRCxDQUFDOztBQUVGLE1BQU0sQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyIFBsYXllclZpZXcgPSByZXF1aXJlKCcuL2F1ZGlvX3BsYXllci92aWV3cy9wbGF5ZXInKTtcclxudmFyIFBsYXllclN0YXRlID0gcmVxdWlyZSgnLi9hdWRpb19wbGF5ZXIvc3RhdGVzL3BsYXllcicpO1xyXG5cclxudmFyIERyb3BBcmVhVmlldyA9IHJlcXVpcmUoJy4vYXVkaW9fcGxheWVyL3ZpZXdzL2Ryb3BfYXJlYScpO1xyXG52YXIgRHJvcEFyZWFDb250cm9sbGVyID0gcmVxdWlyZSgnLi9hdWRpb19wbGF5ZXIvY29udHJvbGxlcnMvZHJvcF9hcmVhJyk7XHJcblxyXG52YXIgU29uZ3NMaXN0VmlldyA9IHJlcXVpcmUoJy4vYXVkaW9fcGxheWVyL3ZpZXdzL3NvbmdzX2xpc3QnKTtcclxudmFyIFNvbmdzTGlzdENvbnRyb2xsZXIgPSByZXF1aXJlKCcuL2F1ZGlvX3BsYXllci9jb250cm9sbGVycy9zb25nc19saXN0Jyk7XHJcblxyXG52YXIgU29uZ0RldGFpbHNWaWV3ID0gcmVxdWlyZSgnLi9hdWRpb19wbGF5ZXIvdmlld3Mvc29uZ19kZXRhaWxzJyk7XHJcblxyXG52YXIgQ29udHJvbHNWaWV3ID0gcmVxdWlyZSgnLi9hdWRpb19wbGF5ZXIvdmlld3MvY29udHJvbHMnKTtcclxudmFyIENvbnRyb2xzQ29udHJvbGxlciA9IHJlcXVpcmUoJy4vYXVkaW9fcGxheWVyL2NvbnRyb2xsZXJzL2NvbnRyb2xzJyk7XHJcblxyXG52YXIgVmlzdWFsaXplclZpZXcgPSByZXF1aXJlKCcuL2F1ZGlvX3BsYXllci92aWV3cy92aXN1YWxpemVyJyk7XHJcblxyXG52YXIgRXF1YWxpemVyVmlldyA9IHJlcXVpcmUoJy4vYXVkaW9fcGxheWVyL3ZpZXdzL2VxdWFsaXplcicpO1xyXG5cclxudmFyIGRvbSA9IHJlcXVpcmUoJy4vZG9tJyk7XHJcblxyXG5cclxuLy8gUGxheWVyIFN0YXRlXHJcbnZhciBwbGF5ZXJTdGF0ZSA9IG5ldyBQbGF5ZXJTdGF0ZSgpO1xyXG5cclxuLy8gTWFpblxyXG52YXIgcGxheWVyVmlldyA9IG5ldyBQbGF5ZXJWaWV3KHtcclxuXHRlbDogZG9tLmJ5SWQoJ2F1ZGlvUGxheWVyJyksXHJcblx0bW9kZWw6IHBsYXllclN0YXRlXHJcbn0pO1xyXG5cclxuLy8gRHJvcCBhcmVhXHJcbnZhciBkcm9wQXJlYVZpZXcgPSBuZXcgRHJvcEFyZWFWaWV3KHtcclxuXHRlbDogZG9tLnFzKCcuanMtZHJvcC1hcmVhJywgcGxheWVyVmlldy5lbCksXHJcblx0bW9kZWw6IHBsYXllclN0YXRlXHJcbn0pO1xyXG5cclxudmFyIGRyb3BBcmVhQ29udHJvbGxlciA9IG5ldyBEcm9wQXJlYUNvbnRyb2xsZXIoe1xyXG5cdHZpZXc6IGRyb3BBcmVhVmlldyxcclxuXHRtb2RlbDogcGxheWVyU3RhdGVcclxufSk7XHJcblxyXG4vLyBTb25ncyBMaXN0XHJcbnZhciBzb25nc0xpc3RWaWV3ID0gbmV3IFNvbmdzTGlzdFZpZXcoe1xyXG5cdGVsOiBkb20ucXMoJy5qcy1zb25ncy1saXN0JywgcGxheWVyVmlldy5lbCksXHJcblx0dGVtcGxhdGU6IGRvbS5ieUlkKCdzb25nTGlzdEl0ZW0nKSxcclxuXHRtb2RlbDogcGxheWVyU3RhdGVcclxufSk7XHJcblxyXG52YXIgc29uZ3NMaXN0Q29udHJvbGxlciA9IG5ldyBTb25nc0xpc3RDb250cm9sbGVyKHtcclxuXHRtb2RlbDogcGxheWVyU3RhdGUsXHJcblx0dmlldzogc29uZ3NMaXN0Vmlld1xyXG59KTtcclxuXHJcbi8vIERldGFpbHNcclxudmFyIHNvbmdEZXRhaWxzVmlldyA9IG5ldyBTb25nRGV0YWlsc1ZpZXcoe1xyXG5cdGVsOiBkb20ucXMoJy5qcy1zb25nLWRldGFpbHMnLCBwbGF5ZXJWaWV3LmVsKSxcclxuXHRtb2RlbDogcGxheWVyU3RhdGVcclxufSk7XHJcblxyXG5cclxuLy8gQ29udHJvbHNcclxudmFyIGNvbnRyb2xzVmlldyA9IG5ldyBDb250cm9sc1ZpZXcoe1xyXG5cdGVsOiBkb20ucXMoJy5qcy1jb250cm9scycsIHBsYXllclZpZXcuZWwpLFxyXG5cdG1vZGVsOiBwbGF5ZXJTdGF0ZVxyXG59KTtcclxuXHJcbnZhciBjb250cm9sc0NvbnRyb2xsZXIgPSBuZXcgQ29udHJvbHNDb250cm9sbGVyKHtcclxuXHRtb2RlbDogcGxheWVyU3RhdGUsXHJcblx0dmlldzogY29udHJvbHNWaWV3XHJcbn0pO1xyXG5cclxuLy8gRXF1YWxpemVyXHJcblxyXG52YXIgZXF1YWxpemVyVmlldyA9IG5ldyBFcXVhbGl6ZXJWaWV3KHtcclxuXHRlbDogZG9tLnFzKCcuanMtZXF1YWxpemVyJywgcGxheWVyVmlldy5lbCksXHJcblx0bW9kZWw6IHBsYXllclN0YXRlXHJcbn0pO1xyXG5cclxuLy8gVmlzdWFsaXplclxyXG5cclxudmFyIHZpc3VhbGl6ZXJWaWV3ID0gbmV3IFZpc3VhbGl6ZXJWaWV3KHtcclxuXHRlbDogZG9tLnFzKCcuanMtdmlzdWFsaXplcicsIHBsYXllclZpZXcuZWwpLFxyXG5cdG1vZGVsOiBwbGF5ZXJTdGF0ZVxyXG59KTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIgYXVkaW9FbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2F1ZGlvJyk7XHJcbnZhciBBdWRpb0NvbnRleHQgPSB3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQ7XHJcbnZhciBhdWRpb0NvbnRleHQgPSBudWxsO1xyXG52YXIgQVVESU9fRk9STUFUUyA9IFtcclxuXHR7XHJcblx0XHR0eXBlOiAnYXVkaW8vbXBlZycsXHJcblx0XHRleHQ6ICdtcDMnXHJcblx0fSxcclxuXHR7XHJcblx0XHR0eXBlOiAnYXVkaW8vb2dnOyBjb2RlY3M9XCJ2b3JiaXNcIicsXHJcblx0XHRleHQ6ICdvZ2cnXHJcblx0fSxcclxuXHR7XHJcblx0XHR0eXBlOiAnYXVkaW8vd2F2OyBjb2RlY3M9XCIxXCInLFxyXG5cdFx0ZXh0OiAnd2F2J1xyXG5cdH0sXHJcblx0e1xyXG5cdFx0dHlwZTogJ2F1ZGlvL21wNDsgY29kZWNzPVwibXA0YS40MC4yXCInLFxyXG5cdFx0ZXh0OiAnYWFjJ1xyXG5cdH0sXHJcblx0e1xyXG5cdFx0dHlwZTogJ2F1ZGlvL3dlYm0nLFxyXG5cdFx0ZXh0OiAnd2ViYSdcclxuXHR9LFxyXG5cdHtcclxuXHRcdHR5cGU6ICdhdWRpby9mbGFjJyxcclxuXHRcdGV4dDogJ2ZsYWMnXHJcblx0fVxyXG5dO1xyXG5cclxudmFyIFNVUFBPUlRFRF9GT1JNQVRTID0gQVVESU9fRk9STUFUUy5maWx0ZXIoZm9ybWF0ID0+IHtcclxuXHRyZXR1cm4gYXVkaW9FbC5jYW5QbGF5VHlwZShmb3JtYXQudHlwZSkgIT09ICcnO1xyXG59KTtcclxuXHJcbmlmIChBdWRpb0NvbnRleHQpIHtcclxuXHRhdWRpb0NvbnRleHQgPSBuZXcgQXVkaW9Db250ZXh0O1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRTVVBQT1JURURfRk9STUFUUzogU1VQUE9SVEVEX0ZPUk1BVFMsXHJcblx0Z2V0QXVkaW9Db250ZXh0OiBmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiBhdWRpb0NvbnRleHQ7XHJcblx0fVxyXG59O1xyXG4iLCJ2YXIgYXVkaW9Db250ZXh0ID0gcmVxdWlyZSgnLi9hdWRpbycpLmdldEF1ZGlvQ29udGV4dCgpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBhdWRpb0NvbnRleHQuY3JlYXRlQW5hbHlzZXIoKTsiLCJcInVzZSBzdHJpY3RcIjtcblxuY2xhc3MgQmFzZUNvbnRyb2xsZXIge1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0dGhpcy5tb2RlbCA9IG9wdGlvbnMubW9kZWw7XG5cdFx0dGhpcy52aWV3ID0gb3B0aW9ucy52aWV3O1xuXHRcdHRoaXMuYmluZExpc3RlbmVycygpO1xuXHR9XG5cblx0YmluZExpc3RlbmVycygpIHt9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQmFzZUNvbnRyb2xsZXI7IiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIgQmFzZUNvbnRyb2xsZXIgPSByZXF1aXJlKCcuL2Jhc2UnKTtcclxuXHJcbmNsYXNzIENvbnRyb2xzQ29udHJvbGxlciBleHRlbmRzIEJhc2VDb250cm9sbGVyIHtcclxuXHRiaW5kTGlzdGVuZXJzKCkge1xyXG5cdFx0dGhpcy52aWV3Lm9uKCdjb250cm9sOnByZXNzZWQnLCB0aGlzLm9uQ29udHJvbFByZXNzZWQsIHRoaXMpO1xyXG5cdH1cclxuXHJcblx0b25Db250cm9sUHJlc3NlZChjb250cm9sVHlwZSkge1xyXG5cdFx0c3dpdGNoKGNvbnRyb2xUeXBlKSB7XHJcblx0XHRcdGNhc2UgJ3BsYXknOlxyXG5cdFx0XHRcdHRoaXMubW9kZWwucGxheWluZ1NvbmcgPSB0aGlzLm1vZGVsLnNlbGVjdGVkU29uZztcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnc3RvcCc6XHJcblx0XHRcdFx0dGhpcy5tb2RlbC5wbGF5aW5nU29uZyA9IG51bGw7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ2VxJzpcclxuXHRcdFx0XHR0aGlzLm1vZGVsLmlzVmlzdWFsaXppbmcgPSAhdGhpcy5tb2RlbC5pc1Zpc3VhbGl6aW5nO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDb250cm9sc0NvbnRyb2xsZXI7IiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIgJCQgPSByZXF1aXJlKCcuLi8uLi91dGlscycpO1xyXG52YXIgYXVkaW8gPSByZXF1aXJlKCcuLi8uLi9hdWRpbycpO1xyXG52YXIgYXVkaW9Db250ZXh0ID0gYXVkaW8uZ2V0QXVkaW9Db250ZXh0KCk7XHJcbnZhciBCYXNlQ29udHJvbGxlciA9IHJlcXVpcmUoJy4vYmFzZScpO1xyXG5cclxuY2xhc3MgUGxheWVyQ29udHJvbGxlciBleHRlbmRzIEJhc2VDb250cm9sbGVyIHtcclxuXHJcblx0YmluZExpc3RlbmVycygpIHtcclxuXHRcdHRoaXMudmlldy5vbignZmlsZXM6YWRkJywgdGhpcy5vbkZpbGVzQWRkLCB0aGlzKTtcclxuXHR9XHJcblxyXG5cdG9uRmlsZXNBZGQoZmlsZXMpIHtcclxuXHRcdHZhciBzZWxmID0gdGhpcztcclxuXHJcblx0XHR0aGlzLmZpbHRlckF1ZGlvRmlsZXMoZmlsZXMpLmZvckVhY2goZnVuY3Rpb24oZmlsZSkge1xyXG5cdFx0XHRQcm9taXNlLmFsbChbdGhpcy5nZXRTb25nSW5mbyhmaWxlLCBbXCJ0aXRsZVwiLCBcImFydGlzdFwiLCBcInBpY3R1cmVcIl0pLCB0aGlzLmRlY29kZVNvbmcoZmlsZSldKVxyXG5cdFx0XHRcdC50aGVuKGZ1bmN0aW9uKHZhbHVlcykge1xyXG5cdFx0XHRcdFx0JCQuYXNzaWduKHZhbHVlc1swXSwgdmFsdWVzWzFdLCB7ZmlsZU5hbWU6IGZpbGUubmFtZX0pO1xyXG5cdFx0XHRcdFx0c2VsZi5tb2RlbC5hZGRTb25nKHZhbHVlc1swXSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHR9LCB0aGlzKTtcclxuXHR9XHJcblxyXG5cdGZpbHRlckF1ZGlvRmlsZXMoZmlsZXMpIHtcclxuXHRcdHJldHVybiBmaWxlcy5maWx0ZXIodGhpcy5pc0F1ZGlvRmlsZSwgdGhpcyk7XHJcblx0fVxyXG5cclxuXHRpc0F1ZGlvRmlsZShmaWxlKSB7XHJcblx0XHR2YXIgc3VwcG9ydCA9IGZhbHNlO1xyXG5cclxuXHRcdGF1ZGlvLlNVUFBPUlRFRF9GT1JNQVRTLmZvckVhY2goZm9ybWF0ID0+IHtcclxuXHRcdFx0aWYoZmlsZS5uYW1lLnNlYXJjaChmb3JtYXQuZXh0KSAhPT0gLTEpIHtcclxuXHRcdFx0XHRzdXBwb3J0ID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIHN1cHBvcnQ7XHJcblx0fVxyXG5cclxuXHRnZXRTb25nSW5mbyhmaWxlLCB0YWdzKSB7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblx0XHRcdHZhciB1cmwgPSBmaWxlLnVybiB8fCBmaWxlLm5hbWU7XHJcblxyXG5cdFx0XHRJRDMubG9hZFRhZ3ModXJsLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdHZhciBhbGxUYWdzID0gSUQzLmdldEFsbFRhZ3ModXJsKTtcclxuXHRcdFx0XHRcdHZhciBwaWN0dXJlO1xyXG5cdFx0XHRcdFx0dmFyIHJlc3VsdCA9IHt9O1xyXG5cdFx0XHRcdFx0dmFyIGRhdGFVcmw7XHJcblx0XHRcdFx0XHR2YXIgYmFzZTY0U3RyaW5nO1xyXG5cclxuXHRcdFx0XHRcdHRhZ3MuZm9yRWFjaChmdW5jdGlvbih0YWcpIHtcclxuXHRcdFx0XHRcdFx0aWYgKHRhZyA9PT0gJ3BpY3R1cmUnICYmIGFsbFRhZ3MucGljdHVyZSkge1xyXG5cdFx0XHRcdFx0XHRcdHBpY3R1cmUgPSBhbGxUYWdzLnBpY3R1cmU7XHJcblx0XHRcdFx0XHRcdFx0YmFzZTY0U3RyaW5nID0gXCJcIjtcclxuXHJcblx0XHRcdFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IHBpY3R1cmUuZGF0YS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0XHRcdFx0YmFzZTY0U3RyaW5nICs9IFN0cmluZy5mcm9tQ2hhckNvZGUocGljdHVyZS5kYXRhW2ldKTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0ZGF0YVVybCA9IFwiZGF0YTpcIiArIHBpY3R1cmUuZm9ybWF0ICsgXCI7YmFzZTY0LFwiICsgd2luZG93LmJ0b2EoYmFzZTY0U3RyaW5nKTtcclxuXHRcdFx0XHRcdFx0XHRyZXN1bHQucGljdHVyZSA9IGRhdGFVcmw7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0cmVzdWx0W3RhZ10gPSBhbGxUYWdzW3RhZ107XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdHJlc29sdmUocmVzdWx0KTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHRhZ3M6IHRhZ3MsXHJcblx0XHRcdFx0XHRkYXRhUmVhZGVyOiBGaWxlQVBJUmVhZGVyKGZpbGUpLFxyXG5cdFx0XHRcdFx0b25FcnJvcjogZnVuY3Rpb24ocmVhc29uKSB7XHJcblx0XHRcdFx0XHRcdHJlamVjdChyZWFzb24pO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRkZWNvZGVTb25nKGZpbGUpIHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHRcdFx0dmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcblxyXG5cdFx0XHRyZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoZmlsZSk7XHJcblx0XHRcdHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHR2YXIgYnVmZmVyID0gdGhpcy5yZXN1bHQ7XHJcblxyXG5cdFx0XHRcdGF1ZGlvQ29udGV4dC5kZWNvZGVBdWRpb0RhdGEoYnVmZmVyLCBhdWRpb0J1ZmZlciA9PiB7XHJcblx0XHRcdFx0XHRyZXNvbHZlKHtcclxuXHRcdFx0XHRcdFx0YXVkaW9CdWZmZXI6IGF1ZGlvQnVmZmVyLFxyXG5cdFx0XHRcdFx0XHRzYW1wbGVSYXRlOiBhdWRpb0J1ZmZlci5zYW1wbGVSYXRlLFxyXG5cdFx0XHRcdFx0XHRkdXJhdGlvbjogYXVkaW9CdWZmZXIuZHVyYXRpb25cclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0cmVhZGVyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRyZWplY3QocmVhZGVyLmVycm9yKTtcclxuXHRcdFx0fTtcclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQbGF5ZXJDb250cm9sbGVyO1xyXG5cclxuXHJcblxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciBCYXNlQ29udHJvbGxlciA9IHJlcXVpcmUoJy4vYmFzZScpO1xyXG5cclxuY2xhc3MgU29uZ3NMaXN0Q29udHJvbGxlciBleHRlbmRzIEJhc2VDb250cm9sbGVyIHtcclxuXHRiaW5kTGlzdGVuZXJzKCkge1xyXG5cdFx0dGhpcy52aWV3Lm9uKCdzb25nOnNlbGVjdGVkJywgdGhpcy5vblNvbmdTZWxlY3RlZCwgdGhpcyk7XHJcblx0fVxyXG5cclxuXHRvblNvbmdTZWxlY3RlZChzb25nSWQpIHtcclxuXHRcdHRoaXMubW9kZWwuc2VsZWN0ZWRTb25nID0gdGhpcy5tb2RlbC5nZXRTb25nKE51bWJlcihzb25nSWQpKTtcclxuXHR9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU29uZ3NMaXN0Q29udHJvbGxlcjsiLCJ2YXIgaWQgPSAxO1xyXG5cclxuY2xhc3MgU29uZyB7XHJcblx0Y29uc3RydWN0b3IoZGF0YSkge1xyXG5cdFx0dGhpcy5pZCA9IGlkO1xyXG5cdFx0dGhpcy5hdWRpb0J1ZmZlciA9IGRhdGEuYXVkaW9CdWZmZXI7XHJcblx0XHR0aGlzLmZpbGVOYW1lID0gZGF0YS5maWxlTmFtZTtcclxuXHRcdHRoaXMudGl0bGUgPSBkYXRhLnRpdGxlIHx8ICcnO1xyXG5cdFx0dGhpcy5hcnRpc3QgPSBkYXRhLmFydGlzdCB8fCAnJztcclxuXHRcdHRoaXMuZHVyYXRpb24gPSBNYXRoLnJvdW5kKGRhdGEuZHVyYXRpb24pO1xyXG5cdFx0dGhpcy5waWN0dXJlID0gZGF0YS5waWN0dXJlIHx8IG51bGw7XHJcblx0XHRpZCsrO1xyXG5cdH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTb25nOyIsInZhciBFdmVudHMgPSByZXF1aXJlKCcuLi8uLi9ldmVudHMnKTtcclxudmFyICQkID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMnKTtcclxudmFyIFNvbmcgPSByZXF1aXJlKCcuL3NvbmcnKTtcclxuXHJcbmNsYXNzIFNvbmdzIHtcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHRoaXMuc29uZ3MgPSBbXTtcclxuXHRcdHRoaXMubGVuZ3RoID0gMDtcclxuXHR9XHJcblxyXG5cdGdldFNvbmcoaWQpIHtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLnNvbmdzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmKGlkID09PSB0aGlzLnNvbmdzW2ldLmlkKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuc29uZ3NbaV07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFkZFNvbmcoZGF0YSkge1xyXG5cdFx0dmFyIHNvbmcgPSBuZXcgU29uZyhkYXRhKTtcclxuXHRcdHRoaXMuc29uZ3MucHVzaChzb25nKTtcclxuXHRcdHRoaXMubGVuZ3RoKys7XHJcblx0XHR0aGlzLnRyaWdnZXIoJ3Nvbmc6YWRkJywgc29uZyk7XHJcblx0fVxyXG5cclxuXHRyZW1vdmVTb25nKGlkKSB7XHJcblx0XHR2YXIgc29uZyA9IHRoaXMuZ2V0U29uZyhpZCk7XHJcblx0XHRpZihzb25nICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0dGhpcy5zb25ncy5zcGxpY2Uoc29uZywgMSk7XHJcblx0XHRcdHRoaXMubGVuZ3RoLS07XHJcblx0XHRcdHRoaXMudHJpZ2dlcignc29uZzpyZW1vdmVkJywgc29uZyk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG4kJC5hc3NpZ24oU29uZ3MucHJvdG90eXBlLCBFdmVudHMpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTb25nczsiLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciBFdmVudHMgPSByZXF1aXJlKCcuLi8uLi9ldmVudHMnKTtcclxudmFyICQkID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMnKTtcclxudmFyIFNvbmdzID0gcmVxdWlyZSgnLi4vbW9kZWxzL3NvbmdzJyk7XHJcblxyXG5jbGFzcyBQbGF5ZXJTdGF0ZSB7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHR0aGlzLnNvbmdzID0gbmV3IFNvbmdzKCk7XHJcblx0XHR0aGlzLnNlbGVjdGVkU29uZyA9IG51bGw7XHJcblx0XHR0aGlzLnBsYXlpbmdTb25nID0gbnVsbDtcclxuXHRcdHRoaXMuaXNWaXN1YWxpemluZyA9IGZhbHNlO1xyXG5cdFx0dGhpcy5oYXZlU29uZ3MgPSBmYWxzZTtcclxuXHRcdHRoaXMuZXF1YWxpemVyID0ge1xyXG5cdFx0XHQnZ2Fpbic6ICAwLFxyXG5cdFx0XHQnNjAnOiAgMCxcclxuXHRcdFx0JzE3MCc6ICAwLFxyXG5cdFx0XHQnMzEwJzogIDAsXHJcblx0XHRcdCc2MDAnOiAgMCxcclxuXHRcdFx0JzFLJzogIDAsXHJcblx0XHRcdCczSyc6ICAwLFxyXG5cdFx0XHQnNksnOiAgMCxcclxuXHRcdFx0JzEySyc6ICAwLFxyXG5cdFx0XHQnMTRLJzogIDAsXHJcblx0XHRcdCcxNksnOiAgMFxyXG5cdFx0fTtcclxuXHRcdHRoaXMub2JzZXJ2ZVByb3BlcnRpZXMoKTtcclxuXHRcdHRoaXMuYmluZExpc3RlbmVycygpO1xyXG5cdH1cclxuXHJcblx0b2JzZXJ2ZVByb3BlcnRpZXMoKSB7XHJcblx0XHRPYmplY3Qua2V5cyh0aGlzKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xyXG5cdFx0XHR0aGlzWydfJyArIGtleV0gPSB0aGlzW2tleV07XHJcblxyXG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywga2V5LCB7XHJcblx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdHJldHVybiB0aGlzWydfJyArIGtleV07XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcblx0XHRcdFx0XHRpZih0aGlzWydfJyArIGtleV0gPT09IHZhbHVlKSByZXR1cm47XHJcblxyXG5cdFx0XHRcdFx0dGhpc1snXycgKyBrZXldID0gdmFsdWU7XHJcblx0XHRcdFx0XHR0aGlzLnRyaWdnZXIoa2V5ICsgJzpjaGFuZ2VkJywgdmFsdWUpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9LCB0aGlzKTtcclxuXHR9XHJcblxyXG5cdGJpbmRMaXN0ZW5lcnMoKSB7XHJcblx0XHR0aGlzLnNvbmdzLm9uKCdzb25nOmFkZCcsIGZ1bmN0aW9uKHNvbmcpIHtcclxuXHRcdFx0dGhpcy50cmlnZ2VyKCdzb25nOmFkZCcsIHNvbmcpO1xyXG5cdFx0XHRpZiAodGhpcy5zb25ncy5sZW5ndGggPT09IDEpIHtcclxuXHRcdFx0XHR0aGlzLmhhdmVTb25ncyA9IHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH0sIHRoaXMpO1xyXG5cclxuXHRcdHRoaXMuc29uZ3Mub24oJ3Nvbmc6cmVtb3ZlZCcsIGZ1bmN0aW9uKHNvbmcpIHtcclxuXHRcdFx0dGhpcy50cmlnZ2VyKCdzb25nOnJlbW92ZWQnLCBzb25nKTtcclxuXHRcdFx0aWYgKHRoaXMuc29uZ3MubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdFx0dGhpcy5oYXZlU29uZ3MgPSBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fSwgdGhpcyk7XHJcblx0fVxyXG5cclxuXHRnZXRTb25nKGlkKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5zb25ncy5nZXRTb25nKGlkKTtcclxuXHR9XHJcblxyXG5cdGFkZFNvbmcoZGF0YSkge1xyXG5cdFx0cmV0dXJuIHRoaXMuc29uZ3MuYWRkU29uZyhkYXRhKTtcclxuXHR9XHJcblxyXG5cdHJlbW92ZVNvbmcoaWQpIHtcclxuXHRcdHJldHVybiB0aGlzLnNvbmdzLnJlbW92ZVNvbmcoaWQpO1xyXG5cdH1cclxufVxyXG5cclxuJCQuYXNzaWduKFBsYXllclN0YXRlLnByb3RvdHlwZSwgRXZlbnRzKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUGxheWVyU3RhdGU7XHJcblxyXG5cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIgJCQgPSByZXF1aXJlKCcuLi8uLi91dGlscycpO1xyXG52YXIgRXZlbnRzID0gcmVxdWlyZSgnLi4vLi4vZXZlbnRzJyk7XHJcbnZhciBkb20gPSByZXF1aXJlKCcuLi8uLi9kb20nKTtcclxuXHJcbmNsYXNzIEJhc2VWaWV3IHtcclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcblx0XHR0aGlzLmVsID0gb3B0aW9ucy5lbDtcclxuXHRcdHRoaXMubW9kZWwgPSBvcHRpb25zLm1vZGVsO1xyXG5cdFx0dGhpcy5zdWJ2aWV3cyA9IG9wdGlvbnMuc3Vidmlld3M7XHJcblx0XHRpZihvcHRpb25zLnRlbXBsYXRlKSB7XHJcblx0XHRcdHRoaXMudGVtcGxhdGUgPSBvcHRpb25zLnRlbXBsYXRlLmNvbnRlbnQuZmlyc3RFbGVtZW50Q2hpbGQuY2xvbmVOb2RlKHRydWUpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c2hvdygpIHtcclxuXHRcdGRvbS5zaG93KHRoaXMuZWwpO1xyXG5cdH1cclxuXHJcblx0aGlkZSgpIHtcclxuXHRcdGRvbS5oaWRlKHRoaXMuZWwpO1xyXG5cdH1cclxuXHJcblx0cmVuZGVyKCkge1xyXG5cdFx0dGhpcy5lbC5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnQpO1xyXG5cdH1cclxuXHJcblx0cmVtb3ZlKCkge1xyXG5cdFx0dGhpcy5lbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZWwpO1xyXG5cdH1cclxufVxyXG5cclxuJCQuYXNzaWduKEJhc2VWaWV3LnByb3RvdHlwZSwgRXZlbnRzKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQmFzZVZpZXc7IiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIgQmFzZVZpZXcgPSByZXF1aXJlKCcuL2Jhc2UnKTtcclxudmFyIGRvbSA9IHJlcXVpcmUoJy4uLy4uL2RvbScpO1xyXG5cclxuY2xhc3MgQ29udHJvbHNWaWV3IGV4dGVuZHMgQmFzZVZpZXcge1xyXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuXHRcdHN1cGVyKG9wdGlvbnMpO1xyXG5cdFx0dGhpcy5lbGVtcyA9IHtcclxuXHRcdFx0cHJldjogZG9tLnFzKCcuanMtcHJldicpLFxyXG5cdFx0XHRuZXh0OiBkb20ucXMoJy5qcy1uZXh0JyksXHJcblx0XHRcdHBsYXk6IGRvbS5xcygnLmpzLXBsYXknKSxcclxuXHRcdFx0cGF1c2U6IGRvbS5xcygnLmpzLXBhdXNlJyksXHJcblx0XHRcdHN0b3A6IGRvbS5xcygnLmpzLXN0b3AnKSxcclxuXHRcdFx0ZXE6IGRvbS5xcygnLmpzLWVxJylcclxuXHRcdH07XHJcblx0XHR0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xyXG5cdFx0dGhpcy5zb25ncyA9IFtdO1xyXG5cdFx0dGhpcy5iaW5kTGlzdGVuZXJzKCk7XHJcblx0fVxyXG5cclxuXHRiaW5kTGlzdGVuZXJzKCkge1xyXG5cdFx0dGhpcy5lbC5vbmNsaWNrID0gdGhpcy5vbkNvbnRyb2xDbGljay5iaW5kKHRoaXMpO1xyXG5cdFx0dGhpcy5tb2RlbC5vbignc2VsZWN0ZWRTb25nOmNoYW5nZWQnLCB0aGlzLm9uU2VsZWN0ZWRTb25nQ2hhbmdlZCwgdGhpcyk7XHJcblx0XHR0aGlzLm1vZGVsLm9uKCdwbGF5aW5nU29uZzpjaGFuZ2VkJywgdGhpcy5vblBsYXlpbmdTb25nQ2hhbmdlZCwgdGhpcyk7XHJcblx0XHR0aGlzLm1vZGVsLm9uKCdzb25nOmFkZCcsIHRoaXMub25Tb25nQWRkLCB0aGlzKTtcclxuXHR9XHJcblxyXG5cdG9uU29uZ0FkZChzb25nKSB7XHJcblx0XHR0aGlzLnNvbmdzLnB1c2goc29uZy5pZCk7XHJcblx0fVxyXG5cclxuXHRvblBsYXlpbmdTb25nQ2hhbmdlZChzb25nKSB7XHJcblx0XHRpZighc29uZykge1xyXG5cdFx0XHR0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xyXG5cdFx0XHRkb20uYWRkQ2xhc3ModGhpcy5lbGVtcy5zdG9wLCAnaWNvbl9kaXNhYmxlZCcpO1xyXG5cdFx0XHRkb20ucmVtb3ZlQ2xhc3ModGhpcy5lbGVtcy5wbGF5LCAnaWNvbl9kaXNhYmxlZCcpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHRoaXMuaXNQbGF5aW5nID0gdHJ1ZTtcclxuXHRcdFx0ZG9tLnJlbW92ZUNsYXNzKHRoaXMuZWxlbXMuc3RvcCwgJ2ljb25fZGlzYWJsZWQnKTtcclxuXHRcdFx0ZG9tLmFkZENsYXNzKHRoaXMuZWxlbXMucGxheSwgJ2ljb25fZGlzYWJsZWQnKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG9uU2VsZWN0ZWRTb25nQ2hhbmdlZChzb25nKSB7XHJcblx0XHRpZighdGhpcy5pc1BsYXlpbmcpIHtcclxuXHRcdFx0ZG9tLnJlbW92ZUNsYXNzKHRoaXMuZWxlbXMucGxheSwgJ2ljb25fZGlzYWJsZWQnKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG9uQ29udHJvbENsaWNrKGUpIHtcclxuXHRcdHZhciBjb250cm9sID0gZG9tLmNsb3Nlc3QoZS50YXJnZXQsICcuanMtY29udHJvbCcpO1xyXG5cdFx0aWYoIWNvbnRyb2wgfHwgZG9tLmhhc0NsYXNzKGNvbnRyb2wsICdpY29uX2Rpc2FibGVkJykpIHJldHVybjtcclxuXHRcdHZhciBjb250cm9sVHlwZSA9IGNvbnRyb2wuZGF0YXNldC50eXBlO1xyXG5cdFx0dGhpcy50cmlnZ2VyKCdjb250cm9sOnByZXNzZWQnLCBjb250cm9sVHlwZSk7XHJcblx0fVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IENvbnRyb2xzVmlldztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIgZG9tID0gcmVxdWlyZSgnLi4vLi4vZG9tJyk7XHJcbnZhciAkJCA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzJyk7XHJcbnZhciBCYXNlVmlldyA9IHJlcXVpcmUoJy4vYmFzZScpO1xyXG5cclxuY2xhc3MgRHJvcEFyZWFWaWV3IGV4dGVuZHMgQmFzZVZpZXcge1xyXG5cclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcblx0XHRzdXBlcihvcHRpb25zKTtcclxuXHRcdHRoaXMuaGF2ZVNvbmdzID0gZmFsc2U7XHJcblxyXG5cdFx0dGhpcy5lbGVtcyA9IHtcclxuXHRcdFx0ZHJvcEhpbnQ6IGRvbS5xcygnLmpzLWRyb3AtaGludCcsIHRoaXMuZWwpXHJcblx0XHR9O1xyXG5cdFx0dGhpcy5iaW5kTGlzdGVuZXJzKCk7XHJcblx0fVxyXG5cclxuXHRiaW5kTGlzdGVuZXJzKCkge1xyXG5cdFx0dGhpcy5tb2RlbC5vbignaGF2ZVNvbmdzOmNoYW5nZWQnLCBmdW5jdGlvbih2YWx1ZSl7XHJcblx0XHRcdHRoaXMuaGF2ZVNvbmdzID0gdmFsdWU7XHJcblx0XHR9LCB0aGlzKTtcclxuXHRcdHRoaXMuZWwub25kcm9wID0gdGhpcy5vbkZpbGVEcm9wLmJpbmQodGhpcyk7XHJcblx0XHR0aGlzLmVsLm9uZHJhZ2VudGVyID0gdGhpcy5vbkZpbGVFbnRlci5iaW5kKHRoaXMpO1xyXG5cdFx0dGhpcy5lbC5vbmRyYWdvdmVyID0gdGhpcy5vbkZpbGVEcmFnLmJpbmQodGhpcyk7XHJcblx0XHR0aGlzLmVsZW1zLmRyb3BIaW50Lm9uZHJhZ2xlYXZlID0gdGhpcy5vbkZpbGVMZWF2ZS5iaW5kKHRoaXMpO1xyXG5cdH1cclxuXHJcblx0b25GaWxlRHJhZyhlKSB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0fVxyXG5cclxuXHRvbkZpbGVEcm9wKGUpIHtcclxuXHRcdHZhciBmaWxlcyA9IFtdLnNsaWNlLmNhbGwoZS5kYXRhVHJhbnNmZXIuZmlsZXMpO1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0dGhpcy50cmlnZ2VyKCdmaWxlczphZGQnLCBmaWxlcyk7XHJcblx0XHRkb20uaGlkZSh0aGlzLmVsZW1zLmRyb3BIaW50KTtcclxuXHR9XHJcblxyXG5cdG9uRmlsZUxlYXZlKCkge1xyXG5cdFx0aWYgKHRoaXMuaGF2ZVNvbmdzKSB7XHJcblx0XHRcdGRvbS5oaWRlKHRoaXMuZWxlbXMuZHJvcEhpbnQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0b25GaWxlRW50ZXIoZSkge1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdGRvbS5zaG93KHRoaXMuZWxlbXMuZHJvcEhpbnQpO1xyXG5cdH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBEcm9wQXJlYVZpZXc7XHJcblxyXG5cclxuXHJcblxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciBkb20gPSByZXF1aXJlKCcuLi8uLi9kb20nKTtcclxudmFyICQkID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMnKTtcclxudmFyIEJhc2VWaWV3ID0gcmVxdWlyZSgnLi9iYXNlJyk7XHJcblxyXG5jbGFzcyBFcXVhbGl6ZXJWaWV3IGV4dGVuZHMgQmFzZVZpZXcge1xyXG5cclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcblx0XHRzdXBlcihvcHRpb25zKTtcclxuXHRcdFxyXG5cdFx0dGhpcy5zbGlkZXJzID0ge1xyXG5cdFx0XHQnZ2Fpbic6ICBkb20ucXMoJ1tkYXRhLXR5cGU9XCJnYWluXCJdJywgdGhpcy5lbCksXHJcblx0XHRcdCc2MCc6ICBkb20ucXMoJ1tkYXRhLXR5cGU9XCI2MFwiXScsIHRoaXMuZWwpLFxyXG5cdFx0XHQnMTcwJzogIGRvbS5xcygnW2RhdGEtdHlwZT1cIjE3MFwiXScsIHRoaXMuZWwpLFxyXG5cdFx0XHQnMzEwJzogIGRvbS5xcygnW2RhdGEtdHlwZT1cIjMxMFwiXScsIHRoaXMuZWwpLFxyXG5cdFx0XHQnNjAwJzogIGRvbS5xcygnW2RhdGEtdHlwZT1cIjYwMFwiXScsIHRoaXMuZWwpLFxyXG5cdFx0XHQnMUsnOiAgZG9tLnFzKCdbZGF0YS10eXBlPVwiMUtcIl0nLCB0aGlzLmVsKSxcclxuXHRcdFx0JzNLJzogIGRvbS5xcygnW2RhdGEtdHlwZT1cIjNLXCJdJywgdGhpcy5lbCksXHJcblx0XHRcdCc2Syc6ICBkb20ucXMoJ1tkYXRhLXR5cGU9XCI2S1wiXScsIHRoaXMuZWwpLFxyXG5cdFx0XHQnMTJLJzogIGRvbS5xcygnW2RhdGEtdHlwZT1cIjEyS1wiXScsIHRoaXMuZWwpLFxyXG5cdFx0XHQnMTRLJzogIGRvbS5xcygnW2RhdGEtdHlwZT1cIjE0S1wiXScsIHRoaXMuZWwpLFxyXG5cdFx0XHQnMTZLJzogIGRvbS5xcygnW2RhdGEtdHlwZT1cIjE2S1wiXScsIHRoaXMuZWwpXHRcclxuXHRcdH07XHJcblxyXG5cdFx0dGhpcy5zbGlkZXJzQ29vcmRzID0ge1xyXG5cdFx0XHQnZ2Fpbic6ICB0aGlzLnNsaWRlcnNbJ2dhaW4nXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuXHRcdFx0JzYwJzogIHRoaXMuc2xpZGVyc1snNjAnXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuXHRcdFx0JzE3MCc6ICB0aGlzLnNsaWRlcnNbJzE3MCddLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxyXG5cdFx0XHQnMzEwJzogIHRoaXMuc2xpZGVyc1snMzEwJ10uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcblx0XHRcdCc2MDAnOiAgdGhpcy5zbGlkZXJzWyc2MDAnXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuXHRcdFx0JzFLJzogIHRoaXMuc2xpZGVyc1snMUsnXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuXHRcdFx0JzNLJzogIHRoaXMuc2xpZGVyc1snM0snXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuXHRcdFx0JzZLJzogIHRoaXMuc2xpZGVyc1snNksnXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuXHRcdFx0JzEySyc6ICB0aGlzLnNsaWRlcnNbJzEySyddLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxyXG5cdFx0XHQnMTRLJzogIHRoaXMuc2xpZGVyc1snMTRLJ10uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcblx0XHRcdCcxNksnOiAgdGhpcy5zbGlkZXJzWycxNksnXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLmFjdGl2ZVNsaWRlciA9IG51bGw7XHJcblxyXG5cdFx0dGhpcy5zbGlkZXJTaGlmdCA9IHtcclxuXHRcdFx0c2hpZnRYOiBudWxsLFxyXG5cdFx0XHRzaGlmdFk6IG51bGxcclxuXHRcdH07XHJcblx0XHR0aGlzLmJpbmRMaXN0ZW5lcnMoKTtcclxuXHR9XHJcblxyXG5cdGJpbmRMaXN0ZW5lcnMoKSB7XHJcblx0XHR3aW5kb3cub25yZXNpemUgPSB0aGlzLnJlY2FsY1NsaWRlcnNDb29yZHMuYmluZCh0aGlzKTtcclxuXHRcdHRoaXMuZWwub25tb3VzZWRvd24gPSB0aGlzLm9uVGh1bWJNb3VzZURvd24uYmluZCh0aGlzKTtcclxuXHRcdHRoaXMuZWwub25kcmFnc3RhcnQgPSB0aGlzLm9uRHJhZ1N0YXJ0LmJpbmQodGhpcyk7XHJcblx0fVxyXG5cclxuXHRvblRodW1iTW91c2VEb3duKGUpIHtcclxuXHRcdHZhciB0YXJnZXQgPSBlLnRhcmdldDtcclxuXHRcdHZhclx0dGh1bWJDb29yZHM7XHJcblxyXG5cdFx0aWYgKCFkb20uaGFzQ2xhc3MoZS50YXJnZXQsICdqcy10aHVtYicpKSByZXR1cm47XHJcblxyXG5cdFx0dGh1bWJDb29yZHMgPSB0YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblx0XHR0aGlzLmFjdGl2ZVRodW1iID0gdGFyZ2V0O1xyXG5cdFx0dGhpcy5hY3RpdmVTbGlkZXIgPSBkb20uY2xvc2VzdCh0YXJnZXQsICcuanMtc2xpZGVyJyk7XHJcblx0XHR0aGlzLnNsaWRlclNoaWZ0LnNoaWZ0WCA9IGUucGFnZVggLSB0aHVtYkNvb3Jkcy5sZWZ0O1xyXG5cdFx0dGhpcy5zbGlkZXJTaGlmdC5zaGlmdFkgPSBlLnBhZ2VZIC0gdGh1bWJDb29yZHMudG9wO1xyXG5cdFx0ZG9jdW1lbnQub25tb3VzZW1vdmUgPSB0aGlzLm9uRG9jdW1lbnRNb3VzZU1vdmUuYmluZCh0aGlzKTtcclxuXHRcdGRvY3VtZW50Lm9ubW91c2V1cCA9IHRoaXMub25Eb2N1bWVudE1vdXNlVXAuYmluZCh0aGlzKTtcclxuXHR9XHJcblxyXG5cdG9uRG9jdW1lbnRNb3VzZU1vdmUoZSkge1xyXG5cdFx0dmFyIHR5cGUgPSB0aGlzLmFjdGl2ZVNsaWRlci5kYXRhc2V0LnR5cGU7XHJcblx0XHR2YXIgeSA9IGUuY2xpZW50WSAtIHRoaXMuc2xpZGVyU2hpZnQuc2hpZnRZIC0gdGhpcy5zbGlkZXJzQ29vcmRzW3R5cGVdLnRvcDtcclxuXHRcdHRoaXMubW92ZVRodW1iKHkpO1xyXG5cdFx0dGhpcy50cmlnZ2VyKCdzbGlkZXI6Y2hhbmdlZCcsIHt0eXBlOiB0eXBlLCB2YWx1ZTogeX0pO1xyXG5cdH1cclxuXHJcblx0b25Eb2N1bWVudE1vdXNlVXAoZSkge1xyXG5cdFx0ZG9jdW1lbnQub25tb3VzZW1vdmUgPSBudWxsO1xyXG5cdFx0ZG9jdW1lbnQub25tb3VzZXVwID0gbnVsbDtcclxuXHRcdHRoaXMuYWN0aXZlU2xpZGVyID0gbnVsbDtcclxuXHRcdHRoaXMuYWN0aXZlVGh1bWIgPSBudWxsO1xyXG5cdFx0dGhpcy5zbGlkZXJTaGlmdC5zaGlmdFggPSBudWxsO1xyXG5cdFx0dGhpcy5zbGlkZXJTaGlmdC5zaGlmdFkgPSBudWxsO1xyXG5cdH1cclxuXHJcblx0Y2hlY2tDb29yZHMoeSkge1xyXG5cdFx0dmFyIHRvcEVkZ2U7XHJcblxyXG5cdFx0aWYoeSA8IDApIHtcclxuXHRcdFx0eSA9IDA7XHJcblx0XHR9XHJcblx0XHR0b3BFZGdlID0gdGhpcy5hY3RpdmVTbGlkZXIub2Zmc2V0SGVpZ2h0IC0gdGhpcy5hY3RpdmVUaHVtYi5vZmZzZXRIZWlnaHQ7XHJcblx0XHRpZih5ID4gdG9wRWRnZSkge1xyXG5cdFx0XHR5ID0gdG9wRWRnZTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB5O1xyXG5cdH1cclxuXHJcblx0bW92ZVRodW1iKHkpIHtcclxuXHRcdHkgPSB0aGlzLmNoZWNrQ29vcmRzKHkpO1xyXG5cdFx0dGhpcy5hY3RpdmVUaHVtYi5zdHlsZS50b3AgPSB5ICsgJ3B4JztcclxuXHR9XHJcblxyXG5cdG9uRHJhZ1N0YXJ0KCkge1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHRcclxuXHRyZWNhbGNTbGlkZXJzQ29vcmRzKCkge1xyXG5cdFx0T2JqZWN0LmtleXModGhpcy5zbGlkZXJzKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xyXG5cdFx0XHR0aGlzLnNsaWRlcnNDb29yZHNba2V5XSA9IHRoaXMuc2xpZGVyc1trZXldLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cdFx0fSwgdGhpcyk7XHJcblx0fVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEVxdWFsaXplclZpZXc7IiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIgQmFzZVZpZXcgPSByZXF1aXJlKCcuL2Jhc2UnKTtcclxudmFyIGF1ZGlvQ29udGV4dCA9IHJlcXVpcmUoJy4uLy4uL2F1ZGlvJykuZ2V0QXVkaW9Db250ZXh0KCk7XHJcbnZhciBGUkVRVUVOQ0lFUyA9IFs2MCwgMTcwLCAzMTAsIDYwMCwgMTAwMCwgMzAwMCwgNjAwMCwgMTIwMDAsIDE0MDAwLCAxNjAwMF07XHJcbnZhciBhbmFseXNlciA9IHJlcXVpcmUoJy4uLy4uL2F1ZGlvX2FuYWx5c2VyJyk7XHJcbnZhciBkb20gPSByZXF1aXJlKCcuLi8uLi9kb20nKTtcclxuXHJcbmNsYXNzIFBsYXllclZpZXcgZXh0ZW5kcyBCYXNlVmlldyB7XHJcblxyXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuXHRcdHN1cGVyKG9wdGlvbnMpO1xyXG5cdFx0dGhpcy5nYWluID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKTtcclxuXHRcdHRoaXMuZmlsdGVycyA9IHRoaXMuY3JlYXRlRmlsdGVycyhGUkVRVUVOQ0lFUyk7XHJcblx0XHR0aGlzLmFuYWx5c2VyID0gYW5hbHlzZXI7XHJcblx0XHR0aGlzLmVsZW1zID0ge1xyXG5cdFx0XHR2aXN1YWxpemVyOiBkb20ucXMoJy5qcy12aXN1YWxpemVyJywgdGhpcy5lbCksXHJcblx0XHRcdGVxdWFsaXplcjogZG9tLnFzKCcuanMtZXF1YWxpemVyJywgdGhpcy5lbClcclxuXHRcdH07XHJcblx0XHR0aGlzLmJpbmRMaXN0ZW5lcnMoKTtcclxuXHR9XHJcblxyXG5cdGJpbmRMaXN0ZW5lcnMoKSB7XHJcblx0XHR0aGlzLm1vZGVsLm9uKCdpc1Zpc3VhbGl6aW5nOmNoYW5nZWQnLCB0aGlzLm9uVmlzdWFsaXppbmdDaGFuZ2VkLCB0aGlzKTtcclxuXHRcdHRoaXMubW9kZWwub24oJ3BsYXlpbmdTb25nOmNoYW5nZWQnLCB0aGlzLm9uUGxheWluZ1NvbmdDaGFuZ2VkLCB0aGlzKTtcclxuXHR9XHJcblxyXG5cdG9uVmlzdWFsaXppbmdDaGFuZ2VkKGlzVmlzdWFsaXppbmcpIHtcclxuXHRcdGlmIChpc1Zpc3VhbGl6aW5nKSB7XHJcblx0XHRcdGRvbS5oaWRlKHRoaXMuZWxlbXMuZXF1YWxpemVyKTtcclxuXHRcdFx0ZG9tLnNob3codGhpcy5lbGVtcy52aXN1YWxpemVyKTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRkb20uc2hvdyh0aGlzLmVsZW1zLmVxdWFsaXplcik7XHJcblx0XHRcdGRvbS5oaWRlKHRoaXMuZWxlbXMudmlzdWFsaXplcik7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRvblBsYXlpbmdTb25nQ2hhbmdlZChzb25nKSB7XHJcblx0XHRpZighc29uZykge1xyXG5cdFx0XHR0aGlzLnN0b3BTb25nKCk7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhpcy5wbGF5U29uZyhzb25nKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHBsYXlTb25nKHNvbmcpIHtcclxuXHRcdHRoaXMucGxheShzb25nLmF1ZGlvQnVmZmVyKTtcclxuXHR9XHJcblxyXG5cdHN0b3BTb25nKCkge1xyXG5cdFx0dGhpcy5zdG9wKCk7XHJcblx0fVxyXG5cclxuXHRjcmVhdGVGaWx0ZXJzKGZyZXF1ZW5jaWVzKSB7XHJcblx0XHR2YXIgZmlsdGVycyA9IGZyZXF1ZW5jaWVzLm1hcCh0aGlzLmNyZWF0ZUZpbHRlcik7XHJcblxyXG5cdFx0ZmlsdGVycy5yZWR1Y2UoZnVuY3Rpb24ocHJldiwgY3Vycikge1xyXG5cdFx0XHRwcmV2LmNvbm5lY3QoY3Vycik7XHJcblx0XHRcdHJldHVybiBjdXJyO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIGZpbHRlcnM7XHJcblx0fVxyXG5cclxuXHRjcmVhdGVGaWx0ZXIoZnJlcXVlbmN5KSB7XHJcblx0XHR2YXIgZmlsdGVyID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJpcXVhZEZpbHRlcigpO1xyXG5cclxuXHRcdGZpbHRlci50eXBlID0gJ3BlYWtpbmcnO1xyXG5cdFx0ZmlsdGVyLmZyZXF1ZW5jeS52YWx1ZSA9IGZyZXF1ZW5jeTtcclxuXHRcdGZpbHRlci5RLnZhbHVlID0gMTtcclxuXHRcdGZpbHRlci5nYWluLnZhbHVlID0gMDtcclxuXHJcblx0XHRyZXR1cm4gZmlsdGVyO1xyXG5cdH1cclxuXHJcblx0cGxheShhdWRpb0J1ZmZlcikge1xyXG5cdFx0dGhpcy5hdWRpb1NvdXJjZSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcclxuXHRcdHRoaXMuYXVkaW9Tb3VyY2UuYnVmZmVyID0gYXVkaW9CdWZmZXI7XHJcblx0XHR0aGlzLmF1ZGlvU291cmNlLmNvbm5lY3QodGhpcy5nYWluKTtcclxuXHJcblx0XHR0aGlzLmdhaW4uY29ubmVjdCh0aGlzLmZpbHRlcnNbMF0pO1xyXG5cdFx0dGhpcy5maWx0ZXJzW3RoaXMuZmlsdGVycy5sZW5ndGggLSAxXS5jb25uZWN0KHRoaXMuYW5hbHlzZXIpO1xyXG5cdFx0dGhpcy5hbmFseXNlci5jb25uZWN0KGF1ZGlvQ29udGV4dC5kZXN0aW5hdGlvbik7XHJcblx0XHR0aGlzLmF1ZGlvU291cmNlLnN0YXJ0KDApO1xyXG5cdH1cclxuXHJcblx0c3RvcCgpIHtcclxuXHRcdHRoaXMuYXVkaW9Tb3VyY2Uuc3RvcCgwKTtcclxuXHR9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUGxheWVyVmlldztcclxuXHJcblxyXG5cclxuXHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyIEJhc2VWaWV3ID0gcmVxdWlyZSgnLi9iYXNlJyk7XHJcbnZhciBkb20gPSByZXF1aXJlKCcuLi8uLi9kb20nKTtcclxuXHJcbmNsYXNzIFNvbmdEZXRhaWxzVmlldyBleHRlbmRzIEJhc2VWaWV3IHtcclxuXHJcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xyXG5cdFx0c3VwZXIob3B0aW9ucyk7XHJcblx0XHR0aGlzLmVsZW1zID0ge1xyXG5cdFx0XHRjb3ZlcjogZG9tLnFzKCcuanMtY292ZXInLCB0aGlzLmVsKSxcclxuXHRcdFx0dGl0bGU6IGRvbS5xcygnLmpzLXRpdGxlJywgdGhpcy5lbCksXHJcblx0XHRcdGFydGlzdDogZG9tLnFzKCcuanMtYXJ0aXN0JywgdGhpcy5lbCksXHJcblx0XHRcdGZpbGVOYW1lOiBkb20ucXMoJy5qcy1maWxlbmFtZScsIHRoaXMuZWwpXHJcblx0XHR9O1xyXG5cdFx0dGhpcy5kZWZhdWx0UGljdHVyZSA9IHRoaXMuZWxlbXMuY292ZXIuc3JjO1xyXG5cdFx0dGhpcy5wbGF5aW5nU29uZyA9IG51bGw7XHJcblxyXG5cdFx0dGhpcy5iaW5kTGlzdGVuZXJzKCk7XHJcblx0fVxyXG5cclxuXHRiaW5kTGlzdGVuZXJzKCkge1xyXG5cdFx0dGhpcy5tb2RlbC5vbignc2VsZWN0ZWRTb25nOmNoYW5nZWQnLCB0aGlzLm9uU2VsZWN0ZWRTb25nQ2hhbmdlZCwgdGhpcyk7XHJcblx0XHR0aGlzLm1vZGVsLm9uKCdwbGF5aW5nU29uZzpjaGFuZ2VkJywgZnVuY3Rpb24oc29uZyl7XHJcblx0XHRcdHRoaXMucGxheWluZ1NvbmcgPSBzb25nO1xyXG5cdFx0fSwgdGhpcyk7XHJcblx0fVxyXG5cclxuXHRvblNlbGVjdGVkU29uZ0NoYW5nZWQoc29uZykge1xyXG5cdFx0aWYgKHRoaXMucGxheWluZ1NvbmcpIHJldHVybjtcclxuXHJcblx0XHRpZihzb25nLnBpY3R1cmUpIHtcclxuXHRcdFx0dGhpcy5lbGVtcy5jb3Zlci5zcmMgPSBzb25nLnBpY3R1cmU7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhpcy5lbGVtcy5jb3Zlci5zcmMgPSB0aGlzLmRlZmF1bHRQaWN0dXJlO1xyXG5cdFx0fVxyXG5cdFx0aWYgKCFzb25nLnRpdGxlKSB7XHJcblx0XHRcdHRoaXMuZWxlbXMuZmlsZU5hbWUudGV4dENvbnRlbnQgPSAnJztcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aGlzLmVsZW1zLmZpbGVOYW1lLnRleHRDb250ZW50ID0gc29uZy5maWxlTmFtZTtcclxuXHRcdH1cclxuXHRcdHRoaXMuZWxlbXMudGl0bGUudGV4dENvbnRlbnQgPSBzb25nLnRpdGxlIHx8IHNvbmcuZmlsZU5hbWU7XHJcblx0XHR0aGlzLmVsZW1zLmFydGlzdC50ZXh0Q29udGVudCA9IHNvbmcuYXJ0aXN0IHx8ICcnO1xyXG5cdH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTb25nRGV0YWlsc1ZpZXc7IiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIgJCQgPSByZXF1aXJlKCcuLi8uLi91dGlscycpO1xyXG52YXIgRXZlbnRzID0gcmVxdWlyZSgnLi4vLi4vZXZlbnRzJyk7XHJcbnZhciBkb20gPSByZXF1aXJlKCcuLi8uLi9kb20nKTtcclxudmFyIEJhc2VWaWV3ID0gcmVxdWlyZSgnLi9iYXNlJyk7XHJcblxyXG5jbGFzcyBTb25nc0xpc3RWaWV3IGV4dGVuZHMgQmFzZVZpZXcge1xyXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuXHRcdHN1cGVyKG9wdGlvbnMpO1xyXG5cdFx0dGhpcy5lbGVtcyA9IHtcclxuXHRcdFx0cGxhY2Vob2xkZXI6IGRvbS5xcygnLmpzLXBsYWNlaG9sZGVyJywgdGhpcy5lbClcclxuXHRcdH07XHJcblx0XHR0aGlzLmJpbmRMaXN0ZW5lcnMoKTtcclxuXHR9XHJcblxyXG5cdGJpbmRMaXN0ZW5lcnMoKSB7XHJcblx0XHR0aGlzLm1vZGVsLm9uKCdzb25nOmFkZCcsIHRoaXMub25Tb25nQWRkLCB0aGlzKTtcclxuXHRcdHRoaXMuZWwub25jbGljayA9IHRoaXMub25Tb25nQ2xpY2suYmluZCh0aGlzKTtcclxuXHR9XHJcblxyXG5cdG9uU29uZ0NsaWNrKGUpIHtcclxuXHRcdHZhciB0YXJnZXQgPSBlLnRhcmdldDtcclxuXHRcdHZhciBzb25nRWwgPSBkb20uY2xvc2VzdCh0YXJnZXQsICcuanMtc29uZycpO1xyXG5cclxuXHRcdHRoaXMuc2VsZWN0U29uZyhzb25nRWwpO1xyXG5cdFx0dGhpcy50cmlnZ2VyKCdzb25nOnNlbGVjdGVkJywgc29uZ0VsLmRhdGFzZXQuaWQpO1xyXG5cdH1cclxuXHJcblx0b25Tb25nQWRkKHNvbmcpIHtcclxuXHRcdHZhciBzb25nRWwgPSB0aGlzLmNyZWF0ZVNvbmdFbChzb25nKTtcclxuXHJcblx0XHRpZighdGhpcy5oYXZlU29uZ3MpIHtcclxuXHRcdFx0dGhpcy5lbGVtcy5wbGFjZWhvbGRlci5yZW1vdmUoKTtcclxuXHRcdH1cclxuXHRcdHRoaXMuaGF2ZVNvbmdzID0gdHJ1ZTtcclxuXHRcdHRoaXMuZWwuYXBwZW5kQ2hpbGQoc29uZ0VsKTtcclxuXHR9XHJcblxyXG5cdHNlbGVjdFNvbmcoc29uZ0VsKSB7XHJcblx0XHQkJC50b0FycmF5KHNvbmdFbC5wYXJlbnROb2RlLmNoaWxkcmVuKVxyXG5cdFx0XHQuZmlsdGVyKGVsID0+IGVsICE9PSBzb25nRWwpXHJcblx0XHRcdC5mb3JFYWNoKGVsID0+IGRvbS5yZW1vdmVDbGFzcyhlbCwgJ3NvbmctaXRlbV9zZWxlY3RlZCcpKTtcclxuXHJcblx0XHRkb20uYWRkQ2xhc3Moc29uZ0VsLCAnc29uZy1pdGVtX3NlbGVjdGVkJyk7XHJcblx0fVxyXG5cclxuXHRjcmVhdGVTb25nRWwoc29uZykge1xyXG5cdFx0dmFyIHNvbmdFbCA9IHRoaXMudGVtcGxhdGUuY2xvbmVOb2RlKHRydWUpO1xyXG5cdFx0dmFyIHRpdGxlID0gZG9tLnFzKCcuanMtc29uZy10aXRsZScsIHNvbmdFbCk7XHJcblx0XHR2YXIgYXJ0aXN0ID0gZG9tLnFzKCcuanMtc29uZy1hcnRpc3QnLCBzb25nRWwpO1xyXG5cdFx0dmFyIGNvdmVyID0gZG9tLnFzKCcuanMtc29uZy1jb3ZlcicsIHNvbmdFbCk7XHJcblx0XHR2YXIgZHVyYXRpb24gPSBkb20ucXMoJy5qcy1zb25nLWR1cmF0aW9uJywgc29uZ0VsKTtcclxuXHJcblx0XHR0aXRsZS50ZXh0Q29udGVudCA9IHNvbmcudGl0bGUgfHwgc29uZy5maWxlTmFtZTtcclxuXHRcdGFydGlzdC50ZXh0Q29udGVudCA9IHNvbmcuYXJ0aXN0O1xyXG5cclxuXHRcdGR1cmF0aW9uLnRleHRDb250ZW50ID0gdGhpcy5mb3JtYXREdXJhdGlvbihzb25nLmR1cmF0aW9uKTtcclxuXHRcdHNvbmdFbC5kYXRhc2V0LmlkID0gc29uZy5pZDtcclxuXHRcdGlmKHNvbmcucGljdHVyZSkge1xyXG5cdFx0XHRjb3Zlci5zcmMgPSBzb25nLnBpY3R1cmU7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHNvbmdFbDtcclxuXHR9XHJcblxyXG5cdGZvcm1hdER1cmF0aW9uKHNlY3MpIHtcclxuXHRcdHZhciBtaW51dGVzID0gTWF0aC5mbG9vcihzZWNzIC8gNjApO1xyXG5cdFx0dmFyIHNlY29uZHMgPSBzZWNzICUgNjA7XHJcblxyXG5cdFx0aWYoc2Vjb25kcy50b1N0cmluZygpLmxlbmd0aCA9PT0gMSkge1xyXG5cdFx0XHRzZWNvbmRzID0gJzAnICsgc2Vjb25kcztcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gYCR7bWludXRlc306JHtzZWNvbmRzfWA7XHJcblx0fVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNvbmdzTGlzdFZpZXc7ICIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyIEJhc2VWaWV3ID0gcmVxdWlyZSgnLi9iYXNlJyk7XHJcbnZhciBkb20gPSByZXF1aXJlKCcuLi8uLi9kb20nKTtcclxudmFyIGF1ZGlvID0gcmVxdWlyZSgnLi4vLi4vYXVkaW8nKTtcclxudmFyIGFuYWx5c2VyID0gcmVxdWlyZSgnLi4vLi4vYXVkaW9fYW5hbHlzZXInKTtcclxuXHJcbmNsYXNzIFZpc3VhbGl6ZXJWaWV3IGV4dGVuZHMgQmFzZVZpZXcge1xyXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuXHRcdHN1cGVyKG9wdGlvbnMpO1xyXG5cclxuXHRcdHRoaXMuZWxlbXMgPSB7XHJcblx0XHRcdGNhbnZhczogZG9tLnFzKCcuanMtY2FudmFzJywgdGhpcy5lbClcclxuXHRcdH07XHJcblx0XHR0aGlzLmZyYW1lSWQgPSBudWxsO1xyXG5cdFx0dGhpcy5jYW52YXNXID0gdGhpcy5lbGVtcy5jYW52YXMub2Zmc2V0V2lkdGg7XHJcblx0XHR0aGlzLmNhbnZhc0ggPSB0aGlzLmVsZW1zLmNhbnZhcy5vZmZzZXRIZWlnaHQ7XHJcblx0XHR0aGlzLmNhbnZhc0N0eCA9IHRoaXMuZWxlbXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcblx0XHR0aGlzLmJpbmRMaXN0ZW5lcnMoKTtcclxuXHR9XHJcblxyXG5cdGJpbmRMaXN0ZW5lcnMoKSB7XHJcblx0XHR0aGlzLm1vZGVsLm9uKCdwbGF5aW5nU29uZzpjaGFuZ2VkJywgdGhpcy5vblBsYXlpbmdTb25nQ2hhbmdlZCwgdGhpcyk7XHJcblx0fVxyXG5cclxuXHRvblBsYXlpbmdTb25nQ2hhbmdlZChzb25nKSB7XHJcblx0XHRpZihzb25nKSB7XHJcblx0XHRcdHRoaXMuc3RhcnRWaXN1YWxpemF0aW9uKCk7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhpcy5zdG9wVmlzdWFsaXphdGlvbigpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Y2xlYXJDYW52YXMoKSB7XHJcblx0XHR0aGlzLmNhbnZhc0N0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXNXLCB0aGlzLmNhbnZhc0gpO1xyXG5cdH1cclxuXHJcblx0c3RvcFZpc3VhbGl6YXRpb24oKSB7XHJcblx0XHRjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmZyYW1lSWQpO1xyXG5cdFx0dGhpcy5jbGVhckNhbnZhcygpO1xyXG5cdH1cclxuXHJcblx0c3RhcnRWaXN1YWxpemF0aW9uKCkge1xyXG5cdFx0dmFyIGk7XHJcblx0XHR2YXIgeCA9IDA7XHJcblx0XHR2YXIgdjtcclxuXHRcdHZhciB5O1xyXG5cdFx0dmFyIHNsaWNlV2lkdGg7XHJcblx0XHR2YXIgYnVmZmVyTGVuZ3RoID0gYW5hbHlzZXIuZnJlcXVlbmN5QmluQ291bnQ7XHJcblx0XHR2YXIgZGF0YUFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyTGVuZ3RoKTtcclxuXHJcblx0XHR0aGlzLmNsZWFyQ2FudmFzKCk7XHJcblx0XHR0aGlzLmZyYW1lSWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5zdGFydFZpc3VhbGl6YXRpb24uYmluZCh0aGlzKSk7XHJcblx0XHRhbmFseXNlci5nZXRCeXRlVGltZURvbWFpbkRhdGEoZGF0YUFycmF5KTtcclxuXHRcdHRoaXMuY2FudmFzQ3R4LmxpbmVXaWR0aCA9IDE7XHJcblx0XHR0aGlzLmNhbnZhc0N0eC5zdHJva2VTdHlsZSA9ICdyZWQnO1xyXG5cdFx0dGhpcy5jYW52YXNDdHguYmVnaW5QYXRoKCk7XHJcblxyXG5cdFx0c2xpY2VXaWR0aCA9IHRoaXMuY2FudmFzVyAqIDEuMCAvIGJ1ZmZlckxlbmd0aDtcclxuXHJcblx0XHRmb3IoaSA9IDA7IGkgPCBidWZmZXJMZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2ID0gZGF0YUFycmF5W2ldIC8gMTI4LjA7XHJcblx0XHRcdHkgPSB2ICogdGhpcy5jYW52YXNIIC8gMjtcclxuXHJcblx0XHRcdGlmKGkgPT09IDApIHtcclxuXHRcdFx0XHR0aGlzLmNhbnZhc0N0eC5tb3ZlVG8oeCwgeSk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5jYW52YXNDdHgubGluZVRvKHgsIHkpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR4ICs9IHNsaWNlV2lkdGg7XHJcblx0XHR9XHJcblx0XHR0aGlzLmNhbnZhc0N0eC5saW5lVG8odGhpcy5jYW52YXNXLCB0aGlzLmNhbnZhc0ggLyAyKTtcclxuXHRcdHRoaXMuY2FudmFzQ3R4LmNsb3NlUGF0aCgpO1xyXG5cdFx0dGhpcy5jYW52YXNDdHguc3Ryb2tlKCk7XHJcblx0fVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFZpc3VhbGl6ZXJWaWV3OyIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyICQkID0gcmVxdWlyZSgnLi91dGlscycpO1xyXG5cclxudmFyIGRvbSA9IHtcclxuXHRieUlkOiBmdW5jdGlvbihpZCkge1xyXG5cdFx0cmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxuXHR9LFxyXG5cdHFzOiBmdW5jdGlvbihzZWxlY3RvciwgY29udGV4dCkge1xyXG5cdFx0Y29udGV4dCA9IGNvbnRleHQgfHwgZG9jdW1lbnQ7XHJcblx0XHRyZXR1cm4gY29udGV4dC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcclxuXHR9LFxyXG5cdHFzYTogZnVuY3Rpb24oc2VsZWN0b3IsIGNvbnRleHQpIHtcclxuXHRcdGNvbnRleHQgPSBjb250ZXh0IHx8IGRvY3VtZW50O1xyXG5cdFx0cmV0dXJuICQkLnRvQXJyYXkoY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XHJcblx0fSxcclxuXHRhZGRDbGFzczogZnVuY3Rpb24oZWwsIGNsYXNzTmFtZSkge1xyXG5cdFx0ZWwuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xyXG5cdH0sXHJcblx0cmVtb3ZlQ2xhc3M6IGZ1bmN0aW9uKGVsLCBjbGFzc05hbWUpIHtcclxuXHRcdGVsLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcclxuXHR9LFxyXG5cdGhhc0NsYXNzOiBmdW5jdGlvbihlbCwgY2xhc3NOYW1lKSB7XHJcblx0XHRyZXR1cm4gZWwuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7XHJcblx0fSxcclxuXHRoaWRlOiBmdW5jdGlvbiguLi5lbGVtcykge1xyXG5cdFx0ZWxlbXMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XHJcblx0XHRcdGl0ZW0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHRcdH0pO1xyXG5cdH0sXHJcblx0c2hvdzogZnVuY3Rpb24oLi4uZWxlbXMpIHtcclxuXHRcdGVsZW1zLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xyXG5cdFx0XHRpdGVtLnN0eWxlLmRpc3BsYXkgPSAnJztcclxuXHRcdH0pO1xyXG5cdH0sXHJcblx0Y2xvc2VzdDogZnVuY3Rpb24oZWwsIHNlbGVjdG9yKSB7XHJcblx0XHRpZihlbC5jbG9zZXN0KSByZXR1cm4gZWwuY2xvc2VzdChzZWxlY3Rvcik7XHJcblxyXG5cdFx0dmFyIHBhcmVudE5vZGUgPSBlbDtcclxuXHRcdHZhciBtYXRjaGVzO1xyXG5cclxuXHRcdHdoaWxlKChtYXRjaGVzID0gcGFyZW50Tm9kZSAmJiBwYXJlbnROb2RlLm1hdGNoZXMpICYmICFwYXJlbnROb2RlLm1hdGNoZXMoc2VsZWN0b3IpKSB7XHJcblx0XHRcdHBhcmVudE5vZGUgPSBwYXJlbnROb2RlLnBhcmVudE5vZGU7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gbWF0Y2hlcyA/IHBhcmVudE5vZGUgOiBudWxsO1xyXG5cdH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZG9tOyIsInZhciBzdWJzY3JpYmVycyA9IG5ldyBNYXAoKTtcblxudmFyIEV2ZW50cyA9IHtcblx0b246IGZ1bmN0aW9uKHR5cGUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG5cdFx0dmFyIGl0ZW07XG5cblx0XHRpZihzdWJzY3JpYmVycy5oYXModGhpcykpIHtcblx0XHRcdGl0ZW0gPSBzdWJzY3JpYmVycy5nZXQodGhpcyk7XG5cdFx0XHRpZihpdGVtW3R5cGVdKSB7XG5cdFx0XHRcdGl0ZW1bdHlwZV0ucHVzaCh7XG5cdFx0XHRcdFx0Y2FsbGJhY2s6IGNhbGxiYWNrLFxuXHRcdFx0XHRcdGNvbnRleHQ6IGNvbnRleHRcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0aXRlbVt0eXBlXSA9IFt7XG5cdFx0XHRcdFx0Y2FsbGJhY2s6IGNhbGxiYWNrLFxuXHRcdFx0XHRcdGNvbnRleHQ6IGNvbnRleHRcblx0XHRcdFx0fV07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0aXRlbSA9IHtcblx0XHRcdFx0W3R5cGVdOiBbe1xuXHRcdFx0XHRcdGNhbGxiYWNrOiBjYWxsYmFjayxcblx0XHRcdFx0XHRjb250ZXh0OiBjb250ZXh0XG5cdFx0XHRcdH1dXG5cdFx0XHR9O1xuXHRcdFx0c3Vic2NyaWJlcnMuc2V0KHRoaXMsIGl0ZW0pO1xuXHRcdH1cblx0fSxcblx0b2ZmOiBmdW5jdGlvbih0eXBlLCBjYWxsYmFjaykge1xuXHRcdHZhciBpdGVtLCBpO1xuXHRcdGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcblx0XHRcdHN1YnNjcmliZXJzLmRlbGV0ZSh0aGlzKTtcblx0XHR9XG5cdFx0aWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSAmJiBzdWJzY3JpYmVycy5oYXModGhpcykpIHtcblx0XHRcdGl0ZW0gPSBzdWJzY3JpYmVycy5nZXQodGhpcyk7XG5cdFx0XHRpZihpdGVtW3R5cGVdKSB7XG5cdFx0XHRcdGlmKGNhbGxiYWNrKSB7XG5cdFx0XHRcdFx0Zm9yKGkgPSAwOyBpIDwgaXRlbVt0eXBlXS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0aWYoaXRlbVt0eXBlXVtpXSA9PT0gY2FsbGJhY2spIHtcblx0XHRcdFx0XHRcdFx0aXRlbVt0eXBlXS5zcGxpY2UoaSwgMSk7XG5cdFx0XHRcdFx0XHRcdGktLTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0ZGVsZXRlIGl0ZW1bdHlwZV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cdHRyaWdnZXI6IGZ1bmN0aW9uKHR5cGUsIC4uLmFyZ3MpIHtcblx0XHR2YXIgaXRlbTtcblxuXHRcdGlmKHN1YnNjcmliZXJzLmhhcyh0aGlzKSkge1xuXHRcdFx0aXRlbSA9IHN1YnNjcmliZXJzLmdldCh0aGlzKTtcblx0XHRcdGlmKGl0ZW1bdHlwZV0pIHtcblx0XHRcdFx0aXRlbVt0eXBlXS5mb3JFYWNoKGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRcdFx0dmFyIGNvbnRleHQgPSBldmVudC5jb250ZXh0IHx8IHRoaXM7XG5cdFx0XHRcdFx0ZXZlbnQuY2FsbGJhY2suYXBwbHkoY29udGV4dCwgYXJncyk7XG5cdFx0XHRcdH0sIHRoaXMpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBFdmVudHM7IiwidmFyICQkID0ge1xuXHR0b0FycmF5OiBmdW5jdGlvbihvYmplY3QpIHtcblx0XHRyZXR1cm4gW10uc2xpY2UuY2FsbChvYmplY3QpO1xuXHR9LFxuXHRhc3NpZ246IGZ1bmN0aW9uKHRhcmdldCwgLi4ucmVzdCkge1xuXHRcdGlmKHRhcmdldCA9PT0gdW5kZWZpbmVkIHx8IHRhcmdldCA9PT0gbnVsbCkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgZmlyc3QgYXJndW1lbnQgdG8gb2JqZWN0Jyk7XG5cdFx0fVxuXHRcdHJlc3QuZm9yRWFjaChvYmogPT4ge1xuXHRcdFx0aWYob2JqID09PSB1bmRlZmluZWQgfHwgb2JqID09PSBudWxsKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChrZXkgPT4ge1xuXHRcdFx0XHR0YXJnZXRba2V5XSA9IG9ialtrZXldO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gJCQ7Il19
