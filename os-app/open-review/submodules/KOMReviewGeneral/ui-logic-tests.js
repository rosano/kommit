const { throws, deepEqual } = require('assert');

const mainModule = require('./ui-logic.js').default;
const KOMPlayLogic = require('../../../sub-play/ui-logic.js').default;

const kTesting = {
	StubPastDate() {
		return new Date(Date.now() - 1000 * 60 * 60 * 24 * 3);
	},
	StubChronicleObjectValid(inputData = new Date()) {
		return {
			KOMChronicleDrawDate: inputData,
			KOMChronicleFlipDate: inputData,
			KOMChronicleResponseDate: new Date(inputData.valueOf() + 10000),
			KOMChronicleResponseType: KOMPlayLogic.KOMPlayResponseTypeEasy(),
			KOMChronicleDueDate: inputData,
		};
	},
	StubSpacingObjectValid(inputData = [kTesting.StubChronicleObjectValid()]) {
		return {
			KOMSpacingID: 'alfa-forward',
			KOMSpacingChronicles: inputData,
		};
	},
};

describe('KOMReviewGeneralTotalCards', function test_KOMReviewGeneralTotalCards() {

	it('throws if not array', function () {
		throws(function () {
			mainModule.KOMReviewGeneralTotalCards(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns number', function () {
		deepEqual(mainModule.KOMReviewGeneralTotalCards([]), 0);
	});

	it('counts spacing object', function () {
		deepEqual(mainModule.KOMReviewGeneralTotalCards([kTesting.StubSpacingObjectValid(), Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingID: 'bravo-forward',
		})]), 2);
	});

	it('counts siblings as one', function () {
		deepEqual(mainModule.KOMReviewGeneralTotalCards([kTesting.StubSpacingObjectValid(), Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingID: 'alfa-backward',
		})]), 1);
	});

});

describe('KOMReviewGeneralTotalMilliseconds', function test_KOMReviewGeneralTotalMilliseconds() {

	it('throws if not array', function () {
		throws(function () {
			mainModule.KOMReviewGeneralTotalMilliseconds(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns number', function () {
		deepEqual(mainModule.KOMReviewGeneralTotalMilliseconds([]), 0);
	});

	it('counts time until response', function () {
		deepEqual(mainModule.KOMReviewGeneralTotalMilliseconds([kTesting.StubSpacingObjectValid()]), 10000);
	});

	it('counts multiple spacings', function () {
		deepEqual(mainModule.KOMReviewGeneralTotalMilliseconds([kTesting.StubSpacingObjectValid(), kTesting.StubSpacingObjectValid()]), 20000);
	});

	it('counts multiple chronicles from today', function () {
		deepEqual(mainModule.KOMReviewGeneralTotalMilliseconds([kTesting.StubSpacingObjectValid([
			kTesting.StubChronicleObjectValid(),
			kTesting.StubChronicleObjectValid(),
		])]), 20000);
	});

	it('ignores chronicle from other days', function () {
		deepEqual(mainModule.KOMReviewGeneralTotalMilliseconds([kTesting.StubSpacingObjectValid([
			kTesting.StubChronicleObjectValid(kTesting.StubPastDate()),
		])]), 0);
	});

});

describe('KOMReviewGeneralMinutes', function test_KOMReviewGeneralMinutes() {

	it('throws if not number', function () {
		throws(function () {
			mainModule.KOMReviewGeneralMinutes('10000');
		}, /KOMErrorInputNotValid/);
	});

	it('returns number', function () {
		deepEqual(mainModule.KOMReviewGeneralMinutes(60000), 1);
	});

	it('calculates fraction', function () {
		deepEqual(mainModule.KOMReviewGeneralMinutes(30000), 0.5);
	});

	it('rounds to first decimal', function () {
		deepEqual(mainModule.KOMReviewGeneralMinutes(15000), 0.3);
	});

});

describe('KOMReviewGeneralReviewAccuracy', function test_KOMReviewGeneralReviewAccuracy() {

	it('throws if not array', function () {
		throws(function () {
			mainModule.KOMReviewGeneralReviewAccuracy(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns number', function () {
		deepEqual(mainModule.KOMReviewGeneralReviewAccuracy([]), 0);
	});

	it('excludes if no KOMChronicleMultiplier', function () {
		deepEqual(mainModule.KOMReviewGeneralReviewAccuracy([kTesting.StubSpacingObjectValid()]), 0);
	});

	it('excludes if unseen today', function () {
		deepEqual(mainModule.KOMReviewGeneralReviewAccuracy([kTesting.StubSpacingObjectValid()]), 0);
	});

	it('excludes if not today', function () {
		deepEqual(mainModule.KOMReviewGeneralReviewAccuracy([kTesting.StubSpacingObjectValid([
			Object.assign(kTesting.StubChronicleObjectValid(kTesting.StubPastDate()), {
				KOMChronicleMultiplier: 1,
			}),
			kTesting.StubChronicleObjectValid(kTesting.StubPastDate()),
		])]), 0);
	});

	it('excludes if not first error', function () {
		deepEqual(mainModule.KOMReviewGeneralReviewAccuracy([kTesting.StubSpacingObjectValid([
			Object.assign(kTesting.StubChronicleObjectValid(), {
				KOMChronicleResponseType: KOMPlayLogic.KOMPlayResponseTypeAgain(),
			}),
		])]), 0);
	});

	it('calculates if correct', function () {
		deepEqual(mainModule.KOMReviewGeneralReviewAccuracy([kTesting.StubSpacingObjectValid([
			Object.assign(kTesting.StubChronicleObjectValid(kTesting.StubPastDate()), {
				KOMChronicleMultiplier: 1,
			}),
			kTesting.StubChronicleObjectValid(),
		])]), 1);
	});

	it('calculates if not correct', function () {
		deepEqual(mainModule.KOMReviewGeneralReviewAccuracy([kTesting.StubSpacingObjectValid([
			Object.assign(kTesting.StubChronicleObjectValid(kTesting.StubPastDate()), {
				KOMChronicleMultiplier: 1,
			}),
			Object.assign(kTesting.StubChronicleObjectValid(), {
				KOMChronicleResponseType: KOMPlayLogic.KOMPlayResponseTypeAgain(),
			}),
		])]), 0);
	});

	it('calculates if multiple', function () {
		deepEqual(mainModule.KOMReviewGeneralReviewAccuracy([kTesting.StubSpacingObjectValid([
			Object.assign(kTesting.StubChronicleObjectValid(kTesting.StubPastDate()), {
				KOMChronicleMultiplier: 1,
			}),
			kTesting.StubChronicleObjectValid(),
		]), kTesting.StubSpacingObjectValid([
			Object.assign(kTesting.StubChronicleObjectValid(kTesting.StubPastDate()), {
				KOMChronicleMultiplier: 1,
			}),
			Object.assign(kTesting.StubChronicleObjectValid(), {
				KOMChronicleResponseType: KOMPlayLogic.KOMPlayResponseTypeAgain(),
			}),
		])]), 0.5);
	});

});

describe('KOMReviewGeneralPercentage', function test_KOMReviewGeneralPercentage() {

	it('throws if not number', function () {
		throws(function () {
			mainModule.KOMReviewGeneralPercentage('10000');
		}, /KOMErrorInputNotValid/);
	});

	it('returns number', function () {
		deepEqual(mainModule.KOMReviewGeneralPercentage(1), 100);
	});

	it('calculates fraction', function () {
		deepEqual(mainModule.KOMReviewGeneralPercentage(0.5), 50);
	});

	it('rounds to first decimal', function () {
		deepEqual(mainModule.KOMReviewGeneralPercentage(1.0 / 3), 33.3);
	});

});
