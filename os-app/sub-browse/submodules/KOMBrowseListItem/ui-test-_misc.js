const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMBrowseListItem_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMBrowseListItemObject: JSON.stringify({
				KOMCardFrontText: 'alfa',
				KOMCardRearText: 'bravo',
				KOMCardTags: ['charlie', 'delta'],
			}),
		});
	});

	describe('KOMBrowseListItemFront', function test_KOMBrowseListItemFront() {

		it('sets aria-hidden', function () {
			browser.assert.attribute(KOMBrowseListItemFront, 'aria-hidden', 'true');
		});

		it('binds KOMCardFrontText', function () {
			browser.assert.text(KOMBrowseListItemFront, 'alfa');
		});

	});

	describe('KOMBrowseListItemRear', function test_KOMBrowseListItemRear() {

		it('sets aria-hidden', function () {
			browser.assert.attribute(KOMBrowseListItemRear, 'aria-hidden', 'true');
		});

		it('binds KOMCardRearText', function () {
			browser.assert.text(KOMBrowseListItemRear, 'bravo');
		});

	});

	describe('KOMBrowseListItemTags', function test_KOMBrowseListItemTags() {

		it('sets aria-hidden', function () {
			browser.assert.attribute(KOMBrowseListItemTags, 'aria-hidden', 'true');
		});

		it('binds KOMCardTagsText', function () {
			browser.assert.text(KOMBrowseListItemTags, 'charlie, delta');
		});

	});

});
