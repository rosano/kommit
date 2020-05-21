import KOMCardStorage from '../KOMCard/storage.js';
import KOMCardModel from '../KOMCard/model.js';
import KOMSpacingModel from './model.js';

const kType = 'kom_spacing';
const kCollection = 'kom_spacings';

const uFlatten = function (inputData) {
	return [].concat.apply([], inputData);
};

const mod = {

	KOMSpacingStoragePathForward (param1, param2) {
		return KOMCardStorage.KOMCardStorageObjectPath(param1, param2).replace('main', 'spacing-forward');
	},

	KOMSpacingStoragePathBackward (param1, param2) {
		return KOMCardStorage.KOMCardStorageObjectPath(param1, param2).replace('main', 'spacing-backward');
	},

	KOMSpacingStorageMatch (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('KOMErrorInputNotValid');
		}

		if (KOMCardStorage.KOMCardStorageMatch(inputData)) {
			return false;
		}

		return [
			mod.KOMSpacingStoragePathForward(KOMCardStorage.uFakeCard(inputData), KOMCardStorage.uFakeDeck(inputData)),
			mod.KOMSpacingStoragePathBackward(KOMCardStorage.uFakeCard(inputData), KOMCardStorage.uFakeDeck(inputData)),
			].includes(inputData);
	},

	KOMSpacingStorageBuild (privateClient, publicClient, changeDelegate) {
		const uList = async function (inputData) {
			return uFlatten(await Promise.all(uFlatten([inputData]).map(async function (path) {
				return await Object.keys(await privateClient.getAll(path, false)).map(function (e) {
					return path + e;
				});
			})));
		};

		const KOMStorageExports = {

			async KOMStorageList (param1, param2) {
				const result = await privateClient.getAll(KOMCardStorage.KOMCardStorageFolderPath(param1, param2));
				return {
					KOMCardSpacingForward: result['spacing-forward'] || {
						KOMSpacingID: `${ param1.KOMCardID }-forward`,
						KOMSpacingChronicles: [],
					},
					KOMCardSpacingBackward: result['spacing-backward'] || {
						KOMSpacingID: `${ param1.KOMCardID }-backward`,
						KOMSpacingChronicles: [],
					},
				};
			},
			
			async KOMStorageWrite (param1, param2, param3) {
				await privateClient.storeObject(kType, (KOMSpacingModel.KOMSpacingModelIsBackward(param1) ? mod.KOMSpacingStoragePathBackward : mod.KOMSpacingStoragePathForward)(param2, param3), KOMSpacingModel.KOMSpacingModelPreJSONSchemaValidate(param1));
				return KOMSpacingModel.KOMSpacingModelPostJSONParse(param1);
			},
			
			KOMStorageDelete (param1, param2, param3) {
				return privateClient.remove((KOMSpacingModel.KOMSpacingModelIsBackward(param1) ? mod.KOMSpacingStoragePathBackward : mod.KOMSpacingStoragePathForward)(param2, param3));
			},
			
			async _KOMStorageReset () {
				return (await KOMStorageExports.__KOMStorageResetFakeDecks()).map(async function (deck) {
					return (await KOMStorageExports.__KOMStorageResetFakeCards(deck)).map(async function (card) {
						return [
							mod.KOMSpacingStoragePathForward(card, deck),
							mod.KOMSpacingStoragePathBackward(card, deck),
						].map(async function (e) {
							return await privateClient.getObject(e) && await privateClient.remove(e);
						});
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
			async __KOMStorageResetFakeCards (inputData) {
				// fake objects because there may not be a deck_id/main file
				return (await uList(await uList(KOMCardStorage.KOMCardStorageCollectionPath(inputData)))).map(function (e) {
					return {
						KOMCardID: e.slice(0, -1).split('/').pop(),
						KOMCardQuestion: '',
						KOMCardAnswer: '',
						KOMCardCreationDate: new Date(e.slice(0, -1).split('/').slice(-2).shift() + 'T12:00:00Z'),
						KOMCardModificationDate: new Date(),
					};
				});
			},
			
		};

		return {
			KOMStorageCollection: kCollection,
			KOMStorageType: kType,
			KOMStorageModelErrors: Object.entries(KOMSpacingModel.KOMSpacingModelErrorsFor({}, {
				KOMOptionValidateIfNotPresent: true,
			})).map(function (e) {
				if (Object.keys(KOMSpacingModel.KOMSpacingModelErrorsFor({})).indexOf(e[0]) === -1) {
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
