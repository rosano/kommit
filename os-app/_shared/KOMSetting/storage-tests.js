const { rejects, throws, deepEqual } = require('assert');

const mod = require('./storage.js').default;

describe('KOMSettingStorageCollectionName', function test_KOMSettingStorageCollectionName() {

	it('returns string', function() {
		deepEqual(mod.KOMSettingStorageCollectionName(), 'kom_settings');
	});

});

describe('KOMSettingStorageCollectionPath', function test_KOMSettingStorageCollectionPath() {

	it('returns string', function() {
		deepEqual(mod.KOMSettingStorageCollectionPath(), mod.KOMSettingStorageCollectionName() + '/');
	});

});

describe('KOMSettingStorageObjectPath', function test_KOMSettingStorageObjectPath() {

	it('throws error if not valid', function() {
		throws(function() {
			mod.KOMSettingStorageObjectPath({});
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function() {
		const item = StubSettingObjectValid();
		deepEqual(mod.KOMSettingStorageObjectPath(item), mod.KOMSettingStorageCollectionPath() + item.KOMSettingKey);
	});

});

describe('KOMSettingStorageMatch', function test_KOMSettingStorageMatch() {

	it('throws error if not string', function () {
		throws(function () {
			mod.KOMSettingStorageMatch(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns false if no KOMSettingStorageCollectionPath', function () {
		deepEqual(mod.KOMSettingStorageMatch(mod.KOMSettingStorageObjectPath(StubSettingObjectValid()).replace(mod.KOMSettingStorageCollectionPath(), mod.KOMSettingStorageCollectionPath().slice(1))), false);
	});

	it('returns true', function () {
		deepEqual(mod.KOMSettingStorageMatch(mod.KOMSettingStorageObjectPath(StubSettingObjectValid())), true);
	});

});

describe('KOMSettingStorageWrite', function test_KOMSettingStorageWrite() {

	it('rejects if not object', async function() {
		await rejects(mod.KOMSettingStorageWrite(KOMTestingStorageClient, null), /KOMErrorInputNotValid/);
	});

	it('returns object with KOMErrors if not valid', async function() {
		deepEqual((await mod.KOMSettingStorageWrite(KOMTestingStorageClient, Object.assign(StubSettingObjectValid(), {
			KOMSettingKey: null,
		}))).KOMErrors, {
			KOMSettingKey: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns input', async function () {
		const item = StubSettingObjectValid();

		deepEqual(await mod.KOMSettingStorageWrite(KOMTestingStorageClient, item) === item, true);
	});

	it('leaves input unmodified', async function () {
		deepEqual(await mod.KOMSettingStorageWrite(KOMTestingStorageClient, StubSettingObjectValid()), StubSettingObjectValid());
	});

});

describe('KOMSettingStorageRead', function test_KOMSettingStorageRead() {

	it('throws if not string', function () {
		throws(function () {
			mod.KOMSettingStorageRead(KOMTestingStorageClient, 1);
		}, /KOMErrorInputNotValid/);
	});

	it('returns null if not found', async function() {
		deepEqual(await mod.KOMSettingStorageRead(KOMTestingStorageClient, 'alfa'), null);
	});

	it('returns KOMSetting', async function() {
		let item = await mod.KOMSettingStorageWrite(KOMTestingStorageClient, StubSettingObjectValid());

		deepEqual(await mod.KOMSettingStorageRead(KOMTestingStorageClient, item.KOMSettingKey), item);
	});

});

describe('KOMSettingStorageList', function test_KOMSettingStorageList() {

	it('returns empty array if none', async function() {
		deepEqual(await mod.KOMSettingStorageList(KOMTestingStorageClient), {});
	});

	it('returns existing KOMSettings', async function() {
		let item = await mod.KOMSettingStorageWrite(KOMTestingStorageClient, StubSettingObjectValid());
		deepEqual(Object.values(await mod.KOMSettingStorageList(KOMTestingStorageClient)), [item]);
		deepEqual(Object.keys(await mod.KOMSettingStorageList(KOMTestingStorageClient)), [item.KOMSettingKey]);
	});

});

describe('KOMSettingStorageDelete', function test_KOMSettingStorageDelete() {

	it('throws if not strong', function () {
		throws(function () {
			mod.KOMSettingStorageDelete(KOMTestingStorageClient, 1);
		}, /KOMErrorInputNotValid/);
	});

	it('returns statusCode', async function() {
		deepEqual(await mod.KOMSettingStorageDelete(KOMTestingStorageClient, (await mod.KOMSettingStorageWrite(KOMTestingStorageClient, StubSettingObjectValid())).KOMSettingKey), {
			statusCode: 200,
		});
	});

	it('deletes KOMSetting', async function() {
		await mod.KOMSettingStorageDelete(KOMTestingStorageClient, (await mod.KOMSettingStorageWrite(KOMTestingStorageClient, StubSettingObjectValid())).KOMSettingKey);
		deepEqual(await mod.KOMSettingStorageList(KOMTestingStorageClient), {});
	});

});
