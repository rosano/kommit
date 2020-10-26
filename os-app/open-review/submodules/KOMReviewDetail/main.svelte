<script>
export let KOMReviewDetailDeck;
export let KOMReviewDetailDispatchBack;
export let KOMReviewDetailDispatchBrowse;
export let KOMReviewDetailDispatchUpdate;
export let KOMReviewDetailDispatchRecount;
export let KOMReviewDetailDispatchPlay;
export let KOMReviewDetailDispatchDiscard;
export let KOMReviewDetailDispatchExport;
export let KOMReviewDetail_DebugShowLauncherButton = false;

export const modPublic = {

	KOMReviewDetailRecipes () {
		return mod.DataReviewDetailRecipes();
	},

};

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting';

import KOMReviewLogic from '../../ui-logic.js';

const kMaxUnseenCards = 10;

const mod = {

	// VALUE

	_ValueLanguages: [],

	ValueLanguages (inputData) {
		mod._ValueLanguages = inputData.map(function (e) {
			return e.lang
		}).filter(function (e, i, coll) {
			return coll.indexOf(e) === i;
		}).sort();
	},

	// DATA

	DataReviewDetailRecipes () {
		const items = [{
			LCHRecipeSignature: 'KOMReviewDetailLauncherItemExport',
			LCHRecipeName: OLSKLocalized('KOMReviewDetailLauncherItemExportText'),
			LCHRecipeCallback: (function KOMReviewDetailLauncherItemExport () {
				return KOMReviewDetailDispatchExport();
			}),
		}];

		if (KOMReviewDetailDeck.$KOMDeckTodayReviewCount) {
			items.push({
				LCHRecipeSignature: 'KOMReviewDetailLauncherItemPlayReviewing',
				LCHRecipeName: OLSKLocalized('KOMReviewDetailLauncherItemPlayReviewingText'),
				LCHRecipeCallback () {
					mod.ContolPlay(KOMReviewLogic.KOMReviewSchemeReviewing());
				},
			});
		}

		if (KOMReviewDetailDeck.$KOMDeckTodayUnseenCount) {
			items.push({
				LCHRecipeSignature: 'KOMReviewDetailLauncherItemPlayUnseen',
				LCHRecipeName: OLSKLocalized('KOMReviewDetailLauncherItemPlayUnseenText'),
				LCHRecipeCallback () {
					mod.ContolPlay(KOMReviewLogic.KOMReviewSchemeUnseen());
				},
			});
		}

		if (OLSK_TESTING_BEHAVIOUR()) {
			items.push({
				LCHRecipeName: 'KOMReviewDetailLauncherFakeItemProxy',
				LCHRecipeCallback: function KOMReviewDetailLauncherFakeItemProxy () {},
			});
		}
		
		return items;
	},

	// INTERFACE

	InterfaceFormDidUpdate () {
		// if (!KOMReviewDetailDeck.KOMDeckFrontLanguageCode && KOMReviewDetailDeck.KOMDeckFrontSpeechIsEnabled) {
		// 	KOMReviewDetailDeck.KOMDeckFrontSpeechIsEnabled = false;
		// 	delete KOMReviewDetailDeck.KOMDeckFrontSpeechIsEnabled;
		// }

		// if (!KOMReviewDetailDeck.KOMDeckRearLanguageCode && KOMReviewDetailDeck.KOMDeckRearSpeechIsEnabled) {
		// 	KOMReviewDetailDeck.KOMDeckRearSpeechIsEnabled = false;
		// 	delete KOMReviewDetailDeck.KOMDeckRearSpeechIsEnabled;
		// }

		setTimeout(function () {
			KOMReviewDetailDispatchUpdate(KOMReviewDetailDeck);
		});
	},

	InterfaceForwardOnlyDidInput () {
		mod.InterfaceFormDidUpdate();
		
		KOMReviewDetailDispatchRecount();
	},

	InterfaceReviewingButtonDidClick() {
		mod.ContolPlay(KOMReviewLogic.KOMReviewSchemeReviewing());
	},

	InterfaceUnseenButtonDidClick() {
		mod.ContolPlay(KOMReviewLogic.KOMReviewSchemeUnseen());
	},

	InterfaceMixedButtonDidClick() {
		mod.ContolPlay(KOMReviewLogic.KOMReviewSchemeMixed());
	},

	InterfaceRenameButtonDidClick() {
		mod.ControlRename();
	},

	InterfaceWindowDidKeydown (event) {
		if (document.querySelector('.LCHLauncher')) { // #spec
			return;
		}

		const handlerFunctions = {
			Escape () {
				KOMReviewDetailDispatchBack()
			},
		};

		handlerFunctions[event.key] && handlerFunctions[event.key]();
	},

	// CONTROL

	ControlRename() {
		let outputData = window.prompt(OLSKLocalized('KOMReviewDetailRenameButtonPromptText'), KOMReviewDetailDeck.KOMDeckName);
		
		if (!outputData) {
			return;
		}

		if (outputData === KOMReviewDetailDeck.KOMDeckName) {
			return;
		}

		KOMReviewDetailDispatchUpdate(Object.assign(KOMReviewDetailDeck, {
			KOMDeckName: outputData,
		}));
	},

	ContolPlay (inputData) {
		const outputData = {
			KOMReviewScheme: inputData,
		};

		if (inputData !== KOMReviewLogic.KOMReviewSchemeReviewing()) {
			outputData.KOMReviewMaxUnseenCards = kMaxUnseenCards;
		}
		
		KOMReviewDetailDispatchPlay(outputData);
	},

	// MESSAGES

	_OLSKAppToolbarDispatchLauncher () {
		window.Launchlet.LCHSingletonCreate({
			LCHOptionRecipes: mod.DataReviewDetailRecipes(),
		});
	},

	// SETUP

	SetupEverything () {
		mod.SetupLanguages();
	},

	SetupLanguages () {
		if (!('speechSynthesis' in window)) {
			return;
		}

		mod.ValueLanguages(speechSynthesis.getVoices());

		if (mod._ValueLanguages.length) {
			return;
		}

		// dom events - Getting the list of voices in speechSynthesis (Web Speech API) - Stack Overflow https://stackoverflow.com/questions/21513706/getting-the-list-of-voices-in-speechsynthesis-web-speech-api
		window.speechSynthesis.onvoiceschanged = function () {
			mod.ValueLanguages(window.speechSynthesis.getVoices());
		};
	},

	// LIFECYCLE

	LifecycleModuleDidLoad() {
		mod.SetupEverything();
	},

};

mod.LifecycleModuleDidLoad();

import _OLSKSharedBack from '../../../_shared/__external/OLSKUIAssets/_OLSKSharedBack.svg';
import KOMReviewDetailLanguageCode from '../KOMReviewDetailLanguageCode/main.svelte';
import KOMReviewStats from '../KOMReviewStats/main.svelte';
</script>
<svelte:window on:keydown={ mod.InterfaceWindowDidKeydown } />

<div class="KOMReviewDetail">

<header class="KOMReviewDetailToolbar OLSKToolbar OLSKToolbarJustify OLSKMobileViewHeader">
	<div class="OLSKToolbarElementGroup">
		<button class="KOMReviewDetailToolbarBackButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable OLSKToolbarButton" title={ OLSKLocalized('KOMReviewDetailToolbarBackButtonText') } on:click={ KOMReviewDetailDispatchBack }>
			<div class="KOMReviewDetailToolbarBackButtonImage">{@html _OLSKSharedBack }</div>
		</button>
	</div>

	<div class="OLSKToolbarElementGroup">
		<strong class="KOMReviewDetailToolbarTitle">{ KOMReviewDetailDeck.KOMDeckName }</strong>
	</div>

	<div class="OLSKToolbarElementGroup">
		<button class="KOMReviewDetailToolbarCardsButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" on:click={ KOMReviewDetailDispatchBrowse } accesskey="c">{ OLSKLocalized('KOMReviewDetailToolbarCardsButtonText') }</button>
	</div>
</header>

<div class="KOMReviewDetailBody">

<h1 class="KOMReviewDetailStudyHeading">{ OLSKLocalized('KOMReviewDetailGameOptionsHeadingText') }</h1>

<div class="KOMReviewDetailForm">
	<p>
		<label>
			<input class="KOMReviewDetailFormAudioIsEnabledField" type="checkbox" bind:checked={ KOMReviewDetailDeck.KOMDeckAudioIsEnabled } on:input={ mod.InterfaceFormDidUpdate } />
			<span class="KOMReviewDetailFormAudioIsEnabledFieldLabel">{ OLSKLocalized('KOMReviewDetailFormAudioIsEnabledFieldLabelText') }</span>
		</label>
	</p>
	<p>
		<label>
			<input class="KOMReviewDetailFormFrontSpeechIsEnabledField" type="checkbox" bind:checked={ KOMReviewDetailDeck.KOMDeckFrontSpeechIsEnabled } on:input={ mod.InterfaceFormDidUpdate } />
			<span class="KOMReviewDetailFormFrontSpeechIsEnabledFieldLabel">{ OLSKLocalized('KOMReviewDetailFormFrontSpeechIsEnabledFieldLabelText') }</span>
		</label>

		<span class="KOMReviewDetailFormFrontLanguageCode">
			<KOMReviewDetailLanguageCode
				KOMReviewDetailLanguageCodeItem={ KOMReviewDetailDeck }
				KOMReviewDetailLanguageCodeItemProperty={ 'KOMDeckFrontLanguageCode' }
				KOMReviewDetailLanguageCodeOptions={ mod._ValueLanguages }
				KOMReviewDetailLanguageCodeDispatchUpdate={ mod.InterfaceFormDidUpdate }
				/>
		</span>
	</p>
	<p>
		<label>
			<input class="KOMReviewDetailFormRearSpeechIsEnabledField" type="checkbox" bind:checked={ KOMReviewDetailDeck.KOMDeckRearSpeechIsEnabled } on:input={ mod.InterfaceFormDidUpdate } />
			<span class="KOMReviewDetailFormRearSpeechIsEnabledFieldLabel">{ OLSKLocalized('KOMReviewDetailFormRearSpeechIsEnabledFieldLabelText') }</span>
		</label>

		<span class="KOMReviewDetailFormRearLanguageCode">
			<KOMReviewDetailLanguageCode
				KOMReviewDetailLanguageCodeItem={ KOMReviewDetailDeck }
				KOMReviewDetailLanguageCodeItemProperty={ 'KOMDeckRearLanguageCode' }
				KOMReviewDetailLanguageCodeOptions={ mod._ValueLanguages }
				KOMReviewDetailLanguageCodeDispatchUpdate={ mod.InterfaceFormDidUpdate }
				/>
		</span>
	</p>
	<p>
		<label>
			<input class="KOMReviewDetailFormIsForwardOnlyField" type="checkbox" bind:checked={ KOMReviewDetailDeck.KOMDeckIsForwardOnly } on:input={ mod.InterfaceForwardOnlyDidInput } />
			<span class="KOMReviewDetailFormIsForwardOnlyFieldLabel">{ OLSKLocalized('KOMReviewDetailFormIsForwardOnlyFieldLabelText') }</span>
		</label>
	</p>
</div>

{#if !KOMReviewDetailDeck.$KOMReviewChartCompositionCollectionData.KOMSpacingGroupingTotal }
	<p class="KOMReviewDetailNoCards">{ OLSKLocalized('KOMReviewDetailNoCardsText') }</p>
{/if}

{#if KOMReviewDetailDeck.$KOMDeckTodayReviewCount || KOMReviewDetailDeck.$KOMDeckTodayUnseenCount}
	<div class="KOMReviewDetailPlay">
		<p>
			<button class="KOMReviewDetailPlayButton OLSKCommonButton OLSKCommonButtonPrimary" on:click={ mod.InterfaceMixedButtonDidClick } accesskey="g">{ OLSKLocalized('KOMReviewDetailPlayButtonText') }</button>
		</p>
	</div>
{/if}

{#if KOMReviewDetailDeck.$KOMDeckTodayStudiedCount && !KOMReviewDetailDeck.$KOMDeckTodayReviewCount && !KOMReviewDetailDeck.$KOMDeckTodayUnseenCount}
	<p class="KOMReviewDetailNoSpacings">{ OLSKLocalized('KOMReviewDetailNoSpacingsText') }</p>
{/if}

{#if KOMReviewDetailDeck.$KOMDeckGeneralNotUnseenCount }
	<hr>

	<KOMReviewStats
		KOMReviewTodayTotalCards={ KOMReviewDetailDeck.$KOMReviewTodayTotalCards }
		KOMReviewTodayTimeMinutes={ KOMReviewDetailDeck.$KOMReviewTodayTimeMinutes }
		KOMReviewTodayReviewAccuracy={ KOMReviewDetailDeck.$KOMReviewTodayReviewAccuracy }
		KOMReviewGeneralUpcomingData={ KOMReviewDetailDeck.$KOMReviewGeneralUpcomingData }
		KOMReviewGeneralHistoricalData={ KOMReviewDetailDeck.$KOMReviewGeneralHistoricalData }
		KOMReviewChartCompositionCollectionData={ KOMReviewDetailDeck.$KOMReviewChartCompositionCollectionData }
		/>
{/if}

<hr>

<h1 class="KOMReviewDetailDeckHeading">{ OLSKLocalized('KOMReviewDetailDeckHeadingText') }</h1>

<p>
	<button class="KOMReviewDetailRenameButton OLSKCommonButton" on:click={ mod.InterfaceRenameButtonDidClick }>{ OLSKLocalized('KOMReviewDetailRenameButtonText') }</button>
</p>

<hr>

<p>
	<button class="KOMReviewDetailDiscardButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" on:click={ () => (window.prompt(OLSKLocalized('KOMReviewDetailDiscardPromptText')) === KOMReviewDetailDeck.KOMDeckName) && KOMReviewDetailDispatchDiscard(KOMReviewDetailDeck) }>{ OLSKLocalized('KOMReviewDetailDiscardButtonText') }</button>
</p>

</div>

</div>

{#if OLSK_TESTING_BEHAVIOUR() && KOMReviewDetail_DebugShowLauncherButton }
	<button class="OLSKAppToolbarLauncherButton" on:click={ mod._OLSKAppToolbarDispatchLauncher }></button>
{/if}

<style>
.KOMReviewDetail {
	/* OLSKViewportContentFlexbox:Child */
	flex-grow: 1;
	
	/* KOMReviewDetailFlexbox:Parent */
	display: flex;
	flex-direction: column;
}

.KOMReviewDetailToolbar {
	border-bottom: var(--KOMBorderStyle);
}

.KOMReviewDetailBody {
	padding: var(--KOMCommonPadding);
}

hr {
	height: 1px;
	border: none;

	background: #e6e6e6;
}

.KOMReviewDetailPlayButton {
	padding: 4px 16px;
	font-size: 120%;
}

.KOMReviewDetailDiscardButton {
	padding: 5px;

	border: 1px solid #800002;
	border-radius: 3px;
	background: #ffefef;
	color: #800002;
}
</style>
