const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();
const KOMReviewLogic = require('../../ui-logic.js').default;

const uDeck = function (inputData) {
	return Object.assign({
		KOMDeckName: 'alfa',
		$KOMDeckTodayReviewCount: 0,
		$KOMDeckTodayUnseenCount: 0,
		$KOMDeckTodayStudiedCount: 0,
		$KOMReviewGeneralUpcomingData: [],
		$KOMReviewGeneralHistoricalData: [],
		$KOMReviewChartCompositionCollectionData: {
			KOMSpacingGroupingTotal: 0,
		},
	}, inputData);
};

describe('KOMReviewDetail_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMReviewDetailDeck: JSON.stringify(uDeck()),
		});
	});

	describe('KOMReviewDetailToolbar', function test_KOMReviewDetailToolbar() {

		it('classes OLSKToolbar', function () {
			browser.assert.hasClass(KOMReviewDetailToolbar, 'OLSKToolbar');
		});

		it('classes OLSKToolbarJustify', function () {
			browser.assert.hasClass(KOMReviewDetailToolbar, 'OLSKToolbarJustify');
		});

		it('classes OLSKMobileViewHeader', function () {
			browser.assert.hasClass(KOMReviewDetailToolbar, 'OLSKMobileViewHeader');
		});

	});

	describe('KOMReviewDetailToolbarBackButton', function test_KOMReviewDetailToolbarBackButton() {

		it('classes OLSKLayoutButtonNoStyle', function () {
			browser.assert.hasClass(KOMReviewDetailToolbarBackButton, 'OLSKLayoutButtonNoStyle');
		});

		it('classes OLSKLayoutElementTappable', function () {
			browser.assert.hasClass(KOMReviewDetailToolbarBackButton, 'OLSKLayoutElementTappable');
		});

		context('click', function () {

			before(function () {
				browser.assert.text('#TestKOMReviewDetailDispatchBack', '0');
			});

			before(function () {
				return browser.pressButton(KOMReviewDetailToolbarBackButton);
			});

			it('sends KOMReviewDetailDispatchBack', function () {
				browser.assert.text('#TestKOMReviewDetailDispatchBack', '1');
			});

		});

		context('Escape', function () {

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			});

			it('sends KOMReviewDetailDispatchBack', function () {
				browser.assert.text('#TestKOMReviewDetailDispatchBack', '2');
			});

		});

	});

	describe('KOMReviewDetailToolbarBackButtonImage', function test_KOMReviewDetailToolbarBackButtonImage() {

		it('sets src', function () {
			browser.assert.elements(`${ KOMReviewDetailToolbarBackButtonImage } #_OLSKSharedBack`, 1);
		});

	});

	describe('KOMReviewDetailToolbarTitle', function test_KOMReviewDetailToolbarTitle() {

		it('sets text', function () {
			browser.assert.text(KOMReviewDetailToolbarTitle, uDeck().KOMDeckName);
		});

	});

	describe('KOMReviewDetailToolbarCardsButton', function test_KOMReviewDetailToolbarCardsButton() {

		it('sets accesskey', function () {
			browser.assert.attribute(KOMReviewDetailToolbarCardsButton, 'accesskey', 'c');
		});

		context('click', function () {

			before(function () {
				browser.assert.text('#TestKOMReviewDetailDispatchBrowse', '0');
			});

			before(function () {
				return browser.pressButton(KOMReviewDetailToolbarCardsButton);
			});

			it('sends KOMReviewDetailDispatchBrowse', function () {
				browser.assert.text('#TestKOMReviewDetailDispatchBrowse', '1');
			});

		});

	});

	describe('KOMReviewDetailDiscardButton', function test_KOMReviewDetailDiscardButton() {

		it('classes OLSKCommonButton', function () {
			browser.assert.hasClass(KOMReviewDetailDiscardButton, 'OLSKCommonButton');
		});

		it('classes OLSKLayoutElementTappable', function () {
			browser.assert.hasClass(KOMReviewDetailDiscardButton, 'OLSKLayoutElementTappable');
		});

		context('click', function () {

			context('response not valid', function () {

				before(function () {
					return browser.OLSKPrompt(function () {
						return browser.pressButton(KOMReviewDetailDiscardButton);
					}, function (dialog) {
						dialog.response = 'bravo';

						return dialog;
					});
				});

				before(function () {
					browser.assert.text('#TestKOMReviewDetailDispatchDiscard', '0');
					browser.assert.text('#TestKOMReviewDetailDispatchDiscardData', 'undefined');
				});

			});

			context('response valid', function () {

				before(function () {
					return browser.OLSKPrompt(function () {
						return browser.pressButton(KOMReviewDetailDiscardButton);
					}, function (dialog) {
						dialog.response = 'alfa';

						return dialog;
					});
				});

				it('sends KOMReviewDetailDispatchDiscard', function () {
					browser.assert.text('#TestKOMReviewDetailDispatchDiscard', '1');
					browser.assert.text('#TestKOMReviewDetailDispatchDiscardData', JSON.stringify(uDeck()));
				});

			});

		});

	});

	describe('KOMReviewDetailRenameButton', function test_KOMReviewDetailRenameButton() {

		it('classes OLSKCommonButton', function () {
			browser.assert.hasClass(KOMReviewDetailRenameButton, 'OLSKCommonButton');
		});

		context('click', function () {

			before(function () {
				browser.assert.text('#TestKOMReviewDetailDispatchUpdate', '0');
				browser.assert.text('#TestKOMReviewDetailDispatchUpdateData', 'undefined');
			});

			it('sets KOMReviewDetailRenameButtonPrompt response', function () {
				browser.assert.OLSKPromptResponse(function () {
					return browser.pressButton(KOMReviewDetailRenameButton);
				}, uDeck().KOMDeckName);
			});

			context('edit', function () {

				before(function () {
					return browser.OLSKPrompt(function () {
						return browser.pressButton(KOMReviewDetailRenameButton);
					}, function (dialog) {
						dialog.response = 'bravo';

						return dialog;
					});
				});

				it('sends KOMReviewDetailDispatchUpdate', function () {
					browser.assert.text('#TestKOMReviewDetailDispatchUpdate', '1');
					browser.assert.text('#TestKOMReviewDetailDispatchUpdateData', JSON.stringify(uDeck({
						KOMDeckName: 'bravo',
					})));
				});

			});

		});

	});

	describe('KOMReviewDetailFormAudioIsEnabledField', function test_KOMReviewDetailFormAudioIsEnabledField() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewDetailDeck: JSON.stringify(uDeck()),
			});
		});

		it('sets type', function () {
			browser.assert.attribute(KOMReviewDetailFormAudioIsEnabledField, 'type', 'checkbox');
		});

		it('binds KOMDeckIsForwardOnly', function () {
			browser.assert.OLSKIsChecked(KOMReviewDetailFormAudioIsEnabledField, false);
		});

		context('click', function () {

			before(function () {
				browser.assert.text('#TestKOMReviewDetailDispatchUpdate', '0');
				browser.assert.text('#TestKOMReviewDetailDispatchUpdateData', 'undefined');
			});

			before(function () {
				return browser.check(KOMReviewDetailFormAudioIsEnabledField);
			});

			it('sends KOMReviewDetailDispatchUpdate', function () {
				browser.assert.text('#TestKOMReviewDetailDispatchUpdate', '1');
				browser.assert.text('#TestKOMReviewDetailDispatchUpdateData', JSON.stringify(uDeck({
					KOMDeckAudioIsEnabled: true,
				})));
			});

		});

	});

	describe('KOMReviewDetailFormFrontLanguageCode', function test_KOMReviewDetailFormFrontLanguageCode() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewDetailDeck: JSON.stringify(uDeck()),
			});
		});

		it('binds KOMDeckFrontLanguageCode', function () {
			browser.assert.input(`${ KOMReviewDetailFormFrontLanguageCode } .KOMReviewDetailLanguageCodeField`, '');
		});

		context.skip('click', function () {

			before(function () {
				browser.assert.text('#TestKOMReviewDetailDispatchUpdate', '0');
				browser.assert.text('#TestKOMReviewDetailDispatchUpdateData', 'undefined');
			});

			before(function () {
				return browser.select(`${ KOMReviewDetailFormFrontLanguageCode } .KOMReviewDetailLanguageCodeField`, 'en');
			});

			it('sends KOMReviewDetailDispatchUpdate', function () {
				browser.assert.text('#TestKOMReviewDetailDispatchUpdate', '1');
				browser.assert.text('#TestKOMReviewDetailDispatchUpdateData', JSON.stringify(uDeck({
					KOMDeckFrontLanguageCode: 'en',
				})));
			});

		});

	});

	describe('KOMReviewDetailFormFrontSpeechIsEnabledField', function test_KOMReviewDetailFormFrontSpeechIsEnabledField() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewDetailDeck: JSON.stringify(uDeck()),
			});
		});

		it('sets type', function () {
			browser.assert.attribute(KOMReviewDetailFormFrontSpeechIsEnabledField, 'type', 'checkbox');
		});

		it('binds KOMDeckFrontSpeechIsEnabled', function () {
			browser.assert.OLSKIsChecked(KOMReviewDetailFormRearSpeechIsEnabledField, false);
		});

		context('check', function () {

			before(function () {
				browser.assert.text('#TestKOMReviewDetailDispatchUpdate', '0');
				browser.assert.text('#TestKOMReviewDetailDispatchUpdateData', 'undefined');
			});

			before(function () {
				return browser.check(KOMReviewDetailFormFrontSpeechIsEnabledField);
			});

			it('sends KOMReviewDetailDispatchUpdate', function () {
				browser.assert.text('#TestKOMReviewDetailDispatchUpdate', '1');
				browser.assert.text('#TestKOMReviewDetailDispatchUpdateData', JSON.stringify(uDeck({
					KOMDeckFrontSpeechIsEnabled: true,
				})));
			});

		});

	});

	describe('KOMReviewDetailFormRearLanguageCode', function test_KOMReviewDetailFormRearLanguageCode() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewDetailDeck: JSON.stringify(uDeck()),
			});
		});

		it('binds KOMDeckRearLanguageCode', function () {
			browser.assert.input(`${ KOMReviewDetailFormRearLanguageCode } .KOMReviewDetailLanguageCodeField`, '');
		});

		context.skip('click', function () {

			before(function () {
				browser.assert.text('#TestKOMReviewDetailDispatchUpdate', '0');
				browser.assert.text('#TestKOMReviewDetailDispatchUpdateData', 'undefined');
			});

			before(function () {
				return browser.select(`${ KOMReviewDetailFormRearLanguageCode } .KOMReviewDetailLanguageCodeField`, 'en');
			});

			it('sends KOMReviewDetailDispatchUpdate', function () {
				browser.assert.text('#TestKOMReviewDetailDispatchUpdate', '1');
				browser.assert.text('#TestKOMReviewDetailDispatchUpdateData', JSON.stringify(uDeck({
					KOMDeckRearLanguageCode: 'en',
				})));
			});

		});

	});

	describe('KOMReviewDetailFormRearSpeechIsEnabledField', function test_KOMReviewDetailFormRearSpeechIsEnabledField() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewDetailDeck: JSON.stringify(uDeck()),
			});
		});

		it('sets type', function () {
			browser.assert.attribute(KOMReviewDetailFormRearSpeechIsEnabledField, 'type', 'checkbox');
		});

		it('binds KOMDeckRearSpeechIsEnabled', function () {
			browser.assert.OLSKIsChecked(KOMReviewDetailFormRearSpeechIsEnabledField, false);
		});

		context('check', function () {

			before(function () {
				browser.assert.text('#TestKOMReviewDetailDispatchUpdate', '0');
				browser.assert.text('#TestKOMReviewDetailDispatchUpdateData', 'undefined');
			});

			before(function () {
				return browser.check(KOMReviewDetailFormRearSpeechIsEnabledField);
			});

			it('sends KOMReviewDetailDispatchUpdate', function () {
				browser.assert.text('#TestKOMReviewDetailDispatchUpdate', '1');
				browser.assert.text('#TestKOMReviewDetailDispatchUpdateData', JSON.stringify(uDeck({
					KOMDeckRearSpeechIsEnabled: true,
				})));
			});

		});

	});

	describe('KOMReviewDetailFormIsForwardOnlyField', function test_KOMReviewDetailFormIsForwardOnlyField() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewDetailDeck: JSON.stringify(uDeck()),
			});
		});

		it('sets type', function () {
			browser.assert.attribute(KOMReviewDetailFormIsForwardOnlyField, 'type', 'checkbox');
		});

		it('binds KOMDeckIsForwardOnly', function () {
			browser.assert.OLSKIsChecked(KOMReviewDetailFormIsForwardOnlyField, false);
		});

		context('click', function () {

			before(function () {
				browser.assert.text('#TestKOMReviewDetailDispatchUpdate', '0');
				browser.assert.text('#TestKOMReviewDetailDispatchUpdateData', 'undefined');
			});

			before(function () {
				browser.assert.text('#TestKOMReviewDetailDispatchRecount', '0');
			});

			before(function () {
				return browser.check(KOMReviewDetailFormIsForwardOnlyField);
			});

			it('sends KOMReviewDetailDispatchUpdate', function () {
				browser.assert.text('#TestKOMReviewDetailDispatchUpdate', '1');
				browser.assert.text('#TestKOMReviewDetailDispatchUpdateData', JSON.stringify(uDeck({
					KOMDeckIsForwardOnly: true,
				})));
			});

			it('sends KOMReviewDetailDispatchRecount', function () {
				browser.assert.text('#TestKOMReviewDetailDispatchRecount', '1');
			});

		});

	});

	describe('KOMReviewDetailPlayButton', function test_KOMReviewDetailPlayButton() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewDetailDeck: JSON.stringify(uDeck({
					$KOMDeckTodayReviewCount: 1,
					$KOMDeckTodayUnseenCount: 1,
				})),
			});
		});

		it('classes OLSKCommonButton', function () {
			browser.assert.hasClass(KOMReviewDetailPlayButton, 'OLSKCommonButton');
		});

		it('classes OLSKCommonButtonPrimary', function () {
			browser.assert.hasClass(KOMReviewDetailPlayButton, 'OLSKCommonButtonPrimary');
		});

		it('sets accesskey', function () {
			browser.assert.attribute(KOMReviewDetailPlayButton, 'accesskey', 'g');
		});

		context('click', function () {

			before(function () {
				browser.assert.text('#TestKOMReviewDetailDispatchPlay', '0');
				browser.assert.text('#TestKOMReviewDetailDispatchPlayData', 'undefined');
			});

			before(function () {
				return browser.pressButton(KOMReviewDetailPlayButton);
			});

			it('sends KOMReviewDetailDispatchPlay', function () {
				browser.assert.text('#TestKOMReviewDetailDispatchPlay', '1');
				browser.assert.text('#TestKOMReviewDetailDispatchPlayData', JSON.stringify({
					KOMReviewScheme: KOMReviewLogic.KOMReviewSchemeMixed(),
					KOMReviewMaxUnseenCards: 10,
				}));
			});

		});

	});

	describe('KOMReviewDetailLauncherItemPlayReviewing', function test_KOMReviewDetailLauncherItemPlayReviewing() {

		before(function () {
			return browser.OLSKLauncherRun('KOMReviewDetailLauncherItemPlayReviewing');
		});

		it('sends KOMReviewDetailDispatchPlay', function () {
			browser.assert.text('#TestKOMReviewDetailDispatchPlay', '2');
			browser.assert.text('#TestKOMReviewDetailDispatchPlayData', JSON.stringify({
				KOMReviewScheme: KOMReviewLogic.KOMReviewSchemeReviewing(),
			}));
		});

	});

	describe('KOMReviewDetailLauncherItemPlayUnseen', function test_KOMReviewDetailLauncherItemPlayUnseen() {

		before(function () {
			return browser.OLSKLauncherRun('KOMReviewDetailLauncherItemPlayUnseen');
		});

		it('sends KOMReviewDetailDispatchPlay', function () {
			browser.assert.text('#TestKOMReviewDetailDispatchPlay', '3');
			browser.assert.text('#TestKOMReviewDetailDispatchPlayData', JSON.stringify({
				KOMReviewScheme: KOMReviewLogic.KOMReviewSchemeUnseen(),
				KOMReviewMaxUnseenCards: 10,
			}));
		});

	});

	describe('KOMReviewStats', function test_KOMReviewStats() {

		const item = {
			KOMSpacingGroupingTotal: 1,
			KOMSpacingGroupingUnseen: 2,
			KOMSpacingGroupingDeveloping: 3,
			KOMSpacingGroupingMature: 4,
			KOMSpacingGroupingSuspended: 5,
		};

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewDetailDeck: JSON.stringify(uDeck({
					$KOMDeckTodayStudiedCount: 1,
					$KOMDeckGeneralNotUnseenCount: 1,
					$KOMReviewTodayTotalCards: 1,
					$KOMReviewTodayTimeMinutes: 2,
					$KOMReviewTodayReviewAccuracy: 3,
					$KOMReviewGeneralUpcomingData: [{
						KOMReviewChartElementDateBarTableRowDataKey: 'alfa',
						KOMReviewChartElementDateBarTableRowDataValues: [1, 2],
					}],
					$KOMReviewGeneralHistoricalData: [{
						KOMReviewChartElementDateBarTableRowDataKey: 'alfa',
						KOMReviewChartElementDateBarTableRowDataValues: [1, 2, 3, 4],
					}],
					$KOMReviewChartCompositionCollectionData: item,
				})),
			});
		});

		it('sets KOMReviewTodayTotalCards', function () {
			browser.assert.text('.KOMReviewStats .KOMReviewTodayTotalCardsValue', 1);
		});

		it('sets KOMReviewTodayTimeMinutes', function () {
			browser.assert.text('.KOMReviewStats .KOMReviewTodayTimeMinutesValue', 2);
		});

		it('sets KOMReviewTodayReviewAccuracy', function () {
			browser.assert.text('.KOMReviewStats .KOMReviewTodayReviewAccuracyValue', 3);
		});

		it('sets KOMReviewGeneralUpcomingData', function () {
			browser.assert.text('.KOMReviewGeneralUpcoming .KOMReviewChartElementDateBarTableRow .KOMReviewChartElementDateBarTableRowKey', 'alfa');
			browser.assert.text('.KOMReviewGeneralUpcoming .KOMReviewChartElementDateBarTableRow .KOMReviewChartElementDateBarTableRowCount', '3');
		});

		it('sets KOMReviewGeneralHistoricalData', function () {
			browser.assert.text('.KOMReviewGeneralHistorical .KOMReviewChartElementDateBarTableRow .KOMReviewChartElementDateBarTableRowKey', 'alfa');
			browser.assert.text('.KOMReviewGeneralHistorical .KOMReviewChartElementDateBarTableRow .KOMReviewChartElementDateBarTableRowCount', '10');
		});

		it('sets KOMReviewChartCompositionCollectionData', function () {
			browser.assert.text('.KOMReviewChartCompositionCollection .KOMReviewChartCompositionCollectionTotalCardsValue', item.KOMSpacingGroupingTotal);
			browser.assert.text('.KOMReviewChartCompositionCollection .KOMReviewChartCompositionCollectionUnseenCardsValue', item.KOMSpacingGroupingUnseen);
			browser.assert.text('.KOMReviewChartCompositionCollection .KOMReviewChartCompositionCollectionDevelopingCardsValue', item.KOMSpacingGroupingDeveloping);
			browser.assert.text('.KOMReviewChartCompositionCollection .KOMReviewChartCompositionCollectionMatureCardsValue', item.KOMSpacingGroupingMature);
			browser.assert.text('.KOMReviewChartCompositionCollection .KOMReviewChartCompositionCollectionSuspendedCardsValue', item.KOMSpacingGroupingSuspended);
		});

	});

	describe('KOMReviewDetailLauncherItemExport', function test_KOMReviewDetailLauncherItemExport() {

		before(function () {
			browser.assert.text('#TestKOMReviewDetailDispatchExport', '0')
		});

		before(function () {
			return browser.OLSKLauncherRun('KOMReviewDetailLauncherItemExport');
		});

		it('sends KOMReviewDetailDispatchExport', function () {
			browser.assert.text('#TestKOMReviewDetailDispatchExport', '1');
		});

	});

});
