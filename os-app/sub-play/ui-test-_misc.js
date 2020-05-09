const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const KOMPlayLogic = require('./ui-logic.js').default;
const KOMSpacingModel = require('../_shared/KOMSpacing/model.js').default;

const kTesting = {
	uSpacings: KOMPlayLogic._KOMPlaySortShuffle(Array.from(new Array(4)).map(function (e, i) {
		return {
			KOMSpacingID: (i + 1).toString() + '-forward',
			$KOMSpacingCard: {
				KOMCardID: (i + 1).toString(),
				KOMCardQuestion: (i + 1).toString(),
				KOMCardAnswer: 'charlie',
				KOMCardHint: 'delta',
				KOMCardCreationDate: new Date('2019-02-23T13:56:36Z'),
				KOMCardModificationDate: new Date('2019-02-23T13:56:36Z'),
			},
		};
	})).map(function (e, i) {
		return Object.assign(e, i === 1 ? {
			KOMSpacingMultiplier: 2,
			KOMSpacingInterval: 1,
			KOMSpacingDueDate: new Date(),
		} : {})
	}),
};

describe('KOMPlay_Misc', function () {	

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMPlaySpacings: JSON.stringify(kTesting.uSpacings),
		});
	});

	describe('KOMPlayToolbarBackButton', function test_KOMPlayToolbarBackButton () {
		
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

	describe('KOMPlayToolbarDoneButton', function test_KOMPlayToolbarDoneButton () {
		
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

	describe('KOMPlayCardQuestion', function test_KOMPlayCardQuestion () {

		it('sets text', function () {
			browser.assert.text(KOMPlayCardQuestion, kTesting.uSpacings[0].$KOMSpacingCard.KOMCardQuestion);
		});

	});

	describe('KOMPlayFlipButton', function test_KOMPlayFlipButton () {

		it('classes OLSKLayoutButtonNoStyle', function () {
			browser.assert.hasClass(KOMPlayFlipButton, 'OLSKLayoutButtonNoStyle');
		});

	});

	describe('KOMPlayCardAnswer', function test_KOMPlayCardAnswer () {

		before(function () {
			browser.click(KOMPlayCard);
		});

		it('sets text', function () {
			browser.assert.text(KOMPlayCardAnswer, kTesting.uSpacings[0].$KOMSpacingCard.KOMCardAnswer)
		});

	});

	describe('KOMPlayCardHint', function test_KOMPlayCardHint () {

		it('sets text', function () {
			browser.assert.text(KOMPlayCardHint, kTesting.uSpacings[0].$KOMSpacingCard.KOMCardHint)
		});

	});

	describe('KOMPlayResponseButtonAgain', function test_KOMPlayResponseButtonAgain () {

		it('classes OLSKLayoutButtonNoStyle', function () {
			browser.assert.hasClass(KOMPlayResponseButtonAgain, 'OLSKLayoutButtonNoStyle');
		});

		context('click', function () {

			before(function () {
				browser.assert.text('#TestKOMPlayStateQueueCount', '3');
			});

			before(function () {
				browser.assert.text('#TestKOMPlayStateWaitCount', '0');
			});

			before(function () {
				browser.assert.text('#TestKOMPlayDispatchRespond', '0');
			});
			
			before(function () {
				browser.assert.text('#TestKOMPlayDispatchRespondData', 'undefined');
			});

			before(function () {
				browser.pressButton(KOMPlayResponseButtonAgain);
			});
			
			it('updates KOMPlayStateQueue', function () {
				browser.assert.text('#TestKOMPlayStateQueueCount', '2');
			});

			it('updates KOMPlayStateWait', function () {
				browser.assert.text('#TestKOMPlayStateWaitCount', '1');
			});

			it('sends KOMPlayDispatchRespond', function () {
				browser.assert.text('#TestKOMPlayDispatchRespond', '1');
			});
			
			it('sends KOMPlayDispatchRespondData', function () {
				browser.assert.text('#TestKOMPlayDispatchRespondData', JSON.stringify(Object.keys(kTesting.uSpacings[0]).concat(['KOMSpacingIsLearning', 'KOMSpacingDueDate'])));
			});

			it('updates KOMPlayStateCurrent', function () {
				browser.assert.text(KOMPlayCardQuestion, kTesting.uSpacings[1].$KOMSpacingCard.KOMCardQuestion);
			});
		
		});

	});

	describe('KOMPlayResponseButtonHard', function test_KOMPlayResponseButtonHard () {

		before(function () {
			return browser.click(KOMPlayCard);
		});

		it('classes OLSKLayoutButtonNoStyle', function () {
			browser.assert.hasClass(KOMPlayResponseButtonHard, 'OLSKLayoutButtonNoStyle');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestKOMPlayDispatchRespond', '1');
			});

			before(function () {
				return browser.pressButton(KOMPlayResponseButtonHard);
			});

			it('updates KOMPlayStateQueue', function () {
				browser.assert.text('#TestKOMPlayStateQueueCount', '1');
			});

			it('updates KOMPlayStateWait', function () {
				browser.assert.text('#TestKOMPlayStateWaitCount', '1');
			});

			it('sends KOMPlayDispatchRespond', function () {
				browser.assert.text('#TestKOMPlayDispatchRespond', '2');
			});
			
			it('sends KOMPlayDispatchRespondData', function () {
				browser.assert.text('#TestKOMPlayDispatchRespondData', JSON.stringify(Object.keys(kTesting.uSpacings[1])));
			});

			it('updates KOMPlayStateCurrent', function () {
				browser.assert.text(KOMPlayCardQuestion, kTesting.uSpacings[2].$KOMSpacingCard.KOMCardQuestion);
			});
		
		});

	});

	describe('KOMPlayResponseButtonGood', function test_KOMPlayResponseButtonGood () {

		before(function () {
			return browser.click(KOMPlayCard);
		});

		it('classes OLSKLayoutButtonNoStyle', function () {
			browser.assert.hasClass(KOMPlayResponseButtonGood, 'OLSKLayoutButtonNoStyle');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestKOMPlayDispatchRespond', '2');
			});

			before(function () {
				return browser.pressButton(KOMPlayResponseButtonGood);
			});

			it('updates KOMPlayStateQueue', function () {
				browser.assert.text('#TestKOMPlayStateQueueCount', '0');
			});

			it('updates KOMPlayStateWait', function () {
				browser.assert.text('#TestKOMPlayStateWaitCount', '2');
			});

			it('sends KOMPlayDispatchRespond', function () {
				browser.assert.text('#TestKOMPlayDispatchRespond', '3');
			});
			
			it('sends KOMPlayDispatchRespondData', function () {
				browser.assert.text('#TestKOMPlayDispatchRespondData', JSON.stringify(Object.keys(kTesting.uSpacings[2]).concat(['KOMSpacingIsLearning', 'KOMSpacingDueDate'])));
			});

			it('updates KOMPlayStateCurrent', function () {
				browser.assert.text(KOMPlayCardQuestion, kTesting.uSpacings[3].$KOMSpacingCard.KOMCardQuestion);
			});
		
		});

	});

	describe('KOMPlayResponseButtonEasy', function test_KOMPlayResponseButtonEasy () {

		before(function () {
			return browser.click(KOMPlayCard);
		});

		it('classes OLSKLayoutButtonNoStyle', function () {
			browser.assert.hasClass(KOMPlayResponseButtonEasy, 'OLSKLayoutButtonNoStyle');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestKOMPlayDispatchRespond', '3');
			});

			before(function () {
				return browser.pressButton(KOMPlayResponseButtonEasy);
			});

			it('updates KOMPlayStateQueue', function () {
				browser.assert.text('#TestKOMPlayStateQueueCount', '1');
			});

			it('updates KOMPlayStateWait', function () {
				browser.assert.text('#TestKOMPlayStateWaitCount', '0');
			});

			it('sends KOMPlayDispatchRespond', function () {
				browser.assert.text('#TestKOMPlayDispatchRespond', '4');
			});
			
			it('sends KOMPlayDispatchRespondData', function () {
				browser.assert.text('#TestKOMPlayDispatchRespondData', JSON.stringify(Object.keys(kTesting.uSpacings[3]).concat(['KOMSpacingInterval', 'KOMSpacingMultiplier', 'KOMSpacingDueDate'])));
			});

			it('updates KOMPlayStateCurrent', function () {
				browser.assert.text(KOMPlayCardQuestion, kTesting.uSpacings[0].$KOMSpacingCard.KOMCardQuestion);
			});
		
		});

	});

	describe('review', function test_review () {

		before(function () {
			return browser.click(KOMPlayCard);
		});

		before(function () {
			return browser.pressButton(KOMPlayResponseButtonEasy);
		});

		it('updates KOMPlayStateQueue', function () {
			browser.assert.text('#TestKOMPlayStateQueueCount', '0');
		});

		it('updates KOMPlayStateWait', function () {
			browser.assert.text('#TestKOMPlayStateWaitCount', '0');
		});

		it('updates KOMPlayStateCurrent', function () {
			browser.assert.text(KOMPlayCardQuestion, kTesting.uSpacings[2].$KOMSpacingCard.KOMCardQuestion);
		});

	});

});
