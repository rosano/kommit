const { rejects, throws, deepEqual } = require('assert');

const mainModule = require('./storage.js').default;
const KOMCardStorage = require('../KOMCard/storage.js').default;
const KOMDeckStorage = require('../KOMDeck/storage.js').default;
const KOMSettingStorage = require('../KOMSetting/storage.js').default;

describe('KOMSpacingStorageCollectionName', function test_KOMSpacingStorageCollectionName() {

	it('returns string', function () {
		deepEqual(mainModule.KOMSpacingStorageCollectionName(), 'kom_spacings');
	});

});

describe('KOMSpacingStorageCollectionType', function test_KOMSpacingStorageCollectionType() {

	it('returns string', function () {
		deepEqual(mainModule.KOMSpacingStorageCollectionType(), 'kom_spacing');
	});

});

describe('KOMSpacingStoragePathForward', function test_KOMSpacingStoragePathForward() {

	it('throws if param1 not valid', function () {
		throws(function () {
			mainModule.KOMSpacingStoragePathForward({}, StubDeckObjectValid());
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param2 not valid', function () {
		throws(function () {
			mainModule.KOMSpacingStoragePathForward(StubCardObjectValid(), {});
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function () {
		deepEqual(mainModule.KOMSpacingStoragePathForward(StubCardObjectValid(), StubDeckObjectValid()), KOMCardStorage.KOMCardStorageObjectPath(StubCardObjectValid(), StubDeckObjectValid()).replace('main', 'spacing-forward'));
	});

});

describe('KOMSpacingStoragePathBackward', function test_KOMSpacingStoragePathBackward() {

	it('throws if param1 not valid', function () {
		throws(function () {
			mainModule.KOMSpacingStoragePathBackward({}, StubDeckObjectValid());
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param2 not valid', function () {
		throws(function () {
			mainModule.KOMSpacingStoragePathBackward(StubCardObjectValid(), {});
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function () {
		deepEqual(mainModule.KOMSpacingStoragePathBackward(StubCardObjectValid(), StubDeckObjectValid()), KOMCardStorage.KOMCardStorageObjectPath(StubCardObjectValid(), StubDeckObjectValid()).replace('main', 'spacing-backward'));
	});

});

describe('KOMSpacingStorageMatch', function test_KOMSpacingStorageMatch() {

	it('throws error if not string', function () {
		throws(function () {
			mainModule.KOMSpacingStorageMatch(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns false if KOMDeckStorageObjectPath', function () {
		deepEqual(mainModule.KOMSpacingStorageMatch(KOMDeckStorage.KOMDeckStorageObjectPath('alfa')), false);
	});

	it('returns false if KOMCardStorageObjectPath', function () {
		deepEqual(mainModule.KOMSpacingStorageMatch(KOMCardStorage.KOMCardStorageObjectPath(StubCardObjectValid(), StubDeckObjectValid())), false);
	});

	it('returns false if KOMSettingStorageObjectPath', function () {
		deepEqual(mainModule.KOMSpacingStorageMatch(KOMSettingStorage.KOMSettingStorageObjectPath(StubSettingObjectValid())), false);
	});

	it('returns true if KOMSpacingStoragePathForward', function () {
		deepEqual(mainModule.KOMSpacingStorageMatch(mainModule.KOMSpacingStoragePathForward(StubCardObjectValid(), StubDeckObjectValid())), true);
	});

	it('returns true if KOMSpacingStoragePathBackward', function () {
		deepEqual(mainModule.KOMSpacingStorageMatch(mainModule.KOMSpacingStoragePathBackward(StubCardObjectValid(), StubDeckObjectValid())), true);
	});

	it('returns false', function () {
		deepEqual(mainModule.KOMSpacingStorageMatch(mainModule.KOMSpacingStoragePathBackward(StubCardObjectValid(), StubDeckObjectValid()).slice(0, -1)), false);
	});

});

describe('KOMSpacingStorageWrite', function test_KOMSpacingStorageWrite() {

	it('rejects if param1 not object', async function () {
		await rejects(mainModule.KOMSpacingStorageWrite(KOMTestingStorageClient, null, StubCardObjectValid(), StubDeckObjectValid()), /KOMErrorInputNotValid/);
	});

	it('rejects if param2 not valid', async function () {
		await rejects(mainModule.KOMSpacingStorageWrite(KOMTestingStorageClient, StubSpacingObjectValid(), {}, StubDeckObjectValid()), /KOMErrorInputNotValid/);
	});

	it('rejects if param3 not valid', async function () {
		await rejects(mainModule.KOMSpacingStorageWrite(KOMTestingStorageClient, StubSpacingObjectValid(), StubCardObjectValid(), {}), /KOMErrorInputNotValid/);
	});

	it('returns object with KOMErrors if not valid', async function () {
		deepEqual((await mainModule.KOMSpacingStorageWrite(KOMTestingStorageClient, Object.assign(StubSpacingObjectValid(), {
			KOMSpacingID: null,
		}), StubCardObjectValid(), StubDeckObjectValid())).KOMErrors, {
			KOMSpacingID: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns param1', async function () {
		let item = StubSpacingObjectValid();

		deepEqual(await mainModule.KOMSpacingStorageWrite(KOMTestingStorageClient, item, StubCardObjectValid(), StubDeckObjectValid()) === item, true);
	});

	it('leaves param1 unmodified', async function () {
		deepEqual(await mainModule.KOMSpacingStorageWrite(KOMTestingStorageClient, StubSpacingObjectValid(), StubCardObjectValid(), StubDeckObjectValid()), StubSpacingObjectValid());
	});

	context('relations', function () {

		const memory = Object.assign(StubSpacingObjectValid(), {
			$alfa: 'bravo',
		});
		let outputData, storage;

		before(async function () {
			outputData = await mainModule.KOMSpacingStorageWrite(KOMTestingStorageClient, memory, StubCardObjectValid(), StubDeckObjectValid());
		});

		before(async function () {
			storage = (await mainModule.KOMSpacingStorageList(KOMTestingStorageClient, StubCardObjectValid(), StubDeckObjectValid())).KOMCardSpacingForward;
		});

		it('excludes from storage', function () {
			deepEqual(storage, StubSpacingObjectValid());
		});

		it('includes in outputData', function () {
			deepEqual(outputData, memory);
		});

		it('updates inputData', function () {
			deepEqual(outputData === memory, true);
		});

	});

});

describe('KOMSpacingStorageList', function test_KOMSpacingStorageList() {

	it('rejects if param1 not valid', async function () {
		await rejects(mainModule.KOMSpacingStorageList(KOMTestingStorageClient, {}, StubDeckObjectValid()), /KOMErrorInputNotValid/);
	});

	it('rejects if param2 not valid', async function () {
		await rejects(mainModule.KOMSpacingStorageList(KOMTestingStorageClient, StubCardObjectValid(), {}), /KOMErrorInputNotValid/);
	});

	it('returns object', async function () {
		const item = Object.assign(StubCardObjectValid(), {
			KOMCardID: Date.now().toString(),
		});
		deepEqual(await mainModule.KOMSpacingStorageList(KOMTestingStorageClient, item, StubDeckObjectValid()), {
			KOMCardSpacingForward: Object.assign(StubSpacingObjectValid(), {
				KOMSpacingID: `${ item.KOMCardID }-forward`,
			}),
			KOMCardSpacingBackward: Object.assign(StubSpacingObjectValid(), {
				KOMSpacingID: `${ item.KOMCardID }-backward`,
			}),
		});
	});

	it('returns existing KOMSpacings forward', async function () {
		const item = Object.assign(StubSpacingObjectValid(), {
			KOMSpacingDueDate: new Date(),
		});

		await mainModule.KOMSpacingStorageWrite(KOMTestingStorageClient, item, StubCardObjectValid(), StubDeckObjectValid());

		deepEqual((await mainModule.KOMSpacingStorageList(KOMTestingStorageClient, StubCardObjectValid(), StubDeckObjectValid())).KOMCardSpacingForward, item);
	});

	it('returns existing KOMSpacings backward', async function () {
		const item = Object.assign(StubSpacingObjectValid(), {
			KOMSpacingID: 'alfa-backward',
			KOMSpacingDueDate: new Date(),
		});

		await mainModule.KOMSpacingStorageWrite(KOMTestingStorageClient, item, StubCardObjectValid(), StubDeckObjectValid());

		deepEqual((await mainModule.KOMSpacingStorageList(KOMTestingStorageClient, StubCardObjectValid(), StubDeckObjectValid())).KOMCardSpacingBackward, item);
	});

	it('parses KOMSpacingChronicles dates', async function () {
		const item = Object.assign(StubSpacingObjectValid(), {
			KOMSpacingID: 'alfa-backward',
			KOMSpacingDueDate: new Date(),
			KOMSpacingChronicles: [{
				KOMChronicleDrawDate: new Date('2019-02-23T12:00:00Z'),
				KOMChronicleFlipDate: new Date('2019-02-23T12:00:00Z'),
				KOMChronicleResponseDate: new Date('2019-02-23T12:00:00Z'),
				KOMChronicleResponseType: 'alfa',
			}]
		});

		await mainModule.KOMSpacingStorageWrite(KOMTestingStorageClient, item, StubCardObjectValid(), StubDeckObjectValid());

		deepEqual((await mainModule.KOMSpacingStorageList(KOMTestingStorageClient, StubCardObjectValid(), StubDeckObjectValid())).KOMCardSpacingBackward, item);
	});

});

describe('KOMSpacingStorageDelete', function test_KOMSpacingStorageDelete() {

	it('throws if param1 not valid', function () {
		throws(function () {
			mainModule.KOMSpacingStorageDelete(KOMTestingStorageClient, {}, StubCardObjectValid(), StubDeckObjectValid());
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param2 not valid', function () {
		throws(function () {
			mainModule.KOMSpacingStorageDelete(KOMTestingStorageClient, StubSpacingObjectValid(), {}, StubDeckObjectValid());
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param3 not valid', function () {
		throws(function () {
			mainModule.KOMSpacingStorageDelete(KOMTestingStorageClient, StubSpacingObjectValid(), StubCardObjectValid(), {});
		}, /KOMErrorInputNotValid/);
	});

	it('returns statusCode', async function () {
		deepEqual(await mainModule.KOMSpacingStorageDelete(KOMTestingStorageClient, await mainModule.KOMSpacingStorageWrite(KOMTestingStorageClient, StubSpacingObjectValid(), StubCardObjectValid(), StubDeckObjectValid()), StubCardObjectValid(), StubDeckObjectValid()), {
			statusCode: 200,
		});
	});

	it('deletes KOMCard', async function () {
		const item = Object.assign(StubCardObjectValid(), {
			KOMCardID: Date.now().toString(),
		});

		await mainModule.KOMSpacingStorageDelete(KOMTestingStorageClient, await mainModule.KOMSpacingStorageWrite(KOMTestingStorageClient, StubSpacingObjectValid(), item, StubDeckObjectValid()), item, StubDeckObjectValid());

		deepEqual(await mainModule.KOMSpacingStorageList(KOMTestingStorageClient, item, StubDeckObjectValid()), {
			KOMCardSpacingForward: Object.assign(StubSpacingObjectValid(), {
				KOMSpacingID: `${ item.KOMCardID }-forward`,
			}),
			KOMCardSpacingBackward: Object.assign(StubSpacingObjectValid(), {
				KOMSpacingID: `${ item.KOMCardID }-backward`,
			}),
		});
	});

});
