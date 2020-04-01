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
		await rejects(mainModule.KMTDocumentMetalWrite(KMTTestingStorageClient, null), /KMTErrorInputNotValid/);
	});

	it('returns object with KMTErrors if not valid', async function() {
		deepEqual((await mainModule.KMTDocumentMetalWrite(KMTTestingStorageClient, Object.assign(kTesting.StubDocumentObjectValid(), {
			KMTDocumentID: null,
		}))).KMTErrors, {
			KMTDocumentID: [
				'KMTErrorNotString',
			],
		});
	});

	it('returns KMTDocument', async function() {
		let item = await mainModule.KMTDocumentMetalWrite(KMTTestingStorageClient, kTesting.StubDocumentObjectValid());

		deepEqual(item, Object.assign(kTesting.StubDocumentObjectValid(), {
			'@context': item['@context'],
		}));
	});

});

describe('KMTDocumentMetalRead', function testKMTDocumentMetalRead() {

	it('rejects if not string', async function() {
		await rejects(mainModule.KMTDocumentMetalRead(KMTTestingStorageClient, 1), /KMTErrorInputNotValid/);
	});

	it('returns null if not found', async function() {
		deepEqual(await mainModule.KMTDocumentMetalRead(KMTTestingStorageClient, 'alfa'), null);
	});

	it('returns KMTDocument', async function() {
		let item = await mainModule.KMTDocumentMetalWrite(KMTTestingStorageClient, kTesting.StubDocumentObjectValid());

		deepEqual(await mainModule.KMTDocumentMetalRead(KMTTestingStorageClient, item.KMTDocumentID), item);
	});

});

describe('KMTDocumentMetalList', function testKMTDocumentMetalList() {

	it('returns empty array if none', async function() {
		deepEqual(await mainModule.KMTDocumentMetalList(KMTTestingStorageClient), {});
	});

	it('returns existing KMTDocuments', async function() {
		let item = await mainModule.KMTDocumentMetalWrite(KMTTestingStorageClient, kTesting.StubDocumentObjectValid());
		deepEqual(Object.values(await mainModule.KMTDocumentMetalList(KMTTestingStorageClient)), [item]);
		deepEqual(Object.keys(await mainModule.KMTDocumentMetalList(KMTTestingStorageClient)), [item.KMTDocumentID]);
	});

});

describe('KMTDocumentMetalDelete', function testKMTDocumentMetalDelete() {

	it('rejects if not string', async function() {
		await rejects(mainModule.KMTDocumentMetalDelete(KMTTestingStorageClient, 1), /KMTErrorInputNotValid/);
	});

	it('returns statusCode', async function() {
		deepEqual(await mainModule.KMTDocumentMetalDelete(KMTTestingStorageClient, (await mainModule.KMTDocumentMetalWrite(KMTTestingStorageClient, kTesting.StubDocumentObjectValid())).KMTDocumentID), {
			statusCode: 200,
		});
	});

	it('deletes KMTDocument', async function() {
		await mainModule.KMTDocumentMetalDelete(KMTTestingStorageClient, (await mainModule.KMTDocumentMetalWrite(KMTTestingStorageClient, kTesting.StubDocumentObjectValid())).KMTDocumentID);
		deepEqual(await mainModule.KMTDocumentMetalList(KMTTestingStorageClient), {});
	});

});
