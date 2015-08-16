var audioContext = require('./audio').getAudioContext();

module.exports = audioContext.createAnalyser();