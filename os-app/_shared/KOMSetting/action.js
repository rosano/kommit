import KOMSettingStorage from './storage.js';

const mod = {

	_KOMSettingsActionSet (storageClient, param1, param2) {
		if (typeof param1 !== 'string') {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		if (typeof param2 === 'undefined') {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		return KOMSettingStorage.KOMSettingStorageWrite(storageClient, {
			KOMSettingKey: param1,
			KOMSettingValue: param2,
		});
	},

	_KOMSettingsActionGet (storageClient, inputData) {
		if (typeof inputData !== 'string') {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		return KOMSettingStorage.KOMSettingStorageRead(storageClient, inputData);
	},

	KOMSettingsActionProperty (storageClient, param1, param2) {
		if (typeof param2 === 'undefined') {
			return mod._KOMSettingsActionGet(storageClient, param1);
		}

		return mod._KOMSettingsActionSet(storageClient, param1, param2);
	},

	KOMSettingsActionDelete (storageClient, inputData) {
		return KOMSettingStorage.KOMSettingStorageDelete(storageClient, inputData);
	},

	async KOMSettingsActionQuery (storageClient, inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		return Promise.resolve(Object.values(await KOMSettingStorage.KOMSettingStorageList(storageClient)).filter(function(e) {
			if (!Object.keys(inputData).length) {
				return true;
			}

			if (Object.keys(inputData).filter(function (key) {
				return e[key].match(inputData[key]);
			}).length) {
				return true;
			}

			return false;
		}));
	},
	
};
	
export default mod;
