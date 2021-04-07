const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMBrowse_Catalog', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMBrowseDeckSelected: JSON.stringify(StubDeckObjectValid()),
		});
	});

	context('create', function test_create () {
		
		before(function () {
			return browser.pressButton('.KOMBrowseCreateButton');
		});

		it('adds item', function () {
			browser.assert.elements('.KOMBrowseListItem', 1);
		});
	
	});

	context('OLSKCollectionDispatchClick', function test_OLSKCollectionDispatchClick () {
		
		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
		});

		before(function () {
			browser.assert.elements('.KOMBrowseInfo', 0);
		});

		before(function () {
			return browser.click('.KOMBrowseListItem');
		});

		it('selects item', function () {
			browser.assert.elements('.KOMBrowseInfo', 1);
		});
	
	});

	context('back', function test_back () {

		before(function () {
			return browser.pressButton('.KOMBrowseInfoToolbarBackButton');
		});

		it('sets focus', function () {
			browser.assert.hasClass('.OLSKCatalogDetail', 'OLSKMobileViewInactive');
		});

	});

	context('discard', function test_discard () {

		context('cancel', function () {
			
			before(async function () {
				return browser.OLSKConfirm(function () {
					browser.pressButton('.KOMBrowseInfoToolbarDiscardButton');
				}, function (dialog) {
					dialog.response = false;

					return dialog;
				});
			});

			it('does nothing', function () {
				browser.assert.elements('.KOMBrowseInfo', 1);
			});
		
		});

		context('confirm', function () {
			
			before(async function () {
				return browser.OLSKConfirm(function () {
					return browser.pressButton('.KOMBrowseInfoToolbarDiscardButton');
				});
			});

			it('removes item', function () {
				browser.assert.elements('.KOMBrowseListItem', 0);
			});
		
		});
		
	});

	context('OLSKCatalogDispatchArrow', function test_OLSKCatalogDispatchArrow () {
		
		before(function () {
			return browser.pressButton('.KOMBrowseCreateButton');
		});

		before(function () {
			return browser.pressButton('.KOMBrowseCreateButton');
		});

		before(function () {
			return browser.focus('.OLSKMasterListFilterField');
		});

		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
		});

		it('binds OLSKCollectionItemsLocus', function () {
			browser.assert.hasClass('.OLSKCollectionItem:nth-child(2)', 'OLSKCollectionItemLocus');
		});
	
	});

});
