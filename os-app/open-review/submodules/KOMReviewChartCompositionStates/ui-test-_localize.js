const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	describe(`KOMReviewChartCompositionStates_Localize-${ languageCode }`, function () {
		
		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage: languageCode,
				KOMReviewChartCompositionStatesData: JSON.stringify({
					KOMReviewChartCompositionStatesTotal: 1,
					KOMReviewChartCompositionStatesUnseen: 2,
					KOMReviewChartCompositionStatesDeveloping: 2,
					KOMReviewChartCompositionStatesMature: 3,
					KOMReviewChartCompositionStatesSuspended: 4,
				}),
			});
		});

		it('localizes KOMReviewChartCompositionStatesTotalCardsLabel', function () {
			browser.assert.text(KOMReviewChartCompositionStatesTotalCardsLabel, uLocalized('KOMReviewChartCompositionStatesTotalCardsLabelText'));
		});

		it('localizes KOMReviewChartCompositionStatesUnseenCardsLabel', function () {
			browser.assert.text(KOMReviewChartCompositionStatesUnseenCardsLabel, uLocalized('KOMReviewChartCompositionStatesUnseenCardsLabelText'));
		});

		it('localizes KOMReviewChartCompositionStatesDevelopingCardsLabel', function () {
			browser.assert.text(KOMReviewChartCompositionStatesDevelopingCardsLabel, uLocalized('KOMReviewChartCompositionStatesDevelopingCardsLabelText'));
		});

		it('localizes KOMReviewChartCompositionStatesMatureCardsLabel', function () {
			browser.assert.text(KOMReviewChartCompositionStatesMatureCardsLabel, uLocalized('KOMReviewChartCompositionStatesMatureCardsLabelText'));
		});

		it('localizes KOMReviewChartCompositionStatesSuspendedCardsLabel', function () {
			browser.assert.text(KOMReviewChartCompositionStatesSuspendedCardsLabel, uLocalized('KOMReviewChartCompositionStatesSuspendedCardsLabelText'));
		});

	});

});
