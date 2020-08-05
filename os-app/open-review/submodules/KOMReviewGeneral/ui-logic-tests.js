const { throws, deepEqual } = require('assert');

const mainModule = require('./ui-logic.js').default;

describe('KOMReviewGeneralTableDays', function test_KOMReviewGeneralTableDays() {

	it('returns number', function () {
		deepEqual(mainModule.KOMReviewGeneralTableDays(), 7);
	});

});
