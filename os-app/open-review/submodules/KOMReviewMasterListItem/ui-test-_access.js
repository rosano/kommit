const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	KOMReviewMasterListItem: '.KOMReviewMasterListItem',

	KOMReviewMasterListItemName: '.KOMReviewMasterListItemName',
	KOMReviewMasterListItemReviewValue: '.KOMReviewMasterListItemReviewValue',
	KOMReviewMasterListItemReviewLabel: '.KOMReviewMasterListItemReviewLabel',
	KOMReviewMasterListItemUnseenValue: '.KOMReviewMasterListItemUnseenValue',
	KOMReviewMasterListItemUnseenLabel: '.KOMReviewMasterListItemUnseenLabel',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('KOMReviewMasterListItem_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMReviewMasterListItemObject: JSON.stringify({
				KOMDeckName: 'alfa',
				$KOMDeckSpacings: [],
			}),
		});
	});

	it('shows KOMReviewMasterListItem', function () {
		browser.assert.elements(KOMReviewMasterListItem, 1);
	});
	
	it('shows KOMReviewMasterListItemName', function () {
		browser.assert.elements(KOMReviewMasterListItemName, 1);
	});

	it('shows KOMReviewMasterListItemReviewValue', function () {
		browser.assert.elements(KOMReviewMasterListItemReviewValue, 1);
	});

	it('shows KOMReviewMasterListItemReviewLabel', function () {
		browser.assert.elements(KOMReviewMasterListItemReviewLabel, 1);
	});

	it('shows KOMReviewMasterListItemUnseenValue', function () {
		browser.assert.elements(KOMReviewMasterListItemUnseenValue, 1);
	});

	it('shows KOMReviewMasterListItemUnseenLabel', function () {
		browser.assert.elements(KOMReviewMasterListItemUnseenLabel, 1);
	});

});
