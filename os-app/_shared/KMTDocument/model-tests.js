const { throws, deepEqual } = require('assert');

const mainModule = require('./model.js');

const kTesting = {
	StubDocumentObjectValid: function() {
		return {
			KOMDocumentID: 'alfa',
			KOMDocumentName: '',
			KOMDocumentCreationDate: new Date('2019-02-23T13:56:36Z'),
			KOMDocumentModificationDate: new Date('2019-02-23T13:56:36Z'),
		};
	},
};

describe('KOMDocumentModelErrorsFor', function testKOMDocumentModelErrorsFor() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.KOMDocumentModelErrorsFor(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns object if KOMDocumentID not string', function() {
		deepEqual(mainModule.KOMDocumentModelErrorsFor(Object.assign(kTesting.StubDocumentObjectValid(), {
			KOMDocumentID: null,
		})), {
			KOMDocumentID: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns object if KOMDocumentID not filled', function() {
		deepEqual(mainModule.KOMDocumentModelErrorsFor(Object.assign(kTesting.StubDocumentObjectValid(), {
			KOMDocumentID: ' ',
		})), {
			KOMDocumentID: [
				'KOMErrorNotFilled',
			],
		});
	});

	it('returns object if KOMDocumentName not string', function() {
		deepEqual(mainModule.KOMDocumentModelErrorsFor(Object.assign(kTesting.StubDocumentObjectValid(), {
			KOMDocumentName: null,
		})), {
			KOMDocumentName: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns object if KOMDocumentCreationDate not date', function() {
		deepEqual(mainModule.KOMDocumentModelErrorsFor(Object.assign(kTesting.StubDocumentObjectValid(), {
			KOMDocumentCreationDate: new Date('alfa'),
		})), {
			KOMDocumentCreationDate: [
				'KOMErrorNotDate',
			],
		});
	});

	it('returns object if KOMDocumentModificationDate not date', function() {
		deepEqual(mainModule.KOMDocumentModelErrorsFor(Object.assign(kTesting.StubDocumentObjectValid(), {
			KOMDocumentModificationDate: new Date('alfa'),
		})), {
			KOMDocumentModificationDate: [
				'KOMErrorNotDate',
			],
		});
	});

	it('returns null', function() {
		deepEqual(mainModule.KOMDocumentModelErrorsFor(kTesting.StubDocumentObjectValid()), null);
	});

});

describe('KOMDocumentModelPreJSONSchemaValidate', function testKOMDocumentModelPreJSONSchemaValidate() {

	it('returns input', function() {
		deepEqual(mainModule.KOMDocumentModelPreJSONSchemaValidate({}), {});
	});

	it('returns input with KOMDocumentCreationDate as string', function() {
		deepEqual(mainModule.KOMDocumentModelPreJSONSchemaValidate({
			KOMDocumentCreationDate: new Date('2018-12-09T19:07:01.902Z'),
		}), {
			KOMDocumentCreationDate: '2018-12-09T19:07:01.902Z',
		});
	});

	it('returns input with KOMDocumentModificationDate as string', function() {
		deepEqual(mainModule.KOMDocumentModelPreJSONSchemaValidate({
			KOMDocumentModificationDate: new Date('2018-12-09T19:07:01.902Z'),
		}), {
			KOMDocumentModificationDate: '2018-12-09T19:07:01.902Z',
		});
	});

});

describe('KOMDocumentModelPostJSONParse', function testKOMDocumentModelPostJSONParse() {

	it('returns input null', function() {
		deepEqual(mainModule.KOMDocumentModelPostJSONParse(null), null);
	});

	it('returns input object', function() {
		deepEqual(mainModule.KOMDocumentModelPostJSONParse({}), {});
	});

	it('returns input with KOMDocumentCreationDate as date', function() {
		deepEqual(mainModule.KOMDocumentModelPostJSONParse({
			KOMDocumentCreationDate: '2018-12-09T19:07:01.902Z',
		}), {
			KOMDocumentCreationDate: new Date('2018-12-09T19:07:01.902Z'),
		});
	});

	it('returns input with KOMDocumentModificationDate as date', function() {
		deepEqual(mainModule.KOMDocumentModelPostJSONParse({
			KOMDocumentModificationDate: '2018-12-09T19:07:01.902Z',
		}), {
			KOMDocumentModificationDate: new Date('2018-12-09T19:07:01.902Z'),
		});
	});

});
