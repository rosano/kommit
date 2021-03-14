const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const kTesting = {
	StubDeckObjectValid() {
		return {
			KOMDeckID: 'alfa',
			KOMDeckName: '',
			KOMDeckCreationDate: new Date('2019-02-23T13:56:36Z'),
			KOMDeckModificationDate: new Date('2019-02-23T13:56:36Z'),
		};
	},
};

describe('KOMBrowse_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMBrowseDeckSelected: JSON.stringify(kTesting.StubDeckObjectValid()),
		});
	});

	describe('KOMBrowseCloseButton', function test_KOMBrowseCloseButton() {

		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(KOMBrowseCloseButton, 'OLSKDecorButtonNoStyle');
		});

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(KOMBrowseCloseButton, 'OLSKDecorTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(KOMBrowseCloseButton, 'OLSKToolbarButton');
		});

		context('click', function () {

			before(function () {
				browser.assert.text('#TestKOMBrowseDispatchClose', '0');
			});

			before(function () {
				return browser.pressButton(KOMBrowseCloseButton);
			});

			it('sends KOMBrowseDispatchClose', function () {
				browser.assert.text('#TestKOMBrowseDispatchClose', '1');
			});

		});

	});

	describe('KOMBrowseCloseButtonImage', function test_KOMBrowseCloseButtonImage() {

		it('sets src', function () {
			browser.assert.elements(`${ KOMBrowseCloseButtonImage } #_OLSKSharedBack`, 1);
		});

	});

	describe('KOMBrowseCreateButton', function test_KOMBrowseCreateButton() {

		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(KOMBrowseCreateButton, 'OLSKDecorButtonNoStyle');
		});

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(KOMBrowseCreateButton, 'OLSKDecorTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(KOMBrowseCreateButton, 'OLSKToolbarButton');
		});

		it('sets accesskey', function () {
			browser.assert.attribute(KOMBrowseCreateButton, 'accesskey', 'n');
		});

	});

	describe('KOMBrowseCreateButtonImage', function test_KOMBrowseCreateButtonImage() {

		it('sets src', function () {
			browser.assert.elements(`${ KOMBrowseCreateButtonImage } #_OLSKSharedCreate`, 1);
		});

	});

	context('create', function test_create() {

		before(function () {
			browser.assert.elements('.OLSKResultsListItemSelected', 0);
		});

		before(function () {
			browser.assert.text('#TestKOMBrowseDispatchCreate', '0');
			browser.assert.text('#TestKOMBrowseDispatchCreateData', 'undefined');
		});

		before(function () {
			return browser.pressButton('.KOMBrowseCreateButton');
		});

		it('focuses KOMBrowseInfoFormFrontTextField', function () {
			browser.assert.hasFocus('.KOMBrowseInfoFormFrontTextField');
		});

		it('sends KOMBrowseDispatchCreate', function () {
			browser.assert.text('#TestKOMBrowseDispatchCreate', '1');
			browser.assert.text('#TestKOMBrowseDispatchCreateData', JSON.stringify([
				'KOMCardFrontText',
				'KOMCardRearText',
				'KOMCardNotes',
				'KOMCardID',
				'KOMCardDeckID',
				'KOMCardCreationDate',
				'KOMCardModificationDate',
			]));
		});

	});

	context('escape', function test_escape() {

		before(function () {
			browser.assert.text('#TestKOMBrowseDispatchClose', '1');
		});

		before(function () {
			browser.fill('.OLSKMasterListFilterField', 'alfa');
		});

		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
		});

		it('focuses OLSKMasterListFilterField', function () {
			browser.assert.hasFocus('.OLSKMasterListFilterField');
		});

		context('filter_empty', function () {

			before(function () {
				browser.assert.text('#TestKOMBrowseDispatchClose', '1');
			});

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			});

			it.skip('sends KOMBrowseDispatchClose', function () {
				browser.assert.text('#TestKOMBrowseDispatchClose', '2');
			});

		});

	});

	describe.skip('front_audio', function test_front_audio() {

		context('record', function () {

			before(function () {
				return browser.pressButton('.KOMBrowseInfoFormFrontAudio .KOMBrowseInfoAudioRecordButton');
			});

			before(function () {
				return browser.pressButton('.KOMBrowseInfoFormFrontAudio .KOMBrowseInfoAudioRecordButton');
			});

			it('stores audio', function () {
				browser.assert.elements('.KOMBrowseInfoFormFrontAudio .KOMBrowseInfoAudioClearButton', 1);
			});

		});

		context('clear', function () {

			before(function () {
				return browser.pressButton('.KOMBrowseInfoFormFrontAudio .KOMBrowseInfoAudioClearButton');
			});

			it('clears audio', function () {
				browser.assert.elements('.KOMBrowseInfoFormFrontAudio .KOMBrowseInfoAudioRecordButton', 1);
			});

		});

	});

	describe.skip('rear_audio', function test_rear_audio() {

		context('record', function () {

			before(function () {
				return browser.pressButton('.KOMBrowseInfoFormRearAudio .KOMBrowseInfoAudioRecordButton');
			});

			before(function () {
				return browser.pressButton('.KOMBrowseInfoFormRearAudio .KOMBrowseInfoAudioRecordButton');
			});

			it('stores audio', function () {
				browser.assert.elements('.KOMBrowseInfoFormRearAudio .KOMBrowseInfoAudioClearButton', 1);
			});

		});

		context('clear', function () {

			before(function () {
				return browser.pressButton('.KOMBrowseInfoFormRearAudio .KOMBrowseInfoAudioClearButton');
			});

			it('clears audio', function () {
				browser.assert.elements('.KOMBrowseInfoFormRearAudio .KOMBrowseInfoAudioRecordButton', 1);
			});

		});

	});

	context('discard', function test_discard() {

		before(function () {
			return browser.pressButton('.KOMBrowseCreateButton');
		});

		before(function () {
			browser.assert.text('#TestKOMBrowseDispatchDiscard', '0');
			browser.assert.text('#TestKOMBrowseDispatchDiscardData', 'undefined');
		});

		before(function () {
			return browser.pressButton('.KOMBrowseInfoToolbarDiscardButton');
		});

		it('sends KOMBrowseDispatchDiscard', function () {
			browser.assert.text('#TestKOMBrowseDispatchDiscard', '1');
			browser.assert.text('#TestKOMBrowseDispatchDiscardData', JSON.stringify([
				'KOMCardFrontText',
				'KOMCardRearText',
				'KOMCardNotes',
				'KOMCardID',
				'KOMCardDeckID',
				'KOMCardCreationDate',
				'KOMCardModificationDate',
			]));
		});

	});

	context('close', function test_close() {

		before(function () {
			browser.assert.text('#TestKOMBrowseDispatchClose', '2');
		});

		before(function () {
			return browser.pressButton('.KOMBrowseCloseButton');
		});

		it('sends KOMBrowseDispatchClose', function () {
			browser.assert.text('#TestKOMBrowseDispatchClose', '3');
		});

	});

	describe.skip('KOMBrowseInfoLauncherItemDebug', function test_KOMBrowseInfoLauncherItemDebug() {

		before(function () {
			return browser.OLSKLauncherRun('KOMBrowseInfoLauncherItemDebug');
		});

		it('sets window location', function () {
			browser.assert.evaluate('window.FakeWindowOpen', 'https://inspektor.5apps.com/inspect?path=kommit%2Fkom_decks%2F01EB9SZTJRC76TNBQRZSFQ3N6T%2Fkom_cards%2F2020-06-25%2F01EBPK47QV90N1WFJ4W9QMN0Z3%2F');
		});

	});

});
