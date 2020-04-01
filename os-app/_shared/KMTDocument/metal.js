import { KMTDocumentModelErrorsFor, KMTDocumentModelPostJSONParse } from './model.js';

export const KMTDocumentMetalWrite = async function(storageClient, inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		return Promise.reject(new Error('EMTErrorInputNotValid'));
	}

	let errors = KMTDocumentModelErrorsFor(inputData);
	if (errors) {
		return Promise.resolve({
			EMTErrors: errors,
		});
	}

	return await storageClient.kommit.kmt_documents.EMTStorageWrite(inputData.KMTDocumentID, inputData);
};

export const KMTDocumentMetalRead = async function(storageClient, inputData) {
	if (typeof inputData !== 'string') {
		return Promise.reject(new Error('EMTErrorInputNotValid'));
	}

	return KMTDocumentModelPostJSONParse(await storageClient.kommit.kmt_documents.EMTStorageRead(inputData));
};

export const KMTDocumentMetalList = async function(storageClient) {
	let outputData = await storageClient.kommit.kmt_documents.EMTStorageList();

	for (let key in outputData) {
		KMTDocumentModelPostJSONParse(outputData[key]);
	}
	
	return outputData;
};

export const KMTDocumentMetalDelete = async function(storageClient, inputData) {
	if (typeof inputData !== 'string') {
		return Promise.reject(new Error('EMTErrorInputNotValid'));
	}

	return await storageClient.kommit.kmt_documents.EMTStorageDelete(inputData);
};
