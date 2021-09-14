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

		it('classes OLSKDecorNoTopPad', function () {
			browser.assert.hasClass(KOMVitrine, 'OLSKDecorNoTopPad');
		});

	});

	describe('OLSKCrown', function test_OLSKCrown () {

		it('sets OLSKCrownCardImageURL', function () {
			browser.assert.attribute('.OLSKCrownCardImage', 'src', '/_shared/KOMRootLink/ui-assets/identity.svg');
		});
	
	});

	describe('KOMVitrineVideo', function () {

		it('classes OLSKCommonVideoListItemMobile', function () {
			browser.assert.hasClass('.KOMVitrineVideo', 'OLSKCommonVideoListItemMobile');
		});

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

	describe('KOMVitrineGlossary', function test_KOMVitrineGlossary () {

		it('classes OLSKDecorGlossary', function () {
			browser.assert.hasClass(KOMVitrineGlossary, 'OLSKDecorGlossary');
		});
		
	});

	describe('ROCOGazette', function test_ROCOGazette () {

		it('sets ROCOBulletinProject', function () {
			browser.assert.attribute('.ROCOBulletinProjectField', 'value', process.env.ROCO_SHARED_PROJECT_ID);
		});

	});

	describe('OLSKEdit', function test_OLSKEdit () {

		it('sets OLSKEditURL', function () {
			browser.assert.attribute('.OLSKEdit', 'href', process.env.OLSK_REPO_URL);
		});

	});

});
