import * as KOMDocumentModel from './model.js';
import * as OLSKRemoteStorage from 'OLSKRemoteStorage';

const kType = 'kom_document';
const kCollection = 'kom_documents';

export const KOMDocumentStoragePath = function(inputData) {
	return `${ kCollection }/${ inputData || '' }`;
};

export const KOMDocumentStorage = function (privateClient, publicClient, changeDelegate) {
	return {
		KOMStorageCollection: kCollection,
		KOMStorageType: kType,
		KOMStorageModelErrors: Object.entries(KOMDocumentModel.KOMDocumentModelErrorsFor({}, {
			KOMOptionValidateIfNotPresent: true,
		})).map(function (e) {
			if (Object.keys(KOMDocumentModel.KOMDocumentModelErrorsFor({})).indexOf(e[0]) === -1) {
				e[1].push('__RSOptional');
			}

			return e;
		}).reduce(function (coll, item) {
			coll[item[0]] = item[1];

			return coll;
		}, {}),
		KOMStorageExports: {
			KOMStorageCache () {
				return privateClient.cache(KOMDocumentStoragePath());
			},
			KOMStorageList: function () {
				return privateClient.getAll(KOMDocumentStoragePath(), false);
			},
			KOMStorageWrite: async function (param1, param2) {
				await privateClient.storeObject(kType, `${ kCollection }/${ param1 }`, KOMDocumentModel.KOMDocumentModelPreJSONSchemaValidate(param2));
				return KOMDocumentModel.KOMDocumentModelPostJSONParse(param2);
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
