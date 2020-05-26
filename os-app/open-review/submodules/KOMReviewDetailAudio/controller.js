exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/KOMReviewDetailAudio',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'KOMReviewDetailAudioStubRoute',
		OLSKRouteFunction (req, res, next) {
			return res.render(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguages: ['en'],
	}];
};
