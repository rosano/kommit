const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const uDeck = function (inputData) {
	return Object.assign({
		KOMDeckID: 'alfa',
		KOMDeckName: 'bravo',
		$KOMReviewGeneralUpcomingData: [],
		$KOMReviewGeneralHistoricalData: [],
	}, inputData);
};

describe('KOMReviewMaster_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute);
	});

	describe('KOMReviewMasterToolbar', function test_KOMReviewMasterToolbar() {

		it('classes OLSKToolbar', function () {
			browser.assert.hasClass(KOMReviewMasterToolbar, 'OLSKToolbar');
		});

		it('classes OLSKToolbarJustify', function () {
			browser.assert.hasClass(KOMReviewMasterToolbar, 'OLSKToolbarJustify');
		});

		it('classes OLSKCommonEdgeBottom', function () {
			browser.assert.hasClass(KOMReviewMasterToolbar, 'OLSKCommonEdgeBottom');
		});

		it('classes OLSKMobileViewHeader', function () {
			browser.assert.hasClass(KOMReviewMasterToolbar, 'OLSKMobileViewHeader');
		});

	});

	describe('KOMReviewMasterCreateButton', function test_KOMReviewMasterCreateButton() {

		it('classes OLSKDecorPress', function () {
			browser.assert.hasClass(KOMReviewMasterCreateButton, 'OLSKDecorPress');
		});

		it('sets accesskey', function () {
			browser.assert.attribute(KOMReviewMasterCreateButton, 'accesskey', 'n');
		});

		context('click', function () {

			before(function () {
				browser.assert.text('#TestKOMReviewMasterDispatchCreate', '0');
			});

			before(function () {
				return browser.OLSKPromptSync(function () {
					browser.pressButton(KOMReviewMasterCreateButton);
				});
			});

			it('sends KOMReviewMasterDispatchCreate', function () {
				browser.assert.text('#TestKOMReviewMasterDispatchCreate', '1');
			});

		});

	});

	describe('KOMReviewMasterListItem', function test_KOMReviewMasterListItem() {

		const item = uDeck({
			$KOMDeckTodayReviewCount: 1,
			$KOMDeckTodayNewCount: 2,
		});

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewMasterItems: JSON.stringify([item]),
			});
		});

		it('sets KOMReviewMasterListItemName', function () {
			browser.assert.text('.KOMReviewMasterListItemName', 'bravo');
		});

		it('sets KOMReviewMasterListItemReviewCount', function () {
			browser.assert.text('.KOMReviewMasterListItemReviewValue', '1');
		});

		it('sets KOMReviewMasterListItemUnseenCount', function () {
			browser.assert.text('.KOMReviewMasterListItemUnseenValue', '2');
		});

		context('click', function () {

			before(function () {
				browser.assert.text('#TestKOMReviewMasterDispatchSelect', '0');
				browser.assert.text('#TestKOMReviewMasterDispatchSelectData', 'undefined');
			});

			before(function () {
				return browser.pressButton('.KOMReviewMasterListItem');
			});

			it('sends KOMReviewMasterDispatchSelect', function () {
				browser.assert.text('#TestKOMReviewMasterDispatchSelect', '1');
				browser.assert.text('#TestKOMReviewMasterDispatchSelectData', JSON.stringify(item));
			});

		});

	});

	describe('KOMReviewStats', function test_KOMReviewStats() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewMasterItems: JSON.stringify([uDeck({
					KOMDeckID: 'alfa',
					$KOMReviewTodayTotalCards: 1,
					$KOMReviewTodayTimeMinutes: 2.125,
					$KOMReviewTodayReviewAccuracy: 3.25,
					$KOMDeckGeneralNotUnseenCount: 1,
					$KOMReviewGeneralUpcomingData: [{
						KOMReviewChartElementDateBarTableRowDataKey: 'alfa',
						KOMReviewChartElementDateBarTableRowDataValues: [1, 2],
					}],
					$KOMReviewGeneralHistoricalData: [{
						KOMReviewChartElementDateBarTableRowDataKey: 'alfa',
						KOMReviewChartElementDateBarTableRowDataValues: [1, 2, 3, 4],
					}],
					$KOMReviewChartCompositionCollectionData: {
						KOMSpacingGroupingTotal: 1,
						KOMSpacingGroupingUnseen: 2,
						KOMSpacingGroupingDeveloping: 3,
						KOMSpacingGroupingMature: 4,
						KOMSpacingGroupingRetired: 5,
					},
				}), uDeck({
					KOMDeckID: 'bravo',
					$KOMReviewTodayTotalCards: 1,
					$KOMReviewTodayTimeMinutes: 2.125,
					$KOMReviewTodayReviewAccuracy: 3.25,
					$KOMDeckGeneralNotUnseenCount: 1,
					$KOMReviewGeneralUpcomingData: [{
						KOMReviewChartElementDateBarTableRowDataKey: 'alfa',
						KOMReviewChartElementDateBarTableRowDataValues: [1, 2],
					}],
					$KOMReviewGeneralHistoricalData: [{
						KOMReviewChartElementDateBarTableRowDataKey: 'alfa',
						KOMReviewChartElementDateBarTableRowDataValues: [1, 2, 3, 4],
					}],
					$KOMReviewChartCompositionCollectionData: {
						KOMSpacingGroupingTotal: 1,
						KOMSpacingGroupingUnseen: 2,
						KOMSpacingGroupingDeveloping: 3,
						KOMSpacingGroupingMature: 4,
						KOMSpacingGroupingRetired: 5,
					},
				}), uDeck({
					KOMDeckID: 'charlie',
					$KOMReviewTodayTotalCards: 0,
					$KOMReviewTodayTimeMinutes: 0,
					$KOMReviewTodayReviewAccuracy: 0,
					$KOMDeckGeneralNotUnseenCount: 0,
					$KOMReviewGeneralUpcomingData: [{
						KOMReviewChartElementDateBarTableRowDataKey: 'alfa',
						KOMReviewChartElementDateBarTableRowDataValues: [1, 2],
					}],
					$KOMReviewGeneralHistoricalData: [{
						KOMReviewChartElementDateBarTableRowDataKey: 'alfa',
						KOMReviewChartElementDateBarTableRowDataValues: [1, 2, 3, 4],
					}],
					$KOMReviewChartCompositionCollectionData: {
						KOMSpacingGroupingTotal: 1,
						KOMSpacingGroupingUnseen: 2,
						KOMSpacingGroupingDeveloping: 3,
						KOMSpacingGroupingMature: 4,
						KOMSpacingGroupingRetired: 5,
					},
				})]),
			});
		});

		it('sets KOMReviewTodayTotalCards', function () {
			browser.assert.text('.KOMReviewStats .KOMReviewTodayTotalCardsValue', 2);
		});

		it('sets KOMReviewTodayTimeMinutes', function () {
			browser.assert.text('.KOMReviewStats .KOMReviewTodayTimeMinutesValue', 4.3);
		});

		it('sets KOMReviewTodayReviewAccuracy', function () {
			browser.assert.text('.KOMReviewStats .KOMReviewTodayReviewAccuracyValue', 3.3);
		});

		context('KOMReviewGeneralUpcomingData', function () {

			it('sets KOMReviewChartElementDateBarTableRowDataKey', function () {
				browser.assert.elements('.KOMReviewGeneralUpcoming .KOMReviewChartElementDateBarTableRow .KOMReviewChartElementDateBarTableRowKey', 1);
			});
			
			it('sets KOMReviewChartElementDateBarTableRowDataValues', function () {
				browser.assert.elements('.KOMReviewGeneralUpcoming .KOMReviewChartElementDateBarTableRow .KOMReviewChartElementHorizontalStackedBarSection', 2);
			});

			it('sets KOMReviewChartElementDateBarTableRowCount', function () {
				browser.assert.text('.KOMReviewGeneralUpcoming .KOMReviewChartElementDateBarTableRow .KOMReviewChartElementDateBarTableRowCount', '6');
			});
		
		});

		context('KOMReviewGeneralHistoricalData', function () {

			it('sets KOMReviewChartElementDateBarTableRowDataKey', function () {
				browser.assert.elements('.KOMReviewGeneralHistorical .KOMReviewChartElementDateBarTableRow .KOMReviewChartElementDateBarTableRowKey', 1);
			});
			
			it('sets KOMReviewChartElementDateBarTableRowDataValues', function () {
				browser.assert.elements('.KOMReviewGeneralHistorical .KOMReviewChartElementDateBarTableRow .KOMReviewChartElementHorizontalStackedBarSection', 4);
			});

			it('sets KOMReviewChartElementDateBarTableRowCount', function () {
				browser.assert.text('.KOMReviewGeneralHistorical .KOMReviewChartElementDateBarTableRow .KOMReviewChartElementDateBarTableRowCount', '20');
			});
		
		});

		it('sets KOMReviewChartCompositionCollectionData', function () {
			browser.assert.text('.KOMReviewChartCompositionCollection .KOMReviewChartCompositionCollectionTotalCardsValue', 2);
			browser.assert.text('.KOMReviewChartCompositionCollection .KOMReviewChartCompositionCollectionUnseenCardsValue', 4);
			browser.assert.text('.KOMReviewChartCompositionCollection .KOMReviewChartCompositionCollectionDevelopingCardsValue', 6);
			browser.assert.text('.KOMReviewChartCompositionCollection .KOMReviewChartCompositionCollectionMatureCardsValue', 8);
			browser.assert.text('.KOMReviewChartCompositionCollection .KOMReviewChartCompositionCollectionRetiredCardsValue', 10);
		});

	});

	describe('KOMReviewMasterLauncherItemToggleExcludeTripleQuestionMark', function test_KOMReviewMasterLauncherItemToggleExcludeTripleQuestionMark() {

		before(function () {
			browser.assert.text('#TestKOMReviewMasterDispatchToggleExcludeTripleQuestionMark', '0');
		});

		before(function () {
			return browser.OLSKLauncherRun('KOMReviewMasterLauncherItemToggleExcludeTripleQuestionMark');
		});

		it('sends KOMReviewMasterDispatchToggleExcludeTripleQuestionMark', function () {
			browser.assert.text('#TestKOMReviewMasterDispatchToggleExcludeTripleQuestionMark', '1');
		});

	});

	describe('KOMReviewMasterLauncherItemToggleDeckFiguresCaching', function test_KOMReviewMasterLauncherItemToggleDeckFiguresCaching() {

		before(function () {
			browser.assert.text('#TestKOMReviewMasterDispatchToggleDeckFiguresCaching', '0');
		});

		before(function () {
			return browser.OLSKLauncherRun('KOMReviewMasterLauncherItemToggleDeckFiguresCaching');
		});

		it('sends KOMReviewMasterDispatchToggleDeckFiguresCaching', function () {
			browser.assert.text('#TestKOMReviewMasterDispatchToggleDeckFiguresCaching', '1');
		});

	});

});
