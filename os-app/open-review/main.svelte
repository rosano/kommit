<script>
import { OLSKLocalized } from 'OLSKInternational';
import OLSKString from 'OLSKString';
const OLSKFormatted = OLSKString.OLSKStringFormatted;
import { OLSK_SPEC_UI } from 'OLSKSpec';
import OLSKRemoteStorage from 'OLSKRemoteStorage';
import OLSKObject from 'OLSKObject';
import OLSKServiceWorker from 'OLSKServiceWorker';
import RemoteStorage from 'remotestoragejs';
import KOMDeck from '../_shared/KOMDeck/main.js';
import KOMCard from '../_shared/KOMCard/main.js';
import KOMSpacing from '../_shared/KOMSpacing/main.js';
import KOMSetting from '../_shared/KOMSetting/main.js';
import KOMTransport from '../_shared/KOMTransport/main.js';
import KOMReviewLogic from './ui-logic.js';
import KOMSharedLogic from '../_shared/KOMSharedLogic/main.js';
import KOMPlayLogic from '../sub-play/ui-logic.js';
import OLSKThrottle from 'OLSKThrottle';
import OLSKLocalStorage from 'OLSKLocalStorage';
import OLSKCache from 'OLSKCache';
import OLSKFund from 'OLSKFund';
import OLSKPact from 'OLSKPact';
import OLSKChain from 'OLSKChain';
import OLSKBeacon from 'OLSKBeacon';
import OLSKLanguageSwitcher from 'OLSKLanguageSwitcher';
import zerodatawrap from 'zerodatawrap';

const mod = {

	// VALUE

	_ValueIsLoading: true,

	_ValueDecksAll: [],
	ValueDecksAll (inputData) {
		mod._ValueDecksAll = KOMReviewLogic.KOMReviewDeckSort(inputData);

		mod.ReactDocumentRemainder();
	},
	
	_ValueDeckSelected: undefined,
	_ValueDeckSelectedObjectsMap: {},
	ValueDeckSelected (inputData) {
		mod._ValueDeckSelected = inputData

		if (inputData) {
			mod.DataDeckSelectedObjects(inputData);
		}
	},

	_ValueBrowseVisible: false,
	
	_ValueBrowseCards: [],
	ValueBrowseCards (inputData) {
		mod._ValueBrowseCards = inputData;
	},

	_ValuePlayVisible: false,
	_ValuePlaySpacings: [],
	_ValuePlaySimplifiedResponseButtons: !OLSK_SPEC_UI(),

	_ValueHoldCards: [],
	_ValueHoldSpacings: [],
	
	_ValueCloudToolbarHidden: true,

	_ValueSpacingUpdateThrottleMap: {},
	_ValueDeckFiguresThrottleMap: {},
	_ValueDeckCachingEnabled: false,

	_ValueSpeechAvailable: 'speechSynthesis' in window,

	_ValueCacheDeckFiguresMap: {},
	ValueCacheDeckFiguresMap (inputData) {
		return (mod._ValueCacheDeckFiguresMap = OLSK_SPEC_UI() || !mod._ValueDeckCachingEnabled ? inputData : OLSKLocalStorage.OLKSLocalStorageSet(window.localStorage, 'KOM_REVIEW_CACHE_DeckFiguresMap', inputData));
	},

	_IsRunningDemo: false,

	_ValueOLSKFundProgress: false,

	_ValueDocumentRemainder: '',
	
	// DATA

	async DataSettingValue (inputData) {
		return ((await mod._ValueZDRWrap.App.KOMSetting.KOMSettingList()).filter(function (e) {
			return e.KOMSettingKey === inputData;
		}).pop() || {}).KOMSettingValue;
	},

	DataDeckSelectedObjects (inputData) {
		return OLSKCache.OLSKCacheResultFetchOnceSync(mod._ValueDeckSelectedObjectsMap, inputData.KOMDeckID, async function () {
			return mod._ValueZDRWrap.App.KOMDeck.KOMDeckObjectsMap(inputData, await mod.DataSettingValue('KOMSettingExcludeTripleQuestionMark') === 'true');
		});
	},

	DataIsEligible (inputData = {}) {
		return OLSKFund.OLSKFundIsEligible(Object.assign({
			ParamMinimumTier: 1,
			ParamCurrentProject: 'RP_004',
			ParamBundleProjects: ['FakeBundleProject'],
			ParamGrantTier: OLSKFund.OLSKFundTier('OLSK_FUND_PRICING_STRING_SWAP_TOKEN', mod._ValueOLSKFundGrant),
			ParamGrantProject: mod._ValueOLSKFundGrant ? mod._ValueOLSKFundGrant.OLSKPactGrantProject : '',
		}, inputData));
	},

	DataNavigator () {
		return navigator.serviceWorker ? navigator : {
			serviceWorker: {},
		};
	},

	async DataExportJSON (KOMDeck) {
		return JSON.stringify(await mod._ValueZDRWrap.App.KOMTransport.KOMTransportExport({
			KOMDeck,
			KOMSetting: await mod._ValueZDRWrap.App.KOMSetting.KOMSettingList(),
		}));
	},

	DataExportBasename () {
		return `${ window.location.hostname }-${ Date.now() }`;
	},

	DataExportJSONFilename () {
		return `${ mod.DataExportBasename() }.json`;
	},	

	DataReviewRecipes () {
		const items = [{
			LCHRecipeSignature: 'KOMReviewLauncherItemImportJSON',
			LCHRecipeName: OLSKLocalized('KOMReviewLauncherItemImportJSONText'),
			LCHRecipeCallback: async function KOMReviewLauncherItemImportJSON () {
				return mod.ControlImportData(await this.api.LCHReadTextFile({
					accept: '.json',
				}));
			},
		}, {
			LCHRecipeSignature: 'KOMReviewLauncherItemExportJSON',
			LCHRecipeName: OLSKLocalized('KOMReviewLauncherItemExportJSONText'),
			LCHRecipeCallback: async function KOMReviewLauncherItemExportJSON () {
				return this.api.LCHSaveFile(await mod.DataExportJSON(mod._ValueDecksAll), mod.DataExportJSONFilename());
			},
		}].concat(mod._ValueDecksAll.filter(function (e) {
			return e !== mod._ValueDeckSelected;
		}).map(function (e) {
			return {
				LCHRecipeSignature: 'KOMReviewLauncherItemSelectDeck',
				LCHRecipeName: OLSKFormatted(OLSKLocalized('KOMReviewLauncherItemSelectDeckTextFormat'), e.KOMDeckName),
				LCHRecipeCallback () {
					return mod.ControlDeckSelect(e);
				},
			}
		}).concat([{
			LCHRecipeSignature: 'KOMReviewLauncherItemToggleSimplifiedResponseButtons',
			LCHRecipeName: OLSKLocalized('KOMReviewLauncherItemToggleSimplifiedResponseButtonsText'),
			LCHRecipeCallback: function KOMReviewLauncherItemToggleSimplifiedResponseButtons () {
				mod._ValuePlaySimplifiedResponseButtons = !mod._ValuePlaySimplifiedResponseButtons;
			},
		}]));

		if (mod._ValueDeckSelected) {
			items.push({
				LCHRecipeSignature: 'KOMReviewLauncherItemExportSelectedJSON',
				LCHRecipeName: OLSKLocalized('KOMReviewLauncherItemExportSelectedJSONText'),
				LCHRecipeCallback: (async function KOMReviewLauncherItemExportSelectedJSON () {
					return this.api.LCHSaveFile(await mod.DataExportJSON([mod._ValueDeckSelected]), mod.DataExportJSONFilename());
				}),
			});
		}

		if (!!mod._ValueCloudIdentity && mod._ValueZDRWrap.ZDRStorageProtocol === zerodatawrap.ZDRProtocolRemoteStorage()) {
			items.push(...[
				{
					LCHRecipeSignature: 'KOMReviewLauncherItemDebugPlungeData',
					LCHRecipeName: OLSKLocalized('KOMReviewLauncherItemDebugPlungeDataText'),
					LCHRecipeCallback: async function KOMReviewLauncherItemDebugPlungeData () {
						if (!window.confirm(OLSKLocalized('KOMReviewLauncherItemDebugPlungeDataConfirmText'))) {
							return;
						}

						// console.log(Object.keys(await mod._ValueZDRWrap.ZDRStorageClient().kommit.__HOTFIX.__OLSKRemoteStorageHotfixPlungeData()));

						mod.ControlDeckSelect(null);

						if (OLSK_SPEC_UI()) {
							window.FakeWindowLocationHref = 'reload';
							return;
						}

						// setTimeout(function () {
						// 	window.location.reload();
						// }, 1000);
					},
				},
				]);
		}

		items.push(...OLSKFund.OLSKFundRecipes({
			ParamWindow: window,
			OLSKLocalized: OLSKLocalized,
			ParamConnected: !!mod._ValueCloudIdentity,
			ParamAuthorized: !!mod._ValueFundClue,
			OLSKFundDispatchGrant: mod.OLSKFundDispatchGrant,
			OLSKFundDispatchPersist: mod.OLSKFundDispatchPersist,
			ParamMod: mod,
			ParamSpecUI: OLSK_SPEC_UI(),
		}));

		items.push(...zerodatawrap.ZDRRecipes({
			ParamMod: mod,
			ParamSpecUI: OLSK_SPEC_UI(),
		}));

		if (mod._ValueZDRWrap.ZDRStorageProtocol === zerodatawrap.ZDRProtocolRemoteStorage()) {
			items.push(...OLSKRemoteStorage.OLSKRemoteStorageRecipes({
				ParamWindow: window,
				ParamStorage: mod._ValueZDRWrap.ZDRStorageClient(),
				OLSKLocalized: OLSKLocalized,
				ParamMod: mod,
				ParamSpecUI: OLSK_SPEC_UI(),
			}));
		}

		items.push(...OLSKServiceWorker.OLSKServiceWorkerRecipes(window, mod.DataNavigator(), OLSKLocalized, OLSK_SPEC_UI()));

		if (mod._KOMReviewMaster) {
			items.push(...mod._KOMReviewMaster.modPublic.KOMReviewMasterRecipes());
		}

		if (mod._KOMReviewDetail) {
			items.push(...mod._KOMReviewDetail.modPublic.KOMReviewDetailRecipes());
		}

		if (mod._KOMBrowse) {
			items.push(...mod._KOMBrowse.modPublic.KOMBrowseRecipes());
		}

		if (OLSK_SPEC_UI()) {
			items.push(...[
				{
					LCHRecipeName: 'FakeZDRSchemaDispatchSyncCreateDeck',
					LCHRecipeCallback: async function FakeZDRSchemaDispatchSyncCreateDeck () {
						return mod.ZDRSchemaDispatchSyncCreateDeck(await mod._ValueZDRWrap.App.KOMDeck.KOMDeckCreate(mod.FakeDeckObjectValid('FakeZDRSchemaDispatchSyncCreateDeck')));
					},
				},
				{
					LCHRecipeName: 'FakeZDRSchemaDispatchSyncUpdateDeck',
					LCHRecipeCallback: async function FakeZDRSchemaDispatchSyncUpdateDeck () {
						return mod.ZDRSchemaDispatchSyncUpdateDeck(await mod._ValueZDRWrap.App.KOMDeck.KOMDeckUpdate(mod.FakeDeckObjectValid('FakeZDRSchemaDispatchSyncUpdateDeck')));
					},
				},
				{
					LCHRecipeName: 'FakeZDRSchemaDispatchSyncDeleteDeck',
					LCHRecipeCallback: async function FakeZDRSchemaDispatchSyncDeleteDeck () {
						return mod.ZDRSchemaDispatchSyncDeleteDeck(await mod._ValueZDRWrap.App.KOMDeck.KOMDeckDelete(mod.FakeDeckObjectValid()));
					},
				},
				{
					LCHRecipeName: 'FakeZDRSchemaDispatchSyncCreateCard',
					LCHRecipeCallback: async function FakeZDRSchemaDispatchSyncCreateCard () {
						return mod.ZDRSchemaDispatchSyncCreateCard(await mod._ValueZDRWrap.App.KOMCard.KOMCardCreate(mod.FakeCardObjectValid('FakeZDRSchemaDispatchSyncCreateCard'), mod.FakeDeckObjectValid()));
					},
				},
				{
					LCHRecipeName: 'FakeZDRSchemaDispatchSyncUpdateCard',
					LCHRecipeCallback: async function FakeZDRSchemaDispatchSyncUpdateCard () {
						return mod.ZDRSchemaDispatchSyncUpdateCard(await mod._ValueZDRWrap.App.KOMCard.KOMCardUpdate(Object.assign(mod.FakeCardObjectValid('FakeZDRSchemaDispatchSyncUpdateCard'), {
							KOMCardIsRetired: true,
						})));
					},
				},
				{
					LCHRecipeName: 'FakeZDRSchemaDispatchSyncDeleteCard',
					LCHRecipeCallback: async function FakeZDRSchemaDispatchSyncDeleteCard () {
						return mod.ZDRSchemaDispatchSyncDeleteCard(await mod._ValueZDRWrap.App.KOMCard.KOMCardDelete(mod.FakeCardObjectValid()));
					},
				},
				{
					LCHRecipeName: 'FakeZDRSchemaDispatchSyncConflictCard',
					LCHRecipeCallback: async function FakeZDRSchemaDispatchSyncConflictCard () {
						const item = (await mod._ValueZDRWrap.App.KOMCard.KOMCardList(mod._ValueDeckSelected)).filter(function (e) {
							return e.KOMCardFrontText.match('FakeZDRSchemaDispatchSyncConflictCard');
						}).pop();
						
						return mod.ZDRSchemaDispatchSyncConflictCard({
							origin: 'conflict',
							oldValue: await mod._ValueZDRWrap.App.KOMCard.KOMCardUpdate(Object.assign({}, item, {
								KOMCardFrontText: item.KOMCardFrontText + '-local',
							})),
							newValue: Object.assign({}, item, {
								KOMCardFrontText: item.KOMCardFrontText + '-remote',
							}),
						});
					},
				},
				{
					LCHRecipeName: 'FakeZDRSchemaDispatchSyncCreateSpacing',
					LCHRecipeCallback: async function FakeZDRSchemaDispatchSyncCreateSpacing () {
						[false, true].forEach(async function (backward) {
							const spacing = await mod._ValueZDRWrap.App.KOMSpacing.KOMSpacingWrite(Object.assign(mod.FakeSpacingObjectValid(backward), {
								KOMSpacingIsLearning: true,
								KOMSpacingDueDate: new Date(),
							}), mod.FakeCardObjectValid());

							if (!backward) {
								return;
							}

							mod.ZDRSchemaDispatchSyncCreateSpacing(spacing);
						});
					},
				},
				{
					LCHRecipeName: 'FakeZDRSchemaDispatchSyncUpdateSpacing',
					LCHRecipeCallback: function FakeZDRSchemaDispatchSyncUpdateSpacing () {
						[false, true].map(async function (backward) {
							const spacing = await mod._ValueZDRWrap.App.KOMSpacing.KOMSpacingWrite(Object.assign(mod.FakeSpacingObjectPopulated(new Date(), backward), {
								KOMSpacingDueDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
							}), mod.FakeCardObjectValid());

							if (!backward) {
								return;
							}

							mod.ZDRSchemaDispatchSyncUpdateSpacing(spacing);
						});
					},
				},
				{
					LCHRecipeName: 'FakeZDRSchemaDispatchSyncDeleteSpacing',
					LCHRecipeCallback: function FakeZDRSchemaDispatchSyncDeleteSpacing () {
						return mod.ZDRSchemaDispatchSyncDeleteSpacing(mod.FakeSpacingObjectValid());
					},
				},
				{
					LCHRecipeName: 'KOMReviewLauncherItemDebug_PromptFakeImportSerialized',
					LCHRecipeCallback: function KOMReviewLauncherItemDebug_PromptFakeImportSerialized () {
						return mod.ControlImportData(window.prompt());
					},
				},
				{
					LCHRecipeName: 'KOMReviewLauncherItemDebug_AlertFakeExportSerialized',
					LCHRecipeCallback: async function KOMReviewLauncherItemDebug_AlertFakeExportSerialized () {
						return window.alert(JSON.stringify({
							OLSKDownloadName: mod.DataExportJSONFilename(),
							OLSKDownloadData: await mod.DataExportJSON(mod._ValueDecksAll),
						}));
					},
				},
				{
					LCHRecipeName: 'KOMReviewLauncherItemDebug_AlertFakeExportSelectedSerialized',
					LCHRecipeCallback: async function KOMReviewLauncherItemDebug_AlertFakeExportSelectedSerialized () {
						return window.alert(JSON.stringify({
							OLSKDownloadName: mod.DataExportJSONFilename(),
							OLSKDownloadData: await mod.DataExportJSON([mod._ValueDeckSelected]),
						}));
					},
				},
				{
					LCHRecipeName: 'KOMReviewLauncherItemDebug_TestSpeedPopulate',
					LCHRecipeCallback: async function KOMReviewLauncherItemDebug_TestSpeedPopulate () {
						const deck = await mod._ValueZDRWrap.App.KOMDeck.KOMDeckCreate({
							KOMDeckName: 'alfa',
						});
						return Promise.all(Array.from(Array(100)).map(function (e, i) {
							return mod._ValueZDRWrap.App.KOMCard.KOMCardCreate(Object.assign(mod.FakeCardObjectValid(), {
								KOMCardID: i.toString(),
								KOMCardDeckID: deck.KOMDeckID,
							}), deck).then(function (card) {
								return Promise.all([true, false].map(function (e, i) {
									return mod._ValueZDRWrap.App.KOMSpacing.KOMSpacingWrite(Object.assign(mod.FakeSpacingObjectPopulated(new Date(Date.now() - 1000 * 60 * 60 * 24)), {
										KOMSpacingID: card.KOMCardID + '-' + (i ? 'backward' : 'forward'),
									}), card)
								}));
							});
						}));
					},
				},
				{
					LCHRecipeName: 'KOMReviewLauncherItemDebug_TestSpeedStartup',
					LCHRecipeCallback: function KOMReviewLauncherItemDebug_TestSpeedStartup () {
						return mod.SetupValueDecksAll();
					},
				},
				{
					LCHRecipeName: 'FakeRetireInterval',
					LCHRecipeCallback: async function FakeRetireInterval () {
						return (await mod.DataDeckSelectedObjects(mod._ValueDeckSelected)).$KOMDeckSpacings.slice(-2).forEach(function (e) {
							Object.assign(e, {
								KOMSpacingChronicles: [{	
									KOMChronicleDrawDate: new Date(),
									KOMChronicleFlipDate: new Date(),
									KOMChronicleResponseDate: new Date(),
									KOMChronicleResponseType: 'RESPONSE_EASY',
									KOMChronicleInterval: 29,
									KOMChronicleMultiplier: 1.2,
									KOMChronicleDueDate: new Date(),
								}],
								KOMSpacingDrawDate: new Date(),
								KOMSpacingFlipDate: new Date(),
								KOMSpacingResponseDate: new Date(),
								KOMSpacingInterval: 29,
								KOMSpacingMultiplier: 1.2,
								KOMSpacingDueDate: new Date(),
							})
						});
					},
				},
				{
					LCHRecipeName: 'FakeFundDocumentLimit',
					LCHRecipeCallback: async function FakeFundDocumentLimit () {
						const deck = await mod._ValueZDRWrap.App.KOMDeck.KOMDeckCreate({
							KOMDeckName: Math.random().toString(),
						});

						await Promise.all(Array.from(Array(mod._ValueDocumentRemainder)).map(function (e) {
							return mod._ValueZDRWrap.App.KOMCard.KOMCardCreate(Object.assign(mod.FakeCardObjectValid(), {
								KOMCardID: Math.random().toString(),
								KOMCardDeckID: deck.KOMDeckID,
							}), deck);
						}));

						return mod.SetupValueDecksAll();
					},
				},
			]);
		}

		return items;
	},

	FakeDeckObjectValid (inputData = '') {
		return {
			KOMDeckID: 'FakeDeckID',
			KOMDeckName: inputData,
			KOMDeckCreationDate: new Date(),
			KOMDeckModificationDate: new Date(),
		};
	},

	FakeCardObjectValid(inputData = '') {
		return {
			KOMCardID: 'FakeCardID',
			KOMCardDeckID: 'FakeDeckID',
			KOMCardFrontText: inputData,
			KOMCardRearText: '',
			KOMCardCreationDate: new Date(),
			KOMCardModificationDate: new Date(),
		};
	},

	FakeSpacingObjectValid(inputData) {
		return {
			KOMSpacingID: 'FakeCardID-' + (inputData ? 'backward' : 'forward'),
			KOMSpacingChronicles: [],
			$KOMSpacingDeckID: 'FakeDeckID',
		};
	},

	FakeSpacingObjectPopulated(inputData, backward) {
		const drawDate = new Date(inputData - 1000);
		return Object.assign(mod.FakeSpacingObjectValid(backward), {
			KOMSpacingDrawDate: drawDate,
			KOMSpacingFlipDate: inputData,
			KOMSpacingInterval: 1,
			KOMSpacingMultiplier: 2.5,
			KOMSpacingDueDate: new Date(),
			KOMSpacingChronicles: [{
				KOMChronicleDrawDate: drawDate,
				KOMChronicleFlipDate: inputData,
				KOMChronicleResponseType: 'RESPONSE_EASY',
				KOMChronicleResponseDate: inputData,
				KOMChronicleInterval: 1,
				KOMChronicleMultiplier: 2.5,
				KOMChronicleDueDate: new Date(),
			}],
		});
	},

	// CONTROL

	ControlFundGate () {
		if (!window.confirm(OLSKLocalized('OLSKFundGateText'))) {
			return;
		}

		mod.OLSKAppToolbarDispatchFund();
	},

	async ControlDeckCreate(inputData) {
		inputData = inputData || window.prompt(OLSKLocalized('KOMReviewCreatePromptText'));
		
		if (!inputData) {
			return;
		}

		const item = await mod._ValueZDRWrap.App.KOMDeck.KOMDeckCreate({
			KOMDeckName: inputData,
		});

		await mod.ReactDeckFigures(item);

		mod.ValueDecksAll(mod._ValueDecksAll.concat(item));
	},
	
	async ControlDeckSave(inputData) {
		await mod._ValueZDRWrap.App.KOMDeck.KOMDeckUpdate(inputData);
	},

	async ControlDeckDiscard (inputData) {
		mod.ValueDecksAll(mod._ValueDecksAll.filter(function (e) {
			return e !== inputData;
		}))

		await mod._ValueZDRWrap.App.KOMDeck.KOMDeckDelete(inputData);
	},

	ControlDeckSelect(inputData) {
		mod.ValueDeckSelected(inputData);
	},

	ControlSpacingSave(inputData) {
		OLSKThrottle.OLSKThrottleMappedTimeout(mod._ValueSpacingUpdateThrottleMap, inputData.KOMSpacingID, {
			OLSKThrottleDuration: OLSK_SPEC_UI() ? 0 : 500,
			OLSKThrottleCallback () {
				return mod._ValueZDRWrap.App.KOMSpacing.KOMSpacingWrite(inputData, inputData.$KOMSpacingCard);
			},
		});
	},

	ControlReadStart (param1, param2) {
		if (OLSK_SPEC_UI()) {
			mod.DebugAudioLog(`read:${ param2 }:${ param1 }`);
		}

		if (!mod._ValueSpeechAvailable) {
			return;
		}

		if (speechSynthesis.speaking) {
			speechSynthesis.cancel();
		}

		const item = new SpeechSynthesisUtterance(param1);
		item.lang = param2;
		item.voice = speechSynthesis.getVoices().filter(function (e) {
			return e.lang == item.lang;
		}).pop();

		speechSynthesis.speak(item);
	},

	async ControlImportData (inputData) {
		if (!inputData.trim()) {
			return window.alert(OLSKLocalized('KOMReviewLauncherItemImportJSONErrorNotFilledAlertText'))
		}

		try {
			await mod._ValueZDRWrap.App.KOMTransport.KOMTransportImport(OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(JSON.parse(inputData)));
			
			await mod.SetupValueDecksAll();
			await mod.SetupSettingsAll();
		} catch (e) {
			window.alert(OLSKLocalized('KOMReviewLauncherItemImportJSONErrorNotValidAlertText'));
		}
	},

	async ControlDemo () {
		mod._IsRunningDemo = true;

		// await mod.ControlDeckCreate('alfa');

		return OLSKChain.OLSKChainGather(Object.assign({
			Wait: OLSKBeacon.OLSKBeaconWait,
			Point: (function (inputData) {
				return OLSKBeacon._OLSKBeaconAnimate(OLSKBeacon.OLSKBeaconPointFunction('.OLSKPointer', inputData));
			}),
			Click: (function (inputData) {
				return OLSKBeacon._OLSKBeaconAnimate(OLSKBeacon.OLSKBeaconClickFunction(inputData, '.OLSKPointer', 'OLSKPointerActive'));
			}),
			Defer: (function (inputData) {
				return OLSKBeacon.OLSKBeaconDeferFunction(inputData);
			}),
			Focus: (function (inputData) {
				return new Promise(function (resolve) {
					resolve(document.querySelector(inputData).focus());
				});
			}),
			Fill: (function (param1, param2) {
				return OLSKBeacon._OLSKBeaconAnimate(OLSKBeacon.OLSKBeaconFillFunction(param1, param2));
			}),
			Set: (function (param1, param2) {
				return OLSKBeacon._OLSKBeaconAnimate(OLSKBeacon.OLSKBeaconSetFunction(param1, param2));
			}),
			Nudge: (function () {
				return OLSKBeacon._OLSKBeaconAnimate(OLSKBeacon.OLSKBeaconNudgeFunction('.OLSKPointer', ...arguments));
			}),
		}, mod))
			.Point('.KOMReviewMasterCreateButton')
			.Nudge(0, 50)
			.Wait()
			.Point('.KOMReviewMasterCreateButton')
			.Click('.KOMReviewMasterCreateButton')
			.Wait(300)
			.Point('.KOMReviewMasterListItem')
			.Click('.KOMReviewMasterListItem')
			.Point('.KOMReviewDetailToolbarCardsButton')
			.Click('.KOMReviewDetailToolbarCardsButton')
			.Point('.KOMBrowseCreateButton')
			.Click('.KOMBrowseCreateButton')
			.Point('.KOMBrowseInfoFormFrontTextField')
			.Focus('.KOMBrowseInfoFormFrontTextField')
			.Fill('.KOMBrowseInfoFormFrontTextField', 'bonjour')
			.Point('.KOMBrowseInfoFormRearTextField')
			.Focus('.KOMBrowseInfoFormRearTextField')
			.Fill('.KOMBrowseInfoFormRearTextField', 'hello')
			.Point('.KOMBrowseInfoToolbarBackButton')
			.Click('.KOMBrowseInfoToolbarBackButton')
			.Click('.KOMBrowseCloseButton')
			.Point('.KOMReviewDetailFormFrontSpeechIsEnabledField')
			.Click('.KOMReviewDetailFormFrontSpeechIsEnabledFieldLabel')
			.Point('.KOMReviewDetailFormFrontLanguageCode .KOMReviewDetailLanguageCodeField')
			.Focus('.KOMReviewDetailFormFrontLanguageCode .KOMReviewDetailLanguageCodeField')
			.Set('.KOMReviewDetailFormFrontLanguageCode .KOMReviewDetailLanguageCodeField', 'fr-FR')
			.Point('.KOMReviewDetailFormRearSpeechIsEnabledField')
			.Click('.KOMReviewDetailFormRearSpeechIsEnabledFieldLabel')
			.Point('.KOMReviewDetailFormRearLanguageCode .KOMReviewDetailLanguageCodeField')
			.Focus('.KOMReviewDetailFormRearLanguageCode .KOMReviewDetailLanguageCodeField')
			.Set('.KOMReviewDetailFormRearLanguageCode .KOMReviewDetailLanguageCodeField', 'en-US')
			.Point('.KOMReviewDetailPlayButton')
			.Defer('.KOMReviewDetailPlayButton')
			.Wait(1200)
			.Point('.KOMPlayFlipButton')
			.Click('.KOMPlayFlipButton')
			.Wait()
			.Point('.KOMPlayResponseButtonNext')
			.Click('.KOMPlayResponseButtonNext')
			.Wait()
			.Point('.KOMPlayFlipButton')
			.Click('.KOMPlayFlipButton')
			.Wait()
			.Nudge(0, 100)
			.OLSKChainExecute();
	},

	// MESSAGE

	KOMReviewMasterDispatchCreate () {
		mod.ControlDeckCreate();
	},

	KOMReviewMasterDispatchSelect (inputData) {
		mod.ControlDeckSelect(inputData);
	},

	async KOMReviewMasterDispatchToggleExcludeTripleQuestionMark () {
		await mod.DataSettingValue('KOMSettingExcludeTripleQuestionMark') ? await mod._ValueZDRWrap.App.KOMSetting.ZDRModelDeleteObject({
			KOMSettingKey: 'KOMSettingExcludeTripleQuestionMark',
		}) : await mod._ValueZDRWrap.App.KOMSetting.ZDRModelWriteObject({
			KOMSettingKey: 'KOMSettingExcludeTripleQuestionMark',
			KOMSettingValue: 'true',
		});
		
		mod._ValueDeckSelectedObjectsMap = {};
		mod._ValueDecksAll.forEach(mod.ReactDeckFigures);
	},

	async KOMReviewMasterDispatchToggleDeckFiguresCaching () {
		await mod.DataSettingValue('KOMSettingDeckCachingEnabled') ? await mod._ValueZDRWrap.App.KOMSetting.ZDRModelDeleteObject({
			KOMSettingKey: 'KOMSettingDeckCachingEnabled',
		}) : await mod._ValueZDRWrap.App.KOMSetting.ZDRModelWriteObject({
			KOMSettingKey: 'KOMSettingDeckCachingEnabled',
			KOMSettingValue: 'true',
		});
	},

	KOMReviewDetailDispatchBack () {
		mod.ControlDeckSelect(null);
	},

	KOMReviewDetailDispatchDiscard (inputData) {
		mod.ControlDeckSelect(null);
		
		mod.ControlDeckDiscard(inputData);
	},

	KOMReviewDetailDispatchUpdate (inputData) {
		mod.ControlDeckSave(mod._ValueDeckSelected);

		mod._ValueDeckSelected = mod._ValueDeckSelected // #purge-svelte-force-update
	},

	KOMReviewDetailDispatchRecount () {
		return mod.ReactDeckFigures(mod._ValueDeckSelected);
	},

	async KOMReviewDetailDispatchBrowse () {
		mod.ValueBrowseCards((await mod.DataDeckSelectedObjects(mod._ValueDeckSelected)).$KOMDeckCards);

		mod._ValueBrowseVisible = true;
	},

	async KOMReviewDetailDispatchPlay (inputData) {
		mod._ValuePlaySpacings = KOMPlayLogic.KOMPlaySort(KOMReviewLogic.KOMReviewFilter(KOMReviewLogic.KOMReviewSpacingsToday((await mod.DataDeckSelectedObjects(mod._ValueDeckSelected)).$KOMDeckSpacings), inputData, mod._ValueDeckSelected));
		mod._ValuePlayVisible = true;
	},

	KOMBrowseDispatchEligible () {
		if (mod._ValueDocumentRemainder < 1 && !mod.DataIsEligible()) {
			return mod.ControlFundGate();
		}

		return true;
	},

	async KOMBrowseDispatchCreate (inputData) {
		(await mod.DataDeckSelectedObjects(mod._ValueDeckSelected)).$KOMDeckCards.push(inputData);
		(await mod.DataDeckSelectedObjects(mod._ValueDeckSelected)).$KOMDeckSpacings.push(...Object.values(await mod._ValueZDRWrap.App.KOMSpacing.KOMSpacingList(inputData)).map(function (e) {
			return Object.assign(e, {
				$KOMSpacingCard: inputData,
			});
		}));

		mod.ReactDocumentRemainder();
	},

	async KOMBrowseDispatchDiscard (inputData) {
		(await mod.DataDeckSelectedObjects(mod._ValueDeckSelected)).$KOMDeckCards = (await mod.DataDeckSelectedObjects(mod._ValueDeckSelected)).$KOMDeckCards.filter(function (e) {
			return e !== inputData;
		});
		(await mod.DataDeckSelectedObjects(mod._ValueDeckSelected)).$KOMDeckSpacings = (await mod.DataDeckSelectedObjects(mod._ValueDeckSelected)).$KOMDeckSpacings.filter(function (e) {
			return e.$KOMSpacingCard !== inputData;
		})

		mod.ReactDocumentRemainder();
	},

	async KOMBrowseDispatchClose () {
		mod._ValueDeckSelected = await mod.ReactDeckFigures(mod._ValueDeckSelected); // #purge-svelte-force-update

		mod._ValueBrowseVisible = false;

		mod.ValueBrowseCards([]);
	},

	KOMBrowseInfoDispatchRead () {
		mod.ControlReadStart(...arguments);
	},

	KOMPlayDispatchUpdate (inputData) {
		mod.ControlSpacingSave(inputData);
	},

	async KOMPlayDispatchFetch (param1, param2) {
		return await mod._ValueZDRWrap.App.KOMCard.KOMCardAudioFetch(param1, param2);
	},

	async KOMPlayDispatchDone () {
		await Promise.all(Object.keys(mod._ValueSpacingUpdateThrottleMap).map(function (e) {
			return OLSKThrottle.OLSKThrottleSkip(mod._ValueSpacingUpdateThrottleMap[e]);
		}));

		await Promise.all(KOMReviewLogic.KOMReviewRetireCards(mod._ValueDeckSelected, (await mod.DataDeckSelectedObjects(mod._ValueDeckSelected)).$KOMDeckSpacings).map(function (e) {
			return mod._ValueZDRWrap.App.KOMCard.KOMCardUpdate(Object.assign(e, {
				KOMCardIsRetired: true,
			}));
		}));

		mod._ValueDeckSelected = await mod.ReactDeckFigures(mod._ValueDeckSelected); // #purge-svelte-force-update

		mod._ValuePlayVisible = false;
	},

	async OLSKCloudFormDispatchSubmit (inputData) {
		const protocol = zerodatawrap.ZDRPreferenceProtocolConnect(inputData);
		(zerodatawrap.ZDRPreferenceProtocolMigrate() ? await mod.DataStorageClient(protocol) : mod._ValueZDRWrap).ZDRCloudConnect(inputData);
	},

	OLSKCloudDispatchRenew () {
		mod._ValueZDRWrap.ZDRCloudReconnect(mod._ValueCloudIdentity);
	},

	OLSKCloudStatusDispatchDisconnect () {
		mod._ValueZDRWrap.ZDRCloudDisconnect();

		mod._ValueCloudIdentity = null;

		zerodatawrap.ZDRPreferenceProtocolClear();
	},

	ZDRParamDispatchError (error) {
		mod._ValueCloudErrorText = error.toString();
	},

	ZDRParamDispatchConnected (identity, token) {
		mod._ValueCloudIdentity = identity;
		mod._ValueCloudToken = token;
	},

	ZDRParamDispatchOnline () {
		mod._ValueCloudIsOffline = false;
	},

	ZDRParamDispatchOffline () {
		mod._ValueCloudIsOffline = true;
	},

	ZDRParamDispatchSyncDidStart () {
		mod._ValueIsSyncing = true;
	},

	ZDRParamDispatchSyncDidStop () {
		mod._ValueIsSyncing = false;
	},

	OLSKCloudStatusDispatchSyncStart () {
		if (mod._ValueZDRWrap.ZDRStorageProtocol !== zerodatawrap.ZDRProtocolRemoteStorage()) {
			return;
		}

		mod._ValueZDRWrap.ZDRStorageClient().startSync();

		mod.ZDRParamDispatchSyncDidStart();
	},

	OLSKCloudStatusDispatchSyncStop () {
		if (mod._ValueZDRWrap.ZDRStorageProtocol !== zerodatawrap.ZDRProtocolRemoteStorage()) {
			return;
		}

		mod._ValueZDRWrap.ZDRStorageClient().stopSync();
	},

	OLSKAppToolbarDispatchApropos () {
		mod._OLSKModalView.modPublic.OLSKModalViewShow();
	},

	OLSKAppToolbarDispatchTongue () {
		if (window.Launchlet.LCHSingletonExists()) {
			return window.Launchlet.LCHSingletonDestroy();
		}

		// #hotfix launchlet show all items
		let selected;

		window.Launchlet.LCHSingletonCreate({
			LCHOptionRecipes: OLSKLanguageSwitcher.OLSKLanguageSwitcherRecipes({
				ParamLanguageCodes: window.OLSKPublicConstants('OLSKSharedPageLanguagesAvailable'),
				ParamCurrentLanguage: window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage'),
				ParamSpecUI: OLSK_SPEC_UI(),
				ParamWindow: window,
				ParamRouteConstant: window.OLSKPublicConstants('OLSKSharedActiveRouteConstant'),
				OLSKCanonical: window.OLSKCanonical,
			}).map(function (e) {
				const item = e.LCHRecipeCallback;

				return Object.assign(e, {
					LCHRecipeCallback () {
						selected = item;
					},
				})
			}),
			LCHOptionCompletionHandler () {
			  selected && selected();
			},
			LCHOptionMode: Launchlet.LCHModePreview,
			LCHOptionLanguage: window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage'),
		});
	},

	OLSKAppToolbarDispatchFund () {
		if (!mod._ValueCloudIdentity) {
			return mod._OLSKAppToolbarDispatchFundNotConnected();
		}

		mod._ValueFundURL = OLSKFund.OLSKFundURL({
			ParamFormURL: 'OLSK_FUND_FORM_URL_SWAP_TOKEN',
			ParamProject: 'RP_004',
			ParamIdentity: mod._ValueCloudIdentity,
			ParamHomeURL: window.location.origin + window.location.pathname,
		});

		mod._OLSKWebView.modPublic.OLSKModalViewShow();

		OLSKFund.OLSKFundListen({
			ParamWindow: window,
			OLSKFundDispatchReceive: mod.OLSKFundDispatchReceive,
		});
	},

	_OLSKAppToolbarDispatchFundNotConnected () {
		if (!window.confirm(OLSKLocalized('OLSKRemoteStorageConnectConfirmText'))) {
			return;
		}

		mod._ValueCloudToolbarHidden = false;
	},

	OLSKAppToolbarDispatchCloud () {
		mod._ValueCloudToolbarHidden = !mod._ValueCloudToolbarHidden;
	},

	OLSKAppToolbarDispatchLauncher () {
		if (window.Launchlet.LCHSingletonExists()) {
			return window.Launchlet.LCHSingletonDestroy();
		}

		window.Launchlet.LCHSingletonCreate({
			LCHOptionRecipes: mod.DataReviewRecipes(),
			LCHOptionLanguage: window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage'),
		});
	},

	OLSKFundDispatchReceive (inputData) {
		mod._OLSKWebView.modPublic.OLSKModalViewClose();

		return mod.OLSKFundDispatchPersist(inputData);
	},

	OLSKFundDispatchPersist (inputData) {
		mod._ValueFundClue = inputData;

		if (!inputData) {
			return mod._ValueZDRWrap.App.KOMSetting.ZDRModelDeleteObject({
				KOMSettingKey: 'KOMSettingFundClue',
			});
		}

		return mod._ValueZDRWrap.App.KOMSetting.ZDRModelWriteObject({
			KOMSettingKey: 'KOMSettingFundClue',
			KOMSettingValue: inputData,
		}).then(function () {
			if (OLSK_SPEC_UI()) {
				return;
			}

			window.location.reload();
		});
	},

	OLSKFundDispatchProgress (inputData) {
		mod._ValueOLSKFundProgress = inputData;
	},

	OLSKFundDispatchFail () {
		mod.OLSKFundDispatchPersist(null);
	},

	OLSKFundDispatchGrant (inputData) {
		mod._ValueOLSKFundGrant = OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(inputData);
	},

	ZDRSchemaDispatchSyncCreateDeck (inputData) {
		mod.SetupValueDecksAll();
	},

	async ZDRSchemaDispatchSyncUpdateDeck (inputData) {
		await mod.SetupValueDecksAll();

		mod.ReactDeckIfSelected(inputData);
	},

	async ZDRSchemaDispatchSyncDeleteDeck (inputData) {
		await mod.SetupValueDecksAll();

		if (!mod._ValueDeckSelected) {
			return;
		}

		if (mod._ValueDeckSelected.KOMDeckID === inputData.KOMDeckID) {
			mod._ValueDeckSelected = null;
		}
	},

	ZDRSchemaDispatchSyncCreateCard (inputData) {
		if (mod._KOMBrowse && mod._ValueDeckSelected && inputData.KOMCardDeckID === mod._ValueDeckSelected.KOMDeckID) {
			return mod._KOMBrowse.modPublic.KOMBrowseSyncCreateCard(inputData);
		}

		mod.ReactDeckFiguresThrottled(inputData.KOMCardDeckID);
	},

	ZDRSchemaDispatchSyncUpdateCard (inputData) {
		if (mod._KOMBrowse && mod._ValueDeckSelected && inputData.KOMCardDeckID === mod._ValueDeckSelected.KOMDeckID) {
			return mod._KOMBrowse.modPublic.KOMBrowseSyncUpdateCard(inputData);
		}
		
		mod.ReactDeckFiguresThrottled(inputData.KOMCardDeckID);
	},

	ZDRSchemaDispatchSyncDeleteCard (inputData) {
		if (mod._KOMBrowse && mod._ValueDeckSelected && inputData.KOMCardDeckID === mod._ValueDeckSelected.KOMDeckID) {
			return mod._KOMBrowse.modPublic.KOMBrowseSyncDeleteCard(inputData);
		}
		
		mod.ReactDeckFiguresThrottled(inputData.KOMCardDeckID);
	},

	ZDRSchemaDispatchSyncConflictCard (inputData) {
		setTimeout(async function () {
			mod.ZDRSchemaDispatchSyncUpdateCard(await mod._ValueZDRWrap.App.KOMCard.KOMCardUpdate(OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(OLSKRemoteStorage.OLSKRemoteStorageChangeDelegateConflictSelectRecent(inputData))));
		}, OLSK_SPEC_UI() ? 0 : 500);
	},

	ZDRSchemaDispatchSyncCreateSpacing (inputData) {
		mod.ReactDeckFiguresThrottled(inputData.$KOMSpacingDeckID);
	},

	ZDRSchemaDispatchSyncUpdateSpacing (inputData) {
		mod.ReactDeckFiguresThrottled(inputData.$KOMSpacingDeckID);
	},

	ZDRSchemaDispatchSyncDeleteSpacing (inputData) {},

	// REACT

	async ReactDocumentRemainder () {
		mod._ValueDocumentRemainder = OLSKFund.OLSKFundRemainder(KOMReviewLogic.KOMReviewDocumentCount(mod._ValueDecksAll, Object.fromEntries(await Promise.all(Object.entries(mod._ValueDeckSelectedObjectsMap).map(async function (e) {
			return [e[0], await e[1]];
		})))), parseInt('KOM_FUND_DOCUMENT_LIMIT_SWAP_TOKEN'));
	},

	ReactDeckIfSelected (inputData) {
		if (!mod._ValueDeckSelected) {
			return;
		}

		if (mod._ValueDeckSelected.KOMDeckID !== inputData.KOMDeckID) {
			return;
		}

		mod._ValueDeckSelected = Object.assign(mod._ValueDeckSelected, inputData); // #purge-svelte-force-update
	},

	async ReactDeckFigures (deck) {
		const activeSpacings = (await mod.DataDeckSelectedObjects(deck)).$KOMDeckSpacings;

		const todaySpacingsNotStudied = KOMReviewLogic.KOMReviewSpacingsToday(activeSpacings.filter(function (e) {
			return !e.$KOMSpacingCard.KOMCardIsRetired;
		}));

		const todaySpacingsStudied = activeSpacings.filter(function (e) {
			if (!e.KOMSpacingChronicles.length) {
				return false;
			}
			
			return KOMSharedLogic.KOMSharedGroupingDay(e.KOMSpacingChronicles.slice(-1).pop().KOMChronicleResponseDate) === KOMSharedLogic.KOMSharedGroupingDay(new Date());
		});

		const upcomingGroupings = KOMReviewLogic.KOMReviewGeneralUpcomingGroupByDate(KOMReviewLogic.KOMReviewGeneralUpcomingFilter(activeSpacings));
		const historicalGroupings = KOMReviewLogic.KOMReviewGeneralHistoricalGroupByDate(KOMReviewLogic.KOMReviewGeneralHistoricalFilter(activeSpacings));
		
		return Object.assign(deck, mod.ValueCacheDeckFiguresMap(Object.assign(mod._ValueCacheDeckFiguresMap, {
			[deck.KOMDeckID]: {
				$KOMDeckTodayReviewCount: KOMSpacing.KOMSpacingFilterUnique(todaySpacingsNotStudied.filter(function (e) {
					return !KOMSpacing.KOMSpacingIsUnseen(e);
				})).length,
				$KOMDeckTodayUnseenCount: KOMSpacing.KOMSpacingFilterUnique(todaySpacingsNotStudied.filter(KOMSpacing.KOMSpacingIsUnseen)).length,

				$KOMDeckTodayStudiedCount: todaySpacingsStudied.length,
				
				$KOMDeckGeneralNotUnseenCount: activeSpacings.filter(function (e) {
					return e.KOMSpacingChronicles.length;
				}).length,

				$KOMReviewTodayTotalCards: KOMSpacing.KOMSpacingFilterUnique(todaySpacingsStudied).length,
				$KOMReviewTodayTimeMinutes: KOMReviewLogic.KOMReviewTotalMinutes(KOMReviewLogic.KOMReviewTodayTotalMilliseconds(todaySpacingsStudied)),
				$KOMReviewTodayReviewAccuracy: KOMReviewLogic.KOMReviewTodayPercentage(KOMReviewLogic.KOMReviewTodayReviewAccuracy(todaySpacingsStudied)),

				$KOMReviewGeneralUpcomingData: KOMReviewLogic.KOMReviewGeneralUpcomingDates().map(function (e) {
					return {
						KOMReviewChartElementDateBarTableRowDataKey: KOMSharedLogic.KOMSharedGroupingDay(new Date()) === e ? OLSKLocalized('KOMReviewGeneralTodayText') : e,
						KOMReviewChartElementDateBarTableRowDataValues: Object.entries(KOMSpacing.KOMSpacingByStatus(upcomingGroupings[e] || [])).reduce(function (coll, item) {
							if (['KOMSpacingGroupingDeveloping', 'KOMSpacingGroupingMature'].includes(item[0])) {
								coll.push(KOMSpacing.KOMSpacingFilterUnique(item[1]).length);
							}

							return coll;
						}, []).reverse(),
					};
				}),
				$KOMReviewGeneralHistoricalData: KOMReviewLogic.KOMReviewGeneralHistoricalDates().map(function (e) {
					return {
						KOMReviewChartElementDateBarTableRowDataKey: KOMSharedLogic.KOMSharedGroupingDay(new Date()) === e ? OLSKLocalized('KOMReviewGeneralTodayText') : e,
						KOMReviewChartElementDateBarTableRowDataValues: Object.entries(KOMSpacing.KOMSpacingChroniclesByStatus(historicalGroupings[e] || [], e)).reduce(function (coll, item) {
							return coll.concat(KOMReviewLogic.KOMReviewTotalMinutes(KOMReviewLogic.KOMReviewGeneralHistoricalTotalMilliseconds(item[1])));
						}, []).reverse(),
					};
				}),
				$KOMReviewChartCompositionCollectionData: Object.entries(KOMSpacing.KOMSpacingByStatus(activeSpacings)).reduce(function (coll, item) {
					coll[item[0]] = KOMSpacing.KOMSpacingFilterUnique(item[1]).length;

					return coll;
				}, {}),
			},
		}))[deck.KOMDeckID]);
	},

	ReactDeckFiguresThrottled (inputData) {
		const deck = mod._ValueDecksAll.filter(function (e) {
			return e.KOMDeckID === inputData;
		}).pop();

		if (!deck) {
			return;
		}

		OLSKThrottle.OLSKThrottleMappedTimeout(mod._ValueDeckFiguresThrottleMap, inputData, {
			OLSKThrottleDuration: OLSK_SPEC_UI() ? 0 : 500,
			async OLSKThrottleCallback () {
				await mod.ReactDeckFigures(deck); // #purge-svelte-force-update
			},
		});
	},

	// SETUP

	async SetupEverything () {
		await mod.SetupStorageClient();

		await mod.SetupSettingsAll();

		mod.SetupValueCacheDeckFiguresMap();

		await mod.SetupValueDecksAll();

		mod.SetupFund();

		mod._ValueIsLoading = false;

		// mod.ControlDemo();
	},

	DataStorageClient (inputData) {
		return zerodatawrap.ZDRWrap({
			ZDRParamLibrary: (function() {
				if (inputData === zerodatawrap.ZDRProtocolFission()) {
					return webnative;
				}

				return RemoteStorage;
			})(),
			ZDRParamScopes: [{
				ZDRScopeKey: 'App',
				ZDRScopeDirectory: 'kommit',
				ZDRScopeCreatorDirectory: 'rCreativ',
				ZDRScopeSchemas: [
					Object.assign(KOMDeck, {
						ZDRSchemaDispatchSyncCreate: mod.ZDRSchemaDispatchSyncCreateDeck,
						ZDRSchemaDispatchSyncUpdate: mod.ZDRSchemaDispatchSyncUpdateDeck,
						ZDRSchemaDispatchSyncDelete: mod.ZDRSchemaDispatchSyncDeleteDeck,
					}),
					Object.assign(KOMCard, {
						ZDRSchemaDispatchSyncCreate: mod.ZDRSchemaDispatchSyncCreateCard,
						ZDRSchemaDispatchSyncUpdate: mod.ZDRSchemaDispatchSyncUpdateCard,
						ZDRSchemaDispatchSyncDelete: mod.ZDRSchemaDispatchSyncDeleteCard,
						ZDRSchemaDispatchSyncConflict: mod.ZDRSchemaDispatchSyncConflictCard,
					}),
					Object.assign(KOMSpacing, {
						ZDRSchemaDispatchSyncCreate: mod.ZDRSchemaDispatchSyncCreateSpacing,
						ZDRSchemaDispatchSyncUpdate: mod.ZDRSchemaDispatchSyncUpdateSpacing,
						ZDRSchemaDispatchSyncDelete: mod.ZDRSchemaDispatchSyncDeleteSpacing,
					}),
					KOMSetting,
					KOMTransport,
					],
			}],
			ZDRParamDispatchError: mod.ZDRParamDispatchError,
			ZDRParamDispatchConnected: mod.ZDRParamDispatchConnected,
			ZDRParamDispatchOnline: mod.ZDRParamDispatchOnline,
			ZDRParamDispatchOffline: mod.ZDRParamDispatchOffline,
			_ZDRParamDispatchJSONPreStringify: OLSKObject.OLSKObjectSafeCopy,
			_ZDRParamDispatchJSONPostParse: OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse,
		})
	},

	async SetupStorageClient() {
		mod._ValueZDRWrap = await mod.DataStorageClient(zerodatawrap.ZDRPreferenceProtocol(zerodatawrap.ZDRProtocolRemoteStorage()));
	},

	async SetupSettingsAll () {
		mod._ValueDeckCachingEnabled = await mod.DataSettingValue('KOMSettingDeckCachingEnabled') === 'true';
	},

	SetupValueCacheDeckFiguresMap () {
		if (!mod._ValueDeckCachingEnabled) {
			return OLSKLocalStorage.OLKSLocalStorageSet(window.localStorage, 'KOM_REVIEW_CACHE_DeckFiguresMap', null);
		}

		mod._ValueCacheDeckFiguresMap = OLSKLocalStorage.OLKSLocalStorageGet(window.localStorage, 'KOM_REVIEW_CACHE_DeckFiguresMap') || {};
	},

	async SetupValueDecksAll() {
		if (zerodatawrap.ZDRPreferenceProtocolMigrate()) {
			const client = await mod.DataStorageClient(zerodatawrap.ZDRPreferenceProtocolMigrate());

			await Promise.all((await client.App.ZDRStoragePathsRecursive('/')).map(async function (e) {
				const item = await client.App.ZDRStorageReadFile(e);
				await mod._ValueZDRWrap.App.ZDRStorageWriteFile(e, typeof item !== 'string' ? new Blob([item]) : item, typeof item !== 'string' ? 'audio/mpeg' : 'application/json');
				await client.App.ZDRStorageDeleteFile(e);
			}));

			zerodatawrap.ZDRPreferenceProtocolMigrateClear();

			client.ZDRCloudDisconnect();
		};

		mod.ValueDecksAll(await Promise.all((await mod._ValueZDRWrap.App.KOMDeck.KOMDeckList()).map(async function (deck) {
			if (!mod._ValueCacheDeckFiguresMap[deck.KOMDeckID]) {
				await mod.ReactDeckFigures(deck);
			}

			return Object.assign(deck, mod._ValueCacheDeckFiguresMap[deck.KOMDeckID] || {});
		})));
	},

	async SetupFund () {
		if (OLSK_SPEC_UI() && window.location.search.match('FakeOLSKFundResponseIsPresent=true')) {
			OLSKFund._OLSKFundFakeGrantResponseRandom();
		}

		mod._ValueFundClue = await mod.DataSettingValue('KOMSettingFundClue');

		await OLSKFund.OLSKFundSetupPostPay({
			ParamWindow: window,
			ParamExistingClue: mod._ValueFundClue || null,
			OLSKFundDispatchPersist: mod.OLSKFundDispatchPersist,
		});

		if (!mod._ValueCloudIdentity) {
			return;
		}

		if (!mod._ValueFundClue) {
			return;
		}

		const item = {
			OLSK_CRYPTO_PAIR_RECEIVER_PRIVATE: `OLSK_CRYPTO_PAIR_RECEIVER_PRIVATE_SWAP_TOKEN${ '' }`, // #purge
			OLSK_CRYPTO_PAIR_SENDER_PUBLIC: 'OLSK_CRYPTO_PAIR_SENDER_PUBLIC_SWAP_TOKEN',
			ParamWindow: window,
			OLSK_FUND_API_URL: 'OLSK_FUND_API_URL_SWAP_TOKEN',
			ParamBody: {
				OLSKPactAuthType: OLSKPact.OLSKPactAuthTypeRemoteStorage(),
				OLSKPactAuthIdentity: mod._ValueCloudIdentity,
				OLSKPactAuthProof: mod._ValueCloudToken,
				OLSKPactAuthMetadata: {
					OLSKPactAuthMetadataModuleName: 'kommit',
					OLSKPactAuthMetadataFolderPath: KOMDeck.KOMDeckDirectory() + '/',
				},
				OLSKPactPayIdentity: mod._ValueCloudIdentity,
				OLSKPactPayClue: mod._ValueFundClue,
			},
			OLSKLocalized,
			OLSKFundDispatchProgress: mod.OLSKFundDispatchProgress,
			OLSKFundDispatchFail: mod.OLSKFundDispatchFail,
			OLSKFundDispatchGrant: mod.OLSKFundDispatchGrant,
		};

		return OLSKFund.OLSKFundSetupGrant(item);
	},

	// LIFECYCLE

	async LifecycleModuleWillMount() {
		try {
			await mod.SetupEverything();
		} catch (e) {
			console.error(e);
		}
	},

};

import { onMount } from 'svelte';
onMount(mod.LifecycleModuleWillMount);

import KOMReviewMaster from './submodules/KOMReviewMaster/main.svelte';
import KOMReviewDetail from './submodules/KOMReviewDetail/main.svelte';
import KOMBrowse from '../sub-browse/main.svelte';
import KOMPlay from '../sub-play/main.svelte';
import OLSKAppToolbar from 'OLSKAppToolbar';
import OLSKServiceWorkerView from '../_shared/__external/OLSKServiceWorker/main.svelte';
import OLSKInstall from 'OLSKInstall';
import OLSKCloud from 'OLSKCloud';
import OLSKPointer from 'OLSKPointer';
import OLSKWebView from 'OLSKWebView';
import OLSKModalView from 'OLSKModalView';
import OLSKApropos from 'OLSKApropos';
</script>

<div class="KOMReview OLSKViewport" class:OLSKIsLoading={ mod._ValueIsLoading }>

<div class="OLSKViewportContent">
	{#if !mod._ValueDeckSelected }
		<KOMReviewMaster
			KOMReviewMasterItems={ mod._ValueDecksAll }
			KOMReviewMasterDispatchCreate={ mod.KOMReviewMasterDispatchCreate }
			KOMReviewMasterDispatchSelect={ mod.KOMReviewMasterDispatchSelect }
			KOMReviewMasterDispatchToggleExcludeTripleQuestionMark={ mod.KOMReviewMasterDispatchToggleExcludeTripleQuestionMark }
			KOMReviewMasterDispatchToggleDeckFiguresCaching={ mod.KOMReviewMasterDispatchToggleDeckFiguresCaching }
			bind:this={ mod._KOMReviewMaster }
			/>
	{/if}

	{#if mod._ValueDeckSelected && !mod._ValueBrowseVisible && !mod._ValuePlayVisible }
		<KOMReviewDetail
			KOMReviewDetailDeck={ mod._ValueDeckSelected }
			KOMReviewDetailDispatchBack={ mod.KOMReviewDetailDispatchBack }
			KOMReviewDetailDispatchDiscard={ mod.KOMReviewDetailDispatchDiscard }
			KOMReviewDetailDispatchUpdate={ mod.KOMReviewDetailDispatchUpdate }
			KOMReviewDetailDispatchRecount={ mod.KOMReviewDetailDispatchRecount }
			KOMReviewDetailDispatchBrowse={ mod.KOMReviewDetailDispatchBrowse }
			KOMReviewDetailDispatchPlay={ mod.KOMReviewDetailDispatchPlay }
			bind:this={ mod._KOMReviewDetail }
			/>
	{/if}

	{#if mod._ValueDeckSelected && mod._ValueBrowseVisible && !mod._ValuePlayVisible }
		<KOMBrowse
			KOMBrowseStorageClient={ mod._ValueZDRWrap }
			KOMBrowseDeckSelected={ mod._ValueDeckSelected }
			KOMBrowseDeckCards={ mod._ValueBrowseCards }
			KOMBrowseDispatchEligible={ mod.KOMBrowseDispatchEligible }
			KOMBrowseDispatchCreate={ mod.KOMBrowseDispatchCreate }
			KOMBrowseDispatchDiscard={ mod.KOMBrowseDispatchDiscard }
			KOMBrowseDispatchClose={ mod.KOMBrowseDispatchClose }
			KOMBrowseInfoSpeechAvailable={ mod._ValueSpeechAvailable }
			KOMBrowseInfoDispatchRead={ mod.KOMBrowseInfoDispatchRead }
			bind:this={ mod._KOMBrowse }
			/>
	{/if}

	{#if mod._ValuePlayVisible}
		<KOMPlay
			KOMPlaySpacings={ mod._ValuePlaySpacings }
			KOMPlayDeck={ mod._ValueDeckSelected }
			KOMPlayDispatchDone={ mod.KOMPlayDispatchDone }
			KOMPlayDispatchUpdate={ mod.KOMPlayDispatchUpdate }
			KOMPlayDispatchFetch={ mod.KOMPlayDispatchFetch }
			KOMPlaySimplifiedResponseButtons={ mod._ValuePlaySimplifiedResponseButtons }
			/>
	{/if}
</div>

{#if !mod._ValuePlayVisible }
	<footer class="KOMReviewViewportFooter OLSKMobileViewFooter">

		{#if !mod._ValueCloudToolbarHidden }
			<div class="KOMReviewCloudToolbar OLSKToolbar OLSKToolbarJustify OLSKCommonEdgeTop">
				<div class="OLSKToolbarElementGroup"></div>

				<div class="OLSKToolbarElementGroup">
					<OLSKCloud
						OLSKCloudErrorText={ mod._ValueCloudErrorText }
						OLSKCloudDispatchRenew={ mod.OLSKCloudDispatchRenew }
						OLSKCloudFormDispatchSubmit={ mod.OLSKCloudFormDispatchSubmit }
						OLSKCloudStatusIdentityText={ mod._ValueCloudIdentity }
						OLSKCloudStatusIsSyncing={ mod._ValueIsSyncing }
						OLSKCloudStatusDispatchSyncStart={ mod.OLSKCloudStatusDispatchSyncStart }
						OLSKCloudStatusDispatchSyncStop={ mod.OLSKCloudStatusDispatchSyncStop }
						OLSKCloudStatusDispatchDisconnect={ mod.OLSKCloudStatusDispatchDisconnect }
						/>
				</div>
			</div>
		{/if}

		<OLSKAppToolbar
			OLSKAppToolbarDispatchApropos={ mod.OLSKAppToolbarDispatchApropos }
			OLSKAppToolbarDispatchTongue={ mod.OLSKAppToolbarDispatchTongue }
			OLSKAppToolbarGuideURL={ window.OLSKCanonical('KOMGuideRoute') }
			OLSKAppToolbarFundShowProgress={ mod._ValueOLSKFundProgress }
			OLSKAppToolbarFundLimitText={ mod._ValueDocumentRemainder }
			OLSKAppToolbarCloudConnected={ !!mod._ValueCloudIdentity }
			OLSKAppToolbarCloudOffline={ mod._ValueCloudIsOffline }
			OLSKAppToolbarCloudError={ !!mod._ValueCloudErrorText }
			OLSKAppToolbarDispatchFund={ mod._ValueOLSKFundGrant || OLSKFund.OLSKFundResponseIsPresent() ? null : mod.OLSKAppToolbarDispatchFund }
			OLSKAppToolbarDispatchCloud={ mod.OLSKAppToolbarDispatchCloud }
			OLSKAppToolbarDispatchLauncher={ mod.OLSKAppToolbarDispatchLauncher }
			/>

	<OLSKInstall />

	{#if !OLSK_SPEC_UI()}
		<OLSKServiceWorkerView OLSKServiceWorkerRegistrationRoute={ window.OLSKCanonical('KOMServiceWorkerRoute') } />
	{/if}
	</footer>
{/if}

{#if !!mod._ValueCloudIdentity }
	<OLSKWebView OLSKModalViewTitleText={ OLSKLocalized('OLSKFundWebViewTitleText') } OLSKWebViewURL={ mod._ValueFundURL } bind:this={ mod._OLSKWebView } DEBUG_OLSKWebViewDataSource={ OLSK_SPEC_UI() } />
{/if}

<OLSKModalView OLSKModalViewTitleText={ OLSKLocalized('OLSKAproposHeadingText') } bind:this={ mod._OLSKModalView } OLSKModalViewIsCapped={ true }>
	<OLSKApropos
		OLSKAproposFeedbackValue={ `javascript:window.location.href = window.atob('${ window.btoa(OLSKFormatted(window.atob('OLSK_APROPOS_FEEDBACK_EMAIL_SWAP_TOKEN'), 'RP_004' + (mod._ValueFundClue ? '+' + mod._ValueFundClue : ''))) }')` }
		/>
</OLSKModalView>

</div>

{#if mod._IsRunningDemo }
	<OLSKPointer />
{/if}

<style src="./ui-style.css"></style>
