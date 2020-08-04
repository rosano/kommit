const { throws, deepEqual } = require('assert');

const mainModule = require('./model.js').default;

describe('KOMSettingModelErrorsFor', function test_KOMSettingModelErrorsFor() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.KOMSettingModelErrorsFor(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns object if KOMSettingKey not string', function() {
		deepEqual(mainModule.KOMSettingModelErrorsFor(Object.assign(StubSettingObjectValid(), {
			KOMSettingKey: null,
		})), {
			KOMSettingKey: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns object if KOMSettingKey not filled', function() {
		deepEqual(mainModule.KOMSettingModelErrorsFor(Object.assign(StubSettingObjectValid(), {
			KOMSettingKey: ' ',
		})), {
			KOMSettingKey: [
				'KOMErrorNotFilled',
			],
		});
	});

	it('returns object if KOMSettingValue not string', function() {
		deepEqual(mainModule.KOMSettingModelErrorsFor(Object.assign(StubSettingObjectValid(), {
			KOMSettingValue: null,
		})), {
			KOMSettingValue: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns null', function() {
		deepEqual(mainModule.KOMSettingModelErrorsFor(StubSettingObjectValid()), null);
	});

});
