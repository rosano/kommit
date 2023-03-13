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

describe('KOMBrowseIsMatch', function test_KOMBrowseIsMatch() {

	it('throws error param2 if not string', function() {
		throws(function() {
			mod.KOMBrowseIsMatch({}, null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns false if no match', function() {
		const tags = uRandomElement(true, false);
		const haystack = 'alfa';
		deepEqual(mod.KOMBrowseIsMatch({
			[tags ? 'KOMCardTags' : uRandomElement('KOMCardFrontText', 'KOMCardFrontText', 'KOMCardNotes')]: tags ? [haystack] : haystack,
		}, 'bravo'), false);
	});

	it('matches OLSKStringMatch', function() {
		const tags = uRandomElement(true, false);
		const haystack = uRandomElement('alfa', 'álfa');
		deepEqual(mod.KOMBrowseIsMatch({
			[tags ? 'KOMCardTags' : uRandomElement('KOMCardFrontText', 'KOMCardFrontText', 'KOMCardNotes')]: tags ? [haystack] : haystack,
		}, uRandomElement('alf', 'alfa', 'ALF')), true);
	});

});

describe('KOMBrowseExactSortFunction', function test_KOMBrowseExactSortFunction() {

	it('throws if param1 not string', function () {
		throws(function () {
			mod.KOMBrowseExactSortFunction(null, Math.random().toString(), Math.random().toString());
		}, /KOMErrorInputNotValid/);
	});

	it('bumps startsWith', function() {
		const item = Math.random().toString();
		const key = uRandomElement('KOMCardFrontText', 'KOMCardRearText');
		deepEqual(mod.KOMBrowseExactSortFunction(item, {
			[key]: Math.random().toString() + item,
		}, {
			[key]: item + Math.random().toString(),
		}), 1);
	});

	it('matches OLSKStringMatch', function() {
		const key = uRandomElement('KOMCardFrontText', 'KOMCardRearText');
		deepEqual(mod.KOMBrowseExactSortFunction(uRandomElement('alf', 'alfa', 'ALF'), {
			[key]: Math.random().toString(),
		}, {
			[key]: uRandomElement('alfa', 'álfa'),
		}), 1);
	});

});

describe('KOMBrowseCardsFromSSV', function test_KOMBrowseCardsFromSSV() {

	it('throws if not string', function () {
		throws(function () {
			mod.KOMBrowseCardsFromSSV(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns array', function() {
		deepEqual(mod.KOMBrowseCardsFromSSV(''), []);
	});

	it('ignores without front', function() {
		deepEqual(mod.KOMBrowseCardsFromSSV(';' + Math.random().toString()), []);
	});

	it('ignores without back', function() {
		deepEqual(mod.KOMBrowseCardsFromSSV(Math.random().toString() + ';'), []);
	});

	it('maps KOMCardFrontText', function() {
		const item = Math.random().toString();
		deepEqual(mod.KOMBrowseCardsFromSSV(item + ';' + Math.random().toString())[0].KOMCardFrontText, item);
	});

	it('maps KOMCardRearText', function() {
		const item = Math.random().toString();
		deepEqual(mod.KOMBrowseCardsFromSSV(Math.random().toString() + ';' + item)[0].KOMCardRearText, item);
	});

	it('maps KOMCardTags single', function() {
		const item = Math.random().toString();
		deepEqual(mod.KOMBrowseCardsFromSSV(Math.random().toString() + ';' + Math.random().toString() + ';;' + item)[0].KOMCardTags, [item]);
	});

	it('maps KOMCardTags multiple', function() {
		const item = [
			Math.random().toString(),
			Math.random().toString(),
		];
		deepEqual(mod.KOMBrowseCardsFromSSV(Math.random().toString() + ';' + Math.random().toString() + ';;' + item.join(','))[0].KOMCardTags, item);
	});

	it('maps KOMCardNotes', function() {
		const item = Math.random().toString();
		deepEqual(mod.KOMBrowseCardsFromSSV(Math.random().toString() + ';' + Math.random().toString() + ';' + item + ';' + Math.random().toString())[0].KOMCardNotes, item);
	});

	it('parses multiple', function() {
		const item = uRandomElement('\n', '  ')
		const KOMCardFrontText = Math.random().toString();
		const KOMCardRearText = Math.random().toString();
		const KOMCardTags = [
			Math.random().toString(),
			Math.random().toString(),
		];
		deepEqual(mod.KOMBrowseCardsFromSSV([
			[KOMCardFrontText, KOMCardRearText, '', KOMCardTags.join(',')].join(';'),
			[KOMCardFrontText, KOMCardRearText, '', KOMCardTags.join(',')].join(';'),
			].join(item)), [{
			KOMCardFrontText,
			KOMCardRearText,
			KOMCardNotes: '',
			KOMCardTags,
		}, {
			KOMCardFrontText,
			KOMCardRearText,
			KOMCardNotes: '',
			KOMCardTags,
		}]);
	});

});
