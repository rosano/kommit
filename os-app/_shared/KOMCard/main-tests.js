const { rejects, throws, deepEqual, strictEqual, notStrictEqual } = require('assert');

const mod = require('./main.js').default;

const KOMDeck = require('../KOMDeck/main.js').default;

describe('KOMCardErrors', function test_KOMCardErrors() {

	it('throws error if not object', function() {
		throws(function() {
			mod.KOMCardErrors(null);
		}, /KOMErrorInputNotValid/);
	});

	it('returns object if KOMCardID not string', function () {
		deepEqual(mod.KOMCardErrors(StubCardObjectValid({
			KOMCardID: null,
		})), {
			KOMCardID: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns object if KOMCardID not filled', function () {
		deepEqual(mod.KOMCardErrors(StubCardObjectValid({
			KOMCardID: ' ',
		})), {
			KOMCardID: [
				'KOMErrorNotFilled',
			],
		});
	});

	it('returns object if KOMCardDeckID not string', function () {
		deepEqual(mod.KOMCardErrors(StubCardObjectValid({
			KOMCardDeckID: null,
		})), {
			KOMCardDeckID: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns object if KOMCardDeckID not filled', function () {
		deepEqual(mod.KOMCardErrors(StubCardObjectValid({
			KOMCardDeckID: ' ',
		})), {
			KOMCardDeckID: [
				'KOMErrorNotFilled',
			],
		});
	});

	it('returns object if KOMCardFrontText not string', function () {
		deepEqual(mod.KOMCardErrors(StubCardObjectValid({
			KOMCardFrontText: null,
		})), {
			KOMCardFrontText: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns object if KOMCardRearText not string', function () {
		deepEqual(mod.KOMCardErrors(StubCardObjectValid({
			KOMCardRearText: null,
		})), {
			KOMCardRearText: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns object if KOMCardCreationDate not date', function () {
		deepEqual(mod.KOMCardErrors(StubCardObjectValid({
			KOMCardCreationDate: new Date('alfa'),
		})), {
			KOMCardCreationDate: [
				'KOMErrorNotDate',
			],
		});
	});

	it('returns object if KOMCardModificationDate not date', function () {
		deepEqual(mod.KOMCardErrors(StubCardObjectValid({
			KOMCardModificationDate: new Date('alfa'),
		})), {
			KOMCardModificationDate: [
				'KOMErrorNotDate',
			],
		});
	});

	it('returns null', function () {
		deepEqual(mod.KOMCardErrors(StubCardObjectValid()), null);
	});

	context('KOMCardNotes', function () {

		it('returns object if not string', function () {
			deepEqual(mod.KOMCardErrors(StubCardObjectValid({
				KOMCardNotes: null,
			})), {
				KOMCardNotes: [
					'KOMErrorNotString',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mod.KOMCardErrors(StubCardObjectValid({
				KOMCardNotes: 'alfa',
			})), null);
		});

	});

	context('KOMCardFrontAudio', function () {

		it('returns object if not boolean', function () {
			deepEqual(mod.KOMCardErrors(StubCardObjectValid({
				KOMCardFrontAudio: 'true',
			})), {
				KOMCardFrontAudio: [
					'KOMErrorNotBoolean',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mod.KOMCardErrors(StubCardObjectValid({
				KOMCardFrontAudio: true,
			})), null);
		});

	});

	context('KOMCardRearAudio', function () {

		it('returns object if not boolean', function () {
			deepEqual(mod.KOMCardErrors(StubCardObjectValid({
				KOMCardRearAudio: 'true',
			})), {
				KOMCardRearAudio: [
					'KOMErrorNotBoolean',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mod.KOMCardErrors(StubCardObjectValid({
				KOMCardRearAudio: true,
			})), null);
		});

	});

	context('KOMCardTags', function () {

		it('returns object if not array', function () {
			deepEqual(mod.KOMCardErrors(StubCardObjectValid({
				KOMCardTags: null,
			})), {
				KOMCardTags: [
					'KOMErrorNotArray',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mod.KOMCardErrors(StubCardObjectValid({
				KOMCardTags: [],
			})), null);
		});

	});	

	context('KOMCardIsRetired', function () {

		it('returns object if not boolean', function () {
			deepEqual(mod.KOMCardErrors(StubCardObjectValid({
				KOMCardIsRetired: 'true',
			})), {
				KOMCardIsRetired: [
					'KOMErrorNotBoolean',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mod.KOMCardErrors(StubCardObjectValid({
				KOMCardIsRetired: true,
			})), null);
		});

	});

	context('KOMOptionValidateIfNotPresent', function () {

		it('returns object if not valid', function () {
			deepEqual(Object.keys(mod.KOMCardErrors({}, {
				KOMOptionValidateIfNotPresent: true,
			})), [
				'KOMCardID',
				'KOMCardDeckID',
				'KOMCardFrontText',
				'KOMCardRearText',
				'KOMCardCreationDate',
				'KOMCardModificationDate',
				'KOMCardNotes',
				'KOMCardFrontAudio',
				'KOMCardRearAudio',
				'KOMCardTags',
				'KOMCardIsRetired',
			]);
		});

	});

});

describe('KOMCardAudioFields', function test_KOMCardAudioFields() {

	it('returns array', function () {
		deepEqual(mod.KOMCardAudioFields(), [
			'KOMCardFrontAudio',
			'KOMCardRearAudio',
		]);
	});

});

describe('KOMCardDirectory', function test_KOMCardDirectory() {

	it('returns string', function() {
		deepEqual(mod.KOMCardDirectory(), 'kom_cards');
	});

});

describe('KOMCardFolderPath', function test_KOMCardFolderPath() {

	it('returns string', function() {
		const item = StubCardObjectValid();
		deepEqual(mod.KOMCardFolderPath(item), [
			KOMDeck.KOMDeckFolderPath({
				KOMDeckID: item.KOMCardDeckID,
			}) + mod.KOMCardDirectory(),
			item.KOMCardCreationDate.toJSON().split('T').shift(),
			item.KOMCardID,
			].join('/') + '/');
	});

});

describe('KOMCardObjectPath', function test_KOMCardObjectPath() {

	it('returns string', function () {
		const item = StubCardObjectValid();
		deepEqual(mod.KOMCardObjectPath(item), mod.KOMCardFolderPath(item) + 'main');
	});

});

describe('KOMCardStub', function test_KOMCardStub() {

	it('returns string', function() {
		const deck = StubDeckObjectValid();
		const card = StubCardObjectValid({
			KOMCardCreationDate: new Date((new Date()).toJSON().slice(0, 10)),
		});
		deepEqual(mod.KOMCardStub([
			KOMDeck.KOMDeckFolderPath(deck) + mod.KOMCardDirectory(),
			card.KOMCardCreationDate.toJSON().slice(0, 10),
			card.KOMCardID,
			'main',
			].join('/')), {
			KOMCardID: card.KOMCardID,
			KOMCardDeckID: deck.KOMDeckID,
			KOMCardCreationDate: card.KOMCardCreationDate,
		});
	});

});

describe('KOMCardSideFront', function test_KOMCardSideFront() {

	it('returns string', function () {
		deepEqual(mod.KOMCardSideFront(), 'front');
	});

});

describe('KOMCardSideRear', function test_KOMCardSideRear() {

	it('returns string', function () {
		deepEqual(mod.KOMCardSideRear(), 'rear');
	});

});

describe('KOMCardSides', function test_KOMCardSides() {

	it('returns array', function () {
		deepEqual(mod.KOMCardSides(), [
			mod.KOMCardSideFront(),
			mod.KOMCardSideRear(),
			]);
	});

});

describe('KOMCardSide', function test_KOMCardSide() {

	it('throws error if not string', function () {
		throws(function () {
			mod.KOMCardSide(null);
		}, /KOMErrorInputNotValid/);
	});

	it('throws error if not valid', function () {
		throws(function () {
			mod.KOMCardSide(Math.random().toString() + uRandomElement(mod.KOMCardSides()));
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function () {
		const item = uRandomElement(mod.KOMCardSides())
		deepEqual(mod.KOMCardSide(Math.random().toString() + '-' + item), item);
	});

});

describe('KOMCardSideFolderPath', function test_KOMCardSideFolderPath() {

	it('throws if param1 not valid', function () {
		throws(function () {
			mod.KOMCardSideFolderPath({}, uRandomElement(mod.KOMCardSides()));
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param2 not valid', function () {
		throws(function () {
			mod.KOMCardSideFolderPath(StubCardObjectValid(), Math.random().toString());
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function () {
		const item = StubCardObjectValid();
		const side = uRandomElement(mod.KOMCardSides());
		deepEqual(mod.KOMCardSideFolderPath(item, side), mod.KOMCardFolderPath(item) + 'side-' + side + '/');
	});

});

describe('KOMCardSideAudioPath', function test_KOMCardSideAudioPath() {

	it('throws if param1 not valid', function () {
		throws(function () {
			mod.KOMCardSideAudioPath({}, uRandomElement(mod.KOMCardSides()));
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param2 not valid', function () {
		throws(function () {
			mod.KOMCardSideAudioPath(StubCardObjectValid(), Math.random().toString());
		}, /KOMErrorInputNotValid/);
	});

	it('returns string', function () {
		const item = StubCardObjectValid();
		const side = uRandomElement(mod.KOMCardSides());
		deepEqual(mod.KOMCardSideAudioPath(item, side), mod.KOMCardSideFolderPath(item, side) + 'audio');
	});

});

describe('KOMCardCreate', function test_KOMCardCreate() {

	it('throws if param1 not object', function () {
		throws(function () {
			ZDRTestingWrap.App.KOMCard.KOMCardCreate(null, StubDeckObjectValid());
		}, /KOMErrorInputNotValid/);
	});

	it('throws if param2 not valid', function () {
		throws(function () {
			ZDRTestingWrap.App.KOMCard.KOMCardCreate(StubCardObjectValid(), {});
		}, /KOMErrorInputNotValid/);
	});

	it('rejects with errors if not valid', async function() {
		await rejects(ZDRTestingWrap.App.KOMCard.KOMCardCreate(StubCardObjectValid({
			KOMCardFrontText: null,
		}), StubDeckObjectValid()), {
			KOMCardFrontText: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns inputData', async function() {
		const item = StubCardObjectValid();
		strictEqual(await ZDRTestingWrap.App.KOMCard.KOMCardCreate(item, StubDeckObjectValid()), item);
	});

	it('sets KOMCardID to unique value', async function() {
		const items = await uSerial(Array.from(Array(10)).map(async function (e) {
			return (await ZDRTestingWrap.App.KOMCard.KOMCardCreate(StubCardObject(), StubDeckObjectValid())).KOMCardID;
		}));
		deepEqual([...(new Set(items))], items);
	});

	it('sets KOMCardCreationDate', async function() {
		deepEqual(new Date() - (await ZDRTestingWrap.App.KOMCard.KOMCardCreate(StubCardObject(), StubDeckObjectValid())).KOMCardCreationDate < 100, true);
	});

	it('sets KOMCardModificationDate', async function() {
		deepEqual(new Date() - (await ZDRTestingWrap.App.KOMCard.KOMCardCreate(StubCardObject(), StubDeckObjectValid())).KOMCardModificationDate < 100, true);
	});

	it('allows overwrite by input', async function() {
		const KOMCardID = Math.random().toString();
		const item = StubCardObject({
			KOMCardID,
		});
		deepEqual((await ZDRTestingWrap.App.KOMCard.KOMCardCreate(item, StubDeckObjectValid())).KOMCardID, KOMCardID);
	});

});

describe('KOMCardUpdate', function test_KOMCardUpdate() {

	it('throws if not object', function () {
		throws(function () {
			ZDRTestingWrap.App.KOMCard.KOMCardUpdate(null)
		}, /KOMErrorInputNotValid/);
	});

	it('rejects with errors if not valid', async function() {
		await rejects(ZDRTestingWrap.App.KOMCard.KOMCardUpdate(Object.assign(await ZDRTestingWrap.App.KOMCard.KOMCardCreate(StubCardObject(), StubDeckObjectValid()), {
			KOMCardID: null,
		})), {
			KOMCardID: [
				'KOMErrorNotString',
			],
		});
	});

	it('returns inputData', async function() {
		const item = await ZDRTestingWrap.App.KOMCard.KOMCardCreate(StubCardObject(), StubDeckObjectValid());
		strictEqual(await ZDRTestingWrap.App.KOMCard.KOMCardUpdate(item), item);
	});

	it('sets KOMCardModificationDate', async function() {
		const item = await ZDRTestingWrap.App.KOMCard.KOMCardCreate(StubCardObject(), StubDeckObjectValid());
		const date = mod.KOMCardModificationDate;

		await ZDRTestingWrap.App.KOMCard.KOMCardUpdate(item);
		
		notStrictEqual(item.KOMCardModificationDate, date);
		deepEqual(new Date() - item.KOMCardModificationDate < 100, true);
	});

	it('writes inputData if not found', async function() {
		const deck = StubDeckObjectValid();
		const item = await ZDRTestingWrap.App.KOMCard.KOMCardUpdate(StubCardObjectValid({
			KOMCardDeckID: deck.KOMDeckID,
		}));
		deepEqual(await ZDRTestingWrap.App.KOMCard.KOMCardList(deck), [item]);
	});

});

describe('KOMCardList', function test_KOMCardList() {

	it('rejects if not valid', async function () {
		await rejects(ZDRTestingWrap.App.KOMCard.KOMCardDelete({}), /KOMErrorInputNotValid/);
	});

	it('returns array', async function() {
		deepEqual(await ZDRTestingWrap.App.KOMCard.KOMCardList(StubDeckObjectValid()), []);
	});

	it('returns array with existing items', async function() {
		const deck = StubDeckObjectValid();
		const item = await ZDRTestingWrap.App.KOMCard.KOMCardCreate(StubCardObject(), deck);
		deepEqual(await ZDRTestingWrap.App.KOMCard.KOMCardList(deck), [item]);
	});

});

describe('KOMCardDelete', function test_KOMCardDelete() {

	it('rejects if not valid', async function () {
		await rejects(ZDRTestingWrap.App.KOMCard.KOMCardDelete({}), /KOMErrorInputNotValid/);
	});

	it('returns inputData', async function () {
		const item = await ZDRTestingWrap.App.KOMCard.KOMCardCreate(StubCardObject(), StubDeckObjectValid());
		strictEqual(await ZDRTestingWrap.App.KOMCard.KOMCardDelete(item), item);
	});

	it('deletes KOMCard', async function () {
		await ZDRTestingWrap.App.KOMCard.KOMCardDelete(await ZDRTestingWrap.App.KOMCard.KOMCardCreate(StubCardObject(), StubDeckObjectValid()))
		deepEqual(await ZDRTestingWrap.App.KOMCard.KOMCardList(StubDeckObjectValid()), []);
	});

	it('deletes KOMCardFolder recursively', async function () {
		const item = await ZDRTestingWrap.App.KOMCard.KOMCardCreate(StubCardObject(), StubDeckObjectValid());

		await ZDRTestingWrap.App.ZDRStorageWriteObject(mod.KOMCardFolderPath(item) + Math.random().toString() + '/' + Math.random().toString(), {
			[Math.random().toString()]: Math.random().toString(),
		});

		await ZDRTestingWrap.App.KOMCard.KOMCardDelete(item);

		deepEqual(await ZDRTestingWrap.App.ZDRStoragePathsRecursive(mod.KOMCardFolderPath(item)), []);
	});

});

describe('KOMCardAudioCapture', function test_KOMCardAudioCapture() {

	it('rejects if param1 not valid', async function () {
		await rejects(ZDRTestingWrap.App.KOMCard.KOMCardAudioCapture({}, uRandomElement(mod.KOMCardSides()), Math.random().toString()), /KOMErrorInputNotValid/);
	});

	it('rejects if param2 not valid', async function () {
		await rejects(ZDRTestingWrap.App.KOMCard.KOMCardAudioCapture(StubCardObjectValid(), Math.random().toString(), Math.random().toString()), /KOMErrorInputNotValid/);
	});

	it('rejects if param3 not truthy', async function () {
		await rejects(ZDRTestingWrap.App.KOMCard.KOMCardAudioCapture(StubCardObjectValid(), uRandomElement(mod.KOMCardSides()), null), /KOMErrorInputNotValid/);
	});

	it('returns param1', async function () {
		const item = StubCardObjectValid();

		strictEqual(await ZDRTestingWrap.App.KOMCard.KOMCardAudioCapture(item, uRandomElement(mod.KOMCardSides()), {
			type: Math.random().toString(),
		}), item);
	});

	context('KOMCardSideFront', function () {

		const side = mod.KOMCardSideFront();

		it('calls ZDRStorageWriteFile', function () {
			const card = StubCardObjectValid();
			const item = {
				type: Math.random().toString(),
			};
			deepEqual(uCapture(function (capture) {
				const fake = Object.assign({}, ZDRTestingWrap);

				fake.App.ZDRStorageWriteFile = capture;
				
				ZDRTestingWrap.App.KOMCard.KOMCardAudioCapture.bind(fake)(card, side, item);
			}), [mod.KOMCardSideAudioPath(card, side), item, item.type]);
		});

		it('sets KOMCardFrontAudio', async function () {
			deepEqual((await ZDRTestingWrap.App.KOMCard.KOMCardAudioCapture(StubCardObjectValid(), side, {
				type: Math.random().toString(),
			})).KOMCardFrontAudio, true);
		});
	
	});

	context('KOMCardSideRear', function () {
		
		const side = mod.KOMCardSideRear();

		it('calls ZDRStorageWriteFile', function () {
			const card = StubCardObjectValid();
			const item = {
				type: Math.random().toString(),
			};
			deepEqual(uCapture(function (capture) {
				const fake = Object.assign({}, ZDRTestingWrap);

				fake.App.ZDRStorageWriteFile = capture;
				
				ZDRTestingWrap.App.KOMCard.KOMCardAudioCapture.bind(fake)(card, side, item);
			}), [mod.KOMCardSideAudioPath(card, side), item, item.type]);
		});

		it('sets KOMCardRearAudio', async function () {
			deepEqual((await ZDRTestingWrap.App.KOMCard.KOMCardAudioCapture(StubCardObjectValid(), side, {
				type: Math.random().toString(),
			})).KOMCardRearAudio, true);
		});
	
	});

});

describe('KOMCardAudioFetch', function test_KOMCardAudioFetch() {

	const blob = new Blob([Math.random().toString()], { type: 'text/plain' });

	it('throws if param1 not valid', function () {
		throws(function () {
			ZDRTestingWrap.App.KOMCard.KOMCardAudioFetch({}, uRandomElement(mod.KOMCardSides()));
		}, /ErrorInputNotValid/);
	});

	it('throws if param2 not valid', function () {
		throws(function () {
			ZDRTestingWrap.App.KOMCard.KOMCardAudioFetch(StubCardObjectValid(), Math.random().toString());
		}, /ErrorInputNotValid/);
	});

	it('returns audio of KOMCardFrontAudio', async function () {
		const item = await ZDRTestingWrap.App.KOMCard.KOMCardAudioCapture(StubCardObjectValid(), mod.KOMCardSideFront(), blob);

		deepEqual(await ZDRTestingWrap.App.KOMCard.KOMCardAudioFetch(item, 'KOMCardFrontAudio'), blob);
	});

	it('returns audio of KOMCardRearAudio', async function () {
		const item = await ZDRTestingWrap.App.KOMCard.KOMCardAudioCapture(StubCardObjectValid(), mod.KOMCardSideRear(), blob);

		deepEqual(await ZDRTestingWrap.App.KOMCard.KOMCardAudioFetch(item, 'KOMCardRearAudio'), blob);
	});

});

describe.skip('KOMCardAudioList', function test_KOMCardAudioList() {
	
	const blob = new Blob([Math.random().toString()], { type: 'text/plain' });

	it('rejects if not valid', async function () {
		await rejects(ZDRTestingWrap.App.KOMCard.KOMCardAudioList({}), /KOMErrorInputNotValid/);
	});

	it('returns object', async function () {
		deepEqual(await ZDRTestingWrap.App.KOMCard.KOMCardAudioList(StubCardObjectValid()), {});
	});

	it('returns KOMCardFrontAudio', async function () {
		const item = await ZDRTestingWrap.App.KOMCard.KOMCardAudioCapture(StubCardObjectValid(), mod.KOMCardSideFront(), blob);

		deepEqual(await ZDRTestingWrap.App.KOMCard.KOMCardAudioList(item), {
			KOMCardFrontAudio: blob,
		});
	});

	it('returns KOMCardRearAudio', async function () {
		const item = await ZDRTestingWrap.App.KOMCard.KOMCardAudioCapture(StubCardObjectValid(), mod.KOMCardSideRear(), blob);

		deepEqual(await ZDRTestingWrap.App.KOMCard.KOMCardAudioList(item), {
			KOMCardRearAudio: blob,
		});
	});

});


describe.skip('KOMCardAudioClear', function test_KOMCardAudioClear() {

	const blob = new Blob([Math.random().toString()], { type: 'text/plain' });

	it('rejects if param1 not valid', async function () {
		await rejects(ZDRTestingWrap.App.KOMCard.KOMCardAudioClear({}, uRandomElement(mod.KOMCardSides())), /KOMErrorInputNotValid/);
	});

	it('rejects if param2 not valid', async function () {
		await rejects(ZDRTestingWrap.App.KOMCard.KOMCardAudioClear(StubCardObjectValid(), Math.random().toString()), /KOMErrorInputNotValid/);
	});

	it('returns param1', async function () {
		const side = uRandomElement(mod.KOMCardSides());
		const item = await ZDRTestingWrap.App.KOMCard.KOMCardAudioCapture(StubCardObjectValid(), side, blob);

		strictEqual(await ZDRTestingWrap.App.KOMCard.KOMCardAudioClear(item, side), item);
	});

	context('KOMCardSideFront', function () {

		const side = mod.KOMCardSideFront();

		it('calls ZDRStorageDeleteFile', async function () {
			const card = StubCardObjectValid();
			deepEqual(uCapture(function (capture) {
				const fake = Object.assign({}, ZDRTestingWrap);

				fake.App.ZDRStorageDeleteFile = capture;
				
				ZDRTestingWrap.App.KOMCard.KOMCardAudioClear.bind(fake)(card, side);
			}), [mod.KOMCardSideAudioPath(card, side)]);
		});

		it('sets KOMCardFrontAudio', async function () {
			deepEqual((await ZDRTestingWrap.App.KOMCard.KOMCardAudioClear(StubCardObjectValid(), side, {
				type: Math.random().toString(),
			})).KOMCardFrontAudio, undefined);
		});
	
	});

	context('KOMCardSideRear', function () {

		const side = mod.KOMCardSideRear();

		it('calls ZDRStorageDeleteFile', async function () {
			const card = StubCardObjectValid();
			deepEqual(uCapture(function (capture) {
				const fake = Object.assign({}, ZDRTestingWrap);

				fake.App.ZDRStorageDeleteFile = capture;
				
				ZDRTestingWrap.App.KOMCard.KOMCardAudioClear.bind(fake)(card, side);
			}), [mod.KOMCardSideAudioPath(card, side)]);
		});

		it('sets KOMCardRearAudio', async function () {
			deepEqual((await ZDRTestingWrap.App.KOMCard.KOMCardAudioClear(StubCardObjectValid(), side, {
				type: Math.random().toString(),
			})).KOMCardRearAudio, undefined);
		});
	
	});

});

describe('ZDRSchemaDispatchValidate', function () {

	it('returns function', function () {
		deepEqual(mod.ZDRSchemaDispatchValidate, mod.KOMCardErrors);
	});

});

describe('ZDRSchemaPath', function () {

	it('returns function', function() {
		deepEqual(mod.ZDRSchemaPath, mod.KOMCardObjectPath);
	});

});

describe('ZDRSchemaStub', function () {

	it('returns function', function() {
		deepEqual(mod.ZDRSchemaStub, mod.KOMCardStub);
	});

});
