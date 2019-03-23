module.exports = function (statusCode, body) {
	return Object.assign(
		{}, 
		{
			statusCode,
			headers: {
				'Content-Type': 'application/json' 
			}
		}, 
		body ? {body: JSON.stringify(body)} : {}
	)
}