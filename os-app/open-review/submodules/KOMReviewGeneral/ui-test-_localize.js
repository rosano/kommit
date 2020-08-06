const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	describe(`KOMReviewGeneral_Localize-${ languageCode }`, function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage: languageCode,
				KOMReviewGeneralSpacings: JSON.stringify([
					Object.assign(StubSpacingObjectValid(), {
						KOMSpacingInterval: 1,
						KOMSpacingDueDate: new Date(),
					}),
					StubSpacingObjectHistorical(),
				]),
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
