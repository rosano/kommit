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

	KOMCardStorageFilePath (param1, param2) {
		if (KOMCardModel.KOMCardModelErrorsFor(param1)) {
			throw new Error('KOMErrorInputNotValid');
		}

		return `${ mod.KOMCardStorageFolderPath(param2) }${ param1.KOMCardID }/main`;
	},

	KOMCardStorageBuild (privateClient, publicClient, changeDelegate) {
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
			KOMStorageExports: {
				KOMStorageList () {
					return privateClient.getAll(mod.KOMCardStorageFolderPath(), false);
				},
				async _KOMStorageListAll () {
					return (await Promise.all(Object.keys(await privateClient.getAll('kom_decks/', false)).map(function (e) {
						return privateClient.getObject(`kom_decks/${ e }main`, false);
					}))).map(async function (e) {
						let deck = KOMDeckModel.KOMDeckModelPostJSONParse(e);
						return (await Promise.all(Object.keys(await privateClient.getAll(mod.KOMCardStorageFolderPath(deck), false)).map(function (e) {
							return privateClient.getObject(mod.KOMCardStorageFilePath(e), false);
						})));
					});
				},
				async KOMStorageWrite (param1, param2) {
					await privateClient.storeObject(kType, mod.KOMCardStorageFilePath(param2, param1), KOMCardModel.KOMCardModelPreJSONSchemaValidate(param1));
					return KOMCardModel.KOMCardModelPostJSONParse(param1);
				},
				KOMStorageRead (inputData) {
					return privateClient.getObject(mod.KOMCardStorageFilePath(inputData));
				},
				KOMStorageDelete (inputData) {
					return privateClient.remove(mod.KOMCardStorageFilePath(inputData));
				},
			},
		};
	},

};

export default mod;
