const { throws, deepEqual } = require('assert');

const mainModule = require('./ui-logic.js').default;
const KOMPlayLogic = require('../../../sub-play/ui-logic.js').default;

const kTesting = {
	StubChronicleObjectValid (inputData) {
		return {
			KOMChronicleDrawDate: inputData,
			KOMChronicleFlipDate: inputData,
			KOMChronicleResponseDate: new Date(inputData.valueOf() + 10000),
			KOMChronicleResponseType: KOMPlayLogic.KOMPlayResponseTypeEasy(),
			KOMChronicleDueDate: inputData,
		};
	},
	StubSpacingObjectValid() {
		return {
			KOMSpacingID: 'alfa-forward',
			KOMSpacingChronicles: [
				kTesting.StubChronicleObjectValid(new Date()),
			],
		};
	},
};

describe('KOMReviewTodayTotalCards', function test_KOMReviewTodayTotalCards() {

	it('throws if not array', function () {
		throws(function () {
			mainModule.KOMReviewTodayTotalCards(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns number', function() {
		deepEqual(mainModule.KOMReviewTodayTotalCards([]), 0);
	});

	it('counts spacing object', function() {
		deepEqual(mainModule.KOMReviewTodayTotalCards([kTesting.StubSpacingObjectValid(), Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingID: 'bravo-forward',
		})]), 2);
	});

	it('counts siblings as one', function() {
		deepEqual(mainModule.KOMReviewTodayTotalCards([kTesting.StubSpacingObjectValid(), Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingID: 'alfa-backward',
		})]), 1);
	});

});

describe('KOMReviewTodayTotalMilliseconds', function test_KOMReviewTodayTotalMilliseconds() {

	it('throws if not array', function () {
		throws(function () {
			mainModule.KOMReviewTodayTotalMilliseconds(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns number', function() {
		deepEqual(mainModule.KOMReviewTodayTotalMilliseconds([]), 0);
	});

	it('counts time until response', function() {
		deepEqual(mainModule.KOMReviewTodayTotalMilliseconds([kTesting.StubSpacingObjectValid()]), 10000);
	});

	it('counts multiple spacings', function() {
		deepEqual(mainModule.KOMReviewTodayTotalMilliseconds([kTesting.StubSpacingObjectValid(), kTesting.StubSpacingObjectValid()]), 20000);
	});

	it('counts multiple chronicles from today', function() {
		deepEqual(mainModule.KOMReviewTodayTotalMilliseconds([Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingChronicles: [
				kTesting.StubChronicleObjectValid(new Date()),
				kTesting.StubChronicleObjectValid(new Date()),
			],			
		})]), 20000);
	});

	it('ignores chronicle from other days', function() {
		deepEqual(mainModule.KOMReviewTodayTotalMilliseconds([Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingChronicles: [
				kTesting.StubChronicleObjectValid(new Date(Date.now() - 1000 * 60 * 60 * 24 * 3)),
			],			
		})]), 0);
	});

});

describe('KOMReviewTodayMinutes', function test_KOMReviewTodayMinutes() {

	it('throws if not number', function () {
		throws(function () {
			mainModule.KOMReviewTodayMinutes('10000');
		}, /KOMErrorInputNotValid/);
	});

	it('returns number', function() {
		deepEqual(mainModule.KOMReviewTodayMinutes(60000), 1);
	});

	it('calculates fraction', function() {
		deepEqual(mainModule.KOMReviewTodayMinutes(30000), 0.5);
	});

	it('rounds to first decimal', function() {
		deepEqual(mainModule.KOMReviewTodayMinutes(15000), 0.3);
	});

});

describe('KOMReviewTodayReviewAccuracy', function test_KOMReviewTodayReviewAccuracy() {

	it('throws if not array', function () {
		throws(function () {
			mainModule.KOMReviewTodayReviewAccuracy(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns number', function() {
		deepEqual(mainModule.KOMReviewTodayReviewAccuracy([]), 0);
	});

	it('excludes if no KOMChronicleMultiplier', function() {
		deepEqual(mainModule.KOMReviewTodayReviewAccuracy([kTesting.StubSpacingObjectValid()]), 0);
	});

	it('excludes if unseen today', function() {
		deepEqual(mainModule.KOMReviewTodayReviewAccuracy([kTesting.StubSpacingObjectValid()]), 0);
	});

	it('excludes if not today', function() {
		deepEqual(mainModule.KOMReviewTodayReviewAccuracy([Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingChronicles: [
			Object.assign(kTesting.StubChronicleObjectValid(new Date(Date.now() - 1000 * 60 * 60 * 24 * 3)), {
				KOMChronicleMultiplier: 1,
			}),
			kTesting.StubChronicleObjectValid(new Date(Date.now() - 1000 * 60 * 60 * 24 * 3)),
			],			
		})]), 0);
	});

	it('excludes if not first error', function() {
		deepEqual(mainModule.KOMReviewTodayReviewAccuracy([Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingChronicles: [
				Object.assign(kTesting.StubChronicleObjectValid(new Date()), {
					KOMChronicleResponseType: KOMPlayLogic.KOMPlayResponseTypeAgain(),
				}),
			],			
		})]), 0);
	});

	it('calculates if correct', function() {
		deepEqual(mainModule.KOMReviewTodayReviewAccuracy([Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingChronicles: [
				Object.assign(kTesting.StubChronicleObjectValid(new Date(Date.now() - 1000 * 60 * 60 * 24 * 3)), {
					KOMChronicleMultiplier: 1,
				}),
				kTesting.StubChronicleObjectValid(new Date()),
			],			
		})]), 1);
	});

	it('calculates if not correct', function() {
		deepEqual(mainModule.KOMReviewTodayReviewAccuracy([Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingChronicles: [
				Object.assign(kTesting.StubChronicleObjectValid(new Date(Date.now() - 1000 * 60 * 60 * 24 * 3)), {
					KOMChronicleMultiplier: 1,
				}),
				Object.assign(kTesting.StubChronicleObjectValid(new Date()), {
					KOMChronicleResponseType: KOMPlayLogic.KOMPlayResponseTypeAgain(),
				})
			],			
		})]), 0);
	});

	it('calculates if multiple', function() {
		deepEqual(mainModule.KOMReviewTodayReviewAccuracy([Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingChronicles: [
				Object.assign(kTesting.StubChronicleObjectValid(new Date(Date.now() - 1000 * 60 * 60 * 24 * 3)), {
					KOMChronicleMultiplier: 1,
				}),
				kTesting.StubChronicleObjectValid(new Date()),
			],			
		}), Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingChronicles: [
				Object.assign(kTesting.StubChronicleObjectValid(new Date(Date.now() - 1000 * 60 * 60 * 24 * 3)), {
					KOMChronicleMultiplier: 1,
				}),
				Object.assign(kTesting.StubChronicleObjectValid(new Date()), {
					KOMChronicleResponseType: KOMPlayLogic.KOMPlayResponseTypeAgain(),
				})
			],			
		})]), 0.5);
	});

});
