const { throws, deepEqual } = require('assert');

const mainModule = require('./ui-logic.js').default;

const KOMSharedLogic = require('../../../_shared/KOMSharedLogic/main.js').default;

const uGroup = function (param1, param2 = []) {
	const outputData = {};
	
	outputData[KOMSharedLogic.KOMSharedGroupingDay(param1)] = [].concat(param2);

	return outputData;
};

describe('KOMReviewGeneralTableDays', function test_KOMReviewGeneralTableDays() {

	it('returns number', function () {
		deepEqual(mainModule.KOMReviewGeneralTableDays(), 7);
	});

});

describe('KOMReviewGeneralHistoricalColors', function test_KOMReviewGeneralHistoricalColors() {

	it('returns array', function () {
		deepEqual(mainModule.KOMReviewGeneralHistoricalColors(), [
			KOMSharedLogic.KOMSharedColorMature(),
			KOMSharedLogic.KOMSharedColorDeveloping(),
			KOMSharedLogic.KOMSharedColorRelearning(),
			KOMSharedLogic.KOMSharedColorUnseen(),
			]);
	});

});

describe('KOMReviewGeneralCollectionColors', function test_KOMReviewGeneralCollectionColors() {

	it('returns array', function () {
		deepEqual(mainModule.KOMReviewGeneralCollectionColors(), [
			KOMSharedLogic.KOMSharedColorUnseen(),
			KOMSharedLogic.KOMSharedColorDeveloping(),
			KOMSharedLogic.KOMSharedColorMature(),
			KOMSharedLogic.KOMSharedColorRetired(),
			]);
	});

});
