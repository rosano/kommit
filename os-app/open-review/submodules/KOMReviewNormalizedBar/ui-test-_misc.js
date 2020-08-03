const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const KOMReviewNormalizeBarUILogic = require('./ui-logic.js').default;
const d3 = require('d3');

describe('KOMReviewNormalizeBar_Misc', function () {

	const values = [1, 2, 3];

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMReviewNormalizeBarValues: JSON.stringify(values)
		});
	});

	describe('KOMReviewNormalizeBar', function test_KOMReviewNormalizeBar() {

		it('sets viewBox', function () {
			browser.assert.attribute(KOMReviewNormalizeBar, 'viewBox', '0,0,100,100');
		});

	});

	describe('KOMReviewNormalizeBarSection', function test_KOMReviewNormalizeBarSection() {

		it('sets x', function () {
			values.reduce(function (coll, item, index, original) {
				browser.assert.attribute(`${ KOMReviewNormalizeBarSection }:nth-child(${ index + 1 })`, 'x', KOMReviewNormalizeBarUILogic.KOMReviewNormalizeBarScaleHorizontal(d3.scaleLinear, original)(coll));

				return coll + item;
			}, 0);
		});

		it('sets y', function () {
			values.forEach(function (e, i) {
				browser.assert.attribute(`${ KOMReviewNormalizeBarSection }:nth-child(${ i + 1 })`, 'y', KOMReviewNormalizeBarUILogic.KOMReviewNormalizeBarHeight());
			})
		});

		it('sets width', function () {
			values.forEach(function (e, i) {
				browser.assert.attribute(`${ KOMReviewNormalizeBarSection }:nth-child(${ i + 1 })`, 'width', KOMReviewNormalizeBarUILogic.KOMReviewNormalizeBarScaleHorizontal(d3.scaleLinear, values)(e));
			})
		});

		it('sets height', function () {
			values.forEach(function (e, i) {
				browser.assert.attribute(`${ KOMReviewNormalizeBarSection }:nth-child(${ i + 1 })`, 'height', KOMReviewNormalizeBarUILogic.KOMReviewNormalizeBarHeight());
			})
		});

		it('sets fill', function () {
			values.forEach(function (e, i) {
				browser.assert.attribute(`${ KOMReviewNormalizeBarSection }:nth-child(${ i + 1 })`, 'fill', KOMReviewNormalizeBarUILogic.KOMReviewNormalizeBarScaleColor(d3.scaleOrdinal, d3.schemeGreys, values)(e));
			})
		});

	});

});
