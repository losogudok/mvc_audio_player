"use strict";

class BaseController {
	constructor(options) {
		this.model = options.model;
		this.view = options.view;
		this.bindListeners();
	}

	bindListeners() {}
}

module.exports = BaseController;