const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMBrowseInfoTags_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMBrowseInfoTagsItems: JSON.stringify(['bravo']),
			KOMBrowseInfoTagsSuggestions: JSON.stringify(['charlie']),
		});
	});

	describe('KOMBrowseInfoTagsInputField', function test_KOMBrowseInfoTagsInputField() {

		it('sets type', function () {
			browser.assert.attribute(KOMBrowseInfoTagsInputField, 'type', 'text');
		});

	});

	describe('KOMBrowseInfoTagsCreateButton', function test_KOMBrowseInfoTagsCreateButton() {

		it('sets type', function () {
			browser.assert.attribute(KOMBrowseInfoTagsCreateButton, 'type', 'submit');
		});

		it('sets disabled', function () {
			browser.assert.attribute(KOMBrowseInfoTagsCreateButton, 'disabled', '');
		});

		context('input', function () {

			before(function () {
				return browser.fill(KOMBrowseInfoTagsInputField, 'charlie');
			});

			it('sets disabled', function () {
				browser.assert.attribute(KOMBrowseInfoTagsCreateButton, 'disabled', null);
			});

			context('click', function () {
				
				before(function () {
					browser.assert.text('#TestKOMBrowseInfoTagsDispatchAdd', '0');
					browser.assert.text('#TestKOMBrowseInfoTagsDispatchAddData', 'undefined');
				});

				before(function () {
					return browser.pressButton(KOMBrowseInfoTagsCreateButton);
				});

				it('sends KOMBrowseInfoTagsDispatchAdd', function () {
					browser.assert.text('#TestKOMBrowseInfoTagsDispatchAdd', '1');
					browser.assert.text('#TestKOMBrowseInfoTagsDispatchAddData', 'charlie');
				});

				it('clears KOMBrowseInfoTagsInputField', function () {
					browser.assert.input(KOMBrowseInfoTagsInputField, '');
				});
			
			});

			context('submit', function () {
				
				before(function () {
					return browser.fill(KOMBrowseInfoTagsInputField, 'delta');
				});

				before(function () {
					browser.assert.text('#TestKOMBrowseInfoTagsDispatchAdd', '1');
				});

				before(function () {
					return browser.fire('.KOMBrowseInfoTagsForm', 'submit');
				});

				it('sends KOMBrowseInfoTagsDispatchAdd', function () {
					browser.assert.text('#TestKOMBrowseInfoTagsDispatchAdd', '2');
					browser.assert.text('#TestKOMBrowseInfoTagsDispatchAddData', 'delta');
				});

				it('clears KOMBrowseInfoTagsInputField', function () {
					browser.assert.input(KOMBrowseInfoTagsInputField, '');
				});
			
			});

		});

	});

	describe('KOMBrowseInfoTagsRemoveButton', function test_KOMBrowseInfoTagsRemoveButton() {

		context('click', function () {

			before(function () {
				browser.assert.text('#TestKOMBrowseInfoTagsDispatchRemove', '0');
				browser.assert.text('#TestKOMBrowseInfoTagsDispatchRemoveData', 'undefined');
			});

			before(function () {
				return browser.pressButton(KOMBrowseInfoTagsRemoveButton);
			});

			it('sends KOMBrowseInfoTagsDispatchRemove', function () {
				browser.assert.text('#TestKOMBrowseInfoTagsDispatchRemove', '1');
				browser.assert.text('#TestKOMBrowseInfoTagsDispatchRemoveData', 'bravo');
			});

		});

	});

	describe('KOMBrowseInfoTagsSuggestButton', function test_KOMBrowseInfoTagsSuggestButton() {

		context('click', function () {

			before(function () {
				browser.assert.text('#TestKOMBrowseInfoTagsDispatchAdd', '2');
			});

			before(function () {
				return browser.pressButton(KOMBrowseInfoTagsSuggestButton);
			});

			it('sends KOMBrowseInfoTagsDispatchAdd', function () {
				browser.assert.text('#TestKOMBrowseInfoTagsDispatchAdd', '3');
				browser.assert.text('#TestKOMBrowseInfoTagsDispatchAddData', 'charlie');
			});

		});

	});

});
