const { rejects, deepEqual } = require('assert');

const mainModule = require('./metal.js');

const kTesting = {
	StubDocumentObjectValid: function() {
		return {
			KMTDocumentID: 'alfa',
			KMTDocumentName: 'bravo',
			KMTDocumentCreationDate: new Date('2019-02-23T13:56:36Z'),
			KMTDocumentModificationDate: new Date('2019-02-23T13:56:36Z'),
		};
	},
};

describe('KMTDocumentMetalWrite', function testKMTDocumentMetalWrite() {

	it('rejects if not object', async function() {
		await rejects(mainModule.KMTDocumentMetalWrite(EMTTestingStorageClient, null), /EMTErrorInputNotValid/);
	});

	it('returns object with EMTErrors if not valid', async function() {
		deepEqual((await mainModule.KMTDocumentMetalWrite(EMTTestingStorageClient, Object.assign(kTesting.StubDocumentObjectValid(), {
			KMTDocumentID: null,
		}))).EMTErrors, {
			KMTDocumentID: [
				'EMTErrorNotString',
			],
		});
	});

	it('returns KMTDocument', async function() {
		let item = await mainModule.KMTDocumentMetalWrite(EMTTestingStorageClient, kTesting.StubDocumentObjectValid());

		deepEqual(item, Object.assign(kTesting.StubDocumentObjectValid(), {
			'@context': item['@context'],
		}));
	});

});

describe('KMTDocumentMetalRead', function testKMTDocumentMetalRead() {

	it('rejects if not string', async function() {
		await rejects(mainModule.KMTDocumentMetalRead(EMTTestingStorageClient, 1), /EMTErrorInputNotValid/);
	});

	it('returns null if not found', async function() {
		deepEqual(await mainModule.KMTDocumentMetalRead(EMTTestingStorageClient, 'alfa'), null);
	});

	it('returns KMTDocument', async function() {
		let item = await mainModule.KMTDocumentMetalWrite(EMTTestingStorageClient, kTesting.StubDocumentObjectValid());

		deepEqual(await mainModule.KMTDocumentMetalRead(EMTTestingStorageClient, item.KMTDocumentID), item);
	});

});

describe('KMTDocumentMetalList', function testKMTDocumentMetalList() {

	it('returns empty array if none', async function() {
		deepEqual(await mainModule.KMTDocumentMetalList(EMTTestingStorageClient), {});
	});

	it('returns existing KMTDocuments', async function() {
		let item = await mainModule.KMTDocumentMetalWrite(EMTTestingStorageClient, kTesting.StubDocumentObjectValid());
		deepEqual(Object.values(await mainModule.KMTDocumentMetalList(EMTTestingStorageClient)), [item]);
		deepEqual(Object.keys(await mainModule.KMTDocumentMetalList(EMTTestingStorageClient)), [item.KMTDocumentID]);
	});

});

describe('KMTDocumentMetalDelete', function testKMTDocumentMetalDelete() {

	it('rejects if not string', async function() {
		await rejects(mainModule.KMTDocumentMetalDelete(EMTTestingStorageClient, 1), /EMTErrorInputNotValid/);
	});

	it('returns statusCode', async function() {
		deepEqual(await mainModule.KMTDocumentMetalDelete(EMTTestingStorageClient, (await mainModule.KMTDocumentMetalWrite(EMTTestingStorageClient, kTesting.StubDocumentObjectValid())).KMTDocumentID), {
			statusCode: 200,
		});
	});

	it('deletes KMTDocument', async function() {
		await mainModule.KMTDocumentMetalDelete(EMTTestingStorageClient, (await mainModule.KMTDocumentMetalWrite(EMTTestingStorageClient, kTesting.StubDocumentObjectValid())).KMTDocumentID);
		deepEqual(await mainModule.KMTDocumentMetalList(EMTTestingStorageClient), {});
	});

});
