import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const kTesting = {
	uSpacings () {
		return Array.from(new Array(2)).map(function (e, i) {
			return {
				KOMSpacingID: (i + 1).toString() + '-forward',
				KOMSpacingChronicles: [],
				$KOMSpacingCard: {
					KOMCardID: 'bravo',
					KOMCardDeckID: 'alfa',
					KOMCardFront: (i + 1).toString(),
					KOMCardRear: 'charlie',
					KOMCardNotes: 'delta',
					KOMCardCreationDate: new Date('2019-02-23T13:56:36Z'),
					KOMCardModificationDate: new Date('2019-02-23T13:56:36Z'),
				},
			};
		});
	},
};

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	describe(`KOMReviewDetail_Localize-${ languageCode }`, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage: languageCode,
				KOMReviewDetailDeck: JSON.stringify({
					KOMDeckName: 'alfa',
					$KOMDeckSpacings: [],
				}),
			});
		});

		it('localizes KOMReviewDetailToolbarBackButton', function () {
			browser.assert.attribute(KOMReviewDetailToolbarBackButton, 'title', uLocalized('KOMReviewDetailToolbarBackButtonText'));
		});

		it('localizes KOMReviewDetailToolbarCardsButton', function () {
			browser.assert.text(KOMReviewDetailToolbarCardsButton, uLocalized('KOMReviewDetailToolbarCardsButtonText'));
		});

		it('localizes KOMReviewDetailStudyHeading', function () {
			browser.assert.text(KOMReviewDetailStudyHeading, uLocalized('KOMReviewDetailStudyHeadingText'));
		});

		it('localizes KOMReviewDetailNoCards', function () {
			browser.assert.text(KOMReviewDetailNoCards, uLocalized('KOMReviewDetailNoCardsText'));
		});

		it('localizes KOMReviewDetailDeckHeading', function () {
			browser.assert.text(KOMReviewDetailDeckHeading, uLocalized('KOMReviewDetailDeckHeadingText'));
		});

		it('localizes KOMReviewDetailRenameButton', function () {
			browser.assert.text(KOMReviewDetailRenameButton, uLocalized('KOMReviewDetailRenameButtonText'));
		});

		it('localizes KOMReviewDetailDiscardButton', function () {
			browser.assert.text(KOMReviewDetailDiscardButton, uLocalized('KOMReviewDetailDiscardButtonText'));
		});

		context('on discard', function () {
		
			it('localizes KOMReviewDetailDiscardPrompt', async function() {
				deepEqual((await browser.OLSKConfirm(async function () {
					browser.pressButton(KOMReviewDetailDiscardButton);
				})).question, uLocalized('KOMReviewDetailDiscardPromptText'));
			});
		
		});

		context('on rename', function () {
		
			it('localizes KOMReviewDetailRenameButtonPrompt', function() {
				browser.assert.OLSKPromptQuestion(function () {
					return browser.pressButton(KOMReviewDetailRenameButton);
				}, uLocalized('KOMReviewDetailRenameButtonPromptText'));
			});
		
		});

		context('$KOMDeckSpacings', function test_$KOMDeckSpacings () {

			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					KOMReviewDetailDeck: JSON.stringify({
						KOMDeckName: 'alfa',
						$KOMDeckSpacings: kTesting.uSpacings().map(function (e, i) {
							if (i) {
								return e;
							}

							return Object.assign(e, {
								KOMSpacingDueDate: new Date(),
							});
						}),
					}),
				});
			});

			it('localizes KOMReviewDetailFormFrontIsOralFieldLabel', function () {
				browser.assert.text(KOMReviewDetailFormFrontIsOralFieldLabel, uLocalized('KOMReviewDetailFormFrontIsOralFieldLabelText'));
			});

			it('localizes KOMReviewDetailFormRearIsOralFieldLabel', function () {
				browser.assert.text(KOMReviewDetailFormRearIsOralFieldLabel, uLocalized('KOMReviewDetailFormRearIsOralFieldLabelText'));
			});

			it('localizes KOMReviewDetailFormIsForwardOnlyFieldLabel', function () {
				browser.assert.text(KOMReviewDetailFormIsForwardOnlyFieldLabel, uLocalized('KOMReviewDetailFormIsForwardOnlyFieldLabelText'));
			});

			it('localizes KOMReviewDetailPlayButtonReviewing', function () {
				browser.assert.text(KOMReviewDetailPlayButtonReviewing, uLocalized('KOMReviewDetailPlayButtonReviewingText'));
			});

			it('localizes KOMReviewDetailPlayButtonUnseen', function () {
				browser.assert.text(KOMReviewDetailPlayButtonUnseen, uLocalized('KOMReviewDetailPlayButtonUnseenText'));
			});

			it('localizes KOMReviewDetailPlayButtonMixed', function () {
				browser.assert.text(KOMReviewDetailPlayButtonMixed, uLocalized('KOMReviewDetailPlayButtonMixedText'));
			});

		});

		context('finished', function test_finished () {

			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					KOMReviewDetailDeck: JSON.stringify({
						KOMDeckName: 'alfa',
						$KOMDeckSpacings: kTesting.uSpacings().map(function (e) {
							return Object.assign(e, {
								KOMSpacingDueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
							});
						}),
					}),
				});
			});

			it('localizes KOMReviewDetailNoSpacings', function () {
				browser.assert.text(KOMReviewDetailNoSpacings, uLocalized('KOMReviewDetailNoSpacingsText'));
			});

		});

	});

});
