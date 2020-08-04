const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	describe(`KOMReviewMasterListItem_Localize-${ languageCode }`, function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage: languageCode,
				KOMReviewMasterListItemName: 'alfa',
				KOMReviewMasterListItemReviewCount: 1,
				KOMReviewMasterListItemUnseenCount: 2,
			});
		});

		it('localizes KOMReviewMasterListItemReviewLabel', function () {
			browser.assert.text(KOMReviewMasterListItemReviewLabel, uLocalized('KOMReviewMasterListItemReviewLabelText'));
		});

		it('localizes KOMReviewMasterListItemUnseenLabel', function () {
			browser.assert.text(KOMReviewMasterListItemUnseenLabel, uLocalized('KOMReviewMasterListItemUnseenLabelText'));
		});

	});

});
