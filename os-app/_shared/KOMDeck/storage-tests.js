const { throws, deepEqual } = require('assert');

const mainModule = require('./storage.js').default;

describe('KOMDeckStorageFolderPath', function test_KOMDeckStorageFolderPath() {

	it('returns string', function() {
		deepEqual(mainModule.KOMDeckStorageFolderPath(), 'kom_decks/');
	});

});

describe('KOMDeckStorageObjectPath', function test_KOMDeckStorageObjectPath() {

	it('throws error if blank', function() {
		throws(function() {
			mainModule.KOMDeckStorageObjectPath('');
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.KOMDeckStorageObjectPath('alfa'), 'kom_decks/alfa/main');
	});

});

