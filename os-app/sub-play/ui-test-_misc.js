const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const KOMPlayLogic = require('./ui-logic.js').default;
const KOMSpacingModel = require('../_shared/KOMSpacing/model.js').default;

const kTesting = {
	uCards: KOMPlayLogic._KOMPlaySortShuffle(Array.from(new Array(4)).map(function (e, i) {
		return {
			KOMCardID: (i + 1).toString(),
			KOMCardQuestion: (i + 1).toString(),
			KOMCardAnswer: 'charlie',
			KOMCardHint: 'delta',
			KOMCardCreationDate: new Date('2019-02-23T13:56:36Z'),
			KOMCardModificationDate: new Date('2019-02-23T13:56:36Z'),
		};
	})),
	uSpacings: KOMPlayLogic._KOMPlaySortShuffle(Array.from(new Array(4)).map(function (e, i) {
		return {
			KOMSpacingID: (i + 1).toString() + '-forward',
		};
	})).map(function (e, i) {
		return Object.assign(e, {
			KOMSpacingMultiplier: i === 1 ? 2 : undefined,
			KOMSpacingInterval: i === 1 ? 1 : undefined,
			KOMSpacingDueDate: i === 1 ? new Date() : undefined,
		})
	}),
	uCardAt (inputData) {
		return kTesting.uCards.filter(function (e) {
			return KOMSpacingModel.KOMSpacingModelIdentifier(kTesting.uSpacings[inputData].KOMSpacingID) === e.KOMCardID;
		}).pop();
	},
};

describe('KOMPlay_Misc', function () {	

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMPlayCards: JSON.stringify(kTesting.uCards),
			KOMPlaySpacings: JSON.stringify(kTesting.uSpacings),
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
			browser.assert.text(KOMPlayCardQuestion, kTesting.uCardAt(0).KOMCardQuestion);
		});

	});

	describe('KOMPlayCardAnswer', function () {

		before(function () {
			browser.click(KOMPlayCard);
		});

		it('sets text', function () {
			browser.assert.text(KOMPlayCardAnswer, kTesting.uCardAt(0).KOMCardAnswer)
		});

	});

	describe('KOMPlayCardHint', function () {

		it('sets text', function () {
			browser.assert.text(KOMPlayCardHint, kTesting.uCardAt(0).KOMCardHint)
		});

	});

	describe('KOMPlayResponseButtonAgain', function () {

		before(function () {
			browser.assert.text('#TestKOMPlayStateQueueCount', '3');
		});

		before(function () {
			browser.assert.text('#TestKOMPlayStateWaitCount', '0');
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

		it('updates KOMPlayStateCurrent', function () {
			browser.assert.text(KOMPlayCardQuestion, kTesting.uCardAt(1).KOMCardQuestion);
		});

	});

	describe('KOMPlayResponseButtonHard', function () {

		before(function () {
			return browser.click(KOMPlayCard);
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

		it('updates KOMPlayStateCurrent', function () {
			browser.assert.text(KOMPlayCardQuestion, kTesting.uCardAt(2).KOMCardQuestion);
		});

	});

	describe('KOMPlayResponseButtonGood', function () {

		before(function () {
			return browser.click(KOMPlayCard);
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

		it('updates KOMPlayStateCurrent', function () {
			browser.assert.text(KOMPlayCardQuestion, kTesting.uCardAt(3).KOMCardQuestion);
		});

	});

	describe('KOMPlayResponseButtonEasy', function () {

		before(function () {
			return browser.click(KOMPlayCard);
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

		it('updates KOMPlayStateCurrent', function () {
			browser.assert.text(KOMPlayCardQuestion, kTesting.uCardAt(0).KOMCardQuestion);
		});

	});

	describe('review', function () {

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
			browser.assert.text(KOMPlayCardQuestion, kTesting.uCardAt(2).KOMCardQuestion);
		});

	});

});
