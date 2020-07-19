const { rejects, deepEqual } = require('assert');

const mainModule = require('./action.js').default;
const KOMCardStorage = require('./storage.js').default;
const KOMSpacingStorage = require('../KOMSpacing/storage.js').default;
const OLSKRemoteStorage = require('OLSKRemoteStorage');

const kTesting = {
	StubDeckObjectValid() {
		return {
			KOMDeckID: 'alfa',
			KOMDeckName: '',
			KOMDeckCreationDate: new Date('2019-02-23T13:56:36Z'),
			KOMDeckModificationDate: new Date('2019-02-23T13:56:36Z'),
		};
	},
	StubCardObject() {
		return {
			KOMCardFrontText: 'bravo',
			KOMCardRearText: 'charlie',
		};
	},
	StubCardObjectValid() {
		return {
			KOMCardID: 'bravo',
			KOMCardDeckID: 'alfa',
			KOMCardFrontText: 'charlie',
			KOMCardRearText: 'delta',
			KOMCardCreationDate: new Date('2019-02-23T13:56:36Z'),
			KOMCardModificationDate: new Date('2019-02-23T13:56:36Z'),
		};
	},
	StubSpacingObjectValid() {
		return {
			KOMSpacingID: 'bravo-forward',
			KOMSpacingChronicles: [],
		};
	},
	uSerial(inputData) {
		return inputData.reduce(async function (coll, e) {
			return e.then(Array.prototype.concat.bind(await coll));
		}, Promise.resolve([]));
	},
	uSleep(inputData) {
		let endTime = new Date().getTime();
		while (new Date().getTime() < endTime + inputData) {}
	},
};

describe('KOMCardActionCreate', function test_KOMCardActionCreate() {

	it('rejects if param1 not object', async function () {
		await rejects(mainModule.KOMCardActionCreate(KOMTestingStorageClient, null, kTesting.StubDeckObjectValid()), /KOMErrorInputNotValid/);
	});

	it('rejects if param2 not valid', async function () {
		await rejects(mainModule.KOMCardActionCreate(KOMTestingStorageClient, kTesting.StubCardObject(), {}), /KOMErrorInputNotValid/);
	});

	it('returns object with KOMErrors if param1 not valid', async function () {
		deepEqual((await mainModule.KOMCardActionCreate(KOMTestingStorageClient, Object.assign(kTesting.StubCardObject(), {
			KOMCardFrontText: null,
		}), kTesting.StubDeckObjectValid())).KOMErrors, {
			KOMCardFrontText: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns KOMCard', async function () {
		let item = await mainModule.KOMCardActionCreate(KOMTestingStorageClient, kTesting.StubCardObject(), kTesting.StubDeckObjectValid());

		deepEqual(item, Object.assign(kTesting.StubCardObject(), {
			KOMCardID: item.KOMCardID,
			KOMCardDeckID: kTesting.StubDeckObjectValid().KOMDeckID,
			KOMCardCreationDate: item.KOMCardCreationDate,
			KOMCardModificationDate: item.KOMCardModificationDate,
			'@context': item['@context'],
		}));
	});

	it('sets KOMCardID to unique value', async function () {
		let items = await kTesting.uSerial(Array.from(Array(10)).map(async function (e) {
			return (await mainModule.KOMCardActionCreate(KOMTestingStorageClient, kTesting.StubCardObject(), kTesting.StubDeckObjectValid())).KOMCardID;
		}));
		deepEqual([...(new Set(items))], items);
	});

	it('sets KOMCardCreationDate to now', async function () {
		deepEqual(new Date() - (await mainModule.KOMCardActionCreate(KOMTestingStorageClient, kTesting.StubCardObject(), kTesting.StubDeckObjectValid())).KOMCardCreationDate < 100, true);
	});

	it('sets KOMCardModificationDate to now', async function () {
		deepEqual(new Date() - (await mainModule.KOMCardActionCreate(KOMTestingStorageClient, kTesting.StubCardObject(), kTesting.StubDeckObjectValid())).KOMCardModificationDate < 100, true);
	});

});

describe('KOMCardActionUpdate', function test_KOMCardActionUpdate() {

	it('rejects if not object', async function () {
		await rejects(mainModule.KOMCardActionUpdate(KOMTestingStorageClient, null), /KOMErrorInputNotValid/);
	});

	it('returns object with KOMErrors if not valid', async function () {
		deepEqual((await mainModule.KOMCardActionUpdate(KOMTestingStorageClient, Object.assign(await mainModule.KOMCardActionCreate(KOMTestingStorageClient, kTesting.StubCardObject(), kTesting.StubDeckObjectValid()), {
			KOMCardID: null,
		}))).KOMErrors, {
			KOMCardID: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns KOMCard', async function () {
		let itemCreated = await mainModule.KOMCardActionCreate(KOMTestingStorageClient, kTesting.StubCardObject(), kTesting.StubDeckObjectValid());

		let item = await mainModule.KOMCardActionUpdate(KOMTestingStorageClient, itemCreated);

		deepEqual(item, Object.assign(itemCreated, {
			KOMCardModificationDate: item.KOMCardModificationDate,
		}));
	});

	it('sets KOMCardModificationDate to now', async function () {
		deepEqual(new Date() - (await mainModule.KOMCardActionUpdate(KOMTestingStorageClient, await mainModule.KOMCardActionCreate(KOMTestingStorageClient, kTesting.StubCardObject(), kTesting.StubDeckObjectValid()))).KOMCardModificationDate < 100, true);
	});

	it('writes inputData if not found', async function () {
		let item = await mainModule.KOMCardActionUpdate(KOMTestingStorageClient, Object.assign(kTesting.StubCardObject(), {
			KOMCardID: 'alfa',
			KOMCardCreationDate: new Date(),
			KOMCardDeckID: kTesting.StubDeckObjectValid().KOMDeckID,
		}));
		deepEqual(item, Object.assign(kTesting.StubCardObject(), {
			KOMCardID: item.KOMCardID,
			KOMCardDeckID: kTesting.StubDeckObjectValid().KOMDeckID,
			KOMCardCreationDate: item.KOMCardCreationDate,
			KOMCardModificationDate: item.KOMCardModificationDate,
			'@context': item['@context'],
		}));
	});

});

describe('KOMCardActionDelete', function test_KOMCardActionDelete() {

	it('rejects if param1 not valid', async function () {
		await rejects(mainModule.KOMCardActionDelete(KOMTestingStorageClient, {}), /KOMErrorInputNotValid/);
	});

	it('rejects if param2 not valid', async function () {
		await rejects(mainModule.KOMCardActionDelete(KOMTestingStorageClient, kTesting.StubCardObject(), {}), /KOMErrorInputNotValid/);
	});

	it('returns statusCode', async function () {
		deepEqual(await mainModule.KOMCardActionDelete(KOMTestingStorageClient, await mainModule.KOMCardActionCreate(KOMTestingStorageClient, kTesting.StubCardObject(), kTesting.StubDeckObjectValid())), {
			statusCode: 200,
		});
	});

	it('deletes KOMCard', async function () {
		await mainModule.KOMCardActionDelete(KOMTestingStorageClient, await mainModule.KOMCardActionCreate(KOMTestingStorageClient, kTesting.StubCardObject(), kTesting.StubDeckObjectValid()));
		deepEqual(await mainModule.KOMCardActionList(KOMTestingStorageClient, kTesting.StubDeckObjectValid()), []);
	});

	it('deletes KOMSpacings', async function () {
		const item = await mainModule.KOMCardActionCreate(KOMTestingStorageClient, kTesting.StubCardObject(), kTesting.StubDeckObjectValid());

		await KOMSpacingStorage.KOMSpacingStorageWrite(KOMTestingStorageClient, {
			KOMSpacingID: `${ item.KOMCardID }-forward`,
			KOMSpacingDueDate: new Date(),
		}, item, kTesting.StubDeckObjectValid());

		await mainModule.KOMCardActionDelete(KOMTestingStorageClient, item);
		deepEqual(await KOMSpacingStorage.KOMSpacingStorageList(KOMTestingStorageClient, item, kTesting.StubDeckObjectValid()), {
			KOMCardSpacingForward: Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingID: `${ item.KOMCardID }-forward`,
			}),
			KOMCardSpacingBackward: Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingID: `${ item.KOMCardID }-backward`,
			}),
		});
	});

});

describe('KOMCardActionList', function test_KOMCardActionList() {

	it('returns array', async function () {
		deepEqual(await mainModule.KOMCardActionList(KOMTestingStorageClient, kTesting.StubDeckObjectValid()), []);
	});

	it('returns array with existing KOMCards', async function () {
		let item = await mainModule.KOMCardActionCreate(KOMTestingStorageClient, kTesting.StubCardObject(), kTesting.StubDeckObjectValid());

		deepEqual(await mainModule.KOMCardActionList(KOMTestingStorageClient, kTesting.StubDeckObjectValid()), [item]);
	});

});

describe('KOMCardActionAudioCapture', function test_KOMCardActionAudioCapture() {

	const blob = new Blob(['alfa'], { type: 'text/plain' });

	it('rejects if param1 not valid', async function () {
		await rejects(mainModule.KOMCardActionAudioCapture(KOMTestingStorageClient, 'alfa', blob, kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid()), /KOMErrorInputNotValid/);
	});

	it('rejects if param2 not blob', async function () {
		await rejects(mainModule.KOMCardActionAudioCapture(KOMTestingStorageClient, 'KOMCardFrontAudio', null, kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid()), /KOMErrorInputNotValid/);
	});

	it('rejects if param3 not valid', async function () {
		await rejects(mainModule.KOMCardActionAudioCapture(KOMTestingStorageClient, 'KOMCardFrontAudio', blob, {}, kTesting.StubDeckObjectValid()), /KOMErrorInputNotValid/);
	});

	it('rejects if param4 not valid', async function () {
		await rejects(mainModule.KOMCardActionAudioCapture(KOMTestingStorageClient, 'KOMCardFrontAudio', blob, kTesting.StubCardObjectValid(), {}), /KOMErrorInputNotValid/);
	});

	it('returns param3', async function () {
		let item = await mainModule.KOMCardActionCreate(KOMTestingStorageClient, kTesting.StubCardObject(), kTesting.StubDeckObjectValid());

		deepEqual(await mainModule.KOMCardActionAudioCapture(KOMTestingStorageClient, 'KOMCardFrontAudio', blob, item, kTesting.StubDeckObjectValid()) === item, true);
	});

	context('KOMCardFrontAudio', function () {

		it('writes KOMCardStorageAudioPathFront', async function () {
			await mainModule.KOMCardActionAudioCapture(KOMTestingStorageClient, 'KOMCardFrontAudio', blob, kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid());
			deepEqual(await OLSKRemoteStorage.OLSKRemoteStorageListObjectsRecursive(OLSKRemoteStorage._OLSKRemoteStoragePrivateClient(KOMTestingStorageClient.kommit), ''), [
				KOMCardStorage.KOMCardStorageAudioPathFront(kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid()),
			]);
		});

		it('sets KOMCardFrontAudio to true', async function () {
			deepEqual((await mainModule.KOMCardActionAudioCapture(KOMTestingStorageClient, 'KOMCardFrontAudio', blob, kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid())).KOMCardFrontAudio, true);
		});

	});

	context('KOMCardRearAudio', function () {

		it('writes KOMCardStorageAudioPathRear', async function () {
			await mainModule.KOMCardActionAudioCapture(KOMTestingStorageClient, 'KOMCardRearAudio', blob, kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid());
			deepEqual(await OLSKRemoteStorage.OLSKRemoteStorageListObjectsRecursive(OLSKRemoteStorage._OLSKRemoteStoragePrivateClient(KOMTestingStorageClient.kommit), ''), [
				KOMCardStorage.KOMCardStorageAudioPathRear(kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid()),
			]);
		});

		it('sets KOMCardRearAudio to true', async function () {
			deepEqual((await mainModule.KOMCardActionAudioCapture(KOMTestingStorageClient, 'KOMCardRearAudio', blob, kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid())).KOMCardRearAudio, true);
		});

	});

});

describe('KOMCardActionAudioClear', function test_KOMCardActionAudioClear() {

	const blob = new Blob(['alfa'], { type: 'text/plain' });

	it('rejects if param1 not valid', async function () {
		await rejects(mainModule.KOMCardActionAudioClear(KOMTestingStorageClient, 'alfa', kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid()), /KOMErrorInputNotValid/);
	});

	it('rejects if param2 not valid', async function () {
		await rejects(mainModule.KOMCardActionAudioClear(KOMTestingStorageClient, 'KOMCardFrontAudio', {}, kTesting.StubDeckObjectValid()), /KOMErrorInputNotValid/);
	});

	it('rejects if param3 not valid', async function () {
		await rejects(mainModule.KOMCardActionAudioClear(KOMTestingStorageClient, 'KOMCardFrontAudio', kTesting.StubCardObjectValid(), {}), /KOMErrorInputNotValid/);
	});

	it('returns param2', async function () {
		const item = kTesting.StubCardObjectValid();

		await mainModule.KOMCardActionAudioCapture(KOMTestingStorageClient, 'KOMCardFrontAudio', blob, item, kTesting.StubDeckObjectValid());

		deepEqual(await mainModule.KOMCardActionAudioClear(KOMTestingStorageClient, 'KOMCardFrontAudio', item, kTesting.StubDeckObjectValid()) === item, true);
	});

	context('KOMCardFrontAudio', function () {

		it('deletes KOMCardStorageAudioPathFront', async function () {
			await mainModule.KOMCardActionAudioCapture(KOMTestingStorageClient, 'KOMCardFrontAudio', blob, kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid());

			await mainModule.KOMCardActionAudioClear(KOMTestingStorageClient, 'KOMCardFrontAudio', kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid());

			deepEqual(await OLSKRemoteStorage.OLSKRemoteStorageListObjectsRecursive(OLSKRemoteStorage._OLSKRemoteStoragePrivateClient(KOMTestingStorageClient.kommit), ''), []);
		});

		it('deletes KOMCardFrontAudio', async function () {
			const item = kTesting.StubCardObjectValid();

			await mainModule.KOMCardActionAudioCapture(KOMTestingStorageClient, 'KOMCardFrontAudio', blob, item, kTesting.StubDeckObjectValid());

			deepEqual(typeof (await mainModule.KOMCardActionAudioClear(KOMTestingStorageClient, 'KOMCardFrontAudio', item, kTesting.StubDeckObjectValid())).KOMCardFrontAudio, 'undefined');
		});

	});

	context('KOMCardRearAudio', function () {

		it('deletes KOMCardStorageAudioPathRear', async function () {
			await mainModule.KOMCardActionAudioCapture(KOMTestingStorageClient, 'KOMCardRearAudio', blob, kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid());

			await mainModule.KOMCardActionAudioClear(KOMTestingStorageClient, 'KOMCardRearAudio', kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid());

			deepEqual(await OLSKRemoteStorage.OLSKRemoteStorageListObjectsRecursive(OLSKRemoteStorage._OLSKRemoteStoragePrivateClient(KOMTestingStorageClient.kommit), ''), []);
		});

		it('deletes KOMCardRearAudio', async function () {
			const item = kTesting.StubCardObjectValid();

			await mainModule.KOMCardActionAudioCapture(KOMTestingStorageClient, 'KOMCardRearAudio', blob, item, kTesting.StubDeckObjectValid());

			deepEqual(typeof (await mainModule.KOMCardActionAudioClear(KOMTestingStorageClient, 'KOMCardRearAudio', item, kTesting.StubDeckObjectValid())).KOMCardRearAudio, 'undefined');
		});

	});

});

describe('KOMCardActionAudioFetch', function test_KOMCardActionAudioFetch() {

	const blob = new Blob(['alfa'], { type: 'text/plain' });

	it('rejects if param1 not valid', async function () {
		await rejects(mainModule.KOMCardActionAudioFetch(KOMTestingStorageClient, 'alfa', kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid()), /KOMErrorInputNotValid/);
	});

	it('rejects if param2 not valid', async function () {
		await rejects(mainModule.KOMCardActionAudioFetch(KOMTestingStorageClient, 'KOMCardFrontAudio', {}, kTesting.StubDeckObjectValid()), /KOMErrorInputNotValid/);
	});

	it('rejects if param3 not valid', async function () {
		await rejects(mainModule.KOMCardActionAudioFetch(KOMTestingStorageClient, 'KOMCardFrontAudio', kTesting.StubCardObjectValid(), {}), /KOMErrorInputNotValid/);
	});

	context('KOMCardFrontAudio', function () {

		it('returns blob', async function () {
			const item = kTesting.StubCardObjectValid();

			await mainModule.KOMCardActionAudioCapture(KOMTestingStorageClient, 'KOMCardFrontAudio', blob, item, kTesting.StubDeckObjectValid());

			deepEqual(await mainModule.KOMCardActionAudioFetch(KOMTestingStorageClient, 'KOMCardFrontAudio', item, kTesting.StubDeckObjectValid()), blob);
		});

	});

	context('KOMCardRearAudio', function () {

		it('returns blob', async function () {
			const item = kTesting.StubCardObjectValid();

			await mainModule.KOMCardActionAudioCapture(KOMTestingStorageClient, 'KOMCardRearAudio', blob, item, kTesting.StubDeckObjectValid());

			deepEqual(await mainModule.KOMCardActionAudioFetch(KOMTestingStorageClient, 'KOMCardRearAudio', item, kTesting.StubDeckObjectValid()), blob);
		});

	});

});

describe('KOMCardActionAudioList', function test_KOMCardActionAudioList() {
	
	const blob = new Blob(['alfa'], { type: 'text/plain' });

	it('rejects if param1 not valid', async function() {
		await rejects(mainModule.KOMCardActionAudioList(KOMTestingStorageClient, {}, kTesting.StubDeckObjectValid()), /KOMErrorInputNotValid/);
	});

	it('rejects if param2 not valid', async function () {
		await rejects(mainModule.KOMCardActionAudioList(KOMTestingStorageClient, kTesting.StubCardObjectValid(), {}), /KOMErrorInputNotValid/);
	});

	it('returns object', async function () {
		deepEqual(await mainModule.KOMCardActionAudioList(KOMTestingStorageClient, kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid()), {});
	});

	it('returns KOMCardFrontAudio', async function () {
		const item = kTesting.StubCardObjectValid();

		await mainModule.KOMCardActionAudioCapture(KOMTestingStorageClient, 'KOMCardFrontAudio', blob, item, kTesting.StubDeckObjectValid());

		deepEqual(await mainModule.KOMCardActionAudioList(KOMTestingStorageClient, item, kTesting.StubDeckObjectValid()), {
			KOMCardFrontAudio: blob,
		});
	});

	it('returns KOMCardRearAudio', async function () {
		const item = kTesting.StubCardObjectValid();

		await mainModule.KOMCardActionAudioCapture(KOMTestingStorageClient, 'KOMCardRearAudio', blob, item, kTesting.StubDeckObjectValid());

		deepEqual(await mainModule.KOMCardActionAudioList(KOMTestingStorageClient, item, kTesting.StubDeckObjectValid()), {
			KOMCardRearAudio: blob,
		});
	});

});
