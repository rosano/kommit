const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

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

describe('KOMBrowse_Sort', function () {	

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMBrowseDeckSelected: JSON.stringify(kTesting.StubDeckObjectValid()),
		});
	});

	before(function () {
		return browser.pressButton('.KOMBrowseListToolbarCreateButton');
	});

	before(function () {
		return browser.fill('.KOMBrowseInfoFormFrontTextField', 'alfa');
	});

	before(function () {
		return browser.pressButton('.KOMBrowseListToolbarCreateButton');
	});

	before(function () {
		return browser.fill('.KOMBrowseInfoFormFrontTextField', 'bravo');
	});

	before(function () {
		return browser.pressButton('.KOMBrowseListToolbarCreateButton');
	});

	before(function () {
		return browser.fill('.KOMBrowseInfoFormFrontTextField', 'charlie');
	});

	describe('update', function test_update () {

		before(function () {
			return browser.click('.OLSKResultsListItem:nth-child(3) .KOMBrowseListItem');
		});

		before(function () {
			return browser.fill('.KOMBrowseInfoFormFrontTextField', 'alfa2');
		});

		it('skips sort', function () {
			browser.assert.text('.KOMBrowseListItem', 'charlie bravo alfa2');
		});

	});

	describe('deselect', function test_deselect () {

		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
		});

		it('sorts list', function () {
			browser.assert.text('.KOMBrowseListItem', 'alfa2 charlie bravo');
		});

	});

	describe('delete', function test_delete () {

		before(function () {
			return browser.click('.OLSKResultsListItem:nth-child(3) .KOMBrowseListItem');
		});

		before(function () {
			return browser.fill('.KOMBrowseInfoFormFrontTextField', 'bravo2');
		});

		before(function () {
			return browser.click('.OLSKResultsListItem:nth-child(2) .KOMBrowseListItem');
		});

		before(async function () {
			return browser.OLSKConfirm(function () {
				return browser.pressButton('.KOMBrowseInfoToolbarDiscardButton');
			});
		});

		it('skips sort', function () {
			browser.assert.text('.KOMBrowseListItem', 'alfa2 bravo2');
		});

	});

});
