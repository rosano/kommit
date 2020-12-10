const { rejects, throws, deepEqual } = require('assert');

const mod = require('./storage.js').default;
const KOMDeckStorage = require('../KOMDeck/storage.js').default;
const KOMSettingStorage = require('../KOMSetting/storage.js').default;

describe('KOMCardStorageCollectionName', function test_KOMCardStorageCollectionName() {

	it('returns string', function () {
		deepEqual(mod.KOMCardStorageCollectionName(), 'kom_cards');
	});

});

describe('KOMCardStorageCollectionPath', function test_KOMCardStorageCollectionPath() {

	it('throws if not valid', function () {
		throws(function () {
			mod.KOMCardStorageCollectionPath('');
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function () {
		deepEqual(mod.KOMCardStorageCollectionPath('alfa'), KOMDeckStorage.KOMDeckStorageFolderPath('alfa') + mod.KOMCardStorageCollectionName() + '/');
	});

});

describe('KOMCardStorageFolderPath', function test_KOMCardStorageFolderPath() {

	it('throws if param2 not valid', function () {
		throws(function () {
			mod.KOMCardStorageFolderPath({});
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function () {
		deepEqual(mod.KOMCardStorageFolderPath(StubCardObjectValid()), mod.KOMCardStorageCollectionPath(StubDeckObjectValid().KOMDeckID) + StubCardObjectValid().KOMCardCreationDate.toJSON().split('T').shift() + '/charlie/');
	});

});

describe('KOMCardStorageObjectPath', function test_KOMCardStorageObjectPath() {

	it('throws if not valid', function () {
		throws(function () {
			mod.KOMCardStorageObjectPath({});
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function () {
		deepEqual(mod.KOMCardStorageObjectPath(StubCardObjectValid()), mod.KOMCardStorageFolderPath(StubCardObjectValid()) + 'main');
	});

});

describe('KOMCardStorageAudioPathFront', function test_KOMCardStorageAudioPathFront() {

	it('throws if not valid', function () {
		throws(function () {
			mod.KOMCardStorageAudioPathFront({});
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function () {
		deepEqual(mod.KOMCardStorageAudioPathFront(StubCardObjectValid()), mod.KOMCardStorageFolderPath(StubCardObjectValid()) + 'side-front/audio');
	});

});

describe('KOMCardStorageAudioPathRear', function test_KOMCardStorageAudioPathRear() {

	it('throws if not valid', function () {
		throws(function () {
			mod.KOMCardStorageAudioPathRear({});
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function () {
		deepEqual(mod.KOMCardStorageAudioPathRear(StubCardObjectValid()), mod.KOMCardStorageFolderPath(StubCardObjectValid()) + 'side-rear/audio');
	});

});

describe('KOMCardStorageMatch', function test_KOMCardStorageMatch() {

	it('throws error if not string', function () {
		throws(function () {
			mod.KOMCardStorageMatch(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns false if KOMDeckStorageObjectPath', function () {
		deepEqual(mod.KOMCardStorageMatch(KOMDeckStorage.KOMDeckStorageObjectPath('alfa')), false);
	});

	it('returns false if KOMSettingStorageObjectPath', function () {
		deepEqual(mod.KOMCardStorageMatch(KOMSettingStorage.KOMSettingStorageObjectPath(StubSettingObjectValid())), false);
	});

	it('returns false if no KOMCardStorageCollectionPath', function () {
		const item = mod.KOMCardStorageCollectionPath(StubDeckObjectValid().KOMDeckID);
		deepEqual(mod.KOMCardStorageMatch(mod.KOMCardStorageObjectPath(StubCardObjectValid()).replace(item, item.slice(0, -2) + '/')), false);
	});

	it('returns false if no KOMCardStorageObjectPath', function () {
		deepEqual(mod.KOMCardStorageMatch(mod.KOMCardStorageObjectPath(StubCardObjectValid()).slice(0, -1)), false);
	});

	it('returns true', function () {
		deepEqual(mod.KOMCardStorageMatch(mod.KOMCardStorageObjectPath(StubCardObjectValid())), true);
	});

});

describe('KOMCardStorageWrite', function test_KOMCardStorageWrite() {

	it('rejects if not object', async function () {
		await rejects(mod.KOMCardStorageWrite(KOMTestingStorageClient, null), /KOMErrorInputNotValid/);
	});

	it('returns object with KOMErrors if not valid', async function () {
		deepEqual((await mod.KOMCardStorageWrite(KOMTestingStorageClient, Object.assign(StubCardObjectValid(), {
			KOMCardID: null,
		}))).KOMErrors, {
			KOMCardID: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns input', async function () {
		const item = StubCardObjectValid();

		deepEqual(await mod.KOMCardStorageWrite(KOMTestingStorageClient, item) === item, true);
	});

	it('leaves input unmodified', async function () {
		deepEqual(await mod.KOMCardStorageWrite(KOMTestingStorageClient, StubCardObjectValid()), StubCardObjectValid());
	});

});

describe('KOMCardStorageList', function test_KOMCardStorageList() {

	it('rejects if not valid', async function () {
		await rejects(mod.KOMCardStorageList(KOMTestingStorageClient, {}), /KOMErrorInputNotValid/);
	});

	it('returns empty array if none', async function () {
		deepEqual(await mod.KOMCardStorageList(KOMTestingStorageClient, StubDeckObjectValid()), {});
	});

	it('returns existing KOMCards', async function () {
		const item = await mod.KOMCardStorageWrite(KOMTestingStorageClient, StubCardObjectValid());
		deepEqual(Object.values(await mod.KOMCardStorageList(KOMTestingStorageClient, StubDeckObjectValid())), [item]);
		deepEqual(Object.keys(await mod.KOMCardStorageList(KOMTestingStorageClient, StubDeckObjectValid())), [item.KOMCardID]);
	});

});

describe('KOMCardStorageDelete', function test_KOMCardStorageDelete() {

	it('rejects if param1 not valid', async function () {
		await rejects(mod.KOMCardStorageDelete(KOMTestingStorageClient, {}), /KOMErrorInputNotValid/);
	});

	it('returns statusCode', async function () {
		deepEqual(await mod.KOMCardStorageDelete(KOMTestingStorageClient, await mod.KOMCardStorageWrite(KOMTestingStorageClient, StubCardObjectValid())), {
			statusCode: 200,
		});
	});

	it('deletes KOMCard', async function () {
		await mod.KOMCardStorageDelete(KOMTestingStorageClient, await mod.KOMCardStorageWrite(KOMTestingStorageClient, StubCardObjectValid()));
		deepEqual(await mod.KOMCardStorageList(KOMTestingStorageClient, StubDeckObjectValid()), {});
	});

});

describe('KOMCardStorageFileWrite', function test_KOMCardStorageFileWrite() {

	const blob = new Blob(['alfa'], { type: 'text/plain' });

	it('rejects if param1 not blob', async function () {
		await rejects(mod.KOMCardStorageFileWrite(KOMTestingStorageClient, 'alfa', 'bravo'), /KOMErrorInputNotValid/);
	});

	it('rejects if param2 not path', async function () {
		await rejects(mod.KOMCardStorageFileWrite(KOMTestingStorageClient, blob, null), /KOMErrorInputNotValid/);
	});

	it('returns param1', async function () {
		const item = await mod.KOMCardStorageFileWrite(KOMTestingStorageClient, blob, 'bravo');

		deepEqual(item === blob, true);
	});

});

describe('KOMCardStorageFileRead', function test_KOMCardStorageFileRead() {

	const blob = new Blob(['alfa'], { type: 'text/plain' });

	it('rejects if not path', async function () {
		await rejects(mod.KOMCardStorageFileRead(KOMTestingStorageClient, null), /KOMErrorInputNotValid/);
	});

	it('returns null if non-existing', async function () {
		deepEqual(await mod.KOMCardStorageFileRead(KOMTestingStorageClient, 'bravo'), null);
	});

	it('returns blob', async function () {
		await mod.KOMCardStorageFileWrite(KOMTestingStorageClient, blob, 'bravo');

		deepEqual(await (await mod.KOMCardStorageFileRead(KOMTestingStorageClient, 'bravo')).text(), await blob.text());
	});

});

describe('KOMCardStorageFileDelete', function test_KOMCardStorageFileDelete() {

	const blob = new Blob(['alfa'], { type: 'text/plain' });

	it('rejects if not path', async function () {
		await rejects(mod.KOMCardStorageFileDelete(KOMTestingStorageClient, null), /KOMErrorInputNotValid/);
	});

	it('returns status if non-existing', async function () {
		deepEqual(await mod.KOMCardStorageFileDelete(KOMTestingStorageClient, 'bravo'), {
			statusCode: 200,
		});
	});

	it('returns status', async function () {
		await mod.KOMCardStorageFileWrite(KOMTestingStorageClient, blob, 'bravo');

		deepEqual(await mod.KOMCardStorageFileDelete(KOMTestingStorageClient, 'bravo'), {
			statusCode: 200,
		});
	});

});
