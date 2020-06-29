const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const uStringWithFormat = require('OLSKString').OLSKStringWithFormat;

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	describe(`KOMReview_Localize-${ languageCode }`, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage: languageCode,
			});
		});

		it('localizes title', function() {
			browser.assert.text('title', uLocalized('KOMReviewTitle'));
		});

		context('KOMReviewLauncherItemSelectDeck', function () {
			
			before(function () {
				return browser.OLSKPrompt(function () {
					return browser.pressButton('.KOMReviewMasterCreateButton');
				}, function (dialog) {
					dialog.response = 'alfa';
					
					return dialog;
				});
			});

			before(function () {
				return browser.pressButton('.OLSKAppToolbarLauncherButton');
			});

			before(function () {
				return browser.fill('.LCHLauncherFilterInput', 'alfa');
			});

			it.skip('localizes KOMReviewLauncherItemSelectDeck', function () {
				browser.assert.text('.LCHLauncherPipeItem', uStringWithFormat(uLocalized('KOMReviewLauncherItemSelectDeckTextFormat'), 'alfa'));
			});
		
		});

		context('KOMReviewLauncherItemSendLoginLink', function () {
			
			before(function () {
				return browser.pressButton('.OLSKAppToolbarLauncherButton');
			});

			before(function () {
				return browser.fill('.LCHLauncherFilterInput', 'FakeOLSKConnected');
			});

			before(function () {
				return browser.click('.LCHLauncherPipeItem');
			});

			before(function () {
				return browser.pressButton('.OLSKAppToolbarLauncherButton');
			});

			before(function () {
				return browser.fill('.LCHLauncherFilterInput', 'KOMReviewLauncherItemSendLoginLink');
			});

			it('localizes KOMReviewLauncherItemSendLoginLink', function () {
				browser.assert.text('.LCHLauncherPipeItem', uLocalized('KOMReviewLauncherItemSendLoginLinkText'));
			});
		
		});

		context.skip('KOMReviewLauncherItemDebugCard', function test_KOMReviewLauncherItemDebugCard() {
			
			before(function () {
				return browser.pressButton('.KOMReviewDetailToolbarCardsButton');
			});

			before(function () {
				return browser.click('.KOMBrowseListItem');
			});

			before(function () {
				return browser.pressButton('.OLSKAppToolbarLauncherButton');
			});

			before(function () {
				return browser.fill('.LCHLauncherFilterInput', 'KOMReviewLauncherItemDebugCard');
			});

			it('localizes KOMReviewLauncherItemSendLoginLink', function () {
				browser.assert.text('.LCHLauncherPipeItem', uLocalized('KOMReviewLauncherItemSendLoginLinkText'));
			});

		});

	});

});
