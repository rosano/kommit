const kKOMServiceWorkerVersionID = process.env.HEROKU_SLUG_COMMIT || Date.now();

const OLSKServiceWorker = require('../_shared/__external/OLSKServiceWorker/main.js');

exports.OLSKControllerRoutes = function() {
	return {
		KOMServiceWorkerRoute: {
			OLSKRoutePath: '/sw.js',
			OLSKRouteMethod: 'get',
			OLSKRouteFunction (req, res, next) {
				return res.type('js').send(OLSKServiceWorker.OLSKServiceWorkerView({
					VERSION_ID_TOKEN: kKOMServiceWorkerVersionID.toString(),
					REFERRER_MATCH_TOKEN: res.locals.OLSKCanonicalFor('KOMTrackRoute').replace(/\//g, '\\/'),
				}));
			},
		},
	};
};
