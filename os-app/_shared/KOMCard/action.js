import { factory, detectPrng } from 'ulid';
const uniqueID = typeof require === 'undefined' && navigator.appName === 'Zombie' ? factory(detectPrng(true)) : factory();

import KOMCardStorage from './storage.js';
import KOMCardModel from './model.js';
import KOMDeckModel from '../KOMDeck/model.js';

const mod = {

	async KOMCardActionCreate(storageClient, param1, param2) {
		if (typeof param1 !== 'object' || param1 === null) {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		if (KOMDeckModel.KOMDeckModelErrorsFor(param2)) {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		const creationDate = new Date();

		return await KOMCardStorage.KOMCardStorageWrite(storageClient, Object.assign({
			KOMCardID: uniqueID(),
			KOMCardDeckID: param2.KOMDeckID,
			KOMCardCreationDate: creationDate,
			KOMCardModificationDate: creationDate,
		}, param1), param2);
	},

	async KOMCardActionUpdate(storageClient, inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		return await KOMCardStorage.KOMCardStorageWrite(storageClient, Object.assign(inputData, {
			KOMCardModificationDate: new Date(),
		}));
	},

	async KOMCardActionDelete(storageClient, inputData) {
		return await KOMCardStorage.KOMCardStorageDelete(storageClient, inputData);
	},

	async KOMCardActionList(storageClient, inputData) {
		return Object.values(await KOMCardStorage.KOMCardStorageList(storageClient, inputData));
	},

	async KOMCardActionAudioCapture(storageClient, param1, param2, param3, param4) {
		if (!KOMCardModel.KOMCardModelAudioFields().includes(param1)) {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		if (!param2 || !(param2 instanceof Blob)) {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		if (KOMCardModel.KOMCardModelErrorsFor(param3)) {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		if (KOMDeckModel.KOMDeckModelErrorsFor(param4)) {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		await KOMCardStorage.KOMCardStorageFileWrite(storageClient, param2, param1 === 'KOMCardFrontAudio' ? KOMCardStorage.KOMCardStorageAudioPathFront(param3, param4) : KOMCardStorage.KOMCardStorageAudioPathRear(param3, param4));

		param3[param1] = true;

		return param3;
	},

	async KOMCardActionAudioClear(storageClient, param1, param2, param3) {
		if (!KOMCardModel.KOMCardModelAudioFields().includes(param1)) {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		if (KOMCardModel.KOMCardModelErrorsFor(param2)) {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		if (KOMDeckModel.KOMDeckModelErrorsFor(param3)) {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		await KOMCardStorage.KOMCardStorageFileDelete(storageClient, param1 === 'KOMCardFrontAudio' ? KOMCardStorage.KOMCardStorageAudioPathFront(param2, param3) : KOMCardStorage.KOMCardStorageAudioPathRear(param2, param3));

		delete param2[param1];

		return param2;
	},

	async KOMCardActionAudioFetch(storageClient, param1, param2, param3) {
		if (!KOMCardModel.KOMCardModelAudioFields().includes(param1)) {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		if (KOMCardModel.KOMCardModelErrorsFor(param2)) {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		if (KOMDeckModel.KOMDeckModelErrorsFor(param3)) {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		return await KOMCardStorage.KOMCardStorageFileRead(storageClient, param1 === 'KOMCardFrontAudio' ? KOMCardStorage.KOMCardStorageAudioPathFront(param2, param3) : KOMCardStorage.KOMCardStorageAudioPathRear(param2, param3));
	},

	async KOMCardActionAudioList(storageClient, param1, param2) {
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
			KOMCardFrontAudio: await KOMCardStorage.KOMCardStorageFileRead(storageClient, KOMCardStorage.KOMCardStorageAudioPathFront(param1, param2)),
			KOMCardRearAudio: await KOMCardStorage.KOMCardStorageFileRead(storageClient, KOMCardStorage.KOMCardStorageAudioPathRear(param1, param2)),
		});
	},

};

export default mod;
