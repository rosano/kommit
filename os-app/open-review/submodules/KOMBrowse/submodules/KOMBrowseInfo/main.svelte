<script>
export let KOMBrowseInfoItem;
export let KOMBrowseInfoDispatchBack;
export let KOMBrowseInfoDispatchDiscard;
export let KOMBrowseInfoDispatchUpdate;
export let OLSKMobileViewInactive = false;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting';

import OLSKToolbar from 'OLSKToolbar';
import OLSKToolbarElementGroup from 'OLSKToolbarElementGroup';
import OLSKDetailPlaceholder from 'OLSKDetailPlaceholder';
import _OLSKSharedBack from '../../../../../_shared/__external/OLSKUIAssets/_OLSKSharedBack.svg';
import _OLSKSharedDiscard from '../../../../../_shared/__external/OLSKUIAssets/_OLSKSharedDiscard.svg';
</script>

<div class="KOMBrowseInfo OLSKViewportDetail" class:OLSKMobileViewInactive={ OLSKMobileViewInactive } aria-hidden={ OLSKMobileViewInactive ? true : null }>

{#if !KOMBrowseInfoItem}
<OLSKDetailPlaceholder />
{/if}

{#if KOMBrowseInfoItem}
<header class="KOMBrowseInfoToolbar OLSKMobileViewHeader">
	<OLSKToolbar OLSKToolbarJustify={ true }>
		<OLSKToolbarElementGroup>
			<button class="KOMBrowseInfoToolbarBackButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable OLSKToolbarButton" title={ OLSKLocalized('KOMBrowseInfoToolbarBackButtonText') } on:click={ KOMBrowseInfoDispatchBack }>
				<div class="KOMBrowseInfoToolbarBackButtonImage">{@html _OLSKSharedBack }</div>
			</button>
		</OLSKToolbarElementGroup>

		<OLSKToolbarElementGroup>
			<button class="KOMBrowseInfoToolbarDiscardButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable OLSKToolbarButton" title={ OLSKLocalized('KOMBrowseInfoToolbarDiscardButtonText') } on:click={ () => window.confirm(OLSKLocalized('KOMBrowseInfoDiscardPromptText')) && KOMBrowseInfoDispatchDiscard() }>
				<div class="KOMBrowseInfoToolbarDiscardButtonImage">{@html _OLSKSharedDiscard }</div>
			</button>
		</OLSKToolbarElementGroup>
	</OLSKToolbar>
</header>

<div class="KOMBrowseInfoForm">

<p>
	<input class="KOMBrowseInfoFormQuestionField" placeholder="{ OLSKLocalized('KOMBrowseInfoFormQuestionFieldText') }" type="text" bind:value={ KOMBrowseInfoItem.KOMCardQuestion } on:input={ KOMBrowseInfoDispatchUpdate } />
</p>

<p>
	<input class="KOMBrowseInfoFormAnswerField" placeholder="{ OLSKLocalized('KOMBrowseInfoFormAnswerFieldText') }" type="text" bind:value={ KOMBrowseInfoItem.KOMCardAnswer } on:input={ KOMBrowseInfoDispatchUpdate } />
</p>

</div>
{/if}

</div>

<style src="./ui-style.css"></style>
