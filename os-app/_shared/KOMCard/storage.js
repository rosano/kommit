import KOMDeckStorage from '../KOMDeck/storage.js';
import KOMCardModel from './model.js';
import * as OLSKRemoteStoragePackage from 'OLSKRemoteStorage';
const OLSKRemoteStorage = OLSKRemoteStoragePackage.default || OLSKRemoteStoragePackage;

const uFlatten = function (inputData) {
	return [].concat.apply([], inputData);
};

const mod = {

	uFakeDeck(inputData) {
		return {
			KOMDeckID: inputData.split('/')[1],
			KOMDeckName: '',
			KOMDeckCreationDate: new Date(),
			KOMDeckModificationDate: new Date(),
		};
	},

	uFakeCard(inputData) {
		return {
			KOMCardID: inputData.split('/')[4],
			KOMCardDeckID: inputData.split('/')[1],
			KOMCardFrontText: '',
			KOMCardRearText: '',
			KOMCardCreationDate: new Date(inputData.split('/')[3]),
			KOMCardModificationDate: new Date(),
		};
	},

	KOMCardStorageCollectionName() {
		return 'kom_cards';
	},

	KOMCardStorageCollectionType() {
		return 'kom_card';
	},

	KOMCardStorageCollectionPath(inputData) {
		return KOMDeckStorage.KOMDeckStorageFolderPath(inputData) + mod.KOMCardStorageCollectionName() + '/';
	},

	KOMCardStorageFolderPath(inputData) {
		if (KOMCardModel.KOMCardModelErrorsFor(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		return mod.KOMCardStorageCollectionPath(inputData.KOMCardDeckID) + inputData.KOMCardCreationDate.toJSON().split('T').shift() + '/' + inputData.KOMCardID + '/';
	},

	KOMCardStorageObjectPath(inputData) {
		return mod.KOMCardStorageFolderPath(inputData) + 'main';
	},

	KOMCardStorageAudioPathFront(inputData) {
		return mod.KOMCardStorageFolderPath(inputData) + 'side-front/audio';
	},

	KOMCardStorageAudioPathRear(inputData) {
		return mod.KOMCardStorageFolderPath(inputData) + 'side-rear/audio';
	},

	KOMCardStorageMatch(inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('KOMErrorInputNotValid');
		}
		
		if (inputData.split('/').length < 4) {
			return false;
		}

		return inputData === mod.KOMCardStorageObjectPath(mod.uFakeCard(inputData), mod.uFakeDeck(inputData));
	},

	KOMCardStorageBuild(privateClient, publicClient, changeDelegate) {
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

			async _KOMCardStorageWrite(inputData) {
				if (typeof inputData !== 'object' || inputData === null) {
					return Promise.reject(new Error('KOMErrorInputNotValid'));
				}

				let errors = KOMCardModel.KOMCardModelErrorsFor(inputData);
				if (errors) {
					return Promise.resolve({
						KOMErrors: errors,
					});
				}

				try {
					return OLSKRemoteStorage.OLSKRemoteStorageWriteObject(privateClient, mod.KOMCardStorageObjectPath(inputData), inputData);
				} catch (e) {
					return Promise.reject(e);
				}
			},

			async _KOMCardStorageList(inputData) {
				return Object.entries(await OLSKRemoteStorage.OLSKRemoteStorageObjectsRecursive(privateClient, mod.KOMCardStorageCollectionPath(inputData.KOMDeckID))).reduce(function (coll, item) {
					if (mod.KOMCardStorageMatch(item[0])) {
						coll[item[1].KOMCardID] = OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(item[1]);
					}

					return coll;
				}, {});
				return (await Promise.all((await OLSKRemoteStorage.OLSKRemoteStorageListingRecursive(privateClient, mod.KOMCardStorageCollectionPath(inputData.KOMDeckID))).filter(mod.KOMCardStorageMatch).map(function (e) {
					return privateClient.getObject(e, false);
				}))).reduce(function (coll, item) {
					if (item) {
						coll[item.KOMCardID] = OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(item);
					}

					return coll;
				}, {});
			},

			async _KOMCardStorageDelete(inputData) {
				if (KOMCardModel.KOMCardModelErrorsFor(inputData)) {
					return Promise.reject(new Error('KOMErrorInputNotValid'));
				}

				return (await Promise.all((await OLSKRemoteStorage.OLSKRemoteStorageListingRecursive(privateClient, mod.KOMCardStorageFolderPath(inputData))).map(function (path) {
					return privateClient.remove(path);
				}))).pop();
			},

			async _KOMCardStorageFileWrite(param1, param2) {
				if (!(param1 instanceof Blob)) {
					return Promise.reject(new Error('KOMErrorInputNotValid'));
				}

				if (typeof param2 !== 'string') {
					return Promise.reject(new Error('KOMErrorInputNotValid'));
				}

				await privateClient.storeFile(param1.type, param2, typeof global !== 'undefined' && global.KOMTestingStorageClient ? param1 : await new Promise(function (res, rej) {
					const reader = new FileReader();

					reader.onload = function () {
						res(reader.result);
					};

					reader.readAsArrayBuffer(param1);
				}));

				return param1;
			},

			async _KOMCardStorageFileRead(inputData) {
				if (typeof inputData !== 'string') {
					return Promise.reject(new Error('KOMErrorInputNotValid'));
				}

				const file = await privateClient.getFile(inputData);

				if (!file.data) {
					return null;
				}

				return new Blob([file.data], {
					type: file.contentType
				});
			},

			_KOMCardStorageFileDelete(inputData) {
				if (typeof inputData !== 'string') {
					return Promise.reject(new Error('KOMErrorInputNotValid'));
				}

				return privateClient.remove(inputData);
			},

		};

		return {
			OLSKRemoteStorageCollectionName: mod.KOMCardStorageCollectionName(),
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

	KOMCardStorageWrite(storageClient, inputData) {
		return storageClient.kommit[mod.KOMCardStorageCollectionName()]._KOMCardStorageWrite(inputData);
	},

	KOMCardStorageList(storageClient, inputData) {
		return storageClient.kommit[mod.KOMCardStorageCollectionName()]._KOMCardStorageList(inputData);
	},

	KOMCardStorageDelete(storageClient, inputData) {
		return storageClient.kommit[mod.KOMCardStorageCollectionName()]._KOMCardStorageDelete(inputData);
	},

	KOMCardStorageFileWrite(storageClient, param1, param2) {
		return storageClient.kommit[mod.KOMCardStorageCollectionName()]._KOMCardStorageFileWrite(param1, param2);
	},

	KOMCardStorageFileRead(storageClient, inputData) {
		return storageClient.kommit[mod.KOMCardStorageCollectionName()]._KOMCardStorageFileRead(inputData);
	},

	KOMCardStorageFileDelete(storageClient, inputData) {
		return storageClient.kommit[mod.KOMCardStorageCollectionName()]._KOMCardStorageFileDelete(inputData);
	},

};

export default mod;
