import KOMDeckModel from './model.js';

const mod = {

	async KOMDeckMetalWrite (storageClient, inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		let errors = KOMDeckModel.KOMDeckModelErrorsFor(inputData);
		if (errors) {
			return Promise.resolve({
				KOMErrors: errors,
			});
		}

		return await storageClient.kommit.kom_decks.KOMStorageWrite(inputData.KOMDeckID, inputData);
	},

	async KOMDeckMetalRead (storageClient, inputData) {
		if (typeof inputData !== 'string') {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		return KOMDeckModel.KOMDeckModelPostJSONParse(await storageClient.kommit.kom_decks.KOMStorageRead(inputData));
	},

	async KOMDeckMetalList (storageClient) {
		let outputData = await storageClient.kommit.kom_decks.KOMStorageList();

		for (let key in outputData) {
			KOMDeckModel.KOMDeckModelPostJSONParse(outputData[key]);
		}
		
		return outputData;
	},

	async KOMDeckMetalDelete (storageClient, inputData) {
		if (typeof inputData !== 'string') {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		return await storageClient.kommit.kom_decks.KOMStorageDelete(inputData);
	},

};

export default mod;
