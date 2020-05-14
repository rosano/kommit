import { factory, detectPrng } from 'ulid';
const uniqueID = typeof require === 'undefined' && navigator.appName === 'Zombie' ? factory(detectPrng(true)) : factory();

import KOMCardMetal from './metal.js';
import KOMDeckModel from '../KOMDeck/model.js';

const mod = {

	async KOMCardActionCreate (storageClient, param1, param2) {
		if (typeof param1 !== 'object' || param1 === null) {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		if (KOMDeckModel.KOMDeckModelErrorsFor(param2)) {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		const creationDate = new Date();

		return await KOMCardMetal.KOMCardMetalWrite(storageClient, Object.assign({
			KOMCardID: uniqueID(),
			KOMCardDeckID: param2.KOMDeckID,
			KOMCardCreationDate: creationDate,
			KOMCardModificationDate: creationDate,
		}, param1), param2);
	},

	async KOMCardActionUpdate (storageClient, param1, param2) {
		if (typeof param1 !== 'object' || param1 === null) {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		if (KOMDeckModel.KOMDeckModelErrorsFor(param2)) {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		return await KOMCardMetal.KOMCardMetalWrite(storageClient, Object.assign(param1, {
			KOMCardModificationDate: new Date(),
		}), param2);
	},

	async KOMCardActionDelete (storageClient, param1, param2) {
		return await KOMCardMetal.KOMCardMetalDelete(storageClient, param1, param2);
	},

	async KOMCardActionList (storageClient, inputData) {
		return Object.values(await KOMCardMetal.KOMCardMetalList(storageClient, inputData));
	},
	
};
	
export default mod;
