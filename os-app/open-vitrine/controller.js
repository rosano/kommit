exports.OLSKControllerUseLivereload = function () {
	return process.env.NODE_ENV === 'development';
};

exports.OLSKControllerRoutes = function () {
	return [{
		OLSKRoutePath: '/',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'KOMVitrineRoute',
		OLSKRouteFunction(req, res, next) {
			return res.OLSKLayoutRender(require('path').join(__dirname, 'ui-view'), {
				KOMVitrineContent: res.OLSKMarkdownContent(require('path').join(__dirname, `text.${ res.locals.OLSKSharedPageCurrentLanguage }.md`), {
					KOMVitrineTokenGuideURL: res.locals.OLSKCanonicalFor('KOMGuideRoute'),
					KOMVitrineTokenReviewURL: res.locals.OLSKCanonicalFor('KOMReviewRoute'),

					KOM_VITRINE_ANKI_URL: process.env.KOM_VITRINE_ANKI_URL,
				}),
				OLSKStringReplaceTokens: require('OLSKString').OLSKStringReplaceTokens,
			});
		},
		OLSKRouteLanguageCodes: ['en', 'fr', 'es'],
	}];
};
