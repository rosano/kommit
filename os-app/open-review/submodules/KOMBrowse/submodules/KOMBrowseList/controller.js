exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/KOMBrowseList',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'KOMBrowseListStubRoute',
		OLSKRouteFunction (req, res, next) {
			return res.render(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguages: ['en'],
	}];
};
