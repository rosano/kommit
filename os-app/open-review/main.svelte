<script>
import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import OLSKString from 'OLSKString';
const OLSKFormatted = OLSKString.OLSKStringWithFormat;

import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting'
import * as OLSKRemoteStoragePackage from '../_shared/__external/OLSKRemoteStorage/main.js'
const OLSKRemoteStorage = OLSKRemoteStoragePackage.default || OLSKRemoteStoragePackage;
import KOM_Data from '../_shared/KOM_Data/main.js';
import KOMDeckStorage from '../_shared/KOMDeck/storage.js';
import KOMCardStorage from '../_shared/KOMCard/storage.js';
import KOMSpacingStorage from '../_shared/KOMSpacing/storage.js';
import KOMSettingStorage from '../_shared/KOMSetting/storage.js';
import * as RemoteStoragePackage from 'remotestoragejs';
const RemoteStorage = RemoteStoragePackage.default || RemoteStoragePackage;
import KOMDeckAction from '../_shared/KOMDeck/action.js';
import KOMCardAction from '../_shared/KOMCard/action.js';
import KOMSettingAction from '../_shared/KOMSetting/action.js';
import KOMReviewLogic from './ui-logic.js';
import KOMSharedLogic from '../_shared/KOMSharedLogic/main.js';
import KOMPlayLogic from '../sub-play/ui-logic.js';
import OLSKThrottle from 'OLSKThrottle';
import KOMSpacingModel from '../_shared/KOMSpacing/model.js';

const mod = {

	// VALUE

	_ValueIsLoading: true,

	_ValueDecksAll: [],
	ValueDecksAll (inputData) {
		mod._ValueDecksAll = KOMReviewLogic.KOMReviewDeckSort(inputData);
	},
	
	_ValueDeckSelected: undefined,
	ValueDeckSelected (inputData) {
		mod._ValueDeckSelected = inputData
	},

	_ValueBrowseVisible: false,

	_ValuePlayVisible: false,
	_ValuePlaySpacings: [],

	_ValueHoldCards: [],
	_ValueHoldSpacings: [],
	
	_ValueStorageToolbarHidden: true,

	_ValueFooterStorageStatus: '',

	_ValueSpacingUpdateThrottleMap: {},
	_ValueCountThrottleMap: {},

	_ValueSpeechAvailable: 'speechSynthesis' in window,
	
	// DATA

	DataRecipes () {
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
		});

		if (mod._ValueStorageClient.connected) {
			items.push(...[
				{
					LCHRecipeSignature: 'KOMReviewLauncherItemSendLoginLink',
					LCHRecipeName: OLSKLocalized('KOMReviewLauncherItemSendLoginLinkText'),
					LCHRecipeCallback: function KOMReviewLauncherItemSendLoginLink () {
						const url = `mailto:?subject=${ OLSKLocalized('KOMReviewLauncherItemSendLoginLinkSubject') }&body=${ encodeURIComponent(`${ window.location.href }#remotestorage=${ mod._ValueStorageClient.remote.userAddress }&access_token=${ mod._ValueStorageClient.remote.token }`.replace(/#+/g, '#')) }`;

						if (OLSK_TESTING_BEHAVIOUR() && window.FakeOLSKConnected) {
							window.FakeWindowLocationHref = url;
							return;
						}

						window.location.href = url;
					},
				},
				{
					LCHRecipeSignature: 'KOMReviewLauncherItemDebugFlushData',
					LCHRecipeName: OLSKLocalized('KOMReviewLauncherItemDebugFlushDataText'),
					LCHRecipeCallback: async function KOMReviewLauncherItemDebugFlushData () {
						if (!window.confirm(OLSKLocalized('KOMReviewLauncherItemDebugFlushDataConfirmText'))) {
							return;
						}

						await mod._ValueStorageClient.kommit.__HOTFIX.__OLSKRemoteStorageHotfixFlushData();

						mod.ControlDeckSelect(null);

						if (OLSK_TESTING_BEHAVIOUR() && window.FakeOLSKConnected) {
							window.FakeWindowLocationHref = 'reload';
							return;
						}

						setTimeout(function () {
							window.location.reload();
						}, 100);
					},
				},
				]);
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
						return mod.OLSKChangeDelegateUpdateCard(await KOMCardAction.KOMCardActionUpdate(mod._ValueStorageClient, mod.FakeCardObjectValid('FakeOLSKChangeDelegateUpdateCard'), mod.FakeDeckObjectValid()));
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
						const item = mod._ValueDeckSelected.$KOMDeckCards.filter(function (e) {
							return e.KOMCardFrontText.match('FakeOLSKChangeDelegate');
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
						return mod.OLSKChangeDelegateCreateSpacing(await KOMSpacingStorage.KOMSpacingStorageWrite(mod._ValueStorageClient, mod.FakeSpacingObjectValid(), mod.FakeCardObjectValid(), mod.FakeDeckObjectValid()));
					},
				},
				{
					LCHRecipeName: 'FakeOLSKChangeDelegateUpdateSpacing',
					LCHRecipeCallback: function FakeOLSKChangeDelegateUpdateSpacing () {
						[false, true].map(async function (backward) {
							const spacing = await KOMSpacingStorage.KOMSpacingStorageWrite(mod._ValueStorageClient, Object.assign(mod.FakeSpacingObjectValid(backward), {
								KOMSpacingIsLearning: true,
								KOMSpacingDueDate: new Date(),
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
					LCHRecipeName: 'KOMReviewLauncherItemToggleExcludeTripleQuestionMark',
					LCHRecipeCallback: async function KOMReviewLauncherItemToggleExcludeTripleQuestionMark () {
						const value = await KOMSettingAction.KOMSettingsActionProperty(mod._ValueStorageClient, 'KOMSettingExcludeTripleQuestionMark');

						if (value) {
							return KOMSettingAction.KOMSettingsActionDelete(mod._ValueStorageClient, 'KOMSettingExcludeTripleQuestionMark');
						}

						KOMSettingAction.KOMSettingsActionProperty(mod._ValueStorageClient, 'KOMSettingExcludeTripleQuestionMark', 'true');
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
		};
	},

	// CONTROL

	async ControlDeckCreate(inputData) {
		const item = await KOMDeckAction.KOMDeckActionCreate(mod._ValueStorageClient, {
			KOMDeckName: inputData,
			$KOMDeckCards: [],
			$KOMDeckSpacings: [],
			$KOMDeckTodayReviewCount: 0,
			$KOMDeckTodayUnseenCount: 0,
		});

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
			OLSKThrottleDuration: OLSK_TESTING_BEHAVIOUR () ? 0 : 500,
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

	// MESSAGE

	KOMReviewMasterDispatchCreate (inputData) {
		mod.ControlDeckCreate(inputData);
	},

	KOMReviewMasterDispatchSelect (inputData) {
		mod.ControlDeckSelect(inputData);
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
		mod._ValueDeckSelected.$_KOMDeckUpdateToday();
	},

	KOMReviewDetailDispatchBrowse () {
		mod._ValueBrowseVisible = true;
	},

	KOMReviewDetailDispatchPlay (inputData) {
		mod._ValuePlaySpacings = KOMPlayLogic.KOMPlaySort(KOMReviewLogic.KOMReviewFilter(KOMReviewLogic.KOMReviewSpacingsToday(mod._ValueDeckSelected.$KOMDeckSpacings), inputData, mod._ValueDeckSelected));
		mod._ValuePlayVisible = true;
	},

	async KOMBrowseDispatchCreate (inputData) {
		mod._ValueDeckSelected.$KOMDeckSpacings.push(...Object.values(await KOMSpacingStorage.KOMSpacingStorageList(mod._ValueStorageClient, inputData, mod._ValueDeckSelected)).map(function (e) {
			return Object.assign(e, {
				$KOMSpacingCard: inputData,
			});
		}));
	},

	KOMBrowseListDispatchClose () {
		if (!window.location.search.match('DebugHotfixThrottleCount')) {
			mod.ReactThrottle(true);
		}

		mod._ValueBrowseVisible = false;
	},

	KOMBrowseInfoDispatchRead () {
		mod.ControlReadStart(...arguments);
	},

	KOMPlayDispatchDone () {
		mod._ValuePlayVisible = false;

		mod._ValueDeckSelected.$_KOMDeckUpdateToday();
	},

	KOMPlayDispatchUpdate (inputData) {
		mod.ControlSpacingSave(inputData);
	},

	async KOMPlayDispatchFetch (param1, param2) {
		return await KOMCardAction.KOMCardActionAudioFetch(mod._ValueStorageClient, param1, param2, mod._ValueDeckSelected);
	},

	OLSKAppToolbarDispatchStorage () {
		mod._ValueStorageToolbarHidden = !mod._ValueStorageToolbarHidden;
	},

	OLSKAppToolbarDispatchLauncher () {
		if (window.Launchlet.LCHSingletonExists()) {
			return window.Launchlet.LCHSingletonDestroy();
		}

		window.Launchlet.LCHSingletonCreate({
			LCHOptionRecipes: mod.DataRecipes(),
		});
	},

	OLSKChangeDelegateCreateDeck (inputData) {
		mod.ReactThrottle();
	},

	OLSKChangeDelegateUpdateDeck (inputData) {
		mod.ReactThrottle();
	},

	OLSKChangeDelegateDeleteDeck (inputData) {
		mod.ReactThrottle();
	},
	OLSKChangeDelegateCreateCard (inputData) {
		if (mod._KOMBrowse && mod._ValueDeckSelected && inputData.KOMCardDeckID === mod._ValueDeckSelected.KOMDeckID) {
			mod._KOMBrowse.modPublic.KOMBrowseChangeDelegateCreateCard(inputData);
		}

		mod.ReactThrottle();
	},

	OLSKChangeDelegateUpdateCard (inputData) {
		if (mod._KOMBrowse && mod._ValueDeckSelected && inputData.KOMCardDeckID === mod._ValueDeckSelected.KOMDeckID) {
			mod._KOMBrowse.modPublic.KOMBrowseChangeDelegateUpdateCard(inputData);
		}
		
		mod.ReactThrottle();
	},

	OLSKChangeDelegateDeleteCard (inputData) {
		if (mod._KOMBrowse && mod._ValueDeckSelected && inputData.KOMCardDeckID === mod._ValueDeckSelected.KOMDeckID) {
			mod._KOMBrowse.modPublic.KOMBrowseChangeDelegateDeleteCard(inputData);
		}
		
		mod.ReactThrottle();
	},

	async OLSKChangeDelegateConflictCard (inputData) {
		return mod.OLSKChangeDelegateUpdateCard(await KOMCardAction.KOMCardActionUpdate(mod._ValueStorageClient, OLSKRemoteStorage.OLSKRemoteStorageChangeDelegateConflictSelectRecent(inputData)));
	},

	OLSKChangeDelegateCreateSpacing (inputData) {
		mod.ReactThrottle();
	},

	OLSKChangeDelegateUpdateSpacing (inputData) {
		mod.ReactThrottle();
	},

	OLSKChangeDelegateDeleteSpacing (inputData) {},

	// REACT

	ReactThrottle (inputData) {
		OLSKThrottle.OLSKThrottleMappedTimeout(mod._ValueCountThrottleMap, 'mod._ValueDecksAll', {
			OLSKThrottleDuration: inputData || OLSK_TESTING_BEHAVIOUR () ? 0 : 500,
			async OLSKThrottleCallback () {
				await mod.SetupValueDecksAll();

				if (OLSK_TESTING_BEHAVIOUR()) {
					const deck = mod._ValueDecksAll[0];
					window.TestCardCount.innerHTML = !deck ? 0 : deck.$KOMDeckCards.length;
					window.TestSpacingCount.innerHTML = !deck ? 0 : deck.$KOMDeckSpacings.length;
					window.TestCallReactThrottle.innerHTML = parseInt(window.TestCallReactThrottle.innerHTML) + 1;
				}

				mod.ReactSelected();
			},
		});
	},

	ReactSelected () {
		if (!mod._ValueDeckSelected) {
			return;
		}

		mod._ValueDeckSelected = mod._ValueDecksAll.filter(function (e) {
			return e.KOMDeckID === mod._ValueDeckSelected.KOMDeckID;
		}).pop();

		if (OLSK_TESTING_BEHAVIOUR()) {
			window.TestCallReactSelected.innerHTML = parseInt(window.TestCallReactSelected.innerHTML) + 1;
		}
	},

	// SETUP

	async SetupEverything () {
		mod.SetupStorageClient();

		mod.SetupStorageStatus();

		await mod.SetupStorageNotifications();

		await mod.SetupValueDecksAll();

		mod._ValueIsLoading = false;
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

	async SetupValueDecksAll() {
		const excludeTripleQuestionMark = (await KOMSettingAction.KOMSettingsActionProperty(mod._ValueStorageClient, 'KOMSettingExcludeTripleQuestionMark') || {}).KOMSettingValue === 'true';

		mod.ValueDecksAll(await Promise.all((await KOMDeckAction.KOMDeckActionList(mod._ValueStorageClient)).filter(function (e) {
			return typeof e === 'object'; // #patch-remotestorage-true
		}).map(async function (deck) {
			const objectsMap = Object.entries(await KOMDeckStorage.KOMDeckStorageObjectsRecursive(mod._ValueStorageClient, deck));

			const cards = objectsMap.reduce(function (coll, item) {
				if (KOMCardStorage.KOMCardStorageMatch(item[0])) {
					return coll.concat(OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(item[1]));
				}

				return coll;
			}, []);

			const spacings = objectsMap.reduce(function (coll, item) {
				if (KOMSpacingStorage.KOMSpacingStorageMatch(item[0])) {
					coll[KOMSpacingModel.KOMSpacingModelIdentifier(item[1].KOMSpacingID)] = (coll[KOMSpacingModel.KOMSpacingModelIdentifier(item[1].KOMSpacingID)] || []).concat(OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(item[1]))
				}

				return coll;
			}, {});

			await Promise.all(cards.map(async function (e) {
				if ((spacings[e.KOMCardID] || []).length === 2) {
					return;
				}

				spacings[e.KOMCardID] = Object.values(await KOMSpacingStorage.KOMSpacingStorageList(mod._ValueStorageClient, e, deck));
			}))

			deck.$KOMDeckSpacings = [].concat(...(excludeTripleQuestionMark ? cards.filter(function (e) {
				return ![e.KOMCardFrontText, e.KOMCardRearText].join(',').includes('???');
			}) : cards).map(function (card) {
				return (spacings[card.KOMCardID] || []).map(function (e) {
					return Object.assign(e, {
						$KOMSpacingCard: card,
					});
				});
			}));

			const $_KOMDeckUpdateToday = function () {
				const items = KOMReviewLogic.KOMReviewSpacingsToday(deck.$KOMDeckSpacings).filter(function (e) {
					if (deck.KOMDeckIsForwardOnly && KOMSpacingModel.KOMSpacingModelIsBackward(e)) {
						return false;
					}

					return true;
				});

				const _ValueSpacingsReviewing = KOMSpacingModel.KOMSpacingModelFilterUnique(items.filter(function (e) {
					return !KOMSpacingModel.KOMSpacingModelIsUnseen(e);
				}));
				const _ValueSpacingsUnseen = KOMSpacingModel.KOMSpacingModelFilterUnique(items.filter(KOMSpacingModel.KOMSpacingModelIsUnseen));
				
				deck.$KOMDeckTodayStudiedSpacings = deck.$KOMDeckSpacings.filter(function (e) {
					if (!e.KOMSpacingChronicles.length) {
						return false;
					}
					
					return KOMSharedLogic.KOMSharedGroupingDay(e.KOMSpacingChronicles.slice(-1).pop().KOMChronicleResponseDate) === KOMSharedLogic.KOMSharedGroupingDay(new Date());
				});

				deck.$KOMDeckGeneralNotUnseenCount = deck.$KOMDeckSpacings.filter(function (e) {
					return e.KOMSpacingChronicles.length;
				}).length;

				deck.$KOMDeckTodayReviewCount = _ValueSpacingsReviewing.length;
				deck.$KOMDeckTodayUnseenCount = _ValueSpacingsUnseen.length;
				deck.$KOMDeckTodayStudiedCount = deck.$KOMDeckTodayStudiedSpacings.length;
			};

			$_KOMDeckUpdateToday();

			return Object.assign(deck, {
				$KOMDeckCards: cards,
				$_KOMDeckUpdateToday,
			})
		})));
	},

	// LIFECYCLE

	LifecycleModuleWillMount() {
		mod.SetupEverything();
	},

};

import { onMount } from 'svelte';
onMount(mod.LifecycleModuleWillMount);

import KOMReviewMaster from './submodules/KOMReviewMaster/main.svelte';
import KOMReviewDetail from './submodules/KOMReviewDetail/main.svelte';
import KOMBrowse from '../sub-browse/main.svelte';
import KOMPlay from '../sub-play/main.svelte';
import OLSKAppToolbar from 'OLSKAppToolbar';
import OLSKServiceWorker from '../_shared/__external/OLSKServiceWorker/main.svelte';
import OLSKStorageWidget from 'OLSKStorageWidget';
</script>

<div class="KOMReview OLSKViewport" class:OLSKIsLoading={ mod._ValueIsLoading }>

<div class="OLSKViewportContent">
	{#if !mod._ValueDeckSelected }
		<KOMReviewMaster
			KOMReviewMasterItems={ mod._ValueDecksAll }
			KOMReviewMasterDispatchCreate={ mod.KOMReviewMasterDispatchCreate }
			KOMReviewMasterDispatchSelect={ mod.KOMReviewMasterDispatchSelect }
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
			KOMReviewDetailPlaySingle={ true }
			bind:this={ mod._KOMReviewDetail }
			/>
	{/if}

	{#if mod._ValueDeckSelected && mod._ValueBrowseVisible && !mod._ValuePlayVisible }
		<KOMBrowse
			KOMBrowseStorageClient={ mod._ValueStorageClient }
			KOMBrowseDeckSelected={ mod._ValueDeckSelected }
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
			/>
	{/if}
</div>

{#if OLSK_TESTING_BEHAVIOUR()}
	<p>
		<strong>TestCardCount</strong>
		<span id="TestCardCount">0</span>
	</p>

	<p>
		<strong>TestSpacingCount</strong>
		<span id="TestSpacingCount">0</span>
	</p>

	<p>
		<strong>TestCallReactThrottle</strong>
		<span id="TestCallReactThrottle">0</span>
	</p>

	<p>
		<strong>TestCallReactSelected</strong>
		<span id="TestCallReactSelected">0</span>
	</p>
{/if}

{#if !mod._ValuePlayVisible }
	<footer class="KOMReviewViewportFooter OLSKMobileViewFooter">

		{#if !mod._ValueStorageToolbarHidden }
			<div class="KOMReviewStorageToolbar OLSKToolbar OLSKToolbarJustify OLSKStorageToolbar">
				<div class="OLSKToolbarElementGroup">
					<div></div>
				</div>

				<div class="OLSKToolbarElementGroup">
					<OLSKStorageWidget StorageClient={ mod._ValueStorageClient } />
				</div>
			</div>
		{/if}

		<OLSKAppToolbar
			OLSKAppToolbarDonateURL={ window.OLSKPublicConstants('KOM_SHARED_DONATE_URL') }
			OLSKAppToolbarGuideURL={ window.OLSKCanonicalFor('KOMGuideRoute') }
			OLSKAppToolbarStorageStatus={ mod._ValueFooterStorageStatus }
			OLSKAppToolbarDispatchStorage={ mod.OLSKAppToolbarDispatchStorage }
			_OLSKAppToolbarDispatchExport={ mod._OLSKAppToolbarDispatchExport }
			_OLSKAppToolbarDispatchImport={ mod._OLSKAppToolbarDispatchImport }
			OLSKAppToolbarDispatchLauncher={ mod.OLSKAppToolbarDispatchLauncher }
			/>
	</footer>
{/if}

</div>

{#if !OLSK_TESTING_BEHAVIOUR()}
	<OLSKServiceWorker OLSKServiceWorkerRegistrationRoute={ window.OLSKCanonicalFor('KOMServiceWorkerRoute') } />
{/if}

<style src="./ui-style.css"></style>
