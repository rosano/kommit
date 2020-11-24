const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const OLSKFund = require('OLSKFund');

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, 'en');
};

describe('KOMReview_Fund', function () {

	describe('OLSKAppToolbarFundButton', function test_OLSKAppToolbarFundButton() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute);
		});

		context('not connected', function () {

			before(function () {
				browser.assert.elements('.KOMReviewStorageToolbar', 0);
			});
			
			context('click', function () {

				it('alerts', function() {
					browser.assert.OLSKConfirmQuestion(function () {
						return browser.pressButton('.OLSKAppToolbarFundButton');
					}, uLocalized('OLSKRemoteStorageConnectConfirmText'));
				});

				it('shows KOMReviewStorageToolbar', function () {
					browser.assert.elements('.KOMReviewStorageToolbar', 1);
				});

				context('cancel', function () {

					before(function () {
						return browser.pressButton('.OLSKAppToolbarStorageButton');
					});

					before(function () {
						browser.assert.elements('.KOMReviewStorageToolbar', 0);
					});
					
					before(function () {
						return browser.OLSKConfirm(function () {
							return browser.pressButton('.OLSKAppToolbarFundButton');
						}, function (dialog) {
							dialog.response = false;

							return dialog;
						});
					});

					it('does nothing', function () {
						browser.assert.elements('.KOMReviewStorageToolbar', 0);
					});
				
				});
				
			});
		
		});

		context('connected', function () {

			before(function () {
				return browser.OLSKLauncherRun('FakeOLSKConnected');
			});

			before(function () {
				return browser.pressButton('.OLSKAppToolbarFundButton');
			});

			it('opens OLSKWebView', function () {
				return browser.assert.attribute('.OLSKWebViewWindowButton', 'href', OLSKFund.OLSKFundURL({
					ParamFormURL: process.env.OLSK_FUND_FORM_URL,
					ParamProject: 'RP_004',
					ParamIdentity: 'alfa',
					ParamHomeURL: browser.window.location.href,
				}));
			});

			context('receive_message', function () {
				
				before(function () {
					return browser.evaluate(`window.postMessage({
						OLSK_FUND_CONFIRMATION_CODE: Math.random().toString(),
					}, window.location.href)`);
				});

				before(function () {
					return browser.wait({ duration: 500 });
				});

				it('closes OLSKWebView', function () {
					browser.assert.elements('.OLSKWebView', 0);
				});
			
			});

		});

	});

	describe('OLSKAppToolbarFundLimit', function test_OLSKAppToolbarFundLimit() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute);
		});

		it('starts at KOM_FUND_DOCUMENT_LIMIT', function () {
			browser.assert.text('.OLSKAppToolbarFundLimit', process.env.KOM_FUND_DOCUMENT_LIMIT);
		});

		context('create_deck', function () {
			
			before(function () {
				return browser.OLSKPrompt(function () {
					return browser.pressButton('.KOMReviewMasterCreateButton');
				}, function (dialog) {
					return Object.assign(dialog, {
						response: 'alfa'
					});
				});
			});

			it('shows KOMReviewMasterListItem', function () { // #hotfix-invisible-until-assert
				browser.assert.elements('.KOMReviewMasterListItem', 1);
			});

			it('updates number', function () {
				browser.assert.text('.OLSKAppToolbarFundLimit', (process.env.KOM_FUND_DOCUMENT_LIMIT - 1).toString());
			});
		
		});

		context('create_card', function () {
			
			before(function () {
				return browser.pressButton('.KOMReviewMasterListItem');
			});

			before(function () {
				return browser.pressButton('.KOMReviewDetailToolbarCardsButton');
			});

			before(function () {
				return browser.pressButton('.KOMBrowseListToolbarCreateButton');
			});

			it('updates number', function () {
				browser.assert.text('.OLSKAppToolbarFundLimit', (process.env.KOM_FUND_DOCUMENT_LIMIT - 2).toString());
			});
		
		});

		context('remove_card', function () {
			
			before(function () {
				return browser.pressButton('.KOMBrowseInfoToolbarDiscardButton');
			});

			it('updates number', function () {
				browser.assert.text('.OLSKAppToolbarFundLimit', (process.env.KOM_FUND_DOCUMENT_LIMIT - 1).toString());
			});
		
		});

		context('remove_deck', function () {
			
			before(function () {
				return browser.pressButton('.KOMBrowseListToolbarCloseButton');
			});

			before(function () {
				return browser.OLSKPrompt(function () {
					return browser.pressButton('.KOMReviewDetailDiscardButton');
				}, function (dialog) {
					dialog.response = '0';

					return dialog;
				});
			});

			it('updates number', function () {
				browser.assert.elements('.OLSKAppToolbarFundLimit', process.env.KOM_FUND_DOCUMENT_LIMIT);
			});
		
		});

		context.skip('sync', function () {

			before(function () {
				return browser.OLSKLauncherRun('FakeOLSKChangeDelegateCreateDeck');
			});			

			it('updates number', function () {
				browser.assert.elements('.OLSKAppToolbarFundLimit', process.env.KOM_FUND_DOCUMENT_LIMIT - 1);
			});

		});

	});

	context('OLSKFundDispatchProgress', function test_OLSKFundDispatchProgress () {

		before(function () {
			return browser.OLSKLauncherRun('FakeFundProgress');
		});

		it('sets OLSKAppToolbarFundShowProgress', function () {
			return browser.assert.elements('.OLSKAppToolbarFundProgress', 1);
		});

		after(function () {
			return browser.OLSKLauncherRun('FakeFundProgress');
		});
	
	});

	describe('OLSKFundResponseIsPresent', function test_OLSKFundResponseIsPresent () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKFundResponseIsPresent: true,
			});
		});

		it('hides OLSKAppToolbarFundButton', function () {
			browser.assert.elements('.OLSKAppToolbarFundButton', 0);
		});

		it('hides OLSKAppToolbarFundLimit', function () {
			browser.assert.elements('.OLSKAppToolbarFundLimit', 0);
		});

	});

	describe('OLSKFundSetupPostPay', function test_OLSKFundSetupPostPay () {

		before(function () {
			return browser.visit(OLSKTestingCanonical(kDefaultRoute) + '#confirmation=' + Math.random().toString());
		});
		
		before(function () {
			return browser.OLSKLauncherRun('FakeOLSKConnected');
		});

		it('shows OLSKFundLauncherItemClearAuthorization', function () {
			return browser.assert.OLSKLauncherItems('OLSKFundLauncherItemClearAuthorization', 1);
		});
	
	});

	describe('confirmation', function test_confirmation () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute);
		});

		before(function () {
			return browser.OLSKLauncherRun('FakeOLSKConnected');
		});

		before(function () {
			return browser.assert.OLSKLauncherItems('OLSKFundLauncherItemClearAuthorization', 0);
		});

		before(function () {
			return browser.pressButton('.OLSKAppToolbarLauncherButton');
		});

		before(function () {
			return browser.fill('.LCHLauncherFilterInput', 'OLSKFundLauncherItemEnterConfirmation');
		});

		before(function () {
			return browser.OLSKPrompt(function () {
				return browser.click('.LCHLauncherPipeItem');
			}, function (dialog) {
				return Object.assign(dialog, {
					response: Math.random().toString(),
				});
			});
		});

		it('shows OLSKFundLauncherItemClearAuthorization', function () {
			browser.assert.OLSKLauncherItems('OLSKFundLauncherItemClearAuthorization', 1);
		});

	});

	describe('OLSKFundGate', function test_OLSKFundGate () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute);
		});

		before(function () {
			return browser.OLSKLauncherRun('FakeFundDocumentLimit');
		});

		it('alerts', function() {
			browser.assert.OLSKConfirmQuestion(function () {
				return browser.OLSKPrompt(function () {
					return browser.pressButton('.KOMReviewMasterCreateButton');
				}, function (dialog) {
					return Object.assign(dialog, {
						response: Math.random().toString(),
					});
				});
			}, uLocalized('OLSKFundGateText'));
		});

		it('shows KOMReviewStorageToolbar', function () {
			browser.assert.elements('.KOMReviewStorageToolbar', 1);
		});

		it('exits', function () {
			browser.assert.elements('.KOMReviewMasterListItem', 1);
		});

		context('cancel', function () {

			before(function () {
				return browser.pressButton('.OLSKAppToolbarStorageButton');
			});

			before(function () {
				browser.assert.elements('.KOMReviewStorageToolbar', 0);
			});
			
			before(function () {
				return browser.OLSKConfirm(function () {
					return browser.pressButton('.KOMReviewMasterCreateButton');
				}, function (dialog) {
					return Object.assign(dialog, {
						response: false,
					});
				});
			});

			it('does nothing', function () {
				browser.assert.elements('.KOMReviewStorageToolbar', 0);
				browser.assert.elements('.KOMReviewMasterListItem', 1);
			});
		
		});

	});

	describe('document_limit', function test_document_limit () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute);
		});

		before(function () {
			return browser.OLSKLauncherRun('FakeFundDocumentLimit');
		});

		context('create_deck', function () {
			
			it('shows OLSKFundGate', function() {
				browser.assert.OLSKConfirmQuestion(function () {
					return browser.OLSKPrompt(function () {
						return browser.pressButton('.KOMReviewMasterCreateButton');
					}, function (dialog) {
						return Object.assign(dialog, {
							response: Math.random().toString(),
						});
					});
				}, uLocalized('OLSKFundGateText'));
			});
		
		});

		context('create_card', function () {
			
			before(function () {
				return browser.pressButton('.KOMReviewMasterListItem');
			});

			before(function () {
				return browser.pressButton('.KOMReviewDetailToolbarCardsButton');
			});

			it('shows OLSKFundGate', function() {
				browser.assert.OLSKConfirmQuestion(function () {
					return browser.pressButton('.KOMBrowseListToolbarCreateButton');
				}, uLocalized('OLSKFundGateText'));
			});
		
		});

	});

	describe('FakeFundTier2Proxy', function test_FakeFundTier2Proxy () {
		
		before(function () {
			return browser.OLSKVisit(kDefaultRoute);
		});

		it('hides FakeFundTier2Proxy', function () {
			return browser.assert.OLSKLauncherItems('FakeFundTier2Proxy', 0);
		});

		context('Tier2 no bundle', function () {
			
			before(function () {
				return browser.OLSKLauncherRun('FakeFundTier2WithNoBundle');
			});

			it('hides FakeFundTier2Proxy', function () {
				return browser.assert.OLSKLauncherItems('FakeFundTier2Proxy', 0);
			});
		
		});

		context('Tier2', function () {
			
			before(function () {
				return browser.OLSKLauncherRun('FakeFundTier2WithBundle');
			});

			it('show FakeFundTier2Proxy', function () {
				return browser.assert.OLSKLauncherItems('FakeFundTier2Proxy', 1);
			});
		
		});
	
	});

});
