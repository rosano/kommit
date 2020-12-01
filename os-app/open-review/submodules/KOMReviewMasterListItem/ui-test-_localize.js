const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe(`KOMReviewMasterListItem_Localize-${ OLSKRoutingLanguage }`, function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
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
