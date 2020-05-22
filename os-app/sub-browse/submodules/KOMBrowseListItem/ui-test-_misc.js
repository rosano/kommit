const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMBrowseListItem_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMBrowseListItemObject: JSON.stringify({
				KOMCardFront: 'alfa',
				KOMCardRear: 'bravo',
			}),
		});
	});

	describe('KOMBrowseListItemFront', function test_KOMBrowseListItemFront () {
		
		it('sets aria-hidden', function () {
			browser.assert.attribute(KOMBrowseListItemFront, 'aria-hidden', 'true');
		});

		it('binds KOMCardFront', function () {
			browser.assert.text(KOMBrowseListItemFront, 'alfa');
		});
	
	});

	describe('KOMBrowseListItemAnswer', function test_KOMBrowseListItemAnswer () {
		
		it('sets aria-hidden', function () {
			browser.assert.attribute(KOMBrowseListItemAnswer, 'aria-hidden', 'true');
		});

		it('binds KOMCardRear', function () {
			browser.assert.text(KOMBrowseListItemAnswer, 'bravo');
		});
	
	});

});
