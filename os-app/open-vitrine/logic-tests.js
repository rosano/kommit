const { throws, deepEqual } = require('assert');

const mainModule = require('./logic.js');

describe('KOMVitrineRouteGuard', function test_KOMVitrineRouteGuard() {

	const StubEnvValid = function () {
		return {
			KOM_VITRINE_ANKI_URL: 'alfa',
		};
	};

	it('throws if not object', function() {
		throws(function() {
			mainModule.KOMVitrineRouteGuard(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns error if no KOM_VITRINE_ANKI_URL', function () {
		deepEqual(mainModule.KOMVitrineRouteGuard(Object.assign(StubEnvValid(), {
			KOM_VITRINE_ANKI_URL: null,
		})), new Error('KOM_VITRINE_ANKI_URL not defined'));
	});

	it('returns error if KOM_VITRINE_ANKI_URL blank', function () {
		deepEqual(mainModule.KOMVitrineRouteGuard(Object.assign(StubEnvValid(), {
			KOM_VITRINE_ANKI_URL: ' ',
		})), new Error('KOM_VITRINE_ANKI_URL not defined'));
	});

	it('returns error if no KOM_VITRINE_VIDEO_URL', function () {
		deepEqual(mainModule.KOMVitrineRouteGuard(Object.assign(StubEnvValid(), {
			KOM_VITRINE_VIDEO_URL: null,
		})), new Error('KOM_VITRINE_VIDEO_URL not defined'));
	});

	it('returns error if KOM_VITRINE_VIDEO_URL blank', function () {
		deepEqual(mainModule.KOMVitrineRouteGuard(Object.assign(StubEnvValid(), {
			KOM_VITRINE_VIDEO_URL: ' ',
		})), new Error('KOM_VITRINE_VIDEO_URL not defined'));
	});

});
