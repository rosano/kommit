const { rejects, throws, deepEqual } = require('assert');

const mod = require('./action.js').default;

describe('KOMSettingsActionProperty', function test_KOMSettingsActionProperty() {

	it('rejects if param1 not string', async function() {
		await rejects(mod.KOMSettingsActionProperty(KOMTestingStorageClient, null));
	});

	it('returns undefined if param1 not found', async function() {
		deepEqual(await mod.KOMSettingsActionProperty(KOMTestingStorageClient, 'alfa'), undefined);
	});

	context('param2', function () {

		it('returns value if undefined', async function() {
			await mod.KOMSettingsActionProperty(KOMTestingStorageClient, 'alfa', 'bravo');

			deepEqual(await mod.KOMSettingsActionProperty(KOMTestingStorageClient, 'alfa'), await mod.KOMSettingsActionProperty(KOMTestingStorageClient, 'alfa'));
		});

		it('returns object and sets value', async function() {
			deepEqual(await mod.KOMSettingsActionProperty(KOMTestingStorageClient, 'alfa', 'bravo'), await mod.KOMSettingsActionProperty(KOMTestingStorageClient, 'alfa'));
		});
		
	});

});

describe('KOMSettingsActionDelete', function test_KOMSettingsActionDelete() {

	it('throws if not string', function() {
		throws(function () {
			mod.KOMSettingsActionDelete(KOMTestingStorageClient, 1);
		}, /KOMErrorInputNotValid/);
	});

	it('returns statusCode', async function() {
		await mod.KOMSettingsActionProperty(KOMTestingStorageClient, 'alfa', 'bravo');
		deepEqual(await mod.KOMSettingsActionDelete(KOMTestingStorageClient, 'alfa'), {
			statusCode: 200,
		});
	});

	it('deletes KOMSetting', async function() {
		await mod.KOMSettingsActionProperty(KOMTestingStorageClient, 'alfa', 'bravo');
		await mod.KOMSettingsActionDelete(KOMTestingStorageClient, 'alfa');
		deepEqual(await mod.KOMSettingsActionQuery(KOMTestingStorageClient, {}), []);
	});

});
