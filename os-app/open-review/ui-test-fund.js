const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMReview_Fund', function () {

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

	context('OLSKFundDispatchProgress', function () {

		before(function () {
			return browser.OLSKLauncherRun('FakeFundProgress');
		});

		it('sets OLSKAppToolbarFundShowProgress', function () {
			return browser.assert.elements('.OLSKAppToolbarFundProgress', 1);
		});
	
	});

});
