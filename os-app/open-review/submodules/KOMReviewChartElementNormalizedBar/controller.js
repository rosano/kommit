exports.OLSKControllerRoutes = function () {
	return [{
		OLSKRoutePath: '/stub/KOMReviewChartElementNormalizedBar',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'KOMReviewChartElementNormalizedBarStubRoute',
		OLSKRouteFunction(req, res, next) {
			return res.render(require('path').join(__dirname, 'stub-view'));
		},
	}];
};
