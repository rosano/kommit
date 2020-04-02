const { rejects, deepEqual } = require('assert');

const mainModule = require('./metal.js');

const kTesting = {
	StubDocumentObjectValid: function() {
		return {
			KOMDeckID: 'alfa',
			KOMDeckName: 'bravo',
			KOMDeckCreationDate: new Date('2019-02-23T13:56:36Z'),
			KOMDeckModificationDate: new Date('2019-02-23T13:56:36Z'),
		};
	},
};

describe('KOMDeckMetalWrite', function testKOMDeckMetalWrite() {

	it('rejects if not object', async function() {
		await rejects(mainModule.KOMDeckMetalWrite(KOMTestingStorageClient, null), /KOMErrorInputNotValid/);
	});

	it('returns object with KOMErrors if not valid', async function() {
		deepEqual((await mainModule.KOMDeckMetalWrite(KOMTestingStorageClient, Object.assign(kTesting.StubDocumentObjectValid(), {
			KOMDeckID: null,
		}))).KOMErrors, {
			KOMDeckID: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns KOMDeck', async function() {
		let item = await mainModule.KOMDeckMetalWrite(KOMTestingStorageClient, kTesting.StubDocumentObjectValid());

		deepEqual(item, Object.assign(kTesting.StubDocumentObjectValid(), {
			'@context': item['@context'],
		}));
	});

});

describe('KOMDeckMetalRead', function testKOMDeckMetalRead() {

	it('rejects if not string', async function() {
		await rejects(mainModule.KOMDeckMetalRead(KOMTestingStorageClient, 1), /KOMErrorInputNotValid/);
	});

	it('returns null if not found', async function() {
		deepEqual(await mainModule.KOMDeckMetalRead(KOMTestingStorageClient, 'alfa'), null);
	});

	it('returns KOMDeck', async function() {
		let item = await mainModule.KOMDeckMetalWrite(KOMTestingStorageClient, kTesting.StubDocumentObjectValid());

		deepEqual(await mainModule.KOMDeckMetalRead(KOMTestingStorageClient, item.KOMDeckID), item);
	});

});

describe('KOMDeckMetalList', function testKOMDeckMetalList() {

	it('returns empty array if none', async function() {
		deepEqual(await mainModule.KOMDeckMetalList(KOMTestingStorageClient), {});
	});

	it('returns existing KOMDecks', async function() {
		let item = await mainModule.KOMDeckMetalWrite(KOMTestingStorageClient, kTesting.StubDocumentObjectValid());
		deepEqual(Object.values(await mainModule.KOMDeckMetalList(KOMTestingStorageClient)), [item]);
		deepEqual(Object.keys(await mainModule.KOMDeckMetalList(KOMTestingStorageClient)), [item.KOMDeckID]);
	});

});

describe('KOMDeckMetalDelete', function testKOMDeckMetalDelete() {

	it('rejects if not string', async function() {
		await rejects(mainModule.KOMDeckMetalDelete(KOMTestingStorageClient, 1), /KOMErrorInputNotValid/);
	});

	it('returns statusCode', async function() {
		deepEqual(await mainModule.KOMDeckMetalDelete(KOMTestingStorageClient, (await mainModule.KOMDeckMetalWrite(KOMTestingStorageClient, kTesting.StubDocumentObjectValid())).KOMDeckID), {
			statusCode: 200,
		});
	});

	it('deletes KOMDeck', async function() {
		await mainModule.KOMDeckMetalDelete(KOMTestingStorageClient, (await mainModule.KOMDeckMetalWrite(KOMTestingStorageClient, kTesting.StubDocumentObjectValid())).KOMDeckID);
		deepEqual(await mainModule.KOMDeckMetalList(KOMTestingStorageClient), {});
	});

});
