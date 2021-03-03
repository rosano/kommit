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

	describe('KOMReviewChartElementDateBarTableRowCount', function test_KOMReviewChartElementDateBarTableRowCount() {

		it('sets text', function () {
			browser.assert.text(KOMReviewChartElementDateBarTableRowCount, StubReviewChartElementDateBarTableRowDataObjectValid().KOMReviewChartElementDateBarTableRowDataValues.reduce(function (coll, item) {
				return coll + item;
			}, 0));
		});

	});

	context('zero', function () {
		
		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewChartElementDateBarTableRowData: JSON.stringify(StubReviewChartElementDateBarTableRowDataObjectValid({
					KOMReviewChartElementDateBarTableRowDataValues: [0, 0, 0],
				})),
			});
		});

		it('classes KOMReviewChartElementDateBarTableRowZero', function () {
			browser.assert.hasClass(KOMReviewChartElementDateBarTableRow, 'KOMReviewChartElementDateBarTableRowZero');
		});

		it('sets KOMReviewChartElementDateBarTableRowCount', function () {
			browser.assert.text(KOMReviewChartElementDateBarTableRowCount, '');
		});
	
	});

});
