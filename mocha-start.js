const KMTStorageModule = require('./os-app/_shared/KMTStorageModule/main.js');
const KMTDocumentStorage = require('./os-app/_shared/KMTDocument/storage.js');

(function KMTMochaStorage() {
	if (process.env.OLSK_TESTING_BEHAVIOUR === 'true') {
		return;
	}

	const uSerial = function (inputData) {
		return inputData.reduce(async function (coll, e) {
			return e.then(Array.prototype.concat.bind(await coll));
		}, Promise.resolve([]));
	};

	before(function(done) {
		global.KMTTestingStorageClient = require('./os-app/_shared/KMTStorageClient/main.js').KMTStorageClient({
			modules: [
				KMTStorageModule.KMTStorageModule([
					KMTDocumentStorage.KMTDocumentStorage,
				].map(function (e) {
					return {
						KMTCollectionStorageGenerator: e,
						KMTCollectionChangeDelegate: null,
					};
				}))
			],
		});

		done();
	});

	beforeEach(async function() {
		await uSerial([
			'kmt_documents',
		].map(async function (e) {
			return await Promise.all(Object.keys(await global.KMTTestingStorageClient.kommit[e].KMTStorageList()).map(global.KMTTestingStorageClient.kommit[e].KMTStorageDelete));
		}));
	});
})();
