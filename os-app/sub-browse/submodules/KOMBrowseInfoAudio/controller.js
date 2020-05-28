exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/KOMBrowseInfoAudio',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'KOMBrowseInfoAudioStubRoute',
		OLSKRouteFunction (req, res, next) {
			return res.render(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguages: ['en'],
	}];
};
