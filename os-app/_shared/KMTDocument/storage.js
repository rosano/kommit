import * as KMTDocumentModel from './model.js';
import * as OLSKRemoteStorage from 'OLSKRemoteStorage';

const kType = 'kmt_document';
const kCollection = 'kmt_documents';

export const KMTDocumentStoragePath = function(inputData) {
	return `${ kCollection }/${ inputData || '' }`;
};

export const KMTDocumentStorage = function (privateClient, publicClient, changeDelegate) {
	return {
		KMTStorageCollection: kCollection,
		KMTStorageType: kType,
		KMTStorageModelErrors: Object.entries(KMTDocumentModel.KMTDocumentModelErrorsFor({}, {
			KMTOptionValidateIfNotPresent: true,
		})).map(function (e) {
			if (Object.keys(KMTDocumentModel.KMTDocumentModelErrorsFor({})).indexOf(e[0]) === -1) {
				e[1].push('__RSOptional');
			}

			return e;
		}).reduce(function (coll, item) {
			coll[item[0]] = item[1];

			return coll;
		}, {}),
		KMTStorageExports: {
			KMTStorageCache () {
				return privateClient.cache(KMTDocumentStoragePath());
			},
			KMTStorageList: function () {
				return privateClient.getAll(KMTDocumentStoragePath(), false);
			},
			KMTStorageWrite: async function (param1, param2) {
				await privateClient.storeObject(kType, `${ kCollection }/${ param1 }`, KMTDocumentModel.KMTDocumentModelPreJSONSchemaValidate(param2));
				return KMTDocumentModel.KMTDocumentModelPostJSONParse(param2);
			},
			KMTStorageRead: function (inputData) {
				return privateClient.getObject(`${ kCollection }/${ inputData }`);
			},
			KMTStorageDelete: function (inputData) {
				return privateClient.remove(`${ kCollection }/${ inputData }`);
			},
		},
	};
};
