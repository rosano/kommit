const { rejects, deepEqual } = require('assert');

const mainModule = require('./action.js');

const kTesting = {
	StubDocumentObject: function() {
		return {
			KMTDocumentName: 'alfa',
		};
	},
	uSerial: function (inputData) {
		return inputData.reduce(async function (coll, e) {
			return e.then(Array.prototype.concat.bind(await coll));
		}, Promise.resolve([]));
	},
	uSleep: function (inputData) {
		let endTime = new Date().getTime();
		while (new Date().getTime() < endTime + inputData) {}
	},
};

describe('KMTDocumentActionCreate', function testKMTDocumentActionCreate() {

	it('rejects if not object', async function() {
		await rejects(mainModule.KMTDocumentActionCreate(KMTTestingStorageClient, null), /KMTErrorInputNotValid/);
	});

	it('returns object with KMTErrors if not valid', async function() {
		deepEqual((await mainModule.KMTDocumentActionCreate(KMTTestingStorageClient, Object.assign(kTesting.StubDocumentObject(), {
			KMTDocumentName: null,
		}))).KMTErrors, {
			KMTDocumentName: [
				'KMTErrorNotString',
			],
		});
	});

	it('returns KMTDocument', async function() {
		let item = await mainModule.KMTDocumentActionCreate(KMTTestingStorageClient, kTesting.StubDocumentObject());

		deepEqual(item, Object.assign(kTesting.StubDocumentObject(), {
			KMTDocumentID: item.KMTDocumentID,
			KMTDocumentCreationDate: item.KMTDocumentCreationDate,
			KMTDocumentModificationDate: item.KMTDocumentModificationDate,
			'@context': item['@context'],
		}));
	});

	it('sets KMTDocumentID to unique value', async function() {
		let items = await kTesting.uSerial(Array.from(Array(10)).map(async function (e) {
			return (await mainModule.KMTDocumentActionCreate(KMTTestingStorageClient, kTesting.StubDocumentObject())).KMTDocumentID;
		}));
		deepEqual([...(new Set(items))], items);
	});

	it('sets KMTDocumentCreationDate to now', async function() {
		deepEqual(new Date() - (await mainModule.KMTDocumentActionCreate(KMTTestingStorageClient, kTesting.StubDocumentObject())).KMTDocumentCreationDate < 100, true);
	});

	it('sets KMTDocumentModificationDate to now', async function() {
		deepEqual(new Date() - (await mainModule.KMTDocumentActionCreate(KMTTestingStorageClient, kTesting.StubDocumentObject())).KMTDocumentModificationDate < 100, true);
	});

});

describe('KMTDocumentActionRead', function testKMTDocumentActionRead() {

	it('rejects if not string', async function() {
		await rejects(mainModule.KMTDocumentActionRead(KMTTestingStorageClient, null), /KMTErrorInputNotValid/);
	});

	it('returns null if not found', async function() {
		deepEqual(await mainModule.KMTDocumentActionRead(KMTTestingStorageClient, 'alfa'), null);
	});

	it('returns KMTDocument', async function() {
		let item = await mainModule.KMTDocumentActionCreate(KMTTestingStorageClient, kTesting.StubDocumentObject());

		deepEqual(item, await mainModule.KMTDocumentActionRead(KMTTestingStorageClient, item.KMTDocumentID));
	});

});

describe('KMTDocumentActionUpdate', function testKMTDocumentActionUpdate() {

	it('rejects if not object', async function() {
		await rejects(mainModule.KMTDocumentActionUpdate(KMTTestingStorageClient, null), /KMTErrorInputNotValid/);
	});

	it('returns object with KMTErrors if not valid', async function() {
		deepEqual((await mainModule.KMTDocumentActionUpdate(KMTTestingStorageClient, Object.assign(await mainModule.KMTDocumentActionCreate(KMTTestingStorageClient, kTesting.StubDocumentObject()), {
			KMTDocumentID: null,
		}))).KMTErrors, {
			KMTDocumentID: [
				'KMTErrorNotString',
			],
		});
	});

	it('returns KMTDocument', async function() {
		let itemCreated = await mainModule.KMTDocumentActionCreate(KMTTestingStorageClient, kTesting.StubDocumentObject());

		let item = await mainModule.KMTDocumentActionUpdate(KMTTestingStorageClient, itemCreated);

		deepEqual(item, Object.assign(itemCreated, {
			KMTDocumentModificationDate: item.KMTDocumentModificationDate,
		}));
	});

	it('sets KMTDocumentModificationDate to now', async function() {
		deepEqual(new Date() - (await mainModule.KMTDocumentActionUpdate(KMTTestingStorageClient, await mainModule.KMTDocumentActionCreate(KMTTestingStorageClient, kTesting.StubDocumentObject()))).KMTDocumentModificationDate < 100, true);
	});

	it('writes inputData if not found', async function() {
		let item = await mainModule.KMTDocumentActionUpdate(KMTTestingStorageClient, Object.assign(kTesting.StubDocumentObject(), {
			KMTDocumentID: 'alfa',
			KMTDocumentCreationDate: new Date(),
		}));
		deepEqual(item, Object.assign(kTesting.StubDocumentObject(), {
			KMTDocumentID: item.KMTDocumentID,
			KMTDocumentCreationDate: item.KMTDocumentCreationDate,
			KMTDocumentModificationDate: item.KMTDocumentModificationDate,
			'@context': item['@context'],
		}));
	});

});

describe('KMTDocumentActionDelete', function testKMTDocumentActionDelete() {

	it('rejects if not string', async function() {
		await rejects(mainModule.KMTDocumentActionDelete(KMTTestingStorageClient, null), /KMTErrorInputNotValid/);
	});

	it('returns statusCode', async function() {
		deepEqual(await mainModule.KMTDocumentActionDelete(KMTTestingStorageClient, (await mainModule.KMTDocumentActionCreate(KMTTestingStorageClient, kTesting.StubDocumentObject())).KMTDocumentID), {
			statusCode: 200,
		});
	});

	it('deletes KMTDocument', async function() {
		let itemID;
		await mainModule.KMTDocumentActionDelete(KMTTestingStorageClient, itemID = (await mainModule.KMTDocumentActionCreate(KMTTestingStorageClient, kTesting.StubDocumentObject())).KMTDocumentID);
		deepEqual(await mainModule.KMTDocumentActionRead(KMTTestingStorageClient, itemID), null);
	});

});

describe('KMTDocumentActionList', function testKMTDocumentActionList() {

	it('returns array', async function() {
		deepEqual(await mainModule.KMTDocumentActionList(KMTTestingStorageClient), []);
	});

	it('returns array with existing KMTDocuments', async function() {
		let item = await mainModule.KMTDocumentActionCreate(KMTTestingStorageClient, kTesting.StubDocumentObject());

		deepEqual(await mainModule.KMTDocumentActionList(KMTTestingStorageClient), [item]);
	});

});
