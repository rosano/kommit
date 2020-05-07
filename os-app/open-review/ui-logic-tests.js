const { throws, deepEqual } = require('assert');

const mainModule = require('./ui-logic.js').default;

const kTesting = {
	StubSpacingObjectValid() {
		return {
			KOMSpacingID: 'bravo-forward',
		};
	},
};

describe('KOMReviewSpacingsToday', function test_KOMReviewSpacingsToday() {

	it('throws if not valid', function () {
		throws(function () {
			mainModule.KOMReviewSpacingsToday(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns array', function() {
		deepEqual(mainModule.KOMReviewSpacingsToday([]), []);
	});

	it('includes unseen', function() {
		const item = kTesting.StubSpacingObjectValid();
		deepEqual(mainModule.KOMReviewSpacingsToday([item]), [item]);
	});

	it('includes learning', function() {
		const item = Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingIsLearning: true,
		});
		deepEqual(mainModule.KOMReviewSpacingsToday([item]), [item]);
	});

	it('includes reviewing due past', function() {
		const item = Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingInterval: 1,
			KOMSpacingDueDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
		});
		deepEqual(mainModule.KOMReviewSpacingsToday([item]), [item]);
	});

	it('includes reviewing due present', function() {
		const item = Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingInterval: 1,
			KOMSpacingDueDate: new Date(),
		});
		deepEqual(mainModule.KOMReviewSpacingsToday([item]), [item]);
	});

	it('excludes reviewing due future', function() {
		deepEqual(mainModule.KOMReviewSpacingsToday([Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingInterval: 1,
			KOMSpacingDueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
		})]), []);
	});

});
