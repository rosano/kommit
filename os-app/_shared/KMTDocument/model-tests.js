const { throws, deepEqual } = require('assert');

const mainModule = require('./model.js');

const kTesting = {
	StubDocumentObjectValid: function() {
		return {
			KMTDocumentID: 'alfa',
			KMTDocumentName: '',
			KMTDocumentCreationDate: new Date('2019-02-23T13:56:36Z'),
			KMTDocumentModificationDate: new Date('2019-02-23T13:56:36Z'),
		};
	},
};

describe('KMTDocumentModelErrorsFor', function testKMTDocumentModelErrorsFor() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.KMTDocumentModelErrorsFor(null);
		}, /KMTErrorInputNotValid/);
	});

	it('returns object if KMTDocumentID not string', function() {
		deepEqual(mainModule.KMTDocumentModelErrorsFor(Object.assign(kTesting.StubDocumentObjectValid(), {
			KMTDocumentID: null,
		})), {
			KMTDocumentID: [
				'KMTErrorNotString',
			],
		});
	});

	it('returns object if KMTDocumentID not filled', function() {
		deepEqual(mainModule.KMTDocumentModelErrorsFor(Object.assign(kTesting.StubDocumentObjectValid(), {
			KMTDocumentID: ' ',
		})), {
			KMTDocumentID: [
				'KMTErrorNotFilled',
			],
		});
	});

	it('returns object if KMTDocumentName not string', function() {
		deepEqual(mainModule.KMTDocumentModelErrorsFor(Object.assign(kTesting.StubDocumentObjectValid(), {
			KMTDocumentName: null,
		})), {
			KMTDocumentName: [
				'KMTErrorNotString',
			],
		});
	});

	it('returns object if KMTDocumentCreationDate not date', function() {
		deepEqual(mainModule.KMTDocumentModelErrorsFor(Object.assign(kTesting.StubDocumentObjectValid(), {
			KMTDocumentCreationDate: new Date('alfa'),
		})), {
			KMTDocumentCreationDate: [
				'KMTErrorNotDate',
			],
		});
	});

	it('returns object if KMTDocumentModificationDate not date', function() {
		deepEqual(mainModule.KMTDocumentModelErrorsFor(Object.assign(kTesting.StubDocumentObjectValid(), {
			KMTDocumentModificationDate: new Date('alfa'),
		})), {
			KMTDocumentModificationDate: [
				'KMTErrorNotDate',
			],
		});
	});

	it('returns null', function() {
		deepEqual(mainModule.KMTDocumentModelErrorsFor(kTesting.StubDocumentObjectValid()), null);
	});

});

describe('KMTDocumentModelPreJSONSchemaValidate', function testKMTDocumentModelPreJSONSchemaValidate() {

	it('returns input', function() {
		deepEqual(mainModule.KMTDocumentModelPreJSONSchemaValidate({}), {});
	});

	it('returns input with KMTDocumentCreationDate as string', function() {
		deepEqual(mainModule.KMTDocumentModelPreJSONSchemaValidate({
			KMTDocumentCreationDate: new Date('2018-12-09T19:07:01.902Z'),
		}), {
			KMTDocumentCreationDate: '2018-12-09T19:07:01.902Z',
		});
	});

	it('returns input with KMTDocumentModificationDate as string', function() {
		deepEqual(mainModule.KMTDocumentModelPreJSONSchemaValidate({
			KMTDocumentModificationDate: new Date('2018-12-09T19:07:01.902Z'),
		}), {
			KMTDocumentModificationDate: '2018-12-09T19:07:01.902Z',
		});
	});

});

describe('KMTDocumentModelPostJSONParse', function testKMTDocumentModelPostJSONParse() {

	it('returns input null', function() {
		deepEqual(mainModule.KMTDocumentModelPostJSONParse(null), null);
	});

	it('returns input object', function() {
		deepEqual(mainModule.KMTDocumentModelPostJSONParse({}), {});
	});

	it('returns input with KMTDocumentCreationDate as date', function() {
		deepEqual(mainModule.KMTDocumentModelPostJSONParse({
			KMTDocumentCreationDate: '2018-12-09T19:07:01.902Z',
		}), {
			KMTDocumentCreationDate: new Date('2018-12-09T19:07:01.902Z'),
		});
	});

	it('returns input with KMTDocumentModificationDate as date', function() {
		deepEqual(mainModule.KMTDocumentModelPostJSONParse({
			KMTDocumentModificationDate: '2018-12-09T19:07:01.902Z',
		}), {
			KMTDocumentModificationDate: new Date('2018-12-09T19:07:01.902Z'),
		});
	});

});
