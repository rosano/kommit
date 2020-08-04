<script>
export let KOMReviewMasterListItemObject;
export let KOMReviewMasterListItemDispatchClick;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import KOMSpacingModel from '../../../_shared/KOMSpacing/model.js';
import KOMReviewLogic from '../../ui-logic.js';

const mod = {

	// VALUE

	_ValueSpacingsToday: [],
	_ValueSpacingsReviewing: [],
	_ValueSpacingsUnseen: [],

	// REACT

	ReactObject (inputData) {
		const items = KOMReviewLogic.KOMReviewSpacingsToday(inputData.$KOMDeckSpacings).filter(function (e) {
			if (inputData.KOMDeckIsForwardOnly && KOMSpacingModel.KOMSpacingModelIsBackward(e)) {
				return false;
			}

			return true;
		});

		mod._ValueSpacingsToday = items;
		mod._ValueSpacingsReviewing = KOMSpacingModel.KOMSpacingModelFilterUnique(items.filter(function (e) {
			return !KOMSpacingModel.KOMSpacingModelIsUnseen(e);
		}));
		mod._ValueSpacingsUnseen = KOMSpacingModel.KOMSpacingModelFilterUnique(items.filter(KOMSpacingModel.KOMSpacingModelIsUnseen));
	},

};

$: mod.ReactObject(KOMReviewMasterListItemObject)
</script>

<button class="KOMReviewMasterListItem OLSKLayoutButtonNoStyle" aria-label={ KOMReviewMasterListItemObject.KOMDeckName } on:click={ KOMReviewMasterListItemDispatchClick }>

<strong class="KOMReviewMasterListItemName">{ KOMReviewMasterListItemObject.KOMDeckName }</strong><br>

<span class="KOMReviewMasterListItemReviewValue">{ mod._ValueSpacingsReviewing.length }</span>
<span class="KOMReviewMasterListItemReviewLabel">{ OLSKLocalized('KOMReviewMasterListItemReviewLabelText') }</span><br>

<span class="KOMReviewMasterListItemUnseenValue">{ mod._ValueSpacingsUnseen.length }</span>
<span class="KOMReviewMasterListItemUnseenLabel">{ OLSKLocalized('KOMReviewMasterListItemUnseenLabelText') }</span>

</button>

<style>
.KOMReviewMasterListItem {
	display: block;
	width: 100%;
	min-height: 46px;
	padding: var(--KOMCommonPadding);
	border: 1px solid rgba(0, 0, 0, 0.1);

	margin-bottom: var(--KOMCommonPadding);

	text-align: left;
}

.KOMReviewMasterListItem:active {
	color: inherit;
}

.KOMReviewMasterListItemTitle {
	display: inline-block;
}
</style>
