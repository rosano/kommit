const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMReviewMasterListItem_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMReviewMasterListItemName: 'bravo',
			KOMReviewMasterListItemReviewCount: 1,
			KOMReviewMasterListItemUnseenCount: 2,
		});
	});

	describe('KOMReviewMasterListItem', function test_KOMReviewMasterListItem() {

		it('sets aria-label', function () {
			browser.assert.attribute(KOMReviewMasterListItem, 'aria-label', 'bravo');
		});

		it('classes OLSKDecorPress', function () {
			browser.assert.hasClass(KOMReviewMasterListItem, 'OLSKDecorPress');
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
			browser.assert.text(KOMReviewMasterListItemUnseenValue, '2');
		});

	});

});
