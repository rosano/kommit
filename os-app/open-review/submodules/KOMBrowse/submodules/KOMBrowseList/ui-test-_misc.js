import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMBrowseList_Misc', function () {

	describe('KOMBrowseList', function test_KOMBrowseList () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute);
		});
		
		it('classes OLSKViewportMaster', function () {
			browser.assert.hasClass(KOMBrowseList, 'OLSKViewportMaster');
		});

		context('blur KOMBrowseListFilterField', function() {

			before(function () {
				browser.assert.hasClass(KOMBrowseList, 'KOMBrowseListFocused');
			});

			before(function () {
				browser.click(KOMBrowseListCreateButton);
			});
			
			it.skip('classes KOMBrowseListFocused', function() {
				browser.assert.hasNoClass(KOMBrowseList, 'KOMBrowseListFocused');
			});

		});

		context('focus KOMBrowseListFilterField', function() {

			before(function () {
				return browser.click(KOMBrowseListFilterField);
			});
			
			it('classes KOMBrowseListFocused', function() {
				browser.assert.hasClass(KOMBrowseList, 'KOMBrowseListFocused');
			});

		});

		context('OLSKMobileViewInactive', function () {

			before(function () {
				browser.assert.hasNoClass(KOMBrowseList, 'OLSKMobileViewInactive');
			});

			before(function () {
				browser.assert.attribute(KOMBrowseList, 'aria-hidden', null);
			});
			
			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					OLSKMobileViewInactive: true,
				});
			});

			it('classes OLSKMobileViewInactive', function () {
				browser.assert.hasClass(KOMBrowseList, 'OLSKMobileViewInactive');
			});

			it('sets aria-hidden', function () {
				browser.assert.attribute(KOMBrowseList, 'aria-hidden', 'true');
			});
		
		});

		context('OLSKResultsDispatchArrow', function () {

			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					KOMBrowseListItems: JSON.stringify([{
						KOMCardID: 'alfa',
						KOMCardQuestion: 'bravo',
					}, {
						KOMCardID: 'charlie',
						KOMCardQuestion: 'delta',
					}, {
						KOMCardID: 'echo',
						KOMCardQuestion: 'foxtrot',
					}]),
					KOMBrowseListItemSelected: JSON.stringify({
						KOMCardID: 'charlie',
						KOMCardQuestion: 'delta',
					}),
				});
			});

			context('keydown ArrowUp', function() {

				before(function () {
					return browser.query('.KOMBrowseListFilterField').focus();
				});
				
				before(function () {
					browser.assert.text('#TestKOMBrowseListDispatchArrow', '0');
				});

				before(function () {
					return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowUp');
				});

				it('sends KOMBrowseListDispatchArrow', function () {
					browser.assert.text('#TestKOMBrowseListDispatchArrow', '1');
					browser.assert.text('#TestKOMBrowseListDispatchArrowData', JSON.stringify({
						KOMCardID: 'alfa',
						KOMCardQuestion: 'bravo',
					}));
				});

			});
		
		});
	
	});

	describe('KOMBrowseListToolbar', function test_KOMBrowseListToolbar () {
		
		it('classes OLSKMobileViewHeader', function () {
			browser.assert.hasClass(KOMBrowseListToolbar, 'OLSKMobileViewHeader');
		});
	
	});

	describe('KOMBrowseListFilterField', function test_KOMBrowseListFilterField() {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMBrowseListFilterText: 'alfa',
			});
		});

		it('binds KOMBrowseListFilterText', function () {
			browser.assert.input(KOMBrowseListFilterField, 'alfa');
		});

		it('sets OLSKInputWrapperValue', function () {
			browser.assert.elements('.OLSKInputWrapperClearButton', 1);
		});
			
		context('input', function () {
		
			before(function () {
				browser.assert.text('#TestKOMBrowseListDispatchFilter', '0');
				browser.assert.text('#TestKOMBrowseListDispatchFilterData', 'undefined');
			});

			before(function () {
				browser.fill(KOMBrowseListFilterField, 'bravo');
			});

			it('sends KOMBrowseListDispatchFilter', function () {
				browser.assert.text('#TestKOMBrowseListDispatchFilter', '1');
				browser.assert.text('#TestKOMBrowseListDispatchFilterData', 'bravo');
			});
		
		});

		context('clear', function () {

			before(function () {
				return browser.pressButton('.OLSKInputWrapperClearButton');
			});

			it('sends KOMBrowseListDispatchFilter', function () {
				browser.assert.text('#TestKOMBrowseListDispatchFilter', '2');
				browser.assert.text('#TestKOMBrowseListDispatchFilterData', '');
			});
		
		});

	});

	describe('KOMBrowseListCreateButton', function test_KOMBrowseListCreateButton () {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute);
		});

		it('classes OLSKLayoutButtonNoStyle', function () {
			browser.assert.hasClass(KOMBrowseListCreateButton, 'OLSKLayoutButtonNoStyle');
		});

		it('classes OLSKLayoutElementTappable', function () {
			browser.assert.hasClass(KOMBrowseListCreateButton, 'OLSKLayoutElementTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(KOMBrowseListCreateButton, 'OLSKToolbarButton');
		});
		
		it('sets accesskey', function () {
			browser.assert.attribute(KOMBrowseListCreateButton, 'accesskey', 'n');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestKOMBrowseListDispatchCreate', '0');
			});
			
			before(function () {
				return browser.pressButton(KOMBrowseListCreateButton);
			});

			it('sends KOMBrowseListDispatchCreate', function () {
				browser.assert.text('#TestKOMBrowseListDispatchCreate', '1');
			});
		
		});
	
	});

	describe('KOMBrowseListCreateButtonImage', function test_KOMBrowseListCreateButtonImage () {

		it('sets src', function () {
			browser.assert.elements(`${ KOMBrowseListCreateButtonImage } #_OLSKSharedCreate`, 1);
		});
	
	});

	describe('KOMBrowseListBody', function test_KOMBrowseListBody () {
		
		it('classes OLSKMobileViewBody', function () {
			browser.assert.hasClass(KOMBrowseListBody, 'OLSKMobileViewBody');
		});
	
	});

	describe('KOMBrowseListItem', function test_KOMBrowseListItem() {

		const item = {
			KOMCardID: 'alfa',
			KOMCardQuestion: 'bravo',
		};
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMBrowseListItems: JSON.stringify([item]),
			});
		});

		it('sets KOMBrowseListItemAccessibilitySummary', function () {
			browser.assert.attribute('.KOMBrowseListItem', 'aria-label', 'bravo');
		});

		it('sets KOMBrowseListItemTitle', function () {
			browser.assert.text('.KOMBrowseListItemTitle', 'bravo');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestKOMBrowseListDispatchClick', '0');
				browser.assert.text('#TestKOMBrowseListDispatchClickData', 'undefined');
			});
			
			before(function () {
				return browser.click('.KOMBrowseListItem');
			});

			it('sends KOMBrowseListDispatchClick', function () {
				browser.assert.text('#TestKOMBrowseListDispatchClick', '1');
				browser.assert.text('#TestKOMBrowseListDispatchClickData', JSON.stringify(item));
			});
		
		});
		
	});

	describe('KOMBrowseListItemSelected', function test_KOMBrowseListItemSelected() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMBrowseListItems: JSON.stringify([{
					KOMCardID: 'alfa',
					KOMCardQuestion: 'bravo',
				}, {
					KOMCardID: 'charlie',
					KOMCardQuestion: 'delta',
				}]),
				KOMBrowseListItemSelected: JSON.stringify({
					KOMCardID: 'charlie',
					KOMCardQuestion: 'delta',
				}),
			});
		});

		it('sets OLSKResultsListItemSelected', function () {
			browser.assert.elements('.OLSKResultsListItemSelected', 1);
			browser.assert.hasClass('.OLSKResultsListItem:nth-child(2)', 'OLSKResultsListItemSelected');
		});
		
	});

});
