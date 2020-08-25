const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({}).map(function (e) {
	return global[e.shift()] = e.pop();
});

const kTesting = {
	StubDeckObjectValid() {
		return {
			KOMDeckID: 'alfa',
			KOMDeckName: '',
			KOMDeckCreationDate: new Date('2019-02-23T13:56:36Z'),
			KOMDeckModificationDate: new Date('2019-02-23T13:56:36Z'),
			$KOMDeckCards: [],
		};
	},
};

describe('KOMBrowse_Access', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMBrowseDeckSelected: JSON.stringify(kTesting.StubDeckObjectValid()),
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

	it('hides KOMReviewLauncherItemDebugCard', function () {
		return browser.assert.OLSKLauncherItems('KOMReviewLauncherItemDebugCard', 0);
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

		it('shows KOMReviewLauncherItemDebugCard', function () {
			return browser.assert.OLSKLauncherItems('KOMReviewLauncherItemDebugCard', 1);
		});

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

});
