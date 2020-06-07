const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMReview_Misc', function () {	

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	context('link apple-touch-icon', function () {
		
		it('sets href', function () {
			browser.assert.attribute('link[rel=apple-touch-icon]', 'href', process.env.KOM_TOUCH_ICON_URL);
		});
	
	});

	context('meta viewport', function () {
		
		it('sets content', function () {
			browser.assert.attribute('meta[name=viewport]', 'content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
		});
	
	});

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
			browser.assert.text('.KOMReviewMasterListItemName', 'alfa');
		});
	
	});

	context('rename', function () {
		
		before(function () {
			return browser.click('.KOMReviewMasterListItem');
		});

		before(function () {
			return browser.OLSKPrompt(function () {
				return browser.pressButton('.KOMReviewDetailRenameButton');
			}, function (dialog) {
				dialog.response = 'bravo';
				
				return dialog;
			});
		});

		before(function () {
			return browser.pressButton('.KOMReviewDetailToolbarBackButton');
		});

		it('sets KOMDeckName', function () {
			browser.assert.text('.KOMReviewMasterListItemName', 'bravo');
		});
	
	});

	describe('KOMBrowse', function test_KOMBrowse() {
		
		before(function () {
			return browser.click('.KOMReviewMasterListItem');
		});

		before(function () {
			return browser.pressButton('.KOMReviewDetailToolbarCardsButton');
		});

		before(function () {
			return browser.pressButton('.KOMBrowseListToolbarCreateButton');
		});

		it('sets KOMBrowseDeckSelected', function () {
			browser.assert.elements('.KOMBrowseListItem', 1);
		});

		after(function () {
			browser.fill('.KOMBrowseInfoFormFrontField', 'alfa');
		});

		after(function () {
			return browser.pressButton('.KOMBrowseListToolbarCreateButton');
		});

		after(function () {
			browser.fill('.KOMBrowseInfoFormFrontField', 'bravo');
		});

		after(function () {
			return browser.pressButton('.KOMBrowseListToolbarCloseButton');
		});
				
	});	

	describe('KOMPlay', function test_KOMPlay() {
		
		before(function () {
			return browser.pressButton('.KOMReviewDetailPlayButtonUnseen');
		});

		before(function () {
			browser.assert.text('#TestKOMPlayStateQueueCount', '3');
		});

		before(function () {
			browser.assert.text('#TestKOMPlayStateWaitCount', '0');
		});

		before(function () {
			return browser.click('.KOMPlayCard');
		});

		before(function () {
			return browser.pressButton('.KOMPlayResponseButtonGood');
		});

		before(function () {
			return browser.pressButton('.KOMPlayToolbarDoneButton');
		});

		before(function () {
			return browser.pressButton('.KOMReviewDetailPlayButtonUnseen');
		});

		it('persists responses', function () {
			browser.assert.text('#TestKOMPlayStateQueueCount', '2');
			browser.assert.text('#TestKOMPlayStateWaitCount', '0');
		});

		after(function () {
			return browser.pressButton('.KOMPlayToolbarDoneButton');
		});

		after(function () {
			return browser.pressButton('.KOMReviewDetailToolbarBackButton');
		});
				
	});

	describe('KOMReviewViewportFooter', function test_KOMReviewViewportFooter () {

		it('classes OLSKMobileViewFooter', function () {
			browser.assert.hasClass(KOMReviewViewportFooter, 'OLSKMobileViewFooter');
		});

	});

	describe('KOMReviewStorageToolbar', function test_KOMReviewStorageToolbar () {

		before(function () {
			return browser.pressButton('.OLSKAppToolbarStorageButton');
		});
		
		it('classes OLSKStorageToolbar', function () {
			browser.assert.hasClass(KOMReviewStorageToolbar, 'OLSKStorageToolbar');
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

	describe('KOMReviewLauncherItemSelectDeck', function test_KOMReviewLauncherItemSelectDeck() {
		
		before(function () {
			return browser.fill('.LCHLauncherFilterInput', 'bravo');
		});

		before(function () {
			return browser.click('.LCHLauncherResultListItem');
		});

		it('selects deck', function () {
			browser.assert.text('.KOMReviewDetailToolbarTitle', 'bravo');
		});

	});	

});
