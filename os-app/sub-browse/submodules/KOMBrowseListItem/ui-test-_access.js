const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	KOMBrowseListItem: '.KOMBrowseListItem',
	
	KOMBrowseListItemTitle: '.KOMBrowseListItemTitle',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('KOMBrowseListItem_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMBrowseListItemTitle: 'bravo',
		});
	});

	it('shows KOMBrowseListItem', function () {
		browser.assert.elements(KOMBrowseListItem, 1);
	});

	it('shows KOMBrowseListItemTitle', function () {
		browser.assert.elements(KOMBrowseListItemTitle, 1);
	});

});
