import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const uItem = function (inputData = 'alfa') {
	return {
		KOMCardID: inputData,
		KOMCardQuestion: inputData,
		KOMCardAnswer: inputData,
	};
};

describe('KOMBrowseList_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMBrowseListItems: JSON.stringify([uItem('alfa'), uItem('bravo')]),
			KOMBrowseListItemSelected: JSON.stringify(uItem('alfa')),
			KOMBrowseListFilterText: 'alfa',
		});
	});
		
	describe('OLSKMasterListToolbarCloseButton', function test_OLSKMasterListToolbarCloseButton () {
		
		it('classes OLSKLayoutButtonNoStyle', function () {
			browser.assert.hasClass(OLSKMasterListToolbarCloseButton, 'OLSKLayoutButtonNoStyle');
		});

		it('classes OLSKLayoutElementTappable', function () {
			browser.assert.hasClass(OLSKMasterListToolbarCloseButton, 'OLSKLayoutElementTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(OLSKMasterListToolbarCloseButton, 'OLSKToolbarButton');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestKOMBrowseListDispatchClose', '0');
			});
			
			before(function () {
				return browser.pressButton(OLSKMasterListToolbarCloseButton);
			});

			it('sends KOMBrowseListDispatchClose', function () {
				browser.assert.text('#TestKOMBrowseListDispatchClose', '1');
			});
		
		});
	
	});

	describe('OLSKMasterList', function test_OLSKMasterList() {

		it('binds OLSKMasterListFilterText', function () {
			browser.assert.input('.OLSKMasterListFilterField', 'alfa');
		});

		it('sets OLSKMasterListItemAccessibilitySummaryFor', function () {

			browser.assert.attribute('.OLSKResultsListItem:nth-child(1) .OLSKMasterListItem', 'aria-label', 'alfa');
		});

		it('sets OLSKMasterListItemSelected', function () {
			browser.assert.hasClass('.OLSKResultsListItem:nth-child(1)', 'OLSKResultsListItemSelected');
		});

		context('input', function () {
		
			before(function () {
				browser.assert.text('#TestKOMBrowseListDispatchFilter', '0');
				browser.assert.text('#TestKOMBrowseListDispatchFilterData', 'undefined');
			});

			before(function () {
				browser.fill('.OLSKMasterListFilterField', 'charlie');
			});

			it('sends KOMBrowseListDispatchFilter', function () {
				browser.assert.text('#TestKOMBrowseListDispatchFilter', '1');
				browser.assert.text('#TestKOMBrowseListDispatchFilterData', 'charlie');
			});
		
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
				browser.assert.text('#TestKOMBrowseListDispatchClickData', JSON.stringify(uItem()));
			});
		
		});

	});

	describe('OLSKMasterListToolbarCreateButton', function test_OLSKMasterListToolbarCreateButton () {
		
		it('classes OLSKLayoutButtonNoStyle', function () {
			browser.assert.hasClass(OLSKMasterListToolbarCreateButton, 'OLSKLayoutButtonNoStyle');
		});

		it('classes OLSKLayoutElementTappable', function () {
			browser.assert.hasClass(OLSKMasterListToolbarCreateButton, 'OLSKLayoutElementTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(OLSKMasterListToolbarCreateButton, 'OLSKToolbarButton');
		});
		
		it('sets accesskey', function () {
			browser.assert.attribute(OLSKMasterListToolbarCreateButton, 'accesskey', 'n');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestKOMBrowseListDispatchCreate', '0');
			});
			
			before(function () {
				return browser.pressButton(OLSKMasterListToolbarCreateButton);
			});

			it('sends KOMBrowseListDispatchCreate', function () {
				browser.assert.text('#TestKOMBrowseListDispatchCreate', '1');
			});
		
		});
	
	});

	describe('OLSKMasterListToolbarCreateButtonImage', function test_OLSKMasterListToolbarCreateButtonImage () {

		it('sets src', function () {
			browser.assert.elements(`${ OLSKMasterListToolbarCreateButtonImage } #_OLSKSharedCreate`, 1);
		});
	
	});

	describe('KOMBrowseListItem', function test_KOMBrowseListItem() {		

		it('sets KOMBrowseListItemTitle', function () {
			browser.assert.text('.OLSKResultsListItem:nth-child(1) .OLSKMasterListItem', 'alfa');
		});
		
	});

});
