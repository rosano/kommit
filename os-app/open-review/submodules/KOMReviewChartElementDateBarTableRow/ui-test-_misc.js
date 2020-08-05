const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMReviewChartElementDateBarTableRow_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMReviewChartElementDateBarTableRowData: JSON.stringify(StubReviewChartElementDateBarTableRowDataObjectValid()),
		});
	});

	describe('KOMReviewChartElementDateBarTableRowKey', function test_KOMReviewChartElementDateBarTableRowKey() {

		it('binds KOMReviewChartElementDateBarTableRowDataKey', function () {
			browser.assert.text(KOMReviewChartElementDateBarTableRowKey, StubReviewChartElementDateBarTableRowDataObjectValid().KOMReviewChartElementDateBarTableRowDataKey);
		});

	});

});
