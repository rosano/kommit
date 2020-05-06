import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	KOMReviewDetail: '.KOMReviewDetail',

	KOMReviewDetailToolbar: '.KOMReviewDetailToolbar',
	KOMReviewDetailToolbarBackButton: '.KOMReviewDetailToolbarBackButton',
	KOMReviewDetailToolbarDiscardButton: '.KOMReviewDetailToolbarDiscardButton',
	KOMReviewDetailToolbarRenameButton: '.KOMReviewDetailToolbarRenameButton',
	KOMReviewDetailToolbarBrowseButton: '.KOMReviewDetailToolbarBrowseButton',
	
	KOMReviewDetailHeading: '.KOMReviewDetailHeading',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('KOMReviewDetail_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMReviewDetailDeck: JSON.stringify({
				KOMDeckName: 'alfa',
			}),
		});
	});

	it('shows KOMReviewDetail', function () {
		browser.assert.elements(KOMReviewDetail, 1);
	});

	it('shows OLSKToolbar', function () {
		browser.assert.elements('.OLSKToolbar', 1);
	});

	it('shows KOMReviewDetailToolbar', function () {
		browser.assert.elements(KOMReviewDetailToolbar, 1);
	});

	it('shows KOMReviewDetailToolbarBackButton', function () {
		browser.assert.elements(KOMReviewDetailToolbarBackButton, 1);
	});

	it('shows KOMReviewDetailToolbarDiscardButton', function () {
		browser.assert.elements(KOMReviewDetailToolbarDiscardButton, 1);
	});

	it('shows KOMReviewDetailToolbarRenameButton', function () {
		browser.assert.elements(KOMReviewDetailToolbarRenameButton, 1);
	});

	it('shows KOMReviewDetailToolbarBrowseButton', function () {
		browser.assert.elements(KOMReviewDetailToolbarBrowseButton, 1);
	});

	it('shows KOMReviewDetailHeading', function () {
		browser.assert.elements(KOMReviewDetailHeading, 1);
	});

});
