<script>
export let KOMBrowseInfoItem;
export let KOMBrowseInfoDispatchBack;
export let KOMBrowseInfoDispatchUpdate;
export let KOMBrowseInfoDispatchDiscard;
export let KOMBrowseInfoDispatchCreate;
export let KOMBrowseInfoAudioDispatchCapture;
export let KOMBrowseInfoAudioDispatchFetch;
export let KOMBrowseInfoAudioDispatchClear;
export let OLSKMobileViewInactive = false;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting';

import OLSKDetailPlaceholder from 'OLSKDetailPlaceholder';
import _OLSKSharedBack from '../../../_shared/__external/OLSKUIAssets/_OLSKSharedBack.svg';
import _OLSKSharedDiscard from '../../../_shared/__external/OLSKUIAssets/_OLSKSharedDiscard.svg';
import _OLSKSharedCreate from '../../../_shared/__external/OLSKUIAssets/_OLSKSharedCreate.svg';
import KOMBrowseInfoAudio from '../KOMBrowseInfoAudio/main.svelte';
</script>

<div class="KOMBrowseInfo OLSKViewportDetail" class:OLSKMobileViewInactive={ OLSKMobileViewInactive } aria-hidden={ OLSKMobileViewInactive ? true : null }>

{#if !KOMBrowseInfoItem}
<OLSKDetailPlaceholder />
{/if}

{#if KOMBrowseInfoItem}
<header class="KOMBrowseInfoToolbar OLSKMobileViewHeader OLSKToolbar OLSKToolbarJustify">
	<div class="OLSKToolbarElementGroup">
		<button class="KOMBrowseInfoToolbarBackButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable OLSKToolbarButton" title={ OLSKLocalized('KOMBrowseInfoToolbarBackButtonText') } on:click={ KOMBrowseInfoDispatchBack }>
			<div class="KOMBrowseInfoToolbarBackButtonImage">{@html _OLSKSharedBack }</div>
		</button>
	</div>

	<div class="OLSKToolbarElementGroup">
		<button class="KOMBrowseInfoToolbarDiscardButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable OLSKToolbarButton" title={ OLSKLocalized('KOMBrowseInfoToolbarDiscardButtonText') } on:click={ () => window.confirm(OLSKLocalized('KOMBrowseInfoDiscardPromptText')) && KOMBrowseInfoDispatchDiscard(KOMBrowseInfoItem) }>
			<div class="KOMBrowseInfoToolbarDiscardButtonImage">{@html _OLSKSharedDiscard }</div>
		</button>
		
		<button class="KOMBrowseInfoToolbarCreateButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable OLSKToolbarButton" title={ OLSKLocalized('KOMBrowseInfoToolbarCreateButtonText') } on:click={ KOMBrowseInfoDispatchCreate }>
			<div class="KOMBrowseInfoToolbarCreateButtonImage">{@html _OLSKSharedCreate }</div>
		</button>
	</div>
</header>

<div class="KOMBrowseInfoForm">

<p>
	<input class="KOMBrowseInfoFormFrontField OLSKMobileSafariRemoveDefaultInputStyle" placeholder="{ OLSKLocalized('KOMBrowseInfoFormFrontFieldText') }" type="text" bind:value={ KOMBrowseInfoItem.KOMCardFrontText } on:input={ KOMBrowseInfoDispatchUpdate } />
</p>

<p class="KOMBrowseInfoFormFrontAudio">
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
	<input class="KOMBrowseInfoFormRearField OLSKMobileSafariRemoveDefaultInputStyle" placeholder="{ OLSKLocalized('KOMBrowseInfoFormRearFieldText') }" type="text" bind:value={ KOMBrowseInfoItem.KOMCardRearText } on:input={ KOMBrowseInfoDispatchUpdate } />
</p>

<p class="KOMBrowseInfoFormRearAudio">
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

</div>
{/if}

</div>

<style src="./ui-style.css"></style>
