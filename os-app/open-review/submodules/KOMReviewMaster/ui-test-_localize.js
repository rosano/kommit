import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	describe(`KOMReviewMaster_Localize-${ languageCode }`, function () {

		before(function() {
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

		context('KOMReviewMasterCreateButton', function() {

			it('localizes KOMReviewMasterCreateButtonPrompt', function() {
				deepEqual(browser.OLSKPromptSync(function () {
					return browser.pressButton(KOMReviewMasterCreateButton);
				}).question, uLocalized('KOMReviewMasterCreateButtonPromptText'));
			});
		
		});

		context('KOMReviewMasterListItems', function() {
			
			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					OLSKRoutingLanguage: languageCode,
					KOMReviewMasterListItems: JSON.stringify([{
						KOMDeckName: 'alfa',
					}]),
				});
			});

			it('localizes KOMReviewMasterListItemUnseenLabel', function () {
				browser.assert.text(KOMReviewMasterListItemUnseenLabel, uLocalized('KOMReviewMasterListItemUnseenLabelText'));
			});

		});

	});

});
