const { throws, deepEqual } = require('assert');

const mainModule = require('./storage.js');

describe('KMTDocumentStoragePath', function testKMTDocumentStoragePath() {

	it('returns string', function() {
		deepEqual(mainModule.KMTDocumentStoragePath('alfa'), 'kmt_documents/alfa');
	});

	it('returns string if blank', function() {
		deepEqual(mainModule.KMTDocumentStoragePath(''), 'kmt_documents/');
	});

	it('returns string if undefined', function() {
		deepEqual(mainModule.KMTDocumentStoragePath(), 'kmt_documents/');
	});

});
