const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMVitrine_Misc', function () {

	before(function () {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});

	describe('KOMVitrine', function () {

		it('classes OLSKDecor', function () {
			browser.assert.hasClass(KOMVitrine, 'OLSKDecor');
		});

		it('classes OLSKDecorCapped', function () {
			browser.assert.hasClass(KOMVitrine, 'OLSKDecorCapped');
		});

	});

	describe('KOMVitrineManifest', function test_KOMVitrineManifest() {

		it('sets href', function () {
			browser.assert.attribute(KOMVitrineManifest, 'href', require('../tech-manifest/controller.js').OLSKControllerRoutes().shift().OLSKRoutePath);
		});

	});

	describe('KOMVitrineCrown', function test_KOMVitrineCrown() {

		it('classes OLSKCommonCard', function () {
			browser.assert.hasClass(KOMVitrineCrown, 'OLSKCommonCard');
		});

		it('classes OLSKCommonCrownCardMini', function () {
			browser.assert.hasClass(KOMVitrineCrown, 'OLSKCommonCrownCardMini');
		});
		
	});

	describe('KOMVitrineCrownIcon', function () {

		it('sets role', function () {
			browser.assert.attribute(KOMVitrineCrownIcon, 'role', 'presentation');
		});

		it('sets src', function () {
			browser.assert.attribute(KOMVitrineCrownIcon, 'src', '/_shared/KOMRootLink/ui-assets/identity.svg');
		});

	});

	describe('KOMVitrineVideo', function () {

		it('sets src', function () {
			browser.assert.attribute(KOMVitrineVideo, 'src', process.env.KOM_VITRINE_VIDEO_URL);
		});

		it('sets allowfullscreen', function () {
			browser.assert.attribute(KOMVitrineVideo, 'allowfullscreen', '');
		});

	});

});
