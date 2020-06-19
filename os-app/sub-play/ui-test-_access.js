const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const KOMPlayLogic = require('./ui-logic.js').default;

const kTesting = {
	uDeck () {
		return {
			KOMDeckID: 'alfa',
			KOMDeckName: '',
			KOMDeckCreationDate: new Date('2019-02-23T13:56:36Z'),
			KOMDeckModificationDate: new Date('2019-02-23T13:56:36Z'),
		};
	},
	uSpacings () {
		return Array.from(new Array(2)).map(function (e, i) {
			return {
				KOMSpacingID: (i + 1).toString() + '-' + (i >= 2 ? 'backward' : 'forward'),
				KOMSpacingDueDate: i === 1 ? new Date() : undefined,
				KOMSpacingChronicles: [],
				$KOMSpacingCard: {
					KOMCardID: (i + 1).toString(),
					KOMCardDeckID: 'alfa',
					KOMCardFrontText: (i + 1).toString(),
					KOMCardRear: 'charlie',
					KOMCardNotes: 'delta',
					KOMCardCreationDate: new Date('2019-02-23T13:56:36Z'),
					KOMCardModificationDate: new Date('2019-02-23T13:56:36Z'),
				},
			};
		});
	},
};

Object.entries({
	KOMPlay: '.KOMPlay',

	KOMPlayToolbar: '.KOMPlayToolbar',
	KOMPlayToolbarUndoButton: '.KOMPlayToolbarUndoButton',
	KOMPlayToolbarDoneButton: '.KOMPlayToolbarDoneButton',
	
	KOMPlayBody: '.KOMPlayBody',

	KOMPlayHear: '.KOMPlayHear',
	KOMPlayHearQuestionButton: '.KOMPlayHearQuestionButton',
	KOMPlayHearAnswerButton: '.KOMPlayHearAnswerButton',

	KOMPlayCard: '.KOMPlayCard',
	KOMPlayCardQuestion: '.KOMPlayCardQuestion',
	KOMPlayCardAnswer: '.KOMPlayCardAnswer',
	KOMPlayCardNotes: '.KOMPlayCardNotes',

	KOMPlayFlipButton: '.KOMPlayFlipButton',

	KOMPlayResponseButtonAgain: '.KOMPlayResponseButtonAgain',
	KOMPlayResponseButtonHard: '.KOMPlayResponseButtonHard',
	KOMPlayResponseButtonGood: '.KOMPlayResponseButtonGood',
	KOMPlayResponseButtonEasy: '.KOMPlayResponseButtonEasy',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('KOMPlay_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMPlaySpacings: JSON.stringify(kTesting.uSpacings()),
			KOMPlayDeck: JSON.stringify(kTesting.uDeck()),
		});
	});

	it('shows KOMPlay', function () {
		browser.assert.elements(KOMPlay, 1);
	});

	it('shows KOMPlayToolbar', function () {
		browser.assert.elements(KOMPlayToolbar, 1);
	});

	it('shows KOMPlayToolbarUndoButton', function () {
		browser.assert.elements(KOMPlayToolbarUndoButton, 1);
	});

	it('shows KOMPlayToolbarDoneButton', function () {
		browser.assert.elements(KOMPlayToolbarDoneButton, 1);
	});

	it('shows KOMPlayBody', function () {
		browser.assert.elements(KOMPlayBody, 1);
	});

	it('hides KOMPlayHear', function () {
		browser.assert.elements(KOMPlayHear, 0);
	});

	it('shows KOMPlayCard', function () {
		browser.assert.elements(KOMPlayCard, 1);
	});

	it('shows KOMPlayCardQuestion', function () {
		browser.assert.elements(KOMPlayCardQuestion, 1);
	});

	it('hides KOMPlayCardAnswer', function () {
		browser.assert.elements(KOMPlayCardAnswer, 0);
	});

	it('hides KOMPlayCardNotes', function () {
		browser.assert.elements(KOMPlayCardNotes, 0);
	});

	it('shows KOMPlayFlipButton', function () {
		browser.assert.elements(KOMPlayFlipButton, 1);
	});

	it('hides KOMPlayResponseButtonAgain', function () {
		browser.assert.elements(KOMPlayResponseButtonAgain, 0);
	});

	it('hides KOMPlayResponseButtonHard', function () {
		browser.assert.elements(KOMPlayResponseButtonHard, 0);
	});

	it('hides KOMPlayResponseButtonGood', function () {
		browser.assert.elements(KOMPlayResponseButtonGood, 0);
	});

	it('hides KOMPlayResponseButtonEasy', function () {
		browser.assert.elements(KOMPlayResponseButtonEasy, 0);
	});

	context('flip', function () {

		before(function () {
			return browser.pressButton(KOMPlayFlipButton);
		});
		
		it('shows KOMPlayCardAnswer', function () {
			browser.assert.elements(KOMPlayCardAnswer, 1);
		});

		it('shows KOMPlayCardNotes', function () {
			browser.assert.elements(KOMPlayCardNotes, 1);
		});

		it('hides KOMPlayFlipButton', function () {
			browser.assert.elements(KOMPlayFlipButton, 0);
		});

		it('shows KOMPlayResponseButtonAgain', function () {
			browser.assert.elements(KOMPlayResponseButtonAgain, 1);
		});

		it('shows KOMPlayResponseButtonHard', function () {
			browser.assert.elements(KOMPlayResponseButtonHard, 1);
		});

		it('shows KOMPlayResponseButtonGood', function () {
			browser.assert.elements(KOMPlayResponseButtonGood, 1);
		});

		it('shows KOMPlayResponseButtonEasy', function () {
			browser.assert.elements(KOMPlayResponseButtonEasy, 1);
		});
	
	});

	context('next', function () {

		before(function () {
			return browser.pressButton(KOMPlayResponseButtonEasy);
		});
		
		it('hides KOMPlayCardAnswer', function () {
			browser.assert.elements(KOMPlayCardAnswer, 0);
		});

		it('hides KOMPlayCardNotes', function () {
			browser.assert.elements(KOMPlayCardNotes, 0);
		});

		it('shows KOMPlayFlipButton', function () {
			browser.assert.elements(KOMPlayFlipButton, 1);
		});

		it('hides KOMPlayResponseButtonAgain', function () {
			browser.assert.elements(KOMPlayResponseButtonAgain, 0);
		});

		it('hides KOMPlayResponseButtonHard', function () {
			browser.assert.elements(KOMPlayResponseButtonHard, 0);
		});

		it('hides KOMPlayResponseButtonGood', function () {
			browser.assert.elements(KOMPlayResponseButtonGood, 0);
		});

		it('hides KOMPlayResponseButtonEasy', function () {
			browser.assert.elements(KOMPlayResponseButtonEasy, 0);
		});
	
	});

	context('KOMPlayCard_click', function () {

		before(function () {
			return browser.pressButton(KOMPlayToolbarUndoButton);
		});
		
		before(function () {
			return browser.click(KOMPlayCard);
		});
		
		it('shows KOMPlayCardAnswer', function () {
			browser.assert.elements(KOMPlayCardAnswer, 1);
		});

		it('shows KOMPlayCardNotes', function () {
			browser.assert.elements(KOMPlayCardNotes, 1);
		});

		it('hides KOMPlayFlipButton', function () {
			browser.assert.elements(KOMPlayFlipButton, 0);
		});

		it('shows KOMPlayResponseButtonAgain', function () {
			browser.assert.elements(KOMPlayResponseButtonAgain, 1);
		});

		it('shows KOMPlayResponseButtonHard', function () {
			browser.assert.elements(KOMPlayResponseButtonHard, 1);
		});

		it('shows KOMPlayResponseButtonGood', function () {
			browser.assert.elements(KOMPlayResponseButtonGood, 1);
		});

		it('shows KOMPlayResponseButtonEasy', function () {
			browser.assert.elements(KOMPlayResponseButtonEasy, 1);
		});
	
	});

	describe('oral_front', function test_oral_front () {

		const items = kTesting.uSpacings(1).map(function (e, i) {
			return Object.assign(e, i ? {
				KOMSpacingID: e.KOMSpacingID.replace('forward', 'backward')
			} : {})
		});

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMPlaySpacings: JSON.stringify(items),
				KOMPlayDeck: JSON.stringify(Object.assign(kTesting.uDeck(), {
					KOMDeckFrontIsOral: true,
				})),
			});
		});

		it('shows KOMPlayHear', function () {
			browser.assert.elements(KOMPlayHear, 1);
		});

		it('shows KOMPlayHearQuestionButton', function () {
			browser.assert.elements(KOMPlayHearQuestionButton, 1);
		});

		context('flip', function () {

			before(function () {
				return browser.pressButton(KOMPlayFlipButton);
			});
			
			it('hides KOMPlayHearAnswerButton', function () {
				browser.assert.elements(KOMPlayHearAnswerButton, 0);
			});
		
		});

		context('backward', function () {

			before(function () {
				return browser.pressButton(KOMPlayResponseButtonGood);
			});
			
			it('hides KOMPlayHearQuestionButton', function () {
				browser.assert.elements(KOMPlayHearQuestionButton, 0);
			});
		
		});

		context('backward_flip', function () {

			before(function () {
				return browser.pressButton(KOMPlayFlipButton);
			});
			
			it('shows KOMPlayHearAnswerButton', function () {
				browser.assert.elements(KOMPlayHearAnswerButton, 1);
			});
		
		});

	});

	describe('oral_rear', function test_oral_rear () {

		const items = kTesting.uSpacings(1).map(function (e, i) {
			return Object.assign(e, i ? {
				KOMSpacingID: e.KOMSpacingID.replace('forward', 'backward')
			} : {})
		});

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMPlaySpacings: JSON.stringify(items),
				KOMPlayDeck: JSON.stringify(Object.assign(kTesting.uDeck(), {
					KOMDeckRearIsOral: true,
				})),
			});
		});

		it('hides KOMPlayHear', function () {
			browser.assert.elements(KOMPlayHear, 0);
		});

		it('hides KOMPlayHearQuestionButton', function () {
			browser.assert.elements(KOMPlayHearQuestionButton, 0);
		});

		context('flip', function () {

			before(function () {
				return browser.pressButton(KOMPlayFlipButton);
			});

			it('shows KOMPlayHear', function () {
				browser.assert.elements(KOMPlayHear, 1);
			});
			
			it('shows KOMPlayHearAnswerButton', function () {
				browser.assert.elements(KOMPlayHearAnswerButton, 1);
			});
		
		});

		context('backward', function () {

			before(function () {
				return browser.pressButton(KOMPlayResponseButtonGood);
			});
			
			it('shows KOMPlayHearQuestionButton', function () {
				browser.assert.elements(KOMPlayHearQuestionButton, 1);
			});
		
		});

		context('backward_flip', function () {

			before(function () {
				return browser.pressButton(KOMPlayFlipButton);
			});
			
			it('hides KOMPlayHearAnswerButton', function () {
				browser.assert.elements(KOMPlayHearAnswerButton, 0);
			});
		
		});

	});

});
