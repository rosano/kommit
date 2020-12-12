const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMGuide_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute);
	});

	context('KOMGuide', function () {
		
		it('classes OLSKCommon', function () {
			browser.assert.hasClass(KOMGuide, 'OLSKCommon');
		});

		it('classes OLSKCommonCapped', function () {
			browser.assert.hasClass(KOMGuide, 'OLSKCommonCapped');
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
