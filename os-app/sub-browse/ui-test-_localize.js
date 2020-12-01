const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe(`KOMBrowse_Localize-${ OLSKRoutingLanguage }`, function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
				KOMBrowseDeckSelected: JSON.stringify(StubDeckObjectValid()),
			});
		});

		context('retire', function test_retire() {

			before(function () {
				return browser.pressButton('.KOMBrowseListToolbarCreateButton');
			});

			before(function () {
				return browser.OLSKLauncherRun('KOMBrowseInfoLauncherItemToggleRetire');
			});

			it('localizes KOMBrowseLauncherItemDiscardRetiredCards', function () {
				return browser.assert.OLSKLauncherItemText('KOMBrowseLauncherItemDiscardRetiredCards', uLocalized('KOMBrowseLauncherItemDiscardRetiredCardsText'));
			});

			context('KOMBrowseLauncherItemDiscardRetiredCardsPrompt', function () {

				before(function () {
					return browser.pressButton('.OLSKAppToolbarLauncherButton');
				});

				before(async function () {
					return browser.fill('.LCHLauncherFilterInput', 'KOMBrowseLauncherItemDiscardRetiredCards');
				});

				it('localizes KOMBrowseLauncherItemDiscardRetiredCardsPrompt', function () {
					browser.assert.OLSKPromptQuestion(function () {
						return browser.click('.LCHLauncherPipeItem');
					}, uLocalized('KOMBrowseLauncherItemDiscardRetiredCardsPromptText'));
				});
				
			});

		});

	});

});
