const { rejects, throws, deepEqual, strictEqual, notStrictEqual } = require('assert');

const mod = require('./main.js').default;

const OLSKObject = require('OLSKObject');

describe('KOMDeckErrors', function test_KOMDeckErrors() {

	it('throws error if not object', function() {
		throws(function() {
			mod.KOMDeckErrors(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns object if KOMDeckID not string', function() {
		deepEqual(mod.KOMDeckErrors(StubDeckObjectValid({
			KOMDeckID: null,
		})), {
			KOMDeckID: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns object if KOMDeckID not filled', function() {
		deepEqual(mod.KOMDeckErrors(StubDeckObjectValid({
			KOMDeckID: ' ',
		})), {
			KOMDeckID: [
				'KOMErrorNotFilled',
			],
		});
	});

	it('returns object if KOMDeckName not string', function() {
		deepEqual(mod.KOMDeckErrors(StubDeckObjectValid({
			KOMDeckName: null,
		})), {
			KOMDeckName: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns object if KOMDeckCreationDate not date', function() {
		deepEqual(mod.KOMDeckErrors(StubDeckObjectValid({
			KOMDeckCreationDate: new Date('alfa'),
		})), {
			KOMDeckCreationDate: [
				'KOMErrorNotDate',
			],
		});
	});

	it('returns object if KOMDeckModificationDate not date', function() {
		deepEqual(mod.KOMDeckErrors(StubDeckObjectValid({
			KOMDeckModificationDate: new Date('alfa'),
		})), {
			KOMDeckModificationDate: [
				'KOMErrorNotDate',
			],
		});
	});

	it('returns null', function() {
		deepEqual(mod.KOMDeckErrors(StubDeckObjectValid()), null);
	});

	context('KOMDeckAudioIsEnabled', function () {

		it('returns object if not boolean', function () {
			deepEqual(mod.KOMDeckErrors(StubDeckObjectValid({
				KOMDeckAudioIsEnabled: null,
			})), {
				KOMDeckAudioIsEnabled: [
					'KOMErrorNotBoolean',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mod.KOMDeckErrors(StubDeckObjectValid({
				KOMDeckAudioIsEnabled: true,
			})), null);
		});

	});

	context('KOMDeckFrontSpeechIsEnabled', function () {

		it('returns object if not boolean', function () {
			deepEqual(mod.KOMDeckErrors(StubDeckObjectValid({
				KOMDeckFrontSpeechIsEnabled: null,
			})), {
				KOMDeckFrontSpeechIsEnabled: [
					'KOMErrorNotBoolean',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mod.KOMDeckErrors(StubDeckObjectValid({
				KOMDeckFrontSpeechIsEnabled: true,
			})), null);
		});

	});

	context('KOMDeckRearSpeechIsEnabled', function () {

		it('returns object if not boolean', function () {
			deepEqual(mod.KOMDeckErrors(StubDeckObjectValid({
				KOMDeckRearSpeechIsEnabled: null,
			})), {
				KOMDeckRearSpeechIsEnabled: [
					'KOMErrorNotBoolean',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mod.KOMDeckErrors(StubDeckObjectValid({
				KOMDeckFrontSpeechIsEnabled: true,
			})), null);
		});

	});

	context('KOMDeckFrontLanguageCode', function () {

		it('returns object if not string', function () {
			deepEqual(mod.KOMDeckErrors(StubDeckObjectValid({
				KOMDeckFrontLanguageCode: null,
			})), {
				KOMDeckFrontLanguageCode: [
					'KOMErrorNotString',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mod.KOMDeckErrors(StubDeckObjectValid({
				KOMDeckFrontLanguageCode: 'en',
			})), null);
		});

	});

	context('KOMDeckRearLanguageCode', function () {

		it('returns object if not string', function () {
			deepEqual(mod.KOMDeckErrors(StubDeckObjectValid({
				KOMDeckRearLanguageCode: null,
			})), {
				KOMDeckRearLanguageCode: [
					'KOMErrorNotString',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mod.KOMDeckErrors(StubDeckObjectValid({
				KOMDeckRearLanguageCode: 'en',
			})), null);
		});

	});

	context('KOMDeckIsForwardOnly', function () {

		it('returns object if not boolean', function () {
			deepEqual(mod.KOMDeckErrors(StubDeckObjectValid({
				KOMDeckIsForwardOnly: null,
			})), {
				KOMDeckIsForwardOnly: [
					'KOMErrorNotBoolean',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mod.KOMDeckErrors(StubDeckObjectValid({
				KOMDeckIsForwardOnly: true,
			})), null);
		});

	});

	context('KOMDeckPairingIsEnabled', function () {

		it('returns object if not boolean', function () {
			deepEqual(mod.KOMDeckErrors(StubDeckObjectValid({
				KOMDeckPairingIsEnabled: null,
			})), {
				KOMDeckPairingIsEnabled: [
					'KOMErrorNotBoolean',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mod.KOMDeckErrors(StubDeckObjectValid({
				KOMDeckPairingIsEnabled: true,
			})), null);
		});

	});

	context('KOMDeckRetireCardsMonths', function () {

		it('returns object if not number', function () {
			deepEqual(mod.KOMDeckErrors(StubDeckObjectValid({
				KOMDeckRetireCardsMonths: null,
			})), {
				KOMDeckRetireCardsMonths: [
					'KOMErrorNotNumber',
				],
			});
		});

		it('returns object if not integer', function () {
			deepEqual(mod.KOMDeckErrors(StubDeckObjectValid({
				KOMDeckRetireCardsMonths: 1.2,
			})), {
				KOMDeckRetireCardsMonths: [
					'KOMErrorNotInteger',
				],
			});
		});

		it('returns object if not above 0', function () {
			deepEqual(mod.KOMDeckErrors(StubDeckObjectValid({
				KOMDeckRetireCardsMonths: -1,
			})), {
				KOMDeckRetireCardsMonths: [
					'KOMErrorNotValid',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mod.KOMDeckErrors(StubDeckObjectValid({
				KOMDeckRetireCardsMonths: 0,
			})), null);
		});

	});

	context('KOMOptionValidateIfNotPresent', function () {

		it('returns object if not valid', function () {
			deepEqual(Object.keys(mod.KOMDeckErrors({}, {
				KOMOptionValidateIfNotPresent: true,
			})), [
				'KOMDeckID',
				'KOMDeckName',
				'KOMDeckCreationDate',
				'KOMDeckModificationDate',
			]);
		});

	});

});

describe('KOMDeckDirectory', function test_KOMDeckDirectory() {

	it('returns string', function() {
		deepEqual(mod.KOMDeckDirectory(), 'kom_decks');
	});

});

describe('KOMDeckFolderPath', function test_KOMDeckFolderPath() {

	it('returns string', function() {
		const KOMDeckID = Math.random().toString();
		deepEqual(mod.KOMDeckFolderPath({
			KOMDeckID,
		}), mod.KOMDeckDirectory() + '/' + KOMDeckID + '/');
	});

});

describe('KOMDeckObjectPath', function test_KOMDeckObjectPath() {

	it('returns string', function() {
		const item = {
			KOMDeckID: Math.random().toString(),
		};
		deepEqual(mod.KOMDeckObjectPath(item), mod.KOMDeckFolderPath(item) + 'main');
	});

});

describe('KOMDeckStub', function test_KOMDeckStub() {

	it('returns string', function() {
		const KOMDeckID = Math.random().toString();
		deepEqual(mod.KOMDeckStub(`${ mod.KOMDeckDirectory() }/${ KOMDeckID }/main`), {
			KOMDeckID,
		});
	});

});

describe('KOMDeckCreate', function test_KOMDeckCreate() {

	it('throws if not object', function () {
		throws(function () {
			ZDRTestingWrap.App.KOMDeck.KOMDeckCreate(null)
		}, /KOMErrorInputNotValid/);
	});

	it('rejects with errors if not valid', async function() {
		await rejects(ZDRTestingWrap.App.KOMDeck.KOMDeckCreate(StubDeckObject({
			KOMDeckName: null,
		})), {
			KOMDeckName: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns inputData', async function() {
		const item = StubDeckObjectValid();
		strictEqual(await ZDRTestingWrap.App.KOMDeck.KOMDeckCreate(item), item);
	});

	it('sets KOMDeckID to unique value', async function() {
		const items = await uSerial(Array.from(Array(10)).map(async function (e) {
			return (await ZDRTestingWrap.App.KOMDeck.KOMDeckCreate(StubDeckObject())).KOMDeckID;
		}));
		deepEqual([...(new Set(items))], items);
	});

	it('sets KOMDeckCreationDate', async function() {
		deepEqual(new Date() - (await ZDRTestingWrap.App.KOMDeck.KOMDeckCreate(StubDeckObject())).KOMDeckCreationDate < 100, true);
	});

	it('sets KOMDeckModificationDate', async function() {
		deepEqual(new Date() - (await ZDRTestingWrap.App.KOMDeck.KOMDeckCreate(StubDeckObject())).KOMDeckModificationDate < 100, true);
	});

	it('allows overwrite by input', async function() {
		const item = StubDeckObjectValid();
		deepEqual(await ZDRTestingWrap.App.KOMDeck.KOMDeckCreate(Object.assign({}, item)), item);
	});

	context('relations', function () {

		const memory = StubDeckObjectValid({
			$alfa: 'bravo',
		});
		const item = {};

		beforeEach(async function () {
			item.outputData = await ZDRTestingWrap.App.KOMDeck.KOMDeckCreate(memory);
		});

		beforeEach(async function () {
			item.storage = await ZDRTestingWrap.App.KOMDeck.KOMDeckList();
		});

		it('excludes from storage', function () {
			deepEqual(item.storage, [OLSKObject.OLSKObjectSafeCopy(memory)]);
		});

		it('includes in outputData', function () {
			deepEqual(item.outputData, memory);
		});

		it('updates inputData', function () {
			strictEqual(item.outputData, memory);
		});

	});

});

describe('KOMDeckUpdate', function test_KOMDeckUpdate() {

	it('throws if not object', function () {
		throws(function () {
			ZDRTestingWrap.App.KOMDeck.KOMDeckUpdate(null)
		}, /KOMErrorInputNotValid/);
	});

	it('rejects with errors if not valid', async function() {
		await rejects(ZDRTestingWrap.App.KOMDeck.KOMDeckUpdate(Object.assign(await ZDRTestingWrap.App.KOMDeck.KOMDeckCreate(StubDeckObject()), {
			KOMDeckID: null,
		})), {
			KOMDeckID: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns inputData', async function() {
		const item = await ZDRTestingWrap.App.KOMDeck.KOMDeckCreate(StubDeckObject());
		strictEqual(await ZDRTestingWrap.App.KOMDeck.KOMDeckUpdate(item), item);
	});

	it('sets KOMDeckModificationDate', async function() {
		const item = await ZDRTestingWrap.App.KOMDeck.KOMDeckCreate(StubDeckObject());
		const date = item.KOMDeckModificationDate;

		await ZDRTestingWrap.App.KOMDeck.KOMDeckUpdate(item);
		
		notStrictEqual(item.KOMDeckModificationDate, date);
		deepEqual(new Date() - item.KOMDeckModificationDate < 100, true);
	});

	it('writes inputData if not found', async function() {
		const item = await ZDRTestingWrap.App.KOMDeck.KOMDeckUpdate(StubDeckObjectValid());
		deepEqual(await ZDRTestingWrap.App.KOMDeck.KOMDeckList(), [item]);
	});

	context('relations', function () {

		const memory = StubDeckObjectValid({
			$alfa: 'bravo',
		});
		const item = {};

		beforeEach(async function () {
			item.outputData = await ZDRTestingWrap.App.KOMDeck.KOMDeckUpdate(memory);
		});

		beforeEach(async function () {
			item.storage = await ZDRTestingWrap.App.KOMDeck.KOMDeckList();
		});

		it('excludes from storage', function () {
			deepEqual(item.storage, [OLSKObject.OLSKObjectSafeCopy(memory)]);
		});

		it('includes in outputData', function () {
			deepEqual(item.outputData, memory);
		});

		it('updates inputData', function () {
			strictEqual(item.outputData, memory);
		});

	});

});

describe('KOMDeckList', function test_KOMDeckList() {

	it('returns array', async function() {
		deepEqual(await ZDRTestingWrap.App.KOMDeck.KOMDeckList(), []);
	});

	it('returns array with existing items', async function() {
		const item = await ZDRTestingWrap.App.KOMDeck.KOMDeckCreate(StubDeckObjectValid());

		deepEqual(await ZDRTestingWrap.App.KOMDeck.KOMDeckList(), [item]);
	});

});

describe('KOMDeckDelete', function test_KOMDeckDelete() {

	it('rejects if not valid', async function () {
		await rejects(ZDRTestingWrap.App.KOMDeck.KOMDeckDelete({}), /KOMErrorInputNotValid/);
	});

	it('returns inputData', async function () {
		const item = await ZDRTestingWrap.App.KOMDeck.KOMDeckCreate(StubDeckObject());
		strictEqual(await ZDRTestingWrap.App.KOMDeck.KOMDeckDelete(item), item);
	});

	it('deletes KOMDeck', async function () {
		await ZDRTestingWrap.App.KOMDeck.KOMDeckDelete(await ZDRTestingWrap.App.KOMDeck.KOMDeckCreate(StubDeckObject()))
		deepEqual(await ZDRTestingWrap.App.KOMDeck.KOMDeckList(), []);
	});

	it('deletes KOMDeckFolder recursively', async function () {
		const item = await ZDRTestingWrap.App.KOMDeck.KOMDeckCreate(StubDeckObject());

		await ZDRTestingWrap.App.ZDRStorageWriteObject(mod.KOMDeckFolderPath(item) + Math.random().toString() + '/' + Math.random().toString(), {
			[Math.random().toString()]: Math.random().toString(),
		});

		await ZDRTestingWrap.App.KOMDeck.KOMDeckDelete(item);

		deepEqual(await ZDRTestingWrap.App.ZDRStoragePathsRecursive(mod.KOMDeckFolderPath(item)), []);
	});

});

describe('KOMDeckObjectsMap', function test_KOMDeckObjectsMap() {

	it('rejects if param1 not valid', async function () {
		await rejects(ZDRTestingWrap.App.KOMDeck.KOMDeckObjectsMap({}), /KOMErrorInputNotValid/);
	});

	it('rejects if param2 not boolean', async function () {
		await rejects(ZDRTestingWrap.App.KOMDeck.KOMDeckObjectsMap(StubDeckObjectValid(), 'true'), /KOMErrorInputNotValid/);
	});

	it('returns object', async function () {
		deepEqual(await ZDRTestingWrap.App.KOMDeck.KOMDeckObjectsMap(StubDeckObjectValid()), {
			$KOMDeckCards: [],
			$KOMDeckSpacings: [],
		});
	});

	context('$KOMDeckCards', function () {
		
		it('includes KOMCards', async function () {
			const deck = await ZDRTestingWrap.App.KOMDeck.KOMDeckCreate(StubDeckObject());

			const item = await ZDRTestingWrap.App.KOMCard.KOMCardCreate(StubCardObjectValid({
				KOMCardDeckID: deck.KOMDeckID,
			}), deck);

			deepEqual((await ZDRTestingWrap.App.KOMDeck.KOMDeckObjectsMap(deck)).$KOMDeckCards, [item]);
		});
	
	});

	context('$KOMDeckSpacings', function () {
		
		it('includes KOMSpacings', async function () {
			const item = await ZDRTestingWrap.App.KOMDeck.KOMDeckCreate(StubDeckObject());

			const card = await ZDRTestingWrap.App.KOMCard.KOMCardCreate({
				KOMCardFrontText: 'alfa',
				KOMCardRearText: 'bravo',
			}, item);

			deepEqual((await ZDRTestingWrap.App.KOMDeck.KOMDeckObjectsMap(item)).$KOMDeckSpacings, Object.values(await ZDRTestingWrap.App.KOMSpacing.KOMSpacingList(card, item)).map(function (e) {
				return Object.assign(e, {
					$KOMSpacingCard: card,
				});
			}));
		});
		
		it('excludes backward if KOMDeckIsForwardOnly', async function () {
			const item = await ZDRTestingWrap.App.KOMDeck.KOMDeckCreate(StubDeckObjectValid({
				KOMDeckIsForwardOnly: true,
			}));

			const card = await ZDRTestingWrap.App.KOMCard.KOMCardCreate({
				KOMCardFrontText: 'alfa',
				KOMCardRearText: 'bravo',
			}, item);

			deepEqual((await ZDRTestingWrap.App.KOMDeck.KOMDeckObjectsMap(item)).$KOMDeckSpacings, Object.values(await ZDRTestingWrap.App.KOMSpacing.KOMSpacingList(card, item)).slice(0, 1).map(function (e) {
				return Object.assign(e, {
					$KOMSpacingCard: card,
				});
			}));
		});
		
		it('excludes if param2 true and ???', async function () {
			const item = await ZDRTestingWrap.App.KOMDeck.KOMDeckCreate(StubDeckObjectValid());

			const card = await ZDRTestingWrap.App.KOMCard.KOMCardCreate({
				KOMCardFrontText: '???',
				KOMCardRearText: '???',
			}, item);

			deepEqual((await ZDRTestingWrap.App.KOMDeck.KOMDeckObjectsMap(item, true)).$KOMDeckSpacings, []);
		});
	
	});

});

describe('ZDRSchemaDispatchValidate', function () {

	it('returns function', function () {
		deepEqual(mod.ZDRSchemaDispatchValidate, mod.KOMDeckErrors);
	});

});

describe('ZDRSchemaPath', function () {

	it('returns function', function() {
		deepEqual(mod.ZDRSchemaPath, mod.KOMDeckObjectPath);
	});

});

describe('ZDRSchemaStub', function () {

	it('returns function', function() {
		deepEqual(mod.ZDRSchemaStub, mod.KOMDeckStub);
	});

});
