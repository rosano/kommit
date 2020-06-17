exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/KOMReviewDetailFigures',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'KOMReviewDetailFiguresStubRoute',
		OLSKRouteFunction (req, res, next) {
			return res.render(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguages: ['en'],
	}];
};
