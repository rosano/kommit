const { rejects, deepEqual } = require('assert');

const mainModule = require('./metal.js').default;

const kTesting = {
	StubDeckObjectValid() {
		return {
			KOMDeckID: 'alfa',
			KOMDeckName: '',
			KOMDeckCreationDate: new Date('2019-02-23T13:56:36Z'),
			KOMDeckModificationDate: new Date('2019-02-23T13:56:36Z'),
		};
	},
	StubCardObjectValid() {
		return {
			KOMCardID: 'bravo',
			KOMCardDeckID: 'alfa',
			KOMCardQuestion: 'charlie',
			KOMCardAnswer: 'delta',
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
};

describe('KOMSpacingMetalWrite', function test_KOMSpacingMetalWrite() {

	it('rejects if param1 not object', async function() {
		await rejects(mainModule.KOMSpacingMetalWrite(KOMTestingStorageClient, null, kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid()), /KOMErrorInputNotValid/);
	});

	it('rejects if param2 not valid', async function() {
		await rejects(mainModule.KOMSpacingMetalWrite(KOMTestingStorageClient, kTesting.StubSpacingObjectValid(), {}, kTesting.StubDeckObjectValid()), /KOMErrorInputNotValid/);
	});

	it('rejects if param3 not valid', async function() {
		await rejects(mainModule.KOMSpacingMetalWrite(KOMTestingStorageClient, kTesting.StubSpacingObjectValid(), kTesting.StubCardObjectValid(), {}), /KOMErrorInputNotValid/);
	});

	it('returns object with KOMErrors if not valid', async function() {
		deepEqual((await mainModule.KOMSpacingMetalWrite(KOMTestingStorageClient, Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingID: null,
		}), kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid())).KOMErrors, {
			KOMSpacingID: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns KOMSpacing', async function() {
		let item = await mainModule.KOMSpacingMetalWrite(KOMTestingStorageClient, kTesting.StubSpacingObjectValid(), kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid());

		deepEqual(item, Object.assign(kTesting.StubSpacingObjectValid(), {
			'@context': item['@context'],
		}));
	});

	context('$KOMSpacingCard', function () {

		const memory = Object.assign(kTesting.StubSpacingObjectValid(), {
			$KOMSpacingCard: kTesting.StubCardObjectValid(),
		});
		let storage;

		before(async function () {
			await mainModule.KOMSpacingMetalWrite(KOMTestingStorageClient, memory, kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid());
		});
		
		before(async function () {
			storage = (await mainModule.KOMSpacingMetalList(KOMTestingStorageClient, kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid())).KOMCardSpacingForward;
		});
		
		it('ignores property', function () {
			deepEqual(storage, Object.assign(kTesting.StubSpacingObjectValid(), {
				'@context': memory['@context'],
			}));
		});

		it('clones object', function () {
			deepEqual(memory.$KOMSpacingCard, kTesting.StubCardObjectValid());
		});;
	
	});

});

describe('KOMSpacingMetalList', function test_KOMSpacingMetalList() {

	it('rejects if param1 not valid', async function() {
		await rejects(mainModule.KOMSpacingMetalList(KOMTestingStorageClient, {}, kTesting.StubDeckObjectValid()), /KOMErrorInputNotValid/);
	});

	it('rejects if param2 not valid', async function() {
		await rejects(mainModule.KOMSpacingMetalList(KOMTestingStorageClient, kTesting.StubCardObjectValid(), {}), /KOMErrorInputNotValid/);
	});

	it('returns object', async function() {
		const item = Object.assign(kTesting.StubCardObjectValid(), {
			KOMCardID: Date.now().toString(),
		});
		deepEqual(await mainModule.KOMSpacingMetalList(KOMTestingStorageClient, item, kTesting.StubDeckObjectValid()), {
			KOMCardSpacingForward: Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingID: `${ item.KOMCardID }-forward`,
			}),
			KOMCardSpacingBackward: Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingID: `${ item.KOMCardID }-backward`,
			}),
		});
	});

	it('returns existing KOMSpacings forward', async function() {
		const item = Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingDueDate: new Date(),
		});
		
		await mainModule.KOMSpacingMetalWrite(KOMTestingStorageClient, item, kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid());

		deepEqual((await mainModule.KOMSpacingMetalList(KOMTestingStorageClient, kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid())).KOMCardSpacingForward, item);
	});

	it('returns existing KOMSpacings backward', async function() {
		const item = Object.assign(kTesting.StubSpacingObjectValid(), {
			KOMSpacingID: 'alfa-backward',
			KOMSpacingDueDate: new Date(),
		});
		
		await mainModule.KOMSpacingMetalWrite(KOMTestingStorageClient, item, kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid());

		deepEqual((await mainModule.KOMSpacingMetalList(KOMTestingStorageClient, kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid())).KOMCardSpacingBackward, item);
	});

});

describe('KOMSpacingMetalDelete', function test_KOMSpacingMetalDelete() {

	it('rejects if param1 not valid', async function() {
		await rejects(mainModule.KOMSpacingMetalDelete(KOMTestingStorageClient, {}, kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid()), /KOMErrorInputNotValid/);
	});

	it('rejects if param2 not valid', async function() {
		await rejects(mainModule.KOMSpacingMetalDelete(KOMTestingStorageClient, kTesting.StubSpacingObjectValid(), {}, kTesting.StubDeckObjectValid()), /KOMErrorInputNotValid/);
	});

	it('rejects if param3 not valid', async function() {
		await rejects(mainModule.KOMSpacingMetalDelete(KOMTestingStorageClient, kTesting.StubSpacingObjectValid(), kTesting.StubCardObjectValid(), {}), /KOMErrorInputNotValid/);
	});

	it('returns statusCode', async function() {
		deepEqual(await mainModule.KOMSpacingMetalDelete(KOMTestingStorageClient, await mainModule.KOMSpacingMetalWrite(KOMTestingStorageClient, kTesting.StubSpacingObjectValid(), kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid()), kTesting.StubCardObjectValid(), kTesting.StubDeckObjectValid()), {
			statusCode: 200,
		});
	});

	it('deletes KOMCard', async function() {
		const item = Object.assign(kTesting.StubCardObjectValid(), {
			KOMCardID: Date.now().toString(),
		});

		await mainModule.KOMSpacingMetalDelete(KOMTestingStorageClient, await mainModule.KOMSpacingMetalWrite(KOMTestingStorageClient, kTesting.StubSpacingObjectValid(), item, kTesting.StubDeckObjectValid()), item, kTesting.StubDeckObjectValid())

		deepEqual(await mainModule.KOMSpacingMetalList(KOMTestingStorageClient, item, kTesting.StubDeckObjectValid()), {
			KOMCardSpacingForward: Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingID: `${ item.KOMCardID }-forward`,
			}),
			KOMCardSpacingBackward: Object.assign(kTesting.StubSpacingObjectValid(), {
				KOMSpacingID: `${ item.KOMCardID }-backward`,
			}),
		});
	});

});
