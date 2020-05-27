import KOMDeckModel from './model.js';
import * as OLSKRemoteStorage from 'OLSKRemoteStorage';

const kType = 'kom_deck';
const kCollection = 'kom_decks';

const mod = {

	KOMDeckStorageCollectionPath () {
		return kCollection + '/';
	},

	KOMDeckStorageFolderPath (inputData) {
		if (!inputData) {
			throw new Error('KOMErrorInputNotValid');
		}

		return mod.KOMDeckStorageCollectionPath() + inputData + '/';
	},

	KOMDeckStorageObjectPath (inputData) {
		if (!inputData) {
			throw new Error('KOMErrorInputNotValid');
		}

		return mod.KOMDeckStorageFolderPath(inputData) + 'main';
	},

	KOMDeckStorageMatch (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('KOMErrorInputNotValid');
		}

		return inputData === mod.KOMDeckStorageObjectPath(inputData.split('/')[1]);
	},

	KOMDeckStorageBuild (privateClient, publicClient, changeDelegate) {
		privateClient.on('change', function (event) {
			if (!changeDelegate) {
				return;
			}
			
			if (!mod.KOMDeckStorageMatch(event.relativePath)) {
				return;
			}

			const delegateMethod = OLSKRemoteStorage.OLSKRemoteStorageChangeDelegateProperty(event);

			if (!delegateMethod) {
				return;
			}

			if (typeof changeDelegate[delegateMethod] !== 'function') {
				return console.warn(`${ delegateMethod } not function`);
			}

			changeDelegate[delegateMethod](KOMDeckModel.KOMDeckModelPostJSONParse(event[OLSKRemoteStorage.OLSKRemoteStorageChangeDelegateInput(delegateMethod)]));
		});

		const OLSKRemoteStorageCollectionExports = {

			async KOMStorageList () {
				return (await Promise.all(Object.keys(await privateClient.getAll(mod.KOMDeckStorageCollectionPath(), false)).map(function (e) {
					return privateClient.getObject(mod.KOMDeckStorageObjectPath(e.slice(0, -1)), false);
				}))).reduce(function (coll, item) {
					if (item) {
						coll[item.KOMDeckID] = item;
					}

					return coll;
				}, {});
			},

			async KOMStorageWrite (inputData) {
				await privateClient.storeObject(kType, mod.KOMDeckStorageObjectPath(inputData.KOMDeckID), KOMDeckModel.KOMDeckModelPreJSONSchemaValidate(inputData));
				return KOMDeckModel.KOMDeckModelPostJSONParse(inputData);
			},
			
			KOMStorageDelete (inputData) {
				return privateClient.remove(mod.KOMDeckStorageObjectPath(inputData.KOMDeckID));
			},
			
		};

		return {
			OLSKRemoteStorageCollectionName: kCollection,
			OLSKRemoteStorageCollectionType: kType,
			OLSKRemoteStorageCollectionModelErrors: Object.entries(KOMDeckModel.KOMDeckModelErrorsFor({}, {
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
			OLSKRemoteStorageCollectionExports,
		};
	},

};

export default mod;
