const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	KOMReviewGeneral: '.KOMReviewGeneral',

	KOMReviewGeneralCollection: '.KOMReviewGeneralCollection',
	KOMReviewGeneralCollectionHeading: '.KOMReviewGeneralCollectionHeading',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('KOMReviewGeneral_Access', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMReviewGeneralSpacings: JSON.stringify([]),
		});
	});

	it('shows KOMReviewGeneral', function () {
		browser.assert.elements(KOMReviewGeneral, 1);
	});

	it('shows KOMReviewGeneralCollection', function () {
		browser.assert.elements(KOMReviewGeneralCollection, 1);
	});

	it('shows KOMReviewGeneralCollectionHeading', function () {
		browser.assert.elements(KOMReviewGeneralCollectionHeading, 1);
	});

	it('shows KOMReviewChartCompositionCollection', function () {
		browser.assert.elements('.KOMReviewChartCompositionCollection', 1);
	});

});
