const { throws, deepEqual } = require('assert');

const mainModule = require('./storage.js').default;
const KOMCardStorage = require('../KOMCard/storage.js').default;
const KOMDeckStorage = require('../KOMDeck/storage.js').default;

const kTesting = {
	StubDeckObjectValid() {
		return {
			KOMDeckID: 'alfa',
			KOMDeckName: 'bravo',
			KOMDeckCreationDate: new Date('2019-02-23T13:56:36Z'),
			KOMDeckModificationDate: new Date('2019-02-23T13:56:36Z'),
		};
	},
	StubCardObjectValid() {
		return {
			KOMCardID: 'charlie',
			KOMCardDeckID: 'delta',
			KOMCardFront: 'echo',
			KOMCardAnswer: 'foxtrot',
			KOMCardCreationDate: new Date('2019-04-13T10:52:36Z'),
			KOMCardModificationDate: new Date('2019-04-13T10:52:36Z'),
		};
	},
};

describe('KOMSpacingStoragePathForward', function test_KOMSpacingStoragePathForward() {

	it('throws if param1 not valid', function () {
		throws(function () {
			mainModule.KOMSpacingStoragePathForward({}, kTesting.StubDeckObjectValid());
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param2 not valid', function () {
		throws(function () {
			mainModule.KOMSpacingStoragePathForward(kTesting.StubCardObjectValid(), {});
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.KOMSpacingStoragePathForward(kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid()), KOMCardStorage.KOMCardStorageObjectPath(kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid()).replace('main', 'spacing-forward'));
	});

});

describe('KOMSpacingStoragePathBackward', function test_KOMSpacingStoragePathBackward() {

	it('throws if param1 not valid', function () {
		throws(function () {
			mainModule.KOMSpacingStoragePathBackward({}, kTesting.StubDeckObjectValid());
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param2 not valid', function () {
		throws(function () {
			mainModule.KOMSpacingStoragePathBackward(kTesting.StubCardObjectValid(), {});
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.KOMSpacingStoragePathBackward(kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid()), KOMCardStorage.KOMCardStorageObjectPath(kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid()).replace('main', 'spacing-backward'));
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
		deepEqual(mainModule.KOMSpacingStorageMatch(KOMCardStorage.KOMCardStorageObjectPath(kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid())), false);
	});

	it('returns true if KOMSpacingStoragePathForward', function() {
		deepEqual(mainModule.KOMSpacingStorageMatch(mainModule.KOMSpacingStoragePathForward(kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid())), true);
	});

	it('returns true if KOMSpacingStoragePathBackward', function() {
		deepEqual(mainModule.KOMSpacingStorageMatch(mainModule.KOMSpacingStoragePathBackward(kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid())), true);
	});

	it('returns false', function() {
		deepEqual(mainModule.KOMSpacingStorageMatch(mainModule.KOMSpacingStoragePathBackward(kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid()).slice(0, -1)), false);
	});

});
