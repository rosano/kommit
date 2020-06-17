const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	describe(`KOMReviewDetailStats_Localize-${ languageCode }`, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage: languageCode,
				KOMReviewDetailStatsSpacings: JSON.stringify([]),
			});
		});

		it('localizes KOMReviewDetailStatsTotalCardsLabel', function () {
			browser.assert.text(KOMReviewDetailStatsTotalCardsLabel, uLocalized('KOMReviewDetailStatsTotalCardsLabelText'));
		});

		it('localizes KOMReviewDetailStatsTotalMinutesLabel', function () {
			browser.assert.text(KOMReviewDetailStatsTotalMinutesLabel, uLocalized('KOMReviewDetailStatsTotalMinutesLabelText'));
		});

	});

});
