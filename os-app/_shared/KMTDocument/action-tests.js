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
		await rejects(mainModule.KMTDocumentActionCreate(EMTTestingStorageClient, null), /EMTErrorInputNotValid/);
	});

	it('returns object with EMTErrors if not valid', async function() {
		deepEqual((await mainModule.KMTDocumentActionCreate(EMTTestingStorageClient, Object.assign(kTesting.StubDocumentObject(), {
			KMTDocumentName: null,
		}))).EMTErrors, {
			KMTDocumentName: [
				'EMTErrorNotString',
			],
		});
	});

	it('returns KMTDocument', async function() {
		let item = await mainModule.KMTDocumentActionCreate(EMTTestingStorageClient, kTesting.StubDocumentObject());

		deepEqual(item, Object.assign(kTesting.StubDocumentObject(), {
			KMTDocumentID: item.KMTDocumentID,
			KMTDocumentCreationDate: item.KMTDocumentCreationDate,
			KMTDocumentModificationDate: item.KMTDocumentModificationDate,
			'@context': item['@context'],
		}));
	});

	it('sets KMTDocumentID to unique value', async function() {
		let items = await kTesting.uSerial(Array.from(Array(10)).map(async function (e) {
			return (await mainModule.KMTDocumentActionCreate(EMTTestingStorageClient, kTesting.StubDocumentObject())).KMTDocumentID;
		}));
		deepEqual([...(new Set(items))], items);
	});

	it('sets KMTDocumentCreationDate to now', async function() {
		deepEqual(new Date() - (await mainModule.KMTDocumentActionCreate(EMTTestingStorageClient, kTesting.StubDocumentObject())).KMTDocumentCreationDate < 100, true);
	});

	it('sets KMTDocumentModificationDate to now', async function() {
		deepEqual(new Date() - (await mainModule.KMTDocumentActionCreate(EMTTestingStorageClient, kTesting.StubDocumentObject())).KMTDocumentModificationDate < 100, true);
	});

});

describe('KMTDocumentActionRead', function testKMTDocumentActionRead() {

	it('rejects if not string', async function() {
		await rejects(mainModule.KMTDocumentActionRead(EMTTestingStorageClient, null), /EMTErrorInputNotValid/);
	});

	it('returns null if not found', async function() {
		deepEqual(await mainModule.KMTDocumentActionRead(EMTTestingStorageClient, 'alfa'), null);
	});

	it('returns KMTDocument', async function() {
		let item = await mainModule.KMTDocumentActionCreate(EMTTestingStorageClient, kTesting.StubDocumentObject());

		deepEqual(item, await mainModule.KMTDocumentActionRead(EMTTestingStorageClient, item.KMTDocumentID));
	});

});

describe('KMTDocumentActionUpdate', function testKMTDocumentActionUpdate() {

	it('rejects if not object', async function() {
		await rejects(mainModule.KMTDocumentActionUpdate(EMTTestingStorageClient, null), /EMTErrorInputNotValid/);
	});

	it('returns object with EMTErrors if not valid', async function() {
		deepEqual((await mainModule.KMTDocumentActionUpdate(EMTTestingStorageClient, Object.assign(await mainModule.KMTDocumentActionCreate(EMTTestingStorageClient, kTesting.StubDocumentObject()), {
			KMTDocumentID: null,
		}))).EMTErrors, {
			KMTDocumentID: [
				'EMTErrorNotString',
			],
		});
	});

	it('returns KMTDocument', async function() {
		let itemCreated = await mainModule.KMTDocumentActionCreate(EMTTestingStorageClient, kTesting.StubDocumentObject());

		let item = await mainModule.KMTDocumentActionUpdate(EMTTestingStorageClient, itemCreated);

		deepEqual(item, Object.assign(itemCreated, {
			KMTDocumentModificationDate: item.KMTDocumentModificationDate,
		}));
	});

	it('sets KMTDocumentModificationDate to now', async function() {
		deepEqual(new Date() - (await mainModule.KMTDocumentActionUpdate(EMTTestingStorageClient, await mainModule.KMTDocumentActionCreate(EMTTestingStorageClient, kTesting.StubDocumentObject()))).KMTDocumentModificationDate < 100, true);
	});

	it('writes inputData if not found', async function() {
		let item = await mainModule.KMTDocumentActionUpdate(EMTTestingStorageClient, Object.assign(kTesting.StubDocumentObject(), {
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
		await rejects(mainModule.KMTDocumentActionDelete(EMTTestingStorageClient, null), /EMTErrorInputNotValid/);
	});

	it('returns statusCode', async function() {
		deepEqual(await mainModule.KMTDocumentActionDelete(EMTTestingStorageClient, (await mainModule.KMTDocumentActionCreate(EMTTestingStorageClient, kTesting.StubDocumentObject())).KMTDocumentID), {
			statusCode: 200,
		});
	});

	it('deletes KMTDocument', async function() {
		let itemID;
		await mainModule.KMTDocumentActionDelete(EMTTestingStorageClient, itemID = (await mainModule.KMTDocumentActionCreate(EMTTestingStorageClient, kTesting.StubDocumentObject())).KMTDocumentID);
		deepEqual(await mainModule.KMTDocumentActionRead(EMTTestingStorageClient, itemID), null);
	});

});

describe('KMTDocumentActionList', function testKMTDocumentActionList() {

	it('returns array', async function() {
		deepEqual(await mainModule.KMTDocumentActionList(EMTTestingStorageClient), []);
	});

	it('returns array with existing KMTDocuments', async function() {
		let item = await mainModule.KMTDocumentActionCreate(EMTTestingStorageClient, kTesting.StubDocumentObject());

		deepEqual(await mainModule.KMTDocumentActionList(EMTTestingStorageClient), [item]);
	});

});
