import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const kTesting = {
	uSpacings () {
		return Array.from(new Array(2)).map(function (e, i) {
			return {
				KOMSpacingID: (i + 1).toString() + '-forward',
				KOMSpacingDueDate: i === 1 ? new Date() : undefined,
				$KOMSpacingCard: {
					KOMCardID: (i + 1).toString(),
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

	describe('KOMReviewDetail', function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewDetailDeck: JSON.stringify(uItem()),
			});
		});

	});

	describe('OLSKToolbar', function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewDetailDeck: JSON.stringify(uItem()),
			});
		});
		
		it('classes OLSKToolbarJustify', function () {
			browser.assert.hasClass('.OLSKToolbar', 'OLSKToolbarJustify');
		});
	
	});

	describe('KOMReviewDetailToolbarBackButton', function () {
		
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

	describe('KOMReviewDetailToolbarDiscardButton', function () {
		
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

	describe('KOMReviewDetailToolbarRenameButton', function () {
		
		it('classes OLSKLayoutButtonNoStyle', function () {
			browser.assert.hasClass(KOMReviewDetailToolbarRenameButton, 'OLSKLayoutButtonNoStyle');
		});

		it('classes OLSKLayoutElementTappable', function () {
			browser.assert.hasClass(KOMReviewDetailToolbarRenameButton, 'OLSKLayoutElementTappable');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestKOMReviewDetailDispatchRename', '0');
				browser.assert.text('#TestKOMReviewDetailDispatchRenameData', 'undefined');
			});
			
			it('sets KOMReviewDetailToolbarRenameButtonPrompt response', function() {
				deepEqual(browser.OLSKPromptSync(function () {
					return browser.pressButton(KOMReviewDetailToolbarRenameButton);
				}).response, 'alfa');
			});

			it('sends KOMReviewDetailDispatchRename', function () {
				browser.assert.text('#TestKOMReviewDetailDispatchRename', '1');
			});

			it('sends KOMReviewDetailDispatchRenameData', function () {
				browser.assert.text('#TestKOMReviewDetailDispatchRenameData', JSON.stringify(uItem().KOMDeckName));
			});
		
		});
	
	});

	describe('KOMReviewDetailToolbarCardsButton', function () {
		
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

	context('KOMReviewDetailPlayButton', function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewDetailDeck: JSON.stringify({
					KOMDeckName: 'alfa',
					$KOMDeckSpacings: kTesting.uSpacings(),
				}),
			});
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestKOMReviewDetailDispatchPlay', '0');
			});
			
			before(function () {
				return browser.pressButton(KOMReviewDetailPlayButton);
			});

			it('sends KOMReviewDetailDispatchPlay', function () {
				browser.assert.text('#TestKOMReviewDetailDispatchPlay', '1');
			});
		
		});

	});

});
