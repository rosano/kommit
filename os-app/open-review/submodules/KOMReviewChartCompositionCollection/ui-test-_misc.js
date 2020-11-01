const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const KOMReviewChartElementHorizontalStackedBarLogic = require('../KOMReviewChartElementHorizontalStackedBar/ui-logic.js').default;
const d3 = require('d3-scale');

describe('KOMReviewChartCompositionCollection_Misc', function () {

	const item = {
		KOMSpacingGroupingTotal: 1,
		KOMSpacingGroupingUnseen: 2,
		KOMSpacingGroupingDeveloping: 3,
		KOMSpacingGroupingMature: 4,
		KOMSpacingGroupingRetired: 5,
		KOMSpacingGroupingSuspended: 6,
	};
	const colors = ['alfa', 'bravo', 'charlie', 'delta'];

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMReviewChartCompositionCollectionData: JSON.stringify(item),
		});
	});

	describe('KOMReviewChartCompositionCollectionTotalCardsValue', function test_KOMReviewChartCompositionCollectionTotalCardsValue() {

		it('sets text', function () {
			browser.assert.text(KOMReviewChartCompositionCollectionTotalCardsValue, item.KOMSpacingGroupingTotal);
		});

	});

	describe.skip('KOMReviewChartCompositionCollectionUnseenCardsColor', function test_KOMReviewChartCompositionCollectionUnseenCardsColor() {

		it('sets style', function () {
			browser.assert.attribute(KOMReviewChartCompositionCollectionUnseenCardsColor, 'style', `background: ${ KOMReviewChartElementHorizontalStackedBarLogic.KOMReviewChartElementHorizontalStackedBarScaleColor(d3.scaleOrdinal, colors, Object.values(item))(item.KOMSpacingGroupingUnseen) }`);
		});

	});

	describe('KOMReviewChartCompositionCollectionUnseenCardsValue', function test_KOMReviewChartCompositionCollectionUnseenCardsValue() {

		it('sets text', function () {
			browser.assert.text(KOMReviewChartCompositionCollectionUnseenCardsValue, item.KOMSpacingGroupingUnseen);
		});

	});

	describe.skip('KOMReviewChartCompositionCollectionDevelopingCardsColor', function test_KOMReviewChartCompositionCollectionDevelopingCardsColor() {

		it('sets style', function () {
			browser.assert.attribute(KOMReviewChartCompositionCollectionDevelopingCardsColor, 'style', `background: ${ KOMReviewChartElementHorizontalStackedBarLogic.KOMReviewChartElementHorizontalStackedBarScaleColor(d3.scaleOrdinal, colors, Object.values(item))(item.KOMSpacingGroupingDeveloping) }`);
		});

	});

	describe('KOMReviewChartCompositionCollectionDevelopingCardsValue', function test_KOMReviewChartCompositionCollectionDevelopingCardsValue() {

		it('sets text', function () {
			browser.assert.text(KOMReviewChartCompositionCollectionDevelopingCardsValue, item.KOMSpacingGroupingDeveloping);
		});

	});

	describe.skip('KOMReviewChartCompositionCollectionMatureCardsColor', function test_KOMReviewChartCompositionCollectionMatureCardsColor() {

		it('sets style', function () {
			browser.assert.attribute(KOMReviewChartCompositionCollectionMatureCardsColor, 'style', `background: ${ KOMReviewChartElementHorizontalStackedBarLogic.KOMReviewChartElementHorizontalStackedBarScaleColor(d3.scaleOrdinal, colors, Object.values(item))(item.KOMSpacingGroupingMature) }`);
		});

	});

	describe('KOMReviewChartCompositionCollectionMatureCardsValue', function test_KOMReviewChartCompositionCollectionMatureCardsValue() {

		it('sets text', function () {
			browser.assert.text(KOMReviewChartCompositionCollectionMatureCardsValue, item.KOMSpacingGroupingMature);
		});

	});

	describe.skip('KOMReviewChartCompositionCollectionRetiredCardsColor', function test_KOMReviewChartCompositionCollectionRetiredCardsColor() {

		it('sets style', function () {
			browser.assert.attribute(KOMReviewChartCompositionCollectionRetiredCardsColor, 'style', `background: ${ KOMReviewChartElementHorizontalStackedBarLogic.KOMReviewChartElementHorizontalStackedBarScaleColor(d3.scaleOrdinal, colors, Object.values(item))(item.KOMSpacingGroupingRetired) }`);
		});

	});

	describe('KOMReviewChartCompositionCollectionRetiredCardsValue', function test_KOMReviewChartCompositionCollectionRetiredCardsValue() {

		it('sets text', function () {
			browser.assert.text(KOMReviewChartCompositionCollectionRetiredCardsValue, item.KOMSpacingGroupingRetired);
		});

	});

	describe.skip('KOMReviewChartCompositionCollectionSuspendedCardsColor', function test_KOMReviewChartCompositionCollectionSuspendedCardsColor() {

		it('sets style', function () {
			browser.assert.attribute(KOMReviewChartCompositionCollectionSuspendedCardsColor, 'style', `background: ${ KOMReviewChartElementHorizontalStackedBarLogic.KOMReviewChartElementHorizontalStackedBarScaleColor(d3.scaleOrdinal, colors, Object.values(item))(item.KOMSpacingGroupingSuspended) }`);
		});

	});

	describe('KOMReviewChartCompositionCollectionSuspendedCardsValue', function test_KOMReviewChartCompositionCollectionSuspendedCardsValue() {

		it('sets text', function () {
			browser.assert.text(KOMReviewChartCompositionCollectionSuspendedCardsValue, item.KOMSpacingGroupingSuspended);
		});

	});

	describe('KOMReviewChartElementHorizontalStackedBar', function test_KOMReviewChartElementHorizontalStackedBar() {

		it('sets KOMReviewChartElementHorizontalStackedBarValues', function () {
			browser.assert.elements('.KOMReviewChartElementHorizontalStackedBarSection', 5);
		});

	});

});
