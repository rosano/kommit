const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (languageCode) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	describe(`KOMBrowse_Localize-${ languageCode }`, function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage: languageCode,
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
