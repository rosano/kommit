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

	it('hides KOMReviewDetail', function () {
		browser.assert.elements('.KOMReviewDetail', 0);
	});

	it('hides KOMReviewCardForm', function () {
		browser.assert.elements('.KOMReviewCardForm', 0);
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

	it('shows OLSKAppToolbarLauncherButton', function () {
		browser.assert.elements('.OLSKAppToolbarLauncherButton', 1);
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

	context('select', function () {
		
		before(function () {
			return browser.pressButton('.KOMReviewMasterListItem');
		});

		it('hides KOMReviewMaster', function () {
			browser.assert.elements(KOMReviewMaster, 0);
		});

		it('shows KOMReviewDetail', function () {
			browser.assert.elements('.KOMReviewDetail', 1);
		});

		it('hides KOMReviewCardForm', function () {
			browser.assert.elements('.KOMReviewCardForm', 0);
		});
	
	});

	context('create card', function () {
		
		before(function () {
			return browser.pressButton('.KOMReviewDetailCreateCardButton');
		});

		it('hides KOMReviewMaster', function () {
			browser.assert.elements(KOMReviewMaster, 0);
		});

		it('hides KOMReviewDetail', function () {
			browser.assert.elements('.KOMReviewDetail', 0);
		});

		it('shows KOMReviewCardForm', function () {
			browser.assert.elements('.KOMReviewCardForm', 1);
		});
	
	});

	context('cancel card', function () {
		
		before(function () {
			return browser.pressButton('.KOMReviewCardFormToolbarCancelButton');
		});

		it('hides KOMReviewMaster', function () {
			browser.assert.elements(KOMReviewMaster, 0);
		});

		it('shows KOMReviewDetail', function () {
			browser.assert.elements('.KOMReviewDetail', 1);
		});

		it('hides KOMReviewCardForm', function () {
			browser.assert.elements('.KOMReviewCardForm', 0);
		});
	
	});

	context('back', function () {
		
		before(function () {
			return browser.pressButton('.KOMReviewDetailToolbarBackButton');
		});

		it('shows KOMReviewMaster', function () {
			browser.assert.elements('.KOMReviewMaster', 1);
		});

		it('hides KOMReviewDetail', function () {
			browser.assert.elements('.KOMReviewDetail', 0);
		});

		it('hides KOMReviewCardForm', function () {
			browser.assert.elements('.KOMReviewCardForm', 0);
		});
	
	});

	context('discard', function () {
		
		before(function () {
			return browser.pressButton('.KOMReviewMasterListItem');
		});

		before(function () {
			return browser.pressButton('.KOMReviewDetailToolbarDiscardButton');
		});

		it('shows KOMReviewMaster', function () {
			browser.assert.elements('.KOMReviewMaster', 1);
		});

		it('hides KOMReviewDetail', function () {
			browser.assert.elements('.KOMReviewDetail', 0);
		});

		it('hides KOMReviewCardForm', function () {
			browser.assert.elements('.KOMReviewCardForm', 0);
		});

		it('hides KOMReviewMasterListItem', function () {
			browser.assert.elements('.KOMReviewMasterListItem', 0);
		});
	
	});

});
