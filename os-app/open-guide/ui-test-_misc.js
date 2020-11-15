const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMGuide_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('assigns meta:viewport', function () {
		browser.assert.attribute('meta[name=viewport]', 'content', 'width=device-width');
	});

	it('assigns apple-touch-icon', function () {
		browser.assert.attribute('link[rel=apple-touch-icon]', 'href', process.env.KOM_TOUCH_ICON_URL);
	});

	context('KOMGuide', function () {
		
		it('classes OLSKCommon', function () {
			browser.assert.hasClass(KOMGuide, 'OLSKCommon');
		});
	
	});

});
