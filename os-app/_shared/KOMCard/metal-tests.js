const { rejects, deepEqual } = require('assert');

const mainModule = require('./metal.js').default;

const kTesting = {
	StubDeckObjectValid() {
		return {
			KOMDeckID: 'alfa',
			KOMDeckName: '',
			KOMDeckCreationDate: new Date('2019-02-23T13:56:36Z'),
			KOMDeckModificationDate: new Date('2019-02-23T13:56:36Z'),
		};
	},
	StubCardObjectValid() {
		return {
			KOMCardID: 'bravo',
			KOMCardQuestion: 'charlie',
			KOMCardAnswer: 'delta',
			KOMCardCreationDate: new Date('2019-02-23T13:56:36Z'),
			KOMCardModificationDate: new Date('2019-02-23T13:56:36Z'),
		};
	},
};

describe('KOMCardMetalWrite', function test_KOMCardMetalWrite() {

	it('rejects if param1 not object', async function() {
		await rejects(mainModule.KOMCardMetalWrite(KOMTestingStorageClient, null, kTesting.StubDeckObjectValid()), /KOMErrorInputNotValid/);
	});

	it('rejects if param2 not valid', async function() {
		await rejects(mainModule.KOMCardMetalWrite(KOMTestingStorageClient, kTesting.StubCardObjectValid(), {}), /KOMErrorInputNotValid/);
	});

	it('returns object with KOMErrors if not valid', async function() {
		deepEqual((await mainModule.KOMCardMetalWrite(KOMTestingStorageClient, Object.assign(kTesting.StubCardObjectValid(), {
			KOMCardID: null,
		}), kTesting.StubDeckObjectValid())).KOMErrors, {
			KOMCardID: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns KOMCard', async function() {
		let item = await mainModule.KOMCardMetalWrite(KOMTestingStorageClient, kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid());

		deepEqual(item, Object.assign(kTesting.StubCardObjectValid(), {
			'@context': item['@context'],
		}));
	});

});

describe('KOMCardMetalRead', function test_KOMCardMetalRead() {

	it('rejects if not string', async function() {
		await rejects(mainModule.KOMCardMetalRead(KOMTestingStorageClient, 1), /KOMErrorInputNotValid/);
	});

	it('rejects if param2 not valid', async function() {
		await rejects(mainModule.KOMCardMetalRead(KOMTestingStorageClient, '', {}), /KOMErrorInputNotValid/);
	});

	it('returns null if not found', async function() {
		deepEqual(await mainModule.KOMCardMetalRead(KOMTestingStorageClient, 'bravo', kTesting.StubDeckObjectValid()), null);
	});

	it('returns KOMCard', async function() {
		let item = await mainModule.KOMCardMetalWrite(KOMTestingStorageClient, kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid());

		deepEqual(await mainModule.KOMCardMetalRead(KOMTestingStorageClient, item.KOMCardID, kTesting.StubDeckObjectValid()), item);
	});

});

describe('KOMCardMetalList', function test_KOMCardMetalList() {

	it('returns empty array if none', async function() {
		deepEqual(await mainModule.KOMCardMetalList(KOMTestingStorageClient, kTesting.StubDeckObjectValid()), {});
	});

	it('returns existing KOMCards', async function() {
		let item = await mainModule.KOMCardMetalWrite(KOMTestingStorageClient, kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid());
		deepEqual(Object.values(await mainModule.KOMCardMetalList(KOMTestingStorageClient, kTesting.StubDeckObjectValid())), [item]);
		deepEqual(Object.keys(await mainModule.KOMCardMetalList(KOMTestingStorageClient, kTesting.StubDeckObjectValid())), [item.KOMCardID]);
	});

});

describe('KOMCardMetalDelete', function test_KOMCardMetalDelete() {

	it('rejects if not string', async function() {
		await rejects(mainModule.KOMCardMetalDelete(KOMTestingStorageClient, 1, kTesting.StubDeckObjectValid()), /KOMErrorInputNotValid/);
	});

	it('rejects if param2 not valid', async function() {
		await rejects(mainModule.KOMCardMetalDelete(KOMTestingStorageClient, '', {}), /KOMErrorInputNotValid/);
	});

	it('returns statusCode', async function() {
		deepEqual(await mainModule.KOMCardMetalDelete(KOMTestingStorageClient, (await mainModule.KOMCardMetalWrite(KOMTestingStorageClient, kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid())).KOMCardID, kTesting.StubDeckObjectValid()), {
			statusCode: 200,
		});
	});

	it('deletes KOMCard', async function() {
		await mainModule.KOMCardMetalDelete(KOMTestingStorageClient, (await mainModule.KOMCardMetalWrite(KOMTestingStorageClient, kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid())).KOMCardID, kTesting.StubDeckObjectValid());
		deepEqual(await mainModule.KOMCardMetalList(KOMTestingStorageClient, kTesting.StubDeckObjectValid()), {});
	});

});
