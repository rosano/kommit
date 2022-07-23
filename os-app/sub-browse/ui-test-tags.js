const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMBrowse_Tags', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMBrowseDeckSelected: JSON.stringify(StubDeckObjectValid()),
		});
	});

	before(function () {
		return browser.pressButton('.KOMBrowseCreateButton');
	});

	context('suggestions', function () {

		before(function () {
			return browser.fill('.KOMBrowseInfoTagsInputField', 'alfa');
		});

		before(function () {
			return browser.pressButton('.KOMBrowseInfoTagsCreateButton');
		});

		before(function () {
			return browser.pressButton('.KOMBrowseCreateButton');
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
