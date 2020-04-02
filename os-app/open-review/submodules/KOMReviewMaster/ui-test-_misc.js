import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMReviewMaster_Misc', function () {

	describe('KOMReviewMasterCreateButton', function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute);
		});
		
		it('sets class', function () {
			browser.assert.hasClass(KOMReviewMasterCreateButton, 'OLSKLayoutButtonNoStyle');
			browser.assert.hasClass(KOMReviewMasterCreateButton, 'OLSKLayoutElementTappable');
		});
		
		it('sets accesskey', function () {
			browser.assert.attribute(KOMReviewMasterCreateButton, 'accesskey', 'n');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestKOMReviewMasterDispatchCreate', '0');
			});
			
			before(function () {
				return browser.pressButton(KOMReviewMasterCreateButton);
			});

			it('sends KOMReviewMasterDispatchCreate', function () {
				browser.assert.text('#TestKOMReviewMasterDispatchCreate', '1');
			});
		
		});
	
	});

	describe('KOMReviewMasterListItem', function() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewMasterListItems: JSON.stringify([{
					KOMDeckID: 'alfa',
					KOMDeckName: 'bravo',
				}]),
			});
		});

		it('sets text', function () {
			browser.assert.text(KOMReviewMasterListItem, 'bravo');
		});


		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestKOMReviewMasterDispatchSelect', '0');
				browser.assert.text('#TestKOMReviewMasterDispatchSelectData', 'undefined');
			});
			
			before(function () {
				return browser.click(KOMReviewMasterListItem);
			});

			it('sends KOMReviewMasterDispatchSelect', function () {
				browser.assert.text('#TestKOMReviewMasterDispatchSelect', '1');
				browser.assert.text('#TestKOMReviewMasterDispatchSelectData', JSON.stringify({
					KOMDeckID: 'alfa',
					KOMDeckName: 'bravo',
				}));
			});
		
		});
		
	});

});
