exports.OLSKControllerRoutes = function () {
	return [{
		OLSKRoutePath: '/stub/KOMReviewMaster',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'KOMReviewMasterStubRoute',
		OLSKRouteFunction(req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguageCodes: ['en', 'fr', 'es'],
	}];
};
