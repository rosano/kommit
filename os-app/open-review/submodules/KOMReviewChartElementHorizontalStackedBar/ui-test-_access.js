const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	KOMReviewChartElementHorizontalStackedBar: '.KOMReviewChartElementHorizontalStackedBar',
	
	KOMReviewChartElementHorizontalStackedBarSection: '.KOMReviewChartElementHorizontalStackedBarSection',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('KOMReviewChartElementHorizontalStackedBar_Access', function () {

	const values = [1, 2, 3];

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMReviewChartElementHorizontalStackedBarValues: JSON.stringify(values)
		});
	});

	it('shows KOMReviewChartElementHorizontalStackedBar', function () {
		browser.assert.elements(KOMReviewChartElementHorizontalStackedBar, 1);
	});

	it('shows KOMReviewChartElementHorizontalStackedBarSection', function () {
		browser.assert.elements(KOMReviewChartElementHorizontalStackedBarSection, values.length);
	});

});
