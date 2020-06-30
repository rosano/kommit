import { factory, detectPrng } from 'ulid';
const uniqueID = typeof require === 'undefined' && navigator.appName === 'Zombie' ? factory(detectPrng(true)) : factory();

import KOMCardStorage from './storage.js';
import KOMCardMetal from './metal.js';
import KOMCardModel from './model.js';
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

	async KOMCardActionList (storageClient, inputData) {
		return Object.values(await KOMCardMetal.KOMCardMetalList(storageClient, inputData));
	},

	async KOMCardActionAudioCapture (storageClient, param1, param2, param3, param4) {
		if (!KOMCardModel.KOMCardModelAudioFields().includes(param1)) {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		if (!(param2 instanceof Blob)) {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		if (KOMCardModel.KOMCardModelErrorsFor(param3)) {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}
		
		if (KOMDeckModel.KOMDeckModelErrorsFor(param4)) {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		await KOMCardMetal.KOMCardMetalFileWrite(storageClient, param2, param1 === 'KOMCardFrontAudio' ? KOMCardStorage.KOMCardStorageAudioPathFront(param3, param4) : KOMCardStorage.KOMCardStorageAudioPathRear(param3, param4));

		param3[param1] = true;

		return param3;		
	},

	async KOMCardActionAudioClear (storageClient, param1, param2, param3) {
		if (!KOMCardModel.KOMCardModelAudioFields().includes(param1)) {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		if (KOMCardModel.KOMCardModelErrorsFor(param2)) {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}
		
		if (KOMDeckModel.KOMDeckModelErrorsFor(param3)) {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		await KOMCardMetal.KOMCardMetalFileDelete(storageClient, param1 === 'KOMCardFrontAudio' ? KOMCardStorage.KOMCardStorageAudioPathFront(param2, param3) : KOMCardStorage.KOMCardStorageAudioPathRear(param2, param3));

		delete param2[param1];

		return param2;		
	},

	async KOMCardActionAudioFetch (storageClient, param1, param2, param3) {
		if (!KOMCardModel.KOMCardModelAudioFields().includes(param1)) {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		if (KOMCardModel.KOMCardModelErrorsFor(param2)) {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}
		
		if (KOMDeckModel.KOMDeckModelErrorsFor(param3)) {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		return await KOMCardMetal.KOMCardMetalFileRead(storageClient, param1 === 'KOMCardFrontAudio' ? KOMCardStorage.KOMCardStorageAudioPathFront(param2, param3) : KOMCardStorage.KOMCardStorageAudioPathRear(param2, param3));
	},

	async KOMCardActionAudioList (storageClient, param1, param2) {
		if (KOMCardModel.KOMCardModelErrorsFor(param1)) {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}
		
		if (KOMDeckModel.KOMDeckModelErrorsFor(param2)) {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		return KOMCardModel.KOMCardModelAudioFields().reduce(function (coll, item) {
			if (!coll[item]) {
				delete coll[item];
			}

			return coll;
		}, {
			KOMCardFrontAudio: await KOMCardMetal.KOMCardMetalFileRead(storageClient, KOMCardStorage.KOMCardStorageAudioPathFront(param1, param2)),
			KOMCardRearAudio: await KOMCardMetal.KOMCardMetalFileRead(storageClient, KOMCardStorage.KOMCardStorageAudioPathRear(param1, param2)),
		});
	},
	
};
	
export default mod;
