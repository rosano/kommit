const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const KOMReviewChartElementNormalizedBarUILogic = require('./ui-logic.js').default;
const d3 = require('d3');

describe('KOMReviewChartElementNormalizedBar_Misc', function () {

	const values = [1, 2, 3];

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMReviewChartElementNormalizedBarValues: JSON.stringify(values)
		});
	});

	describe('KOMReviewChartElementNormalizedBar', function test_KOMReviewChartElementNormalizedBar() {

		it('sets viewBox', function () {
			browser.assert.attribute(KOMReviewChartElementNormalizedBar, 'viewBox', `0,0,${ KOMReviewChartElementNormalizedBarUILogic.KOMReviewChartElementNormalizedBarWidth() },${ KOMReviewChartElementNormalizedBarUILogic.KOMReviewChartElementNormalizedBarHeight() }`);
		});

	});

	describe('KOMReviewChartElementNormalizedBarSection', function test_KOMReviewChartElementNormalizedBarSection() {

		it('sets x', function () {
			values.reduce(function (coll, item, index, original) {
				browser.assert.attribute(`${ KOMReviewChartElementNormalizedBarSection }:nth-child(${ index + 1 })`, 'x', KOMReviewChartElementNormalizedBarUILogic.KOMReviewChartElementNormalizedBarScaleHorizontal(d3.scaleLinear, original)(coll));

				return coll + item;
			}, 0);
		});

		it('sets y', function () {
			values.forEach(function (e, i) {
				browser.assert.attribute(`${ KOMReviewChartElementNormalizedBarSection }:nth-child(${ i + 1 })`, 'y', '0');
			})
		});

		it('sets width', function () {
			values.forEach(function (e, i) {
				browser.assert.attribute(`${ KOMReviewChartElementNormalizedBarSection }:nth-child(${ i + 1 })`, 'width', KOMReviewChartElementNormalizedBarUILogic.KOMReviewChartElementNormalizedBarScaleHorizontal(d3.scaleLinear, values)(e));
			})
		});

		it('sets height', function () {
			values.forEach(function (e, i) {
				browser.assert.attribute(`${ KOMReviewChartElementNormalizedBarSection }:nth-child(${ i + 1 })`, 'height', KOMReviewChartElementNormalizedBarUILogic.KOMReviewChartElementNormalizedBarHeight());
			})
		});

		it('sets fill', function () {
			values.forEach(function (e, i) {
				browser.assert.attribute(`${ KOMReviewChartElementNormalizedBarSection }:nth-child(${ i + 1 })`, 'fill', KOMReviewChartElementNormalizedBarUILogic.KOMReviewChartElementNormalizedBarScaleColor(d3.scaleOrdinal, d3.schemeGreys, values)(e));
			})
		});

	});

});
