const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe(`KOMBrowseInfoTags_Localize-${ OLSKRoutingLanguage }`, function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
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
			browser.assert.text(KOMBrowseInfoTagsRemoveButton, OLSKTestingFormatted(uLocalized('KOMBrowseInfoTagsRemoveButtonTextFormat'), 'bravo'));
		});

		it('localizes KOMBrowseInfoTagsSuggestButton', function () {
			browser.assert.text(KOMBrowseInfoTagsSuggestButton, OLSKTestingFormatted(uLocalized('KOMBrowseInfoTagsSuggestButtonTextFormat'), 'charlie'));
		});

	});

});
