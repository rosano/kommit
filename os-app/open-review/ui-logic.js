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

	KOMReviewSchemeMixed () {
		return 'kKOMReviewSchemeMixed';
	},

	KOMReviewSchemeUnseen () {
		return 'kKOMReviewSchemeUnseen';
	},

	KOMReviewSchemes () {
		return [
			mod.KOMReviewSchemeReviewing(),
			mod.KOMReviewSchemeMixed(),
			mod.KOMReviewSchemeUnseen(),
			];
	},

};

export default mod;
