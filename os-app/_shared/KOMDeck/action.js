import { factory, detectPrng } from 'ulid';
const uniqueID = typeof require === 'undefined' && navigator.appName === 'Zombie' ? factory(detectPrng(true)) : factory();

import KOMDeckStorage from './storage.js';
import KOMCardAction from '../KOMCard/action.js';

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

};

export default mod;
