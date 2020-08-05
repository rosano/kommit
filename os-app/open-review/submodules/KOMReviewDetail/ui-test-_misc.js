const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();
const KOMReviewLogic = require('../../ui-logic.js').default;

const kTesting = {
	
	uDeck(inputData = {}) {
		return Object.assign({
			KOMDeckName: 'alfa',
			$KOMDeckSpacings: [StubSpacingObjectValid()],
			$KOMDeckTodayReviewCount: 0,
			$KOMDeckTodayUnseenCount: 0,
			$KOMDeckTodayStudiedCount: 0,
		}, inputData);
	},

};

describe('KOMReviewDetail_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMReviewDetailDeck: JSON.stringify(kTesting.uDeck({
				$KOMDeckSpacings: [],
			})),
		});
	});

	describe('KOMReviewDetailToolbar', function test_KOMReviewDetailToolbar() {

		it('classes OLSKToolbar', function () {
			browser.assert.hasClass(KOMReviewDetailToolbar, 'OLSKToolbar');
		});

		it('classes OLSKToolbarJustify', function () {
			browser.assert.hasClass(KOMReviewDetailToolbar, 'OLSKToolbarJustify');
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
			browser.assert.text(KOMReviewDetailToolbarTitle, kTesting.uDeck().KOMDeckName);
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

		it('classes OLSKLayoutButtonNoStyle', function () {
			browser.assert.hasClass(KOMReviewDetailDiscardButton, 'OLSKLayoutButtonNoStyle');
		});

		it('classes OLSKLayoutElementTappable', function () {
			browser.assert.hasClass(KOMReviewDetailDiscardButton, 'OLSKLayoutElementTappable');
		});

		context('click', function () {

			context('response invalid', function () {

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

			context('response invalid', function () {

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
					browser.assert.text('#TestKOMReviewDetailDispatchDiscardData', JSON.stringify(kTesting.uDeck({
						$KOMDeckSpacings: [],
					})));
				});

			});

		});

	});

	describe('KOMReviewDetailRenameButton', function test_KOMReviewDetailRenameButton() {

		context('click', function () {

			before(function () {
				browser.assert.text('#TestKOMReviewDetailDispatchUpdate', '0');
				browser.assert.text('#TestKOMReviewDetailDispatchUpdateData', 'undefined');
			});

			it('sets KOMReviewDetailRenameButtonPrompt response', function () {
				browser.assert.OLSKPromptResponse(function () {
					return browser.pressButton(KOMReviewDetailRenameButton);
				}, kTesting.uDeck().KOMDeckName);
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
					browser.assert.text('#TestKOMReviewDetailDispatchUpdateData', JSON.stringify(kTesting.uDeck({
						KOMDeckName: 'bravo',
						$KOMDeckSpacings: [],
					})));
				});

			});

		});

	});

	describe('KOMReviewDetailFormAudioIsEnabledField', function test_KOMReviewDetailFormAudioIsEnabledField() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewDetailDeck: JSON.stringify(kTesting.uDeck()),
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
				browser.assert.text('#TestKOMReviewDetailDispatchUpdateData', JSON.stringify(kTesting.uDeck({
					KOMDeckAudioIsEnabled: true,
				})));
			});

		});

	});

	describe('KOMReviewDetailFormFrontLanguageCode', function test_KOMReviewDetailFormFrontLanguageCode() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewDetailDeck: JSON.stringify(kTesting.uDeck()),
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
				browser.assert.text('#TestKOMReviewDetailDispatchUpdateData', JSON.stringify(kTesting.uDeck({
					KOMDeckFrontLanguageCode: 'en',
				})));
			});

		});

	});

	describe('KOMReviewDetailFormFrontSpeechIsEnabledField', function test_KOMReviewDetailFormFrontSpeechIsEnabledField() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewDetailDeck: JSON.stringify(kTesting.uDeck()),
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
				browser.assert.text('#TestKOMReviewDetailDispatchUpdateData', JSON.stringify(kTesting.uDeck({
					KOMDeckFrontSpeechIsEnabled: true,
				})));
			});

		});

	});

	describe('KOMReviewDetailFormRearLanguageCode', function test_KOMReviewDetailFormRearLanguageCode() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewDetailDeck: JSON.stringify(kTesting.uDeck()),
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
				browser.assert.text('#TestKOMReviewDetailDispatchUpdateData', JSON.stringify(kTesting.uDeck({
					KOMDeckRearLanguageCode: 'en',
				})));
			});

		});

	});

	describe('KOMReviewDetailFormRearSpeechIsEnabledField', function test_KOMReviewDetailFormRearSpeechIsEnabledField() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewDetailDeck: JSON.stringify(kTesting.uDeck()),
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
				browser.assert.text('#TestKOMReviewDetailDispatchUpdateData', JSON.stringify(kTesting.uDeck({
					KOMDeckRearSpeechIsEnabled: true,
				})));
			});

		});

	});

	describe('KOMReviewDetailFormIsForwardOnlyField', function test_KOMReviewDetailFormIsForwardOnlyField() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewDetailDeck: JSON.stringify(kTesting.uDeck()),
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
				browser.assert.text('#TestKOMReviewDetailDispatchUpdateData', JSON.stringify(kTesting.uDeck({
					KOMDeckIsForwardOnly: true,
				})));
			});

			it('sends KOMReviewDetailDispatchRecount', function () {
				browser.assert.text('#TestKOMReviewDetailDispatchRecount', '1');
			});

		});

	});

	describe('KOMReviewDetailPlayButtonReviewing', function test_KOMReviewDetailPlayButtonReviewing() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewDetailDeck: JSON.stringify(kTesting.uDeck({
					$KOMDeckTodayReviewCount: 1,
					$KOMDeckTodayUnseenCount: 1,
				})),
			});
		});

		context('click', function () {

			before(function () {
				browser.assert.text('#TestKOMReviewDetailDispatchPlay', '0');
				browser.assert.text('#TestKOMReviewDetailDispatchPlayData', 'undefined');
			});

			before(function () {
				return browser.pressButton(KOMReviewDetailPlayButtonReviewing);
			});

			it('sends KOMReviewDetailDispatchPlay', function () {
				browser.assert.text('#TestKOMReviewDetailDispatchPlay', '1');
				browser.assert.text('#TestKOMReviewDetailDispatchPlayData', JSON.stringify({
					KOMReviewScheme: KOMReviewLogic.KOMReviewSchemeReviewing(),
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

	describe('KOMReviewDetailPlayButtonUnseen', function test_KOMReviewDetailPlayButtonUnseen() {

		context('click', function () {

			before(function () {
				return browser.pressButton(KOMReviewDetailPlayButtonUnseen);
			});

			it('sends KOMReviewDetailDispatchPlay', function () {
				browser.assert.text('#TestKOMReviewDetailDispatchPlay', '3');
				browser.assert.text('#TestKOMReviewDetailDispatchPlayData', JSON.stringify({
					KOMReviewScheme: KOMReviewLogic.KOMReviewSchemeUnseen(),
					KOMReviewMaxUnseenCards: 10,
				}));
			});

		});

	});

	describe('KOMReviewDetailLauncherItemPlayUnseen', function test_KOMReviewDetailLauncherItemPlayUnseen() {

		before(function () {
			return browser.OLSKLauncherRun('KOMReviewDetailLauncherItemPlayUnseen');
		});

		it('sends KOMReviewDetailDispatchPlay', function () {
			browser.assert.text('#TestKOMReviewDetailDispatchPlay', '4');
			browser.assert.text('#TestKOMReviewDetailDispatchPlayData', JSON.stringify({
				KOMReviewScheme: KOMReviewLogic.KOMReviewSchemeUnseen(),
				KOMReviewMaxUnseenCards: 10,
			}));
		});

	});

	describe('KOMReviewDetailPlayButtonMixed', function test_KOMReviewDetailPlayButtonMixed() {

		context('click', function () {

			before(function () {
				return browser.pressButton(KOMReviewDetailPlayButtonMixed);
			});

			it('sends KOMReviewDetailDispatchPlay', function () {
				browser.assert.text('#TestKOMReviewDetailDispatchPlay', '5');
				browser.assert.text('#TestKOMReviewDetailDispatchPlayData', JSON.stringify({
					KOMReviewScheme: KOMReviewLogic.KOMReviewSchemeMixed(),
					KOMReviewMaxUnseenCards: 10,
				}));
			});

		});

	});

	describe('KOMReviewDetailPlayButtonSingle', function test_KOMReviewDetailPlayButtonSingle() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewDetailDeck: JSON.stringify(kTesting.uDeck({
					$KOMDeckTodayReviewCount: 1,
				})),
				KOMReviewDetailPlaySingle: true,
			});
		});

		it('sets accesskey', function () {
			browser.assert.attribute(KOMReviewDetailPlayButtonSingle, 'accesskey', 'g');
		});

		context('click', function () {

			before(function () {
				browser.assert.text('#TestKOMReviewDetailDispatchPlay', '0');
				browser.assert.text('#TestKOMReviewDetailDispatchPlayData', 'undefined');
			});

			before(function () {
				return browser.pressButton(KOMReviewDetailPlayButtonSingle);
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

	describe('KOMReviewDetailStatisticsToday', function test_KOMReviewDetailStatisticsToday() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewDetailDeck: JSON.stringify({
					KOMDeckName: 'alfa',
					$KOMDeckSpacings: [],
					$KOMDeckTodayStudiedCount: 1,
					$KOMDeckGeneralNotUnseenCount: 1,
					$KOMDeckTodayStudiedSpacings: [Object.assign(StubSpacingObjectValid(), {
						KOMSpacingChronicles: [StubChronicleObjectValid()],
						KOMSpacingDueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
					}), Object.assign(StubSpacingObjectValid(), {
						KOMSpacingID: 'bravo-backward',
					})],
				}),
			});
		});

		it('sets KOMReviewTodaySpacings', function () {
			browser.assert.text(`${ KOMReviewDetailStatisticsToday } .KOMReviewTodayTotalCardsValue`, '1');
		});

	});

	describe('KOMReviewDetailStatisticsGeneral', function test_KOMReviewDetailStatisticsGeneral() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewDetailDeck: JSON.stringify({
					KOMDeckName: 'alfa',
					$KOMDeckSpacings: [Object.assign(StubSpacingObjectValid(), {
						KOMSpacingChronicles: [StubChronicleObjectValid()],
						KOMSpacingDueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
					}), Object.assign(StubSpacingObjectValid(), {
						KOMSpacingID: 'bravo-backward',
					})],
					$KOMDeckGeneralNotUnseenCount: 1,
				}),
			});
		});

		it('sets KOMReviewGeneralSpacings', function () {
			browser.assert.text(`${ KOMReviewDetailStatisticsGeneral } .KOMReviewChartCompositionStatesTotalCardsValue`, '1');
		});

	});

});
