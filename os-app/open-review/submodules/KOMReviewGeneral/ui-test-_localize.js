const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe(`KOMReviewGeneral_Localize-${ OLSKRoutingLanguage }`, function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
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
