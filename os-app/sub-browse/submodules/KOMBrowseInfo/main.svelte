<script>
export let KOMBrowseInfoItem;
export let KOMBrowseInfoDeck;
export let KOMBrowseInfoTagsSuggestions;
export let KOMBrowseInfoSpeechAvailable;
export let KOMBrowseInfoDispatchBack;
export let KOMBrowseInfoDispatchUpdate;
export let KOMBrowseInfoDispatchDiscard;
export let KOMBrowseInfoDispatchTemplate;
export let KOMBrowseInfoDispatchRead;
export let KOMBrowseInfoAudioDispatchCapture;
export let KOMBrowseInfoAudioDispatchFetch;
export let KOMBrowseInfoAudioDispatchClear;
export let KOMBrowseInfoDispatchDebug;
export let OLSKMobileViewInactive = false;
export let KOMBrowseInfo_DebugShowLauncherButton = false;

export const modPublic = {

	KOMBrowseInfoRecipes () {
		return mod.DataBrowseInfoRecipes();
	},

};

import { OLSKLocalized } from 'OLSKInternational';
import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting';

const mod = {

	// DATA

	DataBrowseInfoRecipes () {
		if (!KOMBrowseInfoItem) {
			return [];
		}

		const items = [{
			LCHRecipeSignature: 'KOMBrowseInfoLauncherItemToggleRetire',
			LCHRecipeName: OLSKLocalized('KOMBrowseInfoLauncherItemToggleRetireText'),
			LCHRecipeCallback: function KOMBrowseInfoLauncherItemToggleRetire () {
				if (KOMBrowseInfoItem.KOMCardIsRetired) {
					delete KOMBrowseInfoItem.KOMCardIsRetired;
				} else {
					KOMBrowseInfoItem.KOMCardIsRetired = true;
				}

				KOMBrowseInfoDispatchUpdate();
			},
		}, {
			LCHRecipeSignature: 'KOMBrowseInfoLauncherItemDebug',
			LCHRecipeName: OLSKLocalized('KOMBrowseInfoLauncherItemDebugText'),
			LCHRecipeCallback: function KOMBrowseInfoLauncherItemDebug () {
				KOMBrowseInfoDispatchDebug(KOMBrowseInfoItem);
			},
		}];

		if (OLSK_TESTING_BEHAVIOUR()) {
			items.push({
				LCHRecipeName: 'KOMBrowseInfoLauncherFakeItemProxy',
				LCHRecipeCallback: function KOMBrowseInfoLauncherFakeItemProxy () {},
			});
		}
		
		return items;
	},

	// MESSAGE

	KOMBrowseInfoTagsDispatchAdd (inputData) {
		if (!inputData.trim()) {
			return;
		}

		if ((KOMBrowseInfoItem.KOMCardTags || []).includes(inputData)) {
			return;
		}
		
		KOMBrowseInfoItem.KOMCardTags = (KOMBrowseInfoItem.KOMCardTags || []).concat(inputData);

		KOMBrowseInfoDispatchUpdate();
	},

	KOMBrowseInfoTagsDispatchRemove (inputData) {
		KOMBrowseInfoItem.KOMCardTags = KOMBrowseInfoItem.KOMCardTags.filter(function (e) {
			return e !== inputData;
		});

		KOMBrowseInfoDispatchUpdate();
	},

	_OLSKAppToolbarDispatchLauncher () {
		window.Launchlet.LCHSingletonCreate({
			LCHOptionRecipes: mod.DataBrowseInfoRecipes(),
		});
	},

};

import OLSKDetailPlaceholder from 'OLSKDetailPlaceholder';
import _OLSKSharedBack from '../../../_shared/__external/OLSKUIAssets/_OLSKSharedBack.svg';
import _OLSKSharedDiscard from '../../../_shared/__external/OLSKUIAssets/_OLSKSharedDiscard.svg';
import _OLSKSharedClone from '../../../_shared/__external/OLSKUIAssets/_OLSKSharedClone.svg';
import KOMBrowseInfoAudio from '../KOMBrowseInfoAudio/main.svelte';
import KOMBrowseInfoTags from '../KOMBrowseInfoTags/main.svelte';
</script>

<div class="KOMBrowseInfo OLSKViewportDetail" class:OLSKMobileViewInactive={ OLSKMobileViewInactive } aria-hidden={ OLSKMobileViewInactive ? true : null }>

{#if !KOMBrowseInfoItem}
<OLSKDetailPlaceholder />
{/if}

{#if KOMBrowseInfoItem}
<header class="KOMBrowseInfoToolbar OLSKMobileViewHeader OLSKToolbar OLSKToolbarJustify">
	<div class="OLSKToolbarElementGroup">
		<button class="KOMBrowseInfoToolbarBackButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable OLSKToolbarButton OLSKVisibilityMobile" title={ OLSKLocalized('KOMBrowseInfoToolbarBackButtonText') } on:click={ KOMBrowseInfoDispatchBack }>
			<div class="KOMBrowseInfoToolbarBackButtonImage">{@html _OLSKSharedBack }</div>
		</button>
	</div>

	<div class="OLSKToolbarElementGroup">
		<button class="KOMBrowseInfoToolbarDiscardButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable OLSKToolbarButton" title={ OLSKLocalized('KOMBrowseInfoToolbarDiscardButtonText') } on:click={ () => window.confirm(OLSKLocalized('KOMBrowseInfoDiscardConfirmText')) && KOMBrowseInfoDispatchDiscard(KOMBrowseInfoItem) }>
			<div class="KOMBrowseInfoToolbarDiscardButtonImage">{@html _OLSKSharedDiscard }</div>
		</button>
		
		<button class="KOMBrowseInfoToolbarTemplateButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable OLSKToolbarButton" title={ OLSKLocalized('KOMBrowseInfoToolbarTemplateButtonText') } on:click={ () => KOMBrowseInfoDispatchTemplate(Object.fromEntries(Object.entries(KOMBrowseInfoItem).filter(function (e) {
			return e[0] === 'KOMCardTags';
		}))) } accesskey="t">
			<div class="KOMBrowseInfoToolbarTemplateButtonImage">{@html _OLSKSharedClone }</div>
		</button>
	</div>
</header>

<div class="KOMBrowseInfoForm">

<p>
	<input class="KOMBrowseInfoFormFrontTextField OLSKMobileSafariRemoveDefaultInputStyle" placeholder="{ OLSKLocalized('KOMBrowseInfoFormFrontTextFieldText') }" type="text" bind:value={ KOMBrowseInfoItem.KOMCardFrontText } on:input={ KOMBrowseInfoDispatchUpdate } />
</p>

<p class="KOMBrowseInfoFormFrontAudio">
	<button class="KOMBrowseInfoFormFrontReadButton" on:click={ () => KOMBrowseInfoDispatchRead(KOMBrowseInfoItem.KOMCardFrontText, KOMBrowseInfoDeck.KOMDeckFrontLanguageCode) } disabled={ !KOMBrowseInfoSpeechAvailable || !KOMBrowseInfoDeck.KOMDeckFrontLanguageCode }>{ OLSKLocalized('KOMBrowseInfoFormFrontReadButtonText') }</button>

	<KOMBrowseInfoAudio
		KOMBrowseInfoAudioItem={ KOMBrowseInfoItem }
		KOMBrowseInfoAudioItemProperty="KOMCardFrontAudio"
		KOMBrowseInfoAudioAvailable={ 'WebAssembly' in window }
		KOMBrowseInfoAudioDispatchCapture={ KOMBrowseInfoAudioDispatchCapture }
		KOMBrowseInfoAudioDispatchFetch={ KOMBrowseInfoAudioDispatchFetch }
		KOMBrowseInfoAudioDispatchClear={ KOMBrowseInfoAudioDispatchClear }
		/>
</p>

<p>
	<input class="KOMBrowseInfoFormRearTextField OLSKMobileSafariRemoveDefaultInputStyle" placeholder="{ OLSKLocalized('KOMBrowseInfoFormRearTextFieldText') }" type="text" bind:value={ KOMBrowseInfoItem.KOMCardRearText } on:input={ KOMBrowseInfoDispatchUpdate } />
</p>

<p class="KOMBrowseInfoFormRearAudio">
	<button class="KOMBrowseInfoFormRearReadButton" on:click={ () => KOMBrowseInfoDispatchRead(KOMBrowseInfoItem.KOMCardRearText, KOMBrowseInfoDeck.KOMDeckRearLanguageCode) } disabled={ !KOMBrowseInfoSpeechAvailable || !KOMBrowseInfoDeck.KOMDeckRearLanguageCode }>{ OLSKLocalized('KOMBrowseInfoFormRearReadButtonText') }</button>

	<KOMBrowseInfoAudio
		KOMBrowseInfoAudioItem={ KOMBrowseInfoItem }
		KOMBrowseInfoAudioItemProperty="KOMCardRearAudio"
		KOMBrowseInfoAudioAvailable={ 'WebAssembly' in window }
		KOMBrowseInfoAudioDispatchCapture={ KOMBrowseInfoAudioDispatchCapture }
		KOMBrowseInfoAudioDispatchFetch={ KOMBrowseInfoAudioDispatchFetch }
		KOMBrowseInfoAudioDispatchClear={ KOMBrowseInfoAudioDispatchClear }
		/>
</p>

<p>
	<input class="KOMBrowseInfoFormNotesField OLSKMobileSafariRemoveDefaultInputStyle" placeholder="{ OLSKLocalized('KOMBrowseInfoFormNotesFieldText') }" type="text" bind:value={ KOMBrowseInfoItem.KOMCardNotes } on:input={ KOMBrowseInfoDispatchUpdate } />
</p>

<hr />

<p class="KOMBrowseInfoFormTags">
	<KOMBrowseInfoTags
		KOMBrowseInfoTagsItems={ KOMBrowseInfoItem.KOMCardTags || [] }
		KOMBrowseInfoTagsSuggestions={ KOMBrowseInfoTagsSuggestions }
		KOMBrowseInfoTagsDispatchAdd={ mod.KOMBrowseInfoTagsDispatchAdd }
		KOMBrowseInfoTagsDispatchRemove={ mod.KOMBrowseInfoTagsDispatchRemove }
		/>
</p>

</div>
{/if}

</div>

{#if OLSK_TESTING_BEHAVIOUR() && KOMBrowseInfo_DebugShowLauncherButton }
	<button class="OLSKAppToolbarLauncherButton" on:click={ mod._OLSKAppToolbarDispatchLauncher }></button>
{/if}

<style src="./ui-style.css"></style>
