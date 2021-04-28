const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe('KOMReviewToday_Localize-' + OLSKRoutingLanguage, function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
			});
		});

		it('localizes KOMReviewTodayHeading', function () {
			browser.assert.text(KOMReviewTodayHeading, uLocalized('KOMReviewTodayHeadingText'));
		});

		it('localizes KOMReviewTodayTotalCardsLabel', function () {
			browser.assert.text(KOMReviewTodayTotalCardsLabel, uLocalized('KOMReviewTodayTotalCardsLabelText'));
		});

		it('localizes KOMReviewTodayTimeMinutesLabel', function () {
			browser.assert.text(KOMReviewTodayTimeMinutesLabel, uLocalized('KOMReviewTodayTimeMinutesLabelText'));
		});

		it('localizes KOMReviewTodayReviewAccuracyLabel', function () {
			browser.assert.text(KOMReviewTodayReviewAccuracyLabel, uLocalized('KOMReviewTodayReviewAccuracyLabelText'));
		});

	});

});
