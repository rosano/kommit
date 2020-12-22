exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/KOMFeatureList',
		OLSKRouteMethod: 'get',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'main'));
		},
		OLSKRouteSignature: 'KOMFeatureListStubRoute',
		OLSKRouteLanguageCodes: ['en', 'fr', 'es'],
	}];
};
