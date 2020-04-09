import * as KOMCardModel from './model.js';

const kType = 'kom_card';
const kCollection = 'kom_cards';

export const KOMCardStorageFolderPath = function() {
	return `${ kCollection }/`;
};

export const KOMCardStorageFilePath = function(inputData) {
	if (!inputData) {
		throw new Error('KOMErrorInputNotValid');
	}

	return `${ KOMCardStorageFolderPath() }${ inputData }`;
};

export const KOMCardStorage = function (privateClient, publicClient, changeDelegate) {
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
				return privateClient.getAll(KOMCardStorageFolderPath(), false);
			},
			async KOMStorageWrite (param1, param2) {
				await privateClient.storeObject(kType, KOMCardStorageFilePath(param1), KOMCardModel.KOMCardModelPreJSONSchemaValidate(param2));
				return KOMCardModel.KOMCardModelPostJSONParse(param2);
			},
			KOMStorageRead (inputData) {
				return privateClient.getObject(KOMCardStorageFilePath(inputData));
			},
			KOMStorageDelete (inputData) {
				return privateClient.remove(KOMCardStorageFilePath(inputData));
			},
		},
	};
};
