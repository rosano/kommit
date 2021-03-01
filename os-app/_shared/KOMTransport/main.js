import OLSKRemoteStorage from 'OLSKRemoteStorage';

export default {
	ZDRSchemaKey: 'KOMTransport',
	ZDRSchemaDispatchValidate: (function () {}),
	ZDRSchemaPath: (function () {}),
	ZDRSchemaStub: (function () {}),
	ZDRSchemaMethods: {

		KOMTransportImport (inputData) {
			if (!Array.isArray(inputData)) {
				throw new Error('KOMErrorInputNotValid');
			}

			if (!inputData.length) {
				throw new Error('KOMErrorInputNotValid');
			}

			const _this = this;

			return Promise.all(inputData.map(async function (e) {
				if (!Array.isArray(e.$KOMDeckCards)) {
					throw new Error('KOMErrorInputNotValid');
				}

				const deck = await _this.App.KOMDeck.KOMDeckCreate(e).catch(function () {
					throw new Error('KOMErrorInputNotValid');
				});

				await Promise.all(e.$KOMDeckCards.map(async function (e) {
					const card = await _this.App.KOMCard.KOMCardCreate(e, deck).catch(function () {
						throw new Error('KOMErrorInputNotValid');
					});

					const spacings = await _this.App.KOMSpacing.KOMSpacingList(card);

					return Promise.all(['$KOMCardSpacingForward', '$KOMCardSpacingBackward'].map(async function (e) {
						if (!card[e]) {
							return Promise.resolve();
						}

						return await _this.App.KOMSpacing.KOMSpacingWrite(Object.assign(card[e], {
							KOMSpacingID: spacings[e.slice(1)].KOMSpacingID,
						}), card).catch(function () {
							throw new Error('KOMErrorInputNotValid');
						});
					}));
				}));

				delete deck.$KOMDeckCards;

				return deck;
			}));
		},

		KOMTransportExport (inputData) {
			if (!Array.isArray(inputData)) {
				throw new Error('KOMErrorInputNotValid');
			}

			if (!inputData.length) {
				throw new Error('KOMErrorInputNotValid');
			}

			const _this = this;

			return Promise.all(inputData.map(async function (deck) {
				return Object.assign(OLSKRemoteStorage.OLSKRemoteStorageSafeCopy(deck), {
					$KOMDeckCards: await Promise.all((await _this.App.KOMCard.KOMCardList(deck)).map(async function (e) {
						return Object.entries(await _this.App.KOMSpacing.KOMSpacingList(e, deck)).reduce(function (coll, item) {
							if (item[1].KOMSpacingChronicles.length) {
								coll['$' + item[0]] = item[1];
							}

							return coll;
						}, e);
					})),
				});
			}));
		},

	},
};
