const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMReviewGeneral_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMReviewGeneralSpacings: JSON.stringify([
				Object.assign(StubSpacingObjectValid(), {
					KOMSpacingInterval: 1,
				}),
				Object.assign(StubSpacingObjectValid(), {
					KOMSpacingInterval: 21,
				}),
			]),
		});
	});

	describe('KOMReviewChartCompositionStates', function test_KOMReviewChartCompositionStates() {

		it('sets KOMReviewChartCompositionStatesData', function () {
			browser.assert.text('.KOMReviewChartCompositionStates .KOMReviewChartCompositionStatesTotalCardsValue', '1');
			browser.assert.text('.KOMReviewChartCompositionStates .KOMReviewChartCompositionStatesDevelopingCardsValue', '1');
			browser.assert.text('.KOMReviewChartCompositionStates .KOMReviewChartCompositionStatesMatureCardsValue', '1');
		});

	});

});
