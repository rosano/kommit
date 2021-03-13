const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const uItem = function (inputData = 'alfa') {
	return {
		KOMCardID: inputData,
		KOMCardFrontText: inputData,
		KOMCardRearText: inputData,
	};
};

describe('KOMBrowseList_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMBrowseListItems: JSON.stringify([uItem('alfa'), uItem('bravo')]),
			KOMBrowseListItemSelected: JSON.stringify(uItem('alfa')),
			KOMBrowseListFilterText: 'alfa',
		});
	});

	describe('OLSKMasterList', function test_OLSKMasterList() {

		it('binds OLSKMasterListFilterText', function () {
			browser.assert.input('.OLSKMasterListFilterField', 'alfa');
		});

		it('sets OLSKMasterListItemAccessibilitySummaryFunction', function () {
			browser.assert.attribute('.OLSKResultsListItem:nth-child(1) .OLSKMasterListItem', 'aria-label', 'alfa');
		});

		it('sets OLSKMasterListItemSelected', function () {
			browser.assert.hasClass('.OLSKResultsListItem:nth-child(1)', 'OLSKResultsListItemSelected');
		});

		context('input', function () {

			before(function () {
				browser.assert.text('#TestKOMBrowseListDispatchFilter', '0');
				browser.assert.text('#TestKOMBrowseListDispatchFilterData', 'undefined');
			});

			before(function () {
				browser.fill('.OLSKMasterListFilterField', 'charlie');
			});

			it('sends KOMBrowseListDispatchFilter', function () {
				browser.assert.text('#TestKOMBrowseListDispatchFilter', '1');
				browser.assert.text('#TestKOMBrowseListDispatchFilterData', 'charlie');
			});

		});

		context('click', function () {

			before(function () {
				browser.assert.text('#TestKOMBrowseListDispatchClick', '0');
				browser.assert.text('#TestKOMBrowseListDispatchClickData', 'undefined');
			});

			before(function () {
				return browser.click('.KOMBrowseListItem');
			});

			it('sends KOMBrowseListDispatchClick', function () {
				browser.assert.text('#TestKOMBrowseListDispatchClick', '1');
				browser.assert.text('#TestKOMBrowseListDispatchClickData', JSON.stringify(uItem()));
			});

		});

	});

	describe('KOMBrowseListItem', function test_KOMBrowseListItem() {

		it('sets KOMBrowseListItemFront', function () {
			browser.assert.text('.OLSKResultsListItem:nth-child(1) .KOMBrowseListItemFront', 'alfa');
		});

	});

});
