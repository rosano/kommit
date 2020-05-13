const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMReview_Sync', function () {	

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	describe('OLSKChangeDelegateCreateDeck', function test_OLSKChangeDelegateCreateDeck () {

		before(function () {
			return browser.pressButton('.OLSKAppToolbarLauncherButton');
		});

		before(function () {
			return browser.fill('.LCHLauncherFilterInput', 'FakeOLSKChangeDelegateCreateDeck');
		});

		before(function () {
			return browser.click('.LCHLauncherResultListItem');
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
			return browser.pressButton('.OLSKAppToolbarLauncherButton');
		});

		before(function () {
			return browser.fill('.LCHLauncherFilterInput', 'FakeOLSKChangeDelegateCreateCard');
		});

		before(function () {
			return browser.click('.LCHLauncherResultListItem');
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
			return browser.pressButton('.OLSKAppToolbarLauncherButton');
		});

		before(function () {
			return browser.fill('.LCHLauncherFilterInput', 'FakeOLSKChangeDelegateCreateSpacing');
		});

		before(function () {
			return browser.click('.LCHLauncherResultListItem');
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
			return browser.pressButton('.OLSKAppToolbarLauncherButton');
		});

		before(function () {
			return browser.fill('.LCHLauncherFilterInput', 'FakeOLSKChangeDelegateUpdateSpacing');
		});

		before(function () {
			return browser.click('.LCHLauncherResultListItem');
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
			return browser.pressButton('.OLSKAppToolbarLauncherButton');
		});

		before(function () {
			return browser.fill('.LCHLauncherFilterInput', 'FakeOLSKChangeDelegateDeleteSpacing');
		});

		before(function () {
			return browser.click('.LCHLauncherResultListItem');
		});

		it('does nothing', function () {
			browser.assert.text('#TestCallReactCounts', '3');
		});

	});

	describe('OLSKChangeDelegateUpdateCard', function test_OLSKChangeDelegateUpdateCard () {

		before(function () {
			return browser.pressButton('.OLSKAppToolbarLauncherButton');
		});

		before(function () {
			return browser.fill('.LCHLauncherFilterInput', 'FakeOLSKChangeDelegateUpdateCard');
		});

		before(function () {
			return browser.click('.LCHLauncherResultListItem');
		});

		it('does nothing', function () {
			browser.assert.text('#TestCallReactCounts', '3');
		});

	});

	describe('OLSKChangeDelegateUpdateDeck', function test_OLSKChangeDelegateUpdateDeck () {

		before(function () {
			return browser.pressButton('.OLSKAppToolbarLauncherButton');
		});

		before(function () {
			return browser.fill('.LCHLauncherFilterInput', 'FakeOLSKChangeDelegateUpdateDeck');
		});

		before(function () {
			return browser.click('.LCHLauncherResultListItem');
		});

		it('updates deck', function () {
			browser.assert.text('.KOMReviewMasterListItemName', 'FakeOLSKChangeDelegateUpdateDeck');
		});

	});

	describe('OLSKChangeDelegateDeleteDeck', function test_OLSKChangeDelegateDeleteDeck () {

		before(function () {
			return browser.pressButton('.OLSKAppToolbarLauncherButton');
		});

		before(function () {
			return browser.fill('.LCHLauncherFilterInput', 'FakeOLSKChangeDelegateDeleteDeck');
		});

		before(function () {
			return browser.click('.LCHLauncherResultListItem');
		});

		it('deletes deck deck', function () {
			browser.assert.elements('.KOMReviewMasterListItem', 0);
		});

	});

});