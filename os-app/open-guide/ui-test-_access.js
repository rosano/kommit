const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	KOMGuide: '.KOMGuide',

	KOMGuideIdentity: '.KOMGuideIdentity',
	KOMGuideIdentityName: '.KOMGuideIdentityName',

	KOMGuideContent: '.KOMGuideContent',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('KOMGuide_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows KOMGuide', function () {
		browser.assert.elements(KOMGuide, 1);
	});

	it('shows KOMGuideIdentity', function () {
		browser.assert.elements(KOMGuideIdentity, 1);
	});

	it('shows KOMGuideIdentityName', function () {
		browser.assert.elements(KOMGuideIdentityName, 1);
	});

	it('shows KOMGuideContent', function () {
		browser.assert.elements(KOMGuideContent, 1);
	});

	it('shows KOMRootLink', function () {
		browser.assert.elements('.KOMRootLink', 1);
	});

});
