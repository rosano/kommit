import KOMCardStorage from '../KOMCard/storage.js';
import KOMCardModel from '../KOMCard/model.js';
import KOMSpacingModel from './model.js';
import * as OLSKRemoteStoragePackage from 'OLSKRemoteStorage';
const OLSKRemoteStorage = OLSKRemoteStoragePackage.default || OLSKRemoteStoragePackage;
import KOMDeckStorage from '../KOMDeck/storage.js';

const kType = 'kom_spacing';
const kCollection = 'kom_spacings';

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

		if (KOMDeckStorage.KOMDeckStorageMatch(inputData)) {
			return false;
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
		privateClient.on('change', function (event) {
			if (!changeDelegate) {
				return;
			}

			if (!mod.KOMSpacingStorageMatch(event.relativePath)) {
				return;
			}

			const delegateMethod = OLSKRemoteStorage.OLSKRemoteStorageChangeDelegateProperty(event);

			if (!delegateMethod) {
				return;
			}

			if (typeof changeDelegate[delegateMethod] !== 'function') {
				return console.warn(`${ delegateMethod } not function`);
			}

			changeDelegate[delegateMethod](KOMSpacingModel.KOMSpacingModelPostJSONParse(event[OLSKRemoteStorage.OLSKRemoteStorageChangeDelegateInput(delegateMethod)]));
		});

		const OLSKRemoteStorageCollectionExports = {

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
				await privateClient.storeObject(kType, (KOMSpacingModel.KOMSpacingModelIsBackward(param1) ? mod.KOMSpacingStoragePathBackward : mod.KOMSpacingStoragePathForward)(param2, param3), OLSKRemoteStorage.OLSKRemoteStoragePreJSONSchemaValidate(param1));
				return OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(param1);
			},
			
			KOMStorageDelete (param1, param2, param3) {
				return privateClient.remove((KOMSpacingModel.KOMSpacingModelIsBackward(param1) ? mod.KOMSpacingStoragePathBackward : mod.KOMSpacingStoragePathForward)(param2, param3));
			},
			
		};

		return {
			OLSKRemoteStorageCollectionName: kCollection,
			OLSKRemoteStorageCollectionType: kType,
			OLSKRemoteStorageCollectionModelErrors: Object.entries(KOMSpacingModel.KOMSpacingModelErrorsFor({}, {
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
			OLSKRemoteStorageCollectionExports,
		};
	},

};

export default mod;
