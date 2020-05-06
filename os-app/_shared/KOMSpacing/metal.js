import KOMSpacingModel from './model.js';

const mod = {

	async KOMSpacingMetalWrite (storageClient, param1, param2, param3) {
		if (typeof param1 !== 'object' || param1 === null) {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		let errors = KOMSpacingModel.KOMSpacingModelErrorsFor(param1);
		if (errors) {
			return Promise.resolve({
				KOMErrors: errors,
			});
		}

		const cleanObject = Object.assign({}, param1);

		delete cleanObject.$KOMSpacingCard;

		return Object.assign(param1, await storageClient.kommit.kom_spacings.KOMStorageWrite(cleanObject, param2, param3));
	},

	async KOMSpacingMetalList (storageClient, param1, param2) {
		let outputData = await storageClient.kommit.kom_spacings.KOMStorageList(param1, param2);

		for (let key in outputData) {
			KOMSpacingModel.KOMSpacingModelPostJSONParse(outputData[key]);
		}
		
		return outputData;
	},

	async KOMSpacingMetalDelete (storageClient, param1, param2, param3) {
		if (KOMSpacingModel.KOMSpacingModelErrorsFor(param1)) {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		return await storageClient.kommit.kom_spacings.KOMStorageDelete(param1, param2, param3);
	},

};

export default mod;