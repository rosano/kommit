const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const uStringWithFormat = require('OLSKString').OLSKStringWithFormat;

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

		describe('ImportData', function test_ImportData() {

			context('not filled', function () {
				
				before(function () {
					return browser.pressButton('.OLSKAppToolbarLauncherButton');
				});

				before(async function () {
					return browser.fill('.LCHLauncherFilterInput', 'KOMReviewLauncherItemDebug_ImportFileData');
				});

				it('alerts if not filled', function () {
					return browser.assert.OLSKAlertText(function () {
						return browser.OLSKPrompt(function () {
							return browser.click('.LCHLauncherPipeItem');
						}, function (dialog) {
							dialog.response = ' ';

							return dialog;
						});
					}, uLocalized('KOMReviewStorageImportErrorNotFilledAlertText'));
				});
			
			});

			context('not json', function () {
				
				before(function () {
					return browser.pressButton('.OLSKAppToolbarLauncherButton');
				});

				before(async function () {
					return browser.fill('.LCHLauncherFilterInput', 'KOMReviewLauncherItemDebug_ImportFileData');
				});

				it('alerts if not json', function () {
					return browser.assert.OLSKAlertText(function () {
						return browser.OLSKPrompt(function () {
							return browser.click('.LCHLauncherPipeItem');
						}, function (dialog) {
							dialog.response = 'alfa';

							return dialog;
						});
					}, uLocalized('KOMReviewStorageImportErrorNotValidAlertText'));
				});
			
			});

			context('not valid', function () {
				
				before(function () {
					return browser.pressButton('.OLSKAppToolbarLauncherButton');
				});

				before(async function () {
					return browser.fill('.LCHLauncherFilterInput', 'KOMReviewLauncherItemDebug_ImportFileData');
				});

				it('alerts if not valid', function () {
					return browser.assert.OLSKAlertText(function () {
						return browser.OLSKPrompt(function () {
							return browser.click('.LCHLauncherPipeItem');
						}, function (dialog) {
							dialog.response = JSON.stringify({});

							return dialog;
						});
					}, uLocalized('KOMReviewStorageImportErrorNotValidAlertText'));
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
				return browser.assert.OLSKLauncherItemText('KOMReviewLauncherItemSelectDeck', uStringWithFormat(uLocalized('KOMReviewLauncherItemSelectDeckTextFormat'), 'alfa'));
			});

		});

		context('connected', function test_connected () {

			before(function () {
				return browser.OLSKLauncherRun('FakeOLSKConnected');
			});

			it('localizes KOMReviewLauncherItemDebugPlungeData', function () {
				return browser.assert.OLSKLauncherItemText('KOMReviewLauncherItemDebugPlungeData', uLocalized('KOMReviewLauncherItemDebugPlungeDataText'));
			});

		});

	});

});
