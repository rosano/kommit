import * as KOMDocumentMetal from './metal.js';
import { factory, detectPrng } from 'ulid';
const uniqueID = typeof require === 'undefined' && navigator.appName === 'Zombie' ? factory(detectPrng(true)) : factory();

export const KOMDocumentActionCreate = async function(storageClient, inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		return Promise.reject(new Error('KOMErrorInputNotValid'));
	}

	let creationDate = new Date();

	return await KOMDocumentMetal.KOMDocumentMetalWrite(storageClient, Object.assign(inputData, {
		KOMDocumentID: uniqueID(),
		KOMDocumentCreationDate: creationDate,
		KOMDocumentModificationDate: creationDate,
	}));
};

export const KOMDocumentActionRead = async function(storageClient, inputData) {
	return await KOMDocumentMetal.KOMDocumentMetalRead(storageClient, inputData);
};

export const KOMDocumentActionUpdate = async function(storageClient, inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		return Promise.reject(new Error('KOMErrorInputNotValid'));
	}

	return await KOMDocumentMetal.KOMDocumentMetalWrite(storageClient, Object.assign(inputData, {
		KOMDocumentModificationDate: new Date(),
	}));
};

export const KOMDocumentActionDelete = async function(storageClient, inputData) {
	return await KOMDocumentMetal.KOMDocumentMetalDelete(storageClient, inputData);
};

export const KOMDocumentActionList = async function(storageClient) {
	return Object.values(await KOMDocumentMetal.KOMDocumentMetalList(storageClient));
};
