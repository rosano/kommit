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

	describe('KOMReviewChartCompositionCollection', function test_KOMReviewChartCompositionCollection() {

		it('sets KOMReviewChartCompositionCollectionData', function () {
			browser.assert.text('.KOMReviewChartCompositionCollection .KOMReviewChartCompositionCollectionTotalCardsValue', '1');
			browser.assert.text('.KOMReviewChartCompositionCollection .KOMReviewChartCompositionCollectionUnseenCardsValue', '1');
			browser.assert.text('.KOMReviewChartCompositionCollection .KOMReviewChartCompositionCollectionDevelopingCardsValue', '1');
			browser.assert.text('.KOMReviewChartCompositionCollection .KOMReviewChartCompositionCollectionMatureCardsValue', '1');
		});

	});

});
