const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMPlay_Misc', function () {	

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('classes OLSKViewport', function () {
		browser.assert.hasClass(KOMPlay, 'OLSKViewport');
	});

});
