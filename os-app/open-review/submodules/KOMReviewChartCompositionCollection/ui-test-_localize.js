const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (languageCode) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	describe(`KOMReviewChartCompositionCollection_Localize-${ languageCode }`, function () {
		
		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage: languageCode,
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

		it('localizes KOMReviewChartCompositionCollectionRetiredCardsLabel', function () {
			browser.assert.text(KOMReviewChartCompositionCollectionRetiredCardsLabel, uLocalized('KOMReviewChartCompositionCollectionRetiredCardsLabelText'));
		});

	});

});
