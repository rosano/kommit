exports.OLSKControllerRoutes = function () {
	return [{
		OLSKRoutePath: '/guide',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'KOMGuideRoute',
		OLSKRouteFunction(req, res, next) {
			const filePath = require('path').join(__dirname, '__compiled/ignore');

			require('OLSKDisk').OLSKDiskWriteFile(filePath, require('OLSKDisk').OLSKDiskReadFile(require('path').join(__dirname, '../_shared/KOMSharedLogic/main.js')).replace('export default mod;', 'Object.assign(exports, mod);'));

			const KOMSharedLogic = require(filePath);

			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'ui-view'), {
				KOMGuideContent: res.OLSKMarkdownContent(require('path').join(__dirname, `text.${ res.locals.OLSKSharedPageCurrentLanguage }.md`), {
					KOMGuideTokenColorUnseen: KOMSharedLogic.KOMSharedColorUnseen(),
					KOMGuideTokenColorRelearning: KOMSharedLogic.KOMSharedColorRelearning(),
					KOMGuideTokenColorDeveloping: KOMSharedLogic.KOMSharedColorDeveloping(),
					KOMGuideTokenColorMature: KOMSharedLogic.KOMSharedColorMature(),
					KOMGuideTokenColorRetired: KOMSharedLogic.KOMSharedColorRetired(),

					KOMReviewLauncherItemSelectDeckText: require('OLSKString').OLSKStringFormatted(res.locals.OLSKLocalized('KOMReviewLauncherItemSelectDeckTextFormat'), '…'),

					KOMReviewRoute: res.locals.OLSKCanonical('KOMReviewRoute'),
				}),
				OLSKStringReplaceTokens: require('OLSKString').OLSKStringReplaceTokens,
			});
		},
		_OLSKRouteLanguageCodes: ['en'],
	}];
};
