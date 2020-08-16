const { throws, deepEqual } = require('assert');

const mainModule = require('./ui-logic.js').default;

describe('KOMReviewChartElementDateBarTableRowIsValid', function test_KOMReviewChartElementDateBarTableRowIsValid() {

	it('throws error if not object', function () {
		throws(function () {
			mainModule.KOMReviewChartElementDateBarTableRowIsValid(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns false if KOMReviewChartElementDateBarTableRowDataKey not string', function () {
		deepEqual(mainModule.KOMReviewChartElementDateBarTableRowIsValid(Object.assign(StubReviewChartElementDateBarTableRowDataObjectValid(), {
			KOMReviewChartElementDateBarTableRowDataKey: null,
		})), false);
	});

	it('returns false if KOMReviewChartElementDateBarTableRowDataValues not array', function () {
		deepEqual(mainModule.KOMReviewChartElementDateBarTableRowIsValid(Object.assign(StubReviewChartElementDateBarTableRowDataObjectValid(), {
			KOMReviewChartElementDateBarTableRowDataValues: null,
		})), false);
	});

	it('returns false if KOMReviewChartElementDateBarTableRowDataValues empty', function () {
		deepEqual(mainModule.KOMReviewChartElementDateBarTableRowIsValid(Object.assign(StubReviewChartElementDateBarTableRowDataObjectValid(), {
			KOMReviewChartElementDateBarTableRowDataValues: [],
		})), false);
	});

	it('returns true', function () {
		deepEqual(mainModule.KOMReviewChartElementDateBarTableRowIsValid(StubReviewChartElementDateBarTableRowDataObjectValid()), true);
	});

});
