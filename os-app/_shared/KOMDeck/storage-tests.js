const { throws, deepEqual } = require('assert');

const mainModule = require('./storage.js');

describe('KOMDeckStoragePath', function testKOMDeckStoragePath() {

	it('returns string', function() {
		deepEqual(mainModule.KOMDeckStoragePath('alfa'), 'kom_documents/alfa');
	});

	it('returns string if blank', function() {
		deepEqual(mainModule.KOMDeckStoragePath(''), 'kom_documents/');
	});

	it('returns string if undefined', function() {
		deepEqual(mainModule.KOMDeckStoragePath(), 'kom_documents/');
	});

});
