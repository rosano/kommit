const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe(`KOMReview_Localize-${ OLSKRoutingLanguage }`, function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
			});
		});

		it('localizes title', function () {
			browser.assert.text('title', uLocalized('KOMReviewTitle'));
		});

		it('localizes KOMReviewLauncherItemToggleSimplifiedResponseButtons', function () {
			return browser.assert.OLSKLauncherItemText('KOMReviewLauncherItemToggleSimplifiedResponseButtons', uLocalized('KOMReviewLauncherItemToggleSimplifiedResponseButtonsText'));
		});

		it('localizes KOMReviewLauncherItemImportJSON', function () {
			return browser.assert.OLSKLauncherItemText('KOMReviewLauncherItemImportJSON', uLocalized('KOMReviewLauncherItemImportJSONText'));
		});

		it('localizes KOMReviewLauncherItemExportJSON', function () {
			return browser.assert.OLSKLauncherItemText('KOMReviewLauncherItemExportJSON', uLocalized('KOMReviewLauncherItemExportJSONText'));
		});

		describe('KOMReviewLauncherItemImportJSON', function test_KOMReviewLauncherItemImportJSON() {

			context('not filled', function () {
				
				before(function () {
					return browser.pressButton('.OLSKAppToolbarLauncherButton');
				});

				before(async function () {
					return browser.fill('.LCHLauncherFilterInput', 'KOMReviewLauncherItemDebug_PromptFakeImportSerialized');
				});

				it('alerts if not filled', function () {
					return browser.assert.OLSKAlertText(function () {
						return browser.OLSKPrompt(function () {
							return browser.click('.LCHLauncherPipeItem');
						}, function (dialog) {
							dialog.response = ' ';

							return dialog;
						});
					}, uLocalized('KOMReviewLauncherItemImportJSONErrorNotFilledAlertText'));
				});
			
			});

			context('not json', function () {
				
				before(function () {
					return browser.pressButton('.OLSKAppToolbarLauncherButton');
				});

				before(async function () {
					return browser.fill('.LCHLauncherFilterInput', 'KOMReviewLauncherItemDebug_PromptFakeImportSerialized');
				});

				it('alerts if not json', function () {
					return browser.assert.OLSKAlertText(function () {
						return browser.OLSKPrompt(function () {
							return browser.click('.LCHLauncherPipeItem');
						}, function (dialog) {
							dialog.response = 'alfa';

							return dialog;
						});
					}, uLocalized('KOMReviewLauncherItemImportJSONErrorNotValidAlertText'));
				});
			
			});

			context('not valid', function () {
				
				before(function () {
					return browser.pressButton('.OLSKAppToolbarLauncherButton');
				});

				before(async function () {
					return browser.fill('.LCHLauncherFilterInput', 'KOMReviewLauncherItemDebug_PromptFakeImportSerialized');
				});

				it('alerts if not valid', function () {
					return browser.assert.OLSKAlertText(function () {
						return browser.OLSKPrompt(function () {
							return browser.click('.LCHLauncherPipeItem');
						}, function (dialog) {
							dialog.response = JSON.stringify({});

							return dialog;
						});
					}, uLocalized('KOMReviewLauncherItemImportJSONErrorNotValidAlertText'));
				});
			
			});
			
		});

		context('KOMReviewMasterCreateButton', function () {

			it('localizes KOMReviewCreatePrompt', function () {
				browser.assert.OLSKPromptQuestion(function () {
					return browser.pressButton('.KOMReviewMasterCreateButton');
				}, uLocalized('KOMReviewCreatePromptText'));
			});

		});

		context('select_deck', function test_select_deck() {

			before(function () {
				return browser.OLSKPrompt(function () {
					return browser.pressButton('.KOMReviewMasterCreateButton');
				}, function (dialog) {
					dialog.response = 'alfa';

					return dialog;
				});
			});

			it('localizes KOMReviewLauncherItemSelectDeck', function () {
				return browser.assert.OLSKLauncherItemText('KOMReviewLauncherItemSelectDeck', OLSKTestingFormatted(uLocalized('KOMReviewLauncherItemSelectDeckTextFormat'), 'alfa'));
			});

		});

		context('connected', function test_connected () {

			before(function () {
				return browser.OLSKLauncherRun('ZDRLauncherItemFakeDispatchConnected');
			});

			it('localizes KOMReviewLauncherItemDebugPlungeData', function () {
				return browser.assert.OLSKLauncherItemText('KOMReviewLauncherItemDebugPlungeData', uLocalized('KOMReviewLauncherItemDebugPlungeDataText'));
			});

		});

		describe('OLSKApropos', function test_OLSKApropos() {

			before(function () {
				return browser.pressButton('.OLSKAppToolbarAproposButton');
			});

			it('sets OLSKModalViewTitleText', function () {
				browser.assert.text('.OLSKModalViewTitle', uLocalized('OLSKAproposHeadingText'));
			});

			after(function () {
				browser.pressButton('.OLSKModalViewCloseButton');
			});

		});

		describe('tongue', function test_tongue() {

			before(function () {
				return browser.pressButton('.OLSKAppToolbarLanguageButton');
			});

			kDefaultRoute.OLSKRouteLanguageCodes.filter(function (e) {
				return e !== OLSKRoutingLanguage;
			}).forEach(function (e) {

				const signature = 'OLSKLanguageSwitcherLauncherItemSwitch-' + e;

				before(function () {
					return browser.fill('.LCHLauncherFilterInput', signature);
				});

				it(`shows ${ signature }`, function () {
					browser.assert.elements('.LCHLauncherPipeItem', 1);
				});

			});

			after(function () {
				browser.pressButton('#TestLCHDebugCloseButton');
			});

		});

	});

});
