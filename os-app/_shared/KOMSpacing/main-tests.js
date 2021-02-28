const { rejects, throws, deepEqual, strictEqual } = require('assert');

const mod = require('./main.js').default;

const KOMCard = require('../KOMCard/main.js').default;
const KOMSharedLogic = require('../KOMSharedLogic/main.js').default;

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

describe('KOMSpacingModelLabel', function test_KOMSpacingModelLabel() {

	it('throws error if not string', function () {
		throws(function () {
			mod.KOMSpacingModelLabel(null);
		}, /KOMErrorInputNotValid/);
	});

	it('throws error if not valid', function () {
		throws(function () {
			mod.KOMSpacingModelLabel(Math.random().toString() + uRandomElement(mod.KOMSpacingModelLabelForward(), mod.KOMSpacingModelLabelBackward()));
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function () {
		const item = uRandomElement(mod.KOMSpacingModelLabelForward(), mod.KOMSpacingModelLabelBackward());
		deepEqual(mod.KOMSpacingModelLabel(Math.random().toString() + '-' + item), item);
	});

});

describe('KOMSpacingModelErrorsFor', function test_KOMSpacingModelErrorsFor() {

	it('throws error if not object', function() {
		throws(function() {
			mod.KOMSpacingModelErrorsFor(null);
		}, /KOMErrorInputNotValid/);
	});

	it('throws error if not object', function () {
		throws(function () {
			mod.KOMSpacingModelErrorsFor(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns object if KOMSpacingID not string', function () {
		deepEqual(mod.KOMSpacingModelErrorsFor(StubSpacingObjectValid({
			KOMSpacingID: null,
		})), {
			KOMSpacingID: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns object if KOMSpacingID not separated', function () {
		deepEqual(mod.KOMSpacingModelErrorsFor(StubSpacingObjectValid({
			KOMSpacingID: 'alfaforward',
		})), {
			KOMSpacingID: [
				'KOMErrorNotSeparated',
			],
		});
	});

	it('returns object if KOMSpacingID not filled', function () {
		deepEqual(mod.KOMSpacingModelErrorsFor(StubSpacingObjectValid({
			KOMSpacingID: '-forward',
		})), {
			KOMSpacingID: [
				'KOMErrorNotFilled',
			],
		});
	});

	it('returns object if KOMSpacingID not labelled', function () {
		deepEqual(mod.KOMSpacingModelErrorsFor(StubSpacingObjectValid({
			KOMSpacingID: 'alfa-bravo',
		})), {
			KOMSpacingID: [
				'KOMErrorNotLabelled',
			],
		});
	});

	it('returns null', function () {
		deepEqual(mod.KOMSpacingModelErrorsFor(StubSpacingObjectValid({
			KOMSpacingID: 'alfa-' + uRandomElement(mod.KOMSpacingModelLabelForward(), mod.KOMSpacingModelLabelBackward()),
		})), null);
	});

	context('KOMSpacingDrawDate', function () {

		it('returns object if not date', function () {
			deepEqual(mod.KOMSpacingModelErrorsFor(StubSpacingObjectValid({
				KOMSpacingDrawDate: null,
			})), {
				KOMSpacingDrawDate: [
					'KOMErrorNotDate',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mod.KOMSpacingModelErrorsFor(StubSpacingObjectValid({
				KOMSpacingDrawDate: new Date(),
			})), null);
		});

	});

	context('KOMSpacingFlipDate', function () {

		it('returns object if not date', function () {
			deepEqual(mod.KOMSpacingModelErrorsFor(StubSpacingObjectValid({
				KOMSpacingFlipDate: null,
			})), {
				KOMSpacingFlipDate: [
					'KOMErrorNotDate',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mod.KOMSpacingModelErrorsFor(StubSpacingObjectValid({
				KOMSpacingFlipDate: new Date(),
			})), null);
		});

	});

	context('KOMSpacingDueDate', function () {

		it('returns object if not date', function () {
			deepEqual(mod.KOMSpacingModelErrorsFor(StubSpacingObjectValid({
				KOMSpacingDueDate: null,
			})), {
				KOMSpacingDueDate: [
					'KOMErrorNotDate',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mod.KOMSpacingModelErrorsFor(StubSpacingObjectValid({
				KOMSpacingDueDate: new Date(),
			})), null);
		});

	});

	context('KOMSpacingIsLearning', function () {

		it('returns object if not boolean', function () {
			deepEqual(mod.KOMSpacingModelErrorsFor(StubSpacingObjectValid({
				KOMSpacingIsLearning: null,
			})), {
				KOMSpacingIsLearning: [
					'KOMErrorNotBoolean',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mod.KOMSpacingModelErrorsFor(StubSpacingObjectValid({
				KOMSpacingIsLearning: true,
			})), null);
		});

	});

	context('KOMSpacingInterval', function () {

		it('returns object if not number', function () {
			deepEqual(mod.KOMSpacingModelErrorsFor(StubSpacingObjectValid({
				KOMSpacingInterval: '1',
			})), {
				KOMSpacingInterval: [
					'KOMErrorNotNumber',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mod.KOMSpacingModelErrorsFor(StubSpacingObjectValid({
				KOMSpacingInterval: 1,
			})), null);
		});

	});

	context('KOMSpacingMultiplier', function () {

		it('returns object if not number', function () {
			deepEqual(mod.KOMSpacingModelErrorsFor(StubSpacingObjectValid({
				KOMSpacingMultiplier: '1',
			})), {
				KOMSpacingMultiplier: [
					'KOMErrorNotNumber',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mod.KOMSpacingModelErrorsFor(StubSpacingObjectValid({
				KOMSpacingMultiplier: 1,
			})), null);
		});

	});

	context('KOMSpacingChronicles', function () {

		it('returns object if not array', function () {
			deepEqual(mod.KOMSpacingModelErrorsFor(StubSpacingObjectValid({
				KOMSpacingChronicles: null,
			})), {
				KOMSpacingChronicles: [
					'KOMErrorNotArray',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mod.KOMSpacingModelErrorsFor(StubSpacingObjectValid({
				KOMSpacingChronicles: [],
			})), null);
		});

	});

	context('$KOMSpacingCard', function () {

		it('returns object if not valid', function () {
			deepEqual(mod.KOMSpacingModelErrorsFor(StubSpacingObjectValid({
				$KOMSpacingCard: {},
			})), {
				$KOMSpacingCard: [
					'KOMErrorNotValid',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mod.KOMSpacingModelErrorsFor(StubSpacingObjectValid({
				$KOMSpacingCard: StubCardObjectValid(),
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

describe('KOMSpacingPath', function test_KOMSpacingPath() {

	it('returns string', function () {
		const KOMCardID = Math.random().toString();
		const card = StubCardObjectValid({
			KOMCardID,
		});
		const label = uRandomElement(mod.KOMSpacingModelLabelForward(), mod.KOMSpacingModelLabelBackward());
		deepEqual(mod.KOMSpacingPath(StubSpacingObjectValid({
			KOMSpacingID: [KOMCardID, label].join('-'),
		}), card), KOMCard.KOMCardFolderPath(card) + 'spacing-' + label);
	});

});

describe('KOMSpacingStub', function test_KOMSpacingStub() {

	it('returns string', function() {
		const KOMCardID = Math.random().toString();
		const label = uRandomElement(mod.KOMSpacingModelLabelForward(), mod.KOMSpacingModelLabelBackward());
		deepEqual(mod.KOMSpacingStub(KOMCard.KOMCardFolderPath(StubCardObjectValid({
			KOMCardID,
		})) + 'spacing-' + label), {
			KOMSpacingID: [KOMCardID, label].join('-'),
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
		deepEqual(mod.KOMSpacingModelIsBackward(StubSpacingObjectValid({
			KOMSpacingID: 'bravo-backward',
		})), true);
	});

	it('returns false', function () {
		deepEqual(mod.KOMSpacingModelIsBackward(StubSpacingObjectValid()), false);
	});

});

describe('KOMSpacingModelIsUnseen', function test_KOMSpacingModelIsUnseen() {

	it('throws if not valid', function () {
		throws(function () {
			mod.KOMSpacingModelIsUnseen({});
		}, /KOMErrorInputNotValid/);
	});

	it('returns false if KOMSpacingDueDate', function () {
		deepEqual(mod.KOMSpacingModelIsUnseen(StubSpacingObjectValid({
			KOMSpacingDueDate: new Date(),
		})), false);
	});

	it('returns true', function () {
		deepEqual(mod.KOMSpacingModelIsUnseen(StubSpacingObjectValid()), true);
	});

});

describe('KOMSpacingModelIsLearning', function test_KOMSpacingModelIsLearning() {

	it('throws if not valid', function () {
		throws(function () {
			mod.KOMSpacingModelIsLearning({});
		}, /KOMErrorInputNotValid/);
	});

	it('returns true if KOMSpacingIsLearning', function () {
		deepEqual(mod.KOMSpacingModelIsLearning(StubSpacingObjectValid({
			KOMSpacingIsLearning: true,
		})), true);
	});

	it('returns false', function () {
		deepEqual(mod.KOMSpacingModelIsLearning(StubSpacingObjectValid()), false);
	});

});

describe('KOMSpacingModelIsReviewing', function test_KOMSpacingModelIsReviewing() {

	it('throws if not valid', function () {
		throws(function () {
			mod.KOMSpacingModelIsReviewing({});
		}, /KOMErrorInputNotValid/);
	});

	it('returns false if KOMSpacingIsLearning', function () {
		deepEqual(mod.KOMSpacingModelIsReviewing(StubSpacingObjectValid({
			KOMSpacingIsLearning: true,
		})), false);
	});

	it('returns false if no KOMSpacingInterval', function () {
		deepEqual(mod.KOMSpacingModelIsReviewing(StubSpacingObjectValid()), false);
	});

	it('returns true', function () {
		deepEqual(mod.KOMSpacingModelIsReviewing(StubSpacingObjectValid({
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
		deepEqual(mod.KOMSpacingModelIsDeveloping(StubSpacingObjectValid()), false);
	});

	it('returns false if KOMSpacingInterval above KOMSpacingModelMatureThreshold', function () {
		deepEqual(mod.KOMSpacingModelIsDeveloping(StubSpacingObjectValid({
			KOMSpacingInterval: mod.KOMSpacingModelMatureThreshold(),
		})), false);
	});

	it('returns true', function () {
		deepEqual(mod.KOMSpacingModelIsDeveloping(StubSpacingObjectValid({
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
		deepEqual(mod.KOMSpacingModelIsMature(StubSpacingObjectValid()), false);
	});

	it('returns false if KOMSpacingInterval below KOMSpacingModelMatureThreshold', function () {
		deepEqual(mod.KOMSpacingModelIsMature(StubSpacingObjectValid({
			KOMSpacingInterval: 1,
		})), false);
	});

	it('returns true', function () {
		deepEqual(mod.KOMSpacingModelIsMature(StubSpacingObjectValid({
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

describe('KOMSpacingWrite', function test_KOMSpacingWrite() {

	it('throws if param1 not object', function () {
		throws(function () {
			ZDRTestingWrap.App.KOMSpacing.KOMSpacingWrite(null, StubCardObjectValid());
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param2 not valid', function () {
		throws(function () {
			ZDRTestingWrap.App.KOMSpacing.KOMSpacingWrite(StubSpacingObjectValid(), {});
		}, /KOMErrorInputNotValid/);
	});

	it('rejects with errors if not valid', async function() {
		await rejects(ZDRTestingWrap.App.KOMSpacing.KOMSpacingWrite(StubSpacingObjectValid({
			KOMSpacingID: null,
		}), StubCardObjectValid()), {
			KOMSpacingID: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns param1', async function() {
		const item = StubSpacingObjectValid();

		strictEqual(await ZDRTestingWrap.App.KOMSpacing.KOMSpacingWrite(item, StubCardObjectValid()), item);
	});

	context('relations', function () {

		const memory = StubSpacingObjectValid({
			$alfa: 'bravo',
		});
		const item = {};

		before(async function () {
			item.outputData = await ZDRTestingWrap.App.KOMSpacing.KOMSpacingWrite(memory, StubCardObjectValid());
		});

		before(async function () {
			item.storage = (await ZDRTestingWrap.App.KOMSpacing.KOMSpacingList(StubCardObjectValid())).KOMCardSpacingForward;
		});

		it('excludes from storage', function () {
			deepEqual(item.storage, StubSpacingObjectValid());
		});

		it('includes in outputData', function () {
			deepEqual(item.outputData, memory);
		});

		it('updates inputData', function () {
			strictEqual(item.outputData, memory);
		});

	});

});

describe('KOMSpacingList', function test_KOMSpacingList() {

	it('rejects if not valid', async function () {
		await rejects(ZDRTestingWrap.App.KOMSpacing.KOMSpacingList({}), /KOMErrorInputNotValid/);
	});

	it('returns object', async function () {
		const item = StubCardObjectValid();
		deepEqual(await ZDRTestingWrap.App.KOMSpacing.KOMSpacingList(item), {
			KOMCardSpacingForward: StubSpacingObjectValid({
				KOMSpacingID: [item.KOMCardID, mod.KOMSpacingModelLabelForward()].join('-'),
			}),
			KOMCardSpacingBackward: StubSpacingObjectValid({
				KOMSpacingID: [item.KOMCardID, mod.KOMSpacingModelLabelBackward()].join('-'),
			}),
		});
	});

	it('returns existing KOMSpacings forward', async function () {
		const item = StubSpacingObjectValid({
			KOMSpacingID: Math.random().toString() + '-' + mod.KOMSpacingModelLabelForward(),
			KOMSpacingDueDate: new Date(),
		});

		await ZDRTestingWrap.App.KOMSpacing.KOMSpacingWrite(item, StubCardObjectValid());

		deepEqual((await ZDRTestingWrap.App.KOMSpacing.KOMSpacingList(StubCardObjectValid())).KOMCardSpacingForward, item);
	});

	it('returns existing KOMSpacings backward', async function () {
		const item = StubSpacingObjectValid({
			KOMSpacingID: 'alfa-' + mod.KOMSpacingModelLabelBackward(),
			KOMSpacingDueDate: new Date(),
		});

		await ZDRTestingWrap.App.KOMSpacing.KOMSpacingWrite(item, StubCardObjectValid());

		deepEqual((await ZDRTestingWrap.App.KOMSpacing.KOMSpacingList(StubCardObjectValid())).KOMCardSpacingBackward, item);
	});

	it('parses KOMSpacingChronicles dates', async function () {
		const item = StubSpacingObjectValid({
			KOMSpacingID: 'alfa-' + mod.KOMSpacingModelLabelBackward(),
			KOMSpacingDueDate: new Date(),
			KOMSpacingChronicles: [{
				KOMChronicleDrawDate: new Date('2019-02-23T12:00:00Z'),
				KOMChronicleFlipDate: new Date('2019-02-23T12:00:00Z'),
				KOMChronicleResponseDate: new Date('2019-02-23T12:00:00Z'),
				KOMChronicleResponseType: 'alfa',
			}]
		});

		await ZDRTestingWrap.App.KOMSpacing.KOMSpacingWrite(item, StubCardObjectValid());

		deepEqual((await ZDRTestingWrap.App.KOMSpacing.KOMSpacingList(StubCardObjectValid())).KOMCardSpacingBackward, item);
	});

});

describe('ZDRSchemaDispatchValidate', function () {

	it('returns function', function () {
		deepEqual(mod.ZDRSchemaDispatchValidate, mod.KOMSpacingModelErrorsFor);
	});

});

describe('ZDRSchemaPath', function () {

	it('returns function', function() {
		deepEqual(mod.ZDRSchemaPath, mod.KOMSpacingPath);
	});

});

describe('ZDRSchemaStub', function () {

	it('returns function', function() {
		deepEqual(mod.ZDRSchemaStub, mod.KOMSpacingStub);
	});

});
