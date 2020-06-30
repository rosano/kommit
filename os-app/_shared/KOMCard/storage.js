import KOMDeckStorage from '../KOMDeck/storage.js';
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
			KOMCardFrontText: '',
			KOMCardRearText: '',
			KOMCardCreationDate: new Date(inputData.split('/')[3]),
			KOMCardModificationDate: new Date(),
		};
	},

	KOMCardStorageCollectionPath (inputData) {
		return KOMDeckStorage.KOMDeckStorageFolderPath(inputData) + kCollection + '/';
	},

	KOMCardStorageFolderPath (inputData) {
		if (KOMCardModel.KOMCardModelErrorsFor(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		return mod.KOMCardStorageCollectionPath(inputData.KOMCardDeckID) + inputData.KOMCardCreationDate.toJSON().split('T').shift() + '/' + inputData.KOMCardID + '/';
	},

	KOMCardStorageObjectPath (inputData) {
		return mod.KOMCardStorageFolderPath(inputData) + 'main';
	},

	KOMCardStorageAudioPathFront (inputData) {
		return mod.KOMCardStorageFolderPath(inputData) + 'side-front/audio';
	},

	KOMCardStorageAudioPathRear (inputData) {
		return mod.KOMCardStorageFolderPath(inputData) + 'side-rear/audio';
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

			changeDelegate[delegateMethod](OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(OLSKRemoteStorage.OLSKRemoteStorageChangeDelegateData(delegateMethod, event)));
		});

		const OLSKRemoteStorageCollectionExports = {

			async KOMStorageList (inputData) {
				let storagePath = mod.KOMCardStorageCollectionPath(inputData.KOMDeckID);

				return (await Promise.all((await OLSKRemoteStorage.OLSKRemoteStorageListObjectsRecursive(privateClient, storagePath)).filter(mod.KOMCardStorageMatch).map(function (e) {
					return privateClient.getObject(e, false);
				}))).reduce(function (coll, item) {
					if (item) {
						coll[item.KOMCardID] = item;
					}

					return coll;
				}, {});
			},
			
			async KOMStorageWrite (param1) {
				await privateClient.storeObject(kType, mod.KOMCardStorageObjectPath(param1), OLSKRemoteStorage.OLSKRemoteStoragePreJSONSchemaValidate(param1));
				return OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(param1);
			},
			
			async KOMStorageFileWrite (param1, param2) {
				await privateClient.storeFile(param1.type, param2, typeof global !== 'undefined' && global.KOMTestingStorageClient ? param1 : await new Promise(function (res, rej) {
					const reader = new FileReader();

					reader.onload = function() {
					  res(reader.result);
					};

					reader.readAsArrayBuffer(param1);
				}));
				return param1;
			},
			
			async KOMStorageFileRead (inputData) {
				const file = await privateClient.getFile(inputData);
				
				if (!file.data) {
					return null;
				}

				return new Blob([file.data], { type: file.contentType });
			},
			
			KOMStorageFileDelete (inputData) {
				return privateClient.remove(inputData);
			},
			
			async KOMStorageDelete (inputData) {
				return (await Promise.all((await OLSKRemoteStorage.OLSKRemoteStorageListObjectsRecursive(privateClient, mod.KOMCardStorageFolderPath(inputData))).map(function (path) {
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
				if (!Object.keys(KOMCardModel.KOMCardModelErrorsFor({})).includes(e[0])) {
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
