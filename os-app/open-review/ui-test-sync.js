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

		before(function() {
			return browser.click('.LCHLauncherResultListItem');
		});

		it('adds deck', function () {
			browser.assert.text('.KOMReviewMasterListItemName', 'FakeOLSKChangeDelegateCreateDeck');
		});

	});

	describe('OLSKChangeDelegateCreateCard', function test_OLSKChangeDelegateCreateCard () {

		before(function () {
			return browser.pressButton('.OLSKAppToolbarLauncherButton');
		});

		before(function () {
			return browser.fill('.LCHLauncherFilterInput', 'FakeOLSKChangeDelegateCreateCard');
		});

		before(function () {
			browser.assert.text('#TestCallReactCounts', '0');
		});

		before(function () {
			browser.assert.text('#TestCardCount', '0');
		});

		before(function() {
			return browser.click('.LCHLauncherResultListItem');
		});

		it('adds card', function () {
			browser.assert.text('#TestCardCount', '1');
		});

		it('calls UpdateCountThrottle', function () {
			browser.assert.text('#TestCallReactCounts', '1');
		});

	});

	describe('OLSKChangeDelegateUpdateDeck', function test_OLSKChangeDelegateUpdateDeck () {

		before(function () {
			return browser.pressButton('.OLSKAppToolbarLauncherButton');
		});

		before(function () {
			return browser.fill('.LCHLauncherFilterInput', 'FakeOLSKChangeDelegateUpdateDeck');
		});

		before(function() {
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

		before(function() {
			return browser.click('.LCHLauncherResultListItem');
		});

		it('deletes deck deck', function () {
			browser.assert.elements('.KOMReviewMasterListItem', 0);
		});

	});

});