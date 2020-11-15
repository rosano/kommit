import { factory } from 'ulid';
const uniqueID = factory();

import KOMDeckStorage from './storage.js';
import KOMCardAction from '../KOMCard/action.js';
import KOMCardStorage from '../KOMCard/storage.js';
import KOMSpacingStorage from '../KOMSpacing/storage.js';
import KOMSpacingModel from '../KOMSpacing/model.js';
import OLSKRemoteStorage from 'OLSKRemoteStorage';

const mod = {

	async KOMDeckActionCreate(storageClient, inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		const creationDate = new Date();

		return await KOMDeckStorage.KOMDeckStorageWrite(storageClient, Object.assign({
			KOMDeckID: uniqueID(),
			KOMDeckCreationDate: creationDate,
			KOMDeckModificationDate: creationDate,
		}, inputData));
	},

	async KOMDeckActionUpdate(storageClient, inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		return await KOMDeckStorage.KOMDeckStorageWrite(storageClient, Object.assign(inputData, {
			KOMDeckModificationDate: new Date(),
		}));
	},

	async KOMDeckActionDelete(storageClient, inputData) {
		await Promise.all((await KOMCardAction.KOMCardActionList(storageClient, inputData)).map(function (e) {
			return KOMCardAction.KOMCardActionDelete(storageClient, e, inputData);
		}));

		return await KOMDeckStorage.KOMDeckStorageDelete(storageClient, inputData);
	},

	async KOMDeckActionList(storageClient) {
		return Object.values(await KOMDeckStorage.KOMDeckStorageList(storageClient));
	},

	async KOMDeckActionFetchObjects(storageClient, param1, param2 = false) {
		if (typeof param1 !== 'object' || param1 === null) {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		if (typeof param2 !== 'boolean') {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		const objectsMap = Object.entries(await KOMDeckStorage.KOMDeckStorageObjectsRecursive(storageClient, param1));

		const cards = objectsMap.reduce(function (coll, item) {
			if (KOMCardStorage.KOMCardStorageMatch(item[0])) {
				return coll.concat(OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(item[1]));
			}

			return coll;
		}, []);

		const spacings = objectsMap.reduce(function (coll, item) {
			if (KOMSpacingStorage.KOMSpacingStorageMatch(item[0])) {
				coll[KOMSpacingModel.KOMSpacingModelIdentifier(item[1].KOMSpacingID)] = (coll[KOMSpacingModel.KOMSpacingModelIdentifier(item[1].KOMSpacingID)] || []).concat(OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(item[1]))
			}

			return coll;
		}, {});

		await Promise.all(cards.map(async function (e) {
			if ((spacings[e.KOMCardID] || []).length === 2) {
				return;
			}

			spacings[e.KOMCardID] = Object.values(await KOMSpacingStorage.KOMSpacingStorageList(storageClient, e, param1));
		}));

		return {
			$KOMDeckCards: cards,
			$KOMDeckSpacings: [].concat(...(param2 ? cards.filter(function (e) {
				return ![e.KOMCardFrontText, e.KOMCardRearText].join(',').includes('???');
			}) : cards).map(function (card) {
				return (spacings[card.KOMCardID] || []).map(function (e) {
					return Object.assign(e, {
						$KOMSpacingCard: card,
					});
				});
			})).filter(function (e) {
				if (param1.KOMDeckIsForwardOnly && KOMSpacingModel.KOMSpacingModelIsBackward(e)) {
					return false;
				}

				return true;
			}),
		};
	},

};

export default mod;
