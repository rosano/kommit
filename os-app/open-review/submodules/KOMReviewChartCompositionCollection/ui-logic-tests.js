const { throws, deepEqual } = require('assert');

const mainModule = require('./ui-logic.js').default;

const kTesting = {
	StubDataObjectValid() {
		return {
			KOMReviewChartCompositionCollectionTotal: 1,
			KOMReviewChartCompositionCollectionUnseen: 1,
			KOMReviewChartCompositionCollectionDeveloping: 1,
			KOMReviewChartCompositionCollectionMature: 1,
			KOMReviewChartCompositionCollectionSuspended: 1,
		};
	},
};

describe('KOMReviewChartCompositionCollectionIsValid', function test_KOMReviewChartCompositionCollectionIsValid() {

	it('throws error if not object', function () {
		throws(function () {
			mainModule.KOMReviewChartCompositionCollectionIsValid(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns false if KOMReviewChartCompositionCollectionTotal not number', function () {
		deepEqual(mainModule.KOMReviewChartCompositionCollectionIsValid(Object.assign(kTesting.StubDataObjectValid(), {
			KOMReviewChartCompositionCollectionTotal: null,
		})), false);
	});

	it('returns false if KOMReviewChartCompositionCollectionUnseen not number', function () {
		deepEqual(mainModule.KOMReviewChartCompositionCollectionIsValid(Object.assign(kTesting.StubDataObjectValid(), {
			KOMReviewChartCompositionCollectionUnseen: null,
		})), false);
	});

	it('returns false if KOMReviewChartCompositionCollectionDeveloping not number', function () {
		deepEqual(mainModule.KOMReviewChartCompositionCollectionIsValid(Object.assign(kTesting.StubDataObjectValid(), {
			KOMReviewChartCompositionCollectionDeveloping: null,
		})), false);
	});

	it('returns false if KOMReviewChartCompositionCollectionMature not number', function () {
		deepEqual(mainModule.KOMReviewChartCompositionCollectionIsValid(Object.assign(kTesting.StubDataObjectValid(), {
			KOMReviewChartCompositionCollectionMature: null,
		})), false);
	});

	it('returns false if KOMReviewChartCompositionCollectionSuspended not number', function () {
		deepEqual(mainModule.KOMReviewChartCompositionCollectionIsValid(Object.assign(kTesting.StubDataObjectValid(), {
			KOMReviewChartCompositionCollectionSuspended: null,
		})), false);
	});

	it('returns true', function () {
		deepEqual(mainModule.KOMReviewChartCompositionCollectionIsValid(kTesting.StubDataObjectValid()), true);
	});

});