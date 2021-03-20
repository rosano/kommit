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

	context('OLSKLanding', function test_OLSKLanding () {

		it('sets OLSKLandingActionHref', function () {
			browser.assert.attribute('.OLSKLandingAction', 'href', OLSKTestingCanonical(require('../open-review/controller.js').OLSKControllerRoutes().shift()));
		});
	
	});

	context('OLSKAppFeaturesList', function test_OLSKAppFeaturesList () {

		it('shows OLSKAppFeatureOpenSource', function () {
			browser.assert.attribute('.OLSKAppFeatureListItemOpenSource a', 'href', process.env.OLSK_REPO_URL);
		});
	
	});

	context('KOMVitrineGuideButton', function test_KOMVitrineGuideButton () {

		it('classes OLSKDecorPress', function () {
			browser.assert.hasClass(KOMVitrineGuideButton, 'OLSKDecorPress');
		});
		
		it('classes OLSKDecorPressCall', function () {
			browser.assert.hasClass(KOMVitrineGuideButton, 'OLSKDecorPressCall');
		});
		
		it('sets href', function () {
			browser.assert.attribute(KOMVitrineGuideButton, 'href', OLSKTestingCanonical(require('../open-guide/controller.js').OLSKControllerRoutes().shift()));
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

	describe('OLSKGazette', function test_OLSKGazette () {

		it('sets src', function () {
			browser.assert.attribute('.OLSKGazetteProjectField', 'value', 'RP_004');
		});

	});

});
