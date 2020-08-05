const { throws, deepEqual } = require('assert');

const mainModule = require('./ui-logic.js').default;

const KOMReviewLogic = require('../../logic.js').default;

describe('KOMReviewGeneralTableDays', function test_KOMReviewGeneralTableDays() {

	it('returns number', function () {
		deepEqual(mainModule.KOMReviewGeneralTableDays(), 7);
	});

});

describe('KOMReviewGeneralUpcomingFilter', function test_KOMReviewGeneralUpcomingFilter() {

	const offset = (function (inputData) {
		return inputData < 10 ? `0${ inputData }` : inputData;
	})((new Date()).getTimezoneOffset() / 60);

	const uGroupingDate = function (inputData = 0) {
		return new Date(Date.parse(`${ KOMReviewLogic.KOMReviewLogicDayGrouping(new Date()) }T04:00:00-${ offset }:00`) + inputData);
	};

	it('throws if not array', function () {
		throws(function () {
			mainModule.KOMReviewGeneralUpcomingFilter(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns array', function () {
		deepEqual(mainModule.KOMReviewGeneralUpcomingFilter([]), []);
	});

	it('excludes if before today', function () {
		deepEqual(mainModule.KOMReviewGeneralUpcomingFilter([Object.assign(StubSpacingObjectValid(), {
			KOMSpacingDueDate: uGroupingDate(-1),
		})]), []);
	});

	it('excludes if after KOMReviewGeneralTableDays', function () {
		deepEqual(mainModule.KOMReviewGeneralUpcomingFilter([Object.assign(StubSpacingObjectValid(), {
			KOMSpacingDueDate: uGroupingDate(1000 * 60 * 60 * 24 * mainModule.KOMReviewGeneralTableDays()),
		})]), []);
	});

	it('includes if today', function () {
		const item = Object.assign(StubSpacingObjectValid(), {
			KOMSpacingDueDate: uGroupingDate(),
		});
		deepEqual(mainModule.KOMReviewGeneralUpcomingFilter([item]), [item]);
	});

	it('includes if KOMReviewGeneralTableDays', function () {
		const item = Object.assign(StubSpacingObjectValid(), {
			KOMSpacingDueDate: uGroupingDate(1000 * 60 * 60 * 24 * mainModule.KOMReviewGeneralTableDays() - 1),
		});
		deepEqual(mainModule.KOMReviewGeneralUpcomingFilter([item]), [item]);
	});

});
