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
				return Promise.reject(new Error('KOMErrorInputNotValid'));
			}

			await Promise.all(e.$KOMDeckCards.map(async function (e) {
				const card = await KOMCardAction.KOMCardActionCreate(storageClient, e, deck);

				if (card.KOMErrors) {
					return Promise.reject(new Error('KOMErrorInputNotValid'));
				}

				await Promise.all(['$KOMCardSpacingForward', '$KOMCardSpacingBackward'].map(async function (e) {
					if (!card[e]) {
						return Promise.resolve();
					}

					const spacing = await KOMSpacingStorage.KOMSpacingStorageWrite(storageClient, card[e], card, deck);

					if (spacing.KOMErrors) {
						return Promise.reject(new Error('KOMErrorInputNotValid'));
					}

					return spacing;
				}));

				return card
			}));

			delete deck.$KOMDeckCards;

			return deck;
		}));
	},

};

export default mod;
