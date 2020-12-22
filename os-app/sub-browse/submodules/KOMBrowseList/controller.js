exports.OLSKControllerRoutes = function () {
	return [{
		OLSKRoutePath: '/stub/KOMBrowseList',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'KOMBrowseListStubRoute',
		OLSKRouteFunction(req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguageCodes: ['en', 'fr', 'es'],
	}];
};
