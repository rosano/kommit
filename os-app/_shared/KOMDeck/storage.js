import KOMDeckModel from './model.js';
import * as OLSKRemoteStoragePackage from 'OLSKRemoteStorage';
const OLSKRemoteStorage = OLSKRemoteStoragePackage.default || OLSKRemoteStoragePackage;

const mod = {

	KOMDeckStorageCollectionName() {
		return 'kom_decks';
	},

	KOMDeckStorageCollectionType() {
		return 'kom_deck';
	},

	KOMDeckStorageCollectionPath() {
		return mod.KOMDeckStorageCollectionName() + '/';
	},

	KOMDeckStorageFolderPath(inputData) {
		if (!inputData) {
			throw new Error('KOMErrorInputNotValid');
		}

		return mod.KOMDeckStorageCollectionPath() + inputData + '/';
	},

	KOMDeckStorageObjectPath(inputData) {
		if (!inputData) {
			throw new Error('KOMErrorInputNotValid');
		}

		return mod.KOMDeckStorageFolderPath(inputData) + 'main';
	},

	KOMDeckStorageMatch(inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('KOMErrorInputNotValid');
		}

		return inputData === mod.KOMDeckStorageObjectPath(inputData.split('/')[1]);
	},

	KOMDeckStorageBuild(privateClient, publicClient, changeDelegate) {
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

			changeDelegate[delegateMethod](OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(event[OLSKRemoteStorage.OLSKRemoteStorageChangeDelegateInput(delegateMethod)]));
		});

		const OLSKRemoteStorageCollectionExports = {

			async _KOMDeckStorageWrite(inputData) {
				if (typeof inputData !== 'object' || inputData === null) {
					return Promise.reject(new Error('KOMErrorInputNotValid'));
				}

				let errors = KOMDeckModel.KOMDeckModelErrorsFor(inputData);
				if (errors) {
					return Promise.resolve({
						KOMErrors: errors,
					});
				}

				try {
					return OLSKRemoteStorage.OLSKRemoteStorageWriteObject(privateClient, mod.KOMDeckStorageObjectPath(inputData.KOMDeckID), inputData);
				} catch (e) {
					return Promise.reject(e);
				}
			},

			async _KOMDeckStorageList() {
				return (await Promise.all(Object.keys(await privateClient.getAll(mod.KOMDeckStorageCollectionPath(), false)).map(function (e) {
					return privateClient.getObject(mod.KOMDeckStorageObjectPath(e.slice(0, -1)), false);
				}))).reduce(function (coll, item) {
					if (item) {
						coll[item.KOMDeckID] = OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(item);
					}

					return coll;
				}, {});
			},

			_KOMDeckStorageDelete(inputData) {
				if (KOMDeckModel.KOMDeckModelErrorsFor(inputData)) {
					throw new Error('KOMErrorInputNotValid');
				}

				return privateClient.remove(mod.KOMDeckStorageObjectPath(inputData.KOMDeckID));
			},

			_KOMDeckStorageObjectsRecursive(inputData) {
				return OLSKRemoteStorage.OLSKRemoteStorageObjectsRecursive(privateClient, mod.KOMDeckStorageFolderPath(inputData.KOMDeckID));
			},

		};

		return {
			OLSKRemoteStorageCollectionName: mod.KOMDeckStorageCollectionName(),
			OLSKRemoteStorageCollectionType: mod.KOMDeckStorageCollectionType(),
			OLSKRemoteStorageCollectionModelErrors: Object.entries(KOMDeckModel.KOMDeckModelErrorsFor({}, {
				KOMOptionValidateIfNotPresent: true,
			})).map(function (e) {
				if (!Object.keys(KOMDeckModel.KOMDeckModelErrorsFor({})).includes(e[0])) {
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

	KOMDeckStorageWrite(storageClient, inputData) {
		return storageClient.kommit[mod.KOMDeckStorageCollectionName()]._KOMDeckStorageWrite(inputData);
	},

	KOMDeckStorageList(storageClient) {
		return storageClient.kommit[mod.KOMDeckStorageCollectionName()]._KOMDeckStorageList();
	},

	KOMDeckStorageDelete(storageClient, inputData) {
		return storageClient.kommit[mod.KOMDeckStorageCollectionName()]._KOMDeckStorageDelete(inputData);
	},

	KOMDeckStorageObjectsRecursive(storageClient, inputData) {
		return storageClient.kommit[mod.KOMDeckStorageCollectionName()]._KOMDeckStorageObjectsRecursive(inputData);
	},

};

export default mod;
