const RemoteStorage = require('remotestoragejs');

global.Blob = require('cross-blob');
global.FileReader = require('filereader');

const KOM_Data = require('./os-app/_shared/KOM_Data/main.js').default;
const KOMDeckStorage = require('./os-app/_shared/KOMDeck/storage.js').default;
const KOMCardStorage = require('./os-app/_shared/KOMCard/storage.js').default;
const KOMSpacingStorage = require('./os-app/_shared/KOMSpacing/storage.js').default;

(function KOMMochaStorage() {
	if (process.env.OLSK_TESTING_BEHAVIOUR === 'true') {
		return;
	}

	const storageModule = KOM_Data.KOM_DataModule([
		KOMDeckStorage.KOMDeckStorageBuild,
		KOMCardStorage.KOMCardStorageBuild,
		KOMSpacingStorage.KOMSpacingStorageBuild,
	], {
		OLSKOptionIncludeDebug: true,
	});

	before(function() {
		global.KOMTestingStorageClient = new RemoteStorage({ modules: [ storageModule ] });

		global.KOMTestingStorageClient.access.claim(storageModule.name, 'rw');
	});

	beforeEach(async function() {
		return await global.KOMTestingStorageClient[storageModule.name].__DEBUG._OLSKRemoteStorageReset();
	});
})();
