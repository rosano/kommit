const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const uItem = function () {
	return {
		KOMCardQuestion: 'alfa',
		KOMCardAnswer: 'bravo',
	};
};

describe('KOMReviewCardForm_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMReviewCardFormItem: JSON.stringify(uItem()),
		});
	});

	describe('OLSKToolbar', function test_OLSKToolbar () {

		it('classes OLSKToolbarJustify', function () {
			browser.assert.hasClass('.OLSKToolbar', 'OLSKToolbarJustify');
		});
	
	});

	describe('KOMReviewCardFormToolbarCancelButton', function test_KOMReviewCardFormToolbarCancelButton () {
		
		it('classes OLSKLayoutButtonNoStyle', function () {
			browser.assert.hasClass(KOMReviewCardFormToolbarCancelButton, 'OLSKLayoutButtonNoStyle');
		});

		it('classes OLSKLayoutElementTappable', function () {
			browser.assert.hasClass(KOMReviewCardFormToolbarCancelButton, 'OLSKLayoutElementTappable');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestKOMReviewCardFormDispatchCancel', '0');
			});
			
			before(function () {
				return browser.pressButton(KOMReviewCardFormToolbarCancelButton);
			});

			it('sends KOMReviewCardFormDispatchCancel', function () {
				browser.assert.text('#TestKOMReviewCardFormDispatchCancel', '1');
			});
		
		});
	
	});

	describe('KOMReviewCardFormQuestionField', function test_KOMReviewCardFormQuestionField () {
		
		it('binds KOMCardQuestion', function () {
			browser.assert.input(KOMReviewCardFormQuestionField, uItem().KOMCardQuestion);
		});
		
		it('sets type', function () {
			browser.assert.attribute(KOMReviewCardFormQuestionField, 'type', 'text');
		});
	
	});

	describe('KOMReviewCardFormAnswerField', function test_KOMReviewCardFormAnswerField () {


		it('binds KOMCardAnswer', function () {
			browser.assert.input(KOMReviewCardFormAnswerField, uItem().KOMCardAnswer);
		});
		
		it('sets type', function () {
			browser.assert.attribute(KOMReviewCardFormAnswerField, 'type', 'text');
		});
	
	});

	describe('KOMReviewCardFormToolbarSaveButton', function test_KOMReviewCardFormToolbarSaveButton () {
		
		it('classes OLSKLayoutButtonNoStyle', function () {
			browser.assert.hasClass(KOMReviewCardFormToolbarSaveButton, 'OLSKLayoutButtonNoStyle');
		});

		it('classes OLSKLayoutElementTappable', function () {
			browser.assert.hasClass(KOMReviewCardFormToolbarSaveButton, 'OLSKLayoutElementTappable');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestKOMReviewCardFormDispatchSave', '0');
				browser.assert.text('#TestKOMReviewCardFormDispatchSaveData', 'undefined');
			});
			
			before(function () {
				return browser.fill(KOMReviewCardFormQuestionField, 'charlie');
			});
			
			before(function () {
				return browser.pressButton(KOMReviewCardFormToolbarSaveButton);
			});

			it('sends KOMReviewCardFormDispatchSave', function () {
				browser.assert.text('#TestKOMReviewCardFormDispatchSave', '1');
			});

			it('sends KOMReviewCardFormDispatchSaveData', function () {
				browser.assert.text('#TestKOMReviewCardFormDispatchSaveData', JSON.stringify(Object.assign(uItem(), {
					KOMCardQuestion: 'charlie',
				})));
			});
		
		});
	
	});

});
