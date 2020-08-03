exports.OLSKControllerRoutes = function () {
	return [{
		OLSKRoutePath: '/stub/KOMReviewChartCompositionStates',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'KOMReviewChartCompositionStatesStubRoute',
		OLSKRouteFunction(req, res, next) {
			return res.render(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguages: ['en', 'fr'],
	}];
};
