const { throws, deepEqual } = require('assert');

const mainModule = require('./storage.js');

describe('KOMDeckStoragePath', function testKOMDeckStoragePath() {

	it('returns string', function() {
		deepEqual(mainModule.KOMDeckStoragePath('alfa'), 'kom_decks/alfa');
	});

	it('returns string if blank', function() {
		deepEqual(mainModule.KOMDeckStoragePath(''), 'kom_decks/');
	});

	it('returns string if undefined', function() {
		deepEqual(mainModule.KOMDeckStoragePath(), 'kom_decks/');
	});

});
