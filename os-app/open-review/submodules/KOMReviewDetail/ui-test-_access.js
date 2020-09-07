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
	KOMReviewDetailFormAudioIsEnabledField: '.KOMReviewDetailFormAudioIsEnabledField',
	KOMReviewDetailFormAudioIsEnabledFieldLabel: '.KOMReviewDetailFormAudioIsEnabledFieldLabel',
	KOMReviewDetailFormFrontSpeechIsEnabledField: '.KOMReviewDetailFormFrontSpeechIsEnabledField',
	KOMReviewDetailFormFrontSpeechIsEnabledFieldLabel: '.KOMReviewDetailFormFrontSpeechIsEnabledFieldLabel',
	KOMReviewDetailFormFrontLanguageCode: '.KOMReviewDetailFormFrontLanguageCode .KOMReviewDetailLanguageCode',
	KOMReviewDetailFormRearSpeechIsEnabledField: '.KOMReviewDetailFormRearSpeechIsEnabledField',
	KOMReviewDetailFormRearSpeechIsEnabledFieldLabel: '.KOMReviewDetailFormRearSpeechIsEnabledFieldLabel',
	KOMReviewDetailFormRearLanguageCode: '.KOMReviewDetailFormRearLanguageCode .KOMReviewDetailLanguageCode',
	KOMReviewDetailFormIsForwardOnlyField: '.KOMReviewDetailFormIsForwardOnlyField',
	KOMReviewDetailFormIsForwardOnlyFieldLabel: '.KOMReviewDetailFormIsForwardOnlyFieldLabel',

	KOMReviewDetailPlay: '.KOMReviewDetailPlay',
	KOMReviewDetailPlayButton: '.KOMReviewDetailPlayButton',

	KOMReviewDetailNoSpacings: '.KOMReviewDetailNoSpacings',

	KOMReviewDetailDeckHeading: '.KOMReviewDetailDeckHeading',
	KOMReviewDetailRenameButton: '.KOMReviewDetailRenameButton',
	KOMReviewDetailDiscardButton: '.KOMReviewDetailDiscardButton',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

const uDeck = function (inputData) {
	return Object.assign({
		KOMDeckName: 'alfa',
		$KOMDeckTodayReviewCount: 0,
		$KOMDeckTodayUnseenCount: 0,
		$KOMDeckTodayStudiedCount: 0,
		$KOMReviewGeneralUpcomingData: [],
		$KOMReviewGeneralHistoricalData: [],
		$KOMReviewChartCompositionCollectionData: {
			KOMSpacingGroupingTotal: 0,
		},
	}, inputData);
};

describe('KOMReviewDetail_Access', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			KOMReviewDetailDeck: JSON.stringify(uDeck()),
		});
	});

	it('shows KOMReviewDetail', function () {
		browser.assert.elements(KOMReviewDetail, 1);
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

	it('shows KOMReviewDetailForm', function () {
		browser.assert.elements(KOMReviewDetailForm, 1);
	});

	it('shows KOMReviewDetailFormAudioIsEnabledField', function () {
		browser.assert.elements(KOMReviewDetailFormAudioIsEnabledField, 1);
	});

	it('shows KOMReviewDetailFormAudioIsEnabledFieldLabel', function () {
		browser.assert.elements(KOMReviewDetailFormAudioIsEnabledFieldLabel, 1);
	});

	it('shows KOMReviewDetailFormFrontSpeechIsEnabledField', function () {
		browser.assert.elements(KOMReviewDetailFormFrontSpeechIsEnabledField, 1);
	});

	it('shows KOMReviewDetailFormFrontSpeechIsEnabledFieldLabel', function () {
		browser.assert.elements(KOMReviewDetailFormFrontSpeechIsEnabledFieldLabel, 1);
	});

	it('shows KOMReviewDetailFormFrontLanguageCode', function () {
		browser.assert.elements(KOMReviewDetailFormFrontLanguageCode, 1);
	});

	it('shows KOMReviewDetailFormRearSpeechIsEnabledField', function () {
		browser.assert.elements(KOMReviewDetailFormRearSpeechIsEnabledField, 1);
	});

	it('shows KOMReviewDetailFormRearSpeechIsEnabledFieldLabel', function () {
		browser.assert.elements(KOMReviewDetailFormRearSpeechIsEnabledFieldLabel, 1);
	});

	it('shows KOMReviewDetailFormRearLanguageCode', function () {
		browser.assert.elements(KOMReviewDetailFormRearLanguageCode, 1);
	});

	it('shows KOMReviewDetailFormIsForwardOnlyField', function () {
		browser.assert.elements(KOMReviewDetailFormIsForwardOnlyField, 1);
	});

	it('shows KOMReviewDetailFormIsForwardOnlyFieldLabel', function () {
		browser.assert.elements(KOMReviewDetailFormIsForwardOnlyFieldLabel, 1);
	});

	it('hides KOMReviewDetailPlay', function () {
		browser.assert.elements(KOMReviewDetailPlay, 0);
	});

	it('hides KOMReviewDetailNoSpacings', function () {
		browser.assert.elements(KOMReviewDetailNoSpacings, 0);
	});

	it('hides KOMReviewStats', function () {
		browser.assert.elements('.KOMReviewStats', 0);
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

	it('hides KOMReviewDetailLauncherItemPlayReviewing', function () {
		return browser.assert.OLSKLauncherItems('KOMReviewDetailLauncherItemPlayReviewing', 0);
	});

	it('hides KOMReviewDetailLauncherItemPlayUnseen', function () {
		return browser.assert.OLSKLauncherItems('KOMReviewDetailLauncherItemPlayUnseen', 0);
	});

	context('today', function test_today() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewDetailDeck: JSON.stringify(uDeck({
					$KOMDeckTodayReviewCount: 1,
					$KOMDeckTodayUnseenCount: 0,
					$KOMDeckTodayStudiedCount: 0,
					$KOMReviewChartCompositionCollectionData: {
						KOMSpacingGroupingTotal: 1,
					},
				})),
			});
		});

		it('hides KOMReviewDetailNoCards', function () {
			browser.assert.elements(KOMReviewDetailNoCards, 0);
		});

		it('shows KOMReviewDetailPlay', function () {
			browser.assert.elements(KOMReviewDetailPlay, 1);
		});

		it('hides KOMReviewStats', function () {
			browser.assert.elements('.KOMReviewStats', 0);
		});

		context('reviewing', function test_reviewing() {

			it('shows KOMReviewDetailPlayButton', function () {
				browser.assert.elements(KOMReviewDetailPlayButton, 1);
			});

			it('shows KOMReviewDetailLauncherItemPlayReviewing', function () {
				return browser.assert.OLSKLauncherItems('KOMReviewDetailLauncherItemPlayReviewing', 1);
			});

			it('hides KOMReviewDetailLauncherItemPlayUnseen', function () {
				return browser.assert.OLSKLauncherItems('KOMReviewDetailLauncherItemPlayUnseen', 0);
			});

		});

		context('unseen', function test_unseen() {

			before(function () {
				return browser.OLSKVisit(kDefaultRoute, {
					KOMReviewDetailDeck: JSON.stringify(uDeck({
						$KOMDeckTodayReviewCount: 0,
						$KOMDeckTodayUnseenCount: 1,
						$KOMDeckTodayStudiedCount: 0,
					})),
				});
			});

			it('shows KOMReviewDetailPlayButton', function () {
				browser.assert.elements(KOMReviewDetailPlayButton, 1);
			});

			it('hides KOMReviewDetailLauncherItemPlayReviewing', function () {
				return browser.assert.OLSKLauncherItems('KOMReviewDetailLauncherItemPlayReviewing', 0);
			});

			it('shows KOMReviewDetailLauncherItemPlayUnseen', function () {
				return browser.assert.OLSKLauncherItems('KOMReviewDetailLauncherItemPlayUnseen', 1);
			});

		});

		context('mixed', function test_mixed() {

			before(function () {
				return browser.OLSKVisit(kDefaultRoute, {
					KOMReviewDetailDeck: JSON.stringify(uDeck({
						$KOMDeckTodayReviewCount: 1,
						$KOMDeckTodayUnseenCount: 1,
						$KOMDeckTodayStudiedCount: 0,
					})),
				});
			});

			it('shows KOMReviewDetailPlayButton', function () {
				browser.assert.elements(KOMReviewDetailPlayButton, 1);
			});

			it('shows KOMReviewDetailLauncherItemPlayReviewing', function () {
				return browser.assert.OLSKLauncherItems('KOMReviewDetailLauncherItemPlayReviewing', 1);
			});

			it('shows KOMReviewDetailLauncherItemPlayUnseen', function () {
				return browser.assert.OLSKLauncherItems('KOMReviewDetailLauncherItemPlayUnseen', 1);
			});

		});

	});

	context('finished', function test_finished() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				KOMReviewDetailDeck: JSON.stringify(uDeck({
					KOMDeckIsForwardOnly: true,
					$KOMDeckTodayReviewCount: 0,
					$KOMDeckTodayUnseenCount: 0,
					$KOMDeckTodayStudiedCount: 1,
					$KOMDeckGeneralNotUnseenCount: 1,
					$KOMReviewChartCompositionCollectionData: {
						KOMSpacingGroupingTotal: 1,
						KOMSpacingGroupingUnseen: 2,
						KOMSpacingGroupingDeveloping: 3,
						KOMSpacingGroupingMature: 4,
						KOMSpacingGroupingSuspended: 5,
					},
				})),
			});
		});

		it('hides KOMReviewDetailNoCards', function () {
			browser.assert.elements(KOMReviewDetailNoCards, 0);
		});

		it('hides KOMReviewDetailPlay', function () {
			browser.assert.elements(KOMReviewDetailPlay, 0);
		});

		it('hides KOMReviewDetailLauncherItemPlayReviewing', function () {
			return browser.assert.OLSKLauncherItems('KOMReviewDetailLauncherItemPlayReviewing', 0);
		});

		it('hides KOMReviewDetailLauncherItemPlayUnseen', function () {
			return browser.assert.OLSKLauncherItems('KOMReviewDetailLauncherItemPlayUnseen', 0);
		});

		it('shows KOMReviewDetailNoSpacings', function () {
			browser.assert.elements(KOMReviewDetailNoSpacings, 1);
		});

		it('shows KOMReviewStats', function () {
			browser.assert.elements('.KOMReviewStats', 1);
		});

	});

});
