const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMVitrine_Misc', function () {

	before(function () {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});

	describe('KOMVitrine', function () {
		
		it('classes OLSKCommon', function () {
			browser.assert.hasClass(KOMVitrine, 'OLSKCommon');
		});
	
	});

	describe('KOMVitrineIdentityLogo', function () {
		
		it('sets role', function () {
			browser.assert.attribute(KOMVitrineIdentityLogo, 'role', 'presentation');
		});
		
		it('sets src', function () {
			browser.assert.attribute(KOMVitrineIdentityLogo, 'src', '/_shared/KOMRootLink/ui-assets/identity.svg');
		});
	
	});

});
