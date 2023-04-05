const { InstanceBase, runEntrypoint, TCPHelper, Regex } = require('@companion-module/base')

const actions = require('./actions.js');
const presets = require('./presets.js');
const variables = require('./variables.js');
const feedbacks = require('./feedbacks.js');
const configs = require('./configs.js');
const models = require('./models.js');

class NoHassleAVMatrixInstance extends InstanceBase {
	constructor(internal) {
		super(internal);

		Object.assign(this, {
			...configs,
			...actions,
			...presets,
			...variables,
			...feedbacks,
			...models,
		});

		//this.updateVariables = updateVariables

		this.init(this.getConfigFields());
	}

	async init(config) {
		this.config = config;
		this.updateStatus('connecting');

		this.POLLING_INTERVAL = null; //used to poll the device every second
		this.CONNECTED = false; //used for friendly notifying of the user that we have not received data yet

		this.GETTING_INFO = false;

		this.DEVICEINFO = {
			outputs: {},
			inputs: {},
		};

		this.initConnection();

		this.initActions();
		this.initFeedbacks();
		this.initVariables();
		this.initPresets();

		this.updateVariables();
		this.checkFeedbacks();
	}

	async destroy() {
		if (this.socket !== undefined) {
			this.socket.destroy();
			delete this.socket;
		}

		if (this.POLLING_INTERVAL) {
			clearInterval(this.POLLING_INTERVAL);
			this.POLLING_INTERVAL = null;
		}
	}

	async configUpdated(config) {
		this.config = config;

		this.updateStatus('connecting');

		if (this.POLLING_INTERVAL) {
			clearInterval(this.POLLING_INTERVAL);
			this.POLLING_INTERVAL = null;
		}

		this.initConnection();

		this.initActions();
		this.initFeedbacks();
		this.initVariables();
		this.initPresets();

		this.updateVariables();
		this.checkFeedbacks();
	}

	initVariables() {
		const variables = this.getVariables();
		this.setVariableDefinitions(variables);
	}

	initFeedbacks() {
		const feedbacks = this.getFeedbacks();
		this.setFeedbackDefinitions(feedbacks);
	}

	initPresets() {
		const presets = this.getPresets();
		this.setPresetDefinitions(presets);
	}

	initActions() {
		const actions = this.getActions();
		this.setActionDefinitions(actions);
	}

	initConnection() {
		if (this.config.host !== undefined) {
			this.socket = new TCPHelper(this.config.host, 23);

			setTimeout(this.checkConnection.bind(this), 10000);

			this.socket.on('data', (data) => {
				this.updateStatus('ok');

				this.CONNECTED = true;
				this.setVariableValues({ connection: 'Connected' });
				if (!this.POLLING_INTERVAL && this.config.polling) {
					//this.setupInterval();
				}
			});

			this.socket.on('error', (err) => {
				this.CONNECTED = false;
			});
		}
	}

	checkConnection() {
		if (this.CONNECTED) {
			this.updateStatus('ok');
			this.setVariableValues({ connection: 'Connected' });
		}
		else {
			this.updateStatus('connection_failure');
			this.setVariableValues({ connection: 'Error' });
		}
	}

	setupInterval() {
		this.stopInterval();

		if (this.config.polling) {
			this.getInformation();
			if(this.config.enableCustomPollRate) {
				this.POLLING_INTERVAL = setInterval(this.getInformation.bind(this), parseInt(this.config.customPollRate));
			} else {
				this.POLLING_INTERVAL = setInterval(this.getInformation.bind(this), 300000);
			}
		}
	}

	getInformation() {
		/*if(this.GETTING_INFO == false) {
			this.GETTING_INFO = true;

			let i = 1;
			let self = this;
	
			while (i <= self.OUTPUTS) {
				loop(i);
				i++;
			}
	
			function loop(i) {
				setTimeout(function () {
					self.fetchOutputData(i);
				}, 500 * i);
			}

			this.GETTING_INFO = false;
		}*/
	}

	stopInterval() {
		if (this.POLLING_INTERVAL !== null) {
			clearInterval(this.POLLING_INTERVAL);
			this.POLLING_INTERVAL = null;
		}
	}
}
runEntrypoint(NoHassleAVMatrixInstance, []);
