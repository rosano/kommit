const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	describe(`KOMReviewChartCompositionCollection_Localize-${ languageCode }`, function () {
		
		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage: languageCode,
				KOMReviewChartCompositionCollectionData: JSON.stringify({
					KOMReviewChartCompositionCollectionTotal: 1,
					KOMReviewChartCompositionCollectionUnseen: 2,
					KOMReviewChartCompositionCollectionDeveloping: 2,
					KOMReviewChartCompositionCollectionMature: 3,
					KOMReviewChartCompositionCollectionSuspended: 4,
				}),
			});
		});

		it('localizes KOMReviewChartCompositionCollectionTotalCardsLabel', function () {
			browser.assert.text(KOMReviewChartCompositionCollectionTotalCardsLabel, uLocalized('KOMReviewChartCompositionCollectionTotalCardsLabelText'));
		});

		it('localizes KOMReviewChartCompositionCollectionUnseenCardsLabel', function () {
			browser.assert.text(KOMReviewChartCompositionCollectionUnseenCardsLabel, uLocalized('KOMReviewChartCompositionCollectionUnseenCardsLabelText'));
		});

		it('localizes KOMReviewChartCompositionCollectionDevelopingCardsLabel', function () {
			browser.assert.text(KOMReviewChartCompositionCollectionDevelopingCardsLabel, uLocalized('KOMReviewChartCompositionCollectionDevelopingCardsLabelText'));
		});

		it('localizes KOMReviewChartCompositionCollectionMatureCardsLabel', function () {
			browser.assert.text(KOMReviewChartCompositionCollectionMatureCardsLabel, uLocalized('KOMReviewChartCompositionCollectionMatureCardsLabelText'));
		});

		it('localizes KOMReviewChartCompositionCollectionSuspendedCardsLabel', function () {
			browser.assert.text(KOMReviewChartCompositionCollectionSuspendedCardsLabel, uLocalized('KOMReviewChartCompositionCollectionSuspendedCardsLabelText'));
		});

	});

});
