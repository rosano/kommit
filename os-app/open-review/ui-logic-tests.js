const { throws, deepEqual } = require('assert');

const mainModule = require('./ui-logic.js').default;

const KOMPlayLogic = require('../sub-play/ui-logic.js').default;
const KOMSharedLogic = require('../_shared/KOMSharedLogic/main.js').default;

const uGroup = function (param1, param2 = []) {
	const outputData = {};
	
	outputData[KOMSharedLogic.KOMSharedGroupingDay(param1)] = [].concat(param2);

	return outputData;
};

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
	StubPastDate() {
		return new Date(Date.now() - 1000 * 60 * 60 * 24 * 3);
	},
	StubChronicleObjectValid(inputData = new Date()) {
		return {
			KOMChronicleDrawDate: inputData,
			KOMChronicleFlipDate: inputData,
			KOMChronicleResponseDate: new Date(inputData.valueOf() + 10000),
			KOMChronicleResponseType: KOMPlayLogic.KOMPlayResponseTypeEasy(),
			KOMChronicleDueDate: inputData,
		};
	},
	StubSpacingObjectValid(inputData = [kTesting.StubChronicleObjectValid()]) {
		return {
			KOMSpacingID: 'alfa-forward',
			KOMSpacingChronicles: inputData,
		};
	},
};

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

	it('excludes if KOMCardIsSuspended', function () {
		deepEqual(mainModule.KOMReviewFilter(uItems().map(function (e) {
			e.$KOMSpacingCard.KOMCardIsSuspended = true;

			return e;
		}), Object.assign(kTesting.StubReviewObjectValid(), {
			KOMReviewScheme: mainModule.KOMReviewSchemeMixed(),
			KOMReviewMaxUnseenCards: Infinity,
		}), kTesting.StubDeckObjectValid()), []);
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

describe('KOMReviewTotalMinutes', function test_KOMReviewTotalMinutes() {

	it('throws if not number', function () {
		throws(function () {
			mainModule.KOMReviewTotalMinutes('10000');
		}, /KOMErrorInputNotValid/);
	});

	it('returns number', function () {
		deepEqual(mainModule.KOMReviewTotalMinutes(60000), 1);
	});

	it('calculates fraction', function () {
		deepEqual(mainModule.KOMReviewTotalMinutes(30000), 0.5);
	});

	it('rounds to first decimal', function () {
		deepEqual(mainModule.KOMReviewTotalMinutes(15000), 0.3);
	});

});

describe('KOMReviewTodayTotalMilliseconds', function test_KOMReviewTodayTotalMilliseconds() {

	it('throws if not array', function () {
		throws(function () {
			mainModule.KOMReviewTodayTotalMilliseconds(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns number', function () {
		deepEqual(mainModule.KOMReviewTodayTotalMilliseconds([]), 0);
	});

	it('counts time until response', function () {
		deepEqual(mainModule.KOMReviewTodayTotalMilliseconds([kTesting.StubSpacingObjectValid()]), 10000);
	});

	it('counts multiple spacings', function () {
		deepEqual(mainModule.KOMReviewTodayTotalMilliseconds([kTesting.StubSpacingObjectValid(), kTesting.StubSpacingObjectValid()]), 20000);
	});

	it('counts multiple chronicles from today', function () {
		deepEqual(mainModule.KOMReviewTodayTotalMilliseconds([kTesting.StubSpacingObjectValid([
			kTesting.StubChronicleObjectValid(),
			kTesting.StubChronicleObjectValid(),
		])]), 20000);
	});

	it('ignores chronicle from other days', function () {
		deepEqual(mainModule.KOMReviewTodayTotalMilliseconds([kTesting.StubSpacingObjectValid([
			kTesting.StubChronicleObjectValid(kTesting.StubPastDate()),
		])]), 0);
	});

});

describe('KOMReviewTodayReviewAccuracy', function test_KOMReviewTodayReviewAccuracy() {

	it('throws if not array', function () {
		throws(function () {
			mainModule.KOMReviewTodayReviewAccuracy(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns number', function () {
		deepEqual(mainModule.KOMReviewTodayReviewAccuracy([]), 0);
	});

	it('excludes if no KOMChronicleMultiplier', function () {
		deepEqual(mainModule.KOMReviewTodayReviewAccuracy([kTesting.StubSpacingObjectValid()]), 0);
	});

	it('excludes if unseen today', function () {
		deepEqual(mainModule.KOMReviewTodayReviewAccuracy([kTesting.StubSpacingObjectValid()]), 0);
	});

	it('excludes if not today', function () {
		deepEqual(mainModule.KOMReviewTodayReviewAccuracy([kTesting.StubSpacingObjectValid([
			Object.assign(kTesting.StubChronicleObjectValid(kTesting.StubPastDate()), {
				KOMChronicleMultiplier: 1,
			}),
			kTesting.StubChronicleObjectValid(kTesting.StubPastDate()),
		])]), 0);
	});

	it('excludes if not first error', function () {
		deepEqual(mainModule.KOMReviewTodayReviewAccuracy([kTesting.StubSpacingObjectValid([
			Object.assign(kTesting.StubChronicleObjectValid(), {
				KOMChronicleResponseType: KOMPlayLogic.KOMPlayResponseTypeAgain(),
			}),
		])]), 0);
	});

	it('calculates if correct', function () {
		deepEqual(mainModule.KOMReviewTodayReviewAccuracy([kTesting.StubSpacingObjectValid([
			Object.assign(kTesting.StubChronicleObjectValid(kTesting.StubPastDate()), {
				KOMChronicleMultiplier: 1,
			}),
			kTesting.StubChronicleObjectValid(),
		])]), 1);
	});

	it('calculates if not correct', function () {
		deepEqual(mainModule.KOMReviewTodayReviewAccuracy([kTesting.StubSpacingObjectValid([
			Object.assign(kTesting.StubChronicleObjectValid(kTesting.StubPastDate()), {
				KOMChronicleMultiplier: 1,
			}),
			Object.assign(kTesting.StubChronicleObjectValid(), {
				KOMChronicleResponseType: KOMPlayLogic.KOMPlayResponseTypeAgain(),
			}),
		])]), 0);
	});

	it('calculates if multiple', function () {
		deepEqual(mainModule.KOMReviewTodayReviewAccuracy([kTesting.StubSpacingObjectValid([
			Object.assign(kTesting.StubChronicleObjectValid(kTesting.StubPastDate()), {
				KOMChronicleMultiplier: 1,
			}),
			kTesting.StubChronicleObjectValid(),
		]), kTesting.StubSpacingObjectValid([
			Object.assign(kTesting.StubChronicleObjectValid(kTesting.StubPastDate()), {
				KOMChronicleMultiplier: 1,
			}),
			Object.assign(kTesting.StubChronicleObjectValid(), {
				KOMChronicleResponseType: KOMPlayLogic.KOMPlayResponseTypeAgain(),
			}),
		])]), 0.5);
	});

});

describe('KOMReviewTodayPercentage', function test_KOMReviewTodayPercentage() {

	it('throws if not number', function () {
		throws(function () {
			mainModule.KOMReviewTodayPercentage('10000');
		}, /KOMErrorInputNotValid/);
	});

	it('returns number', function () {
		deepEqual(mainModule.KOMReviewTodayPercentage(1), 100);
	});

	it('calculates fraction', function () {
		deepEqual(mainModule.KOMReviewTodayPercentage(0.5), 50);
	});

	it('rounds to first decimal', function () {
		deepEqual(mainModule.KOMReviewTodayPercentage(1.0 / 3), 33.3);
	});

});

describe('KOMReviewGeneralTableDays', function test_KOMReviewGeneralTableDays() {

	it('returns number', function () {
		deepEqual(mainModule.KOMReviewGeneralTableDays(), 7);
	});

});

describe('KOMReviewGeneralUpcomingDates', function test_KOMReviewGeneralUpcomingDates() {

	it('returns array', function () {
		deepEqual(mainModule.KOMReviewGeneralUpcomingDates(), Array.from(Array(mainModule.KOMReviewGeneralTableDays())).map(function (e, i) {
			return KOMSharedLogic.KOMSharedGroupingDay(new Date(Date.now() + 1000 * 60 * 60 * 24 * i));
		}));
	});

});

describe('KOMReviewGeneralUpcomingFilter', function test_KOMReviewGeneralUpcomingFilter() {

	const offset = (function (inputData) {
		return inputData < 10 ? `0${ inputData }` : inputData;
	})((new Date()).getTimezoneOffset() / 60);

	const uGroupingDate = function (inputData = 0) {
		return new Date(Date.parse(`${ KOMSharedLogic.KOMSharedGroupingDay(new Date()) }T04:00:00-${ offset }:00`) + inputData);
	};

	it('throws if not array', function () {
		throws(function () {
			mainModule.KOMReviewGeneralUpcomingFilter(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns array', function () {
		deepEqual(mainModule.KOMReviewGeneralUpcomingFilter([]), []);
	});

	it('excludes if unseen', function () {
		deepEqual(mainModule.KOMReviewGeneralUpcomingFilter([StubSpacingObjectValid()]), []);
	});

	it('excludes if before today', function () {
		deepEqual(mainModule.KOMReviewGeneralUpcomingFilter([Object.assign(StubSpacingObjectValid(), {
			KOMSpacingDueDate: uGroupingDate(-1),
		})]), []);
	});

	it('excludes if after KOMReviewGeneralTableDays', function () {
		deepEqual(mainModule.KOMReviewGeneralUpcomingFilter([Object.assign(StubSpacingObjectValid(), {
			KOMSpacingDueDate: uGroupingDate(1000 * 60 * 60 * 24 * mainModule.KOMReviewGeneralTableDays()),
		})]), []);
	});

	it('includes if today', function () {
		const item = Object.assign(StubSpacingObjectValid(), {
			KOMSpacingDueDate: uGroupingDate(),
		});
		deepEqual(mainModule.KOMReviewGeneralUpcomingFilter([item]), [item]);
	});

	it('includes if KOMReviewGeneralTableDays', function () {
		const item = Object.assign(StubSpacingObjectValid(), {
			KOMSpacingDueDate: uGroupingDate(1000 * 60 * 60 * 24 * mainModule.KOMReviewGeneralTableDays() - 1),
		});
		deepEqual(mainModule.KOMReviewGeneralUpcomingFilter([item]), [item]);
	});

});

describe('KOMReviewGeneralUpcomingGroupByDate', function test_KOMReviewGeneralUpcomingGroupByDate() {

	it('throws if not array', function () {
		throws(function () {
			mainModule.KOMReviewGeneralUpcomingGroupByDate(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns object', function () {
		deepEqual(mainModule.KOMReviewGeneralUpcomingGroupByDate([]), {});
	});

	it('groups by date if single', function () {
		const item = Object.assign(StubSpacingObjectValid(), {
			KOMSpacingDueDate: new Date(),
		});
		deepEqual(mainModule.KOMReviewGeneralUpcomingGroupByDate([item]), uGroup(item.KOMSpacingDueDate, item));
	});

	it('groups by date if multiple', function () {
		const item1 = Object.assign(StubSpacingObjectValid(), {
			KOMSpacingDueDate: new Date('2019-04-12T00:00:00Z'),
		});
		const item2 = Object.assign(StubSpacingObjectValid(), {
			KOMSpacingDueDate: new Date('2019-04-13T00:00:00Z'),
		});
		deepEqual(mainModule.KOMReviewGeneralUpcomingGroupByDate([item1, item2]), Object.assign(uGroup(item1.KOMSpacingDueDate, item1), uGroup(item2.KOMSpacingDueDate, item2)));
	});

	it('groups by date if duplicate', function () {
		const item1 = Object.assign(StubSpacingObjectValid(), {
			KOMSpacingDueDate: new Date(),
		});
		const item2 = Object.assign(StubSpacingObjectValid(), {
			KOMSpacingDueDate: new Date(),
		});
		deepEqual(mainModule.KOMReviewGeneralUpcomingGroupByDate([item1, item2]), uGroup(item1.KOMSpacingDueDate, [item1, item2]));
	});

});

describe('KOMReviewGeneralUpcomingColors', function test_KOMReviewGeneralUpcomingColors() {

	it('returns array', function () {
		deepEqual(mainModule.KOMReviewGeneralUpcomingColors(), [
			KOMSharedLogic.KOMSharedColorMature(),
			KOMSharedLogic.KOMSharedColorDeveloping(),
			]);
	});

});

describe('KOMReviewGeneralHistoricalDates', function test_KOMReviewGeneralHistoricalDates() {

	it('returns array', function () {
		deepEqual(mainModule.KOMReviewGeneralHistoricalDates(), Array.from(Array(mainModule.KOMReviewGeneralTableDays())).map(function (e, i) {
			return KOMSharedLogic.KOMSharedGroupingDay(new Date(Date.now() - 1000 * 60 * 60 * 24 * i));
		}));
	});

});

describe('KOMReviewGeneralHistoricalFilter', function test_KOMReviewGeneralHistoricalFilter() {

	const offset = (function (inputData) {
		return inputData < 10 ? `0${ inputData }` : inputData;
	})((new Date()).getTimezoneOffset() / 60);

	const uGroupingDate = function (inputData = 0) {
		return new Date(Date.parse(`${ KOMSharedLogic.KOMSharedGroupingDay(new Date()) }T04:00:00-${ offset }:00`) + inputData);
	};

	it('throws if not array', function () {
		throws(function () {
			mainModule.KOMReviewGeneralHistoricalFilter(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns array', function () {
		deepEqual(mainModule.KOMReviewGeneralHistoricalFilter([]), []);
	});

	it('excludes if unseen', function () {
		deepEqual(mainModule.KOMReviewGeneralHistoricalFilter([StubSpacingObjectValid()]), []);
	});

	it('excludes if after today', function () {
		deepEqual(mainModule.KOMReviewGeneralHistoricalFilter([StubSpacingObjectHistorical(uGroupingDate(1000 * 60 * 60 * 24))]), []);
	});

	it('excludes if before KOMReviewGeneralTableDays', function () {
		deepEqual(mainModule.KOMReviewGeneralHistoricalFilter([StubSpacingObjectHistorical(uGroupingDate(-1000 * 60 * 60 * 24 * mainModule.KOMReviewGeneralTableDays() - 1))]), []);
	});

	it('includes if today', function () {
		const item = StubSpacingObjectHistorical(uGroupingDate());
		deepEqual(mainModule.KOMReviewGeneralHistoricalFilter([item]), [item]);
	});

	it('includes if KOMReviewGeneralTableDays', function () {
		const item = StubSpacingObjectHistorical(uGroupingDate(-1000 * 60 * 60 * 24 * mainModule.KOMReviewGeneralTableDays()));
		deepEqual(mainModule.KOMReviewGeneralHistoricalFilter([item]), [item]);
	});

});

describe('KOMReviewGeneralHistoricalGroupByDate', function test_KOMReviewGeneralHistoricalGroupByDate() {

	it('throws if not array', function () {
		throws(function () {
			mainModule.KOMReviewGeneralHistoricalGroupByDate(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns object', function () {
		deepEqual(mainModule.KOMReviewGeneralHistoricalGroupByDate([]), {});
	});

	it('groups by date if single object', function () {
		const item = StubSpacingObjectHistorical();
		deepEqual(mainModule.KOMReviewGeneralHistoricalGroupByDate([item]), uGroup(item.KOMSpacingChronicles[0].KOMChronicleResponseDate, item));
	});

	it('groups by date if multiple objects', function () {
		const item1 = StubSpacingObjectHistorical(new Date('2019-04-12T00:00:00Z'));
		const item2 = StubSpacingObjectHistorical(new Date('2019-04-13T00:00:00Z'));

		deepEqual(mainModule.KOMReviewGeneralHistoricalGroupByDate([item1, item2]), Object.assign(uGroup(item1.KOMSpacingChronicles[0].KOMChronicleResponseDate, item1), uGroup(item2.KOMSpacingChronicles[0].KOMChronicleResponseDate, item2)));
	});

	it('groups by date if duplicate', function () {
		const item1 = StubSpacingObjectHistorical();
		const item2 = StubSpacingObjectHistorical();
		
		deepEqual(mainModule.KOMReviewGeneralHistoricalGroupByDate([item1, item2]), uGroup(item1.KOMSpacingChronicles[0].KOMChronicleResponseDate, [item1, item2]));
	});

	it('groups by date if multiple chronicle objects', function () {
		const item = Object.assign(StubSpacingObjectHistorical(), {
			KOMSpacingChronicles: [
				StubChronicleObjectValid(new Date('2019-04-12T00:00:00Z')),
				StubChronicleObjectValid(new Date('2019-04-13T00:00:00Z')),
			],
		});

		deepEqual(mainModule.KOMReviewGeneralHistoricalGroupByDate([item]), Object.assign(uGroup(item.KOMSpacingChronicles[0].KOMChronicleResponseDate, item), uGroup(item.KOMSpacingChronicles[1].KOMChronicleResponseDate, item)));
	});

	it('groups by date if multiple chronicle objects with duplicate date', function () {
		const item = Object.assign(StubSpacingObjectHistorical(), {
			KOMSpacingChronicles: [
				StubChronicleObjectValid(new Date('2019-04-12T00:00:00Z')),
				StubChronicleObjectValid(new Date('2019-04-12T00:00:00Z')),
			],
		});

		deepEqual(mainModule.KOMReviewGeneralHistoricalGroupByDate([item]), Object.assign(uGroup(item.KOMSpacingChronicles[0].KOMChronicleResponseDate, item)));
	});

});

describe('KOMReviewGeneralHistoricalTotalMilliseconds', function test_KOMReviewGeneralHistoricalTotalMilliseconds() {

	it('throws if not array', function () {
		throws(function () {
			mainModule.KOMReviewGeneralHistoricalTotalMilliseconds(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns number', function () {
		deepEqual(mainModule.KOMReviewGeneralHistoricalTotalMilliseconds([]), 0);
	});

	it('counts single', function () {
		deepEqual(mainModule.KOMReviewGeneralHistoricalTotalMilliseconds([StubChronicleObjectValid()]), 10000);
	});

	it('counts multiple', function () {
		deepEqual(mainModule.KOMReviewGeneralHistoricalTotalMilliseconds([StubChronicleObjectValid(), StubChronicleObjectValid()]), 20000);
	});

});
