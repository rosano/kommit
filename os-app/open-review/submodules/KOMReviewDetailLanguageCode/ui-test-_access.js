const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	KOMReviewDetailLanguageCode: '.KOMReviewDetailLanguageCode',
	
	KOMReviewDetailLanguageCodeFieldLabel: '.KOMReviewDetailLanguageCodeFieldLabel',
	KOMReviewDetailLanguageCodeField: '.KOMReviewDetailLanguageCodeField',
	
	KOMReviewDetailLanguageCodeFieldOptionUnspecified: '.KOMReviewDetailLanguageCodeFieldOptionUnspecified',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('KOMReviewDetailLanguageCode_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMReviewDetailLanguageCodeItem: JSON.stringify({
				KOMDeckName: 'alfa',
			}),
			KOMReviewDetailLanguageCodeItemProperty: 'KOMDeckFrontLanguageCode',
			KOMReviewDetailLanguageCodeOptions: JSON.stringify([]),
		});
	});

	it('shows KOMReviewDetailLanguageCode', function () {
		browser.assert.elements(KOMReviewDetailLanguageCode, 1);
	});

	it('shows KOMReviewDetailLanguageCodeFieldLabel', function () {
		browser.assert.elements(KOMReviewDetailLanguageCodeFieldLabel, 1);
	});

	it('shows KOMReviewDetailLanguageCodeField', function () {
		browser.assert.elements(KOMReviewDetailLanguageCodeField, 1);
	});

	it('shows KOMReviewDetailLanguageCodeFieldOptionUnspecified', function () {
		browser.assert.elements(KOMReviewDetailLanguageCodeFieldOptionUnspecified, 1);
	});

});
