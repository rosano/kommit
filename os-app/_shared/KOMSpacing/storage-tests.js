const { throws, deepEqual } = require('assert');

const mainModule = require('./storage.js').default;
const KOMCardStorage = require('../KOMCard/storage.js').default;
const KOMDeckStorage = require('../KOMDeck/storage.js').default;

describe('KOMSpacingStorageCollectionType', function test_KOMSpacingStorageCollectionType() {

	it('returns string', function() {
		deepEqual(mainModule.KOMSpacingStorageCollectionType(), 'kom_spacing');
	});

});

describe('KOMSpacingStoragePathForward', function test_KOMSpacingStoragePathForward() {

	it('throws if param1 not valid', function () {
		throws(function () {
			mainModule.KOMSpacingStoragePathForward({}, StubDeckObjectValid());
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param2 not valid', function () {
		throws(function () {
			mainModule.KOMSpacingStoragePathForward(StubCardObjectValid(), {});
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.KOMSpacingStoragePathForward(StubCardObjectValid(), StubDeckObjectValid()), KOMCardStorage.KOMCardStorageObjectPath(StubCardObjectValid(), StubDeckObjectValid()).replace('main', 'spacing-forward'));
	});

});

describe('KOMSpacingStoragePathBackward', function test_KOMSpacingStoragePathBackward() {

	it('throws if param1 not valid', function () {
		throws(function () {
			mainModule.KOMSpacingStoragePathBackward({}, StubDeckObjectValid());
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param2 not valid', function () {
		throws(function () {
			mainModule.KOMSpacingStoragePathBackward(StubCardObjectValid(), {});
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.KOMSpacingStoragePathBackward(StubCardObjectValid(), StubDeckObjectValid()), KOMCardStorage.KOMCardStorageObjectPath(StubCardObjectValid(), StubDeckObjectValid()).replace('main', 'spacing-backward'));
	});

});

describe('KOMSpacingStorageMatch', function test_KOMSpacingStorageMatch() {

	it('throws error if not string', function() {
		throws(function() {
			mainModule.KOMSpacingStorageMatch(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns false if KOMDeckStorageObjectPath', function() {
		deepEqual(mainModule.KOMSpacingStorageMatch(KOMDeckStorage.KOMDeckStorageObjectPath('alfa')), false);
	});

	it('returns false if KOMCardStorageObjectPath', function() {
		deepEqual(mainModule.KOMSpacingStorageMatch(KOMCardStorage.KOMCardStorageObjectPath(StubCardObjectValid(), StubDeckObjectValid())), false);
	});

	it('returns true if KOMSpacingStoragePathForward', function() {
		deepEqual(mainModule.KOMSpacingStorageMatch(mainModule.KOMSpacingStoragePathForward(StubCardObjectValid(), StubDeckObjectValid())), true);
	});

	it('returns true if KOMSpacingStoragePathBackward', function() {
		deepEqual(mainModule.KOMSpacingStorageMatch(mainModule.KOMSpacingStoragePathBackward(StubCardObjectValid(), StubDeckObjectValid())), true);
	});

	it('returns false', function() {
		deepEqual(mainModule.KOMSpacingStorageMatch(mainModule.KOMSpacingStoragePathBackward(StubCardObjectValid(), StubDeckObjectValid()).slice(0, -1)), false);
	});

});
