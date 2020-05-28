import KOMDeckStorage from '../KOMDeck/storage.js';
import KOMDeckModel from '../KOMDeck/model.js';
import KOMCardModel from './model.js';
import * as OLSKRemoteStoragePackage from 'OLSKRemoteStorage';
const OLSKRemoteStorage = OLSKRemoteStoragePackage.default || OLSKRemoteStoragePackage;

const kType = 'kom_card';
const kCollection = 'kom_cards';

const uFlatten = function (inputData) {
	return [].concat.apply([], inputData);
};

const mod = {

	uFakeDeck (inputData) {
		return {
			KOMDeckID: inputData.split('/')[1],
			KOMDeckName: '',
			KOMDeckCreationDate: new Date(),
			KOMDeckModificationDate: new Date(),
		};
	},

	uFakeCard (inputData) {
		return {
			KOMCardID: inputData.split('/')[4],
			KOMCardDeckID: inputData.split('/')[1],
			KOMCardFront: '',
			KOMCardRear: '',
			KOMCardCreationDate: new Date(inputData.split('/')[3]),
			KOMCardModificationDate: new Date(),
		};
	},

	KOMCardStorageCollectionPath (inputData) {
		if (KOMDeckModel.KOMDeckModelErrorsFor(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		return KOMDeckStorage.KOMDeckStorageFolderPath(inputData.KOMDeckID) + kCollection + '/';
	},

	KOMCardStorageFolderPath (param1, param2) {
		if (KOMCardModel.KOMCardModelErrorsFor(param1)) {
			throw new Error('KOMErrorInputNotValid');
		}

		return mod.KOMCardStorageCollectionPath(param2) + param1.KOMCardCreationDate.toJSON().split('T').shift() + '/' + param1.KOMCardID + '/';
	},

	KOMCardStorageObjectPath (param1, param2) {
		return mod.KOMCardStorageFolderPath(param1, param2) + 'main';
	},

	KOMCardStorageAudioPathFront (param1, param2) {
		return mod.KOMCardStorageFolderPath(param1, param2) + 'front/audio';
	},

	KOMCardStorageMatch (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('KOMErrorInputNotValid');
		}

		if (KOMDeckStorage.KOMDeckStorageMatch(inputData)) {
			return false;
		}

		return inputData === mod.KOMCardStorageObjectPath(mod.uFakeCard(inputData), mod.uFakeDeck(inputData));
	},

	KOMCardStorageBuild (privateClient, publicClient, changeDelegate) {
		privateClient.on('change', function (event) {
			if (!changeDelegate) {
				return;
			}
			
			if (!mod.KOMCardStorageMatch(event.relativePath)) {
				return;
			}

			const delegateMethod = OLSKRemoteStorage.OLSKRemoteStorageChangeDelegateProperty(event);

			if (!delegateMethod) {
				return;
			}

			if (typeof changeDelegate[delegateMethod] !== 'function') {
				return console.warn(`${ delegateMethod } not function`);
			}

			changeDelegate[delegateMethod](KOMCardModel.KOMCardModelPostJSONParse(event[OLSKRemoteStorage.OLSKRemoteStorageChangeDelegateInput(delegateMethod)]));
		});

		const OLSKRemoteStorageCollectionExports = {

			async KOMStorageList (inputData) {
				let storagePath = mod.KOMCardStorageCollectionPath(inputData);

				return (await Promise.all((await OLSKRemoteStorage.OLSKRemoteStorageListObjectsRecursive(privateClient, storagePath)).filter(mod.KOMCardStorageMatch).map(function (e) {
					return privateClient.getObject(e, false);
				}))).reduce(function (coll, item) {
					if (item) {
						coll[item.KOMCardID] = item;
					}

					return coll;
				}, {});
			},
			
			async KOMStorageWrite (param1, param2) {
				await privateClient.storeObject(kType, mod.KOMCardStorageObjectPath(param1, param2), KOMCardModel.KOMCardModelPreJSONSchemaValidate(param1));
				return KOMCardModel.KOMCardModelPostJSONParse(param1);
			},
			
			async KOMStorageFileWrite (param1, param2) {
				await privateClient.storeFile(param1.type, param2, param1);
				return param1;
			},
			
			async KOMStorageFileRead (inputData) {
				const file = await privateClient.getFile(inputData);
				
				if (!file.data) {
					return null;
				}

				return new Blob([file.data], { type: file.mimeType });;
			},
			
			KOMStorageFileDelete (inputData) {
				return privateClient.remove(inputData);
			},
			
			async KOMStorageDelete (param1, param2) {
				return (await Promise.all((await OLSKRemoteStorage.OLSKRemoteStorageListObjectsRecursive(privateClient, mod.KOMCardStorageFolderPath(param1, param2))).map(function (path) {
					return privateClient.remove(path);
				}))).pop();
			},
			
		};

		return {
			OLSKRemoteStorageCollectionName: kCollection,
			OLSKRemoteStorageCollectionType: kType,
			OLSKRemoteStorageCollectionModelErrors: Object.entries(KOMCardModel.KOMCardModelErrorsFor({}, {
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
			OLSKRemoteStorageCollectionExports,
		};
	},

};

export default mod;
