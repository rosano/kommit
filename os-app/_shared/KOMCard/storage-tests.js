const { throws, deepEqual } = require('assert');

const mainModule = require('./storage.js');

describe('KOMCardStorageFolderPath', function testKOMCardStorageFolderPath() {

	it('returns string', function() {
		deepEqual(mainModule.KOMCardStorageFolderPath(), 'kom_cards/');
	});

});

describe('KOMCardStorageFilePath', function testKOMCardStorageFilePath() {

	it('throws error if blank', function() {
		throws(function() {
			mainModule.KOMCardStorageFilePath('');
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.KOMCardStorageFilePath('alfa'), 'kom_cards/alfa');
	});

});

