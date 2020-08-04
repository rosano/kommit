import KOMSettingModel from './model.js';

const mod = {

	KOMSettingStorageCollectionName () {
		return 'kom_settings';
	},

	KOMSettingStorageCollectionType () {
		return 'kom_setting';
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

				await privateClient.storeObject(mod.KOMSettingStorageCollectionType(), mod.KOMSettingStorageObjectPath(inputData), inputData);

				return inputData;
			},

			_KOMSettingStorageRead (inputData) {
				if (typeof inputData !== 'string') {
					throw new Error('KOMErrorInputNotValid');
				}

				return privateClient.getObject(mod.KOMSettingStorageObjectPath({
					KOMSettingKey: inputData,
					KOMSettingValue: '',
				}));
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
			OLSKRemoteStorageCollectionType: mod.KOMSettingStorageCollectionType(),
			OLSKRemoteStorageCollectionModelErrors: Object.entries(KOMSettingModel.KOMSettingModelErrorsFor({}, {
				KOMOptionValidateIfNotPresent: true,
			})).map(function (e) {
				if (!Object.keys(KOMSettingModel.KOMSettingModelErrorsFor({})).includes(e[0])) {
					e[1].push('__RSOptional');
				}

				return e;
			}).reduce(function (coll, item) {
				coll[item[0]] = item[1];

				return coll;
			}, {}),
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
		return storageClient.kommit[mod.KOMSettingStorageCollectionName()]._KOMSettingStorageDelete(inputData);
	},

};

export default mod;
