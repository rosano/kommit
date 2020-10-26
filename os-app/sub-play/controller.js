exports.OLSKControllerRoutes = function () {
	return [{
		OLSKRoutePath: '/stub/KOMPlay',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'KOMPlayStubRoute',
		OLSKRouteFunction(req, res, next) {
			return res.render(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguages: ['en', 'fr', 'es'],
	}];
};
