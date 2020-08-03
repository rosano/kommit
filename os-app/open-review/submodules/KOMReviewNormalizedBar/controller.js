exports.OLSKControllerRoutes = function () {
	return [{
		OLSKRoutePath: '/stub/KOMReviewNormalizeBar',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'KOMReviewNormalizeBarStubRoute',
		OLSKRouteFunction(req, res, next) {
			return res.render(require('path').join(__dirname, 'stub-view'));
		},
	}];
};
