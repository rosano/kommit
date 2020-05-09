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
			return browser.click('.KOMReviewMasterListItem');
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
			return browser.click('.KOMReviewMasterListItem');
		});

		before(function () {
			return browser.pressButton('.KOMReviewDetailToolbarCardsButton');
		});

		before(function () {
			return browser.pressButton('.OLSKMasterListToolbarCreateButton');
		});

		before(function () {
			browser.fill('.KOMBrowseInfoFormQuestionField', 'alfa');
		});

		it('sets KOMBrowseDeckSelected', function () {
			browser.assert.elements('.KOMBrowseListItem', 1);
		});

		after(function () {
			return browser.pressButton('.OLSKMasterListToolbarCloseButton');
		});
				
	});	

	describe('KOMPlay', function test_KOMPlay() {
		
		before(function () {
			return browser.pressButton('.KOMReviewDetailPlayButton');
		});

		before(function () {
			browser.assert.text('#TestKOMPlayStateQueueCount', '1');
		});

		before(function () {
			browser.assert.text('#TestKOMPlayStateWaitCount', '0');
		});

		before(function () {
			return browser.click('.KOMPlayCard');
		});

		before(function () {
			return browser.pressButton('.KOMPlayResponseButtonEasy');
		});

		before(function () {
			return browser.pressButton('.KOMPlayToolbarDoneButton');
		});

		before(function () {
			return browser.pressButton('.KOMReviewDetailPlayButton');
		});

		it('persists responses', function () {
			browser.assert.text('#TestKOMPlayStateQueueCount', '0');
			browser.assert.text('#TestKOMPlayStateWaitCount', '0');
		});

		after(function () {
			return browser.pressButton('.KOMPlayToolbarDoneButton');
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
			return browser.click('.LCHLauncherResultListItem');
		});

		it('adds deck', function () {
			browser.assert.text('.KOMReviewMasterListItem:nth-of-type(2)', 'FakeOLSKChangeDelegateCreateDeck');
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
			return browser.click('.LCHLauncherResultListItem');
		});

		it('updates deck', function () {
			browser.assert.text('.KOMReviewMasterListItem:nth-of-type(2)', 'FakeOLSKChangeDelegateUpdateDeck');
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
			return browser.click('.LCHLauncherResultListItem');
		});

		it('deletes deck deck', function () {
			browser.assert.elements('.KOMReviewMasterListItem', 1);
		});

	});

});
