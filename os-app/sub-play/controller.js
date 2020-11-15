exports.OLSKControllerRoutes = function () {
	return [{
		OLSKRoutePath: '/stub/KOMPlay',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'KOMPlayStubRoute',
		OLSKRouteFunction(req, res, next) {
			return res.OLSKLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguages: ['en', 'fr', 'es'],
	}];
};
