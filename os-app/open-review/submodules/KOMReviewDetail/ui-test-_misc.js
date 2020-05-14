import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();
const KOMReviewLogic = require('../../ui-logic.js').default;

const kTesting = {
	uSpacings () {
		return Array.from(new Array(2)).map(function (e, i) {
			return {
				KOMSpacingID: (i + 1).toString() + '-forward',
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
		});
	},
};

describe('KOMReviewDetail_Misc', function () {

	const uItem = function () {
		return {
			KOMDeckName: 'alfa',
			$KOMDeckSpacings: [],
		};
	};

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMReviewDetailDeck: JSON.stringify(uItem()),
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

	describe('KOMReviewDetailToolbarTitle', function test_KOMReviewDetailToolbarTitle () {
		
		it('sets text', function () {
			browser.assert.text(KOMReviewDetailToolbarTitle, uItem().KOMDeckName);
		});
	
	});

	describe('KOMReviewDetailToolbarDiscardButton', function test_KOMReviewDetailToolbarDiscardButton () {
		
		it('classes OLSKLayoutButtonNoStyle', function () {
			browser.assert.hasClass(KOMReviewDetailToolbarDiscardButton, 'OLSKLayoutButtonNoStyle');
		});

		it('classes OLSKLayoutElementTappable', function () {
			browser.assert.hasClass(KOMReviewDetailToolbarDiscardButton, 'OLSKLayoutElementTappable');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestKOMReviewDetailDispatchDiscard', '0');
				browser.assert.text('#TestKOMReviewDetailDispatchDiscardData', 'undefined');
			});
			
			before(function () {
				return browser.pressButton(KOMReviewDetailToolbarDiscardButton);
			});

			it('sends KOMReviewDetailDispatchDiscard', function () {
				browser.assert.text('#TestKOMReviewDetailDispatchDiscard', '1');
			});

			it('sends KOMReviewDetailDispatchDiscardData', function () {
				browser.assert.text('#TestKOMReviewDetailDispatchDiscardData', JSON.stringify(uItem()));
			});
		
		});
	
	});

	describe('KOMReviewDetailToolbarRenameButton', function test_KOMReviewDetailToolbarRenameButton () {
		
		it('classes OLSKLayoutButtonNoStyle', function () {
			browser.assert.hasClass(KOMReviewDetailToolbarRenameButton, 'OLSKLayoutButtonNoStyle');
		});

		it('classes OLSKLayoutElementTappable', function () {
			browser.assert.hasClass(KOMReviewDetailToolbarRenameButton, 'OLSKLayoutElementTappable');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestKOMReviewDetailDispatchUpdate', '0');
				browser.assert.text('#TestKOMReviewDetailDispatchUpdateData', 'undefined');
			});
			
			it('sets KOMReviewDetailToolbarRenameButtonPrompt response', function() {
				deepEqual(browser.OLSKPromptSync(function () {
					return browser.pressButton(KOMReviewDetailToolbarRenameButton);
				}).response, uItem().KOMDeckName);
			});

			context('edit', function () {
				
				before(function () {
					return browser.OLSKPrompt(function () {
						return browser.pressButton(KOMReviewDetailToolbarRenameButton);
					}, function (dialog) {
						dialog.response = 'bravo';

						return dialog;
					});
				});

				it('sends KOMReviewDetailDispatchUpdate', function () {
					browser.assert.text('#TestKOMReviewDetailDispatchUpdate', '1');
				});

				it('sends KOMReviewDetailDispatchUpdateData', function () {
					browser.assert.text('#TestKOMReviewDetailDispatchUpdateData', JSON.stringify(Object.assign(uItem(), {
						KOMDeckName: 'bravo',
					})));
				});
			
			});
		
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

	describe('KOMReviewDetailIsForwardOnlyField', function test_KOMReviewDetailIsForwardOnlyField () {

		const item = {
			KOMDeckName: 'alfa',
			$KOMDeckSpacings: kTesting.uSpacings().map(function (e, i) {
				if (i) {
					return e;
				}

				return Object.assign(e, {
					KOMSpacingDueDate: new Date(),
				});
			}),
		};

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewDetailDeck: JSON.stringify(item),
			});
		});

		it('sets type', function () {
			browser.assert.attribute(KOMReviewDetailIsForwardOnlyField, 'type', 'checkbox');
		});
		
		it('binds KOMDeckIsForwardOnly', function () {
			browser.assert.evaluate(`document.querySelector('${ KOMReviewDetailIsForwardOnlyField }').checked`, false);
		});
		
		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestKOMReviewDetailDispatchUpdate', '0');
				browser.assert.text('#TestKOMReviewDetailDispatchUpdateData', 'undefined');
			});
			
			before(function () {
				return browser.check(KOMReviewDetailIsForwardOnlyField);
			});

			it('sends KOMReviewDetailDispatchUpdate', function () {
				browser.assert.text('#TestKOMReviewDetailDispatchUpdate', '1');
				browser.assert.text('#TestKOMReviewDetailDispatchUpdateData', JSON.stringify(Object.assign(item, {
					KOMDeckIsForwardOnly: true,
				})));
			});
		
		});

		after(function () {
			return browser.uncheck(KOMReviewDetailIsForwardOnlyField);
		});
	
	});

	describe('KOMReviewDetailPlayButtonReviewing', function test_KOMReviewDetailPlayButtonReviewing () {

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestKOMReviewDetailDispatchPlay', '0');
				browser.assert.text('#TestKOMReviewDetailDispatchPlayData', 'undefined');
			});
			
			before(function () {
				return browser.pressButton(KOMReviewDetailPlayButtonReviewing);
			});

			it('sends KOMReviewDetailDispatchPlay', function () {
				browser.assert.text('#TestKOMReviewDetailDispatchPlay', '1');
				browser.assert.text('#TestKOMReviewDetailDispatchPlayData', JSON.stringify({
					KOMReviewScheme: KOMReviewLogic.KOMReviewSchemeReviewing(),
				}));
			});
		
		});

	});

	describe('KOMReviewDetailPlayButtonUnseen', function test_KOMReviewDetailPlayButtonUnseen () {

		context('click', function () {
			
			before(function () {
				return browser.pressButton(KOMReviewDetailPlayButtonUnseen);
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

	describe('KOMReviewDetailPlayButtonMixed', function test_KOMReviewDetailPlayButtonMixed () {

		context('click', function () {
			
			before(function () {
				return browser.pressButton(KOMReviewDetailPlayButtonMixed);
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

		context('KOMReviewDetailIsForwardOnlyField', function () {
			
			before(function () {
				return browser.check(KOMReviewDetailIsForwardOnlyField);
			});

			before(function () {
				return browser.pressButton(KOMReviewDetailPlayButtonReviewing);
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
