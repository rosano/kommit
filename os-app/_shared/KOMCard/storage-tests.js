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
			KOMCardRearText: 'echo',
			KOMCardCreationDate: new Date('2019-04-13T10:52:36Z'),
			KOMCardModificationDate: new Date('2019-04-13T10:52:36Z'),
		};
	},
};

describe('KOMCardStorageCollectionPath', function test_KOMCardStorageCollectionPath() {

	it('throws if not valid', function () {
		throws(function () {
			mainModule.KOMCardStorageCollectionPath('');
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.KOMCardStorageCollectionPath('alfa'), KOMDeckStorage.KOMDeckStorageFolderPath('alfa') + 'kom_cards/');
	});

});

describe('KOMCardStorageFolderPath', function test_KOMCardStorageFolderPath() {

	it('throws if param2 not valid', function () {
		throws(function () {
			mainModule.KOMCardStorageFolderPath({});
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.KOMCardStorageFolderPath(kTesting.StubCardObjectValid()), mainModule.KOMCardStorageCollectionPath(kTesting.StubDeckObjectValid().KOMDeckID) + kTesting.StubCardObjectValid().KOMCardCreationDate.toJSON().split('T').shift() + '/charlie/');
	});

});

describe('KOMCardStorageObjectPath', function test_KOMCardStorageObjectPath() {

	it('throws if not valid', function () {
		throws(function () {
			mainModule.KOMCardStorageObjectPath({});
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.KOMCardStorageObjectPath(kTesting.StubCardObjectValid()), mainModule.KOMCardStorageFolderPath(kTesting.StubCardObjectValid()) + 'main');
	});

});

describe('KOMCardStorageAudioPathFront', function test_KOMCardStorageAudioPathFront() {

	it('throws if not valid', function () {
		throws(function () {
			mainModule.KOMCardStorageAudioPathFront({});
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.KOMCardStorageAudioPathFront(kTesting.StubCardObjectValid()), mainModule.KOMCardStorageFolderPath(kTesting.StubCardObjectValid()) + 'side-front/audio');
	});

});

describe('KOMCardStorageAudioPathRear', function test_KOMCardStorageAudioPathRear() {

	it('throws if not valid', function () {
		throws(function () {
			mainModule.KOMCardStorageAudioPathRear({});
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.KOMCardStorageAudioPathRear(kTesting.StubCardObjectValid()), mainModule.KOMCardStorageFolderPath(kTesting.StubCardObjectValid()) + 'side-rear/audio');
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
		const item = mainModule.KOMCardStorageCollectionPath(kTesting.StubDeckObjectValid().KOMDeckID);
		deepEqual(mainModule.KOMCardStorageMatch(mainModule.KOMCardStorageObjectPath(kTesting.StubCardObjectValid()).replace(item, item.slice(0, -2) + '/')), false);
	});

	it('returns false if no KOMCardStorageObjectPath', function() {
		deepEqual(mainModule.KOMCardStorageMatch(mainModule.KOMCardStorageObjectPath(kTesting.StubCardObjectValid()).slice(0, -1)), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.KOMCardStorageMatch(mainModule.KOMCardStorageObjectPath(kTesting.StubCardObjectValid())), true);
	});

});
