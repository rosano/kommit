exports.OLSKControllerRoutes = function () {
	return [{
		OLSKRoutePath: '/stub/KOMReviewChartElementDateBarTable',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'KOMReviewChartElementDateBarTableStubRoute',
		OLSKRouteFunction(req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
	}];
};
