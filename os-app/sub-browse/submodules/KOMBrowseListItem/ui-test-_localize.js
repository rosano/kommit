const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	describe(`KOMBrowseListItem_Localize-${ languageCode }`, function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage: languageCode,
				KOMBrowseListItemObject: JSON.stringify({
					KOMCardFrontText: 'alfa',
					KOMCardRearText: 'bravo',
					KOMCardIsRetired: true,
				}),
			});
		});

		it('localizes KOMBrowseListItemRetired', function () {
			browser.assert.text(KOMBrowseListItemRetired, uLocalized('KOMBrowseListItemRetiredText'));
		});

	});

});
