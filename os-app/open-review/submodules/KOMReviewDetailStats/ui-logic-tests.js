const { throws, deepEqual } = require('assert');

const mainModule = require('./ui-logic.js').default;

const kTesting = {
	StubChronicleObjectValid (inputData) {
		return {
			KOMChronicleDrawDate: inputData,
			KOMChronicleFlipDate: inputData,
			KOMChronicleResponseDate: new Date(inputData.valueOf() + 10000),
			KOMChronicleResponseType: 'alfa',
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

describe('KOMReviewDetailStatsTotalCards', function test_KOMReviewDetailStatsTotalCards() {

	it('throws if not array', function () {
		throws(function () {
			mainModule.KOMReviewDetailStatsTotalCards(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns number', function() {
		deepEqual(mainModule.KOMReviewDetailStatsTotalCards([]), 0);
	});

	it('counts spacing object', function() {
		deepEqual(mainModule.KOMReviewDetailStatsTotalCards([kTesting.StubSpacingObjectValid(), Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingID: 'bravo-forward',
		})]), 2);
	});

	it('counts siblings as one', function() {
		deepEqual(mainModule.KOMReviewDetailStatsTotalCards([kTesting.StubSpacingObjectValid(), Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingID: 'alfa-backward',
		})]), 1);
	});

});

describe('KOMReviewDetailStatsTotalTime', function test_KOMReviewDetailStatsTotalTime() {

	it('throws if not array', function () {
		throws(function () {
			mainModule.KOMReviewDetailStatsTotalTime(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns number', function() {
		deepEqual(mainModule.KOMReviewDetailStatsTotalTime([]), 0);
	});

	it('counts time until response', function() {
		deepEqual(mainModule.KOMReviewDetailStatsTotalTime([kTesting.StubSpacingObjectValid()]), 10000);
	});

	it('counts multiple spacings', function() {
		deepEqual(mainModule.KOMReviewDetailStatsTotalTime([kTesting.StubSpacingObjectValid(), kTesting.StubSpacingObjectValid()]), 20000);
	});

	it('counts multiple chronicles from today', function() {
		deepEqual(mainModule.KOMReviewDetailStatsTotalTime([Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingChronicles: [
				kTesting.StubChronicleObjectValid(new Date()),
				kTesting.StubChronicleObjectValid(new Date()),
			],			
		})]), 20000);
	});

	it('ignores chronicle from other days', function() {
		deepEqual(mainModule.KOMReviewDetailStatsTotalTime([Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingChronicles: [
				kTesting.StubChronicleObjectValid(new Date(Date.now() - 1000 * 60 * 60 * 24 * 3)),
			],			
		})]), 0);
	});

});
