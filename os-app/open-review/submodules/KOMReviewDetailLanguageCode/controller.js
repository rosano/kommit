exports.OLSKControllerRoutes = function () {
	return [{
		OLSKRoutePath: '/stub/KOMReviewDetailLanguageCode',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'KOMReviewDetailLanguageCodeStubRoute',
		OLSKRouteFunction(req, res, next) {
			return res.OLSKLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguageCodes: ['en', 'fr', 'es'],
	}];
};
