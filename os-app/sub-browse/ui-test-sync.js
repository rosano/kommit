const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMBrowse_Sync', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMBrowseDeckSelected: JSON.stringify(StubDeckObjectValid()),
		});
	});

	describe('ChangeDelegateCreateCard', function test_ChangeDelegateCreateCard() {

		before(function () {
			browser.assert.elements('.OLSKResultsListItem', 0);
		});

		before(function () {
			return browser.OLSKLauncherRun('FakeChangeDelegateCreateCard');
		});

		it('adds item', function () {
			browser.assert.elements('.OLSKResultsListItem', 1);
		});

	});

	describe('ChangeDelegateUpdateCard', function test_ChangeDelegateUpdateCard() {

		before(function () {
			browser.assert.text('.OLSKResultsListItem', 'FakeChangeDelegateCreateCard');
		});

		before(function () {
			return browser.OLSKLauncherRun('FakeChangeDelegateUpdateCard');
		});

		it('updates item', function () {
			browser.assert.text('.OLSKResultsListItem', 'FakeChangeDelegateUpdateCard');
		});

		context('selected same', function () {

			before(function () {
				return browser.click('.OLSKResultsListItem');
			});

			before(function () {
				return browser.fill('.KOMBrowseInfoFormFrontTextField', 'FakeChangeDelegateCreateCard');
			});

			before(function () {
				return browser.OLSKLauncherRun('FakeChangeDelegateUpdateCard');
			});

			it('updates detail', function () {
				browser.assert.input('.KOMBrowseInfoFormFrontTextField', 'FakeChangeDelegateUpdateCard');
			});

		});

	});

	describe('ChangeDelegateDeleteCard', function test_ChangeDelegateDeleteCard() {

		before(function () {
			return browser.OLSKLauncherRun('FakeChangeDelegateDeleteCard');
		});

		it('removes item', function () {
			browser.assert.elements('.OLSKResultsListItem', 0);
		});

		context('selected same', function () {

			before(function () {
				return browser.OLSKLauncherRun('FakeChangeDelegateCreateCard');
			});

			before(function () {
				return browser.click('.OLSKResultsListItem');
			});

			before(function () {
				return browser.OLSKLauncherRun('FakeChangeDelegateDeleteCard');
			});

			it('clear detail', function () {
				browser.assert.elements('.KOMBrowseInfo', 0);
			});

		});

	});

	describe('SyncConflictNote', function test_SyncConflictNote () {

		before(function () {
			return browser.OLSKLauncherRun('FakeChangeDelegateCreateCard');
		});

		before(function () {
			return browser.click('.OLSKResultsListItem');
		});

		before(function () {
			return browser.fill('.KOMBrowseInfoFormFrontTextField', 'FakeSyncConflictNote');
		});

		before(function () {
			return browser.OLSKLauncherRun('FakeSyncConflictNote');
		});

		it('selects local', function () {
			browser.assert.text('.OLSKResultsListItem', 'FakeSyncConflictNote-local');
		});

	});

});
