const { throws, rejects, deepEqual } = require('assert');

const mainModule = require('./main.js').default;
const KOMDeckAction = require('../KOMDeck/action.js').default;
const KOMCardAction = require('../KOMCard/action.js').default;
const KOMSpacingStorage = require('../KOMSpacing/storage.js').default;

describe('KOM_DataImport', function test_KOM_DataImport() {

	it('throws if not array', function () {
		throws(function () {
			mainModule.KOM_DataImport(KOMTestingStorageClient, null);
		}, /KOMErrorInputNotValid/);
	});

	it('throws if not filled', function () {
		throws(function () {
			mainModule.KOM_DataImport(KOMTestingStorageClient, []);
		}, /KOMErrorInputNotValid/);
	});

	const uDeck = function (inputData) {
		return StubDeckObjectValid(Object.assign({
			$KOMDeckCards: [],
		}, inputData));
	};

	const uCard = function (inputData) {
		return StubCardObjectValid(Object.assign({
			$KOMCardSpacingForward: StubSpacingObjectValid(),
			$KOMCardSpacingBackward: StubSpacingObjectValid(),
		}, inputData));
	};

	context('KOMDeck', function () {
		
		it('rejects if not valid', async function () {
			await rejects(mainModule.KOM_DataImport(KOMTestingStorageClient, [uDeck({
				KOMDeckName: null,
			})]), /KOMErrorInputNotValid/);
		});

		it('returns array', async function () {
			const item = await mainModule.KOM_DataImport(KOMTestingStorageClient, [uDeck()]);

			deepEqual(item, [StubDeckObjectValid({
				KOMDeckID: item[0].KOMDeckID,
				KOMDeckCreationDate: item[0].KOMDeckCreationDate,
				KOMDeckModificationDate: item[0].KOMDeckModificationDate,
			})]);
		});

		it('removes $KOMDeckCards', async function () {
			const item = await mainModule.KOM_DataImport(KOMTestingStorageClient, [uDeck()]);

			deepEqual(item[0].$KOMDeckCards, undefined);
		});

		it('creates KOMDeck objects', async function () {
			const item = await mainModule.KOM_DataImport(KOMTestingStorageClient, [uDeck()]);

			deepEqual(await KOMDeckAction.KOMDeckActionList(KOMTestingStorageClient), item);
		});
	
	});

	context('$KOMDeckCards', function () {
		
		it('rejects if not array', async function () {
			await rejects(mainModule.KOM_DataImport(KOMTestingStorageClient, [uDeck({
				$KOMDeckCards: null,
			})]), /KOMErrorInputNotValid/);
		});

		it('rejects if not valid', async function () {
			await rejects(mainModule.KOM_DataImport(KOMTestingStorageClient, [uDeck({
				$KOMDeckCards: [StubCardObjectValid({
					KOMCardFrontText: null,
				})],
			})]), /KOMErrorInputNotValid/);
		});

		it('creates KOMCard objects', async function () {
			const item = StubCardObjectValid();

			delete item.KOMCardID;
			delete item.KOMCardDeckID;

			const list = await KOMCardAction.KOMCardActionList(KOMTestingStorageClient, (await mainModule.KOM_DataImport(KOMTestingStorageClient, [uDeck({
				$KOMDeckCards: [item],
			})]))[0]);

			deepEqual(list, [Object.assign(item, {
				KOMCardID: list[0].KOMCardID,
				KOMCardDeckID: list[0].KOMCardDeckID,
			})]);
		});
	
	});

	context('$KOMCardSpacingForward', function () {
		
		it('rejects if not valid', async function () {
			await rejects(mainModule.KOM_DataImport(KOMTestingStorageClient, [uDeck({
				$KOMDeckCards: [uCard({
					$KOMCardSpacingForward: StubSpacingObjectValid({
						KOMSpacingChronicles: null,
					}),
				})],
			})]), /KOMErrorInputNotValid/);
		});

		it('creates KOMSpacing object', async function () {
			const spacing = StubSpacingObjectValid({
				KOMSpacingChronicles: [StubChronicleObjectValid()],
			});

			const card = StubCardObjectValid({
				$KOMCardSpacingForward: spacing,
			});
			delete card.KOMCardID;
			delete card.KOMCardDeckID;

			const deck = (await mainModule.KOM_DataImport(KOMTestingStorageClient, [uDeck({
				$KOMDeckCards: [card],
			})]))[0];

			const list = await KOMSpacingStorage.KOMSpacingStorageList(KOMTestingStorageClient, (await KOMCardAction.KOMCardActionList(KOMTestingStorageClient, deck))[0], deck);

			deepEqual(list.KOMCardSpacingForward, spacing);
		});
	
	});

	context('$KOMCardSpacingBackward', function () {
		
		it('rejects if not valid', async function () {
			await rejects(mainModule.KOM_DataImport(KOMTestingStorageClient, [uDeck({
				$KOMDeckCards: [uCard({
					$KOMCardSpacingBackward: StubSpacingObjectValid({
						KOMSpacingChronicles: null,
					}),
				})],
			})]), /KOMErrorInputNotValid/);
		});

		it('creates KOMSpacing object', async function () {
			const spacing = StubSpacingObjectValid({
				KOMSpacingChronicles: [StubChronicleObjectValid()],
			});

			const card = StubCardObjectValid({
				$KOMCardSpacingBackward: spacing,
			});
			delete card.KOMCardID;
			delete card.KOMCardDeckID;

			const deck = (await mainModule.KOM_DataImport(KOMTestingStorageClient, [uDeck({
				$KOMDeckCards: [card],
			})]))[0];

			const list = await KOMSpacingStorage.KOMSpacingStorageList(KOMTestingStorageClient, (await KOMCardAction.KOMCardActionList(KOMTestingStorageClient, deck))[0], deck);

			deepEqual(list.KOMCardSpacingBackward, spacing);
		});
	
	});

});

describe('KOM_DataExport', function test_KOM_DataExport() {

	it('throws if not array', function () {
		throws(function () {
			mainModule.KOM_DataExport(KOMTestingStorageClient, null);
		}, /KOMErrorInputNotValid/);
	});

	it('throws if not filled', function () {
		throws(function () {
			mainModule.KOM_DataExport(KOMTestingStorageClient, []);
		}, /KOMErrorInputNotValid/);
	});

	it('returns array', async function () {
		deepEqual(Array.isArray(await mainModule.KOM_DataExport(KOMTestingStorageClient, [StubDeckObjectValid()])), true);
	});

	it('copies input', async function () {
		const item = StubDeckObjectValid();
		deepEqual((await mainModule.KOM_DataExport(KOMTestingStorageClient, [item]))[0] !== item, true);
	});

	context('$KOMDeckCards', function () {
		
		it('sets to KOMCard objects', async function () {
			const item = await KOMCardAction.KOMCardActionCreate(KOMTestingStorageClient, StubCardObjectValid(), StubDeckObjectValid());

			deepEqual(await mainModule.KOM_DataExport(KOMTestingStorageClient, [StubDeckObjectValid()]), [Object.assign(StubDeckObjectValid(), {
				$KOMDeckCards: await KOMCardAction.KOMCardActionList(KOMTestingStorageClient, StubDeckObjectValid()),
			})]);
		});
	
	});

	context('$KOMCardSpacingForward', function () {
		
		it('sets to KOMSpacing object', async function () {
			const card = await KOMCardAction.KOMCardActionCreate(KOMTestingStorageClient, StubCardObjectValid(), StubDeckObjectValid());
			const spacing = await KOMSpacingStorage.KOMSpacingStorageWrite(KOMTestingStorageClient, StubSpacingObjectValid({
				KOMSpacingChronicles: [StubChronicleObjectValid()],
			}), StubCardObjectValid(), StubDeckObjectValid());

			deepEqual((await mainModule.KOM_DataExport(KOMTestingStorageClient, [StubDeckObjectValid()]))[0].$KOMDeckCards[0].$KOMCardSpacingForward, spacing);
		});
	
	});

	context('$KOMCardSpacingBackward', function () {
		
		it('sets to KOMSpacing object', async function () {
			const card = await KOMCardAction.KOMCardActionCreate(KOMTestingStorageClient, StubCardObjectValid(), StubDeckObjectValid());
			const spacing = await KOMSpacingStorage.KOMSpacingStorageWrite(KOMTestingStorageClient, StubSpacingObjectValid({
				KOMSpacingID: 'alfa-backward',
				KOMSpacingChronicles: [StubChronicleObjectValid()],
			}), StubCardObjectValid(), StubDeckObjectValid());

			deepEqual((await mainModule.KOM_DataExport(KOMTestingStorageClient, [StubDeckObjectValid()]))[0].$KOMDeckCards[0].$KOMCardSpacingBackward, spacing);
		});
	
	});

});
