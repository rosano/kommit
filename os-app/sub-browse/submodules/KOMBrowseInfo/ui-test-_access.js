const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	KOMBrowseInfo: '.KOMBrowseInfo',

	KOMBrowseInfoToolbar: '.KOMBrowseInfoToolbar',
	KOMBrowseInfoToolbarBackButton: '.KOMBrowseInfoToolbarBackButton',
	KOMBrowseInfoToolbarBackButtonImage: '.KOMBrowseInfoToolbarBackButtonImage',
	KOMBrowseInfoToolbarDiscardButton: '.KOMBrowseInfoToolbarDiscardButton',
	KOMBrowseInfoToolbarDiscardButtonImage: '.KOMBrowseInfoToolbarDiscardButtonImage',
	KOMBrowseInfoToolbarCreateButton: '.KOMBrowseInfoToolbarCreateButton',
	KOMBrowseInfoToolbarCreateButtonImage: '.KOMBrowseInfoToolbarCreateButtonImage',

	KOMBrowseInfoForm: '.KOMBrowseInfoForm',

	KOMBrowseInfoFormFrontTextField: '.KOMBrowseInfoFormFrontTextField',
	KOMBrowseInfoFormFrontReadButton: '.KOMBrowseInfoFormFrontReadButton',
	KOMBrowseInfoFormFrontAudio: '.KOMBrowseInfoFormFrontAudio .KOMBrowseInfoAudio',
	KOMBrowseInfoFormRearTextField: '.KOMBrowseInfoFormRearTextField',
	KOMBrowseInfoFormRearAudio: '.KOMBrowseInfoFormRearAudio .KOMBrowseInfoAudio',
	KOMBrowseInfoFormNotesField: '.KOMBrowseInfoFormNotesField',
	KOMBrowseInfoFormTagsField: '.KOMBrowseInfoFormTags .KOMBrowseInfoTags',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('KOMBrowseInfo_Access', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMBrowseInfoItem: null,
		});
	});

	it('shows KOMBrowseInfo', function () {
		browser.assert.elements(KOMBrowseInfo, 1);
	});

	it('shows OLSKDetailPlaceholder', function () {
		browser.assert.elements('.OLSKDetailPlaceholder', 1);
	});

	it('hides KOMBrowseInfoToolbar', function () {
		browser.assert.elements(KOMBrowseInfoToolbar, 0);
	});

	it('hides KOMBrowseInfoForm', function () {
		browser.assert.elements(KOMBrowseInfoForm, 0);
	});

	context('KOMBrowseInfoItem', function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMBrowseInfoItem: JSON.stringify({}),
			});
		});

		it('hides OLSKDetailPlaceholder', function () {
			browser.assert.elements('.OLSKDetailPlaceholder', 0);
		});

		it('shows KOMBrowseInfoToolbar', function () {
			browser.assert.elements(KOMBrowseInfoToolbar, 1);
		});

		it('shows KOMBrowseInfoToolbarBackButton', function () {
			browser.assert.elements(KOMBrowseInfoToolbarBackButton, 1);
		});

		it('shows KOMBrowseInfoToolbarBackButtonImage', function () {
			browser.assert.elements(KOMBrowseInfoToolbarBackButtonImage, 1);
		});

		it('shows KOMBrowseInfoToolbarDiscardButton', function () {
			browser.assert.elements(KOMBrowseInfoToolbarDiscardButton, 1);
		});

		it('shows KOMBrowseInfoToolbarDiscardButtonImage', function () {
			browser.assert.elements(KOMBrowseInfoToolbarDiscardButtonImage, 1);
		});

		it('shows KOMBrowseInfoToolbarCreateButton', function () {
			browser.assert.elements(KOMBrowseInfoToolbarCreateButton, 1);
		});

		it('shows KOMBrowseInfoToolbarCreateButtonImage', function () {
			browser.assert.elements(KOMBrowseInfoToolbarCreateButtonImage, 1);
		});

		it('shows KOMBrowseInfoForm', function () {
			browser.assert.elements(KOMBrowseInfoForm, 1);
		});

		it('shows KOMBrowseInfoFormFrontTextField', function () {
			browser.assert.elements(KOMBrowseInfoFormFrontTextField, 1);
		});

		it('shows KOMBrowseInfoFormFrontReadButton', function () {
			browser.assert.elements(KOMBrowseInfoFormFrontReadButton, 1);
		});

		it('shows KOMBrowseInfoFormFrontAudio', function () {
			browser.assert.elements(KOMBrowseInfoFormFrontAudio, 1);
		});

		it('shows KOMBrowseInfoFormRearTextField', function () {
			browser.assert.elements(KOMBrowseInfoFormRearTextField, 1);
		});

		it('shows KOMBrowseInfoFormRearAudio', function () {
			browser.assert.elements(KOMBrowseInfoFormRearAudio, 1);
		});

		it('shows KOMBrowseInfoFormNotesField', function () {
			browser.assert.elements(KOMBrowseInfoFormNotesField, 1);
		});

		it('shows KOMBrowseInfoFormTagsField', function () {
			browser.assert.elements(KOMBrowseInfoFormTagsField, 1);
		});

	});

});
