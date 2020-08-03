const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	KOMReviewChartElementNormalizedBar: '.KOMReviewChartElementNormalizedBar',
	
	KOMReviewChartElementNormalizedBarSection: '.KOMReviewChartElementNormalizedBarSection',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('KOMReviewChartElementNormalizedBar_Access', function () {

	const values = [1, 2, 3];

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMReviewChartElementNormalizedBarValues: JSON.stringify(values)
		});
	});

	it('shows KOMReviewChartElementNormalizedBar', function () {
		browser.assert.elements(KOMReviewChartElementNormalizedBar, 1);
	});

	it('shows KOMReviewChartElementNormalizedBarSection', function () {
		browser.assert.elements(KOMReviewChartElementNormalizedBarSection, values.length);
	});

});
