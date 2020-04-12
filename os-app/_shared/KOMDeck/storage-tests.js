const { throws, deepEqual } = require('assert');

const mainModule = require('./storage.js').default;

describe('KOMDeckStorageFolderPath', function testKOMDeckStorageFolderPath() {

	it('returns string', function() {
		deepEqual(mainModule.KOMDeckStorageFolderPath(), 'kom_decks/');
	});

});

describe('KOMDeckStorageFilePath', function testKOMDeckStorageFilePath() {

	it('throws error if blank', function() {
		throws(function() {
			mainModule.KOMDeckStorageFilePath('');
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.KOMDeckStorageFilePath('alfa'), 'kom_decks/alfa');
	});

});

