const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	KOMRootLink: '.KOMRootLink',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('KOMRootLink_Access', function () {
	
	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});
	
	it('shows KOMRootLink', function() {
		browser.assert.elements(KOMRootLink, 1);
	});
	
	it('shows OLSKRootLink', function() {
		browser.assert.elements('.OLSKRootLink', 1);
	})
	
});
