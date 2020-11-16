exports.OLSKControllerRoutes = function () {
	return {
		KOMCommonIdentityRedirect: {
			OLSKRoutePath: '/identity.svg',
			OLSKRouteMethod: 'get',
			OLSKRouteRedirect: '/_shared/KOMRootLink/ui-assets/identity.svg',
		},
	};
};

exports.OLSKControllerSharedStaticAssetFolders = function () {
	return [
		'_shared/__external',
	];
};
