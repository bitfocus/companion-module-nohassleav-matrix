module.exports = {
	getActions: function () {
		let actions = {};
		
		let model = this.MODELS.find((m) => m.id === this.config.model);

		if (model) {
			let outputChoices = [];
			for (let i = 1; i <= model.outputs; i++) {
				outputChoices.push({ id: i, label: i.toString() });
			}
		
			let inputChoices = [];
			for (let i = 1; i <= model.inputs; i++) {
				inputChoices.push({ id: i, label: i.toString() });
			}
		
			if (model.actions.includes('setCrosspoint')) {
				actions.setCrosspoint = {
					name: 'Set Crosspoint',
					options: [
						{
							type: 'dropdown',
							label: 'Output',
							id: 'output',
							default: outputChoices[0].id,
							choices: outputChoices,
						},
						{
							type: 'dropdown',
							label: 'Input',
							id: 'input',
							default: inputChoices[0].id,
							choices: inputChoices,
						},
					],
					callback: (action) => {
						model.setCrosspoint(action.options.output, action.options.input);
					}
				}
			}

			//other actions can be added here such as power on off, save scene, etc.
		}

		return actions;
	}
}
