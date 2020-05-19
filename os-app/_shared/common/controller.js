exports.OLSKControllerRoutes = function() {
	return {
		KOMCommonIdentityRedirect: {
			OLSKRoutePath: '/identity.svg',
			OLSKRouteMethod: 'get',
			OLSKRouteRedirect: '/_shared/KOMRootLink/ui-assets/identity.svg',
		},
	};
};

exports.OLSKControllerSharedMiddlewares = function() {
	return {
		KOMSharedDonateLinkGuardMiddleware (req, res, next) {
			return next(require('./logic.js').KOMSharedDonateLinkGuard(process.env));
		},
		KOMSharedGitHubLinkGuardMiddleware (req, res, next) {
			return next(require('./logic.js').KOMSharedGitHubLinkGuard(process.env));
		},
	};
};

exports.OLSKControllerSharedStaticAssetFolders = function() {
	return [
		'_shared/__external',
	];
};
