const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	KOMBrowseInfoTags: '.KOMBrowseInfoTags',

	KOMBrowseInfoTagsInputField: '.KOMBrowseInfoTagsInputField',

	KOMBrowseInfoTagsCreateButton: '.KOMBrowseInfoTagsCreateButton',

	KOMBrowseInfoTagsRemoveButton: '.KOMBrowseInfoTagsRemoveButton',

	KOMBrowseInfoTagsSuggestButton: '.KOMBrowseInfoTagsSuggestButton',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('KOMBrowseInfoTags_Access', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMBrowseInfoTagsItems: JSON.stringify([]),
		});
	});

	it('shows KOMBrowseInfoTags', function () {
		browser.assert.elements(KOMBrowseInfoTags, 1);
	});

	it('shows KOMBrowseInfoTagsInputField', function () {
		browser.assert.elements(KOMBrowseInfoTagsInputField, 1);
	});

	it('shows KOMBrowseInfoTagsCreateButton', function () {
		browser.assert.elements(KOMBrowseInfoTagsCreateButton, 1);
	});

	it('hides KOMBrowseInfoTagsRemoveButton', function () {
		browser.assert.elements(KOMBrowseInfoTagsRemoveButton, 0);
	});

	it('hides KOMBrowseInfoTagsSuggestButton', function () {
		browser.assert.elements(KOMBrowseInfoTagsSuggestButton, 0);
	});

	context('KOMBrowseInfoTagsItems', function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMBrowseInfoTagsItems: JSON.stringify(['alfa', 'bravo']),
			});
		});

		it('shows KOMBrowseInfoTagsRemoveButton', function () {
			browser.assert.elements(KOMBrowseInfoTagsRemoveButton, 2);
		});

	});

	context('KOMBrowseInfoTagsSuggestions', function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMBrowseInfoTagsItems: JSON.stringify([]),
				KOMBrowseInfoTagsSuggestions: JSON.stringify(['alfa', 'bravo']),
			});
		});

		it('shows KOMBrowseInfoTagsSuggestButton', function () {
			browser.assert.elements(KOMBrowseInfoTagsSuggestButton, 2);
		});

	});

});
