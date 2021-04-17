const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMReview_Fund', function () {

	require('OLSKFund/ui-test_template').default({
		
		kDefaultRoute,

		ParamProject: 'RP_004',
		
		ParamTriggerGate () {
			return browser.pressButton('.KOMBrowseCreateButton');
		},

		async ParamBeforeCreate () {
			await browser.OLSKPrompt(function () {
				return browser.pressButton('.KOMReviewMasterCreateButton');
			}, function (dialog) {
				return Object.assign(dialog, {
					response: 'alfa',
				});
			});

			await browser.wait({ element: '.KOMReviewMasterListItem' });

			await browser.pressButton('.KOMReviewMasterListItem');

			await browser.pressButton('.KOMReviewDetailToolbarCardsButton');
		},

		ParamCreateDocument () {
			return browser.pressButton('.KOMBrowseCreateButton');
		},

		ParamDeleteDocument () {
			return browser.pressButton('.KOMBrowseInfoToolbarDiscardButton');
		},

		ParamCreateDocumentSync () {
			return browser.OLSKLauncherRun('FakeSyncCreateCard');
		},

	});
	
});
