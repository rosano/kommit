const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	KOMReviewDetailStats: '.KOMReviewDetailStats',
	
	KOMReviewDetailStatsTotalCardsLabel: '.KOMReviewDetailStatsTotalCardsLabel',
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

});
