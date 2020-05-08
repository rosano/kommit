const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMBrowseListItem_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMBrowseListItemTitle: 'bravo',
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
