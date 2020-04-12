import * as KOMDeckModel from './model.js';

const kType = 'kom_deck';
const kCollection = 'kom_decks';

const mod = {

	KOMDeckStorageFolderPath () {
		return `${ kCollection }/`;
	},

	KOMDeckStorageFilePath (inputData) {
		if (!inputData) {
			throw new Error('KOMErrorInputNotValid');
		}

		return `${ mod.KOMDeckStorageFolderPath() }${ inputData }`;
	},

	KOMDeckStorage (privateClient, publicClient, changeDelegate) {
		return {
			KOMStorageCollection: kCollection,
			KOMStorageType: kType,
			KOMStorageModelErrors: Object.entries(KOMDeckModel.KOMDeckModelErrorsFor({}, {
				KOMOptionValidateIfNotPresent: true,
			})).map(function (e) {
				if (Object.keys(KOMDeckModel.KOMDeckModelErrorsFor({})).indexOf(e[0]) === -1) {
					e[1].push('__RSOptional');
				}

				return e;
			}).reduce(function (coll, item) {
				coll[item[0]] = item[1];

				return coll;
			}, {}),
			KOMStorageExports: {
				KOMStorageList () {
					return privateClient.getAll(mod.KOMDeckStorageFolderPath(), false);
				},
				async KOMStorageWrite (param1, param2) {
					await privateClient.storeObject(kType, mod.KOMDeckStorageFilePath(param1), KOMDeckModel.KOMDeckModelPreJSONSchemaValidate(param2));
					return KOMDeckModel.KOMDeckModelPostJSONParse(param2);
				},
				KOMStorageRead (inputData) {
					return privateClient.getObject(mod.KOMDeckStorageFilePath(inputData));
				},
				KOMStorageDelete (inputData) {
					return privateClient.remove(mod.KOMDeckStorageFilePath(inputData));
				},
			},
		};
	},

};

export default mod;
