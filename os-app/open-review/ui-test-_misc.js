const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMReview_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('sets meta:viewport', function () {
		browser.assert.attribute('meta[name=viewport]', 'content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
	});

	it('sets meta:mobile-web-app-capable', function () {
		browser.assert.attribute('meta[name=mobile-web-app-capable]', 'content', 'yes');
	});

	it('sets meta:apple-mobile-web-app-capable', function () {
		browser.assert.attribute('meta[name=apple-mobile-web-app-capable]', 'content', 'yes');
	});

	context('KOMReview', function () {
		
		it('classes OLSKViewport', function () {
			browser.assert.hasClass(KOMReview, 'OLSKViewport');
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
			return browser.pressButton('.KOMBrowseCreateButton');
		});

		it('sets KOMBrowseDeckSelected', function () {
			browser.assert.elements('.KOMBrowseListItem', 1);
		});

	});

	describe('KOMPlay', function test_KOMPlay() {

		before(function () {
			browser.fill('.KOMBrowseInfoFormFrontTextField', 'alfa');
		});

		before(function () {
			return browser.pressButton('.KOMBrowseCreateButton');
		});

		before(function () {
			browser.fill('.KOMBrowseInfoFormFrontTextField', 'bravo');
		});

		before(function () {
			return browser.pressButton('.KOMBrowseCloseButton');
		});

		before(function () {
			return browser.pressButton('.KOMReviewDetailPlayButton');
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
			return browser.pressButton('.KOMReviewDetailPlayButton');
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
				return browser.pressButton('.KOMReviewDetailPlayButton');
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

	describe('OLSKApropos', function test_OLSKApropos() {

		before(function () {
			return browser.pressButton('.OLSKAppToolbarAproposButton');
		});

		it('sets OLSKAproposFeedbackValue', function () {
			browser.assert.attribute('.OLSKAproposFeedbackButton', 'href', `javascript:window.location.href = window.atob('${ browser.window.btoa('mailto:' + OLSKTestingFormatted(process.env.OLSK_APROPOS_FEEDBACK_EMAIL, process.env.ROCO_SHARED_PROJECT_ID)) }')`);
		});

		after(function () {
			browser.pressButton('.OLSKModalViewCloseButton');
		});

	});

	describe('OLSKAppToolbarGuideLink', function test_OLSKAppToolbarGuideLink() {

		it('binds OLSKAppToolbarGuideURL', function () {
			browser.assert.attribute('.OLSKAppToolbarGuideLink', 'href', OLSKTestingCanonical(require('../open-guide/controller.js').OLSKControllerRoutes().shift()));
		});

	});

	describe('KOMReviewCloudToolbar', function test_KOMReviewCloudToolbar() {

		before(function () {
			return browser.pressButton('.OLSKAppToolbarCloudButton');
		});

		it('classes OLSKToolbar', function () {
			browser.assert.hasClass(KOMReviewCloudToolbar, 'OLSKToolbar');
		});

		it('classes OLSKToolbarJustify', function () {
			browser.assert.hasClass(KOMReviewCloudToolbar, 'OLSKToolbarJustify');
		});

		it('classes OLSKCommonEdgeTop', function () {
			browser.assert.hasClass(KOMReviewCloudToolbar, 'OLSKCommonEdgeTop');
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

	describe('KOMReviewLauncherItemDebugPlungeData', function test_KOMReviewLauncherItemDebugPlungeData() {

		before(function () {
			return browser.OLSKLauncherRun('ZDRLauncherItemFakeDispatchConnected');
		});

		before(function () {
			return browser.OLSKLauncherRun('KOMReviewLauncherItemDebugPlungeData');
		});

		it.skip('does something', function () {
			browser.assert.elements('.KOMReviewMaster', 1);
		});

		it.skip('reloads page', function () {
			browser.assert.evaluate('window.FakeWindowLocationHref', 'reload');
		});

	});

});
