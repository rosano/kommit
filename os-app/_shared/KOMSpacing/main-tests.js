const { rejects, throws, deepEqual, strictEqual } = require('assert');

const mod = require('./main.js').default;

const KOMCard = require('../KOMCard/main.js').default;
const OLSKMoment = require('OLSKMoment');

describe('KOMSpacingIdentifier', function test_KOMSpacingIdentifier() {

	it('throws error if not string', function () {
		throws(function () {
			mod.KOMSpacingIdentifier(null);
		}, /KOMErrorInputNotValid/);
	});

	it('throws error if not valid', function () {
		throws(function () {
			mod.KOMSpacingIdentifier('bravoforward');
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function () {
		deepEqual(mod.KOMSpacingIdentifier('bravo-forward'), 'bravo');
	});

});

describe('KOMSpacingLabelForward', function test_KOMSpacingLabelForward() {

	it('returns string', function () {
		deepEqual(mod.KOMSpacingLabelForward(), 'forward');
	});

});

describe('KOMSpacingLabelBackward', function test_KOMSpacingLabelBackward() {

	it('returns string', function () {
		deepEqual(mod.KOMSpacingLabelBackward(), 'backward');
	});

});

describe('KOMSpacingLabel', function test_KOMSpacingLabel() {

	it('throws error if not string', function () {
		throws(function () {
			mod.KOMSpacingLabel(null);
		}, /KOMErrorInputNotValid/);
	});

	it('throws error if not valid', function () {
		throws(function () {
			mod.KOMSpacingLabel(Math.random().toString() + uRandomElement(mod.KOMSpacingLabelForward(), mod.KOMSpacingLabelBackward()));
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function () {
		const item = uRandomElement(mod.KOMSpacingLabelForward(), mod.KOMSpacingLabelBackward());
		deepEqual(mod.KOMSpacingLabel(Math.random().toString() + '-' + item), item);
	});

});

describe('KOMSpacingErrors', function test_KOMSpacingErrors() {

	it('throws error if not object', function() {
		throws(function() {
			mod.KOMSpacingErrors(null);
		}, /KOMErrorInputNotValid/);
	});

	it('throws error if not object', function () {
		throws(function () {
			mod.KOMSpacingErrors(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns object if KOMSpacingID not string', function () {
		deepEqual(mod.KOMSpacingErrors(StubSpacingObjectValid({
			KOMSpacingID: null,
		})), {
			KOMSpacingID: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns object if KOMSpacingID not separated', function () {
		deepEqual(mod.KOMSpacingErrors(StubSpacingObjectValid({
			KOMSpacingID: 'alfaforward',
		})), {
			KOMSpacingID: [
				'KOMErrorNotSeparated',
			],
		});
	});

	it('returns object if KOMSpacingID not filled', function () {
		deepEqual(mod.KOMSpacingErrors(StubSpacingObjectValid({
			KOMSpacingID: '-forward',
		})), {
			KOMSpacingID: [
				'KOMErrorNotFilled',
			],
		});
	});

	it('returns object if KOMSpacingID not labelled', function () {
		deepEqual(mod.KOMSpacingErrors(StubSpacingObjectValid({
			KOMSpacingID: 'alfa-bravo',
		})), {
			KOMSpacingID: [
				'KOMErrorNotLabelled',
			],
		});
	});

	it('returns null', function () {
		deepEqual(mod.KOMSpacingErrors(StubSpacingObjectValid({
			KOMSpacingID: 'alfa-' + uRandomElement(mod.KOMSpacingLabelForward(), mod.KOMSpacingLabelBackward()),
		})), null);
	});

	context('KOMSpacingDrawDate', function () {

		it('returns object if not date', function () {
			deepEqual(mod.KOMSpacingErrors(StubSpacingObjectValid({
				KOMSpacingDrawDate: null,
			})), {
				KOMSpacingDrawDate: [
					'KOMErrorNotDate',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mod.KOMSpacingErrors(StubSpacingObjectValid({
				KOMSpacingDrawDate: new Date(),
			})), null);
		});

	});

	context('KOMSpacingFlipDate', function () {

		it('returns object if not date', function () {
			deepEqual(mod.KOMSpacingErrors(StubSpacingObjectValid({
				KOMSpacingFlipDate: null,
			})), {
				KOMSpacingFlipDate: [
					'KOMErrorNotDate',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mod.KOMSpacingErrors(StubSpacingObjectValid({
				KOMSpacingFlipDate: new Date(),
			})), null);
		});

	});

	context('KOMSpacingDueDate', function () {

		it('returns object if not date', function () {
			deepEqual(mod.KOMSpacingErrors(StubSpacingObjectValid({
				KOMSpacingDueDate: null,
			})), {
				KOMSpacingDueDate: [
					'KOMErrorNotDate',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mod.KOMSpacingErrors(StubSpacingObjectValid({
				KOMSpacingDueDate: new Date(),
			})), null);
		});

	});

	context('KOMSpacingIsLearning', function () {

		it('returns object if not boolean', function () {
			deepEqual(mod.KOMSpacingErrors(StubSpacingObjectValid({
				KOMSpacingIsLearning: null,
			})), {
				KOMSpacingIsLearning: [
					'KOMErrorNotBoolean',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mod.KOMSpacingErrors(StubSpacingObjectValid({
				KOMSpacingIsLearning: true,
			})), null);
		});

	});

	context('KOMSpacingInterval', function () {

		it('returns object if not number', function () {
			deepEqual(mod.KOMSpacingErrors(StubSpacingObjectValid({
				KOMSpacingInterval: '1',
			})), {
				KOMSpacingInterval: [
					'KOMErrorNotNumber',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mod.KOMSpacingErrors(StubSpacingObjectValid({
				KOMSpacingInterval: 1,
			})), null);
		});

	});

	context('KOMSpacingMultiplier', function () {

		it('returns object if not number', function () {
			deepEqual(mod.KOMSpacingErrors(StubSpacingObjectValid({
				KOMSpacingMultiplier: '1',
			})), {
				KOMSpacingMultiplier: [
					'KOMErrorNotNumber',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mod.KOMSpacingErrors(StubSpacingObjectValid({
				KOMSpacingMultiplier: 1,
			})), null);
		});

	});

	context('KOMSpacingChronicles', function () {

		it('returns object if not array', function () {
			deepEqual(mod.KOMSpacingErrors(StubSpacingObjectValid({
				KOMSpacingChronicles: null,
			})), {
				KOMSpacingChronicles: [
					'KOMErrorNotArray',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mod.KOMSpacingErrors(StubSpacingObjectValid({
				KOMSpacingChronicles: [],
			})), null);
		});

	});

	context('$KOMSpacingCard', function () {

		it('returns object if not valid', function () {
			deepEqual(mod.KOMSpacingErrors(StubSpacingObjectValid({
				$KOMSpacingCard: {},
			})), {
				$KOMSpacingCard: [
					'KOMErrorNotValid',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mod.KOMSpacingErrors(StubSpacingObjectValid({
				$KOMSpacingCard: StubCardObjectValid(),
			})), null);
		});

	});

	context('KOMOptionValidateIfNotPresent', function () {

		it('returns object if not valid', function () {
			deepEqual(Object.keys(mod.KOMSpacingErrors({}, {
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
		const label = uRandomElement(mod.KOMSpacingLabelForward(), mod.KOMSpacingLabelBackward());
		deepEqual(mod.KOMSpacingPath(StubSpacingObjectValid({
			KOMSpacingID: [KOMCardID, label].join('-'),
			$KOMSpacingCard: card,
		})), KOMCard.KOMCardFolderPath(card) + 'spacing-' + label);
	});

});

describe('KOMSpacingStub', function test_KOMSpacingStub() {

	it('returns string', function() {
		const KOMCardID = Math.random().toString();
		const card = StubCardObjectValid({
			KOMCardID,
		});
		const label = uRandomElement(mod.KOMSpacingLabelForward(), mod.KOMSpacingLabelBackward());
		deepEqual(mod.KOMSpacingStub(KOMCard.KOMCardFolderPath(card) + 'spacing-' + label), {
			KOMSpacingID: [KOMCardID, label].join('-'),
			$KOMSpacingCard: {
				KOMCardID,
				KOMCardCreationDate: new Date(card.KOMCardCreationDate.toJSON().slice(0, 10)),
			},
		});
	});

});

describe('KOMSpacingIsBackward', function test_KOMSpacingIsBackward() {

	it('throws if not valid', function () {
		throws(function () {
			mod.KOMSpacingIsBackward({});
		}, /KOMErrorInputNotValid/);
	});

	it('returns true if backward', function () {
		deepEqual(mod.KOMSpacingIsBackward(StubSpacingObjectValid({}, mod.KOMSpacingLabelBackward())), true);
	});

	it('returns false', function () {
		deepEqual(mod.KOMSpacingIsBackward(StubSpacingObjectValid({}, mod.KOMSpacingLabelForward())), false);
	});

});

describe('KOMSpacingIsUnseen', function test_KOMSpacingIsUnseen() {

	it('throws if not valid', function () {
		throws(function () {
			mod.KOMSpacingIsUnseen({});
		}, /KOMErrorInputNotValid/);
	});

	it('returns false if KOMSpacingDueDate', function () {
		deepEqual(mod.KOMSpacingIsUnseen(StubSpacingObjectValid({
			KOMSpacingDueDate: new Date(),
		})), false);
	});

	it('returns true', function () {
		deepEqual(mod.KOMSpacingIsUnseen(StubSpacingObjectValid()), true);
	});

	it('returns true if learning', function () {
		deepEqual(mod.KOMSpacingIsUnseen(StubSpacingObjectValid({
			KOMSpacingDueDate: new Date(),
			KOMSpacingIsLearning: true,
		})), true);
	});

});

describe('KOMSpacingIsLearning', function test_KOMSpacingIsLearning() {

	it('throws if not valid', function () {
		throws(function () {
			mod.KOMSpacingIsLearning({});
		}, /KOMErrorInputNotValid/);
	});

	it('returns true if KOMSpacingIsLearning', function () {
		deepEqual(mod.KOMSpacingIsLearning(StubSpacingObjectValid({
			KOMSpacingIsLearning: true,
		})), true);
	});

	it('returns false', function () {
		deepEqual(mod.KOMSpacingIsLearning(StubSpacingObjectValid()), false);
	});

});

describe('KOMSpacingIsReviewing', function test_KOMSpacingIsReviewing() {

	it('throws if not valid', function () {
		throws(function () {
			mod.KOMSpacingIsReviewing({});
		}, /KOMErrorInputNotValid/);
	});

	it('returns false if KOMSpacingIsLearning', function () {
		deepEqual(mod.KOMSpacingIsReviewing(StubSpacingObjectValid({
			KOMSpacingIsLearning: true,
		})), false);
	});

	it('returns false if no KOMSpacingInterval', function () {
		deepEqual(mod.KOMSpacingIsReviewing(StubSpacingObjectValid()), false);
	});

	it('returns true', function () {
		deepEqual(mod.KOMSpacingIsReviewing(StubSpacingObjectValid({
			KOMSpacingInterval: 1,
		})), true);
	});

});

describe('KOMSpacingMatureThreshold', function test_KOMSpacingMatureThreshold() {

	it('returns number', function () {
		deepEqual(mod.KOMSpacingMatureThreshold(), 21);
	});

});

describe('KOMSpacingIsDeveloping', function test_KOMSpacingIsDeveloping() {

	it('throws if not valid', function () {
		throws(function () {
			mod.KOMSpacingIsDeveloping({});
		}, /KOMErrorInputNotValid/);
	});

	it('returns false if no KOMSpacingInterval', function () {
		deepEqual(mod.KOMSpacingIsDeveloping(StubSpacingObjectValid()), false);
	});

	it('returns false if KOMSpacingInterval above KOMSpacingMatureThreshold', function () {
		deepEqual(mod.KOMSpacingIsDeveloping(StubSpacingObjectValid({
			KOMSpacingInterval: mod.KOMSpacingMatureThreshold(),
		})), false);
	});

	it('returns true', function () {
		deepEqual(mod.KOMSpacingIsDeveloping(StubSpacingObjectValid({
			KOMSpacingInterval: 1,
		})), true);
	});

});

describe('KOMSpacingIsMature', function test_KOMSpacingIsMature() {

	it('throws if not valid', function () {
		throws(function () {
			mod.KOMSpacingIsMature({});
		}, /KOMErrorInputNotValid/);
	});

	it('returns false if no KOMSpacingInterval', function () {
		deepEqual(mod.KOMSpacingIsMature(StubSpacingObjectValid()), false);
	});

	it('returns false if KOMSpacingInterval below KOMSpacingMatureThreshold', function () {
		deepEqual(mod.KOMSpacingIsMature(StubSpacingObjectValid({
			KOMSpacingInterval: 1,
		})), false);
	});

	it('returns true', function () {
		deepEqual(mod.KOMSpacingIsMature(StubSpacingObjectValid({
			KOMSpacingInterval: mod.KOMSpacingMatureThreshold(),
		})), true);
	});

});

describe('KOMSpacingFilterUnique', function test_KOMSpacingFilterUnique() {

	it('throws if not array', function () {
		throws(function () {
			mod.KOMSpacingFilterUnique(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns array', function () {
		deepEqual(mod.KOMSpacingFilterUnique([]), []);
	});

	it('excludes duplicate cards', function () {
		const item1 = StubSpacingObjectValid();
		const item2 = StubSpacingObjectValid({
			KOMSpacingID: 'charlie-forward',
		});

		deepEqual(mod.KOMSpacingFilterUnique([item1, Object.assign(Object.assign({}, item1), {
			KOMSpacingID: item1.KOMSpacingID.replace('forward', 'backward'),
		}), item2]), [item1, item2]);
	});

});

describe('KOMSpacingByStatus', function test_KOMSpacingByStatus() {

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
			mod.KOMSpacingByStatus(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns array', function () {
		deepEqual(mod.KOMSpacingByStatus([]), uGrouping());
	});

	it('groups unseen', function () {
		const item = StubSpacingObjectValid();
		deepEqual(mod.KOMSpacingByStatus([item]), uGrouping({
			KOMSpacingGroupingTotal: [item],
			KOMSpacingGroupingUnseen: [item],
		}));
	});

	it('groups developing', function () {
		const item = StubSpacingObjectValid({
			KOMSpacingInterval: 1,
			KOMSpacingDueDate: new Date(),
		});
		deepEqual(mod.KOMSpacingByStatus([item]), uGrouping({
			KOMSpacingGroupingTotal: [item],
			KOMSpacingGroupingDeveloping: [item],
		}));
	});

	it('groups mature', function () {
		const item = StubSpacingObjectValid({
			KOMSpacingInterval: mod.KOMSpacingMatureThreshold(),
			KOMSpacingDueDate: new Date(),
		});
		deepEqual(mod.KOMSpacingByStatus([item]), uGrouping({
			KOMSpacingGroupingTotal: [item],
			KOMSpacingGroupingMature: [item],
		}));
	});

	it('groups retired', function () {
		const item = StubSpacingObjectValid({
			$KOMSpacingCard: StubCardObjectValid({
				KOMCardIsRetired: true,
			}),
		});
		deepEqual(mod.KOMSpacingByStatus([item]), uGrouping({
			KOMSpacingGroupingTotal: [item],
			KOMSpacingGroupingRetired: [item],
		}));
	});

});

describe('KOMSpacingChroniclesByStatus', function test_KOMSpacingChroniclesByStatus() {

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
				KOMChronicleInterval: mod.KOMSpacingMatureThreshold(),
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
			mod.KOMSpacingChroniclesByStatus(null, '2000-01-01');
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param2 not string', function () {
		throws(function () {
			mod.KOMSpacingChroniclesByStatus([], null);
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param2 not formatted', function () {
		throws(function () {
			mod.KOMSpacingChroniclesByStatus([], 'alfa-br-va');
		}, /KOMErrorInputNotValid/);
	});

	it('returns array', function () {
		deepEqual(mod.KOMSpacingChroniclesByStatus([], '2000-01-01'), uGrouping());
	});

	it('ignores if unseen', function () {
		const item = StubSpacingObjectValid();
		deepEqual(mod.KOMSpacingChroniclesByStatus([item], OLSKMoment.OLSKMomentPerceptionDay(new Date())), uGrouping());
	});

	it('ignores if no match', function () {
		deepEqual(mod.KOMSpacingChroniclesByStatus([StubSpacingObjectHistorical()], OLSKMoment.OLSKMomentPerceptionDay(new Date('2000-01-01'))), uGrouping());
	});

	it('groups learning', function () {
		const item = uChronicles(2);
		deepEqual(mod.KOMSpacingChroniclesByStatus([Object.assign(StubSpacingObjectHistorical(), {
			KOMSpacingChronicles: item,
		})], OLSKMoment.OLSKMomentPerceptionDay(new Date())).KOMChronicleGroupingLearning, item.slice(0, 2));
	});

	it('groups developing', function () {
		const item = uChronicles(3);
		deepEqual(mod.KOMSpacingChroniclesByStatus([Object.assign(StubSpacingObjectHistorical(), {
			KOMSpacingChronicles: item,
		})], OLSKMoment.OLSKMomentPerceptionDay(new Date())).KOMChronicleGroupingDeveloping, item.slice(2, 3));
	});

	it('groups mature', function () {
		const item = uChronicles(4);
		deepEqual(mod.KOMSpacingChroniclesByStatus([Object.assign(StubSpacingObjectHistorical(), {
			KOMSpacingChronicles: item,
		})], OLSKMoment.OLSKMomentPerceptionDay(new Date())).KOMChronicleGroupingMature, item.slice(3, 4));
	});

	it('groups relearning', function () {
		const item = uChronicles(5);
		deepEqual(mod.KOMSpacingChroniclesByStatus([Object.assign(StubSpacingObjectHistorical(), {
			KOMSpacingChronicles: item,
		})], OLSKMoment.OLSKMomentPerceptionDay(new Date())).KOMChronicleGroupingRelearning, item.slice(4, 5));
	});

	it('groups lapses', function () {
		const item = uChronicles();
		deepEqual(mod.KOMSpacingChroniclesByStatus([Object.assign(StubSpacingObjectHistorical(), {
			KOMSpacingChronicles: item,
		})], OLSKMoment.OLSKMomentPerceptionDay(new Date())), uGrouping({
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

		const card = StubCardObjectValid();
		const memory = StubSpacingObjectValid({
			KOMSpacingID: card.KOMCardID + '-forward',
			$alfa: 'bravo',
		});
		const item = {};

		before(async function () {
			item.outputData = await ZDRTestingWrap.App.KOMSpacing.KOMSpacingWrite(memory, card);
		});

		before(async function () {
			item.storage = (await ZDRTestingWrap.App.KOMSpacing.KOMSpacingList(card)).KOMCardSpacingForward;
		});

		it('excludes from storage', function () {
			deepEqual(item.storage, StubSpacingObjectValid({
				KOMSpacingID: memory.KOMSpacingID,
			}));
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
				KOMSpacingID: [item.KOMCardID, mod.KOMSpacingLabelForward()].join('-'),
			}),
			KOMCardSpacingBackward: StubSpacingObjectValid({
				KOMSpacingID: [item.KOMCardID, mod.KOMSpacingLabelBackward()].join('-'),
			}),
		});
	});

	it('returns existing KOMSpacings forward', async function () {
		const card = StubCardObjectValid();
		const item = StubSpacingObjectValid({
			KOMSpacingID: card.KOMCardID + '-' + mod.KOMSpacingLabelForward(),
			KOMSpacingDueDate: new Date(),
		});

		await ZDRTestingWrap.App.KOMSpacing.KOMSpacingWrite(item, card);

		deepEqual((await ZDRTestingWrap.App.KOMSpacing.KOMSpacingList(card)).KOMCardSpacingForward, item);
	});

	it('returns existing KOMSpacings backward', async function () {
		const card = StubCardObjectValid();
		const item = StubSpacingObjectValid({
			KOMSpacingID: 'alfa-' + mod.KOMSpacingLabelBackward(),
			KOMSpacingDueDate: new Date(),
		});

		await ZDRTestingWrap.App.KOMSpacing.KOMSpacingWrite(item, card);

		deepEqual((await ZDRTestingWrap.App.KOMSpacing.KOMSpacingList(card)).KOMCardSpacingBackward, item);
	});

	it('parses KOMSpacingChronicles dates', async function () {
		const card = StubCardObjectValid();
		const item = StubSpacingObjectValid({
			KOMSpacingID: 'alfa-' + mod.KOMSpacingLabelBackward(),
			KOMSpacingDueDate: new Date(),
			KOMSpacingChronicles: [{
				KOMChronicleDrawDate: new Date('2019-02-23T12:00:00Z'),
				KOMChronicleFlipDate: new Date('2019-02-23T12:00:00Z'),
				KOMChronicleResponseDate: new Date('2019-02-23T12:00:00Z'),
				KOMChronicleResponseType: 'alfa',
			}]
		});

		await ZDRTestingWrap.App.KOMSpacing.KOMSpacingWrite(item, card);

		deepEqual((await ZDRTestingWrap.App.KOMSpacing.KOMSpacingList(card)).KOMCardSpacingBackward, item);
	});

});

describe('ZDRSchemaDispatchValidate', function () {

	it('returns function', function () {
		deepEqual(mod.ZDRSchemaDispatchValidate, mod.KOMSpacingErrors);
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
