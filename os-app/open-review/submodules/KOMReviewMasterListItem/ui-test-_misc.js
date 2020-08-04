const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const uFlatten = function (inputData) {
	return [].concat.apply([], inputData);
};

const item = {
	KOMDeckID: 'alfa',
	KOMDeckName: 'bravo',
	KOMDeckIsForwardOnly: true,
	$KOMDeckSpacings: uFlatten(Array.from(new Array(4)).map(function (e, i) {
		return [true, false].map(function (forward) {
			return {
				KOMSpacingID: (i + 1).toString() + '-' + (forward ? 'forward' : 'backward'),
				KOMSpacingChronicles: [],
				KOMSpacingDueDate: (function () {
					if (!i) {
						return new Date();
					}

					if (i === 2) {
						return new Date(Date.now() + 1000 * 60 * 60 * 24 * 3);
					}

					if (i === 3 && forward) {
						return new Date(Date.now() + 1000 * 60 * 60 * 24 * 3);
					}

					return undefined;
				})(),
				$KOMSpacingCard: {
					KOMCardID: (i + 1).toString(),
					KOMCardDeckID: 'bravo',
					KOMCardFrontText: (i + 1).toString(),
					KOMCardRearText: 'charlie',
					KOMCardNotes: 'delta',
					KOMCardCreationDate: new Date('2019-02-23T13:56:36Z'),
					KOMCardModificationDate: new Date('2019-02-23T13:56:36Z'),
				},
			};
		});
	})),
};

describe('KOMReviewMasterListItem_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMReviewMasterListItemObject: JSON.stringify(item),
		});
	});

	describe('KOMReviewMasterListItem', function test_KOMReviewMasterListItem() {

		it('sets aria-label', function () {
			browser.assert.attribute(KOMReviewMasterListItem, 'aria-label', 'bravo');
		});

		it('classes OLSKLayoutButtonNoStyle', function () {
			browser.assert.hasClass(KOMReviewMasterListItem, 'OLSKLayoutButtonNoStyle');
		});

		context('click', function () {

			before(function () {
				browser.assert.text('#TestKOMReviewMasterListItemDispatchClick', '0');
			});

			before(function () {
				return browser.pressButton('.KOMReviewMasterListItem');
			});

			it('sends KOMReviewMasterListItemDispatchClick', function () {
				browser.assert.text('#TestKOMReviewMasterListItemDispatchClick', '1');
			});

		});

	});

	describe('KOMReviewMasterListItemName', function test_KOMReviewMasterListItemName() {

		it('sets text', function () {
			browser.assert.text(KOMReviewMasterListItemName, 'bravo');
		});

	});

	describe('KOMReviewMasterListItemReviewValue', function test_KOMReviewMasterListItemReviewValue() {

		it('sets text', function () {
			browser.assert.text(KOMReviewMasterListItemReviewValue, '1');
		});

	});

	describe('KOMReviewMasterListItemUnseenValue', function test_KOMReviewMasterListItemUnseenValue() {

		it('sets text', function () {
			browser.assert.text(KOMReviewMasterListItemUnseenValue, '1');
		});

	});

});
