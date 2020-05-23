import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();
const KOMReviewLogic = require('../../ui-logic.js').default;

const kTesting = {
	uSpacings (inputData) {
		return Array.from(new Array(2)).map(function (e, i) {
			return {
				KOMSpacingID: (i + 1).toString() + '-forward',
				KOMSpacingChronicles: [],
				$KOMSpacingCard: {
					KOMCardID: (i + 1).toString(),
					KOMCardDeckID: 'alfa',
					KOMCardFront: (i + 1).toString(),
					KOMCardRear: 'charlie',
					KOMCardHint: 'delta',
					KOMCardCreationDate: new Date('2019-02-23T13:56:36Z'),
					KOMCardModificationDate: new Date('2019-02-23T13:56:36Z'),
				},
			};
		}).map(function (e, i) {
			if (!inputData) {
				return e;
			}

			if (i) {
				return e;
			}

			return Object.assign(e, {
				KOMSpacingDueDate: new Date(),
			});
		});
	},
	uDeck (inputData = {}) {
		return Object.assign({
			KOMDeckName: 'alfa',
			$KOMDeckSpacings: [],
		}, inputData);
	},
};

describe('KOMReviewDetail_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMReviewDetailDeck: JSON.stringify(kTesting.uDeck()),
		});
	});

	describe('OLSKToolbar', function test_OLSKToolbar () {

		it('classes OLSKToolbarJustify', function () {
			browser.assert.hasClass('.OLSKToolbar', 'OLSKToolbarJustify');
		});
	
	});

	describe('KOMReviewDetailToolbarBackButton', function test_KOMReviewDetailToolbarBackButton () {
		
		it('classes OLSKLayoutButtonNoStyle', function () {
			browser.assert.hasClass(KOMReviewDetailToolbarBackButton, 'OLSKLayoutButtonNoStyle');
		});

		it('classes OLSKLayoutElementTappable', function () {
			browser.assert.hasClass(KOMReviewDetailToolbarBackButton, 'OLSKLayoutElementTappable');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestKOMReviewDetailDispatchBack', '0');
			});
			
			before(function () {
				return browser.pressButton(KOMReviewDetailToolbarBackButton);
			});

			it('sends KOMReviewDetailDispatchBack', function () {
				browser.assert.text('#TestKOMReviewDetailDispatchBack', '1');
			});
		
		});
	
	});

	describe('KOMReviewDetailToolbarBackButtonImage', function test_KOMReviewDetailToolbarBackButtonImage () {

		it('sets src', function () {
			browser.assert.elements(`${ KOMReviewDetailToolbarBackButtonImage } #_OLSKSharedBack`, 1);
		});
	
	});

	describe('KOMReviewDetailToolbarTitle', function test_KOMReviewDetailToolbarTitle () {
		
		it('sets text', function () {
			browser.assert.text(KOMReviewDetailToolbarTitle, kTesting.uDeck().KOMDeckName);
		});
	
	});

	describe('KOMReviewDetailToolbarCardsButton', function test_KOMReviewDetailToolbarCardsButton () {
		
		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestKOMReviewDetailDispatchBrowse', '0');
			});
			
			before(function () {
				return browser.pressButton(KOMReviewDetailToolbarCardsButton);
			});

			it('sends KOMReviewDetailDispatchBrowse', function () {
				browser.assert.text('#TestKOMReviewDetailDispatchBrowse', '1');
			});
		
		});
	
	});

	describe('KOMReviewDetailDiscardButton', function test_KOMReviewDetailDiscardButton () {
		
		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestKOMReviewDetailDispatchDiscard', '0');
				browser.assert.text('#TestKOMReviewDetailDispatchDiscardData', 'undefined');
			});
			
			before(function () {
				return browser.pressButton(KOMReviewDetailDiscardButton);
			});

			it('sends KOMReviewDetailDispatchDiscard', function () {
				browser.assert.text('#TestKOMReviewDetailDispatchDiscard', '1');
				browser.assert.text('#TestKOMReviewDetailDispatchDiscardData', JSON.stringify(kTesting.uDeck()));
			});
		
		});
	
	});

	describe('KOMReviewDetailRenameButton', function test_KOMReviewDetailRenameButton () {
		
		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestKOMReviewDetailDispatchUpdate', '0');
				browser.assert.text('#TestKOMReviewDetailDispatchUpdateData', 'undefined');
			});
			
			it('sets KOMReviewDetailRenameButtonPrompt response', function() {
				deepEqual(browser.OLSKPromptSync(function () {
					return browser.pressButton(KOMReviewDetailRenameButton);
				}).response, kTesting.uDeck().KOMDeckName);
			});

			context('edit', function () {
				
				before(function () {
					return browser.OLSKPrompt(function () {
						return browser.pressButton(KOMReviewDetailRenameButton);
					}, function (dialog) {
						dialog.response = 'bravo';

						return dialog;
					});
				});

				it('sends KOMReviewDetailDispatchUpdate', function () {
					browser.assert.text('#TestKOMReviewDetailDispatchUpdate', '1');
					browser.assert.text('#TestKOMReviewDetailDispatchUpdateData', JSON.stringify(Object.assign(kTesting.uDeck(), {
						KOMDeckName: 'bravo',
					})));
				});
			
			});
		
		});
	
	});

	describe('KOMReviewDetailFormFrontLanguageCode', function test_KOMReviewDetailFormFrontLanguageCode () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewDetailDeck: JSON.stringify(kTesting.uDeck({
					KOMDeckFrontLanguageCode: 'DEFAULT_LANGUAGE',
					$KOMDeckSpacings: kTesting.uSpacings(true),
				})),
			});
		});

		it('binds KOMDeckFrontLanguageCode', function () {
			browser.assert.input(`${ KOMReviewDetailFormFrontLanguageCode } .KOMReviewDetailLanguageCodeField`, 'DEFAULT_LANGUAGE');
		});
	
	});

	describe('KOMReviewDetailFormFrontIsOralField', function test_KOMReviewDetailFormFrontIsOralField () {

		const item = kTesting.uDeck({
			KOMDeckFrontLanguageCode: 'DEFAULT_LANGUAGE',
			$KOMDeckSpacings: kTesting.uSpacings(true),
		});

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewDetailDeck: JSON.stringify(item),
			});
		});

		it('sets type', function () {
			browser.assert.attribute(KOMReviewDetailFormFrontIsOralField, 'type', 'checkbox');
		});
		
		it('binds KOMDeckFrontIsOral', function () {
			browser.assert.evaluate(`document.querySelector('${ KOMReviewDetailFormFrontIsOralField }').checked`, false);
		});

		it('sets disabled', function () {
			browser.assert.attribute(KOMReviewDetailFormFrontIsOralField, 'disabled', null);
			// browser.assert.attribute(KOMReviewDetailFormFrontIsOralField, 'disabled', '');
		});

		context('select language', function () {

			before(function () {
				browser.assert.text('#TestKOMReviewDetailDispatchUpdate', '0');
				browser.assert.text('#TestKOMReviewDetailDispatchUpdateData', 'undefined');
			});
			
			before(function () {
				// return browser.select(`${ KOMReviewDetailFormFrontLanguageCode } .KOMReviewDetailLanguageCodeField`, 'DEFAULT_LANGUAGE');
			});

			it.skip('sets disabled', function () {
				browser.assert.attribute(KOMReviewDetailFormFrontIsOralField, 'disabled', null);
			});

		});
		
		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestKOMReviewDetailDispatchUpdate', '0');
				browser.assert.text('#TestKOMReviewDetailDispatchUpdateData', 'undefined');
			});
			
			before(function () {
				return browser.check(KOMReviewDetailFormFrontIsOralField);
			});

			it('sends KOMReviewDetailDispatchUpdate', function () {
				browser.assert.text('#TestKOMReviewDetailDispatchUpdate', '1');
				browser.assert.text('#TestKOMReviewDetailDispatchUpdateData', JSON.stringify(Object.assign(item, {
					KOMDeckFrontIsOral: true,
				})));
			});

			after(function () {
				return browser.uncheck(KOMReviewDetailFormFrontIsOralField);
			});
		
		});
	
	});

	describe('KOMReviewDetailFormIsForwardOnlyField', function test_KOMReviewDetailFormIsForwardOnlyField () {

		const item = {
			KOMDeckName: 'alfa',
			$KOMDeckSpacings: kTesting.uSpacings(true),
		};

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewDetailDeck: JSON.stringify(item),
			});
		});

		it('sets type', function () {
			browser.assert.attribute(KOMReviewDetailFormIsForwardOnlyField, 'type', 'checkbox');
		});
		
		it('binds KOMDeckIsForwardOnly', function () {
			browser.assert.evaluate(`document.querySelector('${ KOMReviewDetailFormIsForwardOnlyField }').checked`, false);
		});
		
		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestKOMReviewDetailDispatchUpdate', '0');
				browser.assert.text('#TestKOMReviewDetailDispatchUpdateData', 'undefined');
			});
			
			before(function () {
				return browser.check(KOMReviewDetailFormIsForwardOnlyField);
			});

			it('sends KOMReviewDetailDispatchUpdate', function () {
				browser.assert.text('#TestKOMReviewDetailDispatchUpdate', '1');
				browser.assert.text('#TestKOMReviewDetailDispatchUpdateData', JSON.stringify(Object.assign(item, {
					KOMDeckIsForwardOnly: true,
				})));
			});
		
		});

		after(function () {
			return browser.uncheck(KOMReviewDetailFormIsForwardOnlyField);
		});
	
	});

	describe('KOMReviewDetailFormPlayButtonReviewing', function test_KOMReviewDetailFormPlayButtonReviewing () {

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestKOMReviewDetailDispatchPlay', '0');
				browser.assert.text('#TestKOMReviewDetailDispatchPlayData', 'undefined');
			});
			
			before(function () {
				return browser.pressButton(KOMReviewDetailFormPlayButtonReviewing);
			});

			it('sends KOMReviewDetailDispatchPlay', function () {
				browser.assert.text('#TestKOMReviewDetailDispatchPlay', '1');
				browser.assert.text('#TestKOMReviewDetailDispatchPlayData', JSON.stringify({
					KOMReviewScheme: KOMReviewLogic.KOMReviewSchemeReviewing(),
				}));
			});
		
		});

	});

	describe('KOMReviewDetailFormPlayButtonUnseen', function test_KOMReviewDetailFormPlayButtonUnseen () {

		context('click', function () {
			
			before(function () {
				return browser.pressButton(KOMReviewDetailFormPlayButtonUnseen);
			});

			it('sends KOMReviewDetailDispatchPlay', function () {
				browser.assert.text('#TestKOMReviewDetailDispatchPlay', '2');
				browser.assert.text('#TestKOMReviewDetailDispatchPlayData', JSON.stringify({
					KOMReviewScheme: KOMReviewLogic.KOMReviewSchemeUnseen(),
					KOMReviewMaxUnseenCards: 10,
				}));
			});
		
		});

	});

	describe('KOMReviewDetailFormPlayButtonMixed', function test_KOMReviewDetailFormPlayButtonMixed () {

		context('click', function () {
			
			before(function () {
				return browser.pressButton(KOMReviewDetailFormPlayButtonMixed);
			});

			it('sends KOMReviewDetailDispatchPlay', function () {
				browser.assert.text('#TestKOMReviewDetailDispatchPlay', '3');
				browser.assert.text('#TestKOMReviewDetailDispatchPlayData', JSON.stringify({
					KOMReviewScheme: KOMReviewLogic.KOMReviewSchemeMixed(),
					KOMReviewMaxUnseenCards: 10,
				}));
			});
		
		});

	});

	describe('KOMReviewDetailForm', function test_KOMReviewDetailForm () {

		context('KOMReviewDetailFormIsForwardOnlyField', function () {
			
			before(function () {
				return browser.check(KOMReviewDetailFormIsForwardOnlyField);
			});

			before(function () {
				return browser.pressButton(KOMReviewDetailFormPlayButtonReviewing);
			});

			it('sets KOMReviewIsForwardOnly', function () {
				browser.assert.text('#TestKOMReviewDetailDispatchPlay', '4');
				browser.assert.text('#TestKOMReviewDetailDispatchPlayData', JSON.stringify({
					KOMReviewScheme: KOMReviewLogic.KOMReviewSchemeReviewing(),
					KOMReviewIsForwardOnly: true,
				}));
			});
		
		});

	});

});
