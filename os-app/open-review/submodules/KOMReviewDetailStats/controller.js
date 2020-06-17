exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/KOMReviewDetailStats',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'KOMReviewDetailStatsStubRoute',
		OLSKRouteFunction (req, res, next) {
			return res.render(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguages: ['en'],
	}];
};
