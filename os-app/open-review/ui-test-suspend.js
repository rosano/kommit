const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMReview_Suspend', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute);
	});

	before(function () {
		return browser.OLSKPrompt(function () {
			return browser.pressButton('.KOMReviewMasterCreateButton');
		}, function (dialog) {
			dialog.response = 'alfa';

			return dialog;
		});
	});

	it('shows KOMReviewMasterListItem', function () { // #hotfix-invisible-until-assert
		browser.assert.elements('.KOMReviewMasterListItem', 1);
	});

	context('toggle_on', function () {
		
		before(function () {
			return browser.pressButton('.KOMReviewMasterListItem');
		});

		before(function () {
			return browser.pressButton('.KOMReviewDetailToolbarCardsButton');
		});

		before(function () {
			return browser.pressButton('.KOMBrowseListToolbarCreateButton');
		});

		before(function () {
			browser.fill('.KOMBrowseInfoFormFrontTextField', 'alfa');
		});

		before(function () {
			return browser.pressButton('.KOMBrowseListToolbarCreateButton');
		});

		before(function () {
			browser.fill('.KOMBrowseInfoFormFrontTextField', 'bravo');
		});

		before(function () {
			return browser.OLSKLauncherRun('KOMBrowseInfoLauncherItemToggleSuspend');
		});

		before(function () {
			return browser.pressButton('.KOMBrowseListToolbarCloseButton');
		});

		before(function () {
			return browser.pressButton('.KOMReviewDetailToolbarBackButton');
		});

		it('excludes from today count', function () {
			browser.assert.text('.KOMReviewMasterListItemUnseenValue', '1');
		});		

		context('KOMPlay', function () {
			
			before(function () {
				return browser.pressButton('.KOMReviewMasterListItem');
			});

			before(function () {
				return browser.pressButton('.KOMReviewDetailPlayButtonSingle');
			});

			it('excludes from play', function () {
				browser.assert.text('#TestKOMPlayStateQueueCount', '1');
			});
		
		});
	
	});

});
