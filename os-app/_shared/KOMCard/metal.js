import KOMCardModel from './model.js';
import * as OLSKRemoteStoragePackage from 'OLSKRemoteStorage';
const OLSKRemoteStorage = OLSKRemoteStoragePackage.default || OLSKRemoteStoragePackage;

const mod = {

	async KOMCardMetalWrite (storageClient, inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		let errors = KOMCardModel.KOMCardModelErrorsFor(inputData);
		if (errors) {
			return Promise.resolve({
				KOMErrors: errors,
			});
		}

		return await storageClient.kommit.kom_cards.KOMStorageWrite(inputData);
	},

	async KOMCardMetalList (storageClient, inputData) {
		let outputData = await storageClient.kommit.kom_cards.KOMStorageList(inputData);

		for (let key in outputData) {
			OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(outputData[key]);
		}
		
		return outputData;
	},

	async KOMCardMetalDelete (storageClient, inputData) {
		if (KOMCardModel.KOMCardModelErrorsFor(inputData)) {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		return await storageClient.kommit.kom_cards.KOMStorageDelete(inputData);
	},

	async KOMCardMetalFileWrite (storageClient, param1, param2) {
		if (!(param1 instanceof Blob)) {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		if (typeof param2 !== 'string') {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		return await storageClient.kommit.kom_cards.KOMStorageFileWrite(param1, param2);
	},

	async KOMCardMetalFileRead (storageClient, inputData) {
		if (typeof inputData !== 'string') {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		return await storageClient.kommit.kom_cards.KOMStorageFileRead(inputData);
	},

	async KOMCardMetalFileDelete (storageClient, inputData) {
		if (typeof inputData !== 'string') {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		return await storageClient.kommit.kom_cards.KOMStorageFileDelete(inputData);
	},

};

export default mod;
