const { rejects, deepEqual } = require('assert');

const mainModule = require('./metal.js');

const kTesting = {
	StubDocumentObjectValid: function() {
		return {
			KOMDocumentID: 'alfa',
			KOMDocumentName: 'bravo',
			KOMDocumentCreationDate: new Date('2019-02-23T13:56:36Z'),
			KOMDocumentModificationDate: new Date('2019-02-23T13:56:36Z'),
		};
	},
};

describe('KOMDocumentMetalWrite', function testKOMDocumentMetalWrite() {

	it('rejects if not object', async function() {
		await rejects(mainModule.KOMDocumentMetalWrite(KOMTestingStorageClient, null), /KOMErrorInputNotValid/);
	});

	it('returns object with KOMErrors if not valid', async function() {
		deepEqual((await mainModule.KOMDocumentMetalWrite(KOMTestingStorageClient, Object.assign(kTesting.StubDocumentObjectValid(), {
			KOMDocumentID: null,
		}))).KOMErrors, {
			KOMDocumentID: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns KOMDocument', async function() {
		let item = await mainModule.KOMDocumentMetalWrite(KOMTestingStorageClient, kTesting.StubDocumentObjectValid());

		deepEqual(item, Object.assign(kTesting.StubDocumentObjectValid(), {
			'@context': item['@context'],
		}));
	});

});

describe('KOMDocumentMetalRead', function testKOMDocumentMetalRead() {

	it('rejects if not string', async function() {
		await rejects(mainModule.KOMDocumentMetalRead(KOMTestingStorageClient, 1), /KOMErrorInputNotValid/);
	});

	it('returns null if not found', async function() {
		deepEqual(await mainModule.KOMDocumentMetalRead(KOMTestingStorageClient, 'alfa'), null);
	});

	it('returns KOMDocument', async function() {
		let item = await mainModule.KOMDocumentMetalWrite(KOMTestingStorageClient, kTesting.StubDocumentObjectValid());

		deepEqual(await mainModule.KOMDocumentMetalRead(KOMTestingStorageClient, item.KOMDocumentID), item);
	});

});

describe('KOMDocumentMetalList', function testKOMDocumentMetalList() {

	it('returns empty array if none', async function() {
		deepEqual(await mainModule.KOMDocumentMetalList(KOMTestingStorageClient), {});
	});

	it('returns existing KOMDocuments', async function() {
		let item = await mainModule.KOMDocumentMetalWrite(KOMTestingStorageClient, kTesting.StubDocumentObjectValid());
		deepEqual(Object.values(await mainModule.KOMDocumentMetalList(KOMTestingStorageClient)), [item]);
		deepEqual(Object.keys(await mainModule.KOMDocumentMetalList(KOMTestingStorageClient)), [item.KOMDocumentID]);
	});

});

describe('KOMDocumentMetalDelete', function testKOMDocumentMetalDelete() {

	it('rejects if not string', async function() {
		await rejects(mainModule.KOMDocumentMetalDelete(KOMTestingStorageClient, 1), /KOMErrorInputNotValid/);
	});

	it('returns statusCode', async function() {
		deepEqual(await mainModule.KOMDocumentMetalDelete(KOMTestingStorageClient, (await mainModule.KOMDocumentMetalWrite(KOMTestingStorageClient, kTesting.StubDocumentObjectValid())).KOMDocumentID), {
			statusCode: 200,
		});
	});

	it('deletes KOMDocument', async function() {
		await mainModule.KOMDocumentMetalDelete(KOMTestingStorageClient, (await mainModule.KOMDocumentMetalWrite(KOMTestingStorageClient, kTesting.StubDocumentObjectValid())).KOMDocumentID);
		deepEqual(await mainModule.KOMDocumentMetalList(KOMTestingStorageClient), {});
	});

});
