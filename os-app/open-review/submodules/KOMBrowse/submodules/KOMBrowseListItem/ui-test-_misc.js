const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMBrowseListItem_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMBrowseListItemAccessibilitySummary: 'alfa',
			KOMBrowseListItemTitle: 'bravo',
		});
	});

	describe('KOMBrowseListItem', function test_KOMBrowseListItem () {
		
		it('sets aria-label', function () {
			browser.assert.attribute(KOMBrowseListItem, 'aria-label', 'alfa');
		});
		
		it('sets role', function () {
			browser.assert.attribute(KOMBrowseListItem, 'role', 'button');
		});
	
	});

	describe('KOMBrowseListItemTitle', function test_KOMBrowseListItemTitle () {
		
		it('sets aria-hidden', function () {
			browser.assert.attribute(KOMBrowseListItemTitle, 'aria-hidden', 'true');
		});

		it('binds KOMBrowseListItemTitle', function () {
			browser.assert.text(KOMBrowseListItemTitle, 'bravo');
		});
	
	});

});
