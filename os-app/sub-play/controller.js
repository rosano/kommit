exports.OLSKControllerRoutes = function () {
	return [{
		OLSKRoutePath: '/stub/KOMPlay',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'KOMPlayStubRoute',
		OLSKRouteFunction(req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguageCodes: ['en', 'fr', 'es'],
	}];
};
