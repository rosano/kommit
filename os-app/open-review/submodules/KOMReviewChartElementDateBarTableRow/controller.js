exports.OLSKControllerRoutes = function () {
	return [{
		OLSKRoutePath: '/stub/KOMReviewChartElementDateBarTableRow',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'KOMReviewChartElementDateBarTableRowStubRoute',
		OLSKRouteFunction(req, res, next) {
			return res.OLSKLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
	}];
};
