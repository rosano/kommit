const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMReview_Sync', function () {

	let _ThrottleCount = 0;
	const uThrottleCount = function (inputData) {
		if (inputData) {
			_ThrottleCount += 1;
		}

		return _ThrottleCount.toString();
	};

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			DebugHotfixThrottleCount: true,
		});
	});

	describe('OLSKChangeDelegateCreateDeck', function test_OLSKChangeDelegateCreateDeck() {

		before(function () {
			return browser.OLSKLauncherRun('FakeOLSKChangeDelegateCreateDeck');
		});

		it('adds deck', function () {
			browser.assert.text('.KOMReviewMasterListItemName', 'FakeOLSKChangeDelegateCreateDeck');
		});

	});

	describe('OLSKChangeDelegateCreateCard', function test_OLSKChangeDelegateCreateCard() {

		before(function () {
			browser.assert.text('.KOMReviewMasterListItemUnseenValue', '0');
		});

		before(function () {
			return browser.OLSKLauncherRun('FakeOLSKChangeDelegateCreateCard');
		});

		it('sets KOMReviewMasterListItemUnseenValue', function () {
			browser.assert.text('.KOMReviewMasterListItemUnseenValue', '1');
		});

	});

	describe('OLSKChangeDelegateCreateSpacing', function test_OLSKChangeDelegateCreateSpacing() {

		before(function () {
			browser.assert.text('.KOMReviewMasterListItemReviewValue', '0');
		});

		before(function () {
			return browser.OLSKLauncherRun('FakeOLSKChangeDelegateCreateSpacing');
		});

		it('sets KOMReviewMasterListItemUnseenValue', function () {
			browser.assert.text('.KOMReviewMasterListItemUnseenValue', '0');
		});

		it('sets KOMReviewMasterListItemReviewValue', function () {
			browser.assert.text('.KOMReviewMasterListItemReviewValue', '1');
		});

	});

	describe('OLSKChangeDelegateUpdateSpacing', function test_OLSKChangeDelegateUpdateSpacing() {

		before(function () {
			return browser.OLSKLauncherRun('FakeOLSKChangeDelegateUpdateSpacing');
		});

		it('sets KOMReviewMasterListItemReviewValue', function () {
			browser.assert.text('.KOMReviewMasterListItemReviewValue', '0');
		});

		it('sets KOMReviewChartCompositionCollectionData', function () {
			browser.assert.text('.KOMReviewChartCompositionCollection .KOMReviewChartCompositionCollectionTotalCardsValue', '1');
		});

	});

	describe('OLSKChangeDelegateDeleteSpacing', function test_OLSKChangeDelegateDeleteSpacing() {

		before(function () {
			return browser.OLSKLauncherRun('FakeOLSKChangeDelegateDeleteSpacing');
		});

		it('does nothing', function () {
			browser.assert.text('.KOMReviewMasterListItemReviewValue', '0');
		});

	});

	describe('OLSKChangeDelegateUpdateCard', function test_OLSKChangeDelegateUpdateCard() {

		before(function () {
			browser.assert.text('.KOMReviewChartCompositionCollection .KOMReviewChartCompositionCollectionSuspendedCardsValue', '0');
		});

		before(function () {
			return browser.OLSKLauncherRun('FakeOLSKChangeDelegateUpdateCard');
		});

		it('sets KOMReviewChartCompositionCollectionData', function () {
			browser.assert.text('.KOMReviewChartCompositionCollection .KOMReviewChartCompositionCollectionSuspendedCardsValue', '1');
		});

	});

	describe('OLSKChangeDelegateDeleteCard', function test_OLSKChangeDelegateDeleteCard() {

		before(function () {
			return browser.OLSKLauncherRun('FakeOLSKChangeDelegateDeleteCard');
		});

		it('clears KOMReviewChartCompositionCollection', function () {
			browser.assert.elements('.KOMReviewChartCompositionCollection', 0);
		});

	});

	describe('OLSKChangeDelegateUpdateDeck', function test_OLSKChangeDelegateUpdateDeck() {

		before(function () {
			return browser.OLSKLauncherRun('FakeOLSKChangeDelegateUpdateDeck');
		});

		it('updates deck', function () {
			browser.assert.text('.KOMReviewMasterListItemName', 'FakeOLSKChangeDelegateUpdateDeck');
		});

	});

	describe('OLSKChangeDelegateDeleteDeck', function test_OLSKChangeDelegateDeleteDeck() {

		before(function () {
			return browser.OLSKLauncherRun('FakeOLSKChangeDelegateDeleteDeck');
		});

		it('deletes deck', function () {
			browser.assert.elements('.KOMReviewMasterListItem', 0);
		});

	});

	context('unordered', function test_unordered() {

		before(function () {
			return browser.OLSKLauncherRun('FakeOLSKChangeDelegateCreateSpacing');
		});

		before(function () {
			return browser.OLSKLauncherRun('FakeOLSKChangeDelegateCreateCard');
		});

		before(function () {
			return browser.OLSKLauncherRun('FakeOLSKChangeDelegateCreateDeck');
		});

		it('adds deck', function () {
			browser.assert.text('.KOMReviewMasterListItemName', 'FakeOLSKChangeDelegateCreateDeck');
		});

		it('sets KOMReviewMasterListItemUnseenValue', function () {
			browser.assert.text('.KOMReviewMasterListItemUnseenValue', '0');
		});

		it.skip('sets KOMReviewMasterListItemReviewValue', function () {
			browser.assert.text('.KOMReviewMasterListItemReviewValue', '1');
		});

	});

	context('KOMReviewDetail', function test_KOMReviewDetail() {

		before(function () {
			return browser.pressButton('.KOMReviewMasterListItem');
		});

		describe('OLSKChangeDelegateUpdateDeck', function () {

			before(function () {
				return browser.OLSKLauncherRun('FakeOLSKChangeDelegateUpdateDeck');
			});

			it('updates deck', function () {
				browser.assert.text('.KOMReviewDetailToolbarTitle', 'FakeOLSKChangeDelegateUpdateDeck');
			});

		});

		describe('OLSKChangeDelegateDeleteCard', function () {

			before(function () {
				// browser.assert.elements('.KOMReviewDetailNoCards', 0);
			});

			before(function () {
				return browser.OLSKLauncherRun('FakeOLSKChangeDelegateDeleteCard');
			});

			it('deletes card', function () {
				browser.assert.elements('.KOMReviewDetailNoCards', 1);
			});

		});

		describe('OLSKChangeDelegateDeleteDeck', function () {

			before(function () {
				return browser.OLSKLauncherRun('FakeOLSKChangeDelegateDeleteDeck');
			});

			it('deletes deck', function () {
				browser.assert.elements('.KOMReviewDetail', 0);
			});

		});

	});

	context('KOMBrowse', function test_KOMBrowse() {

		before(function () {
			return browser.OLSKPrompt(function () {
				return browser.pressButton('.KOMReviewMasterCreateButton');
			}, function (dialog) {
				dialog.response = 'alfa';

				return dialog;
			});
		});

		before(function () {
			return browser.OLSKLauncherRun('FakeOLSKChangeDelegateCreateDeck');
		});

		context('different_deck', function () {

			before(function () {
				return browser.pressButton('.KOMReviewMasterListItem');
			});

			before(function () {
				return browser.click('.KOMReviewDetailToolbarCardsButton');
			});

			describe('OLSKChangeDelegateCreateCard', function () {

				before(function () {
					browser.assert.elements('.KOMBrowseListItem', 0);
				});

				before(function () {
					return browser.OLSKLauncherRun('FakeOLSKChangeDelegateCreateCard');
				});

				it('does nothing', function () {
					browser.assert.elements('.KOMBrowseListItem', 0);
				});

			});

			describe('OLSKChangeDelegateUpdateCard', function () {

				before(function () {
					return browser.OLSKLauncherRun('FakeOLSKChangeDelegateUpdateCard');
				});

				it('does nothing', function () {
					browser.assert.elements('.KOMBrowseListItem', 0);
				});

			});

			describe('OLSKChangeDelegateDeleteCard', function () {

				before(function () {
					return browser.OLSKLauncherRun('FakeOLSKChangeDelegateDeleteCard');
				});

				it('does nothing', function () {
					browser.assert.elements('.KOMBrowseListItem', 0);
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
				return browser.pressButton('.KOMReviewMasterListItem:nth-child(2)');
			});

			before(function () {
				return browser.click('.KOMReviewDetailToolbarCardsButton');
			});

			describe('OLSKChangeDelegateCreateCard', function () {

				before(function () {
					browser.assert.elements('.KOMBrowseListItem', 0);
				});

				before(function () {
					return browser.OLSKLauncherRun('FakeOLSKChangeDelegateCreateCard');
				});

				it('adds card', function () {
					browser.assert.text('.KOMBrowseListItem', 'FakeOLSKChangeDelegateCreateCard');
				});

			});

			describe('OLSKChangeDelegateUpdateCard', function () {

				before(function () {
					return browser.OLSKLauncherRun('FakeOLSKChangeDelegateUpdateCard');
				});

				it('updates card', function () {
					browser.assert.text('.KOMBrowseListItem', '[suspended] FakeOLSKChangeDelegateUpdateCard');
				});

			});

			describe('OLSKChangeDelegateDeleteCard', function () {

				before(function () {
					return browser.OLSKLauncherRun('FakeOLSKChangeDelegateDeleteCard');
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
					return browser.OLSKLauncherRun('FakeOLSKChangeDelegateConflictCard');
				});

				it('updates local', function () {
					browser.assert.text('.KOMBrowseListItem', 'FakeOLSKChangeDelegateConflictCard-local');
				});

			});

			describe('OLSKChangeDelegateDeleteDeck', function () {

				before(function () {
					return browser.OLSKLauncherRun('FakeOLSKChangeDelegateDeleteDeck');
				});

				it('deletes deck', function () {
					browser.assert.elements('.KOMBrowse', 0);
				});

			});

		});

	});

});
