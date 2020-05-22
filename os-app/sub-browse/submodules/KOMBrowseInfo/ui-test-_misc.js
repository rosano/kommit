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
	
	describe('KOMBrowseInfoFormFrontField', function test_KOMBrowseInfoFormFrontField() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMBrowseInfoItem: JSON.stringify({
					KOMCardFront: 'alfa',
				}),
			});
		});

		it('classes OLSKMobileSafariRemoveDefaultInputStyle', function () {
			browser.assert.hasClass(KOMBrowseInfoFormFrontField, 'OLSKMobileSafariRemoveDefaultInputStyle');
		});

		it('sets type', function () {
			browser.assert.attribute(KOMBrowseInfoFormFrontField, 'type', 'text');
		});

		it('binds KOMCardFront', function () {
			browser.assert.input(KOMBrowseInfoFormFrontField, 'alfa');
		});

		context('input', function () {

			before(function () {
				browser.assert.text('#TestKOMBrowseInfoItem', JSON.stringify({
					KOMCardFront: 'alfa',
				}));
			});

			before(function () {
				browser.assert.text('#TestKOMBrowseInfoDispatchUpdate', '0');
			});

			before(function () {
				browser.fill(KOMBrowseInfoFormFrontField, 'bravo');
			});

			it('updates KOMBrowseInfoItem', function () {
				browser.assert.text('#TestKOMBrowseInfoItem', JSON.stringify({
					KOMCardFront: 'bravo',
				}));
			});

			it('sends KOMBrowseInfoDispatchUpdate', function () {
				browser.assert.text('#TestKOMBrowseInfoDispatchUpdate', '1');
			});
		
		});

	});
	
	describe('KOMBrowseInfoFormRearField', function test_KOMBrowseInfoFormRearField() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMBrowseInfoItem: JSON.stringify({
					KOMCardRear: 'alfa',
				}),
			});
		});

		it('classes OLSKMobileSafariRemoveDefaultInputStyle', function () {
			browser.assert.hasClass(KOMBrowseInfoFormRearField, 'OLSKMobileSafariRemoveDefaultInputStyle');
		});

		it('sets type', function () {
			browser.assert.attribute(KOMBrowseInfoFormRearField, 'type', 'text');
		});

		it('binds KOMCardRear', function () {
			browser.assert.input(KOMBrowseInfoFormRearField, 'alfa');
		});

		context('input', function () {

			before(function () {
				browser.assert.text('#TestKOMBrowseInfoItem', JSON.stringify({
					KOMCardRear: 'alfa',
				}));
			});

			before(function () {
				browser.assert.text('#TestKOMBrowseInfoDispatchUpdate', '0');
			});

			before(function () {
				browser.fill(KOMBrowseInfoFormRearField, 'bravo');
			});

			it('updates KOMBrowseInfoItem', function () {
				browser.assert.text('#TestKOMBrowseInfoItem', JSON.stringify({
					KOMCardRear: 'bravo',
				}));
			});

			it('sends KOMBrowseInfoDispatchUpdate', function () {
				browser.assert.text('#TestKOMBrowseInfoDispatchUpdate', '1');
			});
		
		});

	});
	
	describe('KOMBrowseInfoFormHintField', function test_KOMBrowseInfoFormHintField() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMBrowseInfoItem: JSON.stringify({
					KOMCardHint: 'alfa',
				}),
			});
		});

		it('classes OLSKMobileSafariRemoveDefaultInputStyle', function () {
			browser.assert.hasClass(KOMBrowseInfoFormHintField, 'OLSKMobileSafariRemoveDefaultInputStyle');
		});

		it('sets type', function () {
			browser.assert.attribute(KOMBrowseInfoFormHintField, 'type', 'text');
		});

		it('binds KOMCardHint', function () {
			browser.assert.input(KOMBrowseInfoFormHintField, 'alfa');
		});

		context('input', function () {

			before(function () {
				browser.assert.text('#TestKOMBrowseInfoItem', JSON.stringify({
					KOMCardHint: 'alfa',
				}));
			});

			before(function () {
				browser.assert.text('#TestKOMBrowseInfoDispatchUpdate', '0');
			});

			before(function () {
				browser.fill(KOMBrowseInfoFormHintField, 'bravo');
			});

			it('updates KOMBrowseInfoItem', function () {
				browser.assert.text('#TestKOMBrowseInfoItem', JSON.stringify({
					KOMCardHint: 'bravo',
				}));
			});

			it('sends KOMBrowseInfoDispatchUpdate', function () {
				browser.assert.text('#TestKOMBrowseInfoDispatchUpdate', '1');
			});
		
		});

	});

});
