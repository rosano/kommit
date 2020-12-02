const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMGuide_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('assigns meta:viewport', function () {
		browser.assert.attribute('meta[name=viewport]', 'content', 'width=device-width');
	});

	context('KOMGuide', function () {
		
		it('classes OLSKCommon', function () {
			browser.assert.hasClass(KOMGuide, 'OLSKCommon');
		});
	
	});

	describe('KOMGuideIdentity', function test_KOMGuideIdentity() {

		it('classes OLSKCommonCard', function () {
			browser.assert.hasClass(KOMGuideIdentity, 'OLSKCommonCard');
		});

		it('classes OLSKCommonIdentityCard', function () {
			browser.assert.hasClass(KOMGuideIdentity, 'OLSKCommonIdentityCard');
		});
		
	});

});
