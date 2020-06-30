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
			KOMCardFrontText: 'charlie',
			KOMCardRearText: 'delta',
			KOMCardCreationDate: new Date('2019-02-23T13:56:36Z'),
			KOMCardModificationDate: new Date('2019-02-23T13:56:36Z'),
		};
	},
};

describe('KOMCardMetalWrite', function test_KOMCardMetalWrite() {

	it('rejects if not object', async function() {
		await rejects(mainModule.KOMCardMetalWrite(KOMTestingStorageClient, null), /KOMErrorInputNotValid/);
	});

	it('returns object with KOMErrors if not valid', async function() {
		deepEqual((await mainModule.KOMCardMetalWrite(KOMTestingStorageClient, Object.assign(kTesting.StubCardObjectValid(), {
			KOMCardID: null,
		}))).KOMErrors, {
			KOMCardID: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns KOMCard', async function() {
		const item = await mainModule.KOMCardMetalWrite(KOMTestingStorageClient, kTesting.StubCardObjectValid());

		deepEqual(item, Object.assign(kTesting.StubCardObjectValid(), {
			'@context': item['@context'],
		}));
	});

});

describe('KOMCardMetalList', function test_KOMCardMetalList() {

	it('rejects if not valid', async function() {
		await rejects(mainModule.KOMCardMetalList(KOMTestingStorageClient, {}), /KOMErrorInputNotValid/);
	});

	it('returns empty array if none', async function() {
		deepEqual(await mainModule.KOMCardMetalList(KOMTestingStorageClient, kTesting.StubDeckObjectValid()), {});
	});

	it('returns existing KOMCards', async function() {
		const item = await mainModule.KOMCardMetalWrite(KOMTestingStorageClient, kTesting.StubCardObjectValid());
		deepEqual(Object.values(await mainModule.KOMCardMetalList(KOMTestingStorageClient, kTesting.StubDeckObjectValid())), [item]);
		deepEqual(Object.keys(await mainModule.KOMCardMetalList(KOMTestingStorageClient, kTesting.StubDeckObjectValid())), [item.KOMCardID]);
	});

});

describe('KOMCardMetalDelete', function test_KOMCardMetalDelete() {

	it('rejects if param1 not valid', async function() {
		await rejects(mainModule.KOMCardMetalDelete(KOMTestingStorageClient, {}), /KOMErrorInputNotValid/);
	});

	it('returns statusCode', async function() {
		deepEqual(await mainModule.KOMCardMetalDelete(KOMTestingStorageClient, await mainModule.KOMCardMetalWrite(KOMTestingStorageClient, kTesting.StubCardObjectValid())), {
			statusCode: 200,
		});
	});

	it('deletes KOMCard', async function() {
		await mainModule.KOMCardMetalDelete(KOMTestingStorageClient, await mainModule.KOMCardMetalWrite(KOMTestingStorageClient, kTesting.StubCardObjectValid()));
		deepEqual(await mainModule.KOMCardMetalList(KOMTestingStorageClient, kTesting.StubDeckObjectValid()), {});
	});

});

describe('KOMCardMetalFileWrite', function test_KOMCardMetalFileWrite() {

	const blob = new Blob(['alfa'], { type: 'text/plain' });

	it('rejects if param1 not blob', async function() {
		await rejects(mainModule.KOMCardMetalFileWrite(KOMTestingStorageClient, 'alfa', 'bravo'), /KOMErrorInputNotValid/);
	});

	it('rejects if param2 not path', async function() {
		await rejects(mainModule.KOMCardMetalFileWrite(KOMTestingStorageClient, blob, null), /KOMErrorInputNotValid/);
	});

	it('returns param1', async function() {
		const item = await mainModule.KOMCardMetalFileWrite(KOMTestingStorageClient, blob, 'bravo');

		deepEqual(item === blob, true);
	});

});

describe('KOMCardMetalFileRead', function test_KOMCardMetalFileRead() {

	const blob = new Blob(['alfa'], { type: 'text/plain' });

	it('rejects if not path', async function() {
		await rejects(mainModule.KOMCardMetalFileRead(KOMTestingStorageClient, null), /KOMErrorInputNotValid/);
	});

	it('returns null if non-existing', async function() {
		deepEqual(await mainModule.KOMCardMetalFileRead(KOMTestingStorageClient, 'bravo'), null);
	});

	it('returns blob', async function() {
		await mainModule.KOMCardMetalFileWrite(KOMTestingStorageClient, blob, 'bravo');

		deepEqual(await (await mainModule.KOMCardMetalFileRead(KOMTestingStorageClient, 'bravo')).text(), await blob.text());
	});

});

describe('KOMCardMetalFileDelete', function test_KOMCardMetalFileDelete() {

	const blob = new Blob(['alfa'], { type: 'text/plain' });

	it('rejects if not path', async function() {
		await rejects(mainModule.KOMCardMetalFileDelete(KOMTestingStorageClient, null), /KOMErrorInputNotValid/);
	});

	it('returns status if non-existing', async function() {
		deepEqual(await mainModule.KOMCardMetalFileDelete(KOMTestingStorageClient, 'bravo'), {
			statusCode: 200,
		});
	});

	it('returns status', async function() {
		await mainModule.KOMCardMetalFileWrite(KOMTestingStorageClient, blob, 'bravo');

		deepEqual(await mainModule.KOMCardMetalFileDelete(KOMTestingStorageClient, 'bravo'), {
			statusCode: 200,
		});
	});

});
