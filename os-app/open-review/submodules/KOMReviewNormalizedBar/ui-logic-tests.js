const { throws, deepEqual } = require('assert');

const mainModule = require('./ui-logic.js').default;

const d3 = require('d3');

describe('KOMReviewNormalizeBarWidth', function test_KOMReviewNormalizeBarWidth() {

	it('returns number', function () {
		deepEqual(mainModule.KOMReviewNormalizeBarWidth(), 100);
	});

});

describe('KOMReviewNormalizeBarHeight', function test_KOMReviewNormalizeBarHeight() {

	it('returns number', function () {
		deepEqual(mainModule.KOMReviewNormalizeBarHeight(), 10);
	});

});

describe('KOMReviewNormalizeBarScaleHorizontal', function test_KOMReviewNormalizeBarScaleHorizontal() {

	it('throws if param1 not d3.scaleLinear', function () {
		throws(function () {
			mainModule.KOMReviewNormalizeBarScaleHorizontal({}, [1]);
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param2 not array', function () {
		throws(function () {
			mainModule.KOMReviewNormalizeBarScaleHorizontal(d3.scaleLinear, null);
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param2 empty', function () {
		throws(function () {
			mainModule.KOMReviewNormalizeBarScaleHorizontal(d3.scaleLinear, []);
		}, /KOMErrorInputNotValid/);
	});

	it('returns function', function () {
		deepEqual(typeof mainModule.KOMReviewNormalizeBarScaleHorizontal(d3.scaleLinear, [1]), 'function');
	});

	context('function', function () {

		const item = mainModule.KOMReviewNormalizeBarScaleHorizontal(d3.scaleLinear, [5, 5]);

		it('sets range minimum', function () {
			deepEqual(item(0), 0);
		});

		it('sets range maximum', function () {
			deepEqual(item(10), mainModule.KOMReviewNormalizeBarWidth());
		});
	
	});

});

describe('KOMReviewNormalizeBarScaleColor', function test_KOMReviewNormalizeBarScaleColor() {

	it('throws if param1 not d3.scaleOrdinal', function () {
		throws(function () {
			mainModule.KOMReviewNormalizeBarScaleColor({}, d3.schemeGreys, [1]);
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param2 not d3.schemeGreys', function () {
		throws(function () {
			mainModule.KOMReviewNormalizeBarScaleColor(d3.scaleOrdinal, {}, [1]);
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param3 not array', function () {
		throws(function () {
			mainModule.KOMReviewNormalizeBarScaleColor(d3.scaleOrdinal, d3.schemeGreys, null);
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param3 less than two', function () {
		throws(function () {
			mainModule.KOMReviewNormalizeBarScaleColor(d3.scaleOrdinal, d3.schemeGreys, [1, 2]);
		}, /KOMErrorInputNotValid/);
	});

	it('returns function', function () {
		deepEqual(typeof mainModule.KOMReviewNormalizeBarScaleColor(d3.scaleOrdinal, d3.schemeGreys, [1, 2, 3]), 'function');
	});

	context('function', function () {

		const item = mainModule.KOMReviewNormalizeBarScaleColor(d3.scaleOrdinal, d3.schemeGreys, [1, 2, 3]);

		it('sets range minimum', function () {
			deepEqual(item(1), d3.schemeGreys[3].slice().reverse()[0]);
		});

		it('sets range maximum', function () {
			deepEqual(item(3), d3.schemeGreys[3].slice().reverse()[2]);
		});

		it('sets range unknown', function () {
			deepEqual(item(4), 'red');
		});
	
	});

});
