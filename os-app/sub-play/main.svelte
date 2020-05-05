<script>
export let KOMPlayCards;
export let KOMPlayDispatchBack;
export let KOMPlayDispatchDone;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting'

const mod = {

	// VALUE

	_ValueAnswerVisible: false,

	// INTERFACE

	InterfaceCardDidClick () {
		mod._ValueAnswerVisible = true;
	},

	// CONTROL

};

import OLSKViewportContent from 'OLSKViewportContent';
import OLSKToolbar from 'OLSKToolbar';
import OLSKToolbarElementGroup from 'OLSKToolbarElementGroup';
</script>

<div class="KOMPlay OLSKViewport">

<OLSKViewportContent>

<header class="KOMPlayToolbar">
	<OLSKToolbar OLSKToolbarJustify={ true }>
		<OLSKToolbarElementGroup>
			<button class="KOMPlayToolbarBackButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" on:click={ KOMPlayDispatchBack }>{ OLSKLocalized('KOMPlayToolbarBackButtonText') }</button>
		</OLSKToolbarElementGroup>

		<OLSKToolbarElementGroup>
			<button class="KOMPlayToolbarDoneButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" on:click={ KOMPlayDispatchDone }>{ OLSKLocalized('KOMPlayToolbarDoneButtonText') }</button>
		</OLSKToolbarElementGroup>
	</OLSKToolbar>
</header>

<div class="KOMPlayCard" on:click={ mod.InterfaceCardDidClick }>

	<div class="KOMPlayCardQuestion">{ KOMPlayCards[0].KOMCardQuestion }</div>

	{#if mod._ValueAnswerVisible}
		<div class="KOMPlayCardAnswer"></div>
		<div class="KOMPlayCardHint"></div>
	{/if}
	
</div>

{#if mod._ValueAnswerVisible}
	<button class="KOMPlayResponseButtonAgain">{ OLSKLocalized('KOMPlayResponseButtonAgainText') }</button>
	<button class="KOMPlayResponseButtonHard">{ OLSKLocalized('KOMPlayResponseButtonHardText') }</button>
	<button class="KOMPlayResponseButtonGood">{ OLSKLocalized('KOMPlayResponseButtonGoodText') }</button>
	<button class="KOMPlayResponseButtonEasy">{ OLSKLocalized('KOMPlayResponseButtonEasyText') }</button>
{/if}
	
</OLSKViewportContent>

</div>
