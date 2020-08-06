const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	KOMReviewGeneral: '.KOMReviewGeneral',

	KOMReviewGeneralUpcoming: '.KOMReviewGeneralUpcoming',
	KOMReviewGeneralUpcomingHeading: '.KOMReviewGeneralUpcomingHeading',
	KOMReviewGeneralUpcomingDateBarTable: '.KOMReviewGeneralUpcoming .KOMReviewChartElementDateBarTable',

	KOMReviewGeneralCollection: '.KOMReviewGeneralCollection',
	KOMReviewGeneralCollectionHeading: '.KOMReviewGeneralCollectionHeading',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('KOMReviewGeneral_Access', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMReviewGeneralSpacings: JSON.stringify([]),
		});
	});

	it('shows KOMReviewGeneral', function () {
		browser.assert.elements(KOMReviewGeneral, 1);
	});

	it('hides KOMReviewGeneralUpcoming', function () {
		browser.assert.elements(KOMReviewGeneralUpcoming, 0);
	});

	it('shows KOMReviewGeneralCollection', function () {
		browser.assert.elements(KOMReviewGeneralCollection, 1);
	});

	it('shows KOMReviewGeneralCollectionHeading', function () {
		browser.assert.elements(KOMReviewGeneralCollectionHeading, 1);
	});

	it('shows KOMReviewChartCompositionCollection', function () {
		browser.assert.elements('.KOMReviewChartCompositionCollection', 1);
	});

	context('upcoming', function () {
		
		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewGeneralSpacings: JSON.stringify([
					Object.assign(StubSpacingObjectValid(), {
						KOMSpacingInterval: 1,
						KOMSpacingDueDate: new Date(),
					}),
				]),
			});
		});

		it('shows KOMReviewGeneralUpcoming', function () {
			browser.assert.elements(KOMReviewGeneralUpcoming, 1);
		});

		it('shows KOMReviewGeneralUpcomingHeading', function () {
			browser.assert.elements(KOMReviewGeneralUpcomingHeading, 1);
		});

		it('shows KOMReviewGeneralUpcomingDateBarTable', function () {
			browser.assert.elements(KOMReviewGeneralUpcomingDateBarTable, 1);
		});
	
	});

});
