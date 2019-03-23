const response = require('./response')
const userList = require('./userList')

module.exports = async function(event) {
	const id = event.pathParameters.id
	const user = userList.find(user => user.id === id)
	if(!user) return response(404)
	return response(200, user);
}