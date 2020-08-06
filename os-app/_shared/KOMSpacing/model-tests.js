const { throws, deepEqual } = require('assert');

const mainModule = require('./model.js').default;

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
			mainModule.KOMSpacingModelIdentifier(null);
		}, /KOMErrorInputNotValid/);
	});

	it('throws error if not valid', function () {
		throws(function () {
			mainModule.KOMSpacingModelIdentifier('bravoforward');
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function () {
		deepEqual(mainModule.KOMSpacingModelIdentifier('bravo-forward'), 'bravo');
	});

});

describe('KOMSpacingModelLabel', function test_KOMSpacingModelLabel() {

	it('throws error if not string', function () {
		throws(function () {
			mainModule.KOMSpacingModelLabel(null);
		}, /KOMErrorInputNotValid/);
	});

	it('throws error if not valid', function () {
		throws(function () {
			mainModule.KOMSpacingModelLabel('bravoforward');
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function () {
		deepEqual(mainModule.KOMSpacingModelLabel('bravo-forward'), 'forward');
	});

});

describe('KOMSpacingModelLabelForward', function test_KOMSpacingModelLabelForward() {

	it('returns string', function () {
		deepEqual(mainModule.KOMSpacingModelLabelForward(), 'forward');
	});

});

describe('KOMSpacingModelLabelBackward', function test_KOMSpacingModelLabelBackward() {

	it('returns string', function () {
		deepEqual(mainModule.KOMSpacingModelLabelBackward(), 'backward');
	});

});

describe('KOMSpacingModelErrorsFor', function test_KOMSpacingModelErrorsFor() {

	it('throws error if not object', function () {
		throws(function () {
			mainModule.KOMSpacingModelErrorsFor(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns object if KOMSpacingID not string', function () {
		deepEqual(mainModule.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingID: null,
		})), {
			KOMSpacingID: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns object if KOMSpacingID not separated', function () {
		deepEqual(mainModule.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingID: 'alfaforward',
		})), {
			KOMSpacingID: [
				'KOMErrorNotSeparated',
			],
		});
	});

	it('returns object if KOMSpacingID not filled', function () {
		deepEqual(mainModule.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingID: '-forward',
		})), {
			KOMSpacingID: [
				'KOMErrorNotFilled',
			],
		});
	});

	it('returns object if KOMSpacingID not labelled', function () {
		deepEqual(mainModule.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingID: 'alfa-bravo',
		})), {
			KOMSpacingID: [
				'KOMErrorNotLabelled',
			],
		});
	});

	it('returns null', function () {
		deepEqual(mainModule.KOMSpacingModelErrorsFor(kTesting.StubSpacingObjectValid()), null);
		deepEqual(mainModule.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingID: 'alfa-backward',
		})), null);
	});

	context('KOMSpacingDrawDate', function () {

		it('returns object if not date', function () {
			deepEqual(mainModule.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingDrawDate: null,
			})), {
				KOMSpacingDrawDate: [
					'KOMErrorNotDate',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mainModule.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingDrawDate: new Date(),
			})), null);
		});

	});

	context('KOMSpacingFlipDate', function () {

		it('returns object if not date', function () {
			deepEqual(mainModule.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingFlipDate: null,
			})), {
				KOMSpacingFlipDate: [
					'KOMErrorNotDate',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mainModule.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingFlipDate: new Date(),
			})), null);
		});

	});

	context('KOMSpacingDueDate', function () {

		it('returns object if not date', function () {
			deepEqual(mainModule.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingDueDate: null,
			})), {
				KOMSpacingDueDate: [
					'KOMErrorNotDate',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mainModule.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingDueDate: new Date(),
			})), null);
		});

	});

	context('KOMSpacingIsLearning', function () {

		it('returns object if not boolean', function () {
			deepEqual(mainModule.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingIsLearning: null,
			})), {
				KOMSpacingIsLearning: [
					'KOMErrorNotBoolean',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mainModule.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingIsLearning: true,
			})), null);
		});

	});

	context('KOMSpacingInterval', function () {

		it('returns object if not number', function () {
			deepEqual(mainModule.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingInterval: '1',
			})), {
				KOMSpacingInterval: [
					'KOMErrorNotNumber',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mainModule.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingInterval: 1,
			})), null);
		});

	});

	context('KOMSpacingMultiplier', function () {

		it('returns object if not number', function () {
			deepEqual(mainModule.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingMultiplier: '1',
			})), {
				KOMSpacingMultiplier: [
					'KOMErrorNotNumber',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mainModule.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingMultiplier: 1,
			})), null);
		});

	});

	context('KOMSpacingChronicles', function () {

		it('returns object if not array', function () {
			deepEqual(mainModule.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingChronicles: null,
			})), {
				KOMSpacingChronicles: [
					'KOMErrorNotArray',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mainModule.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingChronicles: [],
			})), null);
		});

	});

	context('$KOMSpacingCard', function () {

		it('returns object if not valid', function () {
			deepEqual(mainModule.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
				$KOMSpacingCard: {},
			})), {
				$KOMSpacingCard: [
					'KOMErrorNotValid',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mainModule.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
				$KOMSpacingCard: kTesting.StubCardObjectValid(),
			})), null);
		});

	});

	context('KOMOptionValidateIfNotPresent', function () {

		it('returns object if not valid', function () {
			deepEqual(Object.keys(mainModule.KOMSpacingModelErrorsFor({}, {
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
			mainModule.KOMSpacingModelIsBackward({});
		}, /KOMErrorInputNotValid/);
	});

	it('returns true if backward', function () {
		deepEqual(mainModule.KOMSpacingModelIsBackward(Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingID: 'bravo-backward',
		})), true);
	});

	it('returns false', function () {
		deepEqual(mainModule.KOMSpacingModelIsBackward(kTesting.StubSpacingObjectValid()), false);
	});

});

describe('KOMSpacingModelIsUnseen', function test_KOMSpacingModelIsUnseen() {

	it('throws if not valid', function () {
		throws(function () {
			mainModule.KOMSpacingModelIsUnseen({});
		}, /KOMErrorInputNotValid/);
	});

	it('returns false if KOMSpacingDueDate', function () {
		deepEqual(mainModule.KOMSpacingModelIsUnseen(Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingDueDate: new Date(),
		})), false);
	});

	it('returns true', function () {
		deepEqual(mainModule.KOMSpacingModelIsUnseen(kTesting.StubSpacingObjectValid()), true);
	});

});

describe('KOMSpacingModelIsLearning', function test_KOMSpacingModelIsLearning() {

	it('throws if not valid', function () {
		throws(function () {
			mainModule.KOMSpacingModelIsLearning({});
		}, /KOMErrorInputNotValid/);
	});

	it('returns true if KOMSpacingIsLearning', function () {
		deepEqual(mainModule.KOMSpacingModelIsLearning(Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingIsLearning: true,
		})), true);
	});

	it('returns false', function () {
		deepEqual(mainModule.KOMSpacingModelIsLearning(kTesting.StubSpacingObjectValid()), false);
	});

});

describe('KOMSpacingModelIsReviewing', function test_KOMSpacingModelIsReviewing() {

	it('throws if not valid', function () {
		throws(function () {
			mainModule.KOMSpacingModelIsReviewing({});
		}, /KOMErrorInputNotValid/);
	});

	it('returns false if KOMSpacingIsLearning', function () {
		deepEqual(mainModule.KOMSpacingModelIsReviewing(Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingIsLearning: true,
		})), false);
	});

	it('returns false if no KOMSpacingInterval', function () {
		deepEqual(mainModule.KOMSpacingModelIsReviewing(kTesting.StubSpacingObjectValid()), false);
	});

	it('returns true', function () {
		deepEqual(mainModule.KOMSpacingModelIsReviewing(Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingInterval: 1,
		})), true);
	});

});

describe('KOMSpacingModelMatureThreshold', function test_KOMSpacingModelMatureThreshold() {

	it('returns number', function () {
		deepEqual(mainModule.KOMSpacingModelMatureThreshold(), 21);
	});

});

describe('KOMSpacingModelIsDeveloping', function test_KOMSpacingModelIsDeveloping() {

	it('throws if not valid', function () {
		throws(function () {
			mainModule.KOMSpacingModelIsDeveloping({});
		}, /KOMErrorInputNotValid/);
	});

	it('returns false if no KOMSpacingInterval', function () {
		deepEqual(mainModule.KOMSpacingModelIsDeveloping(kTesting.StubSpacingObjectValid()), false);
	});

	it('returns false if KOMSpacingInterval above KOMSpacingModelMatureThreshold', function () {
		deepEqual(mainModule.KOMSpacingModelIsDeveloping(Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingInterval: mainModule.KOMSpacingModelMatureThreshold(),
		})), false);
	});

	it('returns true', function () {
		deepEqual(mainModule.KOMSpacingModelIsDeveloping(Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingInterval: 1,
		})), true);
	});

});

describe('KOMSpacingModelIsMature', function test_KOMSpacingModelIsMature() {

	it('throws if not valid', function () {
		throws(function () {
			mainModule.KOMSpacingModelIsMature({});
		}, /KOMErrorInputNotValid/);
	});

	it('returns false if no KOMSpacingInterval', function () {
		deepEqual(mainModule.KOMSpacingModelIsMature(kTesting.StubSpacingObjectValid()), false);
	});

	it('returns false if KOMSpacingInterval below KOMSpacingModelMatureThreshold', function () {
		deepEqual(mainModule.KOMSpacingModelIsMature(Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingInterval: 1,
		})), false);
	});

	it('returns true', function () {
		deepEqual(mainModule.KOMSpacingModelIsMature(Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingInterval: mainModule.KOMSpacingModelMatureThreshold(),
		})), true);
	});

});

describe('KOMSpacingModelFilterUnique', function test_KOMSpacingModelFilterUnique() {

	it('throws if not array', function () {
		throws(function () {
			mainModule.KOMSpacingModelFilterUnique(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns array', function () {
		deepEqual(mainModule.KOMSpacingModelFilterUnique([]), []);
	});

	it('excludes duplicate cards', function () {
		const item1 = StubSpacingObjectValid();
		const item2 = Object.assign(StubSpacingObjectValid(), {
			KOMSpacingID: 'charlie-forward',
		});

		deepEqual(mainModule.KOMSpacingModelFilterUnique([item1, Object.assign(Object.assign({}, item1), {
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
			KOMSpacingGroupingSuspended: [],
		}, inputData);
	};

	it('throws if not array', function () {
		throws(function () {
			mainModule.KOMSpacingModelGroupByStatus(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns array', function () {
		deepEqual(mainModule.KOMSpacingModelGroupByStatus([]), uGrouping());
	});

	it('groups unseen', function () {
		const item = StubSpacingObjectValid();
		deepEqual(mainModule.KOMSpacingModelGroupByStatus([item]), uGrouping({
			KOMSpacingGroupingTotal: [item],
			KOMSpacingGroupingUnseen: [item],
		}));
	});

	it('groups developing', function () {
		const item = Object.assign(StubSpacingObjectValid(), {
			KOMSpacingInterval: 1,
			KOMSpacingDueDate: new Date(),
		});
		deepEqual(mainModule.KOMSpacingModelGroupByStatus([item]), uGrouping({
			KOMSpacingGroupingTotal: [item],
			KOMSpacingGroupingDeveloping: [item],
		}));
	});

	it('groups mature', function () {
		const item = Object.assign(StubSpacingObjectValid(), {
			KOMSpacingInterval: mainModule.KOMSpacingModelMatureThreshold(),
			KOMSpacingDueDate: new Date(),
		});
		deepEqual(mainModule.KOMSpacingModelGroupByStatus([item]), uGrouping({
			KOMSpacingGroupingTotal: [item],
			KOMSpacingGroupingMature: [item],
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
				KOMChronicleInterval: mainModule.KOMSpacingModelMatureThreshold(),
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
			mainModule.KOMSpacingModelGroupChroniclesByStatus(null, '2000-01-01');
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param2 not string', function () {
		throws(function () {
			mainModule.KOMSpacingModelGroupChroniclesByStatus([], null);
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param2 not formatted', function () {
		throws(function () {
			mainModule.KOMSpacingModelGroupChroniclesByStatus([], 'alfa-br-va');
		}, /KOMErrorInputNotValid/);
	});

	it('returns array', function () {
		deepEqual(mainModule.KOMSpacingModelGroupChroniclesByStatus([], '2000-01-01'), uGrouping());
	});

	it('ignores if unseen', function () {
		const item = StubSpacingObjectValid();
		deepEqual(mainModule.KOMSpacingModelGroupChroniclesByStatus([item], KOMSharedLogic.KOMSharedGroupingDay(new Date())), uGrouping());
	});

	it('ignores if no match', function () {
		deepEqual(mainModule.KOMSpacingModelGroupChroniclesByStatus([StubSpacingObjectHistorical()], KOMSharedLogic.KOMSharedGroupingDay(new Date('2000-01-01'))), uGrouping());
	});

	it('groups learning', function () {
		const item = uChronicles(2);
		deepEqual(mainModule.KOMSpacingModelGroupChroniclesByStatus([Object.assign(StubSpacingObjectHistorical(), {
			KOMSpacingChronicles: item,
		})], KOMSharedLogic.KOMSharedGroupingDay(new Date())).KOMChronicleGroupingLearning, item.slice(0, 2));
	});

	it('groups developing', function () {
		const item = uChronicles(3);
		deepEqual(mainModule.KOMSpacingModelGroupChroniclesByStatus([Object.assign(StubSpacingObjectHistorical(), {
			KOMSpacingChronicles: item,
		})], KOMSharedLogic.KOMSharedGroupingDay(new Date())).KOMChronicleGroupingDeveloping, item.slice(2, 3));
	});

	it('groups mature', function () {
		const item = uChronicles(4);
		deepEqual(mainModule.KOMSpacingModelGroupChroniclesByStatus([Object.assign(StubSpacingObjectHistorical(), {
			KOMSpacingChronicles: item,
		})], KOMSharedLogic.KOMSharedGroupingDay(new Date())).KOMChronicleGroupingMature, item.slice(3, 4));
	});

	it('groups relearning', function () {
		const item = uChronicles(5);
		deepEqual(mainModule.KOMSpacingModelGroupChroniclesByStatus([Object.assign(StubSpacingObjectHistorical(), {
			KOMSpacingChronicles: item,
		})], KOMSharedLogic.KOMSharedGroupingDay(new Date())).KOMChronicleGroupingRelearning, item.slice(4, 5));
	});

	it('groups lapses', function () {
		const item = uChronicles();
		deepEqual(mainModule.KOMSpacingModelGroupChroniclesByStatus([Object.assign(StubSpacingObjectHistorical(), {
			KOMSpacingChronicles: item,
		})], KOMSharedLogic.KOMSharedGroupingDay(new Date())), uGrouping({
			KOMChronicleGroupingLearning: item.slice(0, 2),
			KOMChronicleGroupingRelearning: item.slice(4, 6),
			KOMChronicleGroupingDeveloping: item.slice(2, 3).concat(item[6]),
			KOMChronicleGroupingMature: item.slice(3, 4),
		}));
	});

});
