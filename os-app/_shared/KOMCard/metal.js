import { KOMCardModelErrorsFor, KOMCardModelPostJSONParse } from './model.js';

const mod = {

	async KOMCardMetalWrite (storageClient, inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		let errors = KOMCardModelErrorsFor(inputData);
		if (errors) {
			return Promise.resolve({
				KOMErrors: errors,
			});
		}

		return await storageClient.kommit.kom_cards.KOMStorageWrite(inputData.KOMCardID, inputData);
	},

	async KOMCardMetalRead (storageClient, inputData) {
		if (typeof inputData !== 'string') {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		return KOMCardModelPostJSONParse(await storageClient.kommit.kom_cards.KOMStorageRead(inputData));
	},

	async KOMCardMetalList (storageClient) {
		let outputData = await storageClient.kommit.kom_cards.KOMStorageList();

		for (let key in outputData) {
			KOMCardModelPostJSONParse(outputData[key]);
		}
		
		return outputData;
	},

	async KOMCardMetalDelete (storageClient, inputData) {
		if (typeof inputData !== 'string') {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		return await storageClient.kommit.kom_cards.KOMStorageDelete(inputData);
	},

};

export default mod;
