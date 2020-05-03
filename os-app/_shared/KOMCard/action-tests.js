const { rejects, deepEqual } = require('assert');

const mainModule = require('./action.js').default;
const KOMSpacingMetal = require('../KOMSpacing/metal.js').default;

const kTesting = {
	StubDeckObjectValid() {
		return {
			KOMDeckID: 'alfa',
			KOMDeckName: '',
			KOMDeckCreationDate: new Date('2019-02-23T13:56:36Z'),
			KOMDeckModificationDate: new Date('2019-02-23T13:56:36Z'),
		};
	},
	StubCardObject() {
		return {
			KOMCardQuestion: 'bravo',
			KOMCardAnswer: 'charlie',
		};
	},
	uSerial (inputData) {
		return inputData.reduce(async function (coll, e) {
			return e.then(Array.prototype.concat.bind(await coll));
		}, Promise.resolve([]));
	},
	uSleep (inputData) {
		let endTime = new Date().getTime();
		while (new Date().getTime() < endTime + inputData) {}
	},
};

describe('KOMCardActionCreate', function test_KOMCardActionCreate() {

	it('rejects if param1 not object', async function() {
		await rejects(mainModule.KOMCardActionCreate(KOMTestingStorageClient, null, kTesting.StubDeckObjectValid()), /KOMErrorInputNotValid/);
	});

	it('rejects if param2 not valid', async function() {
		await rejects(mainModule.KOMCardActionCreate(KOMTestingStorageClient, kTesting.StubCardObject(), {}), /KOMErrorInputNotValid/);
	});

	it('returns object with KOMErrors if param1 not valid', async function() {
		deepEqual((await mainModule.KOMCardActionCreate(KOMTestingStorageClient, Object.assign(kTesting.StubCardObject(), {
			KOMCardQuestion: null,
		}), kTesting.StubDeckObjectValid())).KOMErrors, {
			KOMCardQuestion: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns KOMCard', async function() {
		let item = await mainModule.KOMCardActionCreate(KOMTestingStorageClient, kTesting.StubCardObject(), kTesting.StubDeckObjectValid());

		deepEqual(item, Object.assign(kTesting.StubCardObject(), {
			KOMCardID: item.KOMCardID,
			KOMCardCreationDate: item.KOMCardCreationDate,
			KOMCardModificationDate: item.KOMCardModificationDate,
			'@context': item['@context'],
		}));
	});

	it('sets KOMCardID to unique value', async function() {
		let items = await kTesting.uSerial(Array.from(Array(10)).map(async function (e) {
			return (await mainModule.KOMCardActionCreate(KOMTestingStorageClient, kTesting.StubCardObject(), kTesting.StubDeckObjectValid())).KOMCardID;
		}));
		deepEqual([...(new Set(items))], items);
	});

	it('sets KOMCardCreationDate to now', async function() {
		deepEqual(new Date() - (await mainModule.KOMCardActionCreate(KOMTestingStorageClient, kTesting.StubCardObject(), kTesting.StubDeckObjectValid())).KOMCardCreationDate < 100, true);
	});

	it('sets KOMCardModificationDate to now', async function() {
		deepEqual(new Date() - (await mainModule.KOMCardActionCreate(KOMTestingStorageClient, kTesting.StubCardObject(), kTesting.StubDeckObjectValid())).KOMCardModificationDate < 100, true);
	});

});

describe('KOMCardActionUpdate', function test_KOMCardActionUpdate() {

	it('rejects if param1 not object', async function() {
		await rejects(mainModule.KOMCardActionUpdate(KOMTestingStorageClient, null, kTesting.StubDeckObjectValid()), /KOMErrorInputNotValid/);
	});

	it('rejects if param2 not valid', async function() {
		await rejects(mainModule.KOMCardActionCreate(KOMTestingStorageClient, kTesting.StubCardObject(), {}), /KOMErrorInputNotValid/);
	});

	it('returns object with KOMErrors if param1 not valid', async function() {
		deepEqual((await mainModule.KOMCardActionUpdate(KOMTestingStorageClient, Object.assign(await mainModule.KOMCardActionCreate(KOMTestingStorageClient, kTesting.StubCardObject(), kTesting.StubDeckObjectValid()), {
			KOMCardID: null,
		}), kTesting.StubDeckObjectValid())).KOMErrors, {
			KOMCardID: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns KOMCard', async function() {
		let itemCreated = await mainModule.KOMCardActionCreate(KOMTestingStorageClient, kTesting.StubCardObject(), kTesting.StubDeckObjectValid());

		let item = await mainModule.KOMCardActionUpdate(KOMTestingStorageClient, itemCreated, kTesting.StubDeckObjectValid());

		deepEqual(item, Object.assign(itemCreated, {
			KOMCardModificationDate: item.KOMCardModificationDate,
		}));
	});

	it('sets KOMCardModificationDate to now', async function() {
		deepEqual(new Date() - (await mainModule.KOMCardActionUpdate(KOMTestingStorageClient, await mainModule.KOMCardActionCreate(KOMTestingStorageClient, kTesting.StubCardObject(), kTesting.StubDeckObjectValid()), kTesting.StubDeckObjectValid())).KOMCardModificationDate < 100, true);
	});

	it('writes inputData if not found', async function() {
		let item = await mainModule.KOMCardActionUpdate(KOMTestingStorageClient, Object.assign(kTesting.StubCardObject(), {
			KOMCardID: 'alfa',
			KOMCardCreationDate: new Date(),
		}), kTesting.StubDeckObjectValid());
		deepEqual(item, Object.assign(kTesting.StubCardObject(), {
			KOMCardID: item.KOMCardID,
			KOMCardCreationDate: item.KOMCardCreationDate,
			KOMCardModificationDate: item.KOMCardModificationDate,
			'@context': item['@context'],
		}));
	});

});

describe('KOMCardActionDelete', function test_KOMCardActionDelete() {

	it('rejects if param1 not valid', async function() {
		await rejects(mainModule.KOMCardActionDelete(KOMTestingStorageClient, {}, kTesting.StubDeckObjectValid()), /KOMErrorInputNotValid/);
	});

	it('rejects if param2 not valid', async function() {
		await rejects(mainModule.KOMCardActionDelete(KOMTestingStorageClient, kTesting.StubCardObject(), {}), /KOMErrorInputNotValid/);
	});

	it('returns statusCode', async function() {
		deepEqual(await mainModule.KOMCardActionDelete(KOMTestingStorageClient, await mainModule.KOMCardActionCreate(KOMTestingStorageClient, kTesting.StubCardObject(), kTesting.StubDeckObjectValid()), kTesting.StubDeckObjectValid()), {
			statusCode: 200,
		});
	});

	it('deletes KOMCard', async function() {
		await mainModule.KOMCardActionDelete(KOMTestingStorageClient, await mainModule.KOMCardActionCreate(KOMTestingStorageClient, kTesting.StubCardObject(), kTesting.StubDeckObjectValid()), kTesting.StubDeckObjectValid());
		deepEqual(await mainModule.KOMCardActionList(KOMTestingStorageClient, kTesting.StubDeckObjectValid()), []);
	});

	it('deletes KOMSpacings', async function() {
		const item = await mainModule.KOMCardActionCreate(KOMTestingStorageClient, kTesting.StubCardObject(), kTesting.StubDeckObjectValid());
		
		await KOMSpacingMetal.KOMSpacingMetalWrite(KOMTestingStorageClient, {
			KOMSpacingID: `${ item.KOMCardID }-forward`,
			KOMSpacingDueDate: new Date(),
		}, item, kTesting.StubDeckObjectValid());

		await mainModule.KOMCardActionDelete(KOMTestingStorageClient, item, kTesting.StubDeckObjectValid());
		deepEqual(await KOMSpacingMetal.KOMSpacingMetalList(KOMTestingStorageClient, item, kTesting.StubDeckObjectValid()), {
			forward: {
				KOMSpacingID: `${ item.KOMCardID }-forward`,
			},
			backward: {
				KOMSpacingID: `${ item.KOMCardID }-backward`,
			},
		});
	});

});

describe('KOMCardActionList', function test_KOMCardActionList() {

	it('returns array', async function() {
		deepEqual(await mainModule.KOMCardActionList(KOMTestingStorageClient, kTesting.StubDeckObjectValid()), []);
	});

	it('returns array with existing KOMCards', async function() {
		let item = await mainModule.KOMCardActionCreate(KOMTestingStorageClient, kTesting.StubCardObject(), kTesting.StubDeckObjectValid());

		deepEqual(await mainModule.KOMCardActionList(KOMTestingStorageClient, kTesting.StubDeckObjectValid()), [item]);
	});

});
