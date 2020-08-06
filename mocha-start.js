const RemoteStorage = require('remotestoragejs');

global.Blob = require('cross-blob');
global.FileReader = require('filereader');

const KOM_Data = require('./os-app/_shared/KOM_Data/main.js').default;
const KOMDeckStorage = require('./os-app/_shared/KOMDeck/storage.js').default;
const KOMCardStorage = require('./os-app/_shared/KOMCard/storage.js').default;
const KOMSpacingStorage = require('./os-app/_shared/KOMSpacing/storage.js').default;
const KOMSettingStorage = require('./os-app/_shared/KOMSetting/storage.js').default;

(function KOMMochaStorage() {
	if (process.env.OLSK_TESTING_BEHAVIOUR === 'true') {
		return;
	}

	const storageModule = KOM_Data.KOM_DataModule([
		KOMDeckStorage.KOMDeckStorageBuild,
		KOMCardStorage.KOMCardStorageBuild,
		KOMSpacingStorage.KOMSpacingStorageBuild,
		KOMSettingStorage.KOMSettingStorageBuild,
	], {
		OLSKOptionIncludeDebug: true,
	});

	before(function () {
		global.KOMTestingStorageClient = new RemoteStorage({
			modules: [storageModule]
		});

		global.KOMTestingStorageClient.access.claim(storageModule.name, 'rw');
	});

	beforeEach(function () {
		return global.KOMTestingStorageClient[storageModule.name].__DEBUG.__OLSKRemoteStorageReset();
	});
})();

(function KVCMochaStubs() {
	Object.entries({

		StubDeckObjectValid() {
			return {
				KOMDeckID: 'alfa',
				KOMDeckName: 'bravo',
				KOMDeckCreationDate: new Date('2019-02-23T13:56:36Z'),
				KOMDeckModificationDate: new Date('2019-02-23T13:56:36Z'),
			};
		},

		StubCardObjectValid() {
			return {
				KOMCardID: 'charlie',
				KOMCardDeckID: 'alfa',
				KOMCardFrontText: 'delta',
				KOMCardRearText: 'echo',
				KOMCardCreationDate: new Date('2019-04-13T10:52:36Z'),
				KOMCardModificationDate: new Date('2019-04-13T10:52:36Z'),
			};
		},

		StubSpacingObjectValid() {
			return {
				KOMSpacingID: 'bravo-forward',
				KOMSpacingChronicles: [],
			};
		},

		StubSpacingObjectHistorical(inputData) {
			return Object.assign(StubSpacingObjectValid(), {
				KOMSpacingChronicles: [StubChronicleObjectValid(inputData || new Date(Date.now() - 1000 * 60 * 60 * 24 * 3))],
				KOMSpacingDueDate: new Date(),
			});
		},

		StubChronicleObjectValid(inputData = new Date()) {
			return {
				KOMChronicleDrawDate: new Date(inputData.valueOf() - 10000),
				KOMChronicleFlipDate: new Date(inputData.valueOf() - 10000),
				KOMChronicleResponseDate: inputData,
				KOMChronicleResponseType: 'RESPONSE_EASY',
				KOMChronicleDueDate: new Date(inputData.valueOf() + 1000 * 60 * 60 * 24),
			};
		},

		StubSettingObjectValid() {
			return {
				KOMSettingKey: 'alfa',
				KOMSettingValue: 'bravo',
			};
		},

		StubReviewChartElementDateBarTableRowDataObjectValid() {
			return {
				KOMReviewChartElementDateBarTableRowDataKey: 'alfa',
				KOMReviewChartElementDateBarTableRowDataValues: [1, 2, 3],
			};
		},

	}).map(function (e) {
		return global[e.shift()] = e.pop();
	});
})();
