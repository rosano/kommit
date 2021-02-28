const { rejects, deepEqual } = require('assert');

const mod = require('./main.js').default;

const KOMDeck = require('../KOMDeck/main.js').default;

describe('KOMDeckObjectMap', function test_KOMDeckObjectMap() {

	it('rejects if param1 not valid', async function () {
		await rejects(ZDRTestingWrap.App.KOMDeckObject.KOMDeckObjectMap({}), /KOMErrorInputNotValid/);
	});

	it('rejects if param2 not boolean', async function () {
		await rejects(ZDRTestingWrap.App.KOMDeckObject.KOMDeckObjectMap(StubDeckObjectValid(), 'true'), /KOMErrorInputNotValid/);
	});

	it('returns object', async function () {
		deepEqual(await ZDRTestingWrap.App.KOMDeckObject.KOMDeckObjectMap(StubDeckObjectValid()), {
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

			deepEqual((await ZDRTestingWrap.App.KOMDeckObject.KOMDeckObjectMap(deck)).$KOMDeckCards, [item]);
		});
	
	});

	context('$KOMDeckSpacings', function () {
		
		it('includes KOMSpacings', async function () {
			const item = await ZDRTestingWrap.App.KOMDeck.KOMDeckCreate(StubDeckObject());

			const card = await ZDRTestingWrap.App.KOMCard.KOMCardCreate({
				KOMCardFrontText: 'alfa',
				KOMCardRearText: 'bravo',
			}, item);

			deepEqual((await ZDRTestingWrap.App.KOMDeckObject.KOMDeckObjectMap(item)).$KOMDeckSpacings, Object.values(await ZDRTestingWrap.App.KOMSpacing.KOMSpacingList(card, item)).map(function (e) {
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

			deepEqual((await ZDRTestingWrap.App.KOMDeckObject.KOMDeckObjectMap(item)).$KOMDeckSpacings, Object.values(await ZDRTestingWrap.App.KOMSpacing.KOMSpacingList(card, item)).slice(0, 1).map(function (e) {
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

			deepEqual((await ZDRTestingWrap.App.KOMDeckObject.KOMDeckObjectMap(item, true)).$KOMDeckSpacings, []);
		});
	
	});

});