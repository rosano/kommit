const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	KOMBrowseListToolbarCloseButton: '.KOMBrowseListToolbarCloseButton',
	KOMBrowseListToolbarCloseButtonImage: '.KOMBrowseListToolbarCloseButtonImage',

	KOMBrowseListToolbarCreateButton: '.KOMBrowseListToolbarCreateButton',
	KOMBrowseListToolbarCreateButtonImage: '.KOMBrowseListToolbarCreateButtonImage',
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

	it('shows KOMBrowseListToolbarCloseButton', function () {
		browser.assert.elements(KOMBrowseListToolbarCloseButton, 1);
	});

	it('shows KOMBrowseListToolbarCloseButtonImage', function () {
		browser.assert.elements(KOMBrowseListToolbarCloseButtonImage, 1);
	});

	it('shows KOMBrowseListToolbarCreateButton', function () {
		browser.assert.elements(KOMBrowseListToolbarCreateButton, 1);
	});

	it('shows KOMBrowseListToolbarCreateButtonImage', function () {
		browser.assert.elements(KOMBrowseListToolbarCreateButtonImage, 1);
	});

	it('hides KOMBrowseListItem', function () {
		browser.assert.elements('.KOMBrowseListItem', 0);
	});

	it('hides KOMBrowseLauncherItemDiscardRetiredCards', function () {
		return browser.assert.OLSKLauncherItems('KOMBrowseLauncherItemDiscardRetiredCards', 0);
	});

	it('hides KOMBrowseInfoLauncherFakeItemProxy', function () {
		return browser.assert.OLSKLauncherItems('KOMBrowseInfoLauncherFakeItemProxy', 0);
	});

	context('select', function test_select() {

		before(function () {
			return browser.pressButton('.KOMBrowseListToolbarCreateButton');
		});

		it('shows KOMBrowseInfoLauncherFakeItemProxy', function () {
			return browser.assert.OLSKLauncherItems('KOMBrowseInfoLauncherFakeItemProxy', 1);
		});

	});

	context('retire', function test_retire() {

		before(function () {
			return browser.pressButton('.KOMBrowseListToolbarCreateButton');
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
