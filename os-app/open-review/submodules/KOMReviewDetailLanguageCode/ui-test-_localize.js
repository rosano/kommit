const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	describe(`KOMReviewDetailLanguageCode_Localize-${ languageCode }`, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage: languageCode,
				KOMReviewDetailLanguageCodeItem: JSON.stringify({
					KOMCardFront: 'alfa',
					KOMCardRear: 'bravo',
				}),
				KOMReviewDetailLanguageCodeItemProperty: 'KOMDeckFrontLanguageCode',
			});
		});

		it('localizes KOMReviewDetailLanguageCodeFieldLabel', function () {
			browser.assert.text(KOMReviewDetailLanguageCodeFieldLabel, uLocalized('KOMReviewDetailLanguageCodeFieldLabelText'));
		});

		it('localizes KOMReviewDetailLanguageCodeFieldOptionPlaceholder', function () {
			browser.assert.text(KOMReviewDetailLanguageCodeFieldOptionPlaceholder, uLocalized('KOMReviewDetailLanguageCodeFieldOptionPlaceholderText'));
		});

		it('localizes KOMReviewDetailLanguageCodeFieldOptionDefault', function () {
			browser.assert.text(KOMReviewDetailLanguageCodeFieldOptionDefault, uLocalized('KOMReviewDetailLanguageCodeFieldOptionDefaultText'));
		});

	});

});
