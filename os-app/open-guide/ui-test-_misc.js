const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMGuide_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute);
	});

	context('KOMGuide', function () {
		
		it('classes OLSKDecor', function () {
			browser.assert.hasClass(KOMGuide, 'OLSKDecor');
		});

		it('classes OLSKDecorCapped', function () {
			browser.assert.hasClass(KOMGuide, 'OLSKDecorCapped');
		});
	
	});

	describe('KOMGuideCrown', function test_KOMGuideCrown() {

		it('classes OLSKCommonCard', function () {
			browser.assert.hasClass(KOMGuideCrown, 'OLSKCommonCard');
		});

		it('classes OLSKCommonCrownCard', function () {
			browser.assert.hasClass(KOMGuideCrown, 'OLSKCommonCrownCard');
		});
		
	});

});
