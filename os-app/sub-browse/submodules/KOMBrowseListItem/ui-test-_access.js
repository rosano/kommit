const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	KOMBrowseListItem: '.KOMBrowseListItem',
	
	KOMBrowseListItemFront: '.KOMBrowseListItemFront',
	KOMBrowseListItemAnswer: '.KOMBrowseListItemAnswer',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('KOMBrowseListItem_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMBrowseListItemObject: JSON.stringify({
				KOMCardFront: 'alfa',
				KOMCardRear: 'bravo',
			}),
		});
	});

	it('shows KOMBrowseListItem', function () {
		browser.assert.elements(KOMBrowseListItem, 1);
	});

	it('shows KOMBrowseListItemFront', function () {
		browser.assert.elements(KOMBrowseListItemFront, 1);
	});

	it('shows KOMBrowseListItemAnswer', function () {
		browser.assert.elements(KOMBrowseListItemAnswer, 1);
	});

});
