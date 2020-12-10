const { throws, deepEqual } = require('assert');

const mod = require('./model.js').default;

describe('KOMSettingModelErrorsFor', function test_KOMSettingModelErrorsFor() {

	it('throws error if not object', function() {
		throws(function() {
			mod.KOMSettingModelErrorsFor(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns object if KOMSettingKey not string', function() {
		deepEqual(mod.KOMSettingModelErrorsFor(Object.assign(StubSettingObjectValid(), {
			KOMSettingKey: null,
		})), {
			KOMSettingKey: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns object if KOMSettingKey not filled', function() {
		deepEqual(mod.KOMSettingModelErrorsFor(Object.assign(StubSettingObjectValid(), {
			KOMSettingKey: ' ',
		})), {
			KOMSettingKey: [
				'KOMErrorNotFilled',
			],
		});
	});

	it('returns object if KOMSettingValue not string', function() {
		deepEqual(mod.KOMSettingModelErrorsFor(Object.assign(StubSettingObjectValid(), {
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
