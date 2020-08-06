const { throws, deepEqual } = require('assert');

const mainModule = require('./ui-logic.js').default;

const d3 = require('d3-scale');

describe('KOMReviewChartElementHorizontalStackedBarWidth', function test_KOMReviewChartElementHorizontalStackedBarWidth() {

	it('returns number', function () {
		deepEqual(mainModule.KOMReviewChartElementHorizontalStackedBarWidth(), 100);
	});

});

describe('KOMReviewChartElementHorizontalStackedBarHeight', function test_KOMReviewChartElementHorizontalStackedBarHeight() {

	it('returns number', function () {
		deepEqual(mainModule.KOMReviewChartElementHorizontalStackedBarHeight(), 10);
	});

});

describe('KOMReviewChartElementHorizontalStackedBarScaleHorizontal', function test_KOMReviewChartElementHorizontalStackedBarScaleHorizontal() {

	it('throws if param1 not d3.scaleLinear', function () {
		throws(function () {
			mainModule.KOMReviewChartElementHorizontalStackedBarScaleHorizontal({}, [1]);
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param2 not array', function () {
		throws(function () {
			mainModule.KOMReviewChartElementHorizontalStackedBarScaleHorizontal(d3.scaleLinear, null);
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param2 empty', function () {
		throws(function () {
			mainModule.KOMReviewChartElementHorizontalStackedBarScaleHorizontal(d3.scaleLinear, []);
		}, /KOMErrorInputNotValid/);
	});

	it('returns function', function () {
		deepEqual(typeof mainModule.KOMReviewChartElementHorizontalStackedBarScaleHorizontal(d3.scaleLinear, [1]), 'function');
	});

	context('function', function () {

		const item = mainModule.KOMReviewChartElementHorizontalStackedBarScaleHorizontal(d3.scaleLinear, [5, 5]);

		it('sets range minimum', function () {
			deepEqual(item(0), 0);
		});

		it('sets range maximum', function () {
			deepEqual(item(10), mainModule.KOMReviewChartElementHorizontalStackedBarWidth());
		});
	
	});

	context('param3', function () {

		it('throws if not number', function () {
			throws(function () {
				mainModule.KOMReviewChartElementHorizontalStackedBarScaleHorizontal(d3.scaleLinear, [1], null);
			}, /KOMErrorInputNotValid/);
		});

		context('function', function () {

			const item = mainModule.KOMReviewChartElementHorizontalStackedBarScaleHorizontal(d3.scaleLinear, [5, 5], 15);

			it('sets range maximum', function () {
				deepEqual(item(15), mainModule.KOMReviewChartElementHorizontalStackedBarWidth());
			});
		
		});
	
	});

});

describe('KOMReviewChartElementHorizontalStackedBarScaleColor', function test_KOMReviewChartElementHorizontalStackedBarScaleColor() {

	it('throws if param1 not d3.scaleOrdinal', function () {
		throws(function () {
			mainModule.KOMReviewChartElementHorizontalStackedBarScaleColor({}, ['alfa', 'bravo', 'charlie'], [1]);
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param2 not array', function () {
		throws(function () {
			mainModule.KOMReviewChartElementHorizontalStackedBarScaleColor(d3.scaleOrdinal, null, [1]);
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param2 empty', function () {
		throws(function () {
			mainModule.KOMReviewChartElementHorizontalStackedBarScaleColor(d3.scaleOrdinal, [], [1]);
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param3 not array', function () {
		throws(function () {
			mainModule.KOMReviewChartElementHorizontalStackedBarScaleColor(d3.scaleOrdinal, ['alfa', 'bravo', 'charlie'], null);
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param3 not equal length to param2', function () {
		throws(function () {
			mainModule.KOMReviewChartElementHorizontalStackedBarScaleColor(d3.scaleOrdinal, ['alfa', 'bravo', 'charlie'], [1, 2]);
		}, /KOMErrorInputNotValid/);
	});

	it('returns function', function () {
		deepEqual(typeof mainModule.KOMReviewChartElementHorizontalStackedBarScaleColor(d3.scaleOrdinal, ['alfa', 'bravo', 'charlie'], [1, 2, 3]), 'function');
	});

	context('function', function () {

		const item = mainModule.KOMReviewChartElementHorizontalStackedBarScaleColor(d3.scaleOrdinal, ['alfa', 'bravo', 'charlie'], [1, 2, 3]);

		it('sets range minimum', function () {
			deepEqual(item(1), 'alfa');
		});

		it('sets range maximum', function () {
			deepEqual(item(3), 'charlie');
		});

		it('sets range unknown', function () {
			deepEqual(item(4), 'pink');
		});
	
	});

});
