const { throws, deepEqual } = require('assert');

const mod = require('./ui-logic.js').default;

describe('KOMReviewChartElementDateBarTableRowIsValid', function test_KOMReviewChartElementDateBarTableRowIsValid() {

	it('throws error if not object', function () {
		throws(function () {
			mod.KOMReviewChartElementDateBarTableRowIsValid(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns false if KOMReviewChartElementDateBarTableRowDataKey not string', function () {
		deepEqual(mod.KOMReviewChartElementDateBarTableRowIsValid(StubReviewChartElementDateBarTableRowDataObjectValid({
			KOMReviewChartElementDateBarTableRowDataKey: null,
		})), false);
	});

	it('returns false if KOMReviewChartElementDateBarTableRowDataValues not array', function () {
		deepEqual(mod.KOMReviewChartElementDateBarTableRowIsValid(StubReviewChartElementDateBarTableRowDataObjectValid({
			KOMReviewChartElementDateBarTableRowDataValues: null,
		})), false);
	});

	it('returns false if KOMReviewChartElementDateBarTableRowDataValues empty', function () {
		deepEqual(mod.KOMReviewChartElementDateBarTableRowIsValid(StubReviewChartElementDateBarTableRowDataObjectValid({
			KOMReviewChartElementDateBarTableRowDataValues: [],
		})), false);
	});

	it('returns true', function () {
		deepEqual(mod.KOMReviewChartElementDateBarTableRowIsValid(StubReviewChartElementDateBarTableRowDataObjectValid()), true);
	});

});
