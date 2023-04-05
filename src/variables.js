module.exports = {
	getVariables: function () {
		let variables = [];

		variables.push({ variableId: 'connection', name: 'Connection' });

		let model = this.MODELS.find((m) => m.id === this.config.model);

		if (model) {
			if (model.actions.includes('setCrosspoint')) {
				for (let i = 1; i <= model.outputs; i++) {
					//variables.push({ variableId: `output` + i, name: `Output ` + i });
					//feedback/live data not implemented at this time
				}
			}
		}

		return variables;
	},

	updateVariables: function () {
		try {
			let variableObj = {
				connection: this.DEVICEINFO.connection,
			};
	
			this.setVariableValues(variableObj);
		} catch (error) {}
	}
}