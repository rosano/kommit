import KOMDeckModel from '../KOMDeck/model.js';
import KOMCardModel from './model.js';

const kType = 'kom_card';
const kCollection = 'kom_cards';

const mod = {

	KOMCardStorageFolderPath (inputData) {
		if (KOMDeckModel.KOMDeckModelErrorsFor(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		return `kom_decks/${ inputData.KOMDeckID }/${ kCollection }/`;
	},

	KOMCardStorageObjectPath (param1, param2) {
		if (KOMCardModel.KOMCardModelErrorsFor(param1)) {
			throw new Error('KOMErrorInputNotValid');
		}

		return mod._KOMCardStorageObjectPath(param1.KOMCardID, param2);
	},
	_KOMCardStorageObjectPath (param1, param2) {
		return `${ mod.KOMCardStorageFolderPath(param2) }${ param1 }/main`;
	},

	KOMCardStorageBuild (privateClient, publicClient, changeDelegate) {
		const KOMStorageExports = {

			async KOMStorageList (inputData) {
				return (await Promise.all(Object.keys(await privateClient.getAll(mod.KOMCardStorageFolderPath(inputData), false)).map(async function (e) {
					return privateClient.getObject(mod._KOMCardStorageObjectPath(e.slice(0, -1), inputData), false);
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
			
			KOMStorageDelete (param1, param2) {
				return privateClient.remove(mod._KOMCardStorageObjectPath(param1, param2));
			},
			
			async _KOMStorageReset () {
				return (await KOMStorageExports.__KOMStorageResetFakeDecks()).map(async function (deck) {
					return Object.keys(await KOMStorageExports.KOMStorageList(deck)).map(function (e) {
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
