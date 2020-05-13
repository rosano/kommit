const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const kTesting = {
	uSerial (inputData) {
		return inputData.reduce(function (coll, e) {
			return coll.then(e);
		}, Promise.resolve());
	},
	uLaunch (inputData) {
		return kTesting.uSerial([
			function () {
				return browser.pressButton('.OLSKAppToolbarLauncherButton');
			},
			function () {
				return browser.fill('.LCHLauncherFilterInput', inputData);
			},
			function () {
				return browser.click('.LCHLauncherResultListItem');
			},
			]);
	},
};

describe('KOMReview_Sync', function () {	

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	describe('OLSKChangeDelegateCreateDeck', function test_OLSKChangeDelegateCreateDeck () {

		before(function () {
			return kTesting.uLaunch('FakeOLSKChangeDelegateCreateDeck');
		});

		it('adds deck', function () {
			browser.assert.text('.KOMReviewMasterListItemName', 'FakeOLSKChangeDelegateCreateDeck');
		});

	});

	describe('OLSKChangeDelegateCreateCard', function test_OLSKChangeDelegateCreateCard () {

		before(function () {
			browser.assert.text('#TestCallReactCounts', '0');
		});

		before(function () {
			browser.assert.text('#TestCardCount', '0');
		});

		before(function () {
			browser.assert.text('#TestSpacingCount', '0');
		});

		before(function () {
			browser.assert.text('.KOMReviewMasterListItemUnseenValue', '0');
		});

		before(function () {
			return kTesting.uLaunch('FakeOLSKChangeDelegateCreateCard');
		});

		it('adds card object', function () {
			browser.assert.text('#TestCardCount', '1');
		});

		it('adds spacing objects', function () {
			browser.assert.text('#TestSpacingCount', '2');
		});

		it('calls UpdateCountThrottle', function () {
			browser.assert.text('#TestCallReactCounts', '1');
		});

		it('sets KOMReviewMasterListItemUnseenValue', function () {
			browser.assert.text('.KOMReviewMasterListItemUnseenValue', '1');
		});

	});

	describe('OLSKChangeDelegateCreateSpacing', function test_OLSKChangeDelegateCreateSpacing () {

		before(function () {
			return kTesting.uLaunch('FakeOLSKChangeDelegateCreateSpacing');
		});

		it('updates spacing object', function () {
			browser.assert.text('#TestSpacingCount', '2');
		});

		it('calls UpdateCountThrottle', function () {
			browser.assert.text('#TestCallReactCounts', '2');
		});

		it('sets KOMReviewMasterListItemUnseenValue', function () {
			browser.assert.text('.KOMReviewMasterListItemUnseenValue', '1');
		});

	});

	describe('OLSKChangeDelegateUpdateSpacing', function test_OLSKChangeDelegateUpdateSpacing () {

		before(function () {
			browser.assert.text('.KOMReviewMasterListItemUnseenValue', '1');
		});

		before(function () {
			browser.assert.text('.KOMReviewMasterListItemReviewValue', '0');
		});

		before(function () {
			return kTesting.uLaunch('FakeOLSKChangeDelegateUpdateSpacing');
		});

		it('updates spacing object', function () {
			browser.assert.text('#TestSpacingCount', '2');
		});

		it('calls UpdateCountThrottle', function () {
			browser.assert.text('#TestCallReactCounts', '3');
		});

		it('sets KOMReviewMasterListItemUnseenValue', function () {
			browser.assert.text('.KOMReviewMasterListItemUnseenValue', '0');
		});

		it('sets KOMReviewMasterListItemReviewValue', function () {
			browser.assert.text('.KOMReviewMasterListItemReviewValue', '1');
		});

	});

	describe('OLSKChangeDelegateDeleteSpacing', function test_OLSKChangeDelegateDeleteSpacing () {

		before(function () {
			return kTesting.uLaunch('FakeOLSKChangeDelegateDeleteSpacing');
		});

		it('does nothing', function () {
			browser.assert.text('#TestCallReactCounts', '3');
		});

	});

	describe('OLSKChangeDelegateUpdateCard', function test_OLSKChangeDelegateUpdateCard () {

		before(function () {
			return kTesting.uLaunch('FakeOLSKChangeDelegateUpdateCard');
		});

		it('does nothing', function () {
			browser.assert.text('#TestCallReactCounts', '3');
		});

	});

	describe('OLSKChangeDelegateDeleteCard', function test_OLSKChangeDelegateDeleteCard () {

		before(function () {
			browser.assert.text('.KOMReviewMasterListItemUnseenValue', '0');
		});

		before(function () {
			browser.assert.text('.KOMReviewMasterListItemReviewValue', '1');
		});

		before(function () {
			return kTesting.uLaunch('FakeOLSKChangeDelegateDeleteCard');
		});

		it('updates spacing objects', function () {
			browser.assert.text('#TestSpacingCount', '0');
		});

		it('calls UpdateCountThrottle', function () {
			browser.assert.text('#TestCallReactCounts', '4');
		});

		it('sets KOMReviewMasterListItemUnseenValue', function () {
			browser.assert.text('.KOMReviewMasterListItemUnseenValue', '0');
		});

		it('sets KOMReviewMasterListItemReviewValue', function () {
			browser.assert.text('.KOMReviewMasterListItemReviewValue', '0');
		});

	});

	describe('OLSKChangeDelegateUpdateDeck', function test_OLSKChangeDelegateUpdateDeck () {

		before(function () {
			return kTesting.uLaunch('FakeOLSKChangeDelegateUpdateDeck');
		});

		it('updates deck', function () {
			browser.assert.text('.KOMReviewMasterListItemName', 'FakeOLSKChangeDelegateUpdateDeck');
		});

	});

	describe('OLSKChangeDelegateDeleteDeck', function test_OLSKChangeDelegateDeleteDeck () {

		before(function () {
			return kTesting.uLaunch('FakeOLSKChangeDelegateDeleteDeck');
		});

		it('deletes deck deck', function () {
			browser.assert.elements('.KOMReviewMasterListItem', 0);
		});

	});

});