const { throws, rejects, deepEqual, strictEqual, notStrictEqual } = require('assert');

const mod = require('./main.js').default;

const KOMSpacing = require('../KOMSpacing/main.js').default;

describe('KOMTransportImport', function test_KOMTransportImport() {

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

	it('rejects if not object', async function () {
		await rejects(ZDRTestingWrap.App.KOMTransport.KOMTransportImport(null), /KOMErrorInputNotValid/);
	});

	it('returns object', async function () {
		deepEqual(await ZDRTestingWrap.App.KOMTransport.KOMTransportImport({}), {});
	});

	context('KOMDeck', function () {

		it('rejects if not array', async function () {
			await rejects(ZDRTestingWrap.App.KOMTransport.KOMTransportImport({
				KOMDeck: null,
			}), /KOMErrorInputNotValid/);
		});
		
		it('rejects if not valid', async function () {
			await rejects(ZDRTestingWrap.App.KOMTransport.KOMTransportImport({
				KOMDeck: [uDeck({
					KOMDeckName: null,
				})],
			}), /KOMErrorInputNotValid/);
		});

		it('passes input', async function () {
			const item = uDeck()
			strictEqual((await ZDRTestingWrap.App.KOMTransport.KOMTransportImport({
				KOMDeck: [item],
			})).KOMDeck.shift(), item);
		});

		it('removes $KOMDeckCards', async function () {
			const item = await ZDRTestingWrap.App.KOMTransport.KOMTransportImport({
				KOMDeck: [uDeck()],
			});

			deepEqual(item.KOMDeck.shift().$KOMDeckCards, undefined);
		});

		it('writes objects', async function () {
			const item = uDeck();

			await ZDRTestingWrap.App.KOMTransport.KOMTransportImport({
				KOMDeck: [item],
			});

			deepEqual(await ZDRTestingWrap.App.KOMDeck.KOMDeckList(), [item]);
		});		

		context('$KOMDeckCards', function () {
			
			it('rejects if not array', async function () {
				await rejects(ZDRTestingWrap.App.KOMTransport.KOMTransportImport({
					KOMDeck: [uDeck({
						$KOMDeckCards: null,
					})],
				}), /KOMErrorInputNotValid/);
			});

			it('rejects if not valid', async function () {
				await rejects(ZDRTestingWrap.App.KOMTransport.KOMTransportImport({
					KOMDeck: [uDeck({
						$KOMDeckCards: [StubCardObjectValid({
							KOMCardFrontText: null,
						})],
					})],
				}), /KOMErrorInputNotValid/);
			});

			it('creates KOMCard objects', async function () {
				const item = StubCardObjectValid();

				delete item.KOMCardID;
				delete item.KOMCardDeckID;

				const list = await ZDRTestingWrap.App.KOMCard.KOMCardList((await ZDRTestingWrap.App.KOMTransport.KOMTransportImport({
					KOMDeck: [uDeck({
						$KOMDeckCards: [item],
					})],
				})).KOMDeck.shift());

				deepEqual(list, [Object.assign(item, {
					KOMCardID: list[0].KOMCardID,
					KOMCardDeckID: list[0].KOMCardDeckID,
				})]);
			});
		
		});

		context('$KOMCardSpacingForward', function () {
			
			it('rejects if not valid', async function () {
				await rejects(ZDRTestingWrap.App.KOMTransport.KOMTransportImport({
					KOMDeck: [uDeck({
						$KOMDeckCards: [uCard({
							$KOMCardSpacingForward: StubSpacingObjectValid({
								KOMSpacingChronicles: null,
							}),
						})],
					})],
				}), /KOMErrorInputNotValid/);
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

				const deck = (await ZDRTestingWrap.App.KOMTransport.KOMTransportImport({
					KOMDeck: [uDeck({
						$KOMDeckCards: [card],
					})],
				})).KOMDeck.shift();

				const list = await ZDRTestingWrap.App.KOMSpacing.KOMSpacingList((await ZDRTestingWrap.App.KOMCard.KOMCardList(deck)).shift(), deck);

				deepEqual(list.KOMCardSpacingForward, spacing);
			});
		
		});

		context('$KOMCardSpacingBackward', function () {
			
			it('rejects if not valid', async function () {
				await rejects(ZDRTestingWrap.App.KOMTransport.KOMTransportImport({
					KOMDeck: [uDeck({
						$KOMDeckCards: [uCard({
							$KOMCardSpacingBackward: StubSpacingObjectValid({
								KOMSpacingChronicles: null,
							}),
						})],
					})],
				}), /KOMErrorInputNotValid/);
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

				const deck = (await ZDRTestingWrap.App.KOMTransport.KOMTransportImport({
					KOMDeck: [uDeck({
						$KOMDeckCards: [card],
					})],
				})).KOMDeck.shift();

				const list = await ZDRTestingWrap.App.KOMSpacing.KOMSpacingList((await ZDRTestingWrap.App.KOMCard.KOMCardList(deck)).shift(), deck);

				deepEqual(list.KOMCardSpacingBackward, spacing);
			});
		
		});
	
	});

	context('KOMSetting', function () {

		it('rejects if not array', async function () {
			await rejects(ZDRTestingWrap.App.KOMTransport.KOMTransportImport({
				KOMSetting: null,
			}), /KOMErrorInputNotValid/);
		});
		
		it('rejects if not valid', async function () {
			await rejects(ZDRTestingWrap.App.KOMTransport.KOMTransportImport({
				KOMSetting: [StubSettingObjectValid({
					KOMSettingKey: null,
				})],
			}), /KOMErrorInputNotValid/);
		});

		it('passes input', async function () {
			const item = StubSettingObjectValid()
			strictEqual((await ZDRTestingWrap.App.KOMTransport.KOMTransportImport({
				KOMSetting: [item],
			})).KOMSetting.shift(), item);
		});

		it('writes objects', async function () {
			const item = StubSettingObjectValid();

			await ZDRTestingWrap.App.KOMTransport.KOMTransportImport({
				KOMSetting: [item],
			});

			deepEqual(await ZDRTestingWrap.App.KOMSetting.KOMSettingList(), [item]);
		});
	
	});

});

describe('KOMTransportExport', function test_KOMTransportExport() {

	it('rejects if not object', async function () {
		await rejects(ZDRTestingWrap.App.KOMTransport.KOMTransportExport(null), /KOMErrorInputNotValid/);
	});

	context('KOMDeck', function () {

		it('rejects if not array', async function () {
			await rejects(ZDRTestingWrap.App.KOMTransport.KOMTransportExport({
				KOMDeck: null,
			}), /KOMErrorInputNotValid/);
		});

		it('copies input', async function () {
			const item = StubDeckObjectValid();
			notStrictEqual((await ZDRTestingWrap.App.KOMTransport.KOMTransportExport({
				KOMDeck: [item],
			})).KOMDeck.shift(), item);
		});

		it('strips dynamic attributes', async function () {
			const item = StubDeckObjectValid({
				$alfa: Math.random().toString(),
			});
			deepEqual((await ZDRTestingWrap.App.KOMTransport.KOMTransportExport({
				KOMDeck: [item],
			})).KOMDeck.shift().$alfa, undefined);
		});

		context('$KOMDeckCards', function () {
			
			it('sets to KOMCard objects', async function () {
				const deck = StubDeckObjectValid();
				const item = await ZDRTestingWrap.App.KOMCard.KOMCardCreate(StubCardObjectValid(), deck);

				deepEqual(await ZDRTestingWrap.App.KOMTransport.KOMTransportExport({
					KOMDeck: [deck],
				}), {
					KOMDeck: [Object.assign(deck, {
						$KOMDeckCards: await ZDRTestingWrap.App.KOMCard.KOMCardList(deck),
					})],
				});
			});
		
		});

		context('$KOMCardSpacingForward', function () {
			
			it('sets to KOMSpacing object', async function () {
				const deck = StubDeckObjectValid();
				const card = await ZDRTestingWrap.App.KOMCard.KOMCardCreate(StubCardObject(), deck);
				const spacing = await ZDRTestingWrap.App.KOMSpacing.KOMSpacingWrite(StubSpacingObjectValid({
					KOMSpacingChronicles: [StubChronicleObjectValid()],
				}, KOMSpacing.KOMSpacingLabelForward()), card);

				deepEqual((await ZDRTestingWrap.App.KOMTransport.KOMTransportExport({
					KOMDeck: [deck],
				})).KOMDeck.shift().$KOMDeckCards.shift().$KOMCardSpacingForward, spacing);
			});
		
		});

		context('$KOMCardSpacingBackward', function () {
			
			it('sets to KOMSpacing object', async function () {
				const deck = StubDeckObjectValid();
				const card = await ZDRTestingWrap.App.KOMCard.KOMCardCreate(StubCardObject(), deck);
				const spacing = await ZDRTestingWrap.App.KOMSpacing.KOMSpacingWrite(StubSpacingObjectValid({
					KOMSpacingChronicles: [StubChronicleObjectValid()],
				}, KOMSpacing.KOMSpacingLabelBackward()), card);

				deepEqual((await ZDRTestingWrap.App.KOMTransport.KOMTransportExport({
					KOMDeck: [deck],
				})).KOMDeck.shift().$KOMDeckCards.shift().$KOMCardSpacingBackward, spacing);
			});
		
		});
	
	});

	context('KOMSetting', function () {

		it('rejects if not array', async function () {
			await rejects(ZDRTestingWrap.App.KOMTransport.KOMTransportExport({
				KOMSetting: null,
			}), /KOMErrorInputNotValid/);
		});

		it('copies input', async function () {
			const item = StubSettingObjectValid();
			notStrictEqual((await ZDRTestingWrap.App.KOMTransport.KOMTransportExport({
				KOMSetting: [item],
			})).KOMSetting.shift(), item);
		});

		it('strips dynamic attributes', async function () {
			const item = StubSettingObjectValid({
				$alfa: Math.random().toString(),
			});
			deepEqual((await ZDRTestingWrap.App.KOMTransport.KOMTransportExport({
				KOMSetting: [item],
			})).KOMSetting.shift().$alfa, undefined);
		});
	
	});

});
