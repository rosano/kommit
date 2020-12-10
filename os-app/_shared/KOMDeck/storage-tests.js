const { rejects, throws, deepEqual } = require('assert');

const mod = require('./storage.js').default;

describe('KOMDeckStorageCollectionName', function test_KOMDeckStorageCollectionName() {

	it('returns string', function () {
		deepEqual(mod.KOMDeckStorageCollectionName(), 'kom_decks');
	});

});

describe('KOMDeckStorageCollectionPath', function test_KOMDeckStorageCollectionPath() {

	it('returns string', function () {
		deepEqual(mod.KOMDeckStorageCollectionPath(), mod.KOMDeckStorageCollectionName() + '/');
	});

});

describe('KOMDeckStorageFolderPath', function test_KOMDeckStorageFolderPath() {

	it('throws error if blank', function () {
		throws(function () {
			mod.KOMDeckStorageFolderPath('');
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function () {
		deepEqual(mod.KOMDeckStorageFolderPath('alfa'), mod.KOMDeckStorageCollectionPath() + 'alfa/');
	});

});

describe('KOMDeckStorageObjectPath', function test_KOMDeckStorageObjectPath() {

	it('throws error if blank', function () {
		throws(function () {
			mod.KOMDeckStorageObjectPath('');
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function () {
		deepEqual(mod.KOMDeckStorageObjectPath('alfa'), mod.KOMDeckStorageFolderPath('alfa') + 'main');
	});

});

describe('KOMDeckStorageMatch', function test_KOMDeckStorageMatch() {

	it('throws error if not string', function () {
		throws(function () {
			mod.KOMDeckStorageMatch(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns false if no KOMDeckStorageCollectionPath', function () {
		deepEqual(mod.KOMDeckStorageMatch(mod.KOMDeckStorageObjectPath('alfa').replace(mod.KOMDeckStorageCollectionPath(), mod.KOMDeckStorageCollectionPath().slice(1))), false);
	});

	it('returns false if no KOMDeckStorageObjectPath', function () {
		deepEqual(mod.KOMDeckStorageMatch(mod.KOMDeckStorageObjectPath('alfa').slice(0, -1)), false);
	});

	it('returns true', function () {
		deepEqual(mod.KOMDeckStorageMatch(mod.KOMDeckStorageObjectPath('alfa')), true);
	});

});

describe('KOMDeckStorageWrite', function test_KOMDeckStorageWrite() {

	it('rejects if not object', async function () {
		await rejects(mod.KOMDeckStorageWrite(KOMTestingStorageClient, null), /KOMErrorInputNotValid/);
	});

	it('returns object with KOMErrors if not valid', async function () {
		deepEqual((await mod.KOMDeckStorageWrite(KOMTestingStorageClient, Object.assign(StubDeckObjectValid(), {
			KOMDeckID: null,
		}))).KOMErrors, {
			KOMDeckID: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns input', async function () {
		const item = StubDeckObjectValid();

		deepEqual(await mod.KOMDeckStorageWrite(KOMTestingStorageClient, item) === item, true);
	});

	it('leaves input unmodified', async function () {
		deepEqual(await mod.KOMDeckStorageWrite(KOMTestingStorageClient, StubDeckObjectValid()), StubDeckObjectValid());
	});

	context('relations', function () {

		const item = Object.assign(StubDeckObjectValid(), {
			$alfa: 'bravo',
		});
		let outputData, storage;

		before(async function () {
			outputData = await mod.KOMDeckStorageWrite(KOMTestingStorageClient, item);
		});

		before(async function () {
			storage = Object.values(await mod.KOMDeckStorageList(KOMTestingStorageClient));
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
		deepEqual(await mod.KOMDeckStorageList(KOMTestingStorageClient), {});
	});

	it('returns existing KOMDecks', async function () {
		let item = await mod.KOMDeckStorageWrite(KOMTestingStorageClient, StubDeckObjectValid());
		deepEqual(Object.values(await mod.KOMDeckStorageList(KOMTestingStorageClient)), [item]);
		deepEqual(Object.keys(await mod.KOMDeckStorageList(KOMTestingStorageClient)), [item.KOMDeckID]);
	});

});

describe('KOMDeckStorageDelete', function test_KOMDeckStorageDelete() {

	it('throws if not valid', function () {
		throws(function () {
			mod.KOMDeckStorageDelete(KOMTestingStorageClient, {});
		}, /KOMErrorInputNotValid/);
	});

	it('returns statusCode', async function () {
		deepEqual(await mod.KOMDeckStorageDelete(KOMTestingStorageClient, await mod.KOMDeckStorageWrite(KOMTestingStorageClient, StubDeckObjectValid())), {
			statusCode: 200,
		});
	});

	it('deletes KOMDeck', async function () {
		await mod.KOMDeckStorageDelete(KOMTestingStorageClient, await mod.KOMDeckStorageWrite(KOMTestingStorageClient, StubDeckObjectValid()));
		deepEqual(await mod.KOMDeckStorageList(KOMTestingStorageClient), {});
	});

});
