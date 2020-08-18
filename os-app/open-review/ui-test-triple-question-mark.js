const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMReview_TripleQuestionMark', function () {

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

	it('shows KOMReviewMasterListItem', function () {
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
			browser.fill('.KOMBrowseInfoFormFrontTextField', '???');
		});

		before(function () {
			return browser.pressButton('.KOMBrowseListToolbarCreateButton');
		});

		before(function () {
			browser.fill('.KOMBrowseInfoFormRearTextField', '???');
		});

		before(function () {
			return browser.pressButton('.KOMBrowseListToolbarCloseButton');
		});

		before(function () {
			return browser.pressButton('.KOMReviewDetailToolbarBackButton');
		});

		before(function () {
			browser.assert.text('#TestSpacingCount', '6');
		});

		before(function () {
			return browser.OLSKLauncherRun('KOMReviewLauncherItemToggleExcludeTripleQuestionMark');
		});

		it('excludes triple question mark', function () {
			browser.assert.text('#TestSpacingCount', '2');
		});
	
	});

	context('toggle_off', function () {
		
		before(function () {
			return browser.OLSKLauncherRun('KOMReviewLauncherItemToggleExcludeTripleQuestionMark');
		});

		it('includes triple question mark', function () {
			browser.assert.text('#TestSpacingCount', '6');
		});
	
	});

});
