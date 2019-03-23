const {spawn} = require('child_process')

let instance = null;

module.exports = {
	start: async function () {
		return new Promise((resolve, reject) => {
			const child = instance = spawn('yarn', ['serverless', 'offline'])
			child.stdout.on('data', function(data) {
				if(data.toString().indexOf('listening') > -1) {
					resolve() // @todo return anything here?
				} else if(data.toString().indexOf('EADDRINUSE') > -1) {
					reject(new Error('Port is in use'));
				}
			})
		})
	},
	stop: () => instance.kill()
}