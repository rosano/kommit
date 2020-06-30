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
				return browser.click('.LCHLauncherPipeItem');
			},
		]);
	},
};

describe('KOMReview_Sync', function () {	

	let _ThrottleCount = 0;
	const uThrottleCount = function (inputData) {
		if (inputData) {
			_ThrottleCount += 1;
		}

		return _ThrottleCount.toString();
	};

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			DebugHotfixThrottleCount: true,
		});
	});

	describe('OLSKChangeDelegateCreateDeck', function test_OLSKChangeDelegateCreateDeck () {

		before(function () {
			browser.assert.text('#TestCallReactThrottle', uThrottleCount());
		});

		before(function () {
			return kTesting.uLaunch('FakeOLSKChangeDelegateCreateDeck');
		});

		it('calls ReactThrottle', function () {
			browser.assert.text('#TestCallReactThrottle', uThrottleCount(true));
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
			browser.assert.text('#TestCallReactThrottle', uThrottleCount(true));
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
			browser.assert.text('#TestCallReactThrottle', uThrottleCount(true));
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
			browser.assert.text('#TestCallReactThrottle', uThrottleCount(true));
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
			browser.assert.text('#TestCallReactThrottle', uThrottleCount());
		});

	});

	describe('OLSKChangeDelegateUpdateCard', function test_OLSKChangeDelegateUpdateCard () {

		before(function () {
			return kTesting.uLaunch('FakeOLSKChangeDelegateUpdateCard');
		});

		it('calls ReactThrottle', function () {
			browser.assert.text('#TestCallReactThrottle', uThrottleCount(true));
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
			browser.assert.text('#TestCallReactThrottle', uThrottleCount(true));
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
			browser.assert.text('#TestCallReactThrottle', uThrottleCount(true));
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
			browser.assert.text('#TestCallReactThrottle', uThrottleCount(true));
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
				browser.assert.text('#TestCallReactThrottle', uThrottleCount(true));
			});

		});

		describe('OLSKChangeDelegateCreateCard', function () {

			before(function () {
				return kTesting.uLaunch('FakeOLSKChangeDelegateCreateCard');
			});

			it('calls ReactThrottle', function () {
				browser.assert.text('#TestCallReactThrottle', uThrottleCount(true));
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
				browser.assert.text('#TestCallReactThrottle', uThrottleCount(true));
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
				browser.assert.text('#TestCallReactThrottle', uThrottleCount(true));
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
				browser.assert.text('#TestCallReactThrottle', uThrottleCount(true));
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
				browser.assert.text('#TestCallReactThrottle', uThrottleCount(true));
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
			return browser.OLSKPrompt(function () {
				return browser.pressButton('.KOMReviewMasterCreateButton');
			}, function (dialog) {
				dialog.response = 'alfa';
				
				return dialog;
			});
		});

		before(function () {
			return kTesting.uLaunch('FakeOLSKChangeDelegateCreateDeck');
		});

		context('different_deck', function () {

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
					browser.assert.text('#TestCallReactThrottle', uThrottleCount(true));
				});

				before(function () {
					return kTesting.uLaunch('FakeOLSKChangeDelegateCreateCard');
				});

				it('calls ReactThrottle', function () {
					browser.assert.text('#TestCallReactThrottle', uThrottleCount(true));
				});

				it('calls ReactSelected', function () {
					browser.assert.text('#TestCallReactSelected', '4');
				});

				it('skips adds card', function () {
					browser.assert.elements('.KOMBrowseListItem', 0);
				});

			});

			describe('OLSKChangeDelegateUpdateCard', function () {

				before(function () {
					return kTesting.uLaunch('FakeOLSKChangeDelegateUpdateCard');
				});

				it('calls ReactThrottle', function () {
					browser.assert.text('#TestCallReactThrottle', uThrottleCount(true));
				});

				it('calls ReactSelected', function () {
					browser.assert.text('#TestCallReactSelected', '5');
				});

				it('does nothing', function () {
					browser.assert.elements('.KOMBrowseListItem', 0);
				});

			});

			describe('OLSKChangeDelegateDeleteCard', function () {

				before(function () {
					return kTesting.uLaunch('FakeOLSKChangeDelegateDeleteCard');
				});

				it('calls ReactThrottle', function () {
					browser.assert.text('#TestCallReactThrottle', uThrottleCount(true));
				});

				it('calls ReactSelected', function () {
					browser.assert.text('#TestCallReactSelected', '6');
				});

				it('does nothing', function () {
					browser.assert.elements('.KOMBrowseListItem', 0);
				});

			});
		
		});

	});

	context('same_deck', function () {
		
		before(function () {
			return browser.pressButton('.KOMBrowseListToolbarCloseButton');
		});

		before(function () {
			return browser.pressButton('.KOMReviewDetailToolbarBackButton');
		});

		before(function () {
			return kTesting.uLaunch('FakeOLSKChangeDelegateCreateDeck');
		});

		before(function () {
			return browser.click('.KOMReviewMasterListItemContainer:last-of-type .KOMReviewMasterListItem');
		});

		before(function () {
			return browser.click('.KOMReviewDetailToolbarCardsButton');
		});

		describe('OLSKChangeDelegateCreateCard', function () {

			before(function () {
				browser.assert.elements('.KOMBrowseListItem', 0);
			});

			before(function () {
				browser.assert.text('#TestCallReactThrottle', uThrottleCount(true));
			});

			before(function () {
				return kTesting.uLaunch('FakeOLSKChangeDelegateCreateCard');
			});

			it('calls ReactThrottle', function () {
				browser.assert.text('#TestCallReactThrottle', uThrottleCount(true));
			});

			it('calls ReactSelected', function () {
				browser.assert.text('#TestCallReactSelected', '7');
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
				browser.assert.text('#TestCallReactThrottle', uThrottleCount(true));
			});

			it('calls ReactSelected', function () {
				browser.assert.text('#TestCallReactSelected', '8');
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
				browser.assert.text('#TestCallReactThrottle', uThrottleCount(true));
			});

			it('calls ReactSelected', function () {
				browser.assert.text('#TestCallReactSelected', '9');
			});

			it('deletes card', function () {
				browser.assert.elements('.KOMBrowseListItem', 0);
			});

		});

		describe('OLSKChangeDelegateConflictCard', function () {

			before(function () {
				return browser.pressButton('.KOMBrowseListToolbarCreateButton');
			});

			before(function () {
				return browser.fill('.KOMBrowseInfoFormFrontTextField', 'FakeOLSKChangeDelegateConflictCard');
			});

			before(function () {
				return browser.pressButton('.KOMBrowseListToolbarCloseButton');
			});

			before(function () {
				return browser.pressButton('.KOMReviewDetailToolbarBackButton');
			});

			before(function () {
				return browser.click('.KOMReviewMasterListItemContainer:last-of-type .KOMReviewMasterListItem');
			});

			before(function () {
				return browser.click('.KOMReviewDetailToolbarCardsButton');
			});			

			before(function () {
				return browser.wait({ element: '.KOMBrowseListItem'});
			});

			before(function () {
				return kTesting.uLaunch('FakeOLSKChangeDelegateConflictCard');
			});

			it.skip('selects local', function () {
				browser.assert.text('.KOMBrowseListItem', 'FakeOLSKChangeDelegateConflictCard-local');
			});

		});

		describe('OLSKChangeDelegateDeleteDeck', function () {

			before(function () {
				return kTesting.uLaunch('FakeOLSKChangeDelegateDeleteDeck');
			});

			it('calls ReactThrottle', function () {
				browser.assert.text('#TestCallReactThrottle', uThrottleCount(true));
			});

			it('calls ReactSelected', function () {
				browser.assert.text('#TestCallReactSelected', '10');
			});

			it('deletes deck', function () {
				browser.assert.elements('.KOMBrowse', 0);
			});

		});	
	
	});

});
