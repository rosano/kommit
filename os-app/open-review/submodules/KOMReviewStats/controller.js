exports.OLSKControllerRoutes = function () {
	return [{
		OLSKRoutePath: '/stub/KOMReviewStats',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'KOMReviewStatsStubRoute',
		OLSKRouteFunction(req, res, next) {
			return res.OLSKLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguageCodes: ['en', 'fr', 'es'],
	}];
};
