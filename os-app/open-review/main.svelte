<script>
import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import OLSKString from 'OLSKString';
const OLSKFormatted = OLSKString.OLSKStringWithFormat;

import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting';
import OLSKRemoteStorage from 'OLSKRemoteStorage';
import OLSKServiceWorker from 'OLSKServiceWorker';
import KOM_Data from '../_shared/KOM_Data/main.js';
import KOMDeckStorage from '../_shared/KOMDeck/storage.js';
import KOMCardStorage from '../_shared/KOMCard/storage.js';
import KOMSpacingStorage from '../_shared/KOMSpacing/storage.js';
import KOMSettingStorage from '../_shared/KOMSetting/storage.js';
import RemoteStorage from 'remotestoragejs';
import KOMDeckAction from '../_shared/KOMDeck/action.js';
import KOMCardAction from '../_shared/KOMCard/action.js';
import KOMSettingAction from '../_shared/KOMSetting/action.js';
import KOMReviewLogic from './ui-logic.js';
import KOMSharedLogic from '../_shared/KOMSharedLogic/main.js';
import KOMPlayLogic from '../sub-play/ui-logic.js';
import OLSKThrottle from 'OLSKThrottle';
import KOMSpacingModel from '../_shared/KOMSpacing/model.js';
import OLSKLocalStorage from 'OLSKLocalStorage';
import OLSKCache from 'OLSKCache';
import OLSKFund from 'OLSKFund';
import OLSKPact from 'OLSKPact';
import OLSKChain from 'OLSKChain';
import OLSKBeacon from 'OLSKBeacon';

const mod = {

	// VALUE

	_ValueIsLoading: true,

	_ValueDecksAll: [],
	ValueDecksAll (inputData) {
		mod._ValueDecksAll = KOMReviewLogic.KOMReviewDeckSort(inputData);
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
	_ValuePlaySimplifiedResponseButtons: !OLSK_TESTING_BEHAVIOUR(),

	_ValueHoldCards: [],
	_ValueHoldSpacings: [],
	
	_ValueStorageToolbarHidden: true,

	_ValueFooterStorageStatus: '',

	_ValueSpacingUpdateThrottleMap: {},
	_ValueDeckFiguresThrottleMap: {},
	_ValueDeckCachingEnabled: false,

	_ValueSpeechAvailable: 'speechSynthesis' in window,

	_ValueCacheDeckFiguresMap: {},
	ValueCacheDeckFiguresMap (inputData) {
		return (mod._ValueCacheDeckFiguresMap = OLSK_TESTING_BEHAVIOUR() || !mod._ValueDeckCachingEnabled ? inputData : OLSKLocalStorage.OLKSLocalStorageSet(window.localStorage, 'kKOMReviewCacheDeckFiguresMap', inputData));
	},

	_IsRunningDemo: false,
	
	// DATA

	DataDeckSelectedObjects (inputData) {
		return OLSKCache.OLSKCacheResultFetchOnceSync(mod._ValueDeckSelectedObjectsMap, inputData.KOMDeckID, async function () {
			return await KOMDeckAction.KOMDeckActionFetchObjects(mod._ValueStorageClient, inputData, (await KOMSettingAction.KOMSettingsActionProperty(mod._ValueStorageClient, 'KOMSettingExcludeTripleQuestionMark') || {}).KOMSettingValue === 'true');
		});
	},

	DataNavigator () {
		return navigator.serviceWorker ? navigator : {
			serviceWorker: {},
		};
	},

	DataReviewRecipes () {
		const items = mod._ValueDecksAll.filter(function (e) {
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
			LCHRecipeCallback: async function KOMReviewLauncherItemToggleSimplifiedResponseButtons () {
				mod._ValuePlaySimplifiedResponseButtons = !mod._ValuePlaySimplifiedResponseButtons;
			},
		}]);

		if (mod._ValueStorageClient.connected) {
			items.push(...[
				{
					LCHRecipeSignature: 'KOMReviewLauncherItemDebugPlungeData',
					LCHRecipeName: OLSKLocalized('KOMReviewLauncherItemDebugPlungeDataText'),
					LCHRecipeCallback: async function KOMReviewLauncherItemDebugPlungeData () {
						if (!window.confirm(OLSKLocalized('KOMReviewLauncherItemDebugPlungeDataConfirmText'))) {
							return;
						}

						console.log(Object.keys(await mod._ValueStorageClient.kommit.__HOTFIX.__OLSKRemoteStorageHotfixPlungeData()));

						mod.ControlDeckSelect(null);

						if (OLSK_TESTING_BEHAVIOUR() && window.FakeOLSKConnected) {
							window.FakeWindowLocationHref = 'reload';
							return;
						}

						// setTimeout(function () {
						// 	window.location.reload();
						// }, 1000);
					},
				},
				]);

			items.push(...OLSKFund.OLSKFundRecipes({
				ParamWindow: window,
				OLSKLocalized: OLSKLocalized,
				ParamAuthorized: !!mod._ValueFundConfirmation,
				OLSKFundDispatchGrant: mod.OLSKFundDispatchGrant,
				OLSKFundDispatchPersist: mod.OLSKFundDispatchPersist,
				OLSK_TESTING_BEHAVIOUR: OLSK_TESTING_BEHAVIOUR(),
			}));
		}

		items.push(...OLSKRemoteStorage.OLSKRemoteStorageRecipes(window, mod._ValueStorageClient, OLSKLocalized, OLSK_TESTING_BEHAVIOUR()));
		items.push(...OLSKServiceWorker.OLSKServiceWorkerRecipes(window, mod.DataNavigator(), OLSKLocalized, OLSK_TESTING_BEHAVIOUR()));

		if (mod._KOMReviewMaster) {
			items.push(...mod._KOMReviewMaster.modPublic.KOMReviewMasterRecipes());
		}

		if (mod._KOMReviewDetail) {
			items.push(...mod._KOMReviewDetail.modPublic.KOMReviewDetailRecipes());
		}

		if (mod._KOMBrowse) {
			items.push(...mod._KOMBrowse.modPublic.KOMBrowseRecipes());
		}

		if (OLSK_TESTING_BEHAVIOUR()) {
			items.push(...[
				{
					LCHRecipeName: 'FakeOLSKConnected',
					LCHRecipeCallback () {
						mod._ValueStorageClient = Object.assign({}, mod._ValueStorageClient);
						mod._ValueStorageClient.connected = true;
						mod._ValueStorageClient.remote = Object.assign(mod._ValueStorageClient.remote, {
							userAddress: 'alfa',
							token: 'bravo',
						});

						window.FakeOLSKConnected = true;
					},
				},
				{
					LCHRecipeName: 'FakeOLSKChangeDelegateCreateDeck',
					LCHRecipeCallback: async function FakeOLSKChangeDelegateCreateDeck () {
						return mod.OLSKChangeDelegateCreateDeck(await KOMDeckAction.KOMDeckActionCreate(mod._ValueStorageClient, mod.FakeDeckObjectValid('FakeOLSKChangeDelegateCreateDeck')));
					},
				},
				{
					LCHRecipeName: 'FakeOLSKChangeDelegateUpdateDeck',
					LCHRecipeCallback: async function FakeOLSKChangeDelegateUpdateDeck () {
						return mod.OLSKChangeDelegateUpdateDeck(await KOMDeckAction.KOMDeckActionUpdate(mod._ValueStorageClient, mod.FakeDeckObjectValid('FakeOLSKChangeDelegateUpdateDeck')));
					},
				},
				{
					LCHRecipeName: 'FakeOLSKChangeDelegateDeleteDeck',
					LCHRecipeCallback: async function FakeOLSKChangeDelegateDeleteDeck () {
						const deck = mod.FakeDeckObjectValid();
						await KOMDeckAction.KOMDeckActionDelete(mod._ValueStorageClient, deck)
						return mod.OLSKChangeDelegateDeleteDeck(deck);
					},
				},
				{
					LCHRecipeName: 'FakeOLSKChangeDelegateCreateCard',
					LCHRecipeCallback: async function FakeOLSKChangeDelegateCreateCard () {
						return mod.OLSKChangeDelegateCreateCard(await KOMCardAction.KOMCardActionCreate(mod._ValueStorageClient, mod.FakeCardObjectValid('FakeOLSKChangeDelegateCreateCard'), mod.FakeDeckObjectValid()));
					},
				},
				{
					LCHRecipeName: 'FakeOLSKChangeDelegateUpdateCard',
					LCHRecipeCallback: async function FakeOLSKChangeDelegateUpdateCard () {
						return mod.OLSKChangeDelegateUpdateCard(await KOMCardAction.KOMCardActionUpdate(mod._ValueStorageClient, Object.assign(mod.FakeCardObjectValid('FakeOLSKChangeDelegateUpdateCard'), {
							KOMCardIsRetired: true,
						}), mod.FakeDeckObjectValid()));
					},
				},
				{
					LCHRecipeName: 'FakeOLSKChangeDelegateDeleteCard',
					LCHRecipeCallback: async function FakeOLSKChangeDelegateDeleteCard () {
						const card = mod.FakeCardObjectValid();
						await KOMCardAction.KOMCardActionDelete(mod._ValueStorageClient, card, mod.FakeDeckObjectValid());
						return mod.OLSKChangeDelegateDeleteCard(card);
					},
				},
				{
					LCHRecipeName: 'FakeOLSKChangeDelegateConflictCard',
					LCHRecipeCallback: async function FakeOLSKChangeDelegateConflictCard () {
						const item = (await KOMCardAction.KOMCardActionList(mod._ValueStorageClient, mod._ValueDeckSelected)).filter(function (e) {
							return e.KOMCardFrontText.match('FakeOLSKChangeDelegateConflictCard');
						}).pop();
						
						return mod.OLSKChangeDelegateConflictCard({
							origin: 'conflict',
							oldValue: await KOMCardAction.KOMCardActionUpdate(mod._ValueStorageClient, Object.assign({}, item, {
								KOMCardFrontText: item.KOMCardFrontText + '-local',
							})),
							newValue: Object.assign({}, item, {
								KOMCardFrontText: item.KOMCardFrontText + '-remote',
							}),
						});
					},
				},
				{
					LCHRecipeName: 'FakeOLSKChangeDelegateCreateSpacing',
					LCHRecipeCallback: async function FakeOLSKChangeDelegateCreateSpacing () {
						[false, true].forEach(async function (backward) {
							const spacing = await KOMSpacingStorage.KOMSpacingStorageWrite(mod._ValueStorageClient, Object.assign(mod.FakeSpacingObjectValid(backward), {
								KOMSpacingIsLearning: true,
								KOMSpacingDueDate: new Date(),
							}), mod.FakeCardObjectValid(), mod.FakeDeckObjectValid());

							if (!backward) {
								return;
							}

							mod.OLSKChangeDelegateCreateSpacing(spacing);
						});
					},
				},
				{
					LCHRecipeName: 'FakeOLSKChangeDelegateUpdateSpacing',
					LCHRecipeCallback: function FakeOLSKChangeDelegateUpdateSpacing () {
						[false, true].map(async function (backward) {
							const spacing = await KOMSpacingStorage.KOMSpacingStorageWrite(mod._ValueStorageClient, Object.assign(mod.FakeSpacingObjectPopulated(new Date(), backward), {
								KOMSpacingDueDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
							}), mod.FakeCardObjectValid(), mod.FakeDeckObjectValid());

							if (!backward) {
								return;
							}

							mod.OLSKChangeDelegateUpdateSpacing(spacing);
						});
					},
				},
				{
					LCHRecipeName: 'FakeOLSKChangeDelegateDeleteSpacing',
					LCHRecipeCallback: function FakeOLSKChangeDelegateDeleteSpacing () {
						return mod.OLSKChangeDelegateDeleteSpacing(mod.FakeSpacingObjectValid());
					},
				},
				{
					LCHRecipeName: 'KOMReviewLauncherItemDebug_ImportFileData',
					LCHRecipeCallback: function KOMReviewLauncherItemDebug_ImportFileData () {
						mod.ControlImportData(window.prompt());
					},
				},
				{
					LCHRecipeName: 'KOMReviewLauncherItemDebug_TestSpeedPopulate',
					LCHRecipeCallback: async function KOMReviewLauncherItemDebug_TestSpeedPopulate () {
						const deck = await KOMDeckAction.KOMDeckActionCreate(mod._ValueStorageClient, {
							KOMDeckName: 'alfa',
						});
						return Promise.all(Array.from(Array(100)).map(function (e, i) {
							return KOMCardAction.KOMCardActionCreate(mod._ValueStorageClient, Object.assign(mod.FakeCardObjectValid(), {
								KOMCardID: i.toString(),
								KOMCardDeckID: deck.KOMDeckID,
							}), deck).then(function (card) {
								return Promise.all([true, false].map(function (e, i) {
									return KOMSpacingStorage.KOMSpacingStorageWrite(mod._ValueStorageClient, Object.assign(mod.FakeSpacingObjectPopulated(new Date(Date.now() - 1000 * 60 * 60 * 24)), {
										KOMSpacingID: card.KOMCardID + '-' + (i ? 'backward' : 'forward'),
									}), card, deck)
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

	async ControlDeckCreate(inputData) {
		const item = await KOMDeckAction.KOMDeckActionCreate(mod._ValueStorageClient, {
			KOMDeckName: inputData,
		});

		await mod.ReactDeckFigures(item);

		mod.ValueDecksAll(mod._ValueDecksAll.concat(item));
	},
	
	async ControlDeckSave(inputData) {
		await KOMDeckAction.KOMDeckActionUpdate(mod._ValueStorageClient, inputData);
	},

	async ControlDeckDiscard (inputData) {
		mod.ValueDecksAll(mod._ValueDecksAll.filter(function (e) {
			return e !== inputData;
		}))

		await KOMDeckAction.KOMDeckActionDelete(mod._ValueStorageClient, inputData);
	},

	ControlDeckSelect(inputData) {
		mod.ValueDeckSelected(inputData);
	},

	ControlSpacingSave(inputData) {
		const deck = mod._ValueDeckSelected;
		
		OLSKThrottle.OLSKThrottleMappedTimeout(mod._ValueSpacingUpdateThrottleMap, inputData.KOMSpacingID, {
			OLSKThrottleDuration: OLSK_TESTING_BEHAVIOUR() ? 0 : 500,
			OLSKThrottleCallback () {
				return KOMSpacingStorage.KOMSpacingStorageWrite(mod._ValueStorageClient, inputData, inputData.$KOMSpacingCard, deck);
			},
		});
	},

	ControlReadStart (param1, param2) {
		if (OLSK_TESTING_BEHAVIOUR()) {
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
			return window.alert(OLSKLocalized('KOMReviewStorageImportErrorNotFilledAlertText'))
		}

		try {
			await KOM_Data.KOM_DataImport(mod._ValueStorageClient, OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(JSON.parse(inputData)));
			await mod.SetupValueDecksAll();
		} catch (e) {
			window.alert(OLSKLocalized('KOMReviewStorageImportErrorNotValidAlertText'));
		}
	},

	ControlExportData (inputData) {
		Launchlet.LCHTasksRun([{
			async LCHRecipeCallback () {
				return this.api.LCHSaveFile(JSON.stringify(await KOM_Data.KOM_DataExport(mod._ValueStorageClient, inputData)), `${ window.location.host }-${ Date.now() }.json`)
			},
			LCHRecipeURLFilter: '*',
		  LCHRecipeIsAutomatic: true,
		}]);
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
			.Point('.KOMBrowseListToolbarCreateButton')
			.Click('.KOMBrowseListToolbarCreateButton')
			.Point('.KOMBrowseInfoFormFrontTextField')
			.Focus('.KOMBrowseInfoFormFrontTextField')
			.Fill('.KOMBrowseInfoFormFrontTextField', 'bonjour')
			.Point('.KOMBrowseInfoFormRearTextField')
			.Focus('.KOMBrowseInfoFormRearTextField')
			.Fill('.KOMBrowseInfoFormRearTextField', 'hello')
			.Point('.KOMBrowseInfoToolbarBackButton')
			.Click('.KOMBrowseInfoToolbarBackButton')
			.Click('.KOMBrowseListToolbarCloseButton')
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

	KOMReviewMasterDispatchCreate (inputData) {
		mod.ControlDeckCreate(inputData);
	},

	KOMReviewMasterDispatchSelect (inputData) {
		mod.ControlDeckSelect(inputData);
	},

	KOMReviewMasterDispatchImportData (inputData) {
		Launchlet.LCHTasksRun([{
			async LCHRecipeCallback () {
				return mod.ControlImportData(await this.api.LCHReadTextFile({
					accept: '.json',
				}));
			},
			LCHRecipeURLFilter: '*',
		  LCHRecipeIsAutomatic: true,
		}]);
	},

	KOMReviewMasterDispatchExportData () {
		mod.ControlExportData(mod._ValueDecksAll);
	},

	async KOMReviewMasterDispatchToggleExcludeTripleQuestionMark () {
		const value = await KOMSettingAction.KOMSettingsActionProperty(mod._ValueStorageClient, 'KOMSettingExcludeTripleQuestionMark');

		value ? await KOMSettingAction.KOMSettingsActionDelete(mod._ValueStorageClient, 'KOMSettingExcludeTripleQuestionMark') : await KOMSettingAction.KOMSettingsActionProperty(mod._ValueStorageClient, 'KOMSettingExcludeTripleQuestionMark', 'true');
		
		mod._ValueDeckSelectedObjectsMap = {};
		mod._ValueDecksAll.forEach(mod.ReactDeckFigures);
	},

	async KOMReviewMasterDispatchToggleDeckFiguresCaching () {
		const value = await KOMSettingAction.KOMSettingsActionProperty(mod._ValueStorageClient, 'KOMSettingDeckCachingEnabled');

		value ? await KOMSettingAction.KOMSettingsActionDelete(mod._ValueStorageClient, 'KOMSettingDeckCachingEnabled') : await KOMSettingAction.KOMSettingsActionProperty(mod._ValueStorageClient, 'KOMSettingDeckCachingEnabled', 'true');
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

	KOMReviewDetailDispatchExport () {
		mod.ControlExportData([mod._ValueDeckSelected]);
	},

	async KOMBrowseDispatchCreate (inputData) {
		(await mod.DataDeckSelectedObjects(mod._ValueDeckSelected)).$KOMDeckCards.push(inputData);
		(await mod.DataDeckSelectedObjects(mod._ValueDeckSelected)).$KOMDeckSpacings.push(...Object.values(await KOMSpacingStorage.KOMSpacingStorageList(mod._ValueStorageClient, inputData, mod._ValueDeckSelected)).map(function (e) {
			return Object.assign(e, {
				$KOMSpacingCard: inputData,
			});
		}));
	},

	async KOMBrowseListDispatchClose () {
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
		return await KOMCardAction.KOMCardActionAudioFetch(mod._ValueStorageClient, param1, param2, mod._ValueDeckSelected);
	},

	async KOMPlayDispatchDone () {
		await Promise.all(Object.keys(mod._ValueSpacingUpdateThrottleMap).map(function (e) {
			return OLSKThrottle.OLSKThrottleSkip(mod._ValueSpacingUpdateThrottleMap[e]);
		}));

		await Promise.all(KOMReviewLogic.KOMReviewRetireCards(mod._ValueDeckSelected, (await mod.DataDeckSelectedObjects(mod._ValueDeckSelected)).$KOMDeckSpacings).map(function (e) {
			return KOMCardAction.KOMCardActionUpdate(mod._ValueStorageClient, Object.assign(e, {
				KOMCardIsRetired: true,
			}), mod._ValueDeckSelected);
		}));

		mod._ValueDeckSelected = await mod.ReactDeckFigures(mod._ValueDeckSelected); // #purge-svelte-force-update

		mod._ValuePlayVisible = false;
	},

	OLSKAppToolbarDispatchFund () {
		if (!window.confirm(OLSKLocalized('OLSKRemoteStorageConnectConfirmText'))) {
			return;
		}

		mod._ValueStorageToolbarHidden = false;
	},

	OLSKAppToolbarDispatchStorage () {
		mod._ValueStorageToolbarHidden = !mod._ValueStorageToolbarHidden;
	},

	OLSKAppToolbarDispatchLauncher () {
		if (window.Launchlet.LCHSingletonExists()) {
			return window.Launchlet.LCHSingletonDestroy();
		}

		window.Launchlet.LCHSingletonCreate({
			LCHOptionRecipes: mod.DataReviewRecipes(),
		});
	},

	OLSKFundDispatchPersist (inputData) {
		mod._ValueFundConfirmation = inputData;

		if (!inputData) {
			return KOMSettingAction.KOMSettingsActionDelete(mod._ValueStorageClient, 'KOMSettingFundConfirmation');
		}

		return KOMSettingAction.KOMSettingsActionProperty(mod._ValueStorageClient, 'KOMSettingFundConfirmation', inputData).then(function () {
			if (OLSK_TESTING_BEHAVIOUR()) {
				return;
			}

			window.location.reload();
		});
	},

	OLSKFundDispatchFail () {
		mod.OLSKFundDispatchPersist(null);
	},

	OLSKFundDispatchGrant (inputData) {
		mod._ValueFundGrant = inputData;
	},

	OLSKChangeDelegateCreateDeck (inputData) {
		mod.SetupValueDecksAll();
	},

	async OLSKChangeDelegateUpdateDeck (inputData) {
		await mod.SetupValueDecksAll();

		mod.ReactDeckIfSelected(inputData);
	},

	async OLSKChangeDelegateDeleteDeck (inputData) {
		await mod.SetupValueDecksAll();

		if (!mod._ValueDeckSelected) {
			return;
		}

		if (mod._ValueDeckSelected.KOMDeckID === inputData.KOMDeckID) {
			mod._ValueDeckSelected = null;
		}
	},

	OLSKChangeDelegateCreateCard (inputData) {
		if (mod._KOMBrowse && mod._ValueDeckSelected && inputData.KOMCardDeckID === mod._ValueDeckSelected.KOMDeckID) {
			return mod._KOMBrowse.modPublic.KOMBrowseChangeDelegateCreateCard(inputData);
		}

		mod.ReactDeckFiguresThrottled(inputData.KOMCardDeckID);
	},

	OLSKChangeDelegateUpdateCard (inputData) {
		if (mod._KOMBrowse && mod._ValueDeckSelected && inputData.KOMCardDeckID === mod._ValueDeckSelected.KOMDeckID) {
			return mod._KOMBrowse.modPublic.KOMBrowseChangeDelegateUpdateCard(inputData);
		}
		
		mod.ReactDeckFiguresThrottled(inputData.KOMCardDeckID);
	},

	OLSKChangeDelegateDeleteCard (inputData) {
		if (mod._KOMBrowse && mod._ValueDeckSelected && inputData.KOMCardDeckID === mod._ValueDeckSelected.KOMDeckID) {
			return mod._KOMBrowse.modPublic.KOMBrowseChangeDelegateDeleteCard(inputData);
		}
		
		mod.ReactDeckFiguresThrottled(inputData.KOMCardDeckID);
	},

	async OLSKChangeDelegateConflictCard (inputData) {
		return mod.OLSKChangeDelegateUpdateCard(await KOMCardAction.KOMCardActionUpdate(mod._ValueStorageClient, OLSKRemoteStorage.OLSKRemoteStorageChangeDelegateConflictSelectRecent(inputData)));
	},

	OLSKChangeDelegateCreateSpacing (inputData) {
		mod.ReactDeckFiguresThrottled(inputData.$KOMSpacingDeckID);
	},

	OLSKChangeDelegateUpdateSpacing (inputData) {
		mod.ReactDeckFiguresThrottled(inputData.$KOMSpacingDeckID);
	},

	OLSKChangeDelegateDeleteSpacing (inputData) {},

	// REACT

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
				$KOMDeckTodayReviewCount: KOMSpacingModel.KOMSpacingModelFilterUnique(todaySpacingsNotStudied.filter(function (e) {
					return !KOMSpacingModel.KOMSpacingModelIsUnseen(e);
				})).length,
				$KOMDeckTodayUnseenCount: KOMSpacingModel.KOMSpacingModelFilterUnique(todaySpacingsNotStudied.filter(KOMSpacingModel.KOMSpacingModelIsUnseen)).length,

				$KOMDeckTodayStudiedCount: todaySpacingsStudied.length,
				
				$KOMDeckGeneralNotUnseenCount: activeSpacings.filter(function (e) {
					return e.KOMSpacingChronicles.length;
				}).length,

				$KOMReviewTodayTotalCards: KOMSpacingModel.KOMSpacingModelFilterUnique(todaySpacingsStudied).length,
				$KOMReviewTodayTimeMinutes: KOMReviewLogic.KOMReviewTotalMinutes(KOMReviewLogic.KOMReviewTodayTotalMilliseconds(todaySpacingsStudied)),
				$KOMReviewTodayReviewAccuracy: KOMReviewLogic.KOMReviewTodayPercentage(KOMReviewLogic.KOMReviewTodayReviewAccuracy(todaySpacingsStudied)),

				$KOMReviewGeneralUpcomingData: KOMReviewLogic.KOMReviewGeneralUpcomingDates().map(function (e) {
					return {
						KOMReviewChartElementDateBarTableRowDataKey: KOMSharedLogic.KOMSharedGroupingDay(new Date()) === e ? OLSKLocalized('KOMReviewGeneralTodayText') : e,
						KOMReviewChartElementDateBarTableRowDataValues: Object.entries(KOMSpacingModel.KOMSpacingModelGroupByStatus(upcomingGroupings[e] || [])).reduce(function (coll, item) {
							if (['KOMSpacingGroupingDeveloping', 'KOMSpacingGroupingMature'].includes(item[0])) {
								coll.push(KOMSpacingModel.KOMSpacingModelFilterUnique(item[1]).length);
							}

							return coll;
						}, []).reverse(),
					};
				}),
				$KOMReviewGeneralHistoricalData: KOMReviewLogic.KOMReviewGeneralHistoricalDates().map(function (e) {
					return {
						KOMReviewChartElementDateBarTableRowDataKey: KOMSharedLogic.KOMSharedGroupingDay(new Date()) === e ? OLSKLocalized('KOMReviewGeneralTodayText') : e,
						KOMReviewChartElementDateBarTableRowDataValues: Object.entries(KOMSpacingModel.KOMSpacingModelGroupChroniclesByStatus(historicalGroupings[e] || [], e)).reduce(function (coll, item) {
							return coll.concat(KOMReviewLogic.KOMReviewTotalMinutes(KOMReviewLogic.KOMReviewGeneralHistoricalTotalMilliseconds(item[1])));
						}, []).reverse(),
					};
				}),
				$KOMReviewChartCompositionCollectionData: Object.entries(KOMSpacingModel.KOMSpacingModelGroupByStatus(activeSpacings)).reduce(function (coll, item) {
					coll[item[0]] = KOMSpacingModel.KOMSpacingModelFilterUnique(item[1]).length;

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
			OLSKThrottleDuration: OLSK_TESTING_BEHAVIOUR () ? 0 : 500,
			async OLSKThrottleCallback () {
				await mod.ReactDeckFigures(deck); // #purge-svelte-force-update
			},
		});
	},

	// SETUP

	async SetupEverything () {
		mod.SetupStorageClient();

		mod.SetupStorageStatus();

		await mod.SetupStorageNotifications();

		await mod.SetupValueDeckCachingEnabled();

		mod.SetupValueCacheDeckFiguresMap();

		await mod.SetupValueDecksAll();

		mod.SetupFund();

		mod._ValueIsLoading = false;

		// mod.ControlDemo();
	},

	SetupStorageClient() {
		const storageModule = KOM_Data.KOM_DataModule([
			Object.assign(KOMDeckStorage.KOMDeckStorageBuild, {
				OLSKChangeDelegate: {
					OLSKChangeDelegateCreate: mod.OLSKChangeDelegateCreateDeck,
					OLSKChangeDelegateUpdate: mod.OLSKChangeDelegateUpdateDeck,
					OLSKChangeDelegateDelete: mod.OLSKChangeDelegateDeleteDeck,
				},
			}),
			Object.assign(KOMCardStorage.KOMCardStorageBuild, {
				OLSKChangeDelegate: {
					OLSKChangeDelegateCreate: mod.OLSKChangeDelegateCreateCard,
					OLSKChangeDelegateUpdate: mod.OLSKChangeDelegateUpdateCard,
					OLSKChangeDelegateDelete: mod.OLSKChangeDelegateDeleteCard,
					OLSKChangeDelegateConflict: mod.OLSKChangeDelegateConflictCard,
				},
			}),
			Object.assign(KOMSpacingStorage.KOMSpacingStorageBuild, {
				OLSKChangeDelegate: {
					OLSKChangeDelegateCreate: mod.OLSKChangeDelegateCreateSpacing,
					OLSKChangeDelegateUpdate: mod.OLSKChangeDelegateUpdateSpacing,
					OLSKChangeDelegateDelete: mod.OLSKChangeDelegateDeleteSpacing,
				},
			}),
			KOMSettingStorage.KOMSettingStorageBuild,
			], {
			OLSKOptionIncludeDebug: OLSK_TESTING_BEHAVIOUR() || window.OLSKPublicConstants('OLSKDebugRemoteStorage'),
		});
		
		mod._ValueStorageClient = new RemoteStorage({ modules: [ storageModule ] });

		mod._ValueStorageClient.access.claim(storageModule.name, 'rw');

		mod._ValueStorageClient.caching.enable(`/${ storageModule.name }/`);

		if (window.OLSKPublicConstants('OLSKDebugRemoteStorage')) {
			window.OLSKDebugRemoteStorage = mod._ValueStorageClient;
		}
	},

	SetupStorageStatus () {
		OLSKRemoteStorage.OLSKRemoteStorageStatus(mod._ValueStorageClient, function (inputData) {
			mod._ValueFooterStorageStatus = inputData;
		}, OLSKLocalized)
	},

	async SetupStorageNotifications () {
		mod._ValueStorageClient.on('sync-done', () => {
			if (!OLSK_TESTING_BEHAVIOUR()) {
				console.debug('sync-done', arguments);
			}
		});

		let isOffline;

		mod._ValueStorageClient.on('network-offline', () => {
			if (!OLSK_TESTING_BEHAVIOUR()) {
				console.debug('network-offline', arguments);
			}

			isOffline = true;
		});

		mod._ValueStorageClient.on('network-online', () => {
			if (!OLSK_TESTING_BEHAVIOUR()) {
				console.debug('network-online', arguments);
			}
			
			isOffline = false;
		});

		mod._ValueStorageClient.on('error', (error) => {
			if (isOffline && inputData.message === 'Sync failed: Network request failed.') {
				return;
			};

			if (!OLSK_TESTING_BEHAVIOUR()) {
				console.debug('error', error);
			}
		});

		return new Promise(function (res, rej) {
			return mod._ValueStorageClient.on('ready', res);
		});
	},

	async SetupValueDeckCachingEnabled () {
		mod._ValueDeckCachingEnabled = (await KOMSettingAction.KOMSettingsActionProperty(mod._ValueStorageClient, 'KOMSettingDeckCachingEnabled') || {}).KOMSettingValue === 'true';
	},

	SetupValueCacheDeckFiguresMap () {
		if (!mod._ValueDeckCachingEnabled) {
			return OLSKLocalStorage.OLKSLocalStorageSet(window.localStorage, 'kKOMReviewCacheDeckFiguresMap', null);
		}

		mod._ValueCacheDeckFiguresMap = OLSKLocalStorage.OLKSLocalStorageGet(window.localStorage, 'kKOMReviewCacheDeckFiguresMap') || {};
	},

	async SetupValueDecksAll() {
		mod.ValueDecksAll(await Promise.all((await KOMDeckAction.KOMDeckActionList(mod._ValueStorageClient)).filter(function (e) {
			return typeof e === 'object'; // #patch-remotestorage-true
		}).map(async function (deck) {
			if (!mod._ValueCacheDeckFiguresMap[deck.KOMDeckID]) {
				await mod.ReactDeckFigures(deck);
			}

			return Object.assign(deck, mod._ValueCacheDeckFiguresMap[deck.KOMDeckID] || {});
		})));
	},

	async SetupFund () {
		mod._ValueFundConfirmation = (await KOMSettingAction.KOMSettingsActionProperty(mod._ValueStorageClient, 'KOMSettingFundConfirmation') || {}).KOMSettingValue;

		await OLSKFund._OLSKFundSetupPostPay({
			ParamWindow: window,
			ParamExistingCode: mod._ValueFundConfirmation || null,
			OLSKFundDispatchPersist: mod.OLSKFundDispatchPersist,
		});

		if (!mod._ValueStorageClient.connected) {
			return;
		}

		if (!mod._ValueFundConfirmation) {
			return;
		}
		
		const item = {
			OLSK_CRYPTO_PAIR_RECEIVER_PRIVATE: `OLSK_CRYPTO_PAIR_RECEIVER_PRIVATE_SWAP_TOKEN${ '' }`, // #purge
			OLSK_CRYPTO_PAIR_SENDER_PUBLIC: 'OLSK_CRYPTO_PAIR_SENDER_PUBLIC_SWAP_TOKEN',
			ParamWindow: window,
			OLSK_FUND_API_URL: 'OLSK_FUND_API_URL_SWAP_TOKEN',
			ParamBody: {
				OLSKPactAuthType: OLSKPact.OLSKPactAuthTypeStorage(),
				OLSKPactAuthIdentity: mod._ValueStorageClient.remote.userAddress,
				OLSKPactAuthProof: mod._ValueStorageClient.remote.token,
				OLSKPactAuthMetadata: {
					OLSKPactAuthMetadataModuleName: KOM_Data.KOM_DataModuleName(),
					OLSKPactAuthMetadataFolderPath: KOMDeckStorage.KOMDeckStorageCollectionPath(),
				},
				OLSKPactPayIdentity: mod._ValueStorageClient.remote.userAddress,
				OLSKPactPayTransaction: mod._ValueFundConfirmation,
			},
			OLSKLocalized,
			OLSKFundDispatchFail: mod.OLSKFundDispatchFail,
			OLSKFundDispatchGrant: mod.OLSKFundDispatchGrant,
		};

		await OLSKFund._OLSKFundSetupGrant(item);
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
import OLSKStorageWidget from 'OLSKStorageWidget';
import OLSKPointer from 'OLSKPointer';
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
			KOMReviewMasterDispatchImportData={ mod.KOMReviewMasterDispatchImportData }
			KOMReviewMasterDispatchExportData={ mod.KOMReviewMasterDispatchExportData }
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
			KOMReviewDetailDispatchExport={ mod.KOMReviewDetailDispatchExport }
			bind:this={ mod._KOMReviewDetail }
			/>
	{/if}

	{#if mod._ValueDeckSelected && mod._ValueBrowseVisible && !mod._ValuePlayVisible }
		<KOMBrowse
			KOMBrowseStorageClient={ mod._ValueStorageClient }
			KOMBrowseDeckSelected={ mod._ValueDeckSelected }
			KOMBrowseDeckCards={ mod._ValueBrowseCards }
			KOMBrowseDispatchCreate={ mod.KOMBrowseDispatchCreate }
			KOMBrowseListDispatchClose={ mod.KOMBrowseListDispatchClose }
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

		{#if !mod._ValueStorageToolbarHidden }
			<div class="KOMReviewStorageToolbar OLSKToolbar OLSKToolbarJustify OLSKStorageToolbar">
				<div class="OLSKToolbarElementGroup"></div>

				<div class="OLSKToolbarElementGroup">
					<OLSKStorageWidget StorageClient={ mod._ValueStorageClient } />
				</div>
			</div>
		{/if}

		<OLSKAppToolbar
			OLSKAppToolbarGuideURL={ window.OLSKCanonicalFor('KOMGuideRoute') }
			OLSKAppToolbarDispatchFund={ mod._ValueFundGrant || OLSKFund.OLSKFundResponseIsPresent() ? null : mod.OLSKAppToolbarDispatchFund }
			OLSKAppToolbarStorageStatus={ mod._ValueFooterStorageStatus }
			OLSKAppToolbarDispatchStorage={ mod.OLSKAppToolbarDispatchStorage }
			OLSKAppToolbarDispatchLauncher={ mod.OLSKAppToolbarDispatchLauncher }
			/>
	</footer>
{/if}

</div>

{#if !OLSK_TESTING_BEHAVIOUR()}
	<OLSKServiceWorkerView OLSKServiceWorkerRegistrationRoute={ window.OLSKCanonicalFor('KOMServiceWorkerRoute') } />
{/if}

{#if mod._IsRunningDemo }
	<OLSKPointer />
{/if}

<style src="./ui-style.css"></style>
