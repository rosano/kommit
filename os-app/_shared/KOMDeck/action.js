import * as KOMDeckMetal from './metal.js';
import { factory, detectPrng } from 'ulid';
const uniqueID = typeof require === 'undefined' && navigator.appName === 'Zombie' ? factory(detectPrng(true)) : factory();

export const KOMDeckActionCreate = async function(storageClient, inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		return Promise.reject(new Error('KOMErrorInputNotValid'));
	}

	let creationDate = new Date();

	return await KOMDeckMetal.KOMDeckMetalWrite(storageClient, Object.assign(inputData, {
		KOMDeckID: uniqueID(),
		KOMDeckCreationDate: creationDate,
		KOMDeckModificationDate: creationDate,
	}));
};

export const KOMDeckActionRead = async function(storageClient, inputData) {
	return await KOMDeckMetal.KOMDeckMetalRead(storageClient, inputData);
};

export const KOMDeckActionUpdate = async function(storageClient, inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		return Promise.reject(new Error('KOMErrorInputNotValid'));
	}

	return await KOMDeckMetal.KOMDeckMetalWrite(storageClient, Object.assign(inputData, {
		KOMDeckModificationDate: new Date(),
	}));
};

export const KOMDeckActionDelete = async function(storageClient, inputData) {
	return await KOMDeckMetal.KOMDeckMetalDelete(storageClient, inputData);
};

export const KOMDeckActionList = async function(storageClient) {
	return Object.values(await KOMDeckMetal.KOMDeckMetalList(storageClient));
};
