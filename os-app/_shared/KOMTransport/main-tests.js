const { throws, rejects, deepEqual } = require('assert');

const mod = require('./main.js').default;

const KOMSpacing = require('../KOMSpacing/main.js').default;

describe('KOMTransportImport', function test_KOMTransportImport() {

	it('throws if not array', function () {
		throws(function () {
			ZDRTestingWrap.App.KOMTransport.KOMTransportImport(null);
		}, /KOMErrorInputNotValid/);
	});

	it('throws if not filled', function () {
		throws(function () {
			ZDRTestingWrap.App.KOMTransport.KOMTransportImport([]);
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
			await rejects(ZDRTestingWrap.App.KOMTransport.KOMTransportImport([uDeck({
				KOMDeckName: null,
			})]), /KOMErrorInputNotValid/);
		});

		it('returns array', async function () {
			const item = uDeck()
			deepEqual(await ZDRTestingWrap.App.KOMTransport.KOMTransportImport([item]), [item]);
		});

		it('removes $KOMDeckCards', async function () {
			const item = await ZDRTestingWrap.App.KOMTransport.KOMTransportImport([uDeck()]);

			deepEqual(item[0].$KOMDeckCards, undefined);
		});

		it('creates KOMDeck objects', async function () {
			const item = await ZDRTestingWrap.App.KOMTransport.KOMTransportImport([uDeck()]);

			deepEqual(await ZDRTestingWrap.App.KOMDeck.KOMDeckList(), item);
		});
	
	});

	context('$KOMDeckCards', function () {
		
		it('rejects if not array', async function () {
			await rejects(ZDRTestingWrap.App.KOMTransport.KOMTransportImport([uDeck({
				$KOMDeckCards: null,
			})]), /KOMErrorInputNotValid/);
		});

		it('rejects if not valid', async function () {
			await rejects(ZDRTestingWrap.App.KOMTransport.KOMTransportImport([uDeck({
				$KOMDeckCards: [StubCardObjectValid({
					KOMCardFrontText: null,
				})],
			})]), /KOMErrorInputNotValid/);
		});

		it('creates KOMCard objects', async function () {
			const item = StubCardObjectValid();

			delete item.KOMCardID;
			delete item.KOMCardDeckID;

			const list = await ZDRTestingWrap.App.KOMCard.KOMCardList((await ZDRTestingWrap.App.KOMTransport.KOMTransportImport([uDeck({
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
			await rejects(ZDRTestingWrap.App.KOMTransport.KOMTransportImport([uDeck({
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

			const deck = (await ZDRTestingWrap.App.KOMTransport.KOMTransportImport([uDeck({
				$KOMDeckCards: [card],
			})]))[0];

			const list = await ZDRTestingWrap.App.KOMSpacing.KOMSpacingList((await ZDRTestingWrap.App.KOMCard.KOMCardList(deck))[0], deck);

			deepEqual(list.KOMCardSpacingForward, spacing);
		});
	
	});

	context('$KOMCardSpacingBackward', function () {
		
		it('rejects if not valid', async function () {
			await rejects(ZDRTestingWrap.App.KOMTransport.KOMTransportImport([uDeck({
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

			const deck = (await ZDRTestingWrap.App.KOMTransport.KOMTransportImport([uDeck({
				$KOMDeckCards: [card],
			})]))[0];

			const list = await ZDRTestingWrap.App.KOMSpacing.KOMSpacingList((await ZDRTestingWrap.App.KOMCard.KOMCardList(deck))[0], deck);

			deepEqual(list.KOMCardSpacingBackward, spacing);
		});
	
	});

});

describe('KOMTransportExport', function test_KOMTransportExport() {

	it('throws if not array', function () {
		throws(function () {
			ZDRTestingWrap.App.KOMTransport.KOMTransportExport(null);
		}, /KOMErrorInputNotValid/);
	});

	it('throws if not filled', function () {
		throws(function () {
			ZDRTestingWrap.App.KOMTransport.KOMTransportExport([]);
		}, /KOMErrorInputNotValid/);
	});

	it('returns array', async function () {
		deepEqual(Array.isArray(await ZDRTestingWrap.App.KOMTransport.KOMTransportExport([StubDeckObjectValid()])), true);
	});

	it('copies input', async function () {
		const item = StubDeckObjectValid();
		deepEqual((await ZDRTestingWrap.App.KOMTransport.KOMTransportExport([item]))[0] !== item, true);
	});

	it('strips dynamic attributes', async function () {
		const item = StubDeckObjectValid({
			$alfa: 'bravo',
		});
		deepEqual((await ZDRTestingWrap.App.KOMTransport.KOMTransportExport([item]))[0].$alfa, undefined);
	});

	context('$KOMDeckCards', function () {
		
		it('sets to KOMCard objects', async function () {
			const deck = StubDeckObjectValid();
			const item = await ZDRTestingWrap.App.KOMCard.KOMCardCreate(StubCardObjectValid(), deck);

			deepEqual(await ZDRTestingWrap.App.KOMTransport.KOMTransportExport([deck]), [Object.assign(deck, {
				$KOMDeckCards: await ZDRTestingWrap.App.KOMCard.KOMCardList(deck),
			})]);
		});
	
	});

	context('$KOMCardSpacingForward', function () {
		
		it('sets to KOMSpacing object', async function () {
			const deck = StubDeckObjectValid();
			const card = await ZDRTestingWrap.App.KOMCard.KOMCardCreate(StubCardObject(), deck);
			const spacing = await ZDRTestingWrap.App.KOMSpacing.KOMSpacingWrite(StubSpacingObjectValid({
				KOMSpacingChronicles: [StubChronicleObjectValid()],
			}, KOMSpacing.KOMSpacingLabelForward()), card);

			deepEqual((await ZDRTestingWrap.App.KOMTransport.KOMTransportExport([deck]))[0].$KOMDeckCards[0].$KOMCardSpacingForward, spacing);
		});
	
	});

	context('$KOMCardSpacingBackward', function () {
		
		it('sets to KOMSpacing object', async function () {
			const deck = StubDeckObjectValid();
			const card = await ZDRTestingWrap.App.KOMCard.KOMCardCreate(StubCardObject(), deck);
			const spacing = await ZDRTestingWrap.App.KOMSpacing.KOMSpacingWrite(StubSpacingObjectValid({
				KOMSpacingChronicles: [StubChronicleObjectValid()],
			}, KOMSpacing.KOMSpacingLabelBackward()), card);

			deepEqual((await ZDRTestingWrap.App.KOMTransport.KOMTransportExport([deck]))[0].$KOMDeckCards[0].$KOMCardSpacingBackward, spacing);
		});
	
	});

});
