const { throws, deepEqual } = require('assert');

const mainModule = require('./ui-logic.js').default;

const KOMReviewLogic = require('../../ui-logic.js').default;

const uGroup = function (param1, param2 = []) {
	const outputData = {};
	
	outputData[KOMReviewLogic.KOMReviewLogicDayGrouping(param1)] = [].concat(param2);

	return outputData;
};

describe('KOMReviewGeneralTableDays', function test_KOMReviewGeneralTableDays() {

	it('returns number', function () {
		deepEqual(mainModule.KOMReviewGeneralTableDays(), 7);
	});

});

describe('KOMReviewGeneralUpcomingDates', function test_KOMReviewGeneralUpcomingDates() {

	it('returns array', function () {
		deepEqual(mainModule.KOMReviewGeneralUpcomingDates(), Array.from(Array(mainModule.KOMReviewGeneralTableDays())).map(function (e, i) {
			return KOMReviewLogic.KOMReviewLogicDayGrouping(new Date(Date.now() + 1000 * 60 * 60 * 24 * i));
		}));
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

	it('excludes if unseen', function () {
		deepEqual(mainModule.KOMReviewGeneralUpcomingFilter([StubSpacingObjectValid()]), []);
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

describe('KOMReviewGeneralUpcomingGroupByDate', function test_KOMReviewGeneralUpcomingGroupByDate() {

	it('throws if not array', function () {
		throws(function () {
			mainModule.KOMReviewGeneralUpcomingGroupByDate(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns object', function () {
		deepEqual(mainModule.KOMReviewGeneralUpcomingGroupByDate([]), {});
	});

	it('groups by date if single', function () {
		const item = Object.assign(StubSpacingObjectValid(), {
			KOMSpacingDueDate: new Date(),
		});
		deepEqual(mainModule.KOMReviewGeneralUpcomingGroupByDate([item]), uGroup(item.KOMSpacingDueDate, item));
	});

	it('groups by date if multiple', function () {
		const item1 = Object.assign(StubSpacingObjectValid(), {
			KOMSpacingDueDate: new Date('2019-04-12T00:00:00Z'),
		});
		const item2 = Object.assign(StubSpacingObjectValid(), {
			KOMSpacingDueDate: new Date('2019-04-13T00:00:00Z'),
		});
		deepEqual(mainModule.KOMReviewGeneralUpcomingGroupByDate([item1, item2]), Object.assign(uGroup(item1.KOMSpacingDueDate, item1), uGroup(item2.KOMSpacingDueDate, item2)));
	});

	it('groups by date if duplicate', function () {
		const item1 = Object.assign(StubSpacingObjectValid(), {
			KOMSpacingDueDate: new Date(),
		});
		const item2 = Object.assign(StubSpacingObjectValid(), {
			KOMSpacingDueDate: new Date(),
		});
		deepEqual(mainModule.KOMReviewGeneralUpcomingGroupByDate([item1, item2]), uGroup(item1.KOMSpacingDueDate, [item1, item2]));
	});

});

describe('KOMReviewGeneralHistoricalDates', function test_KOMReviewGeneralHistoricalDates() {

	it('returns array', function () {
		deepEqual(mainModule.KOMReviewGeneralHistoricalDates(), Array.from(Array(mainModule.KOMReviewGeneralTableDays())).map(function (e, i) {
			return KOMReviewLogic.KOMReviewLogicDayGrouping(new Date(Date.now() - 1000 * 60 * 60 * 24 * i));
		}));
	});

});

describe('KOMReviewGeneralHistoricalFilter', function test_KOMReviewGeneralHistoricalFilter() {

	const offset = (function (inputData) {
		return inputData < 10 ? `0${ inputData }` : inputData;
	})((new Date()).getTimezoneOffset() / 60);

	const uGroupingDate = function (inputData = 0) {
		return new Date(Date.parse(`${ KOMReviewLogic.KOMReviewLogicDayGrouping(new Date()) }T04:00:00-${ offset }:00`) + inputData);
	};

	it('throws if not array', function () {
		throws(function () {
			mainModule.KOMReviewGeneralHistoricalFilter(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns array', function () {
		deepEqual(mainModule.KOMReviewGeneralHistoricalFilter([]), []);
	});

	it('excludes if unseen', function () {
		deepEqual(mainModule.KOMReviewGeneralHistoricalFilter([StubSpacingObjectValid()]), []);
	});

	it('excludes if after today', function () {
		deepEqual(mainModule.KOMReviewGeneralHistoricalFilter([StubSpacingObjectHistorical(uGroupingDate(1000 * 60 * 60 * 24))]), []);
	});

	it('excludes if before KOMReviewGeneralTableDays', function () {
		deepEqual(mainModule.KOMReviewGeneralHistoricalFilter([StubSpacingObjectHistorical(uGroupingDate(-1000 * 60 * 60 * 24 * mainModule.KOMReviewGeneralTableDays() - 1))]), []);
	});

	it('includes if today', function () {
		const item = StubSpacingObjectHistorical(uGroupingDate());
		deepEqual(mainModule.KOMReviewGeneralHistoricalFilter([item]), [item]);
	});

	it('includes if KOMReviewGeneralTableDays', function () {
		const item = StubSpacingObjectHistorical(uGroupingDate(-1000 * 60 * 60 * 24 * mainModule.KOMReviewGeneralTableDays()));
		deepEqual(mainModule.KOMReviewGeneralHistoricalFilter([item]), [item]);
	});

});

describe('KOMReviewGeneralHistoricalGroupByDate', function test_KOMReviewGeneralHistoricalGroupByDate() {

	it('throws if not array', function () {
		throws(function () {
			mainModule.KOMReviewGeneralHistoricalGroupByDate(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns object', function () {
		deepEqual(mainModule.KOMReviewGeneralHistoricalGroupByDate([]), {});
	});

	it('groups by date if single object', function () {
		const item = StubSpacingObjectHistorical();
		deepEqual(mainModule.KOMReviewGeneralHistoricalGroupByDate([item]), uGroup(item.KOMSpacingChronicles[0].KOMChronicleResponseDate, item));
	});

	it('groups by date if multiple objects', function () {
		const item1 = StubSpacingObjectHistorical(new Date('2019-04-12T00:00:00Z'));
		const item2 = StubSpacingObjectHistorical(new Date('2019-04-13T00:00:00Z'));

		deepEqual(mainModule.KOMReviewGeneralHistoricalGroupByDate([item1, item2]), Object.assign(uGroup(item1.KOMSpacingChronicles[0].KOMChronicleResponseDate, item1), uGroup(item2.KOMSpacingChronicles[0].KOMChronicleResponseDate, item2)));
	});

	it('groups by date if duplicate', function () {
		const item1 = StubSpacingObjectHistorical();
		const item2 = StubSpacingObjectHistorical();
		
		deepEqual(mainModule.KOMReviewGeneralHistoricalGroupByDate([item1, item2]), uGroup(item1.KOMSpacingChronicles[0].KOMChronicleResponseDate, [item1, item2]));
	});

	it('groups by date if multiple objects', function () {
		const item = Object.assign(StubSpacingObjectHistorical(), {
			KOMSpacingChronicles: [
				StubChronicleObjectValid(new Date('2019-04-12T00:00:00Z')),
				StubChronicleObjectValid(new Date('2019-04-13T00:00:00Z')),
			],
		});

		deepEqual(mainModule.KOMReviewGeneralHistoricalGroupByDate([item]), Object.assign(uGroup(item.KOMSpacingChronicles[0].KOMChronicleResponseDate, item), uGroup(item.KOMSpacingChronicles[1].KOMChronicleResponseDate, item)));
	});

});
