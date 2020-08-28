const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const uDeck = function (inputData) {
	return Object.assign({
		KOMDeckID: 'alfa',
		KOMDeckName: 'bravo',
		$KOMDeckSpacings: [],
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

		it('classes OLSKMobileViewHeader', function () {
			browser.assert.hasClass(KOMReviewMasterToolbar, 'OLSKMobileViewHeader');
		});

	});

	describe('KOMReviewMasterCreateButton', function test_KOMReviewMasterCreateButton() {

		it('sets accesskey', function () {
			browser.assert.attribute(KOMReviewMasterCreateButton, 'accesskey', 'n');
		});

		context('click', function () {

			context('response empty', function () {

				before(function () {
					return browser.OLSKPromptSync(function () {
						browser.pressButton(KOMReviewMasterCreateButton);
					});
				});

				it('does nothing', function () {
					browser.assert.text('#TestKOMReviewMasterDispatchCreate', '0');
					browser.assert.text('#TestKOMReviewMasterDispatchCreateData', 'undefined');
				});

			});

			context('response not empty', function () {

				before(function () {
					return browser.OLSKPrompt(function () {
						return browser.pressButton(KOMReviewMasterCreateButton);
					}, function (dialog) {
						dialog.response = 'alfa';

						return dialog;
					});
				});

				it('sends KOMReviewMasterDispatchCreate', function () {
					browser.assert.text('#TestKOMReviewMasterDispatchCreate', '1');
					browser.assert.text('#TestKOMReviewMasterDispatchCreateData', 'alfa');
				});

			});

		});

	});

	describe('KOMReviewMasterListItem', function test_KOMReviewMasterListItem() {

		const item = uDeck({
			$KOMDeckTodayReviewCount: 1,
			$KOMDeckTodayUnseenCount: 2,
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
					$KOMReviewTodayTimeMinutes: 2,
					$KOMReviewTodayReviewAccuracy: 3,
					$KOMDeckGeneralNotUnseenCount: 1,
					$KOMReviewChartCompositionCollectionData: {
						KOMSpacingGroupingTotal: 1,
						KOMSpacingGroupingUnseen: 2,
						KOMSpacingGroupingDeveloping: 3,
						KOMSpacingGroupingMature: 4,
						KOMSpacingGroupingSuspended: 5,
					},
				}), uDeck({
					KOMDeckID: 'bravo',
					$KOMReviewTodayTotalCards: 1,
					$KOMReviewTodayTimeMinutes: 2,
					$KOMReviewTodayReviewAccuracy: 3,
					$KOMDeckGeneralNotUnseenCount: 1,
					$KOMReviewChartCompositionCollectionData: {
						KOMSpacingGroupingTotal: 1,
						KOMSpacingGroupingUnseen: 2,
						KOMSpacingGroupingDeveloping: 3,
						KOMSpacingGroupingMature: 4,
						KOMSpacingGroupingSuspended: 5,
					},
				})]),
			});
		});

		it('sets KOMReviewTodayTotalCards', function () {
			browser.assert.text('.KOMReviewStats .KOMReviewTodayTotalCardsValue', 2);
		});

		it('sets KOMReviewTodayTimeMinutes', function () {
			browser.assert.text('.KOMReviewStats .KOMReviewTodayTimeMinutesValue', 4);
		});

		it('sets KOMReviewTodayReviewAccuracy', function () {
			browser.assert.text('.KOMReviewStats .KOMReviewTodayReviewAccuracyValue', 6);
		});

		it('sets KOMReviewChartCompositionCollectionData', function () {
			browser.assert.text('.KOMReviewChartCompositionCollection .KOMReviewChartCompositionCollectionTotalCardsValue', 2);
			browser.assert.text('.KOMReviewChartCompositionCollection .KOMReviewChartCompositionCollectionUnseenCardsValue', 4);
			browser.assert.text('.KOMReviewChartCompositionCollection .KOMReviewChartCompositionCollectionDevelopingCardsValue', 6);
			browser.assert.text('.KOMReviewChartCompositionCollection .KOMReviewChartCompositionCollectionMatureCardsValue', 8);
			browser.assert.text('.KOMReviewChartCompositionCollection .KOMReviewChartCompositionCollectionSuspendedCardsValue', 10);
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

});
