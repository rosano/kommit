import { factory, detectPrng } from 'ulid';
const uniqueID = typeof require === 'undefined' && navigator.appName === 'Zombie' ? factory(detectPrng(true)) : factory();

import KOMDeckMetal from './metal.js';

const mod = {

	async KOMDeckActionCreate (storageClient, inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		let creationDate = new Date();

		return await KOMDeckMetal.KOMDeckMetalWrite(storageClient, Object.assign(inputData, {
			KOMDeckID: uniqueID(),
			KOMDeckCreationDate: creationDate,
			KOMDeckModificationDate: creationDate,
		}));
	},

	async KOMDeckActionUpdate (storageClient, inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		return await KOMDeckMetal.KOMDeckMetalWrite(storageClient, Object.assign(inputData, {
			KOMDeckModificationDate: new Date(),
		}));
	},

	async KOMDeckActionDelete (storageClient, inputData) {
		return await KOMDeckMetal.KOMDeckMetalDelete(storageClient, inputData);
	},

	async KOMDeckActionList (storageClient) {
		return Object.values(await KOMDeckMetal.KOMDeckMetalList(storageClient));
	},
	
};
	
export default mod;
