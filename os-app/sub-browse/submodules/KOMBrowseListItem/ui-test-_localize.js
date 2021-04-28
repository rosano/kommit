const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe('KOMBrowseListItem_Localize-' + OLSKRoutingLanguage, function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
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
