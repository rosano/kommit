const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	describe(`KOMReviewMaster_Localize-${ languageCode }`, function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage: languageCode,
			});
		});

		it('localizes KOMReviewMasterToolbarTitle', function () {
			browser.assert.text(KOMReviewMasterToolbarTitle, uLocalized('KOMReviewMasterToolbarTitleText'));
		});

		it('localizes KOMReviewMasterCreateButton', function () {
			browser.assert.text(KOMReviewMasterCreateButton, uLocalized('KOMReviewMasterCreateButtonText'));
		});

		it('localizes KOMReviewMasterLauncherItemToggleExcludeTripleQuestionMark', function () {
			return browser.assert.OLSKLauncherItemText('KOMReviewMasterLauncherItemToggleExcludeTripleQuestionMark', uLocalized('KOMReviewMasterLauncherItemToggleExcludeTripleQuestionMarkText'));
		});

		it('localizes KOMReviewMasterLauncherItemToggleDeckFiguresCaching', function () {
			return browser.assert.OLSKLauncherItemText('KOMReviewMasterLauncherItemToggleDeckFiguresCaching', uLocalized('KOMReviewMasterLauncherItemToggleDeckFiguresCachingText'));
		});

		context('KOMReviewMasterCreateButton', function () {

			it('localizes KOMReviewMasterCreateButtonPrompt', function () {
				browser.assert.OLSKPromptQuestion(function () {
					return browser.pressButton(KOMReviewMasterCreateButton);
				}, uLocalized('KOMReviewMasterCreateButtonPromptText'));
			});

		});

	});

});
