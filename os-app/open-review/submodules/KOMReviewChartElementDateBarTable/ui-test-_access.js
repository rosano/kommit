const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	KOMReviewChartElementDateBarTable: '.KOMReviewChartElementDateBarTable',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('KOMReviewChartElementDateBarTable_Access', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMReviewChartElementDateBarTableData: JSON.stringify([StubReviewChartElementDateBarTableRowDataObjectValid(), StubReviewChartElementDateBarTableRowDataObjectValid()]),
		});
	});

	it('shows KOMReviewChartElementDateBarTable', function () {
		browser.assert.elements(KOMReviewChartElementDateBarTable, 1);
	});

	it('shows .KOMReviewChartElementDateBarTableRow', function () {
		browser.assert.elements('.KOMReviewChartElementDateBarTableRow', 2);
	});

});
