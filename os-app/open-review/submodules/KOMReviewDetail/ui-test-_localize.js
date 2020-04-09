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

		context('on discard', function () {
		
			it('localizes KOMReviewDetailDiscardPrompt', async function() {
				deepEqual((await browser.OLSKConfirm(async function () {
					browser.pressButton(KOMReviewDetailToolbarDiscardButton);
				})).question, uLocalized('KOMReviewDetailDiscardPromptText'));
			});
		
		});

	});

});
