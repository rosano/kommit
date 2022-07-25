const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const KOMPlayLogic = require('./ui-logic.js').default;

describe('KOMPlay_Multidraw', function () {

	context('text_only', function () {
		
		const items = StubSpacingArray();

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMPlaySpacings: JSON.stringify(items),
				KOMPlayDeck: JSON.stringify(StubDeckObjectValid({
					KOMDeckIsMultiDraw: true,
				})),
			});
		});

		describe('KOMPlayCardQuestionPair', function test_KOMPlayCardQuestionPair() {

			it('sets text', function () {
				browser.assert.text(KOMPlayCardQuestionPair, items[1].$KOMSpacingCard.KOMCardFrontText);
			});

		});

		describe('KOMPlayCardAnswerPair', function test_KOMPlayCardAnswerPair() {

			before(function () {
				return browser.pressButton(KOMPlayFlipButton);
			});

			it('sets text', function () {
				browser.assert.text(KOMPlayCardAnswerPair, items[1].$KOMSpacingCard.KOMCardRearText);
			});

		});
	
	});

