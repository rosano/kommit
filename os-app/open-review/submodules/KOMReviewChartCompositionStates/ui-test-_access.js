const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	KOMReviewChartCompositionStates: '.KOMReviewChartCompositionStates',

	KOMReviewChartCompositionStatesTotalCardsLabel: '.KOMReviewChartCompositionStatesTotalCardsLabel',
	KOMReviewChartCompositionStatesTotalCardsValue: '.KOMReviewChartCompositionStatesTotalCardsValue',

	KOMReviewChartCompositionStatesUnseenCardsColor: '.KOMReviewChartCompositionStatesUnseenCardsColor',
	KOMReviewChartCompositionStatesUnseenCardsLabel: '.KOMReviewChartCompositionStatesUnseenCardsLabel',
	KOMReviewChartCompositionStatesUnseenCardsValue: '.KOMReviewChartCompositionStatesUnseenCardsValue',

	KOMReviewChartCompositionStatesDevelopingCardsColor: '.KOMReviewChartCompositionStatesDevelopingCardsColor',
	KOMReviewChartCompositionStatesDevelopingCardsLabel: '.KOMReviewChartCompositionStatesDevelopingCardsLabel',
	KOMReviewChartCompositionStatesDevelopingCardsValue: '.KOMReviewChartCompositionStatesDevelopingCardsValue',

	KOMReviewChartCompositionStatesMatureCardsColor: '.KOMReviewChartCompositionStatesMatureCardsColor',
	KOMReviewChartCompositionStatesMatureCardsLabel: '.KOMReviewChartCompositionStatesMatureCardsLabel',
	KOMReviewChartCompositionStatesMatureCardsValue: '.KOMReviewChartCompositionStatesMatureCardsValue',

	KOMReviewChartCompositionStatesSuspendedCardsColor: '.KOMReviewChartCompositionStatesSuspendedCardsColor',
	KOMReviewChartCompositionStatesSuspendedCardsLabel: '.KOMReviewChartCompositionStatesSuspendedCardsLabel',
	KOMReviewChartCompositionStatesSuspendedCardsValue: '.KOMReviewChartCompositionStatesSuspendedCardsValue',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('KOMReviewChartCompositionStates_Access', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMReviewChartCompositionStatesData: JSON.stringify({
				KOMReviewChartCompositionStatesTotal: 1,
				KOMReviewChartCompositionStatesUnseen: 1,
				KOMReviewChartCompositionStatesDeveloping: 2,
				KOMReviewChartCompositionStatesMature: 3,
				KOMReviewChartCompositionStatesSuspended: 4,
			}),
		});
	});

	it('shows KOMReviewChartCompositionStates', function () {
		browser.assert.elements(KOMReviewChartCompositionStates, 1);
	});

	it('shows KOMReviewChartCompositionStatesTotalCardsLabel', function () {
		browser.assert.elements(KOMReviewChartCompositionStatesTotalCardsLabel, 1);
	});

	it('shows KOMReviewChartCompositionStatesTotalCardsValue', function () {
		browser.assert.elements(KOMReviewChartCompositionStatesTotalCardsValue, 1);
	});

	it('shows KOMReviewChartCompositionStatesUnseenCardsColor', function () {
		browser.assert.elements(KOMReviewChartCompositionStatesUnseenCardsColor, 1);
	});

	it('shows KOMReviewChartCompositionStatesUnseenCardsLabel', function () {
		browser.assert.elements(KOMReviewChartCompositionStatesUnseenCardsLabel, 1);
	});

	it('shows KOMReviewChartCompositionStatesUnseenCardsValue', function () {
		browser.assert.elements(KOMReviewChartCompositionStatesUnseenCardsValue, 1);
	});

	it('shows KOMReviewChartCompositionStatesDevelopingCardsColor', function () {
		browser.assert.elements(KOMReviewChartCompositionStatesDevelopingCardsColor, 1);
	});

	it('shows KOMReviewChartCompositionStatesDevelopingCardsLabel', function () {
		browser.assert.elements(KOMReviewChartCompositionStatesDevelopingCardsLabel, 1);
	});

	it('shows KOMReviewChartCompositionStatesDevelopingCardsValue', function () {
		browser.assert.elements(KOMReviewChartCompositionStatesDevelopingCardsValue, 1);
	});

	it('shows KOMReviewChartCompositionStatesMatureCardsColor', function () {
		browser.assert.elements(KOMReviewChartCompositionStatesMatureCardsColor, 1);
	});

	it('shows KOMReviewChartCompositionStatesMatureCardsLabel', function () {
		browser.assert.elements(KOMReviewChartCompositionStatesMatureCardsLabel, 1);
	});

	it('shows KOMReviewChartCompositionStatesMatureCardsValue', function () {
		browser.assert.elements(KOMReviewChartCompositionStatesMatureCardsValue, 1);
	});

	it('shows KOMReviewChartCompositionStatesSuspendedCardsColor', function () {
		browser.assert.elements(KOMReviewChartCompositionStatesSuspendedCardsColor, 1);
	});

	it('shows KOMReviewChartCompositionStatesSuspendedCardsLabel', function () {
		browser.assert.elements(KOMReviewChartCompositionStatesSuspendedCardsLabel, 1);
	});

	it('shows KOMReviewChartCompositionStatesSuspendedCardsValue', function () {
		browser.assert.elements(KOMReviewChartCompositionStatesSuspendedCardsValue, 1);
	});

	it('shows KOMReviewChartElementNormalizedBar', function () {
		browser.assert.elements('.KOMReviewChartElementNormalizedBar', 1);
	});

});
