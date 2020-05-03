const { throws, deepEqual } = require('assert');

const mainModule = require('./storage.js').default;

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
			KOMCardQuestion: 'delta',
			KOMCardAnswer: 'echo',
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
		deepEqual(mainModule.KOMCardStorageCollectionPath(kTesting.StubDeckObjectValid()), 'kom_decks/alfa/kom_cards/');
	});

});

describe('KOMCardStorageObjectPath', function test_KOMCardStorageObjectPath() {

	it('throws if param1 not valid', function () {
		throws(function () {
			mainModule.KOMCardStorageCollectionPath({}, kTesting.StubDeckObjectValid());
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param2 not valid', function () {
		throws(function () {
			mainModule.KOMCardStorageCollectionPath(kTesting.StubCardObjectValid(), {});
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.KOMCardStorageObjectPath(kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid()), `${ mainModule.KOMCardStorageCollectionPath(kTesting.StubDeckObjectValid()) }${ kTesting.StubCardObjectValid().KOMCardCreationDate.toJSON().split('T').shift() }/charlie/main`);
	});

});
