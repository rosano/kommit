const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMPlay_Shortcuts', function () {

	describe('Space', function test_Space() {

		const items = uSpacings(3);

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
			return browser.OLSKFireKeyboardEvent(browser.window, 'Space');
		});

		it('flips card', function () {
			browser.assert.elements(KOMPlayResponseButtonAgain, 1);
		});

		context('flipped', function () {

			before(function () {
				browser.assert.text('#TestKOMPlayDispatchUpdate', '2');
			});

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Space');
			});

			it('updates KOMPlayStateQueue', function () {
				browser.assert.text('#TestKOMPlayStateQueueCount', '1');
			});

			it('updates KOMPlayStateWait', function () {
				browser.assert.text('#TestKOMPlayStateWaitCount', '1');
			});

			it('sends KOMPlayDispatchUpdate', function () {
				browser.assert.text('#TestKOMPlayDispatchUpdate', '4');
				// browser.assert.text('#TestKOMPlayDispatchUpdateData', JSON.stringify(Object.keys(items[4]).concat(['KOMSpacingDrawDate', 'KOMSpacingFlipDate', 'KOMSpacingIsLearning', 'KOMSpacingDueDate'])));
			});

			it('updates KOMPlayStateCurrent', function () {
				browser.assert.text(KOMPlayCardQuestion, items[1].$KOMSpacingCard.KOMCardFrontText);
			});

		});

	});

	context('digits', function () {

		const items = uSpacings(4);

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

			const items = uSpacings(4);

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

});
