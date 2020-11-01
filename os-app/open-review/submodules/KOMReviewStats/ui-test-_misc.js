const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMReviewStats_Misc', function () {

	describe('KOMReviewStatsToday', function test_KOMReviewStatsToday() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewTodayTotalCards: 1,
				KOMReviewTodayTimeMinutes: 2,
				KOMReviewTodayReviewAccuracy: 3,
			});
		});

		it('sets KOMReviewTodayTotalCards', function () {
			browser.assert.text(`${ KOMReviewStatsToday } .KOMReviewTodayTotalCardsValue`, 1);
		});

		it('sets KOMReviewTodayTimeMinutes', function () {
			browser.assert.text(`${ KOMReviewStatsToday } .KOMReviewTodayTimeMinutesValue`, 2);
		});

		it('sets KOMReviewTodayReviewAccuracy', function () {
			browser.assert.text(`${ KOMReviewStatsToday } .KOMReviewTodayReviewAccuracyValue`, 3);
		});

	});

	describe('KOMReviewStatsGeneral', function test_KOMReviewStatsGeneral() {

		const item = {
			KOMSpacingGroupingTotal: 1,
			KOMSpacingGroupingUnseen: 2,
			KOMSpacingGroupingDeveloping: 3,
			KOMSpacingGroupingMature: 4,
			KOMSpacingGroupingRetired: 5,
			KOMSpacingGroupingSuspended: 6,
		};

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewGeneralUpcomingData: JSON.stringify([{
					KOMReviewChartElementDateBarTableRowDataKey: 'alfa',
					KOMReviewChartElementDateBarTableRowDataValues: [1, 2],
				}]),
				KOMReviewGeneralHistoricalData: JSON.stringify([{
					KOMReviewChartElementDateBarTableRowDataKey: 'alfa',
					KOMReviewChartElementDateBarTableRowDataValues: [1, 2, 3, 4],
				}]),
				KOMReviewChartCompositionCollectionData: JSON.stringify(item),
			});
		});

		it('sets KOMReviewGeneralUpcomingData', function () {
			browser.assert.text('.KOMReviewGeneralUpcoming .KOMReviewChartElementDateBarTableRow .KOMReviewChartElementDateBarTableRowKey', 'alfa');
		});

		it('sets KOMReviewGeneralHistoricalData', function () {
			browser.assert.text('.KOMReviewGeneralHistorical .KOMReviewChartElementDateBarTableRow .KOMReviewChartElementDateBarTableRowKey', 'alfa');
		});

		it('sets KOMReviewChartCompositionCollectionData', function () {
			browser.assert.text('.KOMReviewChartCompositionCollection .KOMReviewChartCompositionCollectionTotalCardsValue', item.KOMSpacingGroupingTotal);
			browser.assert.text('.KOMReviewChartCompositionCollection .KOMReviewChartCompositionCollectionUnseenCardsValue', item.KOMSpacingGroupingUnseen);
			browser.assert.text('.KOMReviewChartCompositionCollection .KOMReviewChartCompositionCollectionDevelopingCardsValue', item.KOMSpacingGroupingDeveloping);
			browser.assert.text('.KOMReviewChartCompositionCollection .KOMReviewChartCompositionCollectionMatureCardsValue', item.KOMSpacingGroupingMature);
			browser.assert.text('.KOMReviewChartCompositionCollection .KOMReviewChartCompositionCollectionRetiredCardsValue', item.KOMSpacingGroupingRetired);
			browser.assert.text('.KOMReviewChartCompositionCollection .KOMReviewChartCompositionCollectionSuspendedCardsValue', item.KOMSpacingGroupingSuspended);
		});

	});

});
