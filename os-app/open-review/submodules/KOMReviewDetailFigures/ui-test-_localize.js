const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	describe(`KOMReviewDetailFigures_Localize-${ languageCode }`, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage: languageCode,
				KOMReviewDetailFiguresSpacings: JSON.stringify([]),
			});
		});

		it('localizes KOMReviewDetailFiguresTotalCardsLabel', function () {
			browser.assert.text(KOMReviewDetailFiguresTotalCardsLabel, uLocalized('KOMReviewDetailFiguresTotalCardsLabelText'));
		});

		it('localizes KOMReviewDetailFiguresTotalMinutesLabel', function () {
			browser.assert.text(KOMReviewDetailFiguresTotalMinutesLabel, uLocalized('KOMReviewDetailFiguresTotalMinutesLabelText'));
		});

	});

});
