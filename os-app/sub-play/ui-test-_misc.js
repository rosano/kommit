const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const kTesting = {
	StubCardObjectValid() {
		return {
			KOMCardID: 'alfa',
			KOMCardQuestion: 'bravo',
			KOMCardAnswer: 'charlie',
			KOMCardHint: 'delta',
			KOMCardCreationDate: new Date('2019-02-23T13:56:36Z'),
			KOMCardModificationDate: new Date('2019-02-23T13:56:36Z'),
		};
	},
};

describe('KOMPlay_Misc', function () {	

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMPlayCards: JSON.stringify([kTesting.StubCardObjectValid()]),
		});
	});

	describe('KOMPlay', function () {
		
		it('classes OLSKViewport', function () {
			browser.assert.hasClass(KOMPlay, 'OLSKViewport');
		});

	});

	describe('KOMPlayToolbarBackButton', function () {
		
		it('classes OLSKLayoutButtonNoStyle', function () {
			browser.assert.hasClass(KOMPlayToolbarBackButton, 'OLSKLayoutButtonNoStyle');
		});

		it('classes OLSKLayoutElementTappable', function () {
			browser.assert.hasClass(KOMPlayToolbarBackButton, 'OLSKLayoutElementTappable');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestKOMPlayDispatchBack', '0');
			});
			
			before(function () {
				return browser.pressButton(KOMPlayToolbarBackButton);
			});

			it('sends KOMPlayDispatchBack', function () {
				browser.assert.text('#TestKOMPlayDispatchBack', '1');
			});
		
		});
	
	});

	describe('KOMPlayToolbarDoneButton', function () {
		
		it('classes OLSKLayoutButtonNoStyle', function () {
			browser.assert.hasClass(KOMPlayToolbarDoneButton, 'OLSKLayoutButtonNoStyle');
		});

		it('classes OLSKLayoutElementTappable', function () {
			browser.assert.hasClass(KOMPlayToolbarDoneButton, 'OLSKLayoutElementTappable');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestKOMPlayDispatchDone', '0');
			});
			
			before(function () {
				return browser.pressButton(KOMPlayToolbarDoneButton);
			});

			it('sends KOMPlayDispatchDone', function () {
				browser.assert.text('#TestKOMPlayDispatchDone', '1');
			});

		});
	
	});

	describe('KOMPlayCardQuestion', function () {

		it('sets text', function () {
			browser.assert.text(KOMPlayCardQuestion, kTesting.StubCardObjectValid().KOMCardQuestion)
		});

	});

	describe('KOMPlayCardAnswer', function () {

		before(function () {
			browser.click(KOMPlayCard);
		});

		it('sets text', function () {
			browser.assert.text(KOMPlayCardAnswer, kTesting.StubCardObjectValid().KOMCardAnswer)
		});

	});

	describe('KOMPlayCardHint', function () {

		it('sets text', function () {
			browser.assert.text(KOMPlayCardHint, kTesting.StubCardObjectValid().KOMCardHint)
		});

	});

});
