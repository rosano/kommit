const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	KOMReviewDetail: '.KOMReviewDetail',

	KOMReviewDetailToolbar: '.KOMReviewDetailToolbar',
	KOMReviewDetailToolbarBackButton: '.KOMReviewDetailToolbarBackButton',
	KOMReviewDetailToolbarDiscardButton: '.KOMReviewDetailToolbarDiscardButton',
	KOMReviewDetailToolbarRenameButton: '.KOMReviewDetailToolbarRenameButton',
	KOMReviewDetailToolbarBrowseButton: '.KOMReviewDetailToolbarBrowseButton',
	
	KOMReviewDetailHeading: '.KOMReviewDetailHeading',
	KOMReviewDetailNoCards: '.KOMReviewDetailNoCards',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

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

describe('KOMReviewDetail_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMReviewDetailDeck: JSON.stringify({
				KOMDeckName: 'alfa',
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

	it('shows KOMReviewDetailToolbarBrowseButton', function () {
		browser.assert.elements(KOMReviewDetailToolbarBrowseButton, 1);
	});

	it('shows KOMReviewDetailHeading', function () {
		browser.assert.elements(KOMReviewDetailHeading, 1);
	});

	it('shows KOMReviewDetailNoCards', function () {
		browser.assert.elements(KOMReviewDetailNoCards, 1);
	});

	context('KOMReviewDetailSpacings', function test_KOMReviewDetailSpacings () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewDetailDeck: JSON.stringify({
					KOMDeckName: 'alfa',
				}),
				KOMReviewDetailSpacings: JSON.stringify(kTesting.uSpacings()),
			});
		});

		it('hides KOMReviewDetailNoCards', function () {
			browser.assert.elements(KOMReviewDetailNoCards, 0);
		});

	});

});
