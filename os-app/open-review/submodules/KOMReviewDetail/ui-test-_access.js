const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	KOMReviewDetail: '.KOMReviewDetail',

	KOMReviewDetailToolbar: '.KOMReviewDetailToolbar',
	KOMReviewDetailToolbarBackButton: '.KOMReviewDetailToolbarBackButton',
	KOMReviewDetailToolbarBackButtonImage: '.KOMReviewDetailToolbarBackButtonImage',
	KOMReviewDetailToolbarTitle: '.KOMReviewDetailToolbarTitle',
	KOMReviewDetailToolbarCardsButton: '.KOMReviewDetailToolbarCardsButton',
	
	KOMReviewDetailStudyHeading: '.KOMReviewDetailStudyHeading',
	KOMReviewDetailNoCards: '.KOMReviewDetailNoCards',
	KOMReviewDetailIsForwardOnlyField: 'label .KOMReviewDetailIsForwardOnlyField',
	KOMReviewDetailIsForwardOnlyFieldLabel: 'label .KOMReviewDetailIsForwardOnlyFieldLabel',
	KOMReviewDetailPlayButtonReviewing: '.KOMReviewDetailPlayButtonReviewing',
	KOMReviewDetailPlayButtonUnseen: '.KOMReviewDetailPlayButtonUnseen',
	KOMReviewDetailPlayButtonMixed: '.KOMReviewDetailPlayButtonMixed',
	KOMReviewDetailNoSpacings: '.KOMReviewDetailNoSpacings',

	KOMReviewDetailDeckHeading: '.KOMReviewDetailDeckHeading',
	KOMReviewDetailRenameButton: '.KOMReviewDetailRenameButton',
	KOMReviewDetailDiscardButton: '.KOMReviewDetailDiscardButton',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

const kTesting = {
	uSpacings () {
		return Array.from(new Array(2)).map(function (e, i) {
			return {
				KOMSpacingID: (i + 1).toString() + '-forward',
				KOMSpacingChronicles: [],
				$KOMSpacingCard: {
					KOMCardID: 'bravo',
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

	it('shows KOMReviewDetailToolbarBackButtonImage', function () {
		browser.assert.elements(KOMReviewDetailToolbarBackButtonImage, 1);
	});

	it('shows KOMReviewDetailToolbarTitle', function () {
		browser.assert.elements(KOMReviewDetailToolbarTitle, 1);
	});

	it('shows KOMReviewDetailToolbarCardsButton', function () {
		browser.assert.elements(KOMReviewDetailToolbarCardsButton, 1);
	});

	it('shows KOMReviewDetailStudyHeading', function () {
		browser.assert.elements(KOMReviewDetailStudyHeading, 1);
	});

	it('shows KOMReviewDetailNoCards', function () {
		browser.assert.elements(KOMReviewDetailNoCards, 1);
	});

	it('hides KOMReviewDetailIsForwardOnlyField', function () {
		browser.assert.elements(KOMReviewDetailIsForwardOnlyField, 0);
	});

	it('hides KOMReviewDetailIsForwardOnlyFieldLabel', function () {
		browser.assert.elements(KOMReviewDetailIsForwardOnlyFieldLabel, 0);
	});

	it('hides KOMReviewDetailPlayButtonReviewing', function () {
		browser.assert.elements(KOMReviewDetailPlayButtonReviewing, 0);
	});

	it('hides KOMReviewDetailPlayButtonUnseen', function () {
		browser.assert.elements(KOMReviewDetailPlayButtonUnseen, 0);
	});

	it('hides KOMReviewDetailPlayButtonMixed', function () {
		browser.assert.elements(KOMReviewDetailPlayButtonMixed, 0);
	});

	it('hides KOMReviewDetailNoSpacings', function () {
		browser.assert.elements(KOMReviewDetailNoSpacings, 0);
	});

	it('shows KOMReviewDetailDeckHeading', function () {
		browser.assert.elements(KOMReviewDetailDeckHeading, 1);
	});

	it('shows KOMReviewDetailRenameButton', function () {
		browser.assert.elements(KOMReviewDetailRenameButton, 1);
	});

	it('shows KOMReviewDetailDiscardButton', function () {
		browser.assert.elements(KOMReviewDetailDiscardButton, 1);
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

		it('shows KOMReviewDetailIsForwardOnlyField', function () {
			browser.assert.elements(KOMReviewDetailIsForwardOnlyField, 1);
		});

		it('shows KOMReviewDetailIsForwardOnlyFieldLabel', function () {
			browser.assert.elements(KOMReviewDetailIsForwardOnlyFieldLabel, 1);
		});

		it('shows KOMReviewDetailPlayButtonReviewing', function () {
			browser.assert.elements(KOMReviewDetailPlayButtonReviewing, 1);
		});

		it('hides KOMReviewDetailPlayButtonUnseen', function () {
			browser.assert.elements(KOMReviewDetailPlayButtonUnseen, 0);
		});

		it('hides KOMReviewDetailPlayButtonMixed', function () {
			browser.assert.elements(KOMReviewDetailPlayButtonMixed, 0);
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

		it('shows KOMReviewDetailIsForwardOnlyField', function () {
			browser.assert.elements(KOMReviewDetailIsForwardOnlyField, 1);
		});

		it('shows KOMReviewDetailIsForwardOnlyFieldLabel', function () {
			browser.assert.elements(KOMReviewDetailIsForwardOnlyFieldLabel, 1);
		});

		it('hides KOMReviewDetailPlayButtonReviewing', function () {
			browser.assert.elements(KOMReviewDetailPlayButtonReviewing, 0);
		});

		it('shows KOMReviewDetailPlayButtonUnseen', function () {
			browser.assert.elements(KOMReviewDetailPlayButtonUnseen, 1);
		});

		it('hides KOMReviewDetailPlayButtonMixed', function () {
			browser.assert.elements(KOMReviewDetailPlayButtonMixed, 0);
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

		it('shows KOMReviewDetailIsForwardOnlyField', function () {
			browser.assert.elements(KOMReviewDetailIsForwardOnlyField, 1);
		});

		it('shows KOMReviewDetailIsForwardOnlyFieldLabel', function () {
			browser.assert.elements(KOMReviewDetailIsForwardOnlyFieldLabel, 1);
		});

		it('shows KOMReviewDetailPlayButtonReviewing', function () {
			browser.assert.elements(KOMReviewDetailPlayButtonReviewing, 1);
		});

		it('shows KOMReviewDetailPlayButtonUnseen', function () {
			browser.assert.elements(KOMReviewDetailPlayButtonUnseen, 1);
		});

		it('shows KOMReviewDetailPlayButtonMixed', function () {
			browser.assert.elements(KOMReviewDetailPlayButtonMixed, 1);
		});

	});

	context('finished', function test_finished () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewDetailDeck: JSON.stringify({
					KOMDeckName: 'alfa',
					KOMDeckIsForwardOnly: true,
					$KOMDeckSpacings: kTesting.uSpacings().map(function (e, i) {
						return Object.assign(e, i ? {
							KOMSpacingDueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
						} : {
							KOMSpacingID: e.KOMSpacingID.replace('forward', 'backward'),
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

		it('hides KOMReviewDetailPlayButtonUnseen', function () {
			browser.assert.elements(KOMReviewDetailPlayButtonUnseen, 0);
		});

		it('hides KOMReviewDetailPlayButtonMixed', function () {
			browser.assert.elements(KOMReviewDetailPlayButtonMixed, 0);
		});

		it('shows KOMReviewDetailNoSpacings', function () {
			browser.assert.elements(KOMReviewDetailNoSpacings, 1);
		});

	});

});
