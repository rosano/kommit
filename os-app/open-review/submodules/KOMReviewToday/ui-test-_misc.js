const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMReviewToday_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMReviewTodayTotalCards: 1,
			KOMReviewTodayTimeMinutes: 2,
			KOMReviewTodayReviewAccuracy: 3,
		});
	});

	describe('KOMReviewTodayTotalCardsValue', function test_KOMReviewTodayTotalCardsValue() {

		it('binds KOMReviewTodayTotalCards', function () {
			browser.assert.text(KOMReviewTodayTotalCardsValue, 1);
		});

	});

	describe('KOMReviewTodayTimeMinutesValue', function test_KOMReviewTodayTimeMinutesValue() {

		it('binds KOMReviewTodayTimeMinutes', function () {
			browser.assert.text(KOMReviewTodayTimeMinutesValue, 2);
		});

	});

	describe('KOMReviewTodayReviewAccuracyValue', function test_KOMReviewTodayReviewAccuracyValue() {

		it('binds KOMReviewTodayReviewAccuracy', function () {
			browser.assert.text(KOMReviewTodayReviewAccuracyValue, 3);
		});

	});

});
