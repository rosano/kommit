const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	KOMFeatureList: '.KOMFeatureList',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('KOMFeatureList_Access', function () {
	
	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});
	
	it('shows KOMFeatureList', function() {
		browser.assert.elements(KOMFeatureList, 1);
	});
	
	it('shows OLSKFeatureList', function() {
		browser.assert.elements('.OLSKFeatureList', 1);
	});
	
});
