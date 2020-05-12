const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMBrowseListItem_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMBrowseListItemQuestion: 'bravo',
		});
	});

	describe('KOMBrowseListItemQuestion', function test_KOMBrowseListItemQuestion () {
		
		it('sets aria-hidden', function () {
			browser.assert.attribute(KOMBrowseListItemQuestion, 'aria-hidden', 'true');
		});

		it('binds KOMBrowseListItemQuestion', function () {
			browser.assert.text(KOMBrowseListItemQuestion, 'bravo');
		});
	
	});

});
