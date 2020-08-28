const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMReviewStats_Misc', function () {

	describe('KOMReviewStatsToday', function test_KOMReviewStatsToday() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewTodayTotalCards: 1,
				KOMReviewTodayTimeMinutes: 2,
				KOMReviewTodayReviewAccuracy: 3,
			});
		});

		it('sets KOMReviewTodayTotalCards', function () {
			browser.assert.text(`${ KOMReviewStatsToday } .KOMReviewTodayTotalCardsValue`, 1);
		});

		it('sets KOMReviewTodayTimeMinutes', function () {
			browser.assert.text(`${ KOMReviewStatsToday } .KOMReviewTodayTimeMinutesValue`, 2);
		});

		it('sets KOMReviewTodayReviewAccuracy', function () {
			browser.assert.text(`${ KOMReviewStatsToday } .KOMReviewTodayReviewAccuracyValue`, 3);
		});

	});

	describe('KOMReviewStatsGeneral', function test_KOMReviewStatsGeneral() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
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
