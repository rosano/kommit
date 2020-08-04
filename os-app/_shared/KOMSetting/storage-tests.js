const { rejects, throws, deepEqual } = require('assert');

const mainModule = require('./storage.js').default;

describe('KOMSettingStorageCollectionName', function test_KOMSettingStorageCollectionName() {

	it('returns string', function() {
		deepEqual(mainModule.KOMSettingStorageCollectionName(), 'kom_settings');
	});

});

describe('KOMSettingStorageCollectionType', function test_KOMSettingStorageCollectionType() {

	it('returns string', function() {
		deepEqual(mainModule.KOMSettingStorageCollectionType(), 'kom_setting');
	});

});

describe('KOMSettingStorageCollectionPath', function test_KOMSettingStorageCollectionPath() {

	it('returns string', function() {
		deepEqual(mainModule.KOMSettingStorageCollectionPath(), mainModule.KOMSettingStorageCollectionName() + '/');
	});

});

describe('KOMSettingStorageObjectPath', function test_KOMSettingStorageObjectPath() {

	it('throws error if not valid', function() {
		throws(function() {
			mainModule.KOMSettingStorageObjectPath({});
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function() {
		const item = StubSettingObjectValid();
		deepEqual(mainModule.KOMSettingStorageObjectPath(item), mainModule.KOMSettingStorageCollectionPath() + item.KOMSettingKey);
	});

});

describe('KOMSettingStorageWrite', function test_KOMSettingStorageWrite() {

	it('rejects if not object', async function() {
		await rejects(mainModule.KOMSettingStorageWrite(KOMTestingStorageClient, null), /KOMErrorInputNotValid/);
	});

	it('returns object with KOMErrors if not valid', async function() {
		deepEqual((await mainModule.KOMSettingStorageWrite(KOMTestingStorageClient, Object.assign(StubSettingObjectValid(), {
			KOMSettingKey: null,
		}))).KOMErrors, {
			KOMSettingKey: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns KOMSetting', async function() {
		let item = await mainModule.KOMSettingStorageWrite(KOMTestingStorageClient, StubSettingObjectValid());

		deepEqual(item, Object.assign(StubSettingObjectValid(), {
			'@context': item['@context'],
		}));
	});

});

describe('KOMSettingStorageRead', function test_KOMSettingStorageRead() {

	it('throws if not string', function () {
		throws(function () {
			mainModule.KOMSettingStorageRead(KOMTestingStorageClient, 1);
		}, /KOMErrorInputNotValid/);
	});

	it('returns null if not found', async function() {
		deepEqual(await mainModule.KOMSettingStorageRead(KOMTestingStorageClient, 'alfa'), null);
	});

	it('returns KOMSetting', async function() {
		let item = await mainModule.KOMSettingStorageWrite(KOMTestingStorageClient, StubSettingObjectValid());

		deepEqual(await mainModule.KOMSettingStorageRead(KOMTestingStorageClient, item.KOMSettingKey), item);
	});

});

describe('KOMSettingStorageList', function test_KOMSettingStorageList() {

	it('returns empty array if none', async function() {
		deepEqual(await mainModule.KOMSettingStorageList(KOMTestingStorageClient), {});
	});

	it('returns existing KOMSettings', async function() {
		let item = await mainModule.KOMSettingStorageWrite(KOMTestingStorageClient, StubSettingObjectValid());
		deepEqual(Object.values(await mainModule.KOMSettingStorageList(KOMTestingStorageClient)), [item]);
		deepEqual(Object.keys(await mainModule.KOMSettingStorageList(KOMTestingStorageClient)), [item.KOMSettingKey]);
	});

});

describe('KOMSettingStorageDelete', function test_KOMSettingStorageDelete() {

	it('throws if not strong', function () {
		throws(function () {
			mainModule.KOMSettingStorageDelete(KOMTestingStorageClient, 1);
		}, /KOMErrorInputNotValid/);
	});

	it('returns statusCode', async function() {
		deepEqual(await mainModule.KOMSettingStorageDelete(KOMTestingStorageClient, (await mainModule.KOMSettingStorageWrite(KOMTestingStorageClient, StubSettingObjectValid())).KOMSettingKey), {
			statusCode: 200,
		});
	});

	it('deletes KOMSetting', async function() {
		await mainModule.KOMSettingStorageDelete(KOMTestingStorageClient, (await mainModule.KOMSettingStorageWrite(KOMTestingStorageClient, StubSettingObjectValid())).KOMSettingKey);
		deepEqual(await mainModule.KOMSettingStorageList(KOMTestingStorageClient), {});
	});

});
