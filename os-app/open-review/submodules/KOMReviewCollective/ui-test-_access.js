const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	KOMReviewChartCompositionStates: '.KOMReviewChartCompositionStates',

	KOMReviewChartCompositionStatesTotalCardsLabel: '.KOMReviewChartCompositionStatesTotalCardsLabel',
	KOMReviewChartCompositionStatesTotalCardsValue: '.KOMReviewChartCompositionStatesTotalCardsValue',

	KOMReviewChartCompositionStatesLearningCardsColor: '.KOMReviewChartCompositionStatesLearningCardsColor',
	KOMReviewChartCompositionStatesLearningCardsLabel: '.KOMReviewChartCompositionStatesLearningCardsLabel',
	KOMReviewChartCompositionStatesLearningCardsValue: '.KOMReviewChartCompositionStatesLearningCardsValue',

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
				KOMReviewChartCompositionStatesLearning: 2,
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

	it('shows KOMReviewChartCompositionStatesLearningCardsColor', function () {
		browser.assert.elements(KOMReviewChartCompositionStatesLearningCardsColor, 1);
	});

	it('shows KOMReviewChartCompositionStatesLearningCardsLabel', function () {
		browser.assert.elements(KOMReviewChartCompositionStatesLearningCardsLabel, 1);
	});

	it('shows KOMReviewChartCompositionStatesLearningCardsValue', function () {
		browser.assert.elements(KOMReviewChartCompositionStatesLearningCardsValue, 1);
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

	it('shows KOMReviewNormalizeBar', function () {
		browser.assert.elements('.KOMReviewNormalizeBar', 1);
	});

});
