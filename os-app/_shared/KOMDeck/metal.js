import { KOMDeckModelErrorsFor, KOMDeckModelPostJSONParse } from './model.js';

export const KOMDeckMetalWrite = async function(storageClient, inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		return Promise.reject(new Error('KOMErrorInputNotValid'));
	}

	let errors = KOMDeckModelErrorsFor(inputData);
	if (errors) {
		return Promise.resolve({
			KOMErrors: errors,
		});
	}

	return await storageClient.kommit.kom_documents.KOMStorageWrite(inputData.KOMDeckID, inputData);
};

export const KOMDeckMetalRead = async function(storageClient, inputData) {
	if (typeof inputData !== 'string') {
		return Promise.reject(new Error('KOMErrorInputNotValid'));
	}

	return KOMDeckModelPostJSONParse(await storageClient.kommit.kom_documents.KOMStorageRead(inputData));
};

export const KOMDeckMetalList = async function(storageClient) {
	let outputData = await storageClient.kommit.kom_documents.KOMStorageList();

	for (let key in outputData) {
		KOMDeckModelPostJSONParse(outputData[key]);
	}
	
	return outputData;
};

export const KOMDeckMetalDelete = async function(storageClient, inputData) {
	if (typeof inputData !== 'string') {
		return Promise.reject(new Error('KOMErrorInputNotValid'));
	}

	return await storageClient.kommit.kom_documents.KOMStorageDelete(inputData);
};
