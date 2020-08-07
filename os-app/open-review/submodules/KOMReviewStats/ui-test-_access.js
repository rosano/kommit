const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	KOMReviewStats: '.KOMReviewStats',

	KOMReviewStatsHeading: '.KOMReviewStatsHeading',
	KOMReviewStatsToday: '.KOMReviewStats .KOMReviewToday',
	KOMReviewStatsGeneral: '.KOMReviewStats .KOMReviewGeneral',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('KOMReviewStats_Access', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMReviewTodaySpacings: JSON.stringify([]),
			KOMReviewGeneralSpacings: JSON.stringify([]),
		});
	});

	it('shows KOMReviewStats', function () {
		browser.assert.elements(KOMReviewStats, 1);
	});

	it('shows KOMReviewStatsHeading', function () {
		browser.assert.elements(KOMReviewStatsHeading, 1);
	});

	it('hides KOMReviewStatsToday', function () {
		browser.assert.elements(KOMReviewStatsToday, 0);
	});

	it('shows KOMReviewStatsGeneral', function () {
		browser.assert.elements(KOMReviewStatsGeneral, 1);
	});

	context('$KOMDeckTodayStudiedCount', function () {
		
		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewTodaySpacings: JSON.stringify([StubSpacingObjectValid()]),
				KOMReviewGeneralSpacings: JSON.stringify([]),
			});
		});

		it('shows KOMReviewStatsToday', function () {
			browser.assert.elements(KOMReviewStatsToday, 1);
		});
	
	});

});
