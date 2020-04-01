import { KMTDocumentModelErrorsFor, KMTDocumentModelPostJSONParse } from './model.js';

export const KMTDocumentMetalWrite = async function(storageClient, inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		return Promise.reject(new Error('KMTErrorInputNotValid'));
	}

	let errors = KMTDocumentModelErrorsFor(inputData);
	if (errors) {
		return Promise.resolve({
			KMTErrors: errors,
		});
	}

	return await storageClient.kommit.kmt_documents.KMTStorageWrite(inputData.KMTDocumentID, inputData);
};

export const KMTDocumentMetalRead = async function(storageClient, inputData) {
	if (typeof inputData !== 'string') {
		return Promise.reject(new Error('KMTErrorInputNotValid'));
	}

	return KMTDocumentModelPostJSONParse(await storageClient.kommit.kmt_documents.KMTStorageRead(inputData));
};

export const KMTDocumentMetalList = async function(storageClient) {
	let outputData = await storageClient.kommit.kmt_documents.KMTStorageList();

	for (let key in outputData) {
		KMTDocumentModelPostJSONParse(outputData[key]);
	}
	
	return outputData;
};

export const KMTDocumentMetalDelete = async function(storageClient, inputData) {
	if (typeof inputData !== 'string') {
		return Promise.reject(new Error('KMTErrorInputNotValid'));
	}

	return await storageClient.kommit.kmt_documents.KMTStorageDelete(inputData);
};
