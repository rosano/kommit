const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const uStringWithFormat = require('OLSKString').OLSKStringWithFormat;

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	describe(`KOMReview_Localize-${ languageCode }`, function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage: languageCode,
			});
		});

		it('localizes title', function () {
			browser.assert.text('title', uLocalized('KOMReviewTitle'));
		});

		context('select_deck', function test_select_deck() {

			before(function () {
				return browser.OLSKPrompt(function () {
					return browser.pressButton('.KOMReviewMasterCreateButton');
				}, function (dialog) {
					dialog.response = 'alfa';

					return dialog;
				});
			});

			it('localizes KOMReviewLauncherItemSelectDeck', function () {
				return browser.assert.OLSKLauncherItemText('KOMReviewLauncherItemSelectDeck', uStringWithFormat(uLocalized('KOMReviewLauncherItemSelectDeckTextFormat'), 'alfa'));
			});

		});

		context('KOMReviewLauncherItemSendLoginLink', function () {

			before(function () {
				return browser.OLSKLauncherRun('FakeOLSKConnected');
			});

			it('localizes KOMReviewLauncherItemSendLoginLink', function () {
				return browser.assert.OLSKLauncherItemText('KOMReviewLauncherItemSendLoginLink', uLocalized('KOMReviewLauncherItemSendLoginLinkText'));
			});

		});

	});

});
