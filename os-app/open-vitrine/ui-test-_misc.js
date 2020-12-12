const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMVitrine_Misc', function () {

	before(function () {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});

	describe('KOMVitrine', function () {

		it('classes OLSKCommon', function () {
			browser.assert.hasClass(KOMVitrine, 'OLSKCommon');
		});

		it('classes OLSKCommonCapped', function () {
			browser.assert.hasClass(KOMVitrine, 'OLSKCommonCapped');
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

		it('sets src', function () {
			browser.assert.attribute(KOMVitrineVideoFrame, 'src', process.env.KOM_VITRINE_VIDEO_URL);
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
