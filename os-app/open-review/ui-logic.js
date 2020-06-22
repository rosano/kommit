import KOMPlayLogic from '../sub-play/ui-logic.js';
import KOMSpacingModel from '../_shared/KOMSpacing/model.js';
import KOMDeckModel from '../_shared/KOMDeck/model.js';

const mod = {

	KOMReviewSpacingsToday (inputData) {
		if (!Array.isArray(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		return inputData.filter(function (e) {
			if (!e.KOMSpacingDueDate) {
				return true;
			}

			return KOMPlayLogic.KOMPlayDayGrouping(e.KOMSpacingDueDate).valueOf() <= KOMPlayLogic.KOMPlayDayGrouping(new Date()).valueOf();
		});
	},

	KOMReviewSchemeReviewing () {
		return 'kKOMReviewSchemeReviewing';
	},

	KOMReviewSchemeUnseen () {
		return 'kKOMReviewSchemeUnseen';
	},

	KOMReviewSchemeMixed () {
		return 'kKOMReviewSchemeMixed';
	},

	KOMReviewSchemes () {
		return [
			mod.KOMReviewSchemeReviewing(),
			mod.KOMReviewSchemeUnseen(),
			mod.KOMReviewSchemeMixed(),
		];
	},
	
	KOMReviewModelErrorsFor (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('KOMErrorInputNotValid');
		}

		const errors = {};

		if (!mod.KOMReviewSchemes().includes(inputData.KOMReviewScheme)) {
			errors.KOMReviewScheme = [
				'KOMErrorNotValid',
			];
		} else if (inputData.KOMReviewScheme !== mod.KOMReviewSchemeReviewing()) {
			if (typeof inputData.KOMReviewMaxUnseenCards === 'undefined') {
				errors.KOMReviewMaxUnseenCards = [
					'KOMErrorNotDefined',
				];
			}
		}

		if (inputData.KOMReviewMaxUnseenCards !== undefined) {
			if (typeof inputData.KOMReviewMaxUnseenCards !== 'number') {
				errors.KOMReviewMaxUnseenCards = [
					'KOMErrorNotNumber',
				];
			} else if (inputData.KOMReviewMaxUnseenCards < 1) {
				errors.KOMReviewMaxUnseenCards = [
					'KOMErrorNotPositive',
				];
			}
		}

		return Object.entries(errors).length ? errors : null;
	},

	KOMReviewFilter (param1, param2, param3) {
		if (!Array.isArray(param1)) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (mod.KOMReviewModelErrorsFor(param2)) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (KOMDeckModel.KOMDeckModelErrorsFor(param3)) {
			throw new Error('KOMErrorInputNotValid');
		}

		const cardsNew = [];
		return param1.filter(function (e, i) {
			if (param2.KOMReviewScheme === mod.KOMReviewSchemeReviewing() && KOMSpacingModel.KOMSpacingModelIsUnseen(e)) {
				return false;
			}

			if (param2.KOMReviewScheme === mod.KOMReviewSchemeUnseen() && !KOMSpacingModel.KOMSpacingModelIsUnseen(e)) {
				return false;
			}

			if (param3.KOMDeckIsForwardOnly && KOMSpacingModel.KOMSpacingModelIsBackward(e) ) {
				return false;
			}

			if (param2.KOMReviewScheme !== mod.KOMReviewSchemeReviewing() && KOMSpacingModel.KOMSpacingModelIsUnseen(e) && !cardsNew.includes(e.$KOMSpacingCard)) {
				cardsNew.push(e.$KOMSpacingCard);
			}

			if (param2.KOMReviewScheme !== mod.KOMReviewSchemeReviewing() && KOMSpacingModel.KOMSpacingModelIsUnseen(e) && cardsNew.length > param2.KOMReviewMaxUnseenCards) {
				return false;
			}

			return true;
		});
	},

};

export default mod;
