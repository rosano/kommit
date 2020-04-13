import KOMCardModel from './model.js';

const mod = {

	async KOMCardMetalWrite (storageClient, param1, param2) {
		if (typeof param1 !== 'object' || param1 === null) {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		let errors = KOMCardModel.KOMCardModelErrorsFor(param1);
		if (errors) {
			return Promise.resolve({
				KOMErrors: errors,
			});
		}

		return await storageClient.kommit.kom_cards.KOMStorageWrite(param1, param2);
	},

	async KOMCardMetalRead (storageClient, param1, param2) {
		if (typeof param1 !== 'string') {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		return KOMCardModel.KOMCardModelPostJSONParse(await storageClient.kommit.kom_cards.KOMStorageRead(param1, param2));
	},

	async KOMCardMetalList (storageClient, inputData) {
		let outputData = await storageClient.kommit.kom_cards.KOMStorageList(inputData);

		for (let key in outputData) {
			KOMCardModel.KOMCardModelPostJSONParse(outputData[key]);
		}
		
		return outputData;
	},

	async KOMCardMetalDelete (storageClient, param1, param2) {
		if (typeof param1 !== 'string') {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		return await storageClient.kommit.kom_cards.KOMStorageDelete(param1, param2);
	},

};

export default mod;
