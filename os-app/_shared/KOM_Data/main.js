import * as OLSKRemoteStoragePackage from 'OLSKRemoteStorage';
const OLSKRemoteStorage = OLSKRemoteStoragePackage.default || OLSKRemoteStoragePackage;

import KOMDeckAction from '../KOMDeck/action.js';
import KOMCardAction from '../KOMCard/action.js';
import KOMSpacingStorage from '../KOMSpacing/storage.js';

const mod = {

	KOM_DataModule(inputData, options) {
		return OLSKRemoteStorage.OLSKRemoteStorageDataModuleGenerator('kommit', options)(inputData);
	},

	KOM_DataImport (storageClient, inputData) {
		if (!Array.isArray(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (!inputData.length) {
			throw new Error('KOMErrorInputNotValid');
		}

		return Promise.all(inputData.map(async function (e) {
			if (!Array.isArray(e.$KOMDeckCards)) {
				return Promise.reject(new Error('KOMErrorInputNotValid'));
			}

			const deck = await KOMDeckAction.KOMDeckActionCreate(storageClient, e);

			if (deck.KOMErrors) {
				// console.log('KOMErrorInputNotValid', deck.KOMErrors, e);
				return Promise.reject(new Error('KOMErrorInputNotValid'));
			}

			await Promise.all(e.$KOMDeckCards.map(async function (e) {
				const card = await KOMCardAction.KOMCardActionCreate(storageClient, e, deck);

				if (card.KOMErrors) {
					// console.log('KOMErrorInputNotValid', card.KOMErrors, e);
					return Promise.reject(new Error('KOMErrorInputNotValid'));
				}

				const spacings = await KOMSpacingStorage.KOMSpacingStorageList(storageClient, card, deck);

				return Promise.all(['$KOMCardSpacingForward', '$KOMCardSpacingBackward'].map(async function (e) {
					if (!card[e]) {
						return Promise.resolve();
					}

					const spacing = await KOMSpacingStorage.KOMSpacingStorageWrite(storageClient, Object.assign(card[e], {
						KOMSpacingID: spacings[e.slice(1)].KOMSpacingID,
					}), card, deck);

					if (spacing.KOMErrors) {
						// console.log('KOMErrorInputNotValid', spacing.KOMErrors, card[e]);
						return Promise.reject(new Error('KOMErrorInputNotValid'));
					}

					return spacing;
				}));
			}));

			delete deck.$KOMDeckCards;

			return deck;
		}));
	},

	KOM_DataExport (storageClient, inputData) {
		if (!Array.isArray(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (!inputData.length) {
			throw new Error('KOMErrorInputNotValid');
		}

		return Promise.all(inputData.map(async function (deck) {
			return Object.assign(OLSKRemoteStorage.OLSKRemoteStorageSafeCopy(deck), {
				$KOMDeckCards: await Promise.all((await KOMCardAction.KOMCardActionList(storageClient, deck)).map(async function (e) {
					return Object.entries(await KOMSpacingStorage.KOMSpacingStorageList(storageClient, e, deck)).reduce(function (coll, item) {
						if (item[1].KOMSpacingChronicles.length) {
							coll['$' + item[0]] = item[1];
						}

						return coll;
					}, e);
				})),
			});
		}));
	},

};

export default mod;
