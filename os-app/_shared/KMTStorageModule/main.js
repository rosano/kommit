import * as OLSKRemoteStorage from 'OLSKRemoteStorage';

export const KMTStorageModule = function (inputData) {
	return {
		name: 'kommit',
		builder: function(privateClient, publicClient) {
			return {
				exports: inputData.reduce(function (coll, item) {
					let storage = item.KMTCollectionStorageGenerator(privateClient, publicClient, item.KMTCollectionChangeDelegate);

					privateClient.declareType(storage.KMTStorageType, OLSKRemoteStorage.OLSKRemoteStorageJSONSchema(storage.KMTStorageModelErrors));

					coll[storage.KMTStorageCollection] = storage.KMTStorageExports;

					return coll;
				}, {}),
			};
		},
	};
};
