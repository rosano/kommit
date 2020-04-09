import * as KOMCardMetal from './metal.js';
import { factory, detectPrng } from 'ulid';
const uniqueID = typeof require === 'undefined' && navigator.appName === 'Zombie' ? factory(detectPrng(true)) : factory();

export const KOMCardActionCreate = async function(storageClient, inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		return Promise.reject(new Error('KOMErrorInputNotValid'));
	}

	let creationDate = new Date();

	return await KOMCardMetal.KOMCardMetalWrite(storageClient, Object.assign(inputData, {
		KOMCardID: uniqueID(),
		KOMCardCreationDate: creationDate,
		KOMCardModificationDate: creationDate,
	}));
};

export const KOMCardActionRead = async function(storageClient, inputData) {
	return await KOMCardMetal.KOMCardMetalRead(storageClient, inputData);
};

export const KOMCardActionUpdate = async function(storageClient, inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		return Promise.reject(new Error('KOMErrorInputNotValid'));
	}

	return await KOMCardMetal.KOMCardMetalWrite(storageClient, Object.assign(inputData, {
		KOMCardModificationDate: new Date(),
	}));
};

export const KOMCardActionDelete = async function(storageClient, inputData) {
	return await KOMCardMetal.KOMCardMetalDelete(storageClient, inputData);
};

export const KOMCardActionList = async function(storageClient) {
	return Object.values(await KOMCardMetal.KOMCardMetalList(storageClient));
};
