const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const kTesting = {
	StubDeckObjectValid() {
		return {
			KOMDeckID: 'alfa',
			KOMDeckName: '',
			KOMDeckCreationDate: new Date('2019-02-23T13:56:36Z'),
			KOMDeckModificationDate: new Date('2019-02-23T13:56:36Z'),
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

	context('suggestions', function () {

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

	context('template', function () {

		before(function () {
			browser.assert.elements('.KOMBrowseInfoTagsRemoveButton', 0);
		});

		before(function () {
			return browser.pressButton('.KOMBrowseInfoTagsSuggestButton');
		});

		before(function () {
			return browser.pressButton('.KOMBrowseInfoToolbarTemplateButton');
		});

		it('copies existing tag', function () {
			browser.assert.elements('.KOMBrowseInfoTagsRemoveButton', 1);
		});
	
	});

});
