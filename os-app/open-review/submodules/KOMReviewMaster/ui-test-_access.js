const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	KOMReviewMaster: '.KOMReviewMaster',

	KOMReviewMasterToolbar: '.KOMReviewMasterToolbar',
	KOMReviewMasterToolbarTitle: '.KOMReviewMasterToolbarTitle',

	KOMReviewMasterCreateButton: '.KOMReviewMasterCreateButton',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

const uDeck = function (inputData) {
	return Object.assign({
		KOMDeckName: 'alfa',
		$KOMReviewGeneralUpcomingData: [],
		$KOMReviewGeneralHistoricalData: [],
	}, inputData);
};

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

	it('shows KOMReviewMasterLauncherItemToggleExcludeTripleQuestionMark', function () {
		return browser.assert.OLSKLauncherItems('KOMReviewMasterLauncherItemToggleExcludeTripleQuestionMark', 1);
	});

	it('shows KOMReviewMasterLauncherItemToggleDeckFiguresCaching', function () {
		return browser.assert.OLSKLauncherItems('KOMReviewMasterLauncherItemToggleDeckFiguresCaching', 1);
	});

	context('KOMReviewMasterItems', function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewMasterItems: JSON.stringify([uDeck()]),
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
				KOMReviewMasterItems: JSON.stringify([uDeck({
					$KOMDeckTodayReviewCount: 0,
					$KOMDeckTodayUnseenCount: 0,
					$KOMDeckTodayStudiedCount: 1,
					$KOMDeckGeneralNotUnseenCount: 1,
					$KOMReviewChartCompositionCollectionData: {
						KOMSpacingGroupingTotal: 1,
						KOMSpacingGroupingUnseen: 2,
						KOMSpacingGroupingDeveloping: 3,
						KOMSpacingGroupingMature: 4,
						KOMSpacingGroupingRetired: 5,
					},
				})]),
			});
		});

		it('shows KOMReviewStats', function () {
			browser.assert.elements('.KOMReviewStats', 1);
		});

	});

});
