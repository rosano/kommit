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

	it('throws error if not object', function () {
		throws(function () {
			mainModule.KOMDeckModelErrorsFor(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns object if KOMDeckID not string', function () {
		deepEqual(mainModule.KOMDeckModelErrorsFor(Object.assign(kTesting.StubDeckObjectValid(), {
			KOMDeckID: null,
		})), {
			KOMDeckID: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns object if KOMDeckID not filled', function () {
		deepEqual(mainModule.KOMDeckModelErrorsFor(Object.assign(kTesting.StubDeckObjectValid(), {
			KOMDeckID: ' ',
		})), {
			KOMDeckID: [
				'KOMErrorNotFilled',
			],
		});
	});

	it('returns object if KOMDeckName not string', function () {
		deepEqual(mainModule.KOMDeckModelErrorsFor(Object.assign(kTesting.StubDeckObjectValid(), {
			KOMDeckName: null,
		})), {
			KOMDeckName: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns object if KOMDeckCreationDate not date', function () {
		deepEqual(mainModule.KOMDeckModelErrorsFor(Object.assign(kTesting.StubDeckObjectValid(), {
			KOMDeckCreationDate: new Date('alfa'),
		})), {
			KOMDeckCreationDate: [
				'KOMErrorNotDate',
			],
		});
	});

	it('returns object if KOMDeckModificationDate not date', function () {
		deepEqual(mainModule.KOMDeckModelErrorsFor(Object.assign(kTesting.StubDeckObjectValid(), {
			KOMDeckModificationDate: new Date('alfa'),
		})), {
			KOMDeckModificationDate: [
				'KOMErrorNotDate',
			],
		});
	});

	it('returns null', function () {
		deepEqual(mainModule.KOMDeckModelErrorsFor(kTesting.StubDeckObjectValid()), null);
	});

	context('KOMDeckAudioIsEnabled', function () {

		it('returns object if not boolean', function () {
			deepEqual(mainModule.KOMDeckModelErrorsFor(Object.assign(kTesting.StubDeckObjectValid(), {
				KOMDeckAudioIsEnabled: null,
			})), {
				KOMDeckAudioIsEnabled: [
					'KOMErrorNotBoolean',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mainModule.KOMDeckModelErrorsFor(Object.assign(kTesting.StubDeckObjectValid(), {
				KOMDeckAudioIsEnabled: true,
			})), null);
		});

	});

	context('KOMDeckFrontSpeechIsEnabled', function () {

		it('returns object if not boolean', function () {
			deepEqual(mainModule.KOMDeckModelErrorsFor(Object.assign(kTesting.StubDeckObjectValid(), {
				KOMDeckFrontSpeechIsEnabled: null,
			})), {
				KOMDeckFrontSpeechIsEnabled: [
					'KOMErrorNotBoolean',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mainModule.KOMDeckModelErrorsFor(Object.assign(kTesting.StubDeckObjectValid(), {
				KOMDeckFrontSpeechIsEnabled: true,
			})), null);
		});

	});

	context('KOMDeckRearSpeechIsEnabled', function () {

		it('returns object if not boolean', function () {
			deepEqual(mainModule.KOMDeckModelErrorsFor(Object.assign(kTesting.StubDeckObjectValid(), {
				KOMDeckRearSpeechIsEnabled: null,
			})), {
				KOMDeckRearSpeechIsEnabled: [
					'KOMErrorNotBoolean',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mainModule.KOMDeckModelErrorsFor(Object.assign(kTesting.StubDeckObjectValid(), {
				KOMDeckFrontSpeechIsEnabled: true,
			})), null);
		});

	});

	context('KOMDeckFrontLanguageCode', function () {

		it('returns object if not string', function () {
			deepEqual(mainModule.KOMDeckModelErrorsFor(Object.assign(kTesting.StubDeckObjectValid(), {
				KOMDeckFrontLanguageCode: null,
			})), {
				KOMDeckFrontLanguageCode: [
					'KOMErrorNotString',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mainModule.KOMDeckModelErrorsFor(Object.assign(kTesting.StubDeckObjectValid(), {
				KOMDeckFrontLanguageCode: 'en',
			})), null);
		});

	});

	context('KOMDeckRearLanguageCode', function () {

		it('returns object if not string', function () {
			deepEqual(mainModule.KOMDeckModelErrorsFor(Object.assign(kTesting.StubDeckObjectValid(), {
				KOMDeckRearLanguageCode: null,
			})), {
				KOMDeckRearLanguageCode: [
					'KOMErrorNotString',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mainModule.KOMDeckModelErrorsFor(Object.assign(kTesting.StubDeckObjectValid(), {
				KOMDeckRearLanguageCode: 'en',
			})), null);
		});

	});

	context('KOMDeckIsForwardOnly', function () {

		it('returns object if not boolean', function () {
			deepEqual(mainModule.KOMDeckModelErrorsFor(Object.assign(kTesting.StubDeckObjectValid(), {
				KOMDeckIsForwardOnly: null,
			})), {
				KOMDeckIsForwardOnly: [
					'KOMErrorNotBoolean',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mainModule.KOMDeckModelErrorsFor(Object.assign(kTesting.StubDeckObjectValid(), {
				KOMDeckIsForwardOnly: true,
			})), null);
		});

	});

	context('$KOMDeckCards', function () {

		it('returns object if not array', function () {
			deepEqual(mainModule.KOMDeckModelErrorsFor(Object.assign(kTesting.StubDeckObjectValid(), {
				$KOMDeckCards: {},
			})), {
				$KOMDeckCards: [
					'KOMErrorNotArray',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mainModule.KOMDeckModelErrorsFor(Object.assign(kTesting.StubDeckObjectValid(), {
				$KOMDeckCards: [],
			})), null);
		});

	});

	context('KOMOptionValidateIfNotPresent', function () {

		it('returns object if not valid', function () {
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
