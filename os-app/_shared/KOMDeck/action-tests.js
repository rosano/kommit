const { rejects, deepEqual } = require('assert');

const mainModule = require('./action.js').default;
const KOMCardAction = require('../KOMCard/action.js').default;
const KOMSpacingStorage = require('../KOMSpacing/Storage.js').default;

const kTesting = {
	StubDeckObject() {
		return {
			KOMDeckName: 'alfa',
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

describe('KOMDeckActionCreate', function test_KOMDeckActionCreate() {

	it('rejects if not object', async function () {
		await rejects(mainModule.KOMDeckActionCreate(KOMTestingStorageClient, null), /KOMErrorInputNotValid/);
	});

	it('returns object with KOMErrors if not valid', async function () {
		deepEqual((await mainModule.KOMDeckActionCreate(KOMTestingStorageClient, Object.assign(kTesting.StubDeckObject(), {
			KOMDeckName: null,
		}))).KOMErrors, {
			KOMDeckName: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns KOMDeck', async function () {
		let item = await mainModule.KOMDeckActionCreate(KOMTestingStorageClient, kTesting.StubDeckObject());

		deepEqual(item, Object.assign(kTesting.StubDeckObject(), {
			KOMDeckID: item.KOMDeckID,
			KOMDeckCreationDate: item.KOMDeckCreationDate,
			KOMDeckModificationDate: item.KOMDeckModificationDate,
			'@context': item['@context'],
		}));
	});

	it('sets KOMDeckID to unique value', async function () {
		let items = await kTesting.uSerial(Array.from(Array(10)).map(async function (e) {
			return (await mainModule.KOMDeckActionCreate(KOMTestingStorageClient, kTesting.StubDeckObject())).KOMDeckID;
		}));
		deepEqual([...(new Set(items))], items);
	});

	it('sets KOMDeckCreationDate to now', async function () {
		deepEqual(new Date() - (await mainModule.KOMDeckActionCreate(KOMTestingStorageClient, kTesting.StubDeckObject())).KOMDeckCreationDate < 100, true);
	});

	it('sets KOMDeckModificationDate to now', async function () {
		deepEqual(new Date() - (await mainModule.KOMDeckActionCreate(KOMTestingStorageClient, kTesting.StubDeckObject())).KOMDeckModificationDate < 100, true);
	});

});

describe('KOMDeckActionUpdate', function test_KOMDeckActionUpdate() {

	it('rejects if not object', async function () {
		await rejects(mainModule.KOMDeckActionUpdate(KOMTestingStorageClient, null), /KOMErrorInputNotValid/);
	});

	it('returns object with KOMErrors if not valid', async function () {
		deepEqual((await mainModule.KOMDeckActionUpdate(KOMTestingStorageClient, Object.assign(await mainModule.KOMDeckActionCreate(KOMTestingStorageClient, kTesting.StubDeckObject()), {
			KOMDeckID: null,
		}))).KOMErrors, {
			KOMDeckID: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns KOMDeck', async function () {
		let itemCreated = await mainModule.KOMDeckActionCreate(KOMTestingStorageClient, kTesting.StubDeckObject());

		let item = await mainModule.KOMDeckActionUpdate(KOMTestingStorageClient, itemCreated);

		deepEqual(item, Object.assign(itemCreated, {
			KOMDeckModificationDate: item.KOMDeckModificationDate,
		}));
	});

	it('sets KOMDeckModificationDate to now', async function () {
		deepEqual(new Date() - (await mainModule.KOMDeckActionUpdate(KOMTestingStorageClient, await mainModule.KOMDeckActionCreate(KOMTestingStorageClient, kTesting.StubDeckObject()))).KOMDeckModificationDate < 100, true);
	});

	it('writes inputData if not found', async function () {
		let item = await mainModule.KOMDeckActionUpdate(KOMTestingStorageClient, Object.assign(kTesting.StubDeckObject(), {
			KOMDeckID: 'alfa',
			KOMDeckCreationDate: new Date(),
		}));
		deepEqual(item, Object.assign(kTesting.StubDeckObject(), {
			KOMDeckID: item.KOMDeckID,
			KOMDeckCreationDate: item.KOMDeckCreationDate,
			KOMDeckModificationDate: item.KOMDeckModificationDate,
			'@context': item['@context'],
		}));
	});

});

describe('KOMDeckActionDelete', function test_KOMDeckActionDelete() {

	it('rejects if not valid', async function () {
		await rejects(mainModule.KOMDeckActionDelete(KOMTestingStorageClient, {}), /KOMErrorInputNotValid/);
	});

	it('returns statusCode', async function () {
		deepEqual(await mainModule.KOMDeckActionDelete(KOMTestingStorageClient, await mainModule.KOMDeckActionCreate(KOMTestingStorageClient, kTesting.StubDeckObject())), {
			statusCode: 200,
		});
	});

	it('deletes KOMDeck', async function () {
		await mainModule.KOMDeckActionDelete(KOMTestingStorageClient, await mainModule.KOMDeckActionCreate(KOMTestingStorageClient, kTesting.StubDeckObject()));
		deepEqual(await mainModule.KOMDeckActionList(KOMTestingStorageClient), []);
	});

	it('deletes KOMCards', async function () {
		const item = await mainModule.KOMDeckActionCreate(KOMTestingStorageClient, kTesting.StubDeckObject());

		await KOMCardAction.KOMCardActionCreate(KOMTestingStorageClient, {
			KOMCardFrontText: 'alfa',
			KOMCardRearText: 'bravo',
		}, item);

		await mainModule.KOMDeckActionDelete(KOMTestingStorageClient, item);
		deepEqual(await KOMCardAction.KOMCardActionList(KOMTestingStorageClient, item), []);
	});

});

describe('KOMDeckActionList', function test_KOMDeckActionList() {

	it('returns array', async function () {
		deepEqual(await mainModule.KOMDeckActionList(KOMTestingStorageClient), []);
	});

	it('returns array with existing KOMDecks', async function () {
		let item = await mainModule.KOMDeckActionCreate(KOMTestingStorageClient, kTesting.StubDeckObject());

		deepEqual(await mainModule.KOMDeckActionList(KOMTestingStorageClient), [item]);
	});

});

describe('KOMDeckActionFetchObjects', function test_KOMDeckActionFetchObjects() {

	it('rejects if param1 not valid', async function () {
		await rejects(mainModule.KOMDeckActionFetchObjects(KOMTestingStorageClient, {}), /KOMErrorInputNotValid/);
	});

	it('rejects if param2 not boolean', async function () {
		await rejects(mainModule.KOMDeckActionFetchObjects(KOMTestingStorageClient, StubDeckObjectValid(), 'true'), /KOMErrorInputNotValid/);
	});

	it('returns object', async function () {
		deepEqual(await mainModule.KOMDeckActionFetchObjects(KOMTestingStorageClient, await mainModule.KOMDeckActionCreate(KOMTestingStorageClient, kTesting.StubDeckObject())), {
			$KOMDeckCards: [],
			$KOMDeckSpacings: [],
		});
	});

	context('$KOMDeckCards', function () {
		
		it('includes KOMCards', async function () {
			const item = await mainModule.KOMDeckActionCreate(KOMTestingStorageClient, kTesting.StubDeckObject());

			const card = await KOMCardAction.KOMCardActionCreate(KOMTestingStorageClient, {
				KOMCardFrontText: 'alfa',
				KOMCardRearText: 'bravo',
			}, item);

			deepEqual((await mainModule.KOMDeckActionFetchObjects(KOMTestingStorageClient, item)).$KOMDeckCards, [card]);
		});
	
	});

	context('$KOMDeckSpacings', function () {
		
		it('includes KOMSpacings', async function () {
			const item = await mainModule.KOMDeckActionCreate(KOMTestingStorageClient, kTesting.StubDeckObject());

			const card = await KOMCardAction.KOMCardActionCreate(KOMTestingStorageClient, {
				KOMCardFrontText: 'alfa',
				KOMCardRearText: 'bravo',
			}, item);

			deepEqual((await mainModule.KOMDeckActionFetchObjects(KOMTestingStorageClient, item)).$KOMDeckSpacings, Object.values(await KOMSpacingStorage.KOMSpacingStorageList(KOMTestingStorageClient, card, item)).map(function (e) {
				return Object.assign(e, {
					$KOMSpacingCard: card,
				});
			}));
		});
		
		it('excludes backward if KOMDeckIsForwardOnly', async function () {
			const item = await mainModule.KOMDeckActionCreate(KOMTestingStorageClient, StubDeckObjectValid({
				KOMDeckIsForwardOnly: true,
			}));

			const card = await KOMCardAction.KOMCardActionCreate(KOMTestingStorageClient, {
				KOMCardFrontText: 'alfa',
				KOMCardRearText: 'bravo',
			}, item);

			deepEqual((await mainModule.KOMDeckActionFetchObjects(KOMTestingStorageClient, item)).$KOMDeckSpacings, Object.values(await KOMSpacingStorage.KOMSpacingStorageList(KOMTestingStorageClient, card, item)).slice(0, 1).map(function (e) {
				return Object.assign(e, {
					$KOMSpacingCard: card,
				});
			}));
		});
		
		it.skip('excludes if KOMCardIsSuspended', async function () {
			const item = await mainModule.KOMDeckActionCreate(KOMTestingStorageClient, StubDeckObjectValid({
				KOMDeckIsForwardOnly: true,
			}));

			const card = await KOMCardAction.KOMCardActionCreate(KOMTestingStorageClient, {
				KOMCardFrontText: 'alfa',
				KOMCardRearText: 'bravo',
				KOMCardIsSuspended: true,
			}, item);

			deepEqual((await mainModule.KOMDeckActionFetchObjects(KOMTestingStorageClient, item)).$KOMDeckSpacings, []);
		});
		
		it('excludes if param2 true and ???', async function () {
			const item = await mainModule.KOMDeckActionCreate(KOMTestingStorageClient, StubDeckObjectValid());

			const card = await KOMCardAction.KOMCardActionCreate(KOMTestingStorageClient, {
				KOMCardFrontText: '???',
				KOMCardRearText: '???',
			}, item);

			deepEqual((await mainModule.KOMDeckActionFetchObjects(KOMTestingStorageClient, item, true)).$KOMDeckSpacings, []);
		});
	
	});

});
