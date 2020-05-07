const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	KOMBrowseInfo: '.KOMBrowseInfo',
	
	KOMBrowseInfoToolbar: '.KOMBrowseInfoToolbar',
	KOMBrowseInfoToolbarBackButton: '.KOMBrowseInfoToolbarBackButton',
	KOMBrowseInfoToolbarBackButtonImage: '.KOMBrowseInfoToolbarBackButtonImage',
	KOMBrowseInfoToolbarDiscardButton: '.KOMBrowseInfoToolbarDiscardButton',	
	KOMBrowseInfoToolbarDiscardButtonImage: '.KOMBrowseInfoToolbarDiscardButtonImage',

	KOMBrowseInfoForm: '.KOMBrowseInfoForm',

	KOMBrowseInfoFormQuestionField: '.KOMBrowseInfoFormQuestionField',
	KOMBrowseInfoFormAnswerField: '.KOMBrowseInfoFormAnswerField',
	KOMBrowseInfoFormHintField: '.KOMBrowseInfoFormHintField',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('KOMBrowseInfo_Access', function () {
	
	before(function() {
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

	context('KOMBrowseInfoItem', function() {

		before(function() {
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

		it('shows KOMBrowseInfoForm', function () {
			browser.assert.elements(KOMBrowseInfoForm, 1);
		});

		it('shows KOMBrowseInfoFormQuestionField', function () {
			browser.assert.elements(KOMBrowseInfoFormQuestionField, 1);
		});

		it('shows KOMBrowseInfoFormAnswerField', function () {
			browser.assert.elements(KOMBrowseInfoFormAnswerField, 1);
		});

		it('shows KOMBrowseInfoFormHintField', function () {
			browser.assert.elements(KOMBrowseInfoFormHintField, 1);
		});

	});

});
