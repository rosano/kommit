exports.OLSKControllerRoutes = function () {
	return [{
		OLSKRoutePath: '/stub/KOMReviewDetailLanguageCode',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'KOMReviewDetailLanguageCodeStubRoute',
		OLSKRouteFunction(req, res, next) {
			return res.render(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguages: ['en', 'fr'],
	}];
};
