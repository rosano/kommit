const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('KOMManifest_Misc', function () {

	it('sends json', async function () {
		browser.assert.deepEqual(await (await browser.fetch('http://loc.tests' + kDefaultRoute.OLSKRoutePath)).json(), {
			name: 'Kommit',
			short_name: 'Kommit',
			start_url: require('../open-review/controller.js').OLSKControllerRoutes().shift().OLSKRoutePath,
			display: 'standalone',
			background_color: 'white',
			theme_color: 'white',
			icons: [{
				src: process.env.OLSK_LAYOUT_TOUCH_ICON_URL,
				sizes: '600x600',
				type: 'image/png',
				purpose: 'any maskable',
			}],
		});
	});

});
