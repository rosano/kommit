const RemoteStorage = require('remotestoragejs');

global.Blob = require('cross-blob');
global.FileReader = require('filereader');

const KOM_Data = require('./os-app/_shared/KOM_Data/main.js').default;
const KOMDeckStorage = require('./os-app/_shared/KOMDeck/storage.js').default;
const KOMCardStorage = require('./os-app/_shared/KOMCard/storage.js').default;
const KOMSpacingStorage = require('./os-app/_shared/KOMSpacing/storage.js').default;
const KOMSettingStorage = require('./os-app/_shared/KOMSetting/storage.js').default;

(function KOMMochaStorage() {
	if (process.env.OLSK_SPEC_MOCHA_INTERFACE === 'true') {
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

(function KOMMochaWrap() {
	if (process.env.OLSK_SPEC_MOCHA_INTERFACE === 'true') {
		return;
	}

	before(async function() {
		global.ZDRTestingWrap = await require('zerodatawrap').ZDRWrap({
			ZDRParamLibrary: require('remotestoragejs'),
			ZDRParamScopes: [{
				ZDRScopeKey: 'App',
				ZDRScopeDirectory: 'kommit',
				ZDRScopeSchemas: [
					require('./os-app/_shared/KOMDeck/main.js').default,
					require('./os-app/_shared/KOMDeckObject/main.js').default,
					require('./os-app/_shared/KOMCard/main.js').default,
					require('./os-app/_shared/KOMSpacing/main.js').default,
					require('./os-app/_shared/KOMSetting/main.js').default,
				],
			}],
			_ZDRParamDispatchPreObjectWrite: require('OLSKObject').default.OLSKObjectSafeCopy,
		});
	});

	beforeEach(async function() {
		return Promise.all((await ZDRTestingWrap.App.ZDRStoragePathsRecursive('/')).map(ZDRTestingWrap.App.ZDRStorageDelete));
	});
})();

(function KVCMochaStubs() {
	Object.entries({

		StubDeckObject(inputData) {
			return Object.assign({
				KOMDeckName: Math.random().toString(),
			}, inputData);
		},

		StubDeckObjectValid(inputData) {
			return Object.assign({
				KOMDeckID: 'alfa',
				KOMDeckName: 'bravo',
				KOMDeckCreationDate: new Date('2019-02-23T13:56:36Z'),
				KOMDeckModificationDate: new Date('2019-02-23T13:56:36Z'),
			}, inputData);
		},

		StubCardObject(inputData) {
			return Object.assign({
				KOMCardDeckID: Math.random().toString(),
				KOMCardFrontText: Math.random().toString(),
				KOMCardRearText: Math.random().toString(),
			}, inputData);
		},

		StubCardObjectValid(inputData) {
			return Object.assign({
				KOMCardID: 'charlie',
				KOMCardDeckID: 'alfa',
				KOMCardFrontText: 'delta',
				KOMCardRearText: 'echo',
				KOMCardCreationDate: new Date('2019-04-13T10:52:36Z'),
				KOMCardModificationDate: new Date('2019-04-13T10:52:36Z'),
			}, inputData);
		},

		StubSpacingObjectValid(inputData) {
			return Object.assign({
				KOMSpacingID: 'bravo-forward',
				KOMSpacingChronicles: [],
			}, inputData);
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

		StubSettingObjectValid(inputData = {}) {
			return Object.assign({
				KOMSettingKey: 'alfa',
				KOMSettingValue: 'bravo',
			}, inputData);
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
