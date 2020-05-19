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
