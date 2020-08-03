const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMReviewGeneral_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMReviewGeneralSpacings: JSON.stringify([
				StubSpacingObjectValid(),
				Object.assign(StubSpacingObjectValid(), {
					KOMSpacingInterval: 1,
				}),
				Object.assign(StubSpacingObjectValid(), {
					KOMSpacingInterval: 21,
				}),
			].reduce(function (coll, item) {
				return coll.concat([item, Object.assign(Object.assign({}, item), {
					KOMSpacingID: item.KOMSpacingID.replace('forward', 'backward'),
				})]);
			}, [])),
		});
	});

	describe('KOMReviewChartCompositionStates', function test_KOMReviewChartCompositionStates() {

		it('sets KOMReviewChartCompositionStatesData', function () {
			browser.assert.text('.KOMReviewChartCompositionStates .KOMReviewChartCompositionStatesTotalCardsValue', '1');
			browser.assert.text('.KOMReviewChartCompositionStates .KOMReviewChartCompositionStatesUnseenCardsValue', '1');
			browser.assert.text('.KOMReviewChartCompositionStates .KOMReviewChartCompositionStatesDevelopingCardsValue', '1');
			browser.assert.text('.KOMReviewChartCompositionStates .KOMReviewChartCompositionStatesMatureCardsValue', '1');
		});

	});

});
