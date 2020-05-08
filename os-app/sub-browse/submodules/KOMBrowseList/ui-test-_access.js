import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	KOMBrowseList: '.KOMBrowseList',
	
	OLSKMasterListToolbarCloseButton: '.OLSKMasterListToolbarCloseButton',
	
	OLSKMasterListToolbarCreateButton: '.OLSKMasterListToolbarCreateButton',
	OLSKMasterListToolbarCreateButtonImage: '.OLSKMasterListToolbarCreateButtonImage',
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

	it('shows OLSKMasterListToolbarCloseButton', function () {
		browser.assert.elements(OLSKMasterListToolbarCloseButton, 1);
	});

	it('shows OLSKMasterListToolbarCreateButton', function () {
		browser.assert.elements(OLSKMasterListToolbarCreateButton, 1);
	});

	it('shows OLSKMasterListToolbarCreateButtonImage', function () {
		browser.assert.elements(OLSKMasterListToolbarCreateButtonImage, 1);
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
