import * as KOMDeckModel from './model.js';

const kType = 'kom_deck';
const kCollection = 'kom_decks';

export const KOMDeckStorageFolderPath = function() {
	return `${ kCollection }/`;
};

export const KOMDeckStorageFilePath = function(inputData) {
	if (!inputData) {
		throw new Error('KOMErrorInputNotValid');
	}

	return `${ KOMDeckStorageFolderPath() }${ inputData }`;
};

export const KOMDeckStorage = function (privateClient, publicClient, changeDelegate) {
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
				return privateClient.getAll(KOMDeckStorageFolderPath(), false);
			},
			async KOMStorageWrite (param1, param2) {
				await privateClient.storeObject(kType, KOMDeckStorageFilePath(param1), KOMDeckModel.KOMDeckModelPreJSONSchemaValidate(param2));
				return KOMDeckModel.KOMDeckModelPostJSONParse(param2);
			},
			KOMStorageRead (inputData) {
				return privateClient.getObject(KOMDeckStorageFilePath(inputData));
			},
			KOMStorageDelete (inputData) {
				return privateClient.remove(KOMDeckStorageFilePath(inputData));
			},
		},
	};
};
