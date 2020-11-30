const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMVitrine_Misc', function () {

	before(function () {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});

	it('assigns meta:viewport', function () {
		browser.assert.attribute('meta[name=viewport]', 'content', 'width=device-width');
	});

	it('assigns apple-touch-icon', function () {
		browser.assert.attribute('link[rel=apple-touch-icon]', 'href', process.env.KOM_TOUCH_ICON_URL);
	});

	describe('KOMVitrine', function () {

		it('classes OLSKCommon', function () {
			browser.assert.hasClass(KOMVitrine, 'OLSKCommon');
		});

	});

	describe('KOMVitrineIdentity', function test_KOMVitrineIdentity() {

		it('classes OLSKCommonCard', function () {
			browser.assert.hasClass(KOMVitrineIdentity, 'OLSKCommonCard');
		});

		it('classes OLSKCommonIdentityCard', function () {
			browser.assert.hasClass(KOMVitrineIdentity, 'OLSKCommonIdentityCard');
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

	describe('KOMVitrineVideoFrame', function () {

		it('sets fake-src', function () {
			browser.assert.attribute(KOMVitrineVideoFrame, 'fake-src', process.env.KOM_VITRINE_VIDEO_URL);
		});

		it('sets width', function () {
			browser.assert.attribute(KOMVitrineVideoFrame, 'width', '320');
		});

		it('sets height', function () {
			browser.assert.attribute(KOMVitrineVideoFrame, 'height', '568');
		});

		it('sets frameborder', function () {
			browser.assert.attribute(KOMVitrineVideoFrame, 'frameborder', '0');
		});

	});

});
