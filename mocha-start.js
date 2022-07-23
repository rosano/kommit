global.Blob = function () {};
global.FileReader = require('filereader');

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
					require('./os-app/_shared/KOMCard/main.js').default,
					require('./os-app/_shared/KOMSpacing/main.js').default,
					require('./os-app/_shared/KOMSetting/main.js').default,
					require('./os-app/_shared/KOMTransport/main.js').default,
				],
			}],
			_ZDRParamDispatchJSONPreStringify: require('OLSKObject').OLSKObjectSafeCopy,
		});
	});

	beforeEach(function() {
		return ZDRTestingWrap.App.ZDRStorageDeleteFolderRecursive('');
	});
})();

(function KOMMochaStubs() {
	const KOMSpacing = require('./os-app/_shared/KOMSpacing/main.js').default;

	Object.entries({

		StubDeckObject(inputData) {
			return Object.assign({
				KOMDeckName: Math.random().toString(),
			}, inputData);
		},

		StubDeckObjectValid(inputData) {
			return Object.assign({
				KOMDeckID: Math.random().toString(),
				KOMDeckName: Math.random().toString(),
				KOMDeckCreationDate: new Date(),
				KOMDeckModificationDate: new Date(),
			}, inputData);
		},

		StubCardObject(inputData) {
			return Object.assign({
				KOMCardFrontText: Math.random().toString(),
				KOMCardRearText: Math.random().toString(),
			}, inputData);
		},

		StubCardObjectValid(inputData) {
			return Object.assign({
				KOMCardID: Math.random().toString(),
				KOMCardDeckID: Math.random().toString(),
				KOMCardFrontText: Math.random().toString(),
				KOMCardRearText: Math.random().toString(),
				KOMCardCreationDate: new Date(),
				KOMCardModificationDate: new Date(),
			}, inputData);
		},

		StubSpacingObjectValid(inputData, direction, cardID) {
			return Object.assign({
				KOMSpacingID: (cardID || Math.random().toString()) + '-' + (direction || uRandomElement(KOMSpacing.KOMSpacingLabelBackward())),
				KOMSpacingChronicles: [],
			}, inputData);
		},

		StubSpacingObjectHistorical(inputData) {
			return StubSpacingObjectValid({
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

		StubChronicleObjectPrepared() {
			return {
				KOMChronicleDrawDate: new Date('2019-02-23T12:00:00Z'),
				KOMChronicleFlipDate: new Date('2019-02-23T12:00:00Z'),
				KOMChronicleResponseDate: new Date('2019-02-23T12:00:00Z'),
				KOMChronicleResponseType: 'RESPONSE_EASY',
			};
		},

		StubChronicleObjectValid2() {
			return Object.assign(StubChronicleObjectPrepared(), {
				KOMChronicleDueDate: new Date('2019-02-23T12:00:00Z'),
			});
		},

		StubSettingObjectValid(inputData = {}) {
			return Object.assign({
				KOMSettingKey: Math.random().toString(),
				KOMSettingValue: Math.random().toString(),
			}, inputData);
		},

		StubStateObjectValid(inputData = {}) {
			return Object.assign({
				KOMPlayStateQueue: [],
				KOMPlayStateWait: [],
				KOMPlayStateHistory: [],
			}, inputData);
		},

		StubReviewChartElementDateBarTableRowDataObjectValid (inputData) {
			return Object.assign({
				KOMReviewChartElementDateBarTableRowDataKey: 'alfa',
				KOMReviewChartElementDateBarTableRowDataValues: [1, 2, 3],
			}, inputData);
		},

	}).map(function (e) {
		return global[e.shift()] = e.pop();
	});
})();
