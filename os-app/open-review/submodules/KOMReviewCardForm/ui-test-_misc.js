const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMReviewCardForm_Misc', function () {

	describe('KOMReviewCardForm', function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute);
		});

	});

	describe('OLSKToolbar', function () {

		it('classes OLSKToolbarJustify', function () {
			browser.assert.hasClass('.OLSKToolbar', 'OLSKToolbarJustify');
		});
	
	});

	describe('KOMReviewCardFormToolbarCancelButton', function () {
		
		it('classes OLSKLayoutButtonNoStyle', function () {
			browser.assert.hasClass(KOMReviewCardFormToolbarCancelButton, 'OLSKLayoutButtonNoStyle');
		});

		it('classes OLSKLayoutElementTappable', function () {
			browser.assert.hasClass(KOMReviewCardFormToolbarCancelButton, 'OLSKLayoutElementTappable');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestKOMReviewCardFormDispatchCancel', '0');
			});
			
			before(function () {
				return browser.pressButton(KOMReviewCardFormToolbarCancelButton);
			});

			it('sends KOMReviewCardFormDispatchCancel', function () {
				browser.assert.text('#TestKOMReviewCardFormDispatchCancel', '1');
			});
		
		});
	
	});

	describe('KOMReviewCardFormToolbarSaveButton', function () {
		
		it('classes OLSKLayoutButtonNoStyle', function () {
			browser.assert.hasClass(KOMReviewCardFormToolbarSaveButton, 'OLSKLayoutButtonNoStyle');
		});

		it('classes OLSKLayoutElementTappable', function () {
			browser.assert.hasClass(KOMReviewCardFormToolbarSaveButton, 'OLSKLayoutElementTappable');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestKOMReviewCardFormDispatchSave', '0');
				browser.assert.text('#TestKOMReviewCardFormDispatchSaveData', 'undefined');
			});
			
			before(function () {
				return browser.pressButton(KOMReviewCardFormToolbarSaveButton);
			});

			it('sends KOMReviewCardFormDispatchSave', function () {
				browser.assert.text('#TestKOMReviewCardFormDispatchSave', '1');
			});

			it('sends KOMReviewCardFormDispatchSaveData', function () {
				browser.assert.text('#TestKOMReviewCardFormDispatchSaveData', JSON.stringify({}));
			});
		
		});
	
	});

});
