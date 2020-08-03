const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	KOMReviewGeneral: '.KOMReviewGeneral',

	KOMReviewGeneralCardStatesHeading: '.KOMReviewGeneralCardStatesHeading',
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

	it('shows KOMReviewGeneralCardStatesHeading', function () {
		browser.assert.elements(KOMReviewGeneralCardStatesHeading, 1);
	});

	it('shows KOMReviewChartCompositionStates', function () {
		browser.assert.elements('.KOMReviewChartCompositionStates', 1);
	});

});
