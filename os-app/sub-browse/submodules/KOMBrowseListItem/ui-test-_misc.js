const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMBrowseListItem_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMBrowseListItemObject: JSON.stringify({
				KOMCardFront: 'alfa',
				KOMCardAnswer: 'bravo',
			}),
		});
	});

	describe('KOMBrowseListItemQuestion', function test_KOMBrowseListItemQuestion () {
		
		it('sets aria-hidden', function () {
			browser.assert.attribute(KOMBrowseListItemQuestion, 'aria-hidden', 'true');
		});

		it('binds KOMCardFront', function () {
			browser.assert.text(KOMBrowseListItemQuestion, 'alfa');
		});
	
	});

	describe('KOMBrowseListItemAnswer', function test_KOMBrowseListItemAnswer () {
		
		it('sets aria-hidden', function () {
			browser.assert.attribute(KOMBrowseListItemAnswer, 'aria-hidden', 'true');
		});

		it('binds KOMCardAnswer', function () {
			browser.assert.text(KOMBrowseListItemAnswer, 'bravo');
		});
	
	});

});
