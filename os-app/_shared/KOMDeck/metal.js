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

		const cleanObject = Object.assign({}, inputData);

		delete cleanObject.$KOMDeckCards;
		delete cleanObject.$KOMDeckSpacings;

		return Object.assign(inputData, await storageClient.kommit.kom_decks.KOMStorageWrite(cleanObject));
	},

	async KOMDeckMetalList (storageClient) {
		let outputData = await storageClient.kommit.kom_decks.KOMStorageList();

		for (let key in outputData) {
			KOMDeckModel.KOMDeckModelPostJSONParse(outputData[key]);
		}
		
		return outputData;
	},

	async KOMDeckMetalDelete (storageClient, inputData) {
		return await storageClient.kommit.kom_decks.KOMStorageDelete(inputData);
	},

};

export default mod;
