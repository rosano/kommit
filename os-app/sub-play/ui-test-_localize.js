const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const KOMPlayLogic = require('./ui-logic.js').default;

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe('KOMPlay_Localize-' + OLSKRoutingLanguage, function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
				KOMPlaySpacings: JSON.stringify(StubSpacingArray()),
				KOMPlayDeck: JSON.stringify(StubDeckObjectValid()),
			});
		});

		it('localizes KOMPlayToolbarUndoButton', function () {
			browser.assert.text(KOMPlayToolbarUndoButton, uLocalized('KOMPlayToolbarUndoButtonText'));
		});

		it('localizes KOMPlayToolbarDoneButton', function () {
			browser.assert.text(KOMPlayToolbarDoneButton, uLocalized('KOMPlayToolbarDoneButtonText'));
		});

		it('localizes KOMPlayFlipButton', function () {
			browser.assert.text(KOMPlayFlipButton, uLocalized('KOMPlayFlipButtonText'));
		});

		context('flip', function () {

			before(function () {
				return browser.pressButton(KOMPlayFlipButton);
			});

			it('localizes KOMPlayResponseButtonAgain', function () {
				browser.assert.text(KOMPlayResponseButtonAgain, uLocalized('KOMPlayResponseButtonAgainText'));
			});

			it('localizes KOMPlayResponseButtonHard', function () {
				browser.assert.text(KOMPlayResponseButtonHard, uLocalized('KOMPlayResponseButtonHardText'));
			});

			it('localizes KOMPlayResponseButtonGood', function () {
				browser.assert.text(KOMPlayResponseButtonGood, uLocalized('KOMPlayResponseButtonGoodText'));
			});

			it('localizes KOMPlayResponseButtonEasy', function () {
				browser.assert.text(KOMPlayResponseButtonEasy, uLocalized('KOMPlayResponseButtonEasyText'));
			});

		});

		describe('speech', function test_speech() {

			const items = StubSpacingArray(2);

			before(function () {
				return browser.OLSKVisit(kDefaultRoute, {
					OLSKRoutingLanguage,
					KOMPlaySpacings: JSON.stringify(items),
					KOMPlayDeck: JSON.stringify(StubDeckObjectValid({
						KOMDeckFrontSpeechIsEnabled: true,
						KOMDeckRearSpeechIsEnabled: true,
					})),
				});
			});

			it('localizes KOMPlayHearQuestionButton', function () {
				browser.assert.text(KOMPlayHearQuestionButton, uLocalized('KOMPlayHearQuestionButtonText'));
			});

			context('flip', function () {

				before(function () {
					return browser.pressButton(KOMPlayFlipButton);
				});

				it('localizes KOMPlayHearAnswerButton', function () {
					browser.assert.text(KOMPlayHearAnswerButton, uLocalized('KOMPlayHearAnswerButtonText'));
				});

			});

		});

		context('KOMPlaySimplifiedResponseButtons', function test_KOMPlaySimplifiedResponseButtons () {
			
			before(function () {
				return browser.OLSKVisit(kDefaultRoute, {
					OLSKRoutingLanguage,
					KOMPlaySpacings: JSON.stringify(StubSpacingArray()),
					KOMPlayDeck: JSON.stringify(StubDeckObjectValid()),
					KOMPlaySimplifiedResponseButtons: true,
				});
			});

			before(function () {
				return browser.pressButton(KOMPlayFlipButton);
			});

			it('localizes KOMPlayResponseButtonReset', function () {
				browser.assert.text(KOMPlayResponseButtonReset, uLocalized('KOMPlayResponseButtonResetText'));
			});

			it('localizes KOMPlayResponseButtonNext', function () {
				browser.assert.text(KOMPlayResponseButtonNext, uLocalized('KOMPlayResponseButtonNextText'));
			});
		
		});

	});

});
