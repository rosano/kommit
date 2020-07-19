import { deepEqual } from 'assert';

describe('KOMCommon_Access', function test_KOMCommon_Access() {

	it('redirects KOMCommonIdentityRedirect', async function () {
		deepEqual((await (await browser.fetch('http://loc.tests' + OLSKTestingCanonical(require('./controller.js').OLSKControllerRoutes().KOMCommonIdentityRedirect))).text()).slice(0, 10), '<?xml vers');
	});

});
