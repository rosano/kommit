const { rejects, deepEqual } = require('assert');

const mainModule = require('./action.js').default;

const kTesting = {
	StubDocumentObject: function() {
		return {
			KOMCardQuestion: 'alfa',
			KOMCardAnswer: 'bravo',
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

describe('KOMCardActionCreate', function testKOMCardActionCreate() {

	it('rejects if not object', async function() {
		await rejects(mainModule.KOMCardActionCreate(KOMTestingStorageClient, null), /KOMErrorInputNotValid/);
	});

	it('returns object with KOMErrors if not valid', async function() {
		deepEqual((await mainModule.KOMCardActionCreate(KOMTestingStorageClient, Object.assign(kTesting.StubDocumentObject(), {
			KOMCardQuestion: null,
		}))).KOMErrors, {
			KOMCardQuestion: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns KOMCard', async function() {
		let item = await mainModule.KOMCardActionCreate(KOMTestingStorageClient, kTesting.StubDocumentObject());

		deepEqual(item, Object.assign(kTesting.StubDocumentObject(), {
			KOMCardID: item.KOMCardID,
			KOMCardCreationDate: item.KOMCardCreationDate,
			KOMCardModificationDate: item.KOMCardModificationDate,
			'@context': item['@context'],
		}));
	});

	it('sets KOMCardID to unique value', async function() {
		let items = await kTesting.uSerial(Array.from(Array(10)).map(async function (e) {
			return (await mainModule.KOMCardActionCreate(KOMTestingStorageClient, kTesting.StubDocumentObject())).KOMCardID;
		}));
		deepEqual([...(new Set(items))], items);
	});

	it('sets KOMCardCreationDate to now', async function() {
		deepEqual(new Date() - (await mainModule.KOMCardActionCreate(KOMTestingStorageClient, kTesting.StubDocumentObject())).KOMCardCreationDate < 100, true);
	});

	it('sets KOMCardModificationDate to now', async function() {
		deepEqual(new Date() - (await mainModule.KOMCardActionCreate(KOMTestingStorageClient, kTesting.StubDocumentObject())).KOMCardModificationDate < 100, true);
	});

});

describe('KOMCardActionRead', function testKOMCardActionRead() {

	it('rejects if not string', async function() {
		await rejects(mainModule.KOMCardActionRead(KOMTestingStorageClient, null), /KOMErrorInputNotValid/);
	});

	it('returns null if not found', async function() {
		deepEqual(await mainModule.KOMCardActionRead(KOMTestingStorageClient, 'alfa'), null);
	});

	it('returns KOMCard', async function() {
		let item = await mainModule.KOMCardActionCreate(KOMTestingStorageClient, kTesting.StubDocumentObject());

		deepEqual(item, await mainModule.KOMCardActionRead(KOMTestingStorageClient, item.KOMCardID));
	});

});

describe('KOMCardActionUpdate', function testKOMCardActionUpdate() {

	it('rejects if not object', async function() {
		await rejects(mainModule.KOMCardActionUpdate(KOMTestingStorageClient, null), /KOMErrorInputNotValid/);
	});

	it('returns object with KOMErrors if not valid', async function() {
		deepEqual((await mainModule.KOMCardActionUpdate(KOMTestingStorageClient, Object.assign(await mainModule.KOMCardActionCreate(KOMTestingStorageClient, kTesting.StubDocumentObject()), {
			KOMCardID: null,
		}))).KOMErrors, {
			KOMCardID: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns KOMCard', async function() {
		let itemCreated = await mainModule.KOMCardActionCreate(KOMTestingStorageClient, kTesting.StubDocumentObject());

		let item = await mainModule.KOMCardActionUpdate(KOMTestingStorageClient, itemCreated);

		deepEqual(item, Object.assign(itemCreated, {
			KOMCardModificationDate: item.KOMCardModificationDate,
		}));
	});

	it('sets KOMCardModificationDate to now', async function() {
		deepEqual(new Date() - (await mainModule.KOMCardActionUpdate(KOMTestingStorageClient, await mainModule.KOMCardActionCreate(KOMTestingStorageClient, kTesting.StubDocumentObject()))).KOMCardModificationDate < 100, true);
	});

	it('writes inputData if not found', async function() {
		let item = await mainModule.KOMCardActionUpdate(KOMTestingStorageClient, Object.assign(kTesting.StubDocumentObject(), {
			KOMCardID: 'alfa',
			KOMCardCreationDate: new Date(),
		}));
		deepEqual(item, Object.assign(kTesting.StubDocumentObject(), {
			KOMCardID: item.KOMCardID,
			KOMCardCreationDate: item.KOMCardCreationDate,
			KOMCardModificationDate: item.KOMCardModificationDate,
			'@context': item['@context'],
		}));
	});

});

describe('KOMCardActionDelete', function testKOMCardActionDelete() {

	it('rejects if not string', async function() {
		await rejects(mainModule.KOMCardActionDelete(KOMTestingStorageClient, null), /KOMErrorInputNotValid/);
	});

	it('returns statusCode', async function() {
		deepEqual(await mainModule.KOMCardActionDelete(KOMTestingStorageClient, (await mainModule.KOMCardActionCreate(KOMTestingStorageClient, kTesting.StubDocumentObject())).KOMCardID), {
			statusCode: 200,
		});
	});

	it('deletes KOMCard', async function() {
		let itemID;
		await mainModule.KOMCardActionDelete(KOMTestingStorageClient, itemID = (await mainModule.KOMCardActionCreate(KOMTestingStorageClient, kTesting.StubDocumentObject())).KOMCardID);
		deepEqual(await mainModule.KOMCardActionRead(KOMTestingStorageClient, itemID), null);
	});

});

describe('KOMCardActionList', function testKOMCardActionList() {

	it('returns array', async function() {
		deepEqual(await mainModule.KOMCardActionList(KOMTestingStorageClient), []);
	});

	it('returns array with existing KOMCards', async function() {
		let item = await mainModule.KOMCardActionCreate(KOMTestingStorageClient, kTesting.StubDocumentObject());

		deepEqual(await mainModule.KOMCardActionList(KOMTestingStorageClient), [item]);
	});

});
