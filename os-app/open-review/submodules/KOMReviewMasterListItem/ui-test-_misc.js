const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const uFlatten = function (inputData) {
	return [].concat.apply([], inputData);
};

const item = {
	KOMDeckID: 'alfa',
	KOMDeckName: 'bravo',
	$KOMDeckSpacings: uFlatten(Array.from(new Array(3)).map(function (e, i) {
		return [true, false].map(function (forward) {
			return {
				KOMSpacingID: (i + 1).toString() + '-' + (forward ? 'forward' : 'backward'),
				KOMSpacingDueDate: !i ? new Date() : (i >= 2 ? new Date(Date.now() + 1000 * 60 * 60 * 24 * 3) : undefined),
				$KOMSpacingCard: {
					KOMCardID: (i + 1).toString(),
					KOMCardQuestion: (i + 1).toString(),
					KOMCardAnswer: 'charlie',
					KOMCardHint: 'delta',
					KOMCardCreationDate: new Date('2019-02-23T13:56:36Z'),
					KOMCardModificationDate: new Date('2019-02-23T13:56:36Z'),
				},
			};
		});
	})),
};

describe('KOMReviewMasterListItem_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMReviewMasterListItemObject: JSON.stringify(item),
		});
	});

	describe('KOMReviewMasterListItem', function test_KOMReviewMasterListItem() {

		it('sets role', function () {
			browser.assert.attribute(KOMReviewMasterListItem, 'role', 'button');
		});

		it('sets aria-label', function () {
			browser.assert.attribute(KOMReviewMasterListItem, 'aria-label', 'bravo');
		});

		it('sets tabindex', function () {
			browser.assert.attribute(KOMReviewMasterListItem, 'tabindex', '0');
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
