import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	KOMBrowseList: '.KOMBrowseList',
	
	KOMBrowseListToolbar: '.KOMBrowseListToolbar',
	KOMBrowseListToolbarCloseButton: '.KOMBrowseListToolbarCloseButton',
	
	KOMBrowseListFilterField: '.KOMBrowseListFilterField',
	KOMBrowseListToolbarCreateButton: '.KOMBrowseListToolbarCreateButton',
	KOMBrowseListToolbarCreateButtonImage: '.KOMBrowseListToolbarCreateButtonImage',

	KOMBrowseListBody: '.KOMBrowseListBody',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('KOMBrowseList_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows KOMBrowseList', function () {
		browser.assert.elements(KOMBrowseList, 1);
	});

	it('shows KOMBrowseListToolbar', function () {
		browser.assert.elements(KOMBrowseListToolbar, 1);
	});

	it('shows KOMBrowseListToolbarCloseButton', function () {
		browser.assert.elements(KOMBrowseListToolbarCloseButton, 1);
	});

	it('shows OLSKToolbar', function () {
		browser.assert.elements('.OLSKToolbar', 1);
	});

	it('shows OLSKInputWrapper', function () {
		browser.assert.elements('.OLSKInputWrapper', 1);
	});

	it('shows KOMBrowseListFilterField', function () {
		browser.assert.elements(KOMBrowseListFilterField, 1);
	});

	it('shows KOMBrowseListToolbarCreateButton', function () {
		browser.assert.elements(KOMBrowseListToolbarCreateButton, 1);
	});

	it('shows KOMBrowseListToolbarCreateButtonImage', function () {
		browser.assert.elements(KOMBrowseListToolbarCreateButtonImage, 1);
	});

	it('shows KOMBrowseListBody', function () {
		browser.assert.elements(KOMBrowseListBody, 1);
	});

	it('shows OLSKResults', function () {
		browser.assert.elements('.OLSKResults', 1);
	});

	it('hides KOMBrowseListItem', function () {
		browser.assert.elements('.KOMBrowseListItem', 0);
	});

	context('KOMBrowseListItems', function() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMBrowseListItems: JSON.stringify([{
					KOMCardQuestion: 'alfa',
				}]),
			});
		});

		it('shows KOMBrowseListItem', function () {
			browser.assert.elements('.KOMBrowseListItem', 1);
		});
		
	});

});
