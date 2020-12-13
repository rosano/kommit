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

	describe('KOMVitrineCrown', function test_KOMVitrineCrown() {

		it('classes OLSKCommonCard', function () {
			browser.assert.hasClass(KOMVitrineCrown, 'OLSKCommonCard');
		});

		it('classes OLSKCommonCrownCard', function () {
			browser.assert.hasClass(KOMVitrineCrown, 'OLSKCommonCrownCard');
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
