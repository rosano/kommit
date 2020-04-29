exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/KOMBrowse',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'KOMBrowseStubRoute',
		OLSKRouteFunction (req, res, next) {
			return res.render(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguages: ['en'],
	}];
};