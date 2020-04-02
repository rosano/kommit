const KOMStorageModule = require('./os-app/_shared/KOMStorageModule/main.js');
const KOMDeckStorage = require('./os-app/_shared/KOMDeck/storage.js');

(function KOMMochaStorage() {
	if (process.env.OLSK_TESTING_BEHAVIOUR === 'true') {
		return;
	}

	const uSerial = function (inputData) {
		return inputData.reduce(async function (coll, e) {
			return e.then(Array.prototype.concat.bind(await coll));
		}, Promise.resolve([]));
	};

	before(function(done) {
		global.KOMTestingStorageClient = require('./os-app/_shared/KOMStorageClient/main.js').KOMStorageClient({
			modules: [
				KOMStorageModule.KOMStorageModule([
					KOMDeckStorage.KOMDeckStorage,
				].map(function (e) {
					return {
						KOMCollectionStorageGenerator: e,
						KOMCollectionChangeDelegate: null,
					};
				}))
			],
		});

		done();
	});

	beforeEach(async function() {
		await uSerial([
			'kom_documents',
		].map(async function (e) {
			return await Promise.all(Object.keys(await global.KOMTestingStorageClient.kommit[e].KOMStorageList()).map(global.KOMTestingStorageClient.kommit[e].KOMStorageDelete));
		}));
	});
})();
