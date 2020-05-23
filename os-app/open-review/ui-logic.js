import KOMPlayLogic from '../sub-play/ui-logic.js';
import KOMSpacingModel from '../_shared/KOMSpacing/model.js';

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

		var errors = {};

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

		if (inputData.KOMReviewIsForwardOnly !== undefined) {
			if (typeof inputData.KOMReviewIsForwardOnly !== 'boolean') {
				errors.KOMReviewIsForwardOnly = [
					'KOMErrorNotBoolean',
				];
			}
		}

		if (inputData.KOMReviewFrontIsOral !== undefined) {
			if (typeof inputData.KOMReviewFrontIsOral !== 'boolean') {
				errors.KOMReviewFrontIsOral = [
					'KOMErrorNotBoolean',
				];
			}
		}

		return Object.entries(errors).length ? errors : null;
	},

	KOMReviewFilter (param1, param2) {
		if (!Array.isArray(param1)) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (mod.KOMReviewModelErrorsFor(param2)) {
			throw new Error('KOMErrorInputNotValid');
		}

		let cards = [];
		return param1.filter(function (e, i) {
			if (param2.KOMReviewScheme === mod.KOMReviewSchemeReviewing() && KOMSpacingModel.KOMSpacingModelIsUnseen(e)) {
				return false;
			}

			if (param2.KOMReviewScheme !== mod.KOMReviewSchemeReviewing() && !KOMSpacingModel.KOMSpacingModelIsUnseen(e)) {
				return false;
			}

			if (param2.KOMReviewIsForwardOnly && KOMSpacingModel.KOMSpacingModelIsBackward(e) ) {
				return false;
			}

			if (!cards.includes(e.$KOMSpacingCard)) {
				cards.push(e.$KOMSpacingCard);
			}

			if (param2.KOMReviewScheme !== mod.KOMReviewSchemeReviewing() && cards.length > param2.KOMReviewMaxUnseenCards) {
				return false;
			}

			return true;
		});
	},

};

export default mod;
