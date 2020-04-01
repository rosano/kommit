import * as KMTDocumentModel from './model.js';
import * as OLSKRemoteStorage from 'OLSKRemoteStorage';

const kType = 'kmt_document';
const kCollection = 'kmt_documents';

export const KMTDocumentStoragePath = function(inputData) {
	return `${ kCollection }/${ inputData || '' }`;
};

export const KMTDocumentStorage = function (privateClient, publicClient, changeDelegate) {
	return {
		EMTStorageCollection: kCollection,
		EMTStorageType: kType,
		EMTStorageModelErrors: Object.entries(KMTDocumentModel.KMTDocumentModelErrorsFor({}, {
			EMTOptionValidateIfNotPresent: true,
		})).map(function (e) {
			if (Object.keys(KMTDocumentModel.KMTDocumentModelErrorsFor({})).indexOf(e[0]) === -1) {
				e[1].push('__RSOptional');
			}

			return e;
		}).reduce(function (coll, item) {
			coll[item[0]] = item[1];

			return coll;
		}, {}),
		EMTStorageExports: {
			EMTStorageCache () {
				return privateClient.cache(KMTDocumentStoragePath());
			},
			EMTStorageList: function () {
				return privateClient.getAll(KMTDocumentStoragePath(), false);
			},
			EMTStorageWrite: async function (param1, param2) {
				await privateClient.storeObject(kType, `${ kCollection }/${ param1 }`, KMTDocumentModel.KMTDocumentModelPreJSONSchemaValidate(param2));
				return KMTDocumentModel.KMTDocumentModelPostJSONParse(param2);
			},
			EMTStorageRead: function (inputData) {
				return privateClient.getObject(`${ kCollection }/${ inputData }`);
			},
			EMTStorageDelete: function (inputData) {
				return privateClient.remove(`${ kCollection }/${ inputData }`);
			},
		},
	};
};
