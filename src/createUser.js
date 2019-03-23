const response = require('./response')

module.exports = async function(event) {
	if(!event.body) return response(400, {message: 'Missing body'});
	const user = JSON.parse(event.body);
	if(!user.name) return response(400, {message: 'Expected a name'});
	// @todo persist the user
	return response(200);

}