import { KOMDocumentModelErrorsFor, KOMDocumentModelPostJSONParse } from './model.js';

export const KOMDocumentMetalWrite = async function(storageClient, inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		return Promise.reject(new Error('KOMErrorInputNotValid'));
	}

	let errors = KOMDocumentModelErrorsFor(inputData);
	if (errors) {
		return Promise.resolve({
			KOMErrors: errors,
		});
	}

	return await storageClient.kommit.kom_documents.KOMStorageWrite(inputData.KOMDocumentID, inputData);
};

export const KOMDocumentMetalRead = async function(storageClient, inputData) {
	if (typeof inputData !== 'string') {
		return Promise.reject(new Error('KOMErrorInputNotValid'));
	}

	return KOMDocumentModelPostJSONParse(await storageClient.kommit.kom_documents.KOMStorageRead(inputData));
};

export const KOMDocumentMetalList = async function(storageClient) {
	let outputData = await storageClient.kommit.kom_documents.KOMStorageList();

	for (let key in outputData) {
		KOMDocumentModelPostJSONParse(outputData[key]);
	}
	
	return outputData;
};

export const KOMDocumentMetalDelete = async function(storageClient, inputData) {
	if (typeof inputData !== 'string') {
		return Promise.reject(new Error('KOMErrorInputNotValid'));
	}

	return await storageClient.kommit.kom_documents.KOMStorageDelete(inputData);
};
