const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

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
			KOMSpacingID: Math.random() + '-forward',
			KOMSpacingChronicles: inputData,
		};
	},
};

describe('KOMReviewToday_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMReviewTodaySpacings: JSON.stringify([
				kTesting.StubSpacingObjectValid([
					Object.assign(kTesting.StubChronicleObjectValid(kTesting.StubPastDate()), {
						KOMChronicleMultiplier: 1,
					}),
					kTesting.StubChronicleObjectValid(),
				]),
				kTesting.StubSpacingObjectValid([
					Object.assign(kTesting.StubChronicleObjectValid(kTesting.StubPastDate()), {
						KOMChronicleMultiplier: 1,
					}),
					Object.assign(kTesting.StubChronicleObjectValid(), {
						KOMChronicleResponseType: KOMPlayLogic.KOMPlayResponseTypeAgain(),
					}),
				]),
				kTesting.StubSpacingObjectValid([
					Object.assign(kTesting.StubChronicleObjectValid(kTesting.StubPastDate()), {
						KOMChronicleMultiplier: 1,
					}),
					Object.assign(kTesting.StubChronicleObjectValid(), {
						KOMChronicleResponseType: KOMPlayLogic.KOMPlayResponseTypeAgain(),
					}),
				]),
			]),
		});
	});

	describe('KOMReviewTodayTotalCardsValue', function test_KOMReviewTodayTotalCardsValue() {

		it('sets text', function () {
			browser.assert.text(KOMReviewTodayTotalCardsValue, '3');
		});

	});

	describe('KOMReviewTodayTimeMinutesValue', function test_KOMReviewTodayTimeMinutesValue() {

		it('sets text', function () {
			browser.assert.text(KOMReviewTodayTimeMinutesValue, '0.5');
		});

	});

	describe('KOMReviewTodayReviewAccuracyValue', function test_KOMReviewTodayReviewAccuracyValue() {

		it('sets text', function () {
			browser.assert.text(KOMReviewTodayReviewAccuracyValue, '33.3');
		});

	});

});
