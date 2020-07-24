const { throws, deepEqual } = require('assert');

const mainModule = require('./ui-logic.js').default;

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
		deepEqual([item1, item2].sort(mainModule.KOMBrowseSort), [item2, item1]);
	});

	it('sorts by KOMCardCreationDate descending if no KOMCardModificationDate', function () {
		deepEqual([item1, item2].sort(mainModule.KOMBrowseSort), [item2, item1]);
	});

});

describe('KOMBrowseFilterFunction', function test_KOMBrowseFilterFunction() {

	it('throws error if not string', function () {
		throws(function () {
			mainModule.KOMBrowseFilterFunction(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns function', function () {
		deepEqual(typeof mainModule.KOMBrowseFilterFunction('alfa'), 'function');
	});

	context('function', function () {

		context('KOMCardFrontText', function () {

			it('returns false if no match', function () {
				deepEqual(mainModule.KOMBrowseFilterFunction('bravo')(kTesting.uCard({
					KOMCardFrontText: 'alfa',
				})), false);
			});

			it('returns true', function () {
				deepEqual(mainModule.KOMBrowseFilterFunction('alfa')(kTesting.uCard({
					KOMCardFrontText: 'alfa',
				})), true);
			});

			it('matches partial', function () {
				deepEqual(mainModule.KOMBrowseFilterFunction('alf')(kTesting.uCard({
					KOMCardFrontText: 'alfa',
				})), true);
			});

			it('matches case insensitive', function () {
				deepEqual(mainModule.KOMBrowseFilterFunction('ALF')(kTesting.uCard({
					KOMCardFrontText: 'alfa',
				})), true);
			});

		});

		context('KOMCardRearText', function () {

			it('returns false if no match', function () {
				deepEqual(mainModule.KOMBrowseFilterFunction('bravo')(kTesting.uCard({
					KOMCardRearText: 'alfa',
				})), false);
			});

			it('returns true', function () {
				deepEqual(mainModule.KOMBrowseFilterFunction('alfa')(kTesting.uCard({
					KOMCardRearText: 'alfa',
				})), true);
			});

			it('matches partial', function () {
				deepEqual(mainModule.KOMBrowseFilterFunction('alf')(kTesting.uCard({
					KOMCardRearText: 'alfa',
				})), true);
			});

			it('matches case insensitive', function () {
				deepEqual(mainModule.KOMBrowseFilterFunction('ALF')(kTesting.uCard({
					KOMCardRearText: 'alfa',
				})), true);
			});

		});

		context('KOMCardTags', function () {

			it('returns false if no match', function () {
				deepEqual(mainModule.KOMBrowseFilterFunction('bravo')(kTesting.uCard({
					KOMCardTags: ['alfa'],
				})), false);
			});

			it('returns true', function () {
				deepEqual(mainModule.KOMBrowseFilterFunction('alfa')(kTesting.uCard({
					KOMCardTags: ['alfa'],
				})), true);
			});

			it('matches partial', function () {
				deepEqual(mainModule.KOMBrowseFilterFunction('alf')(kTesting.uCard({
					KOMCardTags: ['alfa'],
				})), true);
			});

			it('matches case insensitive', function () {
				deepEqual(mainModule.KOMBrowseFilterFunction('ALF')(kTesting.uCard({
					KOMCardTags: ['alfa'],
				})), true);
			});

		});

		context('KOMCardNotes', function () {

			it('returns false if no match', function () {
				deepEqual(mainModule.KOMBrowseFilterFunction('bravo')(kTesting.uCard({
					KOMCardNotes: 'alfa',
				})), false);
			});

			it('returns true', function () {
				deepEqual(mainModule.KOMBrowseFilterFunction('alfa')(kTesting.uCard({
					KOMCardNotes: 'alfa',
				})), true);
			});

			it('matches partial', function () {
				deepEqual(mainModule.KOMBrowseFilterFunction('alf')(kTesting.uCard({
					KOMCardNotes: 'alfa',
				})), true);
			});

			it('matches case insensitive', function () {
				deepEqual(mainModule.KOMBrowseFilterFunction('ALF')(kTesting.uCard({
					KOMCardNotes: 'alfa',
				})), true);
			});

		});

	});

});

describe('KOMBrowseMatchFunction', function test_KOMBrowseMatchFunction() {

	it('throws error if not string', function () {
		throws(function () {
			mainModule.KOMBrowseMatchFunction(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns function', function () {
		deepEqual(typeof mainModule.KOMBrowseMatchFunction('alfa'), 'function');
	});

	context('function', function () {

		it('throws error if not array', function () {
			throws(function () {
				mainModule.KOMBrowseMatchFunction('alfa')(null);
			}, /KOMErrorInputNotValid/);
		});

		it('returns array', function () {
			deepEqual(mainModule.KOMBrowseMatchFunction('bravo')([]), []);
		});

		context('KOMCardFrontText', function () {

			it('excludes if no match', function () {
				const items = [kTesting.uCard({
					KOMCardFrontText: 'alfa',
				})];
				deepEqual(mainModule.KOMBrowseMatchFunction('bravo')(items), []);
			});

			it('includes if exact', function () {
				const items = [kTesting.uCard({
					KOMCardFrontText: 'alfa',
				})];
				deepEqual(mainModule.KOMBrowseMatchFunction('alfa')(items), items);
			});

			it('includes if partial', function () {
				const items = [kTesting.uCard({
					KOMCardFrontText: 'alfa',
				})];
				deepEqual(mainModule.KOMBrowseMatchFunction('alf')(items), items);
			});

			it('matches case insensitive', function () {
				const items = [kTesting.uCard({
					KOMCardFrontText: 'alfa',
				})];
				deepEqual(mainModule.KOMBrowseMatchFunction('ALF')(items), items);
			});

			it('orders exact before partial', function () {
				const items = [kTesting.uCard({
					KOMCardFrontText: 'alfa',
				}), kTesting.uCard({
					KOMCardFrontText: 'alf',
				})];
				deepEqual(mainModule.KOMBrowseMatchFunction('alf')(items), items.reverse());
			});

		});

		context('KOMCardRearText', function () {

			it('excludes if no match', function () {
				const items = [kTesting.uCard({
					KOMCardRearText: 'alfa',
				})];
				deepEqual(mainModule.KOMBrowseMatchFunction('bravo')(items), []);
			});

			it('includes if exact', function () {
				const items = [kTesting.uCard({
					KOMCardRearText: 'alfa',
				})];
				deepEqual(mainModule.KOMBrowseMatchFunction('alfa')(items), items);
			});

			it('includes if partial', function () {
				const items = [kTesting.uCard({
					KOMCardRearText: 'alfa',
				})];
				deepEqual(mainModule.KOMBrowseMatchFunction('alf')(items), items);
			});

			it('matches case insensitive', function () {
				const items = [kTesting.uCard({
					KOMCardRearText: 'alfa',
				})];
				deepEqual(mainModule.KOMBrowseMatchFunction('ALF')(items), items);
			});

			it('orders exact before partial', function () {
				const items = [kTesting.uCard({
					KOMCardRearText: 'alfa',
				}), kTesting.uCard({
					KOMCardRearText: 'alf',
				})];
				deepEqual(mainModule.KOMBrowseMatchFunction('alf')(items), items.reverse());
			});

		});

	});

});
