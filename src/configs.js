const { Regex } = require('@companion-module/base')

module.exports = {
	getConfigFields: function () {
		return [
			{
				type: 'static-text',
				id: 'info',
				width: 12,
				label: 'Information',
				value: 'This module controls a NoHassleAV HDMI Matrix',
			},
			{
				type: 'textinput',
				id: 'host',
				label: 'IP Address',
				default: '192.168.1.5',
				width: 6,
				required: true,
				regex: Regex.IP,
			},
			{
				type: 'dropdown',
				id: 'model',
				label: 'Model',
				width: 6,
				required: true,
				default: this.MODELS[0].id,
				choices: this.MODELS
			},
			/*{
				type: 'checkbox',
				id: 'polling',
				label: 'Polling (Required for Variables/Feedback)',
				default: true,
			},
			{
				type: 'checkbox',
				id: 'enableCustomPollRate',
				label: 'Enable Custom Polling Rate (May Shorten LCD Backlight Life)',
				default: false,
				isVisible: (config) => {
					if(config.polling == true) {
						return true;
					} else return false;
				}
			},
			{
				type: 'textinput',
				id: 'customPollRate',
				label: 'Poll Rate',
				width: 4,
				regex: Regex.NUMBER,
				default: '10000',
				required: true,
				isVisible: (config) => {
					if(config.enableCustomPollRate == true) {
						return true;
					} else return false;
				}
			},*/
		];
	}
}
