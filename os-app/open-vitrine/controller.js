exports.OLSKControllerUseLivereload = function () {
	return process.env.NODE_ENV === 'development';
};

exports.OLSKControllerSharedMiddlewares = function () {
	return {
		KOMVitrineRouteGuardMiddleware(req, res, next) {
			return next(require('./logic.js').KOMVitrineRouteGuard(process.env));
		},
	};
};

exports.OLSKControllerRoutes = function () {
	return [{
		OLSKRoutePath: '/',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'KOMVitrineRoute',
		OLSKRouteFunction(req, res, next) {
			return res.render(require('path').join(__dirname, 'ui-view'), {
				KOMVitrineContent: require('OLSKString').OLSKStringReplaceTokens(require('marked').setOptions({
					gfm: true,
					headerIds: false,
				})(require('fs').readFileSync(require('path').join(__dirname, `text.${ res.locals.OLSKSharedPageCurrentLanguage }.md`), 'utf-8')), {
					KOMVitrineDescription: res.locals.OLSKLocalized('KOMVitrineDescription'),

					KOMVitrineTokenReviewURL: res.locals.OLSKCanonicalLocalizedFor('KOMReviewRoute'),
					KOM_VITRINE_ANKI_URL: process.env.KOM_VITRINE_ANKI_URL,
					KOM_SHARED_DONATE_URL: process.env.KOM_SHARED_DONATE_URL,
					KOM_SHARED_GITHUB_URL: process.env.KOM_SHARED_GITHUB_URL,
				}),
				OLSKStringReplaceTokens: require('OLSKString').OLSKStringReplaceTokens,
				IsTestingBehaviour: req.hostname.match('loc.tests'),
			});
		},
		OLSKRouteLanguages: ['en', 'fr'],
		OLSKRouteMiddlewares: [
			'KOMVitrineRouteGuardMiddleware',
			'KOMSharedGitHubLinkGuardMiddleware',
			'KOMSharedDonateLinkGuardMiddleware',
		],
	}];
};
