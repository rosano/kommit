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
			KOMCardDeckID: 'alfa',
			KOMCardFront: 'charlie',
			KOMCardRear: 'delta',
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

	it('rejects if param1 not valid', async function() {
		await rejects(mainModule.KOMCardMetalDelete(KOMTestingStorageClient, {}, kTesting.StubDeckObjectValid()), /KOMErrorInputNotValid/);
	});

	it('rejects if param2 not valid', async function() {
		await rejects(mainModule.KOMCardMetalDelete(KOMTestingStorageClient, kTesting.StubCardObjectValid(), {}), /KOMErrorInputNotValid/);
	});

	it('returns statusCode', async function() {
		deepEqual(await mainModule.KOMCardMetalDelete(KOMTestingStorageClient, await mainModule.KOMCardMetalWrite(KOMTestingStorageClient, kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid()), kTesting.StubDeckObjectValid()), {
			statusCode: 200,
		});
	});

	it('deletes KOMCard', async function() {
		await mainModule.KOMCardMetalDelete(KOMTestingStorageClient, await mainModule.KOMCardMetalWrite(KOMTestingStorageClient, kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid()), kTesting.StubDeckObjectValid());
		deepEqual(await mainModule.KOMCardMetalList(KOMTestingStorageClient, kTesting.StubDeckObjectValid()), {});
	});

});
