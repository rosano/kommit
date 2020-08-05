const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	KOMReviewChartCompositionCollection: '.KOMReviewChartCompositionCollection',

	KOMReviewChartCompositionCollectionTotalCardsLabel: '.KOMReviewChartCompositionCollectionTotalCardsLabel',
	KOMReviewChartCompositionCollectionTotalCardsValue: '.KOMReviewChartCompositionCollectionTotalCardsValue',

	KOMReviewChartCompositionCollectionUnseenCardsColor: '.KOMReviewChartCompositionCollectionUnseenCardsColor',
	KOMReviewChartCompositionCollectionUnseenCardsLabel: '.KOMReviewChartCompositionCollectionUnseenCardsLabel',
	KOMReviewChartCompositionCollectionUnseenCardsValue: '.KOMReviewChartCompositionCollectionUnseenCardsValue',

	KOMReviewChartCompositionCollectionDevelopingCardsColor: '.KOMReviewChartCompositionCollectionDevelopingCardsColor',
	KOMReviewChartCompositionCollectionDevelopingCardsLabel: '.KOMReviewChartCompositionCollectionDevelopingCardsLabel',
	KOMReviewChartCompositionCollectionDevelopingCardsValue: '.KOMReviewChartCompositionCollectionDevelopingCardsValue',

	KOMReviewChartCompositionCollectionMatureCardsColor: '.KOMReviewChartCompositionCollectionMatureCardsColor',
	KOMReviewChartCompositionCollectionMatureCardsLabel: '.KOMReviewChartCompositionCollectionMatureCardsLabel',
	KOMReviewChartCompositionCollectionMatureCardsValue: '.KOMReviewChartCompositionCollectionMatureCardsValue',

	KOMReviewChartCompositionCollectionSuspendedCardsColor: '.KOMReviewChartCompositionCollectionSuspendedCardsColor',
	KOMReviewChartCompositionCollectionSuspendedCardsLabel: '.KOMReviewChartCompositionCollectionSuspendedCardsLabel',
	KOMReviewChartCompositionCollectionSuspendedCardsValue: '.KOMReviewChartCompositionCollectionSuspendedCardsValue',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('KOMReviewChartCompositionCollection_Access', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMReviewChartCompositionCollectionData: JSON.stringify({
				KOMReviewChartCompositionCollectionTotal: 1,
				KOMReviewChartCompositionCollectionUnseen: 1,
				KOMReviewChartCompositionCollectionDeveloping: 2,
				KOMReviewChartCompositionCollectionMature: 3,
				KOMReviewChartCompositionCollectionSuspended: 4,
			}),
		});
	});

	it('shows KOMReviewChartCompositionCollection', function () {
		browser.assert.elements(KOMReviewChartCompositionCollection, 1);
	});

	it('shows KOMReviewChartCompositionCollectionTotalCardsLabel', function () {
		browser.assert.elements(KOMReviewChartCompositionCollectionTotalCardsLabel, 1);
	});

	it('shows KOMReviewChartCompositionCollectionTotalCardsValue', function () {
		browser.assert.elements(KOMReviewChartCompositionCollectionTotalCardsValue, 1);
	});

	it('shows KOMReviewChartCompositionCollectionUnseenCardsColor', function () {
		browser.assert.elements(KOMReviewChartCompositionCollectionUnseenCardsColor, 1);
	});

	it('shows KOMReviewChartCompositionCollectionUnseenCardsLabel', function () {
		browser.assert.elements(KOMReviewChartCompositionCollectionUnseenCardsLabel, 1);
	});

	it('shows KOMReviewChartCompositionCollectionUnseenCardsValue', function () {
		browser.assert.elements(KOMReviewChartCompositionCollectionUnseenCardsValue, 1);
	});

	it('shows KOMReviewChartCompositionCollectionDevelopingCardsColor', function () {
		browser.assert.elements(KOMReviewChartCompositionCollectionDevelopingCardsColor, 1);
	});

	it('shows KOMReviewChartCompositionCollectionDevelopingCardsLabel', function () {
		browser.assert.elements(KOMReviewChartCompositionCollectionDevelopingCardsLabel, 1);
	});

	it('shows KOMReviewChartCompositionCollectionDevelopingCardsValue', function () {
		browser.assert.elements(KOMReviewChartCompositionCollectionDevelopingCardsValue, 1);
	});

	it('shows KOMReviewChartCompositionCollectionMatureCardsColor', function () {
		browser.assert.elements(KOMReviewChartCompositionCollectionMatureCardsColor, 1);
	});

	it('shows KOMReviewChartCompositionCollectionMatureCardsLabel', function () {
		browser.assert.elements(KOMReviewChartCompositionCollectionMatureCardsLabel, 1);
	});

	it('shows KOMReviewChartCompositionCollectionMatureCardsValue', function () {
		browser.assert.elements(KOMReviewChartCompositionCollectionMatureCardsValue, 1);
	});

	it('shows KOMReviewChartCompositionCollectionSuspendedCardsColor', function () {
		browser.assert.elements(KOMReviewChartCompositionCollectionSuspendedCardsColor, 1);
	});

	it('shows KOMReviewChartCompositionCollectionSuspendedCardsLabel', function () {
		browser.assert.elements(KOMReviewChartCompositionCollectionSuspendedCardsLabel, 1);
	});

	it('shows KOMReviewChartCompositionCollectionSuspendedCardsValue', function () {
		browser.assert.elements(KOMReviewChartCompositionCollectionSuspendedCardsValue, 1);
	});

	it('shows KOMReviewChartElementHorizontalStackedBar', function () {
		browser.assert.elements('.KOMReviewChartElementHorizontalStackedBar', 1);
	});

});
