import KOMSettingModel from './model.js';

import * as OLSKRemoteStoragePackage from 'OLSKRemoteStorage';
const OLSKRemoteStorage = OLSKRemoteStoragePackage.default || OLSKRemoteStoragePackage;

const mod = {

	uFakeSetting(inputData) {
		return {
			KOMSettingKey: inputData.split('/')[1],
			KOMSettingValue: '',
		};
	},

	KOMSettingStorageCollectionName () {
		return 'kom_settings';
	},

	KOMSettingStorageCollectionPath () {
		return mod.KOMSettingStorageCollectionName() + '/';
	},

	KOMSettingStorageObjectPath (inputData) {
		if (KOMSettingModel.KOMSettingModelErrorsFor(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		return mod.KOMSettingStorageCollectionPath() + inputData.KOMSettingKey;
	},

	KOMSettingStorageMatch(inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('KOMErrorInputNotValid');
		}

		return inputData === mod.KOMSettingStorageObjectPath(mod.uFakeSetting(inputData));
	},

	KOMSettingStorageBuild (privateClient, publicClient, changeDelegate) {
		const OLSKRemoteStorageCollectionExports = {

			async _KOMSettingStorageWrite (inputData) {
				if (typeof inputData !== 'object' || inputData === null) {
					return Promise.reject(new Error('KOMErrorInputNotValid'));
				}

				let errors = KOMSettingModel.KOMSettingModelErrorsFor(inputData);
				if (errors) {
					return Promise.resolve({
						KOMErrors: errors,
					});
				}

				try {
					return OLSKRemoteStorage.OLSKRemoteStorageWriteObject(privateClient, mod.KOMSettingStorageObjectPath(inputData), inputData)
				} catch (e) {
					return Promise.reject(e);
				}
			},

			_KOMSettingStorageRead (inputData) {
				if (typeof inputData !== 'string') {
					throw new Error('KOMErrorInputNotValid');
				}

				return privateClient.getObject(mod.KOMSettingStorageObjectPath({
					KOMSettingKey: inputData,
					KOMSettingValue: '',
				}), false);
			},

			_KOMSettingStorageList () {
				return privateClient.getAll(mod.KOMSettingStorageCollectionPath(), false);
			},

			_KOMSettingStorageDelete (inputData) {
				if (typeof inputData !== 'string') {
					throw new Error('KOMErrorInputNotValid');
				}

				return privateClient.remove(mod.KOMSettingStorageObjectPath({
					KOMSettingKey: inputData,
					KOMSettingValue: '',
				}));
			},
			
		};

		return {
			OLSKRemoteStorageCollectionName: mod.KOMSettingStorageCollectionName(),
			OLSKRemoteStorageCollectionExports,
		};
	},

	KOMSettingStorageWrite (storageClient, inputData) {
		return storageClient.kommit[mod.KOMSettingStorageCollectionName()]._KOMSettingStorageWrite(inputData);
	},

	KOMSettingStorageRead (storageClient, inputData) {
		return storageClient.kommit[mod.KOMSettingStorageCollectionName()]._KOMSettingStorageRead(inputData);
	},

	KOMSettingStorageList (storageClient) {
		return storageClient.kommit[mod.KOMSettingStorageCollectionName()]._KOMSettingStorageList();
	},

	KOMSettingStorageDelete (storageClient, inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('KOMErrorInputNotValid');
		}

		return storageClient.kommit[mod.KOMSettingStorageCollectionName()]._KOMSettingStorageDelete(inputData);
	},

};

export default mod;
