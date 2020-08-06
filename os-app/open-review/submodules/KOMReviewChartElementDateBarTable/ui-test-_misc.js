const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMReviewChartElementDateBarTable_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMReviewChartElementDateBarTableData: JSON.stringify([StubReviewChartElementDateBarTableRowDataObjectValid(), Object.assign(StubReviewChartElementDateBarTableRowDataObjectValid(), {
				KOMReviewChartElementDateBarTableRowDataValues: [1, 2, 7],
			})]),
		});
	});

	it('sets KOMReviewChartElementHorizontalStackedBarMaximum', function () {
		browser.assert.attribute(`${ KOMReviewChartElementDateBarTable } .KOMReviewChartElementHorizontalStackedBarSection:first-of-type`, 'width', '10');
	});

});
