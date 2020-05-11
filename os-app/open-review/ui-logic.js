import KOMPlayLogic from '../sub-play/ui-logic.js';

const mod = {

	KOMReviewSpacingsToday (inputData) {
		if (!Array.isArray(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		return inputData.filter(function (e) {
			if (!e.KOMSpacingDueDate) {
				return true;
			};

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

		if (inputData.KOMReviewIsBidirectional !== undefined) {
			if (typeof inputData.KOMReviewIsBidirectional !== 'boolean') {
				errors.KOMReviewIsBidirectional = [
					'KOMErrorNotBoolean',
				];
			}
		}

		return Object.entries(errors).length ? errors : null;
	},

};

export default mod;
