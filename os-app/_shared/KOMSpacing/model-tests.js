const { throws, deepEqual } = require('assert');

const mainModule = require('./model.js').default;

const kTesting = {
	StubSpacingObjectValid() {
		return {
			KOMSpacingID: 'bravo-forward',
		};
	},
};

describe('KOMSpacingModelIdentifier', function test_KOMSpacingModelIdentifier() {

	it('throws error if not string', function() {
		throws(function() {
			mainModule.KOMSpacingModelIdentifier(null);
		}, /KOMErrorInputNotValid/);
	});

	it('throws error if not valid', function() {
		throws(function() {
			mainModule.KOMSpacingModelIdentifier('bravoforward');
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.KOMSpacingModelIdentifier('bravo-forward'), 'bravo');
	});

});

describe('KOMSpacingModelLabel', function test_KOMSpacingModelLabel() {

	it('throws error if not string', function() {
		throws(function() {
			mainModule.KOMSpacingModelLabel(null);
		}, /KOMErrorInputNotValid/);
	});

	it('throws error if not valid', function() {
		throws(function() {
			mainModule.KOMSpacingModelLabel('bravoforward');
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.KOMSpacingModelLabel('bravo-forward'), 'forward');
	});

});

describe('KOMSpacingModelLabelForward', function test_KOMSpacingModelLabelForward() {

	it('returns string', function() {
		deepEqual(mainModule.KOMSpacingModelLabelForward(), 'forward');
	});

});

describe('KOMSpacingModelLabelBackward', function test_KOMSpacingModelLabelBackward() {

	it('returns string', function() {
		deepEqual(mainModule.KOMSpacingModelLabelBackward(), 'backward');
	});

});

describe('KOMSpacingModelErrorsFor', function test_KOMSpacingModelErrorsFor() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.KOMSpacingModelErrorsFor(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns object if KOMSpacingID not string', function() {
		deepEqual(mainModule.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingID: null,
		})), {
			KOMSpacingID: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns object if KOMSpacingID not separated', function() {
		deepEqual(mainModule.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingID: 'alfaforward',
		})), {
			KOMSpacingID: [
				'KOMErrorNotSeparated',
			],
		});
	});

	it('returns object if KOMSpacingID not filled', function() {
		deepEqual(mainModule.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingID: '-forward',
		})), {
			KOMSpacingID: [
				'KOMErrorNotFilled',
			],
		});
	});

	it('returns object if KOMSpacingID not labelled', function() {
		deepEqual(mainModule.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingID: 'alfa-bravo',
		})), {
			KOMSpacingID: [
				'KOMErrorNotLabelled',
			],
		});
	});

	it('returns null', function() {
		deepEqual(mainModule.KOMSpacingModelErrorsFor(kTesting.StubSpacingObjectValid()), null);
		deepEqual(mainModule.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingID: 'alfa-backward',
		})), null);
	});

	context('KOMSpacingDueDate', function() {

		it('returns object if not date', function() {
			deepEqual(mainModule.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingDueDate: null,
			})), {
				KOMSpacingDueDate: [
					'KOMErrorNotDate',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mainModule.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingDueDate: new Date(),
			})), null);
		});

	});

	context('KOMSpacingIsLearning', function() {

		it('returns object if not boolean', function() {
			deepEqual(mainModule.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingIsLearning: null,
			})), {
				KOMSpacingIsLearning: [
					'KOMErrorNotBoolean',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mainModule.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingIsLearning: true,
			})), null);
		});

	});

	context('KOMSpacingIsReadyToGraduate', function() {

		it('returns object if not boolean', function() {
			deepEqual(mainModule.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingIsReadyToGraduate: null,
			})), {
				KOMSpacingIsReadyToGraduate: [
					'KOMErrorNotBoolean',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mainModule.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingIsReadyToGraduate: true,
			})), null);
		});

	});

	context('KOMSpacingInterval', function() {

		it('returns object if not number', function() {
			deepEqual(mainModule.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingInterval: null,
			})), {
				KOMSpacingInterval: [
					'KOMErrorNotNumber',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mainModule.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingInterval: 1,
			})), null);
		});

	});

	context('KOMSpacingMultiplier', function() {

		it('returns object if not number', function() {
			deepEqual(mainModule.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingMultiplier: null,
			})), {
				KOMSpacingMultiplier: [
					'KOMErrorNotNumber',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mainModule.KOMSpacingModelErrorsFor(Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingMultiplier: 1,
			})), null);
		});

	});

});

describe('KOMSpacingModelIsForward', function() {

	it('throws if not valid', function () {
		throws(function () {
			mainModule.KOMSpacingModelIsForward({})
		}, /KOMErrorInputNotValid/);
	});

	it('returns false if backward', function () {
		deepEqual(mainModule.KOMSpacingModelIsForward(Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingID: 'bravo-backward',
		})), false);
	});

	it('returns true', function () {
		deepEqual(mainModule.KOMSpacingModelIsForward(kTesting.StubSpacingObjectValid()), true);
	});

});

describe('KOMSpacingModelPreJSONSchemaValidate', function test_KOMSpacingModelPreJSONSchemaValidate() {

	it('returns input', function() {
		deepEqual(mainModule.KOMSpacingModelPreJSONSchemaValidate({}), {});
	});

	it('returns input with KOMSpacingDueDate as string', function() {
		deepEqual(mainModule.KOMSpacingModelPreJSONSchemaValidate({
			KOMSpacingDueDate: new Date('2018-12-09T19:07:01.902Z'),
		}), {
			KOMSpacingDueDate: '2018-12-09T19:07:01.902Z',
		});
	});

});

describe('KOMSpacingModelPostJSONParse', function test_KOMSpacingModelPostJSONParse() {

	it('returns input null', function() {
		deepEqual(mainModule.KOMSpacingModelPostJSONParse(null), null);
	});

	it('returns input object', function() {
		deepEqual(mainModule.KOMSpacingModelPostJSONParse({}), {});
	});

	it('returns input with KOMSpacingDueDate as date', function() {
		deepEqual(mainModule.KOMSpacingModelPostJSONParse({
			KOMSpacingDueDate: '2018-12-09T19:07:01.902Z',
		}), {
			KOMSpacingDueDate: new Date('2018-12-09T19:07:01.902Z'),
		});
	});

});
