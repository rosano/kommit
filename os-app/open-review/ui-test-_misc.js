import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMReview_Misc', function () {	

	context('create', function () {
		
		before(function () {
			return browser.OLSKPrompt(function () {
				return browser.pressButton('.KOMReviewMasterCreateButton');
			}, function (dialog) {
				dialog.response = 'alfa';
				
				return dialog;
			});
		});

		it('sets KOMDeckName', function () {
			browser.assert.text('.KOMReviewMasterListItem', 'alfa');
		});
	
	});

	context('rename', function () {
		
		before(function () {
			return browser.pressButton('.KOMReviewMasterListItem');
		});

		before(function () {
			return browser.OLSKPrompt(function () {
				return browser.pressButton('.KOMReviewDetailToolbarRenameButton');
			}, function (dialog) {
				dialog.response = 'bravo';
				
				return dialog;
			});
		});

		before(function () {
			return browser.pressButton('.KOMReviewDetailToolbarBackButton');
		});

		it('sets KOMDeckName', function () {
			browser.assert.text('.KOMReviewMasterListItem', 'bravo');
		});
	
	});

	context('KOMBrowse', function test_KOMBrowse() {
		
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
			browser.fill('.KOMBrowseInfoFormQuestionField', 'alfa');
		});

		it('sets KOMBrowseDeckSelected', function () {
			browser.assert.elements('.KOMBrowseListItem', 1);
		});

		after(function () {
			return browser.pressButton('.KOMBrowseListToolbarCloseButton');
		});

		after(function () {
			return browser.pressButton('.KOMReviewDetailToolbarBackButton');
		});
				
	});

	describe('KOMReviewStorageWidget', function test_KOMReviewStorageWidget () {
		
		it('classes KOMReviewStorageWidgetHidden', function () {
			browser.assert.hasClass(KOMReviewStorageWidget, 'KOMReviewStorageWidgetHidden');
		});

		context('click OLSKAppToolbarStorageButton', function () {
			
			before(function () {
				return browser.pressButton('.OLSKAppToolbarStorageButton');
			});
			
			it('classes KOMReviewStorageWidgetHidden', function () {
				browser.assert.hasNoClass(KOMReviewStorageWidget, 'KOMReviewStorageWidgetHidden');
			});
		
		});
	
	});

	describe('KOMReviewViewportFooter', function test_KOMReviewViewportFooter () {

		it('classes OLSKMobileViewFooter', function () {
			browser.assert.hasClass(KOMReviewViewportFooter, 'OLSKMobileViewFooter');
		});

	});

	describe('OLSKAppToolbarLauncherButton', function test_OLSKAppToolbarLauncherButton () {

		before(function () {
			return browser.pressButton('.OLSKAppToolbarLauncherButton');
		});

		it('runs Launchlet', function() {
			browser.assert.elements('.LCHLauncherFilterPrompt', 1);
		});

	});

	describe('OLSKChangeDelegateCreateDeck', function test_OLSKChangeDelegateCreateDeck () {

		before(function () {
			return browser.pressButton('.OLSKAppToolbarLauncherButton');
		});

		before(function () {
			return browser.fill('.LCHLauncherFilterInput', 'FakeOLSKChangeDelegateCreateDeck');
		});

		before(function() {
			browser.click('.LCHLauncherResultListItem');
		});

		it('adds deck', function () {
			browser.assert.text('.KOMReviewMasterListItem:nth-child(2)', 'FakeOLSKChangeDelegateCreateDeck');
		});

	});

	describe('OLSKChangeDelegateUpdateDeck', function test_OLSKChangeDelegateUpdateDeck () {

		before(function () {
			return browser.pressButton('.OLSKAppToolbarLauncherButton');
		});

		before(function () {
			return browser.fill('.LCHLauncherFilterInput', 'FakeOLSKChangeDelegateUpdateDeck');
		});

		before(function() {
			browser.click('.LCHLauncherResultListItem');
		});

		it('adds deck', function () {
			browser.assert.text('.KOMReviewMasterListItem:nth-child(2)', 'FakeOLSKChangeDelegateUpdateDeck');
		});

	});

	describe('OLSKChangeDelegateDeleteDeck', function test_OLSKChangeDelegateDeleteDeck () {

		before(function () {
			return browser.pressButton('.OLSKAppToolbarLauncherButton');
		});

		before(function () {
			return browser.fill('.LCHLauncherFilterInput', 'FakeOLSKChangeDelegateDeleteDeck');
		});

		before(function() {
			browser.click('.LCHLauncherResultListItem');
		});

		it('adds deck', function () {
			browser.assert.elements('.KOMReviewMasterListItem', 2);
		});

	});

});
