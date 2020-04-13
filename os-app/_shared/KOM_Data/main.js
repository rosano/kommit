import * as OLSKRemoteStorage from 'OLSKRemoteStorage';

const kModuleName = 'kommit';

const mod = {

	KOM_DataModule (inputData) {
		return {
			name: kModuleName,
			builder (privateClient, publicClient) {
				privateClient.cache(`${ kModuleName }/`);

				return {
					exports: inputData.reduce(function (coll, item) {
						let storage = item(privateClient, publicClient, item.KOM_DataChangeDelegate);

						privateClient.declareType(storage.KOMStorageType, OLSKRemoteStorage.OLSKRemoteStorageJSONSchema(storage.KOMStorageModelErrors));

						coll[storage.KOMStorageCollection] = storage.KOMStorageExports;

						return coll;
					}, {}),
				};
			},
		};
	},

};

export default mod;