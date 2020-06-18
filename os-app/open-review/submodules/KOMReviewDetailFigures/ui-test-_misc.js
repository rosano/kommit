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

describe('KOMReviewDetailFigures_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMReviewDetailFiguresSpacings: JSON.stringify([
				kTesting.StubSpacingObjectValid(),
				]),
		});
	});

	describe('KOMReviewDetailFiguresTotalCardsValue', function test_KOMReviewDetailFiguresTotalCardsValue() {
		
		it('sets text', function () {
			browser.assert.text(KOMReviewDetailFiguresTotalCardsValue, '1');
		});

	});

	describe('KOMReviewDetailFiguresTimeMinutesValue', function test_KOMReviewDetailFiguresTimeMinutesValue() {
		
		it('sets text', function () {
			browser.assert.text(KOMReviewDetailFiguresTimeMinutesValue, '0.2');
		});

	});

});
