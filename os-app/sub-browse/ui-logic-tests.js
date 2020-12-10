const { throws, deepEqual } = require('assert');

const mod = require('./ui-logic.js').default;

const kTesting = {
	uCard(inputData = {}) {
		return Object.assign({
			KOMCardID: 'alfa',
			KOMCardDeckID: 'bravo',
			KOMCardFrontText: '',
			KOMCardRearText: '',
			KOMCardCreationDate: new Date('2019-02-23T13:56:36Z'),
			KOMCardModificationDate: new Date('2019-02-23T13:56:36Z'),
		}, inputData);
	},
};

describe('KOMBrowseSort', function test_KOMBrowseSort() {

	const item1 = {
		KOMCardModificationDate: new Date(0),
	};
	const item2 = {
		KOMCardModificationDate: new Date(1),
	};

	it('sorts by KOMCardModificationDate descending', function () {
		deepEqual([item1, item2].sort(mod.KOMBrowseSort), [item2, item1]);
	});

	it('sorts by KOMCardCreationDate descending if no KOMCardModificationDate', function () {
		deepEqual([item1, item2].sort(mod.KOMBrowseSort), [item2, item1]);
	});

});

describe('KOMBrowseFilterFunction', function test_KOMBrowseFilterFunction() {

	it('throws error if not string', function () {
		throws(function () {
			mod.KOMBrowseFilterFunction(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns function', function () {
		deepEqual(typeof mod.KOMBrowseFilterFunction('alfa'), 'function');
	});

	context('function', function () {

		context('KOMCardFrontText', function () {

			it('returns false if not OLSKStringMatch', function () {
				deepEqual(mod.KOMBrowseFilterFunction('alfa')(kTesting.uCard({
					KOMCardFrontText: 'bravo',
				})), false);
			});

			it('returns true', function () {
				deepEqual(mod.KOMBrowseFilterFunction('alf')(kTesting.uCard({
					KOMCardFrontText: 'álfa',
				})), true);
			});

		});

		context('KOMCardRearText', function () {

			it('returns false if not OLSKStringMatch', function () {
				deepEqual(mod.KOMBrowseFilterFunction('alfa')(kTesting.uCard({
					KOMCardRearText: 'bravo',
				})), false);
			});

			it('returns true', function () {
				deepEqual(mod.KOMBrowseFilterFunction('alf')(kTesting.uCard({
					KOMCardRearText: 'álfa',
				})), true);
			});

		});

		context('KOMCardTags', function () {

			it('returns false if not OLSKStringMatch', function () {
				deepEqual(mod.KOMBrowseFilterFunction('alfa')(kTesting.uCard({
					KOMCardTags: ['bravo'],
				})), false);
			});

			it('returns true', function () {
				deepEqual(mod.KOMBrowseFilterFunction('alf')(kTesting.uCard({
					KOMCardTags: ['álfa'],
				})), true);
			});

		});

		context('KOMCardNotes', function () {

			it('returns false if not OLSKStringMatch', function () {
				deepEqual(mod.KOMBrowseFilterFunction('alfa')(kTesting.uCard({
					KOMCardNotes: 'bravo',
				})), false);
			});

			it('returns true', function () {
				deepEqual(mod.KOMBrowseFilterFunction('alf')(kTesting.uCard({
					KOMCardNotes: 'álfa',
				})), true);
			});

		});

	});

});

describe('KOMBrowseExactMatchFirst', function test_KOMBrowseExactMatchFirst() {

	it('throws error if param1 not string', function () {
		throws(function () {
			mod.KOMBrowseExactMatchFirst(null, []);
		}, /KOMErrorInputNotValid/);
	});

	it('throws error if param2 not array', function () {
		throws(function () {
			mod.KOMBrowseExactMatchFirst('', null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns array', function () {
		deepEqual(mod.KOMBrowseExactMatchFirst('alfa', []), []);
	});

	it('creates copy', function () {
		const item = [];
		deepEqual(mod.KOMBrowseExactMatchFirst('alfa', item) !== item, true);
	});

	context('KOMCardFrontText', function () {

		it('orders exact OLSKStringMatch first', function () {
			const items = [kTesting.uCard({
				KOMCardFrontText: 'álfa',
			}), kTesting.uCard({
				KOMCardFrontText: 'álf',
			})];
			deepEqual(mod.KOMBrowseExactMatchFirst('alf', items), items.reverse());
		});

	});

	context('KOMCardRearText', function () {

		it('orders exact OLSKStringMatch first', function () {
			const items = [kTesting.uCard({
				KOMCardRearText: 'álfa',
			}), kTesting.uCard({
				KOMCardRearText: 'álf',
			})];
			deepEqual(mod.KOMBrowseExactMatchFirst('alf', items), items.reverse());
		});

	});

});
