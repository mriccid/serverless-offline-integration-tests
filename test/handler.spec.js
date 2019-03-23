const assert = require('assert');
const request = require('supertest');

const api = request('http://localhost:3000');
const serverless = require('../src/serverless');

before(async function () {
	this.timeout(10000); // give it enough time to start
	await serverless.start()
});

after(async function() {
	await serverless.stop();
})

describe('User API', function() {

	describe('GET /user/{id}', function() {
		it('should return a 404 when requested without an id', function(done) {
			api.get('/user')
				.expect(404)
				.end(done)
		})

		it('should return a 404 when given an id that does not match', function(done) {
			api.get('/user/_1')
				.expect(404)
				.end(done)
		})

		it('should return an existing user if given their id', function(done) {
			api.get('/user/1')
				.expect({id: '1', name: 'Foo'})
				.expect(200)
				.end(done)
		})

	})

	describe('POST /user', function() {
		it('should return a 400 when requested without a payload', function(done) {
			api.post('/user')
				.expect(400)
				.expect({message: 'Missing body'})
				.end(done)
		})
		
		it('should return a 400 when adding a user without a name', function(done) {
			api.post('/user')
				.send({ notName: '1234' })
				.expect(400)
				.expect({message: 'Expected a name'})
				.end(done)
		})

		// @todo setup persistence
		// it('should add a user to the list', async function(done) {
		// 	await api.post('/user')
		// 		.send({ name: 'Baz' })
		// 		.expect(200);

		// 	// @todo test the persistence of user

		// })
	})

});