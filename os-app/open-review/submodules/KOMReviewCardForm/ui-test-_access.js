const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	KOMReviewCardForm: '.KOMReviewCardForm',

	KOMReviewCardFormToolbar: '.KOMReviewCardFormToolbar',
	KOMReviewCardFormToolbarCancelButton: '.KOMReviewCardFormToolbarCancelButton',
	KOMReviewCardFormToolbarSaveButton: '.KOMReviewCardFormToolbarSaveButton',
	
	KOMReviewCardFormHeading: '.KOMReviewCardFormHeading',
	KOMReviewCardFormQuestionField: '.KOMReviewCardFormQuestionField',
	KOMReviewCardFormAnswerField: '.KOMReviewCardFormAnswerField',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('KOMReviewCardForm_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMReviewCardFormItem: JSON.stringify({}),
		});
	});

	it('shows KOMReviewCardForm', function () {
		browser.assert.elements(KOMReviewCardForm, 1);
	});

	it('shows OLSKToolbar', function () {
		browser.assert.elements('.OLSKToolbar', 1);
	});

	it('shows KOMReviewCardFormToolbar', function () {
		browser.assert.elements(KOMReviewCardFormToolbar, 1);
	});

	it('shows KOMReviewCardFormToolbarCancelButton', function () {
		browser.assert.elements(KOMReviewCardFormToolbarCancelButton, 1);
	});

	it('shows KOMReviewCardFormToolbarSaveButton', function () {
		browser.assert.elements(KOMReviewCardFormToolbarSaveButton, 1);
	});

	it('shows KOMReviewCardFormHeading', function () {
		browser.assert.elements(KOMReviewCardFormHeading, 1);
	});

	it('shows KOMReviewCardFormQuestionField', function () {
		browser.assert.elements(KOMReviewCardFormQuestionField, 1);
	});

	it('shows KOMReviewCardFormAnswerField', function () {
		browser.assert.elements(KOMReviewCardFormAnswerField, 1);
	});

});
