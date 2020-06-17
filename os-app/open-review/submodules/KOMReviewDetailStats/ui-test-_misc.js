const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

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

describe('KOMReviewDetailStats_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMReviewDetailStatsSpacings: JSON.stringify([
				kTesting.StubSpacingObjectValid(),
				]),
		});
	});

	describe('KOMReviewDetailStatsTotalCardsValue', function test_KOMReviewDetailStatsTotalCardsValue() {
		
		it('sets text', function () {
			browser.assert.text(KOMReviewDetailStatsTotalCardsValue, '1');
		});

	});

});
