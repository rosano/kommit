exports.OLSKControllerRoutes = function () {
	return [{
		OLSKRoutePath: '/stub/KOMReviewChartElementHorizontalStackedBar',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'KOMReviewChartElementHorizontalStackedBarStubRoute',
		OLSKRouteFunction(req, res, next) {
			return res.render(require('path').join(__dirname, 'stub-view'));
		},
	}];
};
