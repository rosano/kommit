const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	KOMReview: '.KOMReview',

	KOMReviewViewportFooter: '.KOMReviewViewportFooter',

	KOMReviewCloudToolbar: '.KOMReviewCloudToolbar',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('KOMReview_Access', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows KOMReview', function () {
		browser.assert.elements(KOMReview, 1);
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

	it('hides OLSKCatalog', function () {
		browser.assert.elements('.OLSKCatalog', 0);
	});

	it('hides KOMPlay', function () {
		browser.assert.elements('.KOMPlay', 0);
	});

	it('shows KOMReviewViewportFooter', function () {
		browser.assert.elements(KOMReviewViewportFooter, 1);
	});

	it('hides KOMReviewCloudToolbar', function () {
		browser.assert.elements(KOMReviewCloudToolbar, 0);
	});

	it('shows OLSKAppToolbar', function () {
		browser.assert.elements('.OLSKAppToolbar', 1);
	});

	it('shows OLSKAppToolbarAproposButton', function () {
		browser.assert.elements('.OLSKAppToolbarAproposButton', 1);
	});

	it('shows OLSKAppToolbarLanguageButton', function () {
		browser.assert.elements('.OLSKAppToolbarLanguageButton', 1);
	});

	it('shows OLSKAppToolbarGuideLink', function () {
		browser.assert.elements('.OLSKAppToolbarGuideLink', 1);
	});

	it('shows OLSKAppToolbarLauncherButton', function () {
		browser.assert.elements('.OLSKAppToolbarLauncherButton', 1);
	});

	it('shows OLSKInstall', function () {
		browser.assert.elements('.OLSKInstall', 1);
	});

	it('shows KOMReviewLauncherItemToggleExtraResponseButtons', function () {
		return browser.assert.OLSKLauncherItems('KOMReviewLauncherItemToggleExtraResponseButtons', 1);
	});

	it('hides KOMReviewLauncherItemExportSelectedJSON', function () {
		return browser.assert.OLSKLauncherItems('KOMReviewLauncherItemExportSelectedJSON', 0);
	});

	it('hides KOMReviewLauncherItemExportSelectedTXT', function () {
		return browser.assert.OLSKLauncherItems('KOMReviewLauncherItemExportSelectedTXT', 0);
	});

	it('shows ZDRLauncherFakeItemProxy', function () {
		return browser.assert.OLSKLauncherItems('ZDRLauncherFakeItemProxy', 1);
	});

	it('shows OLSKTransportLauncherFakeItemProxy', function () {
		return browser.assert.OLSKLauncherItems('OLSKTransportLauncherFakeItemProxy', 1);
	});

	it('shows OLSKRemoteStorageLauncherFakeItemProxy', function () {
		return browser.assert.OLSKLauncherItems('OLSKRemoteStorageLauncherFakeItemProxy', 1);
	});

	it('shows OLSKServiceWorkerLauncherFakeItemProxy', function () {
		return browser.assert.OLSKLauncherItems('OLSKServiceWorkerLauncherFakeItemProxy', 1);
	});

	it('hides KOMReviewLauncherItemSelectDeck', function () {
		return browser.assert.OLSKLauncherItems('KOMReviewLauncherItemSelectDeck', 0);
	});

	it('hides KOMReviewLauncherItemDebugPlungeData', function () {
		return browser.assert.OLSKLauncherItems('KOMReviewLauncherItemDebugPlungeData', 0);
	});

	it('shows KOMReviewMasterLauncherFakeItemProxy', function () {
		return browser.assert.OLSKLauncherItems('KOMReviewMasterLauncherFakeItemProxy', 1);
	});

	it('hides KOMReviewDetailLauncherFakeItemProxy', function () {
		return browser.assert.OLSKLauncherItems('KOMReviewDetailLauncherFakeItemProxy', 0);
	});

	describe('tongue', function test_tongue() {

		before(function () {
			return browser.pressButton('.OLSKAppToolbarLanguageButton');
		});

		before(function () {
			return browser.fill('.LCHLauncherFilterInput', 'OLSKLanguageSwitcherLauncherFakeItemProxy');
		});

		it('shows OLSKLanguageSwitcherLauncherFakeItemProxy', function () {
			browser.assert.elements('.LCHLauncherPipeItem', 1);
		});

		after(function () {
			browser.pressButton('#TestLCHDebugCloseButton');
		});

	});

	context('click OLSKAppToolbarCloudButton', function () {

		before(function () {
			return browser.pressButton('.OLSKAppToolbarCloudButton');
		});

		it('shows KOMReviewCloudToolbar', function () {
			browser.assert.elements(KOMReviewCloudToolbar, 1);
		});

		it('shows OLSKCloud', function () {
			browser.assert.elements('.OLSKCloud', 1);
		});

	});

	describe('OLSKAppToolbarLauncherButton', function test_OLSKAppToolbarLauncherButton() {

		before(function () {
			return browser.pressButton('.OLSKAppToolbarLauncherButton');
		});

		it('shows LCHLauncher', function () {
			browser.assert.elements('.LCHLauncher', 1);
		});

		context('AltSpace', function () {
			
			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Space', {
					altKey: true,
				});
			});
			
			it('hides LCHLauncher', function () {
				browser.assert.elements('.LCHLauncher', 0);
			});

		});

	});

	context('create', function test_create() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute);
		});

		context('empty', function () {
			
			before(function () {
				return browser.OLSKPromptSync(function () {
					return browser.pressButton('.KOMReviewMasterCreateButton');
				});
			});

			it('hides KOMReviewMasterListItem', function () {
				browser.assert.elements('.KOMReviewMasterListItem', 0);
			});
		
		});

		context('filled', function () {
			
			before(function () {
				return browser.OLSKPrompt(function () {
					return browser.pressButton('.KOMReviewMasterCreateButton');
				}, function (dialog) {
					return Object.assign(dialog, {
						response: 'alfa'
					});
				});
			});

			it('shows KOMReviewMasterListItem', function () {
				browser.assert.elements('.KOMReviewMasterListItem', 1);
			});

			it('shows KOMReviewLauncherItemSelectDeck', function () {
				return browser.assert.OLSKLauncherItems('KOMReviewLauncherItemSelectDeck', 1);
			});
		
		});

	});

	context('select', function test_select() {

		before(function () {
			return browser.pressButton('.KOMReviewMasterListItem');
		});

		it('hides KOMReviewMaster', function () {
			browser.assert.elements('.KOMReviewMaster', 0);
		});

		it('hides KOMReviewMasterLauncherFakeItemProxy', function () {
			return browser.assert.OLSKLauncherItems('KOMReviewMasterLauncherFakeItemProxy', 0);
		});

		it('shows KOMReviewDetail', function () {
			browser.assert.elements('.KOMReviewDetail', 1);
		});

		it('shows KOMReviewLauncherItemExportSelectedJSON', function () {
			return browser.assert.OLSKLauncherItems('KOMReviewLauncherItemExportSelectedJSON', 1);
		});

		it('shows KOMReviewLauncherItemExportSelectedTXT', function () {
			return browser.assert.OLSKLauncherItems('KOMReviewLauncherItemExportSelectedTXT', 1);
		});

		it('shows KOMReviewDetailLauncherFakeItemProxy', function () {
			return browser.assert.OLSKLauncherItems('KOMReviewDetailLauncherFakeItemProxy', 1);
		});

		it('hides OLSKCatalog', function () {
			browser.assert.elements('.OLSKCatalog', 0);
		});

	});

	context('browse', function test_browse() {

		before(function () {
			return browser.pressButton('.KOMReviewDetailToolbarCardsButton');
		});

		it('hides KOMReviewMaster', function () {
			browser.assert.elements('.KOMReviewMaster', 0);
		});

		it('hides KOMReviewDetail', function () {
			browser.assert.elements('.KOMReviewDetail', 0);
		});

		it('shows OLSKCatalog', function () {
			browser.assert.elements('.OLSKCatalog', 1);
		});

	});

	context('close', function test_close() {

		before(function () {
			return browser.pressButton('.KOMBrowseCloseButton');
		});

		it('hides KOMReviewMaster', function () {
			browser.assert.elements('.KOMReviewMaster', 0);
		});

		it('shows KOMReviewDetail', function () {
			browser.assert.elements('.KOMReviewDetail', 1);
		});

		it('hides OLSKCatalog', function () {
			browser.assert.elements('.OLSKCatalog', 0);
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

		it('hides OLSKCatalog', function () {
			browser.assert.elements('.OLSKCatalog', 0);
		});

	});

	context('discard', function test_discard() {

		before(function () {
			return browser.pressButton('.KOMReviewMasterListItem');
		});

		before(function () {
			return browser.OLSKPrompt(function () {
				return browser.pressButton('.KOMReviewDetailDiscardButton');
			}, function (dialog) {
				dialog.response = '0';

				return dialog;
			});
		});

		it('shows KOMReviewMaster', function () {
			browser.assert.elements('.KOMReviewMaster', 1);
		});

		it('hides KOMReviewDetail', function () {
			browser.assert.elements('.KOMReviewDetail', 0);
		});

		it('hides OLSKCatalog', function () {
			browser.assert.elements('.OLSKCatalog', 0);
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
			return browser.wait({
				element: '.KOMReviewMasterListItem'
			});
		});

		before(function () {
			return browser.pressButton('.KOMReviewMasterListItem');
		});

		before(function () {
			return browser.pressButton('.KOMReviewDetailToolbarCardsButton');
		});

		before(function () {
			return browser.pressButton('.KOMBrowseCreateButton');
		});

		before(function () {
			return browser.pressButton('.KOMBrowseCloseButton');
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

		it('hides KOMReviewViewportFooter', function () {
			browser.assert.elements(KOMReviewViewportFooter, 0);
		});

		context('done', function () {

			before(function () {
				return browser.pressButton('.KOMPlayToolbarDoneButton');
			});

			it('hides KOMReviewMaster', function () {
				browser.assert.elements('.KOMReviewMaster', 0);
			});

			it('shows KOMReviewDetail', function () {
				browser.assert.elements('.KOMReviewDetail', 1);
			});

			it('hides KOMPlay', function () {
				browser.assert.elements('.KOMPlay', 0);
			});

			it('shows KOMReviewViewportFooter', function () {
				browser.assert.elements(KOMReviewViewportFooter, 1);
			});

		});

	});

	context('KOMReviewLauncherItemSelectDeck', function test_KOMReviewLauncherItemSelectDeck() {

		before(function () {
			return browser.pressButton('.KOMReviewDetailToolbarBackButton');
		});

		before(function () {
			return browser.OLSKLauncherRun('KOMReviewLauncherItemSelectDeck');
		});

		it('hides KOMReviewMaster', function () {
			browser.assert.elements('.KOMReviewMaster', 0);
		});

		it('shows KOMReviewDetail', function () {
			browser.assert.elements('.KOMReviewDetail', 1);
		});

		it('hides OLSKCatalog', function () {
			browser.assert.elements('.OLSKCatalog', 0);
		});

		it('hides KOMReviewLauncherItemSelectDeck', function () {
			return browser.assert.OLSKLauncherItems('KOMReviewLauncherItemSelectDeck', 0);
		});

	});

	context('connected', function test_connected () {

		before(function () {
			return browser.OLSKLauncherRun('ZDRLauncherItemFakeDispatchConnected');
		});

		it('shows KOMReviewLauncherItemDebugPlungeData', function () {
			return browser.assert.OLSKLauncherItems('KOMReviewLauncherItemDebugPlungeData', 1);
		});

	});

});
