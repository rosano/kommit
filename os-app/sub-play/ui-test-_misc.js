const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const KOMPlayLogic = require('./ui-logic.js').default;
const KOMSpacingModel = require('../_shared/KOMSpacing/model.js').default;

const kTesting = {
	uSpacings (inputData) {
		return KOMPlayLogic._KOMPlaySortShuffle(Array.from(new Array(inputData)).map(function (e, i) {
			return {
				KOMSpacingID: (i + 1).toString() + '-forward',
				KOMSpacingChronicles: [],
				$KOMSpacingCard: {
					KOMCardID: (i + 1).toString(),
					KOMCardDeckID: 'alfa',
					KOMCardQuestion: (i + 1).toString(),
					KOMCardAnswer: 'charlie',
					KOMCardHint: 'delta',
					KOMCardCreationDate: new Date('2019-02-23T13:56:36Z'),
					KOMCardModificationDate: new Date('2019-02-23T13:56:36Z'),
				},
			};
		}));
	},
};

describe('KOMPlay_Misc', function () {

	const items = kTesting.uSpacings(5).map(function (e, i) {
		return Object.assign(e, i === 1 ? {
			KOMSpacingMultiplier: 2,
			KOMSpacingInterval: 1,
			KOMSpacingDueDate: new Date(),
		} : {})
	});

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMPlaySpacings: JSON.stringify(items),
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
			browser.assert.text(KOMPlayCardQuestion, items[0].$KOMSpacingCard.KOMCardQuestion);
		});

	});

	describe('KOMPlayFlipButton', function test_KOMPlayFlipButton () {

		it('classes OLSKLayoutButtonNoStyle', function () {
			browser.assert.hasClass(KOMPlayFlipButton, 'OLSKLayoutButtonNoStyle');
		});

	});

	describe('KOMPlayCardAnswer', function test_KOMPlayCardAnswer () {

		before(function () {
			return browser.pressButton(KOMPlayFlipButton);
		});

		it('sets text', function () {
			browser.assert.text(KOMPlayCardAnswer, items[0].$KOMSpacingCard.KOMCardAnswer)
		});

	});

	describe('KOMPlayCardHint', function test_KOMPlayCardHint () {

		it('sets text', function () {
			browser.assert.text(KOMPlayCardHint, items[0].$KOMSpacingCard.KOMCardHint)
		});

	});

	describe('KOMPlayResponseButtonAgain', function test_KOMPlayResponseButtonAgain () {

		it('classes OLSKLayoutButtonNoStyle', function () {
			browser.assert.hasClass(KOMPlayResponseButtonAgain, 'OLSKLayoutButtonNoStyle');
		});

		context('click', function () {

			before(function () {
				browser.assert.text('#TestKOMPlayStateQueueCount', '4');
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
				browser.assert.text('#TestKOMPlayStateQueueCount', '3');
			});

			it('updates KOMPlayStateWait', function () {
				browser.assert.text('#TestKOMPlayStateWaitCount', '1');
			});

			it('sends KOMPlayDispatchRespond', function () {
				browser.assert.text('#TestKOMPlayDispatchRespond', '1');
			});
			
			it('sends KOMPlayDispatchRespondData', function () {
				browser.assert.text('#TestKOMPlayDispatchRespondData', JSON.stringify(Object.keys(items[0]).concat(['KOMSpacingDrawDate', 'KOMSpacingFlipDate', 'KOMSpacingIsLearning', 'KOMSpacingDueDate'])));
			});

			it('updates KOMPlayStateCurrent', function () {
				browser.assert.text(KOMPlayCardQuestion, items[1].$KOMSpacingCard.KOMCardQuestion);
			});
		
		});

	});

	describe('KOMPlayResponseButtonHard', function test_KOMPlayResponseButtonHard () {

		before(function () {
			return browser.pressButton(KOMPlayFlipButton);
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
				browser.assert.text('#TestKOMPlayStateQueueCount', '2');
			});

			it('updates KOMPlayStateWait', function () {
				browser.assert.text('#TestKOMPlayStateWaitCount', '1');
			});

			it('sends KOMPlayDispatchRespond', function () {
				browser.assert.text('#TestKOMPlayDispatchRespond', '2');
			});
			
			it('sends KOMPlayDispatchRespondData', function () {
				browser.assert.text('#TestKOMPlayDispatchRespondData', JSON.stringify(Object.keys(items[1]).concat('KOMSpacingDrawDate', 'KOMSpacingFlipDate')));
			});

			it('updates KOMPlayStateCurrent', function () {
				browser.assert.text(KOMPlayCardQuestion, items[2].$KOMSpacingCard.KOMCardQuestion);
			});
		
		});

	});

	describe('KOMPlayResponseButtonGood', function test_KOMPlayResponseButtonGood () {

		before(function () {
			return browser.pressButton(KOMPlayFlipButton);
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
				browser.assert.text('#TestKOMPlayStateQueueCount', '1');
			});

			it('updates KOMPlayStateWait', function () {
				browser.assert.text('#TestKOMPlayStateWaitCount', '2');
			});

			it('sends KOMPlayDispatchRespond', function () {
				browser.assert.text('#TestKOMPlayDispatchRespond', '3');
			});
			
			it('sends KOMPlayDispatchRespondData', function () {
				browser.assert.text('#TestKOMPlayDispatchRespondData', JSON.stringify(Object.keys(items[2]).concat(['KOMSpacingDrawDate', 'KOMSpacingFlipDate', 'KOMSpacingIsLearning', 'KOMSpacingDueDate'])));
			});

			it('updates KOMPlayStateCurrent', function () {
				browser.assert.text(KOMPlayCardQuestion, items[3].$KOMSpacingCard.KOMCardQuestion);
			});
		
		});

	});

	describe('KOMPlayResponseButtonEasy', function test_KOMPlayResponseButtonEasy () {

		before(function () {
			return browser.pressButton(KOMPlayFlipButton);
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
				browser.assert.text('#TestKOMPlayStateQueueCount', '0');
			});

			it('updates KOMPlayStateWait', function () {
				browser.assert.text('#TestKOMPlayStateWaitCount', '2');
			});

			it('sends KOMPlayDispatchRespond', function () {
				browser.assert.text('#TestKOMPlayDispatchRespond', '4');
			});
			
			it('sends KOMPlayDispatchRespondData', function () {
				browser.assert.text('#TestKOMPlayDispatchRespondData', JSON.stringify(Object.keys(items[3]).concat(['KOMSpacingDrawDate', 'KOMSpacingFlipDate', 'KOMSpacingInterval', 'KOMSpacingMultiplier', 'KOMSpacingDueDate'])));
			});

			it('updates KOMPlayStateCurrent', function () {
				browser.assert.text(KOMPlayCardQuestion, items[4].$KOMSpacingCard.KOMCardQuestion);
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
				browser.assert.text('#TestKOMPlayStateQueueCount', '2');
			});

			it('updates KOMPlayStateWait', function () {
				browser.assert.text('#TestKOMPlayStateWaitCount', '0');
			});

			it('sends KOMPlayDispatchRespond', function () {
				browser.assert.text('#TestKOMPlayDispatchRespond', '5');
			});
			
			it('sends KOMPlayDispatchRespondData', function () {
				browser.assert.text('#TestKOMPlayDispatchRespondData', JSON.stringify(Object.keys(items[4]).concat(['KOMSpacingDrawDate', 'KOMSpacingFlipDate', 'KOMSpacingIsLearning', 'KOMSpacingDueDate'])));
			});

			it('updates KOMPlayStateCurrent', function () {
				browser.assert.text(KOMPlayCardQuestion, items[0].$KOMSpacingCard.KOMCardQuestion);
			});
		
		});

	});

	context('digits', function () {
		
		const items = kTesting.uSpacings(4);

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMPlaySpacings: JSON.stringify(items),
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
					browser.assert.text('#TestKOMPlayDispatchRespond', '0');
				});

				before(function () {
					return browser.OLSKFireKeyboardEvent(browser.window, 'Digit1');
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
					browser.assert.text('#TestKOMPlayDispatchRespondData', JSON.stringify(Object.keys(items[0]).concat(['KOMSpacingDrawDate', 'KOMSpacingFlipDate', 'KOMSpacingIsLearning', 'KOMSpacingDueDate'])));
				});

				it('updates KOMPlayStateCurrent', function () {
					browser.assert.text(KOMPlayCardQuestion, items[1].$KOMSpacingCard.KOMCardQuestion);
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
					browser.assert.text('#TestKOMPlayDispatchRespond', '1');
				});

				before(function () {
					return browser.OLSKFireKeyboardEvent(browser.window, 'Digit2');
				});

				it('updates KOMPlayStateQueue', function () {
					browser.assert.text('#TestKOMPlayStateQueueCount', '1');
				});

				it('updates KOMPlayStateWait', function () {
					browser.assert.text('#TestKOMPlayStateWaitCount', '2');
				});

				it('sends KOMPlayDispatchRespond', function () {
					browser.assert.text('#TestKOMPlayDispatchRespond', '2');
				});
				
				it('sends KOMPlayDispatchRespondData', function () {
					browser.assert.text('#TestKOMPlayDispatchRespondData', JSON.stringify(Object.keys(items[1]).concat(['KOMSpacingDrawDate', 'KOMSpacingFlipDate', 'KOMSpacingIsLearning', 'KOMSpacingDueDate'])));
				});

				it('updates KOMPlayStateCurrent', function () {
					browser.assert.text(KOMPlayCardQuestion, items[2].$KOMSpacingCard.KOMCardQuestion);
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
					browser.assert.text('#TestKOMPlayDispatchRespond', '2');
				});

				before(function () {
					return browser.OLSKFireKeyboardEvent(browser.window, 'Digit3');
				});

				it('updates KOMPlayStateQueue', function () {
					browser.assert.text('#TestKOMPlayStateQueueCount', '0');
				});

				it('updates KOMPlayStateWait', function () {
					browser.assert.text('#TestKOMPlayStateWaitCount', '3');
				});

				it('sends KOMPlayDispatchRespond', function () {
					browser.assert.text('#TestKOMPlayDispatchRespond', '3');
				});
				
				it('sends KOMPlayDispatchRespondData', function () {
					browser.assert.text('#TestKOMPlayDispatchRespondData', JSON.stringify(Object.keys(items[2]).concat(['KOMSpacingDrawDate', 'KOMSpacingFlipDate', 'KOMSpacingIsLearning', 'KOMSpacingDueDate'])));
				});

				it('updates KOMPlayStateCurrent', function () {
					browser.assert.text(KOMPlayCardQuestion, items[3].$KOMSpacingCard.KOMCardQuestion);
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
					browser.assert.text('#TestKOMPlayDispatchRespond', '3');
				});

				before(function () {
					return browser.OLSKFireKeyboardEvent(browser.window, 'Digit4');
				});

				it('updates KOMPlayStateQueue', function () {
					browser.assert.text('#TestKOMPlayStateQueueCount', '2');
				});

				it('updates KOMPlayStateWait', function () {
					browser.assert.text('#TestKOMPlayStateWaitCount', '0');
				});

				it('sends KOMPlayDispatchRespond', function () {
					browser.assert.text('#TestKOMPlayDispatchRespond', '4');
				});
				
				it('sends KOMPlayDispatchRespondData', function () {
					browser.assert.text('#TestKOMPlayDispatchRespondData', JSON.stringify(Object.keys(items[0]).concat(['KOMSpacingDrawDate', 'KOMSpacingFlipDate', 'KOMSpacingInterval', 'KOMSpacingMultiplier', 'KOMSpacingDueDate'])));
				});
			
			});

		});
	
	});

	describe('backwards', function test_backwards () {

		const items = kTesting.uSpacings(1).map(function (e, i) {
			return Object.assign(e, {
				KOMSpacingID: (i + 1).toString() + '-' + 'backward',
			})
		});

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMPlaySpacings: JSON.stringify(items),
			});
		});

		context('KOMPlayCardQuestion', function () {

			it('sets text', function () {
				browser.assert.text(KOMPlayCardQuestion, items[0].$KOMSpacingCard.KOMCardAnswer);
			});

		});

		context('KOMPlayCardAnswer', function () {

			before(function () {
				return browser.pressButton(KOMPlayFlipButton);
			});

			it('sets text', function () {
				browser.assert.text(KOMPlayCardAnswer, items[0].$KOMSpacingCard.KOMCardQuestion)
			});

		});

	});

	describe('review', function test_review () {

		const items = kTesting.uSpacings(2);

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMPlaySpacings: JSON.stringify(items),
			});
		});

		before(function () {
			return browser.pressButton(KOMPlayFlipButton);
		});

		before(function () {
			return browser.pressButton(KOMPlayResponseButtonGood);
		});

		before(function () {
			return browser.pressButton(KOMPlayFlipButton);
		});

		before(function () {
			browser.assert.text('#TestKOMPlayStateQueueCount', '0');
		});

		before(function () {
			browser.assert.text('#TestKOMPlayStateWaitCount', '1');
		});

		before(function () {
			return browser.pressButton(KOMPlayResponseButtonGood);
		});

		it('updates KOMPlayStateQueue', function () {
			browser.assert.text('#TestKOMPlayStateQueueCount', '1');
		});

		it('updates KOMPlayStateWait', function () {
			browser.assert.text('#TestKOMPlayStateWaitCount', '0');
		});

		it('updates KOMPlayStateCurrent', function () {
			browser.assert.text(KOMPlayCardQuestion, items[0].$KOMSpacingCard.KOMCardQuestion);
		});

	});

	describe('conclusion', function test_conclusion () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMPlaySpacings: JSON.stringify(kTesting.uSpacings(1)),
			});
		});

		before(function () {
			return browser.pressButton(KOMPlayFlipButton);
		});

		before(function () {
			browser.assert.text('#TestKOMPlayDispatchDone', '0');
		});

		before(function () {
			return browser.pressButton(KOMPlayResponseButtonEasy);
		});
		
		it('sends KOMPlayDispatchDone', function () {
			browser.assert.text('#TestKOMPlayDispatchDone', '1');
		});

	});

	describe('KOMSpacingDrawDate', 'KOMSpacingFlipDate', function test_KOMSpacingDrawDate () {

		const items = kTesting.uSpacings(3).map(function (e, i) {
			return !i ? e : Object.assign(e, {
				KOMSpacingDrawDate: new Date(Date.now() - (i === 1 ? 1000 * 60 * 60 * 24 * 3 : 0)),
			});
		});

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMPlaySpacings: JSON.stringify(items),
			});
		});

		context('undefined', function () {

			it('sets KOMSpacingDrawDate', function () {
				browser.assert.text('#TestKOMSpacingDrawDate', KOMPlayLogic.KOMPlayDayGrouping(new Date()));
			});
			
			it('sets no KOMChronicleDidDrawMultipleTimes', function () {
				browser.assert.text('#TestKOMChronicleDidDrawMultipleTimes', 'undefined');
			});			
		
		});

		context('past', function () {

			before(function () {
				return browser.pressButton(KOMPlayFlipButton);
			});

			before(function () {
				return browser.pressButton(KOMPlayResponseButtonEasy);
			});
			
			it('sets KOMSpacingDrawDate', function () {
				browser.assert.text('#TestKOMSpacingDrawDate', KOMPlayLogic.KOMPlayDayGrouping(new Date()));
			});
			
			it('sets no KOMChronicleDidDrawMultipleTimes', function () {
				browser.assert.text('#TestKOMChronicleDidDrawMultipleTimes', 'undefined');
			});
		
		});

		context('today', function () {

			before(function () {
				return browser.pressButton(KOMPlayFlipButton);
			});

			before(function () {
				return browser.pressButton(KOMPlayResponseButtonEasy);
			});

			it('sets KOMSpacingDrawDate', function () {
				browser.assert.text('#TestKOMSpacingDrawDate', KOMPlayLogic.KOMPlayDayGrouping(new Date()));
			});
			
			it('sets KOMChronicleDidDrawMultipleTimes', function () {
				browser.assert.text('#TestKOMChronicleDidDrawMultipleTimes', 'true');
			});
		
		});

	});

	describe('KOMSpacingFlipDate', function test_KOMSpacingFlipDate () {

		const items = kTesting.uSpacings(3).map(function (e, i) {
			return !i ? e : Object.assign(e, {
				KOMSpacingFlipDate: new Date(Date.now() - (i === 1 ? 1000 * 60 * 60 * 24 * 3 : 0)),
			});
		});

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMPlaySpacings: JSON.stringify(items),
			});
		});

		context('undefined', function () {

			before(function () {
				browser.assert.text('#TestKOMSpacingFlipDate', 'undefined');
			});

			before(function () {
				return browser.pressButton(KOMPlayFlipButton);
			});

			it('sets KOMSpacingFlipDate', function () {
				browser.assert.text('#TestKOMSpacingFlipDate', KOMPlayLogic.KOMPlayDayGrouping(new Date()));
			});
			
			it('sets no KOMChronicleDidFlipMultipleTimes', function () {
				browser.assert.text('#TestKOMChronicleDidFlipMultipleTimes', 'undefined');
			});			
		
		});

		context('past', function () {

			before(function () {
				return browser.pressButton(KOMPlayResponseButtonEasy);
			});
			
			before(function () {
				browser.assert.text('#TestKOMSpacingFlipDate', KOMPlayLogic.KOMPlayDayGrouping(items[1].KOMSpacingFlipDate));
			});

			before(function () {
				return browser.pressButton(KOMPlayFlipButton);
			});
			
			it('sets KOMSpacingFlipDate', function () {
				browser.assert.text('#TestKOMSpacingFlipDate', KOMPlayLogic.KOMPlayDayGrouping(new Date()));
			});
			
			it('sets no KOMChronicleDidFlipMultipleTimes', function () {
				browser.assert.text('#TestKOMChronicleDidFlipMultipleTimes', 'undefined');
			});
		
		});

		context('today', function () {

			before(function () {
				return browser.pressButton(KOMPlayResponseButtonEasy);
			});
			
			before(function () {
				browser.assert.text('#TestKOMSpacingFlipDate', KOMPlayLogic.KOMPlayDayGrouping(items[2].KOMSpacingFlipDate));
			});

			before(function () {
				return browser.pressButton(KOMPlayFlipButton);
			});
			
			it('sets KOMSpacingFlipDate', function () {
				browser.assert.text('#TestKOMSpacingFlipDate', KOMPlayLogic.KOMPlayDayGrouping(new Date()));
			});
			
			it('sets KOMChronicleDidFlipMultipleTimes', function () {
				browser.assert.text('#TestKOMChronicleDidFlipMultipleTimes', 'true');
			});
		
		});

	});

});
