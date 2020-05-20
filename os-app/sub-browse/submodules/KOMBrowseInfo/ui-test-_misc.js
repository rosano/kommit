const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMBrowseInfo_Misc', function () {

	describe('KOMBrowseInfo', function test_KOMBrowseInfo () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMBrowseInfoItem: JSON.stringify({}),
			});
		});

		it('classes OLSKViewportDetail', function () {
			browser.assert.hasClass(KOMBrowseInfo, 'OLSKViewportDetail');
		});

		context('OLSKMobileViewInactive', function () {

			before(function () {
				browser.assert.hasNoClass(KOMBrowseInfo, 'OLSKMobileViewInactive');
			});

			before(function () {
				browser.assert.attribute(KOMBrowseInfo, 'aria-hidden', null);
			});
			
			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					KOMBrowseInfoItem: JSON.stringify({}),
					OLSKMobileViewInactive: true,
				});
			});

			it('classes OLSKMobileViewInactive', function () {
				browser.assert.hasClass(KOMBrowseInfo, 'OLSKMobileViewInactive');
			});

			it('sets aria-hidden', function () {
				browser.assert.attribute(KOMBrowseInfo, 'aria-hidden', 'true');
			});
		
		});

	});

	describe('KOMBrowseInfoToolbar', function test_KOMBrowseInfoToolbar () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMBrowseInfoItem: JSON.stringify({}),
			});
		});
		
		it('classes OLSKMobileViewHeader', function () {
			browser.assert.hasClass(KOMBrowseInfoToolbar, 'OLSKMobileViewHeader');
		});
	
	});

	describe('OLSKToolbar', function test_OLSKToolbar () {

		it('classes OLSKToolbarJustify', function () {
			browser.assert.hasClass('.OLSKToolbar', 'OLSKToolbarJustify');
		});
	
	});

	describe('KOMBrowseInfoToolbarBackButton', function test_KOMBrowseInfoToolbarBackButton () {
		
		it('classes OLSKLayoutButtonNoStyle', function () {
			browser.assert.hasClass(KOMBrowseInfoToolbarBackButton, 'OLSKLayoutButtonNoStyle');
		});

		it('classes OLSKLayoutElementTappable', function () {
			browser.assert.hasClass(KOMBrowseInfoToolbarBackButton, 'OLSKLayoutElementTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(KOMBrowseInfoToolbarBackButton, 'OLSKToolbarButton');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestKOMBrowseInfoDispatchBack', '0');
			});
			
			before(function () {
				return browser.pressButton(KOMBrowseInfoToolbarBackButton);
			});

			it('sends KOMBrowseInfoDispatchBack', function () {
				browser.assert.text('#TestKOMBrowseInfoDispatchBack', '1');
			});
		
		});
	
	});

	describe('KOMBrowseInfoToolbarBackButtonImage', function test_KOMBrowseInfoToolbarBackButtonImage () {

		it('sets src', function () {
			browser.assert.elements(`${ KOMBrowseInfoToolbarBackButtonImage } #_OLSKSharedBack`, 1);
		});
	
	});

	describe('KOMBrowseInfoToolbarDiscardButton', function test_KOMBrowseInfoToolbarDiscardButton () {
		
		it('classes OLSKLayoutButtonNoStyle', function () {
			browser.assert.hasClass(KOMBrowseInfoToolbarDiscardButton, 'OLSKLayoutButtonNoStyle');
		});

		it('classes OLSKLayoutElementTappable', function () {
			browser.assert.hasClass(KOMBrowseInfoToolbarDiscardButton, 'OLSKLayoutElementTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(KOMBrowseInfoToolbarDiscardButton, 'OLSKToolbarButton');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestKOMBrowseInfoDispatchDiscard', '0');
				browser.assert.text('#TestKOMBrowseInfoDispatchDiscardData', 'undefined');
			});
			
			before(function () {
				return browser.pressButton(KOMBrowseInfoToolbarDiscardButton);
			});

			it('sends KOMBrowseInfoDispatchDiscard', function () {
				browser.assert.text('#TestKOMBrowseInfoDispatchDiscard', '1');
				browser.assert.text('#TestKOMBrowseInfoDispatchDiscardData', JSON.stringify({}));
			});

		});
	
	});

	describe('KOMBrowseInfoToolbarDiscardButtonImage', function test_KOMBrowseInfoToolbarDiscardButtonImage () {

		it('sets src', function () {
			browser.assert.elements(`${ KOMBrowseInfoToolbarDiscardButtonImage } #_OLSKSharedDiscard`, 1);
		});
	
	});
	
	describe('KOMBrowseInfoFormQuestionField', function test_KOMBrowseInfoFormQuestionField() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMBrowseInfoItem: JSON.stringify({
					KOMCardQuestion: 'alfa',
				}),
			});
		});

		it('sets type', function () {
			browser.assert.attribute(KOMBrowseInfoFormQuestionField, 'type', 'text');
		});

		it('binds KOMCardQuestion', function () {
			browser.assert.input(KOMBrowseInfoFormQuestionField, 'alfa');
		});

		context('input', function () {

			before(function () {
				browser.assert.text('#TestKOMBrowseInfoItem', JSON.stringify({
					KOMCardQuestion: 'alfa',
				}));
			});

			before(function () {
				browser.assert.text('#TestKOMBrowseInfoDispatchUpdate', '0');
			});

			before(function () {
				browser.fill(KOMBrowseInfoFormQuestionField, 'bravo');
			});

			it('updates KOMBrowseInfoItem', function () {
				browser.assert.text('#TestKOMBrowseInfoItem', JSON.stringify({
					KOMCardQuestion: 'bravo',
				}));
			});

			it('sends KOMBrowseInfoDispatchUpdate', function () {
				browser.assert.text('#TestKOMBrowseInfoDispatchUpdate', '1');
			});
		
		});

	});
	
	describe('KOMBrowseInfoFormAnswerField', function test_KOMBrowseInfoFormAnswerField() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMBrowseInfoItem: JSON.stringify({
					KOMCardAnswer: 'alfa',
				}),
			});
		});

		it('sets type', function () {
			browser.assert.attribute(KOMBrowseInfoFormAnswerField, 'type', 'text');
		});

		it('binds KOMCardAnswer', function () {
			browser.assert.input(KOMBrowseInfoFormAnswerField, 'alfa');
		});

		context('input', function () {

			before(function () {
				browser.assert.text('#TestKOMBrowseInfoItem', JSON.stringify({
					KOMCardAnswer: 'alfa',
				}));
			});

			before(function () {
				browser.assert.text('#TestKOMBrowseInfoDispatchUpdate', '0');
			});

			before(function () {
				browser.fill(KOMBrowseInfoFormAnswerField, 'bravo');
			});

			it('updates KOMBrowseInfoItem', function () {
				browser.assert.text('#TestKOMBrowseInfoItem', JSON.stringify({
					KOMCardAnswer: 'bravo',
				}));
			});

			it('sends KOMBrowseInfoDispatchUpdate', function () {
				browser.assert.text('#TestKOMBrowseInfoDispatchUpdate', '1');
			});
		
		});

	});
	
	describe('KOMBrowseInfoFormAnswerField', function test_KOMBrowseInfoFormAnswerField() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMBrowseInfoItem: JSON.stringify({
					KOMCardAnswer: 'alfa',
				}),
			});
		});

		it('sets type', function () {
			browser.assert.attribute(KOMBrowseInfoFormAnswerField, 'type', 'text');
		});

		it('binds KOMCardAnswer', function () {
			browser.assert.input(KOMBrowseInfoFormAnswerField, 'alfa');
		});

		context('input', function () {

			before(function () {
				browser.assert.text('#TestKOMBrowseInfoItem', JSON.stringify({
					KOMCardAnswer: 'alfa',
				}));
			});

			before(function () {
				browser.assert.text('#TestKOMBrowseInfoDispatchUpdate', '0');
			});

			before(function () {
				browser.fill(KOMBrowseInfoFormAnswerField, 'bravo');
			});

			it('updates KOMBrowseInfoItem', function () {
				browser.assert.text('#TestKOMBrowseInfoItem', JSON.stringify({
					KOMCardAnswer: 'bravo',
				}));
			});

			it('sends KOMBrowseInfoDispatchUpdate', function () {
				browser.assert.text('#TestKOMBrowseInfoDispatchUpdate', '1');
			});
		
		});

	});

});
