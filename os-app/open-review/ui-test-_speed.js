const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const cardCount = 100;
const responseShort = 300;
const responseLong = 1000;

const uTime = function (param1, param2) {
	return [Date.now() - param1].filter(function (e) {
		return e > param2;
	}).pop();
};

describe('KOMReview_Speed', function () {

	const data = {};

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

	context('TestSpeedPopulate', function () {

		before(function () {
			data.TestSpeedPopulate = new Date();
		});

		before(function () {
			return browser.OLSKLauncherRun('KOMReviewLauncherItemDebug_TestSpeedPopulate');
		});
		
		it('responds quickly', function () {
			browser.assert.deepEqual(uTime(data.TestSpeedPopulate, responseLong), undefined);
		});
	
	});

	context('TestSpeedStartup', function () {

		before(function () {
			data.TestSpeedStartup = new Date();
		});

		before(function () {
			return browser.OLSKLauncherRun('KOMReviewLauncherItemDebug_TestSpeedStartup');
		});
		
		it('responds quickly', function () {
			browser.assert.deepEqual(uTime(data.TestSpeedStartup, responseLong), undefined);
		});

		it('sets KOMReviewMasterListItemUnseenValue', function () {
			browser.assert.text('.KOMReviewMasterListItemReviewValue', cardCount);
		});

		it('sets KOMReviewChartCompositionCollectionTotalCardsValue', function () {
			browser.assert.text('.KOMReviewChartCompositionCollectionTotalCardsValue', cardCount);
		});
	
	});

	context('TestSpeedLoadDeck', function () {

		before(function () {
			data.TestSpeedLoadDeck = new Date();
		});

		before(function () {
			return browser.pressButton('.KOMReviewMasterListItem');
		});
		
		it('responds quickly', function () {
			browser.assert.deepEqual(uTime(data.TestSpeedLoadDeck, responseShort), undefined);
		});

		it('loads data', function () {
			browser.assert.elements('.KOMReviewDetailPlayButtonSingle', '1');
		});
	
	});

	context('TestSpeedLoadBrowse', function () {

		before(function () {
			data.TestSpeedLoadBrowse = new Date();
		});

		before(function () {
			return browser.pressButton('.KOMReviewDetailToolbarCardsButton');
		});
		
		it('responds quickly', function () {
			browser.assert.deepEqual(uTime(data.TestSpeedLoadBrowse, responseShort), undefined);
		});

		it('loads data', function () {
			browser.assert.elements('.KOMBrowseListItem', cardCount);
		});
	
	});

	context('TestSpeedBrowseDone', function () {

		before(function () {
			return browser.pressButton('.KOMBrowseListToolbarCreateButton');
		});

		before(function () {
			browser.fill('.KOMBrowseInfoFormFrontTextField', 'bravo');
		});

		before(function () {
			data.TestSpeedBrowseDone = new Date();
		});

		before(function () {
			return browser.pressButton('.KOMBrowseListToolbarCloseButton');
		});

		it('responds quickly', function () {
			browser.assert.deepEqual(uTime(data.TestSpeedLoadCreate, responseShort), undefined);
		});

		it('sets KOMReviewChartCompositionCollectionTotalCardsValue', function () {
			browser.assert.text('.KOMReviewChartCompositionCollectionTotalCardsValue', cardCount);
		});
	
	});

	context('TestSpeedLoadPlay', function () {

		before(function () {
			return browser.pressButton('.KOMBrowseListToolbarCloseButton');
		});

		before(function () {
			data.TestSpeedLoadPlay = new Date();
		});

		before(function () {
			return browser.pressButton('.KOMReviewDetailPlayButtonSingle');
		});

		it('responds quickly', function () {
			browser.assert.deepEqual(uTime(data.TestSpeedLoadPlay, responseShort), undefined);
		});

		it('loads data', function () {
			browser.assert.text('#TestKOMPlayStateQueueCount', cardCount * 2 - 1);
		});
	
	});

	context('TestSpeedUpdateDeck', function () {

		before(function () {
			return browser.pressButton('.KOMPlayFlipButton');
		});

		before(function () {
			return browser.pressButton('.KOMPlayResponseButtonEasy');
		});

		before(function () {
			data.TestSpeedUpdateDeck = new Date();
		});

		before(function () {
			return browser.pressButton('.KOMPlayToolbarDoneButton');
		});

		it('responds quickly', function () {
			browser.assert.deepEqual(uTime(data.TestSpeedUpdateDeck, responseShort), undefined);
		});

		it('sets KOMReviewTodayTotalCardsValue', function () {
			browser.assert.text('.KOMReviewTodayTotalCardsValue', '1');
		});

		it('sets KOMReviewChartCompositionCollectionTotalCardsValue', function () {
			browser.assert.text('.KOMReviewChartCompositionCollectionTotalCardsValue', cardCount);
		});
	
	});

});
