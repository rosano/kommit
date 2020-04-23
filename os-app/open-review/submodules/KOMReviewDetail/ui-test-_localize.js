import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	describe(`KOMReviewDetail_Localize-${ languageCode }`, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewDetailItem: JSON.stringify({
					KOMDeckName: 'alfa',
				}),
			});
		});

		it('localizes KOMReviewDetailToolbarBackButton', function () {
			browser.assert.text(KOMReviewDetailToolbarBackButton, uLocalized('KOMReviewDetailToolbarBackButtonText'));
		});

		it('localizes KOMReviewDetailToolbarDiscardButton', function () {
			browser.assert.text(KOMReviewDetailToolbarDiscardButton, uLocalized('KOMReviewDetailToolbarDiscardButtonText'));
		});

		it('localizes KOMReviewDetailToolbarRenameButton', function () {
			browser.assert.text(KOMReviewDetailToolbarRenameButton, uLocalized('KOMReviewDetailToolbarRenameButtonText'));
		});

		it('localizes KOMReviewDetailToolbarBrowseButton', function () {
			browser.assert.text(KOMReviewDetailToolbarBrowseButton, uLocalized('KOMReviewDetailToolbarBrowseButtonText'));
		});

		context('on discard', function () {
		
			it('localizes KOMReviewDetailDiscardPrompt', async function() {
				deepEqual((await browser.OLSKConfirm(async function () {
					browser.pressButton(KOMReviewDetailToolbarDiscardButton);
				})).question, uLocalized('KOMReviewDetailDiscardPromptText'));
			});
		
		});

		context('on rename', function () {
		
			it('localizes KOMReviewDetailToolbarRenameButtonPrompt', function() {
				deepEqual(browser.OLSKPromptSync(function () {
					return browser.pressButton(KOMReviewDetailToolbarRenameButton);
				}).question, uLocalized('KOMReviewDetailToolbarRenameButtonPromptText'));
			});
		
		});

	});

});
