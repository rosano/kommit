const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMReview_SimplifiedResponse', function () {

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
			return browser.pressButton('.KOMBrowseListToolbarCloseButton');
		});

		before(function () {
			return browser.pressButton('.KOMReviewDetailPlayButton');
		});

		before(function () {
			return browser.pressButton('.KOMPlayFlipButton');
		});

		it('shows KOMPlayResponseButtonAgain', function () {
			browser.assert.elements('.KOMPlayResponseButtonAgain', 1);
		});

		context('KOMReviewLauncherItemToggleSimplifiedResponse', function () {

			before(function () {
				return browser.pressButton('.KOMPlayToolbarDoneButton');
			});

			before(function () {
				return browser.OLSKLauncherRun('KOMReviewLauncherItemToggleSimplifiedResponse');
			});

			before(function () {
				return browser.pressButton('.KOMReviewDetailPlayButton');
			});

			before(function () {
				return browser.pressButton('.KOMPlayFlipButton');
			});

			it('hides KOMPlayResponseButtonAgain', function () {
				browser.assert.elements('.KOMPlayResponseButtonAgain', 0);
			});
		
		});
	
	});

});
