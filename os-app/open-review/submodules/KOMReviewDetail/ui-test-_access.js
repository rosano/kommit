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
	
	KOMReviewDetailForm: '.KOMReviewDetailForm',
	KOMReviewDetailFormIsOralFrontField: 'label .KOMReviewDetailFormIsOralFrontField',
	KOMReviewDetailFormIsOralFrontFieldLabel: 'label .KOMReviewDetailFormIsOralFrontFieldLabel',
	KOMReviewDetailFormIsForwardOnlyField: 'label .KOMReviewDetailFormIsForwardOnlyField',
	KOMReviewDetailFormIsForwardOnlyFieldLabel: 'label .KOMReviewDetailFormIsForwardOnlyFieldLabel',
	KOMReviewDetailFormPlayButtonReviewing: '.KOMReviewDetailFormPlayButtonReviewing',
	KOMReviewDetailFormPlayButtonUnseen: '.KOMReviewDetailFormPlayButtonUnseen',
	KOMReviewDetailFormPlayButtonMixed: '.KOMReviewDetailFormPlayButtonMixed',

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
					KOMCardFront: (i + 1).toString(),
					KOMCardRear: 'charlie',
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

	it('hides KOMReviewDetailForm', function () {
		browser.assert.elements(KOMReviewDetailForm, 0);
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

	context('today', function test_today () {

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

		it('shows KOMReviewDetailForm', function () {
			browser.assert.elements(KOMReviewDetailForm, 1);
		});

		it('shows KOMReviewDetailFormIsOralFrontField', function () {
			browser.assert.elements(KOMReviewDetailFormIsOralFrontField, 1);
		});

		it('shows KOMReviewDetailFormIsOralFrontFieldLabel', function () {
			browser.assert.elements(KOMReviewDetailFormIsOralFrontFieldLabel, 1);
		});

		it('shows KOMReviewDetailFormIsForwardOnlyField', function () {
			browser.assert.elements(KOMReviewDetailFormIsForwardOnlyField, 1);
		});

		it('shows KOMReviewDetailFormIsForwardOnlyFieldLabel', function () {
			browser.assert.elements(KOMReviewDetailFormIsForwardOnlyFieldLabel, 1);
		});

		context('reviewing', function test_reviewing () {

			it('shows KOMReviewDetailFormPlayButtonReviewing', function () {
				browser.assert.elements(KOMReviewDetailFormPlayButtonReviewing, 1);
			});

			it('hides KOMReviewDetailFormPlayButtonUnseen', function () {
				browser.assert.elements(KOMReviewDetailFormPlayButtonUnseen, 0);
			});

			it('hides KOMReviewDetailFormPlayButtonMixed', function () {
				browser.assert.elements(KOMReviewDetailFormPlayButtonMixed, 0);
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

			it('hides KOMReviewDetailFormPlayButtonReviewing', function () {
				browser.assert.elements(KOMReviewDetailFormPlayButtonReviewing, 0);
			});

			it('shows KOMReviewDetailFormPlayButtonUnseen', function () {
				browser.assert.elements(KOMReviewDetailFormPlayButtonUnseen, 1);
			});

			it('hides KOMReviewDetailFormPlayButtonMixed', function () {
				browser.assert.elements(KOMReviewDetailFormPlayButtonMixed, 0);
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

			it('shows KOMReviewDetailFormPlayButtonReviewing', function () {
				browser.assert.elements(KOMReviewDetailFormPlayButtonReviewing, 1);
			});

			it('shows KOMReviewDetailFormPlayButtonUnseen', function () {
				browser.assert.elements(KOMReviewDetailFormPlayButtonUnseen, 1);
			});

			it('shows KOMReviewDetailFormPlayButtonMixed', function () {
				browser.assert.elements(KOMReviewDetailFormPlayButtonMixed, 1);
			});

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

		it('hides KOMReviewDetailForm', function () {
			browser.assert.elements(KOMReviewDetailForm, 0);
		});

		it('shows KOMReviewDetailNoSpacings', function () {
			browser.assert.elements(KOMReviewDetailNoSpacings, 1);
		});

	});

});
