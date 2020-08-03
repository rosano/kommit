const { throws, deepEqual } = require('assert');

const mainModule = require('./ui-logic.js').default;

const d3 = require('d3');

describe('KOMReviewNormalizeBarWidth', function test_KOMReviewNormalizeBarWidth() {

	it('returns number', function () {
		deepEqual(mainModule.KOMReviewNormalizeBarWidth(), 100);
	});

});

describe('KOMReviewNormalizeBarScaleX', function test_KOMReviewNormalizeBarScaleX() {

	it('throws if param1 not d3.scaleLinear', function () {
		throws(function () {
			mainModule.KOMReviewNormalizeBarScaleX({}, [1]);
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param2 not array', function () {
		throws(function () {
			mainModule.KOMReviewNormalizeBarScaleX(d3.scaleLinear, null);
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param2 empty', function () {
		throws(function () {
			mainModule.KOMReviewNormalizeBarScaleX(d3.scaleLinear, []);
		}, /KOMErrorInputNotValid/);
	});

	it('returns function', function () {
		deepEqual(typeof mainModule.KOMReviewNormalizeBarScaleX(d3.scaleLinear, [1]), 'function');
	});

	context('function', function () {

		const item = mainModule.KOMReviewNormalizeBarScaleX(d3.scaleLinear, [5, 5]);

		it('sets range minimum', function () {
			deepEqual(item(0), 0);
		});

		it('sets range maximum', function () {
			deepEqual(item(10), mainModule.KOMReviewNormalizeBarWidth());
		});
	
	});

});
