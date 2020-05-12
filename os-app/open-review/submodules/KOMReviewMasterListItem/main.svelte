<script>
export let KOMReviewMasterListItemObject;

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

<div class="KOMReviewMasterListItem" role="button" tabindex="0" aria-label={ KOMReviewMasterListItemObject.KOMDeckName }>

<strong class="KOMReviewMasterListItemName">{ KOMReviewMasterListItemObject.KOMDeckName }</strong><br>

<span class="KOMReviewMasterListItemReviewValue">{ mod._ValueSpacingsReviewing.length }</span>
<span class="KOMReviewMasterListItemReviewLabel">{ OLSKLocalized('KOMReviewMasterListItemReviewLabelText') }</span><br>

<span class="KOMReviewMasterListItemUnseenValue">{ mod._ValueSpacingsUnseen.length }</span>
<span class="KOMReviewMasterListItemUnseenLabel">{ OLSKLocalized('KOMReviewMasterListItemUnseenLabelText') }</span>

</div>

<style>	
.KOMReviewMasterListItem {
	min-height: 46px;
	padding: 10px;
	border-bottom: var(--KOMBorderStyle);

	overflow: hidden;
	text-overflow: ellipsis;

	/* prevent breaking from long urls */
	overflow-wrap: break-word;
	word-wrap: break-word;
	word-break: break-word;
	hyphens: auto;
}

.KOMReviewMasterListItemTitle {
	display: inline-block;
}
</style>
