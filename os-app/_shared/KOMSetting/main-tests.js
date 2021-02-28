const { rejects, throws, deepEqual } = require('assert');

const mod = require('./main.js').default;

describe('KOMSettingModelErrorsFor', function test_KOMSettingModelErrorsFor() {

	it('throws error if not object', function() {
		throws(function() {
			mod.KOMSettingModelErrorsFor(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns object if KOMSettingKey not string', function() {
		deepEqual(mod.KOMSettingModelErrorsFor(StubSettingObjectValid({
			KOMSettingKey: null,
		})), {
			KOMSettingKey: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns object if KOMSettingKey not filled', function() {
		deepEqual(mod.KOMSettingModelErrorsFor(StubSettingObjectValid({
			KOMSettingKey: ' ',
		})), {
			KOMSettingKey: [
				'KOMErrorNotFilled',
			],
		});
	});

	it('returns object if KOMSettingValue not string', function() {
		deepEqual(mod.KOMSettingModelErrorsFor(StubSettingObjectValid({
			KOMSettingValue: null,
		})), {
			KOMSettingValue: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns null', function() {
		deepEqual(mod.KOMSettingModelErrorsFor(StubSettingObjectValid()), null);
	});

});

describe('KOMSettingDirectory', function test_KOMSettingDirectory() {

	it('returns string', function() {
		deepEqual(mod.KOMSettingDirectory(), 'kom_settings');
	});

});

describe('KOMSettingPath', function test_KOMSettingPath() {

	it('returns string', function() {
		const KOMSettingKey = Math.random().toString();
		deepEqual(mod.KOMSettingPath({
			KOMSettingKey,
		}), mod.KOMSettingDirectory() + '/' + KOMSettingKey);
	});

});

describe('KOMSettingStub', function test_KOMSettingStub() {

	it('returns string', function() {
		const KOMSettingKey = Math.random().toString();
		deepEqual(mod.KOMSettingStub(`${ mod.KOMSettingDirectory() }/${ KOMSettingKey }`), {
			KOMSettingKey,
		});
	});

});

describe('KOMSettingList', function test_KOMSettingActList() {

	it('returns array', async function() {
		deepEqual(await ZDRTestingWrap.App.KOMSetting.KOMSettingList(), []);
	});

	it('returns array with existing items', async function() {
		
		const item = await ZDRTestingWrap.App.KOMSetting.ZDRModelWriteObject(StubSettingObjectValid());
		deepEqual(await ZDRTestingWrap.App.KOMSetting.KOMSettingList(), [item]);
	});

});

describe('ZDRSchemaDispatchValidate', function () {

	it('returns function', function () {
		deepEqual(mod.ZDRSchemaDispatchValidate, mod.KOMSettingModelErrorsFor);
	});

});

describe('ZDRSchemaPath', function () {

	it('returns function', function() {
		deepEqual(mod.ZDRSchemaPath, mod.KOMSettingPath);
	});

});


describe('ZDRSchemaStub', function () {

	it('returns function', function() {
		deepEqual(mod.ZDRSchemaStub, mod.KOMSettingStub);
	});

});
