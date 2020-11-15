exports.OLSKControllerRoutes = function () {
	return [{
		OLSKRoutePath: '/review',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'KOMReviewRoute',
		OLSKRouteFunction(req, res, next) {
			return res.OLSKLayoutRender(require('path').join(__dirname, 'ui-view'));
		},
		OLSKRouteLanguages: ['en', 'fr', 'es'],
	}];
};
