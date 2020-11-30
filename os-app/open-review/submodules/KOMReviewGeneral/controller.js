exports.OLSKControllerRoutes = function () {
	return [{
		OLSKRoutePath: '/stub/KOMReviewGeneral',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'KOMReviewGeneralStubRoute',
		OLSKRouteFunction(req, res, next) {
			return res.OLSKLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguageCodes: ['en', 'fr', 'es'],
	}];
};
