exports.OLSKControllerRoutes = function () {
	return [{
		OLSKRoutePath: '/stub/KOMReviewChartElementHorizontalStackedBar',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'KOMReviewChartElementHorizontalStackedBarStubRoute',
		OLSKRouteFunction(req, res, next) {
			return res.OLSKLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
	}];
};
