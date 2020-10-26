const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const KOMPlayLogic = require('./ui-logic.js').default;
const KOMSpacingModel = require('../_shared/KOMSpacing/model.js').default;
const KOMSharedLogic = require('../_shared/KOMSharedLogic/main.js').default;

const kTesting = {
	uSpacings(inputData) {
		return KOMPlayLogic._KOMPlaySortShuffle(Array.from(new Array(inputData)).map(function (e, i) {
			return {
				KOMSpacingID: (i + 1).toString() + '-forward',
				KOMSpacingChronicles: [],
				$KOMSpacingCard: {
					KOMCardID: (i + 1).toString(),
					KOMCardDeckID: 'alfa',
					KOMCardFrontText: (i + 1).toString(),
					KOMCardRearText: 'charlie',
					KOMCardNotes: 'delta',
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
		} : {});
	});

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMPlaySpacings: JSON.stringify(items),
			KOMPlayDeck: JSON.stringify(StubDeckObjectValid()),
		});
	});

	describe('KOMPlayToolbar', function test_KOMPlayToolbar() {

		it('classes OLSKToolbar', function () {
			browser.assert.hasClass(KOMPlayToolbar, 'OLSKToolbar');
		});

		it('classes OLSKToolbarJustify', function () {
			browser.assert.hasClass(KOMPlayToolbar, 'OLSKToolbarJustify');
		});

	});

	describe('KOMPlayToolbarDoneButton', function test_KOMPlayToolbarDoneButton() {

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

		context('Escape', function () {

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			});

			it('sends KOMPlayDispatchDone', function () {
				browser.assert.text('#TestKOMPlayDispatchDone', '2');
			});

		});

	});

	describe('KOMPlayCard', function test_KOMPlayCard() {

		it('classes OLSKLayoutElementTappable', function () {
			browser.assert.hasClass(KOMPlayCard, 'OLSKLayoutElementTappable');
		});

	});

	describe('KOMPlayCardQuestion', function test_KOMPlayCardQuestion() {

		it('sets text', function () {
			browser.assert.text(KOMPlayCardQuestion, items[0].$KOMSpacingCard.KOMCardFrontText);
		});

	});

	describe('KOMPlayFlipButton', function test_KOMPlayFlipButton() {

		it('classes OLSKLayoutButtonNoStyle', function () {
			browser.assert.hasClass(KOMPlayFlipButton, 'OLSKLayoutButtonNoStyle');
		});

		it('classes OLSKLayoutElementTappable', function () {
			browser.assert.hasClass(KOMPlayFlipButton, 'OLSKLayoutElementTappable');
		});

	});

	describe('KOMPlayCardAnswer', function test_KOMPlayCardAnswer() {

		before(function () {
			return browser.pressButton(KOMPlayFlipButton);
		});

		it('sets text', function () {
			browser.assert.text(KOMPlayCardAnswer, items[0].$KOMSpacingCard.KOMCardRearText);
		});

	});

	describe('KOMPlayCardNotes', function test_KOMPlayCardNotes() {

		it('sets text', function () {
			browser.assert.text(KOMPlayCardNotes, items[0].$KOMSpacingCard.KOMCardNotes);
		});

	});

	describe('KOMPlayResponseButtonAgain', function test_KOMPlayResponseButtonAgain() {

		it('classes OLSKLayoutButtonNoStyle', function () {
			browser.assert.hasClass(KOMPlayResponseButtonAgain, 'OLSKLayoutButtonNoStyle');
		});

		it('classes OLSKLayoutElementTappable', function () {
			browser.assert.hasClass(KOMPlayResponseButtonAgain, 'OLSKLayoutElementTappable');
		});

		context('click', function () {

			before(function () {
				browser.assert.text('#TestKOMPlayStateQueueCount', '4');
			});

			before(function () {
				browser.assert.text('#TestKOMPlayStateWaitCount', '0');
			});

			before(function () {
				browser.assert.text('#TestKOMPlayDispatchUpdate', '2');
				// browser.assert.text('#TestKOMPlayDispatchUpdateData', 'undefined');
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

			it('sends KOMPlayDispatchUpdate', function () {
				browser.assert.text('#TestKOMPlayDispatchUpdate', '4');
				// browser.assert.text('#TestKOMPlayDispatchUpdateData', JSON.stringify(Object.keys(items[0]).concat(['KOMSpacingDrawDate', 'KOMSpacingFlipDate', 'KOMSpacingIsLearning', 'KOMSpacingDueDate'])));
			});

			it('updates KOMPlayStateCurrent', function () {
				browser.assert.text(KOMPlayCardQuestion, items[1].$KOMSpacingCard.KOMCardFrontText);
			});

		});

	});

	describe('KOMPlayResponseButtonHard', function test_KOMPlayResponseButtonHard() {

		before(function () {
			return browser.pressButton(KOMPlayFlipButton);
		});

		it('classes OLSKLayoutButtonNoStyle', function () {
			browser.assert.hasClass(KOMPlayResponseButtonHard, 'OLSKLayoutButtonNoStyle');
		});

		it('classes OLSKLayoutElementTappable', function () {
			browser.assert.hasClass(KOMPlayResponseButtonHard, 'OLSKLayoutElementTappable');
		});

		context('click', function () {

			before(function () {
				browser.assert.text('#TestKOMPlayDispatchUpdate', '5');
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

			it('sends KOMPlayDispatchUpdate', function () {
				browser.assert.text('#TestKOMPlayDispatchUpdate', '7');
				// browser.assert.text('#TestKOMPlayDispatchUpdateData', JSON.stringify(Object.keys(items[1]).concat('KOMSpacingDrawDate', 'KOMSpacingFlipDate')));
			});

			it('updates KOMPlayStateCurrent', function () {
				browser.assert.text(KOMPlayCardQuestion, items[2].$KOMSpacingCard.KOMCardFrontText);
			});

		});

	});

	describe('KOMPlayResponseButtonGood', function test_KOMPlayResponseButtonGood() {

		before(function () {
			return browser.pressButton(KOMPlayFlipButton);
		});

		it('classes OLSKLayoutButtonNoStyle', function () {
			browser.assert.hasClass(KOMPlayResponseButtonGood, 'OLSKLayoutButtonNoStyle');
		});

		it('classes OLSKLayoutElementTappable', function () {
			browser.assert.hasClass(KOMPlayResponseButtonGood, 'OLSKLayoutElementTappable');
		});

		context('click', function () {

			before(function () {
				browser.assert.text('#TestKOMPlayDispatchUpdate', '8');
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

			it('sends KOMPlayDispatchUpdate', function () {
				browser.assert.text('#TestKOMPlayDispatchUpdate', '10');
				// 	browser.assert.text('#TestKOMPlayDispatchUpdateData', JSON.stringify(Object.keys(items[2]).concat(['KOMSpacingDrawDate', 'KOMSpacingFlipDate', 'KOMSpacingIsLearning', 'KOMSpacingDueDate'])));
			});

			it('updates KOMPlayStateCurrent', function () {
				browser.assert.text(KOMPlayCardQuestion, items[3].$KOMSpacingCard.KOMCardFrontText);
			});

		});

	});

	describe('KOMPlayResponseButtonEasy', function test_KOMPlayResponseButtonEasy() {

		before(function () {
			return browser.pressButton(KOMPlayFlipButton);
		});

		it('classes OLSKLayoutButtonNoStyle', function () {
			browser.assert.hasClass(KOMPlayResponseButtonEasy, 'OLSKLayoutButtonNoStyle');
		});

		it('classes OLSKLayoutElementTappable', function () {
			browser.assert.hasClass(KOMPlayResponseButtonEasy, 'OLSKLayoutElementTappable');
		});

		context('click', function () {

			before(function () {
				browser.assert.text('#TestKOMPlayDispatchUpdate', '11');
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

			it('sends KOMPlayDispatchUpdate', function () {
				browser.assert.text('#TestKOMPlayDispatchUpdate', '13');
				// browser.assert.text('#TestKOMPlayDispatchUpdateData', JSON.stringify(Object.keys(items[3]).concat(['KOMSpacingDrawDate', 'KOMSpacingFlipDate', 'KOMSpacingInterval', 'KOMSpacingMultiplier', 'KOMSpacingDueDate'])));
			});

			it('updates KOMPlayStateCurrent', function () {
				browser.assert.text(KOMPlayCardQuestion, items[4].$KOMSpacingCard.KOMCardFrontText);
			});

		});

	});

	describe('Space', function test_Space() {

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
				browser.assert.text('#TestKOMPlayDispatchUpdate', '14');
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

			it('sends KOMPlayDispatchUpdate', function () {
				browser.assert.text('#TestKOMPlayDispatchUpdate', '16');
				// browser.assert.text('#TestKOMPlayDispatchUpdateData', JSON.stringify(Object.keys(items[4]).concat(['KOMSpacingDrawDate', 'KOMSpacingFlipDate', 'KOMSpacingIsLearning', 'KOMSpacingDueDate'])));
			});

			it('updates KOMPlayStateCurrent', function () {
				browser.assert.text(KOMPlayCardQuestion, items[0].$KOMSpacingCard.KOMCardFrontText);
			});

		});

	});

	context('KOMPlaySimplifiedResponseButtons', function test_KOMPlaySimplifiedResponseButtons () {

		const items = kTesting.uSpacings(4);

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMPlaySpacings: JSON.stringify(items),
				KOMPlayDeck: JSON.stringify(StubDeckObjectValid()),
				KOMPlaySimplifiedResponseButtons: true,
			});
		});
		
		describe('KOMPlayResponseButtonReset', function test_KOMPlayResponseButtonReset() {

			before(function () {
				return browser.pressButton(KOMPlayFlipButton);
			});

			it('classes OLSKLayoutButtonNoStyle', function () {
				browser.assert.hasClass(KOMPlayResponseButtonReset, 'OLSKLayoutButtonNoStyle');
			});

			it('classes OLSKLayoutElementTappable', function () {
				browser.assert.hasClass(KOMPlayResponseButtonReset, 'OLSKLayoutElementTappable');
			});

			context('click', function () {

				before(function () {
					browser.assert.text('#TestKOMPlayStateQueueCount', '3');
				});

				before(function () {
					browser.assert.text('#TestKOMPlayStateWaitCount', '0');
				});

				before(function () {
					browser.assert.text('#TestKOMPlayDispatchUpdate', '2');
					// browser.assert.text('#TestKOMPlayDispatchUpdateData', 'undefined');
				});

				before(function () {
					return browser.pressButton(KOMPlayResponseButtonReset);
				});

				it('updates KOMPlayStateQueue', function () {
					browser.assert.text('#TestKOMPlayStateQueueCount', '2');
				});

				it('updates KOMPlayStateWait', function () {
					browser.assert.text('#TestKOMPlayStateWaitCount', '1');
				});

				it('sends KOMPlayDispatchUpdate', function () {
					browser.assert.text('#TestKOMPlayDispatchUpdate', '4');
					// browser.assert.text('#TestKOMPlayDispatchUpdateData', JSON.stringify(Object.keys(items[0]).concat(['KOMSpacingDrawDate', 'KOMSpacingFlipDate', 'KOMSpacingIsLearning', 'KOMSpacingDueDate'])));
				});

				it('updates KOMPlayStateCurrent', function () {
					browser.assert.text(KOMPlayCardQuestion, items[1].$KOMSpacingCard.KOMCardFrontText);
				});

			});

		});

		describe('KOMPlayResponseButtonNext', function test_KOMPlayResponseButtonNext() {

			before(function () {
				return browser.pressButton(KOMPlayFlipButton);
			});

			it('classes OLSKLayoutButtonNoStyle', function () {
				browser.assert.hasClass(KOMPlayResponseButtonNext, 'OLSKLayoutButtonNoStyle');
			});

			it('classes OLSKLayoutElementTappable', function () {
				browser.assert.hasClass(KOMPlayResponseButtonNext, 'OLSKLayoutElementTappable');
			});

			context('click', function () {

				before(function () {
					browser.assert.text('#TestKOMPlayDispatchUpdate', '5');
				});

				before(function () {
					return browser.pressButton(KOMPlayResponseButtonNext);
				});

				it('updates KOMPlayStateQueue', function () {
					browser.assert.text('#TestKOMPlayStateQueueCount', '1');
				});

				it('updates KOMPlayStateWait', function () {
					browser.assert.text('#TestKOMPlayStateWaitCount', '2');
				});

				it('sends KOMPlayDispatchUpdate', function () {
					browser.assert.text('#TestKOMPlayDispatchUpdate', '7');
					// browser.assert.text('#TestKOMPlayDispatchUpdateData', JSON.stringify(Object.keys(items[1]).concat('KOMSpacingDrawDate', 'KOMSpacingFlipDate')));
				});

				it('updates KOMPlayStateCurrent', function () {
					browser.assert.text(KOMPlayCardQuestion, items[2].$KOMSpacingCard.KOMCardFrontText);
				});

			});

		});

	});

	context('digits', function () {

		const items = kTesting.uSpacings(4);

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMPlaySpacings: JSON.stringify(items),
				KOMPlayDeck: JSON.stringify(StubDeckObjectValid()),
			});
		});

		describe('Digit1', function test_Digit1() {

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
					browser.assert.text('#TestKOMPlayDispatchUpdate', '2');
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

				it('sends KOMPlayDispatchUpdate', function () {
					browser.assert.text('#TestKOMPlayDispatchUpdate', '4');
					// browser.assert.text('#TestKOMPlayDispatchUpdateData', JSON.stringify(Object.keys(items[0]).concat(['KOMSpacingDrawDate', 'KOMSpacingFlipDate', 'KOMSpacingIsLearning', 'KOMSpacingDueDate'])));
				});

				it('updates KOMPlayStateCurrent', function () {
					browser.assert.text(KOMPlayCardQuestion, items[1].$KOMSpacingCard.KOMCardFrontText);
				});

			});

		});

		describe('Digit2', function test_Digit2() {

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
					browser.assert.text('#TestKOMPlayDispatchUpdate', '5');
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

				it('sends KOMPlayDispatchUpdate', function () {
					browser.assert.text('#TestKOMPlayDispatchUpdate', '7');
					// browser.assert.text('#TestKOMPlayDispatchUpdateData', JSON.stringify(Object.keys(items[1]).concat(['KOMSpacingDrawDate', 'KOMSpacingFlipDate', 'KOMSpacingIsLearning', 'KOMSpacingDueDate'])));
				});

				it('updates KOMPlayStateCurrent', function () {
					browser.assert.text(KOMPlayCardQuestion, items[2].$KOMSpacingCard.KOMCardFrontText);
				});

			});

		});

		describe('Digit3', function test_Digit3() {

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
					browser.assert.text('#TestKOMPlayDispatchUpdate', '8');
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

				it('sends KOMPlayDispatchUpdate', function () {
					browser.assert.text('#TestKOMPlayDispatchUpdate', '10');
					// browser.assert.text('#TestKOMPlayDispatchUpdateData', JSON.stringify(Object.keys(items[2]).concat(['KOMSpacingDrawDate', 'KOMSpacingFlipDate', 'KOMSpacingIsLearning', 'KOMSpacingDueDate'])));
				});

				it('updates KOMPlayStateCurrent', function () {
					browser.assert.text(KOMPlayCardQuestion, items[3].$KOMSpacingCard.KOMCardFrontText);
				});

			});

		});

		describe('Digit4', function test_Digit4() {

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
					browser.assert.text('#TestKOMPlayDispatchUpdate', '11');
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

				it('sends KOMPlayDispatchUpdate', function () {
					browser.assert.text('#TestKOMPlayDispatchUpdate', '13');
					// browser.assert.text('#TestKOMPlayDispatchUpdateData', JSON.stringify(Object.keys(items[0]).concat(['KOMSpacingDrawDate', 'KOMSpacingFlipDate', 'KOMSpacingInterval', 'KOMSpacingMultiplier', 'KOMSpacingDueDate'])));
				});

			});

		});

		describe('ShortcutX', function test_ShortcutX() {

			const items = kTesting.uSpacings(4);

			before(function () {
				return browser.OLSKVisit(kDefaultRoute, {
					KOMPlaySpacings: JSON.stringify(items),
					KOMPlayDeck: JSON.stringify(StubDeckObjectValid()),
				});
			});

			before(function () {
				browser.assert.elements(KOMPlayResponseButtonAgain, 0);
			});

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'x');
			});

			it('does nothing', function () {
				browser.assert.elements(KOMPlayResponseButtonAgain, 0);
			});

			context('flipped', function () {

				before(function () {
					return browser.pressButton(KOMPlayFlipButton);
				});

				before(function () {
					browser.assert.text('#TestKOMPlayDispatchUpdate', '2');
				});

				before(function () {
					return browser.OLSKFireKeyboardEvent(browser.window, 'x');
				});

				it('updates KOMPlayStateQueue', function () {
					browser.assert.text('#TestKOMPlayStateQueueCount', '2');
				});

				it('updates KOMPlayStateWait', function () {
					browser.assert.text('#TestKOMPlayStateWaitCount', '1');
				});

				it('sends KOMPlayDispatchUpdate', function () {
					browser.assert.text('#TestKOMPlayDispatchUpdate', '4');
					// browser.assert.text('#TestKOMPlayDispatchUpdateData', JSON.stringify(Object.keys(items[0]).concat(['KOMSpacingDrawDate', 'KOMSpacingFlipDate', 'KOMSpacingIsLearning', 'KOMSpacingDueDate'])));
				});

				it('updates KOMPlayStateCurrent', function () {
					browser.assert.text(KOMPlayCardQuestion, items[1].$KOMSpacingCard.KOMCardFrontText);
				});

			});

		});

	});

	describe('backwards', function test_backwards() {

		const items = kTesting.uSpacings(1).map(function (e, i) {
			return Object.assign(e, {
				KOMSpacingID: (i + 1).toString() + '-' + 'backward',
			});
		});

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMPlaySpacings: JSON.stringify(items),
				KOMPlayDeck: JSON.stringify(StubDeckObjectValid()),
			});
		});

		context('KOMPlayCardQuestion', function () {

			it('sets text', function () {
				browser.assert.text(KOMPlayCardQuestion, items[0].$KOMSpacingCard.KOMCardRearText);
			});

		});

		context('KOMPlayCardAnswer', function () {

			before(function () {
				return browser.pressButton(KOMPlayFlipButton);
			});

			it('sets text', function () {
				browser.assert.text(KOMPlayCardAnswer, items[0].$KOMSpacingCard.KOMCardFrontText);
			});

		});

	});

	describe('review', function test_review() {

		const items = kTesting.uSpacings(2);

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMPlaySpacings: JSON.stringify(items),
				KOMPlayDeck: JSON.stringify(StubDeckObjectValid()),
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
			browser.assert.text(KOMPlayCardQuestion, items[0].$KOMSpacingCard.KOMCardFrontText);
		});

	});

	describe('conclusion', function test_conclusion() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMPlaySpacings: JSON.stringify(kTesting.uSpacings(1)),
				KOMPlayDeck: JSON.stringify(StubDeckObjectValid()),
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

	describe('KOMSpacingDrawDate', function test_KOMSpacingDrawDate() {

		const items = kTesting.uSpacings(2);

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMPlaySpacings: JSON.stringify(items),
				KOMPlayDeck: JSON.stringify(StubDeckObjectValid()),
			});
		});

		// before(function () {
		// 	browser.assert.text('#TestKOMPlayDispatchUpdate', '0');
		// 	browser.assert.text('#TestKOMPlayDispatchUpdateData', 'undefined');
		// });

		it('sets KOMSpacingDrawDate', function () {
			browser.assert.text('#TestKOMSpacingDrawDate', KOMSharedLogic.KOMSharedGroupingDay(new Date()));
		});

		it('sends KOMPlayDispatchUpdate', function () {
			browser.assert.text('#TestKOMPlayDispatchUpdate', '1');
			browser.assert.text('#TestKOMPlayDispatchUpdateData', JSON.stringify(Object.keys(items[0]).concat(['KOMSpacingDrawDate'])));
		});

	});

	describe('KOMSpacingFlipDate', function test_KOMSpacingFlipDate() {

		before(function () {
			browser.assert.text('#TestKOMSpacingFlipDate', 'undefined');
		});

		before(function () {
			browser.assert.text('#TestKOMPlayDispatchUpdate', '1');
			// browser.assert.text('#TestKOMPlayDispatchUpdateData', 'undefined');
		});

		before(function () {
			return browser.pressButton(KOMPlayFlipButton);
		});

		it('sets KOMSpacingFlipDate', function () {
			browser.assert.text('#TestKOMSpacingFlipDate', KOMSharedLogic.KOMSharedGroupingDay(new Date()));
		});

		it('sets no KOMChronicleDidFlipMultipleTimes', function () {
			browser.assert.text('#TestKOMChronicleDidFlipMultipleTimes', 'undefined');
		});

		it('sends KOMPlayDispatchUpdate', function () {
			browser.assert.text('#TestKOMPlayDispatchUpdate', '2');
			browser.assert.text('#TestKOMPlayDispatchUpdateData', JSON.stringify(Object.keys(items[0]).concat(['KOMSpacingDrawDate', 'KOMSpacingFlipDate'])));
		});

	});

	describe('KOMPlayToolbarUndoButton', function test_KOMPlayToolbarUndoButton() {

		const items = kTesting.uSpacings(3);

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMPlaySpacings: JSON.stringify(items),
				KOMPlayDeck: JSON.stringify(StubDeckObjectValid()),
			});
		});

		it('classes OLSKLayoutButtonNoStyle', function () {
			browser.assert.hasClass(KOMPlayToolbarUndoButton, 'OLSKLayoutButtonNoStyle');
		});

		it('classes OLSKLayoutElementTappable', function () {
			browser.assert.hasClass(KOMPlayToolbarUndoButton, 'OLSKLayoutElementTappable');
		});

		it('sets disabled', function () {
			browser.assert.attribute(KOMPlayToolbarUndoButton, 'disabled', '');
		});

		context('graduate', function () {

			before(function () {
				return browser.pressButton(KOMPlayFlipButton);
			});

			before(function () {
				return browser.pressButton(KOMPlayResponseButtonEasy);
			});

			it('sets disabled', function () {
				browser.assert.attribute(KOMPlayToolbarUndoButton, 'disabled', null);
			});

			context('click', function () {

				before(function () {
					browser.assert.text('#TestKOMPlayStateQueueCount', '1');
				});

				before(function () {
					browser.assert.text('#TestKOMPlayStateWaitCount', '0');
				});

				before(function () {
					browser.assert.text('#TestKOMPlayDispatchUpdate', '4');
					// browser.assert.text('#TestKOMPlayDispatchUpdateData', 'undefined');
				});

				before(function () {
					return browser.pressButton(KOMPlayToolbarUndoButton);
				});

				it('updates KOMPlayStateQueue', function () {
					browser.assert.text('#TestKOMPlayStateQueueCount', '2');
				});

				it('updates KOMPlayStateWait', function () {
					browser.assert.text('#TestKOMPlayStateWaitCount', '0');
				});

				it('sends KOMPlayDispatchUpdate', function () {
					browser.assert.text('#TestKOMPlayDispatchUpdate', '5');
					browser.assert.text('#TestKOMPlayDispatchUpdateData', JSON.stringify(Object.keys(items[0]).concat(['KOMSpacingDrawDate', 'KOMSpacingFlipDate'])));
				});

				it('updates KOMPlayStateCurrent', function () {
					browser.assert.text(KOMPlayCardQuestion, items[0].$KOMSpacingCard.KOMCardFrontText);
				});

				it('sets disabled', function () {
					browser.assert.attribute(KOMPlayToolbarUndoButton, 'disabled', '');
				});

			});

		});

	});

	describe('speech_front', function test_speech_front() {

		const items = kTesting.uSpacings(2).sort(function (a, b) {
			return a.KOMSpacingID > b.KOMSpacingID;
		}).map(function (e, i) {
			return Object.assign(e, i ? {
				KOMSpacingID: e.KOMSpacingID.replace('forward', 'backward')
			} : {});
		});

		const deck = StubDeckObjectValid({
			KOMDeckFrontSpeechIsEnabled: true,
			KOMDeckFrontLanguageCode: 'en',
		});

		const _log = [];
		const uLog = function (inputData) {
			_log.push(inputData);
			return _log.join(',');
		};

		before(function () {
			browser.assert.text('#TestKOMPlayAudioLog', '');
		});

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMPlaySpacings: JSON.stringify(items),
				KOMPlayDeck: JSON.stringify(deck),
			});
		});

		it('starts read', function () {
			browser.assert.text('#TestKOMPlayAudioLog', uLog(`read:${ deck.KOMDeckFrontLanguageCode }:${ items[0].$KOMSpacingCard.KOMCardFrontText }`));
		});

		context('KOMPlayHearQuestionButton', function () {

			it('classes OLSKLayoutButtonNoStyle', function () {
				browser.assert.hasClass(KOMPlayHearQuestionButton, 'OLSKLayoutButtonNoStyle');
			});

			it('classes OLSKLayoutElementTappable', function () {
				browser.assert.hasClass(KOMPlayHearQuestionButton, 'OLSKLayoutElementTappable');
			});

			context('click', function () {

				before(function () {
					return browser.pressButton(KOMPlayHearQuestionButton);
				});

				it('starts read', function () {
					browser.assert.text('#TestKOMPlayAudioLog', uLog(`read:${ deck.KOMDeckFrontLanguageCode }:${ items[0].$KOMSpacingCard.KOMCardFrontText }`));
				});

			});

			context('shortcut', function () {

				before(function () {
					return browser.OLSKFireKeyboardEvent(browser.window, 'q');
				});

				it('starts read', function () {
					browser.assert.text('#TestKOMPlayAudioLog', uLog(`read:${ deck.KOMDeckFrontLanguageCode }:${ items[0].$KOMSpacingCard.KOMCardFrontText }`));
				});

			});

		});

		context('flip', function () {

			before(function () {
				return browser.pressButton(KOMPlayFlipButton);
			});

			it('stops read', function () {
				browser.assert.text('#TestKOMPlayAudioLog', uLog('stop'));
			});

		});

		context('respond', function () {

			before(function () {
				return browser.pressButton(KOMPlayResponseButtonEasy);
			});

			it('does nothing', function () {
				browser.assert.text('#TestKOMPlayAudioLog', _log.join(','));
			});

		});

		context('undo', function () {

			before(function () {
				return browser.pressButton(KOMPlayToolbarUndoButton);
			});

			it('starts read', function () {
				browser.assert.text('#TestKOMPlayAudioLog', uLog(`read:${ deck.KOMDeckFrontLanguageCode }:${ items[0].$KOMSpacingCard.KOMCardFrontText }`));
			});

		});

		context('reverse', function () {

			before(function () {
				return browser.pressButton(KOMPlayFlipButton);
			});

			before(function () {
				return browser.pressButton(KOMPlayResponseButtonEasy);
			});

			before(function () {
				return browser.pressButton(KOMPlayFlipButton);
			});

			it('starts read', function () {
				browser.assert.text('#TestKOMPlayAudioLog', uLog(`stop,read:${ deck.KOMDeckFrontLanguageCode }:${ items[1].$KOMSpacingCard.KOMCardFrontText }`));
			});

		});

		context('KOMPlayHearAnswerButton', function () {

			it('classes OLSKLayoutButtonNoStyle', function () {
				browser.assert.hasClass(KOMPlayHearAnswerButton, 'OLSKLayoutButtonNoStyle');
			});

			it('classes OLSKLayoutElementTappable', function () {
				browser.assert.hasClass(KOMPlayHearAnswerButton, 'OLSKLayoutElementTappable');
			});

			context('click', function () {

				before(function () {
					return browser.pressButton(KOMPlayHearAnswerButton);
				});

				it('starts read', function () {
					browser.assert.text('#TestKOMPlayAudioLog', uLog(`read:${ deck.KOMDeckFrontLanguageCode }:${ items[1].$KOMSpacingCard.KOMCardFrontText }`));
				});

			});

			context('shortcut', function () {

				before(function () {
					return browser.OLSKFireKeyboardEvent(browser.window, 'a');
				});

				it('starts read', function () {
					browser.assert.text('#TestKOMPlayAudioLog', uLog(`read:${ deck.KOMDeckFrontLanguageCode }:${ items[1].$KOMSpacingCard.KOMCardFrontText }`));
				});

			});

		});

		context('respond_reverse', function () {

			before(function () {
				return browser.pressButton(KOMPlayResponseButtonEasy);
			});

			it('stops read', function () {
				browser.assert.text('#TestKOMPlayAudioLog', uLog('stop'));
			});

		});

	});

	describe('speech_rear', function test_speech_rear() {

		const items = kTesting.uSpacings(2).sort(function (a, b) {
			return a.KOMSpacingID > b.KOMSpacingID;
		}).map(function (e, i) {
			return Object.assign(e, i ? {
				KOMSpacingID: e.KOMSpacingID.replace('forward', 'backward')
			} : {});
		});

		const deck = StubDeckObjectValid({
			KOMDeckRearSpeechIsEnabled: true,
			KOMDeckRearLanguageCode: 'en',
		});

		const _log = [];
		const uLog = function (inputData) {
			_log.push(inputData);
			return _log.join(',');
		};

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMPlaySpacings: JSON.stringify(items),
				KOMPlayDeck: JSON.stringify(deck),
			});
		});

		it('skips read', function () {
			browser.assert.text('#TestKOMPlayAudioLog', '');
		});

		context('flip', function () {

			before(function () {
				return browser.pressButton(KOMPlayFlipButton);
			});

			it('starts read', function () {
				browser.assert.text('#TestKOMPlayAudioLog', uLog(`read:${ deck.KOMDeckRearLanguageCode }:${ items[0].$KOMSpacingCard.KOMCardRearText }`));
			});

		});

		context('KOMPlayHearAnswerButton', function () {

			before(function () {
				return browser.pressButton(KOMPlayHearAnswerButton);
			});

			it('starts read', function () {
				browser.assert.text('#TestKOMPlayAudioLog', uLog(`read:${ deck.KOMDeckRearLanguageCode }:${ items[0].$KOMSpacingCard.KOMCardRearText }`));
			});

		});

		context('respond', function () {

			before(function () {
				return browser.pressButton(KOMPlayResponseButtonEasy);
			});

			it('starts read', function () {
				browser.assert.text('#TestKOMPlayAudioLog', uLog(`stop,read:${ deck.KOMDeckRearLanguageCode }:${ items[1].$KOMSpacingCard.KOMCardRearText }`));
			});

		});

		context('undo', function () {

			before(function () {
				return browser.pressButton(KOMPlayToolbarUndoButton);
			});

			it('does nothing', function () {
				browser.assert.text('#TestKOMPlayAudioLog', _log.join(','));
			});

		});

		context('reverse', function () {

			before(function () {
				return browser.pressButton(KOMPlayFlipButton);
			});

			before(function () {
				uLog(`read:${ deck.KOMDeckRearLanguageCode }:${ items[1].$KOMSpacingCard.KOMCardRearText }`);
			});

			before(function () {
				return browser.pressButton(KOMPlayResponseButtonEasy);
			});

			it('starts read', function () {
				browser.assert.text('#TestKOMPlayAudioLog', uLog(`stop,read:${ deck.KOMDeckRearLanguageCode }:${ items[1].$KOMSpacingCard.KOMCardRearText }`));
			});

		});

		context('KOMPlayHearQuestionButton', function () {

			before(function () {
				return browser.pressButton(KOMPlayHearQuestionButton);
			});

			it('starts read', function () {
				browser.assert.text('#TestKOMPlayAudioLog', uLog(`read:${ deck.KOMDeckRearLanguageCode }:${ items[1].$KOMSpacingCard.KOMCardRearText }`));
			});

		});

		context('flip_reverse', function () {

			before(function () {
				return browser.pressButton(KOMPlayFlipButton);
			});

			it('stopts read', function () {
				browser.assert.text('#TestKOMPlayAudioLog', uLog('stop'));
			});

		});

	});

	describe('audio_front', function test_audio_front() {

		const items = kTesting.uSpacings(2).sort(function (a, b) {
			return a.KOMSpacingID > b.KOMSpacingID;
		}).map(function (e, i) {
			return Object.assign(e, {
				$KOMSpacingCard: Object.assign(e.$KOMSpacingCard, {
					KOMCardFrontAudio: true,
				}),
			}, i ? {
				KOMSpacingID: e.KOMSpacingID.replace('forward', 'backward'),
			} : {});
		});

		const deck = StubDeckObjectValid({
			KOMDeckAudioIsEnabled: true,
			KOMDeckFrontSpeechIsEnabled: true,
			KOMDeckFrontLanguageCode: 'en',
		});

		const _log = [];
		const uLog = function (inputData) {
			_log.push(inputData);
			return _log.join(',');
		};

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMPlaySpacings: JSON.stringify(items),
				KOMPlayDeck: JSON.stringify(deck),
			});
		});

		it('starts audio', function () {
			browser.assert.text('#TestKOMPlayAudioLog', uLog('fetch,play:KOMCardFrontAudio'));
		});

		context('KOMPlayHearQuestionButton', function () {

			context('click', function () {

				before(function () {
					return browser.pressButton(KOMPlayHearQuestionButton);
				});

				it('starts audio', function () {
					browser.assert.text('#TestKOMPlayAudioLog', uLog('play:KOMCardFrontAudio'));
				});

			});

		});

		context('flip', function () {

			before(function () {
				return browser.pressButton(KOMPlayFlipButton);
			});

			it('stops audio', function () {
				browser.assert.text('#TestKOMPlayAudioLog', uLog('stop:audio'));
			});

		});

		context('respond', function () {

			before(function () {
				return browser.pressButton(KOMPlayResponseButtonEasy);
			});

			it('flushes audio', function () {
				browser.assert.text('#TestKOMPlayAudioLog', uLog('flush'));
			});

		});

		context('undo', function () {

			before(function () {
				return browser.pressButton(KOMPlayToolbarUndoButton);
			});

			it('starts audio', function () {
				browser.assert.text('#TestKOMPlayAudioLog', uLog('flush,fetch,play:KOMCardFrontAudio'));
			});

		});

		context('reverse', function () {

			before(function () {
				return browser.pressButton(KOMPlayFlipButton);
			});

			before(function () {
				return browser.pressButton(KOMPlayResponseButtonEasy);
			});

			before(function () {
				return browser.pressButton(KOMPlayFlipButton);
			});

			it('starts audio', function () {
				browser.assert.text('#TestKOMPlayAudioLog', uLog('stop:audio,flush,fetch,play:KOMCardFrontAudio'));
			});

		});

		context('KOMPlayHearAnswerButton', function () {

			context('click', function () {

				before(function () {
					return browser.pressButton(KOMPlayHearAnswerButton);
				});

				it('starts audio', function () {
					browser.assert.text('#TestKOMPlayAudioLog', uLog('play:KOMCardFrontAudio'));
				});

			});

		});

		context('respond_reverse', function () {

			before(function () {
				return browser.pressButton(KOMPlayResponseButtonEasy);
			});

			it('stops read', function () {
				browser.assert.text('#TestKOMPlayAudioLog', uLog('stop:audio,flush'));
			});

		});

	});

	describe('audio_rear', function test_audio_rear() {

		const items = kTesting.uSpacings(2).sort(function (a, b) {
			return a.KOMSpacingID > b.KOMSpacingID;
		}).map(function (e, i) {
			return Object.assign(e, {
				$KOMSpacingCard: Object.assign(e.$KOMSpacingCard, {
					KOMCardRearAudio: true,
				}),
			}, i ? {
				KOMSpacingID: e.KOMSpacingID.replace('forward', 'backward')
			} : {});
		});

		const deck = StubDeckObjectValid({
			KOMDeckAudioIsEnabled: true,
			KOMDeckRearSpeechIsEnabled: true,
			KOMDeckRearLanguageCode: 'en',
		});

		const _log = [];
		const uLog = function (inputData) {
			_log.push(inputData);
			return _log.join(',');
		};

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMPlaySpacings: JSON.stringify(items),
				KOMPlayDeck: JSON.stringify(deck),
			});
		});

		it('skips read', function () {
			browser.assert.text('#TestKOMPlayAudioLog', '');
		});

		context('flip', function () {

			before(function () {
				return browser.pressButton(KOMPlayFlipButton);
			});

			it('starts read', function () {
				browser.assert.text('#TestKOMPlayAudioLog', uLog('fetch,play:KOMCardRearAudio'));
			});

		});

		context('KOMPlayHearAnswerButton', function () {

			before(function () {
				return browser.pressButton(KOMPlayHearAnswerButton);
			});

			it('starts read', function () {
				browser.assert.text('#TestKOMPlayAudioLog', uLog('play:KOMCardRearAudio'));
			});

		});

		context('respond', function () {

			before(function () {
				return browser.pressButton(KOMPlayResponseButtonEasy);
			});

			it('starts read', function () {
				browser.assert.text('#TestKOMPlayAudioLog', uLog('stop:audio,flush,fetch,play:KOMCardRearAudio'));
			});

		});

		context('undo', function () {

			before(function () {
				return browser.pressButton(KOMPlayToolbarUndoButton);
			});

			it('flushes audio', function () {
				browser.assert.text('#TestKOMPlayAudioLog', uLog('flush'));
			});

		});

		context('reverse', function () {

			before(function () {
				return browser.pressButton(KOMPlayFlipButton);
			});

			before(function () {
				uLog('fetch,play:KOMCardRearAudio');
			});

			before(function () {
				return browser.pressButton(KOMPlayResponseButtonEasy);
			});

			it('starts read', function () {
				browser.assert.text('#TestKOMPlayAudioLog', uLog('stop:audio,flush,fetch,play:KOMCardRearAudio'));
			});

		});

		context('KOMPlayHearQuestionButton', function () {

			before(function () {
				return browser.pressButton(KOMPlayHearQuestionButton);
			});

			it('starts read', function () {
				browser.assert.text('#TestKOMPlayAudioLog', uLog('play:KOMCardRearAudio'));
			});

		});

		context('flip_reverse', function () {

			before(function () {
				return browser.pressButton(KOMPlayFlipButton);
			});

			it('stops read', function () {
				browser.assert.text('#TestKOMPlayAudioLog', uLog('stop:audio'));
			});

		});

	});

});
