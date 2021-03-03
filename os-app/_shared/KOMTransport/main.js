import OLSKRemoteStorage from 'OLSKRemoteStorage';

export default {
	ZDRSchemaKey: 'KOMTransport',
	ZDRSchemaDispatchValidate: (function () {}),
	ZDRSchemaPath: (function () {}),
	ZDRSchemaStub: (function () {}),
	ZDRSchemaMethods: {

		async KOMTransportImport (inputData) {
			if (typeof inputData !== 'object' || inputData === null) {
				throw new Error('KOMErrorInputNotValid');
			}

			const _this = this;

			return Object.fromEntries(await Promise.all(Object.entries(inputData).map(async function ([key, value]) {
				if (!Array.isArray(value)) {
					throw new Error('KOMErrorInputNotValid');
				}

				return [key, await ({
					KOMDeck: (function () {
						return Promise.all(value.map(async function (e) {
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
					}),
					KOMSetting: (function () {
						return Promise.all(value.map(function (e) {
							return _this.App.KOMSetting.ZDRModelWriteObject(e).catch(function () {
								throw new Error('KOMErrorInputNotValid');
							});
						}));
					}),
				}[key]())];
			})));
		},

		async KOMTransportExport (inputData) {
			if (typeof inputData !== 'object' || inputData === null) {
				throw new Error('KOMErrorInputNotValid');
			}

			const _this = this;

			return Object.fromEntries(await Promise.all(Object.entries(inputData).map(async function ([key, value]) {
				if (!Array.isArray(value)) {
					throw new Error('KOMErrorInputNotValid');
				}

				return [key, await Promise.all(value.map(async function (item) {
					return Object.assign(OLSKRemoteStorage.OLSKRemoteStorageSafeCopy(item), key !== 'KOMDeck' ? {} : {
						$KOMDeckCards: await Promise.all((await _this.App.KOMCard.KOMCardList(item)).map(async function (e) {
							return Object.entries(await _this.App.KOMSpacing.KOMSpacingList(e, item)).reduce(function (coll, item) {
								if (item[1].KOMSpacingChronicles.length) {
									coll['$' + item[0]] = item[1];
								}

								return coll;
							}, e);
						})),
					});
				}))];
			})));

			return Promise.all(inputData.map(async function (deck) {
				return Object.assign(OLSKRemoteStorage.OLSKRemoteStorageSafeCopy(deck), {
					
				});
			}));
		},

	},
};
