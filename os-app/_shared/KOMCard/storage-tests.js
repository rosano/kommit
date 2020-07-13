const { rejects, throws, deepEqual } = require('assert');

const mainModule = require('./storage.js').default;
const KOMDeckStorage = require('../KOMDeck/storage.js').default;

describe('KOMCardStorageCollectionName', function test_KOMCardStorageCollectionName() {

	it('returns string', function() {
		deepEqual(mainModule.KOMCardStorageCollectionName(), 'kom_cards');
	});

});

describe('KOMCardStorageCollectionType', function test_KOMCardStorageCollectionType() {

	it('returns string', function() {
		deepEqual(mainModule.KOMCardStorageCollectionType(), 'kom_card');
	});

});

describe('KOMCardStorageCollectionPath', function test_KOMCardStorageCollectionPath() {

	it('throws if not valid', function () {
		throws(function () {
			mainModule.KOMCardStorageCollectionPath('');
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.KOMCardStorageCollectionPath('alfa'), KOMDeckStorage.KOMDeckStorageFolderPath('alfa') +  mainModule.KOMCardStorageCollectionName() + '/');
	});

});

describe('KOMCardStorageFolderPath', function test_KOMCardStorageFolderPath() {

	it('throws if param2 not valid', function () {
		throws(function () {
			mainModule.KOMCardStorageFolderPath({});
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.KOMCardStorageFolderPath(StubCardObjectValid()), mainModule.KOMCardStorageCollectionPath(StubDeckObjectValid().KOMDeckID) + StubCardObjectValid().KOMCardCreationDate.toJSON().split('T').shift() + '/charlie/');
	});

});

describe('KOMCardStorageObjectPath', function test_KOMCardStorageObjectPath() {

	it('throws if not valid', function () {
		throws(function () {
			mainModule.KOMCardStorageObjectPath({});
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.KOMCardStorageObjectPath(StubCardObjectValid()), mainModule.KOMCardStorageFolderPath(StubCardObjectValid()) + 'main');
	});

});

describe('KOMCardStorageAudioPathFront', function test_KOMCardStorageAudioPathFront() {

	it('throws if not valid', function () {
		throws(function () {
			mainModule.KOMCardStorageAudioPathFront({});
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.KOMCardStorageAudioPathFront(StubCardObjectValid()), mainModule.KOMCardStorageFolderPath(StubCardObjectValid()) + 'side-front/audio');
	});

});

describe('KOMCardStorageAudioPathRear', function test_KOMCardStorageAudioPathRear() {

	it('throws if not valid', function () {
		throws(function () {
			mainModule.KOMCardStorageAudioPathRear({});
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.KOMCardStorageAudioPathRear(StubCardObjectValid()), mainModule.KOMCardStorageFolderPath(StubCardObjectValid()) + 'side-rear/audio');
	});

});

describe('KOMCardStorageMatch', function test_KOMCardStorageMatch() {

	it('throws error if not string', function() {
		throws(function() {
			mainModule.KOMCardStorageMatch(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns false if KOMDeckStorageObjectPath', function() {
		deepEqual(mainModule.KOMCardStorageMatch(KOMDeckStorage.KOMDeckStorageObjectPath('alfa')), false);
	});

	it('returns false if no KOMCardStorageCollectionPath', function() {
		const item = mainModule.KOMCardStorageCollectionPath(StubDeckObjectValid().KOMDeckID);
		deepEqual(mainModule.KOMCardStorageMatch(mainModule.KOMCardStorageObjectPath(StubCardObjectValid()).replace(item, item.slice(0, -2) + '/')), false);
	});

	it('returns false if no KOMCardStorageObjectPath', function() {
		deepEqual(mainModule.KOMCardStorageMatch(mainModule.KOMCardStorageObjectPath(StubCardObjectValid()).slice(0, -1)), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.KOMCardStorageMatch(mainModule.KOMCardStorageObjectPath(StubCardObjectValid())), true);
	});

});

describe('KOMCardStorageWrite', function test_KOMCardStorageWrite() {

	it('rejects if not object', async function() {
		await rejects(mainModule.KOMCardStorageWrite(KOMTestingStorageClient, null), /KOMErrorInputNotValid/);
	});

	it('returns object with KOMErrors if not valid', async function() {
		deepEqual((await mainModule.KOMCardStorageWrite(KOMTestingStorageClient, Object.assign(StubCardObjectValid(), {
			KOMCardID: null,
		}))).KOMErrors, {
			KOMCardID: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns KOMCard', async function() {
		const item = await mainModule.KOMCardStorageWrite(KOMTestingStorageClient, StubCardObjectValid());

		deepEqual(item, Object.assign(StubCardObjectValid(), {
			'@context': item['@context'],
		}));
	});

});

describe('KOMCardStorageList', function test_KOMCardStorageList() {

	it('rejects if not valid', async function() {
		await rejects(mainModule.KOMCardStorageList(KOMTestingStorageClient, {}), /KOMErrorInputNotValid/);
	});

	it('returns empty array if none', async function() {
		deepEqual(await mainModule.KOMCardStorageList(KOMTestingStorageClient, StubDeckObjectValid()), {});
	});

	it('returns existing KOMCards', async function() {
		const item = await mainModule.KOMCardStorageWrite(KOMTestingStorageClient, StubCardObjectValid());
		deepEqual(Object.values(await mainModule.KOMCardStorageList(KOMTestingStorageClient, StubDeckObjectValid())), [item]);
		deepEqual(Object.keys(await mainModule.KOMCardStorageList(KOMTestingStorageClient, StubDeckObjectValid())), [item.KOMCardID]);
	});

});

describe('KOMCardStorageDelete', function test_KOMCardStorageDelete() {

	it('rejects if param1 not valid', async function() {
		await rejects(mainModule.KOMCardStorageDelete(KOMTestingStorageClient, {}), /KOMErrorInputNotValid/);
	});

	it('returns statusCode', async function() {
		deepEqual(await mainModule.KOMCardStorageDelete(KOMTestingStorageClient, await mainModule.KOMCardStorageWrite(KOMTestingStorageClient, StubCardObjectValid())), {
			statusCode: 200,
		});
	});

	it('deletes KOMCard', async function() {
		await mainModule.KOMCardStorageDelete(KOMTestingStorageClient, await mainModule.KOMCardStorageWrite(KOMTestingStorageClient, StubCardObjectValid()));
		deepEqual(await mainModule.KOMCardStorageList(KOMTestingStorageClient, StubDeckObjectValid()), {});
	});

});

describe('KOMCardStorageFileWrite', function test_KOMCardStorageFileWrite() {

	const blob = new Blob(['alfa'], { type: 'text/plain' });

	it('rejects if param1 not blob', async function() {
		await rejects(mainModule.KOMCardStorageFileWrite(KOMTestingStorageClient, 'alfa', 'bravo'), /KOMErrorInputNotValid/);
	});

	it('rejects if param2 not path', async function() {
		await rejects(mainModule.KOMCardStorageFileWrite(KOMTestingStorageClient, blob, null), /KOMErrorInputNotValid/);
	});

	it('returns param1', async function() {
		const item = await mainModule.KOMCardStorageFileWrite(KOMTestingStorageClient, blob, 'bravo');

		deepEqual(item === blob, true);
	});

});

describe('KOMCardStorageFileRead', function test_KOMCardStorageFileRead() {

	const blob = new Blob(['alfa'], { type: 'text/plain' });

	it('rejects if not path', async function() {
		await rejects(mainModule.KOMCardStorageFileRead(KOMTestingStorageClient, null), /KOMErrorInputNotValid/);
	});

	it('returns null if non-existing', async function() {
		deepEqual(await mainModule.KOMCardStorageFileRead(KOMTestingStorageClient, 'bravo'), null);
	});

	it('returns blob', async function() {
		await mainModule.KOMCardStorageFileWrite(KOMTestingStorageClient, blob, 'bravo');

		deepEqual(await (await mainModule.KOMCardStorageFileRead(KOMTestingStorageClient, 'bravo')).text(), await blob.text());
	});

});

describe('KOMCardStorageFileDelete', function test_KOMCardStorageFileDelete() {

	const blob = new Blob(['alfa'], { type: 'text/plain' });

	it('rejects if not path', async function() {
		await rejects(mainModule.KOMCardStorageFileDelete(KOMTestingStorageClient, null), /KOMErrorInputNotValid/);
	});

	it('returns status if non-existing', async function() {
		deepEqual(await mainModule.KOMCardStorageFileDelete(KOMTestingStorageClient, 'bravo'), {
			statusCode: 200,
		});
	});

	it('returns status', async function() {
		await mainModule.KOMCardStorageFileWrite(KOMTestingStorageClient, blob, 'bravo');

		deepEqual(await mainModule.KOMCardStorageFileDelete(KOMTestingStorageClient, 'bravo'), {
			statusCode: 200,
		});
	});

});
