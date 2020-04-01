import * as KMTDocumentMetal from './metal.js';
import { factory, detectPrng } from 'ulid';
const uniqueID = typeof require === 'undefined' && navigator.appName === 'Zombie' ? factory(detectPrng(true)) : factory();

export const KMTDocumentActionCreate = async function(storageClient, inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		return Promise.reject(new Error('KMTErrorInputNotValid'));
	}

	let creationDate = new Date();

	return await KMTDocumentMetal.KMTDocumentMetalWrite(storageClient, Object.assign(inputData, {
		KMTDocumentID: uniqueID(),
		KMTDocumentCreationDate: creationDate,
		KMTDocumentModificationDate: creationDate,
	}));
};

export const KMTDocumentActionRead = async function(storageClient, inputData) {
	return await KMTDocumentMetal.KMTDocumentMetalRead(storageClient, inputData);
};

export const KMTDocumentActionUpdate = async function(storageClient, inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		return Promise.reject(new Error('KMTErrorInputNotValid'));
	}

	return await KMTDocumentMetal.KMTDocumentMetalWrite(storageClient, Object.assign(inputData, {
		KMTDocumentModificationDate: new Date(),
	}));
};

export const KMTDocumentActionDelete = async function(storageClient, inputData) {
	return await KMTDocumentMetal.KMTDocumentMetalDelete(storageClient, inputData);
};

export const KMTDocumentActionList = async function(storageClient) {
	return Object.values(await KMTDocumentMetal.KMTDocumentMetalList(storageClient));
};
