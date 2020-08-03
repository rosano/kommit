const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const KOMReviewNormalizeBarUILogic = require('../KOMReviewNormalizedBar/ui-logic.js').default;
const d3 = require('d3');

describe('KOMReviewChartCompositionStates_Misc', function () {

	const item = {
		KOMReviewChartCompositionStatesTotal: 1,
		KOMReviewChartCompositionStatesLearning: 2,
		KOMReviewChartCompositionStatesMature: 3,
		KOMReviewChartCompositionStatesSuspended: 4,
	};

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMReviewChartCompositionStatesData: JSON.stringify(item),
		});
	});

	describe('KOMReviewChartCompositionStatesTotalCardsValue', function test_KOMReviewChartCompositionStatesTotalCardsValue() {

		it('sets text', function () {
			browser.assert.text(KOMReviewChartCompositionStatesTotalCardsValue, '1');
		});

	});

	describe.skip('KOMReviewChartCompositionStatesLearningCardsColor', function test_KOMReviewChartCompositionStatesLearningCardsColor() {

		it('sets style', function () {
			browser.assert.attribute(KOMReviewChartCompositionStatesLearningCardsColor, 'style', `background: ${ KOMReviewNormalizeBarUILogic.KOMReviewNormalizeBarScaleColor(d3.scaleOrdinal, d3.schemeGreys, Object.values(item))(2) }`);
		});

	});

	describe('KOMReviewChartCompositionStatesLearningCardsValue', function test_KOMReviewChartCompositionStatesLearningCardsValue() {

		it('sets text', function () {
			browser.assert.text(KOMReviewChartCompositionStatesLearningCardsValue, '2');
		});

	});

	describe.skip('KOMReviewChartCompositionStatesMatureCardsColor', function test_KOMReviewChartCompositionStatesMatureCardsColor() {

		it('sets style', function () {
			browser.assert.attribute(KOMReviewChartCompositionStatesMatureCardsColor, 'style', `background: ${ KOMReviewNormalizeBarUILogic.KOMReviewNormalizeBarScaleColor(d3.scaleOrdinal, d3.schemeGreys, Object.values(item))(3) }`);
		});

	});

	describe('KOMReviewChartCompositionStatesMatureCardsValue', function test_KOMReviewChartCompositionStatesMatureCardsValue() {

		it('sets text', function () {
			browser.assert.text(KOMReviewChartCompositionStatesMatureCardsValue, '3');
		});

	});

	describe.skip('KOMReviewChartCompositionStatesSuspendedCardsColor', function test_KOMReviewChartCompositionStatesSuspendedCardsColor() {

		it('sets style', function () {
			browser.assert.attribute(KOMReviewChartCompositionStatesSuspendedCardsColor, 'style', `background: ${ KOMReviewNormalizeBarUILogic.KOMReviewNormalizeBarScaleColor(d3.scaleOrdinal, d3.schemeGreys, Object.values(item))(4) }`);
		});

	});

	describe('KOMReviewChartCompositionStatesSuspendedCardsValue', function test_KOMReviewChartCompositionStatesSuspendedCardsValue() {

		it('sets text', function () {
			browser.assert.text(KOMReviewChartCompositionStatesSuspendedCardsValue, '4');
		});

	});

	describe('KOMReviewNormalizeBar', function test_KOMReviewNormalizeBar() {

		it('sets KOMReviewNormalizeBarValues', function () {
			browser.assert.elements('.KOMReviewNormalizeBarSection', 3);
		});

	});

});
