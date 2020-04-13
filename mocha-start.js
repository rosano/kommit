const RemoteStorage = require('remotestoragejs');

const KOM_Data = require('./os-app/_shared/KOM_Data/main.js').default;
const KOMDeckStorage = require('./os-app/_shared/KOMDeck/storage.js').default;
const KOMCardStorage = require('./os-app/_shared/KOMCard/storage.js').default;

(function KOMMochaStorage() {
	if (process.env.OLSK_TESTING_BEHAVIOUR === 'true') {
		return;
	}

	const uSerial = function (inputData) {
		return inputData.reduce(async function (coll, e) {
			return e.then(Array.prototype.concat.bind(await coll));
		}, Promise.resolve([]));
	};

	const storageModule = KOM_Data.KOM_DataModule([
		KOMDeckStorage.KOMDeckStorageBuild,
		KOMCardStorage.KOMCardStorageBuild,
	]);

	before(function() {
		global.KOMTestingStorageClient = new RemoteStorage({ modules: [ storageModule ] });

		global.KOMTestingStorageClient.access.claim(storageModule.name, 'rw');
	});

	beforeEach(async function() {
		await uSerial(Object.keys(global.KOMTestingStorageClient[storageModule.name]).map(async function (e) {
			return await Promise.all(Object.keys(await global.KOMTestingStorageClient[storageModule.name][e].KOMStorageList()).map(global.KOMTestingStorageClient[storageModule.name][e].KOMStorageDelete));
		}));
	});
})();
