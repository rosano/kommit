const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const KOMReviewChartElementHorizontalStackedBarLogic = require('../KOMReviewChartElementHorizontalStackedBar/ui-logic.js').default;
const d3 = require('d3');

describe('KOMReviewChartCompositionCollection_Misc', function () {

	const item = {
		KOMSpacingGroupingTotal: Array.from(Array(1)),
		KOMSpacingGroupingUnseen: Array.from(Array(2)),
		KOMSpacingGroupingDeveloping: Array.from(Array(2)),
		KOMSpacingGroupingMature: Array.from(Array(3)),
		KOMSpacingGroupingSuspended: Array.from(Array(4)),
	};
	const colors = ['alfa', 'bravo', 'charlie', 'delta'];

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMReviewChartCompositionCollectionData: JSON.stringify(item),
		});
	});

	describe('KOMReviewChartCompositionCollectionTotalCardsValue', function test_KOMReviewChartCompositionCollectionTotalCardsValue() {

		it('sets text', function () {
			browser.assert.text(KOMReviewChartCompositionCollectionTotalCardsValue, '1');
		});

	});

	describe.skip('KOMReviewChartCompositionCollectionUnseenCardsColor', function test_KOMReviewChartCompositionCollectionUnseenCardsColor() {

		it('sets style', function () {
			browser.assert.attribute(KOMReviewChartCompositionCollectionUnseenCardsColor, 'style', `background: ${ KOMReviewChartElementHorizontalStackedBarLogic.KOMReviewChartElementHorizontalStackedBarScaleColor(d3.scaleOrdinal, colors, Object.values(item))(2) }`);
		});

	});

	describe('KOMReviewChartCompositionCollectionUnseenCardsValue', function test_KOMReviewChartCompositionCollectionUnseenCardsValue() {

		it('sets text', function () {
			browser.assert.text(KOMReviewChartCompositionCollectionUnseenCardsValue, '2');
		});

	});

	describe.skip('KOMReviewChartCompositionCollectionDevelopingCardsColor', function test_KOMReviewChartCompositionCollectionDevelopingCardsColor() {

		it('sets style', function () {
			browser.assert.attribute(KOMReviewChartCompositionCollectionDevelopingCardsColor, 'style', `background: ${ KOMReviewChartElementHorizontalStackedBarLogic.KOMReviewChartElementHorizontalStackedBarScaleColor(d3.scaleOrdinal, colors, Object.values(item))(2) }`);
		});

	});

	describe('KOMReviewChartCompositionCollectionDevelopingCardsValue', function test_KOMReviewChartCompositionCollectionDevelopingCardsValue() {

		it('sets text', function () {
			browser.assert.text(KOMReviewChartCompositionCollectionDevelopingCardsValue, '2');
		});

	});

	describe.skip('KOMReviewChartCompositionCollectionMatureCardsColor', function test_KOMReviewChartCompositionCollectionMatureCardsColor() {

		it('sets style', function () {
			browser.assert.attribute(KOMReviewChartCompositionCollectionMatureCardsColor, 'style', `background: ${ KOMReviewChartElementHorizontalStackedBarLogic.KOMReviewChartElementHorizontalStackedBarScaleColor(d3.scaleOrdinal, colors, Object.values(item))(3) }`);
		});

	});

	describe('KOMReviewChartCompositionCollectionMatureCardsValue', function test_KOMReviewChartCompositionCollectionMatureCardsValue() {

		it('sets text', function () {
			browser.assert.text(KOMReviewChartCompositionCollectionMatureCardsValue, '3');
		});

	});

	describe.skip('KOMReviewChartCompositionCollectionSuspendedCardsColor', function test_KOMReviewChartCompositionCollectionSuspendedCardsColor() {

		it('sets style', function () {
			browser.assert.attribute(KOMReviewChartCompositionCollectionSuspendedCardsColor, 'style', `background: ${ KOMReviewChartElementHorizontalStackedBarLogic.KOMReviewChartElementHorizontalStackedBarScaleColor(d3.scaleOrdinal, colors, Object.values(item))(4) }`);
		});

	});

	describe('KOMReviewChartCompositionCollectionSuspendedCardsValue', function test_KOMReviewChartCompositionCollectionSuspendedCardsValue() {

		it('sets text', function () {
			browser.assert.text(KOMReviewChartCompositionCollectionSuspendedCardsValue, '4');
		});

	});

	describe('KOMReviewChartElementHorizontalStackedBar', function test_KOMReviewChartElementHorizontalStackedBar() {

		it('sets KOMReviewChartElementHorizontalStackedBarValues', function () {
			browser.assert.elements('.KOMReviewChartElementHorizontalStackedBarSection', 4);
		});

	});

});