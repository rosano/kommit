import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMReviewDetail_Misc', function () {

	const uItem = function () {
		return {
			KOMDeckName: 'alfa',
		};
	};

	describe('KOMReviewDetail', function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewDetailItem: JSON.stringify(uItem()),
			});
		});

	});

	describe('OLSKToolbar', function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewDetailItem: JSON.stringify(uItem()),
			});
		});
		
		it('sets class', function () {
			browser.assert.hasClass('.OLSKToolbar', 'OLSKToolbarJustify');
		});
	
	});

	describe('KOMReviewDetailToolbarBackButton', function () {
		
		it('sets class', function () {
			browser.assert.hasClass(KOMReviewDetailToolbarBackButton, 'OLSKLayoutButtonNoStyle');
			browser.assert.hasClass(KOMReviewDetailToolbarBackButton, 'OLSKLayoutElementTappable');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestKOMReviewDetailDispatchBack', '0');
			});
			
			before(function () {
				return browser.pressButton(KOMReviewDetailToolbarBackButton);
			});

			it('sends KOMReviewDetailDispatchBack', function () {
				browser.assert.text('#TestKOMReviewDetailDispatchBack', '1');
			});
		
		});
	
	});

	describe('KOMReviewDetailToolbarDiscardButton', function () {
		
		it('sets class', function () {
			browser.assert.hasClass(KOMReviewDetailToolbarDiscardButton, 'OLSKLayoutButtonNoStyle');
			browser.assert.hasClass(KOMReviewDetailToolbarDiscardButton, 'OLSKLayoutElementTappable');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestKOMReviewDetailDispatchDiscard', '0');
				browser.assert.text('#TestKOMReviewDetailDispatchDiscardData', 'undefined');
			});
			
			before(function () {
				return browser.pressButton(KOMReviewDetailToolbarDiscardButton);
			});

			it('sends KOMReviewDetailDispatchDiscard', function () {
				browser.assert.text('#TestKOMReviewDetailDispatchDiscard', '1');
			});

			it('sends KOMReviewDetailDispatchDiscardData', function () {
				browser.assert.text('#TestKOMReviewDetailDispatchDiscardData', JSON.stringify(uItem()));
			});
		
		});
	
	});
	
	describe('KOMReviewDetailHeading', function() {
		
		it('binds KOMDeckName', function () {
			browser.assert.text(KOMReviewDetailHeading, uItem().KOMDeckName);
		});

	});

});
