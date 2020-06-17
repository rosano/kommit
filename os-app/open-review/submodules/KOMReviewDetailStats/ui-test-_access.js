const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	KOMReviewDetailStats: '.KOMReviewDetailStats',
	
	KOMReviewDetailStatsTotalCardsLabel: '.KOMReviewDetailStatsTotalCardsLabel',
	KOMReviewDetailStatsTotalCardsValue: '.KOMReviewDetailStatsTotalCardsValue',
	
	KOMReviewDetailStatsTotalMinutesLabel: '.KOMReviewDetailStatsTotalMinutesLabel',
	KOMReviewDetailStatsTotalMinutesValue: '.KOMReviewDetailStatsTotalMinutesValue',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('KOMReviewDetailStats_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMReviewDetailStatsSpacings: JSON.stringify([]),
		});
	});

	it('shows KOMReviewDetailStats', function () {
		browser.assert.elements(KOMReviewDetailStats, 1);
	});

	it('shows KOMReviewDetailStatsTotalCardsLabel', function () {
		browser.assert.elements(KOMReviewDetailStatsTotalCardsLabel, 1);
	});

	it('shows KOMReviewDetailStatsTotalCardsValue', function () {
		browser.assert.elements(KOMReviewDetailStatsTotalCardsValue, 1);
	});

	it('shows KOMReviewDetailStatsTotalMinutesLabel', function () {
		browser.assert.elements(KOMReviewDetailStatsTotalMinutesLabel, 1);
	});

	it('shows KOMReviewDetailStatsTotalMinutesValue', function () {
		browser.assert.elements(KOMReviewDetailStatsTotalMinutesValue, 1);
	});

});
