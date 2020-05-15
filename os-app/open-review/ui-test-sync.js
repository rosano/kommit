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
			browser.assert.text('#TestCallReactThrottle', '0');
		});

		before(function () {
			return kTesting.uLaunch('FakeOLSKChangeDelegateCreateDeck');
		});

		it('calls ReactThrottle', function () {
			browser.assert.text('#TestCallReactThrottle', '1');
		});

		it('adds deck', function () {
			browser.assert.text('.KOMReviewMasterListItemName', 'FakeOLSKChangeDelegateCreateDeck');
		});

	});

	describe('OLSKChangeDelegateCreateCard', function test_OLSKChangeDelegateCreateCard () {

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

		it('calls ReactThrottle', function () {
			browser.assert.text('#TestCallReactThrottle', '2');
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

		it('calls ReactThrottle', function () {
			browser.assert.text('#TestCallReactThrottle', '3');
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

		it('calls ReactThrottle', function () {
			browser.assert.text('#TestCallReactThrottle', '4');
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

		it('skips react', function () {
			browser.assert.text('#TestCallReactThrottle', '4');
		});

	});

	describe('OLSKChangeDelegateUpdateCard', function test_OLSKChangeDelegateUpdateCard () {

		before(function () {
			return kTesting.uLaunch('FakeOLSKChangeDelegateUpdateCard');
		});

		it('calls ReactThrottle', function () {
			browser.assert.text('#TestCallReactThrottle', '5');
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

		it('calls ReactThrottle', function () {
			browser.assert.text('#TestCallReactThrottle', '6');
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

		it('calls ReactThrottle', function () {
			browser.assert.text('#TestCallReactThrottle', '7');
		});

		it('updates deck', function () {
			browser.assert.text('.KOMReviewMasterListItemName', 'FakeOLSKChangeDelegateUpdateDeck');
		});

	});

	describe('OLSKChangeDelegateDeleteDeck', function test_OLSKChangeDelegateDeleteDeck () {

		before(function () {
			return kTesting.uLaunch('FakeOLSKChangeDelegateDeleteDeck');
		});

		it('calls ReactThrottle', function () {
			browser.assert.text('#TestCallReactThrottle', '8');
		});

		it('deletes deck', function () {
			browser.assert.elements('.KOMReviewMasterListItem', 0);
		});

	});

	context('asynchronous', function test_asynchronous () {

		describe('OLSKChangeDelegateCreateSpacing', function () {

			before(function () {
				return kTesting.uLaunch('FakeOLSKChangeDelegateCreateSpacing');
			});

			it('calls ReactThrottle', function () {
				browser.assert.text('#TestCallReactThrottle', '9');
			});

		});

		describe('OLSKChangeDelegateCreateCard', function () {

			before(function () {
				return kTesting.uLaunch('FakeOLSKChangeDelegateCreateCard');
			});

			it('calls ReactThrottle', function () {
				browser.assert.text('#TestCallReactThrottle', '10');
			});

		});
		
		describe('OLSKChangeDelegateCreateDeck', function () {

			before(function () {
				browser.assert.text('#TestCardCount', '0');
			});

			before(function () {
				browser.assert.text('#TestSpacingCount', '0');
			});

			before(function () {
				return kTesting.uLaunch('FakeOLSKChangeDelegateCreateDeck');
			});

			it('adds card object', function () {
				browser.assert.text('#TestCardCount', '1');
			});

			it('adds spacing objects', function () {
				browser.assert.text('#TestSpacingCount', '2');
			});

			it('calls ReactThrottle', function () {
				browser.assert.text('#TestCallReactThrottle', '11');
			});

		});
	
	});

	context('KOMReviewDetail', function test_KOMReviewDetail () {

		before(function () {
			return browser.click('.KOMReviewMasterListItem');
		});

		describe('OLSKChangeDelegateUpdateDeck', function () {

			before(function () {
				browser.assert.text('#TestCallReactSelected', '0');
			});

			before(function () {
				return kTesting.uLaunch('FakeOLSKChangeDelegateUpdateDeck');
			});

			it('calls ReactThrottle', function () {
				browser.assert.text('#TestCallReactThrottle', '12');
			});

			it('calls ReactSelected', function () {
				browser.assert.text('#TestCallReactSelected', '1');
			});

			it('updates deck', function () {
				browser.assert.text('.KOMReviewDetailToolbarTitle', 'FakeOLSKChangeDelegateUpdateDeck');
			});

		});

		describe('OLSKChangeDelegateDeleteCard', function () {

			before(function () {
				browser.assert.elements('.KOMReviewDetailNoCards', '0');
			});

			before(function () {
				return kTesting.uLaunch('FakeOLSKChangeDelegateDeleteCard');
			});

			it('calls ReactThrottle', function () {
				browser.assert.text('#TestCallReactThrottle', '13');
			});

			it('calls ReactSelected', function () {
				browser.assert.text('#TestCallReactSelected', '2');
			});

			it('deletes card', function () {
				browser.assert.elements('.KOMReviewDetailNoCards', '0');
			});

		});

		describe('OLSKChangeDelegateDeleteDeck', function () {

			before(function () {
				return kTesting.uLaunch('FakeOLSKChangeDelegateDeleteDeck');
			});

			it('calls ReactThrottle', function () {
				browser.assert.text('#TestCallReactThrottle', '14');
			});

			it('calls ReactSelected', function () {
				browser.assert.text('#TestCallReactSelected', '3');
			});

			it('deletes deck', function () {
				browser.assert.elements('.KOMReviewDetail', 0);
			});

		});

	});

	context('KOMBrowse', function test_KOMBrowse () {

		before(function () {
			return kTesting.uLaunch('FakeOLSKChangeDelegateCreateDeck');
		});

		before(function () {
			return browser.click('.KOMReviewMasterListItem');
		});

		before(function () {
			return browser.click('.KOMReviewDetailToolbarCardsButton');
		});

		describe('OLSKChangeDelegateCreateCard', function () {

			before(function () {
				browser.assert.elements('.KOMBrowseListItem', 0);
			});

			before(function () {
				browser.assert.text('#TestCallReactThrottle', '15');
			});

			before(function () {
				return kTesting.uLaunch('FakeOLSKChangeDelegateCreateCard');
			});

			it('calls ReactThrottle', function () {
				browser.assert.text('#TestCallReactThrottle', '16');
			});

			it('calls ReactSelected', function () {
				browser.assert.text('#TestCallReactSelected', '4');
			});

			it('adds card', function () {
				browser.assert.text('.KOMBrowseListItem', 'FakeOLSKChangeDelegateCreateCard');
			});

		});

		describe('OLSKChangeDelegateUpdateCard', function () {

			before(function () {
				return kTesting.uLaunch('FakeOLSKChangeDelegateUpdateCard');
			});

			it('calls ReactThrottle', function () {
				browser.assert.text('#TestCallReactThrottle', '17');
			});

			it('calls ReactSelected', function () {
				browser.assert.text('#TestCallReactSelected', '5');
			});

			it('updates card', function () {
				browser.assert.text('.KOMBrowseListItem', 'FakeOLSKChangeDelegateUpdateCard');
			});

		});

		describe('OLSKChangeDelegateDeleteCard', function () {

			before(function () {
				return kTesting.uLaunch('FakeOLSKChangeDelegateDeleteCard');
			});

			it('calls ReactThrottle', function () {
				browser.assert.text('#TestCallReactThrottle', '18');
			});

			it('calls ReactSelected', function () {
				browser.assert.text('#TestCallReactSelected', '6');
			});

			it('deletes card', function () {
				browser.assert.elements('.KOMBrowseListItem', 0);
			});

		});

		describe('OLSKChangeDelegateDeleteDeck', function () {

			before(function () {
				return kTesting.uLaunch('FakeOLSKChangeDelegateDeleteDeck');
			});

			it('calls ReactThrottle', function () {
				browser.assert.text('#TestCallReactThrottle', '19');
			});

			it('calls ReactSelected', function () {
				browser.assert.text('#TestCallReactSelected', '7');
			});

			it('deletes deck', function () {
				browser.assert.elements('.KOMReviewBrowse', 0);
			});

		});	

	});

});