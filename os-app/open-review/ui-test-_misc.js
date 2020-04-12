import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMReview_Misc', function () {	

	context('create', function () {
		
		before(function () {
			return browser.OLSKPrompt(function () {
				return browser.pressButton('.KOMReviewMasterCreateButton');
			}, function (dialog) {
				dialog.response = 'alfa';
				
				return dialog;
			});
		});

		it('sets KOMDeckName', function () {
			browser.assert.text('.KOMReviewMasterListItem', 'alfa');
		});
	
	});

	context('rename', function () {
		
		before(function () {
			return browser.pressButton('.KOMReviewMasterListItem');
		});

		before(function () {
			return browser.OLSKPrompt(function () {
				return browser.pressButton('.KOMReviewDetailToolbarRenameButton');
			}, function (dialog) {
				dialog.response = 'bravo';
				
				return dialog;
			});
		});

		before(function () {
			return browser.pressButton('.KOMReviewDetailToolbarBackButton');
		});

		it('sets KOMDeckName', function () {
			browser.assert.text('.KOMReviewMasterListItem', 'bravo');
		});
	
	});

	describe('KOMReviewStorageWidget', function test_KOMReviewStorageWidget () {
		
		it('classes KOMReviewStorageWidgetHidden', function () {
			browser.assert.hasClass(KOMReviewStorageWidget, 'KOMReviewStorageWidgetHidden');
		});

		context('click OLSKAppToolbarStorageButton', function () {
			
			before(function () {
				return browser.pressButton('.OLSKAppToolbarStorageButton');
			});
			
			it('classes KOMReviewStorageWidgetHidden', function () {
				browser.assert.hasNoClass(KOMReviewStorageWidget, 'KOMReviewStorageWidgetHidden');
			});
		
		});
	
	});

	describe('KOMReviewViewportFooter', function test_KOMReviewViewportFooter () {

		it('sets class', function () {
			browser.assert.hasClass(KOMReviewViewportFooter, 'OLSKMobileViewFooter');
		});

	});

	describe('OLSKAppToolbarLauncherButton', function test_OLSKAppToolbarLauncherButton () {

		before(function () {
			return browser.pressButton('.OLSKAppToolbarLauncherButton');
		});

		it('runs Launchlet', function() {
			browser.assert.elements('.LCHLauncherFilterPrompt', 1);
		});

	});

});
