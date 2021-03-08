const { throws, deepEqual } = require('assert');

const mod = require('./ui-logic.js').default;

const KOMPlayLogic = require('../sub-play/ui-logic.js').default;
const KOMSharedLogic = require('../_shared/KOMSharedLogic/main.js').default;
const KOMReviewGeneral = require('./submodules/KOMReviewGeneral/ui-logic.js').default;

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
			KOMReviewScheme: mod.KOMReviewSchemeReviewing(),
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

describe('KOMReviewDocumentCount', function test_KOMReviewDocumentCount() {

	it('throws if not array', function () {
		throws(function () {
			mod.KOMReviewDocumentCount(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns number', function () {
		deepEqual(mod.KOMReviewDocumentCount([]), 0);
	});

	it('counts no parent objects', function () {
		const parents = uRandomInt();
		deepEqual(mod.KOMReviewDocumentCount(Array.from(Array(parents))), 0);
	});

	context('child objects', function () {

		it('counts $KOMDeckCards if present in param2', function () {
			const parents = uRandomInt();
			const children = uRandomInt();
			deepEqual(mod.KOMReviewDocumentCount(Array.from(Array(parents)).map(function (e, KOMDeckID) {
				return {
					KOMDeckID,
				};
			}), Array.from(Array(parents)).reduce(function (coll, item, i) {
				return Object.assign(coll, {
					[i]: {
						$KOMDeckCards: Array.from(Array(children)),
					},
				});
			}, {})), children * parents);
		});
		
		it('counts $KOMReviewChartCompositionCollectionData', function () {
			const parents = uRandomInt();
			const children = uRandomInt();
			deepEqual(mod.KOMReviewDocumentCount(Array.from(Array(parents)).map(function () {
				return {
					$KOMReviewChartCompositionCollectionData: {
						KOMSpacingGroupingTotal: children,
					},
				};
			})), children * parents);
		});
	
	});

});

describe('KOMReviewSpacingsToday', function test_KOMReviewSpacingsToday() {

	it('throws if not valid', function () {
		throws(function () {
			mod.KOMReviewSpacingsToday(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns array', function () {
		deepEqual(mod.KOMReviewSpacingsToday([]), []);
	});

	it('includes unseen', function () {
		const item = kTesting.StubSpacingObjectValid();
		deepEqual(mod.KOMReviewSpacingsToday([item]), [item]);
	});

	it('includes learning', function () {
		const item = Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingIsLearning: true,
		});
		deepEqual(mod.KOMReviewSpacingsToday([item]), [item]);
	});

	it('includes reviewing due past', function () {
		const item = Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingInterval: 1,
			KOMSpacingDueDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
		});
		deepEqual(mod.KOMReviewSpacingsToday([item]), [item]);
	});

	it('includes reviewing due present', function () {
		const item = Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingInterval: 1,
			KOMSpacingDueDate: new Date(),
		});
		deepEqual(mod.KOMReviewSpacingsToday([item]), [item]);
	});

	it('excludes reviewing due future', function () {
		deepEqual(mod.KOMReviewSpacingsToday([Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingInterval: 1,
			KOMSpacingDueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
		})]), []);
	});

});

describe('KOMReviewSchemeReviewing', function test_KOMReviewSchemeReviewing() {

	it('returns string', function () {
		deepEqual(mod.KOMReviewSchemeReviewing(), 'kKOMReviewSchemeReviewing');
	});

});

describe('KOMReviewSchemeUnseen', function test_KOMReviewSchemeUnseen() {

	it('returns string', function () {
		deepEqual(mod.KOMReviewSchemeUnseen(), 'kKOMReviewSchemeUnseen');
	});

});

describe('KOMReviewSchemeMixed', function test_KOMReviewSchemeMixed() {

	it('returns string', function () {
		deepEqual(mod.KOMReviewSchemeMixed(), 'kKOMReviewSchemeMixed');
	});

});

describe('KOMReviewSchemes', function test_KOMReviewSchemes() {

	it('returns string', function () {
		deepEqual(mod.KOMReviewSchemes(), [
			mod.KOMReviewSchemeReviewing(),
			mod.KOMReviewSchemeUnseen(),
			mod.KOMReviewSchemeMixed(),
		]);
	});

});

describe('KOMReviewObjectErrors', function test_KOMReviewObjectErrors() {

	it('throws error if not object', function () {
		throws(function () {
			mod.KOMReviewObjectErrors(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns object if KOMReviewScheme not valid', function () {
		deepEqual(mod.KOMReviewObjectErrors(Object.assign(kTesting.StubReviewObjectValid(), {
			KOMReviewScheme: 'alfa',
		})), {
			KOMReviewScheme: [
				'KOMErrorNotValid',
			],
		});
	});

	it('returns null', function () {
		deepEqual(mod.KOMReviewObjectErrors(kTesting.StubReviewObjectValid()), null);
	});

	context('KOMReviewMaxUnseenCards', function () {

		it('returns object if not number', function () {
			deepEqual(mod.KOMReviewObjectErrors(Object.assign(kTesting.StubReviewObjectValid(), {
				KOMReviewMaxUnseenCards: '1',
			})), {
				KOMReviewMaxUnseenCards: [
					'KOMErrorNotNumber',
				],
			});
		});

		it('returns object if 0', function () {
			deepEqual(mod.KOMReviewObjectErrors(Object.assign(kTesting.StubReviewObjectValid(), {
				KOMReviewMaxUnseenCards: 0,
			})), {
				KOMReviewMaxUnseenCards: [
					'KOMErrorNotPositive',
				],
			});
		});

		it('returns object if negative', function () {
			deepEqual(mod.KOMReviewObjectErrors(Object.assign(kTesting.StubReviewObjectValid(), {
				KOMReviewMaxUnseenCards: -1,
			})), {
				KOMReviewMaxUnseenCards: [
					'KOMErrorNotPositive',
				],
			});
		});

		it('returns object if KOMReviewScheme KOMReviewSchemeUnseen', function () {
			deepEqual(mod.KOMReviewObjectErrors(Object.assign(kTesting.StubReviewObjectValid(), {
				KOMReviewScheme: mod.KOMReviewSchemeUnseen(),
			})), {
				KOMReviewMaxUnseenCards: [
					'KOMErrorNotDefined',
				],
			});
		});

		it('returns object if KOMReviewScheme KOMReviewSchemeMixed', function () {
			deepEqual(mod.KOMReviewObjectErrors(Object.assign(kTesting.StubReviewObjectValid(), {
				KOMReviewScheme: mod.KOMReviewSchemeMixed(),
			})), {
				KOMReviewMaxUnseenCards: [
					'KOMErrorNotDefined',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mod.KOMReviewObjectErrors(Object.assign(kTesting.StubReviewObjectValid(), {
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
			mod.KOMReviewFilter(null, kTesting.StubReviewObjectValid(), kTesting.StubDeckObjectValid());
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param2 not valid', function () {
		throws(function () {
			mod.KOMReviewFilter([], {}, kTesting.StubDeckObjectValid());
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param3 not valid', function () {
		throws(function () {
			mod.KOMReviewFilter([], kTesting.StubReviewObjectValid(), {});
		}, /KOMErrorInputNotValid/);
	});

	it('returns array', function () {
		deepEqual(mod.KOMReviewFilter([], kTesting.StubReviewObjectValid(), kTesting.StubDeckObjectValid()), []);
	});

	it('excludes if KOMCardIsRetired', function () {
		deepEqual(mod.KOMReviewFilter(uItems().map(function (e) {
			e.$KOMSpacingCard.KOMCardIsRetired = true;

			return e;
		}), Object.assign(kTesting.StubReviewObjectValid(), {
			KOMReviewScheme: mod.KOMReviewSchemeMixed(),
			KOMReviewMaxUnseenCards: Infinity,
		}), kTesting.StubDeckObjectValid()), []);
	});

	context('KOMReviewScheme', function () {

		it('excludes unseen if KOMReviewSchemeReviewing', function () {
			deepEqual(mod.KOMReviewFilter(uItems(), Object.assign(kTesting.StubReviewObjectValid(), {
				KOMReviewScheme: mod.KOMReviewSchemeReviewing(),
			}), kTesting.StubDeckObjectValid()), []);
		});

		it('includes reviewing if KOMReviewSchemeReviewing', function () {
			const items = uItems(true);
			deepEqual(mod.KOMReviewFilter(items, Object.assign(kTesting.StubReviewObjectValid(), {
				KOMReviewScheme: mod.KOMReviewSchemeReviewing(),
			}), kTesting.StubDeckObjectValid()), items);
		});

		it('excludes reviewing if KOMReviewSchemeUnseen', function () {
			deepEqual(mod.KOMReviewFilter(uItems(true), Object.assign(kTesting.StubReviewObjectValid(), {
				KOMReviewScheme: mod.KOMReviewSchemeUnseen(),
				KOMReviewMaxUnseenCards: Infinity,
			}), kTesting.StubDeckObjectValid()), []);
		});

		it('includes unseen if KOMReviewSchemeUnseen', function () {
			const items = uItems();
			deepEqual(mod.KOMReviewFilter(items, Object.assign(kTesting.StubReviewObjectValid(), {
				KOMReviewScheme: mod.KOMReviewSchemeUnseen(),
				KOMReviewMaxUnseenCards: Infinity,
			}), kTesting.StubDeckObjectValid()), items);
		});

		it('includes reviewing if KOMReviewSchemeMixed', function () {
			const items = uItems(true);
			deepEqual(mod.KOMReviewFilter(items, Object.assign(kTesting.StubReviewObjectValid(), {
				KOMReviewScheme: mod.KOMReviewSchemeMixed(),
				KOMReviewMaxUnseenCards: Infinity,
			}), kTesting.StubDeckObjectValid()), items);
		});

		it('includes unseen if KOMReviewSchemeMixed', function () {
			const items = uItems();
			deepEqual(mod.KOMReviewFilter(items, Object.assign(kTesting.StubReviewObjectValid(), {
				KOMReviewScheme: mod.KOMReviewSchemeMixed(),
				KOMReviewMaxUnseenCards: Infinity,
			}), kTesting.StubDeckObjectValid()), items);
		});

	});

	context('KOMReviewMaxUnseenCards', function () {

		it('includes all if KOMReviewSchemeReviewing', function () {
			const items = uItems(true);
			deepEqual(mod.KOMReviewFilter(items, Object.assign(kTesting.StubReviewObjectValid(), {
				KOMReviewScheme: mod.KOMReviewSchemeReviewing(),
				KOMReviewMaxUnseenCards: Infinity,
			}), kTesting.StubDeckObjectValid()), items);
		});

		it('excludes unseen beyond KOMReviewMaxUnseenCards if KOMReviewSchemeUnseen', function () {
			const items = uItems();
			deepEqual(mod.KOMReviewFilter(items, Object.assign(kTesting.StubReviewObjectValid(), {
				KOMReviewScheme: mod.KOMReviewSchemeUnseen(),
				KOMReviewMaxUnseenCards: 5,
			}), kTesting.StubDeckObjectValid()), items.slice(0, 10));
		});

		it('excludes unseen beyond KOMReviewMaxUnseenCards if and KOMReviewSchemeMixed', function () {
			const items = uItems(true).concat(uItems());
			deepEqual(mod.KOMReviewFilter(items, Object.assign(kTesting.StubReviewObjectValid(), {
				KOMReviewScheme: mod.KOMReviewSchemeMixed(),
				KOMReviewMaxUnseenCards: 5,
			}), kTesting.StubDeckObjectValid()), items.slice(0, 30));
		});

	});

	context('KOMDeckIsForwardOnly', function () {

		it('excludes backward if true', function () {
			const items = uItems();

			deepEqual(mod.KOMReviewFilter(items, Object.assign(kTesting.StubReviewObjectValid(), {
				KOMReviewScheme: mod.KOMReviewSchemeUnseen(),
				KOMReviewMaxUnseenCards: 10,
			}), Object.assign(kTesting.StubDeckObjectValid(), {
				KOMDeckIsForwardOnly: true,
			})), items.filter(function (e) {
				return !e.KOMSpacingID.match('backward');
			}));
		});

	});

});

describe('KOMReviewRetireCards', function test_KOMReviewRetireCards() {

	const uSpacing = function (inputData = {}) {
		const item = new Date();

		return StubSpacingObjectValid(Object.assign({
			KOMSpacingID: 'bravo-forward',
			KOMSpacingChronicles: [StubChronicleObjectValid(item)],
			KOMSpacingDrawDate: new Date(inputData.valueOf() - 10000),
			KOMSpacingFlipDate: new Date(inputData.valueOf() - 10000),
			KOMSpacingDueDate: new Date(inputData.valueOf() + 1000 * 60 * 60 * 24),
			KOMSpacingInterval: 29,
		}, inputData));
	};

	it('throws if param1 not valid', function () {
		throws(function () {
			mod.KOMReviewRetireCards({}, []);
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param2 not array', function () {
		throws(function () {
			mod.KOMReviewRetireCards(StubDeckObjectValid(), null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns array', function () {
		deepEqual(mod.KOMReviewRetireCards(StubDeckObjectValid(), []), []);
	});

	it('excludes if no KOMDeckRetireCardsMonths', function () {
		const KOMDeckRetireCardsMonths = parseInt(Math.random() * 10);
		
		deepEqual(mod.KOMReviewRetireCards(StubDeckObjectValid({
			KOMDeckRetireCardsMonths: 0,
		}), [uSpacing({
			KOMSpacingID: 'alfa-forward',
			KOMSpacingInterval: (365 / 12 * KOMDeckRetireCardsMonths),
			$KOMSpacingCard: {},
		}), uSpacing({
			KOMSpacingID: 'alfa-backward',
			KOMSpacingInterval: (365 / 12 * KOMDeckRetireCardsMonths),
			$KOMSpacingCard: {},
		})]), []);
	});

	it('excludes if KOMDeckIsForwardOnly and under threshold ', function () {
		const KOMDeckRetireCardsMonths = parseInt(Math.random() * 10);
		
		deepEqual(mod.KOMReviewRetireCards(StubDeckObjectValid({
			KOMDeckRetireCardsMonths,
			KOMDeckIsForwardOnly: true,
		}), [uSpacing({
			KOMSpacingID: 'alfa-forward',
			KOMSpacingInterval: (365 / 12 * KOMDeckRetireCardsMonths * 0.9),
			$KOMSpacingCard: {},
		})]), []);
	});

	it('excludes if one under threshold', function () {
		const KOMDeckRetireCardsMonths = parseInt(Math.random() * 10);
		
		deepEqual(mod.KOMReviewRetireCards(StubDeckObjectValid({
			KOMDeckRetireCardsMonths,
		}), [uSpacing({
			KOMSpacingID: 'alfa-forward',
			KOMSpacingInterval: (365 / 12 * KOMDeckRetireCardsMonths),
			$KOMSpacingCard: {},
		}), uSpacing({
			KOMSpacingID: 'alfa-backward',
			KOMSpacingInterval: (365 / 12 * KOMDeckRetireCardsMonths * 0.9),
			$KOMSpacingCard: {},
		})]), []);
	});

	it('retires $KOMSpacingCard', function () {
		const KOMDeckRetireCardsMonths = parseInt(Math.random() * 10);
		const $KOMSpacingCard = {};
		
		deepEqual(mod.KOMReviewRetireCards(StubDeckObjectValid({
			KOMDeckRetireCardsMonths,
		}), [uSpacing({
			KOMSpacingID: 'alfa-forward',
			KOMSpacingInterval: (365 / 12 * KOMDeckRetireCardsMonths * 1.2),
			$KOMSpacingCard,
		}), uSpacing({
			KOMSpacingID: 'alfa-backward',
			KOMSpacingInterval: (365 / 12 * KOMDeckRetireCardsMonths * 1.2),
			$KOMSpacingCard,
		})]), [$KOMSpacingCard]);
	});

});

describe('KOMReviewDeckSort', function test_KOMReviewDeckSort() {

	it('throws if not array', function () {
		throws(function () {
			mod.KOMReviewDeckSort(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns array', function () {
		deepEqual(mod.KOMReviewDeckSort([]), []);
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
		deepEqual(mod.KOMReviewDeckSort(items), items.reverse());
	});

});

describe('KOMReviewTotalMinutes', function test_KOMReviewTotalMinutes() {

	it('throws if not number', function () {
		throws(function () {
			mod.KOMReviewTotalMinutes('10000');
		}, /KOMErrorInputNotValid/);
	});

	it('returns number', function () {
		deepEqual(mod.KOMReviewTotalMinutes(60000), 1);
	});

	it('calculates fraction', function () {
		deepEqual(mod.KOMReviewTotalMinutes(30000), 0.5);
	});

	it('rounds to first decimal', function () {
		deepEqual(mod.KOMReviewTotalMinutes(15000), 0.3);
	});

});

describe('KOMReviewTodayTotalMilliseconds', function test_KOMReviewTodayTotalMilliseconds() {

	it('throws if not array', function () {
		throws(function () {
			mod.KOMReviewTodayTotalMilliseconds(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns number', function () {
		deepEqual(mod.KOMReviewTodayTotalMilliseconds([]), 0);
	});

	it('counts time until response', function () {
		deepEqual(mod.KOMReviewTodayTotalMilliseconds([kTesting.StubSpacingObjectValid()]), 10000);
	});

	it('counts multiple spacings', function () {
		deepEqual(mod.KOMReviewTodayTotalMilliseconds([kTesting.StubSpacingObjectValid(), kTesting.StubSpacingObjectValid()]), 20000);
	});

	it('counts multiple chronicles from today', function () {
		deepEqual(mod.KOMReviewTodayTotalMilliseconds([kTesting.StubSpacingObjectValid([
			kTesting.StubChronicleObjectValid(),
			kTesting.StubChronicleObjectValid(),
		])]), 20000);
	});

	it('ignores chronicle from other days', function () {
		deepEqual(mod.KOMReviewTodayTotalMilliseconds([kTesting.StubSpacingObjectValid([
			kTesting.StubChronicleObjectValid(kTesting.StubPastDate()),
		])]), 0);
	});

});

describe('KOMReviewTodayReviewAccuracy', function test_KOMReviewTodayReviewAccuracy() {

	it('throws if not array', function () {
		throws(function () {
			mod.KOMReviewTodayReviewAccuracy(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns number', function () {
		deepEqual(mod.KOMReviewTodayReviewAccuracy([]), 0);
	});

	it('excludes if no KOMChronicleMultiplier', function () {
		deepEqual(mod.KOMReviewTodayReviewAccuracy([kTesting.StubSpacingObjectValid()]), 0);
	});

	it('excludes if unseen today', function () {
		deepEqual(mod.KOMReviewTodayReviewAccuracy([kTesting.StubSpacingObjectValid()]), 0);
	});

	it('excludes if not today', function () {
		deepEqual(mod.KOMReviewTodayReviewAccuracy([kTesting.StubSpacingObjectValid([
			Object.assign(kTesting.StubChronicleObjectValid(kTesting.StubPastDate()), {
				KOMChronicleMultiplier: 1,
			}),
			kTesting.StubChronicleObjectValid(kTesting.StubPastDate()),
		])]), 0);
	});

	it('excludes if not first error', function () {
		deepEqual(mod.KOMReviewTodayReviewAccuracy([kTesting.StubSpacingObjectValid([
			Object.assign(kTesting.StubChronicleObjectValid(), {
				KOMChronicleResponseType: KOMPlayLogic.KOMPlayResponseTypeAgain(),
			}),
		])]), 0);
	});

	it('calculates if correct', function () {
		deepEqual(mod.KOMReviewTodayReviewAccuracy([kTesting.StubSpacingObjectValid([
			Object.assign(kTesting.StubChronicleObjectValid(kTesting.StubPastDate()), {
				KOMChronicleMultiplier: 1,
			}),
			kTesting.StubChronicleObjectValid(),
		])]), 1);
	});

	it('calculates if not correct', function () {
		deepEqual(mod.KOMReviewTodayReviewAccuracy([kTesting.StubSpacingObjectValid([
			Object.assign(kTesting.StubChronicleObjectValid(kTesting.StubPastDate()), {
				KOMChronicleMultiplier: 1,
			}),
			Object.assign(kTesting.StubChronicleObjectValid(), {
				KOMChronicleResponseType: KOMPlayLogic.KOMPlayResponseTypeAgain(),
			}),
		])]), 0);
	});

	it('calculates if multiple', function () {
		deepEqual(mod.KOMReviewTodayReviewAccuracy([kTesting.StubSpacingObjectValid([
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
			mod.KOMReviewTodayPercentage('10000');
		}, /KOMErrorInputNotValid/);
	});

	it('returns number', function () {
		deepEqual(mod.KOMReviewTodayPercentage(1), 100);
	});

	it('calculates fraction', function () {
		deepEqual(mod.KOMReviewTodayPercentage(0.5), 50);
	});

	it('rounds to first decimal', function () {
		deepEqual(mod.KOMReviewTodayPercentage(1.0 / 3), 33.3);
	});

});

describe('KOMReviewGeneralUpcomingDates', function test_KOMReviewGeneralUpcomingDates() {

	it('returns array', function () {
		deepEqual(mod.KOMReviewGeneralUpcomingDates(), Array.from(Array(KOMReviewGeneral.KOMReviewGeneralTableDays())).map(function (e, i) {
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
			mod.KOMReviewGeneralUpcomingFilter(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns array', function () {
		deepEqual(mod.KOMReviewGeneralUpcomingFilter([]), []);
	});

	it('excludes if unseen', function () {
		deepEqual(mod.KOMReviewGeneralUpcomingFilter([StubSpacingObjectValid()]), []);
	});

	it('excludes if before today', function () {
		deepEqual(mod.KOMReviewGeneralUpcomingFilter([StubSpacingObjectValid({
			KOMSpacingDueDate: uGroupingDate(-1),
		})]), []);
	});

	it('excludes if after KOMReviewGeneralTableDays', function () {
		deepEqual(mod.KOMReviewGeneralUpcomingFilter([StubSpacingObjectValid({
			KOMSpacingDueDate: uGroupingDate(1000 * 60 * 60 * 24 * KOMReviewGeneral.KOMReviewGeneralTableDays()),
		})]), []);
	});

	it('includes if today', function () {
		const item = StubSpacingObjectValid({
			KOMSpacingDueDate: uGroupingDate(),
		});
		deepEqual(mod.KOMReviewGeneralUpcomingFilter([item]), [item]);
	});

	it('includes if KOMReviewGeneralTableDays', function () {
		const item = StubSpacingObjectValid({
			KOMSpacingDueDate: uGroupingDate(1000 * 60 * 60 * 24 * KOMReviewGeneral.KOMReviewGeneralTableDays() - 1),
		});
		deepEqual(mod.KOMReviewGeneralUpcomingFilter([item]), [item]);
	});

});

describe('KOMReviewGeneralUpcomingGroupByDate', function test_KOMReviewGeneralUpcomingGroupByDate() {

	it('throws if not array', function () {
		throws(function () {
			mod.KOMReviewGeneralUpcomingGroupByDate(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns object', function () {
		deepEqual(mod.KOMReviewGeneralUpcomingGroupByDate([]), {});
	});

	it('groups by date if single', function () {
		const item = StubSpacingObjectValid({
			KOMSpacingDueDate: new Date(),
		});
		deepEqual(mod.KOMReviewGeneralUpcomingGroupByDate([item]), uGroup(item.KOMSpacingDueDate, item));
	});

	it('groups by date if multiple', function () {
		const item1 = StubSpacingObjectValid({
			KOMSpacingDueDate: new Date('2019-04-12T00:00:00Z'),
		});
		const item2 = StubSpacingObjectValid({
			KOMSpacingDueDate: new Date('2019-04-13T00:00:00Z'),
		});
		deepEqual(mod.KOMReviewGeneralUpcomingGroupByDate([item1, item2]), Object.assign(uGroup(item1.KOMSpacingDueDate, item1), uGroup(item2.KOMSpacingDueDate, item2)));
	});

	it('groups by date if duplicate', function () {
		const item1 = StubSpacingObjectValid({
			KOMSpacingDueDate: new Date(),
		});
		const item2 = StubSpacingObjectValid({
			KOMSpacingDueDate: new Date(),
		});
		deepEqual(mod.KOMReviewGeneralUpcomingGroupByDate([item1, item2]), uGroup(item1.KOMSpacingDueDate, [item1, item2]));
	});

});

describe('KOMReviewGeneralHistoricalDates', function test_KOMReviewGeneralHistoricalDates() {

	it('returns array', function () {
		deepEqual(mod.KOMReviewGeneralHistoricalDates(), Array.from(Array(KOMReviewGeneral.KOMReviewGeneralTableDays())).map(function (e, i) {
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
			mod.KOMReviewGeneralHistoricalFilter(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns array', function () {
		deepEqual(mod.KOMReviewGeneralHistoricalFilter([]), []);
	});

	it('excludes if unseen', function () {
		deepEqual(mod.KOMReviewGeneralHistoricalFilter([StubSpacingObjectValid()]), []);
	});

	it('excludes if after today', function () {
		deepEqual(mod.KOMReviewGeneralHistoricalFilter([StubSpacingObjectHistorical(uGroupingDate(1000 * 60 * 60 * 24))]), []);
	});

	it('excludes if before KOMReviewGeneralTableDays', function () {
		deepEqual(mod.KOMReviewGeneralHistoricalFilter([StubSpacingObjectHistorical(uGroupingDate(-1000 * 60 * 60 * 24 * KOMReviewGeneral.KOMReviewGeneralTableDays() - 1))]), []);
	});

	it('includes if today', function () {
		const item = StubSpacingObjectHistorical(uGroupingDate());
		deepEqual(mod.KOMReviewGeneralHistoricalFilter([item]), [item]);
	});

	it('includes if KOMReviewGeneralTableDays', function () {
		const item = StubSpacingObjectHistorical(uGroupingDate(-1000 * 60 * 60 * 24 * KOMReviewGeneral.KOMReviewGeneralTableDays()));
		deepEqual(mod.KOMReviewGeneralHistoricalFilter([item]), [item]);
	});

});

describe('KOMReviewGeneralHistoricalGroupByDate', function test_KOMReviewGeneralHistoricalGroupByDate() {

	it('throws if not array', function () {
		throws(function () {
			mod.KOMReviewGeneralHistoricalGroupByDate(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns object', function () {
		deepEqual(mod.KOMReviewGeneralHistoricalGroupByDate([]), {});
	});

	it('groups by date if single object', function () {
		const item = StubSpacingObjectHistorical();
		deepEqual(mod.KOMReviewGeneralHistoricalGroupByDate([item]), uGroup(item.KOMSpacingChronicles[0].KOMChronicleResponseDate, item));
	});

	it('groups by date if multiple objects', function () {
		const item1 = StubSpacingObjectHistorical(new Date('2019-04-12T00:00:00Z'));
		const item2 = StubSpacingObjectHistorical(new Date('2019-04-13T00:00:00Z'));

		deepEqual(mod.KOMReviewGeneralHistoricalGroupByDate([item1, item2]), Object.assign(uGroup(item1.KOMSpacingChronicles[0].KOMChronicleResponseDate, item1), uGroup(item2.KOMSpacingChronicles[0].KOMChronicleResponseDate, item2)));
	});

	it('groups by date if duplicate', function () {
		const item1 = StubSpacingObjectHistorical();
		const item2 = StubSpacingObjectHistorical();
		
		deepEqual(mod.KOMReviewGeneralHistoricalGroupByDate([item1, item2]), uGroup(item1.KOMSpacingChronicles[0].KOMChronicleResponseDate, [item1, item2]));
	});

	it('groups by date if multiple chronicle objects', function () {
		const item = Object.assign(StubSpacingObjectHistorical(), {
			KOMSpacingChronicles: [
				StubChronicleObjectValid(new Date('2019-04-12T00:00:00Z')),
				StubChronicleObjectValid(new Date('2019-04-13T00:00:00Z')),
			],
		});

		deepEqual(mod.KOMReviewGeneralHistoricalGroupByDate([item]), Object.assign(uGroup(item.KOMSpacingChronicles[0].KOMChronicleResponseDate, item), uGroup(item.KOMSpacingChronicles[1].KOMChronicleResponseDate, item)));
	});

	it('groups by date if multiple chronicle objects with duplicate date', function () {
		const item = Object.assign(StubSpacingObjectHistorical(), {
			KOMSpacingChronicles: [
				StubChronicleObjectValid(new Date('2019-04-12T00:00:00Z')),
				StubChronicleObjectValid(new Date('2019-04-12T00:00:00Z')),
			],
		});

		deepEqual(mod.KOMReviewGeneralHistoricalGroupByDate([item]), Object.assign(uGroup(item.KOMSpacingChronicles[0].KOMChronicleResponseDate, item)));
	});

});

describe('KOMReviewGeneralHistoricalTotalMilliseconds', function test_KOMReviewGeneralHistoricalTotalMilliseconds() {

	it('throws if not array', function () {
		throws(function () {
			mod.KOMReviewGeneralHistoricalTotalMilliseconds(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns number', function () {
		deepEqual(mod.KOMReviewGeneralHistoricalTotalMilliseconds([]), 0);
	});

	it('counts single', function () {
		deepEqual(mod.KOMReviewGeneralHistoricalTotalMilliseconds([StubChronicleObjectValid()]), 10000);
	});

	it('counts multiple', function () {
		deepEqual(mod.KOMReviewGeneralHistoricalTotalMilliseconds([StubChronicleObjectValid(), StubChronicleObjectValid()]), 20000);
	});

});
