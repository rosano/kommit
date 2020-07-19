const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	KOMBrowseListItem: '.KOMBrowseListItem',

	KOMBrowseListItemFront: '.KOMBrowseListItemFront',
	KOMBrowseListItemRear: '.KOMBrowseListItemRear',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('KOMBrowseListItem_Access', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMBrowseListItemObject: JSON.stringify({
				KOMCardFrontText: 'alfa',
				KOMCardRearText: 'bravo',
			}),
		});
	});

	it('shows KOMBrowseListItem', function () {
		browser.assert.elements(KOMBrowseListItem, 1);
	});

	it('shows KOMBrowseListItemFront', function () {
		browser.assert.elements(KOMBrowseListItemFront, 1);
	});

	it('shows KOMBrowseListItemRear', function () {
		browser.assert.elements(KOMBrowseListItemRear, 1);
	});

});
