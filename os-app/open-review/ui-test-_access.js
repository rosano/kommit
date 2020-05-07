import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	KOMReviewViewportFooter: '.KOMReviewViewportFooter',

	KOMReviewStorageWidget: '#KOMReviewStorageWidget',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('KOMReview_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows KOMReviewMaster', function () {
		browser.assert.elements('.KOMReviewMaster', 1);
	});

	it('hides KOMReviewMasterListItem', function () {
		browser.assert.elements('.KOMReviewMasterListItem', 0);
	});

	it('hides KOMReviewDetail', function () {
		browser.assert.elements('.KOMReviewDetail', 0);
	});

	it('hides KOMBrowse', function () {
		browser.assert.elements('.KOMBrowse', 0);
	});

	it('shows KOMReviewViewportFooter', function () {
		browser.assert.elements(KOMReviewViewportFooter, 1);
	});

	it('shows KOMReviewStorageWidget', function () {
		browser.assert.elements(KOMReviewStorageWidget, 1);
	});

	it('shows OLSKAppToolbar', function () {
		browser.assert.elements('.OLSKAppToolbar', 1);
	});

	it('shows OLSKAppToolbarLauncherButton', function () {
		browser.assert.elements('.OLSKAppToolbarLauncherButton', 1);
	});

	it('hides KOMPlay', function () {
		browser.assert.elements('.KOMPlay', 0);
	});

	context('create', function test_create() {
		
		before(function () {
			return browser.OLSKPrompt(function () {
				return browser.pressButton('.KOMReviewMasterCreateButton');
			}, function (dialog) {
				dialog.response = 'alfa';
				
				return dialog;
			});
		});

		it('shows KOMReviewMasterListItem', function () {
			browser.assert.elements('.KOMReviewMasterListItem', 1);
		});
	
	});

	context('select', function test_select() {
		
		before(function () {
			return browser.pressButton('.KOMReviewMasterListItem');
		});

		it('hides KOMReviewMaster', function () {
			browser.assert.elements('.KOMReviewMaster', 0);
		});

		it('shows KOMReviewDetail', function () {
			browser.assert.elements('.KOMReviewDetail', 1);
		});

		it('hides KOMBrowse', function () {
			browser.assert.elements('.KOMBrowse', 0);
		});
	
	});

	context('browse', function test_browse() {
		
		before(function () {
			return browser.pressButton('.KOMReviewDetailToolbarBrowseButton');
		});

		it('hides KOMReviewMaster', function () {
			browser.assert.elements('.KOMReviewMaster', 0);
		});

		it('hides KOMReviewDetail', function () {
			browser.assert.elements('.KOMReviewDetail', 0);
		});

		it('shows KOMBrowse', function () {
			browser.assert.elements('.KOMBrowse', 1);
		});
				
	});

	context('close', function test_close() {
		
		before(function () {
			return browser.pressButton('.KOMBrowseListToolbarCloseButton');
		});

		it('hides KOMReviewMaster', function () {
			browser.assert.elements('.KOMReviewMaster', 0);
		});

		it('shows KOMReviewDetail', function () {
			browser.assert.elements('.KOMReviewDetail', 1);
		});

		it('hides KOMBrowse', function () {
			browser.assert.elements('.KOMBrowse', 0);
		});
	
	});

	context('back', function test_back() {
		
		before(function () {
			return browser.pressButton('.KOMReviewDetailToolbarBackButton');
		});

		it('shows KOMReviewMaster', function () {
			browser.assert.elements('.KOMReviewMaster', 1);
		});

		it('hides KOMReviewDetail', function () {
			browser.assert.elements('.KOMReviewDetail', 0);
		});

		it('hides KOMBrowse', function () {
			browser.assert.elements('.KOMBrowse', 0);
		});
	
	});

	context('discard', function test_discard() {
		
		before(function () {
			return browser.pressButton('.KOMReviewMasterListItem');
		});

		before(function () {
			return browser.pressButton('.KOMReviewDetailToolbarDiscardButton');
		});

		it('shows KOMReviewMaster', function () {
			browser.assert.elements('.KOMReviewMaster', 1);
		});

		it('hides KOMReviewDetail', function () {
			browser.assert.elements('.KOMReviewDetail', 0);
		});

		it('hides KOMBrowse', function () {
			browser.assert.elements('.KOMBrowse', 0);
		});

		it('hides KOMReviewMasterListItem', function () {
			browser.assert.elements('.KOMReviewMasterListItem', 0);
		});
	
	});

	context('KOMPlay', function test_KOMPlay() {
		
		before(function () {
			return browser.OLSKPrompt(function () {
				return browser.pressButton('.KOMReviewMasterCreateButton');
			}, function (dialog) {
				dialog.response = 'alfa';
				
				return dialog;
			});
		});

		before(function () {
			return browser.wait({ element: '.KOMReviewMasterListItem'});
		});

		before(function () {
			return browser.pressButton('.KOMReviewMasterListItem');
		});

		before(function () {
			return browser.pressButton('.KOMReviewDetailToolbarBrowseButton');
		});

		before(function () {
			return browser.pressButton('.KOMBrowseListToolbarCreateButton');
		});

		before(function () {
			return browser.pressButton('.KOMBrowseListToolbarCloseButton');
		});

		before(function () {
			return browser.pressButton('.KOMReviewDetailPlayButton');
		});

		it('hides KOMReviewMaster', function () {
			browser.assert.elements('.KOMReviewMaster', 0);
		});

		it('hides KOMReviewDetail', function () {
			browser.assert.elements('.KOMReviewDetail', 0);
		});

		it('shows KOMPlay', function () {
			browser.assert.elements('.KOMPlay', 1);
		});
				
	});

});
