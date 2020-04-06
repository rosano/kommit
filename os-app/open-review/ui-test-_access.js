import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	KOMReviewViewportFooter: '.KOMReviewViewportFooter',

	KOMReviewStorageWidget: '#KOMReviewStorageWidget',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('KOMReview_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows KOMReviewMaster', function () {
		browser.assert.elements('.KOMReviewMaster', 1);
	});

	it('hides KOMReviewMasterListItem', function () {
		browser.assert.elements('.KOMReviewMasterListItem', 0);
	});

	it('shows KOMReviewViewportFooter', function () {
		browser.assert.elements(KOMReviewViewportFooter, 1);
	});

	it('shows KOMReviewStorageWidget', function () {
		browser.assert.elements(KOMReviewStorageWidget, 1);
	});

	it('shows OLSKAppToolbar', function () {
		browser.assert.elements('.OLSKAppToolbar', 1);
	});

	context('create', function () {
		
		before(function () {
			return browser.OLSKPrompt(function () {
				return browser.pressButton('.KOMReviewMasterCreateButton');
			}, function (dialog) {
				dialog.response = 'alfa';
				
				return dialog;
			});
		});

		it('shows KOMReviewMasterListItem', function () {
			browser.assert.elements('.KOMReviewMasterListItem', 1);
		});
	
	});

});
