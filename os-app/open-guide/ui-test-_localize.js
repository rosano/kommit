const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute._OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe(`KOMGuide_Localize-${ OLSKRoutingLanguage }`, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute);
		});

		it('localizes title', function() {
			browser.assert.text('title', uLocalized('KOMGuideTitle'));
		});

		it('localizes meta[description]', function() {
			browser.assert.attribute('meta[name=description]', 'content', uLocalized('KOMGuideDescription'));
		});

		it('localizes KOMGuideIdentityName', function () {
			browser.assert.text(KOMGuideIdentityName, uLocalized('KOMGuideTitle'));
		});

	});

});
