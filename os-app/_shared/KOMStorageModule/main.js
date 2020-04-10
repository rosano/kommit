import * as OLSKRemoteStorage from 'OLSKRemoteStorage';

const kModuleName = 'kommit';

export const KOMStorageModule = function (inputData) {
	return {
		name: kModuleName,
		builder (privateClient, publicClient) {
			privateClient.cache(`${ kModuleName }/`);

			return {
				exports: inputData.reduce(function (coll, item) {
					let storage = item(privateClient, publicClient, item.KOMCollectionChangeDelegate);

					privateClient.declareType(storage.KOMStorageType, OLSKRemoteStorage.OLSKRemoteStorageJSONSchema(storage.KOMStorageModelErrors));

					coll[storage.KOMStorageCollection] = storage.KOMStorageExports;

					return coll;
				}, {}),
			};
		},
	};
};
