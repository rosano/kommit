import KOMDeckModel from '../KOMDeck/model.js';
import KOMCardModel from './model.js';

const kType = 'kom_card';
const kCollection = 'kom_cards';

const uFlatten = function (inputData) {
	return [].concat.apply([], inputData);
};

const mod = {

	KOMCardStorageCollectionPath (inputData) {
		if (KOMDeckModel.KOMDeckModelErrorsFor(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		return `kom_decks/${ inputData.KOMDeckID }/${ kCollection }/`;
	},

	KOMCardStorageFolderPath (param1, param2) {
		if (KOMCardModel.KOMCardModelErrorsFor(param1)) {
			throw new Error('KOMErrorInputNotValid');
		}

		return `${ mod.KOMCardStorageCollectionPath(param2) }${ param1.KOMCardCreationDate.toJSON().split('T').shift() }/${ param1.KOMCardID }/`;
	},

	KOMCardStorageObjectPath (param1, param2) {
		return mod.KOMCardStorageFolderPath(param1, param2) + 'main';
	},

	KOMCardStorageBuild (privateClient, publicClient, changeDelegate) {
		const uList = async function (inputData) {
			return uFlatten(await Promise.all(uFlatten([inputData]).map(async function (path) {
				return await Object.keys(await privateClient.getAll(path, false)).map(function (e) {
					return path + e;
				});
			})));
		};

		const KOMStorageExports = {

			async KOMStorageList (inputData) {
				let storagePath = mod.KOMCardStorageCollectionPath(inputData);

				return (await Promise.all((await uList(await uList(await uList(storagePath)))).map(function (e) {
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
						return
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
				return Object.keys(await privateClient.getAll('kom_decks/', false)).map(function (e) {
					return {
						KOMDeckID: e.slice(0, -1),
						KOMDeckName: '',
						KOMDeckCreationDate: new Date(),
						KOMDeckModificationDate: new Date(),
					};
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
