const { combineRgb } = require('@companion-module/base')

module.exports = {
	getPresets: function () {
		let presets = {};

		const ColorWhite = combineRgb(255, 255, 255);
		const ColorBlack = combineRgb(0, 0, 0);
		const ColorRed = combineRgb(200, 0, 0);
		const ColorGreen = combineRgb(0, 200, 0);

		let model = this.MODELS.find((m) => m.id === this.config.model);

		if (model) {
			if (model.actions.includes('setCrosspoint')) {
				for (let i = 1; i <= model.outputs; i++) {
					for (let x = 1; x <= model.inputs; x++) {
						presets[`outpu${i}>input${x}`] = {
							type: 'button',
							category: 'Routing',
							name: 'Set Crosspoint',
							style: {
								style: 'text',
								text: `Output ${i} > Input ${x}`,
								size: '14',
								color: ColorWhite,
								bgcolor: ColorBlack,
							},
							steps: [
								{
									down: [
										{
											actionId: 'setCrosspoint',
											options: {
												input: x,
												output: i,
											},
										},
									],
									up: [],
								},
							],
							feedbacks: [],
						};
					}	
				}
			}
		}

		return presets;
	}
}