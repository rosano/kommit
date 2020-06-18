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

describe('KOMReviewToday_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMReviewTodaySpacings: JSON.stringify([
				kTesting.StubSpacingObjectValid(),
				]),
		});
	});

	describe('KOMReviewTodayTotalCardsValue', function test_KOMReviewTodayTotalCardsValue() {
		
		it('sets text', function () {
			browser.assert.text(KOMReviewTodayTotalCardsValue, '1');
		});

	});

	describe('KOMReviewTodayTimeMinutesValue', function test_KOMReviewTodayTimeMinutesValue() {
		
		it('sets text', function () {
			browser.assert.text(KOMReviewTodayTimeMinutesValue, '0.2');
		});

	});

});
