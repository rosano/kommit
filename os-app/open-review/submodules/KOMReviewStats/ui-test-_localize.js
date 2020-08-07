const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	describe(`KOMReviewStats_Localize-${ languageCode }`, function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage: languageCode,
				KOMReviewTodaySpacings: JSON.stringify([]),
				KOMReviewGeneralSpacings: JSON.stringify([]),
			});
		});

		it('localizes KOMReviewStatsHeading', function () {
			browser.assert.text(KOMReviewStatsHeading, uLocalized('KOMReviewStatsHeadingText'));
		});

	});

});
