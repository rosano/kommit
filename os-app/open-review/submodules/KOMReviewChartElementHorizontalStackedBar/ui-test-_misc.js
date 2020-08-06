const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const KOMReviewChartElementHorizontalStackedBarLogic = require('./ui-logic.js').default;
const d3 = require('d3');

describe('KOMReviewChartElementHorizontalStackedBar_Misc', function () {

	const values = [1, 2, 3];
	const colors = ['alfa', 'bravo', 'charlie'];

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMReviewChartElementHorizontalStackedBarValues: JSON.stringify(values),
			KOMReviewChartElementHorizontalStackedBarColors: JSON.stringify(colors),
		});
	});

	describe('KOMReviewChartElementHorizontalStackedBar', function test_KOMReviewChartElementHorizontalStackedBar() {

		it('sets viewBox', function () {
			browser.assert.attribute(KOMReviewChartElementHorizontalStackedBar, 'viewBox', `0,0,${ KOMReviewChartElementHorizontalStackedBarLogic.KOMReviewChartElementHorizontalStackedBarWidth() },${ KOMReviewChartElementHorizontalStackedBarLogic.KOMReviewChartElementHorizontalStackedBarHeight() }`);
		});

	});

	describe('KOMReviewChartElementHorizontalStackedBarSection', function test_KOMReviewChartElementHorizontalStackedBarSection() {

		it('sets x', function () {
			values.reduce(function (coll, item, index, original) {
				browser.assert.attribute(`${ KOMReviewChartElementHorizontalStackedBarSection }:nth-child(${ index + 1 })`, 'x', KOMReviewChartElementHorizontalStackedBarLogic.KOMReviewChartElementHorizontalStackedBarScaleHorizontal(d3.scaleLinear, original)(coll));

				return coll + item;
			}, 0);
		});

		it('sets y', function () {
			values.forEach(function (e, i) {
				browser.assert.attribute(`${ KOMReviewChartElementHorizontalStackedBarSection }:nth-child(${ i + 1 })`, 'y', '0');
			})
		});

		it('sets width', function () {
			values.forEach(function (e, i) {
				browser.assert.attribute(`${ KOMReviewChartElementHorizontalStackedBarSection }:nth-child(${ i + 1 })`, 'width', KOMReviewChartElementHorizontalStackedBarLogic.KOMReviewChartElementHorizontalStackedBarScaleHorizontal(d3.scaleLinear, values)(e));
			})
		});

		it('sets height', function () {
			values.forEach(function (e, i) {
				browser.assert.attribute(`${ KOMReviewChartElementHorizontalStackedBarSection }:nth-child(${ i + 1 })`, 'height', KOMReviewChartElementHorizontalStackedBarLogic.KOMReviewChartElementHorizontalStackedBarHeight());
			})
		});

		it('sets fill', function () {
			values.forEach(function (e, i) {
				browser.assert.attribute(`${ KOMReviewChartElementHorizontalStackedBarSection }:nth-child(${ i + 1 })`, 'fill', KOMReviewChartElementHorizontalStackedBarLogic.KOMReviewChartElementHorizontalStackedBarScaleColor(d3.scaleOrdinal, colors, values)(e));
			})
		});

	});

	describe('KOMReviewChartElementHorizontalStackedBarMaximum', function test_KOMReviewChartElementHorizontalStackedBarMaximum() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewChartElementHorizontalStackedBarValues: JSON.stringify(values),
				KOMReviewChartElementHorizontalStackedBarMaximum: 10,
			});
		});		

		it('sets x', function () {
			values.reduce(function (coll, item, index, original) {
				browser.assert.attribute(`${ KOMReviewChartElementHorizontalStackedBarSection }:nth-child(${ index + 1 })`, 'x', KOMReviewChartElementHorizontalStackedBarLogic.KOMReviewChartElementHorizontalStackedBarScaleHorizontal(d3.scaleLinear, original, 10)(coll));

				return coll + item;
			}, 0);
		});

		it('sets width', function () {
			values.forEach(function (e, i) {
				browser.assert.attribute(`${ KOMReviewChartElementHorizontalStackedBarSection }:nth-child(${ i + 1 })`, 'width', KOMReviewChartElementHorizontalStackedBarLogic.KOMReviewChartElementHorizontalStackedBarScaleHorizontal(d3.scaleLinear, values, 10)(e));
			})
		});

	});

});
