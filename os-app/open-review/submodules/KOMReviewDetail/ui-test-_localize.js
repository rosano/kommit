const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const uDeck = function (inputData) {
	return Object.assign({
		KOMDeckName: 'alfa',
		$KOMReviewGeneralUpcomingData: [],
		$KOMReviewGeneralHistoricalData: [],
		$KOMReviewChartCompositionCollectionData: {
			KOMSpacingGroupingTotal: 0,
		},
	}, inputData);
};

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	describe(`KOMReviewDetail_Localize-${ languageCode }`, function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage: languageCode,
				KOMReviewDetailDeck: JSON.stringify(uDeck({
					$KOMDeckTodayReviewCount: 0,
					$KOMDeckTodayUnseenCount: 0,
					$KOMDeckTodayStudiedCount: 0,
				})),
			});
		});

		it('localizes KOMReviewDetailToolbarBackButton', function () {
			browser.assert.attribute(KOMReviewDetailToolbarBackButton, 'title', uLocalized('KOMReviewDetailToolbarBackButtonText'));
		});

		it('localizes KOMReviewDetailToolbarCardsButton', function () {
			browser.assert.text(KOMReviewDetailToolbarCardsButton, uLocalized('KOMReviewDetailToolbarCardsButtonText'));
		});

		it('localizes KOMReviewDetailStudyHeading', function () {
			browser.assert.text(KOMReviewDetailStudyHeading, uLocalized('KOMReviewDetailGameOptionsHeadingText'));
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

		it('localizes KOMReviewDetailFormAudioIsEnabledField', function () {
			browser.assert.text(KOMReviewDetailFormAudioIsEnabledFieldLabel, uLocalized('KOMReviewDetailFormAudioIsEnabledFieldLabelText'));
		});

		it('localizes KOMReviewDetailFormFrontSpeechIsEnabledFieldLabel', function () {
			browser.assert.text(KOMReviewDetailFormFrontSpeechIsEnabledFieldLabel, uLocalized('KOMReviewDetailFormFrontSpeechIsEnabledFieldLabelText'));
		});

		it('localizes KOMReviewDetailFormRearSpeechIsEnabledFieldLabel', function () {
			browser.assert.text(KOMReviewDetailFormRearSpeechIsEnabledFieldLabel, uLocalized('KOMReviewDetailFormRearSpeechIsEnabledFieldLabelText'));
		});

		it('localizes KOMReviewDetailFormIsForwardOnlyFieldLabel', function () {
			browser.assert.text(KOMReviewDetailFormIsForwardOnlyFieldLabel, uLocalized('KOMReviewDetailFormIsForwardOnlyFieldLabelText'));
		});

		it('localizes KOMReviewDetailFormRetireCardsFieldLabel', function () {
			browser.assert.text(KOMReviewDetailFormRetireCardsFieldLabel, uLocalized('KOMReviewDetailFormRetireCardsFieldLabelText'));
		});

		it('localizes KOMReviewDetailFormRetireCardsFieldOptionNever', function () {
			browser.assert.text(KOMReviewDetailFormRetireCardsFieldOptionNever, uLocalized('KOMReviewDetailFormRetireCardsFieldOptionNeverText'));
		});

		it('localizes KOMReviewDetailFormRetireCardsFieldOptionOneMonth', function () {
			browser.assert.text(KOMReviewDetailFormRetireCardsFieldOptionOneMonth, uLocalized('KOMReviewDetailFormRetireCardsFieldOptionOneMonthText'));
		});

		it('localizes KOMReviewDetailFormRetireCardsFieldOptionThreeMonths', function () {
			browser.assert.text(KOMReviewDetailFormRetireCardsFieldOptionThreeMonths, uLocalized('KOMReviewDetailFormRetireCardsFieldOptionThreeMonthsText'));
		});

		it('localizes KOMReviewDetailFormRetireCardsFieldOptionSixMonths', function () {
			browser.assert.text(KOMReviewDetailFormRetireCardsFieldOptionSixMonths, uLocalized('KOMReviewDetailFormRetireCardsFieldOptionSixMonthsText'));
		});

		it('localizes KOMReviewDetailFormRetireCardsFieldOptionTwelveMonths', function () {
			browser.assert.text(KOMReviewDetailFormRetireCardsFieldOptionTwelveMonths, uLocalized('KOMReviewDetailFormRetireCardsFieldOptionTwelveMonthsText'));
		});

		it('localizes KOMReviewDetailLauncherItemExport', function () {
			return browser.assert.OLSKLauncherItemText('KOMReviewDetailLauncherItemExport', uLocalized('KOMReviewDetailLauncherItemExportText'));
		});

		context('on discard', function () {

			it('localizes KOMReviewDetailDiscardPrompt', function () {
				browser.assert.OLSKPromptQuestion(function () {
					return browser.pressButton(KOMReviewDetailDiscardButton);
				}, uLocalized('KOMReviewDetailDiscardPromptText'));
			});

		});

		context('on rename', function () {

			it('localizes KOMReviewDetailRenameButtonPrompt', function () {
				browser.assert.OLSKPromptQuestion(function () {
					return browser.pressButton(KOMReviewDetailRenameButton);
				}, uLocalized('KOMReviewDetailRenameButtonPromptText'));
			});

		});

		context('cards', function test_cards() {

			before(function () {
				return browser.OLSKVisit(kDefaultRoute, {
					OLSKRoutingLanguage: languageCode,
					KOMReviewDetailDeck: JSON.stringify(uDeck({
						$KOMDeckTodayReviewCount: 1,
						$KOMDeckTodayUnseenCount: 1,
						$KOMDeckTodayStudiedCount: 0,
					})),
				});
			});

			it('localizes KOMReviewDetailPlayButton', function () {
				browser.assert.text(KOMReviewDetailPlayButton, uLocalized('KOMReviewDetailPlayButtonText'));
			});

			it('localizes KOMReviewDetailLauncherItemPlayReviewing', function () {
				return browser.assert.OLSKLauncherItemText('KOMReviewDetailLauncherItemPlayReviewing', uLocalized('KOMReviewDetailLauncherItemPlayReviewingText'));
			});

			it('localizes KOMReviewDetailLauncherItemPlayUnseen', function () {
				return browser.assert.OLSKLauncherItemText('KOMReviewDetailLauncherItemPlayUnseen', uLocalized('KOMReviewDetailLauncherItemPlayUnseenText'));
			});

		});

		context('finished', function test_finished() {

			before(function () {
				return browser.OLSKVisit(kDefaultRoute, {
					OLSKRoutingLanguage: languageCode,
					KOMReviewDetailDeck: JSON.stringify(uDeck({
						$KOMDeckTodayReviewCount: 0,
						$KOMDeckTodayUnseenCount: 0,
						$KOMDeckTodayStudiedCount: 1,
						$KOMDeckGeneralNotUnseenCount: 1,
						$KOMReviewChartCompositionCollectionData: {
							KOMSpacingGroupingTotal: 1,
							KOMSpacingGroupingUnseen: 2,
							KOMSpacingGroupingDeveloping: 3,
							KOMSpacingGroupingMature: 4,
							KOMSpacingGroupingRetired: 5,
						},
					})),
				});
			});

			it('localizes KOMReviewDetailNoSpacings', function () {
				browser.assert.text(KOMReviewDetailNoSpacings, uLocalized('KOMReviewDetailNoSpacingsText'));
			});

		});

	});

});
