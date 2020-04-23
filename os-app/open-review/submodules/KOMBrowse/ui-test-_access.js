const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	KOMBrowse: '.KOMBrowse',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('KOMBrowse_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows KOMBrowse', function () {
		browser.assert.elements(KOMBrowse, 1);
	});

	it('shows KOMBrowseList', function () {
		browser.assert.elements('.KOMBrowseList', 1);
	});

	it('hides KOMBrowseListItem', function () {
		browser.assert.elements('.KOMBrowseListItem', 0);
	});

	it('shows KOMBrowseInfo', function () {
		browser.assert.elements('.KOMBrowseInfo', 1);
	});

	it('shows OLSKDetailPlaceholder', function () {
		browser.assert.elements('.OLSKDetailPlaceholder', 1);
	});

	it('hides KOMBrowseInfoForm', function () {
		browser.assert.elements('.KOMBrowseInfoForm', 0);
	});

	context('KOMBrowseItems', function() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMBrowseItems: JSON.stringify([{
					KOMCardQuestion: 'alfa',
					KOMCardAnswer: 'bravo',
				}]),
			});
		});

		it('shows KOMBrowseListItem', function () {
			browser.assert.elements('.KOMBrowseListItem', 1);
		});

	});

	context('KOMBrowseItemSelected', function() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMBrowseItemSelected: JSON.stringify({
					KOMCardQuestion: 'alfa',
					KOMCardAnswer: 'bravo',
				}),
			});
		});

		it('hides OLSKDetailPlaceholder', function () {
			browser.assert.elements('.OLSKDetailPlaceholder', 0);
		});

		it('shows KOMBrowseInfoForm', function () {
			browser.assert.elements('.KOMBrowseInfoForm', 1);
		});
	
	});

});
