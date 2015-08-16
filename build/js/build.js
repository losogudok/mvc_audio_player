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
		value: function observeProperties(obj) {
			Object.keys(obj).forEach(function (key) {
				obj['_' + key] = obj[key];

				Object.defineProperty(obj, key, {
					get: function get() {
						return obj['_' + key];
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL0phdmFzY3JpcHQvdGFza18zL3NyYy9qcy9hcHAuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL0phdmFzY3JpcHQvdGFza18zL3NyYy9qcy9hdWRpby5qcyIsIi9ob21lL2FuZHJleS9Eb2N1bWVudHMvUHJvamVjdHMvSmF2YXNjcmlwdC90YXNrXzMvc3JjL2pzL2F1ZGlvX2FuYWx5c2VyLmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy9KYXZhc2NyaXB0L3Rhc2tfMy9zcmMvanMvYXVkaW9fcGxheWVyL2NvbnRyb2xsZXJzL2Jhc2UuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL0phdmFzY3JpcHQvdGFza18zL3NyYy9qcy9hdWRpb19wbGF5ZXIvY29udHJvbGxlcnMvY29udHJvbHMuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL0phdmFzY3JpcHQvdGFza18zL3NyYy9qcy9hdWRpb19wbGF5ZXIvY29udHJvbGxlcnMvZHJvcF9hcmVhLmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy9KYXZhc2NyaXB0L3Rhc2tfMy9zcmMvanMvYXVkaW9fcGxheWVyL2NvbnRyb2xsZXJzL3NvbmdzX2xpc3QuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL0phdmFzY3JpcHQvdGFza18zL3NyYy9qcy9hdWRpb19wbGF5ZXIvbW9kZWxzL3NvbmcuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL0phdmFzY3JpcHQvdGFza18zL3NyYy9qcy9hdWRpb19wbGF5ZXIvbW9kZWxzL3NvbmdzLmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy9KYXZhc2NyaXB0L3Rhc2tfMy9zcmMvanMvYXVkaW9fcGxheWVyL3N0YXRlcy9wbGF5ZXIuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL0phdmFzY3JpcHQvdGFza18zL3NyYy9qcy9hdWRpb19wbGF5ZXIvdmlld3MvYmFzZS5qcyIsIi9ob21lL2FuZHJleS9Eb2N1bWVudHMvUHJvamVjdHMvSmF2YXNjcmlwdC90YXNrXzMvc3JjL2pzL2F1ZGlvX3BsYXllci92aWV3cy9jb250cm9scy5qcyIsIi9ob21lL2FuZHJleS9Eb2N1bWVudHMvUHJvamVjdHMvSmF2YXNjcmlwdC90YXNrXzMvc3JjL2pzL2F1ZGlvX3BsYXllci92aWV3cy9kcm9wX2FyZWEuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL0phdmFzY3JpcHQvdGFza18zL3NyYy9qcy9hdWRpb19wbGF5ZXIvdmlld3MvZXF1YWxpemVyLmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy9KYXZhc2NyaXB0L3Rhc2tfMy9zcmMvanMvYXVkaW9fcGxheWVyL3ZpZXdzL3BsYXllci5qcyIsIi9ob21lL2FuZHJleS9Eb2N1bWVudHMvUHJvamVjdHMvSmF2YXNjcmlwdC90YXNrXzMvc3JjL2pzL2F1ZGlvX3BsYXllci92aWV3cy9zb25nX2RldGFpbHMuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL0phdmFzY3JpcHQvdGFza18zL3NyYy9qcy9hdWRpb19wbGF5ZXIvdmlld3Mvc29uZ3NfbGlzdC5qcyIsIi9ob21lL2FuZHJleS9Eb2N1bWVudHMvUHJvamVjdHMvSmF2YXNjcmlwdC90YXNrXzMvc3JjL2pzL2F1ZGlvX3BsYXllci92aWV3cy92aXN1YWxpemVyLmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy9KYXZhc2NyaXB0L3Rhc2tfMy9zcmMvanMvZG9tLmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy9KYXZhc2NyaXB0L3Rhc2tfMy9zcmMvanMvZXZlbnRzLmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy9KYXZhc2NyaXB0L3Rhc2tfMy9zcmMvanMvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7O0FBRWIsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUM7QUFDeEQsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7O0FBRTFELElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO0FBQzdELElBQUksa0JBQWtCLEdBQUcsT0FBTyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7O0FBRXpFLElBQUksYUFBYSxHQUFHLE9BQU8sQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0FBQy9ELElBQUksbUJBQW1CLEdBQUcsT0FBTyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7O0FBRTNFLElBQUksZUFBZSxHQUFHLE9BQU8sQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDOztBQUVuRSxJQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsK0JBQStCLENBQUMsQ0FBQztBQUM1RCxJQUFJLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDOztBQUV4RSxJQUFJLGNBQWMsR0FBRyxPQUFPLENBQUMsaUNBQWlDLENBQUMsQ0FBQzs7QUFFaEUsSUFBSSxhQUFhLEdBQUcsT0FBTyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7O0FBRTlELElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQzs7O0FBSTNCLElBQUksV0FBVyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7OztBQUdwQyxJQUFJLFVBQVUsR0FBRyxJQUFJLFVBQVUsQ0FBQztBQUMvQixHQUFFLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7QUFDM0IsTUFBSyxFQUFFLFdBQVc7Q0FDbEIsQ0FBQyxDQUFDOzs7QUFHSCxJQUFJLFlBQVksR0FBRyxJQUFJLFlBQVks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QUcsQ0FBQyxDQUFDO0lBQ3ZCLENBQUMsQ0FBQztHQUNILENBQUMsQ0FBQztFQUNIO0NBQ0QsQ0FBQzs7QUFFRixNQUFNLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciBQbGF5ZXJWaWV3ID0gcmVxdWlyZSgnLi9hdWRpb19wbGF5ZXIvdmlld3MvcGxheWVyJyk7XHJcbnZhciBQbGF5ZXJTdGF0ZSA9IHJlcXVpcmUoJy4vYXVkaW9fcGxheWVyL3N0YXRlcy9wbGF5ZXInKTtcclxuXHJcbnZhciBEcm9wQXJlYVZpZXcgPSByZXF1aXJlKCcuL2F1ZGlvX3BsYXllci92aWV3cy9kcm9wX2FyZWEnKTtcclxudmFyIERyb3BBcmVhQ29udHJvbGxlciA9IHJlcXVpcmUoJy4vYXVkaW9fcGxheWVyL2NvbnRyb2xsZXJzL2Ryb3BfYXJlYScpO1xyXG5cclxudmFyIFNvbmdzTGlzdFZpZXcgPSByZXF1aXJlKCcuL2F1ZGlvX3BsYXllci92aWV3cy9zb25nc19saXN0Jyk7XHJcbnZhciBTb25nc0xpc3RDb250cm9sbGVyID0gcmVxdWlyZSgnLi9hdWRpb19wbGF5ZXIvY29udHJvbGxlcnMvc29uZ3NfbGlzdCcpO1xyXG5cclxudmFyIFNvbmdEZXRhaWxzVmlldyA9IHJlcXVpcmUoJy4vYXVkaW9fcGxheWVyL3ZpZXdzL3NvbmdfZGV0YWlscycpO1xyXG5cclxudmFyIENvbnRyb2xzVmlldyA9IHJlcXVpcmUoJy4vYXVkaW9fcGxheWVyL3ZpZXdzL2NvbnRyb2xzJyk7XHJcbnZhciBDb250cm9sc0NvbnRyb2xsZXIgPSByZXF1aXJlKCcuL2F1ZGlvX3BsYXllci9jb250cm9sbGVycy9jb250cm9scycpO1xyXG5cclxudmFyIFZpc3VhbGl6ZXJWaWV3ID0gcmVxdWlyZSgnLi9hdWRpb19wbGF5ZXIvdmlld3MvdmlzdWFsaXplcicpO1xyXG5cclxudmFyIEVxdWFsaXplclZpZXcgPSByZXF1aXJlKCcuL2F1ZGlvX3BsYXllci92aWV3cy9lcXVhbGl6ZXInKTtcclxuXHJcbnZhciBkb20gPSByZXF1aXJlKCcuL2RvbScpO1xyXG5cclxuXHJcbi8vIFBsYXllciBTdGF0ZVxyXG52YXIgcGxheWVyU3RhdGUgPSBuZXcgUGxheWVyU3RhdGUoKTtcclxuXHJcbi8vIE1haW5cclxudmFyIHBsYXllclZpZXcgPSBuZXcgUGxheWVyVmlldyh7XHJcblx0ZWw6IGRvbS5ieUlkKCdhdWRpb1BsYXllcicpLFxyXG5cdG1vZGVsOiBwbGF5ZXJTdGF0ZVxyXG59KTtcclxuXHJcbi8vIERyb3AgYXJlYVxyXG52YXIgZHJvcEFyZWFWaWV3ID0gbmV3IERyb3BBcmVhVmlldyh7XHJcblx0ZWw6IGRvbS5xcygnLmpzLWRyb3AtYXJlYScsIHBsYXllclZpZXcuZWwpLFxyXG5cdG1vZGVsOiBwbGF5ZXJTdGF0ZVxyXG59KTtcclxuXHJcbnZhciBkcm9wQXJlYUNvbnRyb2xsZXIgPSBuZXcgRHJvcEFyZWFDb250cm9sbGVyKHtcclxuXHR2aWV3OiBkcm9wQXJlYVZpZXcsXHJcblx0bW9kZWw6IHBsYXllclN0YXRlXHJcbn0pO1xyXG5cclxuLy8gU29uZ3MgTGlzdFxyXG52YXIgc29uZ3NMaXN0VmlldyA9IG5ldyBTb25nc0xpc3RWaWV3KHtcclxuXHRlbDogZG9tLnFzKCcuanMtc29uZ3MtbGlzdCcsIHBsYXllclZpZXcuZWwpLFxyXG5cdHRlbXBsYXRlOiBkb20uYnlJZCgnc29uZ0xpc3RJdGVtJyksXHJcblx0bW9kZWw6IHBsYXllclN0YXRlXHJcbn0pO1xyXG5cclxudmFyIHNvbmdzTGlzdENvbnRyb2xsZXIgPSBuZXcgU29uZ3NMaXN0Q29udHJvbGxlcih7XHJcblx0bW9kZWw6IHBsYXllclN0YXRlLFxyXG5cdHZpZXc6IHNvbmdzTGlzdFZpZXdcclxufSk7XHJcblxyXG4vLyBEZXRhaWxzXHJcbnZhciBzb25nRGV0YWlsc1ZpZXcgPSBuZXcgU29uZ0RldGFpbHNWaWV3KHtcclxuXHRlbDogZG9tLnFzKCcuanMtc29uZy1kZXRhaWxzJywgcGxheWVyVmlldy5lbCksXHJcblx0bW9kZWw6IHBsYXllclN0YXRlXHJcbn0pO1xyXG5cclxuXHJcbi8vIENvbnRyb2xzXHJcbnZhciBjb250cm9sc1ZpZXcgPSBuZXcgQ29udHJvbHNWaWV3KHtcclxuXHRlbDogZG9tLnFzKCcuanMtY29udHJvbHMnLCBwbGF5ZXJWaWV3LmVsKSxcclxuXHRtb2RlbDogcGxheWVyU3RhdGVcclxufSk7XHJcblxyXG52YXIgY29udHJvbHNDb250cm9sbGVyID0gbmV3IENvbnRyb2xzQ29udHJvbGxlcih7XHJcblx0bW9kZWw6IHBsYXllclN0YXRlLFxyXG5cdHZpZXc6IGNvbnRyb2xzVmlld1xyXG59KTtcclxuXHJcbi8vIEVxdWFsaXplclxyXG5cclxudmFyIGVxdWFsaXplclZpZXcgPSBuZXcgRXF1YWxpemVyVmlldyh7XHJcblx0ZWw6IGRvbS5xcygnLmpzLWVxdWFsaXplcicsIHBsYXllclZpZXcuZWwpLFxyXG5cdG1vZGVsOiBwbGF5ZXJTdGF0ZVxyXG59KTtcclxuXHJcbi8vIFZpc3VhbGl6ZXJcclxuXHJcbnZhciB2aXN1YWxpemVyVmlldyA9IG5ldyBWaXN1YWxpemVyVmlldyh7XHJcblx0ZWw6IGRvbS5xcygnLmpzLXZpc3VhbGl6ZXInLCBwbGF5ZXJWaWV3LmVsKSxcclxuXHRtb2RlbDogcGxheWVyU3RhdGVcclxufSk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBhdWRpb0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYXVkaW8nKTtcbnZhciBBdWRpb0NvbnRleHQgPSB3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQ7XG52YXIgYXVkaW9Db250ZXh0ID0gbnVsbDtcbnZhciBBVURJT19GT1JNQVRTID0gW1xuXHR7XG5cdFx0dHlwZTogJ2F1ZGlvL21wZWcnLFxuXHRcdGV4dDogJ21wMydcblx0fSxcblx0e1xuXHRcdHR5cGU6ICdhdWRpby9vZ2c7IGNvZGVjcz1cInZvcmJpc1wiJyxcblx0XHRleHQ6ICdvZ2cnXG5cdH0sXG5cdHtcblx0XHR0eXBlOiAnYXVkaW8vd2F2OyBjb2RlY3M9XCIxXCInLFxuXHRcdGV4dDogJ3dhdidcblx0fSxcblx0e1xuXHRcdHR5cGU6ICdhdWRpby9tcDQ7IGNvZGVjcz1cIm1wNGEuNDAuMlwiJyxcblx0XHRleHQ6ICdhYWMnXG5cdH0sXG5cdHtcblx0XHR0eXBlOiAnYXVkaW8vd2VibScsXG5cdFx0ZXh0OiAnd2ViYSdcblx0fSxcblx0e1xuXHRcdHR5cGU6ICdhdWRpby9mbGFjJyxcblx0XHRleHQ6ICdmbGFjJ1xuXHR9XG5dO1xuXG52YXIgU1VQUE9SVEVEX0ZPUk1BVFMgPSBBVURJT19GT1JNQVRTLmZpbHRlcihmb3JtYXQgPT4ge1xuXHRyZXR1cm4gYXVkaW9FbC5jYW5QbGF5VHlwZShmb3JtYXQudHlwZSkgIT09ICcnO1xufSk7XG5cbmlmIChBdWRpb0NvbnRleHQpIHtcblx0YXVkaW9Db250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdFNVUFBPUlRFRF9GT1JNQVRTOiBTVVBQT1JURURfRk9STUFUUyxcblx0Z2V0QXVkaW9Db250ZXh0OiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gYXVkaW9Db250ZXh0O1xuXHR9XG59O1xuIiwidmFyIGF1ZGlvQ29udGV4dCA9IHJlcXVpcmUoJy4vYXVkaW8nKS5nZXRBdWRpb0NvbnRleHQoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBhdWRpb0NvbnRleHQuY3JlYXRlQW5hbHlzZXIoKTsiLCJcInVzZSBzdHJpY3RcIjtcblxuY2xhc3MgQmFzZUNvbnRyb2xsZXIge1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0dGhpcy5tb2RlbCA9IG9wdGlvbnMubW9kZWw7XG5cdFx0dGhpcy52aWV3ID0gb3B0aW9ucy52aWV3O1xuXHRcdHRoaXMuYmluZExpc3RlbmVycygpO1xuXHR9XG5cblx0YmluZExpc3RlbmVycygpIHt9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQmFzZUNvbnRyb2xsZXI7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBCYXNlQ29udHJvbGxlciA9IHJlcXVpcmUoJy4vYmFzZScpO1xuXG5jbGFzcyBDb250cm9sc0NvbnRyb2xsZXIgZXh0ZW5kcyBCYXNlQ29udHJvbGxlciB7XG5cdGJpbmRMaXN0ZW5lcnMoKSB7XG5cdFx0dGhpcy52aWV3Lm9uKCdjb250cm9sOnByZXNzZWQnLCB0aGlzLm9uQ29udHJvbFByZXNzZWQsIHRoaXMpO1xuXHR9XG5cblx0b25Db250cm9sUHJlc3NlZChjb250cm9sVHlwZSkge1xuXHRcdHN3aXRjaChjb250cm9sVHlwZSkge1xuXHRcdFx0Y2FzZSAncGxheSc6XG5cdFx0XHRcdHRoaXMubW9kZWwucGxheWluZ1NvbmcgPSB0aGlzLm1vZGVsLnNlbGVjdGVkU29uZztcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdzdG9wJzpcblx0XHRcdFx0dGhpcy5tb2RlbC5wbGF5aW5nU29uZyA9IG51bGw7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnZXEnOlxuXHRcdFx0XHR0aGlzLm1vZGVsLmlzVmlzdWFsaXppbmcgPSAhdGhpcy5tb2RlbC5pc1Zpc3VhbGl6aW5nO1xuXHRcdH1cblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbnRyb2xzQ29udHJvbGxlcjsiLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciAkJCA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzJyk7XHJcbnZhciBhdWRpbyA9IHJlcXVpcmUoJy4uLy4uL2F1ZGlvJyk7XHJcbnZhciBhdWRpb0NvbnRleHQgPSBhdWRpby5nZXRBdWRpb0NvbnRleHQoKTtcclxudmFyIEJhc2VDb250cm9sbGVyID0gcmVxdWlyZSgnLi9iYXNlJyk7XHJcblxyXG5jbGFzcyBQbGF5ZXJDb250cm9sbGVyIGV4dGVuZHMgQmFzZUNvbnRyb2xsZXIge1xyXG5cclxuXHRiaW5kTGlzdGVuZXJzKCkge1xyXG5cdFx0dGhpcy52aWV3Lm9uKCdmaWxlczphZGQnLCB0aGlzLm9uRmlsZXNBZGQsIHRoaXMpO1xyXG5cdH1cclxuXHJcblx0b25GaWxlc0FkZChmaWxlcykge1xyXG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuXHRcdHRoaXMuZmlsdGVyQXVkaW9GaWxlcyhmaWxlcykuZm9yRWFjaChmdW5jdGlvbihmaWxlKSB7XHJcblx0XHRcdFByb21pc2UuYWxsKFt0aGlzLmdldFNvbmdJbmZvKGZpbGUsIFtcInRpdGxlXCIsIFwiYXJ0aXN0XCIsIFwicGljdHVyZVwiXSksIHRoaXMuZGVjb2RlU29uZyhmaWxlKV0pXHJcblx0XHRcdFx0LnRoZW4oZnVuY3Rpb24odmFsdWVzKSB7XHJcblx0XHRcdFx0XHQkJC5hc3NpZ24odmFsdWVzWzBdLCB2YWx1ZXNbMV0sIHtmaWxlTmFtZTogZmlsZS5uYW1lfSk7XHJcblx0XHRcdFx0XHRzZWxmLm1vZGVsLmFkZFNvbmcodmFsdWVzWzBdKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdH0sIHRoaXMpO1xyXG5cdH1cclxuXHJcblx0ZmlsdGVyQXVkaW9GaWxlcyhmaWxlcykge1xyXG5cdFx0cmV0dXJuIGZpbGVzLmZpbHRlcih0aGlzLmlzQXVkaW9GaWxlLCB0aGlzKTtcclxuXHR9XHJcblxyXG5cdGlzQXVkaW9GaWxlKGZpbGUpIHtcclxuXHRcdHZhciBzdXBwb3J0ID0gZmFsc2U7XHJcblxyXG5cdFx0YXVkaW8uU1VQUE9SVEVEX0ZPUk1BVFMuZm9yRWFjaChmb3JtYXQgPT4ge1xyXG5cdFx0XHRpZihmaWxlLm5hbWUuc2VhcmNoKGZvcm1hdC5leHQpICE9PSAtMSkge1xyXG5cdFx0XHRcdHN1cHBvcnQgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gc3VwcG9ydDtcclxuXHR9XHJcblxyXG5cdGdldFNvbmdJbmZvKGZpbGUsIHRhZ3MpIHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHRcdFx0dmFyIHVybCA9IGZpbGUudXJuIHx8IGZpbGUubmFtZTtcclxuXHJcblx0XHRcdElEMy5sb2FkVGFncyh1cmwsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0dmFyIGFsbFRhZ3MgPSBJRDMuZ2V0QWxsVGFncyh1cmwpO1xyXG5cdFx0XHRcdFx0dmFyIHBpY3R1cmU7XHJcblx0XHRcdFx0XHR2YXIgcmVzdWx0ID0ge307XHJcblx0XHRcdFx0XHR2YXIgZGF0YVVybDtcclxuXHRcdFx0XHRcdHZhciBiYXNlNjRTdHJpbmc7XHJcblxyXG5cdFx0XHRcdFx0dGFncy5mb3JFYWNoKGZ1bmN0aW9uKHRhZykge1xyXG5cdFx0XHRcdFx0XHRpZiAodGFnID09PSAncGljdHVyZScgJiYgYWxsVGFncy5waWN0dXJlKSB7XHJcblx0XHRcdFx0XHRcdFx0cGljdHVyZSA9IGFsbFRhZ3MucGljdHVyZTtcclxuXHRcdFx0XHRcdFx0XHRiYXNlNjRTdHJpbmcgPSBcIlwiO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgcGljdHVyZS5kYXRhLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRiYXNlNjRTdHJpbmcgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShwaWN0dXJlLmRhdGFbaV0pO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRkYXRhVXJsID0gXCJkYXRhOlwiICsgcGljdHVyZS5mb3JtYXQgKyBcIjtiYXNlNjQsXCIgKyB3aW5kb3cuYnRvYShiYXNlNjRTdHJpbmcpO1xyXG5cdFx0XHRcdFx0XHRcdHJlc3VsdC5waWN0dXJlID0gZGF0YVVybDtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRyZXN1bHRbdGFnXSA9IGFsbFRhZ3NbdGFnXTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0cmVzb2x2ZShyZXN1bHQpO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0dGFnczogdGFncyxcclxuXHRcdFx0XHRcdGRhdGFSZWFkZXI6IEZpbGVBUElSZWFkZXIoZmlsZSksXHJcblx0XHRcdFx0XHRvbkVycm9yOiBmdW5jdGlvbihyZWFzb24pIHtcclxuXHRcdFx0XHRcdFx0cmVqZWN0KHJlYXNvbik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGRlY29kZVNvbmcoZmlsZSkge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cdFx0XHR2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuXHJcblx0XHRcdHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihmaWxlKTtcclxuXHRcdFx0cmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHZhciBidWZmZXIgPSB0aGlzLnJlc3VsdDtcclxuXHJcblx0XHRcdFx0YXVkaW9Db250ZXh0LmRlY29kZUF1ZGlvRGF0YShidWZmZXIsIGF1ZGlvQnVmZmVyID0+IHtcclxuXHRcdFx0XHRcdHJlc29sdmUoe1xyXG5cdFx0XHRcdFx0XHRhdWRpb0J1ZmZlcjogYXVkaW9CdWZmZXIsXHJcblx0XHRcdFx0XHRcdHNhbXBsZVJhdGU6IGF1ZGlvQnVmZmVyLnNhbXBsZVJhdGUsXHJcblx0XHRcdFx0XHRcdGR1cmF0aW9uOiBhdWRpb0J1ZmZlci5kdXJhdGlvblxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRyZWFkZXIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJlamVjdChyZWFkZXIuZXJyb3IpO1xyXG5cdFx0XHR9O1xyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXllckNvbnRyb2xsZXI7XHJcblxyXG5cclxuXHJcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgQmFzZUNvbnRyb2xsZXIgPSByZXF1aXJlKCcuL2Jhc2UnKTtcblxuY2xhc3MgU29uZ3NMaXN0Q29udHJvbGxlciBleHRlbmRzIEJhc2VDb250cm9sbGVyIHtcblx0YmluZExpc3RlbmVycygpIHtcblx0XHR0aGlzLnZpZXcub24oJ3Nvbmc6c2VsZWN0ZWQnLCB0aGlzLm9uU29uZ1NlbGVjdGVkLCB0aGlzKTtcblx0fVxuXG5cdG9uU29uZ1NlbGVjdGVkKHNvbmdJZCkge1xuXHRcdHRoaXMubW9kZWwuc2VsZWN0ZWRTb25nID0gdGhpcy5tb2RlbC5nZXRTb25nKE51bWJlcihzb25nSWQpKTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNvbmdzTGlzdENvbnRyb2xsZXI7IiwidmFyIGlkID0gMTtcblxuY2xhc3MgU29uZyB7XG5cdGNvbnN0cnVjdG9yKGRhdGEpIHtcblx0XHR0aGlzLmlkID0gaWQ7XG5cdFx0dGhpcy5hdWRpb0J1ZmZlciA9IGRhdGEuYXVkaW9CdWZmZXI7XG5cdFx0dGhpcy5maWxlTmFtZSA9IGRhdGEuZmlsZU5hbWU7XG5cdFx0dGhpcy50aXRsZSA9IGRhdGEudGl0bGUgfHwgJyc7XG5cdFx0dGhpcy5hcnRpc3QgPSBkYXRhLmFydGlzdCB8fCAnJztcblx0XHR0aGlzLmR1cmF0aW9uID0gTWF0aC5yb3VuZChkYXRhLmR1cmF0aW9uKTtcblx0XHR0aGlzLnBpY3R1cmUgPSBkYXRhLnBpY3R1cmUgfHwgbnVsbDtcblx0XHRpZCsrO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU29uZzsiLCJ2YXIgRXZlbnRzID0gcmVxdWlyZSgnLi4vLi4vZXZlbnRzJyk7XG52YXIgJCQgPSByZXF1aXJlKCcuLi8uLi91dGlscycpO1xudmFyIFNvbmcgPSByZXF1aXJlKCcuL3NvbmcnKTtcblxuY2xhc3MgU29uZ3Mge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLnNvbmdzID0gW107XG5cdFx0dGhpcy5sZW5ndGggPSAwO1xuXHR9XG5cblx0Z2V0U29uZyhpZCkge1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLnNvbmdzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpZihpZCA9PT0gdGhpcy5zb25nc1tpXS5pZCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5zb25nc1tpXTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRhZGRTb25nKGRhdGEpIHtcblx0XHR2YXIgc29uZyA9IG5ldyBTb25nKGRhdGEpO1xuXHRcdHRoaXMuc29uZ3MucHVzaChzb25nKTtcblx0XHR0aGlzLmxlbmd0aCsrO1xuXHRcdHRoaXMudHJpZ2dlcignc29uZzphZGQnLCBzb25nKTtcblx0fVxuXG5cdHJlbW92ZVNvbmcoaWQpIHtcblx0XHR2YXIgc29uZyA9IHRoaXMuZ2V0U29uZyhpZCk7XG5cdFx0aWYoc29uZyAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aGlzLnNvbmdzLnNwbGljZShzb25nLCAxKTtcblx0XHRcdHRoaXMubGVuZ3RoLS07XG5cdFx0XHR0aGlzLnRyaWdnZXIoJ3Nvbmc6cmVtb3ZlZCcsIHNvbmcpO1xuXHRcdH1cblx0fVxufVxuXG4kJC5hc3NpZ24oU29uZ3MucHJvdG90eXBlLCBFdmVudHMpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNvbmdzOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgRXZlbnRzID0gcmVxdWlyZSgnLi4vLi4vZXZlbnRzJyk7XG52YXIgJCQgPSByZXF1aXJlKCcuLi8uLi91dGlscycpO1xudmFyIFNvbmdzID0gcmVxdWlyZSgnLi4vbW9kZWxzL3NvbmdzJyk7XG5cbmNsYXNzIFBsYXllclN0YXRlIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5zb25ncyA9IG5ldyBTb25ncygpO1xuXHRcdHRoaXMuc2VsZWN0ZWRTb25nID0gbnVsbDtcblx0XHR0aGlzLnBsYXlpbmdTb25nID0gbnVsbDtcblx0XHR0aGlzLmlzVmlzdWFsaXppbmcgPSBmYWxzZTtcblx0XHR0aGlzLmhhdmVTb25ncyA9IGZhbHNlO1xuXHRcdHRoaXMuZXF1YWxpemVyID0ge1xuXHRcdFx0J2dhaW4nOiAgMCxcblx0XHRcdCc2MCc6ICAwLFxuXHRcdFx0JzE3MCc6ICAwLFxuXHRcdFx0JzMxMCc6ICAwLFxuXHRcdFx0JzYwMCc6ICAwLFxuXHRcdFx0JzFLJzogIDAsXG5cdFx0XHQnM0snOiAgMCxcblx0XHRcdCc2Syc6ICAwLFxuXHRcdFx0JzEySyc6ICAwLFxuXHRcdFx0JzE0Syc6ICAwLFxuXHRcdFx0JzE2Syc6ICAwXG5cdFx0fTtcblx0XHR0aGlzLm9ic2VydmVQcm9wZXJ0aWVzKCk7XG5cdFx0dGhpcy5iaW5kTGlzdGVuZXJzKCk7XG5cdH1cblxuXHRvYnNlcnZlUHJvcGVydGllcyhvYmopIHtcblx0XHRPYmplY3Qua2V5cyhvYmopLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG5cdFx0XHRvYmpbJ18nICsga2V5XSA9IG9ialtrZXldO1xuXG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcblx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRyZXR1cm4gb2JqWydfJyArIGtleV07XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHNldDogZnVuY3Rpb24odmFsdWUpIHtcblx0XHRcdFx0XHRpZih0aGlzWydfJyArIGtleV0gPT09IHZhbHVlKSByZXR1cm47XG5cblx0XHRcdFx0XHR0aGlzWydfJyArIGtleV0gPSB2YWx1ZTtcblx0XHRcdFx0XHR0aGlzLnRyaWdnZXIoa2V5ICsgJzpjaGFuZ2VkJywgdmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9LCB0aGlzKTtcblx0fVxuXG5cdGJpbmRMaXN0ZW5lcnMoKSB7XG5cdFx0dGhpcy5zb25ncy5vbignc29uZzphZGQnLCBmdW5jdGlvbihzb25nKSB7XG5cdFx0XHR0aGlzLnRyaWdnZXIoJ3Nvbmc6YWRkJywgc29uZyk7XG5cdFx0XHRpZiAodGhpcy5zb25ncy5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0dGhpcy5oYXZlU29uZ3MgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH0sIHRoaXMpO1xuXG5cdFx0dGhpcy5zb25ncy5vbignc29uZzpyZW1vdmVkJywgZnVuY3Rpb24oc29uZykge1xuXHRcdFx0dGhpcy50cmlnZ2VyKCdzb25nOnJlbW92ZWQnLCBzb25nKTtcblx0XHRcdGlmICh0aGlzLnNvbmdzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHR0aGlzLmhhdmVTb25ncyA9IGZhbHNlO1xuXHRcdFx0fVxuXHRcdH0sIHRoaXMpO1xuXHR9XG5cblx0Z2V0U29uZyhpZCkge1xuXHRcdHJldHVybiB0aGlzLnNvbmdzLmdldFNvbmcoaWQpO1xuXHR9XG5cblx0YWRkU29uZyhkYXRhKSB7XG5cdFx0cmV0dXJuIHRoaXMuc29uZ3MuYWRkU29uZyhkYXRhKTtcblx0fVxuXG5cdHJlbW92ZVNvbmcoaWQpIHtcblx0XHRyZXR1cm4gdGhpcy5zb25ncy5yZW1vdmVTb25nKGlkKTtcblx0fVxufVxuXG4kJC5hc3NpZ24oUGxheWVyU3RhdGUucHJvdG90eXBlLCBFdmVudHMpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXllclN0YXRlO1xuXG5cbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyICQkID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMnKTtcclxudmFyIEV2ZW50cyA9IHJlcXVpcmUoJy4uLy4uL2V2ZW50cycpO1xyXG52YXIgZG9tID0gcmVxdWlyZSgnLi4vLi4vZG9tJyk7XHJcblxyXG5jbGFzcyBCYXNlVmlldyB7XHJcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xyXG5cdFx0dGhpcy5lbCA9IG9wdGlvbnMuZWw7XHJcblx0XHR0aGlzLm1vZGVsID0gb3B0aW9ucy5tb2RlbDtcclxuXHRcdHRoaXMuc3Vidmlld3MgPSBvcHRpb25zLnN1YnZpZXdzO1xyXG5cdFx0aWYob3B0aW9ucy50ZW1wbGF0ZSkge1xyXG5cdFx0XHR0aGlzLnRlbXBsYXRlID0gb3B0aW9ucy50ZW1wbGF0ZS5jb250ZW50LmZpcnN0RWxlbWVudENoaWxkLmNsb25lTm9kZSh0cnVlKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHNob3coKSB7XHJcblx0XHRkb20uc2hvdyh0aGlzLmVsKTtcclxuXHR9XHJcblxyXG5cdGhpZGUoKSB7XHJcblx0XHRkb20uaGlkZSh0aGlzLmVsKTtcclxuXHR9XHJcblxyXG5cdHJlbmRlcigpIHtcclxuXHRcdHRoaXMuZWwuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50KTtcclxuXHR9XHJcblxyXG5cdHJlbW92ZSgpIHtcclxuXHRcdHRoaXMuZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmVsKTtcclxuXHR9XHJcbn1cclxuXHJcbiQkLmFzc2lnbihCYXNlVmlldy5wcm90b3R5cGUsIEV2ZW50cyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEJhc2VWaWV3OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgQmFzZVZpZXcgPSByZXF1aXJlKCcuL2Jhc2UnKTtcbnZhciBkb20gPSByZXF1aXJlKCcuLi8uLi9kb20nKTtcblxuY2xhc3MgQ29udHJvbHNWaWV3IGV4dGVuZHMgQmFzZVZpZXcge1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0c3VwZXIob3B0aW9ucyk7XG5cdFx0dGhpcy5lbGVtcyA9IHtcblx0XHRcdHByZXY6IGRvbS5xcygnLmpzLXByZXYnKSxcblx0XHRcdG5leHQ6IGRvbS5xcygnLmpzLW5leHQnKSxcblx0XHRcdHBsYXk6IGRvbS5xcygnLmpzLXBsYXknKSxcblx0XHRcdHBhdXNlOiBkb20ucXMoJy5qcy1wYXVzZScpLFxuXHRcdFx0c3RvcDogZG9tLnFzKCcuanMtc3RvcCcpLFxuXHRcdFx0ZXE6IGRvbS5xcygnLmpzLWVxJylcblx0XHR9O1xuXHRcdHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XG5cdFx0dGhpcy5zb25ncyA9IFtdO1xuXHRcdHRoaXMuYmluZExpc3RlbmVycygpO1xuXHR9XG5cblx0YmluZExpc3RlbmVycygpIHtcblx0XHR0aGlzLmVsLm9uY2xpY2sgPSB0aGlzLm9uQ29udHJvbENsaWNrLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5tb2RlbC5vbignc2VsZWN0ZWRTb25nOmNoYW5nZWQnLCB0aGlzLm9uU2VsZWN0ZWRTb25nQ2hhbmdlZCwgdGhpcyk7XG5cdFx0dGhpcy5tb2RlbC5vbigncGxheWluZ1Nvbmc6Y2hhbmdlZCcsIHRoaXMub25QbGF5aW5nU29uZ0NoYW5nZWQsIHRoaXMpO1xuXHRcdHRoaXMubW9kZWwub24oJ3Nvbmc6YWRkJywgdGhpcy5vblNvbmdBZGQsIHRoaXMpO1xuXHR9XG5cblx0b25Tb25nQWRkKHNvbmcpIHtcblx0XHR0aGlzLnNvbmdzLnB1c2goc29uZy5pZCk7XG5cdH1cblxuXHRvblBsYXlpbmdTb25nQ2hhbmdlZChzb25nKSB7XG5cdFx0aWYoIXNvbmcpIHtcblx0XHRcdHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XG5cdFx0XHRkb20uYWRkQ2xhc3ModGhpcy5lbGVtcy5zdG9wLCAnaWNvbl9kaXNhYmxlZCcpO1xuXHRcdFx0ZG9tLnJlbW92ZUNsYXNzKHRoaXMuZWxlbXMucGxheSwgJ2ljb25fZGlzYWJsZWQnKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR0aGlzLmlzUGxheWluZyA9IHRydWU7XG5cdFx0XHRkb20ucmVtb3ZlQ2xhc3ModGhpcy5lbGVtcy5zdG9wLCAnaWNvbl9kaXNhYmxlZCcpO1xuXHRcdFx0ZG9tLmFkZENsYXNzKHRoaXMuZWxlbXMucGxheSwgJ2ljb25fZGlzYWJsZWQnKTtcblx0XHR9XG5cdH1cblxuXHRvblNlbGVjdGVkU29uZ0NoYW5nZWQoc29uZykge1xuXHRcdGlmKCF0aGlzLmlzUGxheWluZykge1xuXHRcdFx0ZG9tLnJlbW92ZUNsYXNzKHRoaXMuZWxlbXMucGxheSwgJ2ljb25fZGlzYWJsZWQnKTtcblx0XHR9XG5cdH1cblxuXHRvbkNvbnRyb2xDbGljayhlKSB7XG5cdFx0dmFyIGNvbnRyb2wgPSBkb20uY2xvc2VzdChlLnRhcmdldCwgJy5qcy1jb250cm9sJyk7XG5cdFx0aWYoIWNvbnRyb2wgfHwgZG9tLmhhc0NsYXNzKGNvbnRyb2wsICdpY29uX2Rpc2FibGVkJykpIHJldHVybjtcblx0XHR2YXIgY29udHJvbFR5cGUgPSBjb250cm9sLmRhdGFzZXQudHlwZTtcblx0XHR0aGlzLnRyaWdnZXIoJ2NvbnRyb2w6cHJlc3NlZCcsIGNvbnRyb2xUeXBlKTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbnRyb2xzVmlldztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgZG9tID0gcmVxdWlyZSgnLi4vLi4vZG9tJyk7XG52YXIgJCQgPSByZXF1aXJlKCcuLi8uLi91dGlscycpO1xudmFyIEJhc2VWaWV3ID0gcmVxdWlyZSgnLi9iYXNlJyk7XG5cbmNsYXNzIERyb3BBcmVhVmlldyBleHRlbmRzIEJhc2VWaWV3IHtcblxuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0c3VwZXIob3B0aW9ucyk7XG5cdFx0dGhpcy5oYXZlU29uZ3MgPSBmYWxzZTtcblxuXHRcdHRoaXMuZWxlbXMgPSB7XG5cdFx0XHRkcm9wSGludDogZG9tLnFzKCcuanMtZHJvcC1oaW50JywgdGhpcy5lbClcblx0XHR9O1xuXHRcdHRoaXMuYmluZExpc3RlbmVycygpO1xuXHR9XG5cblx0YmluZExpc3RlbmVycygpIHtcblx0XHR0aGlzLm1vZGVsLm9uKCdoYXZlU29uZ3M6Y2hhbmdlZCcsIGZ1bmN0aW9uKHZhbHVlKXtcblx0XHRcdHRoaXMuaGF2ZVNvbmdzID0gdmFsdWU7XG5cdFx0fSwgdGhpcyk7XG5cdFx0dGhpcy5lbC5vbmRyb3AgPSB0aGlzLm9uRmlsZURyb3AuYmluZCh0aGlzKTtcblx0XHR0aGlzLmVsLm9uZHJhZ2VudGVyID0gdGhpcy5vbkZpbGVFbnRlci5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZWwub25kcmFnb3ZlciA9IHRoaXMub25GaWxlRHJhZy5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZWxlbXMuZHJvcEhpbnQub25kcmFnbGVhdmUgPSB0aGlzLm9uRmlsZUxlYXZlLmJpbmQodGhpcyk7XG5cdH1cblxuXHRvbkZpbGVEcmFnKGUpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdH1cblxuXHRvbkZpbGVEcm9wKGUpIHtcblx0XHR2YXIgZmlsZXMgPSBbXS5zbGljZS5jYWxsKGUuZGF0YVRyYW5zZmVyLmZpbGVzKTtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dGhpcy50cmlnZ2VyKCdmaWxlczphZGQnLCBmaWxlcyk7XG5cdFx0ZG9tLmhpZGUodGhpcy5lbGVtcy5kcm9wSGludCk7XG5cdH1cblxuXHRvbkZpbGVMZWF2ZSgpIHtcblx0XHRpZiAodGhpcy5oYXZlU29uZ3MpIHtcblx0XHRcdGRvbS5oaWRlKHRoaXMuZWxlbXMuZHJvcEhpbnQpO1xuXHRcdH1cblx0fVxuXG5cdG9uRmlsZUVudGVyKGUpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRkb20uc2hvdyh0aGlzLmVsZW1zLmRyb3BIaW50KTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERyb3BBcmVhVmlldztcblxuXG5cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBkb20gPSByZXF1aXJlKCcuLi8uLi9kb20nKTtcbnZhciAkJCA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzJyk7XG52YXIgQmFzZVZpZXcgPSByZXF1aXJlKCcuL2Jhc2UnKTtcblxuY2xhc3MgRXF1YWxpemVyVmlldyBleHRlbmRzIEJhc2VWaWV3IHtcblxuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0c3VwZXIob3B0aW9ucyk7XG5cdFx0XG5cdFx0dGhpcy5zbGlkZXJzID0ge1xuXHRcdFx0J2dhaW4nOiAgZG9tLnFzKCdbZGF0YS10eXBlPVwiZ2FpblwiXScsIHRoaXMuZWwpLFxuXHRcdFx0JzYwJzogIGRvbS5xcygnW2RhdGEtdHlwZT1cIjYwXCJdJywgdGhpcy5lbCksXG5cdFx0XHQnMTcwJzogIGRvbS5xcygnW2RhdGEtdHlwZT1cIjE3MFwiXScsIHRoaXMuZWwpLFxuXHRcdFx0JzMxMCc6ICBkb20ucXMoJ1tkYXRhLXR5cGU9XCIzMTBcIl0nLCB0aGlzLmVsKSxcblx0XHRcdCc2MDAnOiAgZG9tLnFzKCdbZGF0YS10eXBlPVwiNjAwXCJdJywgdGhpcy5lbCksXG5cdFx0XHQnMUsnOiAgZG9tLnFzKCdbZGF0YS10eXBlPVwiMUtcIl0nLCB0aGlzLmVsKSxcblx0XHRcdCczSyc6ICBkb20ucXMoJ1tkYXRhLXR5cGU9XCIzS1wiXScsIHRoaXMuZWwpLFxuXHRcdFx0JzZLJzogIGRvbS5xcygnW2RhdGEtdHlwZT1cIjZLXCJdJywgdGhpcy5lbCksXG5cdFx0XHQnMTJLJzogIGRvbS5xcygnW2RhdGEtdHlwZT1cIjEyS1wiXScsIHRoaXMuZWwpLFxuXHRcdFx0JzE0Syc6ICBkb20ucXMoJ1tkYXRhLXR5cGU9XCIxNEtcIl0nLCB0aGlzLmVsKSxcblx0XHRcdCcxNksnOiAgZG9tLnFzKCdbZGF0YS10eXBlPVwiMTZLXCJdJywgdGhpcy5lbClcdFxuXHRcdH07XG5cblx0XHR0aGlzLnNsaWRlcnNDb29yZHMgPSB7XG5cdFx0XHQnZ2Fpbic6ICB0aGlzLnNsaWRlcnNbJ2dhaW4nXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcblx0XHRcdCc2MCc6ICB0aGlzLnNsaWRlcnNbJzYwJ10uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG5cdFx0XHQnMTcwJzogIHRoaXMuc2xpZGVyc1snMTcwJ10uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG5cdFx0XHQnMzEwJzogIHRoaXMuc2xpZGVyc1snMzEwJ10uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG5cdFx0XHQnNjAwJzogIHRoaXMuc2xpZGVyc1snNjAwJ10uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG5cdFx0XHQnMUsnOiAgdGhpcy5zbGlkZXJzWycxSyddLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuXHRcdFx0JzNLJzogIHRoaXMuc2xpZGVyc1snM0snXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcblx0XHRcdCc2Syc6ICB0aGlzLnNsaWRlcnNbJzZLJ10uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG5cdFx0XHQnMTJLJzogIHRoaXMuc2xpZGVyc1snMTJLJ10uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG5cdFx0XHQnMTRLJzogIHRoaXMuc2xpZGVyc1snMTRLJ10uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG5cdFx0XHQnMTZLJzogIHRoaXMuc2xpZGVyc1snMTZLJ10uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblx0XHR9O1xuXG5cdFx0dGhpcy5hY3RpdmVTbGlkZXIgPSBudWxsO1xuXG5cdFx0dGhpcy5zbGlkZXJTaGlmdCA9IHtcblx0XHRcdHNoaWZ0WDogbnVsbCxcblx0XHRcdHNoaWZ0WTogbnVsbFxuXHRcdH07XG5cdFx0dGhpcy5iaW5kTGlzdGVuZXJzKCk7XG5cdH1cblxuXHRiaW5kTGlzdGVuZXJzKCkge1xuXHRcdHdpbmRvdy5vbnJlc2l6ZSA9IHRoaXMucmVjYWxjU2xpZGVyc0Nvb3Jkcy5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZWwub25tb3VzZWRvd24gPSB0aGlzLm9uVGh1bWJNb3VzZURvd24uYmluZCh0aGlzKTtcblx0XHR0aGlzLmVsLm9uZHJhZ3N0YXJ0ID0gdGhpcy5vbkRyYWdTdGFydC5iaW5kKHRoaXMpO1xuXHR9XG5cblx0b25UaHVtYk1vdXNlRG93bihlKSB7XG5cdFx0dmFyIHRhcmdldCA9IGUudGFyZ2V0O1xuXHRcdHZhclx0dGh1bWJDb29yZHM7XG5cblx0XHRpZiAoIWRvbS5oYXNDbGFzcyhlLnRhcmdldCwgJ2pzLXRodW1iJykpIHJldHVybjtcblxuXHRcdHRodW1iQ29vcmRzID0gdGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRcdHRoaXMuYWN0aXZlVGh1bWIgPSB0YXJnZXQ7XG5cdFx0dGhpcy5hY3RpdmVTbGlkZXIgPSBkb20uY2xvc2VzdCh0YXJnZXQsICcuanMtc2xpZGVyJyk7XG5cdFx0dGhpcy5zbGlkZXJTaGlmdC5zaGlmdFggPSBlLnBhZ2VYIC0gdGh1bWJDb29yZHMubGVmdDtcblx0XHR0aGlzLnNsaWRlclNoaWZ0LnNoaWZ0WSA9IGUucGFnZVkgLSB0aHVtYkNvb3Jkcy50b3A7XG5cdFx0ZG9jdW1lbnQub25tb3VzZW1vdmUgPSB0aGlzLm9uRG9jdW1lbnRNb3VzZU1vdmUuYmluZCh0aGlzKTtcblx0XHRkb2N1bWVudC5vbm1vdXNldXAgPSB0aGlzLm9uRG9jdW1lbnRNb3VzZVVwLmJpbmQodGhpcyk7XG5cdH1cblxuXHRvbkRvY3VtZW50TW91c2VNb3ZlKGUpIHtcblx0XHR2YXIgdHlwZSA9IHRoaXMuYWN0aXZlU2xpZGVyLmRhdGFzZXQudHlwZTtcblx0XHR2YXIgeSA9IGUuY2xpZW50WSAtIHRoaXMuc2xpZGVyU2hpZnQuc2hpZnRZIC0gdGhpcy5zbGlkZXJzQ29vcmRzW3R5cGVdLnRvcDtcblx0XHR0aGlzLm1vdmVUaHVtYih5KTtcblx0XHR0aGlzLnRyaWdnZXIoJ3NsaWRlcjpjaGFuZ2VkJywge3R5cGU6IHR5cGUsIHZhbHVlOiB5fSk7XG5cdH1cblxuXHRvbkRvY3VtZW50TW91c2VVcChlKSB7XG5cdFx0ZG9jdW1lbnQub25tb3VzZW1vdmUgPSBudWxsO1xuXHRcdGRvY3VtZW50Lm9ubW91c2V1cCA9IG51bGw7XG5cdFx0dGhpcy5hY3RpdmVTbGlkZXIgPSBudWxsO1xuXHRcdHRoaXMuYWN0aXZlVGh1bWIgPSBudWxsO1xuXHRcdHRoaXMuc2xpZGVyU2hpZnQuc2hpZnRYID0gbnVsbDtcblx0XHR0aGlzLnNsaWRlclNoaWZ0LnNoaWZ0WSA9IG51bGw7XG5cdH1cblxuXHRjaGVja0Nvb3Jkcyh5KSB7XG5cdFx0dmFyIHRvcEVkZ2U7XG5cblx0XHRpZih5IDwgMCkge1xuXHRcdFx0eSA9IDA7XG5cdFx0fVxuXHRcdHRvcEVkZ2UgPSB0aGlzLmFjdGl2ZVNsaWRlci5vZmZzZXRIZWlnaHQgLSB0aGlzLmFjdGl2ZVRodW1iLm9mZnNldEhlaWdodDtcblx0XHRpZih5ID4gdG9wRWRnZSkge1xuXHRcdFx0eSA9IHRvcEVkZ2U7XG5cdFx0fVxuXHRcdHJldHVybiB5O1xuXHR9XG5cblx0bW92ZVRodW1iKHkpIHtcblx0XHR5ID0gdGhpcy5jaGVja0Nvb3Jkcyh5KTtcblx0XHR0aGlzLmFjdGl2ZVRodW1iLnN0eWxlLnRvcCA9IHkgKyAncHgnO1xuXHR9XG5cblx0b25EcmFnU3RhcnQoKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdFxuXHRyZWNhbGNTbGlkZXJzQ29vcmRzKCkge1xuXHRcdE9iamVjdC5rZXlzKHRoaXMuc2xpZGVycykuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcblx0XHRcdHRoaXMuc2xpZGVyc0Nvb3Jkc1trZXldID0gdGhpcy5zbGlkZXJzW2tleV0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0fSwgdGhpcyk7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBFcXVhbGl6ZXJWaWV3OyIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyIEJhc2VWaWV3ID0gcmVxdWlyZSgnLi9iYXNlJyk7XHJcbnZhciBhdWRpb0NvbnRleHQgPSByZXF1aXJlKCcuLi8uLi9hdWRpbycpLmdldEF1ZGlvQ29udGV4dCgpO1xyXG52YXIgRlJFUVVFTkNJRVMgPSBbNjAsIDE3MCwgMzEwLCA2MDAsIDEwMDAsIDMwMDAsIDYwMDAsIDEyMDAwLCAxNDAwMCwgMTYwMDBdO1xyXG52YXIgYW5hbHlzZXIgPSByZXF1aXJlKCcuLi8uLi9hdWRpb19hbmFseXNlcicpO1xyXG52YXIgZG9tID0gcmVxdWlyZSgnLi4vLi4vZG9tJyk7XHJcblxyXG5jbGFzcyBQbGF5ZXJWaWV3IGV4dGVuZHMgQmFzZVZpZXcge1xyXG5cclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcblx0XHRzdXBlcihvcHRpb25zKTtcclxuXHRcdHRoaXMuZ2FpbiA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKCk7XHJcblx0XHR0aGlzLmZpbHRlcnMgPSB0aGlzLmNyZWF0ZUZpbHRlcnMoRlJFUVVFTkNJRVMpO1xyXG5cdFx0dGhpcy5hbmFseXNlciA9IGFuYWx5c2VyO1xyXG5cdFx0dGhpcy5lbGVtcyA9IHtcclxuXHRcdFx0dmlzdWFsaXplcjogZG9tLnFzKCcuanMtdmlzdWFsaXplcicsIHRoaXMuZWwpLFxyXG5cdFx0XHRlcXVhbGl6ZXI6IGRvbS5xcygnLmpzLWVxdWFsaXplcicsIHRoaXMuZWwpXHJcblx0XHR9O1xyXG5cdFx0dGhpcy5iaW5kTGlzdGVuZXJzKCk7XHJcblx0fVxyXG5cclxuXHRiaW5kTGlzdGVuZXJzKCkge1xyXG5cdFx0dGhpcy5tb2RlbC5vbignaXNWaXN1YWxpemluZzpjaGFuZ2VkJywgdGhpcy5vblZpc3VhbGl6aW5nQ2hhbmdlZCwgdGhpcyk7XHJcblx0XHR0aGlzLm1vZGVsLm9uKCdwbGF5aW5nU29uZzpjaGFuZ2VkJywgdGhpcy5vblBsYXlpbmdTb25nQ2hhbmdlZCwgdGhpcyk7XHJcblx0fVxyXG5cclxuXHRvblZpc3VhbGl6aW5nQ2hhbmdlZChpc1Zpc3VhbGl6aW5nKSB7XHJcblx0XHRpZiAoaXNWaXN1YWxpemluZykge1xyXG5cdFx0XHRkb20uaGlkZSh0aGlzLmVsZW1zLmVxdWFsaXplcik7XHJcblx0XHRcdGRvbS5zaG93KHRoaXMuZWxlbXMudmlzdWFsaXplcik7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0ZG9tLnNob3codGhpcy5lbGVtcy5lcXVhbGl6ZXIpO1xyXG5cdFx0XHRkb20uaGlkZSh0aGlzLmVsZW1zLnZpc3VhbGl6ZXIpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0b25QbGF5aW5nU29uZ0NoYW5nZWQoc29uZykge1xyXG5cdFx0aWYoIXNvbmcpIHtcclxuXHRcdFx0dGhpcy5zdG9wU29uZygpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHRoaXMucGxheVNvbmcoc29uZyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwbGF5U29uZyhzb25nKSB7XHJcblx0XHR0aGlzLnBsYXkoc29uZy5hdWRpb0J1ZmZlcik7XHJcblx0fVxyXG5cclxuXHRzdG9wU29uZygpIHtcclxuXHRcdHRoaXMuc3RvcCgpO1xyXG5cdH1cclxuXHJcblx0Y3JlYXRlRmlsdGVycyhmcmVxdWVuY2llcykge1xyXG5cdFx0dmFyIGZpbHRlcnMgPSBmcmVxdWVuY2llcy5tYXAodGhpcy5jcmVhdGVGaWx0ZXIpO1xyXG5cclxuXHRcdGZpbHRlcnMucmVkdWNlKGZ1bmN0aW9uKHByZXYsIGN1cnIpIHtcclxuXHRcdFx0cHJldi5jb25uZWN0KGN1cnIpO1xyXG5cdFx0XHRyZXR1cm4gY3VycjtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiBmaWx0ZXJzO1xyXG5cdH1cclxuXHJcblx0Y3JlYXRlRmlsdGVyKGZyZXF1ZW5jeSkge1xyXG5cdFx0dmFyIGZpbHRlciA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCaXF1YWRGaWx0ZXIoKTtcclxuXHJcblx0XHRmaWx0ZXIudHlwZSA9ICdwZWFraW5nJztcclxuXHRcdGZpbHRlci5mcmVxdWVuY3kudmFsdWUgPSBmcmVxdWVuY3k7XHJcblx0XHRmaWx0ZXIuUS52YWx1ZSA9IDE7XHJcblx0XHRmaWx0ZXIuZ2Fpbi52YWx1ZSA9IDA7XHJcblxyXG5cdFx0cmV0dXJuIGZpbHRlcjtcclxuXHR9XHJcblxyXG5cdHBsYXkoYXVkaW9CdWZmZXIpIHtcclxuXHRcdHRoaXMuYXVkaW9Tb3VyY2UgPSBhdWRpb0NvbnRleHQuY3JlYXRlQnVmZmVyU291cmNlKCk7XHJcblx0XHR0aGlzLmF1ZGlvU291cmNlLmJ1ZmZlciA9IGF1ZGlvQnVmZmVyO1xyXG5cdFx0dGhpcy5hdWRpb1NvdXJjZS5jb25uZWN0KHRoaXMuZ2Fpbik7XHJcblxyXG5cdFx0dGhpcy5nYWluLmNvbm5lY3QodGhpcy5maWx0ZXJzWzBdKTtcclxuXHRcdHRoaXMuZmlsdGVyc1t0aGlzLmZpbHRlcnMubGVuZ3RoIC0gMV0uY29ubmVjdCh0aGlzLmFuYWx5c2VyKTtcclxuXHRcdHRoaXMuYW5hbHlzZXIuY29ubmVjdChhdWRpb0NvbnRleHQuZGVzdGluYXRpb24pO1xyXG5cdFx0dGhpcy5hdWRpb1NvdXJjZS5zdGFydCgwKTtcclxuXHR9XHJcblxyXG5cdHN0b3AoKSB7XHJcblx0XHR0aGlzLmF1ZGlvU291cmNlLnN0b3AoMCk7XHJcblx0fVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXllclZpZXc7XHJcblxyXG5cclxuXHJcblxyXG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIEJhc2VWaWV3ID0gcmVxdWlyZSgnLi9iYXNlJyk7XG52YXIgZG9tID0gcmVxdWlyZSgnLi4vLi4vZG9tJyk7XG5cbmNsYXNzIFNvbmdEZXRhaWxzVmlldyBleHRlbmRzIEJhc2VWaWV3IHtcblxuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0c3VwZXIob3B0aW9ucyk7XG5cdFx0dGhpcy5lbGVtcyA9IHtcblx0XHRcdGNvdmVyOiBkb20ucXMoJy5qcy1jb3ZlcicsIHRoaXMuZWwpLFxuXHRcdFx0dGl0bGU6IGRvbS5xcygnLmpzLXRpdGxlJywgdGhpcy5lbCksXG5cdFx0XHRhcnRpc3Q6IGRvbS5xcygnLmpzLWFydGlzdCcsIHRoaXMuZWwpLFxuXHRcdFx0ZmlsZU5hbWU6IGRvbS5xcygnLmpzLWZpbGVuYW1lJywgdGhpcy5lbClcblx0XHR9O1xuXHRcdHRoaXMuZGVmYXVsdFBpY3R1cmUgPSB0aGlzLmVsZW1zLmNvdmVyLnNyYztcblx0XHR0aGlzLnBsYXlpbmdTb25nID0gbnVsbDtcblxuXHRcdHRoaXMuYmluZExpc3RlbmVycygpO1xuXHR9XG5cblx0YmluZExpc3RlbmVycygpIHtcblx0XHR0aGlzLm1vZGVsLm9uKCdzZWxlY3RlZFNvbmc6Y2hhbmdlZCcsIHRoaXMub25TZWxlY3RlZFNvbmdDaGFuZ2VkLCB0aGlzKTtcblx0XHR0aGlzLm1vZGVsLm9uKCdwbGF5aW5nU29uZzpjaGFuZ2VkJywgZnVuY3Rpb24oc29uZyl7XG5cdFx0XHR0aGlzLnBsYXlpbmdTb25nID0gc29uZztcblx0XHR9LCB0aGlzKTtcblx0fVxuXG5cdG9uU2VsZWN0ZWRTb25nQ2hhbmdlZChzb25nKSB7XG5cdFx0aWYgKHRoaXMucGxheWluZ1NvbmcpIHJldHVybjtcblxuXHRcdGlmKHNvbmcucGljdHVyZSkge1xuXHRcdFx0dGhpcy5lbGVtcy5jb3Zlci5zcmMgPSBzb25nLnBpY3R1cmU7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dGhpcy5lbGVtcy5jb3Zlci5zcmMgPSB0aGlzLmRlZmF1bHRQaWN0dXJlO1xuXHRcdH1cblx0XHRpZiAoIXNvbmcudGl0bGUpIHtcblx0XHRcdHRoaXMuZWxlbXMuZmlsZU5hbWUudGV4dENvbnRlbnQgPSAnJztcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR0aGlzLmVsZW1zLmZpbGVOYW1lLnRleHRDb250ZW50ID0gc29uZy5maWxlTmFtZTtcblx0XHR9XG5cdFx0dGhpcy5lbGVtcy50aXRsZS50ZXh0Q29udGVudCA9IHNvbmcudGl0bGUgfHwgc29uZy5maWxlTmFtZTtcblx0XHR0aGlzLmVsZW1zLmFydGlzdC50ZXh0Q29udGVudCA9IHNvbmcuYXJ0aXN0IHx8ICcnO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU29uZ0RldGFpbHNWaWV3OyIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyICQkID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMnKTtcclxudmFyIEV2ZW50cyA9IHJlcXVpcmUoJy4uLy4uL2V2ZW50cycpO1xyXG52YXIgZG9tID0gcmVxdWlyZSgnLi4vLi4vZG9tJyk7XHJcbnZhciBCYXNlVmlldyA9IHJlcXVpcmUoJy4vYmFzZScpO1xyXG5cclxuY2xhc3MgU29uZ3NMaXN0VmlldyBleHRlbmRzIEJhc2VWaWV3IHtcclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcblx0XHRzdXBlcihvcHRpb25zKTtcclxuXHRcdHRoaXMuZWxlbXMgPSB7XHJcblx0XHRcdHBsYWNlaG9sZGVyOiBkb20ucXMoJy5qcy1wbGFjZWhvbGRlcicsIHRoaXMuZWwpXHJcblx0XHR9O1xyXG5cdFx0dGhpcy5iaW5kTGlzdGVuZXJzKCk7XHJcblx0fVxyXG5cclxuXHRiaW5kTGlzdGVuZXJzKCkge1xyXG5cdFx0dGhpcy5tb2RlbC5vbignc29uZzphZGQnLCB0aGlzLm9uU29uZ0FkZCwgdGhpcyk7XHJcblx0XHR0aGlzLmVsLm9uY2xpY2sgPSB0aGlzLm9uU29uZ0NsaWNrLmJpbmQodGhpcyk7XHJcblx0fVxyXG5cclxuXHRvblNvbmdDbGljayhlKSB7XHJcblx0XHR2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XHJcblx0XHR2YXIgc29uZ0VsID0gZG9tLmNsb3Nlc3QodGFyZ2V0LCAnLmpzLXNvbmcnKTtcclxuXHJcblx0XHR0aGlzLnNlbGVjdFNvbmcoc29uZ0VsKTtcclxuXHRcdHRoaXMudHJpZ2dlcignc29uZzpzZWxlY3RlZCcsIHNvbmdFbC5kYXRhc2V0LmlkKTtcclxuXHR9XHJcblxyXG5cdG9uU29uZ0FkZChzb25nKSB7XHJcblx0XHR2YXIgc29uZ0VsID0gdGhpcy5jcmVhdGVTb25nRWwoc29uZyk7XHJcblxyXG5cdFx0aWYoIXRoaXMuaGF2ZVNvbmdzKSB7XHJcblx0XHRcdHRoaXMuZWxlbXMucGxhY2Vob2xkZXIucmVtb3ZlKCk7XHJcblx0XHR9XHJcblx0XHR0aGlzLmhhdmVTb25ncyA9IHRydWU7XHJcblx0XHR0aGlzLmVsLmFwcGVuZENoaWxkKHNvbmdFbCk7XHJcblx0fVxyXG5cclxuXHRzZWxlY3RTb25nKHNvbmdFbCkge1xyXG5cdFx0JCQudG9BcnJheShzb25nRWwucGFyZW50Tm9kZS5jaGlsZHJlbilcclxuXHRcdFx0LmZpbHRlcihlbCA9PiBlbCAhPT0gc29uZ0VsKVxyXG5cdFx0XHQuZm9yRWFjaChlbCA9PiBkb20ucmVtb3ZlQ2xhc3MoZWwsICdzb25nLWl0ZW1fc2VsZWN0ZWQnKSk7XHJcblxyXG5cdFx0ZG9tLmFkZENsYXNzKHNvbmdFbCwgJ3NvbmctaXRlbV9zZWxlY3RlZCcpO1xyXG5cdH1cclxuXHJcblx0Y3JlYXRlU29uZ0VsKHNvbmcpIHtcclxuXHRcdHZhciBzb25nRWwgPSB0aGlzLnRlbXBsYXRlLmNsb25lTm9kZSh0cnVlKTtcclxuXHRcdHZhciB0aXRsZSA9IGRvbS5xcygnLmpzLXNvbmctdGl0bGUnLCBzb25nRWwpO1xyXG5cdFx0dmFyIGFydGlzdCA9IGRvbS5xcygnLmpzLXNvbmctYXJ0aXN0Jywgc29uZ0VsKTtcclxuXHRcdHZhciBjb3ZlciA9IGRvbS5xcygnLmpzLXNvbmctY292ZXInLCBzb25nRWwpO1xyXG5cdFx0dmFyIGR1cmF0aW9uID0gZG9tLnFzKCcuanMtc29uZy1kdXJhdGlvbicsIHNvbmdFbCk7XHJcblxyXG5cdFx0dGl0bGUudGV4dENvbnRlbnQgPSBzb25nLnRpdGxlIHx8IHNvbmcuZmlsZU5hbWU7XHJcblx0XHRhcnRpc3QudGV4dENvbnRlbnQgPSBzb25nLmFydGlzdDtcclxuXHJcblx0XHRkdXJhdGlvbi50ZXh0Q29udGVudCA9IHRoaXMuZm9ybWF0RHVyYXRpb24oc29uZy5kdXJhdGlvbik7XHJcblx0XHRzb25nRWwuZGF0YXNldC5pZCA9IHNvbmcuaWQ7XHJcblx0XHRpZihzb25nLnBpY3R1cmUpIHtcclxuXHRcdFx0Y292ZXIuc3JjID0gc29uZy5waWN0dXJlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBzb25nRWw7XHJcblx0fVxyXG5cclxuXHRmb3JtYXREdXJhdGlvbihzZWNzKSB7XHJcblx0XHR2YXIgbWludXRlcyA9IE1hdGguZmxvb3Ioc2VjcyAvIDYwKTtcclxuXHRcdHZhciBzZWNvbmRzID0gc2VjcyAlIDYwO1xyXG5cclxuXHRcdGlmKHNlY29uZHMudG9TdHJpbmcoKS5sZW5ndGggPT09IDEpIHtcclxuXHRcdFx0c2Vjb25kcyA9ICcwJyArIHNlY29uZHM7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGAke21pbnV0ZXN9OiR7c2Vjb25kc31gO1xyXG5cdH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTb25nc0xpc3RWaWV3OyAiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIEJhc2VWaWV3ID0gcmVxdWlyZSgnLi9iYXNlJyk7XG52YXIgZG9tID0gcmVxdWlyZSgnLi4vLi4vZG9tJyk7XG52YXIgYXVkaW8gPSByZXF1aXJlKCcuLi8uLi9hdWRpbycpO1xudmFyIGFuYWx5c2VyID0gcmVxdWlyZSgnLi4vLi4vYXVkaW9fYW5hbHlzZXInKTtcblxuY2xhc3MgVmlzdWFsaXplclZpZXcgZXh0ZW5kcyBCYXNlVmlldyB7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRzdXBlcihvcHRpb25zKTtcblxuXHRcdHRoaXMuZWxlbXMgPSB7XG5cdFx0XHRjYW52YXM6IGRvbS5xcygnLmpzLWNhbnZhcycsIHRoaXMuZWwpXG5cdFx0fTtcblx0XHR0aGlzLmZyYW1lSWQgPSBudWxsO1xuXHRcdHRoaXMuY2FudmFzVyA9IHRoaXMuZWxlbXMuY2FudmFzLm9mZnNldFdpZHRoO1xuXHRcdHRoaXMuY2FudmFzSCA9IHRoaXMuZWxlbXMuY2FudmFzLm9mZnNldEhlaWdodDtcblx0XHR0aGlzLmNhbnZhc0N0eCA9IHRoaXMuZWxlbXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cdFx0dGhpcy5iaW5kTGlzdGVuZXJzKCk7XG5cdH1cblxuXHRiaW5kTGlzdGVuZXJzKCkge1xuXHRcdHRoaXMubW9kZWwub24oJ3BsYXlpbmdTb25nOmNoYW5nZWQnLCB0aGlzLm9uUGxheWluZ1NvbmdDaGFuZ2VkLCB0aGlzKTtcblx0fVxuXG5cdG9uUGxheWluZ1NvbmdDaGFuZ2VkKHNvbmcpIHtcblx0XHRpZihzb25nKSB7XG5cdFx0XHR0aGlzLnN0YXJ0VmlzdWFsaXphdGlvbigpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHRoaXMuc3RvcFZpc3VhbGl6YXRpb24oKTtcblx0XHR9XG5cdH1cblxuXHRjbGVhckNhbnZhcygpIHtcblx0XHR0aGlzLmNhbnZhc0N0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXNXLCB0aGlzLmNhbnZhc0gpO1xuXHR9XG5cblx0c3RvcFZpc3VhbGl6YXRpb24oKSB7XG5cdFx0Y2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5mcmFtZUlkKTtcblx0XHR0aGlzLmNsZWFyQ2FudmFzKCk7XG5cdH1cblxuXHRzdGFydFZpc3VhbGl6YXRpb24oKSB7XG5cdFx0dmFyIGk7XG5cdFx0dmFyIHggPSAwO1xuXHRcdHZhciB2O1xuXHRcdHZhciB5O1xuXHRcdHZhciBzbGljZVdpZHRoO1xuXHRcdHZhciBidWZmZXJMZW5ndGggPSBhbmFseXNlci5mcmVxdWVuY3lCaW5Db3VudDtcblx0XHR2YXIgZGF0YUFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyTGVuZ3RoKTtcblxuXHRcdHRoaXMuY2xlYXJDYW52YXMoKTtcblx0XHR0aGlzLmZyYW1lSWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5zdGFydFZpc3VhbGl6YXRpb24uYmluZCh0aGlzKSk7XG5cdFx0YW5hbHlzZXIuZ2V0Qnl0ZVRpbWVEb21haW5EYXRhKGRhdGFBcnJheSk7XG5cdFx0dGhpcy5jYW52YXNDdHgubGluZVdpZHRoID0gMTtcblx0XHR0aGlzLmNhbnZhc0N0eC5zdHJva2VTdHlsZSA9ICdyZWQnO1xuXHRcdHRoaXMuY2FudmFzQ3R4LmJlZ2luUGF0aCgpO1xuXG5cdFx0c2xpY2VXaWR0aCA9IHRoaXMuY2FudmFzVyAqIDEuMCAvIGJ1ZmZlckxlbmd0aDtcblxuXHRcdGZvcihpID0gMDsgaSA8IGJ1ZmZlckxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2ID0gZGF0YUFycmF5W2ldIC8gMTI4LjA7XG5cdFx0XHR5ID0gdiAqIHRoaXMuY2FudmFzSCAvIDI7XG5cblx0XHRcdGlmKGkgPT09IDApIHtcblx0XHRcdFx0dGhpcy5jYW52YXNDdHgubW92ZVRvKHgsIHkpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHRoaXMuY2FudmFzQ3R4LmxpbmVUbyh4LCB5KTtcblx0XHRcdH1cblxuXHRcdFx0eCArPSBzbGljZVdpZHRoO1xuXHRcdH1cblx0XHR0aGlzLmNhbnZhc0N0eC5saW5lVG8odGhpcy5jYW52YXNXLCB0aGlzLmNhbnZhc0ggLyAyKTtcblx0XHR0aGlzLmNhbnZhc0N0eC5jbG9zZVBhdGgoKTtcblx0XHR0aGlzLmNhbnZhc0N0eC5zdHJva2UoKTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFZpc3VhbGl6ZXJWaWV3OyIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyICQkID0gcmVxdWlyZSgnLi91dGlscycpO1xyXG5cclxudmFyIGRvbSA9IHtcclxuXHRieUlkOiBmdW5jdGlvbihpZCkge1xyXG5cdFx0cmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxuXHR9LFxyXG5cdHFzOiBmdW5jdGlvbihzZWxlY3RvciwgY29udGV4dCkge1xyXG5cdFx0Y29udGV4dCA9IGNvbnRleHQgfHwgZG9jdW1lbnQ7XHJcblx0XHRyZXR1cm4gY29udGV4dC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcclxuXHR9LFxyXG5cdHFzYTogZnVuY3Rpb24oc2VsZWN0b3IsIGNvbnRleHQpIHtcclxuXHRcdGNvbnRleHQgPSBjb250ZXh0IHx8IGRvY3VtZW50O1xyXG5cdFx0cmV0dXJuICQkLnRvQXJyYXkoY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XHJcblx0fSxcclxuXHRhZGRDbGFzczogZnVuY3Rpb24oZWwsIGNsYXNzTmFtZSkge1xyXG5cdFx0ZWwuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xyXG5cdH0sXHJcblx0cmVtb3ZlQ2xhc3M6IGZ1bmN0aW9uKGVsLCBjbGFzc05hbWUpIHtcclxuXHRcdGVsLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcclxuXHR9LFxyXG5cdGhhc0NsYXNzOiBmdW5jdGlvbihlbCwgY2xhc3NOYW1lKSB7XHJcblx0XHRyZXR1cm4gZWwuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7XHJcblx0fSxcclxuXHRoaWRlOiBmdW5jdGlvbiguLi5lbGVtcykge1xyXG5cdFx0ZWxlbXMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XHJcblx0XHRcdGl0ZW0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHRcdH0pO1xyXG5cdH0sXHJcblx0c2hvdzogZnVuY3Rpb24oLi4uZWxlbXMpIHtcclxuXHRcdGVsZW1zLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xyXG5cdFx0XHRpdGVtLnN0eWxlLmRpc3BsYXkgPSAnJztcclxuXHRcdH0pO1xyXG5cdH0sXHJcblx0Y2xvc2VzdDogZnVuY3Rpb24oZWwsIHNlbGVjdG9yKSB7XHJcblx0XHRpZihlbC5jbG9zZXN0KSByZXR1cm4gZWwuY2xvc2VzdChzZWxlY3Rvcik7XHJcblxyXG5cdFx0dmFyIHBhcmVudE5vZGUgPSBlbDtcclxuXHRcdHZhciBtYXRjaGVzO1xyXG5cclxuXHRcdHdoaWxlKChtYXRjaGVzID0gcGFyZW50Tm9kZSAmJiBwYXJlbnROb2RlLm1hdGNoZXMpICYmICFwYXJlbnROb2RlLm1hdGNoZXMoc2VsZWN0b3IpKSB7XHJcblx0XHRcdHBhcmVudE5vZGUgPSBwYXJlbnROb2RlLnBhcmVudE5vZGU7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gbWF0Y2hlcyA/IHBhcmVudE5vZGUgOiBudWxsO1xyXG5cdH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZG9tOyIsInZhciBzdWJzY3JpYmVycyA9IG5ldyBNYXAoKTtcblxudmFyIEV2ZW50cyA9IHtcblx0b246IGZ1bmN0aW9uKHR5cGUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG5cdFx0dmFyIGl0ZW07XG5cblx0XHRpZihzdWJzY3JpYmVycy5oYXModGhpcykpIHtcblx0XHRcdGl0ZW0gPSBzdWJzY3JpYmVycy5nZXQodGhpcyk7XG5cdFx0XHRpZihpdGVtW3R5cGVdKSB7XG5cdFx0XHRcdGl0ZW1bdHlwZV0ucHVzaCh7XG5cdFx0XHRcdFx0Y2FsbGJhY2s6IGNhbGxiYWNrLFxuXHRcdFx0XHRcdGNvbnRleHQ6IGNvbnRleHRcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0aXRlbVt0eXBlXSA9IFt7XG5cdFx0XHRcdFx0Y2FsbGJhY2s6IGNhbGxiYWNrLFxuXHRcdFx0XHRcdGNvbnRleHQ6IGNvbnRleHRcblx0XHRcdFx0fV07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0aXRlbSA9IHtcblx0XHRcdFx0W3R5cGVdOiBbe1xuXHRcdFx0XHRcdGNhbGxiYWNrOiBjYWxsYmFjayxcblx0XHRcdFx0XHRjb250ZXh0OiBjb250ZXh0XG5cdFx0XHRcdH1dXG5cdFx0XHR9O1xuXHRcdFx0c3Vic2NyaWJlcnMuc2V0KHRoaXMsIGl0ZW0pO1xuXHRcdH1cblx0fSxcblx0b2ZmOiBmdW5jdGlvbih0eXBlLCBjYWxsYmFjaykge1xuXHRcdHZhciBpdGVtLCBpO1xuXHRcdGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcblx0XHRcdHN1YnNjcmliZXJzLmRlbGV0ZSh0aGlzKTtcblx0XHR9XG5cdFx0aWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSAmJiBzdWJzY3JpYmVycy5oYXModGhpcykpIHtcblx0XHRcdGl0ZW0gPSBzdWJzY3JpYmVycy5nZXQodGhpcyk7XG5cdFx0XHRpZihpdGVtW3R5cGVdKSB7XG5cdFx0XHRcdGlmKGNhbGxiYWNrKSB7XG5cdFx0XHRcdFx0Zm9yKGkgPSAwOyBpIDwgaXRlbVt0eXBlXS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0aWYoaXRlbVt0eXBlXVtpXSA9PT0gY2FsbGJhY2spIHtcblx0XHRcdFx0XHRcdFx0aXRlbVt0eXBlXS5zcGxpY2UoaSwgMSk7XG5cdFx0XHRcdFx0XHRcdGktLTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0ZGVsZXRlIGl0ZW1bdHlwZV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cdHRyaWdnZXI6IGZ1bmN0aW9uKHR5cGUsIC4uLmFyZ3MpIHtcblx0XHR2YXIgaXRlbTtcblxuXHRcdGlmKHN1YnNjcmliZXJzLmhhcyh0aGlzKSkge1xuXHRcdFx0aXRlbSA9IHN1YnNjcmliZXJzLmdldCh0aGlzKTtcblx0XHRcdGlmKGl0ZW1bdHlwZV0pIHtcblx0XHRcdFx0aXRlbVt0eXBlXS5mb3JFYWNoKGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRcdFx0dmFyIGNvbnRleHQgPSBldmVudC5jb250ZXh0IHx8IHRoaXM7XG5cdFx0XHRcdFx0ZXZlbnQuY2FsbGJhY2suYXBwbHkoY29udGV4dCwgYXJncyk7XG5cdFx0XHRcdH0sIHRoaXMpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBFdmVudHM7IiwidmFyICQkID0ge1xuXHR0b0FycmF5OiBmdW5jdGlvbihvYmplY3QpIHtcblx0XHRyZXR1cm4gW10uc2xpY2UuY2FsbChvYmplY3QpO1xuXHR9LFxuXHRhc3NpZ246IGZ1bmN0aW9uKHRhcmdldCwgLi4ucmVzdCkge1xuXHRcdGlmKHRhcmdldCA9PT0gdW5kZWZpbmVkIHx8IHRhcmdldCA9PT0gbnVsbCkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgZmlyc3QgYXJndW1lbnQgdG8gb2JqZWN0Jyk7XG5cdFx0fVxuXHRcdHJlc3QuZm9yRWFjaChvYmogPT4ge1xuXHRcdFx0aWYob2JqID09PSB1bmRlZmluZWQgfHwgb2JqID09PSBudWxsKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChrZXkgPT4ge1xuXHRcdFx0XHR0YXJnZXRba2V5XSA9IG9ialtrZXldO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gJCQ7Il19
