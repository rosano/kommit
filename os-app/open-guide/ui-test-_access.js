const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	KOMGuide: '.KOMGuide',

	KOMGuideCrown: '.KOMGuideCrown',
	KOMGuideCrownName: '.KOMGuideCrownName',

	KOMGuideContent: '.KOMGuideContent',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('KOMGuide_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows KOMGuide', function () {
		browser.assert.elements(KOMGuide, 1);
	});

	it('shows KOMGuideCrown', function () {
		browser.assert.elements(KOMGuideCrown, 1);
	});

	it('shows KOMGuideCrownName', function () {
		browser.assert.elements(KOMGuideCrownName, 1);
	});

	it('shows KOMGuideContent', function () {
		browser.assert.elements(KOMGuideContent, 1);
	});

	it('shows KOMRootLink', function () {
		browser.assert.elements('.KOMRootLink', 1);
	});

});
