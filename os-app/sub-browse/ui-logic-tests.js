const { throws, deepEqual } = require('assert');

const mainModule = require('./ui-logic.js');

describe('KOMBrowseSort', function test_KOMBrowseSort() {
	
	const item1 = {
		KOMCardModificationDate: new Date(0),
	};
	const item2 = {
		KOMCardModificationDate: new Date(1),
	};

	it('sorts by KOMCardModificationDate descending', function() {
		deepEqual([item1, item2].sort(mainModule.KOMBrowseSort), [item2, item1]);
	});

	it('sorts by KOMCardCreationDate descending if no KOMCardModificationDate', function() {
		deepEqual([item1, item2].sort(mainModule.KOMBrowseSort), [item2, item1]);
	});

});

describe('KOMBrowseFilterFunction', function test_KOMBrowseFilterFunction() {

	it('throws error if not string', function() {
		throws(function() {
			mainModule.KOMBrowseFilterFunction(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns function', function() {
		deepEqual(typeof mainModule.KOMBrowseFilterFunction('alfa'), 'function');
	});

	context('function', function () {

		context('KOMCardFrontText', function () {
			
			it('returns false if no match', function() {
				deepEqual(mainModule.KOMBrowseFilterFunction('bravo')({
					KOMCardFrontText: 'alfa',
				}), false);
			});

			it('returns true', function() {
				deepEqual(mainModule.KOMBrowseFilterFunction('alfa')({
					KOMCardFrontText: 'alfa',
				}), true);
			});

			it('matches partial', function() {
				deepEqual(mainModule.KOMBrowseFilterFunction('alf')({
					KOMCardFrontText: 'alfa',
				}), true);
			});

			it('matches case insensitive', function() {
				deepEqual(mainModule.KOMBrowseFilterFunction('ALF')({
					KOMCardFrontText: 'alfa',
				}), true);
			});
		
		});

		context('KOMCardRearText', function () {
			
			it('returns false if no match', function() {
				deepEqual(mainModule.KOMBrowseFilterFunction('bravo')({
					KOMCardRearText: 'alfa',
				}), false);
			});

			it('returns true', function() {
				deepEqual(mainModule.KOMBrowseFilterFunction('alfa')({
					KOMCardRearText: 'alfa',
				}), true);
			});

			it('matches partial', function() {
				deepEqual(mainModule.KOMBrowseFilterFunction('alf')({
					KOMCardRearText: 'alfa',
				}), true);
			});

			it('matches case insensitive', function() {
				deepEqual(mainModule.KOMBrowseFilterFunction('ALF')({
					KOMCardRearText: 'alfa',
				}), true);
			});
		
		});

	});

});
