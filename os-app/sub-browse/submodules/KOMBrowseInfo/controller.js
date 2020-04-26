exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/KOMBrowseInfo',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'KOMBrowseInfoStubRoute',
		OLSKRouteFunction (req, res, next) {
			return res.render(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguages: ['en'],
	}];
};
