exports.OLSKControllerRoutes = function () {
	return [{
		OLSKRoutePath: '/stub/KOMReviewChartElementDateBarTableRow',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'KOMReviewChartElementDateBarTableRowStubRoute',
		OLSKRouteFunction(req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
	}];
};
