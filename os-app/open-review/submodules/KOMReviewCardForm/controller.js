exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/KOMReviewCardForm',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'KOMReviewCardFormStubRoute',
		OLSKRouteFunction (req, res, next) {
			return res.render(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguages: ['en'],
	}];
};
