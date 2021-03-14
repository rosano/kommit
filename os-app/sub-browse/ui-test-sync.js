const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMBrowse_Sync', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMBrowseDeckSelected: JSON.stringify(StubDeckObjectValid()),
		});
	});

	describe('SyncCreateCard', function test_SyncCreateCard() {

		before(function () {
			browser.assert.elements('.OLSKResultsListItem', 0);
		});

		before(function () {
			return browser.OLSKLauncherRun('FakeSyncCreateCard');
		});

		it('adds item', function () {
			browser.assert.elements('.OLSKResultsListItem', 1);
		});

	});

	describe('SyncUpdateCard', function test_SyncUpdateCard() {

		before(function () {
			browser.assert.text('.OLSKResultsListItem', 'FakeSyncCreateCard');
		});

		before(function () {
			return browser.OLSKLauncherRun('FakeSyncUpdateCard');
		});

		it('updates item', function () {
			browser.assert.text('.OLSKResultsListItem', 'FakeSyncUpdateCard');
		});

		context('selected same', function () {

			before(function () {
				return browser.click('.OLSKResultsListItem');
			});

			before(function () {
				return browser.fill('.KOMBrowseInfoFormFrontTextField', 'FakeSyncCreateCard');
			});

			before(function () {
				return browser.OLSKLauncherRun('FakeSyncUpdateCard');
			});

			it('updates detail', function () {
				browser.assert.input('.KOMBrowseInfoFormFrontTextField', 'FakeSyncUpdateCard');
			});

		});

	});

	describe('SyncDeleteCard', function test_SyncDeleteCard() {

		before(function () {
			return browser.OLSKLauncherRun('FakeSyncDeleteCard');
		});

		it('removes item', function () {
			browser.assert.elements('.OLSKResultsListItem', 0);
		});

		context('selected same', function () {

			before(function () {
				return browser.OLSKLauncherRun('FakeSyncCreateCard');
			});

			before(function () {
				return browser.click('.OLSKResultsListItem');
			});

			before(function () {
				return browser.OLSKLauncherRun('FakeSyncDeleteCard');
			});

			it('clear detail', function () {
				browser.assert.elements('.KOMBrowseInfo', 0);
			});

		});

	});

	describe('SyncConflictCard', function test_SyncConflictCard () {

		before(function () {
			return browser.OLSKLauncherRun('FakeSyncCreateCard');
		});

		before(function () {
			return browser.click('.OLSKResultsListItem');
		});

		before(function () {
			return browser.fill('.KOMBrowseInfoFormFrontTextField', 'FakeSyncConflictCard');
		});

		before(function () {
			return browser.OLSKLauncherRun('FakeSyncConflictCard');
		});

		it('selects local', function () {
			browser.assert.text('.OLSKResultsListItem', 'FakeSyncConflictCard-local');
		});

	});

});
