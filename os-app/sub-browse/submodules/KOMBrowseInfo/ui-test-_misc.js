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

		it('classes OLSKToolbar', function () {
			browser.assert.hasClass(KOMBrowseInfoToolbar, 'OLSKToolbar');
		});
	
		it('classes OLSKToolbarJustify', function () {
			browser.assert.hasClass(KOMBrowseInfoToolbar, 'OLSKToolbarJustify');
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

		it('classes OLSKVisibilityMobile', function () {
			browser.assert.hasClass(KOMBrowseInfoToolbarBackButton, 'OLSKVisibilityMobile');
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
	
	describe('KOMBrowseInfoToolbarCreateButton', function test_KOMBrowseInfoToolbarCreateButton () {
		
		it('classes OLSKLayoutButtonNoStyle', function () {
			browser.assert.hasClass(KOMBrowseInfoToolbarCreateButton, 'OLSKLayoutButtonNoStyle');
		});

		it('classes OLSKLayoutElementTappable', function () {
			browser.assert.hasClass(KOMBrowseInfoToolbarCreateButton, 'OLSKLayoutElementTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(KOMBrowseInfoToolbarCreateButton, 'OLSKToolbarButton');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestKOMBrowseInfoDispatchCreate', '0');
			});
			
			before(function () {
				return browser.pressButton(KOMBrowseInfoToolbarCreateButton);
			});

			it('sends KOMBrowseInfoDispatchCreate', function () {
				browser.assert.text('#TestKOMBrowseInfoDispatchCreate', '1');
			});

		});
	
	});

	describe('KOMBrowseInfoToolbarCreateButtonImage', function test_KOMBrowseInfoToolbarCreateButtonImage () {

		it('sets src', function () {
			browser.assert.elements(`${ KOMBrowseInfoToolbarCreateButtonImage } #_OLSKSharedCreate`, 1);
		});
	
	});
	
	describe('KOMBrowseInfoFormFrontField', function test_KOMBrowseInfoFormFrontField() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMBrowseInfoItem: JSON.stringify({
					KOMCardFrontText: 'alfa',
				}),
			});
		});

		it('classes OLSKMobileSafariRemoveDefaultInputStyle', function () {
			browser.assert.hasClass(KOMBrowseInfoFormFrontField, 'OLSKMobileSafariRemoveDefaultInputStyle');
		});

		it('sets type', function () {
			browser.assert.attribute(KOMBrowseInfoFormFrontField, 'type', 'text');
		});

		it('binds KOMCardFrontText', function () {
			browser.assert.input(KOMBrowseInfoFormFrontField, 'alfa');
		});

		context('input', function () {

			before(function () {
				browser.assert.text('#TestKOMBrowseInfoItem', JSON.stringify({
					KOMCardFrontText: 'alfa',
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
					KOMCardFrontText: 'bravo',
				}));
			});

			it('sends KOMBrowseInfoDispatchUpdate', function () {
				browser.assert.text('#TestKOMBrowseInfoDispatchUpdate', '1');
			});
		
		});

	});
	
	describe('KOMBrowseInfoFormFrontAudio', function test_KOMBrowseInfoFormFrontAudio() {
		
		context('record', function () {
			
			before(function () {
				return browser.pressButton(`${ KOMBrowseInfoFormFrontAudio } .KOMBrowseInfoAudioRecordButton`);
			});

			before(function () {
				browser.assert.text('#TestKOMBrowseInfoAudioDispatchCapture', '0');
			});

			before(function () {
				return browser.pressButton(`${ KOMBrowseInfoFormFrontAudio } .KOMBrowseInfoAudioRecordButton`);
			});

			it.skip('passes KOMBrowseInfoAudioDispatchCapture', function () {
				browser.assert.text('#TestKOMBrowseInfoAudioDispatchCapture', '1');
			});
		
		});
		
		context('play', function () {

			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					KOMBrowseInfoItem: JSON.stringify({
						KOMCardFrontText: 'alfa',
						KOMCardFrontAudio: 'bravo',
					}),
				});
			});

			before(function () {
				browser.assert.text('#TestKOMBrowseInfoAudioDispatchFetch', '0');
			});
			
			before(function () {
				return browser.pressButton(`${ KOMBrowseInfoFormFrontAudio } .KOMBrowseInfoAudioPlaybackButton`);
			});

			it('passes KOMBrowseInfoAudioDispatchFetch', function () {
				browser.assert.text('#TestKOMBrowseInfoAudioDispatchFetch', '1');
			});
		
		});
		
		context('clear', function () {

			before(function () {
				browser.assert.text('#TestKOMBrowseInfoAudioDispatchClear', '0');
			});
			
			before(function () {
				return browser.pressButton(`${ KOMBrowseInfoFormFrontAudio } .KOMBrowseInfoAudioClearButton`);
			});

			it('passes KOMBrowseInfoAudioDispatchClear', function () {
				browser.assert.text('#TestKOMBrowseInfoAudioDispatchClear', '1');
			});
		
		});

	});
	
	describe('KOMBrowseInfoFormRearField', function test_KOMBrowseInfoFormRearField() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMBrowseInfoItem: JSON.stringify({
					KOMCardRearText: 'alfa',
				}),
			});
		});

		it('classes OLSKMobileSafariRemoveDefaultInputStyle', function () {
			browser.assert.hasClass(KOMBrowseInfoFormRearField, 'OLSKMobileSafariRemoveDefaultInputStyle');
		});

		it('sets type', function () {
			browser.assert.attribute(KOMBrowseInfoFormRearField, 'type', 'text');
		});

		it('binds KOMCardRearText', function () {
			browser.assert.input(KOMBrowseInfoFormRearField, 'alfa');
		});

		context('input', function () {

			before(function () {
				browser.assert.text('#TestKOMBrowseInfoItem', JSON.stringify({
					KOMCardRearText: 'alfa',
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
					KOMCardRearText: 'bravo',
				}));
			});

			it('sends KOMBrowseInfoDispatchUpdate', function () {
				browser.assert.text('#TestKOMBrowseInfoDispatchUpdate', '1');
			});
		
		});

	});
	
	describe('KOMBrowseInfoFormRearAudio', function test_KOMBrowseInfoFormRearAudio() {
		
		context('record', function () {
			
			before(function () {
				return browser.pressButton(`${ KOMBrowseInfoFormRearAudio } .KOMBrowseInfoAudioRecordButton`);
			});

			before(function () {
				browser.assert.text('#TestKOMBrowseInfoAudioDispatchCapture', '0');
			});

			before(function () {
				return browser.pressButton(`${ KOMBrowseInfoFormRearAudio } .KOMBrowseInfoAudioRecordButton`);
			});

			it.skip('passes KOMBrowseInfoAudioDispatchCapture', function () {
				browser.assert.text('#TestKOMBrowseInfoAudioDispatchCapture', '1');
			});
		
		});
		
		context('play', function () {

			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					KOMBrowseInfoItem: JSON.stringify({
						KOMCardRearText: 'alfa',
						KOMCardRearAudio: 'bravo',
					}),
				});
			});

			before(function () {
				browser.assert.text('#TestKOMBrowseInfoAudioDispatchFetch', '0');
			});
			
			before(function () {
				return browser.pressButton(`${ KOMBrowseInfoFormRearAudio } .KOMBrowseInfoAudioPlaybackButton`);
			});

			it('passes KOMBrowseInfoAudioDispatchFetch', function () {
				browser.assert.text('#TestKOMBrowseInfoAudioDispatchFetch', '1');
			});
		
		});
		
		context('clear', function () {

			before(function () {
				browser.assert.text('#TestKOMBrowseInfoAudioDispatchClear', '0');
			});
			
			before(function () {
				return browser.pressButton(`${ KOMBrowseInfoFormRearAudio } .KOMBrowseInfoAudioClearButton`);
			});

			it('passes KOMBrowseInfoAudioDispatchClear', function () {
				browser.assert.text('#TestKOMBrowseInfoAudioDispatchClear', '1');
			});
		
		});

	});
	
	describe('KOMBrowseInfoFormNotesField', function test_KOMBrowseInfoFormNotesField() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMBrowseInfoItem: JSON.stringify({
					KOMCardNotes: 'alfa',
				}),
			});
		});

		it('classes OLSKMobileSafariRemoveDefaultInputStyle', function () {
			browser.assert.hasClass(KOMBrowseInfoFormNotesField, 'OLSKMobileSafariRemoveDefaultInputStyle');
		});

		it('sets type', function () {
			browser.assert.attribute(KOMBrowseInfoFormNotesField, 'type', 'text');
		});

		it('binds KOMCardNotes', function () {
			browser.assert.input(KOMBrowseInfoFormNotesField, 'alfa');
		});

		context('input', function () {

			before(function () {
				browser.assert.text('#TestKOMBrowseInfoItem', JSON.stringify({
					KOMCardNotes: 'alfa',
				}));
			});

			before(function () {
				browser.assert.text('#TestKOMBrowseInfoDispatchUpdate', '0');
			});

			before(function () {
				browser.fill(KOMBrowseInfoFormNotesField, 'bravo');
			});

			it('updates KOMBrowseInfoItem', function () {
				browser.assert.text('#TestKOMBrowseInfoItem', JSON.stringify({
					KOMCardNotes: 'bravo',
				}));
			});

			it('sends KOMBrowseInfoDispatchUpdate', function () {
				browser.assert.text('#TestKOMBrowseInfoDispatchUpdate', '1');
			});
		
		});

	});

});
