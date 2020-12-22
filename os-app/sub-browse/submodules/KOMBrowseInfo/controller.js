exports.OLSKControllerRoutes = function () {
	return [{
		OLSKRoutePath: '/stub/KOMBrowseInfo',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'KOMBrowseInfoStubRoute',
		OLSKRouteFunction(req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguageCodes: ['en', 'fr', 'es'],
	}];
};
