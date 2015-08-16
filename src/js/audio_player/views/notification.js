"use strict";

var BaseView = require('./base');
var dom = require('../../dom');

class NotificationView extends BaseView {
	constructor(options) {
		super(options);
		this.elems = {
			notification: dom.qs('.js-notification', this.el)
		};
		this.bindListeners();
	}

	bindListeners() {
		this.model.on('errorMessage:changed', this.onErrorMessageChanged, this);
	}

	onErrorMessageChanged(message) {
		var notification = this.elems.notification;
		var self = this;

		notification.textContent = message;
		dom.addClass(notification, 'notification_showed');
		setTimeout(function(){
			dom.removeClass(notification, 'notification_showed');
		}, 3000);
	}
}

module.exports = NotificationView;
