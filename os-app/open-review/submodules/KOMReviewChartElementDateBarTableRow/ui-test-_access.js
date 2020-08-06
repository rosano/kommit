const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	KOMReviewChartElementDateBarTableRow: '.KOMReviewChartElementDateBarTableRow',
	
	KOMReviewChartElementDateBarTableRowKey: '.KOMReviewChartElementDateBarTableRowKey',
	KOMReviewChartElementDateBarTableRowBar: '.KOMReviewChartElementDateBarTableRowBar .KOMReviewChartElementHorizontalStackedBar',
	KOMReviewChartElementDateBarTableRowCount: '.KOMReviewChartElementDateBarTableRowCount',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('KOMReviewChartElementDateBarTableRow_Access', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMReviewChartElementDateBarTableRowData: JSON.stringify(StubReviewChartElementDateBarTableRowDataObjectValid()),
		});
	});

	it('shows KOMReviewChartElementDateBarTableRow', function () {
		browser.assert.elements(KOMReviewChartElementDateBarTableRow, 1);
	});

	it('shows KOMReviewChartElementDateBarTableRowKey', function () {
		browser.assert.elements(KOMReviewChartElementDateBarTableRowKey, 1);
	});

	it('shows KOMReviewChartElementDateBarTableRowBar', function () {
		browser.assert.elements(KOMReviewChartElementDateBarTableRowBar, 1);
	});

	it('shows KOMReviewChartElementDateBarTableRowCount', function () {
		browser.assert.elements(KOMReviewChartElementDateBarTableRowCount, 1);
	});

});
