const { throws, deepEqual } = require('assert');

const mainModule = require('./model.js').default;

const kTesting = {
	StubCardObjectValid() {
		return {
			KOMCardID: 'alfa',
			KOMCardDeckID: 'bravo',
			KOMCardFrontText: '',
			KOMCardRearText: '',
			KOMCardCreationDate: new Date('2019-02-23T13:56:36Z'),
			KOMCardModificationDate: new Date('2019-02-23T13:56:36Z'),
		};
	},
};

describe('KOMCardModelErrorsFor', function test_KOMCardModelErrorsFor() {

	it('throws error if not object', function () {
		throws(function () {
			mainModule.KOMCardModelErrorsFor(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns object if KOMCardID not string', function () {
		deepEqual(mainModule.KOMCardModelErrorsFor(Object.assign(kTesting.StubCardObjectValid(), {
			KOMCardID: null,
		})), {
			KOMCardID: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns object if KOMCardID not filled', function () {
		deepEqual(mainModule.KOMCardModelErrorsFor(Object.assign(kTesting.StubCardObjectValid(), {
			KOMCardID: ' ',
		})), {
			KOMCardID: [
				'KOMErrorNotFilled',
			],
		});
	});

	it('returns object if KOMCardDeckID not string', function () {
		deepEqual(mainModule.KOMCardModelErrorsFor(Object.assign(kTesting.StubCardObjectValid(), {
			KOMCardDeckID: null,
		})), {
			KOMCardDeckID: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns object if KOMCardDeckID not filled', function () {
		deepEqual(mainModule.KOMCardModelErrorsFor(Object.assign(kTesting.StubCardObjectValid(), {
			KOMCardDeckID: ' ',
		})), {
			KOMCardDeckID: [
				'KOMErrorNotFilled',
			],
		});
	});

	it('returns object if KOMCardFrontText not string', function () {
		deepEqual(mainModule.KOMCardModelErrorsFor(Object.assign(kTesting.StubCardObjectValid(), {
			KOMCardFrontText: null,
		})), {
			KOMCardFrontText: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns object if KOMCardRearText not string', function () {
		deepEqual(mainModule.KOMCardModelErrorsFor(Object.assign(kTesting.StubCardObjectValid(), {
			KOMCardRearText: null,
		})), {
			KOMCardRearText: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns object if KOMCardCreationDate not date', function () {
		deepEqual(mainModule.KOMCardModelErrorsFor(Object.assign(kTesting.StubCardObjectValid(), {
			KOMCardCreationDate: new Date('alfa'),
		})), {
			KOMCardCreationDate: [
				'KOMErrorNotDate',
			],
		});
	});

	it('returns object if KOMCardModificationDate not date', function () {
		deepEqual(mainModule.KOMCardModelErrorsFor(Object.assign(kTesting.StubCardObjectValid(), {
			KOMCardModificationDate: new Date('alfa'),
		})), {
			KOMCardModificationDate: [
				'KOMErrorNotDate',
			],
		});
	});

	it('returns null', function () {
		deepEqual(mainModule.KOMCardModelErrorsFor(kTesting.StubCardObjectValid()), null);
	});

	context('KOMCardNotes', function () {

		it('returns object if not string', function () {
			deepEqual(mainModule.KOMCardModelErrorsFor(Object.assign(kTesting.StubCardObjectValid(), {
				KOMCardNotes: null,
			})), {
				KOMCardNotes: [
					'KOMErrorNotString',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mainModule.KOMCardModelErrorsFor(Object.assign(kTesting.StubCardObjectValid(), {
				KOMCardNotes: 'alfa',
			})), null);
		});

	});

	context('KOMCardFrontAudio', function () {

		it('returns object if not boolean', function () {
			deepEqual(mainModule.KOMCardModelErrorsFor(Object.assign(kTesting.StubCardObjectValid(), {
				KOMCardFrontAudio: 'true',
			})), {
				KOMCardFrontAudio: [
					'KOMErrorNotBoolean',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mainModule.KOMCardModelErrorsFor(Object.assign(kTesting.StubCardObjectValid(), {
				KOMCardFrontAudio: true,
			})), null);
		});

	});

	context('KOMCardRearAudio', function () {

		it('returns object if not boolean', function () {
			deepEqual(mainModule.KOMCardModelErrorsFor(Object.assign(kTesting.StubCardObjectValid(), {
				KOMCardRearAudio: 'true',
			})), {
				KOMCardRearAudio: [
					'KOMErrorNotBoolean',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mainModule.KOMCardModelErrorsFor(Object.assign(kTesting.StubCardObjectValid(), {
				KOMCardRearAudio: true,
			})), null);
		});

	});

	context('KOMCardTags', function () {

		it('returns object if not array', function () {
			deepEqual(mainModule.KOMCardModelErrorsFor(Object.assign(kTesting.StubCardObjectValid(), {
				KOMCardTags: null,
			})), {
				KOMCardTags: [
					'KOMErrorNotArray',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mainModule.KOMCardModelErrorsFor(Object.assign(kTesting.StubCardObjectValid(), {
				KOMCardTags: [],
			})), null);
		});

	});	

	context('KOMCardIsSuspended', function () {

		it('returns object if not boolean', function () {
			deepEqual(mainModule.KOMCardModelErrorsFor(Object.assign(kTesting.StubCardObjectValid(), {
				KOMCardIsSuspended: 'true',
			})), {
				KOMCardIsSuspended: [
					'KOMErrorNotBoolean',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mainModule.KOMCardModelErrorsFor(Object.assign(kTesting.StubCardObjectValid(), {
				KOMCardIsSuspended: true,
			})), null);
		});

	});

	context('KOMOptionValidateIfNotPresent', function () {

		it('returns object if not valid', function () {
			deepEqual(Object.keys(mainModule.KOMCardModelErrorsFor({}, {
				KOMOptionValidateIfNotPresent: true,
			})), [
				'KOMCardID',
				'KOMCardDeckID',
				'KOMCardFrontText',
				'KOMCardRearText',
				'KOMCardCreationDate',
				'KOMCardModificationDate',
				'KOMCardNotes',
				'KOMCardFrontAudio',
				'KOMCardRearAudio',
				'KOMCardTags',
				'KOMCardIsSuspended',
			]);
		});

	});

});

describe('KOMCardModelAudioFields', function test_KOMCardModelAudioFields() {

	it('returns array', function () {
		deepEqual(mainModule.KOMCardModelAudioFields(), [
			'KOMCardFrontAudio',
			'KOMCardRearAudio',
		]);
	});

});
