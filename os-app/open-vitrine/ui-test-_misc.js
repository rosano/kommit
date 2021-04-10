const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMVitrine_Misc', function () {

	before(function () {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});

	it('sets manifest', function () {
		browser.assert.attribute('link[rel="manifest"]', 'href', require('../tech-manifest/controller.js').OLSKControllerRoutes().shift().OLSKRoutePath);
	});

	describe('KOMVitrine', function () {

		it('classes OLSKDecor', function () {
			browser.assert.hasClass(KOMVitrine, 'OLSKDecor');
		});

		it('classes OLSKDecorCapped', function () {
			browser.assert.hasClass(KOMVitrine, 'OLSKDecorCapped');
		});

	});

	describe('OLSKCrown', function test_OLSKCrown () {

		it('sets OLSKCrownCardImageURL', function () {
			browser.assert.attribute('.OLSKCrownCardImage', 'src', '/_shared/KOMRootLink/ui-assets/identity.svg');
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

	describe('OLSKGazette', function test_OLSKGazette () {

		it('sets src', function () {
			browser.assert.attribute('.OLSKGazetteProjectField', 'value', 'RP_004');
		});

	});

});
