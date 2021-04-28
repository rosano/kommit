const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe('KOMReviewDetailLanguageCode_Localize-' + OLSKRoutingLanguage, function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
				KOMReviewDetailLanguageCodeItem: JSON.stringify({
					KOMDeckName: 'alfa',
				}),
				KOMReviewDetailLanguageCodeItemProperty: 'KOMDeckFrontLanguageCode',
				KOMReviewDetailLanguageCodeOptions: JSON.stringify([]),
			});
		});

		it('localizes KOMReviewDetailLanguageCodeFieldLabel', function () {
			browser.assert.text(KOMReviewDetailLanguageCodeFieldLabel, uLocalized('KOMReviewDetailLanguageCodeFieldLabelText'));
		});

		it('localizes KOMReviewDetailLanguageCodeFieldOptionUnspecified', function () {
			browser.assert.text(KOMReviewDetailLanguageCodeFieldOptionUnspecified, uLocalized('KOMReviewDetailLanguageCodeFieldOptionUnspecifiedText'));
		});

	});

});
