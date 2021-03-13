const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMBrowseInfo_Misc', function () {

	describe('KOMBrowseInfoToolbar', function test_KOMBrowseInfoToolbar() {

		before(function () {
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

		it('classes OLSKCommonEdgeBottom', function () {
			browser.assert.hasClass(KOMBrowseInfoToolbar, 'OLSKCommonEdgeBottom');
		});

	});

	describe('KOMBrowseInfoToolbarBackButton', function test_KOMBrowseInfoToolbarBackButton() {

		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(KOMBrowseInfoToolbarBackButton, 'OLSKDecorButtonNoStyle');
		});

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(KOMBrowseInfoToolbarBackButton, 'OLSKDecorTappable');
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

	describe('KOMBrowseInfoToolbarBackButtonImage', function test_KOMBrowseInfoToolbarBackButtonImage() {

		it('sets src', function () {
			browser.assert.elements(`${ KOMBrowseInfoToolbarBackButtonImage } #_OLSKSharedBack`, 1);
		});

	});

	describe('KOMBrowseInfoToolbarDiscardButton', function test_KOMBrowseInfoToolbarDiscardButton() {

		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(KOMBrowseInfoToolbarDiscardButton, 'OLSKDecorButtonNoStyle');
		});

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(KOMBrowseInfoToolbarDiscardButton, 'OLSKDecorTappable');
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

	describe('KOMBrowseInfoToolbarDiscardButtonImage', function test_KOMBrowseInfoToolbarDiscardButtonImage() {

		it('sets src', function () {
			browser.assert.elements(`${ KOMBrowseInfoToolbarDiscardButtonImage } #_OLSKSharedDiscard`, 1);
		});

	});

	describe('KOMBrowseInfoToolbarTemplateButton', function test_KOMBrowseInfoToolbarTemplateButton() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMBrowseInfoItem: JSON.stringify({
					KOMCardTags: ['alfa'],
				}),
			});
		});

		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(KOMBrowseInfoToolbarTemplateButton, 'OLSKDecorButtonNoStyle');
		});

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(KOMBrowseInfoToolbarTemplateButton, 'OLSKDecorTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(KOMBrowseInfoToolbarTemplateButton, 'OLSKToolbarButton');
		});

		it('sets accesskey', function () {
			browser.assert.attribute(KOMBrowseInfoToolbarTemplateButton, 'accesskey', 't');
		});

		context('click', function () {

			before(function () {
				browser.assert.text('#TestKOMBrowseInfoDispatchTemplate', '0');
				browser.assert.text('#TestKOMBrowseInfoDispatchTemplateData', 'undefined');
			});

			before(function () {
				return browser.pressButton(KOMBrowseInfoToolbarTemplateButton);
			});

			it('sends KOMBrowseInfoDispatchTemplate', function () {
				browser.assert.text('#TestKOMBrowseInfoDispatchTemplate', '1');
				browser.assert.text('#TestKOMBrowseInfoDispatchTemplateData', JSON.stringify({
					KOMCardTags: ['alfa'],
				}));
			});

		});

	});

	describe('KOMBrowseInfoToolbarTemplateButtonImage', function test_KOMBrowseInfoToolbarTemplateButtonImage() {

		it('sets src', function () {
			browser.assert.elements(`${ KOMBrowseInfoToolbarTemplateButtonImage } #_OLSKSharedClone`, 1);
		});

	});

	describe('KOMBrowseInfoForm', function test_KOMBrowseInfoForm() {

		it('classes OLSKDecor', function () {
			browser.assert.hasClass(KOMBrowseInfoForm, 'OLSKDecor');
		});

		it('classes OLSKDecorBigForm', function () {
			browser.assert.hasClass(KOMBrowseInfoForm, 'OLSKDecorBigForm');
		});

	});

	describe('KOMBrowseInfoFormFrontTextField', function test_KOMBrowseInfoFormFrontTextField() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMBrowseInfoItem: JSON.stringify({
					KOMCardFrontText: 'alfa',
				}),
			});
		});

		it('classes OLSKMobileSafariRemoveDefaultInputStyle', function () {
			browser.assert.hasClass(KOMBrowseInfoFormFrontTextField, 'OLSKMobileSafariRemoveDefaultInputStyle');
		});

		it('sets type', function () {
			browser.assert.attribute(KOMBrowseInfoFormFrontTextField, 'type', 'text');
		});

		it('binds KOMCardFrontText', function () {
			browser.assert.input(KOMBrowseInfoFormFrontTextField, 'alfa');
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
				browser.fill(KOMBrowseInfoFormFrontTextField, 'bravo');
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

	describe('KOMBrowseInfoFormFrontReadButton', function test_KOMBrowseInfoFormFrontReadButton() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMBrowseInfoItem: JSON.stringify({
					KOMCardFrontText: 'alfa',
				}),
				KOMBrowseInfoDeck: JSON.stringify({
					KOMDeckFrontLanguageCode: 'en',
				}),
				KOMBrowseInfoSpeechAvailable: false,
			});
		});

		it('sets disabled', function () {
			browser.assert.attribute(KOMBrowseInfoFormFrontReadButton, 'disabled', '');
		});

		context('play', function () {

			before(function () {
				return browser.OLSKVisit(kDefaultRoute, {
					KOMBrowseInfoItem: JSON.stringify({
						KOMCardFrontText: 'alfa',
					}),
					KOMBrowseInfoDeck: JSON.stringify({
						KOMDeckFrontLanguageCode: 'en',
					}),
					KOMBrowseInfoSpeechAvailable: true,
				});
			});

			it('sets disabled', function () {
				browser.assert.attribute(KOMBrowseInfoFormFrontReadButton, 'disabled', null);
			});

			context('click', function () {

				before(function () {
					browser.assert.text('#TestKOMBrowseInfoDispatchRead', '0');
					browser.assert.text('#TestKOMBrowseInfoDispatchReadData', 'undefined');
				});

				before(function () {
					return browser.pressButton(KOMBrowseInfoFormFrontReadButton);
				});

				it('passes KOMBrowseInfoDispatchRead', function () {
					browser.assert.text('#TestKOMBrowseInfoDispatchRead', '1');
					browser.assert.text('#TestKOMBrowseInfoDispatchReadData', 'alfa,en');
				});

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

			before(function () {
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

	describe('KOMBrowseInfoFormRearTextField', function test_KOMBrowseInfoFormRearTextField() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMBrowseInfoItem: JSON.stringify({
					KOMCardRearText: 'alfa',
				}),
			});
		});

		it('classes OLSKMobileSafariRemoveDefaultInputStyle', function () {
			browser.assert.hasClass(KOMBrowseInfoFormRearTextField, 'OLSKMobileSafariRemoveDefaultInputStyle');
		});

		it('sets type', function () {
			browser.assert.attribute(KOMBrowseInfoFormRearTextField, 'type', 'text');
		});

		it('binds KOMCardRearText', function () {
			browser.assert.input(KOMBrowseInfoFormRearTextField, 'alfa');
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
				browser.fill(KOMBrowseInfoFormRearTextField, 'bravo');
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

	describe('KOMBrowseInfoFormRearReadButton', function test_KOMBrowseInfoFormRearReadButton() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMBrowseInfoItem: JSON.stringify({
					KOMCardRearText: 'alfa',
				}),
				KOMBrowseInfoDeck: JSON.stringify({
					KOMDeckRearLanguageCode: 'en',
				}),
				KOMBrowseInfoSpeechAvailable: false,
			});
		});

		it('sets disabled', function () {
			browser.assert.attribute(KOMBrowseInfoFormRearReadButton, 'disabled', '');
		});

		context('play', function () {

			before(function () {
				return browser.OLSKVisit(kDefaultRoute, {
					KOMBrowseInfoItem: JSON.stringify({
						KOMCardRearText: 'alfa',
					}),
					KOMBrowseInfoDeck: JSON.stringify({
						KOMDeckRearLanguageCode: 'en',
					}),
					KOMBrowseInfoSpeechAvailable: true,
				});
			});

			it('sets disabled', function () {
				browser.assert.attribute(KOMBrowseInfoFormRearReadButton, 'disabled', null);
			});

			context('click', function () {

				before(function () {
					browser.assert.text('#TestKOMBrowseInfoDispatchRead', '0');
					browser.assert.text('#TestKOMBrowseInfoDispatchReadData', 'undefined');
				});

				before(function () {
					return browser.pressButton(KOMBrowseInfoFormRearReadButton);
				});

				it('passes KOMBrowseInfoDispatchRead', function () {
					browser.assert.text('#TestKOMBrowseInfoDispatchRead', '1');
					browser.assert.text('#TestKOMBrowseInfoDispatchReadData', 'alfa,en');
				});

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

			before(function () {
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

		before(function () {
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

	describe('KOMBrowseInfoFormTagsField', function test_KOMBrowseInfoFormTagsField() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMBrowseInfoItem: JSON.stringify({
					KOMCardTags: ['alfa'],
				}),
				KOMBrowseInfoTagsSuggestions: JSON.stringify(['bravo']),
			});
		});

		it('binds KOMCardTags', function () {
			browser.assert.elements(`${ KOMBrowseInfoFormTagsField } .KOMBrowseInfoTagsRemoveButton`, 1);
		});

		context('add_tag', function () {

			before(function () {
				return browser.fill(`${ KOMBrowseInfoFormTagsField } .KOMBrowseInfoTagsInputField`, 'bravo');
			});

			before(function () {
				browser.assert.text('#TestKOMBrowseInfoDispatchUpdate', '0');
			});

			before(function () {
				return browser.pressButton(`${ KOMBrowseInfoFormTagsField } .KOMBrowseInfoTagsCreateButton`);
			});

			it('updates KOMBrowseInfoItem', function () {
				browser.assert.text('#TestKOMBrowseInfoItem', JSON.stringify({
					KOMCardTags: ['alfa', 'bravo'],
				}));
			});

			it('sends KOMBrowseInfoDispatchUpdate', function () {
				browser.assert.text('#TestKOMBrowseInfoDispatchUpdate', '1');
			});

		});

		context('add_duplicate', function () {

			before(function () {
				return browser.pressButton(`${ KOMBrowseInfoFormTagsField } .KOMBrowseInfoTagsSuggestButton`);
			});

			it('does nothing', function () {
				browser.assert.text('#TestKOMBrowseInfoItem', JSON.stringify({
					KOMCardTags: ['alfa', 'bravo'],
				}));
			});

			it('sends no KOMBrowseInfoDispatchUpdate', function () {
				browser.assert.text('#TestKOMBrowseInfoDispatchUpdate', '1');
			});

		});

		context('add_blank', function () {

			before(function () {
				return browser.fill(`${ KOMBrowseInfoFormTagsField } .KOMBrowseInfoTagsInputField`, ' ');
			});

			before(function () {
				return browser.pressButton(`${ KOMBrowseInfoFormTagsField } .KOMBrowseInfoTagsCreateButton`);
			});

			it('does nothing', function () {
				browser.assert.text('#TestKOMBrowseInfoItem', JSON.stringify({
					KOMCardTags: ['alfa', 'bravo'],
				}));
			});

			it('sends no KOMBrowseInfoDispatchUpdate', function () {
				browser.assert.text('#TestKOMBrowseInfoDispatchUpdate', '1');
			});

		});

		context('remove_tag', function () {

			before(function () {
				browser.assert.text('#TestKOMBrowseInfoDispatchUpdate', '1');
			});

			before(function () {
				return browser.pressButton(`${ KOMBrowseInfoFormTagsField } .KOMBrowseInfoTagsRemoveButton`);
			});

			it('updates KOMBrowseInfoItem', function () {
				browser.assert.text('#TestKOMBrowseInfoItem', JSON.stringify({
					KOMCardTags: ['bravo'],
				}));
			});

			it('sends KOMBrowseInfoDispatchUpdate', function () {
				browser.assert.text('#TestKOMBrowseInfoDispatchUpdate', '2');
			});

		});

	});

	describe('KOMBrowseInfoLauncherItemToggleRetire', function test_KOMBrowseInfoLauncherItemToggleRetire() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMBrowseInfoItem: JSON.stringify({
					KOMCardNotes: 'alfa',
				}),
			});
		});

		before(function () {
			browser.assert.text('#TestKOMBrowseInfoDispatchUpdate', '0');
		});

		before(function () {
			return browser.OLSKLauncherRun('KOMBrowseInfoLauncherItemToggleRetire');
		});

		it('updates KOMBrowseInfoItem', function () {
			browser.assert.text('#TestKOMBrowseInfoItem', JSON.stringify({
				KOMCardNotes: 'alfa',
				KOMCardIsRetired: true,
			}));
		});

		it('sends KOMBrowseInfoDispatchToggleRetire', function () {
			browser.assert.text('#TestKOMBrowseInfoDispatchUpdate', '1');
		});

		context('KOMCardIsRetired', function () {

			before(function () {
				return browser.OLSKLauncherRun('KOMBrowseInfoLauncherItemToggleRetire');
			});

			it('updates KOMBrowseInfoItem', function () {
				browser.assert.text('#TestKOMBrowseInfoItem', JSON.stringify({
					KOMCardNotes: 'alfa',
				}));
			});

			it('sends KOMBrowseInfoDispatchToggleRetire', function () {
				browser.assert.text('#TestKOMBrowseInfoDispatchUpdate', '2');
			});
		
		});

	});

	describe('KOMBrowseInfoLauncherItemDebug', function test_KOMBrowseInfoLauncherItemDebug() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMBrowseInfoItem: JSON.stringify({
					KOMCardNotes: 'alfa',
				}),
			});
		});

		before(function () {
			browser.assert.text('#TestKOMBrowseInfoDispatchDebug', '0');
			browser.assert.text('#TestKOMBrowseInfoDispatchDebugData', 'undefined');
		});

		before(function () {
			return browser.OLSKLauncherRun('KOMBrowseInfoLauncherItemDebug');
		});

		it('sends KOMBrowseInfoDispatchDebug', function () {
			browser.assert.text('#TestKOMBrowseInfoDispatchDebug', '1');
			browser.assert.text('#TestKOMBrowseInfoDispatchDebugData', JSON.stringify({
				KOMCardNotes: 'alfa',
			}));
		});

	});

});
