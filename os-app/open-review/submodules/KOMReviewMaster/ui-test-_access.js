const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	KOMReviewMaster: '.KOMReviewMaster',

	KOMReviewMasterToolbar: '.KOMReviewMasterToolbar',
	KOMReviewMasterToolbarTitle: '.KOMReviewMasterToolbarTitle',
	
	KOMReviewMasterCreateButton: '.KOMReviewMasterCreateButton',

	KOMReviewMasterListItem: '.KOMReviewMasterListItem',
	KOMReviewMasterListItemName: '.KOMReviewMasterListItemName',
	KOMReviewMasterListItemReviewValue: '.KOMReviewMasterListItemReviewValue',
	KOMReviewMasterListItemReviewLabel: '.KOMReviewMasterListItemReviewLabel',
	KOMReviewMasterListItemUnseenValue: '.KOMReviewMasterListItemUnseenValue',
	KOMReviewMasterListItemUnseenLabel: '.KOMReviewMasterListItemUnseenLabel',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('KOMReviewMaster_Access', function () {

	before(function() {
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
		browser.assert.elements(KOMReviewMasterListItem, 0);
	});

	context('KOMReviewMasterItems', function() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewMasterItems: JSON.stringify([{
					KOMDeckName: 'alfa',
					$KOMDeckSpacings: [],
				}]),
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

});
