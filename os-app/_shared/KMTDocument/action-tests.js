const { rejects, deepEqual } = require('assert');

const mainModule = require('./action.js');

const kTesting = {
	StubDocumentObject: function() {
		return {
			KOMDocumentName: 'alfa',
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

describe('KOMDocumentActionCreate', function testKOMDocumentActionCreate() {

	it('rejects if not object', async function() {
		await rejects(mainModule.KOMDocumentActionCreate(KOMTestingStorageClient, null), /KOMErrorInputNotValid/);
	});

	it('returns object with KOMErrors if not valid', async function() {
		deepEqual((await mainModule.KOMDocumentActionCreate(KOMTestingStorageClient, Object.assign(kTesting.StubDocumentObject(), {
			KOMDocumentName: null,
		}))).KOMErrors, {
			KOMDocumentName: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns KOMDocument', async function() {
		let item = await mainModule.KOMDocumentActionCreate(KOMTestingStorageClient, kTesting.StubDocumentObject());

		deepEqual(item, Object.assign(kTesting.StubDocumentObject(), {
			KOMDocumentID: item.KOMDocumentID,
			KOMDocumentCreationDate: item.KOMDocumentCreationDate,
			KOMDocumentModificationDate: item.KOMDocumentModificationDate,
			'@context': item['@context'],
		}));
	});

	it('sets KOMDocumentID to unique value', async function() {
		let items = await kTesting.uSerial(Array.from(Array(10)).map(async function (e) {
			return (await mainModule.KOMDocumentActionCreate(KOMTestingStorageClient, kTesting.StubDocumentObject())).KOMDocumentID;
		}));
		deepEqual([...(new Set(items))], items);
	});

	it('sets KOMDocumentCreationDate to now', async function() {
		deepEqual(new Date() - (await mainModule.KOMDocumentActionCreate(KOMTestingStorageClient, kTesting.StubDocumentObject())).KOMDocumentCreationDate < 100, true);
	});

	it('sets KOMDocumentModificationDate to now', async function() {
		deepEqual(new Date() - (await mainModule.KOMDocumentActionCreate(KOMTestingStorageClient, kTesting.StubDocumentObject())).KOMDocumentModificationDate < 100, true);
	});

});

describe('KOMDocumentActionRead', function testKOMDocumentActionRead() {

	it('rejects if not string', async function() {
		await rejects(mainModule.KOMDocumentActionRead(KOMTestingStorageClient, null), /KOMErrorInputNotValid/);
	});

	it('returns null if not found', async function() {
		deepEqual(await mainModule.KOMDocumentActionRead(KOMTestingStorageClient, 'alfa'), null);
	});

	it('returns KOMDocument', async function() {
		let item = await mainModule.KOMDocumentActionCreate(KOMTestingStorageClient, kTesting.StubDocumentObject());

		deepEqual(item, await mainModule.KOMDocumentActionRead(KOMTestingStorageClient, item.KOMDocumentID));
	});

});

describe('KOMDocumentActionUpdate', function testKOMDocumentActionUpdate() {

	it('rejects if not object', async function() {
		await rejects(mainModule.KOMDocumentActionUpdate(KOMTestingStorageClient, null), /KOMErrorInputNotValid/);
	});

	it('returns object with KOMErrors if not valid', async function() {
		deepEqual((await mainModule.KOMDocumentActionUpdate(KOMTestingStorageClient, Object.assign(await mainModule.KOMDocumentActionCreate(KOMTestingStorageClient, kTesting.StubDocumentObject()), {
			KOMDocumentID: null,
		}))).KOMErrors, {
			KOMDocumentID: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns KOMDocument', async function() {
		let itemCreated = await mainModule.KOMDocumentActionCreate(KOMTestingStorageClient, kTesting.StubDocumentObject());

		let item = await mainModule.KOMDocumentActionUpdate(KOMTestingStorageClient, itemCreated);

		deepEqual(item, Object.assign(itemCreated, {
			KOMDocumentModificationDate: item.KOMDocumentModificationDate,
		}));
	});

	it('sets KOMDocumentModificationDate to now', async function() {
		deepEqual(new Date() - (await mainModule.KOMDocumentActionUpdate(KOMTestingStorageClient, await mainModule.KOMDocumentActionCreate(KOMTestingStorageClient, kTesting.StubDocumentObject()))).KOMDocumentModificationDate < 100, true);
	});

	it('writes inputData if not found', async function() {
		let item = await mainModule.KOMDocumentActionUpdate(KOMTestingStorageClient, Object.assign(kTesting.StubDocumentObject(), {
			KOMDocumentID: 'alfa',
			KOMDocumentCreationDate: new Date(),
		}));
		deepEqual(item, Object.assign(kTesting.StubDocumentObject(), {
			KOMDocumentID: item.KOMDocumentID,
			KOMDocumentCreationDate: item.KOMDocumentCreationDate,
			KOMDocumentModificationDate: item.KOMDocumentModificationDate,
			'@context': item['@context'],
		}));
	});

});

describe('KOMDocumentActionDelete', function testKOMDocumentActionDelete() {

	it('rejects if not string', async function() {
		await rejects(mainModule.KOMDocumentActionDelete(KOMTestingStorageClient, null), /KOMErrorInputNotValid/);
	});

	it('returns statusCode', async function() {
		deepEqual(await mainModule.KOMDocumentActionDelete(KOMTestingStorageClient, (await mainModule.KOMDocumentActionCreate(KOMTestingStorageClient, kTesting.StubDocumentObject())).KOMDocumentID), {
			statusCode: 200,
		});
	});

	it('deletes KOMDocument', async function() {
		let itemID;
		await mainModule.KOMDocumentActionDelete(KOMTestingStorageClient, itemID = (await mainModule.KOMDocumentActionCreate(KOMTestingStorageClient, kTesting.StubDocumentObject())).KOMDocumentID);
		deepEqual(await mainModule.KOMDocumentActionRead(KOMTestingStorageClient, itemID), null);
	});

});

describe('KOMDocumentActionList', function testKOMDocumentActionList() {

	it('returns array', async function() {
		deepEqual(await mainModule.KOMDocumentActionList(KOMTestingStorageClient), []);
	});

	it('returns array with existing KOMDocuments', async function() {
		let item = await mainModule.KOMDocumentActionCreate(KOMTestingStorageClient, kTesting.StubDocumentObject());

		deepEqual(await mainModule.KOMDocumentActionList(KOMTestingStorageClient), [item]);
	});

});
