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

					KOMReviewLauncherItemSelectDeckText: res.locals.OLSKFormatted(res.locals.OLSKLocalized('KOMReviewLauncherItemSelectDeckTextFormat'), '…'),
					KOMReviewLauncherItemToggleExcludeTripleQuestionMarkText: res.locals.OLSKLocalized('KOMReviewLauncherItemToggleExcludeTripleQuestionMarkText'),

					KOMReviewLauncherItemSendLoginLinkText: res.locals.OLSKLocalized('KOMReviewLauncherItemSendLoginLinkText'),
					KOMReviewLauncherItemDebugFlushDataText: res.locals.OLSKLocalized('KOMReviewLauncherItemDebugFlushDataText'),

					KOMReviewDetailPlayButtonReviewingText: res.locals.OLSKLocalized('KOMReviewDetailPlayButtonReviewingText'),
					KOMReviewDetailPlayButtonUnseenText: res.locals.OLSKLocalized('KOMReviewDetailPlayButtonUnseenText'),
					
					KOMReviewLauncherItemDebugCardText: res.locals.OLSKLocalized('KOMReviewLauncherItemDebugCardText'),
				}),
				OLSKStringReplaceTokens: require('OLSKString').OLSKStringReplaceTokens,
				IsTestingBehaviour: req.hostname.match('loc.tests'),
			});
		},
		_OLSKRouteLanguages: ['en'],
	}];
};
