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

describe('KOMDeckStorageMatch', function test_KOMDeckStorageMatch() {

	it('throws error if not string', function() {
		throws(function() {
			mainModule.KOMDeckStorageMatch(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns false if no folder path', function() {
		deepEqual(mainModule.KOMDeckStorageMatch(mainModule.KOMDeckStorageObjectPath('alfa').replace(mainModule.KOMDeckStorageFolderPath(), mainModule.KOMDeckStorageFolderPath().slice(1))), false);
	});

	it('returns false if no object path', function() {
		deepEqual(mainModule.KOMDeckStorageMatch(mainModule.KOMDeckStorageObjectPath('alfa').slice(0, -1)), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.KOMDeckStorageMatch(mainModule.KOMDeckStorageObjectPath('alfa')), true);
	});

});
