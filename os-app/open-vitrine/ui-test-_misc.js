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

	describe('KOMVitrineVideo', function test_KOMVitrineVideo () {

		it('classes OLSKCommonVideoListItemMobile', function () {
			browser.assert.hasClass('.KOMVitrineVideo', 'OLSKCommonVideoListItemMobile');
		});

		it('sets src', function () {
			browser.assert.attribute(KOMVitrineVideo, 'src', process.env.KOM_VITRINE_VIDEO_URL);
		});

		it('sets allow', function () {
			browser.assert.attribute(KOMVitrineVideo, 'allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
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

	describe('KOMVitrineGlossaryFamilyLink', function test_KOMVitrineGlossaryFamilyLink () {

		it('sets href', function () {
			browser.assert.attribute(KOMVitrineGlossaryFamilyLink, 'href', process.env.KOM_VITRINE_FAMILY_URL);
		});

	});

	describe('KOMVitrineGlossaryFriendsLink', function test_KOMVitrineGlossaryFriendsLink () {

		it('sets href', function () {
			browser.assert.attribute(KOMVitrineGlossaryFriendsLink, 'href', process.env.KOM_VITRINE_FRIENDS_URL);
		});

	});

	describe('KOMVitrineGlossaryPortugueseLink', function test_KOMVitrineGlossaryPortugueseLink () {

		it('sets href', function () {
			browser.assert.attribute(KOMVitrineGlossaryPortugueseLink, 'href', process.env.KOM_VITRINE_PORTUGUESE_URL);
		});

	});

	describe('ROCOGazette', function test_ROCOGazette () {

		it('sets ROCOBulletinProject', function () {
			browser.assert.attribute('.ROCOBulletinProjectField', 'value', 'Kommit');
		});

	});

	describe('OLSKEdit', function test_OLSKEdit () {

		it('sets OLSKEditURL', function () {
			browser.assert.attribute('.OLSKEdit', 'href', process.env.OLSK_REPO_URL);
		});

	});

});
