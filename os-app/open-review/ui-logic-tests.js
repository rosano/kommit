const { throws, deepEqual } = require('assert');

const mainModule = require('./ui-logic.js').default;

const kTesting = {
	StubSpacingObjectValid() {
		return {
			KOMSpacingID: 'bravo-forward',
			KOMSpacingChronicles: [],
		};
	},
	StubCardObjectValid() {
		return {
			KOMCardID: 'alfa',
			KOMCardDeckID: 'bravo',
			KOMCardFront: '',
			KOMCardAnswer: '',
			KOMCardCreationDate: new Date('2019-02-23T13:56:36Z'),
			KOMCardModificationDate: new Date('2019-02-23T13:56:36Z'),
		};
	},
	StubReviewObjectValid() {
		return {
			KOMReviewScheme: mainModule.KOMReviewSchemeReviewing(),
		};
	},
};

describe('KOMReviewSpacingsToday', function test_KOMReviewSpacingsToday() {

	it('throws if not valid', function () {
		throws(function () {
			mainModule.KOMReviewSpacingsToday(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns array', function() {
		deepEqual(mainModule.KOMReviewSpacingsToday([]), []);
	});

	it('includes unseen', function() {
		const item = kTesting.StubSpacingObjectValid();
		deepEqual(mainModule.KOMReviewSpacingsToday([item]), [item]);
	});

	it('includes learning', function() {
		const item = Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingIsLearning: true,
		});
		deepEqual(mainModule.KOMReviewSpacingsToday([item]), [item]);
	});

	it('includes reviewing due past', function() {
		const item = Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingInterval: 1,
			KOMSpacingDueDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
		});
		deepEqual(mainModule.KOMReviewSpacingsToday([item]), [item]);
	});

	it('includes reviewing due present', function() {
		const item = Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingInterval: 1,
			KOMSpacingDueDate: new Date(),
		});
		deepEqual(mainModule.KOMReviewSpacingsToday([item]), [item]);
	});

	it('excludes reviewing due future', function() {
		deepEqual(mainModule.KOMReviewSpacingsToday([Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingInterval: 1,
			KOMSpacingDueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
		})]), []);
	});

});

describe('KOMReviewSchemeReviewing', function test_KOMReviewSchemeReviewing() {

	it('returns string', function () {
		deepEqual(mainModule.KOMReviewSchemeReviewing(), 'kKOMReviewSchemeReviewing');
	});

});

describe('KOMReviewSchemeUnseen', function test_KOMReviewSchemeUnseen() {

	it('returns string', function () {
		deepEqual(mainModule.KOMReviewSchemeUnseen(), 'kKOMReviewSchemeUnseen');
	});

});

describe('KOMReviewSchemeMixed', function test_KOMReviewSchemeMixed() {

	it('returns string', function () {
		deepEqual(mainModule.KOMReviewSchemeMixed(), 'kKOMReviewSchemeMixed');
	});

});

describe('KOMReviewSchemes', function test_KOMReviewSchemes() {

	it('returns string', function () {
		deepEqual(mainModule.KOMReviewSchemes(), [
			mainModule.KOMReviewSchemeReviewing(),
			mainModule.KOMReviewSchemeUnseen(),
			mainModule.KOMReviewSchemeMixed(),
		]);
	});

});

describe('KOMReviewModelErrorsFor', function test_KOMReviewModelErrorsFor() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.KOMReviewModelErrorsFor(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns object if KOMReviewScheme not valid', function() {
		deepEqual(mainModule.KOMReviewModelErrorsFor(Object.assign(kTesting.StubReviewObjectValid(), {
			KOMReviewScheme: 'alfa',
		})), {
			KOMReviewScheme: [
				'KOMErrorNotValid',
			],
		});
	});

	it('returns null', function() {
		deepEqual(mainModule.KOMReviewModelErrorsFor(kTesting.StubReviewObjectValid()), null);
	});

	context('KOMReviewMaxUnseenCards', function() {

		it('returns object if not number', function() {
			deepEqual(mainModule.KOMReviewModelErrorsFor(Object.assign(kTesting.StubReviewObjectValid(), {
				KOMReviewMaxUnseenCards: '1',
			})), {
				KOMReviewMaxUnseenCards: [
					'KOMErrorNotNumber',
				],
			});
		});

		it('returns object if 0', function() {
			deepEqual(mainModule.KOMReviewModelErrorsFor(Object.assign(kTesting.StubReviewObjectValid(), {
				KOMReviewMaxUnseenCards: 0,
			})), {
				KOMReviewMaxUnseenCards: [
					'KOMErrorNotPositive',
				],
			});
		});

		it('returns object if negative', function() {
			deepEqual(mainModule.KOMReviewModelErrorsFor(Object.assign(kTesting.StubReviewObjectValid(), {
				KOMReviewMaxUnseenCards: -1,
			})), {
				KOMReviewMaxUnseenCards: [
					'KOMErrorNotPositive',
				],
			});
		});

		it('returns object if KOMReviewScheme KOMReviewSchemeUnseen', function() {
			deepEqual(mainModule.KOMReviewModelErrorsFor(Object.assign(kTesting.StubReviewObjectValid(), {
				KOMReviewScheme: mainModule.KOMReviewSchemeUnseen(),
			})), {
				KOMReviewMaxUnseenCards: [
					'KOMErrorNotDefined',
				],
			});
		});

		it('returns object if KOMReviewScheme KOMReviewSchemeMixed', function() {
			deepEqual(mainModule.KOMReviewModelErrorsFor(Object.assign(kTesting.StubReviewObjectValid(), {
				KOMReviewScheme: mainModule.KOMReviewSchemeMixed(),
			})), {
				KOMReviewMaxUnseenCards: [
					'KOMErrorNotDefined',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mainModule.KOMReviewModelErrorsFor(Object.assign(kTesting.StubReviewObjectValid(), {
				KOMReviewMaxUnseenCards: 1,
			})), null);
		});

	});

	context('KOMReviewIsForwardOnly', function() {

		it('returns object if not boolean', function() {
			deepEqual(mainModule.KOMReviewModelErrorsFor(Object.assign(kTesting.StubReviewObjectValid(), {
				KOMReviewIsForwardOnly: 'true',
			})), {
				KOMReviewIsForwardOnly: [
					'KOMErrorNotBoolean',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mainModule.KOMReviewModelErrorsFor(Object.assign(kTesting.StubReviewObjectValid(), {
				KOMReviewIsForwardOnly: true,
			})), null);
		});

	});

});

describe('KOMReviewFilter', function test_KOMReviewFilter() {

	const uFlatten = function (inputData) {
		return [].concat.apply([], inputData);
	};

	const uItems = function (inputData) {
		return uFlatten(Array.from(new Array(10)).map(function (e, i) {
			const card = Object.assign(kTesting.StubCardObjectValid(), {
				KOMCardID: (i + 1).toString(),
			});

			return [true, false].map(function (forward) {
				return Object.assign(kTesting.StubSpacingObjectValid(), {
					KOMSpacingID: card.KOMCardID + '-' + (forward ? 'forward' : 'backward'),
					KOMSpacingDueDate: inputData ? new Date() : undefined,
					$KOMSpacingCard: card,
				});
			});
		}));
	};

	it('throws if param1 not array', function () {
		throws(function () {
			mainModule.KOMReviewFilter(null, kTesting.StubReviewObjectValid());
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param2 not valid', function () {
		throws(function () {
			mainModule.KOMReviewFilter([], {});
		}, /KOMErrorInputNotValid/);
	});

	it('returns array', function() {
		deepEqual(mainModule.KOMReviewFilter([], kTesting.StubReviewObjectValid()), []);
	});

	context('KOMReviewScheme', function () {		

		it('excludes unseen if KOMReviewSchemeReviewing', function() {
			deepEqual(mainModule.KOMReviewFilter(uItems(), Object.assign(kTesting.StubReviewObjectValid(), {
				KOMReviewScheme: mainModule.KOMReviewSchemeReviewing(),
			})), []);
		});

		it('excludes reviewing if KOMReviewSchemeUnseen', function() {
			deepEqual(mainModule.KOMReviewFilter(uItems(true), Object.assign(kTesting.StubReviewObjectValid(), {
				KOMReviewScheme: mainModule.KOMReviewSchemeUnseen(),
				KOMReviewMaxUnseenCards: 5,
			})), []);
		});
	
	});

	context('KOMReviewMaxUnseenCards', function () {

		it('does nothing if KOMReviewSchemeReviewing', function() {
			deepEqual(mainModule.KOMReviewFilter(uItems(), Object.assign(kTesting.StubReviewObjectValid(), {
				KOMReviewScheme: mainModule.KOMReviewSchemeReviewing(),
			})), []);
		});

		it('includes if unseen until KOMReviewMaxUnseenCards', function() {
			deepEqual(mainModule.KOMReviewFilter(uItems(), Object.assign(kTesting.StubReviewObjectValid(), {
				KOMReviewScheme: mainModule.KOMReviewSchemeUnseen(),
				KOMReviewMaxUnseenCards: 5,
			})), uItems().slice(0, 10));
		});
	
	});

	context('KOMReviewIsForwardOnly', function () {

		it('excludes backward if true', function() {
			const items = uItems();

			deepEqual(mainModule.KOMReviewFilter(items, Object.assign(kTesting.StubReviewObjectValid(), {
				KOMReviewScheme: mainModule.KOMReviewSchemeUnseen(),
				KOMReviewMaxUnseenCards: 10,
				KOMReviewIsForwardOnly: true,
			})), items.filter(function (e) {
				return !e.KOMSpacingID.match('backward');
			}));
		});
		
	});

});
