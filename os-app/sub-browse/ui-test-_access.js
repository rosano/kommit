const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	KOMBrowseCloseButton: '.KOMBrowseCloseButton',
	KOMBrowseCloseButtonImage: '.KOMBrowseCloseButtonImage',

	KOMBrowseCreateButton: '.KOMBrowseCreateButton',
	KOMBrowseCreateButtonImage: '.KOMBrowseCreateButtonImage',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('KOMBrowse_Access', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMBrowseDeckSelected: JSON.stringify(StubDeckObjectValid({
				$KOMReviewChartCompositionCollectionData: {
					KOMSpacingGroupingRetired: 1,
				},
			})),
		});
	});

	it('shows OLSKCatalog', function () {
		browser.assert.elements('.OLSKCatalog', 1);
	});

	it('shows KOMBrowseCloseButton', function () {
		browser.assert.elements(KOMBrowseCloseButton, 1);
	});

	it('shows KOMBrowseCloseButtonImage', function () {
		browser.assert.elements(KOMBrowseCloseButtonImage, 1);
	});

	it('shows KOMBrowseCreateButton', function () {
		browser.assert.elements(KOMBrowseCreateButton, 1);
	});

	it('shows KOMBrowseCreateButtonImage', function () {
		browser.assert.elements(KOMBrowseCreateButtonImage, 1);
	});

	it('hides KOMBrowseListItem', function () {
		browser.assert.elements('.KOMBrowseListItem', 0);
	});

	it('hides KOMBrowseLauncherItemImportCardsFromSSV', function () {
		return browser.assert.OLSKLauncherItems('KOMBrowseLauncherItemImportCardsFromSSV', 1);
	});

	it('hides KOMBrowseLauncherItemDiscardRetiredCards', function () {
		return browser.assert.OLSKLauncherItems('KOMBrowseLauncherItemDiscardRetiredCards', 0);
	});

	it('hides KOMBrowseInfoLauncherFakeItemProxy', function () {
		return browser.assert.OLSKLauncherItems('KOMBrowseInfoLauncherFakeItemProxy', 0);
	});

	context('select', function test_select() {

		before(function () {
			return browser.pressButton('.KOMBrowseCreateButton');
		});

		it('shows KOMBrowseInfoLauncherFakeItemProxy', function () {
			return browser.assert.OLSKLauncherItems('KOMBrowseInfoLauncherFakeItemProxy', 1);
		});

	});

	context('retire', function test_retire() {

		before(function () {
			return browser.pressButton('.KOMBrowseCreateButton');
		});

		before(function () {
			return browser.OLSKLauncherRun('KOMBrowseInfoLauncherItemToggleRetire');
		});

		it('shows KOMBrowseLauncherItemDiscardRetiredCards', function () {
			return browser.assert.OLSKLauncherItems('KOMBrowseLauncherItemDiscardRetiredCards', 1);
		});

		context('KOMBrowseLauncherItemDiscardRetiredCards', function () {
			
			before(function () {
				return browser.pressButton('.OLSKAppToolbarLauncherButton');
			});

			before(async function () {
				return browser.fill('.LCHLauncherFilterInput', 'KOMBrowseLauncherItemDiscardRetiredCards');
			});

			it('localizes KOMBrowseLauncherItemDiscardRetiredCardsPrompt', function () {
				return browser.OLSKPrompt(function () {
					return browser.click('.LCHLauncherPipeItem');
				}, function (dialog) {
					return Object.assign(dialog, {
						response: '1',
					});
				});
			});

			it('hides KOMBrowseListItem', function () {
				browser.assert.elements('.KOMBrowseListItem', 1);
			});
		
		});

	});

});
