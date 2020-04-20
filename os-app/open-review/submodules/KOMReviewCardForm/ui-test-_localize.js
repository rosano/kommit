const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	describe(`KOMReviewCardForm_Localize-${ languageCode }`, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewCardFormItem: JSON.stringify({}),
			});
		});

		it('localizes KOMReviewCardFormToolbarCancelButton', function () {
			browser.assert.text(KOMReviewCardFormToolbarCancelButton, uLocalized('KOMReviewCardFormToolbarCancelButtonText'));
		});

		it('localizes KOMReviewCardFormToolbarSaveButton', function () {
			browser.assert.text(KOMReviewCardFormToolbarSaveButton, uLocalized('KOMReviewCardFormToolbarSaveButtonText'));
		});

		it('localizes KOMReviewCardFormHeading', function () {
			browser.assert.text(KOMReviewCardFormHeading, uLocalized('KOMReviewCardFormHeadingText'));
		});

	});

});
