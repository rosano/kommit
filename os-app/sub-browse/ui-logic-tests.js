const { throws, deepEqual } = require('assert');

const mod = require('./ui-logic.js').default;

const uLocalized = function (inputData) {
	return inputData + '-LOCALIZED';
};

describe('KOMBrowseAccessibilitySummary', function test_KOMBrowseAccessibilitySummary() {

	it('throws if not object', function () {
		throws(function () {
			mod.KOMBrowseAccessibilitySummary(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function() {
		const item = Math.random().toString();
		deepEqual(mod.KOMBrowseAccessibilitySummary(StubCardObjectValid({
			[uRandomElement('KOMCardFrontText', 'KOMCardFrontText')]: item,
		})), item);
	});

	it('truncates long string', function() {
		const item = Array.from(Array(100)).map(Math.random).join(' ');
		deepEqual(mod.KOMBrowseAccessibilitySummary(StubCardObjectValid({
			[uRandomElement('KOMCardFrontText', 'KOMCardFrontText')]: item,
		})), require('OLSKString').OLSKStringSnippet(item));
	});

	it('prefers KOMCardFrontText', function() {
		const KOMCardFrontText = Math.random().toString();
		deepEqual(mod.KOMBrowseAccessibilitySummary(StubCardObjectValid({
			KOMCardFrontText,
			KOMCardRearText: Math.random().toString(),
		})), KOMCardFrontText);
	});

	it('returns KOMBrowseListItemUntitledText if no KOMCardFrontText', function() {
		deepEqual(mod.KOMBrowseAccessibilitySummary(StubCardObjectValid({
			KOMCardFrontText: undefined,
			KOMCardRearText: undefined,
		}), uLocalized), uLocalized('KOMBrowseListItemUntitledText'));
	});

});

describe('KOMBrowseSortFunction', function test_KOMBrowseSortFunction() {
	
	const item1 = {
		KOMCardModificationDate: new Date(0),
	};
	const item2 = {
		KOMCardModificationDate: new Date(1),
	};

	it('sorts by KOMCardModificationDate descending', function() {
		deepEqual([item1, item2].sort(mod.KOMBrowseSortFunction), [item2, item1]);
	});

	it('sorts by KOMCardCreationDate descending if no KOMCardModificationDate', function() {
		deepEqual([item1, item2].sort(mod.KOMBrowseSortFunction), [item2, item1]);
	});

});

describe('KOMBrowseFilterFunction', function test_KOMBrowseFilterFunction() {

	it('throws error param2 if not string', function() {
		throws(function() {
			mod.KOMBrowseFilterFunction({}, null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns false if no match', function() {
		const tags = uRandomElement(true, false);
		const haystack = 'alfa';
		deepEqual(mod.KOMBrowseFilterFunction({
			[tags ? 'KOMCardTags' : uRandomElement('KOMCardFrontText', 'KOMCardFrontText', 'KOMCardNotes')]: tags ? [haystack] : haystack,
		}, 'bravo'), false);
	});

	it('matches OLSKStringMatch', function() {
		const tags = uRandomElement(true, false);
		const haystack = uRandomElement('alfa', 'álfa');
		deepEqual(mod.KOMBrowseFilterFunction({
			[tags ? 'KOMCardTags' : uRandomElement('KOMCardFrontText', 'KOMCardFrontText', 'KOMCardNotes')]: tags ? [haystack] : haystack,
		}, uRandomElement('alf', 'alfa', 'ALF')), true);
	});

});

describe('KOMBrowseExactFunction', function test_KOMBrowseExactFunction() {

	it('throws error if param2 not string', function() {
		throws(function() {
			mod.KOMBrowseExactFunction({}, null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns false if not starting with input', function() {
		const item = Math.random().toString();
		deepEqual(mod.KOMBrowseExactFunction({
			[uRandomElement('KOMCardFrontText', 'KOMCardFrontText')]: Math.random().toString() + item,
		}, item), false);
	});

	it('returns true', function() {
		const item = Math.random().toString();
		deepEqual(mod.KOMBrowseExactFunction({
			[uRandomElement('KOMCardFrontText', 'KOMCardFrontText')]: item + Math.random().toString(),
		}, item), true);
	});

	it('matches OLSKStringMatch', function() {
		deepEqual(mod.KOMBrowseExactFunction({
			[uRandomElement('KOMCardFrontText', 'KOMCardFrontText')]: uRandomElement('alfa', 'álfa'),
		}, uRandomElement('alf', 'alfa', 'ALF')), true);
	});

});
