const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	KOMReviewNormalizeBar: '.KOMReviewNormalizeBar',
	
	KOMReviewNormalizeBarSection: '.KOMReviewNormalizeBarSection',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('KOMReviewNormalizeBar_Access', function () {

	const values = [1, 2, 3];

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMReviewNormalizeBarValues: JSON.stringify(values)
		});
	});

	it('shows KOMReviewNormalizeBar', function () {
		browser.assert.elements(KOMReviewNormalizeBar, 1);
	});

	it('shows KOMReviewNormalizeBarSection', function () {
		browser.assert.elements(KOMReviewNormalizeBarSection, values.length);
	});

});
