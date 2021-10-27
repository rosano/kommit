const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const responseShort = 400;
const responseLong = 1000;

const uTime = function (param1, param2) {
	return [Date.now() - param1].filter(function (e) {
		return e > param2;
	}).pop();
};

let _count = 100;
const uCount = function (inputData = 0) {
	return _count += inputData;
};

describe('KOMReview_Speed', function () {

	if (process.env.OLSK_SPEC_CI) {
		return;
	}

	const data = {};

	before(function () {
		return browser.OLSKVisit(kDefaultRoute);
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

		it('sets KOMReviewMasterListItemReviewValue', function () {
			browser.assert.text('.KOMReviewMasterListItemReviewValue', uCount());
		});

		it('sets KOMReviewChartCompositionCollectionTotalCardsValue', function () {
			browser.assert.text('.KOMReviewChartCompositionCollectionTotalCardsValue', uCount());
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
			browser.assert.elements('.KOMReviewDetailPlayButton', '1');
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
			browser.assert.elements('.KOMBrowseListItem', uCount());
		});
	
	});

	context('TestSpeedBrowseClose', function () {

		before(function () {
			return browser.pressButton('.KOMBrowseCreateButton');
		});

		before(function () {
			browser.fill('.KOMBrowseInfoFormFrontTextField', 'bravo');
		});

		before(function () {
			data.TestSpeedBrowseClose = new Date();
		});

		before(function () {
			return browser.pressButton('.KOMBrowseCloseButton');
		});

		it('responds quickly', function () {
			browser.assert.deepEqual(uTime(data.TestSpeedBrowseClose, responseShort), undefined);
		});

		it('sets KOMReviewChartCompositionCollectionTotalCardsValue', function () {
			browser.assert.text('.KOMReviewChartCompositionCollectionTotalCardsValue', uCount(1));
		});
	
	});

	context('TestSpeedLoadPlay', function () {

		before(function () {
			data.TestSpeedLoadPlay = new Date();
		});

		before(function () {
			return browser.pressButton('.KOMReviewDetailPlayButton');
		});

		it('responds quickly', function () {
			browser.assert.deepEqual(uTime(data.TestSpeedLoadPlay, responseShort), undefined);
		});

		it('loads data', function () {
			browser.assert.text('#TestKOMPlayStateQueueCount', uCount() * 2 - 1);
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
			browser.assert.text('.KOMReviewChartCompositionCollectionTotalCardsValue', uCount());
		});
	
	});

});
