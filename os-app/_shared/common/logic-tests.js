const { throws, deepEqual } = require('assert');

const mainModule = require('./logic.js');

describe('KOMSharedDonateLinkGuard', function test_KOMSharedDonateLinkGuard() {

	const StubEnvValid = function () {
		return {
			KOM_SHARED_DONATE_URL: 'alfa',
		};
	};

	it('throws if not object', function () {
		throws(function () {
			mainModule.KOMSharedDonateLinkGuard(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns error if no KOM_SHARED_DONATE_URL', function () {
		deepEqual(mainModule.KOMSharedDonateLinkGuard(Object.assign(StubEnvValid(), {
			KOM_SHARED_DONATE_URL: null,
		})), new Error('KOM_SHARED_DONATE_URL not defined'));
	});

	it('returns error if KOM_SHARED_DONATE_URL blank', function () {
		deepEqual(mainModule.KOMSharedDonateLinkGuard(Object.assign(StubEnvValid(), {
			KOM_SHARED_DONATE_URL: ' ',
		})), new Error('KOM_SHARED_DONATE_URL not defined'));
	});

});

describe('KOMSharedGitHubLinkGuard', function test_KOMSharedGitHubLinkGuard() {

	const StubEnvValid = function () {
		return {
			KOM_SHARED_GITHUB_URL: 'alfa',
		};
	};

	it('throws if not object', function () {
		throws(function () {
			mainModule.KOMSharedGitHubLinkGuard(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns error if no KOM_SHARED_GITHUB_URL', function () {
		deepEqual(mainModule.KOMSharedGitHubLinkGuard(Object.assign(StubEnvValid(), {
			KOM_SHARED_GITHUB_URL: null,
		})), new Error('KOM_SHARED_GITHUB_URL not defined'));
	});

	it('returns error if KOM_SHARED_GITHUB_URL blank', function () {
		deepEqual(mainModule.KOMSharedGitHubLinkGuard(Object.assign(StubEnvValid(), {
			KOM_SHARED_GITHUB_URL: ' ',
		})), new Error('KOM_SHARED_GITHUB_URL not defined'));
	});

});
