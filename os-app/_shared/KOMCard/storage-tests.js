const { throws, deepEqual } = require('assert');

const mainModule = require('./storage.js').default;
const KOMDeckStorage = require('../KOMDeck/storage.js').default;

describe('KOMCardStorageCollectionName', function test_KOMCardStorageCollectionName() {

	it('returns string', function() {
		deepEqual(mainModule.KOMCardStorageCollectionName(), 'kom_cards');
	});

});

describe('KOMCardStorageCollectionType', function test_KOMCardStorageCollectionType() {

	it('returns string', function() {
		deepEqual(mainModule.KOMCardStorageCollectionType(), 'kom_card');
	});

});

describe('KOMCardStorageCollectionPath', function test_KOMCardStorageCollectionPath() {

	it('throws if not valid', function () {
		throws(function () {
			mainModule.KOMCardStorageCollectionPath('');
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.KOMCardStorageCollectionPath('alfa'), KOMDeckStorage.KOMDeckStorageFolderPath('alfa') +  mainModule.KOMCardStorageCollectionName() + '/');
	});

});

describe('KOMCardStorageFolderPath', function test_KOMCardStorageFolderPath() {

	it('throws if param2 not valid', function () {
		throws(function () {
			mainModule.KOMCardStorageFolderPath({});
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.KOMCardStorageFolderPath(StubCardObjectValid()), mainModule.KOMCardStorageCollectionPath(StubDeckObjectValid().KOMDeckID) + StubCardObjectValid().KOMCardCreationDate.toJSON().split('T').shift() + '/charlie/');
	});

});

describe('KOMCardStorageObjectPath', function test_KOMCardStorageObjectPath() {

	it('throws if not valid', function () {
		throws(function () {
			mainModule.KOMCardStorageObjectPath({});
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.KOMCardStorageObjectPath(StubCardObjectValid()), mainModule.KOMCardStorageFolderPath(StubCardObjectValid()) + 'main');
	});

});

describe('KOMCardStorageAudioPathFront', function test_KOMCardStorageAudioPathFront() {

	it('throws if not valid', function () {
		throws(function () {
			mainModule.KOMCardStorageAudioPathFront({});
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.KOMCardStorageAudioPathFront(StubCardObjectValid()), mainModule.KOMCardStorageFolderPath(StubCardObjectValid()) + 'side-front/audio');
	});

});

describe('KOMCardStorageAudioPathRear', function test_KOMCardStorageAudioPathRear() {

	it('throws if not valid', function () {
		throws(function () {
			mainModule.KOMCardStorageAudioPathRear({});
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.KOMCardStorageAudioPathRear(StubCardObjectValid()), mainModule.KOMCardStorageFolderPath(StubCardObjectValid()) + 'side-rear/audio');
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
		const item = mainModule.KOMCardStorageCollectionPath(StubDeckObjectValid().KOMDeckID);
		deepEqual(mainModule.KOMCardStorageMatch(mainModule.KOMCardStorageObjectPath(StubCardObjectValid()).replace(item, item.slice(0, -2) + '/')), false);
	});

	it('returns false if no KOMCardStorageObjectPath', function() {
		deepEqual(mainModule.KOMCardStorageMatch(mainModule.KOMCardStorageObjectPath(StubCardObjectValid()).slice(0, -1)), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.KOMCardStorageMatch(mainModule.KOMCardStorageObjectPath(StubCardObjectValid())), true);
	});

});
