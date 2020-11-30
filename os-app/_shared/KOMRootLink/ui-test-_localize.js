require('./controller.js').OLSKControllerRoutes().forEach(function (kDefaultRoute) {

	kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (languageCode) {

		const uLocalized = function (inputData) {
			return OLSKTestingLocalized(inputData, languageCode);
		};

		describe(`KOMRootLink_Localize-${ kDefaultRoute.OLSKRouteSignature }-${ languageCode }`, function () {

			before(function () {
				return browser.OLSKVisit(kDefaultRoute, {
					OLSKRoutingLanguage: languageCode,
				});
			});

			it('localizes OLSKRootLink', function () {
				browser.assert.attribute('.OLSKRootLink', 'href', OLSKTestingCanonical(require('../../open-vitrine/controller.js').OLSKControllerRoutes().shift(), {
					OLSKRoutingLanguage: languageCode,
				}));
			});

		});

	});

});
