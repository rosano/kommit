exports.OLSKControllerUseLivereload = function () {
	return process.env.NODE_ENV === 'development';
};

exports.OLSKControllerRoutes = function () {
	return [{
		OLSKRoutePath: '/guide',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'KOMGuideRoute',
		OLSKRouteFunction(req, res, next) {
			const filePath = require('path').join(__dirname, '__compiled/ignore');

			require('OLSKDisk').OLSKDiskWriteFile(filePath, require('OLSKDisk').OLSKDiskReadFile(require('path').join(__dirname, '../_shared/KOMSharedLogic/main.js')).replace('export default mod;', 'Object.assign(exports, mod);'));

			const KOMSharedLogic = require(filePath);

			return res.render(require('path').join(__dirname, 'ui-view'), {
				KOMGuideContent: require('OLSKString').OLSKStringReplaceTokens(require('marked').setOptions({
					gfm: true,
					headerIds: true,
				})(require('fs').readFileSync(require('path').join(__dirname, `text.${ res.locals.OLSKSharedPageCurrentLanguage }.md`), 'utf-8')), {
					KOMGuideTokenColorUnseen: KOMSharedLogic.KOMSharedColorUnseen(),
					KOMGuideTokenColorRelearning: KOMSharedLogic.KOMSharedColorRelearning(),
					KOMGuideTokenColorDeveloping: KOMSharedLogic.KOMSharedColorDeveloping(),
					KOMGuideTokenColorMature: KOMSharedLogic.KOMSharedColorMature(),
					KOMGuideTokenColorSuspended: KOMSharedLogic.KOMSharedColorSuspended(),

					KOMReviewDetailLauncherItemPlayReviewingText: res.locals.OLSKLocalized('KOMReviewDetailLauncherItemPlayReviewingText'),
					KOMReviewDetailLauncherItemPlayUnseenText: res.locals.OLSKLocalized('KOMReviewDetailLauncherItemPlayUnseenText'),

					KOMReviewLauncherItemSelectDeckText: res.locals.OLSKFormatted(res.locals.OLSKLocalized('KOMReviewLauncherItemSelectDeckTextFormat'), '…'),
					KOMReviewLauncherItemToggleSimplifiedResponseButtonsText: res.locals.OLSKLocalized('KOMReviewLauncherItemToggleSimplifiedResponseButtonsText'),
					KOMReviewMasterLauncherItemToggleExcludeTripleQuestionMarkText: res.locals.OLSKLocalized('KOMReviewMasterLauncherItemToggleExcludeTripleQuestionMarkText'),

					OLSKRemoteStorageLauncherItemCopyLoginLinkText: res.locals.OLSKLocalized('OLSKRemoteStorageLauncherItemCopyLoginLinkText'),
					KOMReviewLauncherItemDebugForceUpdateText: res.locals.OLSKLocalized('KOMReviewLauncherItemDebugForceUpdateText'),
					OLSKRemoteStorageLauncherItemDebugFlushDataText: res.locals.OLSKLocalized('OLSKRemoteStorageLauncherItemDebugFlushDataText'),
					
					KOMBrowseInfoLauncherItemToggleSuspendText: res.locals.OLSKLocalized('KOMBrowseInfoLauncherItemToggleSuspendText'),
					KOMBrowseInfoLauncherItemDebugText: res.locals.OLSKLocalized('KOMBrowseInfoLauncherItemDebugText'),
				}),
				OLSKStringReplaceTokens: require('OLSKString').OLSKStringReplaceTokens,
			});
		},
		_OLSKRouteLanguages: ['en'],
	}];
};
