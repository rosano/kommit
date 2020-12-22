exports.OLSKControllerRoutes = function () {
	return [{
		OLSKRoutePath: '/stub/KOMBrowseInfoTags',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'KOMBrowseInfoTagsStubRoute',
		OLSKRouteFunction(req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguageCodes: ['en', 'fr', 'es'],
	}];
};
