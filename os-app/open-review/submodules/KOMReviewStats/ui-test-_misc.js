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
			KOMSpacingGroupingSuspended: 5,
		};

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewGeneralSpacings: JSON.stringify([Object.assign(StubSpacingObjectValid(), {
					KOMSpacingChronicles: [StubChronicleObjectValid()],
					KOMSpacingDueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
				}), Object.assign(StubSpacingObjectValid(), {
					KOMSpacingID: 'bravo-backward',
				})]),
				KOMReviewGeneralHistoricalData: JSON.stringify([{
					KOMReviewChartElementDateBarTableRowDataKey: 'alfa',
					KOMReviewChartElementDateBarTableRowDataValues: [1, 2, 3, 4],
				}]),
				KOMReviewChartCompositionCollectionData: JSON.stringify(item),
			});
		});

		it('sets KOMReviewGeneralHistoricalData', function () {
			browser.assert.text('.KOMReviewGeneralHistorical .KOMReviewChartElementDateBarTableRow .KOMReviewChartElementDateBarTableRowKey', 'alfa');
		});

		it('sets KOMReviewChartCompositionCollectionData', function () {
			browser.assert.text('.KOMReviewChartCompositionCollection .KOMReviewChartCompositionCollectionTotalCardsValue', item.KOMSpacingGroupingTotal);
			browser.assert.text('.KOMReviewChartCompositionCollection .KOMReviewChartCompositionCollectionUnseenCardsValue', item.KOMSpacingGroupingUnseen);
			browser.assert.text('.KOMReviewChartCompositionCollection .KOMReviewChartCompositionCollectionDevelopingCardsValue', item.KOMSpacingGroupingDeveloping);
			browser.assert.text('.KOMReviewChartCompositionCollection .KOMReviewChartCompositionCollectionMatureCardsValue', item.KOMSpacingGroupingMature);
			browser.assert.text('.KOMReviewChartCompositionCollection .KOMReviewChartCompositionCollectionSuspendedCardsValue', item.KOMSpacingGroupingSuspended);
		});

	});

});
