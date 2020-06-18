exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/review',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'KOMReviewRoute',
		OLSKRouteFunction (req, res, next) {
			return res.render(require('path').join(__dirname, 'ui-view'));
		},
		OLSKRouteLanguages: ['en', 'fr'],
	}];
};
