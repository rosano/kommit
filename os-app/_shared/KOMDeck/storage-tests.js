const { rejects, throws, deepEqual } = require('assert');

const mainModule = require('./storage.js').default;

describe('KOMDeckStorageCollectionName', function test_KOMDeckStorageCollectionName() {

	it('returns string', function () {
		deepEqual(mainModule.KOMDeckStorageCollectionName(), 'kom_decks');
	});

});

describe('KOMDeckStorageCollectionPath', function test_KOMDeckStorageCollectionPath() {

	it('returns string', function () {
		deepEqual(mainModule.KOMDeckStorageCollectionPath(), mainModule.KOMDeckStorageCollectionName() + '/');
	});

});

describe('KOMDeckStorageFolderPath', function test_KOMDeckStorageFolderPath() {

	it('throws error if blank', function () {
		throws(function () {
			mainModule.KOMDeckStorageFolderPath('');
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function () {
		deepEqual(mainModule.KOMDeckStorageFolderPath('alfa'), mainModule.KOMDeckStorageCollectionPath() + 'alfa/');
	});

});

describe('KOMDeckStorageObjectPath', function test_KOMDeckStorageObjectPath() {

	it('throws error if blank', function () {
		throws(function () {
			mainModule.KOMDeckStorageObjectPath('');
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function () {
		deepEqual(mainModule.KOMDeckStorageObjectPath('alfa'), mainModule.KOMDeckStorageFolderPath('alfa') + 'main');
	});

});

describe('KOMDeckStorageMatch', function test_KOMDeckStorageMatch() {

	it('throws error if not string', function () {
		throws(function () {
			mainModule.KOMDeckStorageMatch(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns false if no KOMDeckStorageCollectionPath', function () {
		deepEqual(mainModule.KOMDeckStorageMatch(mainModule.KOMDeckStorageObjectPath('alfa').replace(mainModule.KOMDeckStorageCollectionPath(), mainModule.KOMDeckStorageCollectionPath().slice(1))), false);
	});

	it('returns false if no KOMDeckStorageObjectPath', function () {
		deepEqual(mainModule.KOMDeckStorageMatch(mainModule.KOMDeckStorageObjectPath('alfa').slice(0, -1)), false);
	});

	it('returns true', function () {
		deepEqual(mainModule.KOMDeckStorageMatch(mainModule.KOMDeckStorageObjectPath('alfa')), true);
	});

});

describe('KOMDeckStorageWrite', function test_KOMDeckStorageWrite() {

	it('rejects if not object', async function () {
		await rejects(mainModule.KOMDeckStorageWrite(KOMTestingStorageClient, null), /KOMErrorInputNotValid/);
	});

	it('returns object with KOMErrors if not valid', async function () {
		deepEqual((await mainModule.KOMDeckStorageWrite(KOMTestingStorageClient, Object.assign(StubDeckObjectValid(), {
			KOMDeckID: null,
		}))).KOMErrors, {
			KOMDeckID: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns input', async function () {
		const item = StubDeckObjectValid();

		deepEqual(await mainModule.KOMDeckStorageWrite(KOMTestingStorageClient, item) === item, true);
	});

	it('leaves input unmodified', async function () {
		deepEqual(await mainModule.KOMDeckStorageWrite(KOMTestingStorageClient, StubDeckObjectValid()), StubDeckObjectValid());
	});

	context('relations', function () {

		const item = Object.assign(StubDeckObjectValid(), {
			$alfa: 'bravo',
		});
		let outputData, storage;

		before(async function () {
			outputData = await mainModule.KOMDeckStorageWrite(KOMTestingStorageClient, item);
		});

		before(async function () {
			storage = Object.values(await mainModule.KOMDeckStorageList(KOMTestingStorageClient));
		});

		it('excludes from storage', function () {
			deepEqual(storage, [StubDeckObjectValid()]);
		});

		it('includes in outputData', function () {
			deepEqual(outputData, item);
		});

		it('updates inputData', function () {
			deepEqual(outputData === item, true);
		});

	});

});

describe('KOMDeckStorageList', function test_KOMDeckStorageList() {

	it('returns empty array if none', async function () {
		deepEqual(await mainModule.KOMDeckStorageList(KOMTestingStorageClient), {});
	});

	it('returns existing KOMDecks', async function () {
		let item = await mainModule.KOMDeckStorageWrite(KOMTestingStorageClient, StubDeckObjectValid());
		deepEqual(Object.values(await mainModule.KOMDeckStorageList(KOMTestingStorageClient)), [item]);
		deepEqual(Object.keys(await mainModule.KOMDeckStorageList(KOMTestingStorageClient)), [item.KOMDeckID]);
	});

});

describe('KOMDeckStorageDelete', function test_KOMDeckStorageDelete() {

	it('throws if not valid', function () {
		throws(function () {
			mainModule.KOMDeckStorageDelete(KOMTestingStorageClient, {});
		}, /KOMErrorInputNotValid/);
	});

	it('returns statusCode', async function () {
		deepEqual(await mainModule.KOMDeckStorageDelete(KOMTestingStorageClient, await mainModule.KOMDeckStorageWrite(KOMTestingStorageClient, StubDeckObjectValid())), {
			statusCode: 200,
		});
	});

	it('deletes KOMDeck', async function () {
		await mainModule.KOMDeckStorageDelete(KOMTestingStorageClient, await mainModule.KOMDeckStorageWrite(KOMTestingStorageClient, StubDeckObjectValid()));
		deepEqual(await mainModule.KOMDeckStorageList(KOMTestingStorageClient), {});
	});

});
