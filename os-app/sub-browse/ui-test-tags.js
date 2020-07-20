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

describe('KOMBrowse_Tags', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMBrowseDeckSelected: JSON.stringify(kTesting.StubDeckObjectValid()),
		});
	});

	before(function () {
		return browser.pressButton('.KOMBrowseListToolbarCreateButton');
	});

	before(function () {
		return browser.fill('.KOMBrowseInfoTagsInputField', 'alfa');
	});

	before(function () {
		return browser.pressButton('.KOMBrowseInfoTagsCreateButton');
	});

	before(function () {
		return browser.pressButton('.KOMBrowseListToolbarCreateButton');
	});

	it('suggests existing tag', function () {
		browser.assert.elements('.KOMBrowseInfoTagsSuggestButton', 1);
	});

});
