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
		return KOMPlayLogic._KOMPlaySortShuffle(Array.from(new Array(1)).map(function (e, i) {
			return {
				KOMSpacingID: (i + 1).toString() + '-forward',
				KOMSpacingChronicles: [],
				KOMSpacingDueDate: i === 1 ? new Date() : undefined,
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

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	describe(`KOMPlay_Localize-${ languageCode }`, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage: languageCode,
				KOMPlaySpacings: JSON.stringify(kTesting.uSpacings()),
				KOMPlayDeck: JSON.stringify(kTesting.uDeck()),
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

		describe('oral', function test_oral () {

			const items = kTesting.uSpacings(2);

			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					OLSKRoutingLanguage: languageCode,
					KOMPlaySpacings: JSON.stringify(items),
					KOMPlayDeck: JSON.stringify(Object.assign(kTesting.uDeck(), {
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

	});

});
