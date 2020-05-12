const { throws, deepEqual } = require('assert');

const mainModule = require('./ui-logic.js');

describe('KOMBrowseListItemAccessibilitySummary', function test_KOMBrowseListItemAccessibilitySummary() {

	const item = {
		KOMCardID: 'alfa',
		KOMCardQuestion: 'bravo',
	};

	it('throws if not object', function () {
		throws(function () {
			mainModule.KOMBrowseListItemAccessibilitySummary(null);
		}, /KOMErrorInputNotValid/);
	});
	
	it('returns KOMCardQuestion', function() {
		deepEqual(mainModule.KOMBrowseListItemAccessibilitySummary(item), 'bravo');
	});
	
	it('returns KOMBrowseListItemUntitledText if no KOMCardQuestion', function() {
		deepEqual(mainModule.KOMBrowseListItemAccessibilitySummary(Object.assign(item, {
			KOMCardQuestion: undefined,
		}), function (inputData) {
			return inputData;
		}), 'KOMBrowseListItemUntitledText');
	});

});

describe('KOMBrowseListItemQuestion', function test_KOMBrowseListItemQuestion() {

	const item = {
		KOMCardID: 'alfa',
		KOMCardQuestion: 'bravo',
	};

	it('throws if not object', function () {
		throws(function () {
			mainModule.KOMBrowseListItemQuestion(null);
		}, /KOMErrorInputNotValid/);
	});
	
	it('returns KOMCardQuestion', function() {
		deepEqual(mainModule.KOMBrowseListItemQuestion(item), 'bravo');
	});
	
	it('returns KOMCardID if no KOMCardQuestion', function() {
		deepEqual(mainModule.KOMBrowseListItemQuestion(Object.assign(item, {
			KOMCardQuestion: undefined,
		})), 'alfa');
	});

});
