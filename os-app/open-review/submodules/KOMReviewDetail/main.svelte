<script>
export let KOMReviewDetailDeck;
export let KOMReviewDetailDispatchBack;
export let KOMReviewDetailDispatchBrowse;
export let KOMReviewDetailDispatchUpdate;
export let KOMReviewDetailDispatchRecount;
export let KOMReviewDetailDispatchPlay;
export let KOMReviewDetailDispatchDiscard;
export let KOMReviewDetail_DebugShowLauncherButton = false;

export const modPublic = {

	KOMReviewDetailRecipes () {
		return mod.DataReviewDetailRecipes();
	},

};

import { OLSKLocalized } from 'OLSKInternational';
import { OLSK_SPEC_UI } from 'OLSKSpec';

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
		const items = [];

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

		if (OLSK_SPEC_UI()) {
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

			setTimeout(function () {
				KOMReviewDetailDispatchRecount();
			}, 100);
		});
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

<header class="KOMReviewDetailToolbar OLSKToolbar OLSKToolbarJustify OLSKCommonEdgeBottom OLSKMobileViewHeader">
	<div class="OLSKToolbarElementGroup">
		<button class="KOMReviewDetailToolbarBackButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" title={ OLSKLocalized('KOMReviewDetailToolbarBackButtonText') } on:click={ KOMReviewDetailDispatchBack }>
			<div class="KOMReviewDetailToolbarBackButtonImage">{@html _OLSKSharedBack }</div>
		</button>
	</div>

	<div class="OLSKToolbarElementGroup">
		<strong class="KOMReviewDetailToolbarTitle">{ KOMReviewDetailDeck.KOMDeckName }</strong>
	</div>

	<div class="OLSKToolbarElementGroup">
		<button class="KOMReviewDetailToolbarCardsButton OLSKDecorButtonNoStyle OLSKDecorTappable" on:click={ KOMReviewDetailDispatchBrowse } accesskey="c">{ OLSKLocalized('KOMReviewDetailToolbarCardsButtonText') }</button>
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
			<input class="KOMReviewDetailFormIsForwardOnlyField" type="checkbox" bind:checked={ KOMReviewDetailDeck.KOMDeckIsForwardOnly } on:input={ mod.InterfaceFormDidUpdate } />
			<span class="KOMReviewDetailFormIsForwardOnlyFieldLabel">{ OLSKLocalized('KOMReviewDetailFormIsForwardOnlyFieldLabelText') }</span>
		</label>
	</p>
	<p>
		<label>
			<input class="KOMReviewDetailFormPairingIsEnabledField" type="checkbox" bind:checked={ KOMReviewDetailDeck.KOMDeckPairingIsEnabled } on:input={ mod.InterfaceFormDidUpdate } />
			<span class="KOMReviewDetailFormPairingIsEnabledFieldLabel">{ OLSKLocalized('KOMReviewDetailFormPairingIsEnabledFieldLabelText') }</span>
		</label>
	</p>
	<p>
		<label>
			<span class="KOMReviewDetailFormRetireCardsFieldLabel">{ OLSKLocalized('KOMReviewDetailFormRetireCardsFieldLabelText') }</span>
			<select class="KOMReviewDetailFormRetireCardsField" bind:value={ KOMReviewDetailDeck.KOMDeckRetireCardsMonths } on:input={ mod.InterfaceFormDidUpdate }>
				<option class="KOMReviewDetailFormRetireCardsFieldOptionNever" value={ 0 }>{ OLSKLocalized('KOMReviewDetailFormRetireCardsFieldOptionNeverText') }</option>
				<option class="KOMReviewDetailFormRetireCardsFieldOptionOneMonth" value={ 1 }>{ OLSKLocalized('KOMReviewDetailFormRetireCardsFieldOptionOneMonthText') }</option>
				<option class="KOMReviewDetailFormRetireCardsFieldOptionThreeMonths" value={ 3 }>{ OLSKLocalized('KOMReviewDetailFormRetireCardsFieldOptionThreeMonthsText') }</option>
				<option class="KOMReviewDetailFormRetireCardsFieldOptionSixMonths" value={ 6 }>{ OLSKLocalized('KOMReviewDetailFormRetireCardsFieldOptionSixMonthsText') }</option>
				<option class="KOMReviewDetailFormRetireCardsFieldOptionTwelveMonths" value={ 12 }>{ OLSKLocalized('KOMReviewDetailFormRetireCardsFieldOptionTwelveMonthsText') }</option>
			</select>
		</label>
	</p>
</div>

{#if !KOMReviewDetailDeck.$KOMReviewChartCompositionCollectionData.KOMSpacingGroupingTotal }
	<p class="KOMReviewDetailNoCards">{ OLSKLocalized('KOMReviewDetailNoCardsText') }</p>
{/if}

{#if KOMReviewDetailDeck.$KOMDeckTodayReviewCount || KOMReviewDetailDeck.$KOMDeckTodayUnseenCount}
	<div class="KOMReviewDetailPlay">
		<p>
			<button class="KOMReviewDetailPlayButton OLSKDecorPress" on:click={ mod.InterfaceMixedButtonDidClick } accesskey="g">{ OLSKLocalized('KOMReviewDetailPlayButtonText') }</button>
		</p>
	</div>
{/if}

{#if KOMReviewDetailDeck.$KOMDeckTodayStudiedCount && !KOMReviewDetailDeck.$KOMDeckTodayReviewCount && !KOMReviewDetailDeck.$KOMDeckTodayUnseenCount}
	<p class="KOMReviewDetailNoSpacings">{ OLSKLocalized('KOMReviewDetailNoSpacingsText') }</p>
{/if}

{#if KOMReviewDetailDeck.$KOMDeckGeneralNotUnseenCount }
	<hr role="presentation" />

	<KOMReviewStats
		KOMReviewTodayTotalCards={ KOMReviewDetailDeck.$KOMReviewTodayTotalCards }
		KOMReviewTodayTimeMinutes={ KOMReviewDetailDeck.$KOMReviewTodayTimeMinutes }
		KOMReviewTodayReviewAccuracy={ KOMReviewDetailDeck.$KOMReviewTodayReviewAccuracy }
		KOMReviewGeneralUpcomingData={ KOMReviewDetailDeck.$KOMReviewGeneralUpcomingData }
		KOMReviewGeneralHistoricalData={ KOMReviewDetailDeck.$KOMReviewGeneralHistoricalData }
		KOMReviewChartCompositionCollectionData={ KOMReviewDetailDeck.$KOMReviewChartCompositionCollectionData }
		/>
{/if}

<hr role="presentation" />

<h1 class="KOMReviewDetailDeckHeading">{ OLSKLocalized('KOMReviewDetailDeckHeadingText') }</h1>

<p>
	<button class="KOMReviewDetailRenameButton OLSKDecorPress" on:click={ mod.InterfaceRenameButtonDidClick }>{ OLSKLocalized('KOMReviewDetailRenameButtonText') }</button>
</p>

<hr role="presentation" />

<p>
	<button class="KOMReviewDetailDiscardButton OLSKDecorPress OLSKDecorPressDestroy" on:click={ () => (window.prompt(OLSKLocalized('KOMReviewDetailDiscardPromptText')) === KOMReviewDetailDeck.$KOMReviewChartCompositionCollectionData.KOMSpacingGroupingTotal.toString()) && KOMReviewDetailDispatchDiscard(KOMReviewDetailDeck) }>{ OLSKLocalized('KOMReviewDetailDiscardButtonText') }</button>
</p>

</div>

</div>

{#if OLSK_SPEC_UI() && KOMReviewDetail_DebugShowLauncherButton }
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

.KOMReviewDetailBody {
	padding: var(--KOMCommonPadding);
}

hr {
	height: 1px;
	border: none;

	background: #e6e6e6;
}

.KOMReviewDetailPlayButton {
	padding: var(--OLSKCommonInputPadding) 8px;
	font-size: 120%;
}
</style>
