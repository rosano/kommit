const { throws, deepEqual } = require('assert');

const mainModule = require('./storage.js').default;

describe('KOMDeckStorageCollectionPath', function test_KOMDeckStorageCollectionPath() {

	it('returns string', function() {
		deepEqual(mainModule.KOMDeckStorageCollectionPath(), 'kom_decks/');
	});

});

describe('KOMDeckStorageFolderPath', function test_KOMDeckStorageFolderPath() {

	it('throws error if blank', function() {
		throws(function() {
			mainModule.KOMDeckStorageFolderPath('');
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.KOMDeckStorageFolderPath('alfa'), mainModule.KOMDeckStorageCollectionPath() + 'alfa/');
	});

});

describe('KOMDeckStorageObjectPath', function test_KOMDeckStorageObjectPath() {

	it('throws error if blank', function() {
		throws(function() {
			mainModule.KOMDeckStorageObjectPath('');
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.KOMDeckStorageObjectPath('alfa'), mainModule.KOMDeckStorageFolderPath('alfa') + 'main');
	});

});

describe('KOMDeckStorageMatch', function test_KOMDeckStorageMatch() {

	it('throws error if not string', function() {
		throws(function() {
			mainModule.KOMDeckStorageMatch(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns false if no KOMDeckStorageCollectionPath', function() {
		deepEqual(mainModule.KOMDeckStorageMatch(mainModule.KOMDeckStorageObjectPath('alfa').replace(mainModule.KOMDeckStorageCollectionPath(), mainModule.KOMDeckStorageCollectionPath().slice(1))), false);
	});

	it('returns false if no KOMDeckStorageObjectPath', function() {
		deepEqual(mainModule.KOMDeckStorageMatch(mainModule.KOMDeckStorageObjectPath('alfa').slice(0, -1)), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.KOMDeckStorageMatch(mainModule.KOMDeckStorageObjectPath('alfa')), true);
	});

});
