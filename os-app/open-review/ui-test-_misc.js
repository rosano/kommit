const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMReview_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('assigns link:apple-touch-icon', function () {
		browser.assert.attribute('link[rel=apple-touch-icon]', 'href', process.env.KOM_TOUCH_ICON_URL);
	});

	it('assigns meta:viewport', function () {
		browser.assert.attribute('meta[name=viewport]', 'content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
	});

	it('assigns meta:mobile-web-app-capable', function () {
		browser.assert.attribute('meta[name=mobile-web-app-capable]', 'content', 'yes');
	});

	it('assigns meta:apple-mobile-web-app-capable', function () {
		browser.assert.attribute('meta[name=apple-mobile-web-app-capable]', 'content', 'yes');
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
			return browser.pressButton('.KOMReviewMasterListItem');
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
			return browser.pressButton('.KOMReviewMasterListItem');
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

		context('close', function () {

			before(function () {
				browser.fill('.KOMBrowseInfoFormFrontTextField', 'alfa');
			});

			before(function () {
				return browser.pressButton('.KOMBrowseListToolbarCreateButton');
			});

			before(function () {
				browser.fill('.KOMBrowseInfoFormFrontTextField', 'bravo');
			});

			before(function () {
				browser.assert.text('#TestCallReactThrottle', '0');
			});

			before(function () {
				return browser.pressButton('.KOMBrowseListToolbarCloseButton');
			});

			it('calls ReactThrottle', function () {
				browser.assert.text('#TestCallReactThrottle', '1');
			});

		});

	});

	describe('KOMPlay', function test_KOMPlay() {

		before(function () {
			return browser.pressButton('.KOMReviewDetailPlayButtonSingle');
		});

		before(function () {
			browser.assert.text('#TestKOMPlayStateQueueCount', '3');
		});

		before(function () {
			browser.assert.text('#TestKOMPlayStateWaitCount', '0');
		});

		before(function () {
			return browser.pressButton('.KOMPlayFlipButton');
		});

		before(function () {
			return browser.pressButton('.KOMPlayResponseButtonEasy');
		});

		before(function () {
			return browser.pressButton('.KOMPlayFlipButton');
		});

		before(function () {
			return browser.pressButton('.KOMPlayResponseButtonGood');
		});

		before(function () {
			return browser.pressButton('.KOMPlayToolbarDoneButton');
		});

		before(function () {
			return browser.pressButton('.KOMReviewDetailPlayButtonSingle');
		});

		it('persists responses', function () {
			browser.assert.text('#TestKOMPlayStateQueueCount', '2');
			browser.assert.text('#TestKOMPlayStateWaitCount', '0');
		});

		context('KOMReviewDetailFormIsForwardOnlyField', function () {

			before(function () {
				return browser.pressButton('.KOMPlayToolbarDoneButton');
			});
			
			before(function () {
				return browser.check('.KOMReviewDetailFormIsForwardOnlyField');
			});

			before(function () {
				return browser.pressButton('.KOMReviewDetailPlayButtonSingle');
			});

			it('sets KOMReviewDetailDispatchRecount', function () {
				browser.assert.text('#TestKOMPlayStateQueueCount', '0');
				browser.assert.text('#TestKOMPlayStateWaitCount', '0');
			});
		
		});

		after(function () {
			return browser.pressButton('.KOMPlayToolbarDoneButton');
		});

		after(function () {
			return browser.uncheck('.KOMReviewDetailFormIsForwardOnlyField');
		});

		after(function () {
			return browser.pressButton('.KOMReviewDetailToolbarBackButton');
		});

	});

	describe('KOMReviewMasterListItem', function test_KOMReviewMasterListItem() {

		it('sets $KOMDeckTodayReviewCount', function () {
			browser.assert.text('.KOMReviewMasterListItemReviewValue', '1');
		});

		it.skip('sets $KOMDeckTodayUnseenCount', function () {
			browser.assert.text('.KOMReviewMasterListItemUnseenValue', '2');
		});

	});

	describe('KOMReviewViewportFooter', function test_KOMReviewViewportFooter() {

		it('classes OLSKMobileViewFooter', function () {
			browser.assert.hasClass(KOMReviewViewportFooter, 'OLSKMobileViewFooter');
		});

	});

	describe('OLSKAppToolbarGuideLink', function test_OLSKAppToolbarGuideLink() {

		it('binds OLSKAppToolbarGuideURL', function () {
			browser.assert.attribute('.OLSKAppToolbarGuideLink', 'href', OLSKTestingCanonical(require('../open-guide/controller.js').OLSKControllerRoutes().shift()));
		});

	});

	describe('KOMReviewStorageToolbar', function test_KOMReviewStorageToolbar() {

		before(function () {
			return browser.pressButton('.OLSKAppToolbarStorageButton');
		});

		it('classes OLSKToolbar', function () {
			browser.assert.hasClass(KOMReviewStorageToolbar, 'OLSKToolbar');
		});

		it('classes OLSKToolbarJustify', function () {
			browser.assert.hasClass(KOMReviewStorageToolbar, 'OLSKToolbarJustify');
		});

		it('classes OLSKStorageToolbar', function () {
			browser.assert.hasClass(KOMReviewStorageToolbar, 'OLSKStorageToolbar');
		});

	});

	describe('KOMReviewLauncherItemSelectDeck', function test_KOMReviewLauncherItemSelectDeck() {

		before(function () {
			return browser.OLSKLauncherRun('bravo');
		});

		it('selects deck', function () {
			browser.assert.text('.KOMReviewDetailToolbarTitle', 'bravo');
		});

	});

	describe('KOMReviewLauncherItemSendLoginLink', function test_KOMReviewLauncherItemSendLoginLink() {

		before(function () {
			return browser.OLSKLauncherRun('FakeOLSKConnected');
		});

		before(function () {
			return browser.OLSKLauncherRun('KOMReviewLauncherItemSendLoginLink');
		});

		it('sets mailto', function () {
			browser.assert.evaluate('window.FakeWindowLocationHref', 'mailto:?subject=Kommit Login Link&body=http%3A%2F%2Floc.tests%2Freview%23remotestorage%3Dalfa%26access_token%3Dbravo');
		});

	});

	describe('KOMReviewLauncherItemDebugFlushData', function test_KOMReviewLauncherItemDebugFlushData() {

		before(function () {
			return browser.OLSKLauncherRun('KOMReviewLauncherItemDebugFlushData');
		});

		it.skip('deselects deck', function () {
			browser.assert.elements('.KOMReviewMaster', 1);
		});

		it.skip('reloads page', function () {
			browser.assert.evaluate('window.FakeWindowLocationHref', 'reload');
		});

	});

	describe('KOMReviewLauncherItemForceUpdate', function test_KOMReviewLauncherItemForceUpdate() {

		before(function () {
			return browser.OLSKLauncherRun('KOMReviewLauncherItemForceUpdate');
		});

		it.skip('update service worker registration', function () {});

		it.skip('reloads page', function () {
			browser.assert.evaluate('window.FakeWindowLocationHref', 'reload');
		});

	});

});
