const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const OLSKFund = require('OLSKFund');

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, 'en');
};

describe('KOMReview_Fund', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute);
	});

	context('OLSKAppToolbarFundButton', function test_OLSKAppToolbarFundButton() {

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

			it.skip('opens URL', function () {
				return browser.assert.OLSKAlertText(function () {
					return browser.pressButton('.OLSKAppToolbarFundButton');
				}, OLSKFund.OLSKFundURL({
					ParamFormURL: process.env.OLSK_FUND_FORM_URL_SWAP_TOKEN,
					ParamProject: 'RP_004',
					ParamIdentity: 'alfa',
					ParamHomeURL: browser.window.location.href,
				}));
			});

		});

	});

	context('OLSKFundDispatchProgress', function () {

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

	context('OLSKFundResponseIsPresent', function test_OLSKFundResponseIsPresent () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKFundResponseIsPresent: true,
			});
		});

		it('hides OLSKAppToolbarFundButton', function () {
			browser.assert.elements('.OLSKAppToolbarFundButton', 0);
		});

	});

	context('_OLSKFundSetupPostPay', function () {

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

	context('confirmation', function test_confirmation () {

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

});
