const { throws, deepEqual } = require('assert');

const mainModule = require('./model.js').default;

const kTesting = {
	StubCardObjectValid() {
		return {
			KOMCardID: 'alfa',
			KOMCardQuestion: '',
			KOMCardAnswer: '',
			KOMCardCreationDate: new Date('2019-02-23T13:56:36Z'),
			KOMCardModificationDate: new Date('2019-02-23T13:56:36Z'),
		};
	},
};

describe('KOMCardModelErrorsFor', function test_KOMCardModelErrorsFor() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.KOMCardModelErrorsFor(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns object if KOMCardID not string', function() {
		deepEqual(mainModule.KOMCardModelErrorsFor(Object.assign(kTesting.StubCardObjectValid(), {
			KOMCardID: null,
		})), {
			KOMCardID: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns object if KOMCardID not filled', function() {
		deepEqual(mainModule.KOMCardModelErrorsFor(Object.assign(kTesting.StubCardObjectValid(), {
			KOMCardID: ' ',
		})), {
			KOMCardID: [
				'KOMErrorNotFilled',
			],
		});
	});

	it('returns object if KOMCardQuestion not string', function() {
		deepEqual(mainModule.KOMCardModelErrorsFor(Object.assign(kTesting.StubCardObjectValid(), {
			KOMCardQuestion: null,
		})), {
			KOMCardQuestion: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns object if KOMCardAnswer not string', function() {
		deepEqual(mainModule.KOMCardModelErrorsFor(Object.assign(kTesting.StubCardObjectValid(), {
			KOMCardAnswer: null,
		})), {
			KOMCardAnswer: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns object if KOMCardCreationDate not date', function() {
		deepEqual(mainModule.KOMCardModelErrorsFor(Object.assign(kTesting.StubCardObjectValid(), {
			KOMCardCreationDate: new Date('alfa'),
		})), {
			KOMCardCreationDate: [
				'KOMErrorNotDate',
			],
		});
	});

	it('returns object if KOMCardModificationDate not date', function() {
		deepEqual(mainModule.KOMCardModelErrorsFor(Object.assign(kTesting.StubCardObjectValid(), {
			KOMCardModificationDate: new Date('alfa'),
		})), {
			KOMCardModificationDate: [
				'KOMErrorNotDate',
			],
		});
	});

	it('returns null', function() {
		deepEqual(mainModule.KOMCardModelErrorsFor(kTesting.StubCardObjectValid()), null);
	});

	context('KOMCardHint', function() {

		it('returns object if not string', function() {
			deepEqual(mainModule.KOMCardModelErrorsFor(Object.assign(kTesting.StubCardObjectValid(), {
				KOMCardHint: null,
			})), {
				KOMCardHint: [
					'KOMErrorNotString',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mainModule.KOMCardModelErrorsFor(Object.assign(kTesting.StubCardObjectValid(), {
				KOMCardHint: 'alfa',
			})), null);
		});

	});

});

describe('KOMCardModelPreJSONSchemaValidate', function test_KOMCardModelPreJSONSchemaValidate() {

	it('returns input', function() {
		deepEqual(mainModule.KOMCardModelPreJSONSchemaValidate({}), {});
	});

	it('returns input with KOMCardCreationDate as string', function() {
		deepEqual(mainModule.KOMCardModelPreJSONSchemaValidate({
			KOMCardCreationDate: new Date('2018-12-09T19:07:01.902Z'),
		}), {
			KOMCardCreationDate: '2018-12-09T19:07:01.902Z',
		});
	});

	it('returns input with KOMCardModificationDate as string', function() {
		deepEqual(mainModule.KOMCardModelPreJSONSchemaValidate({
			KOMCardModificationDate: new Date('2018-12-09T19:07:01.902Z'),
		}), {
			KOMCardModificationDate: '2018-12-09T19:07:01.902Z',
		});
	});

});

describe('KOMCardModelPostJSONParse', function test_KOMCardModelPostJSONParse() {

	it('returns input null', function() {
		deepEqual(mainModule.KOMCardModelPostJSONParse(null), null);
	});

	it('returns input object', function() {
		deepEqual(mainModule.KOMCardModelPostJSONParse({}), {});
	});

	it('returns input with KOMCardCreationDate as date', function() {
		deepEqual(mainModule.KOMCardModelPostJSONParse({
			KOMCardCreationDate: '2018-12-09T19:07:01.902Z',
		}), {
			KOMCardCreationDate: new Date('2018-12-09T19:07:01.902Z'),
		});
	});

	it('returns input with KOMCardModificationDate as date', function() {
		deepEqual(mainModule.KOMCardModelPostJSONParse({
			KOMCardModificationDate: '2018-12-09T19:07:01.902Z',
		}), {
			KOMCardModificationDate: new Date('2018-12-09T19:07:01.902Z'),
		});
	});

});
