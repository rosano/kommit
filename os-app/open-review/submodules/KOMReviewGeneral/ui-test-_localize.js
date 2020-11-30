const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (languageCode) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	describe(`KOMReviewGeneral_Localize-${ languageCode }`, function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage: languageCode,
				KOMReviewGeneralUpcomingData: JSON.stringify([{
					KOMReviewChartElementDateBarTableRowDataKey: 'alfa',
					KOMReviewChartElementDateBarTableRowDataValues: [1, 2],
				}]),
				KOMReviewGeneralHistoricalData: JSON.stringify([{
					KOMReviewChartElementDateBarTableRowDataKey: 'alfa',
					KOMReviewChartElementDateBarTableRowDataValues: [1, 2, 3, 4],
				}]),
			});
		});

		it('localizes KOMReviewGeneralUpcomingHeading', function () {
			browser.assert.text(KOMReviewGeneralUpcomingHeading, uLocalized('KOMReviewGeneralUpcomingHeadingText'));
		});

		it('localizes KOMReviewGeneralHistoricalHeading', function () {
			browser.assert.text(KOMReviewGeneralHistoricalHeading, uLocalized('KOMReviewGeneralHistoricalHeadingText'));
		});

		it('localizes KOMReviewGeneralCollectionHeading', function () {
			browser.assert.text(KOMReviewGeneralCollectionHeading, uLocalized('KOMReviewGeneralCollectionHeadingText'));
		});

	});

});
