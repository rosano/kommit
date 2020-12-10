const { throws, deepEqual } = require('assert');

const mod = require('./ui-logic.js');

describe('KOMBrowseListItemAccessibilitySummary', function test_KOMBrowseListItemAccessibilitySummary() {

	const item = {
		KOMCardID: 'alfa',
		KOMCardFrontText: 'bravo',
	};

	it('throws if not object', function () {
		throws(function () {
			mod.KOMBrowseListItemAccessibilitySummary(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns KOMCardFrontText', function () {
		deepEqual(mod.KOMBrowseListItemAccessibilitySummary(item), 'bravo');
	});

	it('returns KOMBrowseListItemUntitledText if no KOMCardFrontText', function () {
		deepEqual(mod.KOMBrowseListItemAccessibilitySummary(Object.assign(item, {
			KOMCardFrontText: undefined,
		}), function (inputData) {
			return inputData;
		}), 'KOMBrowseListItemUntitledText');
	});

});
