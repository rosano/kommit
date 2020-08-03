const { throws, deepEqual } = require('assert');

const mainModule = require('./ui-logic.js').default;

const kTesting = {
	StubDataObjectValid() {
		return {
			KOMReviewChartCompositionStatesTotal: 1,
			KOMReviewChartCompositionStatesDeveloping: 1,
			KOMReviewChartCompositionStatesMature: 1,
			KOMReviewChartCompositionStatesSuspended: 1,
		};
	},
};

describe('KOMReviewChartCompositionStatesIsValid', function test_KOMReviewChartCompositionStatesIsValid() {

	it('throws error if not object', function () {
		throws(function () {
			mainModule.KOMReviewChartCompositionStatesIsValid(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns false if KOMReviewChartCompositionStatesTotal not number', function () {
		deepEqual(mainModule.KOMReviewChartCompositionStatesIsValid(Object.assign(kTesting.StubDataObjectValid(), {
			KOMReviewChartCompositionStatesTotal: null,
		})), false);
	});

	it('returns false if KOMReviewChartCompositionStatesDeveloping not number', function () {
		deepEqual(mainModule.KOMReviewChartCompositionStatesIsValid(Object.assign(kTesting.StubDataObjectValid(), {
			KOMReviewChartCompositionStatesDeveloping: null,
		})), false);
	});

	it('returns false if KOMReviewChartCompositionStatesMature not number', function () {
		deepEqual(mainModule.KOMReviewChartCompositionStatesIsValid(Object.assign(kTesting.StubDataObjectValid(), {
			KOMReviewChartCompositionStatesMature: null,
		})), false);
	});

	it('returns false if KOMReviewChartCompositionStatesSuspended not number', function () {
		deepEqual(mainModule.KOMReviewChartCompositionStatesIsValid(Object.assign(kTesting.StubDataObjectValid(), {
			KOMReviewChartCompositionStatesSuspended: null,
		})), false);
	});

	it('returns true', function () {
		deepEqual(mainModule.KOMReviewChartCompositionStatesIsValid(kTesting.StubDataObjectValid()), true);
	});

});