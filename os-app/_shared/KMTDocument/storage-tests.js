const { throws, deepEqual } = require('assert');

const mainModule = require('./storage.js');

describe('KOMDocumentStoragePath', function testKOMDocumentStoragePath() {

	it('returns string', function() {
		deepEqual(mainModule.KOMDocumentStoragePath('alfa'), 'kom_documents/alfa');
	});

	it('returns string if blank', function() {
		deepEqual(mainModule.KOMDocumentStoragePath(''), 'kom_documents/');
	});

	it('returns string if undefined', function() {
		deepEqual(mainModule.KOMDocumentStoragePath(), 'kom_documents/');
	});

});
