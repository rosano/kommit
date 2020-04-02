const { throws, deepEqual } = require('assert');

const mainModule = require('./storage.js');

describe('KMTDocumentStoragePath', function testKMTDocumentStoragePath() {

	it('returns string', function() {
		deepEqual(mainModule.KMTDocumentStoragePath('alfa'), 'kom_documents/alfa');
	});

	it('returns string if blank', function() {
		deepEqual(mainModule.KMTDocumentStoragePath(''), 'kom_documents/');
	});

	it('returns string if undefined', function() {
		deepEqual(mainModule.KMTDocumentStoragePath(), 'kom_documents/');
	});

});
