const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMReviewStats_Misc', function () {

	describe('KOMReviewStatsToday', function test_KOMReviewStatsToday() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewTodaySpacings: JSON.stringify([Object.assign(StubSpacingObjectValid(), {
					KOMSpacingChronicles: [StubChronicleObjectValid()],
					KOMSpacingDueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
				}), Object.assign(StubSpacingObjectValid(), {
					KOMSpacingID: 'bravo-backward',
				})]),
				KOMReviewGeneralSpacings: JSON.stringify([]),
			});
		});

		it('sets KOMReviewTodaySpacings', function () {
			browser.assert.text(`${ KOMReviewStatsToday } .KOMReviewTodayTotalCardsValue`, '1');
		});

	});

	describe('KOMReviewStatsGeneral', function test_KOMReviewStatsGeneral() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewTodaySpacings: JSON.stringify([]),
				KOMReviewGeneralSpacings: JSON.stringify([Object.assign(StubSpacingObjectValid(), {
					KOMSpacingChronicles: [StubChronicleObjectValid()],
					KOMSpacingDueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
				}), Object.assign(StubSpacingObjectValid(), {
					KOMSpacingID: 'bravo-backward',
				})]),
			});
		});

		it('sets KOMReviewGeneralSpacings', function () {
			browser.assert.text(`${ KOMReviewStatsGeneral } .KOMReviewChartCompositionCollectionTotalCardsValue`, '1');
		});

	});

});
