const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	KOMReviewMaster: '.KOMReviewMaster',

	KOMReviewMasterToolbar: '.KOMReviewMasterToolbar',
	KOMReviewMasterToolbarTitle: '.KOMReviewMasterToolbarTitle',

	KOMReviewMasterCreateButton: '.KOMReviewMasterCreateButton',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('KOMReviewMaster_Access', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows KOMReviewMaster', function () {
		browser.assert.elements(KOMReviewMaster, 1);
	});

	it('shows KOMReviewMasterToolbar', function () {
		browser.assert.elements(KOMReviewMasterToolbar, 1);
	});

	it('shows KOMReviewMasterToolbarTitle', function () {
		browser.assert.elements(KOMReviewMasterToolbarTitle, 1);
	});

	it('shows KOMReviewMasterCreateButton', function () {
		browser.assert.elements(KOMReviewMasterCreateButton, 1);
	});

	it('hides KOMReviewMasterListItem', function () {
		browser.assert.elements('.KOMReviewMasterListItem', 0);
	});

	context('KOMReviewMasterItems', function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewMasterItems: JSON.stringify([{
					KOMDeckName: 'alfa',
					$KOMDeckSpacings: [],
				}]),
			});
		});

		it('shows KOMReviewMasterListItem', function () {
			browser.assert.elements('.KOMReviewMasterListItem', 1);
		});

		it('hides KOMReviewStats', function () {
			browser.assert.elements('.KOMReviewStats', 0);
		});

	});

	context('finished', function test_finished() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewMasterItems: JSON.stringify([{
					KOMDeckName: 'alfa',
					$KOMDeckSpacings: [Object.assign(StubSpacingObjectValid(), {
						KOMSpacingChronicles: [StubChronicleObjectValid()],
						KOMSpacingDueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
					})],
					$KOMDeckTodayReviewCount: 0,
					$KOMDeckTodayUnseenCount: 0,
					$KOMDeckTodayStudiedCount: 1,
					$KOMDeckGeneralNotUnseenCount: 1,
				}]),
			});
		});

		it('shows KOMReviewStats', function () {
			browser.assert.elements('.KOMReviewStats', 1);
		});

	});

});
