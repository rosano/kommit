const { rejects, deepEqual } = require('assert');

const mainModule = require('./action.js').default;

const kTesting = {
	StubDeckObject() {
		return {
			KOMDeckName: 'alfa',
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

describe('KOMDeckActionCreate', function test_KOMDeckActionCreate() {

	it('rejects if not object', async function() {
		await rejects(mainModule.KOMDeckActionCreate(KOMTestingStorageClient, null), /KOMErrorInputNotValid/);
	});

	it('returns object with KOMErrors if not valid', async function() {
		deepEqual((await mainModule.KOMDeckActionCreate(KOMTestingStorageClient, Object.assign(kTesting.StubDeckObject(), {
			KOMDeckName: null,
		}))).KOMErrors, {
			KOMDeckName: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns KOMDeck', async function() {
		let item = await mainModule.KOMDeckActionCreate(KOMTestingStorageClient, kTesting.StubDeckObject());

		deepEqual(item, Object.assign(kTesting.StubDeckObject(), {
			KOMDeckID: item.KOMDeckID,
			KOMDeckCreationDate: item.KOMDeckCreationDate,
			KOMDeckModificationDate: item.KOMDeckModificationDate,
			'@context': item['@context'],
		}));
	});

	it('sets KOMDeckID to unique value', async function() {
		let items = await kTesting.uSerial(Array.from(Array(10)).map(async function (e) {
			return (await mainModule.KOMDeckActionCreate(KOMTestingStorageClient, kTesting.StubDeckObject())).KOMDeckID;
		}));
		deepEqual([...(new Set(items))], items);
	});

	it('sets KOMDeckCreationDate to now', async function() {
		deepEqual(new Date() - (await mainModule.KOMDeckActionCreate(KOMTestingStorageClient, kTesting.StubDeckObject())).KOMDeckCreationDate < 100, true);
	});

	it('sets KOMDeckModificationDate to now', async function() {
		deepEqual(new Date() - (await mainModule.KOMDeckActionCreate(KOMTestingStorageClient, kTesting.StubDeckObject())).KOMDeckModificationDate < 100, true);
	});

});

describe('KOMDeckActionRead', function test_KOMDeckActionRead() {

	it('rejects if not string', async function() {
		await rejects(mainModule.KOMDeckActionRead(KOMTestingStorageClient, null), /KOMErrorInputNotValid/);
	});

	it('returns null if not found', async function() {
		deepEqual(await mainModule.KOMDeckActionRead(KOMTestingStorageClient, 'alfa'), null);
	});

	it('returns KOMDeck', async function() {
		let item = await mainModule.KOMDeckActionCreate(KOMTestingStorageClient, kTesting.StubDeckObject());

		deepEqual(item, await mainModule.KOMDeckActionRead(KOMTestingStorageClient, item.KOMDeckID));
	});

});

describe('KOMDeckActionUpdate', function test_KOMDeckActionUpdate() {

	it('rejects if not object', async function() {
		await rejects(mainModule.KOMDeckActionUpdate(KOMTestingStorageClient, null), /KOMErrorInputNotValid/);
	});

	it('returns object with KOMErrors if not valid', async function() {
		deepEqual((await mainModule.KOMDeckActionUpdate(KOMTestingStorageClient, Object.assign(await mainModule.KOMDeckActionCreate(KOMTestingStorageClient, kTesting.StubDeckObject()), {
			KOMDeckID: null,
		}))).KOMErrors, {
			KOMDeckID: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns KOMDeck', async function() {
		let itemCreated = await mainModule.KOMDeckActionCreate(KOMTestingStorageClient, kTesting.StubDeckObject());

		let item = await mainModule.KOMDeckActionUpdate(KOMTestingStorageClient, itemCreated);

		deepEqual(item, Object.assign(itemCreated, {
			KOMDeckModificationDate: item.KOMDeckModificationDate,
		}));
	});

	it('sets KOMDeckModificationDate to now', async function() {
		deepEqual(new Date() - (await mainModule.KOMDeckActionUpdate(KOMTestingStorageClient, await mainModule.KOMDeckActionCreate(KOMTestingStorageClient, kTesting.StubDeckObject()))).KOMDeckModificationDate < 100, true);
	});

	it('writes inputData if not found', async function() {
		let item = await mainModule.KOMDeckActionUpdate(KOMTestingStorageClient, Object.assign(kTesting.StubDeckObject(), {
			KOMDeckID: 'alfa',
			KOMDeckCreationDate: new Date(),
		}));
		deepEqual(item, Object.assign(kTesting.StubDeckObject(), {
			KOMDeckID: item.KOMDeckID,
			KOMDeckCreationDate: item.KOMDeckCreationDate,
			KOMDeckModificationDate: item.KOMDeckModificationDate,
			'@context': item['@context'],
		}));
	});

});

describe('KOMDeckActionDelete', function test_KOMDeckActionDelete() {

	it('rejects if not string', async function() {
		await rejects(mainModule.KOMDeckActionDelete(KOMTestingStorageClient, null), /KOMErrorInputNotValid/);
	});

	it('returns statusCode', async function() {
		deepEqual(await mainModule.KOMDeckActionDelete(KOMTestingStorageClient, (await mainModule.KOMDeckActionCreate(KOMTestingStorageClient, kTesting.StubDeckObject())).KOMDeckID), {
			statusCode: 200,
		});
	});

	it('deletes KOMDeck', async function() {
		let itemID;
		await mainModule.KOMDeckActionDelete(KOMTestingStorageClient, itemID = (await mainModule.KOMDeckActionCreate(KOMTestingStorageClient, kTesting.StubDeckObject())).KOMDeckID);
		deepEqual(await mainModule.KOMDeckActionRead(KOMTestingStorageClient, itemID), null);
	});

});

describe('KOMDeckActionList', function test_KOMDeckActionList() {

	it('returns array', async function() {
		deepEqual(await mainModule.KOMDeckActionList(KOMTestingStorageClient), []);
	});

	it('returns array with existing KOMDecks', async function() {
		let item = await mainModule.KOMDeckActionCreate(KOMTestingStorageClient, kTesting.StubDeckObject());

		deepEqual(await mainModule.KOMDeckActionList(KOMTestingStorageClient), [item]);
	});

});
