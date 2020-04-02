import * as KOMDeckModel from './model.js';
import * as OLSKRemoteStorage from 'OLSKRemoteStorage';

const kType = 'kom_deck';
const kCollection = 'kom_decks';

export const KOMDeckStoragePath = function(inputData) {
	return `${ kCollection }/${ inputData || '' }`;
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
			KOMStorageCache () {
				return privateClient.cache(KOMDeckStoragePath());
			},
			KOMStorageList: function () {
				return privateClient.getAll(KOMDeckStoragePath(), false);
			},
			KOMStorageWrite: async function (param1, param2) {
				await privateClient.storeObject(kType, `${ kCollection }/${ param1 }`, KOMDeckModel.KOMDeckModelPreJSONSchemaValidate(param2));
				return KOMDeckModel.KOMDeckModelPostJSONParse(param2);
			},
			KOMStorageRead: function (inputData) {
				return privateClient.getObject(`${ kCollection }/${ inputData }`);
			},
			KOMStorageDelete: function (inputData) {
				return privateClient.remove(`${ kCollection }/${ inputData }`);
			},
		},
	};
};
