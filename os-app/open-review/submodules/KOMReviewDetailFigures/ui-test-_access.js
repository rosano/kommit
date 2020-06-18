const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	KOMReviewDetailFigures: '.KOMReviewDetailFigures',
	
	KOMReviewDetailFiguresTotalCardsLabel: '.KOMReviewDetailFiguresTotalCardsLabel',
	KOMReviewDetailFiguresTotalCardsValue: '.KOMReviewDetailFiguresTotalCardsValue',
	
	KOMReviewDetailFiguresTimeMinutesLabel: '.KOMReviewDetailFiguresTimeMinutesLabel',
	KOMReviewDetailFiguresTimeMinutesValue: '.KOMReviewDetailFiguresTimeMinutesValue',
	
	KOMReviewDetailFiguresReviewAccuracyLabel: '.KOMReviewDetailFiguresReviewAccuracyLabel',
	KOMReviewDetailFiguresReviewAccuracyValue: '.KOMReviewDetailFiguresReviewAccuracyValue',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('KOMReviewDetailFigures_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMReviewDetailFiguresSpacings: JSON.stringify([]),
		});
	});

	it('shows KOMReviewDetailFigures', function () {
		browser.assert.elements(KOMReviewDetailFigures, 1);
	});

	it('shows KOMReviewDetailFiguresTotalCardsLabel', function () {
		browser.assert.elements(KOMReviewDetailFiguresTotalCardsLabel, 1);
	});

	it('shows KOMReviewDetailFiguresTotalCardsValue', function () {
		browser.assert.elements(KOMReviewDetailFiguresTotalCardsValue, 1);
	});

	it('shows KOMReviewDetailFiguresTimeMinutesLabel', function () {
		browser.assert.elements(KOMReviewDetailFiguresTimeMinutesLabel, 1);
	});

	it('shows KOMReviewDetailFiguresTimeMinutesValue', function () {
		browser.assert.elements(KOMReviewDetailFiguresTimeMinutesValue, 1);
	});

	it('shows KOMReviewDetailFiguresReviewAccuracyLabel', function () {
		browser.assert.elements(KOMReviewDetailFiguresReviewAccuracyLabel, 1);
	});

	it('shows KOMReviewDetailFiguresReviewAccuracyValue', function () {
		browser.assert.elements(KOMReviewDetailFiguresReviewAccuracyValue, 1);
	});

});
