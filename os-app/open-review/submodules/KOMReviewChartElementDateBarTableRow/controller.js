exports.OLSKControllerRoutes = function () {
	return [{
		OLSKRoutePath: '/stub/KOMReviewChartElementDateBarTableRow',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'KOMReviewChartElementDateBarTableRowStubRoute',
		OLSKRouteFunction(req, res, next) {
			return res.render(require('path').join(__dirname, 'stub-view'));
		},
	}];
};
