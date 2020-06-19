const { throws, deepEqual } = require('assert');

const mainModule = require('./storage.js').default;
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
			KOMCardDeckID: 'alfa',
			KOMCardFrontText: 'delta',
			KOMCardRear: 'echo',
			KOMCardCreationDate: new Date('2019-04-13T10:52:36Z'),
			KOMCardModificationDate: new Date('2019-04-13T10:52:36Z'),
		};
	},
};

describe('KOMCardStorageCollectionPath', function test_KOMCardStorageCollectionPath() {

	it('throws if not valid', function () {
		throws(function () {
			mainModule.KOMCardStorageCollectionPath({});
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.KOMCardStorageCollectionPath(kTesting.StubDeckObjectValid()), KOMDeckStorage.KOMDeckStorageFolderPath('alfa') + 'kom_cards/');
	});

});

describe('KOMCardStorageFolderPath', function test_KOMCardStorageFolderPath() {

	it('throws if param1 not valid', function () {
		throws(function () {
			mainModule.KOMCardStorageFolderPath({}, kTesting.StubDeckObjectValid());
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param2 not valid', function () {
		throws(function () {
			mainModule.KOMCardStorageFolderPath(kTesting.StubCardObjectValid(), {});
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.KOMCardStorageFolderPath(kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid()), mainModule.KOMCardStorageCollectionPath(kTesting.StubDeckObjectValid()) + kTesting.StubCardObjectValid().KOMCardCreationDate.toJSON().split('T').shift() + '/charlie/');
	});

});

describe('KOMCardStorageObjectPath', function test_KOMCardStorageObjectPath() {

	it('throws if param1 not valid', function () {
		throws(function () {
			mainModule.KOMCardStorageObjectPath({}, kTesting.StubDeckObjectValid());
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param2 not valid', function () {
		throws(function () {
			mainModule.KOMCardStorageObjectPath(kTesting.StubCardObjectValid(), {});
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.KOMCardStorageObjectPath(kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid()), mainModule.KOMCardStorageFolderPath(kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid()) + 'main');
	});

});

describe('KOMCardStorageAudioPathFront', function test_KOMCardStorageAudioPathFront() {

	it('throws if param1 not valid', function () {
		throws(function () {
			mainModule.KOMCardStorageAudioPathFront({}, kTesting.StubDeckObjectValid());
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param2 not valid', function () {
		throws(function () {
			mainModule.KOMCardStorageAudioPathFront(kTesting.StubCardObjectValid(), {});
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.KOMCardStorageAudioPathFront(kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid()), mainModule.KOMCardStorageFolderPath(kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid()) + 'front/audio');
	});

});

describe('KOMCardStorageAudioPathRear', function test_KOMCardStorageAudioPathRear() {

	it('throws if param1 not valid', function () {
		throws(function () {
			mainModule.KOMCardStorageAudioPathRear({}, kTesting.StubDeckObjectValid());
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param2 not valid', function () {
		throws(function () {
			mainModule.KOMCardStorageAudioPathRear(kTesting.StubCardObjectValid(), {});
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.KOMCardStorageAudioPathRear(kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid()), mainModule.KOMCardStorageFolderPath(kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid()) + 'rear/audio');
	});

});

describe('KOMCardStorageMatch', function test_KOMCardStorageMatch() {

	it('throws error if not string', function() {
		throws(function() {
			mainModule.KOMCardStorageMatch(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns false if KOMDeckStorageObjectPath', function() {
		deepEqual(mainModule.KOMCardStorageMatch(KOMDeckStorage.KOMDeckStorageObjectPath('alfa')), false);
	});

	it('returns false if no KOMCardStorageCollectionPath', function() {
		const item = mainModule.KOMCardStorageCollectionPath(kTesting.StubDeckObjectValid());
		deepEqual(mainModule.KOMCardStorageMatch(mainModule.KOMCardStorageObjectPath(kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid()).replace(item, item.slice(0, -2) + '/')), false);
	});

	it('returns false if no KOMCardStorageObjectPath', function() {
		deepEqual(mainModule.KOMCardStorageMatch(mainModule.KOMCardStorageObjectPath(kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid()).slice(0, -1)), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.KOMCardStorageMatch(mainModule.KOMCardStorageObjectPath(kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid())), true);
	});

});
