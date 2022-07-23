const { throws, deepEqual, notDeepEqual } = require('assert');

const mod = require('./ui-logic.js').default;
const KOMSpacing = require('../_shared/KOMSpacing/main.js').default;
const OLSKMoment = require('OLSKMoment');

const kTesting = {
	StubSpacingObjectValid() {
		return {
			KOMSpacingID: 'bravo-forward',
			KOMSpacingChronicles: [],
		};
	},
	uRepeat(param1, param2) {
		return Array.from(new Array(param1)).map(param2);
	},
};

describe('KOMPlaySort', function test_KOMPlaySort() {

	const uItems = function (param1 = 4, param2 = Infinity, param3 = false) {
		return kTesting.uRepeat(param1, function (e, i) {
			return Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingID: (i + 1).toString() + '-forward',
				KOMSpacingDueDate: i >= param2 ? new Date() : undefined,
				KOMSpacingChronicles: [],
			});
		}).concat(param3 ? kTesting.uRepeat(param1, function (e, i) {
			return Object.assign(kTesting.StubSpacingObjectValid(), {
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
		deepEqual(kTesting.uRepeat(10, function (e) {
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
			deepEqual(kTesting.uRepeat(10, function (e) {
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

		it('spaces apart from sibling', function () {
			deepEqual(kTesting.uRepeat(10, function (e) {
				return mod.KOMPlaySort(uItems(10, Infinity, true)).filter(function (e, i, coll) {
					return i && KOMSpacing.KOMSpacingIsBackward(e) && KOMSpacing.KOMSpacingIdentifier(e.KOMSpacingID) === KOMSpacing.KOMSpacingIdentifier(coll[i - 1].KOMSpacingID);
				});
			}).filter(function (e) {
				return e.length;
			}), []);
		});

		it('randomizes', function () {
			deepEqual(kTesting.uRepeat(10, function (e) {
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

		it('spaces apart from sibling', function () {
			deepEqual(kTesting.uRepeat(10, function (e) {
				return mod.KOMPlaySort(uItems(10, 0, true)).filter(function (e, i, coll) {
					return i && KOMSpacing.KOMSpacingIsBackward(e) && KOMSpacing.KOMSpacingIdentifier(e.KOMSpacingID) === KOMSpacing.KOMSpacingIdentifier(coll[i - 1].KOMSpacingID);
				});
			}).filter(function (e) {
				return e.length;
			}), []);
		});

		it('randomizes', function () {
			deepEqual(kTesting.uRepeat(10, function (e) {
				return uSlug(mod.KOMPlaySort(uItems(10, 0, true)).filter(KOMSpacing.KOMSpacingIsBackward));
			}).filter(function (value, index, self) {
				return self.indexOf(value) === index;
			}).length > 1, true);
		});

		it('terminates if impossible to space apart from sibling', function () {
			const items = uItems(1, 0, true);
			deepEqual(mod.KOMPlaySort(items), items);
		});

	});

	context('bug_mixed_forwards_not_first', function () {

		it('sorts forward before backward', function () {
			deepEqual(mod.KOMPlaySort(uItems(5, 2, true)).filter(function (e, i, coll) {
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

	});

});

describe('KOMPlayStateIsValid', function test_KOMPlayStateIsValid() {

	it('throws if not object', function () {
		throws(function () {
			mod.KOMPlayStateIsValid(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns false if KOMPlayStateQueue not array', function () {
		deepEqual(mod.KOMPlayStateIsValid(Object.assign(StubStateObjectValid(), {
			KOMPlayStateQueue: null,
		})), false);
	});

	it('returns false if KOMPlayStateWait not array', function () {
		deepEqual(mod.KOMPlayStateIsValid(Object.assign(StubStateObjectValid(), {
			KOMPlayStateWait: null,
		})), false);
	});

	it('returns false if KOMPlayStateHistory not array', function () {
		deepEqual(mod.KOMPlayStateIsValid(Object.assign(StubStateObjectValid(), {
			KOMPlayStateHistory: null,
		})), false);
	});

	it('returns true', function () {
		deepEqual(mod.KOMPlayStateIsValid(StubStateObjectValid()), true);
	});

	context('KOMPlayStateCurrent', function () {

		it('returns false if not valid', function () {
			deepEqual(mod.KOMPlayStateIsValid(Object.assign(StubStateObjectValid(), {
				KOMPlayStateCurrent: {},
			})), false);
		});

		it('returns true', function () {
			deepEqual(mod.KOMPlayStateIsValid(Object.assign(StubStateObjectValid(), {
				KOMPlayStateCurrent: null,
			})), true);
		});

	});

	context('KOMPlayStateShouldRandomizeDueDates', function () {

		it('returns false if not boolean', function () {
			deepEqual(mod.KOMPlayStateIsValid(Object.assign(StubStateObjectValid(), {
				KOMPlayStateShouldRandomizeDueDates: null,
			})), false);
		});

		it('returns true', function () {
			deepEqual(mod.KOMPlayStateIsValid(Object.assign(StubStateObjectValid(), {
				KOMPlayStateShouldRandomizeDueDates: true,
			})), true);
		});

	});

	context('KOMPlayStateIsMultiDraw', function () {

		it('returns false if not boolean', function () {
			deepEqual(mod.KOMPlayStateIsValid(Object.assign(StubStateObjectValid(), {
				KOMPlayStateIsMultiDraw: null,
			})), false);
		});

		it('returns true', function () {
			deepEqual(mod.KOMPlayStateIsValid(Object.assign(StubStateObjectValid(), {
				KOMPlayStateIsMultiDraw: true,
			})), true);
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
		const item = Object.assign(StubStateObjectValid(), {
			KOMPlayStateQueue: [Math.random().toString()],
		});
		deepEqual(mod.KOMPlayStateDraw(item), item);
	});

	it('moves from KOMPlayStateQueue to KOMPlayStateCurrent', function () {
		const item = Math.random().toString();
		deepEqual(mod.KOMPlayStateDraw(Object.assign(StubStateObjectValid(), {
			KOMPlayStateQueue: [item],
		})), StubStateObjectValid({
			KOMPlayStateCurrent: item,
		}));
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
			mod.KOMPlayResponseIntervalOverdueDays(kTesting.StubSpacingObjectValid(), Object.assign(StubChronicleObjectValid2(), {
				KOMChronicleDrawDate: null,
			}));
		}, /KOMErrorInputNotValid/);
	});

	it('returns 0 if no KOMSpacingInterval', function () {
		deepEqual(mod.KOMPlayResponseIntervalOverdueDays(kTesting.StubSpacingObjectValid(), StubChronicleObjectValid2()), 0);
	});

	it('returns 0 if KOMSpacingDueDate same day', function () {
		deepEqual(mod.KOMPlayResponseIntervalOverdueDays(Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingInterval: mod.KOMPlayResponseIntervalGraduateEasy(),
			KOMSpacingDueDate: new Date(`2020-05-02T12:00:00${ OLSKMoment.OLSKMomentStringOffset() }:00`),
		}), Object.assign(StubChronicleObjectValid2(), {
			KOMChronicleResponseDate: new Date(`2020-05-02T18:00:00${ OLSKMoment.OLSKMomentStringOffset() }:00`),
		})), 0);
	});

	it('returns days if KOMSpacingDueDate past', function () {
		deepEqual(mod.KOMPlayResponseIntervalOverdueDays(Object.assign(kTesting.StubSpacingObjectValid(), {
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
			mod.KOMPlayResponseIntervalOverdueBonus(kTesting.StubSpacingObjectValid(), Object.assign(StubChronicleObjectValid2(), {
				KOMChronicleDrawDate: null,
			}));
		}, /KOMErrorInputNotValid/);
	});

	it('returns 0', function () {
		deepEqual(mod.KOMPlayResponseIntervalOverdueBonus(Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingInterval: mod.KOMPlayResponseIntervalGraduateEasy(),
			KOMSpacingDueDate: new Date(`2020-05-02T12:00:00${ OLSKMoment.OLSKMomentStringOffset() }:00`),
		}), Object.assign(StubChronicleObjectValid2(), {
			KOMChronicleResponseDate: new Date(`2020-05-12T18:00:00${ OLSKMoment.OLSKMomentStringOffset() }:00`),
			KOMChronicleResponseType: mod.KOMPlayResponseTypeAgain(),
		})), 0);
	});

	it('adjusts if Hard', function () {
		deepEqual(mod.KOMPlayResponseIntervalOverdueBonus(Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingInterval: mod.KOMPlayResponseIntervalGraduateEasy(),
			KOMSpacingDueDate: new Date(`2020-05-02T12:00:00${ OLSKMoment.OLSKMomentStringOffset() }:00`),
		}), Object.assign(StubChronicleObjectValid2(), {
			KOMChronicleResponseDate: new Date(`2020-05-12T18:00:00${ OLSKMoment.OLSKMomentStringOffset() }:00`),
			KOMChronicleResponseType: mod.KOMPlayResponseTypeHard(),
		})), 10 / mod.KOMPlayResponseIntervalOverdueDivisorHard());
	});

	it('adjusts if Good', function () {
		deepEqual(mod.KOMPlayResponseIntervalOverdueBonus(Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingInterval: mod.KOMPlayResponseIntervalGraduateEasy(),
			KOMSpacingDueDate: new Date(`2020-05-02T12:00:00${ OLSKMoment.OLSKMomentStringOffset() }:00`),
		}), Object.assign(StubChronicleObjectValid2(), {
			KOMChronicleResponseDate: new Date(`2020-05-12T18:00:00${ OLSKMoment.OLSKMomentStringOffset() }:00`),
			KOMChronicleResponseType: mod.KOMPlayResponseTypeGood(),
		})), 10 / mod.KOMPlayResponseIntervalOverdueDivisorGood());
	});

	it('adjusts if Easy', function () {
		deepEqual(mod.KOMPlayResponseIntervalOverdueBonus(Object.assign(kTesting.StubSpacingObjectValid(), {
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
			mod.KOMChronicleGenerateDraw(new Date('alfa'), kTesting.StubSpacingObjectValid());
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param2 not valid', function () {
		throws(function () {
			mod.KOMChronicleGenerateDraw(new Date(), {});
		}, /KOMErrorInputNotValid/);
	});

	it('returns object', function () {
		const item = new Date();
		deepEqual(mod.KOMChronicleGenerateDraw(item, kTesting.StubSpacingObjectValid()), {
			KOMChronicleDrawDate: item,
		});
	});

	context('KOMChronicleDidDrawMultipleTimes', function () {

		it('sets undefined if KOMSpacingDrawDate undefined', function () {
			deepEqual(mod.KOMChronicleGenerateDraw(new Date(), kTesting.StubSpacingObjectValid()).KOMChronicleDidDrawMultipleTimes, undefined);
		});

		it('sets undefined if KOMSpacingDrawDate past', function () {
			deepEqual(mod.KOMChronicleGenerateDraw(new Date(), Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingDrawDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
			})).KOMChronicleDidDrawMultipleTimes, undefined);
		});

		it('sets undefined if KOMSpacingDrawDate today and unseen', function () {
			deepEqual(mod.KOMChronicleGenerateDraw(new Date(), Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingDrawDate: new Date(),
			})).KOMChronicleDidDrawMultipleTimes, undefined);
		});

		it('sets undefined if KOMSpacingDrawDate today and learning', function () {
			deepEqual(mod.KOMChronicleGenerateDraw(new Date(), Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingDrawDate: new Date(),
			})).KOMChronicleDidDrawMultipleTimes, undefined);
		});

		it('sets true if KOMSpacingDrawDate today and reviewing', function () {
			deepEqual(mod.KOMChronicleGenerateDraw(new Date(), Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingDrawDate: new Date(),
				KOMSpacingInterval: mod.KOMPlayResponseIntervalGraduateEasy(),
			})).KOMChronicleDidDrawMultipleTimes, true);
		});

	});

});

describe('KOMChronicleGenerateFlip', function test_KOMChronicleGenerateFlip() {

	it('throws if param1 not date', function () {
		throws(function () {
			mod.KOMChronicleGenerateFlip(new Date('alfa'), kTesting.StubSpacingObjectValid());
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param2 not valid', function () {
		throws(function () {
			mod.KOMChronicleGenerateFlip(new Date(), {});
		}, /KOMErrorInputNotValid/);
	});

	it('returns object', function () {
		const item = new Date();
		deepEqual(mod.KOMChronicleGenerateFlip(item, kTesting.StubSpacingObjectValid()), {
			KOMChronicleFlipDate: item,
		});
	});

	context('KOMChronicleDidFlipMultipleTimes', function () {

		it('sets undefined if KOMSpacingFlipDate undefined', function () {
			deepEqual(mod.KOMChronicleGenerateFlip(new Date(), kTesting.StubSpacingObjectValid()).KOMChronicleDidFlipMultipleTimes, undefined);
		});

		it('sets undefined if KOMSpacingFlipDate past', function () {
			deepEqual(mod.KOMChronicleGenerateFlip(new Date(), Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingFlipDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
			})).KOMChronicleDidFlipMultipleTimes, undefined);
		});

		it('sets undefined if KOMSpacingFlipDate today and unseen', function () {
			deepEqual(mod.KOMChronicleGenerateFlip(new Date(), Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingFlipDate: new Date(),
			})).KOMChronicleDidFlipMultipleTimes, undefined);
		});

		it('sets undefined if KOMSpacingFlipDate today and learning', function () {
			deepEqual(mod.KOMChronicleGenerateFlip(new Date(), Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingFlipDate: new Date(),
			})).KOMChronicleDidFlipMultipleTimes, undefined);
		});

		it('sets true if KOMSpacingFlipDate today and reviewing', function () {
			deepEqual(mod.KOMChronicleGenerateFlip(new Date(), Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingFlipDate: new Date(),
				KOMSpacingInterval: mod.KOMPlayResponseIntervalGraduateEasy(),
			})).KOMChronicleDidFlipMultipleTimes, true);
		});

	});

});

describe('KOMPlayRespond', function test_KOMPlayRespond() {

	const uState = function (param1, param2 = []) {
		return Object.assign(StubStateObjectValid(), {
			KOMPlayStateQueue: [].concat(param2),
			KOMPlayStateCurrent: param1,
		});
	};

	const uChronicle = function (inputData = {}) {
		return Object.assign(StubChronicleObjectPrepared(), inputData);
	};

	it('throws if param1 not valid', function () {
		throws(function () {
			mod.KOMPlayRespond({}, uChronicle());
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param2 not prepared', function () {
		throws(function () {
			mod.KOMPlayRespond(uState(), Object.assign(StubChronicleObjectValid2(), {
				KOMChronicleDrawDate: null,
			}));
		}, /KOMErrorInputNotValid/);
	});

	it('returns param1', function () {
		const item = uState(kTesting.StubSpacingObjectValid());
		deepEqual(mod.KOMPlayRespond(item, uChronicle()) === item, true);
	});

	context('param2', function () {

		const spacing = kTesting.StubSpacingObjectValid();
		const chronicle = uChronicle();

		before(function () {
			mod.KOMPlayRespond(uState(spacing), chronicle);
		});

		it('adds to KOMSpacingChronicles', function () {
			deepEqual(spacing.KOMSpacingChronicles[0] === chronicle, true);
		});

	});

	context('KOMPlayStateCurrent', function () {

		it('sets to null if queue empty', function () {
			deepEqual(mod.KOMPlayRespond(uState(kTesting.StubSpacingObjectValid()), uChronicle()), Object.assign(uState(), {
				KOMPlayStateCurrent: null,
			}));
		});

		it('sets to first in queue', function () {
			const item = kTesting.StubSpacingObjectValid();
			deepEqual(mod.KOMPlayRespond(uState(kTesting.StubSpacingObjectValid(), item), uChronicle()).KOMPlayStateCurrent === item, true);
		});

	});

	context('KOMPlayStateWait', function () {

		const uWait = function (inputData) {
			return Object.assign(uState(kTesting.StubSpacingObjectValid(), [kTesting.StubSpacingObjectValid()]), {
				KOMPlayStateWait: [Object.assign(kTesting.StubSpacingObjectValid(), {
					KOMSpacingDueDate: new Date(StubChronicleObjectValid2().KOMChronicleResponseDate.valueOf() + inputData),
				})],
			});
		};

		it('moves to queue if overdue', function () {
			const state = uWait(-1000);
			const queue = state.KOMPlayStateQueue.slice();
			const first = state.KOMPlayStateWait.slice()[0];
			deepEqual(mod.KOMPlayRespond(state, uChronicle()), Object.assign(uWait(-1000), {
				KOMPlayStateCurrent: first,
				KOMPlayStateQueue: queue,
				KOMPlayStateWait: [],
			}));
		});

		it('moves to queue if queue empty', function () {
			const state = Object.assign(uWait(1000), {
				KOMPlayStateQueue: [],
			});
			const wait = (state.KOMPlayStateWait = state.KOMPlayStateWait.concat(state.KOMPlayStateWait.slice())).slice();
			deepEqual(mod.KOMPlayRespond(state, uChronicle()), Object.assign(uWait(1000), {
				KOMPlayStateCurrent: wait[0],
				KOMPlayStateQueue: wait.slice(1),
				KOMPlayStateWait: [],
			}));
		});

		it('does nothing', function () {
			const state = uWait(1000);
			const first = state.KOMPlayStateQueue[0];
			deepEqual(mod.KOMPlayRespond(state, StubChronicleObjectValid2()), Object.assign(uWait(1000), {
				KOMPlayStateCurrent: first,
				KOMPlayStateQueue: [],
			}));
		});

	});

	context('KOMPlayStateShouldRandomizeDueDates', function () {

		const uIntervals = function (param1, param2 = 0) {
			return kTesting.uRepeat(10, function () {
				const date = new Date();
				const spacing = kTesting.StubSpacingObjectValid();
				const state = Object.assign(uState(spacing), {
					KOMPlayStateShouldRandomizeDueDates: true,
				});
				const chronicle = uChronicle({
					KOMChronicleResponseDate: date,
					KOMChronicleResponseType: mod.KOMPlayResponseTypeEasy(),
				});

				mod.KOMPlayRespond(state, chronicle);

				chronicle.KOMChronicleResponseType = mod.KOMPlayResponseTypeGood();

				for (var i = 0; i < param1; i++) {
					state.KOMPlayStateCurrent = spacing;
					mod.KOMPlayRespond(state, chronicle);
				}

				return Math.abs(spacing.KOMSpacingInterval - param2);
			});
		};

		it('randomizes KOMSpacingInterval', function () {
			deepEqual(uIntervals(1).filter(function (value, index, self) {
				return self.indexOf(value) === index;
			}).length > 1, true);
		});

		context('review_1', function () {

			const baseInterval = 10;

			it('deviates over 30 seconds', function () {
				deepEqual(uIntervals(2, baseInterval).filter(function (e) {
					return (e * 24 * 60 * 60) < 30;
				}), []);
			});

			it('deviates under 3 hours', function () {
				deepEqual(uIntervals(1, baseInterval).filter(function (e) {
					return (e * 24) > 3;
				}), []);
			});

		});

		context('review_2', function () {

			const baseInterval = 25;

			it.skip('deviates over 2 minutes', function () {
				deepEqual(uIntervals(2, baseInterval).filter(function (e) {
					return (e * 24 * 60) < 2;
				}), []);
			});

			it('deviates under 2 days', function () {
				deepEqual(uIntervals(2, baseInterval).filter(function (e) {
					return e > 2;
				}), []);
			});

		});

		context('review_3', function () {

			const baseInterval = 62.5;

			it('deviates over 3 hours', function () {
				deepEqual(uIntervals(3, baseInterval).filter(function (e) {
					return e * 24 < 3;
				}), []);
			});

			it('deviates under 4 days', function () {
				deepEqual(uIntervals(3, baseInterval).filter(function (e) {
					return e > 4;
				}), []);
			});

		});

	});

	context('unseen_and_Again', function test_unseen_and_Again() {

		const spacing = kTesting.StubSpacingObjectValid();
		const state = uState(spacing, [kTesting.StubSpacingObjectValid()]);
		const chronicle = uChronicle({
			KOMChronicleResponseType: mod.KOMPlayResponseTypeAgain(),
		});

		before(function () {
			mod.KOMPlayRespond(state, chronicle);
		});

		it('updates spacing', function () {
			deepEqual(spacing, Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingDueDate: new Date(chronicle.KOMChronicleResponseDate.valueOf() + mod.KOMPlayResponseIntervalAgain()),
				KOMSpacingIsLearning: true,
				KOMSpacingChronicles: [uChronicle({
					KOMChronicleResponseType: mod.KOMPlayResponseTypeAgain(),
					KOMChronicleDueDate: spacing.KOMSpacingDueDate,
					KOMChronicleIsLearning: true,
				})],
			}));
		});

		it('updates state', function () {
			deepEqual(state, Object.assign(uState(), {
				KOMPlayStateCurrent: kTesting.StubSpacingObjectValid(),
				KOMPlayStateWait: [spacing],
			}));
		});

	});

	context('unseen_and_Hard', function test_unseen_and_Hard() {

		const spacing = kTesting.StubSpacingObjectValid();
		const state = uState(spacing, [kTesting.StubSpacingObjectValid()]);
		const chronicle = uChronicle({
			KOMChronicleResponseType: mod.KOMPlayResponseTypeHard(),
		});

		before(function () {
			mod.KOMPlayRespond(state, chronicle);
		});

		it('updates spacing', function () {
			deepEqual(spacing, Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingIsLearning: true,
				KOMSpacingDueDate: new Date(chronicle.KOMChronicleResponseDate.valueOf() + mod.KOMPlayResponseIntervalLearn()),
				KOMSpacingChronicles: [uChronicle({
					KOMChronicleResponseType: mod.KOMPlayResponseTypeHard(),
					KOMChronicleDueDate: spacing.KOMSpacingDueDate,
					KOMChronicleIsLearning: true,
				})],
			}));
		});

		it('updates state', function () {
			deepEqual(state, Object.assign(uState(), {
				KOMPlayStateCurrent: kTesting.StubSpacingObjectValid(),
				KOMPlayStateWait: [spacing],
			}));
		});

	});

	context('unseen_and_Good', function test_unseen_and_Good() {

		const spacing = kTesting.StubSpacingObjectValid();
		const state = uState(spacing, [kTesting.StubSpacingObjectValid()]);
		const chronicle = uChronicle({
			KOMChronicleResponseType: mod.KOMPlayResponseTypeGood(),
		});

		before(function () {
			mod.KOMPlayRespond(state, chronicle);
		});

		it('updates spacing', function () {
			deepEqual(spacing, Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingIsLearning: true,
				KOMSpacingDueDate: new Date(chronicle.KOMChronicleResponseDate.valueOf() + mod.KOMPlayResponseIntervalLearn()),
				KOMSpacingChronicles: [uChronicle({
					KOMChronicleResponseType: mod.KOMPlayResponseTypeGood(),
					KOMChronicleDueDate: spacing.KOMSpacingDueDate,
					KOMChronicleIsLearning: true,
				})],
			}));
		});

		it('updates state', function () {
			deepEqual(state, Object.assign(uState(), {
				KOMPlayStateCurrent: kTesting.StubSpacingObjectValid(),
				KOMPlayStateWait: [spacing],
			}));
		});

	});

	context('unseen_and_Easy', function test_unseen_and_Easy() {

		const spacing = kTesting.StubSpacingObjectValid();
		const state = uState(spacing);
		const chronicle = uChronicle({
			KOMChronicleResponseType: mod.KOMPlayResponseTypeEasy(),
		});

		before(function () {
			mod.KOMPlayRespond(state, chronicle);
		});

		it('updates spacing', function () {
			deepEqual(spacing, Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingInterval: mod.KOMPlayResponseIntervalGraduateEasy(),
				KOMSpacingMultiplier: mod.KOMPlayResponseMultiplierDefault(),
				KOMSpacingDueDate: new Date(chronicle.KOMChronicleResponseDate.valueOf() + 1000 * 60 * 60 * 24 * mod.KOMPlayResponseIntervalGraduateEasy()),
				KOMSpacingChronicles: [uChronicle({
					KOMChronicleResponseType: mod.KOMPlayResponseTypeEasy(),
					KOMChronicleDueDate: spacing.KOMSpacingDueDate,
					KOMChronicleInterval: spacing.KOMSpacingInterval,
					KOMChronicleMultiplier: spacing.KOMSpacingMultiplier,
				})],
			}));
		});

		it('updates state', function () {
			deepEqual(state, uState());
		});

	});

	context('learning_and_Again', function test_learning_and_Again() {

		const spacing = kTesting.StubSpacingObjectValid();
		const state = uState(spacing, [kTesting.StubSpacingObjectValid()]);
		let chronicle = uChronicle({
			KOMChronicleResponseType: mod.KOMPlayResponseTypeAgain(),
		});
		const events = [];

		before(function () {
			mod.KOMPlayRespond(state, chronicle);

			events.push(uChronicle(chronicle));
		});

		before(function () {
			state.KOMPlayStateQueue.unshift(state.KOMPlayStateCurrent);
			state.KOMPlayStateCurrent = state.KOMPlayStateWait.pop();

			mod.KOMPlayRespond(state, chronicle = uChronicle({
				KOMChronicleResponseDate: state.KOMPlayStateCurrent.KOMSpacingDueDate,
				KOMChronicleResponseType: mod.KOMPlayResponseTypeAgain(),
			}));

		});

		it('updates spacing', function () {
			deepEqual(spacing, Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingDueDate: new Date(chronicle.KOMChronicleResponseDate.valueOf() + mod.KOMPlayResponseIntervalAgain()),
				KOMSpacingIsLearning: true,
				KOMSpacingChronicles: events.concat(uChronicle({
					KOMChronicleResponseDate: chronicle.KOMChronicleResponseDate,
					KOMChronicleResponseType: chronicle.KOMChronicleResponseType,
					KOMChronicleDueDate: spacing.KOMSpacingDueDate,
					KOMChronicleIsLearning: true,
				})),
			}));
		});

		it('updates state', function () {
			deepEqual(state, Object.assign(uState(), {
				KOMPlayStateCurrent: kTesting.StubSpacingObjectValid(),
				KOMPlayStateWait: [spacing],
			}));
		});

	});

	context('learning_after_Again', function test_learning_after_Again() {

		const spacing = kTesting.StubSpacingObjectValid();
		const state = uState(spacing, [kTesting.StubSpacingObjectValid()]);
		let chronicle = uChronicle({
			KOMChronicleResponseType: mod.KOMPlayResponseTypeAgain(),
		});
		const events = [];

		before(function () {
			mod.KOMPlayRespond(state, chronicle);

			events.push(uChronicle(chronicle));
		});

		before(function () {
			state.KOMPlayStateQueue.unshift(state.KOMPlayStateCurrent);
			state.KOMPlayStateCurrent = state.KOMPlayStateWait.pop();

			mod.KOMPlayRespond(state, chronicle = uChronicle({
				KOMChronicleResponseDate: state.KOMPlayStateCurrent.KOMSpacingDueDate,
				KOMChronicleResponseType: mod.KOMPlayResponseTypeGood(),
			}));
		});

		it('updates spacing', function () {
			deepEqual(spacing, Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingIsLearning: true,
				KOMSpacingDueDate: new Date(chronicle.KOMChronicleResponseDate.valueOf() + mod.KOMPlayResponseIntervalLearn()),
				KOMSpacingChronicles: events.concat(uChronicle({
					KOMChronicleResponseDate: chronicle.KOMChronicleResponseDate,
					KOMChronicleResponseType: chronicle.KOMChronicleResponseType,
					KOMChronicleDueDate: spacing.KOMSpacingDueDate,
					KOMChronicleIsLearning: true,
				})),
			}));
		});

		it('updates state', function () {
			deepEqual(state, Object.assign(uState(), {
				KOMPlayStateCurrent: kTesting.StubSpacingObjectValid(),
				KOMPlayStateWait: [spacing],
			}));
		});

	});

	context('graduate_Hard', function test_graduate_Hard() {

		const spacing = kTesting.StubSpacingObjectValid();
		const state = uState(spacing, [kTesting.StubSpacingObjectValid()]);
		let chronicle = uChronicle({
			KOMChronicleResponseType: mod.KOMPlayResponseTypeHard(),
		});
		const events = [];

		before(function () {
			mod.KOMPlayRespond(state, chronicle);

			events.push(uChronicle(chronicle));
		});

		before(function () {
			state.KOMPlayStateQueue.unshift(state.KOMPlayStateCurrent);
			state.KOMPlayStateCurrent = state.KOMPlayStateWait.pop();

			mod.KOMPlayRespond(state, chronicle = uChronicle({
				KOMChronicleResponseType: mod.KOMPlayResponseTypeHard(),
				KOMChronicleResponseDate: state.KOMPlayStateCurrent.KOMSpacingDueDate,
			}));
		});

		it('updates spacing', function () {
			deepEqual(spacing, Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingInterval: mod.KOMPlayResponseIntervalGraduateDefault(),
				KOMSpacingMultiplier: mod.KOMPlayResponseMultiplierDefault(),
				KOMSpacingDueDate: new Date(chronicle.KOMChronicleResponseDate.valueOf() + 1000 * 60 * 60 * 24 * mod.KOMPlayResponseIntervalGraduateDefault()),
				KOMSpacingChronicles: events.concat(uChronicle({
					KOMChronicleResponseDate: chronicle.KOMChronicleResponseDate,
					KOMChronicleResponseType: chronicle.KOMChronicleResponseType,
					KOMChronicleDueDate: spacing.KOMSpacingDueDate,
					KOMChronicleInterval: spacing.KOMSpacingInterval,
					KOMChronicleMultiplier: spacing.KOMSpacingMultiplier,
				})),
			}));
		});

		it('updates state', function () {
			deepEqual(state, Object.assign(uState(), {
				KOMPlayStateCurrent: kTesting.StubSpacingObjectValid(),
			}));
		});

	});

	context('graduate_Good', function test_graduate_Good() {

		const spacing = kTesting.StubSpacingObjectValid();
		const state = uState(spacing, [kTesting.StubSpacingObjectValid()]);
		let chronicle = uChronicle({
			KOMChronicleResponseType: mod.KOMPlayResponseTypeGood(),
		});
		const events = [];

		before(function () {
			mod.KOMPlayRespond(state, chronicle);

			events.push(uChronicle(chronicle));
		});

		before(function () {
			state.KOMPlayStateQueue.unshift(state.KOMPlayStateCurrent);
			state.KOMPlayStateCurrent = state.KOMPlayStateWait.pop();

			mod.KOMPlayRespond(state, chronicle = uChronicle({
				KOMChronicleResponseDate: state.KOMPlayStateCurrent.KOMSpacingDueDate,
				KOMChronicleResponseType: mod.KOMPlayResponseTypeGood(),
			}));
		});

		it('updates spacing', function () {
			deepEqual(spacing, Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingInterval: mod.KOMPlayResponseIntervalGraduateDefault(),
				KOMSpacingMultiplier: mod.KOMPlayResponseMultiplierDefault(),
				KOMSpacingDueDate: new Date(chronicle.KOMChronicleResponseDate.valueOf() + 1000 * 60 * 60 * 24 * mod.KOMPlayResponseIntervalGraduateDefault()),
				KOMSpacingChronicles: events.concat(uChronicle({
					KOMChronicleResponseDate: chronicle.KOMChronicleResponseDate,
					KOMChronicleResponseType: chronicle.KOMChronicleResponseType,
					KOMChronicleDueDate: spacing.KOMSpacingDueDate,
					KOMChronicleInterval: spacing.KOMSpacingInterval,
					KOMChronicleMultiplier: spacing.KOMSpacingMultiplier,
				})),
			}));
		});

		it('updates state', function () {
			deepEqual(state, Object.assign(uState(), {
				KOMPlayStateCurrent: kTesting.StubSpacingObjectValid(),
			}));
		});

	});

	context('graduate_Fail', function test_graduate_Fail() {

		const spacing = kTesting.StubSpacingObjectValid();
		const state = uState(spacing, [kTesting.StubSpacingObjectValid()]);
		let chronicle = uChronicle({
			KOMChronicleResponseType: mod.KOMPlayResponseTypeGood(),
		});
		const events = [];

		before(function () {
			mod.KOMPlayRespond(state, chronicle);

			events.push(uChronicle(chronicle));
		});

		before(function () {
			state.KOMPlayStateQueue.unshift(state.KOMPlayStateCurrent);
			state.KOMPlayStateCurrent = state.KOMPlayStateWait.pop();

			mod.KOMPlayRespond(state, chronicle = uChronicle({
				KOMChronicleResponseDate: state.KOMPlayStateCurrent.KOMSpacingDueDate,
				KOMChronicleResponseType: mod.KOMPlayResponseTypeAgain(),
			}));
		});

		it('updates spacing', function () {
			deepEqual(spacing, Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingDueDate: new Date(chronicle.KOMChronicleResponseDate.valueOf() + mod.KOMPlayResponseIntervalAgain()),
				KOMSpacingIsLearning: true,
				KOMSpacingChronicles: events.concat(uChronicle({
					KOMChronicleResponseDate: chronicle.KOMChronicleResponseDate,
					KOMChronicleResponseType: chronicle.KOMChronicleResponseType,
					KOMChronicleDueDate: spacing.KOMSpacingDueDate,
					KOMChronicleIsLearning: true,
				})),
			}));
		});

		it('updates state', function () {
			deepEqual(state, Object.assign(uState(), {
				KOMPlayStateCurrent: kTesting.StubSpacingObjectValid(),
				KOMPlayStateWait: [spacing],
			}));
		});

	});

	context('reviewing_and_Again', function test_reviewing_and_Again() {

		const spacing = kTesting.StubSpacingObjectValid();
		const state = uState(spacing, [kTesting.StubSpacingObjectValid()]);
		let chronicle = uChronicle({
			KOMChronicleResponseType: mod.KOMPlayResponseTypeEasy(),
		});
		const events = [];

		before(function () {
			mod.KOMPlayRespond(state, chronicle);

			events.push(uChronicle(chronicle));
		});

		before(function () {
			state.KOMPlayStateQueue.unshift(state.KOMPlayStateCurrent);
			state.KOMPlayStateCurrent = spacing;

			mod.KOMPlayRespond(state, chronicle = uChronicle({
				KOMChronicleResponseDate: state.KOMPlayStateCurrent.KOMSpacingDueDate,
				KOMChronicleResponseType: mod.KOMPlayResponseTypeAgain(),
			}));
		});

		it('updates spacing', function () {
			deepEqual(spacing, Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingMultiplier: mod.KOMPlayResponseMultiplierDefault() + mod.KOMPlayResponseMultiplierSummandFail(),
				KOMSpacingDueDate: new Date(chronicle.KOMChronicleResponseDate.valueOf() + mod.KOMPlayResponseIntervalAgain()),
				KOMSpacingIsLearning: true,
				KOMSpacingChronicles: events.concat(uChronicle({
					KOMChronicleResponseDate: chronicle.KOMChronicleResponseDate,
					KOMChronicleResponseType: chronicle.KOMChronicleResponseType,
					KOMChronicleDueDate: spacing.KOMSpacingDueDate,
					KOMChronicleIsLearning: true,
				})),
			}));
		});

		it('updates state', function () {
			deepEqual(state, Object.assign(uState(), {
				KOMPlayStateCurrent: kTesting.StubSpacingObjectValid(),
				KOMPlayStateWait: [spacing],
			}));
		});

	});

	context('reviewing_and_Hard', function test_reviewing_and_Hard() {

		const spacing = kTesting.StubSpacingObjectValid();
		const state = uState(spacing, [kTesting.StubSpacingObjectValid()]);
		let chronicle = uChronicle({
			KOMChronicleResponseType: mod.KOMPlayResponseTypeEasy(),
		});
		const events = [];

		before(function () {
			mod.KOMPlayRespond(state, chronicle);

			events.push(uChronicle(chronicle));
		});

		before(function () {
			state.KOMPlayStateQueue.unshift(state.KOMPlayStateCurrent);
			state.KOMPlayStateCurrent = spacing;

			mod.KOMPlayRespond(state, chronicle = uChronicle({
				KOMChronicleResponseDate: state.KOMPlayStateCurrent.KOMSpacingDueDate,
				KOMChronicleResponseType: mod.KOMPlayResponseTypeHard(),
			}));
		});

		it('updates spacing', function () {
			const interval = mod.KOMPlayResponseIntervalGraduateEasy() * mod.KOMPlayResponseMultiplierHard();
			deepEqual(spacing, Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingMultiplier: mod.KOMPlayResponseMultiplierDefault() + mod.KOMPlayResponseMultiplierSummandHard(),
				KOMSpacingInterval: interval,
				KOMSpacingDueDate: new Date(chronicle.KOMChronicleResponseDate.valueOf() + 1000 * 60 * 60 * 24 * interval),
				KOMSpacingChronicles: events.concat(uChronicle({
					KOMChronicleResponseDate: chronicle.KOMChronicleResponseDate,
					KOMChronicleResponseType: chronicle.KOMChronicleResponseType,
					KOMChronicleDueDate: spacing.KOMSpacingDueDate,
					KOMChronicleInterval: spacing.KOMSpacingInterval,
					KOMChronicleMultiplier: spacing.KOMSpacingMultiplier,
				})),
			}));
		});

		it('updates state', function () {
			deepEqual(state, Object.assign(uState(), {
				KOMPlayStateCurrent: kTesting.StubSpacingObjectValid(),
				KOMPlayStateWait: [],
			}));
		});

	});

	context('reviewing_and_Good', function test_reviewing_and_Good() {

		const spacing = kTesting.StubSpacingObjectValid();
		const state = uState(spacing, [kTesting.StubSpacingObjectValid()]);
		let chronicle = uChronicle({
			KOMChronicleResponseType: mod.KOMPlayResponseTypeEasy(),
		});
		const events = [];

		before(function () {
			mod.KOMPlayRespond(state, chronicle);

			events.push(uChronicle(chronicle));
		});

		before(function () {
			state.KOMPlayStateQueue.unshift(state.KOMPlayStateCurrent);
			state.KOMPlayStateCurrent = spacing;

			mod.KOMPlayRespond(state, chronicle = uChronicle({
				KOMChronicleResponseDate: state.KOMPlayStateCurrent.KOMSpacingDueDate,
				KOMChronicleResponseType: mod.KOMPlayResponseTypeGood(),
			}));
		});

		it('updates spacing', function () {
			const interval = mod.KOMPlayResponseIntervalGraduateEasy() * mod.KOMPlayResponseMultiplierDefault();
			deepEqual(spacing, Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingMultiplier: mod.KOMPlayResponseMultiplierDefault() + mod.KOMPlayResponseMultiplierSummandGood(),
				KOMSpacingInterval: interval,
				KOMSpacingDueDate: new Date(chronicle.KOMChronicleResponseDate.valueOf() + 1000 * 60 * 60 * 24 * interval),
				KOMSpacingChronicles: events.concat(uChronicle({
					KOMChronicleResponseDate: chronicle.KOMChronicleResponseDate,
					KOMChronicleResponseType: chronicle.KOMChronicleResponseType,
					KOMChronicleDueDate: spacing.KOMSpacingDueDate,
					KOMChronicleInterval: spacing.KOMSpacingInterval,
					KOMChronicleMultiplier: spacing.KOMSpacingMultiplier,
				})),
			}));
		});

		it('updates state', function () {
			deepEqual(state, Object.assign(uState(), {
				KOMPlayStateCurrent: kTesting.StubSpacingObjectValid(),
				KOMPlayStateWait: [],
			}));
		});

	});

	context('reviewing_and_Easy', function test_reviewing_and_Easy() {

		const spacing = kTesting.StubSpacingObjectValid();
		const state = uState(spacing, [kTesting.StubSpacingObjectValid()]);
		let chronicle = uChronicle({
			KOMChronicleResponseType: mod.KOMPlayResponseTypeEasy(),
		});
		const events = [];

		before(function () {
			mod.KOMPlayRespond(state, chronicle);

			events.push(uChronicle(chronicle));
		});

		before(function () {
			state.KOMPlayStateQueue.unshift(state.KOMPlayStateCurrent);
			state.KOMPlayStateCurrent = spacing;

			mod.KOMPlayRespond(state, chronicle = uChronicle({
				KOMChronicleResponseDate: state.KOMPlayStateCurrent.KOMSpacingDueDate,
				KOMChronicleResponseType: mod.KOMPlayResponseTypeEasy(),
			}));
		});

		it('updates spacing', function () {
			const interval = mod.KOMPlayResponseIntervalGraduateEasy() * mod.KOMPlayResponseMultiplierDefault() * mod.KOMPlayResponseMultiplierMultiplicandEasy();
			deepEqual(spacing, Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingMultiplier: mod.KOMPlayResponseMultiplierDefault() + mod.KOMPlayResponseMultiplierSummandEasy(),
				KOMSpacingInterval: interval,
				KOMSpacingDueDate: new Date(chronicle.KOMChronicleResponseDate.valueOf() + 1000 * 60 * 60 * 24 * interval),
				KOMSpacingChronicles: events.concat(uChronicle({
					KOMChronicleResponseDate: chronicle.KOMChronicleResponseDate,
					KOMChronicleResponseType: chronicle.KOMChronicleResponseType,
					KOMChronicleDueDate: spacing.KOMSpacingDueDate,
					KOMChronicleInterval: spacing.KOMSpacingInterval,
					KOMChronicleMultiplier: spacing.KOMSpacingMultiplier,
				})),
			}));
		});

		it('updates state', function () {
			deepEqual(state, Object.assign(uState(), {
				KOMPlayStateCurrent: kTesting.StubSpacingObjectValid(),
				KOMPlayStateWait: [],
			}));
		});

	});

	context('overdue_and_Hard', function test_overdue_and_Hard() {

		const date = new Date();
		const spacing = Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingInterval: mod.KOMPlayResponseIntervalGraduateEasy(),
			KOMSpacingMultiplier: mod.KOMPlayResponseMultiplierDefault(),
			KOMSpacingDueDate: date,
		});
		const chronicle = uChronicle({
			KOMChronicleResponseDate: new Date(date.valueOf() + 1000 * 60 * 60 * 24 * 10),
			KOMChronicleResponseType: mod.KOMPlayResponseTypeHard(),
		});

		before(function () {
			mod.KOMPlayRespond(uState(spacing), chronicle);
		});

		it('updates spacing', function () {
			const interval = (mod.KOMPlayResponseIntervalGraduateEasy() + 10 / mod.KOMPlayResponseIntervalOverdueDivisorHard()) * mod.KOMPlayResponseMultiplierHard();
			deepEqual(spacing, Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingMultiplier: mod.KOMPlayResponseMultiplierDefault() + mod.KOMPlayResponseMultiplierSummandHard(),
				KOMSpacingInterval: interval,
				KOMSpacingDueDate: new Date(chronicle.KOMChronicleResponseDate.valueOf() + 1000 * 60 * 60 * 24 * interval),
				KOMSpacingChronicles: [uChronicle({
					KOMChronicleResponseDate: chronicle.KOMChronicleResponseDate,
					KOMChronicleResponseType: chronicle.KOMChronicleResponseType,
					KOMChronicleDueDate: spacing.KOMSpacingDueDate,
					KOMChronicleInterval: spacing.KOMSpacingInterval,
					KOMChronicleMultiplier: spacing.KOMSpacingMultiplier,
				})],
			}));
		});

	});

	context('overdue_and_Good', function test_overdue_and_Good() {

		const date = new Date();
		const spacing = Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingInterval: mod.KOMPlayResponseIntervalGraduateEasy(),
			KOMSpacingMultiplier: mod.KOMPlayResponseMultiplierDefault(),
			KOMSpacingDueDate: date,
		});
		const chronicle = uChronicle({
			KOMChronicleResponseDate: new Date(date.valueOf() + 1000 * 60 * 60 * 24 * 10),
			KOMChronicleResponseType: mod.KOMPlayResponseTypeGood(),
		});

		before(function () {
			mod.KOMPlayRespond(uState(spacing), chronicle);
		});

		it('updates spacing', function () {
			const interval = (mod.KOMPlayResponseIntervalGraduateEasy() + 10 / mod.KOMPlayResponseIntervalOverdueDivisorGood()) * mod.KOMPlayResponseMultiplierDefault();
			deepEqual(spacing, Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingMultiplier: mod.KOMPlayResponseMultiplierDefault() + mod.KOMPlayResponseMultiplierSummandGood(),
				KOMSpacingInterval: interval,
				KOMSpacingDueDate: new Date(chronicle.KOMChronicleResponseDate.valueOf() + 1000 * 60 * 60 * 24 * interval),
				KOMSpacingChronicles: [uChronicle({
					KOMChronicleResponseDate: chronicle.KOMChronicleResponseDate,
					KOMChronicleResponseType: chronicle.KOMChronicleResponseType,
					KOMChronicleDueDate: spacing.KOMSpacingDueDate,
					KOMChronicleInterval: spacing.KOMSpacingInterval,
					KOMChronicleMultiplier: spacing.KOMSpacingMultiplier,
				})],
			}));
		});

	});

	context('overdue_and_Easy', function test_overdue_and_Easy() {

		const date = new Date();
		const spacing = Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingInterval: mod.KOMPlayResponseIntervalGraduateEasy(),
			KOMSpacingMultiplier: mod.KOMPlayResponseMultiplierDefault(),
			KOMSpacingDueDate: date,
		});
		const chronicle = uChronicle({
			KOMChronicleResponseDate: new Date(date.valueOf() + 1000 * 60 * 60 * 24 * 10),
			KOMChronicleResponseType: mod.KOMPlayResponseTypeEasy(),
		});

		before(function () {
			mod.KOMPlayRespond(uState(spacing), chronicle);
		});

		it('updates spacing', function () {
			const interval = (mod.KOMPlayResponseIntervalGraduateEasy() + 10 / mod.KOMPlayResponseIntervalOverdueDivisorEasy()) * mod.KOMPlayResponseMultiplierDefault() * mod.KOMPlayResponseMultiplierMultiplicandEasy();
			deepEqual(spacing, Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingMultiplier: mod.KOMPlayResponseMultiplierDefault() + mod.KOMPlayResponseMultiplierSummandEasy(),
				KOMSpacingInterval: interval,
				KOMSpacingDueDate: new Date(chronicle.KOMChronicleResponseDate.valueOf() + 1000 * 60 * 60 * 24 * interval),
				KOMSpacingChronicles: [uChronicle({
					KOMChronicleResponseDate: chronicle.KOMChronicleResponseDate,
					KOMChronicleResponseType: chronicle.KOMChronicleResponseType,
					KOMChronicleDueDate: spacing.KOMSpacingDueDate,
					KOMChronicleInterval: spacing.KOMSpacingInterval,
					KOMChronicleMultiplier: spacing.KOMSpacingMultiplier,
				})],
			}));
		});

	});

	context('minimum_multiplier', function test_minimum_multiplier() {

		const date = new Date();
		const spacing = Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingInterval: mod.KOMPlayResponseIntervalGraduateEasy(),
			KOMSpacingMultiplier: mod.KOMPlayResponseMultiplierMin(),
			KOMSpacingDueDate: date,
		});
		const chronicle = uChronicle({
			KOMChronicleResponseDate: new Date(date.valueOf() + 1000 * 60 * 60 * 24 * 10),
			KOMChronicleResponseType: mod.KOMPlayResponseTypeHard(),
		});

		before(function () {
			mod.KOMPlayRespond(uState(spacing), chronicle);
		});

		it('updates spacing', function () {
			const interval = (mod.KOMPlayResponseIntervalGraduateEasy() + 10 / mod.KOMPlayResponseIntervalOverdueDivisorHard()) * mod.KOMPlayResponseMultiplierHard();
			deepEqual(spacing, Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingMultiplier: mod.KOMPlayResponseMultiplierMin(),
				KOMSpacingInterval: interval,
				KOMSpacingDueDate: new Date(chronicle.KOMChronicleResponseDate.valueOf() + 1000 * 60 * 60 * 24 * interval),
				KOMSpacingChronicles: [uChronicle({
					KOMChronicleResponseDate: chronicle.KOMChronicleResponseDate,
					KOMChronicleResponseType: chronicle.KOMChronicleResponseType,
					KOMChronicleDueDate: spacing.KOMSpacingDueDate,
					KOMChronicleInterval: spacing.KOMSpacingInterval,
					KOMChronicleMultiplier: spacing.KOMSpacingMultiplier,
				})],
			}));
		});

	});

});

describe('KOMPlayUndo', function test_KOMPlayUndo() {

	it('throws if not valid', function () {
		throws(function () {
			mod.KOMPlayUndo({});
		}, /KOMErrorInputNotValid/);
	});

	it('throws if no KOMSpacingChronicles', function () {
		throws(function () {
			mod.KOMPlayUndo(kTesting.StubSpacingObjectValid());
		}, /KOMErrorInputNotValid/);
	});

	it('returns input', function () {
		const item = Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingChronicles: [StubChronicleObjectValid2()],
		});

		deepEqual(mod.KOMPlayUndo(item) === item, true);
	});

	it('removes last KOMSpacingChronicles item', function () {
		deepEqual(mod.KOMPlayUndo(Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingChronicles: [StubChronicleObjectValid2(), StubChronicleObjectValid2()],
		})).KOMSpacingChronicles, [StubChronicleObjectValid2()]);
	});

	it('keeps KOMSpacingDrawDate', function () {
		deepEqual(mod.KOMPlayUndo(Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingDrawDate: new Date('2019-02-23T12:00:00Z'),
			KOMSpacingIsLearning: true,
			KOMSpacingChronicles: [StubChronicleObjectValid2()],
		})), Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingDrawDate: new Date('2019-02-23T12:00:00Z'),
		}));
	});

	it('keeps KOMSpacingFlipDate', function () {
		deepEqual(mod.KOMPlayUndo(Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingFlipDate: new Date('2019-02-23T12:00:00Z'),
			KOMSpacingIsLearning: true,
			KOMSpacingChronicles: [StubChronicleObjectValid2()],
		})), Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingFlipDate: new Date('2019-02-23T12:00:00Z'),
		}));
	});

	it('keeps relations', function () {
		deepEqual(mod.KOMPlayUndo(Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingIsLearning: true,
			KOMSpacingChronicles: [StubChronicleObjectValid2()],
			$alfa: 'bravo',
		})), Object.assign(kTesting.StubSpacingObjectValid(), {
			$alfa: 'bravo',
		}));
	});

	context('with no history', function () {

		it('removes existing properties', function () {
			deepEqual(mod.KOMPlayUndo(Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingIsLearning: true,
				KOMSpacingChronicles: [StubChronicleObjectValid2()],
			})), kTesting.StubSpacingObjectValid());
		});

	});

	context('with history', function () {

		it('sets spacing properties', function () {
			const item = Object.assign(StubChronicleObjectValid2(), {
				KOMChronicleIsLearning: true,
			});
			deepEqual(mod.KOMPlayUndo(Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingChronicles: [item, StubChronicleObjectValid2()],
			})), Object.assign(kTesting.StubSpacingObjectValid(), {
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
			deepEqual(mod.KOMPlayUndo(Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingIsLearning: true,
				KOMSpacingChronicles: [item, StubChronicleObjectValid2()],
			})), Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingChronicles: [item],
				KOMSpacingIsLearning: true,
				KOMSpacingDrawDate: new Date('2019-02-23T12:00:00Z'),
				KOMSpacingFlipDate: new Date('2019-02-23T12:00:00Z'),
				KOMSpacingDueDate: new Date('2019-02-23T12:00:00Z'),
			}));
		});

	});

});
