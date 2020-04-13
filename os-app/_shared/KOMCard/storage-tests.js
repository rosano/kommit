const { throws, deepEqual } = require('assert');

const mainModule = require('./storage.js').default;

describe('KOMCardStorageFolderPath', function test_KOMCardStorageFolderPath() {

	it('returns string', function() {
		deepEqual(mainModule.KOMCardStorageFolderPath(), 'kom_cards/');
	});

});

describe('KOMCardStorageFilePath', function test_KOMCardStorageFilePath() {

	it('throws error if blank', function() {
		throws(function() {
			mainModule.KOMCardStorageFilePath('');
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.KOMCardStorageFilePath('alfa'), 'kom_cards/alfa');
	});

});

