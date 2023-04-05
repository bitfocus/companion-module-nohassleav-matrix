module.exports = {
	MODELS: [
		/*{
			id: '8x8',
			label: '8x8 HDMI Matrix - 4K 18gbps',
			port: 23,
			actions: [
				'setCrosspoint'
			],
			inputs: 8,
			outputs: 8,
		},*/
		{
			id: '4x4mini',
			label: '4x4 HDMI Mini Matrix - 4K 18gbps',
			port: 23,
			actions: [
				'setCrosspoint'
			],
			inputs: 4,
			outputs: 4,
			setCrosspoint: function(output, input) {
				let outputZero = output - 1;
				let inputZero = input - 1;
				let cmd = `@W 0${outputZero} 0${inputZero} #`
				let buf = Buffer.from(cmd);
			
				if (this.socket) {
					this.socket.send(buf);
				}
			}
		},
		{
			id: '4x4',
			label: '4x4 HDMI Matrix - 4K 18gbps',
			port: 23,
			actions: [
				'setCrosspoint'
			],
			inputs: 4,
			outputs: 4,
			setCrosspoint: function(output, input) {
				// this protocol is identical to the cablematters hdmi matrix
				let inputHex = parseInt(input).toString(16).padStart(2, '0');
				let outputHex = parseInt(output).toString(16).padStart(2, '0');
				let cmdRaw = `A55B0203${inputHex}00${outputHex}0000000000`;

				let hexAdded = 0xa5 + 0x5b + 0x02 + 0x03 + parseInt(input) + 0x00 + parseInt(output) + 0x00 + 0x00 + 0x00 + 0x00 + 0x00;

				let checksumByte = 0x100;

				let checksum = (checksumByte - hexAdded) & 0xff;

				let cmd = cmdRaw + checksum.toString(16);

				let buf = Buffer.from(cmd, 'hex');

				if (this.socket) {
					this.socket.send(buf);
				}
			}
		},
		{
			id: '4x4hdbaset',
			label: '4x4 HDbaseT Matrix - 4K 18gbps',
			port: 23,
			actions: [
				'setCrosspoint'
			],
			inputs: 4,
			outputs: 4,
			setCrosspoint: function(output, input) {
				// this protocol is identical to the cablematters hdmi matrix
				let inputHex = parseInt(input).toString(16).padStart(2, '0');
				let outputHex = parseInt(output).toString(16).padStart(2, '0');
				let cmdRaw = `A55B0203${inputHex}00${outputHex}0000000000`;

				let hexAdded = 0xa5 + 0x5b + 0x02 + 0x03 + parseInt(input) + 0x00 + parseInt(output) + 0x00 + 0x00 + 0x00 + 0x00 + 0x00;

				let checksumByte = 0x100;

				let checksum = (checksumByte - hexAdded) & 0xff;

				let cmd = cmdRaw + checksum.toString(16);

				let buf = Buffer.from(cmd, 'hex');

				if (this.socket) {
					this.socket.send(buf);
				}
			}
		},
		/*{
			id: '8x8seamless',
			label: '8x8 HDMI Seamless Matrix - 4K',
			port: 23,
			actions: [
				'setCrosspoint'
			],
			inputs: 8,
			outputs: 8,
			setCrosspoint: function(output, input) {
			}
		},*/
		{
			id: '8x8hdbaset',
			label: '8x8 HDbaset Matrix - 4K 18gbps',
			port: 23,
			actions: [
				'setCrosspoint'
			],
			inputs: 8,
			outputs: 8,
			setCrosspoint: function(output, input) {
				// this protocol is identical to the cablematters hdmi matrix
				let inputHex = parseInt(input).toString(16).padStart(2, '0');
				let outputHex = parseInt(output).toString(16).padStart(2, '0');
				let cmdRaw = `A55B0203${inputHex}00${outputHex}0000000000`;

				let hexAdded = 0xa5 + 0x5b + 0x02 + 0x03 + parseInt(input) + 0x00 + parseInt(output) + 0x00 + 0x00 + 0x00 + 0x00 + 0x00;

				let checksumByte = 0x100;

				let checksum = (checksumByte - hexAdded) & 0xff;

				let cmd = cmdRaw + checksum.toString(16);

				let buf = Buffer.from(cmd, 'hex');

				if (this.socket) {
					this.socket.send(buf);
				}
			}
		},
		{
			id: '8x16hdbaset',
			label: '8x16 HDbaset 4K Matrix - 4K',
			port: 23,
			actions: [
				'setCrosspoint'
			],
			inputs: 8,
			outputs: 16,
			setCrosspoint: function(output, input) {
				// this protocol is identical to the cablematters hdmi matrix
				let inputHex = parseInt(input).toString(16).padStart(2, '0');
				let outputHex = parseInt(output).toString(16).padStart(2, '0');
				let cmdRaw = `A55B0203${inputHex}00${outputHex}0000000000`;

				let hexAdded = 0xa5 + 0x5b + 0x02 + 0x03 + parseInt(input) + 0x00 + parseInt(output) + 0x00 + 0x00 + 0x00 + 0x00 + 0x00;

				let checksumByte = 0x100;

				let checksum = (checksumByte - hexAdded) & 0xff;

				let cmd = cmdRaw + checksum.toString(16);

				let buf = Buffer.from(cmd, 'hex');

				if (this.socket) {
					this.socket.send(buf);
				}
			}
		},
		{
			id: '8x16hdbasetarc',
			label: '8x16 HDbaset 4K HDR ARC Matrix - 4K',
			port: 23,
			actions: [
				'setCrosspoint'
			],
			inputs: 8,
			outputs: 16,
			setCrosspoint: function(output, input) {
				let cmd = `s ${input} av ${output}!`
				let buf = Buffer.from(cmd);
			
				if (this.socket) {
					this.socket.send(buf);
				}
			}
		},
		{
			id: '16x16',
			label: '16x16 HDMI Matrix - 4K',
			port: 8000,
			actions: [
				'setCrosspoint'
			],
			inputs: 16,
			outputs: 16,
			setCrosspoint: function(output, input) {
				let cmd = `s ${input} av ${output}!`
				let buf = Buffer.from(cmd);
			
				if (this.socket) {
					this.socket.send(buf);
				}
			}
		},
	]
}