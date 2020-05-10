const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	KOMReviewDetail: '.KOMReviewDetail',

	KOMReviewDetailToolbar: '.KOMReviewDetailToolbar',
	KOMReviewDetailToolbarBackButton: '.KOMReviewDetailToolbarBackButton',
	KOMReviewDetailToolbarDiscardButton: '.KOMReviewDetailToolbarDiscardButton',
	KOMReviewDetailToolbarRenameButton: '.KOMReviewDetailToolbarRenameButton',
	KOMReviewDetailToolbarCardsButton: '.KOMReviewDetailToolbarCardsButton',
	
	KOMReviewDetailHeading: '.KOMReviewDetailHeading',
	KOMReviewDetailNoCards: '.KOMReviewDetailNoCards',
	KOMReviewDetailPlayButtonReviewing: '.KOMReviewDetailPlayButtonReviewing',
	KOMReviewDetailPlayButtonMixed: '.KOMReviewDetailPlayButtonMixed',
	KOMReviewDetailPlayButtonUnseen: '.KOMReviewDetailPlayButtonUnseen',
	KOMReviewDetailNoSpacings: '.KOMReviewDetailNoSpacings',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

const kTesting = {
	uSpacings () {
		return Array.from(new Array(2)).map(function (e, i) {
			return {
				KOMSpacingID: (i + 1).toString() + '-forward',
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

describe('KOMReviewDetail_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMReviewDetailDeck: JSON.stringify({
				KOMDeckName: 'alfa',
				$KOMDeckSpacings: [],
			}),
		});
	});

	it('shows KOMReviewDetail', function () {
		browser.assert.elements(KOMReviewDetail, 1);
	});

	it('shows OLSKToolbar', function () {
		browser.assert.elements('.OLSKToolbar', 1);
	});

	it('shows KOMReviewDetailToolbar', function () {
		browser.assert.elements(KOMReviewDetailToolbar, 1);
	});

	it('shows KOMReviewDetailToolbarBackButton', function () {
		browser.assert.elements(KOMReviewDetailToolbarBackButton, 1);
	});

	it('shows KOMReviewDetailToolbarDiscardButton', function () {
		browser.assert.elements(KOMReviewDetailToolbarDiscardButton, 1);
	});

	it('shows KOMReviewDetailToolbarRenameButton', function () {
		browser.assert.elements(KOMReviewDetailToolbarRenameButton, 1);
	});

	it('shows KOMReviewDetailToolbarCardsButton', function () {
		browser.assert.elements(KOMReviewDetailToolbarCardsButton, 1);
	});

	it('shows KOMReviewDetailHeading', function () {
		browser.assert.elements(KOMReviewDetailHeading, 1);
	});

	it('shows KOMReviewDetailNoCards', function () {
		browser.assert.elements(KOMReviewDetailNoCards, 1);
	});

	it('hides KOMReviewDetailPlayButtonReviewing', function () {
		browser.assert.elements(KOMReviewDetailPlayButtonReviewing, 0);
	});

	it('hides KOMReviewDetailPlayButtonMixed', function () {
		browser.assert.elements(KOMReviewDetailPlayButtonMixed, 0);
	});

	it('hides KOMReviewDetailPlayButtonUnseen', function () {
		browser.assert.elements(KOMReviewDetailPlayButtonUnseen, 0);
	});

	it('hides KOMReviewDetailNoSpacings', function () {
		browser.assert.elements(KOMReviewDetailNoSpacings, 0);
	});

	context('reviewing', function test_reviewing () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewDetailDeck: JSON.stringify({
					KOMDeckName: 'alfa',
					$KOMDeckSpacings: kTesting.uSpacings().map(function (e) {
						return Object.assign(e, {
							KOMSpacingDueDate: new Date(),
						});
					}),
				}),
			});
		});

		it('hides KOMReviewDetailNoCards', function () {
			browser.assert.elements(KOMReviewDetailNoCards, 0);
		});

		it('shows KOMReviewDetailPlayButtonReviewing', function () {
			browser.assert.elements(KOMReviewDetailPlayButtonReviewing, 1);
		});

		it('hides KOMReviewDetailPlayButtonMixed', function () {
			browser.assert.elements(KOMReviewDetailPlayButtonMixed, 0);
		});

		it('hides KOMReviewDetailPlayButtonUnseen', function () {
			browser.assert.elements(KOMReviewDetailPlayButtonUnseen, 0);
		});

	});

	context('mixed', function test_mixed () {

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

		it('hides KOMReviewDetailNoCards', function () {
			browser.assert.elements(KOMReviewDetailNoCards, 0);
		});

		it('shows KOMReviewDetailPlayButtonReviewing', function () {
			browser.assert.elements(KOMReviewDetailPlayButtonReviewing, 1);
		});

		it('shows KOMReviewDetailPlayButtonMixed', function () {
			browser.assert.elements(KOMReviewDetailPlayButtonMixed, 1);
		});

		it('shows KOMReviewDetailPlayButtonUnseen', function () {
			browser.assert.elements(KOMReviewDetailPlayButtonUnseen, 1);
		});

	});

	context('unseen', function test_unseen () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewDetailDeck: JSON.stringify({
					KOMDeckName: 'alfa',
					$KOMDeckSpacings: kTesting.uSpacings(),
				}),
			});
		});

		it('hides KOMReviewDetailNoCards', function () {
			browser.assert.elements(KOMReviewDetailNoCards, 0);
		});

		it('hides KOMReviewDetailPlayButtonReviewing', function () {
			browser.assert.elements(KOMReviewDetailPlayButtonReviewing, 0);
		});

		it('hides KOMReviewDetailPlayButtonMixed', function () {
			browser.assert.elements(KOMReviewDetailPlayButtonMixed, 0);
		});

		it('shows KOMReviewDetailPlayButtonUnseen', function () {
			browser.assert.elements(KOMReviewDetailPlayButtonUnseen, 1);
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

		it('hides KOMReviewDetailNoCards', function () {
			browser.assert.elements(KOMReviewDetailNoCards, 0);
		});

		it('hides KOMReviewDetailPlayButtonReviewing', function () {
			browser.assert.elements(KOMReviewDetailPlayButtonReviewing, 0);
		});

		it('shows KOMReviewDetailNoSpacings', function () {
			browser.assert.elements(KOMReviewDetailNoSpacings, 1);
		});

	});

});
