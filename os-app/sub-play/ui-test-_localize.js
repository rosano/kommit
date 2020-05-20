const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const KOMPlayLogic = require('./ui-logic.js').default;

const kTesting = {
	uSpacings () {
		return KOMPlayLogic._KOMPlaySortShuffle(Array.from(new Array(1)).map(function (e, i) {
			return {
				KOMSpacingID: (i + 1).toString() + '-forward',
				KOMSpacingChronicles: [],
				KOMSpacingDueDate: i === 1 ? new Date() : undefined,
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

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	describe(`KOMPlay_Localize-${ languageCode }`, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage: languageCode,
				KOMPlaySpacings: JSON.stringify(kTesting.uSpacings()),
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
				return browser.click(KOMPlayCard);
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

	});

});
