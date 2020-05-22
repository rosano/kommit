const { throws, deepEqual } = require('assert');

const mainModule = require('./model.js').default;

const kTesting = {
	StubDeckObjectValid() {
		return {
			KOMDeckID: 'alfa',
			KOMDeckName: '',
			KOMDeckCreationDate: new Date('2019-02-23T13:56:36Z'),
			KOMDeckModificationDate: new Date('2019-02-23T13:56:36Z'),
		};
	},
};

describe('KOMDeckModelErrorsFor', function test_KOMDeckModelErrorsFor() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.KOMDeckModelErrorsFor(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns object if KOMDeckID not string', function() {
		deepEqual(mainModule.KOMDeckModelErrorsFor(Object.assign(kTesting.StubDeckObjectValid(), {
			KOMDeckID: null,
		})), {
			KOMDeckID: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns object if KOMDeckID not filled', function() {
		deepEqual(mainModule.KOMDeckModelErrorsFor(Object.assign(kTesting.StubDeckObjectValid(), {
			KOMDeckID: ' ',
		})), {
			KOMDeckID: [
				'KOMErrorNotFilled',
			],
		});
	});

	it('returns object if KOMDeckName not string', function() {
		deepEqual(mainModule.KOMDeckModelErrorsFor(Object.assign(kTesting.StubDeckObjectValid(), {
			KOMDeckName: null,
		})), {
			KOMDeckName: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns object if KOMDeckCreationDate not date', function() {
		deepEqual(mainModule.KOMDeckModelErrorsFor(Object.assign(kTesting.StubDeckObjectValid(), {
			KOMDeckCreationDate: new Date('alfa'),
		})), {
			KOMDeckCreationDate: [
				'KOMErrorNotDate',
			],
		});
	});

	it('returns object if KOMDeckModificationDate not date', function() {
		deepEqual(mainModule.KOMDeckModelErrorsFor(Object.assign(kTesting.StubDeckObjectValid(), {
			KOMDeckModificationDate: new Date('alfa'),
		})), {
			KOMDeckModificationDate: [
				'KOMErrorNotDate',
			],
		});
	});

	it('returns null', function() {
		deepEqual(mainModule.KOMDeckModelErrorsFor(kTesting.StubDeckObjectValid()), null);
	});

	context('KOMDeckIsForwardOnly', function() {

		it('returns object if not boolean', function() {
			deepEqual(mainModule.KOMDeckModelErrorsFor(Object.assign(kTesting.StubDeckObjectValid(), {
				KOMDeckIsForwardOnly: null,
			})), {
				KOMDeckIsForwardOnly: [
					'KOMErrorNotBoolean',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mainModule.KOMDeckModelErrorsFor(Object.assign(kTesting.StubDeckObjectValid(), {
				KOMDeckIsForwardOnly: true,
			})), null);
		});

	});

	context('KOMDeckFrontLanguageCode', function() {

		it('returns object if not string', function() {
			deepEqual(mainModule.KOMDeckModelErrorsFor(Object.assign(kTesting.StubDeckObjectValid(), {
				KOMDeckFrontLanguageCode: null,
			})), {
				KOMDeckFrontLanguageCode: [
					'KOMErrorNotString',
				],
			});
		});

		it('returns object if not filled', function() {
			deepEqual(mainModule.KOMDeckModelErrorsFor(Object.assign(kTesting.StubDeckObjectValid(), {
				KOMDeckFrontLanguageCode: ' ',
			})), {
				KOMDeckFrontLanguageCode: [
					'KOMErrorNotFilled',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mainModule.KOMDeckModelErrorsFor(Object.assign(kTesting.StubDeckObjectValid(), {
				KOMDeckFrontLanguageCode: 'en',
			})), null);
		});

	});

	context('KOMDeckRearLanguageCode', function() {

		it('returns object if not string', function() {
			deepEqual(mainModule.KOMDeckModelErrorsFor(Object.assign(kTesting.StubDeckObjectValid(), {
				KOMDeckRearLanguageCode: null,
			})), {
				KOMDeckRearLanguageCode: [
					'KOMErrorNotString',
				],
			});
		});

		it('returns object if not filled', function() {
			deepEqual(mainModule.KOMDeckModelErrorsFor(Object.assign(kTesting.StubDeckObjectValid(), {
				KOMDeckRearLanguageCode: ' ',
			})), {
				KOMDeckRearLanguageCode: [
					'KOMErrorNotFilled',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mainModule.KOMDeckModelErrorsFor(Object.assign(kTesting.StubDeckObjectValid(), {
				KOMDeckRearLanguageCode: 'en',
			})), null);
		});

	});

	context('$KOMDeckCards', function() {

		it('returns object if not array', function() {
			deepEqual(mainModule.KOMDeckModelErrorsFor(Object.assign(kTesting.StubDeckObjectValid(), {
				$KOMDeckCards: {},
			})), {
				$KOMDeckCards: [
					'KOMErrorNotArray',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mainModule.KOMDeckModelErrorsFor(Object.assign(kTesting.StubDeckObjectValid(), {
				$KOMDeckCards: [],
			})), null);
		});

	});

	context('$KOMDeckSpacings', function() {

		it('returns object if not array', function() {
			deepEqual(mainModule.KOMDeckModelErrorsFor(Object.assign(kTesting.StubDeckObjectValid(), {
				$KOMDeckSpacings: {},
			})), {
				$KOMDeckSpacings: [
					'KOMErrorNotArray',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mainModule.KOMDeckModelErrorsFor(Object.assign(kTesting.StubDeckObjectValid(), {
				$KOMDeckSpacings: [],
			})), null);
		});

	});

	context('KOMOptionValidateIfNotPresent', function() {

		it('returns object if not valid', function() {
			deepEqual(Object.keys(mainModule.KOMDeckModelErrorsFor({}, {
				KOMOptionValidateIfNotPresent: true,
			})), [
				'KOMDeckID',
				'KOMDeckName',
				'KOMDeckCreationDate',
				'KOMDeckModificationDate',
			]);
		});

	});

});

describe('KOMDeckModelPreJSONSchemaValidate', function test_KOMDeckModelPreJSONSchemaValidate() {

	it('returns input', function() {
		deepEqual(mainModule.KOMDeckModelPreJSONSchemaValidate({}), {});
	});

	it('returns input with KOMDeckCreationDate as string', function() {
		deepEqual(mainModule.KOMDeckModelPreJSONSchemaValidate({
			KOMDeckCreationDate: new Date('2018-12-09T19:07:01.902Z'),
		}), {
			KOMDeckCreationDate: '2018-12-09T19:07:01.902Z',
		});
	});

	it('returns input with KOMDeckModificationDate as string', function() {
		deepEqual(mainModule.KOMDeckModelPreJSONSchemaValidate({
			KOMDeckModificationDate: new Date('2018-12-09T19:07:01.902Z'),
		}), {
			KOMDeckModificationDate: '2018-12-09T19:07:01.902Z',
		});
	});

});

describe('KOMDeckModelPostJSONParse', function test_KOMDeckModelPostJSONParse() {

	it('returns input null', function() {
		deepEqual(mainModule.KOMDeckModelPostJSONParse(null), null);
	});

	it('returns input object', function() {
		deepEqual(mainModule.KOMDeckModelPostJSONParse({}), {});
	});

	it('returns input with KOMDeckCreationDate as date', function() {
		deepEqual(mainModule.KOMDeckModelPostJSONParse({
			KOMDeckCreationDate: '2018-12-09T19:07:01.902Z',
		}), {
			KOMDeckCreationDate: new Date('2018-12-09T19:07:01.902Z'),
		});
	});

	it('returns input with KOMDeckModificationDate as date', function() {
		deepEqual(mainModule.KOMDeckModelPostJSONParse({
			KOMDeckModificationDate: '2018-12-09T19:07:01.902Z',
		}), {
			KOMDeckModificationDate: new Date('2018-12-09T19:07:01.902Z'),
		});
	});

});
