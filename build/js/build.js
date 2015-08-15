(function e(t, n, r) {
	function s(o, u) {
		if(!n[o]) {
			if(!t[o]) {
				var a = typeof require == "function" && require;
				if(!u && a)return a(o, !0);
				if(i)return i(o, !0);
				var f = new Error("Cannot find module '" + o + "'");
				throw f.code = "MODULE_NOT_FOUND", f
			}
			var l = n[o] = {exports: {}};
			t[o][0].call(l.exports, function(e) {
				var n = t[o][1][e];
				return s(n ? n : e)
			}, l, l.exports, e, t, n, r)
		}
		return n[o].exports
	}

	var i = typeof require == "function" && require;
	for(var o = 0; o < r.length; o++)s(r[o]);
	return s
})({
	1: [function(require, module, exports) {
		'use strict';

		var audioEl = document.createElement('audio');
		var AudioContext = window.AudioContext || window.webkitAudioContext;
		var audioContext = new AudioContext();
		var FREQUENCIES = [60, 170, 310, 600, 1000, 3000, 6000, 12000, 14000, 16000];
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

		var SUPPORTED_FORMATS = AUDIO_FORMATS.filter(function(format) {
			return audioEl.canPlayType(format.type) !== '';
		});

		module.exports = {

			getSongInfo: function getSongInfo(file, tags) {
				return new Promise(function(resolve, reject) {
					var url = file.urn || file.name;

					ID3.loadTags(url, function() {
						var allTags = ID3.getAllTags(url);
						var picture;
						var result = {};
						var dataUrl;
						var base64String;

						tags.forEach(function(tag) {
							if(tag === 'picture' && allTags.picture) {
								picture = allTags.picture;
								base64String = '';

								for(var i = 0; i < picture.data.length; i++) {
									base64String += String.fromCharCode(picture.data[i]);
								}
								dataUrl = 'data:' + picture.format + ';base64,' + window.btoa(base64String);
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
			},

			decodeSong: function decodeSong(file) {
				return new Promise(function(resolve, reject) {
					var reader = new FileReader();

					reader.readAsArrayBuffer(file);
					reader.onload = function() {
						var buffer = this.result;

						audioContext.decodeAudioData(buffer, function(audioBuffer) {
							resolve({
								audioBuffer: audioBuffer,
								sampleRate: audioBuffer.sampleRate,
								duration: audioBuffer.duration
							});
						});
					};

					reader.onerror = function() {
						reject(reader.error);
					};
				});
			},

			createFilters: function createFilters(frequencies) {
				var filters = frequencies.map(this.createFilter);

				filters.reduce(function(prev, curr) {
					prev.connect(curr);
					return curr;
				});

				return filters;
			},

			createFilter: function createFilter(frequency) {
				var filter = audioContext.createBiquadFilter();

				filter.type = 'peaking';
				filter.frequency.value = frequency;
				filter.Q.value = 1;
				filter.gain.value = 0;

				return filter;
			},

			createAnalyser: function createAnalyser(fftSize) {
				var analyser = audioContext.createAnalyser();

				analyser.fftSize = fftSize;
				return analyser;
			},

			play: function play(audioBuffer) {
				this.audioSource = audioContext.createBufferSource();
				this.audioSource.buffer = audioBuffer;
				this.audioSource.connect(this.gain);

				this.gain.connect(this.filters[0]);
				this.filters[this.filters.length - 1].connect(this.analyser);
				this.analyser.connect(audioContext.destination);
				this.audioSource.start(0);
			},

			stop: function stop() {
				this.audioSource.stop(0);
			},

			init: function init() {
				if(this.initialized) return;
				this.filters = this.createFilters(FREQUENCIES);
				this.analyser = this.createAnalyser(2048);
				this.gain = audioContext.createGain();
				this.SUPPORTED_FORMATS = SUPPORTED_FORMATS;
				this.initialized = true;
			}
		};

	}, {}],
	2: [function(require, module, exports) {
		var $$ = require('../utils');

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
				for(var _len = arguments.length, elems = Array(_len), _key = 0; _key < _len; _key++) {
					elems[_key] = arguments[_key];
				}

				elems.forEach(function(item) {
					item.style.display = 'none';
				});
			},
			show: function show() {
				for(var _len2 = arguments.length, elems = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
					elems[_key2] = arguments[_key2];
				}

				elems.forEach(function(item) {
					item.style.display = '';
				});
			},
			closest: function closest(el, selector) {
				if(el.closest) return el.closest(selector);

				var parentNode = el;
				var matches;

				while((matches = parentNode && parentNode.matches) && !parentNode.matches(selector)) {
					parentNode = parentNode.parentNode;
				}
				return matches ? parentNode : null;
			}
		};

		module.exports = dom;

	}, {"../utils": 20}],
	3: [function(require, module, exports) {
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

		var dom = require('./api/dom');

		require('./api/audio').init();

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

	}, {
		"./api/audio": 1,
		"./api/dom": 2,
		"./audio_player/controllers/controls": 5,
		"./audio_player/controllers/drop_area": 6,
		"./audio_player/controllers/songs_list": 7,
		"./audio_player/states/player": 10,
		"./audio_player/views/controls": 12,
		"./audio_player/views/drop_area": 13,
		"./audio_player/views/equalizer": 14,
		"./audio_player/views/player": 15,
		"./audio_player/views/song_details": 16,
		"./audio_player/views/songs_list": 17,
		"./audio_player/views/visualizer": 18
	}],
	4: [function(require, module, exports) {
		"use strict";

		var _createClass = (function() {
			function defineProperties(target, props) {
				for(var i = 0; i < props.length; i++) {
					var descriptor = props[i];
					descriptor.enumerable = descriptor.enumerable || false;
					descriptor.configurable = true;
					if("value" in descriptor) descriptor.writable = true;
					Object.defineProperty(target, descriptor.key, descriptor);
				}
			}

			return function(Constructor, protoProps, staticProps) {
				if(protoProps) defineProperties(Constructor.prototype, protoProps);
				if(staticProps) defineProperties(Constructor, staticProps);
				return Constructor;
			};
		})();

		function _classCallCheck(instance, Constructor) {
			if(!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}

		var BaseController = (function() {
			function BaseController(options) {
				_classCallCheck(this, BaseController);

				this.model = options.model;
				this.view = options.view;
				this.bindListeners();
			}

			_createClass(BaseController, [{
				key: "bindListeners",
				value: function bindListeners() {
					throw "Not implemented";
				}
			}]);

			return BaseController;
		})();

		module.exports = BaseController;

	}, {}],
	5: [function(require, module, exports) {
		'use strict';

		var _createClass = (function() {
			function defineProperties(target, props) {
				for(var i = 0; i < props.length; i++) {
					var descriptor = props[i];
					descriptor.enumerable = descriptor.enumerable || false;
					descriptor.configurable = true;
					if('value' in descriptor) descriptor.writable = true;
					Object.defineProperty(target, descriptor.key, descriptor);
				}
			}

			return function(Constructor, protoProps, staticProps) {
				if(protoProps) defineProperties(Constructor.prototype, protoProps);
				if(staticProps) defineProperties(Constructor, staticProps);
				return Constructor;
			};
		})();

		var _get = function get(_x, _x2, _x3) {
			var _again = true;
			_function: while(_again) {
				var object = _x, property = _x2, receiver = _x3;
				desc = parent = getter = undefined;
				_again = false;
				if(object === null) object = Function.prototype;
				var desc = Object.getOwnPropertyDescriptor(object, property);
				if(desc === undefined) {
					var parent = Object.getPrototypeOf(object);
					if(parent === null) {
						return undefined;
					} else {
						_x = parent;
						_x2 = property;
						_x3 = receiver;
						_again = true;
						continue _function;
					}
				} else if('value' in desc) {
					return desc.value;
				} else {
					var getter = desc.get;
					if(getter === undefined) {
						return undefined;
					}
					return getter.call(receiver);
				}
			}
		};

		function _classCallCheck(instance, Constructor) {
			if(!(instance instanceof Constructor)) {
				throw new TypeError('Cannot call a class as a function');
			}
		}

		function _inherits(subClass, superClass) {
			if(typeof superClass !== 'function' && superClass !== null) {
				throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
			}
			subClass.prototype = Object.create(superClass && superClass.prototype, {
				constructor: {
					value: subClass,
					enumerable: false,
					writable: true,
					configurable: true
				}
			});
			if(superClass) subClass.__proto__ = superClass;
		}

		var $$ = require('../../utils');
		var Events = require('../../events');
		var dom = require('../../api/dom');
		var BaseController = require('./base');

		var ControlsController = (function(_BaseController) {
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
					switch(controlType) {
						case 'play':
							this.model.playingSong = this.model.selectedSong;
							break;
						case 'stop':
							this.model.playingSong = null;
							break;
					}
				}
			}]);

			return ControlsController;
		})(BaseController);

		module.exports = ControlsController;

	}, {"../../api/dom": 2, "../../events": 19, "../../utils": 20, "./base": 4}],
	6: [function(require, module, exports) {
		'use strict';

		var _createClass = (function() {
			function defineProperties(target, props) {
				for(var i = 0; i < props.length; i++) {
					var descriptor = props[i];
					descriptor.enumerable = descriptor.enumerable || false;
					descriptor.configurable = true;
					if('value' in descriptor) descriptor.writable = true;
					Object.defineProperty(target, descriptor.key, descriptor);
				}
			}

			return function(Constructor, protoProps, staticProps) {
				if(protoProps) defineProperties(Constructor.prototype, protoProps);
				if(staticProps) defineProperties(Constructor, staticProps);
				return Constructor;
			};
		})();

		var _get = function get(_x, _x2, _x3) {
			var _again = true;
			_function: while(_again) {
				var object = _x, property = _x2, receiver = _x3;
				desc = parent = getter = undefined;
				_again = false;
				if(object === null) object = Function.prototype;
				var desc = Object.getOwnPropertyDescriptor(object, property);
				if(desc === undefined) {
					var parent = Object.getPrototypeOf(object);
					if(parent === null) {
						return undefined;
					} else {
						_x = parent;
						_x2 = property;
						_x3 = receiver;
						_again = true;
						continue _function;
					}
				} else if('value' in desc) {
					return desc.value;
				} else {
					var getter = desc.get;
					if(getter === undefined) {
						return undefined;
					}
					return getter.call(receiver);
				}
			}
		};

		function _classCallCheck(instance, Constructor) {
			if(!(instance instanceof Constructor)) {
				throw new TypeError('Cannot call a class as a function');
			}
		}

		function _inherits(subClass, superClass) {
			if(typeof superClass !== 'function' && superClass !== null) {
				throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
			}
			subClass.prototype = Object.create(superClass && superClass.prototype, {
				constructor: {
					value: subClass,
					enumerable: false,
					writable: true,
					configurable: true
				}
			});
			if(superClass) subClass.__proto__ = superClass;
		}

		var $$ = require('../../utils');
		var Events = require('../../events');
		var dom = require('../../api/dom');
		var Audio = require('../../api/audio');
		var BaseController = require('./base');

		var PlayerController = (function(_BaseController) {
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

					this.filterAudioFiles(files).forEach(function(file) {
						Promise.all([Audio.getSongInfo(file, ['title', 'artist', 'picture']), Audio.decodeSong(file)]).then(function(values) {
							$$.assign(values[0], values[1], {fileName: file.name});
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

					Audio.SUPPORTED_FORMATS.forEach(function(format) {
						if(file.name.search(format.ext) !== -1) {
							support = true;
						}
					});

					return support;
				}
			}]);

			return PlayerController;
		})(BaseController);

		module.exports = PlayerController;

	}, {"../../api/audio": 1, "../../api/dom": 2, "../../events": 19, "../../utils": 20, "./base": 4}],
	7: [function(require, module, exports) {
		'use strict';

		var _createClass = (function() {
			function defineProperties(target, props) {
				for(var i = 0; i < props.length; i++) {
					var descriptor = props[i];
					descriptor.enumerable = descriptor.enumerable || false;
					descriptor.configurable = true;
					if('value' in descriptor) descriptor.writable = true;
					Object.defineProperty(target, descriptor.key, descriptor);
				}
			}

			return function(Constructor, protoProps, staticProps) {
				if(protoProps) defineProperties(Constructor.prototype, protoProps);
				if(staticProps) defineProperties(Constructor, staticProps);
				return Constructor;
			};
		})();

		var _get = function get(_x, _x2, _x3) {
			var _again = true;
			_function: while(_again) {
				var object = _x, property = _x2, receiver = _x3;
				desc = parent = getter = undefined;
				_again = false;
				if(object === null) object = Function.prototype;
				var desc = Object.getOwnPropertyDescriptor(object, property);
				if(desc === undefined) {
					var parent = Object.getPrototypeOf(object);
					if(parent === null) {
						return undefined;
					} else {
						_x = parent;
						_x2 = property;
						_x3 = receiver;
						_again = true;
						continue _function;
					}
				} else if('value' in desc) {
					return desc.value;
				} else {
					var getter = desc.get;
					if(getter === undefined) {
						return undefined;
					}
					return getter.call(receiver);
				}
			}
		};

		function _classCallCheck(instance, Constructor) {
			if(!(instance instanceof Constructor)) {
				throw new TypeError('Cannot call a class as a function');
			}
		}

		function _inherits(subClass, superClass) {
			if(typeof superClass !== 'function' && superClass !== null) {
				throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
			}
			subClass.prototype = Object.create(superClass && superClass.prototype, {
				constructor: {
					value: subClass,
					enumerable: false,
					writable: true,
					configurable: true
				}
			});
			if(superClass) subClass.__proto__ = superClass;
		}

		var $$ = require('../../utils');
		var Events = require('../../events');
		var dom = require('../../api/dom');
		var BaseController = require('./base');

		var SongsListController = (function(_BaseController) {
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

	}, {"../../api/dom": 2, "../../events": 19, "../../utils": 20, "./base": 4}],
	8: [function(require, module, exports) {
		function _classCallCheck(instance, Constructor) {
			if(!(instance instanceof Constructor)) {
				throw new TypeError('Cannot call a class as a function');
			}
		}

		var id = 1;

		var Song = function Song(data) {
			_classCallCheck(this, Song);

			this.id = id;
			this.audioBuffer = data.audioBuffer;
			this.fileName = data.fileName;
			this.title = data.title || this.fileName;
			this.artist = data.artist || '';
			this.duration = Math.round(data.duration);
			this.picture = data.picture || '';
			id++;
		};

		module.exports = Song;

	}, {}],
	9: [function(require, module, exports) {
		var _createClass = (function() {
			function defineProperties(target, props) {
				for(var i = 0; i < props.length; i++) {
					var descriptor = props[i];
					descriptor.enumerable = descriptor.enumerable || false;
					descriptor.configurable = true;
					if('value' in descriptor) descriptor.writable = true;
					Object.defineProperty(target, descriptor.key, descriptor);
				}
			}

			return function(Constructor, protoProps, staticProps) {
				if(protoProps) defineProperties(Constructor.prototype, protoProps);
				if(staticProps) defineProperties(Constructor, staticProps);
				return Constructor;
			};
		})();

		function _classCallCheck(instance, Constructor) {
			if(!(instance instanceof Constructor)) {
				throw new TypeError('Cannot call a class as a function');
			}
		}

		var Events = require('../../events');
		var $$ = require('../../utils');
		var Song = require('./song');

		var Songs = (function() {
			function Songs() {
				_classCallCheck(this, Songs);

				this.songs = [];
			}

			_createClass(Songs, [{
				key: 'getSong',
				value: function getSong(id) {
					for(var i = 0; i < this.songs.length; i++) {
						if(id === this.songs[i].id) {
							return this.songs[i];
						}
					}
				}
			}, {
				key: 'addSong',
				value: function addSong(data) {
					var song = new Song(data);
					this.songs.push(song);
					this.trigger('song:add', song);
				}
			}, {
				key: 'removeSong',
				value: function removeSong(id) {
					var song = this.getSong(id);
					if(song !== undefined) {
						this.songs.splice(song, 1);
						this.trigger('song:removed', song);
					}
				}
			}]);

			return Songs;
		})();

		$$.assign(Songs.prototype, Events);

		module.exports = Songs;

	}, {"../../events": 19, "../../utils": 20, "./song": 8}],
	10: [function(require, module, exports) {
		'use strict';

		var _createClass = (function() {
			function defineProperties(target, props) {
				for(var i = 0; i < props.length; i++) {
					var descriptor = props[i];
					descriptor.enumerable = descriptor.enumerable || false;
					descriptor.configurable = true;
					if('value' in descriptor) descriptor.writable = true;
					Object.defineProperty(target, descriptor.key, descriptor);
				}
			}

			return function(Constructor, protoProps, staticProps) {
				if(protoProps) defineProperties(Constructor.prototype, protoProps);
				if(staticProps) defineProperties(Constructor, staticProps);
				return Constructor;
			};
		})();

		function _classCallCheck(instance, Constructor) {
			if(!(instance instanceof Constructor)) {
				throw new TypeError('Cannot call a class as a function');
			}
		}

		var Events = require('../../events');
		var $$ = require('../../utils');
		var Songs = require('../models/songs');

		var PlayerState = (function() {
			function PlayerState() {
				_classCallCheck(this, PlayerState);

				this.songs = new Songs();
				this.selectedSong = null;
				this.playingSong = null;
				this.isVisualizing = false;
				this.haveSongs = false;
				this.equalizer = {};
				this.observeProperties();
				this.bindListeners();
			}

			_createClass(PlayerState, [{
				key: 'observeProperties',
				value: function observeProperties() {
					Object.keys(this).forEach(function(key) {
						this['_' + key] = this[key];

						Object.defineProperty(this, key, {
							get: function get() {
								return this['_' + key];
							},
							set: function set(value) {
								if(this['_' + key] === value) return;

								this['_' + key] = value;
								this.trigger(key + ':changed', value);
							}
						});
					}, this);
				}
			}, {
				key: 'bindListeners',
				value: function bindListeners() {
					this.songs.on('song:add', function(song) {
						this.trigger('song:add', song);
					}, this);

					this.songs.on('song:removed', function(song) {
						this.trigger('song:removed', song);
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

	}, {"../../events": 19, "../../utils": 20, "../models/songs": 9}],
	11: [function(require, module, exports) {
		'use strict';

		var _createClass = (function() {
			function defineProperties(target, props) {
				for(var i = 0; i < props.length; i++) {
					var descriptor = props[i];
					descriptor.enumerable = descriptor.enumerable || false;
					descriptor.configurable = true;
					if('value' in descriptor) descriptor.writable = true;
					Object.defineProperty(target, descriptor.key, descriptor);
				}
			}

			return function(Constructor, protoProps, staticProps) {
				if(protoProps) defineProperties(Constructor.prototype, protoProps);
				if(staticProps) defineProperties(Constructor, staticProps);
				return Constructor;
			};
		})();

		function _classCallCheck(instance, Constructor) {
			if(!(instance instanceof Constructor)) {
				throw new TypeError('Cannot call a class as a function');
			}
		}

		var $$ = require('../../utils');
		var Events = require('../../events');
		var dom = require('../../api/dom');

		var BaseView = (function() {
			function BaseView(options) {
				_classCallCheck(this, BaseView);

				this.el = options.el;
				this.model = options.model;
				this.subviews = options.subviews;
				if(options.template) {
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

	}, {"../../api/dom": 2, "../../events": 19, "../../utils": 20}],
	12: [function(require, module, exports) {
		'use strict';

		var _createClass = (function() {
			function defineProperties(target, props) {
				for(var i = 0; i < props.length; i++) {
					var descriptor = props[i];
					descriptor.enumerable = descriptor.enumerable || false;
					descriptor.configurable = true;
					if('value' in descriptor) descriptor.writable = true;
					Object.defineProperty(target, descriptor.key, descriptor);
				}
			}

			return function(Constructor, protoProps, staticProps) {
				if(protoProps) defineProperties(Constructor.prototype, protoProps);
				if(staticProps) defineProperties(Constructor, staticProps);
				return Constructor;
			};
		})();

		var _get = function get(_x, _x2, _x3) {
			var _again = true;
			_function: while(_again) {
				var object = _x, property = _x2, receiver = _x3;
				desc = parent = getter = undefined;
				_again = false;
				if(object === null) object = Function.prototype;
				var desc = Object.getOwnPropertyDescriptor(object, property);
				if(desc === undefined) {
					var parent = Object.getPrototypeOf(object);
					if(parent === null) {
						return undefined;
					} else {
						_x = parent;
						_x2 = property;
						_x3 = receiver;
						_again = true;
						continue _function;
					}
				} else if('value' in desc) {
					return desc.value;
				} else {
					var getter = desc.get;
					if(getter === undefined) {
						return undefined;
					}
					return getter.call(receiver);
				}
			}
		};

		function _classCallCheck(instance, Constructor) {
			if(!(instance instanceof Constructor)) {
				throw new TypeError('Cannot call a class as a function');
			}
		}

		function _inherits(subClass, superClass) {
			if(typeof superClass !== 'function' && superClass !== null) {
				throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
			}
			subClass.prototype = Object.create(superClass && superClass.prototype, {
				constructor: {
					value: subClass,
					enumerable: false,
					writable: true,
					configurable: true
				}
			});
			if(superClass) subClass.__proto__ = superClass;
		}

		var BaseView = require('./base');
		var dom = require('../../api/dom');

		var ControlsView = (function(_BaseView) {
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
					if(!song) {
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
					if(!this.isPlaying) {
						dom.removeClass(this.elems.play, 'icon_disabled');
					}
				}
			}, {
				key: 'onControlClick',
				value: function onControlClick(e) {
					var control = dom.closest(e.target, '.js-control');
					if(!control || dom.hasClass(control, 'icon_disabled')) return;
					var controlType = control.dataset.type;
					this.trigger('control:pressed', controlType);
				}
			}]);

			return ControlsView;
		})(BaseView);

		module.exports = ControlsView;

	}, {"../../api/dom": 2, "./base": 11}],
	13: [function(require, module, exports) {
		'use strict';

		var _createClass = (function() {
			function defineProperties(target, props) {
				for(var i = 0; i < props.length; i++) {
					var descriptor = props[i];
					descriptor.enumerable = descriptor.enumerable || false;
					descriptor.configurable = true;
					if('value' in descriptor) descriptor.writable = true;
					Object.defineProperty(target, descriptor.key, descriptor);
				}
			}

			return function(Constructor, protoProps, staticProps) {
				if(protoProps) defineProperties(Constructor.prototype, protoProps);
				if(staticProps) defineProperties(Constructor, staticProps);
				return Constructor;
			};
		})();

		var _get = function get(_x, _x2, _x3) {
			var _again = true;
			_function: while(_again) {
				var object = _x, property = _x2, receiver = _x3;
				desc = parent = getter = undefined;
				_again = false;
				if(object === null) object = Function.prototype;
				var desc = Object.getOwnPropertyDescriptor(object, property);
				if(desc === undefined) {
					var parent = Object.getPrototypeOf(object);
					if(parent === null) {
						return undefined;
					} else {
						_x = parent;
						_x2 = property;
						_x3 = receiver;
						_again = true;
						continue _function;
					}
				} else if('value' in desc) {
					return desc.value;
				} else {
					var getter = desc.get;
					if(getter === undefined) {
						return undefined;
					}
					return getter.call(receiver);
				}
			}
		};

		function _classCallCheck(instance, Constructor) {
			if(!(instance instanceof Constructor)) {
				throw new TypeError('Cannot call a class as a function');
			}
		}

		function _inherits(subClass, superClass) {
			if(typeof superClass !== 'function' && superClass !== null) {
				throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
			}
			subClass.prototype = Object.create(superClass && superClass.prototype, {
				constructor: {
					value: subClass,
					enumerable: false,
					writable: true,
					configurable: true
				}
			});
			if(superClass) subClass.__proto__ = superClass;
		}

		var dom = require('../../api/dom');
		var $$ = require('../../utils');
		var BaseView = require('./base');

		var DropAreaView = (function(_BaseView) {
			_inherits(DropAreaView, _BaseView);

			function DropAreaView(options) {
				_classCallCheck(this, DropAreaView);

				_get(Object.getPrototypeOf(DropAreaView.prototype), 'constructor', this).call(this, options);
				this.fileEntered = false;

				this.elems = {
					songsList: dom.qs('.js-songs-list', this.el),
					songDetails: dom.qs('.js-song-details', this.el),
					visualizer: dom.qs('.js-visualizer', this.el),
					dropHint: dom.qs('.js-drop-hint', this.el),
					equalizer: dom.qs('.js-equalizer', this.el)
				};
				this.bindListeners();
			}

			_createClass(DropAreaView, [{
				key: 'bindListeners',
				value: function bindListeners() {
					this.el.ondrop = this.onFileDrop.bind(this);
					this.el.ondragenter = this.onFileEnter.bind(this);
					this.el.ondragover = this.onFileDrag.bind(this);
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
					this.fileEntered = false;
					this.elems.dropHint.ondragleave = null;
					dom.hide(this.elems.dropHint);
					dom.show(this.elems.songDetails);
					dom.show(this.elems.songsList);
					dom.show(this.elems.visualizer);
				}
			}, {
				key: 'onFileLeave',
				value: function onFileLeave(e) {
					if(this.elems.dropHint.contains(e.target) && e.target !== this.elems.dropHint) return;
					this.fileEntered = false;
					this.elems.dropHint.ondragleave = null;
					dom.hide(this.elems.dropHint);

					dom.show(this.elems.visualizer);
					dom.show(this.elems.songDetails);
					dom.show(this.elems.songsList);
				}
			}, {
				key: 'onFileEnter',
				value: function onFileEnter(e) {
					e.preventDefault();
					if(this.fileEntered) return;

					dom.hide(this.elems.songsList);
					dom.hide(this.elems.songDetails);
					dom.hide(this.elems.visualizer);
					dom.hide(this.elems.equalizer);
					dom.show(this.elems.dropHint);

					this.fileEntered = true;
					this.elems.dropHint.ondragleave = this.onFileLeave.bind(this);
				}
			}]);

			return DropAreaView;
		})(BaseView);

		module.exports = DropAreaView;

	}, {"../../api/dom": 2, "../../utils": 20, "./base": 11}],
	14: [function(require, module, exports) {
		'use strict';

		var _createClass = (function() {
			function defineProperties(target, props) {
				for(var i = 0; i < props.length; i++) {
					var descriptor = props[i];
					descriptor.enumerable = descriptor.enumerable || false;
					descriptor.configurable = true;
					if('value' in descriptor) descriptor.writable = true;
					Object.defineProperty(target, descriptor.key, descriptor);
				}
			}

			return function(Constructor, protoProps, staticProps) {
				if(protoProps) defineProperties(Constructor.prototype, protoProps);
				if(staticProps) defineProperties(Constructor, staticProps);
				return Constructor;
			};
		})();

		var _get = function get(_x, _x2, _x3) {
			var _again = true;
			_function: while(_again) {
				var object = _x, property = _x2, receiver = _x3;
				desc = parent = getter = undefined;
				_again = false;
				if(object === null) object = Function.prototype;
				var desc = Object.getOwnPropertyDescriptor(object, property);
				if(desc === undefined) {
					var parent = Object.getPrototypeOf(object);
					if(parent === null) {
						return undefined;
					} else {
						_x = parent;
						_x2 = property;
						_x3 = receiver;
						_again = true;
						continue _function;
					}
				} else if('value' in desc) {
					return desc.value;
				} else {
					var getter = desc.get;
					if(getter === undefined) {
						return undefined;
					}
					return getter.call(receiver);
				}
			}
		};

		function _classCallCheck(instance, Constructor) {
			if(!(instance instanceof Constructor)) {
				throw new TypeError('Cannot call a class as a function');
			}
		}

		function _inherits(subClass, superClass) {
			if(typeof superClass !== 'function' && superClass !== null) {
				throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
			}
			subClass.prototype = Object.create(superClass && superClass.prototype, {
				constructor: {
					value: subClass,
					enumerable: false,
					writable: true,
					configurable: true
				}
			});
			if(superClass) subClass.__proto__ = superClass;
		}

		var dom = require('../../api/dom');
		var $$ = require('../../utils');
		var BaseView = require('./base');

		var EqualizerView = (function(_BaseView) {
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

					if(!dom.hasClass(e.target, 'js-thumb')) return;

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
					var y = e.clientY - this.sliderShift.shiftY - this.slidersCoords[this.activeSlider.dataset.type].top;
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
					if(y < 0) {
						y = 0;
					}
					var topEdge = this.activeSlider.offsetHeight - this.activeThumb.offsetHeight;
					if(y > topEdge) {
						y = topEdge;
					}
					return y;
				}
			}, {
				key: 'moveThumb',
				value: function moveThumb(y) {
					y = this.checkCoords(y);
					this.activeThumb.style.top = y + 'px';
					console.log(y);
				}
			}, {
				key: 'onDragStart',
				value: function onDragStart() {
					return false;
				}
			}, {
				key: 'recalcSlidersCoords',
				value: function recalcSlidersCoords() {
					Object.keys(this.sliders).forEach(function(key) {
						this.slidersCoords[key] = this.sliders[key].getBoundingClientRect();
					}, this);
				}
			}]);

			return EqualizerView;
		})(BaseView);

		module.exports = EqualizerView;

	}, {"../../api/dom": 2, "../../utils": 20, "./base": 11}],
	15: [function(require, module, exports) {
		'use strict';

		var _createClass = (function() {
			function defineProperties(target, props) {
				for(var i = 0; i < props.length; i++) {
					var descriptor = props[i];
					descriptor.enumerable = descriptor.enumerable || false;
					descriptor.configurable = true;
					if('value' in descriptor) descriptor.writable = true;
					Object.defineProperty(target, descriptor.key, descriptor);
				}
			}

			return function(Constructor, protoProps, staticProps) {
				if(protoProps) defineProperties(Constructor.prototype, protoProps);
				if(staticProps) defineProperties(Constructor, staticProps);
				return Constructor;
			};
		})();

		var _get = function get(_x, _x2, _x3) {
			var _again = true;
			_function: while(_again) {
				var object = _x, property = _x2, receiver = _x3;
				desc = parent = getter = undefined;
				_again = false;
				if(object === null) object = Function.prototype;
				var desc = Object.getOwnPropertyDescriptor(object, property);
				if(desc === undefined) {
					var parent = Object.getPrototypeOf(object);
					if(parent === null) {
						return undefined;
					} else {
						_x = parent;
						_x2 = property;
						_x3 = receiver;
						_again = true;
						continue _function;
					}
				} else if('value' in desc) {
					return desc.value;
				} else {
					var getter = desc.get;
					if(getter === undefined) {
						return undefined;
					}
					return getter.call(receiver);
				}
			}
		};

		function _classCallCheck(instance, Constructor) {
			if(!(instance instanceof Constructor)) {
				throw new TypeError('Cannot call a class as a function');
			}
		}

		function _inherits(subClass, superClass) {
			if(typeof superClass !== 'function' && superClass !== null) {
				throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
			}
			subClass.prototype = Object.create(superClass && superClass.prototype, {
				constructor: {
					value: subClass,
					enumerable: false,
					writable: true,
					configurable: true
				}
			});
			if(superClass) subClass.__proto__ = superClass;
		}

		var BaseView = require('./base');
		var Audio = require('../../api/audio');

		var PlayerView = (function(_BaseView) {
			_inherits(PlayerView, _BaseView);

			function PlayerView(options) {
				_classCallCheck(this, PlayerView);

				_get(Object.getPrototypeOf(PlayerView.prototype), 'constructor', this).call(this, options);
				this.bindListeners();
			}

			_createClass(PlayerView, [{
				key: 'bindListeners',
				value: function bindListeners() {
					this.model.on('playingSong:changed', this.onPlayingSongChanged, this);
				}
			}, {
				key: 'onPlayingSongChanged',
				value: function onPlayingSongChanged(song) {
					if(!song) {
						this.stopSong();
					} else {
						this.playSong(song);
					}
				}
			}, {
				key: 'playSong',
				value: function playSong(song) {
					Audio.play(song.audioBuffer);
				}
			}, {
				key: 'stopSong',
				value: function stopSong() {
					Audio.stop();
				}
			}]);

			return PlayerView;
		})(BaseView);

		module.exports = PlayerView;

	}, {"../../api/audio": 1, "./base": 11}],
	16: [function(require, module, exports) {
		var _createClass = (function() {
			function defineProperties(target, props) {
				for(var i = 0; i < props.length; i++) {
					var descriptor = props[i];
					descriptor.enumerable = descriptor.enumerable || false;
					descriptor.configurable = true;
					if('value' in descriptor) descriptor.writable = true;
					Object.defineProperty(target, descriptor.key, descriptor);
				}
			}

			return function(Constructor, protoProps, staticProps) {
				if(protoProps) defineProperties(Constructor.prototype, protoProps);
				if(staticProps) defineProperties(Constructor, staticProps);
				return Constructor;
			};
		})();

		var _get = function get(_x, _x2, _x3) {
			var _again = true;
			_function: while(_again) {
				var object = _x, property = _x2, receiver = _x3;
				desc = parent = getter = undefined;
				_again = false;
				if(object === null) object = Function.prototype;
				var desc = Object.getOwnPropertyDescriptor(object, property);
				if(desc === undefined) {
					var parent = Object.getPrototypeOf(object);
					if(parent === null) {
						return undefined;
					} else {
						_x = parent;
						_x2 = property;
						_x3 = receiver;
						_again = true;
						continue _function;
					}
				} else if('value' in desc) {
					return desc.value;
				} else {
					var getter = desc.get;
					if(getter === undefined) {
						return undefined;
					}
					return getter.call(receiver);
				}
			}
		};

		function _classCallCheck(instance, Constructor) {
			if(!(instance instanceof Constructor)) {
				throw new TypeError('Cannot call a class as a function');
			}
		}

		function _inherits(subClass, superClass) {
			if(typeof superClass !== 'function' && superClass !== null) {
				throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
			}
			subClass.prototype = Object.create(superClass && superClass.prototype, {
				constructor: {
					value: subClass,
					enumerable: false,
					writable: true,
					configurable: true
				}
			});
			if(superClass) subClass.__proto__ = superClass;
		}

		var BaseView = require('./base');
		var dom = require('../../api/dom');

		var SongDetailsView = (function(_BaseView) {
			_inherits(SongDetailsView, _BaseView);

			function SongDetailsView(options) {
				_classCallCheck(this, SongDetailsView);

				_get(Object.getPrototypeOf(SongDetailsView.prototype), 'constructor', this).call(this, options);
				this.elems = {
					cover: dom.qs('.js-cover', this.el),
					title: dom.qs('.js-title', this.el),
					artist: dom.qs('.js-artist', this.el)
				};
				this.bindListeners();
			}

			_createClass(SongDetailsView, [{
				key: 'bindListeners',
				value: function bindListeners() {
					this.model.on('selectedSong:changed', this.onSongChanged, this);
				}
			}, {
				key: 'onSongChanged',
				value: function onSongChanged(song) {
					if(song.picture) {
						this.elems.cover.src = song.picture;
						this.elems.title.textContent = song.title;
						this.elems.artist.textContent = song.artist;
					}
					if(!this.songSelected) {
						this.songSelected = true;
						dom.addClass(this.el, 'player__song-description_showed');
					}
				}
			}]);

			return SongDetailsView;
		})(BaseView);

		module.exports = SongDetailsView;

	}, {"../../api/dom": 2, "./base": 11}],
	17: [function(require, module, exports) {
		'use strict';

		var _createClass = (function() {
			function defineProperties(target, props) {
				for(var i = 0; i < props.length; i++) {
					var descriptor = props[i];
					descriptor.enumerable = descriptor.enumerable || false;
					descriptor.configurable = true;
					if('value' in descriptor) descriptor.writable = true;
					Object.defineProperty(target, descriptor.key, descriptor);
				}
			}

			return function(Constructor, protoProps, staticProps) {
				if(protoProps) defineProperties(Constructor.prototype, protoProps);
				if(staticProps) defineProperties(Constructor, staticProps);
				return Constructor;
			};
		})();

		var _get = function get(_x, _x2, _x3) {
			var _again = true;
			_function: while(_again) {
				var object = _x, property = _x2, receiver = _x3;
				desc = parent = getter = undefined;
				_again = false;
				if(object === null) object = Function.prototype;
				var desc = Object.getOwnPropertyDescriptor(object, property);
				if(desc === undefined) {
					var parent = Object.getPrototypeOf(object);
					if(parent === null) {
						return undefined;
					} else {
						_x = parent;
						_x2 = property;
						_x3 = receiver;
						_again = true;
						continue _function;
					}
				} else if('value' in desc) {
					return desc.value;
				} else {
					var getter = desc.get;
					if(getter === undefined) {
						return undefined;
					}
					return getter.call(receiver);
				}
			}
		};

		function _classCallCheck(instance, Constructor) {
			if(!(instance instanceof Constructor)) {
				throw new TypeError('Cannot call a class as a function');
			}
		}

		function _inherits(subClass, superClass) {
			if(typeof superClass !== 'function' && superClass !== null) {
				throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
			}
			subClass.prototype = Object.create(superClass && superClass.prototype, {
				constructor: {
					value: subClass,
					enumerable: false,
					writable: true,
					configurable: true
				}
			});
			if(superClass) subClass.__proto__ = superClass;
		}

		var $$ = require('../../utils');
		var Events = require('../../events');
		var dom = require('../../api/dom');
		var BaseView = require('./base');

		var SongsListView = (function(_BaseView) {
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

					if(!this.haveSongs) {
						this.elems.placeholder.remove();
					}
					this.haveSongs = true;
					this.el.appendChild(songEl);
				}
			}, {
				key: 'selectSong',
				value: function selectSong(songEl) {
					$$.toArray(songEl.parentNode.children).filter(function(el) {
						return el !== songEl;
					}).forEach(function(el) {
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

					title.textContent = song.title;
					artist.textContent = song.artist;

					duration.textContent = this.formatDuration(song.duration);
					songEl.dataset.id = song.id;
					if(song.picture) {
						cover.src = song.picture;
					}

					return songEl;
				}
			}, {
				key: 'formatDuration',
				value: function formatDuration(secs) {
					var minutes = Math.floor(secs / 60);
					var seconds = secs % 60;

					if(seconds.toString().length === 1) {
						seconds = '0' + seconds;
					}

					return minutes + ':' + seconds;
				}
			}]);

			return SongsListView;
		})(BaseView);

		module.exports = SongsListView;

	}, {"../../api/dom": 2, "../../events": 19, "../../utils": 20, "./base": 11}],
	18: [function(require, module, exports) {
		var _createClass = (function() {
			function defineProperties(target, props) {
				for(var i = 0; i < props.length; i++) {
					var descriptor = props[i];
					descriptor.enumerable = descriptor.enumerable || false;
					descriptor.configurable = true;
					if('value' in descriptor) descriptor.writable = true;
					Object.defineProperty(target, descriptor.key, descriptor);
				}
			}

			return function(Constructor, protoProps, staticProps) {
				if(protoProps) defineProperties(Constructor.prototype, protoProps);
				if(staticProps) defineProperties(Constructor, staticProps);
				return Constructor;
			};
		})();

		var _get = function get(_x, _x2, _x3) {
			var _again = true;
			_function: while(_again) {
				var object = _x, property = _x2, receiver = _x3;
				desc = parent = getter = undefined;
				_again = false;
				if(object === null) object = Function.prototype;
				var desc = Object.getOwnPropertyDescriptor(object, property);
				if(desc === undefined) {
					var parent = Object.getPrototypeOf(object);
					if(parent === null) {
						return undefined;
					} else {
						_x = parent;
						_x2 = property;
						_x3 = receiver;
						_again = true;
						continue _function;
					}
				} else if('value' in desc) {
					return desc.value;
				} else {
					var getter = desc.get;
					if(getter === undefined) {
						return undefined;
					}
					return getter.call(receiver);
				}
			}
		};

		function _classCallCheck(instance, Constructor) {
			if(!(instance instanceof Constructor)) {
				throw new TypeError('Cannot call a class as a function');
			}
		}

		function _inherits(subClass, superClass) {
			if(typeof superClass !== 'function' && superClass !== null) {
				throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
			}
			subClass.prototype = Object.create(superClass && superClass.prototype, {
				constructor: {
					value: subClass,
					enumerable: false,
					writable: true,
					configurable: true
				}
			});
			if(superClass) subClass.__proto__ = superClass;
		}

		var BaseView = require('./base');
		var dom = require('../../api/dom');
		var audio = require('../../api/audio');

		var VisualizerView = (function(_BaseView) {
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
					if(song) {
						this.draw();
					} else {
						this.stopDraw();
					}
				}
			}, {
				key: 'stopDraw',
				value: function stopDraw() {
					cancelAnimationFrame(this.frameId);
					this.clearCanvas();
				}
			}, {
				key: 'clearCanvas',
				value: function clearCanvas() {
					this.canvasCtx.fillStyle = 'white';
					this.canvasCtx.fillRect(0, 0, this.canvasW, this.canvasH);
				}
			}, {
				key: 'draw',
				value: function draw() {
					var x = 0;
					var v;
					var y;
					var sliceWidth;
					var bufferLength = audio.analyser.fftSize;
					var dataArray = new Uint8Array(bufferLength);

					this.frameId = requestAnimationFrame(this.draw.bind(this));
					audio.analyser.getByteTimeDomainData(dataArray);
					this.clearCanvas();
					this.canvasCtx.lineWidth = 2;
					this.canvasCtx.strokeStyle = '#6161EF';
					this.canvasCtx.beginPath();
					sliceWidth = this.canvasW * 1.0 / bufferLength;

					for(var i = 0; i < bufferLength; i++) {
						v = dataArray[i] / 128.0;
						y = v * this.canvasH / 2;

						if(i === 0) {
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

	}, {"../../api/audio": 1, "../../api/dom": 2, "./base": 11}],
	19: [function(require, module, exports) {
		function _defineProperty(obj, key, value) {
			if(key in obj) {
				Object.defineProperty(obj, key, {value: value, enumerable: true, configurable: true, writable: true});
			} else {
				obj[key] = value;
			}
			return obj;
		}

		var subscribers = new Map();

		var Events = {
			on: function on(type, callback, context) {
				var item;

				if(subscribers.has(this)) {
					item = subscribers.get(this);
					if(item[type]) {
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
				if(arguments.length === 0) {
					subscribers["delete"](this);
				}
				if(arguments.length === 1 && subscribers.has(this)) {
					item = subscribers.get(this);
					if(item[type]) {
						if(callback) {
							for(i = 0; i < item[type].length; i++) {
								if(item[type][i] === callback) {
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
				for(var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
					args[_key - 1] = arguments[_key];
				}

				var item;

				if(subscribers.has(this)) {
					item = subscribers.get(this);
					if(item[type]) {
						item[type].forEach(function(event) {
							var context = event.context || this;
							event.callback.apply(context, args);
						}, this);
					}
				}
			}
		};

		module.exports = Events;

	}, {}],
	20: [function(require, module, exports) {
		var $$ = {
			toArray: function toArray(object) {
				return [].slice.call(object);
			},
			assign: function assign(target) {
				if(target === undefined || target === null) {
					throw new TypeError('Cannot convert first argument to object');
				}

				for(var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
					rest[_key - 1] = arguments[_key];
				}

				rest.forEach(function(obj) {
					if(obj === undefined || obj === null) {
						return;
					}
					Object.keys(obj).forEach(function(key) {
						target[key] = obj[key];
					});
				});
			}
		};

		module.exports = $$;

	}, {}]
}, {}, [3])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL3Rlc3QvZXgzL3NyYy9qcy9hcGkvYXVkaW8uanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL3Rlc3QvZXgzL3NyYy9qcy9hcGkvZG9tLmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy90ZXN0L2V4My9zcmMvanMvYXBwLmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy90ZXN0L2V4My9zcmMvanMvYXVkaW9fcGxheWVyL2NvbnRyb2xsZXJzL2Jhc2UuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL3Rlc3QvZXgzL3NyYy9qcy9hdWRpb19wbGF5ZXIvY29udHJvbGxlcnMvY29udHJvbHMuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL3Rlc3QvZXgzL3NyYy9qcy9hdWRpb19wbGF5ZXIvY29udHJvbGxlcnMvZHJvcF9hcmVhLmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy90ZXN0L2V4My9zcmMvanMvYXVkaW9fcGxheWVyL2NvbnRyb2xsZXJzL3NvbmdzX2xpc3QuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL3Rlc3QvZXgzL3NyYy9qcy9hdWRpb19wbGF5ZXIvbW9kZWxzL3NvbmcuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL3Rlc3QvZXgzL3NyYy9qcy9hdWRpb19wbGF5ZXIvbW9kZWxzL3NvbmdzLmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy90ZXN0L2V4My9zcmMvanMvYXVkaW9fcGxheWVyL3N0YXRlcy9wbGF5ZXIuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL3Rlc3QvZXgzL3NyYy9qcy9hdWRpb19wbGF5ZXIvdmlld3MvYmFzZS5qcyIsIi9ob21lL2FuZHJleS9Eb2N1bWVudHMvUHJvamVjdHMvdGVzdC9leDMvc3JjL2pzL2F1ZGlvX3BsYXllci92aWV3cy9jb250cm9scy5qcyIsIi9ob21lL2FuZHJleS9Eb2N1bWVudHMvUHJvamVjdHMvdGVzdC9leDMvc3JjL2pzL2F1ZGlvX3BsYXllci92aWV3cy9kcm9wX2FyZWEuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL3Rlc3QvZXgzL3NyYy9qcy9hdWRpb19wbGF5ZXIvdmlld3MvZXF1YWxpemVyLmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy90ZXN0L2V4My9zcmMvanMvYXVkaW9fcGxheWVyL3ZpZXdzL3BsYXllci5qcyIsIi9ob21lL2FuZHJleS9Eb2N1bWVudHMvUHJvamVjdHMvdGVzdC9leDMvc3JjL2pzL2F1ZGlvX3BsYXllci92aWV3cy9zb25nX2RldGFpbHMuanMiLCIvaG9tZS9hbmRyZXkvRG9jdW1lbnRzL1Byb2plY3RzL3Rlc3QvZXgzL3NyYy9qcy9hdWRpb19wbGF5ZXIvdmlld3Mvc29uZ3NfbGlzdC5qcyIsIi9ob21lL2FuZHJleS9Eb2N1bWVudHMvUHJvamVjdHMvdGVzdC9leDMvc3JjL2pzL2F1ZGlvX3BsYXllci92aWV3cy92aXN1YWxpemVyLmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy90ZXN0L2V4My9zcmMvanMvZXZlbnRzLmpzIiwiL2hvbWUvYW5kcmV5L0RvY3VtZW50cy9Qcm9qZWN0cy90ZXN0L2V4My9zcmMvanMvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7O0FBRWIsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM5QyxJQUFJLFlBQVksR0FBRyxNQUFNLENBQUMsWUFBWSxJQUFJLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQztBQUNwRSxJQUFJLFlB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SSxNQUFNLEtBQUssSUFBSSxFQUFFO0FBQzNDLFNBQU0sSUFBSSxTQUFTLENBQUMseUNBQXlDLENBQUMsQ0FBQztHQUMvRDs7b0NBSDBCLElBQUk7QUFBSixPQUFJOzs7QUFJL0IsTUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUcsRUFBSTtBQUNuQixPQUFHLEdBQUcsS0FBSyxTQUFTLElBQUksR0FBRyxLQUFLLElBQUksRUFBRTtBQUNyQyxXQUFPO0lBQ1A7QUFDRCxTQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUcsRUFBSTtBQUMvQixVQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZCLENBQUMsQ0FBQztHQUNILENBQUMsQ0FBQztFQUNIO0NBQ0QsQ0FBQzs7QUFFRixNQUFNLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGF1ZGlvRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhdWRpbycpO1xudmFyIEF1ZGlvQ29udGV4dCA9IHdpbmRvdy5BdWRpb0NvbnRleHQgfHwgd2luZG93LndlYmtpdEF1ZGlvQ29udGV4dDtcbnZhciBhdWRpb0NvbnRleHQgPSBuZXcgQXVkaW9Db250ZXh0KCk7XG52YXIgRlJFUVVFTkNJRVMgPSBbNjAsIDE3MCwgMzEwLCA2MDAsIDEwMDAsIDMwMDAsIDYwMDAsIDEyMDAwLCAxNDAwMCwgMTYwMDBdO1xudmFyIEFVRElPX0ZPUk1BVFMgPSBbXG5cdHtcblx0XHR0eXBlOiAnYXVkaW8vbXBlZycsXG5cdFx0ZXh0OiAnbXAzJ1xuXHR9LFxuXHR7XG5cdFx0dHlwZTogJ2F1ZGlvL29nZzsgY29kZWNzPVwidm9yYmlzXCInLFxuXHRcdGV4dDogJ29nZydcblx0fSxcblx0e1xuXHRcdHR5cGU6ICdhdWRpby93YXY7IGNvZGVjcz1cIjFcIicsXG5cdFx0ZXh0OiAnd2F2J1xuXHR9LFxuXHR7XG5cdFx0dHlwZTogJ2F1ZGlvL21wNDsgY29kZWNzPVwibXA0YS40MC4yXCInLFxuXHRcdGV4dDogJ2FhYydcblx0fSxcblx0e1xuXHRcdHR5cGU6ICdhdWRpby93ZWJtJyxcblx0XHRleHQ6ICd3ZWJhJ1xuXHR9LFxuXHR7XG5cdFx0dHlwZTogJ2F1ZGlvL2ZsYWMnLFxuXHRcdGV4dDogJ2ZsYWMnXG5cdH1cbl07XG5cbnZhciBTVVBQT1JURURfRk9STUFUUyA9IEFVRElPX0ZPUk1BVFMuZmlsdGVyKGZvcm1hdCA9PiB7XG5cdHJldHVybiBhdWRpb0VsLmNhblBsYXlUeXBlKGZvcm1hdC50eXBlKSAhPT0gJyc7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cblx0Z2V0U29uZ0luZm8oZmlsZSwgdGFncykge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdHZhciB1cmwgPSBmaWxlLnVybiB8fCBmaWxlLm5hbWU7XG5cblx0XHRcdElEMy5sb2FkVGFncyh1cmwsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHZhciBhbGxUYWdzID0gSUQzLmdldEFsbFRhZ3ModXJsKTtcblx0XHRcdFx0XHR2YXIgcGljdHVyZTtcblx0XHRcdFx0XHR2YXIgcmVzdWx0ID0ge307XG5cdFx0XHRcdFx0dmFyIGRhdGFVcmw7XG5cdFx0XHRcdFx0dmFyIGJhc2U2NFN0cmluZztcblxuXHRcdFx0XHRcdHRhZ3MuZm9yRWFjaChmdW5jdGlvbih0YWcpIHtcblx0XHRcdFx0XHRcdGlmICh0YWcgPT09ICdwaWN0dXJlJyAmJiBhbGxUYWdzLnBpY3R1cmUpIHtcblx0XHRcdFx0XHRcdFx0cGljdHVyZSA9IGFsbFRhZ3MucGljdHVyZTtcblx0XHRcdFx0XHRcdFx0YmFzZTY0U3RyaW5nID0gXCJcIjtcblxuXHRcdFx0XHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgcGljdHVyZS5kYXRhLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0YmFzZTY0U3RyaW5nICs9IFN0cmluZy5mcm9tQ2hhckNvZGUocGljdHVyZS5kYXRhW2ldKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRkYXRhVXJsID0gXCJkYXRhOlwiICsgcGljdHVyZS5mb3JtYXQgKyBcIjtiYXNlNjQsXCIgKyB3aW5kb3cuYnRvYShiYXNlNjRTdHJpbmcpO1xuXHRcdFx0XHRcdFx0XHRyZXN1bHQucGljdHVyZSA9IGRhdGFVcmw7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdFx0cmVzdWx0W3RhZ10gPSBhbGxUYWdzW3RhZ107XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRyZXNvbHZlKHJlc3VsdCk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0YWdzOiB0YWdzLFxuXHRcdFx0XHRcdGRhdGFSZWFkZXI6IEZpbGVBUElSZWFkZXIoZmlsZSksXG5cdFx0XHRcdFx0b25FcnJvcjogZnVuY3Rpb24ocmVhc29uKSB7XG5cdFx0XHRcdFx0XHRyZWplY3QocmVhc29uKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9LFxuXG5cdGRlY29kZVNvbmcoZmlsZSkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXG5cdFx0XHRyZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoZmlsZSk7XG5cdFx0XHRyZWFkZXIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBidWZmZXIgPSB0aGlzLnJlc3VsdDtcblxuXHRcdFx0XHRhdWRpb0NvbnRleHQuZGVjb2RlQXVkaW9EYXRhKGJ1ZmZlciwgYXVkaW9CdWZmZXIgPT4ge1xuXHRcdFx0XHRcdHJlc29sdmUoe1xuXHRcdFx0XHRcdFx0YXVkaW9CdWZmZXI6IGF1ZGlvQnVmZmVyLFxuXHRcdFx0XHRcdFx0c2FtcGxlUmF0ZTogYXVkaW9CdWZmZXIuc2FtcGxlUmF0ZSxcblx0XHRcdFx0XHRcdGR1cmF0aW9uOiBhdWRpb0J1ZmZlci5kdXJhdGlvblxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdH07XG5cblx0XHRcdHJlYWRlci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJlamVjdChyZWFkZXIuZXJyb3IpO1xuXHRcdFx0fTtcblx0XHR9KTtcblx0fSxcblxuXHRjcmVhdGVGaWx0ZXJzKGZyZXF1ZW5jaWVzKSB7XG5cdFx0dmFyIGZpbHRlcnMgPSBmcmVxdWVuY2llcy5tYXAodGhpcy5jcmVhdGVGaWx0ZXIpO1xuXG5cdFx0ZmlsdGVycy5yZWR1Y2UoZnVuY3Rpb24ocHJldiwgY3Vycikge1xuXHRcdFx0cHJldi5jb25uZWN0KGN1cnIpO1xuXHRcdFx0cmV0dXJuIGN1cnI7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gZmlsdGVycztcblx0fSxcblxuXHRjcmVhdGVGaWx0ZXIoZnJlcXVlbmN5KSB7XG5cdFx0dmFyIGZpbHRlciA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCaXF1YWRGaWx0ZXIoKTtcblxuXHRcdGZpbHRlci50eXBlID0gJ3BlYWtpbmcnO1xuXHRcdGZpbHRlci5mcmVxdWVuY3kudmFsdWUgPSBmcmVxdWVuY3k7XG5cdFx0ZmlsdGVyLlEudmFsdWUgPSAxO1xuXHRcdGZpbHRlci5nYWluLnZhbHVlID0gMDtcblxuXHRcdHJldHVybiBmaWx0ZXI7XG5cdH0sXG5cblx0Y3JlYXRlQW5hbHlzZXIoZmZ0U2l6ZSkge1xuXHRcdHZhciBhbmFseXNlciA9IGF1ZGlvQ29udGV4dC5jcmVhdGVBbmFseXNlcigpO1xuXG5cdFx0YW5hbHlzZXIuZmZ0U2l6ZSA9IGZmdFNpemU7XG5cdFx0cmV0dXJuIGFuYWx5c2VyO1xuXHR9LFxuXG5cdHBsYXkoYXVkaW9CdWZmZXIpIHtcblx0XHR0aGlzLmF1ZGlvU291cmNlID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xuXHRcdHRoaXMuYXVkaW9Tb3VyY2UuYnVmZmVyID0gYXVkaW9CdWZmZXI7XG5cdFx0dGhpcy5hdWRpb1NvdXJjZS5jb25uZWN0KHRoaXMuZ2Fpbik7XG5cblx0XHR0aGlzLmdhaW4uY29ubmVjdCh0aGlzLmZpbHRlcnNbMF0pO1xuXHRcdHRoaXMuZmlsdGVyc1t0aGlzLmZpbHRlcnMubGVuZ3RoIC0gMV0uY29ubmVjdCh0aGlzLmFuYWx5c2VyKTtcblx0XHR0aGlzLmFuYWx5c2VyLmNvbm5lY3QoYXVkaW9Db250ZXh0LmRlc3RpbmF0aW9uKTtcblx0XHR0aGlzLmF1ZGlvU291cmNlLnN0YXJ0KDApO1xuXHR9LFxuXG5cdHN0b3AoKSB7XG5cdFx0dGhpcy5hdWRpb1NvdXJjZS5zdG9wKDApO1xuXHR9LFxuXG5cdGluaXQoKSB7XG5cdFx0aWYgKHRoaXMuaW5pdGlhbGl6ZWQpIHJldHVybjtcblx0XHR0aGlzLmZpbHRlcnMgPSBcdHRoaXMuY3JlYXRlRmlsdGVycyhGUkVRVUVOQ0lFUyk7XG5cdFx0dGhpcy5hbmFseXNlciA9IHRoaXMuY3JlYXRlQW5hbHlzZXIoMjA0OCk7XG5cdFx0dGhpcy5nYWluID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKTtcblx0XHR0aGlzLlNVUFBPUlRFRF9GT1JNQVRTID0gU1VQUE9SVEVEX0ZPUk1BVFM7XG5cdFx0dGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG5cdH1cbn07IiwidmFyICQkID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcclxuXHJcbnZhciBkb20gPSB7XHJcblx0YnlJZDogZnVuY3Rpb24oaWQpIHtcclxuXHRcdHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XHJcblx0fSxcclxuXHRxczogZnVuY3Rpb24oc2VsZWN0b3IsIGNvbnRleHQpIHtcclxuXHRcdGNvbnRleHQgPSBjb250ZXh0IHx8IGRvY3VtZW50O1xyXG5cdFx0cmV0dXJuIGNvbnRleHQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XHJcblx0fSxcclxuXHRxc2E6IGZ1bmN0aW9uKHNlbGVjdG9yLCBjb250ZXh0KSB7XHJcblx0XHRjb250ZXh0ID0gY29udGV4dCB8fCBkb2N1bWVudDtcclxuXHRcdHJldHVybiAkJC50b0FycmF5KGNvbnRleHQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xyXG5cdH0sXHJcblx0YWRkQ2xhc3M6IGZ1bmN0aW9uKGVsLCBjbGFzc05hbWUpIHtcclxuXHRcdGVsLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcclxuXHR9LFxyXG5cdHJlbW92ZUNsYXNzOiBmdW5jdGlvbihlbCwgY2xhc3NOYW1lKSB7XHJcblx0XHRlbC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XHJcblx0fSxcclxuXHRoYXNDbGFzczogZnVuY3Rpb24oZWwsIGNsYXNzTmFtZSkge1xyXG5cdFx0cmV0dXJuIGVsLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpO1xyXG5cdH0sXHJcblx0aGlkZTogZnVuY3Rpb24oLi4uZWxlbXMpIHtcclxuXHRcdGVsZW1zLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xyXG5cdFx0XHRpdGVtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cdHNob3c6IGZ1bmN0aW9uKC4uLmVsZW1zKSB7XHJcblx0XHRlbGVtcy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcclxuXHRcdFx0aXRlbS5zdHlsZS5kaXNwbGF5ID0gJyc7XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cdGNsb3Nlc3Q6IGZ1bmN0aW9uKGVsLCBzZWxlY3Rvcikge1xyXG5cdFx0aWYoZWwuY2xvc2VzdCkgcmV0dXJuIGVsLmNsb3Nlc3Qoc2VsZWN0b3IpO1xyXG5cclxuXHRcdHZhciBwYXJlbnROb2RlID0gZWw7XHJcblx0XHR2YXIgbWF0Y2hlcztcclxuXHJcblx0XHR3aGlsZSgobWF0Y2hlcyA9IHBhcmVudE5vZGUgJiYgcGFyZW50Tm9kZS5tYXRjaGVzKSAmJiAhcGFyZW50Tm9kZS5tYXRjaGVzKHNlbGVjdG9yKSkge1xyXG5cdFx0XHRwYXJlbnROb2RlID0gcGFyZW50Tm9kZS5wYXJlbnROb2RlO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIG1hdGNoZXMgPyBwYXJlbnROb2RlIDogbnVsbDtcclxuXHR9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGRvbTsiLCJ2YXIgUGxheWVyVmlldyA9IHJlcXVpcmUoJy4vYXVkaW9fcGxheWVyL3ZpZXdzL3BsYXllcicpO1xyXG52YXIgUGxheWVyU3RhdGUgPSByZXF1aXJlKCcuL2F1ZGlvX3BsYXllci9zdGF0ZXMvcGxheWVyJyk7XHJcblxyXG52YXIgRHJvcEFyZWFWaWV3ID0gcmVxdWlyZSgnLi9hdWRpb19wbGF5ZXIvdmlld3MvZHJvcF9hcmVhJyk7XHJcbnZhciBEcm9wQXJlYUNvbnRyb2xsZXIgPSByZXF1aXJlKCcuL2F1ZGlvX3BsYXllci9jb250cm9sbGVycy9kcm9wX2FyZWEnKTtcclxuXHJcbnZhciBTb25nc0xpc3RWaWV3ID0gcmVxdWlyZSgnLi9hdWRpb19wbGF5ZXIvdmlld3Mvc29uZ3NfbGlzdCcpO1xyXG52YXIgU29uZ3NMaXN0Q29udHJvbGxlciA9IHJlcXVpcmUoJy4vYXVkaW9fcGxheWVyL2NvbnRyb2xsZXJzL3NvbmdzX2xpc3QnKTtcclxuXHJcbnZhciBTb25nRGV0YWlsc1ZpZXcgPSByZXF1aXJlKCcuL2F1ZGlvX3BsYXllci92aWV3cy9zb25nX2RldGFpbHMnKTtcclxuXHJcbnZhciBDb250cm9sc1ZpZXcgPSByZXF1aXJlKCcuL2F1ZGlvX3BsYXllci92aWV3cy9jb250cm9scycpO1xyXG52YXIgQ29udHJvbHNDb250cm9sbGVyID0gcmVxdWlyZSgnLi9hdWRpb19wbGF5ZXIvY29udHJvbGxlcnMvY29udHJvbHMnKTtcclxuXHJcbnZhciBWaXN1YWxpemVyVmlldyA9IHJlcXVpcmUoJy4vYXVkaW9fcGxheWVyL3ZpZXdzL3Zpc3VhbGl6ZXInKTtcclxuXHJcbnZhciBFcXVhbGl6ZXJWaWV3ID0gcmVxdWlyZSgnLi9hdWRpb19wbGF5ZXIvdmlld3MvZXF1YWxpemVyJyk7XHJcblxyXG52YXIgZG9tID0gcmVxdWlyZSgnLi9hcGkvZG9tJyk7XHJcblxyXG5yZXF1aXJlKCcuL2FwaS9hdWRpbycpLmluaXQoKTtcclxuXHJcbi8vIFBsYXllciBTdGF0ZVxyXG52YXIgcGxheWVyU3RhdGUgPSBuZXcgUGxheWVyU3RhdGUoKTtcclxuXHJcbi8vIE1haW5cclxudmFyIHBsYXllclZpZXcgPSBuZXcgUGxheWVyVmlldyh7XHJcblx0ZWw6IGRvbS5ieUlkKCdhdWRpb1BsYXllcicpLFxyXG5cdG1vZGVsOiBwbGF5ZXJTdGF0ZVxyXG59KTtcclxuXHJcbi8vIERyb3AgYXJlYVxyXG52YXIgZHJvcEFyZWFWaWV3ID0gbmV3IERyb3BBcmVhVmlldyh7XHJcblx0ZWw6IGRvbS5xcygnLmpzLWRyb3AtYXJlYScsIHBsYXllclZpZXcuZWwpLFxyXG5cdG1vZGVsOiBwbGF5ZXJTdGF0ZVxyXG59KTtcclxuXHJcbnZhciBkcm9wQXJlYUNvbnRyb2xsZXIgPSBuZXcgRHJvcEFyZWFDb250cm9sbGVyKHtcclxuXHR2aWV3OiBkcm9wQXJlYVZpZXcsXHJcblx0bW9kZWw6IHBsYXllclN0YXRlXHJcbn0pO1xyXG5cclxuLy8gU29uZ3MgTGlzdFxyXG52YXIgc29uZ3NMaXN0VmlldyA9IG5ldyBTb25nc0xpc3RWaWV3KHtcclxuXHRlbDogZG9tLnFzKCcuanMtc29uZ3MtbGlzdCcsIHBsYXllclZpZXcuZWwpLFxyXG5cdHRlbXBsYXRlOiBkb20uYnlJZCgnc29uZ0xpc3RJdGVtJyksXHJcblx0bW9kZWw6IHBsYXllclN0YXRlXHJcbn0pO1xyXG5cclxudmFyIHNvbmdzTGlzdENvbnRyb2xsZXIgPSBuZXcgU29uZ3NMaXN0Q29udHJvbGxlcih7XHJcblx0bW9kZWw6IHBsYXllclN0YXRlLFxyXG5cdHZpZXc6IHNvbmdzTGlzdFZpZXdcclxufSk7XHJcblxyXG4vLyBEZXRhaWxzXHJcbnZhciBzb25nRGV0YWlsc1ZpZXcgPSBuZXcgU29uZ0RldGFpbHNWaWV3KHtcclxuXHRlbDogZG9tLnFzKCcuanMtc29uZy1kZXRhaWxzJywgcGxheWVyVmlldy5lbCksXHJcblx0bW9kZWw6IHBsYXllclN0YXRlXHJcbn0pO1xyXG5cclxuXHJcbi8vIENvbnRyb2xzXHJcbnZhciBjb250cm9sc1ZpZXcgPSBuZXcgQ29udHJvbHNWaWV3KHtcclxuXHRlbDogZG9tLnFzKCcuanMtY29udHJvbHMnLCBwbGF5ZXJWaWV3LmVsKSxcclxuXHRtb2RlbDogcGxheWVyU3RhdGVcclxufSk7XHJcblxyXG52YXIgY29udHJvbHNDb250cm9sbGVyID0gbmV3IENvbnRyb2xzQ29udHJvbGxlcih7XHJcblx0bW9kZWw6IHBsYXllclN0YXRlLFxyXG5cdHZpZXc6IGNvbnRyb2xzVmlld1xyXG59KTtcclxuXHJcbi8vIEVxdWFsaXplclxyXG5cclxudmFyIGVxdWFsaXplclZpZXcgPSBuZXcgRXF1YWxpemVyVmlldyh7XHJcblx0ZWw6IGRvbS5xcygnLmpzLWVxdWFsaXplcicsIHBsYXllclZpZXcuZWwpLFxyXG5cdG1vZGVsOiBwbGF5ZXJTdGF0ZVxyXG59KTtcclxuXHJcbi8vIFZpc3VhbGl6ZXJcclxuXHJcbnZhciB2aXN1YWxpemVyVmlldyA9IG5ldyBWaXN1YWxpemVyVmlldyh7XHJcblx0ZWw6IGRvbS5xcygnLmpzLXZpc3VhbGl6ZXInLCBwbGF5ZXJWaWV3LmVsKSxcclxuXHRtb2RlbDogcGxheWVyU3RhdGVcclxufSk7XHJcblxyXG5cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNsYXNzIEJhc2VDb250cm9sbGVyIHtcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xuXHRcdHRoaXMubW9kZWwgPSBvcHRpb25zLm1vZGVsO1xuXHRcdHRoaXMudmlldyA9IG9wdGlvbnMudmlldztcblx0XHR0aGlzLmJpbmRMaXN0ZW5lcnMoKTtcblx0fVxuXG5cdGJpbmRMaXN0ZW5lcnMoKSB7XG5cdFx0dGhyb3cgJ05vdCBpbXBsZW1lbnRlZCc7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBCYXNlQ29udHJvbGxlcjsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyICQkID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMnKTtcbnZhciBFdmVudHMgPSByZXF1aXJlKCcuLi8uLi9ldmVudHMnKTtcbnZhciBkb20gPSByZXF1aXJlKCcuLi8uLi9hcGkvZG9tJyk7XG52YXIgQmFzZUNvbnRyb2xsZXIgPSByZXF1aXJlKCcuL2Jhc2UnKTtcblxuY2xhc3MgQ29udHJvbHNDb250cm9sbGVyIGV4dGVuZHMgQmFzZUNvbnRyb2xsZXIge1xuXHRiaW5kTGlzdGVuZXJzKCkge1xuXHRcdHRoaXMudmlldy5vbignY29udHJvbDpwcmVzc2VkJywgdGhpcy5vbkNvbnRyb2xQcmVzc2VkLCB0aGlzKTtcblx0fVxuXG5cdG9uQ29udHJvbFByZXNzZWQoY29udHJvbFR5cGUpIHtcblx0XHRzd2l0Y2goY29udHJvbFR5cGUpIHtcblx0XHRcdGNhc2UgJ3BsYXknOlxuXHRcdFx0XHR0aGlzLm1vZGVsLnBsYXlpbmdTb25nID0gdGhpcy5tb2RlbC5zZWxlY3RlZFNvbmc7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnc3RvcCc6XG5cdFx0XHRcdHRoaXMubW9kZWwucGxheWluZ1NvbmcgPSBudWxsO1xuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDb250cm9sc0NvbnRyb2xsZXI7IiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIgJCQgPSByZXF1aXJlKCcuLi8uLi91dGlscycpO1xyXG52YXIgRXZlbnRzID0gcmVxdWlyZSgnLi4vLi4vZXZlbnRzJyk7XHJcbnZhciBkb20gPSByZXF1aXJlKCcuLi8uLi9hcGkvZG9tJyk7XHJcbnZhciBBdWRpbyA9IHJlcXVpcmUoJy4uLy4uL2FwaS9hdWRpbycpO1xyXG52YXIgQmFzZUNvbnRyb2xsZXIgPSByZXF1aXJlKCcuL2Jhc2UnKTtcclxuXHJcbmNsYXNzIFBsYXllckNvbnRyb2xsZXIgZXh0ZW5kcyBCYXNlQ29udHJvbGxlciB7XHJcblxyXG5cdGJpbmRMaXN0ZW5lcnMoKSB7XHJcblx0XHR0aGlzLnZpZXcub24oJ2ZpbGVzOmFkZCcsIHRoaXMub25GaWxlc0FkZCwgdGhpcyk7XHJcblx0fVxyXG5cclxuXHRvbkZpbGVzQWRkKGZpbGVzKSB7XHJcblx0XHR2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG5cdFx0dGhpcy5maWx0ZXJBdWRpb0ZpbGVzKGZpbGVzKS5mb3JFYWNoKGZ1bmN0aW9uKGZpbGUpIHtcclxuXHRcdFx0UHJvbWlzZS5hbGwoW0F1ZGlvLmdldFNvbmdJbmZvKGZpbGUsIFtcInRpdGxlXCIsIFwiYXJ0aXN0XCIsIFwicGljdHVyZVwiXSksIEF1ZGlvLmRlY29kZVNvbmcoZmlsZSldKVxyXG5cdFx0XHRcdC50aGVuKGZ1bmN0aW9uKHZhbHVlcykge1xyXG5cdFx0XHRcdFx0JCQuYXNzaWduKHZhbHVlc1swXSwgdmFsdWVzWzFdLCB7ZmlsZU5hbWU6IGZpbGUubmFtZX0pO1xyXG5cdFx0XHRcdFx0c2VsZi5tb2RlbC5hZGRTb25nKHZhbHVlc1swXSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHR9LCB0aGlzKTtcclxuXHR9XHJcblxyXG5cdGZpbHRlckF1ZGlvRmlsZXMoZmlsZXMpIHtcclxuXHRcdHJldHVybiBmaWxlcy5maWx0ZXIodGhpcy5pc0F1ZGlvRmlsZSwgdGhpcyk7XHJcblx0fVxyXG5cclxuXHRpc0F1ZGlvRmlsZShmaWxlKSB7XHJcblx0XHR2YXIgc3VwcG9ydCA9IGZhbHNlO1xyXG5cclxuXHRcdEF1ZGlvLlNVUFBPUlRFRF9GT1JNQVRTLmZvckVhY2goZm9ybWF0ID0+IHtcclxuXHRcdFx0aWYoZmlsZS5uYW1lLnNlYXJjaChmb3JtYXQuZXh0KSAhPT0gLTEpIHtcclxuXHRcdFx0XHRzdXBwb3J0ID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIHN1cHBvcnQ7XHJcblx0fVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXllckNvbnRyb2xsZXI7XHJcblxyXG5cclxuXHJcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgJCQgPSByZXF1aXJlKCcuLi8uLi91dGlscycpO1xudmFyIEV2ZW50cyA9IHJlcXVpcmUoJy4uLy4uL2V2ZW50cycpO1xudmFyIGRvbSA9IHJlcXVpcmUoJy4uLy4uL2FwaS9kb20nKTtcbnZhciBCYXNlQ29udHJvbGxlciA9IHJlcXVpcmUoJy4vYmFzZScpO1xuXG5jbGFzcyBTb25nc0xpc3RDb250cm9sbGVyIGV4dGVuZHMgQmFzZUNvbnRyb2xsZXIge1xuXHRiaW5kTGlzdGVuZXJzKCkge1xuXHRcdHRoaXMudmlldy5vbignc29uZzpzZWxlY3RlZCcsIHRoaXMub25Tb25nU2VsZWN0ZWQsIHRoaXMpO1xuXHR9XG5cblx0b25Tb25nU2VsZWN0ZWQoc29uZ0lkKSB7XG5cdFx0dGhpcy5tb2RlbC5zZWxlY3RlZFNvbmcgPSB0aGlzLm1vZGVsLmdldFNvbmcoTnVtYmVyKHNvbmdJZCkpO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU29uZ3NMaXN0Q29udHJvbGxlcjsiLCJ2YXIgaWQgPSAxO1xuXG5jbGFzcyBTb25nIHtcblx0Y29uc3RydWN0b3IoZGF0YSkge1xuXHRcdHRoaXMuaWQgPSBpZDtcblx0XHR0aGlzLmF1ZGlvQnVmZmVyID0gZGF0YS5hdWRpb0J1ZmZlcjtcblx0XHR0aGlzLmZpbGVOYW1lID0gZGF0YS5maWxlTmFtZTtcblx0XHR0aGlzLnRpdGxlID0gZGF0YS50aXRsZSB8fCB0aGlzLmZpbGVOYW1lO1xuXHRcdHRoaXMuYXJ0aXN0ID0gZGF0YS5hcnRpc3QgfHwgJyc7XG5cdFx0dGhpcy5kdXJhdGlvbiA9IE1hdGgucm91bmQoZGF0YS5kdXJhdGlvbik7XG5cdFx0dGhpcy5waWN0dXJlID0gZGF0YS5waWN0dXJlIHx8ICcnO1xuXHRcdGlkKys7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTb25nOyIsInZhciBFdmVudHMgPSByZXF1aXJlKCcuLi8uLi9ldmVudHMnKTtcbnZhciAkJCA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzJyk7XG52YXIgU29uZyA9IHJlcXVpcmUoJy4vc29uZycpO1xuXG5jbGFzcyBTb25ncyB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuc29uZ3MgPSBbXTtcblx0fVxuXG5cdGdldFNvbmcoaWQpIHtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5zb25ncy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYoaWQgPT09IHRoaXMuc29uZ3NbaV0uaWQpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuc29uZ3NbaV07XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0YWRkU29uZyhkYXRhKSB7XG5cdFx0dmFyIHNvbmcgPSBuZXcgU29uZyhkYXRhKTtcblx0XHR0aGlzLnNvbmdzLnB1c2goc29uZyk7XG5cdFx0dGhpcy50cmlnZ2VyKCdzb25nOmFkZCcsIHNvbmcpO1xuXHR9XG5cblx0cmVtb3ZlU29uZyhpZCkge1xuXHRcdHZhciBzb25nID0gdGhpcy5nZXRTb25nKGlkKTtcblx0XHRpZihzb25nICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdHRoaXMuc29uZ3Muc3BsaWNlKHNvbmcsIDEpO1xuXHRcdFx0dGhpcy50cmlnZ2VyKCdzb25nOnJlbW92ZWQnLCBzb25nKTtcblx0XHR9XG5cdH1cbn1cblxuJCQuYXNzaWduKFNvbmdzLnByb3RvdHlwZSwgRXZlbnRzKTtcblxubW9kdWxlLmV4cG9ydHMgPSBTb25nczsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIEV2ZW50cyA9IHJlcXVpcmUoJy4uLy4uL2V2ZW50cycpO1xudmFyICQkID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMnKTtcbnZhciBTb25ncyA9IHJlcXVpcmUoJy4uL21vZGVscy9zb25ncycpO1xuXG5jbGFzcyBQbGF5ZXJTdGF0ZSB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuc29uZ3MgPSBuZXcgU29uZ3MoKTtcblx0XHR0aGlzLnNlbGVjdGVkU29uZyA9IG51bGw7XG5cdFx0dGhpcy5wbGF5aW5nU29uZyA9IG51bGw7XG5cdFx0dGhpcy5pc1Zpc3VhbGl6aW5nID0gZmFsc2U7XG5cdFx0dGhpcy5oYXZlU29uZ3MgPSBmYWxzZTtcblx0XHR0aGlzLmVxdWFsaXplciA9IHtcblxuXHRcdH07XG5cdFx0dGhpcy5vYnNlcnZlUHJvcGVydGllcygpO1xuXHRcdHRoaXMuYmluZExpc3RlbmVycygpO1xuXHR9XG5cblx0b2JzZXJ2ZVByb3BlcnRpZXMoKSB7XG5cdFx0T2JqZWN0LmtleXModGhpcykuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcblx0XHRcdHRoaXNbJ18nICsga2V5XSA9IHRoaXNba2V5XTtcblxuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIGtleSwge1xuXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHJldHVybiB0aGlzWydfJyArIGtleV07XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHNldDogZnVuY3Rpb24odmFsdWUpIHtcblx0XHRcdFx0XHRpZih0aGlzWydfJyArIGtleV0gPT09IHZhbHVlKSByZXR1cm47XG5cblx0XHRcdFx0XHR0aGlzWydfJyArIGtleV0gPSB2YWx1ZTtcblx0XHRcdFx0XHR0aGlzLnRyaWdnZXIoa2V5ICsgJzpjaGFuZ2VkJywgdmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9LCB0aGlzKTtcblx0fVxuXG5cdGJpbmRMaXN0ZW5lcnMoKSB7XG5cdFx0dGhpcy5zb25ncy5vbignc29uZzphZGQnLCBmdW5jdGlvbihzb25nKSB7XG5cdFx0XHR0aGlzLnRyaWdnZXIoJ3Nvbmc6YWRkJywgc29uZyk7XG5cdFx0fSwgdGhpcyk7XG5cblx0XHR0aGlzLnNvbmdzLm9uKCdzb25nOnJlbW92ZWQnLCBmdW5jdGlvbihzb25nKSB7XG5cdFx0XHR0aGlzLnRyaWdnZXIoJ3Nvbmc6cmVtb3ZlZCcsIHNvbmcpO1xuXHRcdH0sIHRoaXMpO1xuXHR9XG5cblx0Z2V0U29uZyhpZCkge1xuXHRcdHJldHVybiB0aGlzLnNvbmdzLmdldFNvbmcoaWQpO1xuXHR9XG5cblx0YWRkU29uZyhkYXRhKSB7XG5cdFx0cmV0dXJuIHRoaXMuc29uZ3MuYWRkU29uZyhkYXRhKTtcblx0fVxuXG5cdHJlbW92ZVNvbmcoaWQpIHtcblx0XHRyZXR1cm4gdGhpcy5zb25ncy5yZW1vdmVTb25nKGlkKTtcblx0fVxufVxuXG4kJC5hc3NpZ24oUGxheWVyU3RhdGUucHJvdG90eXBlLCBFdmVudHMpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXllclN0YXRlO1xuXG5cbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyICQkID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMnKTtcclxudmFyIEV2ZW50cyA9IHJlcXVpcmUoJy4uLy4uL2V2ZW50cycpO1xyXG52YXIgZG9tID0gcmVxdWlyZSgnLi4vLi4vYXBpL2RvbScpO1xyXG5cclxuY2xhc3MgQmFzZVZpZXcge1xyXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuXHRcdHRoaXMuZWwgPSBvcHRpb25zLmVsO1xyXG5cdFx0dGhpcy5tb2RlbCA9IG9wdGlvbnMubW9kZWw7XHJcblx0XHR0aGlzLnN1YnZpZXdzID0gb3B0aW9ucy5zdWJ2aWV3cztcclxuXHRcdGlmKG9wdGlvbnMudGVtcGxhdGUpIHtcclxuXHRcdFx0dGhpcy50ZW1wbGF0ZSA9IG9wdGlvbnMudGVtcGxhdGUuY29udGVudC5maXJzdEVsZW1lbnRDaGlsZC5jbG9uZU5vZGUodHJ1ZSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzaG93KCkge1xyXG5cdFx0ZG9tLnNob3codGhpcy5lbCk7XHJcblx0fVxyXG5cclxuXHRoaWRlKCkge1xyXG5cdFx0ZG9tLmhpZGUodGhpcy5lbCk7XHJcblx0fVxyXG5cclxuXHRyZW5kZXIoKSB7XHJcblx0XHR0aGlzLmVsLmFwcGVuZENoaWxkKHRoaXMuY29udGVudCk7XHJcblx0fVxyXG5cclxuXHRyZW1vdmUoKSB7XHJcblx0XHR0aGlzLmVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5lbCk7XHJcblx0fVxyXG59XHJcblxyXG4kJC5hc3NpZ24oQmFzZVZpZXcucHJvdG90eXBlLCBFdmVudHMpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBCYXNlVmlldzsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIEJhc2VWaWV3ID0gcmVxdWlyZSgnLi9iYXNlJyk7XG52YXIgZG9tID0gcmVxdWlyZSgnLi4vLi4vYXBpL2RvbScpO1xuXG5jbGFzcyBDb250cm9sc1ZpZXcgZXh0ZW5kcyBCYXNlVmlldyB7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRzdXBlcihvcHRpb25zKTtcblx0XHR0aGlzLmVsZW1zID0ge1xuXHRcdFx0cHJldjogZG9tLnFzKCcuanMtcHJldicpLFxuXHRcdFx0bmV4dDogZG9tLnFzKCcuanMtbmV4dCcpLFxuXHRcdFx0cGxheTogZG9tLnFzKCcuanMtcGxheScpLFxuXHRcdFx0cGF1c2U6IGRvbS5xcygnLmpzLXBhdXNlJyksXG5cdFx0XHRzdG9wOiBkb20ucXMoJy5qcy1zdG9wJyksXG5cdFx0XHRlcTogZG9tLnFzKCcuanMtZXEnKVxuXHRcdH07XG5cdFx0dGhpcy5pc1BsYXlpbmcgPSBmYWxzZTtcblx0XHR0aGlzLnNvbmdzID0gW107XG5cdFx0dGhpcy5iaW5kTGlzdGVuZXJzKCk7XG5cdH1cblxuXHRiaW5kTGlzdGVuZXJzKCkge1xuXHRcdHRoaXMuZWwub25jbGljayA9IHRoaXMub25Db250cm9sQ2xpY2suYmluZCh0aGlzKTtcblx0XHR0aGlzLm1vZGVsLm9uKCdzZWxlY3RlZFNvbmc6Y2hhbmdlZCcsIHRoaXMub25TZWxlY3RlZFNvbmdDaGFuZ2VkLCB0aGlzKTtcblx0XHR0aGlzLm1vZGVsLm9uKCdwbGF5aW5nU29uZzpjaGFuZ2VkJywgdGhpcy5vblBsYXlpbmdTb25nQ2hhbmdlZCwgdGhpcyk7XG5cdFx0dGhpcy5tb2RlbC5vbignc29uZzphZGQnLCB0aGlzLm9uU29uZ0FkZCwgdGhpcyk7XG5cdH1cblxuXHRvblNvbmdBZGQoc29uZykge1xuXHRcdHRoaXMuc29uZ3MucHVzaChzb25nLmlkKTtcblx0fVxuXG5cdG9uUGxheWluZ1NvbmdDaGFuZ2VkKHNvbmcpIHtcblx0XHRpZighc29uZykge1xuXHRcdFx0dGhpcy5pc1BsYXlpbmcgPSBmYWxzZTtcblx0XHRcdGRvbS5hZGRDbGFzcyh0aGlzLmVsZW1zLnN0b3AsICdpY29uX2Rpc2FibGVkJyk7XG5cdFx0XHRkb20ucmVtb3ZlQ2xhc3ModGhpcy5lbGVtcy5wbGF5LCAnaWNvbl9kaXNhYmxlZCcpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHRoaXMuaXNQbGF5aW5nID0gdHJ1ZTtcblx0XHRcdGRvbS5yZW1vdmVDbGFzcyh0aGlzLmVsZW1zLnN0b3AsICdpY29uX2Rpc2FibGVkJyk7XG5cdFx0XHRkb20uYWRkQ2xhc3ModGhpcy5lbGVtcy5wbGF5LCAnaWNvbl9kaXNhYmxlZCcpO1xuXHRcdH1cblx0fVxuXG5cdG9uU2VsZWN0ZWRTb25nQ2hhbmdlZChzb25nKSB7XG5cdFx0aWYoIXRoaXMuaXNQbGF5aW5nKSB7XG5cdFx0XHRkb20ucmVtb3ZlQ2xhc3ModGhpcy5lbGVtcy5wbGF5LCAnaWNvbl9kaXNhYmxlZCcpO1xuXHRcdH1cblx0fVxuXG5cdG9uQ29udHJvbENsaWNrKGUpIHtcblx0XHR2YXIgY29udHJvbCA9IGRvbS5jbG9zZXN0KGUudGFyZ2V0LCAnLmpzLWNvbnRyb2wnKTtcblx0XHRpZighY29udHJvbCB8fCBkb20uaGFzQ2xhc3MoY29udHJvbCwgJ2ljb25fZGlzYWJsZWQnKSkgcmV0dXJuO1xuXHRcdHZhciBjb250cm9sVHlwZSA9IGNvbnRyb2wuZGF0YXNldC50eXBlO1xuXHRcdHRoaXMudHJpZ2dlcignY29udHJvbDpwcmVzc2VkJywgY29udHJvbFR5cGUpO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ29udHJvbHNWaWV3O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBkb20gPSByZXF1aXJlKCcuLi8uLi9hcGkvZG9tJyk7XG52YXIgJCQgPSByZXF1aXJlKCcuLi8uLi91dGlscycpO1xudmFyIEJhc2VWaWV3ID0gcmVxdWlyZSgnLi9iYXNlJyk7XG5cbmNsYXNzIERyb3BBcmVhVmlldyBleHRlbmRzIEJhc2VWaWV3IHtcblxuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0c3VwZXIob3B0aW9ucyk7XG5cdFx0dGhpcy5maWxlRW50ZXJlZCA9IGZhbHNlO1xuXG5cdFx0dGhpcy5lbGVtcyA9IHtcblx0XHRcdHNvbmdzTGlzdDogZG9tLnFzKCcuanMtc29uZ3MtbGlzdCcsIHRoaXMuZWwpLFxuXHRcdFx0c29uZ0RldGFpbHM6IGRvbS5xcygnLmpzLXNvbmctZGV0YWlscycsIHRoaXMuZWwpLFxuXHRcdFx0dmlzdWFsaXplcjogZG9tLnFzKCcuanMtdmlzdWFsaXplcicsIHRoaXMuZWwpLFxuXHRcdFx0ZHJvcEhpbnQ6IGRvbS5xcygnLmpzLWRyb3AtaGludCcsIHRoaXMuZWwpLFxuXHRcdFx0ZXF1YWxpemVyOiBkb20ucXMoJy5qcy1lcXVhbGl6ZXInLCB0aGlzLmVsKVxuXHRcdH07XG5cdFx0dGhpcy5iaW5kTGlzdGVuZXJzKCk7XG5cdH1cblxuXHRiaW5kTGlzdGVuZXJzKCkge1xuXHRcdHRoaXMuZWwub25kcm9wID0gdGhpcy5vbkZpbGVEcm9wLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5lbC5vbmRyYWdlbnRlciA9IHRoaXMub25GaWxlRW50ZXIuYmluZCh0aGlzKTtcblx0XHR0aGlzLmVsLm9uZHJhZ292ZXIgPSB0aGlzLm9uRmlsZURyYWcuYmluZCh0aGlzKTtcblx0fVxuXG5cdG9uRmlsZURyYWcoZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0fVxuXG5cdG9uRmlsZURyb3AoZSkge1xuXHRcdHZhciBmaWxlcyA9IFtdLnNsaWNlLmNhbGwoZS5kYXRhVHJhbnNmZXIuZmlsZXMpO1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR0aGlzLnRyaWdnZXIoJ2ZpbGVzOmFkZCcsIGZpbGVzKTtcblx0XHR0aGlzLmZpbGVFbnRlcmVkID0gZmFsc2U7XG5cdFx0dGhpcy5lbGVtcy5kcm9wSGludC5vbmRyYWdsZWF2ZSA9IG51bGw7XG5cdFx0ZG9tLmhpZGUodGhpcy5lbGVtcy5kcm9wSGludCk7XG5cdFx0ZG9tLnNob3codGhpcy5lbGVtcy5zb25nRGV0YWlscyk7XG5cdFx0ZG9tLnNob3codGhpcy5lbGVtcy5zb25nc0xpc3QpO1xuXHRcdGRvbS5zaG93KHRoaXMuZWxlbXMudmlzdWFsaXplcik7XG5cdH1cblxuXHRvbkZpbGVMZWF2ZShlKSB7XG5cdFx0aWYodGhpcy5lbGVtcy5kcm9wSGludC5jb250YWlucyhlLnRhcmdldCkgJiYgZS50YXJnZXQgIT09IHRoaXMuZWxlbXMuZHJvcEhpbnQpIHJldHVybjtcblx0XHR0aGlzLmZpbGVFbnRlcmVkID0gZmFsc2U7XG5cdFx0dGhpcy5lbGVtcy5kcm9wSGludC5vbmRyYWdsZWF2ZSA9IG51bGw7XG5cdFx0ZG9tLmhpZGUodGhpcy5lbGVtcy5kcm9wSGludCk7XG5cblxuXHRcdGRvbS5zaG93KHRoaXMuZWxlbXMudmlzdWFsaXplcik7XG5cdFx0ZG9tLnNob3codGhpcy5lbGVtcy5zb25nRGV0YWlscyk7XG5cdFx0ZG9tLnNob3codGhpcy5lbGVtcy5zb25nc0xpc3QpO1xuXHR9XG5cblx0b25GaWxlRW50ZXIoZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRpZih0aGlzLmZpbGVFbnRlcmVkKSByZXR1cm47XG5cblx0XHRkb20uaGlkZSh0aGlzLmVsZW1zLnNvbmdzTGlzdCk7XG5cdFx0ZG9tLmhpZGUodGhpcy5lbGVtcy5zb25nRGV0YWlscyk7XG5cdFx0ZG9tLmhpZGUodGhpcy5lbGVtcy52aXN1YWxpemVyKTtcblx0XHRkb20uaGlkZSh0aGlzLmVsZW1zLmVxdWFsaXplcik7XG5cdFx0ZG9tLnNob3codGhpcy5lbGVtcy5kcm9wSGludCk7XG5cblx0XHR0aGlzLmZpbGVFbnRlcmVkID0gdHJ1ZTtcblx0XHR0aGlzLmVsZW1zLmRyb3BIaW50Lm9uZHJhZ2xlYXZlID0gdGhpcy5vbkZpbGVMZWF2ZS5iaW5kKHRoaXMpO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRHJvcEFyZWFWaWV3O1xuXG5cblxuXG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGRvbSA9IHJlcXVpcmUoJy4uLy4uL2FwaS9kb20nKTtcbnZhciAkJCA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzJyk7XG52YXIgQmFzZVZpZXcgPSByZXF1aXJlKCcuL2Jhc2UnKTtcblxuY2xhc3MgRXF1YWxpemVyVmlldyBleHRlbmRzIEJhc2VWaWV3IHtcblxuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0c3VwZXIob3B0aW9ucyk7XG5cdFx0XG5cdFx0dGhpcy5zbGlkZXJzID0ge1xuXHRcdFx0J2dhaW4nOiAgZG9tLnFzKCdbZGF0YS10eXBlPVwiZ2FpblwiXScsIHRoaXMuZWwpLFxuXHRcdFx0JzYwJzogIGRvbS5xcygnW2RhdGEtdHlwZT1cIjYwXCJdJywgdGhpcy5lbCksXG5cdFx0XHQnMTcwJzogIGRvbS5xcygnW2RhdGEtdHlwZT1cIjE3MFwiXScsIHRoaXMuZWwpLFxuXHRcdFx0JzMxMCc6ICBkb20ucXMoJ1tkYXRhLXR5cGU9XCIzMTBcIl0nLCB0aGlzLmVsKSxcblx0XHRcdCc2MDAnOiAgZG9tLnFzKCdbZGF0YS10eXBlPVwiNjAwXCJdJywgdGhpcy5lbCksXG5cdFx0XHQnMUsnOiAgZG9tLnFzKCdbZGF0YS10eXBlPVwiMUtcIl0nLCB0aGlzLmVsKSxcblx0XHRcdCczSyc6ICBkb20ucXMoJ1tkYXRhLXR5cGU9XCIzS1wiXScsIHRoaXMuZWwpLFxuXHRcdFx0JzZLJzogIGRvbS5xcygnW2RhdGEtdHlwZT1cIjZLXCJdJywgdGhpcy5lbCksXG5cdFx0XHQnMTJLJzogIGRvbS5xcygnW2RhdGEtdHlwZT1cIjEyS1wiXScsIHRoaXMuZWwpLFxuXHRcdFx0JzE0Syc6ICBkb20ucXMoJ1tkYXRhLXR5cGU9XCIxNEtcIl0nLCB0aGlzLmVsKSxcblx0XHRcdCcxNksnOiAgZG9tLnFzKCdbZGF0YS10eXBlPVwiMTZLXCJdJywgdGhpcy5lbClcdFxuXHRcdH07XG5cblx0XHR0aGlzLnNsaWRlcnNDb29yZHMgPSB7XG5cdFx0XHQnZ2Fpbic6ICB0aGlzLnNsaWRlcnNbJ2dhaW4nXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcblx0XHRcdCc2MCc6ICB0aGlzLnNsaWRlcnNbJzYwJ10uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG5cdFx0XHQnMTcwJzogIHRoaXMuc2xpZGVyc1snMTcwJ10uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG5cdFx0XHQnMzEwJzogIHRoaXMuc2xpZGVyc1snMzEwJ10uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG5cdFx0XHQnNjAwJzogIHRoaXMuc2xpZGVyc1snNjAwJ10uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG5cdFx0XHQnMUsnOiAgdGhpcy5zbGlkZXJzWycxSyddLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuXHRcdFx0JzNLJzogIHRoaXMuc2xpZGVyc1snM0snXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcblx0XHRcdCc2Syc6ICB0aGlzLnNsaWRlcnNbJzZLJ10uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG5cdFx0XHQnMTJLJzogIHRoaXMuc2xpZGVyc1snMTJLJ10uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG5cdFx0XHQnMTRLJzogIHRoaXMuc2xpZGVyc1snMTRLJ10uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG5cdFx0XHQnMTZLJzogIHRoaXMuc2xpZGVyc1snMTZLJ10uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblx0XHR9O1xuXG5cdFx0dGhpcy5hY3RpdmVTbGlkZXIgPSBudWxsO1xuXG5cdFx0dGhpcy5zbGlkZXJTaGlmdCA9IHtcblx0XHRcdHNoaWZ0WDogbnVsbCxcblx0XHRcdHNoaWZ0WTogbnVsbFxuXHRcdH07XG5cdFx0dGhpcy5iaW5kTGlzdGVuZXJzKCk7XG5cdH1cblxuXHRiaW5kTGlzdGVuZXJzKCkge1xuXHRcdHdpbmRvdy5vbnJlc2l6ZSA9IHRoaXMucmVjYWxjU2xpZGVyc0Nvb3Jkcy5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZWwub25tb3VzZWRvd24gPSB0aGlzLm9uVGh1bWJNb3VzZURvd24uYmluZCh0aGlzKTtcblx0XHR0aGlzLmVsLm9uZHJhZ3N0YXJ0ID0gdGhpcy5vbkRyYWdTdGFydC5iaW5kKHRoaXMpO1xuXHR9XG5cblx0b25UaHVtYk1vdXNlRG93bihlKSB7XG5cdFx0dmFyIHRhcmdldCA9IGUudGFyZ2V0O1xuXHRcdHZhclx0dGh1bWJDb29yZHM7XG5cblx0XHRpZiAoIWRvbS5oYXNDbGFzcyhlLnRhcmdldCwgJ2pzLXRodW1iJykpIHJldHVybjtcblxuXHRcdHRodW1iQ29vcmRzID0gdGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRcdHRoaXMuYWN0aXZlVGh1bWIgPSB0YXJnZXQ7XG5cdFx0dGhpcy5hY3RpdmVTbGlkZXIgPSBkb20uY2xvc2VzdCh0YXJnZXQsICcuanMtc2xpZGVyJyk7XG5cdFx0dGhpcy5zbGlkZXJTaGlmdC5zaGlmdFggPSBlLnBhZ2VYIC0gdGh1bWJDb29yZHMubGVmdDtcblx0XHR0aGlzLnNsaWRlclNoaWZ0LnNoaWZ0WSA9IGUucGFnZVkgLSB0aHVtYkNvb3Jkcy50b3A7XG5cdFx0ZG9jdW1lbnQub25tb3VzZW1vdmUgPSB0aGlzLm9uRG9jdW1lbnRNb3VzZU1vdmUuYmluZCh0aGlzKTtcblx0XHRkb2N1bWVudC5vbm1vdXNldXAgPSB0aGlzLm9uRG9jdW1lbnRNb3VzZVVwLmJpbmQodGhpcyk7XG5cdH1cblxuXHRvbkRvY3VtZW50TW91c2VNb3ZlKGUpIHtcblx0XHR2YXIgeSA9IGUuY2xpZW50WSAtIHRoaXMuc2xpZGVyU2hpZnQuc2hpZnRZIC0gdGhpcy5zbGlkZXJzQ29vcmRzW3RoaXMuYWN0aXZlU2xpZGVyLmRhdGFzZXQudHlwZV0udG9wO1xuXHRcdHRoaXMubW92ZVRodW1iKHkpO1xuXHR9XG5cblx0b25Eb2N1bWVudE1vdXNlVXAoZSkge1xuXHRcdGRvY3VtZW50Lm9ubW91c2Vtb3ZlID0gbnVsbDtcblx0XHRkb2N1bWVudC5vbm1vdXNldXAgPSBudWxsO1xuXHRcdHRoaXMuYWN0aXZlU2xpZGVyID0gbnVsbDtcblx0XHR0aGlzLmFjdGl2ZVRodW1iID0gbnVsbDtcblx0XHR0aGlzLnNsaWRlclNoaWZ0LnNoaWZ0WCA9IG51bGw7XG5cdFx0dGhpcy5zbGlkZXJTaGlmdC5zaGlmdFkgPSBudWxsO1xuXHR9XG5cblx0Y2hlY2tDb29yZHMoeSkge1xuXHRcdGlmKHkgPCAwKSB7XG5cdFx0XHR5ID0gMDtcblx0XHR9XG5cdFx0dmFyIHRvcEVkZ2UgPSB0aGlzLmFjdGl2ZVNsaWRlci5vZmZzZXRIZWlnaHQgLSB0aGlzLmFjdGl2ZVRodW1iLm9mZnNldEhlaWdodDtcblx0XHRpZih5ID4gdG9wRWRnZSkge1xuXHRcdFx0eSA9IHRvcEVkZ2U7XG5cdFx0fVxuXHRcdHJldHVybiB5O1xuXHR9XG5cblx0bW92ZVRodW1iKHkpIHtcblx0XHR5ID0gdGhpcy5jaGVja0Nvb3Jkcyh5KTtcblx0XHR0aGlzLmFjdGl2ZVRodW1iLnN0eWxlLnRvcCA9IHkgKyAncHgnO1xuXHRcdGNvbnNvbGUubG9nKHkpO1xuXHR9XG5cblx0b25EcmFnU3RhcnQoKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdFxuXHRyZWNhbGNTbGlkZXJzQ29vcmRzKCkge1xuXHRcdE9iamVjdC5rZXlzKHRoaXMuc2xpZGVycykuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcblx0XHRcdHRoaXMuc2xpZGVyc0Nvb3Jkc1trZXldID0gdGhpcy5zbGlkZXJzW2tleV0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0fSwgdGhpcyk7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBFcXVhbGl6ZXJWaWV3OyIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyIEJhc2VWaWV3ID0gcmVxdWlyZSgnLi9iYXNlJyk7XHJcbnZhciBBdWRpbyA9IHJlcXVpcmUoJy4uLy4uL2FwaS9hdWRpbycpO1xyXG5cclxuY2xhc3MgUGxheWVyVmlldyBleHRlbmRzIEJhc2VWaWV3IHtcclxuXHJcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xyXG5cdFx0c3VwZXIob3B0aW9ucyk7XHJcblx0XHR0aGlzLmJpbmRMaXN0ZW5lcnMoKTtcclxuXHR9XHJcblxyXG5cdGJpbmRMaXN0ZW5lcnMoKSB7XHJcblx0XHR0aGlzLm1vZGVsLm9uKCdwbGF5aW5nU29uZzpjaGFuZ2VkJywgdGhpcy5vblBsYXlpbmdTb25nQ2hhbmdlZCwgdGhpcyk7XHJcblx0fVxyXG5cclxuXHRvblBsYXlpbmdTb25nQ2hhbmdlZChzb25nKSB7XHJcblx0XHRpZighc29uZykge1xyXG5cdFx0XHR0aGlzLnN0b3BTb25nKCk7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhpcy5wbGF5U29uZyhzb25nKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHBsYXlTb25nKHNvbmcpIHtcclxuXHRcdEF1ZGlvLnBsYXkoc29uZy5hdWRpb0J1ZmZlcik7XHJcblx0fVxyXG5cclxuXHRzdG9wU29uZygpIHtcclxuXHRcdEF1ZGlvLnN0b3AoKTtcclxuXHR9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUGxheWVyVmlldztcclxuXHJcblxyXG5cclxuXHJcbiIsInZhciBCYXNlVmlldyA9IHJlcXVpcmUoJy4vYmFzZScpO1xudmFyIGRvbSA9IHJlcXVpcmUoJy4uLy4uL2FwaS9kb20nKTtcblxuY2xhc3MgU29uZ0RldGFpbHNWaWV3IGV4dGVuZHMgQmFzZVZpZXcge1xuXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRzdXBlcihvcHRpb25zKTtcblx0XHR0aGlzLmVsZW1zID0ge1xuXHRcdFx0Y292ZXI6IGRvbS5xcygnLmpzLWNvdmVyJywgdGhpcy5lbCksXG5cdFx0XHR0aXRsZTogZG9tLnFzKCcuanMtdGl0bGUnLCB0aGlzLmVsKSxcblx0XHRcdGFydGlzdDogZG9tLnFzKCcuanMtYXJ0aXN0JywgdGhpcy5lbClcblx0XHR9O1xuXHRcdHRoaXMuYmluZExpc3RlbmVycygpO1xuXHR9XG5cblx0YmluZExpc3RlbmVycygpIHtcblx0XHR0aGlzLm1vZGVsLm9uKCdzZWxlY3RlZFNvbmc6Y2hhbmdlZCcsIHRoaXMub25Tb25nQ2hhbmdlZCwgdGhpcyk7XG5cdH1cblxuXHRvblNvbmdDaGFuZ2VkKHNvbmcpIHtcblx0XHRpZihzb25nLnBpY3R1cmUpIHtcblx0XHRcdHRoaXMuZWxlbXMuY292ZXIuc3JjID0gc29uZy5waWN0dXJlO1xuXHRcdFx0dGhpcy5lbGVtcy50aXRsZS50ZXh0Q29udGVudCA9IHNvbmcudGl0bGU7XG5cdFx0XHR0aGlzLmVsZW1zLmFydGlzdC50ZXh0Q29udGVudCA9IHNvbmcuYXJ0aXN0O1xuXHRcdH1cblx0XHRpZighdGhpcy5zb25nU2VsZWN0ZWQpIHtcblx0XHRcdHRoaXMuc29uZ1NlbGVjdGVkID0gdHJ1ZTtcblx0XHRcdGRvbS5hZGRDbGFzcyh0aGlzLmVsLCAncGxheWVyX19zb25nLWRlc2NyaXB0aW9uX3Nob3dlZCcpO1xuXHRcdH1cblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNvbmdEZXRhaWxzVmlldzsiLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciAkJCA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzJyk7XHJcbnZhciBFdmVudHMgPSByZXF1aXJlKCcuLi8uLi9ldmVudHMnKTtcclxudmFyIGRvbSA9IHJlcXVpcmUoJy4uLy4uL2FwaS9kb20nKTtcclxudmFyIEJhc2VWaWV3ID0gcmVxdWlyZSgnLi9iYXNlJyk7XHJcblxyXG5jbGFzcyBTb25nc0xpc3RWaWV3IGV4dGVuZHMgQmFzZVZpZXcge1xyXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuXHRcdHN1cGVyKG9wdGlvbnMpO1xyXG5cdFx0dGhpcy5lbGVtcyA9IHtcclxuXHRcdFx0cGxhY2Vob2xkZXI6IGRvbS5xcygnLmpzLXBsYWNlaG9sZGVyJywgdGhpcy5lbClcclxuXHRcdH07XHJcblx0XHR0aGlzLmJpbmRMaXN0ZW5lcnMoKTtcclxuXHR9XHJcblxyXG5cdGJpbmRMaXN0ZW5lcnMoKSB7XHJcblx0XHR0aGlzLm1vZGVsLm9uKCdzb25nOmFkZCcsIHRoaXMub25Tb25nQWRkLCB0aGlzKTtcclxuXHRcdHRoaXMuZWwub25jbGljayA9IHRoaXMub25Tb25nQ2xpY2suYmluZCh0aGlzKTtcclxuXHR9XHJcblxyXG5cdG9uU29uZ0NsaWNrKGUpIHtcclxuXHRcdHZhciB0YXJnZXQgPSBlLnRhcmdldDtcclxuXHRcdHZhciBzb25nRWwgPSBkb20uY2xvc2VzdCh0YXJnZXQsICcuanMtc29uZycpO1xyXG5cclxuXHRcdHRoaXMuc2VsZWN0U29uZyhzb25nRWwpO1xyXG5cdFx0dGhpcy50cmlnZ2VyKCdzb25nOnNlbGVjdGVkJywgc29uZ0VsLmRhdGFzZXQuaWQpO1xyXG5cdH1cclxuXHJcblx0b25Tb25nQWRkKHNvbmcpIHtcclxuXHRcdHZhciBzb25nRWwgPSB0aGlzLmNyZWF0ZVNvbmdFbChzb25nKTtcclxuXHJcblx0XHRpZighdGhpcy5oYXZlU29uZ3MpIHtcclxuXHRcdFx0dGhpcy5lbGVtcy5wbGFjZWhvbGRlci5yZW1vdmUoKTtcclxuXHRcdH1cclxuXHRcdHRoaXMuaGF2ZVNvbmdzID0gdHJ1ZTtcclxuXHRcdHRoaXMuZWwuYXBwZW5kQ2hpbGQoc29uZ0VsKTtcclxuXHR9XHJcblxyXG5cdHNlbGVjdFNvbmcoc29uZ0VsKSB7XHJcblx0XHQkJC50b0FycmF5KHNvbmdFbC5wYXJlbnROb2RlLmNoaWxkcmVuKVxyXG5cdFx0XHQuZmlsdGVyKGVsID0+IGVsICE9PSBzb25nRWwpXHJcblx0XHRcdC5mb3JFYWNoKGVsID0+IGRvbS5yZW1vdmVDbGFzcyhlbCwgJ3NvbmctaXRlbV9zZWxlY3RlZCcpKTtcclxuXHJcblx0XHRkb20uYWRkQ2xhc3Moc29uZ0VsLCAnc29uZy1pdGVtX3NlbGVjdGVkJyk7XHJcblx0fVxyXG5cclxuXHRjcmVhdGVTb25nRWwoc29uZykge1xyXG5cdFx0dmFyIHNvbmdFbCA9IHRoaXMudGVtcGxhdGUuY2xvbmVOb2RlKHRydWUpO1xyXG5cdFx0dmFyIHRpdGxlID0gZG9tLnFzKCcuanMtc29uZy10aXRsZScsIHNvbmdFbCk7XHJcblx0XHR2YXIgYXJ0aXN0ID0gZG9tLnFzKCcuanMtc29uZy1hcnRpc3QnLCBzb25nRWwpO1xyXG5cdFx0dmFyIGNvdmVyID0gZG9tLnFzKCcuanMtc29uZy1jb3ZlcicsIHNvbmdFbCk7XHJcblx0XHR2YXIgZHVyYXRpb24gPSBkb20ucXMoJy5qcy1zb25nLWR1cmF0aW9uJywgc29uZ0VsKTtcclxuXHJcblx0XHR0aXRsZS50ZXh0Q29udGVudCA9IHNvbmcudGl0bGU7XHJcblx0XHRhcnRpc3QudGV4dENvbnRlbnQgPSBzb25nLmFydGlzdDtcclxuXHJcblx0XHRkdXJhdGlvbi50ZXh0Q29udGVudCA9IHRoaXMuZm9ybWF0RHVyYXRpb24oc29uZy5kdXJhdGlvbik7XHJcblx0XHRzb25nRWwuZGF0YXNldC5pZCA9IHNvbmcuaWQ7XHJcblx0XHRpZihzb25nLnBpY3R1cmUpIHtcclxuXHRcdFx0Y292ZXIuc3JjID0gc29uZy5waWN0dXJlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBzb25nRWw7XHJcblx0fVxyXG5cclxuXHRmb3JtYXREdXJhdGlvbihzZWNzKSB7XHJcblx0XHR2YXIgbWludXRlcyA9IE1hdGguZmxvb3Ioc2VjcyAvIDYwKTtcclxuXHRcdHZhciBzZWNvbmRzID0gc2VjcyAlIDYwO1xyXG5cclxuXHRcdGlmKHNlY29uZHMudG9TdHJpbmcoKS5sZW5ndGggPT09IDEpIHtcclxuXHRcdFx0c2Vjb25kcyA9ICcwJyArIHNlY29uZHM7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGAke21pbnV0ZXN9OiR7c2Vjb25kc31gO1xyXG5cdH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTb25nc0xpc3RWaWV3OyAiLCJ2YXIgQmFzZVZpZXcgPSByZXF1aXJlKCcuL2Jhc2UnKTtcbnZhciBkb20gPSByZXF1aXJlKCcuLi8uLi9hcGkvZG9tJyk7XG52YXIgYXVkaW8gPSByZXF1aXJlKCcuLi8uLi9hcGkvYXVkaW8nKTtcblxuY2xhc3MgVmlzdWFsaXplclZpZXcgZXh0ZW5kcyBCYXNlVmlldyB7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRzdXBlcihvcHRpb25zKTtcblxuXHRcdHRoaXMuZWxlbXMgPSB7XG5cdFx0XHRjYW52YXM6IGRvbS5xcygnLmpzLWNhbnZhcycsIHRoaXMuZWwpXG5cdFx0fTtcblx0XHR0aGlzLmZyYW1lSWQgPSBudWxsO1xuXHRcdHRoaXMuY2FudmFzVyA9IHRoaXMuZWxlbXMuY2FudmFzLm9mZnNldFdpZHRoO1xuXHRcdHRoaXMuY2FudmFzSCA9IHRoaXMuZWxlbXMuY2FudmFzLm9mZnNldEhlaWdodDtcblx0XHR0aGlzLmNhbnZhc0N0eCA9IHRoaXMuZWxlbXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cdFx0dGhpcy5iaW5kTGlzdGVuZXJzKCk7XG5cdH1cblxuXHRiaW5kTGlzdGVuZXJzKCkge1xuXHRcdHRoaXMubW9kZWwub24oJ3BsYXlpbmdTb25nOmNoYW5nZWQnLCB0aGlzLm9uUGxheWluZ1NvbmdDaGFuZ2VkLCB0aGlzKTtcblx0fVxuXG5cdG9uUGxheWluZ1NvbmdDaGFuZ2VkKHNvbmcpIHtcblx0XHRpZihzb25nKSB7XG5cdFx0XHR0aGlzLmRyYXcoKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR0aGlzLnN0b3BEcmF3KCk7XG5cdFx0fVxuXHR9XG5cblx0c3RvcERyYXcoKSB7XG5cdFx0Y2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5mcmFtZUlkKTtcblx0XHR0aGlzLmNsZWFyQ2FudmFzKCk7XG5cdH1cblxuXHRjbGVhckNhbnZhcygpIHtcblx0XHR0aGlzLmNhbnZhc0N0eC5maWxsU3R5bGUgPSAnd2hpdGUnO1xuXHRcdHRoaXMuY2FudmFzQ3R4LmZpbGxSZWN0KDAsIDAsIHRoaXMuY2FudmFzVywgdGhpcy5jYW52YXNIKTtcblx0fVxuXG5cdGRyYXcoKSB7XG5cdFx0dmFyIHggPSAwO1xuXHRcdHZhciB2O1xuXHRcdHZhciB5O1xuXHRcdHZhciBzbGljZVdpZHRoO1xuXHRcdHZhciBidWZmZXJMZW5ndGggPSBhdWRpby5hbmFseXNlci5mZnRTaXplO1xuXHRcdHZhciBkYXRhQXJyYXkgPSBuZXcgVWludDhBcnJheShidWZmZXJMZW5ndGgpO1xuXG5cdFx0dGhpcy5mcmFtZUlkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuZHJhdy5iaW5kKHRoaXMpKTtcblx0XHRhdWRpby5hbmFseXNlci5nZXRCeXRlVGltZURvbWFpbkRhdGEoZGF0YUFycmF5KTtcblx0XHR0aGlzLmNsZWFyQ2FudmFzKCk7XG5cdFx0dGhpcy5jYW52YXNDdHgubGluZVdpZHRoID0gMjtcblx0XHR0aGlzLmNhbnZhc0N0eC5zdHJva2VTdHlsZSA9ICcjNjE2MUVGJztcblx0XHR0aGlzLmNhbnZhc0N0eC5iZWdpblBhdGgoKTtcblx0XHRzbGljZVdpZHRoID0gdGhpcy5jYW52YXNXICogMS4wIC8gYnVmZmVyTGVuZ3RoO1xuXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IGJ1ZmZlckxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2ID0gZGF0YUFycmF5W2ldIC8gMTI4LjA7XG5cdFx0XHR5ID0gdiAqIHRoaXMuY2FudmFzSCAvIDI7XG5cblx0XHRcdGlmKGkgPT09IDApIHtcblx0XHRcdFx0dGhpcy5jYW52YXNDdHgubW92ZVRvKHgsIHkpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHRoaXMuY2FudmFzQ3R4LmxpbmVUbyh4LCB5KTtcblx0XHRcdH1cblxuXHRcdFx0eCArPSBzbGljZVdpZHRoO1xuXHRcdH1cblx0XHR0aGlzLmNhbnZhc0N0eC5saW5lVG8odGhpcy5jYW52YXNXLCB0aGlzLmNhbnZhc0ggLyAyKTtcblx0XHR0aGlzLmNhbnZhc0N0eC5zdHJva2UoKTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFZpc3VhbGl6ZXJWaWV3OyIsInZhciBzdWJzY3JpYmVycyA9IG5ldyBNYXAoKTtcblxudmFyIEV2ZW50cyA9IHtcblx0b246IGZ1bmN0aW9uKHR5cGUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG5cdFx0dmFyIGl0ZW07XG5cblx0XHRpZihzdWJzY3JpYmVycy5oYXModGhpcykpIHtcblx0XHRcdGl0ZW0gPSBzdWJzY3JpYmVycy5nZXQodGhpcyk7XG5cdFx0XHRpZihpdGVtW3R5cGVdKSB7XG5cdFx0XHRcdGl0ZW1bdHlwZV0ucHVzaCh7XG5cdFx0XHRcdFx0Y2FsbGJhY2s6IGNhbGxiYWNrLFxuXHRcdFx0XHRcdGNvbnRleHQ6IGNvbnRleHRcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0aXRlbVt0eXBlXSA9IFt7XG5cdFx0XHRcdFx0Y2FsbGJhY2s6IGNhbGxiYWNrLFxuXHRcdFx0XHRcdGNvbnRleHQ6IGNvbnRleHRcblx0XHRcdFx0fV07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0aXRlbSA9IHtcblx0XHRcdFx0W3R5cGVdOiBbe1xuXHRcdFx0XHRcdGNhbGxiYWNrOiBjYWxsYmFjayxcblx0XHRcdFx0XHRjb250ZXh0OiBjb250ZXh0XG5cdFx0XHRcdH1dXG5cdFx0XHR9O1xuXHRcdFx0c3Vic2NyaWJlcnMuc2V0KHRoaXMsIGl0ZW0pO1xuXHRcdH1cblx0fSxcblx0b2ZmOiBmdW5jdGlvbih0eXBlLCBjYWxsYmFjaykge1xuXHRcdHZhciBpdGVtLCBpO1xuXHRcdGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcblx0XHRcdHN1YnNjcmliZXJzLmRlbGV0ZSh0aGlzKTtcblx0XHR9XG5cdFx0aWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSAmJiBzdWJzY3JpYmVycy5oYXModGhpcykpIHtcblx0XHRcdGl0ZW0gPSBzdWJzY3JpYmVycy5nZXQodGhpcyk7XG5cdFx0XHRpZihpdGVtW3R5cGVdKSB7XG5cdFx0XHRcdGlmKGNhbGxiYWNrKSB7XG5cdFx0XHRcdFx0Zm9yKGkgPSAwOyBpIDwgaXRlbVt0eXBlXS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0aWYoaXRlbVt0eXBlXVtpXSA9PT0gY2FsbGJhY2spIHtcblx0XHRcdFx0XHRcdFx0aXRlbVt0eXBlXS5zcGxpY2UoaSwgMSk7XG5cdFx0XHRcdFx0XHRcdGktLTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0ZGVsZXRlIGl0ZW1bdHlwZV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cdHRyaWdnZXI6IGZ1bmN0aW9uKHR5cGUsIC4uLmFyZ3MpIHtcblx0XHR2YXIgaXRlbTtcblxuXHRcdGlmKHN1YnNjcmliZXJzLmhhcyh0aGlzKSkge1xuXHRcdFx0aXRlbSA9IHN1YnNjcmliZXJzLmdldCh0aGlzKTtcblx0XHRcdGlmKGl0ZW1bdHlwZV0pIHtcblx0XHRcdFx0aXRlbVt0eXBlXS5mb3JFYWNoKGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRcdFx0dmFyIGNvbnRleHQgPSBldmVudC5jb250ZXh0IHx8IHRoaXM7XG5cdFx0XHRcdFx0ZXZlbnQuY2FsbGJhY2suYXBwbHkoY29udGV4dCwgYXJncyk7XG5cdFx0XHRcdH0sIHRoaXMpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBFdmVudHM7IiwidmFyICQkID0ge1xuXHR0b0FycmF5OiBmdW5jdGlvbihvYmplY3QpIHtcblx0XHRyZXR1cm4gW10uc2xpY2UuY2FsbChvYmplY3QpO1xuXHR9LFxuXHRhc3NpZ246IGZ1bmN0aW9uKHRhcmdldCwgLi4ucmVzdCkge1xuXHRcdGlmKHRhcmdldCA9PT0gdW5kZWZpbmVkIHx8IHRhcmdldCA9PT0gbnVsbCkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgZmlyc3QgYXJndW1lbnQgdG8gb2JqZWN0Jyk7XG5cdFx0fVxuXHRcdHJlc3QuZm9yRWFjaChvYmogPT4ge1xuXHRcdFx0aWYob2JqID09PSB1bmRlZmluZWQgfHwgb2JqID09PSBudWxsKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChrZXkgPT4ge1xuXHRcdFx0XHR0YXJnZXRba2V5XSA9IG9ialtrZXldO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gJCQ7Il19
