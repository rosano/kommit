const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe.skip('KOMReview_Sync', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute);
	});

	describe('ZDRSchemaDispatchSyncCreateDeck', function test_ZDRSchemaDispatchSyncCreateDeck() {

		before(function () {
			return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncCreateDeck');
		});

		it('adds deck', function () {
			browser.assert.text('.KOMReviewMasterListItemName', 'FakeZDRSchemaDispatchSyncCreateDeck');
		});

	});

	describe('ZDRSchemaDispatchSyncCreateCard', function test_ZDRSchemaDispatchSyncCreateCard() {

		before(function () {
			browser.assert.text('.KOMReviewMasterListItemUnseenValue', '0');
		});

		before(function () {
			return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncCreateCard');
		});

		it('sets KOMReviewMasterListItemUnseenValue', function () {
			browser.assert.text('.KOMReviewMasterListItemUnseenValue', '1');
		});

	});

	describe('ZDRSchemaDispatchSyncCreateSpacing', function test_ZDRSchemaDispatchSyncCreateSpacing() {

		before(function () {
			browser.assert.text('.KOMReviewMasterListItemReviewValue', '0');
		});

		before(function () {
			return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncCreateSpacing');
		});

		it('sets KOMReviewMasterListItemUnseenValue', function () {
			browser.assert.text('.KOMReviewMasterListItemUnseenValue', '0');
		});

		it('sets KOMReviewMasterListItemReviewValue', function () {
			browser.assert.text('.KOMReviewMasterListItemReviewValue', '1');
		});

	});

	describe('ZDRSchemaDispatchSyncUpdateSpacing', function test_ZDRSchemaDispatchSyncUpdateSpacing() {

		before(function () {
			return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncUpdateSpacing');
		});

		it('sets KOMReviewMasterListItemReviewValue', function () {
			browser.assert.text('.KOMReviewMasterListItemReviewValue', '0');
		});

		it('sets KOMReviewChartCompositionCollectionData', function () {
			browser.assert.text('.KOMReviewChartCompositionCollection .KOMReviewChartCompositionCollectionTotalCardsValue', '1');
		});

	});

	describe('ZDRSchemaDispatchSyncDeleteSpacing', function test_ZDRSchemaDispatchSyncDeleteSpacing() {

		before(function () {
			return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncDeleteSpacing');
		});

		it('does nothing', function () {
			browser.assert.text('.KOMReviewMasterListItemReviewValue', '0');
		});

	});

	describe('ZDRSchemaDispatchSyncUpdateCard', function test_ZDRSchemaDispatchSyncUpdateCard() {

		before(function () {
			browser.assert.text('.KOMReviewChartCompositionCollection .KOMReviewChartCompositionCollectionRetiredCardsValue', '0');
		});

		before(function () {
			return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncUpdateCard');
		});

		it('sets KOMReviewChartCompositionCollectionData', function () {
			browser.assert.text('.KOMReviewChartCompositionCollection .KOMReviewChartCompositionCollectionRetiredCardsValue', '1');
		});

	});

	describe('ZDRSchemaDispatchSyncDeleteCard', function test_ZDRSchemaDispatchSyncDeleteCard() {

		before(function () {
			return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncDeleteCard');
		});

		it('clears KOMReviewChartCompositionCollection', function () {
			browser.assert.elements('.KOMReviewChartCompositionCollection', 0);
		});

	});

	describe('ZDRSchemaDispatchSyncUpdateDeck', function test_ZDRSchemaDispatchSyncUpdateDeck() {

		before(function () {
			return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncUpdateDeck');
		});

		it('updates deck', function () {
			browser.assert.text('.KOMReviewMasterListItemName', 'FakeZDRSchemaDispatchSyncUpdateDeck');
		});

	});

	describe('ZDRSchemaDispatchSyncDeleteDeck', function test_ZDRSchemaDispatchSyncDeleteDeck() {

		before(function () {
			return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncDeleteDeck');
		});

		it('deletes deck', function () {
			browser.assert.elements('.KOMReviewMasterListItem', 0);
		});

	});

	context('unordered', function test_unordered() {

		before(function () {
			return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncCreateSpacing');
		});

		before(function () {
			return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncCreateCard');
		});

		before(function () {
			return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncCreateDeck');
		});

		it('adds deck', function () {
			browser.assert.text('.KOMReviewMasterListItemName', 'FakeZDRSchemaDispatchSyncCreateDeck');
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

		describe('ZDRSchemaDispatchSyncUpdateDeck', function () {

			before(function () {
				return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncUpdateDeck');
			});

			it('updates deck', function () {
				browser.assert.text('.KOMReviewDetailToolbarTitle', 'FakeZDRSchemaDispatchSyncUpdateDeck');
			});

		});

		describe('ZDRSchemaDispatchSyncDeleteCard', function () {

			before(function () {
				// browser.assert.elements('.KOMReviewDetailNoCards', 0);
			});

			before(function () {
				return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncDeleteCard');
			});

			it('deletes card', function () {
				browser.assert.elements('.KOMReviewDetailNoCards', 1);
			});

		});

		describe('ZDRSchemaDispatchSyncDeleteDeck', function () {

			before(function () {
				return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncDeleteDeck');
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
			return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncCreateDeck');
		});

		context('different_deck', function () {

			before(function () {
				return browser.pressButton('.KOMReviewMasterListItem');
			});

			before(function () {
				return browser.click('.KOMReviewDetailToolbarCardsButton');
			});

			describe('ZDRSchemaDispatchSyncCreateCard', function () {

				before(function () {
					browser.assert.elements('.KOMBrowseListItem', 0);
				});

				before(function () {
					return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncCreateCard');
				});

				it('does nothing', function () {
					browser.assert.elements('.KOMBrowseListItem', 0);
				});

			});

			describe('ZDRSchemaDispatchSyncUpdateCard', function () {

				before(function () {
					return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncUpdateCard');
				});

				it('does nothing', function () {
					browser.assert.elements('.KOMBrowseListItem', 0);
				});

			});

			describe('ZDRSchemaDispatchSyncDeleteCard', function () {

				before(function () {
					return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncDeleteCard');
				});

				it('does nothing', function () {
					browser.assert.elements('.KOMBrowseListItem', 0);
				});

			});

		});

		context('same_deck', function () {

			before(function () {
				return browser.pressButton('.KOMBrowseCloseButton');
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

			describe('ZDRSchemaDispatchSyncCreateCard', function () {

				before(function () {
					browser.assert.elements('.KOMBrowseListItem', 0);
				});

				before(function () {
					return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncCreateCard');
				});

				it('adds card', function () {
					browser.assert.text('.KOMBrowseListItem', 'FakeZDRSchemaDispatchSyncCreateCard');
				});

			});

			describe('ZDRSchemaDispatchSyncUpdateCard', function () {

				before(function () {
					return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncUpdateCard');
				});

				it('updates card', function () {
					browser.assert.text('.KOMBrowseListItem', '[retired] FakeZDRSchemaDispatchSyncUpdateCard');
				});

			});

			describe('ZDRSchemaDispatchSyncDeleteCard', function () {

				before(function () {
					return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncDeleteCard');
				});

				it('deletes card', function () {
					browser.assert.elements('.KOMBrowseListItem', 0);
				});

			});

			describe('ZDRSchemaDispatchSyncConflictCard', function () {

				before(function () {
					return browser.pressButton('.KOMBrowseCreateButton');
				});

				before(function () {
					return browser.fill('.KOMBrowseInfoFormFrontTextField', 'FakeZDRSchemaDispatchSyncConflictCard');
				});

				before(function () {
					return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncConflictCard');
				});

				it('updates local', function () {
					browser.assert.text('.KOMBrowseListItem', 'FakeZDRSchemaDispatchSyncConflictCard-local');
				});

			});

			describe('ZDRSchemaDispatchSyncDeleteDeck', function () {

				before(function () {
					return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncDeleteDeck');
				});

				it('deletes deck', function () {
					browser.assert.elements('.KOMBrowse', 0);
				});

			});

		});

	});

});
