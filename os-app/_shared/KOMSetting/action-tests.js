const { rejects, deepEqual } = require('assert');

const mainModule = require('./action.js').default;

describe('KOMSettingsActionProperty', function test_KOMSettingsActionProperty() {

	it('rejects if param1 not string', async function() {
		await rejects(mainModule.KOMSettingsActionProperty(KOMTestingStorageClient, null));
	});

	it('returns undefined if param1 not found', async function() {
		deepEqual(await mainModule.KOMSettingsActionProperty(KOMTestingStorageClient, 'alfa'), undefined);
	});

	context('param2', function () {

		it('returns value if undefined', async function() {
			await mainModule.KOMSettingsActionProperty(KOMTestingStorageClient, 'alfa', 'bravo');

			deepEqual(await mainModule.KOMSettingsActionProperty(KOMTestingStorageClient, 'alfa'), await mainModule.KOMSettingsActionProperty(KOMTestingStorageClient, 'alfa'));
		});

		it('returns object and sets value', async function() {
			deepEqual(await mainModule.KOMSettingsActionProperty(KOMTestingStorageClient, 'alfa', 'bravo'), await mainModule.KOMSettingsActionProperty(KOMTestingStorageClient, 'alfa'));
		});
		
	});

});

describe('KOMSettingsActionDelete', function test_KOMSettingsActionDelete() {

	it('rejects if not string', async function() {
		await rejects(mainModule.KOMSettingsActionDelete(KOMTestingStorageClient, 1), /KOMErrorInputNotValid/);
	});

	it('returns statusCode', async function() {
		await mainModule.KOMSettingsActionProperty(KOMTestingStorageClient, 'alfa', 'bravo');
		deepEqual(await mainModule.KOMSettingsActionDelete(KOMTestingStorageClient, 'alfa'), {
			statusCode: 200,
		});
	});

	it('deletes KOMSetting', async function() {
		await mainModule.KOMSettingsActionProperty(KOMTestingStorageClient, 'alfa', 'bravo');
		await mainModule.KOMSettingsActionDelete(KOMTestingStorageClient, 'alfa');
		deepEqual(await mainModule.KOMSettingsActionQuery(KOMTestingStorageClient, {}), []);
	});

});
