const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	describe(`KOMReviewGeneral_Localize-${ languageCode }`, function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage: languageCode,
				KOMReviewGeneralSpacings: JSON.stringify([]),
			});
		});

		it('localizes KOMReviewGeneralCollectionHeading', function () {
			browser.assert.text(KOMReviewGeneralCollectionHeading, uLocalized('KOMReviewGeneralCollectionHeadingText'));
		});

	});

});
