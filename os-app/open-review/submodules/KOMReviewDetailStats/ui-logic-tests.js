const { throws, deepEqual } = require('assert');

const mainModule = require('./ui-logic.js').default;

const kTesting = {
	StubChronicleObjectPrepared () {
		return {
			KOMChronicleDrawDate: new Date('2019-02-23T12:00:00Z'),
			KOMChronicleFlipDate: new Date('2019-02-23T12:00:00Z'),
			KOMChronicleResponseDate: new Date('2019-02-23T12:00:00Z'),
			KOMChronicleResponseType: mainModule.KOMPlayResponseTypeEasy(),
		};
	},
	StubChronicleObjectValid () {
		return Object.assign(kTesting.StubChronicleObjectPrepared(), {
			KOMChronicleDueDate: new Date('2019-02-23T12:00:00Z'),
		});
	},
	StubSpacingObjectValid() {
		return {
			KOMSpacingID: 'alfa-forward',
			KOMSpacingChronicles: [],
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
