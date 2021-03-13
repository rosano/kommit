const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMReview_Retire', function () {

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
			return browser.pressButton('.KOMBrowseCreateButton');
		});

		before(function () {
			browser.fill('.KOMBrowseInfoFormFrontTextField', 'alfa');
		});

		before(function () {
			return browser.pressButton('.KOMBrowseCreateButton');
		});

		before(function () {
			browser.fill('.KOMBrowseInfoFormFrontTextField', 'bravo');
		});

		before(function () {
			return browser.OLSKLauncherRun('KOMBrowseInfoLauncherItemToggleRetire');
		});

		before(function () {
			return browser.pressButton('.KOMBrowseCloseButton');
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
				return browser.pressButton('.KOMReviewDetailPlayButton');
			});

			it('excludes from play', function () {
				browser.assert.text('#TestKOMPlayStateQueueCount', '1');
			});
		
		});

		context('KOMDeckRetireCardsMonths', function () {

			before(function () {
				return browser.pressButton('.KOMPlayFlipButton');
			});

			before(function () {
				return browser.pressButton('.KOMPlayResponseButtonEasy');
			});

			before(function () {
				return browser.pressButton('.KOMPlayFlipButton');
			});

			before(function () {
				return browser.pressButton('.KOMPlayResponseButtonEasy');
			});

			before(function () {
				return browser.pressButton('.KOMReviewDetailToolbarCardsButton');
			});

			before(function () {
				return browser.pressButton('.KOMBrowseCreateButton');
			});

			before(function () {
				browser.fill('.KOMBrowseInfoFormFrontTextField', 'charlie');
			});

			before(function () {
				return browser.OLSKLauncherRun('FakeRetireInterval');
			});

			before(function () {
				return browser.pressButton('.KOMBrowseCloseButton');
			});

			before(function () {
				browser.assert.text('.KOMReviewChartCompositionCollectionRetiredCardsValue', '1');
			});

			before(function () {
				return browser.select('.KOMReviewDetailFormRetireCardsField', '1');
			});

			before(function () {
				return browser.pressButton('.KOMReviewDetailPlayButton');
			});

			before(function () {
				return browser.pressButton('.KOMPlayFlipButton');
			});

			before(function () {
				return browser.pressButton('.KOMPlayResponseButtonHard');
			});

			before(function () {
				return browser.pressButton('.KOMPlayFlipButton');
			});

			before(function () {
				return browser.pressButton('.KOMPlayResponseButtonHard');
			});

			it('retires card', function () {
				browser.assert.text('.KOMReviewChartCompositionCollectionRetiredCardsValue', '2');
			});									
		
		});
	
	});

});
