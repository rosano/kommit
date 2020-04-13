import KOMDeckModel from './model.js';

const kType = 'kom_deck';
const kCollection = 'kom_decks';

const mod = {

	KOMDeckStorageFolderPath () {
		return `${ kCollection }/`;
	},

	KOMDeckStorageObjectPath (inputData) {
		if (!inputData) {
			throw new Error('KOMErrorInputNotValid');
		}

		return `${ mod.KOMDeckStorageFolderPath() }${ inputData }/main`;
	},

	KOMDeckStorageBuild (privateClient, publicClient, changeDelegate) {
		return {
			KOMStorageCollection: kCollection,
			KOMStorageType: kType,
			KOMStorageModelErrors: Object.entries(KOMDeckModel.KOMDeckModelErrorsFor({}, {
				KOMOptionValidateIfNotPresent: true,
			})).map(function (e) {
				if (Object.keys(KOMDeckModel.KOMDeckModelErrorsFor({})).indexOf(e[0]) === -1) {
					e[1].push('__RSOptional');
				}

				return e;
			}).reduce(function (coll, item) {
				coll[item[0]] = item[1];

				return coll;
			}, {}),
			KOMStorageExports: {
				async KOMStorageList () {
					return (await Promise.all(Object.keys(await privateClient.getAll(mod.KOMDeckStorageFolderPath(), false)).map(function (e) {
						return privateClient.getObject(mod.KOMDeckStorageObjectPath(e.slice(0, -1)), false);
					}))).reduce(function (coll, item) {
						coll[item.KOMDeckID] = item;

						return coll;
					}, {});
				},
				async _KOMStorageListAll () {
					return (await Promise.all(Object.keys(await privateClient.getAll(mod.KOMDeckStorageFolderPath(), false)).map(function (e) {
						return privateClient.getObject(mod.KOMDeckStorageObjectPath(e.slice(0, -1)), false);
					}))).reduce(function (coll, item) {
						coll[item.KOMDeckID] = item;

						return coll;
					}, {});
				},
				async KOMStorageWrite (inputData) {
					await privateClient.storeObject(kType, mod.KOMDeckStorageObjectPath(inputData.KOMDeckID), KOMDeckModel.KOMDeckModelPreJSONSchemaValidate(inputData));
					return KOMDeckModel.KOMDeckModelPostJSONParse(inputData);
				},
				KOMStorageRead (inputData) {
					return privateClient.getObject(mod.KOMDeckStorageObjectPath(inputData));
				},
				KOMStorageDelete (inputData) {
					return privateClient.remove(mod.KOMDeckStorageObjectPath(inputData));
				},
			},
		};
	},

};

export default mod;
