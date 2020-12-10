const { throws, deepEqual } = require('assert');

const mod = require('./model.js').default;

const KOMSharedLogic = require('../../_shared/KOMSharedLogic/main.js').default;

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
};

describe('KOMSpacingModelIdentifier', function test_KOMSpacingModelIdentifier() {

	it('throws error if not string', function () {
		throws(function () {
			mod.KOMSpacingModelIdentifier(null);
		}, /KOMErrorInputNotValid/);
	});

	it('throws error if not valid', function () {
		throws(function () {
			mod.KOMSpacingModelIdentifier('bravoforward');
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function () {
		deepEqual(mod.KOMSpacingModelIdentifier('bravo-forward'), 'bravo');
	});

});

describe('KOMSpacingModelLabel', function test_KOMSpacingModelLabel() {

	it('throws error if not string', function () {
		throws(function () {
			mod.KOMSpacingModelLabel(null);
		}, /KOMErrorInputNotValid/);
	});

	it('throws error if not valid', function () {
		throws(function () {
			mod.KOMSpacingModelLabel('bravoforward');
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function () {
		deepEqual(mod.KOMSpacingModelLabel('bravo-forward'), 'forward');
	});

});

describe('KOMSpacingModelLabelForward', function test_KOMSpacingModelLabelForward() {

	it('returns string', function () {
		deepEqual(mod.KOMSpacingModelLabelForward(), 'forward');
	});

});

describe('KOMSpacingModelLabelBackward', function test_KOMSpacingModelLabelBackward() {

	it('returns string', function () {
		deepEqual(mod.KOMSpacingModelLabelBackward(), 'backward');
	});

});

describe('KOMSpacingModelErrorsFor', function test_KOMSpacingModelErrorsFor() {

	it('throws error if not object', function () {
		throws(function () {
			mod.KOMSpacingModelErrorsFor(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns object if KOMSpacingID not string', function () {
		deepEqual(mod.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingID: null,
		})), {
			KOMSpacingID: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns object if KOMSpacingID not separated', function () {
		deepEqual(mod.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingID: 'alfaforward',
		})), {
			KOMSpacingID: [
				'KOMErrorNotSeparated',
			],
		});
	});

	it('returns object if KOMSpacingID not filled', function () {
		deepEqual(mod.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingID: '-forward',
		})), {
			KOMSpacingID: [
				'KOMErrorNotFilled',
			],
		});
	});

	it('returns object if KOMSpacingID not labelled', function () {
		deepEqual(mod.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingID: 'alfa-bravo',
		})), {
			KOMSpacingID: [
				'KOMErrorNotLabelled',
			],
		});
	});

	it('returns null', function () {
		deepEqual(mod.KOMSpacingModelErrorsFor(kTesting.StubSpacingObjectValid()), null);
		deepEqual(mod.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingID: 'alfa-backward',
		})), null);
	});

	context('KOMSpacingDrawDate', function () {

		it('returns object if not date', function () {
			deepEqual(mod.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingDrawDate: null,
			})), {
				KOMSpacingDrawDate: [
					'KOMErrorNotDate',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mod.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingDrawDate: new Date(),
			})), null);
		});

	});

	context('KOMSpacingFlipDate', function () {

		it('returns object if not date', function () {
			deepEqual(mod.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingFlipDate: null,
			})), {
				KOMSpacingFlipDate: [
					'KOMErrorNotDate',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mod.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingFlipDate: new Date(),
			})), null);
		});

	});

	context('KOMSpacingDueDate', function () {

		it('returns object if not date', function () {
			deepEqual(mod.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingDueDate: null,
			})), {
				KOMSpacingDueDate: [
					'KOMErrorNotDate',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mod.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingDueDate: new Date(),
			})), null);
		});

	});

	context('KOMSpacingIsLearning', function () {

		it('returns object if not boolean', function () {
			deepEqual(mod.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingIsLearning: null,
			})), {
				KOMSpacingIsLearning: [
					'KOMErrorNotBoolean',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mod.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingIsLearning: true,
			})), null);
		});

	});

	context('KOMSpacingInterval', function () {

		it('returns object if not number', function () {
			deepEqual(mod.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingInterval: '1',
			})), {
				KOMSpacingInterval: [
					'KOMErrorNotNumber',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mod.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingInterval: 1,
			})), null);
		});

	});

	context('KOMSpacingMultiplier', function () {

		it('returns object if not number', function () {
			deepEqual(mod.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingMultiplier: '1',
			})), {
				KOMSpacingMultiplier: [
					'KOMErrorNotNumber',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mod.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingMultiplier: 1,
			})), null);
		});

	});

	context('KOMSpacingChronicles', function () {

		it('returns object if not array', function () {
			deepEqual(mod.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingChronicles: null,
			})), {
				KOMSpacingChronicles: [
					'KOMErrorNotArray',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mod.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingChronicles: [],
			})), null);
		});

	});

	context('$KOMSpacingCard', function () {

		it('returns object if not valid', function () {
			deepEqual(mod.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
				$KOMSpacingCard: {},
			})), {
				$KOMSpacingCard: [
					'KOMErrorNotValid',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mod.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
				$KOMSpacingCard: kTesting.StubCardObjectValid(),
			})), null);
		});

	});

	context('KOMOptionValidateIfNotPresent', function () {

		it('returns object if not valid', function () {
			deepEqual(Object.keys(mod.KOMSpacingModelErrorsFor({}, {
				KOMOptionValidateIfNotPresent: true,
			})), [
				'KOMSpacingID',
				'KOMSpacingChronicles',
				'KOMSpacingDrawDate',
				'KOMSpacingFlipDate',
				'KOMSpacingDueDate',
				'KOMSpacingIsLearning',
				'KOMSpacingInterval',
				'KOMSpacingMultiplier',
			]);
		});

	});

});

describe('KOMSpacingModelIsBackward', function test_KOMSpacingModelIsBackward() {

	it('throws if not valid', function () {
		throws(function () {
			mod.KOMSpacingModelIsBackward({});
		}, /KOMErrorInputNotValid/);
	});

	it('returns true if backward', function () {
		deepEqual(mod.KOMSpacingModelIsBackward(Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingID: 'bravo-backward',
		})), true);
	});

	it('returns false', function () {
		deepEqual(mod.KOMSpacingModelIsBackward(kTesting.StubSpacingObjectValid()), false);
	});

});

describe('KOMSpacingModelIsUnseen', function test_KOMSpacingModelIsUnseen() {

	it('throws if not valid', function () {
		throws(function () {
			mod.KOMSpacingModelIsUnseen({});
		}, /KOMErrorInputNotValid/);
	});

	it('returns false if KOMSpacingDueDate', function () {
		deepEqual(mod.KOMSpacingModelIsUnseen(Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingDueDate: new Date(),
		})), false);
	});

	it('returns true', function () {
		deepEqual(mod.KOMSpacingModelIsUnseen(kTesting.StubSpacingObjectValid()), true);
	});

});

describe('KOMSpacingModelIsLearning', function test_KOMSpacingModelIsLearning() {

	it('throws if not valid', function () {
		throws(function () {
			mod.KOMSpacingModelIsLearning({});
		}, /KOMErrorInputNotValid/);
	});

	it('returns true if KOMSpacingIsLearning', function () {
		deepEqual(mod.KOMSpacingModelIsLearning(Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingIsLearning: true,
		})), true);
	});

	it('returns false', function () {
		deepEqual(mod.KOMSpacingModelIsLearning(kTesting.StubSpacingObjectValid()), false);
	});

});

describe('KOMSpacingModelIsReviewing', function test_KOMSpacingModelIsReviewing() {

	it('throws if not valid', function () {
		throws(function () {
			mod.KOMSpacingModelIsReviewing({});
		}, /KOMErrorInputNotValid/);
	});

	it('returns false if KOMSpacingIsLearning', function () {
		deepEqual(mod.KOMSpacingModelIsReviewing(Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingIsLearning: true,
		})), false);
	});

	it('returns false if no KOMSpacingInterval', function () {
		deepEqual(mod.KOMSpacingModelIsReviewing(kTesting.StubSpacingObjectValid()), false);
	});

	it('returns true', function () {
		deepEqual(mod.KOMSpacingModelIsReviewing(Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingInterval: 1,
		})), true);
	});

});

describe('KOMSpacingModelMatureThreshold', function test_KOMSpacingModelMatureThreshold() {

	it('returns number', function () {
		deepEqual(mod.KOMSpacingModelMatureThreshold(), 21);
	});

});

describe('KOMSpacingModelIsDeveloping', function test_KOMSpacingModelIsDeveloping() {

	it('throws if not valid', function () {
		throws(function () {
			mod.KOMSpacingModelIsDeveloping({});
		}, /KOMErrorInputNotValid/);
	});

	it('returns false if no KOMSpacingInterval', function () {
		deepEqual(mod.KOMSpacingModelIsDeveloping(kTesting.StubSpacingObjectValid()), false);
	});

	it('returns false if KOMSpacingInterval above KOMSpacingModelMatureThreshold', function () {
		deepEqual(mod.KOMSpacingModelIsDeveloping(Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingInterval: mod.KOMSpacingModelMatureThreshold(),
		})), false);
	});

	it('returns true', function () {
		deepEqual(mod.KOMSpacingModelIsDeveloping(Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingInterval: 1,
		})), true);
	});

});

describe('KOMSpacingModelIsMature', function test_KOMSpacingModelIsMature() {

	it('throws if not valid', function () {
		throws(function () {
			mod.KOMSpacingModelIsMature({});
		}, /KOMErrorInputNotValid/);
	});

	it('returns false if no KOMSpacingInterval', function () {
		deepEqual(mod.KOMSpacingModelIsMature(kTesting.StubSpacingObjectValid()), false);
	});

	it('returns false if KOMSpacingInterval below KOMSpacingModelMatureThreshold', function () {
		deepEqual(mod.KOMSpacingModelIsMature(Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingInterval: 1,
		})), false);
	});

	it('returns true', function () {
		deepEqual(mod.KOMSpacingModelIsMature(Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingInterval: mod.KOMSpacingModelMatureThreshold(),
		})), true);
	});

});

describe('KOMSpacingModelFilterUnique', function test_KOMSpacingModelFilterUnique() {

	it('throws if not array', function () {
		throws(function () {
			mod.KOMSpacingModelFilterUnique(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns array', function () {
		deepEqual(mod.KOMSpacingModelFilterUnique([]), []);
	});

	it('excludes duplicate cards', function () {
		const item1 = StubSpacingObjectValid();
		const item2 = Object.assign(StubSpacingObjectValid(), {
			KOMSpacingID: 'charlie-forward',
		});

		deepEqual(mod.KOMSpacingModelFilterUnique([item1, Object.assign(Object.assign({}, item1), {
			KOMSpacingID: item1.KOMSpacingID.replace('forward', 'backward'),
		}), item2]), [item1, item2]);
	});

});

describe('KOMSpacingModelGroupByStatus', function test_KOMSpacingModelGroupByStatus() {

	const uGrouping = function (inputData = {}) {
		return Object.assign({
			KOMSpacingGroupingTotal: [],
			KOMSpacingGroupingUnseen: [],
			KOMSpacingGroupingDeveloping: [],
			KOMSpacingGroupingMature: [],
			KOMSpacingGroupingRetired: [],
		}, inputData);
	};

	it('throws if not array', function () {
		throws(function () {
			mod.KOMSpacingModelGroupByStatus(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns array', function () {
		deepEqual(mod.KOMSpacingModelGroupByStatus([]), uGrouping());
	});

	it('groups unseen', function () {
		const item = StubSpacingObjectValid();
		deepEqual(mod.KOMSpacingModelGroupByStatus([item]), uGrouping({
			KOMSpacingGroupingTotal: [item],
			KOMSpacingGroupingUnseen: [item],
		}));
	});

	it('groups developing', function () {
		const item = Object.assign(StubSpacingObjectValid(), {
			KOMSpacingInterval: 1,
			KOMSpacingDueDate: new Date(),
		});
		deepEqual(mod.KOMSpacingModelGroupByStatus([item]), uGrouping({
			KOMSpacingGroupingTotal: [item],
			KOMSpacingGroupingDeveloping: [item],
		}));
	});

	it('groups mature', function () {
		const item = Object.assign(StubSpacingObjectValid(), {
			KOMSpacingInterval: mod.KOMSpacingModelMatureThreshold(),
			KOMSpacingDueDate: new Date(),
		});
		deepEqual(mod.KOMSpacingModelGroupByStatus([item]), uGrouping({
			KOMSpacingGroupingTotal: [item],
			KOMSpacingGroupingMature: [item],
		}));
	});

	it('groups retired', function () {
		const item = Object.assign(StubSpacingObjectValid(), {
			$KOMSpacingCard: StubCardObjectValid({
				KOMCardIsRetired: true,
			}),
		});
		deepEqual(mod.KOMSpacingModelGroupByStatus([item]), uGrouping({
			KOMSpacingGroupingTotal: [item],
			KOMSpacingGroupingRetired: [item],
		}));
	});

});

describe('KOMSpacingModelGroupChroniclesByStatus', function test_KOMSpacingModelGroupChroniclesByStatus() {

	const uGrouping = function (inputData = {}) {
		return Object.assign({
			KOMChronicleGroupingLearning: [],
			KOMChronicleGroupingRelearning: [],
			KOMChronicleGroupingDeveloping: [],
			KOMChronicleGroupingMature: [],
		}, inputData);
	};

	const uChronicles = function (inputData = Infinity) {
		return [
			StubChronicleObjectValid(),
			StubChronicleObjectValid(),
			Object.assign(StubChronicleObjectValid(), {
				KOMChronicleInterval: 1,
			}),
			Object.assign(StubChronicleObjectValid(), {
				KOMChronicleInterval: mod.KOMSpacingModelMatureThreshold(),
			}),
			StubChronicleObjectValid(),
			StubChronicleObjectValid(),
			Object.assign(StubChronicleObjectValid(), {
				KOMChronicleInterval: 1,
			}),
		].slice(0, inputData);
	};

	it('throws if param1 not array', function () {
		throws(function () {
			mod.KOMSpacingModelGroupChroniclesByStatus(null, '2000-01-01');
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param2 not string', function () {
		throws(function () {
			mod.KOMSpacingModelGroupChroniclesByStatus([], null);
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param2 not formatted', function () {
		throws(function () {
			mod.KOMSpacingModelGroupChroniclesByStatus([], 'alfa-br-va');
		}, /KOMErrorInputNotValid/);
	});

	it('returns array', function () {
		deepEqual(mod.KOMSpacingModelGroupChroniclesByStatus([], '2000-01-01'), uGrouping());
	});

	it('ignores if unseen', function () {
		const item = StubSpacingObjectValid();
		deepEqual(mod.KOMSpacingModelGroupChroniclesByStatus([item], KOMSharedLogic.KOMSharedGroupingDay(new Date())), uGrouping());
	});

	it('ignores if no match', function () {
		deepEqual(mod.KOMSpacingModelGroupChroniclesByStatus([StubSpacingObjectHistorical()], KOMSharedLogic.KOMSharedGroupingDay(new Date('2000-01-01'))), uGrouping());
	});

	it('groups learning', function () {
		const item = uChronicles(2);
		deepEqual(mod.KOMSpacingModelGroupChroniclesByStatus([Object.assign(StubSpacingObjectHistorical(), {
			KOMSpacingChronicles: item,
		})], KOMSharedLogic.KOMSharedGroupingDay(new Date())).KOMChronicleGroupingLearning, item.slice(0, 2));
	});

	it('groups developing', function () {
		const item = uChronicles(3);
		deepEqual(mod.KOMSpacingModelGroupChroniclesByStatus([Object.assign(StubSpacingObjectHistorical(), {
			KOMSpacingChronicles: item,
		})], KOMSharedLogic.KOMSharedGroupingDay(new Date())).KOMChronicleGroupingDeveloping, item.slice(2, 3));
	});

	it('groups mature', function () {
		const item = uChronicles(4);
		deepEqual(mod.KOMSpacingModelGroupChroniclesByStatus([Object.assign(StubSpacingObjectHistorical(), {
			KOMSpacingChronicles: item,
		})], KOMSharedLogic.KOMSharedGroupingDay(new Date())).KOMChronicleGroupingMature, item.slice(3, 4));
	});

	it('groups relearning', function () {
		const item = uChronicles(5);
		deepEqual(mod.KOMSpacingModelGroupChroniclesByStatus([Object.assign(StubSpacingObjectHistorical(), {
			KOMSpacingChronicles: item,
		})], KOMSharedLogic.KOMSharedGroupingDay(new Date())).KOMChronicleGroupingRelearning, item.slice(4, 5));
	});

	it('groups lapses', function () {
		const item = uChronicles();
		deepEqual(mod.KOMSpacingModelGroupChroniclesByStatus([Object.assign(StubSpacingObjectHistorical(), {
			KOMSpacingChronicles: item,
		})], KOMSharedLogic.KOMSharedGroupingDay(new Date())), uGrouping({
			KOMChronicleGroupingLearning: item.slice(0, 2),
			KOMChronicleGroupingRelearning: item.slice(4, 6),
			KOMChronicleGroupingDeveloping: item.slice(2, 3).concat(item[6]),
			KOMChronicleGroupingMature: item.slice(3, 4),
		}));
	});

});
