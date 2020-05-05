const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	KOMPlay: '.KOMPlay',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('KOMPlay_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows KOMPlay', function () {
		browser.assert.elements(KOMPlay, 1);
	});

});
