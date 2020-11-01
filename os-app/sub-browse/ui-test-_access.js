const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({}).map(function (e) {
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

	it('shows KOMBrowseList', function () {
		browser.assert.elements('.KOMBrowseList', 1);
	});

	it('hides KOMBrowseListItem', function () {
		browser.assert.elements('.KOMBrowseListItem', 0);
	});

	it('shows KOMBrowseInfo', function () {
		browser.assert.elements('.KOMBrowseInfo', 1);
	});

	it('shows OLSKDetailPlaceholder', function () {
		browser.assert.elements('.OLSKDetailPlaceholder', 1);
	});

	it('hides KOMBrowseInfoForm', function () {
		browser.assert.elements('.KOMBrowseInfoForm', 0);
	});

	it('hides KOMBrowseLauncherItemDiscardRetiredCards', function () {
		return browser.assert.OLSKLauncherItems('KOMBrowseLauncherItemDiscardRetiredCards', 0);
	});

	it('hides KOMBrowseInfoLauncherFakeItemProxy', function () {
		return browser.assert.OLSKLauncherItems('KOMBrowseInfoLauncherFakeItemProxy', 0);
	});

	context('create', function test_create() {

		before(function () {
			return browser.pressButton('.KOMBrowseListToolbarCreateButton');
		});

		it('shows KOMBrowseListItem', function () {
			browser.assert.elements('.KOMBrowseListItem', 1);
		});

		it('hides OLSKDetailPlaceholder', function () {
			browser.assert.elements('.OLSKDetailPlaceholder', 0);
		});

		it('shows KOMBrowseInfoForm', function () {
			browser.assert.elements('.KOMBrowseInfoForm', 1);
		});

	});

	context('select', function test_select() {

		it('shows KOMBrowseInfoLauncherFakeItemProxy', function () {
			return browser.assert.OLSKLauncherItems('KOMBrowseInfoLauncherFakeItemProxy', 1);
		});

	});

	context('discard', function test_discard() {

		before(function () {
			return browser.pressButton('.KOMBrowseInfoToolbarDiscardButton');
		});

		it('hides KOMBrowseListItem', function () {
			browser.assert.elements('.KOMBrowseListItem', 0);
		});

		it('shows OLSKDetailPlaceholder', function () {
			browser.assert.elements('.OLSKDetailPlaceholder', 1);
		});

		it('hides KOMBrowseInfoForm', function () {
			browser.assert.elements('.KOMBrowseInfoForm', 0);
		});

	});

	context('retire', function test_retire() {

		before(function () {
			return browser.pressButton('.KOMBrowseListToolbarCreateButton');
		});

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
