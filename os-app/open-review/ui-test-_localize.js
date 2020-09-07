const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const uStringWithFormat = require('OLSKString').OLSKStringWithFormat;

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	describe(`KOMReview_Localize-${ languageCode }`, function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage: languageCode,
			});
		});

		it('localizes title', function () {
			browser.assert.text('title', uLocalized('KOMReviewTitle'));
		});

		it('localizes KOMReviewLauncherItemToggleSimplifiedResponse', function () {
			return browser.assert.OLSKLauncherItemText('KOMReviewLauncherItemToggleSimplifiedResponse', uLocalized('KOMReviewLauncherItemToggleSimplifiedResponseText'));
		});

		it('localizes KOMReviewLauncherItemDebugForceUpdate', function () {
			return browser.assert.OLSKLauncherItemText('KOMReviewLauncherItemDebugForceUpdate', uLocalized('KOMReviewLauncherItemDebugForceUpdateText'));
		});		
		
		describe('KOMReviewStorageImportField', function test_KOMReviewStorageImportField() {

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

			it('localizes KOMReviewLauncherItemSendLoginLink', function () {
				return browser.assert.OLSKLauncherItemText('KOMReviewLauncherItemSendLoginLink', uLocalized('KOMReviewLauncherItemSendLoginLinkText'));
			});

			it('localizes KOMReviewLauncherItemDebugPlungeData', function () {
				return browser.assert.OLSKLauncherItemText('KOMReviewLauncherItemDebugPlungeData', uLocalized('KOMReviewLauncherItemDebugPlungeDataText'));
			});

			it('localizes KOMReviewLauncherItemDebugFlushData', function () {
				return browser.assert.OLSKLauncherItemText('KOMReviewLauncherItemDebugFlushData', uLocalized('KOMReviewLauncherItemDebugFlushDataText'));
			});

			context('KOMReviewLauncherItemDebugFlushData', function () {

				it('localizes KOMReviewLauncherItemDebugFlushDataConfirm', function () {
					return browser.assert.OLSKConfirmQuestionAsync(function () {
						return browser.OLSKLauncherRun('KOMReviewLauncherItemDebugFlushData');
					}, uLocalized('KOMReviewLauncherItemDebugFlushDataConfirmText'));
				});
			
			});

		});

	});

});
