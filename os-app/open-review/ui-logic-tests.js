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
			KOMCardFrontText: '',
			KOMCardRearText: '',
			KOMCardCreationDate: new Date('2019-02-23T13:56:36Z'),
			KOMCardModificationDate: new Date('2019-02-23T13:56:36Z'),
		};
	},
	StubDeckObjectValid() {
		return {
			KOMDeckID: 'alfa',
			KOMDeckName: '',
			KOMDeckCreationDate: new Date('2019-02-23T13:56:36Z'),
			KOMDeckModificationDate: new Date('2019-02-23T13:56:36Z'),
		};
	},
	StubReviewObjectValid() {
		return {
			KOMReviewScheme: mainModule.KOMReviewSchemeReviewing(),
		};
	},
};

const offset = (function (inputData) {
	return inputData < 10 ? `0${ inputData }` : inputData;
})((new Date()).getTimezoneOffset() / 60);

describe('KOMReviewLogicDayGrouping', function test_KOMReviewLogicDayGrouping() {

	it('throws if not valid', function () {
		throws(function () {
			mainModule.KOMReviewLogicDayGrouping(new Date('alfa'));
		}, /KOMErrorInputNotValid/);
	});

	it('returns day in current timezone', function () {
		deepEqual(mainModule.KOMReviewLogicDayGrouping(new Date(`2020-05-02T12:00:00-${ offset }:00`)), '2020-05-02');
	});

	it('previous day if before 4am', function () {
		const date = new Date(`2020-05-02T03:59:00-${ offset }:00`);
		deepEqual(mainModule.KOMReviewLogicDayGrouping(date), '2020-05-01');
	});

	it('same day if 4am', function () {
		const date = new Date(`2020-05-02T04:00:00-${ offset }:00`);
		deepEqual(mainModule.KOMReviewLogicDayGrouping(date), '2020-05-02');
	});

});

describe('KOMReviewSpacingsToday', function test_KOMReviewSpacingsToday() {

	it('throws if not valid', function () {
		throws(function () {
			mainModule.KOMReviewSpacingsToday(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns array', function () {
		deepEqual(mainModule.KOMReviewSpacingsToday([]), []);
	});

	it('includes unseen', function () {
		const item = kTesting.StubSpacingObjectValid();
		deepEqual(mainModule.KOMReviewSpacingsToday([item]), [item]);
	});

	it('includes learning', function () {
		const item = Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingIsLearning: true,
		});
		deepEqual(mainModule.KOMReviewSpacingsToday([item]), [item]);
	});

	it('includes reviewing due past', function () {
		const item = Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingInterval: 1,
			KOMSpacingDueDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
		});
		deepEqual(mainModule.KOMReviewSpacingsToday([item]), [item]);
	});

	it('includes reviewing due present', function () {
		const item = Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingInterval: 1,
			KOMSpacingDueDate: new Date(),
		});
		deepEqual(mainModule.KOMReviewSpacingsToday([item]), [item]);
	});

	it('excludes reviewing due future', function () {
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

	it('throws error if not object', function () {
		throws(function () {
			mainModule.KOMReviewModelErrorsFor(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns object if KOMReviewScheme not valid', function () {
		deepEqual(mainModule.KOMReviewModelErrorsFor(Object.assign(kTesting.StubReviewObjectValid(), {
			KOMReviewScheme: 'alfa',
		})), {
			KOMReviewScheme: [
				'KOMErrorNotValid',
			],
		});
	});

	it('returns null', function () {
		deepEqual(mainModule.KOMReviewModelErrorsFor(kTesting.StubReviewObjectValid()), null);
	});

	context('KOMReviewMaxUnseenCards', function () {

		it('returns object if not number', function () {
			deepEqual(mainModule.KOMReviewModelErrorsFor(Object.assign(kTesting.StubReviewObjectValid(), {
				KOMReviewMaxUnseenCards: '1',
			})), {
				KOMReviewMaxUnseenCards: [
					'KOMErrorNotNumber',
				],
			});
		});

		it('returns object if 0', function () {
			deepEqual(mainModule.KOMReviewModelErrorsFor(Object.assign(kTesting.StubReviewObjectValid(), {
				KOMReviewMaxUnseenCards: 0,
			})), {
				KOMReviewMaxUnseenCards: [
					'KOMErrorNotPositive',
				],
			});
		});

		it('returns object if negative', function () {
			deepEqual(mainModule.KOMReviewModelErrorsFor(Object.assign(kTesting.StubReviewObjectValid(), {
				KOMReviewMaxUnseenCards: -1,
			})), {
				KOMReviewMaxUnseenCards: [
					'KOMErrorNotPositive',
				],
			});
		});

		it('returns object if KOMReviewScheme KOMReviewSchemeUnseen', function () {
			deepEqual(mainModule.KOMReviewModelErrorsFor(Object.assign(kTesting.StubReviewObjectValid(), {
				KOMReviewScheme: mainModule.KOMReviewSchemeUnseen(),
			})), {
				KOMReviewMaxUnseenCards: [
					'KOMErrorNotDefined',
				],
			});
		});

		it('returns object if KOMReviewScheme KOMReviewSchemeMixed', function () {
			deepEqual(mainModule.KOMReviewModelErrorsFor(Object.assign(kTesting.StubReviewObjectValid(), {
				KOMReviewScheme: mainModule.KOMReviewSchemeMixed(),
			})), {
				KOMReviewMaxUnseenCards: [
					'KOMErrorNotDefined',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mainModule.KOMReviewModelErrorsFor(Object.assign(kTesting.StubReviewObjectValid(), {
				KOMReviewMaxUnseenCards: 1,
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
			mainModule.KOMReviewFilter(null, kTesting.StubReviewObjectValid(), kTesting.StubDeckObjectValid());
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param2 not valid', function () {
		throws(function () {
			mainModule.KOMReviewFilter([], {}, kTesting.StubDeckObjectValid());
		}, /KOMErrorInputNotValid/);
	});


	it('throws if param3 not valid', function () {
		throws(function () {
			mainModule.KOMReviewFilter([], kTesting.StubReviewObjectValid(), {});
		}, /KOMErrorInputNotValid/);
	});

	it('returns array', function () {
		deepEqual(mainModule.KOMReviewFilter([], kTesting.StubReviewObjectValid(), kTesting.StubDeckObjectValid()), []);
	});

	context('KOMReviewScheme', function () {

		it('excludes unseen if KOMReviewSchemeReviewing', function () {
			deepEqual(mainModule.KOMReviewFilter(uItems(), Object.assign(kTesting.StubReviewObjectValid(), {
				KOMReviewScheme: mainModule.KOMReviewSchemeReviewing(),
			}), kTesting.StubDeckObjectValid()), []);
		});

		it('includes reviewing if KOMReviewSchemeReviewing', function () {
			const items = uItems(true);
			deepEqual(mainModule.KOMReviewFilter(items, Object.assign(kTesting.StubReviewObjectValid(), {
				KOMReviewScheme: mainModule.KOMReviewSchemeReviewing(),
			}), kTesting.StubDeckObjectValid()), items);
		});

		it('excludes reviewing if KOMReviewSchemeUnseen', function () {
			deepEqual(mainModule.KOMReviewFilter(uItems(true), Object.assign(kTesting.StubReviewObjectValid(), {
				KOMReviewScheme: mainModule.KOMReviewSchemeUnseen(),
				KOMReviewMaxUnseenCards: Infinity,
			}), kTesting.StubDeckObjectValid()), []);
		});

		it('includes unseen if KOMReviewSchemeUnseen', function () {
			const items = uItems();
			deepEqual(mainModule.KOMReviewFilter(items, Object.assign(kTesting.StubReviewObjectValid(), {
				KOMReviewScheme: mainModule.KOMReviewSchemeUnseen(),
				KOMReviewMaxUnseenCards: Infinity,
			}), kTesting.StubDeckObjectValid()), items);
		});

		it('includes reviewing if KOMReviewSchemeMixed', function () {
			const items = uItems(true);
			deepEqual(mainModule.KOMReviewFilter(items, Object.assign(kTesting.StubReviewObjectValid(), {
				KOMReviewScheme: mainModule.KOMReviewSchemeMixed(),
				KOMReviewMaxUnseenCards: Infinity,
			}), kTesting.StubDeckObjectValid()), items);
		});

		it('includes unseen if KOMReviewSchemeMixed', function () {
			const items = uItems();
			deepEqual(mainModule.KOMReviewFilter(items, Object.assign(kTesting.StubReviewObjectValid(), {
				KOMReviewScheme: mainModule.KOMReviewSchemeMixed(),
				KOMReviewMaxUnseenCards: Infinity,
			}), kTesting.StubDeckObjectValid()), items);
		});

	});

	context('KOMReviewMaxUnseenCards', function () {

		it('includes all if KOMReviewSchemeReviewing', function () {
			const items = uItems(true);
			deepEqual(mainModule.KOMReviewFilter(items, Object.assign(kTesting.StubReviewObjectValid(), {
				KOMReviewScheme: mainModule.KOMReviewSchemeReviewing(),
				KOMReviewMaxUnseenCards: Infinity,
			}), kTesting.StubDeckObjectValid()), items);
		});

		it('excludes unseen beyond KOMReviewMaxUnseenCards if KOMReviewSchemeUnseen', function () {
			const items = uItems();
			deepEqual(mainModule.KOMReviewFilter(items, Object.assign(kTesting.StubReviewObjectValid(), {
				KOMReviewScheme: mainModule.KOMReviewSchemeUnseen(),
				KOMReviewMaxUnseenCards: 5,
			}), kTesting.StubDeckObjectValid()), items.slice(0, 10));
		});

		it('excludes unseen beyond KOMReviewMaxUnseenCards if and KOMReviewSchemeMixed', function () {
			const items = uItems(true).concat(uItems());
			deepEqual(mainModule.KOMReviewFilter(items, Object.assign(kTesting.StubReviewObjectValid(), {
				KOMReviewScheme: mainModule.KOMReviewSchemeMixed(),
				KOMReviewMaxUnseenCards: 5,
			}), kTesting.StubDeckObjectValid()), items.slice(0, 30));
		});

	});

	context('KOMDeckIsForwardOnly', function () {

		it('excludes backward if true', function () {
			const items = uItems();

			deepEqual(mainModule.KOMReviewFilter(items, Object.assign(kTesting.StubReviewObjectValid(), {
				KOMReviewScheme: mainModule.KOMReviewSchemeUnseen(),
				KOMReviewMaxUnseenCards: 10,
			}), Object.assign(kTesting.StubDeckObjectValid(), {
				KOMDeckIsForwardOnly: true,
			})), items.filter(function (e) {
				return !e.KOMSpacingID.match('backward');
			}));
		});

	});

});

describe('KOMReviewDeckSort', function test_KOMReviewDeckSort() {

	it('throws if not array', function () {
		throws(function () {
			mainModule.KOMReviewDeckSort(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns array', function () {
		deepEqual(mainModule.KOMReviewDeckSort([]), []);
	});

	it('returns array', function () {
		const items = [
			Object.assign(kTesting.StubDeckObjectValid(), {
				KOMDeckName: 'bravo',
			}),
			Object.assign(kTesting.StubDeckObjectValid(), {
				KOMDeckName: 'alfa',
			}),
		];
		deepEqual(mainModule.KOMReviewDeckSort(items), items.reverse());
	});

});
