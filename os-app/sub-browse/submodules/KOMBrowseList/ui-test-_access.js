import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	KOMBrowseList: '.KOMBrowseList',
	
	KOMBrowseListToolbarCloseButton: '.KOMBrowseListToolbarCloseButton',
	KOMBrowseListToolbarCloseButtonImage: '.KOMBrowseListToolbarCloseButtonImage',
	
	KOMBrowseListToolbarCreateButton: '.KOMBrowseListToolbarCreateButton',
	KOMBrowseListToolbarCreateButtonImage: '.KOMBrowseListToolbarCreateButtonImage',
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

	it('shows OLSKMasterList', function () {
		browser.assert.elements('.OLSKMasterList', 1);
	});

	it('shows KOMBrowseListToolbarCloseButton', function () {
		browser.assert.elements(KOMBrowseListToolbarCloseButton, 1);
	});

	it('shows KOMBrowseListToolbarCloseButtonImage', function () {
		browser.assert.elements(KOMBrowseListToolbarCloseButtonImage, 1);
	});

	it('shows KOMBrowseListToolbarCreateButton', function () {
		browser.assert.elements(KOMBrowseListToolbarCreateButton, 1);
	});

	it('shows KOMBrowseListToolbarCreateButtonImage', function () {
		browser.assert.elements(KOMBrowseListToolbarCreateButtonImage, 1);
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
