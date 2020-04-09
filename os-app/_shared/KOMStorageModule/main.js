import * as OLSKRemoteStorage from 'OLSKRemoteStorage';

export const KOMStorageModule = function (inputData) {
	return {
		name: 'kommit',
		builder (privateClient, publicClient) {
			return {
				exports: inputData.reduce(function (coll, item) {
					let storage = item.KOMCollectionStorageGenerator(privateClient, publicClient, item.KOMCollectionChangeDelegate);

					privateClient.declareType(storage.KOMStorageType, OLSKRemoteStorage.OLSKRemoteStorageJSONSchema(storage.KOMStorageModelErrors));

					coll[storage.KOMStorageCollection] = storage.KOMStorageExports;

					return coll;
				}, {}),
			};
		},
	};
};
