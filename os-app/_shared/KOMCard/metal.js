import { KOMCardModelErrorsFor, KOMCardModelPostJSONParse } from './model.js';

export const KOMCardMetalWrite = async function(storageClient, inputData) {
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
};

export const KOMCardMetalRead = async function(storageClient, inputData) {
	if (typeof inputData !== 'string') {
		return Promise.reject(new Error('KOMErrorInputNotValid'));
	}

	return KOMCardModelPostJSONParse(await storageClient.kommit.kom_cards.KOMStorageRead(inputData));
};

export const KOMCardMetalList = async function(storageClient) {
	let outputData = await storageClient.kommit.kom_cards.KOMStorageList();

	for (let key in outputData) {
		KOMCardModelPostJSONParse(outputData[key]);
	}
	
	return outputData;
};

export const KOMCardMetalDelete = async function(storageClient, inputData) {
	if (typeof inputData !== 'string') {
		return Promise.reject(new Error('KOMErrorInputNotValid'));
	}

	return await storageClient.kommit.kom_cards.KOMStorageDelete(inputData);
};
