const { throws, deepEqual, strictEqual, notStrictEqual } = require('assert');

const mod = require('./ui-logic.js').default;
const KOMSpacing = require('../_shared/KOMSpacing/main.js').default;
const OLSKMoment = require('OLSKMoment');

const uRepeat = function (param1, param2) {
	return Array.from(new Array(param1)).map(param2);
};

describe('KOMPlaySort', function test_KOMPlaySort() {

	const uItems = function (param1 = 4, param2 = Infinity, param3 = false) {
		return uRepeat(param1, function (e, i) {
			return uSpacingUnseen({
				KOMSpacingID: (i + 1).toString() + '-forward',
				KOMSpacingDueDate: i >= param2 ? new Date() : undefined,
				KOMSpacingChronicles: [],
			});
		}).concat(param3 ? uRepeat(param1, function (e, i) {
			return uSpacingUnseen({
				KOMSpacingID: (i + 1).toString() + '-backward',
				KOMSpacingDueDate: i >= param2 ? new Date() : undefined,
				KOMSpacingChronicles: [],
			});
		}) : []);
	};

	const uSlug = function (inputData) {
		return inputData.map(function (e) {
			return e.KOMSpacingID;
		}).join(',');
	};

	it('throws if not array', function () {
		throws(function () {
			mod.KOMPlaySort(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns array', function () {
		deepEqual(Array.isArray(mod.KOMPlaySort(uItems())), true);
	});

	it('creates copy', function () {
		const items = uItems();
		deepEqual(mod.KOMPlaySort(items) === items, false);
	});

	it('randomizes', function () {
		deepEqual(uRepeat(10, function (e) {
			return uSlug(mod.KOMPlaySort(uItems()));
		}).filter(function (value, index, self) {
			return self.indexOf(value) === index;
		}).length > 1, true);
	});

	context('unseen', function () {

		it('spaces single', function () {
			deepEqual(mod.KOMPlaySort(uItems(10, 1)).map(function (e, i) {
				if (!e.KOMSpacingDueDate) {
					return i;
				}
			}).join(''), '5');
		});

		it('spaces multiple', function () {
			deepEqual(mod.KOMPlaySort(uItems(10, 2)).map(function (e, i) {
				if (!e.KOMSpacingDueDate) {
					return i;
				}
			}).join(''), '36');
		});

		it('randomizes', function () {
			deepEqual(uRepeat(10, function (e) {
				return uSlug(mod.KOMPlaySort(uItems(10, 4)).filter(function (e) {
					return !e.KOMSpacingDueDate;
				}));
			}).filter(function (value, index, self) {
				return self.indexOf(value) === index;
			}).length > 1, true);
		});

	});

	context('siblings_unseen', function () {

		it('spaces with others', function () {
			deepEqual(mod.KOMPlaySort(uItems(5, 2, true)).map(function (e, i) {
				if (!e.KOMSpacingDueDate) {
					return i;
				}
			}).join(''), '2468');
		});

		it('sorts forward before backward', function () {
			deepEqual(mod.KOMPlaySort(uItems(10, Infinity, true)).filter(function (e, i, coll) {
				return coll.filter(function (item, index) {
					if (KOMSpacing.KOMSpacingIdentifier(item.KOMSpacingID) !== KOMSpacing.KOMSpacingIdentifier(e.KOMSpacingID)) {
						return false;
					}

					if (KOMSpacing.KOMSpacingLabel(item.KOMSpacingID) !== KOMSpacing.KOMSpacingLabelBackward()) {
						return false;
					}

					return index < i;
				}).length;
			}), []);
		});

		it('randomizes', function () {
			deepEqual(uRepeat(10, function (e) {
				return uSlug(mod.KOMPlaySort(uItems(10, Infinity, true)).filter(KOMSpacing.KOMSpacingIsBackward));
			}).filter(function (value, index, self) {
				return self.indexOf(value) === index;
			}).length > 1, true);
		});

		it('terminates if impossible to space apart from sibling', function () {
			const items = uItems(1, Infinity, true);
			deepEqual(mod.KOMPlaySort(items), items);
		});

	});

	context('siblings_review', function () {

		it('randomizes', function () {
			deepEqual(uRepeat(10, function (e) {
				return uSlug(mod.KOMPlaySort(uItems(10, 0, true)).filter(KOMSpacing.KOMSpacingIsBackward));
			}).filter(function (value, index, self) {
				return self.indexOf(value) === index;
			}).length > 1, true);
		});

	});

});

describe('KOMPlayStateIsValid', function test_KOMPlayStateIsValid() {

	it('throws if not object', function () {
		throws(function () {
			mod.KOMPlayStateIsValid(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns false if KOMPlayStateQueue not array', function () {
		deepEqual(mod.KOMPlayStateIsValid(StubStateObjectValid({
			KOMPlayStateQueue: null,
		})), false);
	});

	it('returns false if KOMPlayStateWait not array', function () {
		deepEqual(mod.KOMPlayStateIsValid(StubStateObjectValid({
			KOMPlayStateWait: null,
		})), false);
	});

	it('returns false if KOMPlayStateHistory not array', function () {
		deepEqual(mod.KOMPlayStateIsValid(StubStateObjectValid({
			KOMPlayStateHistory: null,
		})), false);
	});

	it('returns true', function () {
		deepEqual(mod.KOMPlayStateIsValid(StubStateObjectValid()), true);
	});

	context('KOMPlayStateCurrent', function () {

		it('returns false if not valid', function () {
			deepEqual(mod.KOMPlayStateIsValid(StubStateObjectValid({
				KOMPlayStateCurrent: {},
			})), false);
		});

		it('returns true', function () {
			deepEqual(mod.KOMPlayStateIsValid(StubStateObjectValid({
				KOMPlayStateCurrent: null,
			})), true);
		});

	});

	context('KOMPlayStateChronicle', function () {

		it('returns false if not object', function () {
			deepEqual(mod.KOMPlayStateIsValid(StubStateObjectValid({
				KOMPlayStateChronicle: null,
			})), false);
		});

		it('returns true', function () {
			deepEqual(mod.KOMPlayStateIsValid(StubStateObjectValid({
				KOMPlayStateChronicle: undefined,
			})), true);
		});

	});

	context('KOMPlayStateShouldRandomizeDueDates', function () {

		it('returns false if not boolean', function () {
			deepEqual(mod.KOMPlayStateIsValid(StubStateObjectValid({
				KOMPlayStateShouldRandomizeDueDates: null,
			})), false);
		});

		it('returns true', function () {
			deepEqual(mod.KOMPlayStateIsValid(StubStateObjectValid({
				KOMPlayStateShouldRandomizeDueDates: true,
			})), true);
		});

	});

	context('KOMPlayStatePairingIsEnabled', function () {

		it('returns false if not boolean', function () {
			deepEqual(mod.KOMPlayStateIsValid(StubStateObjectValid({
				KOMPlayStatePairingIsEnabled: null,
			})), false);
		});

		it('returns true', function () {
			deepEqual(mod.KOMPlayStateIsValid(StubStateObjectValid({
				KOMPlayStatePairingIsEnabled: true,
			})), true);
		});

	});

});

describe('KOMPlayResponseTypeAgain', function test_KOMPlayResponseTypeAgain() {

	it('returns string', function () {
		deepEqual(mod.KOMPlayResponseTypeAgain(), 'RESPONSE_AGAIN');
	});

});

describe('KOMPlayResponseTypeHard', function test_KOMPlayResponseTypeHard() {

	it('returns string', function () {
		deepEqual(mod.KOMPlayResponseTypeHard(), 'RESPONSE_HARD');
	});

});

describe('KOMPlayResponseTypeGood', function test_KOMPlayResponseTypeGood() {

	it('returns string', function () {
		deepEqual(mod.KOMPlayResponseTypeGood(), 'RESPONSE_GOOD');
	});

});

describe('KOMPlayResponseTypeEasy', function test_KOMPlayResponseTypeEasy() {

	it('returns string', function () {
		deepEqual(mod.KOMPlayResponseTypeEasy(), 'RESPONSE_EASY');
	});

});

describe('KOMPlayResponseTypes', function test_KOMPlayResponseTypes() {

	it('returns array', function () {
		deepEqual(mod.KOMPlayResponseTypes(), [
			mod.KOMPlayResponseTypeAgain(),
			mod.KOMPlayResponseTypeHard(),
			mod.KOMPlayResponseTypeGood(),
			mod.KOMPlayResponseTypeEasy(),
		]);
	});

});

describe('KOMPlayResponseIntervalAgain', function test_KOMPlayResponseIntervalAgain() {

	it('returns number', function () {
		deepEqual(mod.KOMPlayResponseIntervalAgain(), 1000 * 60);
	});

});

describe('KOMPlayResponseIntervalLearn', function test_KOMPlayResponseIntervalLearn() {

	it('returns number', function () {
		deepEqual(mod.KOMPlayResponseIntervalLearn(), 1000 * 60 * 10);
	});

});

describe('KOMPlayResponseIntervalGraduateDefault', function test_KOMPlayResponseIntervalGraduateDefault() {

	it('returns number', function () {
		deepEqual(mod.KOMPlayResponseIntervalGraduateDefault(), 1);
	});

});

describe('KOMPlayResponseIntervalGraduateEasy', function test_KOMPlayResponseIntervalGraduateEasy() {

	it('returns number', function () {
		deepEqual(mod.KOMPlayResponseIntervalGraduateEasy(), 4);
	});

});

describe('KOMPlayResponseIntervalOverdueDivisorHard', function test_KOMPlayResponseIntervalOverdueDivisorHard() {

	it('returns number', function () {
		deepEqual(mod.KOMPlayResponseIntervalOverdueDivisorHard(), 4);
	});

});

describe('KOMPlayResponseIntervalOverdueDivisorGood', function test_KOMPlayResponseIntervalOverdueDivisorGood() {

	it('returns number', function () {
		deepEqual(mod.KOMPlayResponseIntervalOverdueDivisorGood(), 2);
	});

});

describe('KOMPlayResponseIntervalOverdueDivisorEasy', function test_KOMPlayResponseIntervalOverdueDivisorEasy() {

	it('returns number', function () {
		deepEqual(mod.KOMPlayResponseIntervalOverdueDivisorEasy(), 1);
	});

});

describe('KOMPlayResponseIntervalOverdueDays', function test_KOMPlayResponseIntervalOverdueDays() {

	it('throws if param1 not valid', function () {
		throws(function () {
			mod.KOMPlayResponseIntervalOverdueDays({}, StubChronicleObjectValid2());
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param2 not prepared', function () {
		throws(function () {
			mod.KOMPlayResponseIntervalOverdueDays(uSpacingUnseen(), Object.assign(StubChronicleObjectValid2(), {
				KOMChronicleDrawDate: null,
			}));
		}, /KOMErrorInputNotValid/);
	});

	it('returns 0 if no KOMSpacingInterval', function () {
		deepEqual(mod.KOMPlayResponseIntervalOverdueDays(uSpacingUnseen(), StubChronicleObjectValid2()), 0);
	});

	it('returns 0 if KOMSpacingDueDate same day', function () {
		deepEqual(mod.KOMPlayResponseIntervalOverdueDays(uSpacingUnseen({
			KOMSpacingInterval: mod.KOMPlayResponseIntervalGraduateEasy(),
			KOMSpacingDueDate: new Date(`2020-05-02T12:00:00${ OLSKMoment.OLSKMomentStringOffset() }:00`),
		}), Object.assign(StubChronicleObjectValid2(), {
			KOMChronicleResponseDate: new Date(`2020-05-02T18:00:00${ OLSKMoment.OLSKMomentStringOffset() }:00`),
		})), 0);
	});

	it('returns days if KOMSpacingDueDate past', function () {
		deepEqual(mod.KOMPlayResponseIntervalOverdueDays(uSpacingUnseen({
			KOMSpacingInterval: mod.KOMPlayResponseIntervalGraduateEasy(),
			KOMSpacingDueDate: new Date(`2020-05-02T12:00:00${ OLSKMoment.OLSKMomentStringOffset() }:00`),
		}), Object.assign(StubChronicleObjectValid2(), {
			KOMChronicleResponseDate: new Date(`2020-05-12T18:00:00${ OLSKMoment.OLSKMomentStringOffset() }:00`),
		})), 10);
	});

});

describe('KOMPlayResponseIntervalOverdueBonus', function test_KOMPlayResponseIntervalOverdueBonus() {

	it('throws if param1 not valid', function () {
		throws(function () {
			mod.KOMPlayResponseIntervalOverdueBonus({}, StubChronicleObjectValid2());
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param2 not prepared', function () {
		throws(function () {
			mod.KOMPlayResponseIntervalOverdueBonus(uSpacingUnseen(), Object.assign(StubChronicleObjectValid2(), {
				KOMChronicleDrawDate: null,
			}));
		}, /KOMErrorInputNotValid/);
	});

	it('returns 0', function () {
		deepEqual(mod.KOMPlayResponseIntervalOverdueBonus(uSpacingUnseen({
			KOMSpacingInterval: mod.KOMPlayResponseIntervalGraduateEasy(),
			KOMSpacingDueDate: new Date(`2020-05-02T12:00:00${ OLSKMoment.OLSKMomentStringOffset() }:00`),
		}), Object.assign(StubChronicleObjectValid2(), {
			KOMChronicleResponseDate: new Date(`2020-05-12T18:00:00${ OLSKMoment.OLSKMomentStringOffset() }:00`),
			KOMChronicleResponseType: mod.KOMPlayResponseTypeAgain(),
		})), 0);
	});

	it('adjusts if Hard', function () {
		deepEqual(mod.KOMPlayResponseIntervalOverdueBonus(uSpacingUnseen({
			KOMSpacingInterval: mod.KOMPlayResponseIntervalGraduateEasy(),
			KOMSpacingDueDate: new Date(`2020-05-02T12:00:00${ OLSKMoment.OLSKMomentStringOffset() }:00`),
		}), Object.assign(StubChronicleObjectValid2(), {
			KOMChronicleResponseDate: new Date(`2020-05-12T18:00:00${ OLSKMoment.OLSKMomentStringOffset() }:00`),
			KOMChronicleResponseType: mod.KOMPlayResponseTypeHard(),
		})), 10 / mod.KOMPlayResponseIntervalOverdueDivisorHard());
	});

	it('adjusts if Good', function () {
		deepEqual(mod.KOMPlayResponseIntervalOverdueBonus(uSpacingUnseen({
			KOMSpacingInterval: mod.KOMPlayResponseIntervalGraduateEasy(),
			KOMSpacingDueDate: new Date(`2020-05-02T12:00:00${ OLSKMoment.OLSKMomentStringOffset() }:00`),
		}), Object.assign(StubChronicleObjectValid2(), {
			KOMChronicleResponseDate: new Date(`2020-05-12T18:00:00${ OLSKMoment.OLSKMomentStringOffset() }:00`),
			KOMChronicleResponseType: mod.KOMPlayResponseTypeGood(),
		})), 10 / mod.KOMPlayResponseIntervalOverdueDivisorGood());
	});

	it('adjusts if Easy', function () {
		deepEqual(mod.KOMPlayResponseIntervalOverdueBonus(uSpacingUnseen({
			KOMSpacingInterval: mod.KOMPlayResponseIntervalGraduateEasy(),
			KOMSpacingDueDate: new Date(`2020-05-02T12:00:00${ OLSKMoment.OLSKMomentStringOffset() }:00`),
		}), Object.assign(StubChronicleObjectValid2(), {
			KOMChronicleResponseDate: new Date(`2020-05-12T18:00:00${ OLSKMoment.OLSKMomentStringOffset() }:00`),
			KOMChronicleResponseType: mod.KOMPlayResponseTypeEasy(),
		})), 10 / mod.KOMPlayResponseIntervalOverdueDivisorEasy());
	});

});

describe('KOMPlayResponseMultiplierDefault', function test_KOMPlayResponseMultiplierDefault() {

	it('returns number', function () {
		deepEqual(mod.KOMPlayResponseMultiplierDefault(), 2.5);
	});

});

describe('KOMPlayResponseMultiplierMin', function test_KOMPlayResponseMultiplierMin() {

	it('returns number', function () {
		deepEqual(mod.KOMPlayResponseMultiplierMin(), 1.3);
	});

});

describe('KOMPlayResponseMultiplierHard', function test_KOMPlayResponseMultiplierHard() {

	it('returns number', function () {
		deepEqual(mod.KOMPlayResponseMultiplierHard(), 1.2);
	});

});

describe('KOMPlayResponseMultiplierSummandFail', function test_KOMPlayResponseMultiplierSummandFail() {

	it('returns number', function () {
		deepEqual(mod.KOMPlayResponseMultiplierSummandFail(), -0.2);
	});

});

describe('KOMPlayResponseMultiplierSummandGood', function test_KOMPlayResponseMultiplierSummandGood() {

	it('returns number', function () {
		deepEqual(mod.KOMPlayResponseMultiplierSummandGood(), 0);
	});

});

describe('KOMPlayResponseMultiplierSummandHard', function test_KOMPlayResponseMultiplierSummandHard() {

	it('returns number', function () {
		deepEqual(mod.KOMPlayResponseMultiplierSummandHard(), -0.15);
	});

});

describe('KOMPlayResponseMultiplierSummandEasy', function test_KOMPlayResponseMultiplierSummandEasy() {

	it('returns number', function () {
		deepEqual(mod.KOMPlayResponseMultiplierSummandEasy(), 0.15);
	});

});

describe('KOMPlayResponseMultiplierMultiplicandEasy', function test_KOMPlayResponseMultiplierMultiplicandEasy() {

	it('returns number', function () {
		deepEqual(mod.KOMPlayResponseMultiplierMultiplicandEasy(), 1.3);
	});

});

describe('KOMChronicleIsPrepared', function test_KOMChronicleIsPrepared() {

	it('throws if not object', function () {
		throws(function () {
			mod.KOMChronicleIsPrepared(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns false if KOMChronicleDrawDate not date', function () {
		deepEqual(mod.KOMChronicleIsPrepared(Object.assign(StubChronicleObjectPrepared(), {
			KOMChronicleDrawDate: new Date('alfa'),
		})), false);
	});

	it('returns false if KOMChronicleFlipDate not date', function () {
		deepEqual(mod.KOMChronicleIsPrepared(Object.assign(StubChronicleObjectPrepared(), {
			KOMChronicleFlipDate: new Date('alfa'),
		})), false);
	});

	it('returns false if KOMChronicleResponseDate not date', function () {
		deepEqual(mod.KOMChronicleIsPrepared(Object.assign(StubChronicleObjectPrepared(), {
			KOMChronicleResponseDate: new Date('alfa'),
		})), false);
	});

	it('returns false if KOMChronicleResponseType not valid', function () {
		deepEqual(mod.KOMChronicleIsPrepared(Object.assign(StubChronicleObjectPrepared(), {
			KOMChronicleResponseType: Math.random().toString(),
		})), false);
	});

	it('returns true', function () {
		deepEqual(mod.KOMChronicleIsPrepared(StubChronicleObjectPrepared()), true);
	});

});

describe('KOMChronicleIsValid', function test_KOMChronicleIsValid() {

	it('throws if not prepared', function () {
		throws(function () {
			mod.KOMChronicleIsValid(mod.KOMChronicleIsValid(Object.assign(StubChronicleObjectValid2(), {
				KOMChronicleDrawDate: new Date('alfa'),
			})));
		}, /KOMErrorInputNotValid/);
	});

	it('returns false if KOMChronicleDueDate not date', function () {
		deepEqual(mod.KOMChronicleIsValid(Object.assign(StubChronicleObjectValid2(), {
			KOMChronicleDueDate: new Date('alfa'),
		})), false);
	});

	it('returns true', function () {
		deepEqual(mod.KOMChronicleIsValid(StubChronicleObjectValid2()), true);
	});

	context('KOMChronicleIsLearning', function () {

		it('returns false if not boolean', function () {
			deepEqual(mod.KOMChronicleIsValid(Object.assign(StubChronicleObjectValid2(), {
				KOMChronicleIsLearning: 'true',
			})), false);
		});

		it('returns true', function () {
			deepEqual(mod.KOMChronicleIsValid(Object.assign(StubChronicleObjectValid2(), {
				KOMChronicleIsLearning: true,
			})), true);
		});

	});

	context('KOMChronicleIsReadyToGraduate', function () {

		it('returns false if not boolean', function () {
			deepEqual(mod.KOMChronicleIsValid(Object.assign(StubChronicleObjectValid2(), {
				KOMChronicleIsReadyToGraduate: 'true',
			})), false);
		});

		it('returns true', function () {
			deepEqual(mod.KOMChronicleIsValid(Object.assign(StubChronicleObjectValid2(), {
				KOMChronicleIsReadyToGraduate: true,
			})), true);
		});

	});

	context('KOMChronicleInterval', function () {

		it('returns false if KOMChronicleInterval not number', function () {
			deepEqual(mod.KOMChronicleIsValid(Object.assign(StubChronicleObjectValid2(), {
				KOMChronicleInterval: '1',
			})), false);
		});

		it('returns true', function () {
			deepEqual(mod.KOMChronicleIsValid(Object.assign(StubChronicleObjectValid2(), {
				KOMChronicleInterval: 1,
			})), true);
		});

	});

	context('KOMChronicleMultiplier', function () {

		it('returns false if KOMChronicleMultiplier not number', function () {
			deepEqual(mod.KOMChronicleIsValid(Object.assign(StubChronicleObjectValid2(), {
				KOMChronicleMultiplier: '1',
			})), false);
		});

		it('returns true', function () {
			deepEqual(mod.KOMChronicleIsValid(Object.assign(StubChronicleObjectValid2(), {
				KOMChronicleMultiplier: 1,
			})), true);
		});

	});

	context('KOMChronicleDidDrawMultipleTimes', function () {

		it('returns false if not boolean', function () {
			deepEqual(mod.KOMChronicleIsValid(Object.assign(StubChronicleObjectValid2(), {
				KOMChronicleDidDrawMultipleTimes: 'true',
			})), false);
		});

		it('returns true', function () {
			deepEqual(mod.KOMChronicleIsValid(Object.assign(StubChronicleObjectValid2(), {
				KOMChronicleDidDrawMultipleTimes: true,
			})), true);
		});

	});

	context('KOMChronicleDidFlipMultipleTimes', function () {

		it('returns false if not boolean', function () {
			deepEqual(mod.KOMChronicleIsValid(Object.assign(StubChronicleObjectValid2(), {
				KOMChronicleDidFlipMultipleTimes: 'true',
			})), false);
		});

		it('returns true', function () {
			deepEqual(mod.KOMChronicleIsValid(Object.assign(StubChronicleObjectValid2(), {
				KOMChronicleDidFlipMultipleTimes: true,
			})), true);
		});

	});

});

describe('KOMChronicleGenerateDraw', function test_KOMChronicleGenerateDraw() {

	it('throws if param1 not date', function () {
		throws(function () {
			mod.KOMChronicleGenerateDraw(new Date('alfa'), uSpacingUnseen());
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param2 not valid', function () {
		throws(function () {
			mod.KOMChronicleGenerateDraw(new Date(), {});
		}, /KOMErrorInputNotValid/);
	});

	it('returns object', function () {
		const item = new Date();
		deepEqual(mod.KOMChronicleGenerateDraw(item, uSpacingUnseen()), {
			KOMChronicleDrawDate: item,
		});
	});

	context('KOMChronicleDidDrawMultipleTimes', function () {

		it('sets undefined if KOMSpacingDrawDate undefined', function () {
			deepEqual(mod.KOMChronicleGenerateDraw(new Date(), uSpacingUnseen()).KOMChronicleDidDrawMultipleTimes, undefined);
		});

		it('sets undefined if KOMSpacingDrawDate past', function () {
			deepEqual(mod.KOMChronicleGenerateDraw(new Date(), uSpacingUnseen({
				KOMSpacingDrawDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
			})).KOMChronicleDidDrawMultipleTimes, undefined);
		});

		it('sets undefined if KOMSpacingDrawDate today and unseen', function () {
			deepEqual(mod.KOMChronicleGenerateDraw(new Date(), uSpacingUnseen({
				KOMSpacingDrawDate: new Date(),
			})).KOMChronicleDidDrawMultipleTimes, undefined);
		});

		it('sets undefined if KOMSpacingDrawDate today and learning', function () {
			deepEqual(mod.KOMChronicleGenerateDraw(new Date(), uSpacingUnseen({
				KOMSpacingDrawDate: new Date(),
			})).KOMChronicleDidDrawMultipleTimes, undefined);
		});

		it('sets true if KOMSpacingDrawDate today and reviewing', function () {
			deepEqual(mod.KOMChronicleGenerateDraw(new Date(), uSpacingUnseen({
				KOMSpacingDrawDate: new Date(),
				KOMSpacingInterval: mod.KOMPlayResponseIntervalGraduateEasy(),
			})).KOMChronicleDidDrawMultipleTimes, true);
		});

	});

});

describe('KOMPlayStateDraw', function test_KOMPlayStateDraw() {

	it('throws if not valid', function () {
		throws(function () {
			mod.KOMPlayStateDraw({});
		}, /KOMErrorInputNotValid/);
	});

	it('returns input', function () {
		const item = StubStateObjectValid({
			KOMPlayStateQueue: [StubSpacingObjectValid()],
		});
		strictEqual(mod.KOMPlayStateDraw(item), item);
	});

	it('does not throw if queue if empty', function () {
		const item = StubStateObjectValid({
			KOMPlayStateQueue: [],
		});
		deepEqual(mod.KOMPlayStateDraw(item), item);
	});

	context('KOMPlayStateCurrent', function () {
		
		it('sets to null if KOMPlayStateQueue empty', function () {
			const item = StubSpacingObjectValid();
			deepEqual(mod.KOMPlayStateDraw(StubStateObjectValid()).KOMPlayStateCurrent, null);
		});

		it('sets to first from KOMPlayStateQueue', function () {
			const item = StubSpacingObjectValid();
			deepEqual(mod.KOMPlayStateDraw(StubStateObjectValid({
				KOMPlayStateQueue: [item],
			})).KOMPlayStateCurrent, item);
		});	

		it('sets KOMSpacingDrawDate to KOMChronicleDrawDate', function () {
			const item = mod.KOMPlayStateDraw(StubStateObjectValid({
				KOMPlayStateQueue: [StubSpacingObjectValid()],
			}));
			deepEqual(item.KOMPlayStateCurrent.KOMSpacingDrawDate, item.KOMPlayStateChronicle.KOMChronicleDrawDate);
		});

		context('sibling history', function () {
			
			it('sets to second if same card', function () {
				const KOMSpacingID = Math.random().toString() + '-' + uRandomElement(KOMSpacing.KOMSpacingLabelForward(), KOMSpacing.KOMSpacingLabelBackward());
				const item = StubSpacingObjectValid();
				deepEqual(mod.KOMPlayStateDraw(StubStateObjectValid({
					KOMPlayStateQueue: [StubSpacingObjectValid({
						KOMSpacingID,
					}), item],
						KOMPlayStateHistory: [[StubSpacingObjectValid({
							KOMSpacingID,
					})]],
				})).KOMPlayStateCurrent, item);
			});
			
			it('sets to first if only one', function () {
				const KOMSpacingID = Math.random().toString() + '-' + uRandomElement(KOMSpacing.KOMSpacingLabelForward(), KOMSpacing.KOMSpacingLabelBackward());
				const item = StubSpacingObjectValid({
					KOMSpacingID,
				});
				deepEqual(mod.KOMPlayStateDraw(StubStateObjectValid({
					KOMPlayStateQueue: [item],
						KOMPlayStateHistory: [[StubSpacingObjectValid({
						KOMSpacingID,
					})]],
				})).KOMPlayStateCurrent, item);
			});
		
		});
	
	});

	context('KOMPlayStateQueue', function () {
		
		it('removes first item', function () {
			const item = StubSpacingObjectValid();
			deepEqual(mod.KOMPlayStateDraw(StubStateObjectValid({
				KOMPlayStateQueue: [item],
			})).KOMPlayStateQueue, []);
		});
		
		it('creates copy', function () {
			const KOMPlayStateQueue = [StubSpacingObjectValid()];
			notStrictEqual(mod.KOMPlayStateDraw(StubStateObjectValid({
				KOMPlayStateQueue,
			})).KOMPlayStateQueue, KOMPlayStateQueue);
		});
	
	});

	it('sets KOMPlayStateChronicle', function () {
		const item = StubSpacingObjectValid();
		const paramDate = new Date();
		deepEqual(mod.KOMPlayStateDraw(StubStateObjectValid({
			KOMPlayStateQueue: [item],
		}), {
			paramDate,
		}).KOMPlayStateChronicle, mod.KOMChronicleGenerateDraw(paramDate, item));
	});

	context('KOMPlayStatePairingIsEnabled', function () {

		context('KOMPlayStateCurrentPair', function () {
			
			it('ignores if KOMPlayStateQueue empty', function () {
				deepEqual(mod.KOMPlayStateDraw(StubStateObjectValid({
					KOMPlayStatePairingIsEnabled: true,
					KOMPlayStateQueue: [StubSpacingObjectValid({}, KOMSpacing.KOMSpacingLabelBackward())],
				})).KOMPlayStateCurrentPair, null);
			});

			it('ignores if KOMPlayStateQueue has no corresponding', function () {
				deepEqual(mod.KOMPlayStateDraw(StubStateObjectValid({
					KOMPlayStatePairingIsEnabled: true,
					KOMPlayStateQueue: [
						StubSpacingObjectValid({}, KOMSpacing.KOMSpacingLabelBackward()),
						StubSpacingObjectValid({}, KOMSpacing.KOMSpacingLabelForward()),
						],
				})).KOMPlayStateCurrentPair, null);
			});

			it('ignores if current has too many words', function () {
				const label = uRandomElement(KOMSpacing.KOMSpacingLabelForward(), KOMSpacing.KOMSpacingLabelBackward());
				deepEqual(mod.KOMPlayStateDraw(StubStateObjectValid({
					KOMPlayStatePairingIsEnabled: true,
					KOMPlayStateQueue: [
						StubSpacingObjectValid({
							$KOMSpacingCard: StubCardObjectValid({
								KOMCardFrontText: uRepeat(3, function () {
									return Math.random().toString()
								}).join(' '),
								KOMCardRearText: uRepeat(3, function () {
									return Math.random().toString()
								}).join(' '),
							}),
						}, label),
						StubSpacingObjectValid({
							$KOMSpacingCard: StubCardObjectValid(),
						}, label),
						],
				})).KOMPlayStateCurrentPair, null);
			});

			it('ignores if corresponding has too many words', function () {
				const label = uRandomElement(KOMSpacing.KOMSpacingLabelForward(), KOMSpacing.KOMSpacingLabelBackward());
				deepEqual(mod.KOMPlayStateDraw(StubStateObjectValid({
					KOMPlayStatePairingIsEnabled: true,
					KOMPlayStateQueue: [
						StubSpacingObjectValid({
							$KOMSpacingCard: StubCardObjectValid({}),
						}, label),
						StubSpacingObjectValid({
							$KOMSpacingCard: StubCardObjectValid({
								KOMCardFrontText: uRepeat(3, function () {
									return Math.random().toString()
								}).join(' '),
								KOMCardRearText: uRepeat(3, function () {
									return Math.random().toString()
								}).join(' '),
							}),
						}, label),
						],
				})).KOMPlayStateCurrentPair, null);
			});

			it('sets to first corresponding from KOMPlayStateQueue', function () {
				const label = uRandomElement(KOMSpacing.KOMSpacingLabelForward(), KOMSpacing.KOMSpacingLabelBackward());
				const labelAlt = label === KOMSpacing.KOMSpacingLabelForward() ? KOMSpacing.KOMSpacingLabelBackward() : KOMSpacing.KOMSpacingLabelForward();
				const item = StubSpacingObjectValid({}, label);
				deepEqual(mod.KOMPlayStateDraw(StubStateObjectValid({
					KOMPlayStatePairingIsEnabled: true,
					KOMPlayStateQueue: [
						StubSpacingObjectValid({}, label),
						StubSpacingObjectValid({}, labelAlt),
						item,
						StubSpacingObjectValid({}, labelAlt),
					],
				})).KOMPlayStateCurrentPair, item);
			});	

			it('sets KOMSpacingDrawDate to KOMChronicleDrawDate', function () {
				const item = mod.KOMPlayStateDraw(StubStateObjectValid({
					KOMPlayStatePairingIsEnabled: true,
					KOMPlayStateQueue: [StubSpacingObjectValid(), StubSpacingObjectValid()],
				}));
				deepEqual(item.KOMPlayStateCurrentPair.KOMSpacingDrawDate, item.KOMPlayStateChronicle.KOMChronicleDrawDate);
			});	
		
		});

		context('KOMPlayStateQueue', function () {
			
			it('removes item', function () {
				const KOMPlayStateQueue = [
					StubSpacingObjectValid({}, KOMSpacing.KOMSpacingLabelBackward()),
					StubSpacingObjectValid({}, KOMSpacing.KOMSpacingLabelForward()),
					StubSpacingObjectValid({}, KOMSpacing.KOMSpacingLabelBackward()),
					StubSpacingObjectValid({}, KOMSpacing.KOMSpacingLabelForward()),
				];
				deepEqual(mod.KOMPlayStateDraw(StubStateObjectValid({
					KOMPlayStatePairingIsEnabled: true,
					KOMPlayStateQueue,
				})).KOMPlayStateQueue, [KOMPlayStateQueue[1], KOMPlayStateQueue[3]]);
			});
		
		});
	
	});

});

describe('KOMChronicleFlip', function test_KOMChronicleFlip() {

	it('throws if param1 not date', function () {
		throws(function () {
			mod.KOMChronicleFlip(new Date('alfa'), uSpacingUnseen());
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param2 not valid', function () {
		throws(function () {
			mod.KOMChronicleFlip(new Date(), {});
		}, /KOMErrorInputNotValid/);
	});

	it('returns object', function () {
		const item = new Date();
		deepEqual(mod.KOMChronicleFlip(item, uSpacingUnseen()), {
			KOMChronicleFlipDate: item,
		});
	});

	context('KOMChronicleDidFlipMultipleTimes', function () {

		it('sets undefined if KOMSpacingFlipDate undefined', function () {
			deepEqual(mod.KOMChronicleFlip(new Date(), uSpacingUnseen()).KOMChronicleDidFlipMultipleTimes, undefined);
		});

		it('sets undefined if KOMSpacingFlipDate past', function () {
			deepEqual(mod.KOMChronicleFlip(new Date(), uSpacingUnseen({
				KOMSpacingFlipDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
			})).KOMChronicleDidFlipMultipleTimes, undefined);
		});

		it('sets undefined if KOMSpacingFlipDate today and unseen', function () {
			deepEqual(mod.KOMChronicleFlip(new Date(), uSpacingUnseen({
				KOMSpacingFlipDate: new Date(),
			})).KOMChronicleDidFlipMultipleTimes, undefined);
		});

		it('sets undefined if KOMSpacingFlipDate today and learning', function () {
			deepEqual(mod.KOMChronicleFlip(new Date(), uSpacingUnseen({
				KOMSpacingFlipDate: new Date(),
			})).KOMChronicleDidFlipMultipleTimes, undefined);
		});

		it('sets true if KOMSpacingFlipDate today and reviewing', function () {
			deepEqual(mod.KOMChronicleFlip(new Date(), uSpacingUnseen({
				KOMSpacingFlipDate: new Date(),
				KOMSpacingInterval: mod.KOMPlayResponseIntervalGraduateEasy(),
			})).KOMChronicleDidFlipMultipleTimes, true);
		});

	});

});

describe('KOMPlayStateFlip', function test_KOMPlayStateFlip() {

	it('throws if not valid', function () {
		throws(function () {
			mod.KOMPlayStateFlip({});
		}, /KOMErrorInputNotValid/);
	});

	it('returns input', function () {
		const item = StubStateObjectValid({
			KOMPlayStateCurrent: StubSpacingObjectValid(),
			KOMPlayStateChronicle: StubChronicleObjectValid(),
		});
		strictEqual(mod.KOMPlayStateFlip(item), item);
	});

	context('KOMPlayStateChronicle', function () {

		it('sets KOMChronicleFlipDate', function () {
			const item = StubSpacingObjectValid();
			const paramDate = new Date();
			deepEqual(mod.KOMPlayStateFlip(StubStateObjectValid({
				KOMPlayStateCurrent: item,
				KOMPlayStateChronicle: StubChronicleObjectValid(),
			}), {
				paramDate,
			}).KOMPlayStateChronicle.KOMChronicleFlipDate, mod.KOMChronicleFlip(paramDate, item).KOMChronicleFlipDate);
		});
	
	});

	context('KOMPlayStateCurrent', function () {
		
		it('sets KOMSpacingFlipDate to KOMChronicleFlipDate', function () {
			const item = mod.KOMPlayStateFlip(StubStateObjectValid({
				KOMPlayStateCurrent: StubSpacingObjectValid(),
				KOMPlayStateChronicle: StubChronicleObjectValid(),
			}));
			deepEqual(item.KOMPlayStateCurrent.KOMSpacingFlipDate, item.KOMPlayStateChronicle.KOMChronicleFlipDate);
		});	
	
	});

	context('KOMPlayStateCurrentPair', function () {

		it('sets KOMSpacingFlipDate to KOMChronicleFlipDate', function () {
			const item = mod.KOMPlayStateFlip(StubStateObjectValid({
				KOMPlayStatePairingIsEnabled: true,
				KOMPlayStateCurrent: StubSpacingObjectValid(),
				KOMPlayStateCurrentPair: StubSpacingObjectValid(),
				KOMPlayStateChronicle: StubChronicleObjectValid(),
			}));
			deepEqual(item.KOMPlayStateCurrentPair.KOMSpacingFlipDate, item.KOMPlayStateChronicle.KOMChronicleFlipDate);
		});	
	
	});

});

describe('KOMChronicleUndo', function test_KOMChronicleUndo() {

	it('throws if not valid', function () {
		throws(function () {
			mod.KOMChronicleUndo({});
		}, /KOMErrorInputNotValid/);
	});

	it('throws if no KOMSpacingChronicles', function () {
		throws(function () {
			mod.KOMChronicleUndo(uSpacingUnseen());
		}, /KOMErrorInputNotValid/);
	});

	it('returns input', function () {
		const item = uSpacingUnseen({
			KOMSpacingChronicles: [StubChronicleObjectValid2()],
		});

		strictEqual(mod.KOMChronicleUndo(item) === item, true);
	});

	it('removes last KOMSpacingChronicles item', function () {
		deepEqual(mod.KOMChronicleUndo(uSpacingUnseen({
			KOMSpacingChronicles: [StubChronicleObjectValid2(), StubChronicleObjectValid2()],
		})).KOMSpacingChronicles, [StubChronicleObjectValid2()]);
	});

	it('keeps KOMSpacingDrawDate', function () {
		deepEqual(mod.KOMChronicleUndo(uSpacingUnseen({
			KOMSpacingDrawDate: new Date('2019-02-23T12:00:00Z'),
			KOMSpacingIsLearning: true,
			KOMSpacingChronicles: [StubChronicleObjectValid2()],
		})), uSpacingUnseen({
			KOMSpacingDrawDate: new Date('2019-02-23T12:00:00Z'),
		}));
	});

	it('keeps KOMSpacingFlipDate', function () {
		deepEqual(mod.KOMChronicleUndo(uSpacingUnseen({
			KOMSpacingFlipDate: new Date('2019-02-23T12:00:00Z'),
			KOMSpacingIsLearning: true,
			KOMSpacingChronicles: [StubChronicleObjectValid2()],
		})), uSpacingUnseen({
			KOMSpacingFlipDate: new Date('2019-02-23T12:00:00Z'),
		}));
	});

	it('keeps relations', function () {
		deepEqual(mod.KOMChronicleUndo(uSpacingUnseen({
			KOMSpacingIsLearning: true,
			KOMSpacingChronicles: [StubChronicleObjectValid2()],
			$alfa: 'bravo',
		})), uSpacingUnseen({
			$alfa: 'bravo',
		}));
	});

	context('with no history', function () {

		it('removes existing properties', function () {
			deepEqual(mod.KOMChronicleUndo(uSpacingUnseen({
				KOMSpacingIsLearning: true,
				KOMSpacingChronicles: [StubChronicleObjectValid2()],
			})), uSpacingUnseen());
		});

	});

	context('with history', function () {

		it('sets spacing properties', function () {
			const item = Object.assign(StubChronicleObjectValid2(), {
				KOMChronicleIsLearning: true,
			});
			deepEqual(mod.KOMChronicleUndo(uSpacingUnseen({
				KOMSpacingChronicles: [item, StubChronicleObjectValid2()],
			})), uSpacingUnseen({
				KOMSpacingChronicles: [item],
				KOMSpacingIsLearning: true,
				KOMSpacingDrawDate: new Date('2019-02-23T12:00:00Z'),
				KOMSpacingFlipDate: new Date('2019-02-23T12:00:00Z'),
				KOMSpacingDueDate: new Date('2019-02-23T12:00:00Z'),
			}));
		});

		it('removes existing properties', function () {
			const item = Object.assign(StubChronicleObjectValid2(), {
				KOMChronicleIsLearning: true,
			});
			deepEqual(mod.KOMChronicleUndo(uSpacingUnseen({
				KOMSpacingIsLearning: true,
				KOMSpacingChronicles: [item, StubChronicleObjectValid2()],
			})), uSpacingUnseen({
				KOMSpacingChronicles: [item],
				KOMSpacingIsLearning: true,
				KOMSpacingDrawDate: new Date('2019-02-23T12:00:00Z'),
				KOMSpacingFlipDate: new Date('2019-02-23T12:00:00Z'),
				KOMSpacingDueDate: new Date('2019-02-23T12:00:00Z'),
			}));
		});

	});

});

describe('KOMPlayStateUndo', function test_KOMPlayStateUndo() {

	it('throws if not valid', function () {
		throws(function () {
			mod.KOMPlayStateUndo({});
		}, /KOMErrorInputNotValid/);
	});

	it('returns input', function () {
		const item = StubStateObjectValid({
			KOMPlayStateCurrent: StubSpacingObjectValid(),
			KOMPlayStateHistory: [[StubSpacingObjectHistorical()]],
		});
		strictEqual(mod.KOMPlayStateUndo(item), item);
	});

	context('KOMPlayStateCurrent', function () {

		it('sets to first from KOMPlayStateHistory', function () {
			const item = StubSpacingObjectHistorical();
			deepEqual(mod.KOMPlayStateUndo(StubStateObjectValid({
				KOMPlayStateCurrent: StubSpacingObjectValid(),
				KOMPlayStateQueue: [],
				KOMPlayStateHistory: [[item, StubSpacingObjectHistorical()]],
			})).KOMPlayStateCurrent, item);
		});
	
	});

	context('KOMPlayStateCurrentPair', function () {

		it('sets to first from KOMPlayStateHistory', function () {
			const item = StubSpacingObjectHistorical();
			deepEqual(mod.KOMPlayStateUndo(StubStateObjectValid({
				KOMPlayStateCurrentPair: StubSpacingObjectValid(),
				KOMPlayStateQueue: [],
				KOMPlayStateHistory: [[StubSpacingObjectHistorical(), item]],
			})).KOMPlayStateCurrentPair, item);
		});
	
	});

	context('KOMPlayStateQueue', function () {

		it('adds KOMPlayStateCurrent', function () {
			const item = StubSpacingObjectValid();
			deepEqual(mod.KOMPlayStateUndo(StubStateObjectValid({
				KOMPlayStateCurrent: item,
				KOMPlayStateQueue: [],
				KOMPlayStateHistory: [[StubSpacingObjectHistorical()]],
			})).KOMPlayStateQueue, [item]);
		});

		it('adds KOMPlayStateCurrentPair', function () {
			const KOMPlayStateCurrent = StubSpacingObjectValid();
			const KOMPlayStateCurrentPair = StubSpacingObjectValid();
			deepEqual(mod.KOMPlayStateUndo(StubStateObjectValid({
				KOMPlayStateCurrent,
				KOMPlayStateCurrentPair,
				KOMPlayStateQueue: [],
				KOMPlayStateHistory: [[StubSpacingObjectHistorical()]],
			})).KOMPlayStateQueue, [KOMPlayStateCurrentPair, KOMPlayStateCurrent]);
		});
	
	});

	context('KOMPlayStateHistory', function () {

		it('removes last item from KOMPlayStateHistory', function () {
			const item = StubSpacingObjectValid();
			deepEqual(mod.KOMPlayStateUndo(StubStateObjectValid({
				KOMPlayStateCurrent: StubSpacingObjectValid(),
				KOMPlayStateQueue: [],
				KOMPlayStateHistory: [[item], [StubSpacingObjectHistorical()]],
			})).KOMPlayStateHistory, [[item]]);
		});

		context('KOMPlayStateCurrent', function () {
			
			it('calls KOMChronicleUndo', function () {
				const item = StubSpacingObjectHistorical();
				deepEqual(mod.KOMPlayStateUndo(StubStateObjectValid({
					KOMPlayStateCurrent: StubSpacingObjectValid(),
					KOMPlayStateQueue: [],
					KOMPlayStateHistory: [[item]],
				})).KOMPlayStateCurrent.KOMSpacingChronicles, []);
			});
		
		});

		context('KOMPlayStateCurrentPair', function () {
			
			it('calls KOMChronicleUndo', function () {
				const item = StubSpacingObjectHistorical();
				deepEqual(mod.KOMPlayStateUndo(StubStateObjectValid({
					KOMPlayStateCurrent: StubSpacingObjectValid(),
					KOMPlayStateCurrentPair: StubSpacingObjectValid(),
					KOMPlayStateQueue: [],
					KOMPlayStateHistory: [[StubSpacingObjectHistorical(), item]],
				})).KOMPlayStateCurrentPair.KOMSpacingChronicles, []);
			});
		
		});
	
	});

});
