const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe(`KOMReviewMaster_Localize-${ OLSKRoutingLanguage }`, function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
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

		it('localizes KOMReviewMasterLauncherItemImportData', function () {
			return browser.assert.OLSKLauncherItemText('KOMReviewMasterLauncherItemImportData', uLocalized('KOMReviewMasterLauncherItemImportDataText'));
		});

		it('localizes KOMReviewMasterLauncherItemExportData', function () {
			return browser.assert.OLSKLauncherItemText('KOMReviewMasterLauncherItemExportData', uLocalized('KOMReviewMasterLauncherItemExportDataText'));
		});

	});

});
