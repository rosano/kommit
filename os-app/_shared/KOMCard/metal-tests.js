const { rejects, deepEqual } = require('assert');

const mainModule = require('./metal.js').default;

const kTesting = {
	StubCardObjectValid() {
		return {
			KOMCardID: 'alfa',
			KOMCardQuestion: 'bravo',
			KOMCardAnswer: 'charlie',
			KOMCardCreationDate: new Date('2019-02-23T13:56:36Z'),
			KOMCardModificationDate: new Date('2019-02-23T13:56:36Z'),
		};
	},
};

describe('KOMCardMetalWrite', function testKOMCardMetalWrite() {

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
		let item = await mainModule.KOMCardMetalWrite(KOMTestingStorageClient, kTesting.StubCardObjectValid());

		deepEqual(item, Object.assign(kTesting.StubCardObjectValid(), {
			'@context': item['@context'],
		}));
	});

});

describe('KOMCardMetalRead', function testKOMCardMetalRead() {

	it('rejects if not string', async function() {
		await rejects(mainModule.KOMCardMetalRead(KOMTestingStorageClient, 1), /KOMErrorInputNotValid/);
	});

	it('returns null if not found', async function() {
		deepEqual(await mainModule.KOMCardMetalRead(KOMTestingStorageClient, 'alfa'), null);
	});

	it('returns KOMCard', async function() {
		let item = await mainModule.KOMCardMetalWrite(KOMTestingStorageClient, kTesting.StubCardObjectValid());

		deepEqual(await mainModule.KOMCardMetalRead(KOMTestingStorageClient, item.KOMCardID), item);
	});

});

describe('KOMCardMetalList', function testKOMCardMetalList() {

	it('returns empty array if none', async function() {
		deepEqual(await mainModule.KOMCardMetalList(KOMTestingStorageClient), {});
	});

	it('returns existing KOMCards', async function() {
		let item = await mainModule.KOMCardMetalWrite(KOMTestingStorageClient, kTesting.StubCardObjectValid());
		deepEqual(Object.values(await mainModule.KOMCardMetalList(KOMTestingStorageClient)), [item]);
		deepEqual(Object.keys(await mainModule.KOMCardMetalList(KOMTestingStorageClient)), [item.KOMCardID]);
	});

});

describe('KOMCardMetalDelete', function testKOMCardMetalDelete() {

	it('rejects if not string', async function() {
		await rejects(mainModule.KOMCardMetalDelete(KOMTestingStorageClient, 1), /KOMErrorInputNotValid/);
	});

	it('returns statusCode', async function() {
		deepEqual(await mainModule.KOMCardMetalDelete(KOMTestingStorageClient, (await mainModule.KOMCardMetalWrite(KOMTestingStorageClient, kTesting.StubCardObjectValid())).KOMCardID), {
			statusCode: 200,
		});
	});

	it('deletes KOMCard', async function() {
		await mainModule.KOMCardMetalDelete(KOMTestingStorageClient, (await mainModule.KOMCardMetalWrite(KOMTestingStorageClient, kTesting.StubCardObjectValid())).KOMCardID);
		deepEqual(await mainModule.KOMCardMetalList(KOMTestingStorageClient), {});
	});

});
