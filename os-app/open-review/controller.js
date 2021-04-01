exports.OLSKControllerRoutes = function () {
	return [{
		OLSKRoutePath: '/review',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'KOMReviewRoute',
		OLSKRouteFunction(req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'ui-view'));
		},
		OLSKRouteLanguageCodes: ['en', 'fr', 'es', 'pt'],
	}];
};
