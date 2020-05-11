const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	describe(`KOMBrowseList_Localize-${ languageCode }`, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage: languageCode,
			});
		});

		it('localizes OLSKMasterListToolbarCloseButton', function () {
			browser.assert.text(OLSKMasterListToolbarCloseButton, uLocalized('OLSKMasterListToolbarCloseButtonText'));
		});
	
		it('localizes KOMBrowseListToolbarCreateButton', function () {
			browser.assert.attribute(KOMBrowseListToolbarCreateButton, 'title', uLocalized('KOMBrowseListToolbarCreateButtonText'));
		});

	});

});
