const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const KOMPlayLogic = require('./ui-logic.js').default;
const KOMSpacingModel = require('../_shared/KOMSpacing/model.js').default;

const kTesting = {
	uSpacings: KOMPlayLogic._KOMPlaySortShuffle(Array.from(new Array(10)).map(function (e, i) {
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
		} : {}, i === 9 ? {
			KOMSpacingID: (i + 1).toString() + '-' + 'backward',
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

	describe('KOMPlayCard', function test_KOMPlayCard () {

		it('classes OLSKLayoutElementTappable', function () {
			browser.assert.hasClass(KOMPlayCard, 'OLSKLayoutElementTappable');
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
			return browser.click(KOMPlayCard);
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
				browser.assert.text('#TestKOMPlayStateQueueCount', '9');
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
				return browser.pressButton(KOMPlayResponseButtonAgain);
			});
			
			it('updates KOMPlayStateQueue', function () {
				browser.assert.text('#TestKOMPlayStateQueueCount', '8');
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
				browser.assert.text('#TestKOMPlayStateQueueCount', '7');
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
				browser.assert.text('#TestKOMPlayStateQueueCount', '6');
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
				browser.assert.text('#TestKOMPlayStateQueueCount', '5');
			});

			it('updates KOMPlayStateWait', function () {
				browser.assert.text('#TestKOMPlayStateWaitCount', '2');
			});

			it('sends KOMPlayDispatchRespond', function () {
				browser.assert.text('#TestKOMPlayDispatchRespond', '4');
			});
			
			it('sends KOMPlayDispatchRespondData', function () {
				browser.assert.text('#TestKOMPlayDispatchRespondData', JSON.stringify(Object.keys(kTesting.uSpacings[3]).concat(['KOMSpacingInterval', 'KOMSpacingMultiplier', 'KOMSpacingDueDate'])));
			});

			it('updates KOMPlayStateCurrent', function () {
				browser.assert.text(KOMPlayCardQuestion, kTesting.uSpacings[4].$KOMSpacingCard.KOMCardQuestion);
			});
		
		});

	});

	describe('Space', function test_Space () {

		before(function () {
			browser.assert.elements(KOMPlayResponseButtonAgain, 0);
		});

		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Space');
		});

		it('flips card', function () {
			browser.assert.elements(KOMPlayResponseButtonAgain, 1);
		});

		context('flipped', function () {
			
			before(function () {
				browser.assert.text('#TestKOMPlayDispatchRespond', '4');
			});

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Space');
			});

			it('updates KOMPlayStateQueue', function () {
				browser.assert.text('#TestKOMPlayStateQueueCount', '4');
			});

			it('updates KOMPlayStateWait', function () {
				browser.assert.text('#TestKOMPlayStateWaitCount', '3');
			});

			it('sends KOMPlayDispatchRespond', function () {
				browser.assert.text('#TestKOMPlayDispatchRespond', '5');
			});
			
			it('sends KOMPlayDispatchRespondData', function () {
				browser.assert.text('#TestKOMPlayDispatchRespondData', JSON.stringify(Object.keys(kTesting.uSpacings[4]).concat(['KOMSpacingIsLearning', 'KOMSpacingDueDate'])));
			});

			it('updates KOMPlayStateCurrent', function () {
				browser.assert.text(KOMPlayCardQuestion, kTesting.uSpacings[5].$KOMSpacingCard.KOMCardQuestion);
			});
		
		});

	});

	describe('Digit1', function test_Digit1 () {

		before(function () {
			browser.assert.elements(KOMPlayResponseButtonAgain, 0);
		});

		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Digit1');
		});

		it('does nothing', function () {
			browser.assert.elements(KOMPlayResponseButtonAgain, 0);
		});

		context('flipped', function () {
			
			before(function () {
				return browser.pressButton(KOMPlayFlipButton);
			});

			before(function () {
				browser.assert.text('#TestKOMPlayDispatchRespond', '5');
			});

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Digit1');
			});

			it('updates KOMPlayStateQueue', function () {
				browser.assert.text('#TestKOMPlayStateQueueCount', '3');
			});

			it('updates KOMPlayStateWait', function () {
				browser.assert.text('#TestKOMPlayStateWaitCount', '4');
			});

			it('sends KOMPlayDispatchRespond', function () {
				browser.assert.text('#TestKOMPlayDispatchRespond', '6');
			});
			
			it('sends KOMPlayDispatchRespondData', function () {
				browser.assert.text('#TestKOMPlayDispatchRespondData', JSON.stringify(Object.keys(kTesting.uSpacings[5]).concat(['KOMSpacingIsLearning', 'KOMSpacingDueDate'])));
			});

			it('updates KOMPlayStateCurrent', function () {
				browser.assert.text(KOMPlayCardQuestion, kTesting.uSpacings[6].$KOMSpacingCard.KOMCardQuestion);
			});
		
		});

	});

	describe('Digit2', function test_Digit2 () {

		before(function () {
			browser.assert.elements(KOMPlayResponseButtonAgain, 0);
		});

		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Digit2');
		});

		it('does nothing', function () {
			browser.assert.elements(KOMPlayResponseButtonAgain, 0);
		});

		context('flipped', function () {
			
			before(function () {
				return browser.pressButton(KOMPlayFlipButton);
			});

			before(function () {
				browser.assert.text('#TestKOMPlayDispatchRespond', '6');
			});

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Digit2');
			});

			it('updates KOMPlayStateQueue', function () {
				browser.assert.text('#TestKOMPlayStateQueueCount', '2');
			});

			it('updates KOMPlayStateWait', function () {
				browser.assert.text('#TestKOMPlayStateWaitCount', '5');
			});

			it('sends KOMPlayDispatchRespond', function () {
				browser.assert.text('#TestKOMPlayDispatchRespond', '7');
			});
			
			it('sends KOMPlayDispatchRespondData', function () {
				browser.assert.text('#TestKOMPlayDispatchRespondData', JSON.stringify(Object.keys(kTesting.uSpacings[6]).concat(['KOMSpacingIsLearning', 'KOMSpacingDueDate'])));
			});

			it('updates KOMPlayStateCurrent', function () {
				browser.assert.text(KOMPlayCardQuestion, kTesting.uSpacings[7].$KOMSpacingCard.KOMCardQuestion);
			});
		
		});

	});

	describe('Digit3', function test_Digit3 () {

		before(function () {
			browser.assert.elements(KOMPlayResponseButtonAgain, 0);
		});

		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Digit3');
		});

		it('does nothing', function () {
			browser.assert.elements(KOMPlayResponseButtonAgain, 0);
		});

		context('flipped', function () {
			
			before(function () {
				return browser.pressButton(KOMPlayFlipButton);
			});

			before(function () {
				browser.assert.text('#TestKOMPlayDispatchRespond', '7');
			});

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Digit3');
			});

			it('updates KOMPlayStateQueue', function () {
				browser.assert.text('#TestKOMPlayStateQueueCount', '1');
			});

			it('updates KOMPlayStateWait', function () {
				browser.assert.text('#TestKOMPlayStateWaitCount', '6');
			});

			it('sends KOMPlayDispatchRespond', function () {
				browser.assert.text('#TestKOMPlayDispatchRespond', '8');
			});
			
			it('sends KOMPlayDispatchRespondData', function () {
				browser.assert.text('#TestKOMPlayDispatchRespondData', JSON.stringify(Object.keys(kTesting.uSpacings[6]).concat(['KOMSpacingIsLearning', 'KOMSpacingDueDate'])));
			});

			it('updates KOMPlayStateCurrent', function () {
				browser.assert.text(KOMPlayCardQuestion, kTesting.uSpacings[8].$KOMSpacingCard.KOMCardQuestion);
			});
		
		});

	});

	describe('Digit4', function test_Digit4 () {

		before(function () {
			browser.assert.elements(KOMPlayResponseButtonAgain, 0);
		});

		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Digit4');
		});

		it('does nothing', function () {
			browser.assert.elements(KOMPlayResponseButtonAgain, 0);
		});

		context('flipped', function () {
			
			before(function () {
				return browser.pressButton(KOMPlayFlipButton);
			});

			before(function () {
				browser.assert.text('#TestKOMPlayDispatchRespond', '8');
			});

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Digit4');
			});

			it('updates KOMPlayStateQueue', function () {
				browser.assert.text('#TestKOMPlayStateQueueCount', '0');
			});

			it('updates KOMPlayStateWait', function () {
				browser.assert.text('#TestKOMPlayStateWaitCount', '6');
			});

			it('sends KOMPlayDispatchRespond', function () {
				browser.assert.text('#TestKOMPlayDispatchRespond', '9');
			});
			
			it('sends KOMPlayDispatchRespondData', function () {
				browser.assert.text('#TestKOMPlayDispatchRespondData', JSON.stringify(Object.keys(kTesting.uSpacings[8]).concat(['KOMSpacingInterval', 'KOMSpacingMultiplier', 'KOMSpacingDueDate'])));
			});
		
		});

	});

	describe('backwards', function test_backwards () {

		context('KOMPlayCardQuestion', function () {

			it('sets text', function () {
				browser.assert.text(KOMPlayCardQuestion, kTesting.uSpacings[9].$KOMSpacingCard.KOMCardAnswer);
			});

		});

		context('KOMPlayCardAnswer', function () {

			before(function () {
				return browser.click(KOMPlayCard);
			});

			it('sets text', function () {
				browser.assert.text(KOMPlayCardAnswer, kTesting.uSpacings[9].$KOMSpacingCard.KOMCardQuestion)
			});

			after(function () {
				return browser.click(KOMPlayCard);
			});

		});

	});

	describe('review', function test_review () {

		before(function () {
			browser.assert.text('#TestKOMPlayStateQueueCount', '6');
		});

		before(function () {
			browser.assert.text('#TestKOMPlayStateWaitCount', '0');
		});

		before(function () {
			return browser.click(KOMPlayCard);
		});

		before(function () {
			return browser.pressButton(KOMPlayResponseButtonEasy);
		});

		it('updates KOMPlayStateQueue', function () {
			browser.assert.text('#TestKOMPlayStateQueueCount', '5');
		});

		it('updates KOMPlayStateWait', function () {
			browser.assert.text('#TestKOMPlayStateWaitCount', '0');
		});

		it('updates KOMPlayStateCurrent', function () {
			browser.assert.text(KOMPlayCardQuestion, kTesting.uSpacings[2].$KOMSpacingCard.KOMCardQuestion);
		});

	});

});
