const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const KOMReviewGeneralLogic = require('./ui-logic.js').default;

describe('KOMReviewGeneral_Misc', function () {

	describe('KOMReviewGeneralUpcomingDateBarTable', function test_KOMReviewGeneralUpcomingDateBarTable() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewGeneralSpacings: JSON.stringify([
					StubSpacingObjectValid(),
					Object.assign(StubSpacingObjectValid(), {
						KOMSpacingInterval: 1,
						KOMSpacingDueDate: new Date(),
					}),
					Object.assign(StubSpacingObjectValid(), {
						KOMSpacingInterval: 21,
						KOMSpacingDueDate: new Date(),
					}),
					Object.assign(StubSpacingObjectValid(), {
						KOMSpacingInterval: 21,
						KOMSpacingDueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
					}),
					Object.assign(StubSpacingObjectValid(), {
						KOMSpacingInterval: 21,
						KOMSpacingDueDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
					}),
				].reduce(function (coll, item) {
					return coll.concat([item, Object.assign(Object.assign({}, item), {
						KOMSpacingID: item.KOMSpacingID.replace('forward', 'backward'),
					})]);
				}, [])),
			});
		});

		context('KOMReviewGeneralUpcomingDateBarTableData', function () {
			
			it('creates KOMReviewGeneralTableDays elements', function () {
				browser.assert.elements(`${ KOMReviewGeneralUpcomingDateBarTable } .KOMReviewChartElementDateBarTableRow`, KOMReviewGeneralLogic.KOMReviewGeneralTableDays());
			});

			context('KOMReviewChartElementDateBarTableRow', function () {
				
				it('sets KOMReviewChartElementDateBarTableRowDataKey', function () {
					browser.assert.text(`${ KOMReviewGeneralUpcomingDateBarTable } .KOMReviewChartElementDateBarTableRow .KOMReviewChartElementDateBarTableRowKey`, 'alfa bravo charlie');
				});
				
				it('sets KOMReviewChartElementDateBarTableRowDataValues', function () {
					browser.assert.elements(`${ KOMReviewGeneralUpcomingDateBarTable } .KOMReviewChartElementDateBarTableRow .KOMReviewChartElementHorizontalStackedBarSection`, 2 * KOMReviewGeneralLogic.KOMReviewGeneralTableDays());
				});
				
				it('sets KOMReviewChartElementHorizontalStackedBarMaximum', function () {
					browser.assert.attribute(`${ KOMReviewGeneralUpcomingDateBarTable } .KOMReviewChartElementDateBarTableRow .KOMReviewChartElementHorizontalStackedBarSection`, 'width', 123);
				});
			
			});
		
		});

	});

	describe('KOMReviewChartCompositionCollection', function test_KOMReviewChartCompositionCollection() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewGeneralSpacings: JSON.stringify([
					StubSpacingObjectValid(),
					Object.assign(StubSpacingObjectValid(), {
						KOMSpacingInterval: 1,
					}),
					Object.assign(StubSpacingObjectValid(), {
						KOMSpacingInterval: 21,
					}),
				].reduce(function (coll, item) {
					return coll.concat([item, Object.assign(Object.assign({}, item), {
						KOMSpacingID: item.KOMSpacingID.replace('forward', 'backward'),
					})]);
				}, [])),
			});
		});

		it('sets KOMReviewChartCompositionCollectionData', function () {
			browser.assert.text('.KOMReviewChartCompositionCollection .KOMReviewChartCompositionCollectionTotalCardsValue', '1');
			browser.assert.text('.KOMReviewChartCompositionCollection .KOMReviewChartCompositionCollectionUnseenCardsValue', '1');
			browser.assert.text('.KOMReviewChartCompositionCollection .KOMReviewChartCompositionCollectionDevelopingCardsValue', '1');
			browser.assert.text('.KOMReviewChartCompositionCollection .KOMReviewChartCompositionCollectionMatureCardsValue', '1');
		});

	});

});
