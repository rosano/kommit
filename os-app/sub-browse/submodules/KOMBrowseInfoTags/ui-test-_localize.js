const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const uFormatted = require('OLSKString').OLSKStringWithFormat;

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (languageCode) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	describe(`KOMBrowseInfoTags_Localize-${ languageCode }`, function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage: languageCode,
				KOMBrowseInfoTagsItems: JSON.stringify(['bravo']),
				KOMBrowseInfoTagsSuggestions: JSON.stringify(['charlie']),
			});
		});

		it('localizes KOMBrowseInfoTagsInputField', function () {
			browser.assert.attribute(KOMBrowseInfoTagsInputField, 'placeholder', uLocalized('KOMBrowseInfoTagsInputFieldText'));
		});

		it('localizes KOMBrowseInfoTagsCreateButton', function () {
			browser.assert.text(KOMBrowseInfoTagsCreateButton, uLocalized('KOMBrowseInfoTagsCreateButtonText'));
		});

		it('localizes KOMBrowseInfoTagsRemoveButton', function () {
			browser.assert.text(KOMBrowseInfoTagsRemoveButton, uFormatted(uLocalized('KOMBrowseInfoTagsRemoveButtonTextFormat'), 'bravo'));
		});

		it('localizes KOMBrowseInfoTagsSuggestButton', function () {
			browser.assert.text(KOMBrowseInfoTagsSuggestButton, uFormatted(uLocalized('KOMBrowseInfoTagsSuggestButtonTextFormat'), 'charlie'));
		});

	});

});
