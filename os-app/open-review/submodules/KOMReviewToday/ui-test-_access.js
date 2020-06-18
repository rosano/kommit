const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	KOMReviewToday: '.KOMReviewToday',
	
	KOMReviewTodayTotalCardsLabel: '.KOMReviewTodayTotalCardsLabel',
	KOMReviewTodayTotalCardsValue: '.KOMReviewTodayTotalCardsValue',
	
	KOMReviewTodayTimeMinutesLabel: '.KOMReviewTodayTimeMinutesLabel',
	KOMReviewTodayTimeMinutesValue: '.KOMReviewTodayTimeMinutesValue',
	
	KOMReviewTodayReviewAccuracyLabel: '.KOMReviewTodayReviewAccuracyLabel',
	KOMReviewTodayReviewAccuracyValue: '.KOMReviewTodayReviewAccuracyValue',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('KOMReviewToday_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMReviewTodaySpacings: JSON.stringify([]),
		});
	});

	it('shows KOMReviewToday', function () {
		browser.assert.elements(KOMReviewToday, 1);
	});

	it('shows KOMReviewTodayTotalCardsLabel', function () {
		browser.assert.elements(KOMReviewTodayTotalCardsLabel, 1);
	});

	it('shows KOMReviewTodayTotalCardsValue', function () {
		browser.assert.elements(KOMReviewTodayTotalCardsValue, 1);
	});

	it('shows KOMReviewTodayTimeMinutesLabel', function () {
		browser.assert.elements(KOMReviewTodayTimeMinutesLabel, 1);
	});

	it('shows KOMReviewTodayTimeMinutesValue', function () {
		browser.assert.elements(KOMReviewTodayTimeMinutesValue, 1);
	});

	it('shows KOMReviewTodayReviewAccuracyLabel', function () {
		browser.assert.elements(KOMReviewTodayReviewAccuracyLabel, 1);
	});

	it('shows KOMReviewTodayReviewAccuracyValue', function () {
		browser.assert.elements(KOMReviewTodayReviewAccuracyValue, 1);
	});

});
