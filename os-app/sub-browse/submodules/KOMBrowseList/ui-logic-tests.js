const { throws, deepEqual } = require('assert');

const mainModule = require('./ui-logic.js');

describe('KOMBrowseListItemAccessibilitySummary', function test_KOMBrowseListItemAccessibilitySummary() {

	const item = {
		KOMCardID: 'alfa',
		KOMCardFront: 'bravo',
	};

	it('throws if not object', function () {
		throws(function () {
			mainModule.KOMBrowseListItemAccessibilitySummary(null);
		}, /KOMErrorInputNotValid/);
	});
	
	it('returns KOMCardFront', function() {
		deepEqual(mainModule.KOMBrowseListItemAccessibilitySummary(item), 'bravo');
	});
	
	it('returns KOMBrowseListItemUntitledText if no KOMCardFront', function() {
		deepEqual(mainModule.KOMBrowseListItemAccessibilitySummary(Object.assign(item, {
			KOMCardFront: undefined,
		}), function (inputData) {
			return inputData;
		}), 'KOMBrowseListItemUntitledText');
	});

});
