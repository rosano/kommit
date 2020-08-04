import KOMSettingStorage from './storage.js';

const mod = {

	async _KOMSettingsActionSet (storageClient, param1, param2) {
		if (typeof param1 !== 'string') {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		if (typeof param2 === 'undefined') {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		return await KOMSettingStorage.KOMSettingStorageWrite(storageClient, {
			KOMSettingKey: param1,
			KOMSettingValue: param2,
		});
	},

	async _KOMSettingsActionGet (storageClient, inputData) {
		if (typeof inputData !== 'string') {
			return Promise.reject(new Error('KOMErrorInputNotValid'));
		}

		return await KOMSettingStorage.KOMSettingStorageRead(storageClient, inputData);
	},

	async KOMSettingsActionProperty (storageClient, param1, param2) {
		if (typeof param2 === 'undefined') {
			return await mod._KOMSettingsActionGet(storageClient, param1);
		}

		return await mod._KOMSettingsActionSet(storageClient, param1, param2);
	},

	async KOMSettingsActionDelete (storageClient, inputData) {
		return await KOMSettingStorage.KOMSettingStorageDelete(storageClient, inputData);
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
