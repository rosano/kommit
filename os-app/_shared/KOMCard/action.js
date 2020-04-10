import KOMCardMetal from './metal.js';
import { factory, detectPrng } from 'ulid';
const uniqueID = typeof require === 'undefined' && navigator.appName === 'Zombie' ? factory(detectPrng(true)) : factory();

const mod = {

	 async KOMCardActionCreate (storageClient, inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		let creationDate = new Date();

		return await KOMCardMetal.KOMCardMetalWrite(storageClient, Object.assign(inputData, {
			KOMCardID: uniqueID(),
			KOMCardCreationDate: creationDate,
			KOMCardModificationDate: creationDate,
		}));
	},

	 async KOMCardActionRead (storageClient, inputData) {
		return await KOMCardMetal.KOMCardMetalRead(storageClient, inputData);
	},

	 async KOMCardActionUpdate (storageClient, inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		return await KOMCardMetal.KOMCardMetalWrite(storageClient, Object.assign(inputData, {
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
