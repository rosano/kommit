const { rejects, deepEqual } = require('assert');

const mainModule = require('./metal.js').default;

const kTesting = {
	StubDeckObjectValid() {
		return {
			KOMDeckID: 'alfa',
			KOMDeckName: 'bravo',
			KOMDeckCreationDate: new Date('2019-02-23T13:56:36Z'),
			KOMDeckModificationDate: new Date('2019-02-23T13:56:36Z'),
		};
	},
};

describe('KOMDeckMetalWrite', function test_KOMDeckMetalWrite() {

	it('rejects if not object', async function() {
		await rejects(mainModule.KOMDeckMetalWrite(KOMTestingStorageClient, null), /KOMErrorInputNotValid/);
	});

	it('returns object with KOMErrors if not valid', async function() {
		deepEqual((await mainModule.KOMDeckMetalWrite(KOMTestingStorageClient, Object.assign(kTesting.StubDeckObjectValid(), {
			KOMDeckID: null,
		}))).KOMErrors, {
			KOMDeckID: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns KOMDeck', async function() {
		let item = await mainModule.KOMDeckMetalWrite(KOMTestingStorageClient, kTesting.StubDeckObjectValid());

		deepEqual(item, Object.assign(kTesting.StubDeckObjectValid(), {
			'@context': item['@context'],
		}));
	});

	context('$KOMDeckCards', function () {

		const memory = Object.assign(kTesting.StubDeckObjectValid(), {
			$KOMDeckCards: [],
		});
		let storage = [];

		before(async function () {
			await mainModule.KOMDeckMetalWrite(KOMTestingStorageClient, memory);
		});
		
		before(async function () {
			storage = Object.values(await mainModule.KOMDeckMetalList(KOMTestingStorageClient));
		});
		
		it('ignores property', function () {
			deepEqual(storage, [Object.assign(kTesting.StubDeckObjectValid(), {
				'@context': memory['@context'],
			})]);
		});

		it('clones object', function () {
			deepEqual(memory.$KOMDeckCards, []);
		});
	
	});

	context('$KOMDeckSpacings', function () {

		const memory = Object.assign(kTesting.StubDeckObjectValid(), {
			$KOMDeckSpacings: [],
		});
		let storage = [];

		before(async function () {
			await mainModule.KOMDeckMetalWrite(KOMTestingStorageClient, memory);
		});
		
		before(async function () {
			storage = Object.values(await mainModule.KOMDeckMetalList(KOMTestingStorageClient));
		});
		
		it('ignores property', function () {
			deepEqual(storage, [Object.assign(kTesting.StubDeckObjectValid(), {
				'@context': memory['@context'],
			})]);
		});

		it('clones object', function () {
			deepEqual(memory.$KOMDeckSpacings, []);
		});
	
	});

});

describe('KOMDeckMetalList', function test_KOMDeckMetalList() {

	it('returns empty array if none', async function() {
		deepEqual(await mainModule.KOMDeckMetalList(KOMTestingStorageClient), {});
	});

	it('returns existing KOMDecks', async function() {
		let item = await mainModule.KOMDeckMetalWrite(KOMTestingStorageClient, kTesting.StubDeckObjectValid());
		deepEqual(Object.values(await mainModule.KOMDeckMetalList(KOMTestingStorageClient)), [item]);
		deepEqual(Object.keys(await mainModule.KOMDeckMetalList(KOMTestingStorageClient)), [item.KOMDeckID]);
	});

});

describe('KOMDeckMetalDelete', function test_KOMDeckMetalDelete() {

	it('rejects if not valid', async function() {
		await rejects(mainModule.KOMDeckMetalDelete(KOMTestingStorageClient, {}), /KOMErrorInputNotValid/);
	});

	it('returns statusCode', async function() {
		deepEqual(await mainModule.KOMDeckMetalDelete(KOMTestingStorageClient, await mainModule.KOMDeckMetalWrite(KOMTestingStorageClient, kTesting.StubDeckObjectValid())), {
			statusCode: 200,
		});
	});

	it('deletes KOMDeck', async function() {
		await mainModule.KOMDeckMetalDelete(KOMTestingStorageClient, await mainModule.KOMDeckMetalWrite(KOMTestingStorageClient, kTesting.StubDeckObjectValid()));
		deepEqual(await mainModule.KOMDeckMetalList(KOMTestingStorageClient), {});
	});

});
