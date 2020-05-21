import KOMDeckStorage from '../KOMDeck/storage.js';
import KOMDeckModel from '../KOMDeck/model.js';
import KOMCardModel from './model.js';
import * as OLSKRemoteStorage from 'OLSKRemoteStorage';

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

	KOMCardStorageMatch (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('KOMErrorInputNotValid');
		}

		if (KOMDeckStorage.KOMDeckStorageMatch(inputData)) {
			return false;
		}

		return inputData === mod.KOMCardStorageObjectPath({
			KOMCardID: inputData.split('/')[4],
			KOMCardDeckID: inputData.split('/')[1],
			KOMCardQuestion: '',
			KOMCardAnswer: '',
			KOMCardCreationDate: new Date(inputData.split('/')[3]),
			KOMCardModificationDate: new Date(),
		}, mod.uFakeDeck(inputData));
	},

	KOMCardStorageBuild (privateClient, publicClient, changeDelegate) {
		const uList = async function (inputData) {
			return uFlatten(await Promise.all(uFlatten([inputData]).map(async function (path) {
				return await Object.keys(await privateClient.getAll(path, false)).map(function (e) {
					return path + e;
				});
			})));
		};

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

		const KOMStorageExports = {

			async KOMStorageList (inputData) {
				let storagePath = mod.KOMCardStorageCollectionPath(inputData);

				return (await Promise.all((await uList(await uList(await uList(storagePath)))).filter(function (e) {
					return e.slice(-4) === 'main'; // #hotfix include main only
				}).map(function (e) {
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
			
			async KOMStorageDelete (param1, param2) {
				await Promise.all((await uList(mod.KOMCardStorageFolderPath(param1, param2))).map(async function (e) {
					if (e === mod.KOMCardStorageObjectPath(param1, param2)) {
						return;
					}
					
					return await privateClient.remove(e);
				}));
				
				return privateClient.remove(mod.KOMCardStorageObjectPath(param1, param2));
			},
			
			async _KOMStorageReset () {
				return (await KOMStorageExports.__KOMStorageResetFakeDecks()).map(async function (deck) {
					return Object.values(await KOMStorageExports.KOMStorageList(deck)).map(KOMCardModel.KOMCardModelPostJSONParse).map(function (e) {
						return KOMStorageExports.KOMStorageDelete(e, deck);
					});
				});
			},
			async __KOMStorageResetFakeDecks () {
				// fake objects because there may not be a deck_id/main file
				return Object.keys(await privateClient.getAll(KOMDeckStorage.KOMDeckStorageCollectionPath(), false)).map(function (e) {
					return mod.uFakeDeck(KOMDeckStorage.KOMDeckStorageCollectionPath() + e);
				});
			},
			
		};

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
			KOMStorageExports,
		};
	},

};

export default mod;
