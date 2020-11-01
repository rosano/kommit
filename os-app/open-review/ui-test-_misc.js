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

	});

	describe('KOMPlay', function test_KOMPlay() {

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
			return browser.pressButton('.KOMBrowseListToolbarCloseButton');
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

	describe('ImportData', function test_ImportData() {

		before(function () {
			return browser.pressButton('.OLSKAppToolbarLauncherButton');
		});

		before(function () {
			return browser.fill('.LCHLauncherFilterInput', 'KOMReviewLauncherItemDebug_ImportFileData');
		});

		before(function () {
			return browser.OLSKPrompt(function () {
				return browser.click('.LCHLauncherPipeItem');
			}, function (dialog) {
				dialog.response = JSON.stringify([StubDeckObjectValid({
					KOMDeckName: 'zulu',
					$KOMDeckCards: [StubCardObjectValid({
						$KOMCardSpacingForward: StubSpacingObjectValid(),
						$KOMCardSpacingBackward: StubSpacingObjectValid({
							KOMSpacingDueDate: new Date(),
							// KOMSpacingChronicles: [StubChronicleObjectValid()],
						}),
					}), StubCardObjectValid({
						KOMCardIsRetired: true,
						$KOMCardSpacingForward: StubSpacingObjectValid(),
						$KOMCardSpacingBackward: StubSpacingObjectValid(),
					})],
				})]);

				return dialog;
			});
		});

		it('creates deck', function () {
			browser.assert.text('.KOMReviewMasterListItem:nth-child(2) .KOMReviewMasterListItemName', 'zulu');
		});

		it.skip('creates spacing', function () {
			browser.assert.text('.KOMReviewMasterListItem:nth-child(2) .KOMReviewMasterListItemReviewValue', '1');
			browser.assert.text('.KOMReviewMasterListItem:nth-child(2) .KOMReviewMasterListItemUnseenValue', '1');
		});

		it.skip('creates card', function () {
			browser.assert.text('.KOMReviewChartCompositionCollectionRetiredCardsValue', '1');
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
