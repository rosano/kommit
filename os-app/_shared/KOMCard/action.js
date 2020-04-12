import { factory, detectPrng } from 'ulid';
const uniqueID = typeof require === 'undefined' && navigator.appName === 'Zombie' ? factory(detectPrng(true)) : factory();

import KOMCardMetal from './metal.js';
import { KOMDeckModelErrorsFor } from '../KOMDeck/model.js';

const mod = {

	async KOMCardActionCreate (storageClient, param1, param2) {
		if (typeof param1 !== 'object' || param1 === null) {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		if (KOMDeckModelErrorsFor(param2)) {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		let creationDate = new Date();

		return await KOMCardMetal.KOMCardMetalWrite(storageClient, Object.assign(param1, {
			KOMCardID: uniqueID(),
			KOMCardCreationDate: creationDate,
			KOMCardModificationDate: creationDate,
		}));
	},

	async KOMCardActionRead (storageClient, inputData) {
		return await KOMCardMetal.KOMCardMetalRead(storageClient, inputData);
	},

	async KOMCardActionUpdate (storageClient, param1, param2) {
		if (typeof param1 !== 'object' || param1 === null) {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		if (KOMDeckModelErrorsFor(param2)) {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		return await KOMCardMetal.KOMCardMetalWrite(storageClient, Object.assign(param1, {
			KOMCardModificationDate: new Date(),
		}));
	},

	async KOMCardActionDelete (storageClient, inputData) {
		return await KOMCardMetal.KOMCardMetalDelete(storageClient, inputData);
	},

	async KOMCardActionList (storageClient) {
		return Object.values(await KOMCardMetal.KOMCardMetalList(storageClient));
	},
	
};
	
export default mod;
