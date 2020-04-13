import KOMCardModel from './model.js';

const kType = 'kom_card';
const kCollection = 'kom_cards';

const mod = {

	KOMCardStorageFolderPath () {
		return `${ kCollection }/`;
	},

	KOMCardStorageFilePath (inputData) {
		if (!inputData) {
			throw new Error('KOMErrorInputNotValid');
		}

		return `${ mod.KOMCardStorageFolderPath() }${ inputData }`;
	},

	KOMCardStorageBuild (privateClient, publicClient, changeDelegate) {
		return {
			KOMStorageCollection: kCollection,
			KOMStorageType: kType,
			KOMStorageModelErrors: Object.entries(KOMCardModel.KOMCardModelErrorsFor({}, {
				KOMOptionValidateIfNotPresent: true,
			})).map(function (e) {
				if (Object.keys(KOMCardModel.KOMCardModelErrorsFor({})).indexOf(e[0]) === -1) {
					e[1].push('__RSOptional');
				}

				return e;
			}).reduce(function (coll, item) {
				coll[item[0]] = item[1];

				return coll;
			}, {}),
			KOMStorageExports: {
				KOMStorageList () {
					return privateClient.getAll(mod.KOMCardStorageFolderPath(), false);
				},
				_KOMStorageListAll () {
					return privateClient.getAll(mod.KOMCardStorageFolderPath(), false);
				},
				async KOMStorageWrite (inputData) {
					await privateClient.storeObject(kType, mod.KOMCardStorageFilePath(inputData.KOMCardID), KOMCardModel.KOMCardModelPreJSONSchemaValidate(inputData));
					return KOMCardModel.KOMCardModelPostJSONParse(inputData);
				},
				KOMStorageRead (inputData) {
					return privateClient.getObject(mod.KOMCardStorageFilePath(inputData));
				},
				KOMStorageDelete (inputData) {
					return privateClient.remove(mod.KOMCardStorageFilePath(inputData));
				},
			},
		};
	},

};

export default mod;
